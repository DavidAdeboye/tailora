"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import MobileMenuButton from "./MobileMenuButton";
import NotificationsPanel from "./NotificationsPanel";
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('tailora_avatar');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let mounted = true;
    async function refreshAvatar() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as any)?.user;
        const userId = user?.id;
        if (!userId) return;
        const { data: profile, error } = await supabase.from('profiles').select('avatar_path').eq('user_id', userId).maybeSingle();
        if (error) return;
        if (profile?.avatar_path) {
          const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(profile.avatar_path);
          const publicUrl = urlData?.publicUrl ?? urlData?.public_url ?? null;
          if (publicUrl && mounted) {
            setAvatarUrl(publicUrl);
            try { localStorage.setItem('tailora_avatar', publicUrl); } catch {}
          }
        }
      } catch (err) {
        // ignore
      }
    }
    refreshAvatar();
    return () => { mounted = false; };
  }, []);

  const handleLogoutClick = () => {
    setShowUserMenu(false);       // close dropdown first
    setShowLogoutModal(true);     // then open modal
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // TODO: add your actual logout logic here
    // e.g. signOut(), router.push("/login"), etc.
    console.log("User confirmed logout");
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

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            }}
          >
            <BellIcon />
          </button>

          {/* Avatar + dropdown */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              type="button"
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
              <img
                src={avatarUrl ?? "/Ellipse2481.png"}
                alt="Avatar"
                style={{ width: 24, height: 24, borderRadius: "50%" }}
              />
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
                    width: 184,
                    background: "#FFFFFF",
                    borderRadius: 12,
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    zIndex: 9999,
                  }}
                >
                  <button
                    type="button"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: "#FDF6EC",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: "var(--font-satoshi)",
                      color: "#28292D",
                      textAlign: "center",
                    }}
                  >
                    Profile
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
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
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