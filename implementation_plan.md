# Role-Based UI Differentiation

Each of the 4 roles (Owner, Admin, Tailor, Assistant) should have a distinct UI experience that matches their responsibilities.

## Proposed Role Permissions & UI

| Feature | Owner | Admin | Tailor | Assistant |
|---|:---:|:---:|:---:|:---:|
| **Dashboard** | Full stats + all orders | Full stats + all orders | My Tasks only + task stats | My Tasks only + task stats |
| **Client Management** | ✅ Full access | ✅ Full access | ❌ Hidden | 👁️ View-only |
| **Team Collaboration** | ✅ Full access | ✅ Full access | ❌ Hidden | ❌ Hidden |
| **Add Client** | ✅ | ✅ | ❌ | ✅ |
| **Invite Co-worker** | ✅ | ❌ | ❌ | ❌ |
| **Settings** | ✅ Full access | ❌ | ❌ | ❌ |
| **Help & Support** | ✅ | ✅ | ✅ | ✅ |

> [!IMPORTANT]
> **Design Questions:**
> 1. Should Assistants be able to **add** new clients, or only view existing ones?
> 2. Should Admins have access to Settings, or only the Owner?
> 3. Should Tailors see client details at all (e.g., client name/phone on their assigned tasks)?

## Proposed Changes

### Sidebar — Role-Aware Navigation
#### [MODIFY] [Sidebar.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/components/Sidebar.tsx)

Replace the boolean `isAdmin` with a `userRole` string (`'Owner' | 'Admin' | 'Tailor' | 'Assistant'`). Each nav item gets visibility rules:

- **Dashboard** → Everyone
- **Client Management** → Owner, Admin, Assistant (view-only for Assistant)
- **Team Collaboration** → Owner, Admin only
- **Add Client** → Owner, Admin, Assistant
- **Invite Co-worker** → Owner only
- **Settings** → Owner only
- **Help & Support** → Everyone

Add a **role badge** below the user's name in the sidebar footer showing their role with a color-coded pill:
- 🟢 Owner (green)
- 🔵 Admin (blue)
- 🟠 Tailor (orange)  
- 🟣 Assistant (purple)

---

### Dashboard — Role-Specific Content
#### [MODIFY] [TailoraDashboard.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/components/TailoraDashboard.tsx)

| Element | Owner / Admin | Tailor | Assistant |
|---|---|---|---|
| **Welcome message** | "Welcome {Business Name}" | "Welcome {Name} 👋" | "Welcome {Name} 👋" |
| **Subtitle** | "Your all-in-one tailoring business management hub" | "Here are your assigned tasks" | "Here are your assigned tasks" |
| **Stats cards** | Total Clients, Pending Deliveries, Orders in Progress, Team Members | My Tasks, Completed, In Progress, Overdue | My Tasks, Completed, In Progress, Overdue |
| **Orders table title** | "Recent Orders" | "My Assigned Tasks" | "My Assigned Tasks" |
| **Add Client button** | ✅ Visible | ❌ Hidden | ✅ Visible |
| **Edit/Delete actions on orders** | ✅ | ❌ (view-only) | ❌ (view-only) |

---

### Header — Role Badge
#### [MODIFY] [AppPageHeader.tsx](file:///c:/Users/david/Desktop/Tailora%20(Copy)%20(1)/components/AppPageHeader.tsx)

Show the user's role next to their name in the top-right header as a subtle color-coded badge (e.g., `Tailor` in orange text).

---

## Verification Plan

### Manual Verification
1. Log in as Owner → Verify full sidebar, full dashboard stats, "Welcome {Business Name}"
2. Log in as Tailor → Verify restricted sidebar (no Client Mgmt, Team, Settings, Invite), filtered tasks, "My Assigned Tasks"
3. Log in as Assistant → Verify sidebar shows Client Mgmt (view-only) but not Team/Settings, "My Assigned Tasks"
4. Check there's no flash of admin UI on page load for any role
