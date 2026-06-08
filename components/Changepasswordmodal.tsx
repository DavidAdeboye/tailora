"use client";
import { useState } from "react";
import { createPortal } from "react-dom";

/* ── Eye Icon ── */
function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path opacity="0.4" d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15Z" fill="#667185"/>
      <path d="M12 15.96C10.02 15.96 8.42 14.35 8.42 12.38C8.42 10.4 10.02 8.8 12 8.8C13.98 8.8 15.58 10.4 15.58 12.38C15.58 14.35 13.98 15.96 12 15.96Z" fill="#667185"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path opacity="0.4" d="M14.53 9.47L9.47 14.53C8.82 13.88 8.42 12.99 8.42 12C8.42 10.02 10.02 8.42 12 8.42C12.99 8.42 13.88 8.82 14.53 9.47Z" fill="#667185"/>
      <path opacity="0.4" d="M17.59 5.7L14.87 8.42C14.04 7.74 12.07 6.47 12 6.47C10.36 6.47 8.77 7.09 7.55 8.18L4.18 4.81C5.93 3.33 8.44 2.43 12 2.43C14.29 2.43 16.48 3.16 17.59 5.7Z" fill="#667185"/>
      <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C11.93 15.58 11.87 15.58 11.8 15.57L15.57 11.8C15.58 11.87 15.58 11.93 15.58 12Z" fill="#667185"/>
      <path opacity="0.4" d="M21.25 9.15C20.55 8.04 19.75 7.08 18.89 6.27L15.58 9.58V9.58C15.58 9.58 15.58 9.58 15.58 9.58L11.8 13.37L11.8 13.37L8.43 16.74C9.26 17.36 10.33 17.55 12 17.55C13.64 17.55 15.23 16.93 16.45 15.84L19.82 19.21C20.11 19.5 20.59 19.5 20.88 19.21C21.17 18.92 21.17 18.44 20.88 18.15L5.85 3.12C5.56 2.83 5.08 2.83 4.79 3.12C4.5 3.41 4.5 3.89 4.79 4.18L8.42 7.81C7.56 8.62 6.76 9.58 6.06 10.69C5.09 12.19 5.09 14.18 6.06 15.68C6.76 16.79 7.56 17.75 8.42 18.56C9.62 19.72 11.15 20.57 13 20.57C14.85 20.57 16.38 19.72 17.58 18.56L20.88 21.86C21.17 22.15 21.65 22.15 21.94 21.86C22.23 21.57 22.23 21.09 21.94 20.8L19.76 18.62C20.36 18.07 20.85 17.47 21.25 16.84C22.25 15.27 22.25 10.72 21.25 9.15Z" fill="#667185"/>
    </svg>
  );
}

/* ── Password Input Field ── */
function PasswordField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#283145",
          fontFamily: "Satoshi, sans-serif",
          lineHeight: "20px",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            height: 40,
            padding: "10px 40px 10px 12px",
            border: `1px solid ${focused ? "#121212" : "#E2E4E9"}`,
            borderRadius: 10,
            background: "#fff",
            fontSize: 14,
            color: "#525866",
            fontFamily: "Inter, sans-serif",
            outline: "none",
            boxSizing: "border-box",
            boxShadow: "0px 1px 2px rgba(228, 229, 231, 0.24)",
            transition: "border-color 0.15s",
          }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.7,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          <EyeIcon visible={visible} />
        </button>
      </div>
    </div>
  );
}

/* ── Close Icon ── */
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5.28 5.28L14.72 14.72M14.72 5.28L5.28 14.72"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Main Modal Component ── */
export default function ChangePasswordModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Validation + submit logic goes here
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10, 13, 18, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "16px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(514px, calc(100vw - 32px))",
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Gradient top decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 205,
            background:
              "linear-gradient(180deg, #FDF6EC 30.22%, rgba(253, 246, 236, 0) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#F5F7F8",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#EAECED")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#F5F7F8")}
        >
          <CloseIcon />
        </button>

        {/* Modal content */}
        <div
          style={{
            position: "relative",
            padding: "clamp(40px, 6vw, 60px) clamp(16px, 4vw, 30px) clamp(20px, 4vw, 30px)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: "Sora, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(18px, 4vw, 24px)",
                lineHeight: "32px",
                color: "#1A1A1A",
              }}
            >
              Change Password
            </h2>
            <div style={{ height: 1, background: "#F1F1F2" }} />
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <PasswordField
              label="Current Password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={setCurrentPassword}
            />
            <PasswordField
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={setNewPassword}
            />
            <PasswordField
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: "1 1 auto",
                minWidth: 100,
                height: 46,
                padding: "13px 24px",
                background: "#fff",
                border: "1px solid #E4E7EC",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                color: "#344054",
                fontFamily: "Satoshi, sans-serif",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                flex: "1 1 auto",
                minWidth: 100,
                height: 46,
                padding: "13px 24px",
                background: "#121212",
                border: "none",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                color: "#fff",
                fontFamily: "Satoshi, sans-serif",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2C2C2C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#121212")}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}