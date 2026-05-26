"use client";
import { useEffect } from "react";

function BellIcon() {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.4" d="M22.1 17.6907C21.7967 18.5032 21.1575 19.1207 20.3234 19.4024C19.1534 19.7924 17.9509 20.0849 16.7375 20.2907C16.6184 20.3124 16.4992 20.334 16.38 20.3449C16.185 20.3774 15.99 20.399 15.795 20.4207C15.5567 20.4532 15.3075 20.4749 15.0583 20.4965C14.3758 20.5507 13.7042 20.5832 13.0217 20.5832C12.3284 20.5832 11.635 20.5507 10.9525 20.4857C10.66 20.464 10.3783 20.4315 10.0967 20.3882C9.93418 20.3665 9.77168 20.3449 9.62002 20.3232C9.50085 20.3015 9.38168 20.2907 9.26252 20.269C8.06002 20.074 6.86835 19.7815 5.70918 19.3915C4.84252 19.099 4.18168 18.4815 3.88918 17.6907C3.59668 16.9107 3.70502 16.0007 4.17085 15.2207L5.39502 13.184C5.65502 12.7399 5.89335 11.884 5.89335 11.364V9.34904C5.89335 5.41654 9.08918 2.2207 13.0217 2.2207C16.9434 2.2207 20.1392 5.41654 20.1392 9.34904V11.364C20.1392 11.884 20.3775 12.7399 20.6483 13.184L21.8725 15.2207C22.3167 15.979 22.4033 16.8674 22.1 17.6907Z" fill="#121212" />
        <path d="M13 11.6569C12.545 11.6569 12.1766 11.2885 12.1766 10.8335V7.47519C12.1766 7.02019 12.545 6.65186 13 6.65186C13.455 6.65186 13.8233 7.02019 13.8233 7.47519V10.8335C13.8125 11.2885 13.4441 11.6569 13 11.6569Z" fill="#121212" />
        <path d="M16.0658 21.6773C15.6108 22.934 14.4083 23.8332 12.9999 23.8332C12.1441 23.8332 11.2991 23.4865 10.7033 22.869C10.3566 22.544 10.0966 22.1107 9.94495 21.6665C10.0858 21.6882 10.2266 21.699 10.3783 21.7207C10.6274 21.7532 10.8874 21.7857 11.1474 21.8073C11.7649 21.8615 12.3933 21.894 13.0216 21.894C13.6391 21.894 14.2566 21.8615 14.8633 21.8073C15.0908 21.7857 15.3183 21.7748 15.5349 21.7423C15.7083 21.7207 15.8816 21.699 16.0658 21.6773Z" fill="#121212" />
      </svg>
    );
  }

const notifications = [
  { msg: "New order #28374 has been placed", date: "15th Oct 2025", time: "1:45pm" },
  { msg: "Overdue alert: Order #11394 is 2 days past due", date: "15th Oct 2025", time: "11:20am" },
  { msg: "Client collected order #32876", date: "14th Oct 2025", time: "3:10pm" },
  { msg: "New team member added to your workspace", date: "14th Oct 2025", time: "9:00am" },
  { msg: "Payment received for order #99822", date: "13th Oct 2025", time: "5:30pm" },
  { msg: "Order #11873 is due in 3 days", date: "13th Oct 2025", time: "8:00am" },
];

export default function NotificationsPanel({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(10,13,18,0.55)",
        backdropFilter: "blur(6px)", zIndex: 200,
        display: "flex", justifyContent: "flex-end", alignItems: "flex-start",
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#FFFFFF", borderRadius: 20,
          width: 440, maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)", display: "flex",
          flexDirection: "column", overflow: "hidden",
          marginTop: 64, position: "relative",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(226,232,240,0.69)", flexShrink: 0, position: "relative" }}>
          <p style={{ fontFamily: "Onest, sans-serif", fontWeight: 700, fontSize: 20, color: "#121212", margin: "0 0 4px" }}>
            Notifications
          </p>
          <p style={{ fontSize: 14, color: "#696969", margin: 0 }}>
            Be updated with the latest notifications
          </p>
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#121212" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* List */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {notifications.map((n, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", borderBottom: i < notifications.length - 1 ? "1px solid rgba(226,232,240,0.69)" : "none" }}>
              <div style={{ width: 40, height: 40, minWidth: 40, background: "#FDF6EC", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <BellIcon />
                <span style={{ position: "absolute", width: 8, height: 8, background: "#E8562E", borderRadius: "50%", bottom: 2, right: 2 }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, color: "#121212", lineHeight: "20px", margin: "0 0 4px" }}>{n.msg}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#696969" }}>
                  <span>{n.date}</span>
                  <span style={{ width: 4, height: 4, background: "#696969", borderRadius: "50%", display: "inline-block" }} />
                  <span>{n.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}