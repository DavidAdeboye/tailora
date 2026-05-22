"use client";

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  buttonLabel?: string;
  onAction?: () => void;
}

export default function SuccessModal({
  isOpen,
  title = "New Client Created",
  message = "Client details and measurements have been saved successfully",
  buttonLabel = "Back to Dashboard",
  onAction,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,13,18,0.70)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="tailora-success-modal" style={{ position: "relative", width: 402, background: "#FFFFFF", borderRadius: 16, overflow: "hidden", fontFamily: "Satoshi, Inter, sans-serif", padding: "40px 30px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "linear-gradient(180deg, #FDF6EC 30%, rgba(253,246,236,0) 100%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%" }}>
          {/* Green check */}
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(34,197,94,0.25)" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 20.5L16.5 27L30 13" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
            <h2 style={{ margin: 0, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 24, color: "#141414", lineHeight: "32px" }}>{title}</h2>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#667085", lineHeight: "20px", maxWidth: 312 }}>{message}</p>
          </div>
          <button type="button" onClick={() => onAction?.()} style={{ width: "100%", padding: "13px 24px", background: "#121212", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 500, color: "#fff", fontFamily: "Satoshi, sans-serif", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#333")}
            onMouseLeave={e => (e.currentTarget.style.background = "#121212")}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}