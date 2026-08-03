import React from "react";
import { STATUS_META } from "../../data.js";

export default function StatusChip({ status }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="status-chip"
      style={{ background: meta.bg, color: meta.color }}
    >
      <span className="status-dot" style={{ background: meta.color }} />
      {status}
    </span>
  );
}
