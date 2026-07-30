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

    // Verify email format on server-side as well
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    // Determine inviter role and workspaceOwnerId via RPC
    let workspaceOwnerId = user.id;
    let senderRole = 'Owner';

    const { data: teamRoleData, error: teamRoleErr } = await supabase.rpc('get_my_team_role');
    if (!teamRoleErr && teamRoleData && teamRoleData.length > 0) {
      workspaceOwnerId = teamRoleData[0].owner_id;
      senderRole = teamRoleData[0].role;
    }

    // Block non-Admins/non-Owners from inviting
    if (senderRole !== 'Owner' && senderRole !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden: Only workspace Owners or Admins can invite team members.' }, { status: 403 });
    }

    // Initialize Supabase Service Role client to bypass RLS for insertions
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceKey) {
      return NextResponse.json({ error: 'Database service key is not configured' }, { status: 500 });
    }
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Check existing member and fetch inviter profile in parallel using service client
    const [existingMemberRes, inviterProfileRes] = await Promise.all([
      supabaseService
        .from('team_members')
        .select('id, status')
        .eq('user_id', workspaceOwnerId)
        .eq('email', cleanEmail)
        .maybeSingle(),
      supabaseService
        .from('profiles')
        .select('full_name, business_name, email')
        .eq('id', workspaceOwnerId)
        .maybeSingle()
    ]);

    if (existingMemberRes.error) {
      return NextResponse.json({ error: 'Failed to verify existing team membership' }, { status: 500 });
    }

    const inviterProfile = inviterProfileRes.data;

    // Block inviting the workspace owner email
    if (inviterProfile?.email && cleanEmail === inviterProfile.email.trim().toLowerCase()) {
      return NextResponse.json(
        { error: 'This email is already an active member of your team.' },
        { status: 400 }
      );
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

    const inviterName = inviterProfile?.full_name || user.email || 'Your team admin';
    const businessName = inviterProfile?.business_name || 'their workspace';

    // Generate secure unique token
    const inviteToken = crypto.randomUUID();

    // Perform database inserts using service client
    const [inviteInsertRes, teamInsertRes] = await Promise.all([
      supabaseService
        .from('invitations')
        .insert({
          invited_by: workspaceOwnerId, // Link invite to the workspace owner
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
      supabaseService
        .from('team_members')
        .insert({
          user_id: workspaceOwnerId, // Link team member to the workspace owner
          name,
          email: cleanEmail,
          role,
          status: 'Pending',
          joined_date: `Joined ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
          avatar_url: '/Ellipse2481.png',
        })
    ]);

    if (inviteInsertRes.error || teamInsertRes.error) {
      // Cleanup using service client
      await Promise.all([
        supabaseService.from('invitations').delete().eq('token', inviteToken),
        supabaseService.from('team_members').delete().eq('user_id', workspaceOwnerId).eq('email', cleanEmail)
      ]);
      const errorMsg = inviteInsertRes.error?.message || teamInsertRes.error?.message || 'Database insert failed';
      return NextResponse.json({ error: 'Failed to complete invitation setup: ' + errorMsg }, { status: 500 });
    }

    // Both DB writes succeeded. Trigger the cron route in the background
    // to send the email immediately without blocking the response.
    const cronSecret = process.env.CRON_SECRET;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    if (cronSecret) {
      fetch(`${appUrl}/api/cron/send-invites`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cronSecret}`
        }
      }).catch(err => console.error('Failed to trigger cron inline:', err));
    }

    return NextResponse.json({ success: true, emailQueued: true });

  } catch (err: any) {
    console.error('Invite API Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
