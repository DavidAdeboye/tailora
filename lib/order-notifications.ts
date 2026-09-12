import { Resend } from 'resend';

export interface OrderNotificationData {
  orderId: string;
  clientName: string;
  phone?: string;
  outfit?: string;
  collectionDate?: string;
  assignedTeam?: string[];
  status: string;
  daysDiff: number;
}

/**
 * Builds HTML email body for Assigned Worker when order is due in 3 days (or due soon).
 */
export function buildDueSoonWorkerEmailHtml({
  workerName,
  clientName,
  phone,
  outfit,
  collectionDate,
  assignedTeam,
  businessName,
  daysLeftText,
}: {
  workerName: string;
  clientName: string;
  phone?: string;
  outfit?: string;
  collectionDate?: string;
  assignedTeam?: string[];
  businessName: string;
  daysLeftText: string;
}): string {
  const year = new Date().getFullYear();
  const teamListStr = assignedTeam && assignedTeam.length > 0 ? assignedTeam.join(', ') : 'Unassigned';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Action Required: Order Due Soon</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#121212;padding:28px 40px;text-align:center;">
              <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Tailora</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 32px;">
              <div style="display:inline-block;padding:4px 12px;background:#FEF0C7;border-radius:12px;margin-bottom:16px;">
                <span style="font-size:12px;font-weight:700;color:#B54708;text-transform:uppercase;letter-spacing:0.05em;">⚡ Due Soon Alert</span>
              </div>
              <h1 style="margin:0 0 16px 0;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">
                Order for ${clientName} is ${daysLeftText}
              </h1>

              <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
                Hello <strong>${workerName}</strong>, this is an automated notification from <strong>${businessName}</strong>. You are assigned to the following order which is due for delivery soon:
              </p>

              <!-- Order Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F9FAFB;border:1px solid #EAECF0;border-radius:12px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;width:120px;"><strong>Client:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#101828;font-weight:600;">${clientName}</td>
                </tr>
                ${outfit ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Outfit Type:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#101828;font-weight:600;">${outfit}</td>
                </tr>` : ''}
                ${collectionDate ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Delivery Date:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#D97706;font-weight:700;">${collectionDate}</td>
                </tr>` : ''}
                ${phone ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Phone:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#101828;">${phone}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Assigned Team:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#344054;">${teamListStr}</td>
                </tr>
              </table>

              <p style="margin:0 0 28px 0;font-size:14px;color:#475467;line-height:1.6;">
                Please ensure all fittings, finishing, and packaging are completed prior to the collection date.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background-color:#F9FAFB;border-top:1px solid #EAECF0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#98A2B3;">
                &copy; ${year} ${businessName || 'Tailora Workspace'}. Automatic notification.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Builds HTML email body for Workspace Owner when an order is overdue by 3+ days.
 */
export function buildOverdueOwnerEmailHtml({
  ownerName,
  clientName,
  phone,
  outfit,
  collectionDate,
  assignedTeam,
  businessName,
  daysPastText,
}: {
  ownerName: string;
  clientName: string;
  phone?: string;
  outfit?: string;
  collectionDate?: string;
  assignedTeam?: string[];
  businessName: string;
  daysPastText: string;
}): string {
  const year = new Date().getFullYear();
  const teamListStr = assignedTeam && assignedTeam.length > 0 ? assignedTeam.join(', ') : 'Unassigned';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Overdue Alert: Order Uncollected</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#121212;padding:28px 40px;text-align:center;">
              <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Tailora</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 32px;">
              <div style="display:inline-block;padding:4px 12px;background:#FEE4E2;border-radius:12px;margin-bottom:16px;">
                <span style="font-size:12px;font-weight:700;color:#D92D20;text-transform:uppercase;letter-spacing:0.05em;">🚨 Overdue Order Alert</span>
              </div>
              <h1 style="margin:0 0 16px 0;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">
                Order for ${clientName} is ${daysPastText} overdue
              </h1>

              <p style="margin:0 0 20px 0;font-size:15px;color:#374151;line-height:1.6;">
                Hello <strong>${ownerName}</strong>, the delivery date for <strong>${clientName}</strong> has passed by 3 or more days and the order is not marked as collected.
              </p>

              <!-- Order Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFF5F5;border:1px solid #FECDCA;border-radius:12px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;width:120px;"><strong>Client:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#101828;font-weight:600;">${clientName}</td>
                </tr>
                ${outfit ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Outfit Type:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#101828;font-weight:600;">${outfit}</td>
                </tr>` : ''}
                ${collectionDate ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Delivery Date:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#D92D20;font-weight:700;">${collectionDate} (Overdue)</td>
                </tr>` : ''}
                ${phone ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Phone:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#101828;">${phone}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#667085;"><strong>Assigned Team:</strong></td>
                  <td style="padding:4px 0;font-size:14px;color:#344054;">${teamListStr}</td>
                </tr>
              </table>

              <p style="margin:0 0 28px 0;font-size:14px;color:#475467;line-height:1.6;">
                Please review this order on your Tailora Dashboard or follow up with the assigned team to update its status or arrange collection.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background-color:#F9FAFB;border-top:1px solid #EAECF0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#98A2B3;">
                &copy; ${year} ${businessName || 'Tailora'}. Workspace owner alert.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
