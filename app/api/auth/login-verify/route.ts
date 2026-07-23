import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.email || body.phone || '').trim().toLowerCase();
    const { password, otp } = body;

    if (!identifier || !password || !otp) {
      return NextResponse.json({ error: 'Email/Phone, password, and verification code are required' }, { status: 400 });
    }

    const cleanEmail = identifier;
    const cleanOtp = (otp || '').toString().trim();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // 1. Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    // 2. Verify OTP code using the RPC
    const { data: isValid, error: dbErr } = await supabase.rpc('verify_signup_otp', {
      p_email: cleanEmail,
      p_otp: cleanOtp
    });

    if (dbErr) {
      console.error('Database OTP verification error on login verify:', dbErr);
      return NextResponse.json({ error: 'Failed to verify code: ' + dbErr.message }, { status: 500 });
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
    }

    // 3. OTP is valid, perform full sign in to get user session
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });

    if (authError || !authData?.session) {
      return NextResponse.json({ error: authError?.message || 'Failed to authenticate after OTP verification' }, { status: 401 });
    }

    return NextResponse.json({ success: true, session: authData.session });
  } catch (err: any) {
    console.error('Login verify route error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
