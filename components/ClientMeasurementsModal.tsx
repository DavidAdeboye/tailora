"use client";

import { useEffect, useState } from "react";
import type { ClientFormData } from "./AddClientModal";

interface Props {
  isOpen: boolean;
  client: ClientFormData | null;
  onClose: () => void;
  onSave: () => void;
}

const MEASUREMENT_FIELDS = [
  { key: "chest", label: "Chest" },
  { key: "waist", label: "Waist" },
  { key: "hip", label: "Hip" },
  { key: "shoulder", label: "Shoulder" },
  { key: "sleeve", label: "Sleeve Length" },
  { key: "inseam", label: "Inseam" },
] as const;

export default function ClientMeasurementsModal({ isOpen, client, onClose, onSave }: Props) {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setValues({});
      setError(null);
      setUnit("in");
    }
  }, [isOpen]);

  if (!isOpen || !client) return null;

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

  const handleSave = () => {
    const filled = MEASUREMENT_FIELDS.some((f) => values[f.key]?.trim());
    if (!filled) {
      setError("Enter at least one measurement to continue.");
      return;
    }
    setError(null);
    onSave();
  };

  return (
    <div
      className="tailora-modal-backdrop"
      onClick={() => onClose()}
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
          width: 514,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 16,
          fontFamily: "Satoshi, Inter, sans-serif",
        }}
      >
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
        <button
          onClick={() => onClose()}
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
            Record Measurements
          </h2>
          <p style={{ margin: "0 0 16px", fontSize: 14, color: "#696969" }}>
            {client.name} · {client.outfitType}
          </p>
          <div style={{ height: 1, background: "#F1F1F2", marginBottom: 20 }} />

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {(["in", "cm"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: unit === u ? "1px solid #121212" : "1px solid #E2E4E9",
                  background: unit === u ? "#121212" : "#fff",
                  color: unit === u ? "#fff" : "#121212",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {u === "in" ? "Inches" : "Centimetres"}
              </button>
            ))}
          </div>

          <div className="tailora-measurements-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {MEASUREMENT_FIELDS.map((f) => (
              <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#283145" }}>{f.label}</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={`0 ${unit}`}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          {error && (
            <p style={{ margin: "16px 0 0", fontSize: 13, color: "#9E0A05" }}>{error}</p>
          )}

          <div className="tailora-modal-actions" style={{ display: "flex", gap: 16, marginTop: 28 }}>
            <button
              type="button"
              onClick={() => onClose()}
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
              onClick={handleSave}
              style={{
                flex: 1,
                padding: "13px 24px",
                background: "#121212",
                border: "none",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Save Measurements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
