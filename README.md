
  # Tailora (Copy)

  Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code> with a minimum version of 20.

  To preview and run the project on your device:
  1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
  2) In the terminal, run `npm install`
  3) Run `npm run dev` to view project in browser
## Remaining Dummy / Demo Content

The app still contains hardcoded placeholder data that should be replaced with real Supabase-backed values.

### 1. `components/Sidebar.tsx`
- Hardcoded workspace name: `Joshua's Couture`
- Static sidebar avatar: `/Ellipse2481.png`
- Profile area is not wired to the authenticated user/profile data

### 2. `components/AppPageHeader.tsx`
- Uses `localStorage` key `tailora_avatar` and fallback `/Ellipse2481.png`
- No real display name or workspace name is loaded from the current user/profile record

### 3. `components/TailoraDashboard.tsx`
- Static dashboard stat values: `10,000,000`
- Welcome headline hardcoded to `Welcome Joshua's Couture`
- Order list is loaded from Supabase, but the dashboard counts and hero text are demo placeholders
- Pagination is hardcoded: `currentPage = 3`, `totalPages = 30`, static `pageNumbers`

### 4. `components/TeamCollaborationPage.tsx`
- Hardcoded `initialMembers` list with repeated dummy names, emails, statuses, and avatars
- Team member data is local-only and not loaded from any backend
- Delete/Edit actions are placeholders (`alert()` and local state only)

### 5. `components/OrderCreationFlow.tsx`
- Hardcoded team member roster in `teamMembers`
- Static assigned staff options in the order details step
- Fixed order ID text: `Order: #A-2041`
- Static avatar fallback in the header and invite drawer
- Invite drawer uses local dummy team data and does not persist or send real invitations

### 6. `components/InviteTeamMemberModal.tsx`
- Invite form is local-only and not wired to backend invite/user creation functionality

### 7. `components/SettingsPage.tsx`
- Profile fields like `address`, `standardDays`, and `expressDays` are initialized from hardcoded defaults instead of loaded/saved from Supabase
- Settings tab currently keeps most form state local-only

### 8. `components/ClientManagementPage.tsx`
- Pagination UI is still dummy/hardcoded and not connected to real page sizes or counts
- Client list loading is partial; some fields like `outfit`, `status`, and `created_at` may rely on placeholder client schema mapping

### Recommended Fix Order
1. `components/SettingsPage.tsx` - fully load/save current user profile, business name, avatar, and workspace info
2. `components/AppPageHeader.tsx` - use the same user profile data for avatar and display values
3. `components/Sidebar.tsx` - replace static workspace/profile display with live profile/use values
4. `components/TailoraDashboard.tsx` - update stat cards from real queries and remove hardcoded branding text
5. `components/TeamCollaborationPage.tsx` - replace `initialMembers` with real team or workspace members data
6. `components/OrderCreationFlow.tsx` - wire assigned staff and invite experiences to real team data
7. `components/InviteTeamMemberModal.tsx` - wireinvite form actions to a server-side invite or user creation flow
8. `components/ClientManagementPage.tsx` - update pagination and filters to reflect client query results

## Notes
- Some placeholder content also exists in marketing pages (`app/page.tsx`, `app/help/page.tsx`), but the priority is the authenticated app workspace flows above.
- The Supabase integration is already present in several files, so the remaining work is mostly replacing static UI values with real backend data and persistence.  