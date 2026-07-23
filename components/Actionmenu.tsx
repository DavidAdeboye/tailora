"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onTakeMeasurements?: () => void;
  onViewHistory?: () => void;
  label?: string;
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z" stroke="#344054" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.4" d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2" stroke="#344054" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.4" d="M3 22H21" stroke="#344054" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.4" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14001" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TapeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7V12M12 7V10M17 7V12" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 8V12L15 15" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="#344054" strokeWidth="1.5"/>
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="19" r="2" fill="currentColor" />
    </svg>
  );
}

export function ActionMenuButton({ onEdit, onDelete, onTakeMeasurements, onViewHistory, label = "More actions" }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const menuW = 190;
    const menuH = 160;
    let left = rect.right - menuW;
    let top = rect.bottom + 4;
    if (left < 8) left = 8;
    if (top + menuH > window.innerHeight - 8) top = rect.top - menuH - 4;
    setPos({ top, left });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const closeKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeKey);
    };
  }, [open]);

  const menuItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 12px",
    borderRadius: 8,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    color: "#344054",
    fontFamily: "Satoshi, Inter, sans-serif",
    textAlign: "left",
    width: "100%",
    transition: "background 0.12s",
  };

  const menuEl = open ? (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: 190,
        background: "#FFFFFF",
        border: "1px solid #E4E7EC",
        borderRadius: 10,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.10)",
        padding: 6,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        fontFamily: "Satoshi, Inter, sans-serif",
      }}
      role="menu"
    >
      {onTakeMeasurements && (
        <button
          type="button"
          role="menuitem"
          onClick={() => { setOpen(false); onTakeMeasurements(); }}
          style={menuItemStyle}
          onMouseEnter={e => (e.currentTarget.style.background = "#F8F9FC")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <TapeIcon />
          Take Measurements
        </button>
      )}
      {onViewHistory && (
        <button
          type="button"
          role="menuitem"
          onClick={() => { setOpen(false); onViewHistory(); }}
          style={menuItemStyle}
          onMouseEnter={e => (e.currentTarget.style.background = "#F8F9FC")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <HistoryIcon />
          Measurement History
        </button>
      )}
      {(onTakeMeasurements || onViewHistory) && (
        <div style={{ height: 1, background: "#F1F1F2", margin: "2px 0" }} />
      )}
      <button
        type="button"
        role="menuitem"
        onClick={() => { setOpen(false); onEdit(); }}
        style={menuItemStyle}
        onMouseEnter={e => (e.currentTarget.style.background = "#F8F9FC")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <EditIcon />
        Edit Client
      </button>
      <div style={{ height: 1, background: "#F1F1F2", margin: "2px 0" }} />
      <button
        type="button"
        role="menuitem"
        onClick={() => { setOpen(false); onDelete(); }}
        style={{
          ...menuItemStyle,
          color: "#E03137",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#FFF0F0")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <DeleteIcon />
        Delete Client
      </button>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={openMenu}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: open ? "#F8F9FC" : "#FFFFFF",
          border: "1px solid #E4E7EC",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#344054",
          transition: "background 0.12s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#F8F9FC")}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "#FFFFFF"; }}
      >
        <DotsIcon />
      </button>
      {typeof document !== "undefined" && menuEl
        ? createPortal(menuEl, document.body)
        : null}
    </>
  );
}

/* ── Confirm Delete Modal ── */
interface DeleteConfirmProps {
  isOpen: boolean;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, itemName, onConfirm, onCancel }: DeleteConfirmProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const modal = (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,13,18,0.70)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        style={{
          width: "100%",
          maxWidth: 402,
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "48px 32px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          boxSizing: "border-box",
          boxShadow: "0px 24px 48px rgba(0,0,0,0.18)",
          position: "relative",
          fontFamily: "Satoshi, Inter, sans-serif",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F5F7F8",
            border: "none",
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Warning icon */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#FBEAE9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path opacity="0.4" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14001" stroke="#E03137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 id="delete-title" style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 22, color: "#1A1A1A" }}>
            Delete{itemName ? ` ${itemName}` : ""}?
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#667085", lineHeight: "20px", maxWidth: 300 }}>
            This action cannot be undone. The record will be permanently removed.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, width: "100%" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "13px 0",
              background: "transparent",
              border: "1px solid #E2E4E9",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              color: "#121212",
              fontFamily: "Satoshi, Inter, sans-serif",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F5")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "13px 0",
              background: "#E03137",
              border: "none",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              color: "#fff",
              fontFamily: "Satoshi, Inter, sans-serif",
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}