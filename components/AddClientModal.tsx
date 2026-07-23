"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface ClientFormData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  outfitType: string;
}

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft?: (data: ClientFormData) => Promise<void> | void;
  onContinue: (data: ClientFormData) => void;
  initialData?: ClientFormData | null;
  existingClients?: Array<{ name: string; phone: string }>;
}

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const OUTFIT_OPTIONS = ["Wedding Gown", "Suit", "Senator", "Agbada", "Ankara", "Iro & Buba", "Kaftan", "Custom"];

export function isValidPhoneNumber(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  // Reject letters or invalid characters
  if (/[^0-9\+\-\(\)\s]/.test(trimmed)) return false;
  // Check digit count (min 7, max 15 digits per standard E.164/international phone format)
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export default function AddClientModal({
  isOpen,
  onClose,
  onSaveDraft,
  onContinue,
  initialData,
  existingClients = []
}: AddClientModalProps) {
  const [form, setForm] = useState<ClientFormData>({ name: "", phone: "", email: "", gender: "", outfitType: "" });
  const [isCustomOutfit, setIsCustomOutfit] = useState(false);
  const [customOutfitText, setCustomOutfitText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unsaved changes modal state
  const [showDiscardPrompt, setShowDiscardPrompt] = useState(false);

  // Duplicate client warning state
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [duplicateMatchInfo, setDuplicateMatchInfo] = useState<string>("");
  const [pendingAction, setPendingAction] = useState<"continue" | "draft" | null>(null);
  const [fetchedClients, setFetchedClients] = useState<Array<{ name: string; phone: string }>>([]);

  const set = (k: keyof ClientFormData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (isOpen) {
      const fetchClients = async () => {
        try {
          const { data } = await supabase.from("clients").select("name, phone");
          if (data) {
            setFetchedClients(data.map((c: any) => ({ name: c.name || "", phone: c.phone || "" })));
          }
        } catch (err) {
          console.error("Error loading clients for dup check:", err);
        }
      };
      fetchClients();

      if (initialData && (initialData.name || initialData.phone)) {
        const isPreset = OUTFIT_OPTIONS.includes(initialData.outfitType);
        setForm({
          id: initialData.id,
          name: initialData.name || "",
          phone: initialData.phone || "",
          email: initialData.email || "",
          gender: initialData.gender || "",
          outfitType: initialData.outfitType || ""
        });
        if (!isPreset && initialData.outfitType && initialData.outfitType !== "Custom") {
          setIsCustomOutfit(true);
          setCustomOutfitText(initialData.outfitType);
        }
      }
    } else {
      setForm({ name: "", phone: "", email: "", gender: "", outfitType: "" });
      setIsCustomOutfit(false);
      setCustomOutfitText("");
      setError(null);
      setShowDiscardPrompt(false);
      setShowDuplicateWarning(false);
      setDuplicateMatchInfo("");
      setPendingAction(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleOutfitChange = (value: string) => {
    if (value === "Custom") {
      setIsCustomOutfit(true);
      setCustomOutfitText("");
      set("outfitType", "Custom");
    } else {
      setIsCustomOutfit(false);
      set("outfitType", value);
    }
  };

  const handleCustomOutfitChange = (value: string) => {
    setCustomOutfitText(value);
    set("outfitType", value.trim() ? value : "Custom");
  };

  const isFormDirty = Boolean(
    form.name.trim() || form.phone.trim() || form.email.trim() || form.gender || form.outfitType
  );

  const handleAttemptClose = () => {
    if (isFormDirty) {
      setShowDiscardPrompt(true);
    } else {
      onClose();
    }
  };

  const checkForDuplicate = (trimmedName: string, trimmedPhone: string): { isDup: boolean; info: string } => {
    const cleanPhone = trimmedPhone.replace(/\D/g, "");
    const clientsToCheck = existingClients.length > 0 ? existingClients : fetchedClients;
    const match = clientsToCheck.find(c => {
      const cCleanPhone = c.phone.replace(/\D/g, "");
      const nameMatch = c.name.trim().toLowerCase() === trimmedName.toLowerCase();
      const phoneMatch = cleanPhone && cCleanPhone && cleanPhone === cCleanPhone;
      return nameMatch || phoneMatch;
    });

    if (match) {
      return { isDup: true, info: `${match.name} (${match.phone})` };
    }
    return { isDup: false, info: "" };
  };

  const executeAction = async (action: "continue" | "draft", cleanedForm: ClientFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (action === "continue") {
        onContinue(cleanedForm);
      } else {
        await onSaveDraft?.(cleanedForm);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Failed to process client.");
    } finally {
      setIsSubmitting(false);
      setShowDuplicateWarning(false);
      setPendingAction(null);
    }
  };

  const handleContinue = () => {
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
    if (!form.outfitType || (form.outfitType === "Custom" && !customOutfitText.trim())) {
      setError("Please select or specify an outfit type.");
      return;
    }

    setError(null);
    const cleanedForm: ClientFormData = {
      ...form,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      outfitType: isCustomOutfit ? customOutfitText.trim() : form.outfitType
    };

    if (!showDuplicateWarning) {
      const dup = checkForDuplicate(trimmedName, trimmedPhone);
      if (dup.isDup) {
        setDuplicateMatchInfo(dup.info);
        setShowDuplicateWarning(true);
        setPendingAction("continue");
        return;
      }
    }

    executeAction("continue", cleanedForm);
  };

  const handleSaveDraft = () => {
    const trimmedName = form.name.trim();
    const trimmedPhone = form.phone.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      setError("Full Name is required to save a draft.");
      return;
    }
    if (trimmedPhone && !isValidPhoneNumber(trimmedPhone)) {
      setError("Please enter a valid phone number format (min 7 digits, no letters).");
      return;
    }

    setError(null);
    const cleanedForm: ClientFormData = {
      ...form,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      outfitType: isCustomOutfit ? customOutfitText.trim() : form.outfitType
    };

    if (!showDuplicateWarning) {
      const dup = checkForDuplicate(trimmedName, trimmedPhone);
      if (dup.isDup) {
        setDuplicateMatchInfo(dup.info);
        setShowDuplicateWarning(true);
        setPendingAction("draft");
        return;
      }
    }

    executeAction("draft", cleanedForm);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", border: "1px solid #E2E4E9", borderRadius: 10,
    fontSize: 14, color: "#1A1A1A", fontFamily: "Satoshi, Inter, sans-serif",
    outline: "none", boxSizing: "border-box", background: "#fff", transition: "border-color 0.15s",
  };

  return (
    <div className="tailora-modal-backdrop" onClick={handleAttemptClose} style={{ position: "fixed", inset: 0, background: "rgba(10,13,18,0.70)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="tailora-modal-panel" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: 514, maxHeight: "calc(100vh - 48px)", overflowY: "auto", background: "#fff", borderRadius: 16, fontFamily: "Satoshi, Inter, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)", pointerEvents: "none", zIndex: 0 }} />
        <button type="button" onClick={handleAttemptClose} style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: "50%", background: "#F5F7F8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <div className="tailora-modal-inner" style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: "0 0 16px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>Add New Client</h2>
          <div style={{ height: 1, background: "#F1F1F2", marginBottom: 24 }} />
          
          {showDuplicateWarning && (
            <div style={{ background: "#FEF6E7", border: "1px solid #F7C164", borderRadius: 10, padding: 14, marginBottom: 20 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#865503" }}>Possible Duplicate Client Found</p>
              <p style={{ margin: "4px 0 12px", fontSize: 13, color: "#865503" }}>
                A client with matching details already exists: <strong>{duplicateMatchInfo}</strong>. Are you sure you want to create another record?
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => {
                    const cleanedForm: ClientFormData = {
                      ...form,
                      name: form.name.trim(),
                      phone: form.phone.trim(),
                      email: form.email.trim(),
                      outfitType: isCustomOutfit ? customOutfitText.trim() : form.outfitType
                    };
                    executeAction(pendingAction || "continue", cleanedForm);
                  }}
                  style={{ background: "#865503", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                >
                  Proceed Anyway
                </button>
                <button
                  type="button"
                  onClick={() => setShowDuplicateWarning(false)}
                  style={{ background: "#fff", color: "#865503", border: "1px solid #F7C164", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer" }}
                >
                  Cancel & Edit
                </button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Client Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Client Name <span style={{ color: "#E03137" }}>*</span></label>
              <input
                type="text"
                maxLength={100}
                placeholder="Add name"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}
              />
            </div>
            {/* Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Phone Number <span style={{ color: "#E03137" }}>*</span></label>
              <input
                type="tel"
                placeholder="Add number (e.g. +2348012345678)"
                value={form.phone}
                onChange={e => set("phone", e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}
              />
            </div>
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Email Address <span style={{ fontWeight: 400, color: "#525866" }}>(Optional)</span></label>
              <input
                type="email"
                placeholder="Add email address"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#121212")}
                onBlur={e => (e.currentTarget.style.borderColor = "#E2E4E9")}
              />
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
                    value={form.outfitType || ""}
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
                      set("outfitType", "");
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
          </div>

          {error && (
            <p style={{ margin: "16px 0 0", fontSize: 13, color: "#9E0A05" }}>{error}</p>
          )}

          <div className="tailora-modal-actions" style={{ display: "flex", gap: 16, marginTop: 28 }}>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSaveDraft}
              style={{ flex: 1, padding: "13px 24px", background: "transparent", border: "1px solid #121212", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.6 : 1 }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {isSubmitting ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleContinue}
              style={{ flex: 1, padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.6 : 1 }}
              onMouseEnter={e => (e.currentTarget.style.background = "#333")}
              onMouseLeave={e => (e.currentTarget.style.background = "#121212")}
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </button>
          </div>
        </div>
      </div>

      {/* Discard unsaved changes confirmation modal */}
      {showDiscardPrompt && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 360, background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "Satoshi, sans-serif" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#121212" }}>Discard Changes?</h3>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: "#667185", lineHeight: 1.4 }}>
              You have unsaved changes in the form. Are you sure you want to discard them and exit?
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                onClick={() => setShowDiscardPrompt(false)}
                style={{ flex: 1, padding: "10px", background: "#fff", border: "1px solid #D0D5DD", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "#344054", cursor: "pointer" }}
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDiscardPrompt(false);
                  onClose();
                }}
                style={{ flex: 1, padding: "10px", background: "#E03137", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer" }}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}