import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    
    // Create Supabase client with the user's JWT token so that RLS is applied
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    // Get inviter user details
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
      return NextResponse.json({ error: 'Unauthorized: ' + (userErr?.message || 'No active session') }, { status: 401 });
    }
    
    // Read request body
    const { name, email, role } = await req.json();
    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Missing name, email, or role' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if the user is already in team_members for this owner
    const { data: existingMember, error: checkErr } = await supabase
      .from('team_members')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('email', cleanEmail)
      .maybeSingle();

    if (existingMember) {
      if (existingMember.status === 'Active') {
        return NextResponse.json({ error: 'This email is already an active member of your team.' }, { status: 400 });
      } else {
        return NextResponse.json({ error: 'An invitation has already been sent to this email address.' }, { status: 400 });
      }
    }
    
    // Generate secure unique token
    const inviteToken = crypto.randomUUID();
    
    // 1. Insert into invitations
    const { error: inviteErr } = await supabase
      .from('invitations')
      .insert({
        invited_by: user.id,
        email: cleanEmail,
        role: role,
        token: inviteToken
      });
      
    if (inviteErr) {
      return NextResponse.json({ error: 'Failed to create invitation: ' + inviteErr.message }, { status: 500 });
    }
    
    // 2. Insert into team_members
    const { error: teamErr } = await supabase
      .from('team_members')
      .insert({
        user_id: user.id,
        name: name,
        email: cleanEmail,
        role: role,
        status: 'Pending',
        joined_date: `Joined ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
        avatar_url: '/Ellipse2481.png'
      });
      
    if (teamErr) {
      // Clean up the invitation if team member insertion failed
      await supabase.from('invitations').delete().eq('token', inviteToken);
      return NextResponse.json({ error: 'Failed to add team member: ' + teamErr.message }, { status: 500 });
    }
    
    // 3. Send email using Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY;
    const origin = req.nextUrl.origin;
    const signupLink = `${origin}/signup?token=${inviteToken}`;
    
    let emailSent = false;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
        await resend.emails.send({
          from: `Tailora <${senderEmail}>`,
          to: email,
          subject: 'You have been invited to join Tailora!',
          html: `
            <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #1a202c;">Join your team on Tailora</h2>
              <p>Hello ${name},</p>
              <p>You have been invited to join a business workspace on Tailora as a <strong>${role}</strong>.</p>
              <div style="margin: 24px 0;">
                <a href="${signupLink}" style="background-color: #121212; color: #ffffff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 500; display: inline-block;">Accept Invitation</a>
              </div>
              <p style="color: #718096; font-size: 14px;">If the button doesn't work, copy and paste this link in your browser:</p>
              <p style="color: #718096; font-size: 14px; word-break: break-all;">${signupLink}</p>
            </div>
          `
        });
        emailSent = true;
      } catch (err: any) {
        console.error("Resend email sending error:", err);
      }
    }
    
    return NextResponse.json({
      success: true,
      signupLink,
      emailSent
    });
    
  } catch (err: any) {
    console.error("Invite API Route Error:", err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
