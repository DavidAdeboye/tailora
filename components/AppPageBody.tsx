"use client";

import type { ReactNode } from "react";

export function AppPageBody({ children, contentClassName }: { children: ReactNode; contentClassName?: string }) {
  return (
    <div className="tailora-page" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, width: "100%" }}>
      <div
        className="tailora-page-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          background: "#FDFDFD",
          position: "relative",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          className="tailora-page-gradient"
          style={{
            background: "linear-gradient(180deg, #FDF6EC 0%, rgba(253,246,236,0) 100%)",
            height: 144,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            pointerEvents: "none",
          }}
        />
        <div className={`tailora-page-content${contentClassName ? ` ${contentClassName}` : ""}`} style={{ padding: "40px 36px", position: "relative" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function PageSectionHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="tailora-page-header-row" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
      <div className="tailora-page-header-text" style={{ minWidth: 0 }}>
        <h1 className="tailora-page-title" style={{ margin: "0 0 8px", fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24, color: "#121212" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="tailora-page-subtitle" style={{ margin: 0, fontSize: 14, fontWeight: 300, color: "#696969", fontFamily: "var(--font-satoshi)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
