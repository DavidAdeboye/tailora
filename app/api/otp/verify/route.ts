import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and verification code are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    // Create Supabase client to execute the RPC
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (url, options) => fetch(url, { ...options, signal: AbortSignal.timeout(15000) })
      }
    });

    // Verify the OTP via DB RPC function with retry on Gateway Timeout
    let isValid = false;
    let dbErr: any = null;

    for (let attempt = 1; attempt <= 2; attempt++) {
      const { data, error } = await supabase.rpc('verify_signup_otp', {
        p_email: cleanEmail,
        p_otp: cleanOtp
      });
      isValid = !!data;
      dbErr = error;
      if (!error) break;

      if (attempt === 1 && (error.message?.includes('Gateway Timeout') || (error as any).status === 504)) {
        console.warn('[OTP Verify] Supabase returned Gateway Timeout on attempt 1. Retrying in 2 seconds...');
        await new Promise((res) => setTimeout(res, 2000));
      }
    }

    if (dbErr) {
      console.error('Database OTP verification error:', dbErr);
      const isTimeout = dbErr.message?.includes('Gateway Timeout') || (dbErr as any).status === 504;
      const errorMessage = isTimeout
        ? 'Database connection timed out (Gateway Timeout). Your Supabase project may be paused in the Supabase Dashboard.'
        : 'Failed to verify code: ' + dbErr.message;
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('OTP verify route error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
