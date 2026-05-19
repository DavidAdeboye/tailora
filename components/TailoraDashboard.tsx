"use client";
import { useState } from "react";
import InviteTeamMemberModal from "./InviteTeamMemberModal";
import SuccessModal from "./SuccessModal";

/* TYPES */
type Step = "dashboard" | "measurements" | "orderDetails";

interface ClientFormData {
  name: string; phone: string; email: string; gender: string; outfitType: string;
}
interface CustomField { id: string; name: string; value: string; }
interface MeasurementData {
  unit: "IN" | "CM"; fields: Record<string, string>; customFields: CustomField[];
}
interface OrderDetailsData {
  dateReceived: string; collectionDate: string; price: string;
  paymentStatus: string; assignedStaff: string;
}

/* ================================================================
   ICONS
================================================================ */
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

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path opacity="0.4" d="M7.97 4.94L2.91 10L7.97 15.06" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.09 10H3.05" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SmallChevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#595653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ================================================================
   SHARED: Header (used across all pages)
================================================================ */
function AppHeader({ onUserMenuToggle, title = "Dashboard" }: { onUserMenuToggle?: () => void; title?: string }) {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #F0F2F5", height: 83, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", flexShrink: 0 }}>
      <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "#28292D" }}>{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEFCF9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 1px rgba(78,78,78,0.16)" }}>
          <BellIcon />
        </button>
        <button onClick={onUserMenuToggle} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid #F1F1F2", borderRadius: 100, padding: "8px 12px", cursor: "pointer" }}>
          <img src="/Ellipse2481.png" alt="" />
          <ChevronDownIcon />
        </button>
      </div>
    </header>
  );
}

/* ================================================================
   SHARED: Step progress bar
================================================================ */
const ALL_STEPS = ["Client", "Measurements", "Order Details", "Review"];

function StepBar({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {ALL_STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: done || active ? "#121212" : "#DBDBDB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {done ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <span style={{ fontSize: 11, fontWeight: 600, color: active ? "#fff" : "#717680", fontFamily: "Satoshi, sans-serif" }}>{i + 1}</span>
                )}
              </div>
              <span style={{ fontSize: 14, fontWeight: active || done ? 500 : 400, color: active || done ? "#121212" : "#696969", fontFamily: "Satoshi, sans-serif", whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < ALL_STEPS.length - 1 && <div style={{ width: 36, height: 1, background: "#D3D5D8", margin: "0 8px" }} />}
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   SHARED: Gradient strip with Back + StepBar
================================================================ */
function FlowHeader({ step, orderId, onBack }: { step: number; orderId: string; onBack: () => void }) {
  return (
    <div style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", padding: "28px 36px 24px", flexShrink: 0 }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", marginBottom: 28, padding: 0 }}>
        <BackArrow /> Back
      </button>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1073, margin: "0 auto" }}>
        <StepBar current={step} />
        <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "#121212" }}>Order: {orderId}</span>
      </div>
    </div>
  );
}

/* ================================================================
   SHARED: Action buttons row (Save Draft + primary)
================================================================ */
function ActionButtons({ onDraft, onPrimary, primaryLabel = "Continue", primaryDisabled = false }: { onDraft: () => void; onPrimary: () => void; primaryLabel?: string; primaryDisabled?: boolean }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, display: "flex", justifyContent: "flex-end", gap: 24 }}>
      <button onClick={onDraft} disabled={primaryDisabled} style={{ padding: "13px 24px", width: 177, background: primaryDisabled ? "#ccc" : "transparent", border: "1px solid #121212", borderRadius: 999, fontSize: 14, fontWeight: 500, color: primaryDisabled ? "#999" : "#121212", fontFamily: "Satoshi, sans-serif", cursor: primaryDisabled ? "not-allowed" : "pointer" }}
        onMouseEnter={(e) => { if (!primaryDisabled) e.currentTarget.style.background = "#F5F5F5"; }}
        onMouseLeave={(e) => { if (!primaryDisabled) e.currentTarget.style.background = "transparent"; }}>
        Save Draft
      </button>
      <button onClick={onPrimary} disabled={primaryDisabled} style={{ padding: "13px 24px", width: 177, background: primaryDisabled ? "#ccc" : "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: primaryDisabled ? "#999" : "#fff", fontFamily: "Satoshi, sans-serif", cursor: primaryDisabled ? "not-allowed" : "pointer" }}
        onMouseEnter={(e) => { if (!primaryDisabled) e.currentTarget.style.background = "#333"; }}
        onMouseLeave={(e) => { if (!primaryDisabled) e.currentTarget.style.background = "#121212"; }}>
        {primaryLabel}
      </button>
    </div>
  );
}

/* ================================================================
   SIDEBAR
================================================================ */
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [v, setV] = useState(false);
  return (
    <div style={{ position: "relative", display: "flex" }} onMouseEnter={() => setV(true)} onMouseLeave={() => setV(false)}>
      {children}
      {v && (
        <div style={{ position: "absolute", left: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)", background: "#2C2C2C", color: "#fff", fontSize: 12, fontWeight: 500, padding: "5px 10px", borderRadius: 6, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 300, boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
          {label}
          <div style={{ position: "absolute", right: "100%", top: "50%", transform: "translateY(-50%)", borderWidth: "5px 6px 5px 0", borderStyle: "solid", borderColor: "transparent #2C2C2C transparent transparent" }} />
        </div>
      )}
    </div>
  );
}

function Sidebar({ activeMenu, onMenuChange, onAddClient }: { activeMenu: string; onMenuChange: (l: string) => void; onAddClient: () => void }) {
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

  const iconColor = (lbl: string) => activeMenu === lbl ? "#28292D" : "#B6B6B6";

  const HomeIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path opacity="0.4" d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z" fill={c}/><path d="M12 15.81V18.81" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const PeopleIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M14.6083 6.47C14.55 6.47 14.49 6.47 14.43 6.47C13.14 6.43 12.12 5.37 12.12 4.07C12.12 2.75 13.19 1.67 14.53 1.67C15.85 1.67 16.93 2.74 16.93 4.07C16.93 5.37 15.9 6.43 14.6083 6.47Z" fill={c}/><path d="M10.1 13.22C10.03 13.22 9.96 13.22 9.88 13.22C8.35 13.18 7.13 11.92 7.13 10.37C7.13 8.78 8.4 7.5 9.99 7.5C11.58 7.5 12.86 8.78 12.86 10.37C12.86 11.92 11.64 13.18 10.1 13.22Z" fill={c}/><path d="M7.39 14.95C6.13 15.79 6.13 17.18 7.39 18.01C8.83 18.97 11.18 18.97 12.61 18.01C13.87 17.17 13.87 15.78 12.61 14.95C11.18 13.99 8.83 13.99 7.39 14.95Z" fill={c}/></svg>;
  const TeamIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M7.5 1.67C5.32 1.67 3.54 3.44 3.54 5.62C3.54 7.77 5.22 9.5 7.4 9.57C7.47 9.57 7.53 9.57 7.58 9.57C9.78 9.5 11.46 7.77 11.46 5.62C11.46 3.44 9.68 1.67 7.5 1.67Z" fill={c}/><path d="M11.73 11.79C9.41 10.24 5.62 10.24 3.28 11.79C2.22 12.5 1.63 13.46 1.63 14.48C1.63 15.51 2.22 16.46 3.27 17.16C4.43 17.94 5.97 18.33 7.5 18.33C9.03 18.33 10.57 17.94 11.73 17.16C12.78 16.45 13.37 15.5 13.37 14.47C13.36 13.44 12.78 12.49 11.73 11.79Z" fill={c}/></svg>;
  const AddIco = ({ c = "#B6B6B6" }) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M13.49 1.67H6.51C3.48 1.67 1.67 3.47 1.67 6.51V13.48C1.67 16.52 3.48 18.33 6.51 18.33H13.48C16.52 18.33 18.33 16.52 18.33 13.49V6.51C18.33 3.47 16.53 1.67 13.49 1.67Z" fill={c}/><path d="M13.33 9.37H10.63V6.67C10.63 6.32 10.34 6.04 10 6.04C9.66 6.04 9.38 6.32 9.38 6.67V9.37H6.67C6.33 9.37 6.04 9.66 6.04 10C6.04 10.34 6.33 10.62 6.67 10.62H9.38V13.33C9.38 13.67 9.66 13.96 10 13.96C10.34 13.96 10.63 13.67 10.63 13.33V10.62H13.33C13.68 10.62 13.96 10.34 13.96 10C13.96 9.66 13.68 9.37 13.33 9.37Z" fill={c}/></svg>;
  const SettingsIco = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M1.67 10.73V9.27C1.67 8.4 2.38 7.68 3.25 7.68C4.76 7.68 5.38 6.62 4.62 5.31C4.18 4.56 4.44 3.58 5.2 3.15L6.64 2.33C7.3 1.93 8.15 2.17 8.54 2.83L8.63 2.98C9.38 4.29 10.62 4.29 11.38 2.98L11.47 2.83C11.86 2.17 12.71 1.93 13.37 2.33L14.81 3.15C15.57 3.58 15.83 4.56 15.39 5.31C14.63 6.62 15.25 7.68 16.76 7.68C17.63 7.68 18.34 8.39 18.34 9.27V10.73C18.34 11.6 17.63 12.32 16.76 12.32C15.25 12.32 14.63 13.38 15.39 14.69C15.83 15.45 15.57 16.42 14.81 16.85L13.37 17.68C12.71 18.07 11.86 17.83 11.47 17.18L11.38 17.02C10.63 15.71 9.39 15.71 8.63 17.02L8.54 17.18C8.15 17.83 7.3 18.07 6.64 17.68L5.2 16.85C4.44 16.42 4.18 15.44 4.62 14.69C5.38 13.38 4.76 12.32 3.25 12.32C2.38 12.32 1.67 11.6 1.67 10.73Z" fill="#B6B6B6"/><path d="M10 12.71C11.5 12.71 12.71 11.5 12.71 10C12.71 8.5 11.5 7.29 10 7.29C8.5 7.29 7.29 8.5 7.29 10C7.29 11.5 8.5 12.71 10 12.71Z" fill="#B6B6B6"/></svg>;
  const HelpIco = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M14.17 7.5C14.17 10.72 11.37 13.33 7.92 13.33L7.14 14.27L6.68 14.82C6.29 15.28 5.54 15.18 5.28 14.62L4.17 12.17C2.65 11.1 1.67 9.41 1.67 7.5C1.67 4.27 4.47 1.67 7.92 1.67C10.43 1.67 12.61 3.06 13.58 5.06C13.96 5.8 14.17 6.62 14.17 7.5Z" fill="#B6B6B6"/><path d="M18.33 10.72C18.33 12.63 17.35 14.32 15.83 15.38L14.72 17.84C14.46 18.4 13.71 18.51 13.32 18.03L12.08 16.55C10.07 16.55 8.27 15.66 7.14 14.27L7.92 13.33C11.37 13.33 14.17 10.73 14.17 7.5C14.17 6.63 13.96 5.8 13.58 5.06C16.31 5.68 18.33 7.98 18.33 10.72Z" fill="#B6B6B6"/></svg>;
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
          <NavBtn label="Dashboard" icon={<HomeIco c={iconColor("Dashboard")} />} active={activeMenu === "Dashboard"} onClick={() => onMenuChange("Dashboard")} />
          <NavBtn label="Client Management" icon={<PeopleIco c={iconColor("Client Management")} />} active={activeMenu === "Client Management"} onClick={() => onMenuChange("Client Management")} />
          <NavBtn label="Team Collaboration" icon={<TeamIco c={iconColor("Team Collaboration")} />} active={activeMenu === "Team Collaboration"} onClick={() => onMenuChange("Team Collaboration")} />
        </div>
      </div>

      <div style={{ margin: "0 8px 8px", height: 1, background: "#33353A" }} />

      {/* Actions */}
      <div style={{ padding: "0 8px", marginBottom: "auto" }}>
        {!collapsed && <div style={{ padding: "0 12px 6px", color: "#98A2B3", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Actions</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <NavBtn label="Add Client" icon={<AddIco c="#B6B6B6" />} onClick={onAddClient} />
          <NavBtn label="Invite Co-worker" icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path opacity="0.4" d="M14 7.5H6C3.33 7.5 1.67 9.17 1.67 11.83V14C1.67 16.67 3.33 18.33 6 18.33H14C16.66 18.33 18.33 16.67 18.33 14V11.83C18.33 9.17 16.67 7.5 14 7.5Z" fill="#B6B6B6"/><path d="M13.23 10.36L10.44 13.15C10.2 13.39 9.8 13.39 9.56 13.15L6.77 10.36C6.53 10.12 6.53 9.72 6.77 9.47C7.01 9.23 7.41 9.23 7.65 9.47L9.38 11.2V2.29C9.38 1.95 9.66 1.67 10 1.67C10.34 1.67 10.63 1.95 10.63 2.29V11.2L12.35 9.47C12.48 9.35 12.63 9.29 12.79 9.29C12.95 9.29 13.11 9.35 13.23 9.47C13.48 9.72 13.48 10.11 13.23 10.36Z" fill="#B6B6B6"/></svg>} />
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: "0 8px 12px" }}>
        <a href="/settings"><NavBtn label="Settings" icon={<SettingsIco />} /></a>
        <a href="/help"><NavBtn label="Help & Support" icon={<HelpIco />} /></a>
      </div>

      {/* User */}
      <div style={{ padding: collapsed ? "12px 8px" : "12px 16px", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", borderTop: "1px solid #33353A", gap: 8 }}>
        {collapsed ? (
          <Tooltip label="Joshua's Couture">
            <img src="/Ellipse2481.png" alt="" />
          </Tooltip>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
              <img src="/Ellipse2481.png" alt="" />
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

/* ================================================================
   ADD CLIENT MODAL
================================================================ */
function AddClientModal({ isOpen, onClose, onContinue }: { isOpen: boolean; onClose: () => void; onContinue: (d: ClientFormData) => void }) {
  const [form, setForm] = useState<ClientFormData>({ name: "", phone: "", email: "", gender: "", outfitType: "" });
  const set = (k: keyof ClientFormData, v: string) => setForm(p => ({ ...p, [k]: v }));

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #E2E4E9", borderRadius: 10, fontSize: 14, color: "#1A1A1A", fontFamily: "Satoshi, Inter, sans-serif", outline: "none", boxSizing: "border-box", background: "#fff" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,13,18,0.70)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: 514, background: "#fff", borderRadius: 16, overflow: "hidden", fontFamily: "Satoshi, Inter, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)", pointerEvents: "none", zIndex: 0 }} />
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: "50%", background: "#F5F7F8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
        <div style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: "0 0 16px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Add New Client</h2>
          <div style={{ height: 1, background: "#F1F1F2", marginBottom: 24 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Client Name", key: "name" as const, placeholder: "Add name", type: "text" },
              { label: "Phone Number", key: "phone" as const, placeholder: "Add number", type: "tel" },
            ].map(f => (
              <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => set(f.key, e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Email Address <span style={{ fontWeight: 400, color: "#525866" }}>(Optional)</span></label>
              <input type="email" placeholder="Add email address" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
            </div>
            {[
              { label: "Gender", key: "gender" as const, placeholder: "Select gender", opts: ["Male", "Female", "Other"] },
              { label: "Outfit Type", key: "outfitType" as const, placeholder: "Select outfit type", opts: ["Wedding Gown", "Suit", "Senator", "Agbada", "Ankara", "Kaftan"] },
            ].map(f => (
              <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>{f.label}</label>
                <div style={{ position: "relative" }}>
                  <select value={form[f.key]} onChange={e => set(f.key, e.target.value)} style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}>
                    <option value="" disabled>{f.placeholder}</option>
                    {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><SmallChevron /></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "13px 24px", background: "transparent", border: "1px solid #121212", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              Save Draft
            </button>
            <button onClick={() => onContinue(form)} style={{ flex: 1, padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#333")}
              onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MEASUREMENTS PAGE
================================================================ */
const MEASURE_ROWS = [
  [{ key: "neck", label: "Neck", hint: "Around base" }, { key: "chest", label: "Chest / Bust", hint: "Fullest point" }, { key: "waist", label: "Waist", hint: "Natural line" }],
  [{ key: "hip", label: "Hip", hint: "Fullest point" }, { key: "shoulder", label: "Shoulder", hint: "Seam to seam" }, { key: "sleeve", label: "Sleeve", hint: "Shoulder to wrist" }],
  [{ key: "trouserLength", label: "Trouser Length", hint: "Waist to hem" }],
];

function MeasurementsPage({ orderId, onBack, onContinue }: { orderId: string; onBack: () => void; onContinue: (d: MeasurementData) => void }) {
  const [unit, setUnit] = useState<"IN" | "CM">("IN");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [customs, setCustoms] = useState<CustomField[]>([{ id: "cf-0", name: "", value: "" }]);

  const setF = (k: string, v: string) => setFields(p => ({ ...p, [k]: v }));
  const addCustom = () => setCustoms(p => [...p, { id: `cf-${Date.now()}`, name: "", value: "" }]);
  const removeCustom = (id: string) => setCustoms(p => p.filter(f => f.id !== id));
  const updateCustom = (id: string, k: "name" | "value", v: string) => setCustoms(p => p.map(f => f.id === id ? { ...f, [k]: v } : f));

  const MeasureInput = ({ label, hint, fkey }: { label: string; hint: string; fkey: string }) => {
    const [focused, setFocused] = useState(false);
    return (
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>{label}</span>
          <span style={{ fontSize: 12, color: "#98A2B3", fontFamily: "Satoshi, sans-serif" }}>{hint}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", border: `1px solid ${focused ? "#121212" : "#E2E4E9"}`, borderRadius: 10, background: "#fff", overflow: "hidden", height: 40, transition: "border-color 0.15s" }}>
          <input type="number" min="0" step="0.1" value={fields[fkey] ?? ""} placeholder="0.0"
            onChange={e => setF(fkey, e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ flex: 1, padding: "0 12px", border: "none", outline: "none", height: "100%", fontSize: 14, color: "#525866", fontFamily: "Inter, sans-serif", background: "transparent", width: 0 }} />
          <span style={{ padding: "0 12px", fontSize: 13, fontWeight: 500, color: "#525866", fontFamily: "Inter, sans-serif", borderLeft: "1px solid #F1F1F2", height: "100%", display: "flex", alignItems: "center", background: "#FAFAFA" }}>{unit}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <AppHeader title="Dashboard" />
      <FlowHeader step={1} orderId={orderId} onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: 1073, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Body measurements</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Units</span>
                <div style={{ position: "relative" }}>
                  <select value={unit} onChange={e => setUnit(e.target.value as "IN" | "CM")} style={{ appearance: "none", WebkitAppearance: "none", padding: "8px 30px 8px 14px", border: "1px solid #E7E7E7", borderRadius: 8, background: "#fff", fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif", cursor: "pointer", outline: "none" }}>
                    <option value="IN">inches</option>
                    <option value="CM">cm</option>
                  </select>
                  <div style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><SmallChevron /></div>
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: "#F1F1F2", marginBottom: 32 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {MEASURE_ROWS.map((row, ri) => (
                <div key={ri} style={{ display: "flex", gap: 30 }}>
                  {row.map(f => <MeasureInput key={f.key} label={f.label} hint={f.hint} fkey={f.key} />)}
                  {Array.from({ length: 3 - row.length }).map((_, si) => <div key={si} style={{ flex: 1 }} />)}
                </div>
              ))}
              {/* Custom measurements */}
              <div style={{ border: "1.5px dashed #D3D5D8", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 20, width: 341, boxSizing: "border-box" }}>
                <span style={{ fontSize: 16, fontWeight: 300, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Custom measurements</span>
                {customs.map(cf => (
                  <div key={cf.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <input value={cf.name} onChange={e => updateCustom(cf.id, "name", e.target.value)} placeholder="Field name (e.g. Inseam)"
                      style={{ border: "none", borderBottom: "1px solid #E2E4E9", outline: "none", fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif", background: "transparent", padding: "2px 0" }} />
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #E2E4E9", borderRadius: 10, background: "#fff", height: 40, overflow: "hidden" }}>
                      <input type="number" min="0" step="0.1" value={cf.value} placeholder="0.0" onChange={e => updateCustom(cf.id, "value", e.target.value)}
                        style={{ flex: 1, padding: "0 12px", border: "none", outline: "none", height: "100%", fontSize: 14, color: "#525866", fontFamily: "Inter, sans-serif", background: "transparent", width: 0 }} />
                      <span style={{ padding: "0 10px", fontSize: 13, fontWeight: 500, color: "#525866", borderLeft: "1px solid #F1F1F2", height: "100%", display: "flex", alignItems: "center", background: "#FAFAFA" }}>{unit}</span>
                      <button onClick={() => removeCustom(cf.id)} style={{ padding: "0 10px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", borderLeft: "1px solid #F1F1F2", height: "100%" }}>
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667h5.334V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333h8l.667-9.333H3.333z" stroke="#FF3434" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addCustom} style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#121212", border: "none", borderRadius: 100, cursor: "pointer", fontSize: 14, color: "#fff", fontFamily: "Satoshi, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#333")} onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3.333v9.334M3.333 8h9.334" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Add Custom Measurement
              </button>
            </div>
          </div>
          <ActionButtons onDraft={() => {}} onPrimary={() => onContinue({ unit, fields, customFields: customs })} primaryLabel="Save" />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   ORDER DETAILS PAGE
================================================================ */
function OrderDetailsPage({ orderId, onBack, onSave }: { orderId: string; onBack: () => void; onSave: (d: OrderDetailsData) => void }) {
  const [form, setForm] = useState<OrderDetailsData>({ dateReceived: "2026-02-23", collectionDate: "2026-02-23", price: "", paymentStatus: "Paid", assignedStaff: "Ayo Adebusola" });
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [hasInvitedTeamMember, setHasInvitedTeamMember] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const set = (k: keyof OrderDetailsData, v: string) => setForm(p => ({ ...p, [k]: v }));
  const fmtDate = (iso: string) => iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #E2E4E9", borderRadius: 10, background: "#fff", fontSize: 14, color: "#525866", fontFamily: "Inter, sans-serif", outline: "none", boxSizing: "border-box", height: 40, transition: "border-color 0.15s" };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>{label}</span>
      {children}
    </div>
  );

  const SelectF = ({ value, opts, onChange }: { value: string; opts: string[]; onChange: (v: string) => void }) => (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}
        onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><SmallChevron /></div>
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <AppHeader />
      <FlowHeader step={2} orderId={orderId} onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: 1073, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px" }}>
            <h2 style={{ margin: "0 0 12px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Order Details</h2>
            <div style={{ height: 1, background: "#F1F1F2", marginBottom: 32 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", gap: 30 }}>
                <Field label="Date Received">
                  <div style={{ position: "relative" }}>
                    <input type="date" value={form.dateReceived} onChange={e => set("dateReceived", e.target.value)} style={{ ...inputStyle, color: "transparent" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#525866", fontFamily: "Inter, sans-serif", pointerEvents: "none" }}>{fmtDate(form.dateReceived)}</span>
                  </div>
                </Field>
                <Field label="Collection Date">
                  <div style={{ position: "relative" }}>
                    <input type="date" value={form.collectionDate} onChange={e => set("collectionDate", e.target.value)} style={{ ...inputStyle, color: "transparent" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#525866", fontFamily: "Inter, sans-serif", pointerEvents: "none" }}>{fmtDate(form.collectionDate)}</span>
                  </div>
                </Field>
                <Field label="Price">
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#98A2B3", pointerEvents: "none", zIndex: 1 }}>₦</span>
                    <input type="number" min="0" placeholder="00" value={form.price} onChange={e => set("price", e.target.value)} style={{ ...inputStyle, paddingLeft: 28 }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
                  </div>
                </Field>
              </div>
              <div style={{ display: "flex", gap: 30 }}>
                <Field label="Payment Status">
                  <SelectF value={form.paymentStatus} opts={["Paid", "Unpaid", "Part Payment", "Pending"]} onChange={v => set("paymentStatus", v)} />
                </Field>
                <Field label="Assigned Staff">
                  <SelectF value={form.assignedStaff} opts={["Ayo Adebusola", "Chidi Okafor", "Ngozi Eze", "Emeka Nwosu"]} onChange={v => set("assignedStaff", v)} />
                </Field>
                <div style={{ flex: 1 }} />
              </div>
              <button onClick={() => { setShowInviteModal(true); setHasInvitedTeamMember(true); }} style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#121212", border: "none", borderRadius: 100, cursor: "pointer", fontSize: 14, color: "#fff", fontFamily: "Satoshi, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#333")} onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.4" d="M9 9C11.07 9 12.75 7.32 12.75 5.25C12.75 3.18 11.07 1.5 9 1.5C6.93 1.5 5.25 3.18 5.25 5.25C5.25 7.32 6.93 9 9 9Z" fill="white"/><path d="M9 11.25C5.69 11.25 3 13.43 3 16.13C3 16.34 3.17 16.5 3.37 16.5H14.63C14.84 16.5 15 16.34 15 16.13C15 13.43 12.31 11.25 9 11.25Z" fill="white"/><path d="M15.75 7.5V10.5M15.75 9H14.25M15.75 9H17.25" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Invite Team Member
              </button>
            </div>
          </div>
<ActionButtons onDraft={() => {}} onPrimary={() => setShowSuccessModal(true)} primaryLabel="Save" primaryDisabled={!hasInvitedTeamMember} />        </div>
      </div>
      <InviteTeamMemberModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />
     <SuccessModal isOpen={showSuccessModal} title="Order Saved" message="Order details have been saved successfully" buttonLabel="Back to Dashboard" onAction={() => { setShowSuccessModal(false); onSave(form); }} />    </div>
  );
}

/* ================================================================
   DASHBOARD VIEW (the main screen)
================================================================ */
const orders = [
  { id: "#28373", client: "Chioma Adeyemi", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Wedding gown", status: "Collected", type: "collected" },
  { id: "#32876", client: "Chidi Adeyemi", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Suit", status: "Due in 3 days", type: "due" },
  { id: "#11394", client: "Ikenna Okonkwo", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Agbada", status: "Overdue 2 days", type: "overdue" },
  { id: "#99822", client: "Chidi Eze", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Senator", status: "Collected", type: "collected" },
  { id: "#11873", client: "Chioma Okonkwo", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Wedding gown", status: "Due in 3 days", type: "due" },
  { id: "#44921", client: "Oluwakemi Adekunle", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Ankara", status: "Collected", type: "collected" },
  { id: "#55102", client: "Babatunde Okonkwo", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Agbada", status: "Overdue 2 days", type: "overdue" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  collected: { bg: "#E7F6EC", color: "#036B26" },
  overdue: { bg: "#FBEAE9", color: "#9E0A05" },
  due: { bg: "#FEF6E7", color: "#865503" },
};

function DashboardView({ onAddClient, onSeeAll }: { onAddClient: () => void; onSeeAll: () => void }) {
  const stats = [
    { label: "Total Clients", value: "1,240", icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10.1 13.22C10.03 13.22 9.96 13.22 9.88 13.22C8.35 13.18 7.13 11.92 7.13 10.37C7.13 8.78 8.4 7.5 9.99 7.5C11.58 7.5 12.86 8.78 12.86 10.37C12.86 11.92 11.64 13.18 10.1 13.22Z" fill="#121212"/><path d="M7.39 14.95C6.13 15.79 6.13 17.18 7.39 18.01C8.83 18.97 11.18 18.97 12.61 18.01C13.87 17.17 13.87 15.78 12.61 14.95C11.18 13.99 8.83 13.99 7.39 14.95Z" fill="#121212"/></svg> },
    { label: "Pending Deliveries", value: "38", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.75 9.68V13.5C15.75 15.75 14.25 16.875 12.375 16.875H5.625C3.75 16.875 2.25 15.75 2.25 13.5V9C2.25 6.75 3.75 5.625 5.625 5.625H9" stroke="#121212" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.375 1.875V5.625M12.375 5.625V7.5M12.375 5.625H14.25M12.375 5.625H10.5" stroke="#121212" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    { label: "Orders in Progress", value: "12", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 9.49V12.26C13.5 14.6 11.69 16.5 9.5 16.5H9C6.79 16.5 5 14.6 5 12.26V9.49C5 11.83 6.81 13.5 9 13.5C11.19 13.5 13 11.83 13 9.49H13.5Z" fill="#121212"/><path opacity="0.4" d="M13.5 5.74V9.49H13C13 11.83 11.19 13.5 9 13.5C6.81 13.5 5 11.83 5 9.49V5.74C5 3.4 6.81 1.5 9 1.5C11.19 1.5 13 3.4 13.5 5.74Z" fill="#121212"/><path d="M13.5 5.74C13 3.4 11.19 1.5 9 1.5C6.81 1.5 5 3.4 5 5.74C5 6.56 5.21 7.33 5.59 8C6.45 9.41 7.94 10.5 9 10.5C10.06 10.5 11.55 9.41 12.41 8C12.79 7.33 13 6.56 13 5.74H13.5Z" fill="#121212"/></svg> },
    { label: "Team Members", value: "5", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.4" d="M6.75 1.5C4.68 1.5 3 3.18 3 5.25C3 7.29 4.63 8.97 6.72 9.02C6.78 9.01 6.84 9.01 6.89 9.02C8.79 8.97 10.5 7.29 10.5 5.25C10.5 3.18 8.82 1.5 6.75 1.5Z" fill="#121212"/><path d="M10.57 10.69C8.35 9.19 5.17 9.19 2.93 10.69C1.92 11.37 1.37 12.29 1.37 13.27C1.37 14.25 1.92 15.16 2.92 15.83C4.04 16.58 5.4 16.95 6.75 16.95C8.1 16.95 9.46 16.58 10.57 15.83C11.57 15.15 12.12 14.24 12.12 13.25C12.11 12.27 11.57 11.36 10.57 10.69Z" fill="#121212"/><path opacity="0.4" d="M15.47 5.52C15.6 7.14 14.45 8.54 12.85 8.73C12.75 8.73 12.75 8.73 12.65 8.73C12.59 8.73 12.53 8.73 12.47 8.75C11.7 8.79 10.99 8.55 10.46 8.1C11.28 7.36 11.76 6.24 11.66 5.02C11.6 4.37 11.38 3.77 11.04 3.26C11.31 3.11 11.62 3.01 11.96 2.98C13.58 2.84 15.06 4.06 15.47 5.52Z" fill="#121212"/><path d="M16.84 13.5C16.78 14.27 16.28 14.94 15.43 15.38C14.62 15.8 13.6 16.01 12.6 15.99C13.16 15.46 13.49 14.8 13.56 14.1C13.64 13.1 13.17 12.13 12.21 11.36C11.67 10.94 11.04 10.62 10.37 10.36C12.11 9.86 14.35 10.25 15.7 11.34C16.41 11.92 16.84 12.7 16.84 13.5Z" fill="#121212"/></svg> },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <AppHeader />
      <div style={{ flex: 1, overflowY: "auto", background: "#FDFDFD", position: "relative" }}>
        <div style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />
        <div style={{ padding: "40px 36px", position: "relative" }}>
          {/* Welcome row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 24, color: "#121212" }}>Welcome Joshua's Couture 🧵</h1>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969" }}>Your all-in-one tailoring business management hub</p>
            </div>
            <button onClick={onAddClient} style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#121212", border: "none", borderRadius: 100, cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 400, whiteSpace: "nowrap", fontFamily: "Satoshi, sans-serif" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.4" d="M12.14 1.5H5.86C3.13 1.5 1.5 3.13 1.5 5.86V12.14C1.5 14.87 3.13 16.5 5.86 16.5H12.14C14.87 16.5 16.5 14.87 16.5 12.14V5.86C16.5 3.13 14.87 1.5 12.14 1.5Z" fill="white"/><path d="M13.5 8.44H9.56V4.5C9.56 4.19 9.31 3.94 9 3.94C8.69 3.94 8.44 4.19 8.44 4.5V8.44H4.5C4.19 8.44 3.94 8.69 3.94 9C3.94 9.31 4.19 9.56 4.5 9.56H8.44V13.5C8.44 13.81 8.69 14.06 9 14.06C9.31 14.06 9.56 13.81 9.56 13.5V9.56H13.5C13.81 9.56 14.06 9.31 14.06 9C14.06 8.69 13.81 8.44 13.5 8.44Z" fill="white"/></svg>
              Add Client
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 40 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #F1F1F2", borderRadius: 16, padding: "24px 21px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  {s.icon}
                  <span style={{ fontSize: 14, color: "#696969" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Recent Orders table */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
              <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 400, fontSize: 18, color: "#121212" }}>Recent Orders</h2>
              <button onClick={onSeeAll} style={{ fontSize: 14, color: "#121212", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>See all</button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: 10, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F8F8F8" }}>
                    {["Client Name", "Phone Number", "Gender", "Outfit Type", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "12px 24px", textAlign: i === 5 ? "center" : "left", fontSize: 12, fontWeight: 500, color: "#344054", borderBottom: "1px solid #E4E7EC" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => {
                    const st = statusStyle[o.type];
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #E5E7EB" }}>
                        <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "#101928" }}>{o.client}</td>
                        <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{o.phone}</td>
                        <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{o.gender}</td>
                        <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054" }}>{o.outfit}</td>
                        <td style={{ padding: "16px 24px" }}>
                          <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 12, fontSize: 12, fontWeight: 500, background: st.bg, color: st.color }}>{o.status}</span>
                        </td>
                        <td style={{ padding: "16px 24px", textAlign: "center" }}>
                          <button style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: "1px solid #E4E7EC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" fill="#000"/><circle cx="12" cy="12" r="2" fill="#000"/><circle cx="12" cy="19" r="2" fill="#000"/></svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#667185", fontFamily: "Inter, sans-serif" }}>Page 1 of 30</span>
                <div style={{ display: "flex", gap: 16 }}>
                  {["← Previous", "Next →"].map(lbl => (
                    <button key={lbl} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#344054", fontFamily: "Inter, sans-serif" }}>{lbl}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ================================================================
   CLIENT DATA
================================================================ */
const clientData = [
  { id: "#28373", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Wedding gown", status: "Collected", type: "collected" },
  { id: "#32876", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Suit", status: "Collected", type: "collected" },
  { id: "#11394", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Wedding gown", status: "Overdue 2 days", type: "overdue" },
  { id: "#99822", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Senator", status: "Due in 3 days", type: "due" },
  { id: "#11873", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Senator", status: "Due in 3 days", type: "due" },
  { id: "#33644", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Senator", status: "Collected", type: "collected" },
  { id: "#00297", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Male", outfit: "Senator", status: "Collected", type: "collected" },
  { id: "#00298", name: "Olamide Akintan", phone: "+234 **** 2039 ****", gender: "Female", outfit: "Senator", status: "Collected", type: "collected" },
];

/* ================================================================
   CLIENT MANAGEMENT VIEW
================================================================ */
function ClientManagementView({ onAddClient }: { onAddClient: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = clientData.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <AppHeader title="Client Management" />
      <div style={{ flex: 1, overflowY: "auto", background: "#FDFDFD", position: "relative" }}>
        <div style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />
        <div style={{ padding: "40px 36px", position: "relative" }}>

          {/* Page heading row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 24, color: "#121212", display: "flex", alignItems: "center", gap: 8 }}>
                Client <span>🧵</span>
              </h1>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>Check out the most recent list of clients.</p>
            </div>
            <button onClick={onAddClient} style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#121212", border: "none", borderRadius: 100, cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 400, whiteSpace: "nowrap", fontFamily: "Satoshi, sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#333")}
              onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.4" d="M12.14 1.5H5.86C3.13 1.5 1.5 3.13 1.5 5.86V12.14C1.5 14.87 3.13 16.5 5.86 16.5H12.14C14.87 16.5 16.5 14.87 16.5 12.14V5.86C16.5 3.13 14.87 1.5 12.14 1.5Z" fill="white"/><path d="M13.5 8.44H9.56V4.5C9.56 4.19 9.31 3.94 9 3.94C8.69 3.94 8.44 4.19 8.44 4.5V8.44H4.5C4.19 8.44 3.94 8.69 3.94 9C3.94 9.31 4.19 9.56 4.5 9.56H8.44V13.5C8.44 13.81 8.69 14.06 9 14.06C9.31 14.06 9.56 13.81 9.56 13.5V9.56H13.5C13.81 9.56 14.06 9.31 14.06 9C14.06 8.69 13.81 8.44 13.5 8.44Z" fill="white"/></svg>
              Add Client
            </button>
          </div>

          {/* Table card */}
          <div style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 4px -2px rgba(0,0,0,0.04)" }}>

            {/* Controls row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative", width: 291 }}>
                  <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="#667185" strokeWidth="1.67"/><path d="M15 15L13 13" stroke="#667185" strokeWidth="1.67" strokeLinecap="round"/></svg>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search here..."
                    style={{ width: "100%", padding: "8px 12px 8px 34px", border: "1px solid #D0D5DD", borderRadius: 6, fontSize: 14, fontFamily: "Satoshi, sans-serif", color: "#667185", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#D0D5DD")} />
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#344054", fontFamily: "Satoshi, sans-serif" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M2 5h16M8 15h4" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  Filter
                </button>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#344054", fontFamily: "Satoshi, sans-serif" }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="#344054" strokeWidth="1.5"/><path d="M3 8h14M7 2v4M13 2v4" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Select dates
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F8F8" }}>
                  {["ID", "Client Name", "Phone Number", "Gender", "Outfit Type", "Status", ""].map((h, i) => (
                    <th key={i} style={{ padding: "12px 24px", textAlign: i === 6 ? "center" : "left", fontSize: 12, fontWeight: 500, color: "#344054", borderBottom: "1px solid #E4E7EC", fontFamily: "Inter, sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const st = statusStyle[c.type];
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid #E5E7EB" }}>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "Satoshi, sans-serif" }}>{c.id}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "#101928", fontFamily: "Satoshi, sans-serif" }}>{c.name}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "Inter, sans-serif" }}>{c.phone}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "Inter, sans-serif" }}>{c.gender}</td>
                      <td style={{ padding: "16px 24px", fontSize: 14, color: "#344054", fontFamily: "Inter, sans-serif" }}>{c.outfit}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 12, fontSize: 12, fontWeight: 500, background: st.bg, color: st.color, fontFamily: "Satoshi, sans-serif" }}>{c.status}</span>
                      </td>
                      <td style={{ padding: "16px 24px", textAlign: "center" }}>
                        <button style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: "1px solid #E4E7EC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" fill="#000"/><circle cx="12" cy="12" r="2" fill="#000"/><circle cx="12" cy="19" r="2" fill="#000"/></svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{ padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#667185", fontFamily: "Inter, sans-serif" }}>Page 1 of 30</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[1, 2, 3, "...", 10, 11, 12].map((p, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: p === 3 ? "#FFECE5" : "#fff", color: p === 3 ? "#EB5017" : "#98A2B3", fontFamily: "Inter, sans-serif", cursor: typeof p === "number" ? "pointer" : "default" }}>{p}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                {["← Previous", "Next →"].map(lbl => (
                  <button key={lbl} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#344054", fontFamily: "Inter, sans-serif" }}>{lbl}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




/* ================================================================
   TEAM COLLABORATION VIEW
================================================================ */
const roleStyle: Record<string, { bg: string; color: string }> = {
  Admin:     { bg: "#E3EFFC", color: "#04326B" },
  Tailor:    { bg: "#E7F6EC", color: "#036B26" },
  Assistant: { bg: "#FEF6E7", color: "#865503" },
};

const teamMembers = [
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Admin",     joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Tailor",    joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Assistant", joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Admin",     joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Tailor",    joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Assistant", joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Admin",     joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Tailor",    joined: "Joined Jan 2024" },
  { name: "Olamide Akintan", email: "sara@atelier.co", role: "Assistant", joined: "Joined Jan 2024" },
];

function TeamCollaborationView() {
  const [showInvite, setShowInvite] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = teamMembers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <AppHeader title="Team Collaboration" />
      <div style={{ flex: 1, overflowY: "auto", background: "#FDFDFD", position: "relative" }}>
        <div style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />
        <div style={{ padding: "40px 36px", position: "relative" }}>

          {/* Heading row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 24, color: "#121212", display: "flex", alignItems: "center", gap: 8 }}>
                Team Collaboration <span>👕</span>
              </h1>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>
                Manage your atelier's team and control who can access, edit, and assign work across your workspace.
              </p>
            </div>
            <button onClick={() => setShowInvite(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#121212", border: "none", borderRadius: 100, cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 400, whiteSpace: "nowrap", fontFamily: "Satoshi, sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#333")}
              onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.4" d="M9 9C11.07 9 12.75 7.32 12.75 5.25C12.75 3.18 11.07 1.5 9 1.5C6.93 1.5 5.25 3.18 5.25 5.25C5.25 7.32 6.93 9 9 9Z" fill="white"/><path d="M9 11.25C5.69 11.25 3 13.43 3 16.13C3 16.34 3.17 16.5 3.37 16.5H14.63C14.84 16.5 15 16.34 15 16.13C15 13.43 12.31 11.25 9 11.25Z" fill="white"/><path d="M15.75 7.5V10.5M15.75 9H14.25M15.75 9H17.25" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Invite Member
            </button>
          </div>

          {/* Filter bar */}
          <div style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: 10, padding: 16, marginBottom: 24, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 4px 4px -2px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "relative", width: 291 }}>
              <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="#667185" strokeWidth="1.67"/><path d="M15 15L13 13" stroke="#667185" strokeWidth="1.67" strokeLinecap="round"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search here..."
                style={{ width: "100%", padding: "8px 12px 8px 34px", border: "1px solid #D0D5DD", borderRadius: 6, fontSize: 14, fontFamily: "Satoshi, sans-serif", color: "#667185", outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                onBlur={e => (e.currentTarget.style.borderColor = "#D0D5DD")} />
            </div>
            {["All Roles", "All Status"].map(label => (
              <button key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#344054", fontFamily: "Satoshi, sans-serif" }}>
                {label}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ))}
          </div>

          {/* Team grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {filtered.map((m, i) => {
              const rs = roleStyle[m.role];
              return (
                <div key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Top row: avatar + name + menu */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img src="/Ellipse2481.png" alt="" />
                      <div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "#121212", lineHeight: "20px" }}>{m.name}</div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14, color: "#555960", lineHeight: "20px" }}>{m.email}</div>
                      </div>
                    </div>
                    <button style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: "1px solid #E4E7EC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" fill="#000"/><circle cx="12" cy="12" r="2" fill="#000"/><circle cx="12" cy="19" r="2" fill="#000"/></svg>
                    </button>
                  </div>

                  {/* Role + status row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 12, fontSize: 12, fontWeight: 500, background: rs.bg, color: rs.color, fontFamily: "Satoshi, sans-serif" }}>{m.role}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#036B26" }} />
                      <span style={{ fontSize: 12, color: "#036B26", fontFamily: "Satoshi, sans-serif" }}>Active</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "#E5E7EB" }} />

                  {/* Joined */}
                  <div style={{ fontSize: 12, color: "#555960", fontFamily: "Satoshi, sans-serif" }}>{m.joined}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <InviteTeamMemberModal isOpen={showInvite} onClose={() => setShowInvite(false)} />
    </div>
  );
}




/* ================================================================
   ROOT: TailoraDashboard  ← use this in your app
================================================================ */
export default function TailoraDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [step, setStep] = useState<Step>("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [orderId] = useState("#A-2041");

  const handleModalContinue = (_data: ClientFormData) => {
    setShowModal(false);
    setStep("measurements");
  };

  const handleMeasurementsContinue = (_data: MeasurementData) => {
    setStep("orderDetails");
  };

  const handleOrderSave = (_data: OrderDetailsData) => {
    // All done — go back to dashboard
    setStep("dashboard");
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FDFDFD", fontFamily: "Satoshi, Inter, sans-serif", overflow: "hidden" }}>
      {/* Sidebar only shown on dashboard */}
      {step === "dashboard" && (
        <Sidebar
          activeMenu={activeMenu}
          onMenuChange={setActiveMenu}
          onAddClient={() => setShowModal(true)}
        />
      )}

      {/* Page content */}
      {step === "dashboard" && activeMenu === "Dashboard" && (
        <DashboardView
          onAddClient={() => setShowModal(true)}
          onSeeAll={() => setActiveMenu("Client Management")}
        />
      )}
      {step === "dashboard" && activeMenu === "Client Management" && (
        <ClientManagementView onAddClient={() => setShowModal(true)} />
      )}
      {step === "dashboard" && activeMenu === "Team Collaboration" && (
         <TeamCollaborationView />
      )}
      {step === "measurements" && (
        <MeasurementsPage
          orderId={orderId}
          onBack={() => { setStep("dashboard"); setShowModal(true); }}
          onContinue={handleMeasurementsContinue}
        />
      )}
      {step === "orderDetails" && (
        <OrderDetailsPage
          orderId={orderId}
          onBack={() => setStep("measurements")}
          onSave={handleOrderSave}
        />
      )}

      {/* Add Client modal */}
      <AddClientModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinue={handleModalContinue}
      />
    </div>
  );
}