# Tailora — Authentication Manual QA Checklist

> **Execution Summary**
> - **Total Test Cases:** 25
> - **Pass:** 9 | **Fail:** 0 | **In Progress:** 0 | **Blocked:** 1 | **Skipped:** 2 | **Not Run:** 13
> - **Pass Rate:** 100% (of completed)

---

## 🎯 High-Priority / Action Items (Blocked, Skipped & Not Run)

### 🔴 Blocked Test Cases

- [ ] **`AUTH_010` — Verify password reset flow completes successfully**
  - **Priority:** High | **Type:** Functional | **Status:** 🚫 `BLOCKED`
  - **Preconditions:** User has an existing account and access to the registered email inbox.
  - **Test Data:**
    - Email: `sarah.adeyemi@gmail.com`
    - New Password: `NewTailora@26`
  - **Test Steps:**
    1. On the login screen, tap **"Forgot Password"**.
    2. Enter the registered email (`sarah.adeyemi@gmail.com`) and submit.
    3. Open the reset link/code received in the email.
    4. Enter a new valid password (`NewTailora@26`).
    5. Log in with the new password.
  - **Expected Result:** Reset email/code is received, the password updates successfully, and the user can log in with the new password (old password no longer works).

---

### 🟡 Skipped Test Cases

- [ ] **`AUTH_011` — Verify automatic session timeout after inactivity**
  - **Priority:** Medium | **Type:** Security | **Status:** ⏭️ `SKIPPED`
  - **Preconditions:** User is logged in and idle.
  - **Test Steps:**
    1. Log in successfully to the application.
    2. Leave the app completely idle (no touch/click interaction) for the configured timeout period.
    3. Attempt to perform an action (e.g., tap a menu item or create an order).
  - **Expected Result:** User session expires automatically; user is redirected to the login screen and must re-authenticate.

- [ ] **`AUTH_014` — Verify sign-up cannot proceed without accepting Terms & Privacy Policy**
  - **Priority:** Medium | **Type:** UI/Compliance | **Status:** ⏭️ `SKIPPED`
  - **Preconditions:** User is on the final step of the Sign-Up wizard.
  - **Test Steps:**
    1. Complete all sign-up fields (Name, Business Name, Email, Password).
    2. Leave the **Terms & Privacy Policy** checkbox unchecked.
    3. Tap **"Create Account"**.
  - **Expected Result:** Account creation is blocked and an inline alert/prompt asks the user to accept the Terms & Privacy Policy before proceeding.

---

### ⚪ Not Run Test Cases (Pending Manual Verification)

- [ ] **`AUTH_007` — Verify successful login with valid credentials**
  - **Priority:** Critical | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User has an existing, active Tailora account.
  - **Test Data:**
    - Email: `sarah.adeyemi@gmail.com`
    - Password: `Tailora@2026`
  - **Test Steps:**
    1. Open the Tailora login screen.
    2. Enter the registered email.
    3. Enter the correct password.
    4. Tap **"Login"**.
  - **Expected Result:** User is authenticated successfully and lands on the Dashboard of their default workspace.

- [ ] **`AUTH_013` — Verify logout functionality**
  - **Priority:** Medium | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is actively logged in.
  - **Test Steps:**
    1. Open the account/profile menu.
    2. Tap **"Log Out"**.
    3. Confirm logout if prompted.
  - **Expected Result:** User is logged out and returned to the Login screen. Protected dashboard routes are no longer accessible without re-authenticating.

- [ ] **`AUTH_015` — Verify login fields are protected against script/SQL injection input**
  - **Priority:** Critical | **Type:** Security | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the login screen.
  - **Test Data:**
    - Email: `' OR '1'='1`
    - Password: `<script>alert(1)</script>`
  - **Test Steps:**
    1. Enter the SQL/Script injection payloads into the login fields.
    2. Tap **"Login"**.
  - **Expected Result:** Input is safely sanitized/rejected as invalid credentials; no script executes and no internal database error is exposed.

- [ ] **`AUTH_016` — Verify submitting the sign-up form with every field left empty**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Sign-Up screen.
  - **Test Steps:**
    1. Without typing any input, tap **Next** / **Create Account** at each step of the wizard.
  - **Expected Result:** Each required field highlights a clear, plain-language error (e.g., *"Please enter your name"*) rather than failing silently or throwing a technical error.

- [ ] **`AUTH_017` — Verify the email field trims accidental leading/trailing spaces**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Email step of sign-up or login screen.
  - **Test Data:**
    - Email: `" sarah.adeyemi@gmail.com "` *(with spaces around email)*
  - **Test Steps:**
    1. Paste or type an email with leading or trailing spaces.
    2. Tap **Next** or **Login**.
  - **Expected Result:** Spaces are trimmed automatically and the email is matched/processed correctly.

- [ ] **`AUTH_018` — Verify login email matching is not case-sensitive**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User registered with a mixed-case email.
  - **Test Data:**
    - Registered: `Sarah.Adeyemi@gmail.com`
    - Login Attempt: `sarah.adeyemi@GMAIL.com`
  - **Test Steps:**
    1. Sign up with a mixed-case email address.
    2. Log out.
    3. Log back in using a different uppercase/lowercase combination.
  - **Expected Result:** Login succeeds regardless of casing used.

- [ ] **`AUTH_019` — Verify double-tapping "Create Account"/"Login" does not submit twice**
  - **Priority:** High | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User has filled the sign-up or login form correctly.
  - **Test Steps:**
    1. Fill in valid sign-up or login details.
    2. Rapidly double- or triple-tap the submit button.
  - **Expected Result:** Only one account is created (or one login request sent). Button disables or displays a loading indicator immediately after first tap.

- [ ] **`AUTH_020` — Verify sign-up behaves gracefully when internet connection drops mid-submission**
  - **Priority:** High | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is submitting the sign-up form.
  - **Test Steps:**
    1. Fill in valid sign-up details.
    2. Disable Wi-Fi/Mobile Data immediately before or while tapping **"Create Account"**.
    3. Observe app behavior, then re-enable network connection.
  - **Expected Result:** Displays a clear *"No internet connection, please try again"* message without freezing or creating a broken account. Retrying after reconnecting succeeds.

- [ ] **`AUTH_021` — Verify a "show password" toggle is available while typing**
  - **Priority:** Low | **Type:** UI | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Password step of sign-up or login screen.
  - **Test Steps:**
    1. Type a password.
    2. Tap the **"eye" (show/hide password)** icon inside the password field.
  - **Expected Result:** Password text toggles between masked dots (`••••••••`) and plain visible text.

- [ ] **`AUTH_022` — Verify navigating back mid-sign-up wizard does not lose previously entered data**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User has completed steps 1 & 2 of sign-up.
  - **Test Steps:**
    1. Enter Full Name and Business Name in steps 1 & 2.
    2. Tap the **Back / Previous** button.
    3. Tap **Forward** again to the Business Name step.
  - **Expected Result:** Previously entered inputs remain preserved without requiring the user to retype.

- [ ] **`AUTH_023` — Verify error messages use plain, non-technical language**
  - **Priority:** Medium | **Type:** UI | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User triggers validation or server errors anywhere in sign-up/login.
  - **Test Steps:**
    1. Trigger several error scenarios (e.g., invalid email format, wrong password, network timeout).
    2. Review the wording displayed to the user.
  - **Expected Result:** Messages use friendly, non-technical language (e.g., *"That password doesn't match, please try again"*) instead of HTTP codes or raw database errors.

- [ ] **`AUTH_024` — Verify a confirm-password mismatch is caught before submission**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is setting a password on sign-up (if confirm-password field exists).
  - **Test Data:**
    - Password: `Tailora@2026`
    - Confirm Password: `Tailora@2025`
  - **Test Steps:**
    1. Enter a password.
    2. Enter a mismatched value in the Confirm Password field.
    3. Attempt to submit.
  - **Expected Result:** Mismatch is flagged immediately with an inline error before submission is attempted.

- [ ] **`AUTH_025` — Verify the app restores the sign-up form after being interrupted (call, app switch, screen lock)**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is mid-way through sign-up.
  - **Test Steps:**
    1. Fill in initial sign-up fields.
    2. Switch to another app or lock the device screen.
    3. Re-open Tailora.
  - **Expected Result:** The sign-up wizard preserves previously entered state without resetting to a blank screen.

---

## 🟢 Previously Passed Test Cases (Re-Verification Checklist)

- [x] **`AUTH_001` — Sign-up via Wizard (Full Name, Business Name, Email, Password)**
  - **Priority:** Critical | **Type:** Functional | **Status:** ✅ `PASS`
  - **Test Data:** Full Name: `Sarah Adeyemi`, Business Name: `Sarah Couture`, Email: `sarah.adeyemi+t01@gmail.com`, Password: `Tailora@2026`
  - **Expected Result:** Account created, auto-logged in, workspace `"My Workspace"` created and shown.

- [x] **`AUTH_002` — Sign-up via Google Sign-In**
  - **Priority:** High | **Type:** Functional | **Status:** ✅ `PASS`
  - **Test Data:** Google Account: `testtailora01@gmail.com`
  - **Expected Result:** Redirected back to Tailora, account created using Google profile, `"My Workspace"` auto-created.

- [x] **`AUTH_003` — Workspace Auto-Creation Naming on First Sign-Up**
  - **Priority:** Medium | **Type:** Functional | **Status:** ✅ `PASS`
  - **Expected Result:** Workspace named `"My Workspace"` automatically and selected as active.

- [x] **`AUTH_004` — Sign-up Rejects Invalid Email Format**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ✅ `PASS`
  - **Test Data:** `sarah.adeyemi@@gmail`
  - **Expected Result:** Inline error *"Enter a valid email address"* shown; cannot proceed.

- [x] **`AUTH_005` — Password Policy Rejects Weak Passwords**
  - **Priority:** High | **Type:** Security | **Status:** ✅ `PASS`
  - **Test Data:** `1234`
  - **Expected Result:** Rejected with clear minimum policy rules (length, upper/lowercase, number/symbol).

- [x] **`AUTH_006` — Sign-up Blocks Already-Registered Email**
  - **Priority:** High | **Type:** Functional | **Status:** ✅ `PASS`
  - **Test Data:** `sarah.adeyemi@gmail.com`
  - **Expected Result:** Error shown that account already exists; user directed to login. *(Note: OTP sent prior to email existence check).*

- [x] **`AUTH_008` — Login Rejected with Incorrect Password**
  - **Priority:** High | **Type:** Functional | **Status:** ✅ `PASS`
  - **Test Data:** Email: `sarah.adeyemi@gmail.com`, Password: `WrongPass1`
  - **Expected Result:** Generic rejection message without exposing email existence.

- [x] **`AUTH_009` — Rate Limiting / Lockout After Repeated Failed Logins**
  - **Priority:** High | **Type:** Security | **Status:** ✅ `PASS`
  - **Test Data:** Password: `WrongPass1` (5+ rapid attempts)
  - **Expected Result:** Throttles or temporarily locks further attempts with warning message.

- [x] **`AUTH_012` — Privacy Policy Link Text Verification**
  - **Priority:** Low | **Type:** UI | **Status:** ✅ `PASS` *(Defect `DEF-002` fixed)*
  - **Expected Result:** Link text correctly reads *"Privacy Policy of Tailora"*.
