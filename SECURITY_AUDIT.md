# Security Audit — Tailora

Date: 2026-07-07
Author: Automated security review (assistant)

## Quick executive summary
- I reviewed the repository (public files including README, SUPABASE_INTEGRATION.md, package.json, lib/supabase.ts, middleware.ts, app/api/invite/route.ts, components/OrderCreationFlow.tsx, and other top-level files) and found several security issues across configuration, auth flows, file uploads, and error handling.
- Highest-risk issues: exposure/misuse of public environment variables for server-side actions, missing/untested Supabase Row Level Security (RLS) policies, and unsafe public file uploads.

## Critical findings (what and why)
1. Public environment variables used for server-side operations
   - Files: `lib/supabase.ts`, `app/api/invite/route.ts`
   - Issue: The project uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client-visible env names) inside server-side routes. NEXT_PUBLIC_* env vars are bundled to the client and are not secret. Using them for any server-side privileged operation or as the primary auth key risks accidental exposure and makes it easier for attackers to misuse the project.
   - Risk: High — secret leakage and improper privilege assumptions.

2. Row Level Security (RLS) assumptions without verification or tests
   - Files: `SUPABASE_INTEGRATION.md` and code that constructs Supabase clients and relies on RLS (invite route uses anon key + Authorization header to rely on RLS behavior).
   - Issue: RLS must be correctly enabled and policies must explicitly enforce owner-only access (e.g., `user_id = auth.uid()`), role checks and restrictions on inserts/updates/deletes. The code assumes RLS is authoritative — if policies are missing/misconfigured, anon keys can read/modify data.
   - Risk: High — data exposure and privilege escalation.

3. Public object storage and unsafe filename usage
   - Files: `components/OrderCreationFlow.tsx` (uploads to `reference-images` bucket and uses `getPublicUrl`)
   - Issue: Files are uploaded using or derived from `file.name`, and stored in a public bucket. This can leak PII/PHI or proprietary images. Using original names may allow collisions, path-traversal-like issues, or injection of unexpected characters. No server-side validation of types/sizes is evident.
   - Risk: High/Medium — information leakage, data poisoning, DoS via large files.

4. Verbose error returns and logging
   - Files: `app/api/invite/route.ts` and other API routes
   - Issue: DB errors (inviteErr.message, teamErr.message) and large console.error outputs may leak internal schema, query details, or implementation info to clients or logs that might be accessible.
   - Risk: Medium — information disclosure aiding attackers.

5. Cookie and token handling in middleware
   - Files: `middleware.ts` (reads `sb-access-token` cookie)
   - Issue: The middleware assumes cookie-based tokens. If those cookies are not set with `HttpOnly`, `Secure`, `SameSite` attributes, they may be vulnerable to XSS/CSRF. No evidence in repo of cookie creation flags.
   - Risk: Medium — session theft or CSRF.

6. Weak input validation on endpoints
   - Files: `app/api/invite/route.ts` (checks presence of name/email/role only)
   - Issue: No format/length checks for email/name/role, no whitelist for role values, and no rate limiting. HTML email templating directly interpolates unvalidated values.
   - Risk: Medium — injection, abuse, or malformed data stored in DB.

7. Possible accidental secret exposure in history
   - Files: not obvious in checked files, but repository-wide secret scan is required.
   - Issue: No evidence of secret scanning in CI or pre-commit; accidental commits may exist in history.
   - Risk: Unknown — treat as high until scanned.

## Prioritized remediation plan (step-by-step)
Priority: HIGH
- A1 — Move server-side keys out of NEXT_PUBLIC_ env names
  - Action: Replace use of NEXT_PUBLIC_* for server-only operations. Use `SUPABASE_URL`, `SUPABASE_ANON_KEY` for server envs where appropriate, and store any privileged key (service_role key) in a non-public env (`SUPABASE_SERVICE_ROLE_KEY`) only accessible to server code.
  - Code change example: update `lib/supabase.ts` usage patterns so that client-side code imports a client created with anon key (via runtime code that runs in the browser), while server routes that require elevated privileges must import a service client that uses the service role key from a non-public env.

- A2 — Audit and enforce Supabase RLS for every table
  - Action: Enable RLS and add explicit policies for `profiles`, `clients`, `orders`, `team_members`, `invitations`, `workspace_settings`. Add tests that attempt unauthorized reads/writes and assert failure.
  - Policy examples: `using (auth.role() = 'authenticated')` and `policy for SELECT on clients using (user_id = auth.uid())`.

- A3 — Make uploads private and sanitize filenames
  - Action: Change `reference-images` (and other buckets) to private. Store uploaded objects with server-generated UUID filenames plus a validated extension. Serve images via short-lived signed URLs when needed.
  - Add server-side validation: MIME type check, max file size, and optional content scanning.

Priority: MEDIUM
- B1 — Sanitize error responses
  - Action: Return generic user-facing errors ("An internal error occurred") and record detailed errors in secure logs (structured logging). Avoid forwarding DB error messages to clients.

- B2 — Strengthen token/cookie security
  - Action: Ensure cookies are set with `HttpOnly`, `Secure`, appropriate `SameSite`, and reasonable expiration. If using JWT in Authorization headers, ensure CSRF protections for unsafe methods.

- B3 — Input validation and rate limiting
  - Action: Validate emails, names, and roles server-side (use a small validation library or regex; enforce min/max lengths). Add rate limiting (per-IP or per-user) for suspicious endpoints like invite creation.

Priority: LOW / Ongoing
- C1 — Add secret-scanning and dependency audits to CI (e.g., GitHub Actions: truffleHog, GitLeaks; npm audit and dependabot).
- C2 — Add SAST and linter rules to catch insecure patterns.
- C3 — Add monitoring/alerting for abnormal access patterns, failed auth attempts, and unusual upload volume.

## Concrete code & configuration suggestions (examples)
1) Generate safe upload filenames (server-side)

```ts
// pseudo-code (server-side)
import { v4 as uuidv4 } from 'uuid';
function safeFilename(originalName: string) {
  const ext = (originalName.split('.').pop() || '').toLowerCase();
  const allowed = ['jpg','jpeg','png','webp','pdf'];
  if (!allowed.includes(ext)) throw new Error('Invalid file type');
  return `${uuidv4()}.${ext}`;
}
```

2) Use private bucket + signed URL (Supabase example)

```ts
// server: upload to private bucket
await supabase.storage.from('reference-images-private').upload(safeName, fileStream, { contentType });

// server: create signed url for download
const { data } = await supabase.storage.from('reference-images-private').createSignedUrl(safeName, 60); // 60s
return data.signedUrl;
```

3) Sanitize errors returned to clients

```ts
// Instead of: return NextResponse.json({ error: inviteErr.message }, { status: 500 });
console.error('Invite error:', inviteErr); // internal log
return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
```

4) Example RLS policy outline (SQL)

```sql
-- example: allow a user to select rows where user_id matches
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clients_select_by_owner" ON clients
  FOR SELECT USING (user_id = auth.uid());
```

5) Store invitation tokens hashed

- When creating an invitation, compute a secure hash (e.g., HMAC or bcrypt) of the token before storing. Send the raw token in the email link; when the signup endpoint receives the token, hash and compare.

## Quick commands and checks (local)
- npm install && npm audit --fix
- npm run lint
- Search for public env usages:
  - grep -R "NEXT_PUBLIC_SUPABASE" -n
- Run a Git secret scan (locally):
  - git log --pretty=format:%H | while read commit; do git grep -n --cached --no-index "API_KEY|SECRET|PRIVATE" $commit || true; done
- Add GitHub Action or CI job for `gitleaks` or `truffleHog`.

## Files I reviewed (start here)
- README.md
- SUPABASE_INTEGRATION.md
- package.json
- lib/supabase.ts
- app/api/invite/route.ts
- components/OrderCreationFlow.tsx
- middleware.ts

## Suggested next steps / PR checklist (ready-to-use)
- [ ] Replace NEXT_PUBLIC server env usage with server-only env names and document required env vars in `.env.example`.
- [ ] Change storage buckets to private and update upload/download flows to use signed URLs.
- [ ] Sanitize and generate server-side filenames (use UUIDs + validated ext).
- [ ] Hash invitation tokens before storing and implement expiry.
- [ ] Add RLS policies for every table and create automated tests that assert unauthorized access is blocked.
- [ ] Stop returning raw DB errors to clients; implement structured server logging.
- [ ] Add input validation for invite endpoint (email format, length, role whitelist) and add rate limiting.
- [ ] Add secret scanning & dependency audit to CI.

---

If you'd like, I can open a branch and create PR changes for the top-priority items (1-3) with code edits for: switching env var usage, switching the bucket to private + signed URL flow, and sanitizing upload filenames. Say which you'd like first and I’ll create the branch and implement the changes.
