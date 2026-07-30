# Tailora — Authentication Test Cases Checklist

This checklist tracks the verification status of all 25 authentication test cases for the Tailora application. Use this document to verify fixes, track testing progress, and log new outcomes.

## Test Execution Summary

| Status | Count |
| :--- | :---: |
| 🔴 **Fail** | 4 |
| 🟡 **Blocked** | 0 |
| ⚪ **Skipped** | 2 |
| 💤 **Not Run** | 14 |
| 🟢 **Pass** | 5 |
| **Total** | **25** |
| **Pass Rate** | **55.56%** *(calculated based on Run/Executed cases)* |

---

## 🔴 Failed Test Cases (Fixes Needed)

- [ ] **AUTH_004: Verify sign-up rejects an invalid email format**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Edge Case
  * **Preconditions:** User is on the Email step of sign-up
  * **Test Steps:**
    1. Enter Full Name & Business Name as normal.
    2. On the Email step, enter an invalid email format.
    3. Tap Next.
  * **Test Data:** `sarah.adeyemi@@gmail`
  * **Expected Result:** An inline validation error such as "Enter a valid email address" is shown and the user cannot proceed to the Password step.
  * **Actual Result:** No validation error shown / user was able to proceed.
  </details>

- [ ] **AUTH_005: Verify password policy rejects weak passwords**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Security
  * **Preconditions:** User is on the Password step of sign-up
  * **Test Steps:**
    1. Complete Name/Business/Email steps.
    2. Enter a weak password.
    3. Tap "Create Account".
  * **Test Data:** `1234`
  * **Expected Result:** Password is rejected with a message describing the minimum requirements (length, upper/lowercase, number/symbol); account is not created.
  * **Actual Result:** Password accepts weak password.
  </details>

- [ ] **AUTH_009: Verify rate limiting/lockout after repeated failed login attempts**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Security
  * **Preconditions:** User has an existing account
  * **Test Steps:**
    1. Attempt login with the correct email and an incorrect password 5+ times in a row.
  * **Test Data:** `Email: sarah.adeyemi@gmail.com`, `Password: WrongPass1 (repeated)`
  * **Expected Result:** After a defined threshold, further attempts are throttled or temporarily locked, and the user is warned (e.g. "Too many attempts, try again in X minutes").
  * **Actual Result:** No warning.
  </details>

- [ ] **AUTH_012: Verify Privacy Policy link text on the Sign-Up screen**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Low
  * **Type:** UI (Defect: `DEF-002`)
  * **Preconditions:** User is on the Sign-Up screen
  * **Test Steps:**
    1. Navigate to the Sign-Up screen.
    2. Locate the Terms/Privacy Policy consent text at the bottom of the final step.
  * **Expected Result:** Text correctly reads "Privacy Policy of Tailora".
  * **Actual Result:** Text currently reads "Privacy Policy of Taliora" (typo).
  </details>

---

## 🟡 Blocked Test Cases

*None*

---

## ⚪ Skipped Test Cases

- [ ] **AUTH_011: Verify automatic session timeout after inactivity**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Security
  * **Preconditions:** User is logged in and idle
  * **Test Steps:**
    1. Log in successfully.
    2. Leave the app idle (no interaction) for the configured timeout period.
    3. Attempt to perform an action.
  * **Expected Result:** The user session expires; the user is redirected to the login screen and must re-authenticate.
  </details>

- [ ] **AUTH_014: Verify sign-up cannot proceed without accepting Terms & Privacy Policy**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** UI/Compliance
  * **Preconditions:** User is on the final step of sign-up
  * **Test Steps:**
    1. Complete all sign-up fields.
    2. Leave the Terms & Privacy Policy checkbox unchecked.
    3. Tap "Create Account".
  * **Expected Result:** Account creation is blocked and the user is prompted to accept the Terms & Privacy Policy before proceeding.
  </details>

---

## 💤 Not Run Test Cases

- [ ] **AUTH_010: Verify password reset flow completes successfully**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Functional
  * **Preconditions:** User has an existing account and access to the registered email inbox
  * **Test Steps:**
    1. On the login screen, tap "Forgot Password".
    2. Enter the registered email.
    3. Submit.
    4. Open the reset link/code from the email.
    5. Enter a new valid password.
    6. Log in with the new password.
  * **Test Data:** `Email: sarah.adeyemi@gmail.com`, `New Password: NewTailora@26`
  * **Expected Result:** Reset email/code is received, the password is updated, and the user can log in with the new password (old password no longer works).
  </details>

- [ ] **AUTH_007: Verify successful login with valid credentials**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Critical
  * **Type:** Functional
  * **Preconditions:** User has an existing, active Tailora account
  * **Test Steps:**
    1. Open the Tailora login screen.
    2. Enter the registered email.
    3. Enter the correct password.
    4. Tap "Login".
  * **Test Data:** `Email: sarah.adeyemi@gmail.com`, `Password: Tailora@2026`
  * **Expected Result:** User is logged in and lands on the Dashboard of their default workspace.
  </details>

- [ ] **AUTH_013: Verify logout functionality**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Functional
  * **Preconditions:** User is logged in
  * **Test Steps:**
    1. Open the account/profile menu.
    2. Tap "Log Out".
    3. Confirm if prompted.
  * **Expected Result:** User is logged out and returned to the Login screen; protected screens are no longer accessible without re-authenticating.
  </details>

- [ ] **AUTH_015: Verify login fields are protected against script/SQL injection input**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Critical
  * **Type:** Security
  * **Preconditions:** User is on the login screen
  * **Test Steps:**
    1. Enter a script/SQL injection payload in the email field.
    2. Enter any value in the password field.
    3. Tap "Login".
  * **Test Data:** `Email: ' OR '1'='1`, `Password: <script>alert(1)</script>`
  * **Expected Result:** Input is safely rejected/sanitized as invalid credentials; no script executes and no database error is exposed to the user.
  </details>

- [ ] **AUTH_016: Verify submitting the sign-up form with every field left empty**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Edge Case
  * **Preconditions:** User is on the Sign-Up screen
  * **Test Steps:**
    1. Without entering anything, tap Next/Create Account at each step.
  * **Expected Result:** Each required field shows a clear, plain-language inline error (e.g. "Please enter your name") instead of a generic or technical failure message.
  </details>

- [ ] **AUTH_017: Verify the email field trims accidental leading/trailing spaces**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Edge Case
  * **Preconditions:** User is on the Email step of sign-up or the login screen
  * **Test Steps:**
    1. Enter an email with a leading or trailing space (as often happens when copy-pasting from WhatsApp/Notes).
    2. Submit.
  * **Test Data:** `Email: " sarah.adeyemi@gmail.com "`
  * **Expected Result:** The space is trimmed automatically and the email is accepted/matched correctly, rather than failing validation or login.
  </details>

- [ ] **AUTH_018: Verify login email matching is not case-sensitive**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Edge Case
  * **Preconditions:** User registered with a mixed-case email
  * **Test Steps:**
    1. Sign up with a mixed-case email.
    2. Log out.
    3. Log back in typing the email in a different case.
  * **Test Data:** `Registered: Sarah.Adeyemi@gmail.com`, `Login attempt: sarah.adeyemi@GMAIL.com`
  * **Expected Result:** Login succeeds regardless of the case used, since email addresses are not case-sensitive.
  </details>

- [ ] **AUTH_019: Verify double-tapping "Create Account"/"Login" does not submit twice**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Edge Case
  * **Preconditions:** User has filled the form correctly and taps the submit button rapidly
  * **Test Steps:**
    1. Fill in valid sign-up (or login) details.
    2. Rapidly double- or triple-tap the submit button.
  * **Expected Result:** Only one account is created (or one login session started); the button disables or shows a loading state after the first tap to prevent duplicate submissions.
  </details>

- [ ] **AUTH_020: Verify sign-up behaves gracefully when internet connection drops mid-submission**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Edge Case
  * **Preconditions:** User is submitting the sign-up form as the network becomes unavailable
  * **Test Steps:**
    1. Fill in valid sign-up details.
    2. Disable Wi-Fi/mobile data just before or as tapping "Create Account".
    3. Observe app behavior, then restore connection.
  * **Expected Result:** The app shows a clear "No internet connection, please try again" message rather than freezing, and does not create a partial/broken account. Retrying after reconnecting succeeds.
  </details>

- [ ] **AUTH_021: Verify a "show password" toggle is available while typing**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Low
  * **Type:** UI
  * **Preconditions:** User is on the Password step of sign-up or login
  * **Test Steps:**
    1. Enter a password.
    2. Look for and tap a "show/hide password" icon.
  * **Expected Result:** Users can reveal the password they've typed to confirm it's correct before submitting.
  </details>

- [ ] **AUTH_022: Verify navigating back mid-sign-up wizard does not lose previously entered data**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Edge Case
  * **Preconditions:** User has completed 2 of the sign-up steps
  * **Test Steps:**
    1. Enter Full Name and Business Name.
    2. Tap the back/previous button.
    3. Tap forward again to the Business Name step.
  * **Expected Result:** Previously entered values are still present; the user does not have to retype information they already provided.
  </details>

- [ ] **AUTH_023: Verify error messages use plain, non-technical language**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** UI
  * **Preconditions:** User triggers a validation or server error anywhere in sign-up/login
  * **Test Steps:**
    1. Trigger a few different errors (invalid email, wrong password, network failure).
    2. Read the exact wording shown to the user.
  * **Expected Result:** Messages are written in plain, friendly language a non-technical user can act on (e.g. "That password doesn't match, please try again") rather than raw codes like "Error 400: Bad Request".
  </details>

- [ ] **AUTH_024: Verify a confirm-password mismatch is caught before submission**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Edge Case
  * **Preconditions:** User is setting a password during sign-up (if a confirm-password field exists)
  * **Test Steps:**
    1. Enter a password.
    2. Enter a different value in Confirm Password.
    3. Attempt to proceed.
  * **Test Data:** `Password: Tailora@2026`, `Confirm: Tailora@2025`
  * **Expected Result:** The mismatch is flagged immediately with a clear message before the user can submit, rather than failing only after account creation is attempted.
  </details>

- [ ] **AUTH_025: Verify the app restores the sign-up form after being interrupted (call, app switch, screen lock)**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Edge Case
  * **Preconditions:** User is mid-way through the sign-up form
  * **Test Steps:**
    1. Start filling in the sign-up form.
    2. Receive/simulate a phone call or switch to another app.
    3. Return to Tailora.
  * **Expected Result:** The form retains the information already entered rather than resetting to a blank sign-up screen.
  </details>

---

## 🟢 Passed Test Cases

- [x] **AUTH_001: Verify successful sign-up via Full Name/Business Name/Email/Password wizard**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Critical
  * **Type:** Functional
  * **Preconditions:** User has a valid, unused email address and internet access; app is on the Sign Up screen
  * **Test Steps:**
    1. Tap "Sign Up".
    2. Enter Full Name, tap Next.
    3. Enter Business Name, tap Next.
    4. Enter a valid unused email, tap Next.
    5. Enter a valid password meeting policy.
    6. Accept Terms & Privacy Policy.
    7. Tap "Create Account".
  * **Test Data:** `Full Name: Sarah Adeyemi`, `Business Name: Sarah Couture`, `Email: sarah.adeyemi+t01@gmail.com`, `Password: Tailora@2026`
  * **Expected Result:** Account is created, user is auto-logged in, and a workspace named "My Workspace" is created and shown on the Dashboard.
  * **Actual Result:** As expected
  </details>

- [x] **AUTH_002: Verify sign-up via Google Sign-In**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Functional
  * **Preconditions:** User has a valid Google account not previously used on Tailora
  * **Test Steps:**
    1. Tap "Sign Up".
    2. Tap "Continue with Google".
    3. Select/authenticate the Google account.
    4. Grant requested permissions.
  * **Test Data:** `Google account: testtailora01@gmail.com`
  * **Expected Result:** User is redirected back into Tailora, the account is created using the Google profile name/email, and "My Workspace" is auto-created.
  * **Actual Result:** As expected
  </details>

- [x] **AUTH_003: Verify workspace auto-creation naming on first sign-up**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** Medium
  * **Type:** Functional
  * **Preconditions:** New user has just completed sign-up
  * **Test Steps:**
    1. Complete sign-up (email or Google).
    2. Observe the workspace name shown on the Dashboard header.
  * **Expected Result:** Workspace is automatically named "My Workspace" and is selected as the active workspace.
  * **Actual Result:** As expected
  </details>

- [x] **AUTH_006: Verify sign-up blocks an already-registered email**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Functional
  * **Preconditions:** An account already exists with the given email
  * **Test Steps:**
    1. Start sign-up.
    2. Enter Full Name and Business Name.
    3. Enter an email that is already registered.
    4. Tap Next.
  * **Test Data:** `Email: sarah.adeyemi@gmail.com (existing account)`
  * **Expected Result:** Error message "An account already exists with this email" (or similar) is shown; the user is prompted to log in instead.
  * **Actual Result:** As expected - OTP gets sent before it acknowledges the email already exists. User is not prompted to log in instead.
  </details>

- [x] **AUTH_008: Verify login is rejected with an incorrect password**
  <details>
  <summary>🔍 Test Details</summary>

  * **Priority:** High
  * **Type:** Functional
  * **Preconditions:** User has an existing account
  * **Test Steps:**
    1. Enter the registered email.
    2. Enter an incorrect password.
    3. Tap "Login".
  * **Test Data:** `Email: sarah.adeyemi@gmail.com`, `Password: WrongPass1`
  * **Expected Result:** Login is rejected with a generic error (e.g. "Incorrect email or password") without revealing whether the email exists.
  * **Actual Result:** As expected
  </details>
