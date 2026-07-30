import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { buildInviteEmailHtml } from '../../../../lib/invite-email';

/**
 * Cron Job — runs every minute (triggered via an external scheduler like cron-job.org).
 * Picks up pending invite emails from the `invitations` table and sends
 * them via Resend, respecting the 10 req/sec rate limit with 110ms gaps.
 *
 * Retry schedule (exponential backoff):
 *   Attempt 1 fail → retry in  1 min
 *   Attempt 2 fail → retry in  5 min
 *   Attempt 3 fail → retry in 30 min
 *   Attempt 4 fail → retry in  2 hr
 *   Attempt 5 fail → mark as 'failed' (dead letter)
 */

const BATCH_SIZE = 50;          // max invites processed per cron run
const SEND_INTERVAL_MS = 110;   // 110ms gap = ~9 sends/sec (safely under 10/sec)
const MAX_ATTEMPTS = 5;

// Seconds to wait before the next retry, indexed by the attempt number that just failed
const BACKOFF_SECONDS = [60, 300, 1800, 7200]; // 1min, 5min, 30min, 2hr

// Vercel invokes cron jobs via GET
export async function GET(req: NextRequest) {
  // ── Auth guard ────────────────────────────────────────────────────────────
  // Vercel automatically appends `Authorization: Bearer <CRON_SECRET>` to
  // cron-triggered requests when CRON_SECRET is set in the project env vars.
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('[cron/send-invites] Unauthorized request rejected');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[cron/send-invites] RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[cron/send-invites] SUPABASE_SERVICE_ROLE_KEY is not set');
    return NextResponse.json({ error: 'Database service key not configured' }, { status: 500 });
  }

  // ── Supabase service-role client (bypasses RLS) ───────────────────────────
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  const senderEmail = process.env.SENDER_EMAIL_INVITES || 'invites@mail.tailora.ng';

  // Derive app origin (used for signup links in emails)
  // In production this is the deployed URL; locally it's http://localhost:3000
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;

  // ── Fetch pending batch ───────────────────────────────────────────────────
  const now = new Date().toISOString();

  const { data: pendingInvites, error: fetchErr } = await supabase
    .from('invitations')
    .select('id, email, token, role, recipient_name, inviter_name, inviter_business, send_attempts')
    .eq('email_status', 'pending')
    .lte('next_attempt_at', now)
    .lt('send_attempts', MAX_ATTEMPTS)
    .order('next_attempt_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchErr) {
    console.error('[cron/send-invites] Failed to fetch pending invites:', fetchErr);
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }

  if (!pendingInvites || pendingInvites.length === 0) {
    console.log('[cron/send-invites] No pending invites — done');
    return NextResponse.json({ processed: 0, sent: 0, failed: 0 });
  }

  // ── Optimistic lock ───────────────────────────────────────────────────────
  // Push next_attempt_at forward by 2 minutes so that if this cron run takes
  // a while and the next minute's cron fires early, it won't double-send.
  const lockUntil = new Date(Date.now() + 2 * 60 * 1000).toISOString();
  const ids = pendingInvites.map((i) => i.id);
  await supabase
    .from('invitations')
    .update({ next_attempt_at: lockUntil })
    .in('id', ids)
    .eq('email_status', 'pending');

  // ── Process each invite ───────────────────────────────────────────────────
  let sent = 0;
  let failed = 0;

  for (let idx = 0; idx < pendingInvites.length; idx++) {
    const invite = pendingInvites[idx];

    const inviterName   = invite.inviter_name     || 'Your team admin';
    const businessName  = invite.inviter_business  || 'their workspace';
    const recipientName = invite.recipient_name    || invite.email;
    const signupLink    = `${appUrl}/signup?token=${invite.token}`;

    try {
      const result = await resend.emails.send({
        from: `Tailora <${senderEmail}>`,
        to: invite.email,
        subject: `${inviterName} invited you to join ${businessName} on Tailora`,
        html: buildInviteEmailHtml({
          recipientName,
          inviterName,
          businessName,
          role: invite.role,
          recipientEmail: invite.email,
          signupLink,
        }),
      });

      if (result.error) {
        // Resend returned a structured error (e.g. 429, domain not verified)
        throw new Error(result.error.message || JSON.stringify(result.error));
      }

      // ── Success ───────────────────────────────────────────────────────────
      await supabase
        .from('invitations')
        .update({
          email_status:   'sent',
          send_attempts:  invite.send_attempts + 1,
          next_attempt_at: new Date().toISOString(),
        })
        .eq('id', invite.id);

      console.log(`[cron/send-invites] ✓ Sent to ${invite.email}`);
      sent++;

    } catch (err: any) {
      // ── Failure / retry ───────────────────────────────────────────────────
      const newAttempts  = invite.send_attempts + 1;
      const isDeadLetter = newAttempts >= MAX_ATTEMPTS;
      const backoffIdx   = Math.min(invite.send_attempts, BACKOFF_SECONDS.length - 1);
      const nextAttempt  = new Date(Date.now() + BACKOFF_SECONDS[backoffIdx] * 1000).toISOString();

      await supabase
        .from('invitations')
        .update({
          email_status:    isDeadLetter ? 'failed' : 'pending',
          send_attempts:   newAttempts,
          next_attempt_at: nextAttempt,
        })
        .eq('id', invite.id);

      console.error(
        `[cron/send-invites] ✗ ${invite.email} attempt ${newAttempts}/${MAX_ATTEMPTS}:`,
        err.message,
        isDeadLetter ? '→ dead-lettered' : `→ retry after ${BACKOFF_SECONDS[backoffIdx]}s`
      );
      failed++;
    }

    // ── Rate-limit throttle: 110ms between sends ≈ 9 req/sec ─────────────
    if (idx < pendingInvites.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, SEND_INTERVAL_MS));
    }
  }

  console.log(
    `[cron/send-invites] Done — ${pendingInvites.length} processed: ${sent} sent, ${failed} failed`
  );
  return NextResponse.json({ processed: pendingInvites.length, sent, failed });
}
