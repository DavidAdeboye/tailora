"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface MeasurementClientData {
  id: string;
  name: string;
  phone?: string;
  gender?: string;
  outfitType?: string;
}

interface CustomField {
  id: number;
  fieldName: string;
  value: string;
}

interface Props {
  isOpen: boolean;
  client: MeasurementClientData | null;
  initialRecord?: any;
  onClose: () => void;
  onSave?: () => void;
}

const PREDEFINED_FIELDS = [
  { key: "neck", label: "Neck", hint: "Around base" },
  { key: "chestBust", label: "Chest/Bust", hint: "Fullest point" },
  { key: "waist", label: "Waist", hint: "Natural line" },
  { key: "hip", label: "Hip", hint: "Fullest point" },
  { key: "shoulder", label: "Shoulder", hint: "Seam to seam" },
  { key: "sleeve", label: "Sleeve", hint: "Shoulder to wrist" },
  { key: "trouserLength", label: "Trouser Length", hint: "Waist to hem" },
] as const;

export default function ClientMeasurementsModal({
  isOpen,
  client,
  initialRecord,
  onClose,
  onSave,
}: Props) {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [values, setValues] = useState<Record<string, string>>({});
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showDiscardPrompt, setShowDiscardPrompt] = useState(false);
  const [pendingWarning, setPendingWarning] = useState<{
    type: "zero" | "outlier";
    message: string;
  } | null>(null);

  // Track initial state to detect unsaved changes
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setValues({});
      setCustomFields([]);
      setNote("");
      setError(null);
      setUnit("in");
      setIsDirty(false);
      setShowDiscardPrompt(false);
      setPendingWarning(null);
    } else if (initialRecord) {
      setUnit(initialRecord.unit === "cm" || initialRecord.unit === "centimetres" ? "cm" : "in");
      setValues({
        neck: initialRecord.neck || "",
        chestBust: initialRecord.chestBust || "",
        waist: initialRecord.waist || "",
        hip: initialRecord.hip || "",
        shoulder: initialRecord.shoulder || "",
        sleeve: initialRecord.sleeve || "",
        trouserLength: initialRecord.trouserLength || "",
      });
      setCustomFields(
        (initialRecord.customFields || []).map((cf: any, i: number) => ({
          id: Date.now() + i,
          fieldName: cf.name || cf.fieldName || "",
          value: cf.value || "",
        }))
      );
      setNote(initialRecord.notes || "");
      setIsDirty(false);
      setError(null);
    }
  }, [isOpen, initialRecord]);

  if (!isOpen || !client) return null;

  const handleFieldChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setIsDirty(true);
    setError(null);
  };

  const handleAddCustomField = () => {
    setCustomFields((prev) => [
      ...prev,
      { id: Date.now(), fieldName: "", value: "" },
    ]);
    setIsDirty(true);
  };

  const handleCustomFieldChange = (id: number, key: "fieldName" | "value", val: string) => {
    setCustomFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: val } : f))
    );
    setIsDirty(true);
    setError(null);
  };

  const handleRemoveCustomField = (id: number) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
    setIsDirty(true);
  };

  const handleAttemptClose = () => {
    if (isDirty) {
      setShowDiscardPrompt(true);
    } else {
      onClose();
    }
  };

  const executeSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        throw new Error("You must be logged in to save measurements.");
      }

      let ownerId = userData.user.id;
      const { data: rpcResult } = await supabase.rpc("get_my_team_role");
      if (rpcResult && rpcResult.length > 0) {
        ownerId = rpcResult[0].owner_id;
      }

      const measurementsJson = {
        unit: unit === "in" ? "inches" : "centimetres",
        neck: values.neck || "",
        chestBust: values.chestBust || "",
        waist: values.waist || "",
        hip: values.hip || "",
        shoulder: values.shoulder || "",
        sleeve: values.sleeve || "",
        trouserLength: values.trouserLength || "",
        customFields: customFields.map((f) => ({
          name: f.fieldName.trim(),
          value: f.value.trim(),
        })),
        notes: note.trim(),
      };

      if (initialRecord?.id) {
        // Update existing record
        const { error: err } = await supabase
          .from("orders")
          .update({
            measurements: measurementsJson,
            notes: note.trim(),
          })
          .eq("id", initialRecord.id);
        if (err) throw err;
      } else {
        // Insert new order / measurement record
        const { error: err } = await supabase.from("orders").insert({
          user_id: ownerId,
          client_id: client.id,
          client_name: client.name,
          phone: client.phone || "",
          gender: client.gender || "",
          outfit: client.outfitType || "",
          status: "Due",
          status_type: "due",
          notes: note.trim(),
          measurements: measurementsJson,
        });
        if (err) throw err;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("tailora_client_updated"));
      }

      setIsDirty(false);
      if (onSave) onSave();
      onClose();
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save measurements.");
    } finally {
      setIsSaving(false);
      setPendingWarning(null);
    }
  };

  const validateAndSave = (overrideWarning = false) => {
    setError(null);

    // 1. Mandatory Predefined Fields check (MEAS_009)
    for (const field of PREDEFINED_FIELDS) {
      const val = (values[field.key] || "").trim();
      if (!val) {
        setError(`Please fill in mandatory predefined field: ${field.label}.`);
        return;
      }
    }

    // Combine all fields to validate numeric rules
    const allEntries: Array<{ label: string; raw: string }> = [
      ...PREDEFINED_FIELDS.map((f) => ({ label: f.label, raw: (values[f.key] || "").trim() })),
      ...customFields.map((cf) => ({
        label: cf.fieldName.trim() || "Custom Field",
        raw: cf.value.trim(),
      })),
    ];

    // 2. Reject Non-Numeric (MEAS_003) & Negative (MEAS_004)
    for (const item of allEntries) {
      if (!item.raw) continue;

      // Check negative
      if (item.raw.startsWith("-") || parseFloat(item.raw) < 0) {
        setError(`Validation Error: "${item.label}" cannot be negative.`);
        return;
      }

      // Check valid numeric format (allows digits and max 1 decimal point) (MEAS_003 & MEAS_014)
      if (!/^\d+(\.\d+)?$/.test(item.raw)) {
        setError(`Validation Error: "${item.label}" must be a valid positive number.`);
        return;
      }
    }

    // If override is true, skip warnings and execute save directly
    if (overrideWarning) {
      executeSave();
      return;
    }

    // 3. Flag entering "0" (MEAS_011)
    for (const item of allEntries) {
      const num = parseFloat(item.raw);
      if (num === 0) {
        setPendingWarning({
          type: "zero",
          message: `Value "0" in "${item.label}" looks too small for a real measurement. Are you sure you want to save this value?`,
        });
        return;
      }
    }

    // 4. Unrealistic Outlier Check (MEAS_012)
    const limit = unit === "in" ? 100 : 250;
    for (const item of allEntries) {
      const num = parseFloat(item.raw);
      if (num > limit) {
        setPendingWarning({
          type: "outlier",
          message: `Value "${item.raw} ${unit}" in "${item.label}" seems unusually large (over ${limit} ${unit}). Please confirm if this is correct.`,
        });
        return;
      }
    }

    executeSave();
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
  };

  return (
    <>
      <div
        className="tailora-modal-backdrop"
        onClick={handleAttemptClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,13,18,0.70)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="tailora-modal-panel"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: 540,
            maxHeight: "90vh",
            overflowY: "auto",
            background: "#fff",
            borderRadius: 16,
            fontFamily: "Satoshi, Inter, sans-serif",
          }}
        >
          {/* Top header background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 180,
              background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={handleAttemptClose}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#F5F7F8",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
            <h2 style={{ margin: "0 0 4px", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1A1A" }}>
              {initialRecord ? "Edit Measurement Record" : "Take Measurements"}
            </h2>
            <p style={{ margin: "0 0 16px", fontSize: 14, color: "#696969" }}>
              {client.name} {client.outfitType ? `· ${client.outfitType}` : ""}
            </p>
            <div style={{ height: 1, background: "#F1F1F2", marginBottom: 20 }} />

            {/* Unit Selector (MEAS_005) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>Measurement Unit</span>
              <div style={{ display: "flex", gap: 8 }}>
                {(["in", "cm"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => {
                      setUnit(u);
                      setIsDirty(true);
                    }}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 999,
                      border: unit === u ? "1px solid #121212" : "1px solid #E2E4E9",
                      background: unit === u ? "#121212" : "#fff",
                      color: unit === u ? "#fff" : "#121212",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {u === "in" ? "Inches (in)" : "Centimetres (cm)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Predefined Fields Grid */}
            <div className="tailora-measurements-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {PREDEFINED_FIELDS.map((f) => (
                <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>
                    {f.label} <span style={{ color: "#E03137" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder={`0 ${unit}`}
                      value={values[f.key] ?? ""}
                      onChange={(e) => handleFieldChange(f.key, e.target.value)}
                      style={{ ...inputStyle, paddingRight: 40 }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#999",
                        pointerEvents: "none",
                      }}
                    >
                      {unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Fields (MEAS_002) */}
            {customFields.length > 0 && (
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#121212" }}>Custom Fields</h4>
                {customFields.map((cf) => (
                  <div key={cf.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder="Field Name (e.g. Bicep)"
                      value={cf.fieldName}
                      onChange={(e) => handleCustomFieldChange(cf.id, "fieldName", e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <div style={{ position: "relative", flex: 1 }}>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder={`Value in ${unit}`}
                        value={cf.value}
                        onChange={(e) => handleCustomFieldChange(cf.id, "value", e.target.value)}
                        style={{ ...inputStyle, paddingRight: 40 }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#999",
                          pointerEvents: "none",
                        }}
                      >
                        {unit}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomField(cf.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#9E0A05",
                        cursor: "pointer",
                        padding: "6px 8px",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleAddCustomField}
              style={{
                marginTop: 16,
                background: "none",
                border: "1px dashed #D0D5DD",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "#344054",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              + Add Custom Field
            </button>

            {/* Note Field (MEAS_008) */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>
                Measurement Note <span style={{ fontWeight: 400, color: "#667185" }}>(Optional)</span>
              </label>
              <textarea
                placeholder="e.g. Client prefers a looser fit around the waist"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setIsDirty(true);
                }}
                rows={2}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            {error && (
              <div
                style={{
                  marginTop: 16,
                  padding: "10px 14px",
                  background: "#FBEAE9",
                  border: "1px solid #FDA29B",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#9E0A05",
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="tailora-modal-actions" style={{ display: "flex", gap: 16, marginTop: 28 }}>
              <button
                type="button"
                onClick={handleAttemptClose}
                style={{
                  flex: 1,
                  padding: "13px 24px",
                  background: "transparent",
                  border: "1px solid #121212",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#121212",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => validateAndSave(false)}
                style={{
                  flex: 1,
                  padding: "13px 24px",
                  background: "#121212",
                  border: "none",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#fff",
                  cursor: isSaving ? "not-allowed" : "pointer",
                  opacity: isSaving ? 0.6 : 1,
                }}
              >
                {isSaving ? "Saving..." : "Save Measurements"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning/Confirmation Prompt for 0 or Outlier values (MEAS_011, MEAS_012) */}
      {pendingWarning && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,13,18,0.75)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 440,
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              fontFamily: "Satoshi, sans-serif",
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: 18, color: "#101928", fontFamily: "Sora, sans-serif" }}>
              {pendingWarning.type === "zero" ? "Confirm Measurement Value" : "Unusual Measurement Warning"}
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: "#475467", lineHeight: 1.5 }}>
              {pendingWarning.message}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                onClick={() => setPendingWarning(null)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #D0D5DD",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Go Back & Check
              </button>
              <button
                type="button"
                onClick={() => validateAndSave(true)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#EB5017",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Yes, Save Value
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Unsaved Changes Prompt (MEAS_013) */}
      {showDiscardPrompt && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,13,18,0.75)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 420,
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              fontFamily: "Satoshi, sans-serif",
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: 18, color: "#101928", fontFamily: "Sora, sans-serif" }}>
              Discard Unsaved Measurements?
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: "#475467", lineHeight: 1.5 }}>
              You have entered measurement values that have not been saved. Leaving now will discard these changes.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                onClick={() => setShowDiscardPrompt(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #D0D5DD",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Continue Editing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDiscardPrompt(false);
                  setIsDirty(false);
                  onClose();
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#D92D20",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
