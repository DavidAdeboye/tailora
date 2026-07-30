import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    // 1. Get sender details
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
      return NextResponse.json({ error: 'Unauthorized: ' + (userErr?.message || 'No active session') }, { status: 401 });
    }

    // 2. Read request body
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 3. Determine workspaceOwnerId and sender's role
    let workspaceOwnerId = user.id;
    let senderRole = 'Owner';

    const { data: teamRoleData, error: teamRoleErr } = await supabase.rpc('get_my_team_role');
    if (!teamRoleErr && teamRoleData && teamRoleData.length > 0) {
      workspaceOwnerId = teamRoleData[0].owner_id;
      senderRole = teamRoleData[0].role;
    }

    // Verify sender is Owner or Admin
    if (senderRole !== 'Owner' && senderRole !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden: Only workspace Owners or Admins can resend invitations.' }, { status: 403 });
    }

    // Initialize Supabase Service Role client to bypass RLS for mutations
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceKey) {
      return NextResponse.json({ error: 'Database service key is not configured' }, { status: 500 });
    }
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 4. Update the invitation record using Service Client
    const { data: updatedData, error: updateErr } = await supabaseService
      .from('invitations')
      .update({
        email_status: 'pending',
        send_attempts: 0,
        next_attempt_at: new Date().toISOString(),
      })
      .eq('invited_by', workspaceOwnerId)
      .eq('email', cleanEmail)
      .select('id')
      .maybeSingle();

    if (updateErr) {
      return NextResponse.json({ error: 'Failed to update invitation: ' + updateErr.message }, { status: 500 });
    }

    if (!updatedData) {
      return NextResponse.json({ error: 'No pending invitation found for this email address.' }, { status: 404 });
    }

    // 5. Trigger the cron route in the background
    const cronSecret = process.env.CRON_SECRET;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    if (cronSecret) {
      fetch(`${appUrl}/api/cron/send-invites`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${cronSecret}` }
      }).catch(err => console.error('Failed to trigger cron inline:', err));
    }

    return NextResponse.json({ success: true, emailQueued: true });

  } catch (err: any) {
    console.error('Resend Invite API Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
