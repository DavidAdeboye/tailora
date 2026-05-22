"use client";
import { useEffect, useState } from "react";

export interface ClientFormData {
  name: string;
  phone: string;
  email: string;
  gender: string;
  outfitType: string;
}

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft?: (data: ClientFormData) => void;
  onContinue: (data: ClientFormData) => void;
}

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const OUTFIT_OPTIONS = ["Wedding Gown", "Suit", "Senator", "Agbada", "Ankara", "Iro & Buba", "Kaftan", "Custom"];

export default function AddClientModal({ isOpen, onClose, onSaveDraft, onContinue }: AddClientModalProps) {
  const [form, setForm] = useState<ClientFormData>({ name: "", phone: "", email: "", gender: "", outfitType: "" });
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof ClientFormData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", phone: "", email: "", gender: "", outfitType: "" });
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.gender || !form.outfitType) {
      setError("Please fill in client name, phone, gender, and outfit type.");
      return;
    }
    setError(null);
    onContinue(form);
  };

  const handleSaveDraft = () => {
    if (!form.name.trim()) {
      setError("Add a client name to save a draft.");
      return;
    }
    setError(null);
    onSaveDraft?.(form);
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", border: "1px solid #E2E4E9", borderRadius: 10,
    fontSize: 14, color: "#1A1A1A", fontFamily: "Satoshi, Inter, sans-serif",
    outline: "none", boxSizing: "border-box", background: "#fff", transition: "border-color 0.15s",
  };

  return (
    <div onClick={() => onClose()} style={{ position: "fixed", inset: 0, background: "rgba(10,13,18,0.70)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="tailora-modal-panel" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: 514, background: "#fff", borderRadius: 16, overflow: "hidden", fontFamily: "Satoshi, Inter, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)", pointerEvents: "none", zIndex: 0 }} />
        <button type="button" onClick={() => onClose()} style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: "50%", background: "#F5F7F8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <div className="tailora-modal-inner" style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: "0 0 16px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Add New Client</h2>
          <div style={{ height: 1, background: "#F1F1F2", marginBottom: 24 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Client Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Client Name</label>
              <input type="text" placeholder="Add name" value={form.name} onChange={e => set("name", e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
            </div>
            {/* Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Phone Number</label>
              <input type="tel" placeholder="Add number" value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
            </div>
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Email Address <span style={{ fontWeight: 400, color: "#525866" }}>(Optional)</span></label>
              <input type="email" placeholder="Add email address" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
            </div>
            {/* Gender */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Gender</label>
              <div style={{ position: "relative" }}>
                <select value={form.gender} onChange={e => set("gender", e.target.value)} style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}>
                  <option value="" disabled>Select gender</option>
                  {GENDER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#595653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
            {/* Outfit Type */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Outfit Type</label>
              <div style={{ position: "relative" }}>
                <select value={form.outfitType} onChange={e => set("outfitType", e.target.value)} style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}>
                  <option value="" disabled>Select outfit type</option>
                  {OUTFIT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#595653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
          </div>
          {error && (
            <p style={{ margin: "16px 0 0", fontSize: 13, color: "#9E0A05" }}>{error}</p>
          )}
          <div className="tailora-modal-actions" style={{ display: "flex", gap: 16, marginTop: 28 }}>
            <button type="button" onClick={handleSaveDraft} style={{ flex: 1, padding: "13px 24px", background: "transparent", border: "1px solid #121212", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              Save Draft
            </button>
            <button type="button" onClick={handleContinue} style={{ flex: 1, padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#333")} onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}