"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

interface Props { isOpen: boolean; onClose: () => void; }

export default function InviteTeamMemberModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", role: "Admin" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  if (!isOpen) return null;

  const handleInvite = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in both name and email.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (sessionErr || !token) {
        throw new Error("You must be logged in to invite team members.");
      }

      const response = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          role: form.role
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to send invitation.");
      }

      setIsSuccess(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("tailora_team_member_invited", {
          detail: { name: form.name.trim(), email: form.email.trim(), role: form.role }
        }));
      }
    } catch (err: any) {
      console.error("Failed to invite team member:", {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
        error: err
      });
      setError(err.message || "Failed to send invitation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="tailora-modal-backdrop" onClick={() => { setIsSuccess(false); setForm({ name: "", email: "", role: "Admin" }); onClose(); }} style={{ position: "fixed", inset: 0, background: "rgba(10,13,18,0.70)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="tailora-modal-panel" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: 514, maxHeight: "calc(100vh - 48px)", overflowY: "auto", background: "#fff", borderRadius: 16, fontFamily: "Satoshi, Inter, sans-serif" }}>
          <div style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E7F6EC", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#036B26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ margin: "0 0 8px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 22, color: "#1a1a1a" }}>Invitation Sent!</h2>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#555960", lineHeight: "20px" }}>
              We've sent an email invitation to <strong style={{ color: "#121212" }}>{form.email}</strong> to join your workspace as an <strong style={{ color: "#121212" }}>{form.role}</strong>.
            </p>
            <button type="button" onClick={() => {
              setIsSuccess(false);
              setForm({ name: "", email: "", role: "Admin" });
              onClose();
            }} style={{ width: "100%", padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", cursor: "pointer" }}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="tailora-modal-panel" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: 514, maxHeight: "calc(100vh - 48px)", overflowY: "auto", background: "#fff", borderRadius: 16, fontFamily: "Satoshi, Inter, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)", pointerEvents: "none", zIndex: 0 }} />
        <button type="button" onClick={() => onClose()} style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: "50%", background: "#F5F7F8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
        <div style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: "0 0 12px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Invite Team Member</h2>
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
            <button type="button" onClick={handleInvite} disabled={isSubmitting} style={{ flex: 1, padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: "pointer", opacity: isSubmitting ? 0.7 : 1 }}
              onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = "#333")}
              onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = "#121212")}>
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}