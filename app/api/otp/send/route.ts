import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate a random 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create Supabase client with service role key (preferred for server-side RPC) or anon key fallback
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (url, options) => fetch(url, { ...options, signal: AbortSignal.timeout(15000) })
      }
    });

    // Save the OTP to the database using the RPC function with retry on Gateway Timeout
    let dbErr: any = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      const { error } = await supabase.rpc('create_signup_otp', {
        p_email: cleanEmail,
        p_otp: otpCode
      });
      dbErr = error;
      if (!error) break;

      if (attempt === 1 && (error.message?.includes('Gateway Timeout') || (error as any).status === 504)) {
        console.warn('[Signup OTP] Supabase returned Gateway Timeout on attempt 1. Retrying in 2 seconds...');
        await new Promise((res) => setTimeout(res, 2000));
      }
    }

    if (dbErr) {
      console.error('Database OTP insertion error:', dbErr);
      const isTimeout = dbErr.message?.includes('Gateway Timeout') || (dbErr as any).status === 504;
      const errorMessage = isTimeout
        ? 'Database connection timed out (Gateway Timeout). Your Supabase project may be paused in the Supabase Dashboard.'
        : 'Failed to generate verification code: ' + dbErr.message;
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    console.log(`[Signup OTP] Generated code ${otpCode} for ${cleanEmail}`);

    // Send the email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not configured in environment variables.');
      return NextResponse.json({
        success: true,
        message: 'OTP generated successfully (Resend API key is missing - code printed to server console)',
        debugOtp: otpCode // Exposing OTP in development mode when Resend is unconfigured
      });
    }

    const resend = new Resend(resendApiKey);
    const senderEmail = process.env.SENDER_EMAIL_SECURITY || 'security@mail.tailora.ng';

    try {
      await resend.emails.send({
        from: `Tailora <${senderEmail}>`,
        to: cleanEmail,
        subject: `${otpCode} is your Tailora verification code`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #121212; font-size: 20px; font-weight: 700; margin-bottom: 8px;">Verify your email address</h2>
            <p style="color: #595653; font-size: 14px; line-height: 20px; margin-bottom: 24px;">
              Thank you for registering with Tailora. Please use the verification code below to complete your sign-up process. This code is valid for 10 minutes.
            </p>
            <div style="background-color: #fcf6ec; border: 1px dashed #e7ab79; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
              <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #121212;">${otpCode}</span>
            </div>
            <p style="color: #9ca3af; font-size: 12px; line-height: 18px; margin-top: 24px; border-top: 1px solid #f1f1f2; padding-top: 16px;">
              If you did not request this verification code, please ignore this email.
            </p>
          </div>
        `
      });
    } catch (emailErr: any) {
      console.error('Resend email sending error:', emailErr);
      return NextResponse.json({ error: 'Failed to send verification email: ' + (emailErr.message || emailErr) }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('OTP send route error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
