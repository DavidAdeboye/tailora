"use client";
import { useState } from "react";

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

/* ── Header ── */
function AppHeader() {
  return (
    <header style={{
      background: "#fff",
      borderBottom: "1px solid #F0F2F5",
      height: 83,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 36px",
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "#28292D" }}>Settings</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEFCF9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 1px rgba(78,78,78,0.16)" }}>
          <BellIcon />
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid #F1F1F2", borderRadius: 100, padding: "8px 12px", cursor: "pointer" }}>
          <img src="/Ellipse2481.png" alt="user" style={{ width: 40, height: 40, borderRadius: "50%", border: "2.5px solid #F2F2F6" }} />
          <ChevronDownIcon />
        </button>
      </div>
    </header>
  );
}

/* ── Toggle Switch ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
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
      <div style={{ display: "flex", alignItems: "flex-start", gap: 69, padding: "22px 24px" }}>
        {/* Left: label + button */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 305 }}>
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
      <div style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
        {/* Left: label + save */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 305, flexShrink: 0 }}>
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
    <div style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 305, flexShrink: 0 }}>
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
    <div style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 305, flexShrink: 0 }}>
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
    <div style={{ display: "flex", alignItems: "flex-start", gap: 56, padding: "22px 24px" }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 305, flexShrink: 0 }}>
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

/* ── SIDEBAR (inline, reuses dashboard sidebar pattern) ── */
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [v, setV] = useState(false);
  return (
    <div style={{ position: "relative", display: "flex" }} onMouseEnter={() => setV(true)} onMouseLeave={() => setV(false)}>
      {children}
      {v && (
        <div style={{ position: "absolute", left: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)", background: "#2C2C2C", color: "#fff", fontSize: 12, fontWeight: 500, padding: "5px 10px", borderRadius: 6, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 300 }}>
          {label}
          <div style={{ position: "absolute", right: "100%", top: "50%", transform: "translateY(-50%)", borderWidth: "5px 6px 5px 0", borderStyle: "solid", borderColor: "transparent #2C2C2C transparent transparent" }} />
        </div>
      )}
    </div>
  );
}

function Sidebar({ activeMenu, onMenuChange }: { activeMenu: string; onMenuChange: (l: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const W = collapsed ? 72 : 272;

  const NavBtn = ({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active?: boolean; onClick?: () => void }) => {
    const btn = (
      <button onClick={(e) => { e.stopPropagation(); onClick?.(); }}
        style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : 12, justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? 12 : "12px 16px", borderRadius: 6, background: active ? "#FDF6EC" : "transparent", border: "none", cursor: "pointer", width: "100%", color: active ? "#28292D" : "#B6B6B6", fontSize: 14, fontWeight: active ? 500 : 400, fontFamily: "Satoshi, Inter, sans-serif", whiteSpace: "nowrap", overflow: "hidden" }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
        <span style={{ flexShrink: 0 }}>{icon}</span>
        {!collapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>}
      </button>
    );
    return collapsed ? <Tooltip label={label}>{btn}</Tooltip> : btn;
  };

  const ic = (active: boolean) => active ? "#28292D" : "#B6B6B6";

  const HomeIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path opacity="0.4" d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z" fill={c}/><path d="M12 15.81V18.81" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const PeopleIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M14.6083 6.47C14.55 6.47 14.49 6.47 14.43 6.47C13.14 6.43 12.12 5.37 12.12 4.07C12.12 2.75 13.19 1.67 14.53 1.67C15.85 1.67 16.93 2.74 16.93 4.07C16.93 5.37 15.9 6.43 14.6083 6.47Z" fill={c}/><path d="M10.1 13.22C10.03 13.22 9.96 13.22 9.88 13.22C8.35 13.18 7.13 11.92 7.13 10.37C7.13 8.78 8.4 7.5 9.99 7.5C11.58 7.5 12.86 8.78 12.86 10.37C12.86 11.92 11.64 13.18 10.1 13.22Z" fill={c}/><path d="M7.39 14.95C6.13 15.79 6.13 17.18 7.39 18.01C8.83 18.97 11.18 18.97 12.61 18.01C13.87 17.17 13.87 15.78 12.61 14.95C11.18 13.99 8.83 13.99 7.39 14.95Z" fill={c}/></svg>;
  const TeamIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M7.5 1.67C5.32 1.67 3.54 3.44 3.54 5.62C3.54 7.77 5.22 9.5 7.4 9.57C7.47 9.57 7.53 9.57 7.58 9.57C9.78 9.5 11.46 7.77 11.46 5.62C11.46 3.44 9.68 1.67 7.5 1.67Z" fill={c}/><path d="M11.73 11.79C9.41 10.24 5.62 10.24 3.28 11.79C2.22 12.5 1.63 13.46 1.63 14.48C1.63 15.51 2.22 16.46 3.27 17.16C4.43 17.94 5.97 18.33 7.5 18.33C9.03 18.33 10.57 17.94 11.73 17.16C12.78 16.45 13.37 15.5 13.37 14.47C13.36 13.44 12.78 12.49 11.73 11.79Z" fill={c}/></svg>;
  const AddIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M13.49 1.67H6.51C3.48 1.67 1.67 3.47 1.67 6.51V13.48C1.67 16.52 3.48 18.33 6.51 18.33H13.48C16.52 18.33 18.33 16.52 18.33 13.49V6.51C18.33 3.47 16.53 1.67 13.49 1.67Z" fill={c}/><path d="M13.33 9.37H10.63V6.67C10.63 6.32 10.34 6.04 10 6.04C9.66 6.04 9.38 6.32 9.38 6.67V9.37H6.67C6.33 9.37 6.04 9.66 6.04 10C6.04 10.34 6.33 10.62 6.67 10.62H9.38V13.33C9.38 13.67 9.66 13.96 10 13.96C10.34 13.96 10.63 13.67 10.63 13.33V10.62H13.33C13.68 10.62 13.96 10.34 13.96 10C13.96 9.66 13.68 9.37 13.33 9.37Z" fill={c}/></svg>;
  const SettingsIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M1.67 10.73V9.27C1.67 8.4 2.38 7.68 3.25 7.68C4.76 7.68 5.38 6.62 4.62 5.31C4.18 4.56 4.44 3.58 5.2 3.15L6.64 2.33C7.3 1.93 8.15 2.17 8.54 2.83L8.63 2.98C9.38 4.29 10.62 4.29 11.38 2.98L11.47 2.83C11.86 2.17 12.71 1.93 13.37 2.33L14.81 3.15C15.57 3.58 15.83 4.56 15.39 5.31C14.63 6.62 15.25 7.68 16.76 7.68C17.63 7.68 18.34 8.39 18.34 9.27V10.73C18.34 11.6 17.63 12.32 16.76 12.32C15.25 12.32 14.63 13.38 15.39 14.69C15.83 15.45 15.57 16.42 14.81 16.85L13.37 17.68C12.71 18.07 11.86 17.83 11.47 17.18L11.38 17.02C10.63 15.71 9.39 15.71 8.63 17.02L8.54 17.18C8.15 17.83 7.3 18.07 6.64 17.68L5.2 16.85C4.44 16.42 4.18 15.44 4.62 14.69C5.38 13.38 4.76 12.32 3.25 12.32C2.38 12.32 1.67 11.6 1.67 10.73Z" fill={c}/><path d="M10 12.71C11.5 12.71 12.71 11.5 12.71 10C12.71 8.5 11.5 7.29 10 7.29C8.5 7.29 7.29 8.5 7.29 10C7.29 11.5 8.5 12.71 10 12.71Z" fill={c}/></svg>;
  const HelpIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M14.17 7.5C14.17 10.72 11.37 13.33 7.92 13.33L7.14 14.27L6.68 14.82C6.29 15.28 5.54 15.18 5.28 14.62L4.17 12.17C2.65 11.1 1.67 9.41 1.67 7.5C1.67 4.27 4.47 1.67 7.92 1.67C10.43 1.67 12.61 3.06 13.58 5.06C13.96 5.8 14.17 6.62 14.17 7.5Z" fill={c}/><path d="M18.33 10.72C18.33 12.63 17.35 14.32 15.83 15.38L14.72 17.84C14.46 18.4 13.71 18.51 13.32 18.03L12.08 16.55C10.07 16.55 8.27 15.66 7.14 14.27L7.92 13.33C11.37 13.33 14.17 10.73 14.17 7.5C14.17 6.63 13.96 5.8 13.58 5.06C16.31 5.68 18.33 7.98 18.33 10.72Z" fill={c}/></svg>;
  const LogoutIco = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M7.5 6V14C7.5 16.67 9.17 18.33 11.83 18.33H14C16.66 18.33 18.33 16.67 18.33 14V6C18.33 3.33 16.67 1.67 14 1.67H11.83C9.17 1.67 7.5 3.33 7.5 6Z" fill="#B6B6B6"/><path d="M4.64 6.77L1.85 9.56C1.61 9.8 1.61 10.2 1.85 10.44L4.64 13.23C4.88 13.47 5.28 13.47 5.52 13.23C5.77 12.99 5.77 12.59 5.52 12.35L3.8 10.62H12.71C13.05 10.62 13.33 10.34 13.33 10C13.33 9.66 13.05 9.37 12.71 9.37H3.8L5.52 7.65C5.65 7.52 5.71 7.37 5.71 7.21C5.71 7.05 5.65 6.88 5.52 6.77C5.28 6.52 4.89 6.52 4.64 6.77Z" fill="#B6B6B6"/></svg>;

  return (
    <aside onClick={collapsed ? () => setCollapsed(false) : undefined}
      style={{ width: W, minWidth: W, background: "#121212", display: "flex", flexDirection: "column", height: "100vh", transition: "width 0.22s cubic-bezier(0.4,0,0.2,1), min-width 0.22s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden", position: "relative", flexShrink: 0, cursor: collapsed ? "pointer" : "default" }}>

      {/* Logo */}
      <div style={{ padding: collapsed ? "24px 0 0" : "24px 24px 0", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.png" alt="" />
          {!collapsed && <span style={{ color: "#E7E7E7", fontWeight: 800, fontSize: 20, fontFamily: "Sora, sans-serif" }}>Tailora</span>}
        </div>
        {!collapsed && (
          <button onClick={(e) => { e.stopPropagation(); setCollapsed(true); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#B6B6B6", display: "flex", borderRadius: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#B6B6B6"/><path d="M13.26 16.28C13.07 16.28 12.88 16.21 12.73 16.06L9.2 12.53C8.91 12.24 8.91 11.76 9.2 11.47L12.73 7.94C13.02 7.65 13.5 7.65 13.79 7.94C14.08 8.23 14.08 8.71 13.79 9L10.79 12L13.79 15C14.08 15.29 14.08 15.77 13.79 16.06C13.65 16.21 13.46 16.28 13.26 16.28Z" fill="#B6B6B6"/></svg>
          </button>
        )}
      </div>

      {/* Main Menu */}
      <div style={{ padding: "0 8px", marginBottom: 8 }}>
        {!collapsed && <div style={{ padding: "0 12px 6px", color: "#98A2B3", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Main Menu</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <NavBtn label="Dashboard" icon={<HomeIco c={ic(activeMenu === "Dashboard")} />} active={activeMenu === "Dashboard"} onClick={() => onMenuChange("Dashboard")} />
          <NavBtn label="Client Management" icon={<PeopleIco c={ic(activeMenu === "Client Management")} />} active={activeMenu === "Client Management"} onClick={() => onMenuChange("Client Management")} />
          <NavBtn label="Team Collaboration" icon={<TeamIco c={ic(activeMenu === "Team Collaboration")} />} active={activeMenu === "Team Collaboration"} onClick={() => onMenuChange("Team Collaboration")} />
        </div>
      </div>

      <div style={{ margin: "0 8px 8px", height: 1, background: "#33353A" }} />

      {/* Actions */}
      <div style={{ padding: "0 8px", marginBottom: "auto" }}>
        {!collapsed && <div style={{ padding: "0 12px 6px", color: "#98A2B3", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Actions</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <NavBtn label="Add Client" icon={<AddIco c="#B6B6B6" />} />
          <NavBtn label="Invite Co-worker" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M14 7.5H6C3.33 7.5 1.67 9.17 1.67 11.83V14C1.67 16.67 3.33 18.33 6 18.33H14C16.66 18.33 18.33 16.67 18.33 14V11.83C18.33 9.17 16.67 7.5 14 7.5Z" fill="#B6B6B6"/><path d="M13.23 10.36L10.44 13.15C10.2 13.39 9.8 13.39 9.56 13.15L6.77 10.36C6.53 10.12 6.53 9.72 6.77 9.47C7.01 9.23 7.41 9.23 7.65 9.47L9.38 11.2V2.29C9.38 1.95 9.66 1.67 10 1.67C10.34 1.67 10.63 1.95 10.63 2.29V11.2L12.35 9.47C12.48 9.35 12.63 9.29 12.79 9.29C12.95 9.29 13.11 9.35 13.23 9.47C13.48 9.72 13.48 10.11 13.23 10.36Z" fill="#B6B6B6"/></svg>} />
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: "0 8px 12px" }}>
        <NavBtn label="Settings" icon={<SettingsIco c="#28292D" />} active={true} onClick={() => onMenuChange("Settings")} />
        <NavBtn label="Help & Support" icon={<HelpIco c="#B6B6B6" />} />
      </div>

      {/* User */}
      <div style={{ padding: collapsed ? "12px 8px" : "12px 16px", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", borderTop: "1px solid #33353A", gap: 8 }}>
        {collapsed ? (
          <Tooltip label="Joshua's Couture">
            <img src="/Ellipse2481.png" alt="" style={{ width: 36, height: 36, borderRadius: "50%" }} />
          </Tooltip>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
              <img src="/Ellipse2481.png" alt="" style={{ width: 40, height: 40, borderRadius: "50%", border: "2.5px solid #F2F2F6" }} />
              <div style={{ overflow: "hidden" }}>
                <div style={{ color: "#E7E7E7", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Joshua's Couture</div>
                <div style={{ color: "#B6B6B6", fontSize: 12 }}>Atelier</div>
              </div>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}><LogoutIco /></button>
          </>
        )}
      </div>
    </aside>
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
  const [activeMenu, setActiveMenu] = useState("Settings");

  const tabs: Tab[] = ["Profile", "Workspace", "Notifications", "Security"];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FDFDFD", fontFamily: "Satoshi, Inter, sans-serif", overflow: "hidden" }}>
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AppHeader />

        <div style={{ flex: 1, overflowY: "auto", background: "#FDFDFD", position: "relative" }}>
          {/* Gradient */}
          <div style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />

          <div style={{ padding: "40px 36px", position: "relative" }}>
            {/* Page heading */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <h1 style={{ margin: "0 0 4px", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 24, color: "#121212", display: "flex", alignItems: "center", gap: 8 }}>
                  Settings <NigeriaBadge />
                </h1>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>
                  Manage your personal account, workspace preferences, and security in one place.
                </p>
              </div>
            </div>

            {/* Tab bar */}
            <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid #E4E7EC" }}>
              {tabs.map(tab => (
                <button
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
            <div style={{
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
    </div>
  );
}