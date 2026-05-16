"use client";
import { useState } from "react";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft?: (data: ClientFormData) => void;
  onContinue?: (data: ClientFormData) => void;
}

interface ClientFormData {
  name: string;
  phone: string;
  email: string;
  gender: string;
  outfitType: string;
}

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const OUTFIT_OPTIONS = [
  "Wedding Gown",
  "Suit",
  "Senator",
  "Agbada",
  "Ankara",
  "Iro & Buba",
  "Kaftan",
  "Custom",
];

export default function AddClientModal({
  isOpen,
  onClose,
  onSaveDraft,
  onContinue,
}: AddClientModalProps) {
  const [form, setForm] = useState<ClientFormData>({
    name: "",
    phone: "",
    email: "",
    gender: "",
    outfitType: "",
  });

  if (!isOpen) return null;

  const handleChange = (field: keyof ClientFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    onSaveDraft?.(form);
    onClose();
  };

  const handleContinue = () => {
    onContinue?.(form);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10, 13, 18, 0.70)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Modal card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: 514,
            background: "#FFFFFF",
            borderRadius: 16,
            overflow: "hidden",
            fontFamily: "'Satoshi', 'Inter', sans-serif",
          }}
        >
          {/* Warm gradient header strip */}
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
            onClick={onClose}
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="#000"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Content */}
          <div style={{ padding: "32px 30px 30px", position: "relative", zIndex: 1 }}>
            {/* Title */}
            <h2
              style={{
                margin: "0 0 16px",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "#1A1A1A",
                lineHeight: "32px",
              }}
            >
              Add New Client
            </h2>

            {/* Divider */}
            <div style={{ height: 1, background: "#F1F1F2", marginBottom: 24 }} />

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Client Name */}
              <Field label="Client Name">
                <TextInput
                  placeholder="Add name"
                  value={form.name}
                  onChange={(v) => handleChange("name", v)}
                />
              </Field>

              {/* Phone Number */}
              <Field label="Phone Number">
                <TextInput
                  placeholder="Add number"
                  value={form.phone}
                  onChange={(v) => handleChange("phone", v)}
                  type="tel"
                />
              </Field>

              {/* Email Address */}
              <Field label="Email Address" optional>
                <TextInput
                  placeholder="Add email address"
                  value={form.email}
                  onChange={(v) => handleChange("email", v)}
                  type="email"
                />
              </Field>

              {/* Gender */}
              <Field label="Gender">
                <SelectInput
                  placeholder="Select gender"
                  value={form.gender}
                  options={GENDER_OPTIONS}
                  onChange={(v) => handleChange("gender", v)}
                />
              </Field>

              {/* Outfit Type */}
              <Field label="Outfit Type">
                <SelectInput
                  placeholder="Select outfit type"
                  value={form.outfitType}
                  options={OUTFIT_OPTIONS}
                  onChange={(v) => handleChange("outfitType", v)}
                />
              </Field>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
              <button
                onClick={handleSaveDraft}
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
                  fontFamily: "'Satoshi', sans-serif",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Save Draft
              </button>
              <button
                onClick={handleContinue}
                style={{
                  flex: 1,
                  padding: "13px 24px",
                  background: "#121212",
                  border: "none",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  cursor: "pointer",
                  fontFamily: "'Satoshi', sans-serif",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#333333")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#121212")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Helpers ── */

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#283145",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {label}
        {optional && (
          <span style={{ fontWeight: 400, color: "#525866" }}>(Optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 12px",
        background: "#FFFFFF",
        border: "1px solid #E2E4E9",
        borderRadius: 10,
        fontSize: 14,
        color: "#1A1A1A",
        fontFamily: "'Satoshi', 'Inter', sans-serif",
        outline: "none",
        boxSizing: "border-box",
        boxShadow: "0px 1px 2px rgba(228,229,231,0.24)",
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")}
    />
  );
}

function SelectInput({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 36px 10px 12px",
          background: "#FFFFFF",
          border: "1px solid #E2E4E9",
          borderRadius: 10,
          fontSize: 14,
          color: value ? "#1A1A1A" : "#525866",
          fontFamily: "'Satoshi', 'Inter', sans-serif",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
          boxSizing: "border-box",
          boxShadow: "0px 1px 2px rgba(228,229,231,0.24)",
          cursor: "pointer",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {/* chevron */}
      <div
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95"
            stroke="#595653"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}