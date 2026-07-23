"use client";

import { useState, useRef, useEffect } from "react";
import type { ClientFormData } from "./AddClientModal";
import { supabase } from "../lib/supabase";
import AppPageHeader from "./AppPageHeader";
import { useAppModals } from "./AppModalsContext";

interface Props {
  client: ClientFormData;
  onBack: () => void;
  onSaveDraft: () => void;
  onComplete: () => void;
}

type Step = 1 | 2;

/* ── Team member data (shared with TeamCollaborationPage) ── */
type Role = "Admin" | "Tailor" | "Assistant";
type MemberStatus = "Active" | "Pending";

interface Member {
  id?: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  joined: string;
  avatar: string;
}

const roleBadge: Record<Role, { bg: string; color: string }> = {
  Admin: { bg: "#E3EFFC", color: "#04326B" },
  Tailor: { bg: "#E7F6EC", color: "#036B26" },
  Assistant: { bg: "#FEF6E7", color: "#865503" },
};

/* ── Responsive hook ── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ── Icons ── */
function BellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path opacity="0.4" d="M22.1 17.69C21.8 18.5 21.16 19.12 20.32 19.4C19.15 19.79 17.95 20.08 16.74 20.29L16.38 20.34C16.18 20.38 15.99 20.4 15.8 20.42C15.56 20.45 15.31 20.47 15.06 20.5C14.38 20.55 13.7 20.58 13.02 20.58C12.33 20.58 11.64 20.55 10.95 20.49C10.66 20.46 10.38 20.43 10.1 20.39C9.93 20.37 9.77 20.34 9.62 20.32C9.5 20.3 9.38 20.29 9.26 20.27C8.06 20.07 6.87 19.78 5.71 19.39C4.84 19.1 4.18 18.48 3.89 17.69C3.6 16.91 3.71 16 4.17 15.22L5.4 13.18C5.65 12.74 5.89 11.88 5.89 11.36V9.35C5.89 5.42 9.08 2.22 13.02 2.22C16.94 2.22 20.14 5.42 20.14 9.35V11.36C20.14 11.88 20.38 12.74 20.65 13.18L21.87 15.22C22.32 15.98 22.4 16.87 22.1 17.69Z" fill="#121212" />
      <path d="M13 11.66C12.55 11.66 12.18 11.29 12.18 10.83V7.48C12.18 7.02 12.55 6.65 13 6.65C13.46 6.65 13.82 7.02 13.82 7.48V10.83C13.82 11.29 13.44 11.66 13 11.66Z" fill="#121212" />
      <path d="M16.07 21.68C15.61 22.93 14.41 23.83 13 23.83C12.14 23.83 11.3 23.49 10.7 22.87C10.36 22.54 10.1 22.11 9.94 21.67C10.09 21.69 10.23 21.7 10.38 21.72C10.63 21.75 10.89 21.79 11.15 21.81C11.77 21.86 12.4 21.89 13.02 21.89C13.64 21.89 14.26 21.86 14.86 21.81C15.09 21.79 15.32 21.77 15.54 21.74C15.71 21.72 15.88 21.7 16.07 21.68Z" fill="#121212" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 20L7 12L15 4" stroke="#121212" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path opacity="0.4" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AddPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path opacity="0.4" d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z" fill="#fff" />
      <path d="M16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#fff" />
    </svg>
  );
}

function InviteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path opacity="0.4" d="M7.5 1.67C5.32 1.67 3.54 3.44 3.54 5.63C3.54 7.77 5.22 9.5 7.4 9.58C7.47 9.57 7.53 9.57 7.58 9.58C7.6 9.58 7.61 9.58 7.63 9.58C7.63 9.58 7.63 9.58 7.64 9.58C9.77 9.5 11.45 7.77 11.46 5.63C11.46 3.44 9.68 1.67 7.5 1.67Z" fill="#fff" />
      <path d="M11.73 11.79C9.41 10.24 5.62 10.24 3.28 11.79C2.22 12.5 1.63 13.46 1.63 14.48C1.63 15.51 2.22 16.46 3.27 17.16C4.43 17.94 5.97 18.33 7.5 18.33C9.03 18.33 10.57 17.94 11.73 17.16C12.78 16.45 13.37 15.5 13.37 14.47C13.36 13.44 12.78 12.49 11.73 11.79Z" fill="#fff" />
      <path opacity="0.4" d="M16.66 6.1C16.79 7.73 15.64 9.15 14.05 9.34C14.04 9.34 14.04 9.34 14.03 9.34H14.01C13.96 9.34 13.91 9.34 13.87 9.36C13.07 9.4 12.32 9.14 11.76 8.67C12.62 7.9 13.11 6.75 13.01 5.5C12.95 4.82 12.72 4.21 12.37 3.68C12.68 3.52 13.05 3.42 13.43 3.39C15.06 3.25 16.51 4.47 16.66 6.1Z" fill="#fff" />
      <path d="M18.33 13.83C18.26 14.63 17.74 15.33 16.88 15.81C16.04 16.27 14.99 16.48 13.95 16.46C14.55 15.92 14.9 15.24 14.97 14.53C15.05 13.49 14.56 12.5 13.58 11.71C13.02 11.27 12.37 10.92 11.66 10.66C13.5 10.13 15.82 10.48 17.24 11.63C18.01 12.25 18.4 13.03 18.33 13.83Z" fill="#fff" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#696969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#667185" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#121212" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Invite Team Member Drawer ── */
function InviteTeamDrawer({
  onClose,
  onInvite,
  teamMembers,
}: {
  onClose: () => void;
  onInvite: (members: Member[]) => void;
  teamMembers: Member[];
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [invited, setInvited] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 480;

  const filtered = teamMembers.filter((m) => {
    const q = search.toLowerCase();
    return !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.role.toLowerCase().includes(q);
  });

  const toggle = (email: string) => {
    const next = new Set(selected);
    if (next.has(email)) next.delete(email);
    else next.add(email);
    setSelected(next);
  };

  const handleInvite = () => {
    const toInvite = teamMembers.filter((m) => selected.has(m.email));
    setInvited(true);
    setTimeout(() => {
      onInvite(toInvite);
      onClose();
    }, 1200);
  };

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const avatarColors: Record<Role, { bg: string; color: string }> = {
    Admin: { bg: "#E3EFFC", color: "#04326B" },
    Tailor: { bg: "#E7F6EC", color: "#036B26" },
    Assistant: { bg: "#FEF6E7", color: "#865503" },
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.28)",
          zIndex: 300,
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          width: isMobile ? "100%" : 400,
          background: "#FDFDFD",
          zIndex: 301,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.1)",
          animation: "slideIn 0.25s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
          @keyframes checkPop { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
          .invite-member-row:hover { background: #F9F7F4 !important; }
          .invite-member-row:active { background: #F3F0EC !important; }
        `}</style>

        {/* Drawer header */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid #F0F2F5",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
          background: "#fff", flexShrink: 0,
        }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "#121212" }}>
              Invite Team Member
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>
              Select members to assign to this order
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#F5F5F5", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 2,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EBEBEB")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F5F5F5")}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: "14px 20px 10px", flexShrink: 0 }}>
          <label style={{
            display: "flex", alignItems: "center", gap: 8,
            border: "1px solid #E2E4E9", borderRadius: 8,
            padding: "8px 12px", background: "#fff", cursor: "text",
            transition: "border-color 0.15s",
          }}
            onFocus={() => { }}
          >
            <SearchIcon />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role..."
              style={{
                border: "none", outline: "none",
                fontSize: 14, color: "#121212",
                fontFamily: "Satoshi, sans-serif",
                background: "transparent", flex: 1,
              }}
            />
          </label>
        </div>

        {/* Members count */}
        <div style={{ padding: "0 20px 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#B0B0B0", fontFamily: "Satoshi, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
            {selected.size > 0 && ` · ${selected.size} selected`}
          </span>
        </div>

        {/* Members list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 12px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#B0B0B0", fontFamily: "Satoshi, sans-serif", fontSize: 14 }}>
              No members match your search.
            </div>
          ) : (
            filtered.map((member) => {
              const isSelected = selected.has(member.email);
              const rb = roleBadge[member.role];
              const av = avatarColors[member.role];
              const isActive = member.status === "Active";

              return (
                <div
                  key={member.email}
                  className="invite-member-row"
                  onClick={() => toggle(member.email)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 8px", borderRadius: 10,
                    cursor: "pointer", marginBottom: 2,
                    background: isSelected ? "#FDF6EC" : "transparent",
                    transition: "background 0.12s",
                    userSelect: "none",
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: av.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: av.color,
                    fontFamily: "Satoshi, sans-serif", flexShrink: 0,
                    border: isSelected ? `2px solid ${av.color}` : "2px solid transparent",
                    transition: "border-color 0.15s",
                  }}>
                    {initials(member.name)}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#121212", fontFamily: "Satoshi, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {member.name}
                      </span>
                      <span style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "1px 7px", height: 16, borderRadius: 12,
                        fontSize: 11, fontWeight: 500,
                        background: rb.bg, color: rb.color,
                        fontFamily: "Satoshi, sans-serif", flexShrink: 0,
                      }}>
                        {member.role}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12, color: "#888", fontFamily: "Satoshi, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {member.email}
                      </span>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 3,
                        fontSize: 11, color: isActive ? "#036B26" : "#865503",
                        fontFamily: "Satoshi, sans-serif", flexShrink: 0,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: isActive ? "#036B26" : "#F59E0B", display: "inline-block" }} />
                        {member.status}
                      </span>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    border: isSelected ? "none" : "1.5px solid #D0D5DD",
                    background: isSelected ? "#121212" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                    animation: isSelected ? "checkPop 0.2s ease" : "none",
                  }}>
                    {isSelected && <CheckIcon />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 20px",
          borderTop: "1px solid #F0F2F5",
          background: "#fff", flexShrink: 0,
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          {/* Selected preview */}
          {selected.size > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {Array.from(selected).map((email) => {
                const m = teamMembers.find((t) => t.email === email)!;
                const av = avatarColors[m.role];
                return (
                  <div key={email} style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: av.bg, borderRadius: 100,
                    padding: "3px 8px 3px 3px",
                  }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "Satoshi, sans-serif" }}>
                      {initials(m.name)}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: av.color, fontFamily: "Satoshi, sans-serif" }}>
                      {m.name.split(" ")[0]}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggle(email); }}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", lineHeight: 1 }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 1L9 9M9 1L1 9" stroke={av.color} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1, padding: "12px 0",
                background: "transparent", border: "1px solid #E2E4E9",
                borderRadius: 100, fontSize: 14, fontWeight: 500, color: "#121212",
                fontFamily: "Satoshi, sans-serif", cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInvite}
              disabled={selected.size === 0}
              style={{
                flex: 2, padding: "12px 0",
                background: selected.size === 0 ? "#D0D5DD" : invited ? "#036B26" : "#121212",
                border: "none", borderRadius: 100,
                fontSize: 14, fontWeight: 500, color: "#fff",
                fontFamily: "Satoshi, sans-serif",
                cursor: selected.size === 0 ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              {invited ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Invited!
                </>
              ) : (
                <>
                  <InviteIcon />
                  Invite {selected.size > 0 ? `${selected.size} Member${selected.size > 1 ? "s" : ""}` : "Member"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── MeasurementField ── */
function MeasurementField({ label, hint, value, onChange, unit, onKeyDown }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; unit: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>
          {label} <span style={{ color: "#E03137" }}>*</span>
        </label>
        {hint && <span style={{ fontSize: 12, color: "#999", fontFamily: "Satoshi, sans-serif" }}>{hint}</span>}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="text" inputMode="decimal" value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          placeholder="0.0"
          style={{
            width: "100%", height: 44,
            border: `1px solid ${focused ? "#121212" : "#E2E4E9"}`,
            borderRadius: 8, padding: "0 48px 0 12px",
            fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif",
            outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s",
          }}
        />
        <span style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          fontSize: 13, fontWeight: 600, color: "#999", fontFamily: "Satoshi, sans-serif", pointerEvents: "none",
        }}>
          {unit === "inches" ? "IN" : "CM"}
        </span>
      </div>
    </div>
  );
}

/* ── CustomMeasurementField ── */
function CustomMeasurementField({ fieldName, value, unit, onFieldNameChange, onValueChange, onRemove, onKeyDown }: {
  fieldName: string; value: string; unit: string;
  onFieldNameChange: (v: string) => void; onValueChange: (v: string) => void; onRemove: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  const [nameFocused, setNameFocused] = useState(false);
  const [valFocused, setValFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <input
          type="text" placeholder="Field name" value={fieldName}
          onChange={(e) => onFieldNameChange(e.target.value)}
          onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)}
          onKeyDown={onKeyDown}
          style={{
            border: "none",
            borderBottom: `1px solid ${nameFocused ? "#121212" : "#E2E4E9"}`,
            fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif",
            outline: "none", background: "transparent", padding: "2px 0",
            width: "80%", transition: "border-color 0.15s",
          }}
        />
        <button type="button" onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
          <TrashIcon />
        </button>
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="text" inputMode="decimal" placeholder="0.0" value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onFocus={() => setValFocused(true)} onBlur={() => setValFocused(false)}
          onKeyDown={onKeyDown}
          style={{
            width: "100%", height: 44,
            border: `1px solid ${valFocused ? "#121212" : "#E2E4E9"}`,
            borderRadius: 8, padding: "0 48px 0 12px",
            fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif",
            outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s",
          }}
        />
        <span style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          fontSize: 13, fontWeight: 600, color: "#999", fontFamily: "Satoshi, sans-serif", pointerEvents: "none",
        }}>
          {unit === "inches" ? "IN" : "CM"}
        </span>
      </div>
    </div>
  );
}

/* ── SectionLabel ── */
function SectionLabel({ number, title, description, optional }: {
  number: string; title: string; description: string; optional?: boolean;
}) {
  return (
    <div>
      <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#B0825A", textTransform: "uppercase", fontFamily: "Satoshi, sans-serif" }}>
        {number}
      </p>
      <h3 style={{ margin: "0 0 4px", fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 20, color: "#121212", display: "flex", alignItems: "center", gap: 8 }}>
        {title}
        {optional && (
          <span style={{ fontSize: 12, fontWeight: 400, color: "#B0B0B0", fontFamily: "Satoshi, sans-serif" }}>optional</span>
        )}
      </h3>
      <p style={{ margin: 0, fontSize: 13, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>{description}</p>
    </div>
  );
}

/* ── ReferenceImageDropzone ── */
function ReferenceImageDropzone({ images, setImages }: { images: File[]; setImages: (imgs: File[]) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => ["image/png", "image/jpeg"].includes(f.type));
    setImages([...images, ...valid].slice(0, 6));
  };

  const removeImage = (idx: number) => setImages(images.filter((_, i) => i !== idx));

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        style={{
          border: `1.5px dashed ${dragging ? "#B0825A" : "#D0C4B8"}`,
          borderRadius: 12, background: dragging ? "#FDF6EC" : "#F9F7F4",
          padding: "32px 20px", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 10, cursor: "pointer",
          transition: "border-color 0.15s, background 0.15s",
        }}
      >
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.4" d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" fill="#B0825A" />
            <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" fill="#B0825A" />
            <path d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="#B0825A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 7H19M17 5V9" stroke="#B0825A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Drop reference images here</p>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#888", fontFamily: "Satoshi, sans-serif" }}>Style inspiration, fabric swatches — PNG, JPG up to 6 files</p>
        </div>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg" multiple style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
      </div>
      {images.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
          {images.map((img, idx) => {
            const url = URL.createObjectURL(img);
            return (
              <div key={idx} style={{ position: "relative", width: 72, height: 72 }}>
                <img src={url} alt="" style={{ width: 72, height: 72, borderRadius: 8, objectFit: "cover", border: "1px solid #E2E4E9" }} />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                  style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "#121212", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MeasurementsStep({
  unit, setUnit, measurements, setMeasurements,
  customFields, setCustomFields,
  onKeyDown,
}: {
  unit: string; setUnit: (u: string) => void;
  measurements: Record<string, string>; setMeasurements: (m: Record<string, string>) => void;
  customFields: Array<{ id: number; fieldName: string; value: string }>;
  setCustomFields: (f: Array<{ id: number; fieldName: string; value: string }>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  const w = useWindowWidth();
  const isMobile = w < 480;
  const gridCols = isMobile ? "1fr 1fr" : w < 768 ? "1fr 1fr" : "repeat(3, 1fr)";

  const standardFields = [
    { key: "neck", label: "Neck", hint: "Around base" },
    { key: "chestBust", label: "Chest/ Bust", hint: "Fullest point" },
    { key: "waist", label: "Waist", hint: "Natural line" },
    { key: "hip", label: "Hip", hint: "Fullest point" },
    { key: "shoulder", label: "Shoulder", hint: "Seam to seam" },
    { key: "sleeve", label: "Sleeve", hint: "Shoulder to wrist" },
    { key: "trouserLength", label: "Trouser Length", hint: "Waist to hem" },
  ];

  const addCustomField = () => setCustomFields([...customFields, { id: Date.now(), fieldName: "", value: "" }]);
  const updateCustomField = (id: number, key: "fieldName" | "value", val: string) =>
    setCustomFields(customFields.map((f) => (f.id === id ? { ...f, [key]: val } : f)));
  const removeCustomField = (id: number) => setCustomFields(customFields.filter((f) => f.id !== id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 }}>
          <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: isMobile ? 20 : 24, color: "#121212" }}>
            Body measurements
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>Units</span>
            <div style={{ position: "relative" }}>
              <select
                value={unit} onChange={(e) => setUnit(e.target.value)}
                style={{ appearance: "none", WebkitAppearance: "none", border: "1px solid #E2E4E9", borderRadius: 8, padding: "8px 32px 8px 12px", fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif", background: "#fff", cursor: "pointer", outline: "none" }}
              >
                <option value="inches">inches</option>
                <option value="centimetres">centimetres</option>
              </select>
              <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? "14px 10px" : "20px 24px" }}>
          {standardFields.map((f) => (
            <MeasurementField key={f.key} label={f.label} hint={f.hint} value={measurements[f.key] ?? ""} onChange={(v) => setMeasurements({ ...measurements, [f.key]: v })} unit={unit} onKeyDown={onKeyDown} />
          ))}
          {customFields.map((cf) => (
            <CustomMeasurementField
              key={cf.id} fieldName={cf.fieldName} value={cf.value} unit={unit}
              onFieldNameChange={(v) => updateCustomField(cf.id, "fieldName", v)}
              onValueChange={(v) => updateCustomField(cf.id, "value", v)}
              onRemove={() => removeCustomField(cf.id)}
              onKeyDown={onKeyDown}
            />
          ))}
        </div>

        <button
          type="button" onClick={addCustomField}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 8, padding: "12px 20px", background: "#121212", border: "none", borderRadius: 100, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", alignSelf: isMobile ? "stretch" : "flex-start" }}
        >
          <AddPlusIcon /> Add Custom Measurement
        </button>
      </div>
    </div>
  );
}

/* ── OrderDetailsStep ── */
function OrderDetailsStep({
  orderDetails,
  setOrderDetails,
  onOpenInviteDrawer,
  teamMembers,
  assignedStaffs,
  setAssignedStaffs,
  onKeyDown,
}: {
  orderDetails: { dateReceived: string; collectionDate: string; price: string; paymentStatus: string };
  setOrderDetails: (d: typeof orderDetails) => void;
  onOpenInviteDrawer: () => void;
  teamMembers: Member[];
  assignedStaffs: string[];
  setAssignedStaffs: (s: string[]) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement>;
}) {
  const w = useWindowWidth();
  const isMobile = w < 480;
  const gridCols = isMobile ? "1fr" : w < 768 ? "1fr 1fr" : "repeat(3, 1fr)";
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);

  const set = (key: keyof typeof orderDetails, val: string) => setOrderDetails({ ...orderDetails, [key]: val });

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 44, border: "1px solid #E2E4E9", borderRadius: 8,
    padding: "0 12px", fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif",
    outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s",
  };

  const selectStyle: React.CSSProperties = { ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: isMobile ? 20 : 24, color: "#121212" }}>
        Order Details
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? "16px 0" : "20px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Date Received <span style={{ color: "#E03137" }}>*</span></label>
          <input type="date" value={orderDetails.dateReceived} onChange={(e) => set("dateReceived", e.target.value)} onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")} style={inputStyle} onKeyDown={onKeyDown} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Collection Date <span style={{ color: "#E03137" }}>*</span></label>
          <input type="date" value={orderDetails.collectionDate} onChange={(e) => set("collectionDate", e.target.value)} onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")} style={inputStyle} onKeyDown={onKeyDown} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Price <span style={{ color: "#E03137" }}>*</span></label>
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              fontSize: 14, fontWeight: 600, color: "#121212", fontFamily: "Satoshi, sans-serif", pointerEvents: "none"
            }}>
              ₦
            </span>
            <input type="text" inputMode="numeric" placeholder="00" value={orderDetails.price} onChange={(e) => set("price", e.target.value)} onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")} style={{ ...inputStyle, paddingLeft: 28 }} onKeyDown={onKeyDown} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Payment Status</label>
          <div style={{ position: "relative" }}>
            <select value={orderDetails.paymentStatus} onChange={(e) => set("paymentStatus", e.target.value)} onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")} onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")} style={selectStyle} onKeyDown={onKeyDown}>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partial">Partial</option>
            </select>
            <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDownIcon /></div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Assigned Staff</label>
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setShowStaffDropdown(!showStaffDropdown)}
              style={{
                width: "100%", height: 44, border: "1px solid #E2E4E9", borderRadius: 8,
                padding: "0 36px 0 12px", fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif",
                outline: "none", background: "#fff", boxSizing: "border-box", cursor: "pointer",
                display: "flex", alignItems: "center", position: "relative"
              }}
            >
              <span style={{ color: assignedStaffs.length > 0 ? "#121212" : "#98A2B3" }}>
                {assignedStaffs.length === 0
                  ? "Select staff members..."
                  : assignedStaffs.length === 1
                    ? `${assignedStaffs[0]}`
                    : `${assignedStaffs.length} staff members selected`}
              </span>
              <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <ChevronDownIcon />
              </div>
            </div>

            {/* Dropdown panel */}
            {showStaffDropdown && (
              <>
                <div
                  onClick={() => setShowStaffDropdown(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 100 }}
                />
                <div
                  style={{
                    position: "absolute", top: "105%", left: 0, right: 0,
                    background: "#fff", border: "1px solid #E2E4E9", borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", zIndex: 101,
                    maxHeight: 200, overflowY: "auto", padding: 4
                  }}
                >
                  {teamMembers.length > 0 ? (
                    teamMembers.map(m => {
                      const isSelected = assignedStaffs.includes(m.name);
                      return (
                        <div
                          key={m.id || m.email}
                          onClick={() => {
                            if (isSelected) {
                              setAssignedStaffs(assignedStaffs.filter(n => n !== m.name));
                            } else {
                              setAssignedStaffs([...assignedStaffs, m.name]);
                            }
                          }}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "8px 12px", borderRadius: 6, cursor: "pointer",
                            background: isSelected ? "#FDF6EC" : "transparent",
                            transition: "background 0.1s"
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) e.currentTarget.style.background = "#F5F5F5";
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                              width: 24, height: 24, borderRadius: "50%",
                              background: roleBadge[m.role]?.bg || "#E2E4E9",
                              color: roleBadge[m.role]?.color || "#121212",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 10, fontWeight: 700
                            }}>
                              {m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 500, color: "#121212" }}>{m.name}</span>
                          </div>
                          {isSelected && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6.5 11.5L13 4.5" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: "8px 12px", fontSize: 13, color: "#B0B0B0" }}>No staff members available</div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Selected staff chips below */}
          {assignedStaffs.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
              {assignedStaffs.map(name => {
                const member = teamMembers.find(m => m.name === name);
                const role = member?.role || "Tailor";
                const avBg = roleBadge[role]?.bg || "#E2E4E9";
                const avColor = roleBadge[role]?.color || "#121212";
                return (
                  <div
                    key={name}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "#fff", border: "1px solid #E2E4E9",
                      borderRadius: 100, padding: "4px 10px 4px 4px",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: avBg, color: avColor,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700
                    }}>
                      {name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>
                      {name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAssignedStaffs(assignedStaffs.filter(n => n !== name))}
                      style={{
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                        display: "flex", alignItems: "center", fontSize: 14, fontWeight: 600, color: "#888"
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Invite button */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <button
          type="button"
          onClick={onOpenInviteDrawer}
          style={{
            display: "inline-flex", alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start", gap: 8,
            padding: "12px 20px", background: "#121212", border: "none", borderRadius: 100,
            cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#fff",
            fontFamily: "Satoshi, sans-serif", alignSelf: isMobile ? "stretch" : "flex-start",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#121212")}
        >
          <InviteIcon />
          Invite Team Member
        </button>
      </div>
    </div>
  );
}

/* ── Stepper ── */
function Stepper({ step }: { step: Step }) {
  const w = useWindowWidth();
  const isMobile = w < 480;
  const steps = [
    { n: 1, label: "Client" },
    { n: 2, label: "Measurements" },
    { n: 3, label: "Order Details" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {steps.map((s, i) => {
        const done = (step === 1 && s.n === 1) || (step === 2 && s.n <= 2);
        const active = (step === 1 && s.n === 2) || (step === 2 && s.n === 3);
        return (
          <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {done ? (
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#121212", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: active ? "#121212" : "#E2E4E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: active ? "#fff" : "#98A2B3", fontFamily: "Satoshi, sans-serif", flexShrink: 0 }}>
                  {s.n}
                </div>
              )}
              {!isMobile && (
                <span style={{ fontSize: 13, fontWeight: (done || active) ? 600 : 400, color: (done || active) ? "#121212" : "#98A2B3", fontFamily: "Satoshi, sans-serif", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: isMobile ? 20 : 40, height: 1, background: done ? "#121212" : "#E2E4E9", margin: "0 6px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Component ── */
export default function OrderCreationFlow({ client, onBack, onSaveDraft, onComplete }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [unit, setUnit] = useState("inches");
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [customFields, setCustomFields] = useState<Array<{ id: number; fieldName: string; value: string }>>([]);
  const [notes, setNotes] = useState("");
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const { openInviteCoworker } = useAppModals();
  const [orderDetails, setOrderDetails] = useState({
    dateReceived: "", collectionDate: "", price: "", paymentStatus: "Paid",
  });
  const [assignedStaffs, setAssignedStaffs] = useState<string[]>([]);

  const isMeasurementsStepValid = () => {
    const hasStandardValue = Object.values(measurements).some(val => typeof val === 'string' && val.trim().length > 0);
    const hasCustomValue = customFields.some(cf => cf.fieldName.trim().length > 0 && cf.value.trim().length > 0);
    return hasStandardValue || hasCustomValue;
  };

  const isOrderDetailsStepValid = () => {
    return (
      orderDetails.dateReceived.trim() !== "" &&
      orderDetails.collectionDate.trim() !== "" &&
      orderDetails.price.trim() !== ""
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const container = e.currentTarget.closest(".order-creation-flow-container");
      if (container) {
        const selectors = "input[type='text']:not([disabled]), input[type='date']:not([disabled]), select:not([disabled])";
        const inputs = Array.from(container.querySelectorAll(selectors)) as HTMLElement[];
        const index = inputs.indexOf(e.currentTarget);
        if (index > -1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    }
  };

  const [teamList, setTeamList] = useState<Member[]>([]);
  // Display-only label shown in the stepper header before save.
  // The actual stored friendly ID is derived from the DB UUID inside saveOrderAndClient.
  const [displayOrderId, setDisplayOrderId] = useState(() => `#A-${Math.floor(1000 + Math.random() * 9000)}`);
  const [isSaving, setIsSaving] = useState(false);
  const [existingOrderId, setExistingOrderId] = useState<string | null>(null);

  useEffect(() => {
    const clientIdVal = client.id;
    if (!clientIdVal) return;
    let mounted = true;
    async function loadExistingOrder(id: string) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('id, measurements, assigned_team, notes')
          .eq('client_id', id)
          .maybeSingle();

        if (error) {
          console.error("Error loading existing order for client:", error);
          return;
        }

        if (data && mounted) {
          setExistingOrderId(data.id);
          const meas = data.measurements || {};
          if (meas.friendlyOrderId) {
            setDisplayOrderId(meas.friendlyOrderId);
          } else {
            setDisplayOrderId(`#A-${id.replace(/-/g, '').slice(0, 6).toUpperCase()}`);
          }
          if (meas.unit) {
            setUnit(meas.unit);
          }
          setMeasurements({
            neck: meas.neck || '',
            chestBust: meas.chestBust || '',
            waist: meas.waist || '',
            hip: meas.hip || '',
            shoulder: meas.shoulder || '',
            sleeve: meas.sleeve || '',
            trouserLength: meas.trouserLength || '',
          });
          if (meas.customFields && Array.isArray(meas.customFields)) {
            setCustomFields(meas.customFields.map((f: any, i: number) => ({
              id: Date.now() + i,
              fieldName: f.name || f.fieldName,
              value: f.value
            })));
          }
          setOrderDetails({
            dateReceived: meas.dateReceived || '',
            collectionDate: meas.collectionDate || '',
            price: meas.price || '',
            paymentStatus: meas.paymentStatus || 'Paid',
          });
          if (data.assigned_team && Array.isArray(data.assigned_team)) {
            setAssignedStaffs(data.assigned_team);
          }
          if (data.notes) {
            setNotes(data.notes);
          }
        }
      } catch (err) {
        console.error("Failed to load existing order info:", err);
      }
    }
    loadExistingOrder(clientIdVal);
    return () => { mounted = false; };
  }, [client.id]);

  // avatarUrl loaded from localStorage (set by AppPageHeader/SettingsPage on login/save)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tailora_avatar');
      if (stored) setAvatarUrl(stored);
    } catch { }
    const handler = () => {
      try {
        const stored = localStorage.getItem('tailora_avatar');
        if (stored) setAvatarUrl(stored);
      } catch { }
    };
    window.addEventListener('tailora_profile_updated', handler);
    return () => window.removeEventListener('tailora_profile_updated', handler);
  }, []);
  const [saveError, setSaveError] = useState<string | null>(null);

  const w = useWindowWidth();
  const isMobile = w < 480;

  const handleBack = () => { if (step === 2) setStep(1); else onBack(); };

  useEffect(() => {
    let mounted = true;
    async function loadTeam() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;
        let ownerId = userData.user.id;

        // Resolve workspace owner
        const { data: rpcResult } = await supabase.rpc('get_my_team_role');
        if (rpcResult && rpcResult.length > 0) {
          ownerId = rpcResult[0].owner_id;
        }

        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('user_id', ownerId)
          .order('name', { ascending: true });

        if (error) throw error;
        if (mounted && data) {
          const membersList = data.map((m: any) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            role: m.role as Role,
            status: m.status as MemberStatus,
            joined: m.joined_date || "Joined Jan 2024",
            avatar: m.avatar_url || "/Ellipse2481.png"
          }));
          setTeamList(membersList);
          if (membersList.length > 0) {
            setAssignedStaffs(prev => prev.length > 0 ? prev : [membersList[0].name]);
          }
        }
      } catch (err) {
        console.error('Error loading team members:', err);
      }
    }
    loadTeam();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const handleInvited = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newMember = customEvent.detail;
      if (newMember && newMember.name) {
        const memberObj: Member = {
          name: newMember.name,
          email: newMember.email,
          role: newMember.role,
          status: "Pending",
          joined: "Just Invited",
          avatar: "/Ellipse2481.png"
        };
        setTeamList(prev => {
          if (prev.some(m => m.email.toLowerCase() === memberObj.email.toLowerCase())) {
            return prev;
          }
          return [...prev, memberObj].sort((a, b) => a.name.localeCompare(b.name));
        });
        setAssignedStaffs(prev => {
          if (prev.includes(newMember.name)) return prev;
          return [...prev, newMember.name];
        });
      }
    };

    window.addEventListener("tailora_team_member_invited", handleInvited);
    return () => {
      window.removeEventListener("tailora_team_member_invited", handleInvited);
    };
  }, []);

  const saveOrderAndClient = async (isDraft: boolean) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      // Validation for finalized orders
      if (!isDraft) {
        if (!isMeasurementsStepValid()) {
          throw new Error("Please fill in all body measurement fields.");
        }
        if (!isOrderDetailsStepValid()) {
          throw new Error("Please fill in all required fields (Date Received, Collection Date, and Price).");
        }
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        throw new Error("You must be logged in to save orders.");
      }

      let ownerId = userData.user.id;

      // Resolve workspace owner
      const { data: rpcResult } = await supabase.rpc('get_my_team_role');
      if (rpcResult && rpcResult.length > 0) {
        ownerId = rpcResult[0].owner_id;
      }

      // Ensure profiles record exists for ownerId to satisfy FK constraint
      await supabase.from('profiles').upsert(
        { id: userData.user.id, updated_at: new Date().toISOString() },
        { onConflict: 'id', ignoreDuplicates: true }
      );

      // 1. Insert or Update Client
      const cleanName = client.name.trim();
      const cleanPhone = client.phone.trim();
      const cleanEmail = (client.email || '').trim();

      let clientId = client.id;
      if (!clientId) {
        const { data: newClient, error: clientErr } = await supabase
          .from('clients')
          .insert({
            user_id: ownerId,
            name: cleanName,
            phone: cleanPhone,
            email: cleanEmail,
            gender: client.gender,
            outfit_type: client.outfitType,
            status: isDraft ? 'Pending' : 'Due'
          })
          .select()
          .single();

        if (clientErr) throw clientErr;
        clientId = newClient.id;
      } else {
        const { error: clientErr } = await supabase
          .from('clients')
          .update({
            name: cleanName,
            phone: cleanPhone,
            email: cleanEmail,
            gender: client.gender,
            outfit_type: client.outfitType,
            status: isDraft ? 'Pending' : 'Due'
          })
          .eq('id', clientId);

        if (clientErr) throw clientErr;
      }

      if (!clientId) {
        throw new Error("Failed to generate or retrieve client ID.");
      }

      // 2. Upload Reference Images
      const imageUrls: string[] = [];
      for (const file of referenceImages) {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${clientId}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
          const { error: uploadErr } = await supabase.storage
            .from('reference-images')
            .upload(fileName, file);

          if (uploadErr) throw uploadErr;

          const { data: urlData } = supabase.storage
            .from('reference-images')
            .getPublicUrl(fileName);

          if (urlData?.publicUrl) {
            imageUrls.push(urlData.publicUrl);
          }
        } catch (uploadError) {
          console.error("Failed to upload reference image:", uploadError);
        }
      }

      // 3. Insert or Update Order
      // Derive a collision-free friendly ID from the DB-generated client UUID
      const friendlyOrderId = `#A-${clientId.replace(/-/g, '').slice(0, 6).toUpperCase()}`;

      const measurementsJson = {
        unit,
        neck: measurements.neck || '',
        chestBust: measurements.chestBust || '',
        waist: measurements.waist || '',
        hip: measurements.hip || '',
        shoulder: measurements.shoulder || '',
        sleeve: measurements.sleeve || '',
        trouserLength: measurements.trouserLength || '',
        customFields: customFields.map(f => ({ name: f.fieldName, value: f.value })),
        dateReceived: orderDetails.dateReceived,
        collectionDate: orderDetails.collectionDate,
        price: orderDetails.price,
        paymentStatus: orderDetails.paymentStatus,
        friendlyOrderId
      };

      const teamAssigned = assignedStaffs.filter(Boolean);

      if (existingOrderId) {
        const { error: orderErr } = await supabase
          .from('orders')
          .update({
            client_name: cleanName,
            phone: cleanPhone,
            gender: client.gender,
            outfit: client.outfitType,
            status: isDraft ? 'Due' : (orderDetails.paymentStatus === 'Paid' ? 'Collected' : 'Due'),
            status_type: isDraft ? 'due' : (orderDetails.paymentStatus === 'Paid' ? 'collected' : 'due'),
            measurements: measurementsJson,
            assigned_team: teamAssigned,
            reference_images: imageUrls,
            notes: notes || '',
            updated_at: new Date().toISOString()
          })
          .eq('id', existingOrderId);

        if (orderErr) throw orderErr;
      } else {
        const { error: orderErr } = await supabase
          .from('orders')
          .insert({
            id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined,
            user_id: ownerId,
            client_id: clientId,
            client_name: cleanName,
            phone: cleanPhone,
            gender: client.gender,
            outfit: client.outfitType,
            status: isDraft ? 'Due' : (orderDetails.paymentStatus === 'Paid' ? 'Collected' : 'Due'),
            status_type: isDraft ? 'due' : (orderDetails.paymentStatus === 'Paid' ? 'collected' : 'due'),
            measurements: measurementsJson,
            assigned_team: teamAssigned,
            reference_images: imageUrls,
            notes: notes || '',
          });

        if (orderErr) throw orderErr;
      }

      if (isDraft) {
        onSaveDraft();
      } else {
        onComplete();
      }
    } catch (err: any) {
      console.error("Failed to save order error object:", err);
      if (err) {
        console.error("Error message:", err.message);
        console.error("Error details:", err.details);
        console.error("Error hint:", err.hint);
        console.error("Error code:", err.code);
        console.error("Error status:", err.status);
      }
      setSaveError(err.message || "Failed to save order.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="order-creation-flow-container" style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "#FDFDFD", width: "100%" }}>

      {/* Header */}
      <AppPageHeader title={client.id ? "Edit Client & Order" : "Add Client"} />


      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "32px 36px 60px", position: "relative" }}>

          {/* Back + stepper */}
          <div style={{ marginBottom: isMobile ? 24 : 36 }}>
            <button
              type="button" onClick={handleBack}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", padding: 0, marginBottom: isMobile ? 16 : 24 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <BackArrowIcon /> Back
            </button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <Stepper step={step} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Order: {displayOrderId}</span>
            </div>
          </div>

          {/* Step content */}
          {step === 1 && (
            <MeasurementsStep
              unit={unit} setUnit={setUnit}
              measurements={measurements} setMeasurements={setMeasurements}
              customFields={customFields} setCustomFields={setCustomFields}
              onKeyDown={handleKeyDown}
            />
          )}
          {step === 2 && (
            <OrderDetailsStep
              orderDetails={orderDetails}
              setOrderDetails={setOrderDetails}
              onOpenInviteDrawer={openInviteCoworker}
              teamMembers={teamList}
              assignedStaffs={assignedStaffs}
              setAssignedStaffs={setAssignedStaffs}
              onKeyDown={handleKeyDown}
            />
          )}

          {/* Bottom actions */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: isMobile ? "stretch" : "flex-end",
            flexDirection: isMobile ? "column-reverse" : "row",
            gap: 12, marginTop: 48, paddingTop: 24,
            borderTop: "1px solid #F0F2F5",
          }}>
            {saveError && (
              <p style={{ margin: "0 auto 0 0", fontSize: 13, color: "#9E0A05" }}>
                {saveError}
              </p>
            )}
            <button
              type="button" onClick={() => { setSaveError(null); saveOrderAndClient(true); }}
              disabled={isSaving}
              style={{ padding: "13px 28px", background: "transparent", border: "1px solid #121212", borderRadius: 100, fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", cursor: isSaving ? "not-allowed" : "pointer", width: isMobile ? "100%" : "auto", opacity: isSaving ? 0.6 : 1 }}
              onMouseEnter={(e) => !isSaving && (e.currentTarget.style.background = "#F5F5F5")}
              onMouseLeave={(e) => !isSaving && (e.currentTarget.style.background = "transparent")}
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => {
                setSaveError(null);
                if (step === 1) {
                  if (!isMeasurementsStepValid()) {
                    setSaveError("Please fill in all body measurement fields to continue.");
                    return;
                  }
                  setStep(2);
                } else {
                  if (!isMeasurementsStepValid()) {
                    setSaveError("Please fill in all body measurement fields to save.");
                    return;
                  }
                  if (!isOrderDetailsStepValid()) {
                    setSaveError("Please fill in all required order details (Date Received, Collection Date, and Price) to save.");
                    return;
                  }
                  saveOrderAndClient(false);
                }
              }}
              disabled={isSaving}
              style={{ padding: "13px 28px", background: "#121212", border: "none", borderRadius: 100, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: isSaving ? "not-allowed" : "pointer", width: isMobile ? "100%" : "auto", opacity: isSaving ? 0.6 : 1 }}
              onMouseEnter={(e) => !isSaving && (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => !isSaving && (e.currentTarget.style.background = "#121212")}
            >
              {isSaving ? "Saving..." : (step === 1 ? "Continue" : "Save")}
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}