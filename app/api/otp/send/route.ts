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

    // Create Supabase client with the service or anon key to execute RPC
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    // Save the OTP to the database using the RPC function we created
    const { error: dbErr } = await supabase.rpc('create_signup_otp', {
      p_email: cleanEmail,
      p_otp: otpCode
    });

    if (dbErr) {
      console.error('Database OTP insertion error:', dbErr);
      return NextResponse.json({ error: 'Failed to generate verification code: ' + dbErr.message }, { status: 500 });
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
    const senderEmail = process.env.SENDER_EMAIL || 'otp@mail.tailora.ng';

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
