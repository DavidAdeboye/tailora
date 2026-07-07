"use client";
import { useEffect } from "react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: "info" | "warning" | "success" | "danger";
  date: string;
  time?: string;
  is_read: boolean;
}

function BellIcon({ type }: { type: string }) {
  const styles: Record<string, { bg: string; fill: string }> = {
    info: { bg: "#E8EFFD", fill: "#1A56DB" },
    success: { bg: "#E7F6EC", fill: "#036B26" },
    warning: { bg: "#FFF9E6", fill: "#D97706" },
    danger: { bg: "#FCE8E6", fill: "#EA4335" },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      style={{
        width: 40,
        height: 40,
        minWidth: 40,
        background: current.bg,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity="0.4"
          d="M19.5 16.33V10.47C19.5 6.84 17.06 3.81 13.73 3.09C13.41 3.02 13.06 2.97 12.7 2.97C12.34 2.97 11.99 3.02 11.67 3.09C8.34 3.81 5.9 6.84 5.9 10.47V16.33C5.9 16.8 5.68 17.58 5.4 17.98L4.29 19.82C3.89 20.5 4.37 21.37 5.16 21.37H19.84C20.63 21.37 21.11 20.5 20.71 19.82L19.6 17.98C19.32 17.58 19.5 16.8 19.5 16.33Z"
          fill={current.fill}
        />
        <path
          d="M12 2C12.55 2 13 2.45 13 3V3.12C12.67 3.09 12.34 3.07 12 3.07C11.66 3.07 11.33 3.09 11 3.12V3C11 2.45 11.45 2 12 2Z"
          fill={current.fill}
        />
        <path
          d="M14.77 22.35C14.36 23.51 13.27 24.33 12 24.33C10.73 24.33 9.64 23.51 9.23 22.35C9.36 22.37 9.49 22.38 9.62 22.4C9.85 22.43 10.08 22.46 10.32 22.48C10.88 22.53 11.44 22.56 12 22.56C12.56 22.56 13.12 22.53 13.68 22.48C13.92 22.46 14.15 22.43 14.38 22.4C14.51 22.38 14.64 22.37 14.77 22.35Z"
          fill={current.fill}
        />
      </svg>
    </div>
  );
}

export default function NotificationsPanel({
  notifications,
  onClose,
  onMarkAllAsRead,
  onClearNotification,
  loading = false,
}: {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
  loading?: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const hasUnread = notifications.some((n) => !n.is_read);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,13,18,0.55)",
        backdropFilter: "blur(6px)",
        zIndex: 200,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: 20,
          width: 440,
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginTop: 64,
          position: "relative",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid rgba(226,232,240,0.69)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <p
            style={{
              fontFamily: "Onest, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#121212",
              margin: "0 0 4px",
            }}
          >
            Notifications
          </p>
          <p style={{ fontSize: 14, color: "#696969", margin: "0 0 12px" }}>
            Be updated with the latest notifications
          </p>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {hasUnread && (
              <button
                onClick={onMarkAllAsRead}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#E57301",
                  border: "1px solid #E57301",
                  background: "transparent",
                  borderRadius: 8,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                Mark all as read
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 32,
              height: 32,
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div style={{ overflowY: "auto", flex: 1, minHeight: 180 }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 180, color: "#696969" }}>
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 240,
                color: "#696969",
                padding: 24,
                textAlign: "center",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 12, opacity: 0.5 }}>
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#696969"
                  strokeWidth="1.5"
                />
                <path d="M12 8V13M12 16H12.01" stroke="#696969" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p style={{ fontWeight: 600, fontSize: 16, color: "#28292D", margin: "0 0 4px" }}>All caught up!</p>
              <p style={{ fontSize: 13, margin: 0 }}>No new notifications to show right now.</p>
            </div>
          ) : (
            notifications.map((n, i) => (
              <div
                key={n.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "16px 20px",
                  borderBottom: i < notifications.length - 1 ? "1px solid rgba(226,232,240,0.69)" : "none",
                  backgroundColor: n.is_read ? "transparent" : "#FFFDFC",
                  transition: "background-color 0.2s ease",
                  position: "relative",
                }}
              >
                <BellIcon type={n.type || "info"} />
                <div style={{ flex: 1, paddingRight: 24 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: n.is_read ? 400 : 600,
                      color: "#121212",
                      lineHeight: "20px",
                      margin: "0 0 4px",
                    }}
                  >
                    {n.message}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#696969" }}>
                    <span>{n.date}</span>
                    {n.time && (
                      <>
                        <span style={{ width: 4, height: 4, background: "#696969", borderRadius: "50%", display: "inline-block" }} />
                        <span>{n.time}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Individual close/delete button */}
                <button
                  onClick={() => onClearNotification(n.id)}
                  title="Dismiss notification"
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    opacity: 0.5,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.background = "#F5F5F7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.5";
                    e.currentTarget.style.background = "none";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#696969" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Orange dot for unread */}
                {!n.is_read && (
                  <span
                    style={{
                      position: "absolute",
                      width: 8,
                      height: 8,
                      background: "#E57301",
                      borderRadius: "50%",
                      top: 20,
                      left: 10,
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}