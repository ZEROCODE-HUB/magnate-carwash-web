import React from "react";

export default function EagleMark({ size = 22, color = "#E8A93B" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 6 L28 18 L44 14 L30 24 L44 34 L28 30 L24 42 L20 30 L4 34 L18 24 L4 14 L20 18 Z" fill={color} />
    </svg>
  );
}
