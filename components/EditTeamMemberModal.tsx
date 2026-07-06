"use client";
import { useEffect, useState } from "react";

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

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onSave: (updated: Member) => Promise<void>;
}

export default function EditTeamMemberModal({ isOpen, onClose, member, onSave }: EditProps) {
  const [form, setForm] = useState({ name: "", email: "", role: "Admin" as Role, status: "Active" as Status });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (member && isOpen) {
      setForm({
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
      });
      setError(null);
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in both name and email.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await onSave({
        ...member,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
      });
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #E2E4E9",
    borderRadius: 10,
    fontSize: 14,
    color: "#1A1A1A",
    fontFamily: "Satoshi, Inter, sans-serif",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    transition: "border-color 0.15s"
  };

  return (
    <div className="tailora-modal-backdrop" onClick={() => onClose()} style={{ position: "fixed", inset: 0, background: "rgba(10,13,18,0.70)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="tailora-modal-panel" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: 514, background: "#fff", borderRadius: 16, overflow: "hidden", fontFamily: "Satoshi, Inter, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)", pointerEvents: "none", zIndex: 0 }} />
        <button type="button" onClick={() => onClose()} style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: "50%", background: "#F5F7F8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
        <div style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: "0 0 12px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Edit Team Member</h2>
          <div style={{ height: 1, background: "#F1F1F2", marginBottom: 24 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Full Name</label>
              <input placeholder="Add name..........." value={form.name} onChange={e => set("name", e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Team Member's Email</label>
              <input type="email" placeholder="Add email..........." value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Select Role</label>
              <div style={{ position: "relative" }}>
                <select value={form.role} onChange={e => set("role", e.target.value)} style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}>
                  {["Admin", "Tailor", "Assistant"].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#595653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Status</label>
              <div style={{ position: "relative" }}>
                <select value={form.status} onChange={e => set("status", e.target.value)} style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}>
                  {["Active", "Pending"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#595653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
          </div>
          {error && (
            <p style={{ color: "#9E0A05", fontSize: 13, margin: "16px 0 0" }}>{error}</p>
          )}
          <div className="tailora-modal-actions" style={{ display: "flex", gap: 16, marginTop: 28 }}>
            <button type="button" onClick={() => onClose()} style={{ flex: 1, padding: "13px 24px", background: "transparent", border: "1px solid #121212", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              Cancel
            </button>
            <button type="button" onClick={handleSave} disabled={isSubmitting} style={{ flex: 1, padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: "pointer", opacity: isSubmitting ? 0.7 : 1 }}
              onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = "#333")}
              onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = "#121212")}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
