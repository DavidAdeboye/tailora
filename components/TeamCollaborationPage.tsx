"use client";

import { useState } from "react";
import { useAppModals } from "./AppModalsContext";
import AppPageHeader from "./AppPageHeader";
import PrimaryButton from "./PrimaryButton";
import { ActionMenuButton, DeleteConfirmModal } from "./Actionmenu";

type Role = "Admin" | "Tailor" | "Assistant";
type Status = "Active" | "Pending";

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
  avatar: string;
}

const initialMembers: Member[] = [
  { id: "m1", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Admin",     status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m2", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Tailor",    status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m3", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Assistant", status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m4", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Admin",     status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m5", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Tailor",    status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m6", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Assistant", status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m7", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Admin",     status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m8", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Tailor",    status: "Active",  joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
  { id: "m9", name: "Olamide Akintan", email: "sara@atelier.co",    role: "Assistant", status: "Pending", joined: "Joined Jan 2024", avatar: "/Ellipse2481.png" },
];

const roleBadge: Record<Role, { bg: string; color: string; border: string }> = {
  Admin:     { bg: "#E3EFFC", color: "#04326B", border: "none" },
  Tailor:    { bg: "#E7F6EC", color: "#036B26", border: "none" },
  Assistant: { bg: "#FEF6E7", color: "#865503", border: "none" },
};

function ExportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path opacity="0.4" d="M1.5 11.25V12.75C1.5 14.4069 2.84315 15.75 4.5 15.75H13.5C15.1569 15.75 16.5 14.4069 16.5 12.75V11.25" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 2.25V11.25M9 2.25L6 5.25M9 2.25L12 5.25" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#667185" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronDownIcon({ color = "#667185" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ActiveDot({ color = "#036B26" }: { color?: string }) {
  return <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

function MemberCard({ member, onEdit, onDelete }: { member: Member; onEdit: () => void; onDelete: () => void }) {
  const rb = roleBadge[member.role];
  const isActive = member.status === "Active";
  const statusColor = isActive ? "#036B26" : "#865503";

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <img src={member.avatar} alt={member.name} style={{ width: 40, height: 40, borderRadius: "50%", border: "2.5px solid #F2F2F6", boxShadow: "0px 0px 1px rgba(0,0,0,0.25)", flexShrink: 0, objectFit: "cover" }}/>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 14, color: "#121212", lineHeight: "145%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.name}</div>
            <div style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 14, color: "#555960", lineHeight: "145%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.email}</div>
          </div>
        </div>
        <ActionMenuButton
          onEdit={onEdit}
          onDelete={onDelete}
          label={`Actions for ${member.name}`}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "inline-flex", alignItems: "center", padding: "0 8px", height: 17, borderRadius: 12, fontSize: 12, fontWeight: 500, background: rb.bg, color: rb.color, fontFamily: "var(--font-satoshi)", letterSpacing: "-0.005em" }}>
          {member.role}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ActiveDot color={statusColor} />
          <span style={{ fontSize: 12, fontWeight: 400, color: statusColor, fontFamily: "var(--font-satoshi)", letterSpacing: "-0.005em" }}>{member.status}</span>
        </div>
      </div>

      <div style={{ width: "100%", height: 1, background: "#E5E7EB" }} />
      <div style={{ fontSize: 12, fontWeight: 400, color: "#555960", fontFamily: "var(--font-satoshi)", lineHeight: "145%" }}>{member.joined}</div>
    </div>
  );
}

export default function TeamCollaborationPage() {
  const { openInviteCoworker } = useAppModals();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  const filtered = members.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "All Roles" || m.role === roleFilter;
    const matchStatus = statusFilter === "All Status" || m.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const handleEdit = (member: Member) => {
    alert(`Edit ${member.name}`);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setMembers(prev => prev.filter(m => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .tc-content { padding: 40px 16px 80px !important; }
          .tc-header-row { flex-direction: column !important; align-items: stretch !important; }
          .tc-invite-btn { width: 100% !important; border-radius: 100px !important; justify-content: center !important; }
          .tc-filter-bar { flex-direction: column !important; align-items: stretch !important; gap: 8px !important; }
          .tc-search-label { width: 100% !important; }
          .tc-dropdown-wrap { width: 100% !important; }
          .tc-dropdown-wrap select { width: 100% !important; }
          .tc-member-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>

      <div className="tailora-page-view" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <AppPageHeader title="Team Collaboration" />

        <div className="tailora-page-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "#FDFDFD", position: "relative", WebkitOverflowScrolling: "touch" }}>
          <div className="tailora-page-gradient" style={{ background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", height: 144, position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />

          <div className="tailora-page-content tc-content" style={{ padding: "40px 36px 60px", position: "relative" }}>
            <div className="tailora-page-header-row tc-header-row" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
              <div>
                <h1 className="tailora-page-title" style={{ margin: "0 0 6px", fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24, color: "#121212", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  Team Collaboration <span style={{ fontSize: 22 }}>👕</span>
                </h1>
                <p className="tailora-page-subtitle" style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "var(--font-satoshi)", lineHeight: "22px" }}>
                  Manage your atelier's team and control who can access, edit, and assign work across your workspace.
                </p>
              </div>
              <PrimaryButton className="tailora-btn-primary tc-invite-btn" onClick={() => openInviteCoworker()}>
                <ExportIcon />
                Invite Member
              </PrimaryButton>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: 10, boxShadow: "0px 4px 4px -2px rgba(0,0,0,0.04)", marginBottom: 24, overflow: "hidden" }}>
              <div className="tc-filter-bar" style={{ padding: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <label className="tc-search-label" style={{ width: "291px", display: "flex", alignItems: "center", gap: 8, border: "1px solid #D0D5DD", borderRadius: 6, padding: "8px 12px", background: "#fff", boxShadow: "0 4px 8px -2px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.04)", cursor: "text" }}>
                  <SearchIcon />
                  <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search here..." style={{ border: "none", outline: "none", fontSize: 14, color: "#1A1A1A", fontFamily: "var(--font-satoshi)", background: "transparent", flex: 1, minWidth: 0 }}/>
                </label>
                <div className="tc-dropdown-wrap" style={{ position: "relative" }}>
                  <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ appearance: "none", WebkitAppearance: "none", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 6, padding: "8px 36px 8px 12px", fontSize: 14, fontWeight: 700, color: "#344054", fontFamily: "var(--font-satoshi)", cursor: "pointer", outline: "none", height: 36, width: "100%" }}>
                    <option value="All Roles">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Tailor">Tailor</option>
                    <option value="Assistant">Assistant</option>
                  </select>
                  <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDownIcon color="#344054" /></div>
                </div>
                <div className="tc-dropdown-wrap" style={{ position: "relative" }}>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ appearance: "none", WebkitAppearance: "none", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 6, padding: "8px 36px 8px 12px", fontSize: 14, fontWeight: 700, color: "#344054", fontFamily: "var(--font-satoshi)", cursor: "pointer", outline: "none", height: 36, width: "100%" }}>
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDownIcon color="#344054" /></div>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 20px", color: "#98A2B3", fontFamily: "var(--font-satoshi)", fontSize: 14 }}>
                No team members match your filters.
              </div>
            ) : (
              <div className="tc-member-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {filtered.map(m => (
                  <MemberCard
                    key={m.id}
                    member={m}
                    onEdit={() => handleEdit(m)}
                    onDelete={() => setDeleteTarget(m)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}