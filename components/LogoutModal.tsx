"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  const modal = (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "rgba(10, 13, 18, 0.70)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Modal card — stop propagation so clicking inside doesn't close */}
        <div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 402,
            background: "#FFFFFF",
            borderRadius: 16,
            padding: "60px 32px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            boxSizing: "border-box",
            // subtle entrance shadow
            boxShadow: "0px 24px 48px rgba(0,0,0,0.18)",
          }}
        >
          {/* Close (×) button */}
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: "50%",
              padding: 0,
            }}
          >
            {/* X icon — 1.5px stroke as per Figma */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Text block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              width: "100%",
            }}
          >
            <h2
              id="logout-title"
              style={{
                margin: 0,
                fontFamily: "var(--font-sora, 'Sora', sans-serif)",
                fontWeight: 800,
                fontSize: 24,
                lineHeight: "32px",
                color: "#1A1A1A",
                textAlign: "center",
              }}
            >
              Are you sure?
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-satoshi, 'Satoshi', sans-serif)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "20px",
                color: "#667085",
                textAlign: "center",
                maxWidth: 312,
              }}
            >
              Are you sure you want to log out from this account?
            </p>
          </div>

          {/* Log Out CTA */}
          <button
            type="button"
            onClick={onConfirm}
            style={{
              width: "100%",
              padding: "14px 24px",
              background: "#FF3D00",
              boxShadow:
                "inset 0px -4px 4px rgba(255,255,255,0.12), inset 0px 4px 4px rgba(255,255,255,0.12)",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-satoshi, 'Satoshi', sans-serif)",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: "20px",
              letterSpacing: "1px",
              color: "#FFFFFF",
              transition: "opacity 0.15s ease, transform 0.1s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  // Render via portal so it sits above everything
  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}   