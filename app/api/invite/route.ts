import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

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
        autoRefreshToken: false,
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
      return NextResponse.json(
        { error: 'Unauthorized: ' + (userErr?.message || 'No active session') },
        { status: 401 }
      );
    }

    // Read request body
    const { name, email, role } = await req.json();
    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Missing name, email, or role' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Fetch inviter profile and check existing member in parallel
    const [existingMemberRes, inviterProfileRes] = await Promise.all([
      supabase
        .from('team_members')
        .select('id, status')
        .eq('user_id', user.id)
        .eq('email', cleanEmail)
        .maybeSingle(),
      supabase
        .from('profiles')
        .select('full_name, business_name')
        .eq('id', user.id)
        .maybeSingle()
    ]);

    if (existingMemberRes.error) {
      return NextResponse.json({ error: 'Failed to verify existing team membership' }, { status: 500 });
    }

    const existingMember = existingMemberRes.data;
    if (existingMember) {
      if (existingMember.status === 'Active') {
        return NextResponse.json(
          { error: 'This email is already an active member of your team.' },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { error: 'An invitation has already been sent to this email address.' },
          { status: 400 }
        );
      }
    }

    const inviterProfile = inviterProfileRes.data;
    const inviterName = inviterProfile?.full_name || user.email || 'Your team admin';
    const businessName = inviterProfile?.business_name || 'their workspace';

    // Generate secure unique token
    const inviteToken = crypto.randomUUID();

    // Perform database inserts in parallel
    const [inviteInsertRes, teamInsertRes] = await Promise.all([
      supabase
        .from('invitations')
        .insert({
          invited_by: user.id,
          email: cleanEmail,
          role,
          token: inviteToken,
          recipient_name: name,
          inviter_name: inviterName,
          inviter_business: businessName,
          email_status: 'pending',
          send_attempts: 0,
          next_attempt_at: new Date().toISOString(),
        }),
      supabase
        .from('team_members')
        .insert({
          user_id: user.id,
          name,
          email: cleanEmail,
          role,
          status: 'Pending',
          joined_date: `Joined ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
          avatar_url: '/Ellipse2481.png',
        })
    ]);

    if (inviteInsertRes.error || teamInsertRes.error) {
      // Cleanup if either insert failed to maintain transactional consistency
      await Promise.all([
        supabase.from('invitations').delete().eq('token', inviteToken),
        supabase.from('team_members').delete().eq('user_id', user.id).eq('email', cleanEmail)
      ]);
      const errorMsg = inviteInsertRes.error?.message || teamInsertRes.error?.message || 'Database insert failed';
      return NextResponse.json({ error: 'Failed to complete invitation setup: ' + errorMsg }, { status: 500 });
    }

    // Both DB writes succeeded. Email will be picked up and sent by the
    // background cron job (/api/cron/send-invites) — no Resend call here.
    return NextResponse.json({ success: true, emailQueued: true });

  } catch (err: any) {
    console.error('Invite API Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
