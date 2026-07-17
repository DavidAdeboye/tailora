/**
 * Builds the branded HTML body for a Tailora team invitation email.
 * Kept in a shared module so both /api/invite (future preview) and
 * the /api/cron/send-invites worker use the exact same template.
 */
export function buildInviteEmailHtml({
  recipientName,
  inviterName,
  businessName,
  role,
  recipientEmail,
  signupLink,
}: {
  recipientName: string;
  inviterName: string;
  businessName: string;
  role: string;
  recipientEmail: string;
  signupLink: string;
}): string {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're invited to join ${businessName} on Tailora</title>
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
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px 0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Team Invitation</p>
              <h1 style="margin:0 0 24px 0;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">
                ${inviterName} invited you to join ${businessName}
              </h1>

              <p style="margin:0 0 16px 0;font-size:15px;color:#374151;line-height:1.6;">Hi ${recipientName},</p>
              <p style="margin:0 0 28px 0;font-size:15px;color:#374151;line-height:1.6;">
                <strong>${inviterName}</strong> has added you to their team on Tailora as a <strong>${role}</strong>.
                Click the button below to accept your invitation and set up your account.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#121212;border-radius:999px;">
                    <a href="${signupLink}"
                       style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:-0.1px;">
                      Accept Invitation &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.5;">
                This invitation was sent to <strong>${recipientEmail}</strong>. If you weren't expecting this, you can safely ignore it.
              </p>
            </td>
          </tr>

          <!-- Fallback link -->
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0 0 4px 0;font-size:12px;color:#d1d5db;">Or copy this link into your browser:</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;word-break:break-all;">${signupLink}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; ${year} Tailora. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
