import React from "react";

export default function Pill({ children, bg, color, style }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px",
      borderRadius: 999, background: bg, color, fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 11, fontWeight: 600, letterSpacing: 0.2, whiteSpace: "nowrap", ...style,
    }}>
      {children}
    </span>
  );
}
