"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export default function PrimaryButton({
  children,
  className,
  style,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={`tailora-btn-primary${className ? ` ${className}` : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "12px 16px",
        background: "#121212",
        border: "none",
        borderRadius: 100,
        cursor: "pointer",
        color: "white",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "var(--font-satoshi)",
        whiteSpace: "nowrap",
        minHeight: 44,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
