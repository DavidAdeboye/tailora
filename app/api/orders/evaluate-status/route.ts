import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { buildDueSoonWorkerEmailHtml, buildOverdueOwnerEmailHtml } from '../../../../lib/order-notifications';

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    let userId: string | undefined;
    try {
      const body = await req.json();
      userId = body.userId;
    } catch {
      // Body empty or optional
    }

    let query = supabase.from('orders').select('*');
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: orders, error: fetchErr } = await query;
    if (fetchErr) {
      console.error('[evaluate-status] Error fetching orders:', fetchErr);
      return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    }

    if (!orders || orders.length === 0) {
      return NextResponse.json({ evaluatedCount: 0, updatedCount: 0, notificationsSent: 0 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resend = resendApiKey ? new Resend(resendApiKey) : null;
    const senderEmail = process.env.SENDER_EMAIL_INVITES || 'notifications@mail.tailora.ng';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString().split('T')[0];

    let updatedCount = 0;
    let notificationsSent = 0;

    // Cache profile and team members lookups per workspace owner
    const profilesCache: Record<string, any> = {};
    const teamMembersCache: Record<string, any[]> = {};

    for (const order of orders) {
      const rawStatus = (order.status || '').toString().trim();
      const rawStatusType = (order.status_type || '').toString().trim();
      const isCollected = rawStatus.toLowerCase().includes('collected') || rawStatusType.toLowerCase() === 'collected';

      // Rule: Do not auto-change status if order is marked as Collected
      if (isCollected) continue;

      const measurements = order.measurements || {};
      const collectionDateStr = measurements.collectionDate || order.collectionDate;
      if (!collectionDateStr) continue;

      const colDate = new Date(collectionDateStr);
      colDate.setHours(0, 0, 0, 0);

      const diffMs = today.getTime() - colDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      let targetStatus: 'Overdue' | 'Due' | null = null;
      let targetStatusType: 'overdue' | 'due' | null = null;

      if (diffDays >= 3) {
        // Delivery date past by 3+ days and uncollected -> Overdue
        targetStatus = 'Overdue';
        targetStatusType = 'overdue';
      } else if (diffDays >= -3) {
        // Delivery date is within 3 days (or 0-2 days past delivery) -> Due
        targetStatus = 'Due';
        targetStatusType = 'due';
      }

      if (!targetStatus || !targetStatusType) continue;

      const needsDbUpdate = order.status !== targetStatus || order.status_type !== targetStatusType;
      let updatedMeasurements = { ...measurements };

      // Check notification send conditions
      let shouldSendOverdueEmail = false;
      let shouldSendDueEmail = false;

      if (targetStatus === 'Overdue') {
        const lastSentDate = updatedMeasurements.overdue_email_sent_date;
        if (lastSentDate !== todayISO) {
          shouldSendOverdueEmail = true;
        }
      } else if (targetStatus === 'Due') {
        const lastSentDate = updatedMeasurements.due_email_sent_date;
        if (lastSentDate !== todayISO) {
          shouldSendDueEmail = true;
        }
      }

      // Perform Owner email notification for Overdue
      if (shouldSendOverdueEmail && resend) {
        try {
          const ownerId = order.user_id;
          if (!profilesCache[ownerId]) {
            const { data: ownerProfile } = await supabase
              .from('profiles')
              .select('full_name, business_name, email')
              .eq('id', ownerId)
              .maybeSingle();
            profilesCache[ownerId] = ownerProfile || {};
          }
          const ownerProfile = profilesCache[ownerId];
          const ownerEmail = ownerProfile.email;

          if (ownerEmail) {
            const daysPastText = diffDays === 3 ? '3 days' : `${diffDays} days`;
            const assignedTeamArr = Array.isArray(order.assigned_team)
              ? order.assigned_team
              : typeof order.assigned_team === 'string'
              ? JSON.parse(order.assigned_team)
              : [];

            const htmlContent = buildOverdueOwnerEmailHtml({
              ownerName: ownerProfile.full_name || 'Workspace Owner',
              clientName: order.client_name || 'Valued Client',
              phone: order.phone,
              outfit: order.outfit,
              collectionDate: collectionDateStr,
              assignedTeam: assignedTeamArr,
              businessName: ownerProfile.business_name || 'Tailora Workspace',
              daysPastText,
            });

            await resend.emails.send({
              from: `Tailora Alerts <${senderEmail}>`,
              to: [ownerEmail],
              subject: `🚨 OVERDUE ALERT: Order for ${order.client_name} is ${daysPastText} past delivery date`,
              html: htmlContent,
            });

            updatedMeasurements.overdue_email_sent_date = todayISO;
            updatedMeasurements.overdue_email_sent_at = new Date().toISOString();
            notificationsSent++;
          }
        } catch (emailErr) {
          console.error(`[evaluate-status] Error sending overdue email for order ${order.id}:`, emailErr);
        }
      }

      // Perform Worker email notification for Due Soon
      if (shouldSendDueEmail && resend) {
        try {
          const ownerId = order.user_id;
          if (!teamMembersCache[ownerId]) {
            const { data: members } = await supabase
              .from('team_members')
              .select('name, email, role')
              .eq('user_id', ownerId);
            teamMembersCache[ownerId] = members || [];
          }
          if (!profilesCache[ownerId]) {
            const { data: ownerProfile } = await supabase
              .from('profiles')
              .select('full_name, business_name, email')
              .eq('id', ownerId)
              .maybeSingle();
            profilesCache[ownerId] = ownerProfile || {};
          }

          const ownerProfile = profilesCache[ownerId];
          const teamMembers = teamMembersCache[ownerId];
          const assignedTeamArr: string[] = Array.isArray(order.assigned_team)
            ? order.assigned_team
            : typeof order.assigned_team === 'string'
            ? JSON.parse(order.assigned_team)
            : [];

          const daysLeft = -diffDays;
          let daysLeftText = 'due soon';
          if (daysLeft > 0) {
            daysLeftText = `due in ${daysLeft} day${daysLeft > 1 ? 's' : ''}`;
          } else if (daysLeft === 0) {
            daysLeftText = 'due today';
          } else {
            daysLeftText = `due (past delivery date by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) > 1 ? 's' : ''})`;
          }

          // Match workers by name
          const recipientEmails: { email: string; name: string }[] = [];

          if (assignedTeamArr.length > 0) {
            for (const assignedName of assignedTeamArr) {
              const matchedMember = teamMembers.find(
                m => m.name.toLowerCase().trim() === assignedName.toLowerCase().trim()
              );
              if (matchedMember && matchedMember.email) {
                recipientEmails.push({ email: matchedMember.email, name: matchedMember.name });
              }
            }
          }

          // Fallback: If no assigned worker email found, notify workspace owner
          if (recipientEmails.length === 0 && ownerProfile.email) {
            recipientEmails.push({ email: ownerProfile.email, name: ownerProfile.full_name || 'Team Lead' });
          }

          for (const recipient of recipientEmails) {
            const htmlContent = buildDueSoonWorkerEmailHtml({
              workerName: recipient.name,
              clientName: order.client_name || 'Valued Client',
              phone: order.phone,
              outfit: order.outfit,
              collectionDate: collectionDateStr,
              assignedTeam: assignedTeamArr,
              businessName: ownerProfile.business_name || 'Tailora Workspace',
              daysLeftText,
            });

            await resend.emails.send({
              from: `Tailora Alerts <${senderEmail}>`,
              to: [recipient.email],
              subject: `⚡ DUE SOON: Order for ${order.client_name} is ${daysLeftText}`,
              html: htmlContent,
            });
            notificationsSent++;
          }

          updatedMeasurements.due_email_sent_date = todayISO;
          updatedMeasurements.due_email_sent_at = new Date().toISOString();
        } catch (emailErr) {
          console.error(`[evaluate-status] Error sending due soon email for order ${order.id}:`, emailErr);
        }
      }

      // Update DB if status changed or measurement notification timestamps updated
      if (needsDbUpdate || shouldSendOverdueEmail || shouldSendDueEmail) {
        await supabase
          .from('orders')
          .update({
            status: targetStatus,
            status_type: targetStatusType,
            measurements: updatedMeasurements,
            updated_at: new Date().toISOString()
          })
          .eq('id', order.id);

        // Keep clients table synchronized
        if (order.client_id) {
          await supabase
            .from('clients')
            .update({
              status: targetStatus
            })
            .eq('id', order.client_id);
        }

        updatedCount++;
      }
    }

    return NextResponse.json({
      evaluatedCount: orders.length,
      updatedCount,
      notificationsSent,
    });
  } catch (err: any) {
    console.error('[evaluate-status] Unexpected error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
