"use client";
import { useEffect, useState } from "react";
import { useAppModals } from "./AppModalsContext";
import { isValidPhoneNumber } from "./AddClientModal";

export interface ClientData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender: string;
  outfit: string;
  status: string;
}

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientData | null;
  onSave: (updated: ClientData) => Promise<void>;
}

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const OUTFIT_OPTIONS = ["Wedding Gown", "Suit", "Senator", "Agbada", "Ankara", "Iro & Buba", "Kaftan", "Custom"];
const STATUS_OPTIONS = ["Due", "Overdue", "Collected"];

export default function EditClientModal({ isOpen, onClose, client, onSave }: EditClientModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    outfit: "",
    status: ""
  });
  const [isCustomOutfit, setIsCustomOutfit] = useState(false);
  const [customOutfitText, setCustomOutfitText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openOrderFlowForClient } = useAppModals();

  const handleEditMore = () => {
    if (client && openOrderFlowForClient) {
      openOrderFlowForClient({
        id: client.id,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        gender: form.gender,
        outfitType: form.outfit
      });
      onClose();
    }
  };

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => {
    if (client && isOpen) {
      const isPreset = OUTFIT_OPTIONS.includes(client.outfit);
      setForm({
        name: client.name || "",
        phone: client.phone || "",
        email: client.email || "",
        gender: client.gender || "",
        outfit: client.outfit || "",
        status: client.status || "Due"
      });
      if (!isPreset && client.outfit) {
        setIsCustomOutfit(true);
        setCustomOutfitText(client.outfit);
      } else {
        setIsCustomOutfit(false);
        setCustomOutfitText("");
      }
      setError(null);
    }
  }, [client, isOpen]);

  if (!isOpen || !client) return null;

  const handleOutfitChange = (value: string) => {
    if (value === "Custom") {
      setIsCustomOutfit(true);
      setCustomOutfitText("");
      set("outfit", "Custom");
    } else {
      setIsCustomOutfit(false);
      set("outfit", value);
    }
  };

  const handleCustomOutfitChange = (value: string) => {
    setCustomOutfitText(value);
    set("outfit", value.trim() ? value : "Custom");
  };

  const handleSave = async () => {
    const trimmedName = form.name.trim();
    const trimmedPhone = form.phone.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      setError("Full Name is required.");
      return;
    }
    if (!trimmedPhone) {
      setError("Phone Number is required.");
      return;
    }
    if (!isValidPhoneNumber(trimmedPhone)) {
      setError("Please enter a valid phone number (min 7 digits, no letters).");
      return;
    }
    if (!form.gender) {
      setError("Please select a gender.");
      return;
    }
    if (!form.outfit || (form.outfit === "Custom" && !customOutfitText.trim())) {
      setError("Please select or specify an outfit type.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSave({
        ...client,
        name: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        gender: form.gender,
        outfit: isCustomOutfit ? customOutfitText.trim() : form.outfit,
        status: form.status
      });
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", border: "1px solid #E2E4E9", borderRadius: 10,
    fontSize: 14, color: "#1A1A1A", fontFamily: "Satoshi, Inter, sans-serif",
    outline: "none", boxSizing: "border-box", background: "#fff", transition: "border-color 0.15s",
  };

  return (
    <div className="tailora-modal-backdrop" onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,13,18,0.70)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="tailora-modal-panel" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: 514, maxHeight: "calc(100vh - 48px)", overflowY: "auto", background: "#fff", borderRadius: 16, fontFamily: "Satoshi, Inter, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)", pointerEvents: "none", zIndex: 0 }} />
        <button type="button" onClick={onClose} style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: "50%", background: "#F5F7F8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <div className="tailora-modal-inner" style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: "0 0 16px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Edit Client</h2>
          <div style={{ height: 1, background: "#F1F1F2", marginBottom: 24 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Client Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Client Name <span style={{ color: "#E03137" }}>*</span></label>
              <input type="text" placeholder="Add name" value={form.name} onChange={e => set("name", e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")} onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")} />
            </div>
            {/* Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Phone Number <span style={{ color: "#E03137" }}>*</span></label>
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
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Gender <span style={{ color: "#E03137" }}>*</span></label>
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
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Outfit Type <span style={{ color: "#E03137" }}>*</span></label>
              {!isCustomOutfit ? (
                <div style={{ position: "relative" }}>
                  <select
                    value={OUTFIT_OPTIONS.includes(form.outfit) ? form.outfit : (form.outfit ? "Custom" : "")}
                    onChange={e => handleOutfitChange(e.target.value)}
                    style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}
                  >
                    <option value="" disabled>Select outfit type</option>
                    {OUTFIT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#595653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <textarea
                    autoFocus
                    placeholder="Describe the outfit type..."
                    value={customOutfitText}
                    onChange={e => handleCustomOutfitChange(e.target.value)}
                    rows={3}
                    style={{
                      ...inputStyle,
                      padding: "10px 12px",
                      resize: "none",
                      lineHeight: "1.5",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomOutfit(false);
                      setCustomOutfitText("");
                      set("outfit", "");
                    }}
                    style={{
                      alignSelf: "flex-start",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#667185",
                      fontFamily: "Satoshi, sans-serif",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#121212")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#667185")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to presets
                  </button>
                </div>
              )}
            </div>
            {/* Status */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Status <span style={{ color: "#E03137" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <select value={form.status} onChange={e => set("status", e.target.value)} style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}>
                  {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: 24, marginBottom: -8 }}>
            <button
              type="button"
              onClick={handleEditMore}
              style={{
                background: "none", border: "none", color: "#EB5017", cursor: "pointer",
                fontSize: 14, fontWeight: 600, fontFamily: "Satoshi, sans-serif",
                textDecoration: "underline", display: "flex", alignItems: "center", gap: 6,
                padding: 0
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.085 2.72L7.585 11.22c-.35.35-.7.105-1.05-.245s-.6-.7-.25-1.05l8.5-8.5c.595-.595 1.715-.595 2.3 0C17.68 2.015 17.68 2.125 16.085 2.72z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 4.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Measurements & Order Details
            </button>
          </div>
          <div className="tailora-modal-actions" style={{ display: "flex", gap: 16, marginTop: 28 }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: "13px 24px", background: "transparent", border: "1px solid #121212", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              Cancel
            </button>
            <button type="button" disabled={isSubmitting} onClick={handleSave} style={{ flex: 1, padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.6 : 1 }}
              onMouseEnter={e => (e.currentTarget.style.background = "#333")} onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
