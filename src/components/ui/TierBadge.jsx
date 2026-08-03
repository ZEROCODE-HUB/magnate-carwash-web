import React from "react";
import { TIER_META } from "../../data.js";

export default function TierBadge({ tier }) {
  const meta = TIER_META[tier];
  if (!meta) return null;
  const Icon = meta.icon;
  return (
    <span className="tier-badge" style={{ background: meta.bg, color: meta.color }}>
      <Icon size={10} strokeWidth={2.2} />
      {tier}
    </span>
  );
}
