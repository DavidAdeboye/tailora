import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { buildForgotPasswordEmailHtml } from '../../../../lib/forgot-password-email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Initialize Supabase Service Role client to generate recovery link
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceKey) {
      return NextResponse.json({ error: 'Database service key is not configured' }, { status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (url, options) => fetch(url, { ...options, signal: AbortSignal.timeout(8000) })
      }
    });

    // Determine target origin from request (supports localhost & production)
    const origin = req.headers.get('origin') || req.nextUrl.origin;
    
    // Generate the recovery link via admin API
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: cleanEmail,
    });

    if (error) {
      // Don't reveal whether the email exists — always show success
      console.error('generateLink error:', error.message);
      return NextResponse.json({ success: true });
    }

    // Build a DIRECT link to our app with the token_hash in query params.
    // This bypasses Supabase's redirect server entirely, so the link
    // always goes to wherever the user triggered the reset (localhost or prod).
    const tokenHash = data.properties.hashed_token;
    const resetLink = `${origin}/reset-password?token_hash=${encodeURIComponent(tokenHash)}&type=recovery`;

    // Send email using Resend
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const senderEmail = process.env.SENDER_EMAIL_NOREPLY || 'noreply@mail.tailora.ng';

    const result = await resend.emails.send({
      from: `Tailora <${senderEmail}>`,
      to: cleanEmail,
      subject: 'Reset your Tailora password',
      html: buildForgotPasswordEmailHtml({
        recipientEmail: cleanEmail,
        resetLink,
      }),
    });

    if (result.error) {
      throw new Error(result.error.message || JSON.stringify(result.error));
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error('Forgot Password API Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
