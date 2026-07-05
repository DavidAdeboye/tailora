# Tailora (Copy)

Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code> with a minimum version of 20.

To preview and run the project on your device:
1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
2) In the terminal, run `npm install`
3) Run `npm run dev` to view project in browser

## Remaining Dummy / Demo Content

The app still contains hardcoded placeholder data that should be replaced with real Supabase-backed values.

<!-- ### 1. `components/Sidebar.tsx` (Unfixed)
- Hardcoded workspace name: `Joshua's Couture`
- Static sidebar avatar: `/Ellipse2481.png`
- Profile area is not wired to the authenticated user/profile data -->

### 1. `components/AppPageHeader.tsx` (Partially Unfixed)
- No real display name or workspace name is loaded from the current user/profile record (the header does not display these yet)
- *Note: Avatar path has been successfully integrated with Supabase storage and is loaded from the profile.*

### 2. `components/TailoraDashboard.tsx` (Unfixed)
- Static dashboard stat values: `10,000,000`
- Welcome headline hardcoded to `Welcome Joshua's Couture`
- Order list is loaded from Supabase, but the dashboard counts and hero text are demo placeholders
- Pagination is hardcoded: `currentPage = 3`, `totalPages = 30`, static `pageNumbers`

### 3. `components/TeamCollaborationPage.tsx` (Unfixed)
- Hardcoded `initialMembers` list with repeated dummy names, emails, statuses, and avatars
- Team member data is local-only and not loaded from any backend
- Delete/Edit actions are placeholders (`alert()` and local state only)

### 4. `components/OrderCreationFlow.tsx` (Unfixed)
- Hardcoded team member roster in `teamMembers`
- Static assigned staff options in the order details step
- Fixed order ID text: `Order: #A-2041`
- Static avatar fallback in the header and invite drawer
- Invite drawer uses local dummy team data and does not persist or send real invitations

### 5. `components/InviteTeamMemberModal.tsx` (Unfixed)
- Invite form is local-only and not wired to backend invite/user creation functionality (clicks just call `onClose()`)

### 6. `components/SettingsPage.tsx` (Partially Unfixed)
- Profile fields `businessName` and `address` are kept local-only in the form and not saved to or loaded from Supabase
- *Note: Profile name, email, avatar, standardDays, and expressDays have been successfully integrated with Supabase.*

### 7. `components/ClientManagementPage.tsx` (Unfixed)
- Pagination UI is still dummy/hardcoded and not connected to real page sizes or counts
- Client list loading is partial; the database select query only retrieves `id`, `name`, `phone`, and `gender`, leaving `outfit` and `status` to rely on placeholder fallback values because they are not queried.

## Recommended Fix Order
1. **Sync missing Profile Settings (`components/SettingsPage.tsx`)**: Ensure `businessName` and `address` fields are properly stored in and loaded from the `profiles` table in Supabase.
2. **Dynamic Header & Sidebar display (`components/AppPageHeader.tsx` & `components/Sidebar.tsx`)**: Fetch and display the authenticated user's workspace name/business name and profile details instead of hardcoded defaults.
3. **Live Dashboard Metrics (`components/TailoraDashboard.tsx`)**: Query the database to calculate total clients, pending deliveries, orders in progress, and team members count, and connect pagination controls to real page sizes/counts.
4. **Team Data Integration (`components/TeamCollaborationPage.tsx`)**: Load real team members from the `team_members` database table, and wire edit, delete, and invite modal actions.
5. **Team Invitation flow (`components/InviteTeamMemberModal.tsx` & `components/OrderCreationFlow.tsx`)**: Connect the invite form and drawer in the order flow to a backend team member creation or invitation flow.
6. **Order Creation & Assignments (`components/OrderCreationFlow.tsx`)**: Wire staff assignments to the real team members list, dynamically generate order IDs (rather than `#A-2041`), and persist new orders/assigned staff to the database.
7. **Complete Client Listing columns & pagination (`components/ClientManagementPage.tsx`)**: Extend the clients select query to retrieve outfit type and status, and wire the pagination controls to dynamic total counts.

## Notes
- Some placeholder content also exists in marketing pages (`app/page.tsx`, `app/help/page.tsx`), but the priority is the authenticated app workspace flows above.
- The Supabase integration is already present in several files, so the remaining work is mostly replacing static UI values with real backend data and persistence.