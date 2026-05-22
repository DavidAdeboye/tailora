"use client";

import { useAppModals } from "./AppModalsContext";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="#28292D" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export default function MobileMenuButton() {
  const { toggleMobileMenu } = useAppModals();

  return (
    <button
      type="button"
      className="tailora-menu-btn"
      aria-label="Open menu"
      onClick={toggleMobileMenu}
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        background: "#FEFCF9",
        border: "1px solid #F1F1F2",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <MenuIcon />
    </button>
  );
}
