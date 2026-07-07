"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import MobileMenuButton from "./MobileMenuButton";
import NotificationsPanel, { NotificationItem } from "./NotificationsPanel";
import LogoutModal from "./LogoutModal";

function BellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M22.1 17.6907C21.7967 18.5032 21.1575 19.1207 20.3234 19.4024C19.1534 19.7924 17.9509 20.0849 16.7375 20.2907C16.6184 20.3124 16.4992 20.334 16.38 20.3449C16.185 20.3774 15.99 20.399 15.795 20.4207C15.5567 20.4532 15.3075 20.4749 15.0583 20.4965C14.3758 20.5507 13.7042 20.5832 13.0217 20.5832C12.3284 20.5832 11.635 20.5507 10.9525 20.4857C10.66 20.464 10.3783 20.4315 10.0967 20.3882C9.93418 20.3665 9.77168 20.3449 9.62002 20.3232C9.50085 20.3015 9.38168 20.2907 9.26252 20.269C8.06002 20.074 6.86835 19.7815 5.70918 19.3915C4.84252 19.099 4.18168 18.4815 3.88918 17.6907C3.59668 16.9107 3.70502 16.0007 4.17085 15.2207L5.39502 13.184C5.65502 12.7399 5.89335 11.884 5.89335 11.364V9.34904C5.89335 5.41654 9.08918 2.2207 13.0217 2.2207C16.9434 2.2207 20.1392 5.41654 20.1392 9.34904V11.364C20.1392 11.884 20.3775 12.7399 20.6483 13.184L21.8725 15.2207C22.3167 15.979 22.4033 16.8674 22.1 17.6907Z" fill="#121212" />
      <path d="M13 11.6569C12.545 11.6569 12.1766 11.2885 12.1766 10.8335V7.47519C12.1766 7.02019 12.545 6.65186 13 6.65186C13.455 6.65186 13.8233 7.02019 13.8233 7.47519V10.8335C13.8125 11.2885 13.4441 11.6569 13 11.6569Z" fill="#121212" />
      <path d="M16.0658 21.6773C15.6108 22.934 14.4083 23.8332 12.9999 23.8332C12.1441 23.8332 11.2991 23.4865 10.7033 22.869C10.3566 22.544 10.0966 22.1107 9.94495 21.6665C10.0858 21.6882 10.2266 21.699 10.3783 21.7207C10.6274 21.7532 10.8874 21.7857 11.1474 21.8073C11.7649 21.8615 12.3933 21.894 13.0216 21.894C13.6391 21.894 14.2566 21.8615 14.8633 21.8073C15.0908 21.7857 15.3183 21.7748 15.5349 21.7423C15.7083 21.7207 15.8816 21.699 16.0658 21.6773Z" fill="#121212" />
    </svg>
  );
}

export default function AppPageHeader({ title }: { title: string }) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Start null so server and client render the same initial HTML.
  // Read localStorage inside useEffect to avoid hydration mismatches.
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");

  type UserRole = 'Owner' | 'Admin' | 'Tailor' | 'Assistant';
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const cachedRole = localStorage.getItem('tailora_role');
      if (cachedRole && ['Owner', 'Admin', 'Tailor', 'Assistant'].includes(cachedRole)) {
        return cachedRole as UserRole;
      }
    } catch {}
    return 'Owner';
  });

  const roleBadgeStyles: Record<UserRole, { bg: string; color: string }> = {
    Owner:     { bg: '#E7F6EC', color: '#036B26' },
    Admin:     { bg: '#E8EFFD', color: '#1A56DB' },
    Tailor:    { bg: '#FEF0E6', color: '#C4550A' },
    Assistant: { bg: '#F0E6FE', color: '#7C3AED' },
  };

  useEffect(() => {
    let mounted = true;
    try {
      const storedAvatar = localStorage.getItem('tailora_avatar');
      if (storedAvatar) setAvatarUrl(storedAvatar);
      const storedName = localStorage.getItem('tailora_fullname');
      if (storedName) setFullName(storedName);
      const storedBusiness = localStorage.getItem('tailora_businessname');
      if (storedBusiness) setBusinessName(storedBusiness);
    } catch {}

    async function refreshAvatar() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as any)?.user;
        const userId = user?.id;
        if (!userId) return;
        if (mounted) setUserEmail(user.email ?? "");

        // Load role from RPC
        const { data: rpcResult, error: rpcErr } = await supabase.rpc('get_my_team_role');
        if (!rpcErr && rpcResult && rpcResult.length > 0 && mounted) {
          const roleVal = rpcResult[0].role as UserRole;
          setUserRole(roleVal);
          try { localStorage.setItem('tailora_role', roleVal); } catch {}
        } else if (mounted) {
          setUserRole('Owner');
          try { localStorage.setItem('tailora_role', 'Owner'); } catch {}
        }

        const { data: profile, error } = await supabase.from('profiles').select('avatar_path, full_name, business_name').eq('user_id', userId).maybeSingle();
        if (error) return;
        if (profile) {
          if (profile.full_name && mounted) {
            setFullName(profile.full_name);
            try { localStorage.setItem('tailora_fullname', profile.full_name); } catch {}
          }
          if (profile.business_name && mounted) {
            setBusinessName(profile.business_name);
            try { localStorage.setItem('tailora_businessname', profile.business_name); } catch {}
          }
          if (profile.avatar_path) {
            const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(profile.avatar_path);
            const publicUrl = urlData?.publicUrl ?? null;
            if (publicUrl && mounted) {
              setAvatarUrl(publicUrl);
              try { localStorage.setItem('tailora_avatar', publicUrl); } catch {}
            }
          }
        }
      } catch (err) {
        // ignore
      }
    }
    refreshAvatar();

    function handleProfileUpdate() {
      try {
        const storedAvatar = localStorage.getItem('tailora_avatar');
        if (storedAvatar) setAvatarUrl(storedAvatar);
        const storedName = localStorage.getItem('tailora_fullname');
        if (storedName) setFullName(storedName);
        const storedBusiness = localStorage.getItem('tailora_businessname');
        if (storedBusiness) setBusinessName(storedBusiness);
      } catch {}
    }
    window.addEventListener('tailora_profile_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    return () => {
      mounted = false;
      window.removeEventListener('tailora_profile_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  async function fetchNotificationsList() {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;
      const userId = userData.user.id;

      let readIds: string[] = [];
      let dismissedIds: string[] = [];
      try {
        const r = localStorage.getItem('tailora_read_notifications');
        if (r) readIds = JSON.parse(r);
        const d = localStorage.getItem('tailora_dismissed_notifications');
        if (d) dismissedIds = JSON.parse(d);
      } catch {}

      const { data: tableData, error: tableError } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!tableError && tableData) {
        const items = tableData
          .map((n: any) => {
            const createdDate = new Date(n.created_at);
            const dateStr = createdDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            const timeStr = createdDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            
            return {
              id: n.id,
              title: n.title,
              message: n.message,
              type: n.type || 'info',
              date: dateStr,
              time: timeStr,
              is_read: n.is_read || readIds.includes(n.id)
            };
          })
          .filter((n: any) => !dismissedIds.includes(n.id));

        setNotifications(items);
        setNotificationsLoading(false);
        return;
      }

      // Fallback: table doesn't exist, generate dynamically
      const { data: orders } = await supabase
        .from('orders')
        .select('id, client_name, outfit, status, created_at, measurements')
        .order('created_at', { ascending: false })
        .limit(10);

      const { data: team } = await supabase
        .from('team_members')
        .select('name, role, status')
        .limit(5);

      const dynamicNotifications: NotificationItem[] = [];

      if (orders) {
        orders.forEach((o: any) => {
          const createdDate = new Date(o.created_at);
          const dateStr = createdDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
          const timeStr = createdDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

          const placedId = `${o.id}-placed`;
          dynamicNotifications.push({
            id: placedId,
            title: "New Order Placed",
            message: `New order for client ${o.client_name} (${o.outfit || 'Custom Outfit'}) has been placed`,
            type: 'info',
            date: dateStr,
            time: timeStr,
            is_read: readIds.includes(placedId)
          });

          if (o.status === 'Collected') {
            const colId = `${o.id}-collected`;
            dynamicNotifications.push({
              id: colId,
              title: "Order Collected",
              message: `Client collected order for ${o.client_name}`,
              type: 'success',
              date: dateStr,
              time: timeStr,
              is_read: readIds.includes(colId)
            });
          }

          const measurementsData = o.measurements || {};
          const collectionDateStr = measurementsData.collectionDate;
          if (collectionDateStr) {
            const collectionDate = new Date(collectionDateStr);
            const today = new Date();
            const diffTime = collectionDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (o.status !== 'Collected') {
              if (diffDays < 0) {
                const ovId = `${o.id}-overdue`;
                dynamicNotifications.push({
                  id: ovId,
                  title: "Overdue Alert",
                  message: `Overdue alert: Order for ${o.client_name} is ${Math.abs(diffDays)} day(s) past due`,
                  type: 'danger',
                  date: collectionDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                  time: "09:00 AM",
                  is_read: readIds.includes(ovId)
                });
              } else if (diffDays <= 3) {
                const dsId = `${o.id}-due-soon`;
                dynamicNotifications.push({
                  id: dsId,
                  title: "Order Due Soon",
                  message: `Order for ${o.client_name} is due in ${diffDays} day(s)`,
                  type: 'warning',
                  date: "Today",
                  time: "08:00 AM",
                  is_read: readIds.includes(dsId)
                });
              }
            }
          }
        });
      }

      if (team) {
        team.forEach((t: any, idx: number) => {
          const tmId = `team-${idx}`;
          dynamicNotifications.push({
            id: tmId,
            title: "Team Member Status",
            message: `Team member ${t.name} (${t.role}) is ${t.status === 'Active' ? 'active in workspace' : 'pending invitation'}`,
            type: 'info',
            date: "Recently",
            time: "",
            is_read: readIds.includes(tmId)
          });
        });
      }

      const filtered = dynamicNotifications
        .filter((n) => !dismissedIds.includes(n.id))
        .slice(0, 15);

      setNotifications(filtered);
    } catch (err) {
      console.error("AppPageHeader: Error loading notifications", err);
    } finally {
      setNotificationsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotificationsList();
  }, []);

  useEffect(() => {
    if (showNotifications) {
      fetchNotificationsList();
    }
  }, [showNotifications]);

  const handleMarkAllAsRead = async () => {
    try {
      const allIds = notifications.map((n) => n.id);
      let readIds: string[] = [];
      try {
        const r = localStorage.getItem('tailora_read_notifications');
        if (r) readIds = JSON.parse(r);
      } catch {}

      const newReadIds = Array.from(new Set([...readIds, ...allIds]));
      try {
        localStorage.setItem('tailora_read_notifications', JSON.stringify(newReadIds));
      } catch {}

      const hasTableBacked = notifications.some(
        (n) => !n.id.includes('-') && n.id.length === 36
      );
      if (hasTableBacked) {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .in('id', allIds.filter(id => id.length === 36 && !id.includes('-')));
      }

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleClearNotification = async (id: string) => {
    try {
      let dismissedIds: string[] = [];
      try {
        const d = localStorage.getItem('tailora_dismissed_notifications');
        if (d) dismissedIds = JSON.parse(d);
      } catch {}

      dismissedIds.push(id);
      try {
        localStorage.setItem('tailora_dismissed_notifications', JSON.stringify(dismissedIds));
      } catch {}

      if (id.length === 36 && !id.includes('-') && !id.includes('team')) {
        await supabase
          .from('notifications')
          .delete()
          .eq('id', id);
      }

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to clear notification:", err);
    }
  };

  const handleLogoutClick = () => {
    setShowUserMenu(false);       // close dropdown first
    setShowLogoutModal(true);     // then open modal
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    await supabase.auth.signOut();
    // Clear cached user info
    try {
      localStorage.removeItem("tailora_avatar");
      localStorage.removeItem("tailora_fullname");
      localStorage.removeItem("tailora_businessname");
      localStorage.removeItem("tailora_role");
    } catch {}
    document.cookie = "sb-access-token=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <>
      <header
        className="tailora-app-page-header"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #F0F2F5",
          padding: "0 36px",
          height: 83,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <MobileMenuButton />
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 700,
              fontSize: 18,
              color: "#28292D",
            }}
          >
            {title}
          </span>
        </div>

        <div className="tailora-header-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Bell */}
          <button
            type="button"
            onClick={() => setShowNotifications(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#FEFCF9",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 1px rgba(78,78,78,0.16)",
              position: "relative",
            }}
          >
            <BellIcon />
            {notifications.some(n => !n.is_read) && (
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 8,
                  height: 8,
                  background: "#E57301",
                  borderRadius: "50%",
                }}
              />
            )}
          </button>

          {/* Avatar + dropdown */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              type="button"
              className="tailora-header-avatar-btn"
              onClick={() => setShowUserMenu((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "none",
                border: "1px solid #F1F1F2",
                borderRadius: 100,
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#128C7E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Satoshi', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {((fullName || userEmail).charAt(0) || "?").toUpperCase()}
                </div>
              )}
              {fullName && (
                <span
                  className="tailora-header-user-name"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#28292D",
                    fontFamily: "var(--font-satoshi)",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {fullName}
                </span>
              )}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path opacity="0.4" d="M15.48 13.2302L11.69 8.18018H6.07999C5.11999 8.18018 4.63999 9.34018 5.31999 10.0202L10.5 15.2002C11.33 16.0302 12.68 16.0302 13.51 15.2002L15.48 13.2302Z" fill="#121212" />
                <path d="M17.9199 8.18018H11.6899L15.4799 13.2302L18.6899 10.0202C19.3599 9.34018 18.8799 8.18018 17.9199 8.18018Z" fill="#121212" />
              </svg>
            </button>

            {showUserMenu && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  onClick={() => setShowUserMenu(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 9998 }}
                />

                {/* Dropdown */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: 220,
                    background: "#FFFFFF",
                    borderRadius: 12,
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
                    padding: "14px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    zIndex: 9999,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  {/* Identity block */}
                  <div style={{ padding: "0 4px 4px 4px", display: "flex", flexDirection: "column", gap: 3 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#121212",
                        fontFamily: "var(--font-satoshi)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fullName || "User"}
                    </div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '1px 8px',
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 600,
                        lineHeight: '16px',
                        background: roleBadgeStyles[userRole].bg,
                        color: roleBadgeStyles[userRole].color,
                        letterSpacing: '0.02em',
                        marginTop: 2,
                      }}
                    >
                      {userRole}
                    </span>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#6C717D",
                        fontFamily: "var(--font-satoshi)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {businessName || "My Workspace"}
                    </div>
                    {userEmail && (
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 400,
                          color: "#98A2B3",
                          fontFamily: "var(--font-satoshi)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {userEmail}
                      </div>
                    )}
                  </div>

                  <div style={{ height: 1, background: "#F0F2F5", margin: "0 -12px" }} />

                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/settings");
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: "#FDF6EC",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "var(--font-satoshi)",
                      color: "#28292D",
                      textAlign: "center",
                    }}
                  >
                    Profile Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogoutClick}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: "var(--font-satoshi)",
                      color: "#FF4D6D",
                      textAlign: "center",
                    }}
                  >
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>



      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          loading={notificationsLoading}
          onClose={() => setShowNotifications(false)}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearNotification={handleClearNotification}
        />
      )}

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}