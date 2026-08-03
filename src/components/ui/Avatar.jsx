import React from "react";

const PALETTE = [
  { bg: "#D6F3EE", fg: "#0F766E" },
  { bg: "#E1EEFB", fg: "#1D6FB8" },
  { bg: "#EDE4F8", fg: "#7C4DB8" },
  { bg: "#FBEECF", fg: "#B45309" },
  { bg: "#E2F4E7", fg: "#15803D" },
  { bg: "#F3E7DB", fg: "#9A5B22" },
];

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] || "") : "";
  return (first + last).toUpperCase().slice(0, 2);
}

function hue(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export default function Avatar({ name, size = 34 }) {
  const c = hue(name || "");
  return (
    <span
      className="avatar avatar-ring"
      style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.37 }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
