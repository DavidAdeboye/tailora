"use client";

import { useState } from "react";
import type { ClientFormData } from "./AddClientModal";

interface Props {
  client: ClientFormData;
  onBack: () => void;
  onSaveDraft: () => void;
  onComplete: () => void;
}

type Step = 1 | 2 | 3;

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

function AddPlusDarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path opacity="0.4" d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z" fill="#121212" />
      <path d="M16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#121212" />
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

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9.51 4.23L18.86 8.9C22.95 10.95 22.95 14.32 18.86 16.37L9.51 21.04C3.75 23.92 1.4 21.56 4.28 15.8L5.15 14.07C5.37 13.62 5.37 12.89 5.15 12.44L4.28 10.7C1.4 4.94 3.76 2.59 9.51 4.23Z" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path opacity="0.4" d="M5.44 13.25H10.84" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path opacity="0.4" d="M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12Z" fill="#121212" />
      <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill="#121212" />
    </svg>
  );
}

function CloseSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12M4 4L12 12" stroke="#667185" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ── Field Components ── */
function MeasurementField({
  label, hint, value, onChange, unit,
}: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; unit: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>{label}</label>
        {hint && <span style={{ fontSize: 12, color: "#999", fontFamily: "Satoshi, sans-serif" }}>{hint}</span>}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="text" inputMode="decimal" value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder="0.0"
          style={{
            width: "100%", height: 44,
            border: `1px solid ${focused ? "#121212" : "#E2E4E9"}`,
            borderRadius: 8, padding: "0 48px 0 12px", fontSize: 14,
            color: "#121212", fontFamily: "Satoshi, sans-serif", outline: "none",
            background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s",
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

function CustomMeasurementRow({
  fieldName, value, unit, onFieldNameChange, onValueChange, onRemove,
}: {
  fieldName: string; value: string; unit: string;
  onFieldNameChange: (v: string) => void; onValueChange: (v: string) => void; onRemove: () => void;
}) {
  const [nameFocused, setNameFocused] = useState(false);
  const [valFocused, setValFocused] = useState(false);
  return (
    <div style={{ border: "1.5px dashed #D0D5DD", borderRadius: 10, padding: 16, background: "#FAFAFA" }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: "#696969", marginBottom: 8, fontFamily: "Satoshi, sans-serif" }}>
        Custom measurements
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          type="text" placeholder="Field name (e.g. Inseam)" value={fieldName}
          onChange={(e) => onFieldNameChange(e.target.value)}
          onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)}
          style={{
            width: "100%", border: "none",
            borderBottom: `1px solid ${nameFocused ? "#121212" : "#E2E4E9"}`,
            fontSize: 13, color: "#121212", fontFamily: "Satoshi, sans-serif",
            outline: "none", background: "transparent", padding: "4px 0",
            boxSizing: "border-box", transition: "border-color 0.15s",
          }}
        />
        <div style={{ position: "relative" }}>
          <input
            type="text" inputMode="decimal" placeholder="0.0" value={value}
            onChange={(e) => onValueChange(e.target.value)}
            onFocus={() => setValFocused(true)} onBlur={() => setValFocused(false)}
            style={{
              width: "100%", height: 40,
              border: `1px solid ${valFocused ? "#121212" : "#E2E4E9"}`,
              borderRadius: 8, padding: "0 72px 0 12px", fontSize: 14,
              color: "#121212", fontFamily: "Satoshi, sans-serif", outline: "none",
              background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s",
            }}
          />
          <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#999", fontFamily: "Satoshi, sans-serif" }}>
              {unit === "inches" ? "IN" : "CM"}
            </span>
            <button type="button" onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Measurements ── */
function MeasurementsStep({
  unit, setUnit, measurements, setMeasurements, customFields, setCustomFields,
}: {
  unit: string; setUnit: (u: string) => void;
  measurements: Record<string, string>; setMeasurements: (m: Record<string, string>) => void;
  customFields: Array<{ id: number; fieldName: string; value: string }>;
  setCustomFields: (f: Array<{ id: number; fieldName: string; value: string }>) => void;
}) {
  const standardFields = [
    { key: "neck", label: "Neck", hint: "Around base" },
    { key: "chestBust", label: "Chest/ Bust", hint: "Fullest point" },
    { key: "waist", label: "Waist", hint: "Natural line" },
    { key: "hip", label: "Hip", hint: "Fullest point" },
    { key: "shoulder", label: "Shoulder", hint: "Seam to seam" },
    { key: "sleeve", label: "Sleeve", hint: "Shoulder to wrist" },
    { key: "trouserLength", label: "Trouser Length", hint: "Waist to hem" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 24, color: "#121212" }}>
          Body measurements
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>Units</span>
          <div style={{ position: "relative" }}>
            <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{
              appearance: "none", WebkitAppearance: "none",
              border: "1px solid #E2E4E9", borderRadius: 8, padding: "8px 32px 8px 12px",
              fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif",
              background: "#fff", cursor: "pointer", outline: "none",
            }}>
              <option value="inches">inches</option>
              <option value="centimetres">centimetres</option>
            </select>
            <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px 24px" }}>
        {standardFields.map((f) => (
          <MeasurementField key={f.key} label={f.label} hint={f.hint}
            value={measurements[f.key] ?? ""} onChange={(v) => setMeasurements({ ...measurements, [f.key]: v })} unit={unit} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {customFields.length === 0 ? (
          <div style={{ border: "1.5px dashed #D0D5DD", borderRadius: 10, padding: 16, background: "#FAFAFA" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#696969", marginBottom: 8, fontFamily: "Satoshi, sans-serif" }}>Custom measurements</div>
            <div style={{ fontSize: 13, color: "#B0B0B0", fontFamily: "Satoshi, sans-serif", borderBottom: "1px solid #E2E4E9", padding: "4px 0", marginBottom: 8 }}>Field name (e.g. Inseam)</div>
            <div style={{ height: 40, border: "1px solid #E2E4E9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
              <span style={{ fontSize: 14, color: "#C0C0C0", fontFamily: "Satoshi, sans-serif" }}>0.0</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#999" }}>{unit === "inches" ? "IN" : "CM"}</span>
            </div>
          </div>
        ) : (
          customFields.map((cf) => (
            <CustomMeasurementRow key={cf.id} fieldName={cf.fieldName} value={cf.value} unit={unit}
              onFieldNameChange={(v) => setCustomFields(customFields.map((f) => (f.id === cf.id ? { ...f, fieldName: v } : f)))}
              onValueChange={(v) => setCustomFields(customFields.map((f) => (f.id === cf.id ? { ...f, value: v } : f)))}
              onRemove={() => setCustomFields(customFields.filter((f) => f.id !== cf.id))} />
          ))
        )}
      </div>

      <button type="button" onClick={() => setCustomFields([...customFields, { id: Date.now(), fieldName: "", value: "" }])} style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px",
        background: "#121212", border: "none", borderRadius: 100, cursor: "pointer",
        fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", alignSelf: "flex-start",
      }}>
        <AddPlusIcon />
        Add Custom Measurement
      </button>
    </div>
  );
}

/* ── Step 2: Order Details ── */
function OrderDetailsStep({
  orderDetails, setOrderDetails,
}: {
  orderDetails: { dateReceived: string; collectionDate: string; price: string; paymentStatus: string; assignedStaff: string };
  setOrderDetails: (d: typeof orderDetails) => void;
}) {
  const set = (key: keyof typeof orderDetails, val: string) => setOrderDetails({ ...orderDetails, [key]: val });

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 44, border: "1px solid #E2E4E9", borderRadius: 8,
    padding: "0 12px", fontSize: 14, color: "#121212", fontFamily: "Satoshi, sans-serif",
    outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s",
  };
  const selectStyle: React.CSSProperties = {
    ...inputStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 24, color: "#121212" }}>
        Order Details
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px 24px" }}>
        {[
          { label: "Date Received", key: "dateReceived", placeholder: "Feb, 23, 2026", type: "text" },
          { label: "Collection Date", key: "collectionDate", placeholder: "Feb, 23, 2026", type: "text" },
          { label: "Price", key: "price", placeholder: "00", type: "text" },
        ].map(({ label, key, placeholder, type }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>{label}</label>
            <input type={type} placeholder={placeholder} value={(orderDetails as Record<string, string>)[key]}
              onChange={(e) => set(key as keyof typeof orderDetails, e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")} style={inputStyle} />
          </div>
        ))}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>Payment Status</label>
          <div style={{ position: "relative" }}>
            <select value={orderDetails.paymentStatus} onChange={(e) => set("paymentStatus", e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")} style={selectStyle}>
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
            <select value={orderDetails.assignedStaff} onChange={(e) => set("assignedStaff", e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#121212")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E4E9")} style={selectStyle}>
              <option value="Ayo Adebusola">Ayo Adebusola</option>
              <option value="Joshua Adeyemi">Joshua Adeyemi</option>
              <option value="Amara Okonkwo">Amara Okonkwo</option>
            </select>
            <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDownIcon /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Team Members ── */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
  assigned: boolean;
}

const AVAILABLE_MEMBERS: Omit<TeamMember, "assigned">[] = [
  { id: 1, name: "Joshua Adeyemi", role: "Admin", email: "joshua@couture.com", avatar: "JA" },
  { id: 2, name: "Amara Okonkwo", role: "Tailor", email: "amara@couture.com", avatar: "AO" },
  { id: 3, name: "Emeka Diallo", role: "Assistant", email: "emeka@couture.com", avatar: "ED" },
];

const AVATAR_COLORS: Record<string, string> = {
  JA: "#F5A623", AO: "#7E57C2", ED: "#26A69A",
};

function TeamMemberStep({
  assigned, setAssigned, inviteForm, setInviteForm, showInvite, setShowInvite,
}: {
  assigned: number[];
  setAssigned: (ids: number[]) => void;
  inviteForm: { name: string; email: string; role: string };
  setInviteForm: (f: { name: string; email: string; role: string }) => void;
  showInvite: boolean;
  setShowInvite: (v: boolean) => void;
}) {
  const [focused, setFocused] = useState<string | null>(null);

  const toggle = (id: number) => {
    setAssigned(assigned.includes(id) ? assigned.filter((a) => a !== id) : [...assigned, id]);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%", height: 44, border: `1px solid ${focused === field ? "#121212" : "#E2E4E9"}`,
    borderRadius: 8, padding: "0 12px", fontSize: 14, color: "#121212",
    fontFamily: "Satoshi, sans-serif", outline: "none", background: "#fff",
    boxSizing: "border-box", transition: "border-color 0.15s",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <h2 style={{ margin: "0 0 6px", fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 24, color: "#121212" }}>
          Assign Team Members
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "#696969", fontFamily: "Satoshi, sans-serif" }}>
          Select who will be working on this order. You can assign multiple people.
        </p>
      </div>

      {/* Assigned chips */}
      {assigned.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {assigned.map((id) => {
            const m = AVAILABLE_MEMBERS.find((x) => x.id === id);
            if (!m) return null;
            return (
              <div key={id} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "#F0F2F5", borderRadius: 100,
                padding: "6px 10px 6px 8px",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: AVATAR_COLORS[m.avatar] ?? "#121212",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "Satoshi, sans-serif",
                }}>
                  {m.avatar}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#344054", fontFamily: "Satoshi, sans-serif" }}>{m.name}</span>
                <button type="button" onClick={() => toggle(id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                  <CloseSmallIcon />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Existing team list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #E4E7EC", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "12px 20px", background: "#F8F8F8", borderBottom: "1px solid #E4E7EC" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#344054", fontFamily: "Satoshi, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Current Team Members
          </span>
        </div>
        {AVAILABLE_MEMBERS.map((m, i) => {
          const isAssigned = assigned.includes(m.id);
          return (
            <div key={m.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: i < AVAILABLE_MEMBERS.length - 1 ? "1px solid #E4E7EC" : "none",
              background: isAssigned ? "#FAFEF7" : "#fff",
              transition: "background 0.15s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: AVATAR_COLORS[m.avatar] ?? "#121212",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "Satoshi, sans-serif",
                  flexShrink: 0,
                }}>
                  {m.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#101928", fontFamily: "Satoshi, sans-serif" }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>
                    {m.role} · {m.email}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggle(m.id)}
                style={{
                  padding: "8px 16px",
                  background: isAssigned ? "#121212" : "#fff",
                  border: `1px solid ${isAssigned ? "#121212" : "#D0D5DD"}`,
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 500,
                  color: isAssigned ? "#fff" : "#344054",
                  fontFamily: "Satoshi, sans-serif",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  transition: "all 0.15s",
                }}
              >
                {isAssigned ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Assigned
                  </>
                ) : (
                  <>
                    <AddPlusDarkIcon />
                    Assign
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Invite new team member */}
      <div style={{ border: "1.5px dashed #D0D5DD", borderRadius: 12, overflow: "hidden" }}>
        <button
          type="button"
          onClick={() => setShowInvite(!showInvite)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 20px", background: "none", border: "none", cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "#F5F5F5",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <UserCheckIcon />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>
                Invite a new team member
              </div>
              <div style={{ fontSize: 13, color: "#667185", fontFamily: "Satoshi, sans-serif" }}>
                Send an email invitation to add someone new
              </div>
            </div>
          </div>
          <div style={{ transform: showInvite ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
            <ChevronDownIcon />
          </div>
        </button>

        {showInvite && (
          <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid #E4E7EC" }}>
            <div style={{ height: 16 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>Full Name</label>
                <input type="text" placeholder="Add name" value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  style={inputStyle("name")} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>Email Address</label>
                <input type="email" placeholder="Add email" value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  style={inputStyle("email")} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#283145", fontFamily: "Satoshi, sans-serif" }}>Role</label>
                <div style={{ position: "relative" }}>
                  <select value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    onFocus={() => setFocused("role")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("role"), appearance: "none", WebkitAppearance: "none", paddingRight: 36, cursor: "pointer" }}>
                    <option value="Admin">Admin</option>
                    <option value="Tailor">Tailor</option>
                    <option value="Assistant">Assistant</option>
                  </select>
                  <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><ChevronDownIcon /></div>
                </div>
              </div>
            </div>
            <button type="button" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 20px", background: "#121212", border: "none",
              borderRadius: 100, cursor: "pointer", fontSize: 13, fontWeight: 500,
              color: "#fff", fontFamily: "Satoshi, sans-serif", alignSelf: "flex-start",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#121212")}>
              <SendIcon />
              Send Invitation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Stepper (4 total: Client done + 3 page steps) ── */
function Stepper({ step }: { step: Step }) {
  // step 1 = Measurements active, Client done
  // step 2 = Order Details active, Client+Measurements done
  // step 3 = Team Members active, Client+Measurements+Order done
  const STEP_LABELS = ["Client", "Measurements", "Order Details", "Team Members"];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1; // 1-indexed position in full flow (Client=1, Meas=2, Order=3, Team=4)
        // Client (i=0) is always done; page steps map: step 1 → active=i1, done=i0
        const pageStep = step + 1; // active page position in full 4-step flow
        const done = stepNum < pageStep;
        const active = stepNum === pageStep;

        return (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {done ? (
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", background: "#121212",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: active ? "#121212" : "#E2E4E9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600,
                  color: active ? "#fff" : "#98A2B3",
                  fontFamily: "Satoshi, sans-serif",
                }}>
                  {stepNum}
                </div>
              )}
              <span style={{
                fontSize: 13,
                fontWeight: (done || active) ? 600 : 400,
                color: (done || active) ? "#121212" : "#98A2B3",
                fontFamily: "Satoshi, sans-serif",
              }}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{
                width: 32, height: 1,
                background: done ? "#121212" : "#E2E4E9",
                margin: "0 8px",
              }} />
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
  const [orderDetails, setOrderDetails] = useState({
    dateReceived: "", collectionDate: "", price: "", paymentStatus: "Paid", assignedStaff: "Ayo Adebusola",
  });
  const [assignedMembers, setAssignedMembers] = useState<number[]>([]);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "Tailor" });
  const [showInvite, setShowInvite] = useState(false);

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
    else onBack();
  };

  const handleContinue = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
    else onComplete();
  };

  const buttonLabel = step === 3 ? "Save & Finish" : "Continue";

  return (
    <div style={{ position: "fixed", inset: 0, background: "#FDFDFD", zIndex: 150, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #F0F2F5", padding: "0 36px",
        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 18, color: "#121212" }}>Tailora</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEFCF9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BellIcon />
          </button>
          <button type="button" style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid #F1F1F2", borderRadius: 100, padding: "8px 12px", cursor: "pointer" }}>
            <img src="/Ellipse2481.png" alt="" style={{ width: 24, height: 24, borderRadius: "50%" }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path opacity="0.4" d="M15.48 13.23L11.69 8.18H6.08C5.12 8.18 4.64 9.34 5.32 10.02L10.5 15.2C11.33 16.03 12.68 16.03 13.51 15.2L15.48 13.23Z" fill="#121212" />
              <path d="M17.92 8.18H11.69L15.48 13.23L18.69 10.02C19.36 9.34 18.88 8.18 17.92 8.18Z" fill="#121212" />
            </svg>
          </button>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 36px 60px", position: "relative" }}>
          {/* Nav row */}
          <div style={{ marginBottom: 36 }}>
            <button type="button" onClick={handleBack} style={{
              display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
              cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#121212",
              fontFamily: "Satoshi, sans-serif", padding: 0, marginBottom: 24,
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
              <BackArrowIcon /> Back
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <Stepper step={step} />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#121212", fontFamily: "Satoshi, sans-serif" }}>
                Order: #A-2041
              </span>
            </div>
          </div>

          {/* Step content */}
          {step === 1 && (
            <MeasurementsStep unit={unit} setUnit={setUnit}
              measurements={measurements} setMeasurements={setMeasurements}
              customFields={customFields} setCustomFields={setCustomFields} />
          )}
          {step === 2 && (
            <OrderDetailsStep orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
          )}
          {step === 3 && (
            <TeamMemberStep
              assigned={assignedMembers} setAssigned={setAssignedMembers}
              inviteForm={inviteForm} setInviteForm={setInviteForm}
              showInvite={showInvite} setShowInvite={setShowInvite} />
          )}

          {/* Footer actions */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            gap: 16, marginTop: 48, paddingTop: 24, borderTop: "1px solid #F0F2F5",
          }}>
            <button type="button" onClick={onSaveDraft} style={{
              padding: "13px 28px", background: "transparent", border: "1px solid #121212",
              borderRadius: 100, fontSize: 14, fontWeight: 500, color: "#121212",
              fontFamily: "Satoshi, sans-serif", cursor: "pointer",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              Save Draft
            </button>
            <button type="button" onClick={handleContinue} style={{
              padding: "13px 28px", background: "#121212", border: "none",
              borderRadius: 100, fontSize: 14, fontWeight: 500, color: "#fff",
              fontFamily: "Satoshi, sans-serif", cursor: "pointer",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#121212")}>
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}