# Tailora — Client Management Manual QA Checklist

> **Execution Summary**
> - **Total Test Cases:** 19
> - **Pass:** 1 | **Fail:** 1 | **In Progress:** 0 | **Blocked:** 0 | **Skipped:** 0 | **Not Run:** 17
> - **Pass Rate:** 50% (of completed)

---

## 🎯 Action Items (Failed & Pending Test Cases)

### ❌ Failed Test Cases (Requires Fix / Re-testing)

- [ ] **`CLIENT_003` — Verify phone number field rejects invalid formats**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ❌ `FAIL`
  - **Preconditions:** User is on the Add Client screen.
  - **Test Data:**
    - Phone: `12AB`
  - **Test Steps:**
    1. Enter a client name.
    2. Enter an invalid phone number (`12AB`).
    3. Tap **"Save"**.
  - **Expected Result:** A validation error is shown for the phone field; the client is not saved.
  - **Actual Result:** Form moved to the next step without validating or raising an error for invalid characters (`12AB`).

---

### ⚪ Not Run Test Cases (Pending Manual Verification)

- [ ] **`CLIENT_001` — Verify adding a new client with all required fields**
  - **Priority:** Critical | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is logged in and on the Clients screen.
  - **Test Data:**
    - Name: `Adaeze Okafor`
    - Phone: `+2348012345678`
    - Gender: `Female`
    - Outfit Type: `Custom`
  - **Test Steps:**
    1. Tap **"Add Client"**.
    2. Enter Full Name, Phone Number, Gender, Outfit Type.
    3. Tap **"Save"**.
  - **Expected Result:** Client is created and appears in the Clients list with the entered details.

- [ ] **`CLIENT_003b` — Verify clients progress is saved with each step**
  - **Priority:** High | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Add Client screen.
  - **Test Data:**
    - Name: `Adaeze Okafor`
    - Phone: `+2348012345678`
    - Gender: `Female`
    - Outfit Type: `Custom`
  - **Evidence Reference:** [Jam.dev Recording](https://jam.dev/c/041b7abf-3920-4206-be96-f2c9d7d84f93)
  - **Test Steps:**
    1. Tap **"Add Client"**.
    2. Enter Full Name, Phone Number, Gender, Outfit Type.
    3. Proceed through steps, then tap Back.
  - **Expected Result:** Progress is saved at each step; returning to a previous step shows previously filled data prefilled.

- [ ] **`CLIENT_003c` — Verify client details saved in drafts are stored and accessible**
  - **Priority:** Medium | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Add Client screen.
  - **Test Data:**
    - Name: `Adaeze Okafor`
    - Phone: `+2348012345678`
    - Gender: `Female`
    - Outfit Type: `Custom`
  - **Test Steps:**
    1. Tap **"Add Client"**.
    2. Enter Full Name, Phone Number, Gender, Outfit Type.
    3. Tap **"Save to draft"**.
  - **Expected Result:** Client details are saved to Drafts and visible in the Drafts list. No entered field or measurement item is missing.

- [ ] **`CLIENT_004` — Verify editing an existing client's details**
  - **Priority:** High | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** At least one client exists.
  - **Test Data:**
    - New Phone: `+2348099998888`
  - **Test Steps:**
    1. Open a client profile.
    2. Tap **"Edit"**.
    3. Update the phone number (`+2348099998888`).
    4. Tap **"Save"**.
  - **Expected Result:** Client profile reflects the updated phone number immediately and persists after app refresh.

- [ ] **`CLIENT_005` — Verify deleting a client requires confirmation**
  - **Priority:** High | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** At least one client exists.
  - **Test Steps:**
    1. Open a client profile.
    2. Tap **"Delete"**.
    3. Observe the confirmation prompt.
    4. Confirm deletion.
  - **Expected Result:** A confirmation dialog appears before deletion; once confirmed, the client and associated measurements/orders are removed from the Clients list.

- [ ] **`CLIENT_006` — Verify searching for a client by name**
  - **Priority:** High | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** Multiple clients exist, including `"Adaeze Okafor"`.
  - **Test Data:**
    - Search Term: `Adae`
  - **Test Steps:**
    1. Go to the Clients screen.
    2. Enter a partial name in Search (`Adae`).
  - **Expected Result:** Client list filters to show only clients whose name matches `"Adae*"`, including `"Adaeze Okafor"`.

- [ ] **`CLIENT_007` — Verify searching for a client by phone number**
  - **Priority:** Medium | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** Multiple clients exist.
  - **Test Data:**
    - Search Term: `8012345678`
  - **Test Steps:**
    1. Go to the Clients screen.
    2. Enter a phone number/partial number in Search.
  - **Expected Result:** The matching client(s) are returned in the filtered list.

- [ ] **`CLIENT_008` — Verify search returns an empty state for no matches**
  - **Priority:** Medium | **Type:** UI | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** Clients exist, none matching search term.
  - **Test Data:**
    - Search Term: `Zzxxqq123`
  - **Test Steps:**
    1. Enter a search term that matches no client.
  - **Expected Result:** An empty state message (e.g., *"No clients found"*) is displayed instead of a blank or broken list.

- [ ] **`CLIENT_009` — Verify client name accepts special characters/apostrophes without breaking UI**
  - **Priority:** Low | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Add Client screen.
  - **Test Data:**
    - Name: `O'Brien-Chukwu`
  - **Test Steps:**
    1. Enter a name containing an apostrophe and hyphen.
    2. Tap **"Save"**.
  - **Expected Result:** Client is saved and displayed correctly with special characters intact throughout the app (list, profile, order views, PDF export).

- [ ] **`CLIENT_010` — Verify Outfit Type dropdown lists all supported types including "Custom"**
  - **Priority:** Medium | **Type:** UI | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Add/Edit Client screen.
  - **Test Steps:**
    1. Tap the Outfit Type dropdown.
  - **Expected Result:** Dropdown displays all supported outfit types per spec, with **"Custom"** available as an option.

- [ ] **`CLIENT_011` — Verify a client can have multiple orders linked to their profile**
  - **Priority:** Medium | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** A client exists with one order already linked.
  - **Test Steps:**
    1. Open the client's profile.
    2. Create a second order for the same client.
    3. Return to the client profile.
  - **Expected Result:** Both orders are listed under the same client profile with complete order history.

- [ ] **`CLIENT_012` — Verify Clients list performance with a large dataset**
  - **Priority:** Medium | **Type:** Functional | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** Workspace contains large volume of client records (up to 10,000).
  - **Test Data:**
    - Seeded Dataset: 10,000 client records
  - **Test Steps:**
    1. Navigate to the Clients screen.
    2. Measure time to load, scroll through list, and execute a search query.
  - **Expected Result:** Clients list loads and search remains responsive (search results under 1 second) without crashing or lag.

- [ ] **`CLIENT_013` — Verify warning appears when adding a client matching an existing one**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** Client `"Adaeze Okafor"` with phone `+2348012345678` already exists.
  - **Test Data:**
    - Name: `Adaeze Okafor`
    - Phone: `+2348012345678`
  - **Test Steps:**
    1. Tap **"Add Client"**.
    2. Enter the same name and phone number as an existing client.
    3. Attempt to save.
  - **Expected Result:** User is warned that a matching client already exists and asked to confirm before creating a duplicate record.

- [ ] **`CLIENT_014` — Verify double-tapping "Save" does not create two identical client records**
  - **Priority:** High | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on Add Client screen with valid data entered.
  - **Test Data:**
    - Name: `Chinedu Obi`
    - Phone: `+2348055512345`
  - **Test Steps:**
    1. Fill in valid client details.
    2. Rapidly double-tap **"Save"**.
  - **Expected Result:** Only one client record is created; Save button disables or displays loading state after first tap.

- [ ] **`CLIENT_015` — Verify canceling Add Client form mid-entry prompts before discarding data**
  - **Priority:** Medium | **Type:** UI | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User has entered some details on the Add Client screen.
  - **Test Steps:**
    1. Enter a name and phone number.
    2. Tap the back/close button without saving.
  - **Expected Result:** User is asked to confirm (*"Discard changes?"*) before entered details are discarded.

- [ ] **`CLIENT_016` — Verify an extremely long client name is handled gracefully**
  - **Priority:** Low | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Add Client screen.
  - **Test Data:**
    - Name: `Adaeze Chidinma Ngozi Okafor-Adebayo Folasade Ihuoma Chukwuemeka ...` *(100+ chars)*
  - **Test Steps:**
    1. Enter a name of 100+ characters.
    2. Tap **"Save"**.
  - **Expected Result:** Name is capped at a limit with clear message, or saved and displayed with proper truncation/wrapping without breaking layout.

- [ ] **`CLIENT_017` — Verify leading/trailing spaces in client name are trimmed**
  - **Priority:** Low | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Add Client screen.
  - **Test Data:**
    - Name: `"  Adaeze Okafor  "`
  - **Test Steps:**
    1. Enter a name with extra leading/trailing spaces.
    2. Tap **"Save"**.
  - **Expected Result:** Name is trimmed and saved/displayed as `"Adaeze Okafor"`.

- [ ] **`CLIENT_018` — Verify Full Name field containing only spaces is rejected as blank**
  - **Priority:** Medium | **Type:** Edge Case | **Status:** ⚪ `NOT RUN`
  - **Preconditions:** User is on the Add Client screen.
  - **Test Data:**
    - Name: `"    "` *(only spaces)*
  - **Test Steps:**
    1. Enter only spacebar characters into the Full Name field.
    2. Attempt to save.
  - **Expected Result:** Field treated as empty; *"Full Name is required"* validation error is shown.

---

## 🟢 Passed Test Cases (Re-Verification Checklist)

- [x] **`CLIENT_002` — Verify client creation blocks a missing required field**
  - **Priority:** High | **Type:** Edge Case | **Status:** ✅ `PASS`
  - **Test Data:** Phone: `+2348012345678` *(Full Name left blank)*
  - **Expected Result:** Save is blocked and inline error indicates Full Name is required.
