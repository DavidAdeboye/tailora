"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import LogoutModal from "./LogoutModal";

/* ================================================================
   ICONS
================================================================ */
function HomeIcon({ color = "#B6B6B6" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path opacity="0.4" d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z" fill={color} />
      <path d="M12 15.81V18.81" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon({ color = "#B6B6B6" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M14.6083 6.47484C14.55 6.46651 14.4917 6.46651 14.4333 6.47484C13.1417 6.43317 12.1167 5.37484 12.1167 4.07484C12.1167 2.74984 13.1917 1.6665 14.525 1.6665C15.85 1.6665 16.9333 2.7415 16.9333 4.07484C16.925 5.37484 15.9 6.43317 14.6083 6.47484Z" fill={color} />
      <path opacity="0.4" d="M17.325 12.2498C16.3917 12.8748 15.0833 13.1082 13.875 12.9498C14.1917 12.2665 14.3583 11.5082 14.3667 10.7082C14.3667 9.87485 14.1833 9.08318 13.8333 8.39152C15.0667 8.22485 16.375 8.45817 17.3167 9.08317C18.6333 9.94984 18.6333 11.3748 17.325 12.2498Z" fill={color} />
      <path opacity="0.4" d="M5.36667 6.47484C5.425 6.46651 5.48333 6.46651 5.54167 6.47484C6.83333 6.43317 7.85833 5.37484 7.85833 4.07484C7.85833 2.74984 6.78333 1.6665 5.45 1.6665C4.125 1.6665 3.04167 2.7415 3.04167 4.07484C3.05 5.37484 4.075 6.43317 5.36667 6.47484Z" fill={color} />
      <path opacity="0.4" d="M5.45833 10.7083C5.45833 11.5167 5.63333 12.2833 5.95 12.975C4.775 13.1 3.55 12.85 2.65 12.2583C1.33333 11.3833 1.33333 9.95833 2.65 9.08333C3.54167 8.48333 4.8 8.24167 5.98333 8.37501C5.64166 9.07501 5.45833 9.86668 5.45833 10.7083Z" fill={color} />
      <path d="M10.1 13.225C10.0333 13.2167 9.95833 13.2167 9.88333 13.225C8.35 13.175 7.125 11.9167 7.125 10.3667C7.125 8.78334 8.4 7.5 9.99167 7.5C11.575 7.5 12.8583 8.78334 12.8583 10.3667C12.8583 11.9167 11.6417 13.175 10.1 13.225Z" fill={color} />
      <path d="M7.39166 14.9502C6.13333 15.7919 6.13333 17.1752 7.39166 18.0085C8.825 18.9669 11.175 18.9669 12.6083 18.0085C13.8667 17.1669 13.8667 15.7835 12.6083 14.9502C11.1833 13.9919 8.83333 13.9919 7.39166 14.9502Z" fill={color} />
    </svg>
  );
}

function TeamIcon({ color = "#B6B6B6" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M7.5 1.6665C5.31667 1.6665 3.54167 3.4415 3.54167 5.62484C3.54167 7.7665 5.21667 9.49984 7.4 9.57484C7.46667 9.5665 7.53333 9.5665 7.58333 9.57484C7.6 9.57484 7.60833 9.57484 7.625 9.57484C7.63333 9.57484 7.63333 9.57484 7.64167 9.57484C9.775 9.49984 11.45 7.7665 11.4583 5.62484C11.4583 3.4415 9.68333 1.6665 7.5 1.6665Z" fill={color} />
      <path d="M11.7333 11.7919C9.40834 10.2419 5.61667 10.2419 3.275 11.7919C2.21667 12.5002 1.63334 13.4586 1.63334 14.4836C1.63334 15.5086 2.21667 16.4586 3.26667 17.1586C4.43334 17.9419 5.96667 18.3336 7.5 18.3336C9.03334 18.3336 10.5667 17.9419 11.7333 17.1586C12.7833 16.4502 13.3667 15.5002 13.3667 14.4669C13.3583 13.4419 12.7833 12.4919 11.7333 11.7919Z" fill={color} />
      <path opacity="0.4" d="M16.6583 6.11659C16.7917 7.73325 15.6417 9.14992 14.05 9.34159C14.0417 9.34159 14.0417 9.34159 14.0333 9.34159H14.0083C13.9583 9.34159 13.9083 9.34159 13.8667 9.35825C13.0583 9.39992 12.3167 9.14159 11.7583 8.66659C12.6167 7.89992 13.1083 6.74992 13.0083 5.49992C12.95 4.82492 12.7167 4.20825 12.3667 3.68325C12.6833 3.52492 13.05 3.42492 13.425 3.39159C15.0583 3.24992 16.5167 4.46659 16.6583 6.11659Z" fill={color} />
      <path d="M18.325 13.8252C18.2583 14.6335 17.7417 15.3335 16.875 15.8085C16.0417 16.2668 14.9917 16.4835 13.95 16.4585C14.55 15.9168 14.9 15.2418 14.9667 14.5252C15.05 13.4918 14.5583 12.5002 13.575 11.7085C13.0167 11.2668 12.3667 10.9168 11.6583 10.6585C13.5 10.1252 15.8167 10.4835 17.2417 11.6335C18.0083 12.2502 18.4 13.0252 18.325 13.8252Z" fill={color} />
    </svg>
  );
}

function AddClientIcon({ color = "#B6B6B6" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M13.4917 1.6665H6.50833C3.475 1.6665 1.66667 3.47484 1.66667 6.50817V13.4832C1.66667 16.5248 3.475 18.3332 6.50833 18.3332H13.4833C16.5167 18.3332 18.325 16.5248 18.325 13.4915V6.50817C18.3333 3.47484 16.525 1.6665 13.4917 1.6665Z" fill={color} />
      <path d="M13.3333 9.37484H10.625V6.6665C10.625 6.32484 10.3417 6.0415 10 6.0415C9.65833 6.0415 9.375 6.32484 9.375 6.6665V9.37484H6.66667C6.325 9.37484 6.04167 9.65817 6.04167 9.99984C6.04167 10.3415 6.325 10.6248 6.66667 10.6248H9.375V13.3332C9.375 13.6748 9.65833 13.9582 10 13.9582C10.3417 13.9582 10.625 13.6748 10.625 13.3332V10.6248H13.3333C13.675 10.6248 13.9583 10.3415 13.9583 9.99984C13.9583 9.65817 13.675 9.37484 13.3333 9.37484Z" fill={color} />
    </svg>
  );
}

function InviteIcon({ color = "#B6B6B6" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M14 7.5H6C3.33333 7.5 1.66667 9.16667 1.66667 11.8333V13.9917C1.66667 16.6667 3.33333 18.3333 6 18.3333H13.9917C16.6583 18.3333 18.325 16.6667 18.325 14V11.8333C18.3333 9.16667 16.6667 7.5 14 7.5Z" fill={color} />
      <path d="M13.2333 10.3582L10.4417 13.1498C10.2 13.3915 9.8 13.3915 9.55833 13.1498L6.76666 10.3582C6.525 10.1165 6.525 9.7165 6.76666 9.47484C7.00833 9.23317 7.40833 9.23317 7.65 9.47484L9.375 11.1998V2.2915C9.375 1.94984 9.65833 1.6665 10 1.6665C10.3417 1.6665 10.625 1.94984 10.625 2.2915V11.1998L12.35 9.47484C12.475 9.34984 12.6333 9.2915 12.7917 9.2915C12.95 9.2915 13.1083 9.34984 13.2333 9.47484C13.4833 9.7165 13.4833 10.1082 13.2333 10.3582Z" fill={color} />
    </svg>
  );
}

function SettingsIcon({ color = "#B6B6B6" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M1.66667 10.7334V9.26669C1.66667 8.40003 2.375 7.68336 3.25 7.68336C4.75833 7.68336 5.375 6.61669 4.61667 5.30836C4.18333 4.55836 4.44167 3.58336 5.2 3.15003L6.64167 2.32503C7.3 1.93336 8.15 2.1667 8.54167 2.82503L8.63333 2.98336C9.38333 4.2917 10.6167 4.2917 11.375 2.98336L11.4667 2.82503C11.8583 2.1667 12.7083 1.93336 13.3667 2.32503L14.8083 3.15003C15.5667 3.58336 15.825 4.55836 15.3917 5.30836C14.6333 6.61669 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3417 8.39169 18.3417 9.26669V10.7334C18.3417 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3917 14.6917C15.825 15.45 15.5667 16.4167 14.8083 16.85L13.3667 17.675C12.7083 18.0667 11.8583 17.8334 11.4667 17.175L11.375 17.0167C10.625 15.7084 9.39167 15.7084 8.63333 17.0167L8.54167 17.175C8.15 17.8334 7.3 18.0667 6.64167 17.675L5.2 16.85C4.44167 16.4167 4.18333 15.4417 4.61667 14.6917C5.375 13.3834 4.75833 12.3167 3.25 12.3167C2.375 12.3167 1.66667 11.6 1.66667 10.7334Z" fill={color} />
      <path d="M10 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 10 7.2915C8.50423 7.2915 7.29167 8.50407 7.29167 9.99984C7.29167 11.4956 8.50423 12.7082 10 12.7082Z" fill={color} />
    </svg>
  );
}

function HelpIcon({ color = "#B6B6B6" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M14.1666 7.49984C14.1666 10.7248 11.3666 13.3332 7.91663 13.3332L7.14163 14.2665L6.6833 14.8165C6.29163 15.2832 5.54162 15.1832 5.28329 14.6248L4.16663 12.1665C2.64996 11.0998 1.66663 9.40817 1.66663 7.49984C1.66663 4.27484 4.46663 1.6665 7.91663 1.6665C10.4333 1.6665 12.6083 3.05818 13.5833 5.05818C13.9583 5.79984 14.1666 6.62484 14.1666 7.49984Z" fill={color} />
      <path d="M18.3334 10.7169C18.3334 12.6252 17.3501 14.3169 15.8334 15.3836L14.7167 17.8419C14.4584 18.4002 13.7084 18.5086 13.3167 18.0336L12.0834 16.5502C10.0667 16.5502 8.26672 15.6586 7.14172 14.2669L7.91672 13.3336C11.3667 13.3336 14.1667 10.7253 14.1667 7.50025C14.1667 6.62525 13.9584 5.80026 13.5834 5.05859C16.3084 5.68359 18.3334 7.98358 18.3334 10.7169Z" fill={color} />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M7.5 5.99984V13.9915C7.5 16.6665 9.16667 18.3332 11.8333 18.3332H13.9917C16.6583 18.3332 18.325 16.6665 18.325 13.9998V5.99984C18.3333 3.33317 16.6667 1.6665 14 1.6665H11.8333C9.16667 1.6665 7.5 3.33317 7.5 5.99984Z" fill="#B6B6B6" />
      <path d="M4.64162 6.7666L1.84995 9.55827C1.60828 9.79994 1.60828 10.1999 1.84995 10.4416L4.64162 13.2333C4.88328 13.4749 5.28328 13.4749 5.52495 13.2333C5.76662 12.9916 5.76662 12.5916 5.52495 12.3499L3.79995 10.6249H12.7083C13.05 10.6249 13.3333 10.3416 13.3333 9.99993C13.3333 9.65827 13.05 9.37493 12.7083 9.37493H3.79995L5.52495 7.64994C5.64995 7.52494 5.70828 7.3666 5.70828 7.20827C5.70828 7.04993 5.64995 6.88327 5.52495 6.7666C5.28328 6.5166 4.89162 6.5166 4.64162 6.7666Z" fill="#B6B6B6" />
    </svg>
  );
}

/* ================================================================
   TYPES
================================================================ */
interface SidebarProps {
  activeMenu?: string;
  onAddClient?: () => void;
  onInviteCoworker?: () => void;
  mobileOpen?: boolean;
  onNavigate?: () => void;
  onCloseMobile?: () => void;
}

type IconComp = React.FC<{ color?: string }>;

/* ================================================================
   TOOLTIP
================================================================ */
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "absolute",
            left: "calc(100% + 12px)",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#2C2C2C",
            color: "#fff",
            fontSize: 12,
            fontWeight: 500,
            padding: "5px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 300,
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   NAV BUTTON
================================================================ */
function NavBtn({
  label,
  icon: Icon,
  active = false,
  collapsed,
  onClick,
}: {
  label: string;
  icon: IconComp;
  active?: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const iconColor = active ? "#28292D" : "#B6B6B6";

  const btn = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : 12,
        justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? "12px" : "12px 16px",
        borderRadius: 6,
        background: active ? "#FDF6EC" : "transparent",
        border: "none",
        cursor: "pointer",
        width: "100%",
        color: active ? "#28292D" : "#B6B6B6",
        fontSize: 14,
        fontWeight: active ? 500 : 400,
        fontFamily: "'Satoshi', 'Inter', sans-serif",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ flexShrink: 0 }}>
        <Icon color={iconColor} />
      </span>
      {!collapsed && <span>{label}</span>}
    </button>
  );

  return collapsed ? <Tooltip label={label}>{btn}</Tooltip> : btn;
}

const PAGE_ROUTES: Record<string, string> = {
  Dashboard: "/dashboard",
  "Client Management": "/clients",
  "Team Collaboration": "/team",
  Settings: "/settings",
  "Help & Support": "/help",
};

/* ================================================================
   TOGGLE BUTTON (appears on sidebar hover)
================================================================ */
function ToggleButton({
  collapsed,
  sidebarHovered,
  onClick,
}: {
  collapsed: boolean;
  sidebarHovered: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={collapsed ? "Open sidebar" : "Close sidebar"}
      style={{
        position: "absolute",
        top: 24,
        right: -12,
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#2C2C2C",
        border: "1.5px solid #3A3A3A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 200,
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        // Fade in/out based on sidebar hover
        opacity: sidebarHovered ? 1 : 0,
        pointerEvents: sidebarHovered ? "auto" : "none",
        transition: "opacity 0.18s ease, background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#3A3A3A";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#2C2C2C";
      }}
    >
      {/* Chevron icon — points right when collapsed, left when open */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        style={{
          transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <path
          d="M4.5 2.5L8 6L4.5 9.5"
          stroke="#B6B6B6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ================================================================
   SIDEBAR
================================================================ */
export default function Sidebar({
  activeMenu = "Dashboard",
  onAddClient,
  onInviteCoworker,
  mobileOpen = false,
  onNavigate,
  onCloseMobile,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "";

  // Sidebar open/closed is now controlled by a click, not hover
  const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("sidebar-open");
  if (saved === "true") setIsOpen(true);
}, []);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // ── Profile data from Supabase ──
  const [profileName, setProfileName] = useState<string>("");
  const [profileEmail, setProfileEmail] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // Initialize userRole from cached role so the UI doesn't flash incorrect items
  type UserRole = 'Owner' | 'Admin' | 'Tailor' | 'Assistant';
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const cachedRole = localStorage.getItem('tailora_role');
      if (cachedRole && ['Owner', 'Admin', 'Tailor', 'Assistant'].includes(cachedRole)) {
        return cachedRole as UserRole;
      }
    } catch {}
    return 'Owner'; // first-time users default to owner
  });

  const roleBadgeStyles: Record<UserRole, { bg: string; color: string; label: string }> = {
    Owner:     { bg: '#E7F6EC', color: '#036B26', label: 'Owner' },
    Admin:     { bg: '#E8EFFD', color: '#1A56DB', label: 'Admin' },
    Tailor:    { bg: '#FEF0E6', color: '#C4550A', label: 'Tailor' },
    Assistant: { bg: '#F0E6FE', color: '#7C3AED', label: 'Assistant' },
  };

  useEffect(() => {
    let mounted = true;

    try {
      const storedName = localStorage.getItem('tailora_fullname');
      if (storedName) setProfileName(storedName);
      const storedBusiness = localStorage.getItem('tailora_businessname');
      if (storedBusiness) setBusinessName(storedBusiness);
      const storedAvatar = localStorage.getItem('tailora_avatar');
      if (storedAvatar) setProfileAvatar(storedAvatar);
    } catch {}

    async function loadProfile() {
      try {
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !(userData as any)?.user) return;

        const user = (userData as any).user;
        if (mounted) {
          setProfileEmail(user.email ?? "");
        }

        // Check if user is a team member using RPC (bypasses RLS)
        let member: any = null;
        
        const { data: rpcResult, error: rpcErr } = await supabase.rpc('get_my_team_role');
        if (!rpcErr && rpcResult && rpcResult.length > 0) {
          member = rpcResult[0];
        }

        const ownerId = member ? member.owner_id : user.id;

        const { data: profile, error: profileErr } = await supabase
          .from("profiles")
          .select("full_name, business_name, avatar_path")
          .eq("id", user.id)
          .maybeSingle();

        const { data: ownerProfile } = member
          ? await supabase
              .from("profiles")
              .select("business_name")
              .eq("id", ownerId)
              .maybeSingle()
          : { data: null };

        if (profileErr || !profile) return;

        if (mounted) {
          setProfileName(profile.full_name ?? "");
          setBusinessName(ownerProfile?.business_name ?? profile.business_name ?? "");
          // Determine role
          const resolvedRole: UserRole = member ? (member.role as UserRole) : 'Owner';
          setUserRole(resolvedRole);
          try {
            localStorage.setItem('tailora_role', resolvedRole);
          } catch {}
          try {
            if (profile.full_name) localStorage.setItem('tailora_fullname', profile.full_name);
            const biz = ownerProfile?.business_name ?? profile.business_name;
            if (biz) localStorage.setItem('tailora_businessname', biz);
          } catch {}

          if (profile.avatar_path) {
            const { data: urlData } = supabase.storage
              .from("avatars")
              .getPublicUrl(profile.avatar_path);
            setProfileAvatar(urlData.publicUrl);
            try {
              localStorage.setItem('tailora_avatar', urlData.publicUrl);
            } catch {}
          }
        }
      } catch (err) {
        console.error("Sidebar: error loading profile", err);
      }
    }

    loadProfile();

    function handleProfileUpdate() {
      try {
        const storedAvatar = localStorage.getItem('tailora_avatar');
        if (storedAvatar) setProfileAvatar(storedAvatar);
        const storedName = localStorage.getItem('tailora_fullname');
        if (storedName) setProfileName(storedName);
        const storedBusiness = localStorage.getItem('tailora_businessname');
        if (storedBusiness) setBusinessName(storedBusiness);
      } catch {}
    }
    window.addEventListener("storage", handleProfileUpdate);
    window.addEventListener("tailora_profile_updated", handleProfileUpdate);

    return () => {
      mounted = false;
      window.removeEventListener("storage", handleProfileUpdate);
      window.removeEventListener("tailora_profile_updated", handleProfileUpdate);
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    // Clear cached user info
    try {
      localStorage.removeItem("tailora_avatar");
      localStorage.removeItem("tailora_fullname");
      localStorage.removeItem("tailora_businessname");
      localStorage.removeItem("tailora_role");
    } catch {}
    // Clear the cookie so middleware redirects to login
    document.cookie = "sb-access-token=; path=/; max-age=0";
    router.push("/login");
  }

  const displayName = profileName || "My Workspace";
  const initial = displayName.charAt(0).toUpperCase();

  // Mobile always shows fully open; desktop uses the click-toggled state
  const isCollapsed = mobileOpen ? false : !isOpen;
  const W = isCollapsed ? 72 : 272;

  function navigate(label: string) {
    const href = PAGE_ROUTES[label];
    if (!href || href === pathname) return;
    onNavigate?.();
    router.push(href);
  }

  const sidebarClass = [
    "tailora-sidebar",
    mobileOpen && "tailora-sidebar--open",
    isCollapsed && !mobileOpen && "tailora-sidebar--collapsed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside
      className={sidebarClass}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
      style={{
        width: W,
        minWidth: W,
        background: "#121212",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        transition:
          "width 0.22s cubic-bezier(0.4,0,0.2,1), min-width 0.22s cubic-bezier(0.4,0,0.2,1)",
        overflow: "visible", // allow the toggle button to peek out
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* ── Toggle button — shows on hover, clicks to open/close ── */}
      {!mobileOpen && (
        <ToggleButton
          collapsed={isCollapsed}
          sidebarHovered={sidebarHovered}
          onClick={() =>
  setIsOpen((prev) => {
    const next = !prev;
    localStorage.setItem("sidebar-open", String(next));
    return next;
  })
}
        />
      )}

      {/* Logo */}
      <div
        style={{
          padding: isCollapsed ? "24px 0 0" : "24px 24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          marginBottom: 20,
          minHeight: 56,
          overflow: "hidden",
        }}
      >
        <a href="/">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo.png" alt="" />
            {!isCollapsed && (
              <span
                style={{
                  color: "#E7E7E7",
                  fontWeight: 800,
                  fontSize: 20,
                  fontFamily: "'Sora', sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Tailora
              </span>
            )}
          </div>
        </a>
      </div>

      {/* Clip the rest of the sidebar content so it doesn't overflow */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        {/* Main Menu */}
        <div style={{ padding: "0 8px", marginBottom: 8 }}>
          {!isCollapsed && (
            <div
              style={{
                padding: "0 12px 6px",
                color: "#98A2B3",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Main Menu
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <NavBtn
              label="Dashboard"
              icon={HomeIcon}
              active={activeMenu === "Dashboard"}
              collapsed={isCollapsed}
              onClick={() => navigate("Dashboard")}
            />
            {(userRole === 'Owner' || userRole === 'Admin' || userRole === 'Assistant') && (
              <NavBtn
                label="Client Management"
                icon={PeopleIcon}
                active={activeMenu === "Client Management"}
                collapsed={isCollapsed}
                onClick={() => navigate("Client Management")}
              />
            )}
            {(userRole === 'Owner' || userRole === 'Admin') && (
              <NavBtn
                label="Team Collaboration"
                icon={TeamIcon}
                active={activeMenu === "Team Collaboration"}
                collapsed={isCollapsed}
                onClick={() => navigate("Team Collaboration")}
              />
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            margin: `0 ${isCollapsed ? 12 : 8}px 8px`,
            height: 1,
            background: "#33353A",
          }}
        />

        {/* Actions */}
        <div style={{ padding: "0 8px", marginBottom: "auto" }}>
          {!isCollapsed && (
            <div
              style={{
                padding: "0 12px 6px",
                color: "#98A2B3",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Actions
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {userRole !== 'Tailor' && (
              <NavBtn
                label="Add Client"
                icon={AddClientIcon}
                collapsed={isCollapsed}
                onClick={() => onAddClient?.()}
              />
            )}
            {userRole === 'Owner' && (
              <NavBtn
                label="Invite Co-worker"
                icon={InviteIcon}
                collapsed={isCollapsed}
                onClick={() => onInviteCoworker?.()}
              />
            )}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: "0 8px 12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {userRole === 'Owner' && (
              <NavBtn
                label="Settings"
                icon={SettingsIcon}
                active={activeMenu === "Settings"}
                collapsed={isCollapsed}
                onClick={() => navigate("Settings")}
              />
            )}
            <NavBtn
              label="Help & Support"
              icon={HelpIcon}
              active={activeMenu === "Help & Support"}
              collapsed={isCollapsed}
              onClick={() => navigate("Help & Support")}
            />
          </div>
        </div>

        {/* Profile */}
        <div
          style={{
            padding: isCollapsed ? "12px 8px" : "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
            borderTop: "1px solid #33353A",
          }}
        >
          {isCollapsed ? (
            <Tooltip label={displayName}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#3A3A3A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {profileAvatar ? (
                  <img
                    src={profileAvatar}
                    alt="profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  initial
                )}
              </div>
            </Tooltip>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#3A3A3A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    fontWeight: 700,
                    color: "#fff",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {profileAvatar ? (
                    <img
                      src={profileAvatar}
                      alt="profile"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    initial
                  )}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: "#E7E7E7",
                      fontSize: 13,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {displayName}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
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
                      }}
                    >
                      {roleBadgeStyles[userRole].label}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowLogoutModal(true)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                title="Log out"
              >
                <LogoutIcon />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </aside>
  );
}