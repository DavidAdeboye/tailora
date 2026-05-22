"use client";
import { useState } from "react";
import AppPageHeader from "./AppPageHeader";

/* ── Types ── */
type Tab = "Profile" | "Workspace" | "Notifications" | "Security";

/* ── Icons ── */
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
    <path opacity="0.4" d="M22.1 17.69C21.8 18.5 21.16 19.12 20.32 19.4C19.15 19.79 17.95 20.08 16.74 20.29L16.38 20.34C16.18 20.38 15.99 20.4 15.8 20.42C15.56 20.45 15.31 20.47 15.06 20.5C14.38 20.55 13.7 20.58 13.02 20.58C12.33 20.58 11.64 20.55 10.95 20.49C10.66 20.46 10.38 20.43 10.1 20.39C9.93 20.37 9.77 20.34 9.62 20.32C9.5 20.3 9.38 20.29 9.26 20.27C8.06 20.07 6.87 19.78 5.71 19.39C4.84 19.1 4.18 18.48 3.89 17.69C3.6 16.91 3.71 16 4.17 15.22L5.4 13.18C5.65 12.74 5.89 11.88 5.89 11.36V9.35C5.89 5.42 9.08 2.22 13.02 2.22C16.94 2.22 20.14 5.42 20.14 9.35V11.36C20.14 11.88 20.38 12.74 20.65 13.18L21.87 15.22C22.32 15.98 22.4 16.87 22.1 17.69Z" fill="#121212"/>
    <path d="M13 11.66C12.55 11.66 12.18 11.29 12.18 10.83V7.48C12.18 7.02 12.55 6.65 13 6.65C13.46 6.65 13.82 7.02 13.82 7.48V10.83C13.82 11.29 13.44 11.66 13 11.66Z" fill="#121212"/>
    <path d="M16.07 21.68C15.61 22.93 14.41 23.83 13 23.83C12.14 23.83 11.3 23.49 10.7 22.87C10.36 22.54 10.1 22.11 9.94 21.67C10.09 21.69 10.23 21.7 10.38 21.72C10.63 21.75 10.89 21.79 11.15 21.81C11.77 21.86 12.4 21.89 13.02 21.89C13.64 21.89 14.26 21.86 14.86 21.81C15.09 21.79 15.32 21.77 15.54 21.74C15.71 21.72 15.88 21.7 16.07 21.68Z" fill="#121212"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path opacity="0.4" d="M15.48 13.23L11.69 8.18H6.08C5.12 8.18 4.64 9.34 5.32 10.02L10.5 15.2C11.33 16.03 12.68 16.03 13.51 15.2L15.48 13.23Z" fill="#121212"/>
    <path d="M17.92 8.18H11.69L15.48 13.23L18.69 10.02C19.36 9.34 18.88 8.18 17.92 8.18Z" fill="#121212"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path opacity="0.4" d="M9.34 18.82L13.63 14.53C14.4 13.76 14.4 12.5 13.63 11.73L9.34 7.44" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ImageAddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 18.33H12.5C16.67 18.33 18.33 16.67 18.33 12.5V7.5C18.33 3.33 16.67 1.67 12.5 1.67H7.5C3.33 1.67 1.67 3.33 1.67 7.5V12.5C1.67 16.67 3.33 18.33 7.5 18.33Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 8.33C8.42 8.33 9.17 7.58 9.17 6.67C9.17 5.75 8.42 5 7.5 5C6.58 5 5.83 5.75 5.83 6.67C5.83 7.58 6.58 8.33 7.5 8.33Z" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.22 15.79L6.33 13.03C6.99 12.59 7.93 12.64 8.52 13.15L8.81 13.41C9.46 13.97 10.51 13.97 11.16 13.41L14.66 10.42C15.31 9.86 16.36 9.86 17.01 10.42L18.33 11.58" stroke="#121212" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Toggle Switch ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "#121212" : "#E3E6EB",
        border: "none",
        cursor: "pointer",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(16,24,40,0.1), 0 1px 2px rgba(16,24,40,0.06)",
        transition: "transform 0.2s",
      }} />
    </button>
  );
}

/* ── Input Field ── */
function InputField({ label, placeholder, value, onChange, type = "text" }: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: 40,
          padding: "10px 12px",
          border: `1px solid ${focused ? "#121212" : "#E2E4E9"}`,
          borderRadius: 10,
          background: "#fff",
          fontSize: 14,
          color: "#525866",
          fontFamily: "Inter, sans-serif",
          outline: "none",
          boxSizing: "border-box",
          boxShadow: "0 1px 2px rgba(228,229,231,0.24)",
          transition: "border-color 0.15s",
        }}
      />
    </div>
  );
}

/* ── Divider Row ── */
function SectionDivider() {
  return <div style={{ width: "100%", height: 1, background: "#E5E7EB", flexShrink: 0 }} />;
}

/* ── PROFILE TAB ── */
function ProfileTab() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("14 Adetokunbo Ademola Crescent, Wuse II, Abuja");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Profile photo section */}
      <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 69, padding: "22px 24px" }}>
        {/* Left: label + button */}
        <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 20, width: 305 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Profile photo</span>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#667185", fontFamily: "Satoshi, sans-serif", lineHeight: "22px" }}>This image will be displayed on your profile</span>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: 144,
              height: 36,
              background: "#fff",
              border: "1px solid #121212",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "#121212",
              fontFamily: "Satoshi, sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
          >
            <ImageAddIcon />
            Change Photo
          </button>
        </div>

        {/* Right: avatar */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "2.5px solid #F2F2F6",
          boxShadow: "0 0 1px rgba(0,0,0,0.25)",
          overflow: "hidden",
          background: "#E5E7EB",
          flexShrink: 0,
        }}>
          <img src="/Ellipse2481.png" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <SectionDivider />

      {/* Personal information section */}
      <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
        {/* Left: label + save */}
        <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 20, width: 305, flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Personal Information</span>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>Update your personal details here.</span>
          </div>
          <button
            style={{
              width: 124,
              height: 38,
              background: "#D0D5DD",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Satoshi, sans-serif",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>

        {/* Right: form fields */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <InputField label="Full Name" placeholder="Your First and Last name" value={fullName} onChange={setFullName} />
          <InputField label="Business Name" placeholder="Your Business Name" value={businessName} onChange={setBusinessName} />
          <InputField label="Email Address" placeholder="Your Email Address" value={email} onChange={setEmail} type="email" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>Address</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #E2E4E9",
                borderRadius: 10,
                background: "#fff",
                fontSize: 14,
                color: "#525866",
                fontFamily: "Inter, sans-serif",
                outline: "none",
                boxSizing: "border-box",
                resize: "none",
                boxShadow: "0 1px 2px rgba(228,229,231,0.24)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── WORKSPACE TAB ── */
function WorkspaceTab() {
  const [standardDays, setStandardDays] = useState("14");
  const [expressDays, setExpressDays] = useState("5");

  return (
    <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 20, width: 305, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Deadline defaults</span>
          <span style={{ fontSize: 14, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>Standard delivery turnaround.</span>
        </div>
        <button
          style={{
            width: 124,
            height: 38,
            background: "#D0D5DD",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Satoshi, sans-serif",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </div>

      {/* Right */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <InputField label="Standard order (days)" placeholder="14" value={standardDays} onChange={setStandardDays} type="number" />
        <InputField label="Express order (days)" placeholder="5" value={expressDays} onChange={setExpressDays} type="number" />
      </div>
    </div>
  );
}

/* ── NOTIFICATIONS TAB ── */
function NotificationsTab() {
  const [deliveryReminders, setDeliveryReminders] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(false);
  const [teamActivity, setTeamActivity] = useState(false);

  const items = [
    { label: "Delivery reminders", sub: "Show/hide", checked: deliveryReminders, onChange: setDeliveryReminders },
    { label: "Deadline alerts for orders", sub: "Show/hide", checked: deadlineAlerts, onChange: setDeadlineAlerts },
    { label: "Team activity notifications", sub: "Show/hide", checked: teamActivity, onChange: setTeamActivity },
  ];

  return (
    <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 6, width: 305, flexShrink: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Notifications</span>
        <span style={{ fontSize: 14, color: "#667185", fontFamily: "Satoshi, sans-serif", lineHeight: "22px" }}>Manage how and when you receive updates.</span>
      </div>

      {/* Right: toggle rows */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "#6C717D", fontFamily: "Satoshi, sans-serif" }}>{item.sub}</div>
              </div>
              <Toggle checked={item.checked} onChange={item.onChange} />
            </div>
            {i < items.length - 1 && <SectionDivider />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SECURITY TAB ── */
function SecurityTab() {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="tailora-settings-row" style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div className="tailora-settings-row-left" style={{ display: "flex", flexDirection: "column", gap: 6, width: 305, flexShrink: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#101928", fontFamily: "Satoshi, sans-serif" }}>Security</span>
        <span style={{ fontSize: 14, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>Protect your account and data.</span>
      </div>

      {/* Right */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Change password row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Change password</div>
            <div style={{ fontSize: 12, color: "#6C717D", fontFamily: "Satoshi, sans-serif", letterSpacing: 2 }}>••••••••••••</div>
          </div>
          <ChevronRightIcon />
        </div>

        <SectionDivider />

        {/* 2FA row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#28292D", fontFamily: "Satoshi, sans-serif" }}>Two-Factor Authentication (2FA)</div>
            <div style={{ fontSize: 12, color: "#6C717D", fontFamily: "Satoshi, sans-serif" }}>Show/hide</div>
          </div>
          <Toggle checked={twoFA} onChange={setTwoFA} />
        </div>
      </div>
    </div>
  );
}

/* ── Badge icon next to "Settings" heading ── */
function NigeriaBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="13" fill="#008751"/>
        <rect x="8" y="0" width="10" height="26" fill="#fff"/>
      </svg>
    </span>
  );
}

/* ── MAIN SETTINGS PAGE ── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  const tabs: Tab[] = ["Profile", "Workspace", "Notifications", "Security"];

  return (
    <div className="tailora-page-view" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <AppPageHeader title="Settings" />

        <div className="tailora-page-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "#FDFDFD", position: "relative", WebkitOverflowScrolling: "touch" }}>
          <div className="tailora-page-gradient" style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />

          <div className="tailora-page-content" style={{ padding: "40px 36px", position: "relative" }}>
            <div className="tailora-page-header-row" style={{ marginBottom: 28 }}>
              <div className="tailora-page-header-text">
                <h1 className="tailora-page-title" style={{ margin: "0 0 4px", fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24, color: "#121212", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  Settings <NigeriaBadge />
                </h1>
                <p className="tailora-page-subtitle" style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "var(--font-satoshi)" }}>
                  Manage your personal account, workspace preferences, and security in one place.
                </p>
              </div>
            </div>

            {/* Tab bar */}
            <div className="tailora-settings-tabs" style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid #E4E7EC" }}>
              {tabs.map(tab => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 16px",
                    background: "transparent",
                    border: "none",
                    borderBottom: activeTab === tab ? "2px solid #121212" : "2px solid transparent",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: activeTab === tab ? 700 : 500,
                    color: activeTab === tab ? "#28292D" : "#717680",
                    fontFamily: "Satoshi, sans-serif",
                    marginBottom: -1,
                    transition: "color 0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content card */}
            <div className="tailora-settings-card" style={{
              background: "#fff",
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              maxWidth: 1052,
            }}>
              {activeTab === "Profile" && <ProfileTab />}
              {activeTab === "Workspace" && <WorkspaceTab />}
              {activeTab === "Notifications" && <NotificationsTab />}
              {activeTab === "Security" && <SecurityTab />}
            </div>
          </div>
        </div>
    </div>
  );
}