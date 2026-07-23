import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// In-memory failed login attempts tracker
interface AttemptRecord {
  count: number;
  lockUntil: number;
}
const failedAttemptsMap = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check rate limit / lockout state
    const record = failedAttemptsMap.get(cleanEmail);
    const now = Date.now();

    if (record && record.lockUntil > now) {
      const remainingMinutes = Math.ceil((record.lockUntil - now) / 60000);
      return NextResponse.json(
        { error: `Too many failed login attempts. Please try again in ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}.` },
        { status: 429 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // 1. Authenticate user to verify credentials
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });

    if (authError || !authData?.session || !authData?.user) {
      // Track failed attempt
      const current = failedAttemptsMap.get(cleanEmail) || { count: 0, lockUntil: 0 };
      const newCount = (current.lockUntil < now ? 0 : current.count) + 1;
      
      if (newCount >= MAX_ATTEMPTS) {
        failedAttemptsMap.set(cleanEmail, {
          count: newCount,
          lockUntil: now + LOCKOUT_MS
        });
        return NextResponse.json(
          { error: 'Too many failed login attempts. Account temporarily locked. Please try again in 15 minutes.' },
          { status: 429 }
        );
      }

      failedAttemptsMap.set(cleanEmail, { count: newCount, lockUntil: 0 });
      return NextResponse.json({ error: authError?.message || 'Invalid email or password' }, { status: 401 });
    }

    // Success — clear lockout record
    failedAttemptsMap.delete(cleanEmail);

    const session = authData.session;
    const user = authData.user;

    // 2. Query workspace_settings under user's auth context (to respect RLS)
    const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    });

    const { data: settingsData, error: settingsError } = await userSupabase
      .from('workspace_settings')
      .select('two_factor_enabled')
      .maybeSingle();

    if (settingsError) {
      console.error('Error fetching workspace settings:', settingsError);
    }

    const is2FAEnabled = !!settingsData?.two_factor_enabled;

    if (is2FAEnabled) {
      // Generate random 6-digit OTP code
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Save OTP using service/anon level client so we can execute the RPC
      const { error: dbErr } = await supabase.rpc('create_signup_otp', {
        p_email: cleanEmail,
        p_otp: otpCode
      });

      if (dbErr) {
        console.error('Database OTP insertion error on 2FA:', dbErr);
        return NextResponse.json({ error: 'Failed to generate 2FA code: ' + dbErr.message }, { status: 500 });
      }

      console.log(`[2FA OTP] Generated code ${otpCode} for ${cleanEmail}`);

      // Send the email using Resend
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.warn('RESEND_API_KEY is not configured in environment variables.');
        return NextResponse.json({
          twoFactorRequired: true,
          message: '2FA generated successfully (Resend API key missing - code printed to console)',
          debugOtp: otpCode // Exposing OTP in development mode when Resend is unconfigured
        });
      }

      const resend = new Resend(resendApiKey);
      const senderEmail = process.env.SENDER_EMAIL || 'otp@mail.tailora.ng';

      try {
        await resend.emails.send({
          from: `Tailora <${senderEmail}>`,
          to: cleanEmail,
          subject: `${otpCode} is your Tailora 2FA verification code`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <h2 style="color: #121212; font-size: 20px; font-weight: 700; margin-bottom: 8px;">Two-Factor Authentication (2FA) Code</h2>
              <p style="color: #595653; font-size: 14px; line-height: 20px; margin-bottom: 24px;">
                You are logging in to Tailora. Please use the verification code below to complete your sign-in. This code is valid for 10 minutes.
              </p>
              <div style="background-color: #fcf6ec; border: 1px dashed #e7ab79; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
                <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #121212;">${otpCode}</span>
              </div>
              <p style="color: #9ca3af; font-size: 12px; line-height: 18px; margin-top: 24px; border-top: 1px solid #f1f1f2; padding-top: 16px;">
                If you did not attempt to sign in, please change your password immediately to protect your account.
              </p>
            </div>
          `
        });
      } catch (emailErr: any) {
        console.error('Resend 2FA email sending error:', emailErr);
        return NextResponse.json({ error: 'Failed to send 2FA verification email: ' + (emailErr.message || emailErr) }, { status: 500 });
      }

      return NextResponse.json({ twoFactorRequired: true });
    }

    // 2FA not enabled, return session directly
    return NextResponse.json({ twoFactorRequired: false, session });
  } catch (err: any) {
    console.error('Login challenge route error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
