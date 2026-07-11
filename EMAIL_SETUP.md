# Email Service Integration and Setup

This document provides a guide to the email systems and workflows used in the Tailora application, detailing the files involved, environment configurations, and instructions for setting up email services in production.

---

## 1. Core Technologies & Services

The application uses two services to handle emails:

1. **Resend Email Service:**
   * Used for sending transactional team invitation emails.
   * Leverages the `resend` NPM package (configured as a dependency in [package.json](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/package.json)).
2. **Supabase Auth:**
   * Handles core authentication emails (signup verification, email updates, and password resets) directly via Supabase's identity manager.

---

## 2. Key Files & Integration Points

### 📩 Team Invitations Flow
* **Backend API Route:** [route.ts](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/app/api/invite/route.ts)
  * Processes team invitation requests.
  * Checks for `process.env.RESEND_API_KEY`. If configured, it instantiates `new Resend(resendApiKey)` and calls `resend.emails.send(...)` to send a styled HTML invitation to the recipient.
  * **Fallback Behavior:** If the Resend API key is missing, the endpoint logs a warning and returns the signup link in the response, allowing the client to copy it manually.
* **Invitation UI Modal:** [InviteTeamMemberModal.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/components/InviteTeamMemberModal.tsx)
  * Collects the target member's name, email, and role and POSTs it to `/api/invite`. Shows the generated signup link on success.
* **Signup / Verification Page:** [page.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/app/signup/page.tsx)
  * Triggered when clicking the link sent via email (e.g. `/signup?token=...`). Verifies the token and registers the member.

### 🔐 Auth & Account Emails
* **User Registration:** [page.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/app/signup/page.tsx)
  * Calls `supabase.auth.signUp(...)` which initiates Supabase's automatic registration email sequence.
* **Email Changes:** [SettingsPage.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/components/SettingsPage.tsx)
  * Calls `supabase.auth.updateUser({ email })` which sends out verification links to the new email address.
* **Password Updates:** [Changepasswordmodal.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/components/Changepasswordmodal.tsx)
  * Triggers password modification in Supabase auth using `supabase.auth.updateUser({ password })`.

---

## 3. Environment Configurations

All email credentials and local test variables are defined in [.env.local](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/.env.local):

* **Resend API Key:** Configured under `RESEND_API_KEY` (currently commented out).
* **Resend SMTP Configuration:** Details for SMTP connections are documented (Host: `smtp.resend.com`, Port: `465`, Username: `resend`).
* **Test Credentials:** Placeholders for Mailtrap (sandbox testing) and Gmail App Passwords exist for developer reference.

---

## 4. Production Checklist & Setup Tasks

To move the application to production, complete the following setup:

### Step 1: Verify Domain on Resend
By default, Resend restricts emails to the registered account owner using the `onboarding@resend.dev` sender address.
1. Add your custom domain (e.g., `yourdomain.com`) in the Resend Dashboard.
2. Add the required DNS records (DKIM, SPF) to your domain registrar.
3. Update the `from` email address in [route.ts](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/app/api/invite/route.ts) to a verified address (e.g., `Tailora <no-reply@yourdomain.com>`).

### Step 2: Set environment variables
Ensure that `RESEND_API_KEY` is set in your production hosting environment (e.g., Vercel, Netlify) to enable team member email invitations.

### Step 3: Setup Custom SMTP in Supabase
Supabase has a low rate limit for default transactional emails (3 per hour). To use your verified domain for user verification and password resets:
1. Go to the Supabase Dashboard -> **Project Settings** -> **Auth** -> **SMTP**.
2. Enable custom SMTP.
3. Fill in the Resend SMTP details (host: `smtp.resend.com`, port: `465` or `587`, username: `resend`, password: `[your_resend_api_key]`).
4. Set the sender email to your verified domain email.
