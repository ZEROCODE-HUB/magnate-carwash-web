import React from "react";

export default function ConnectionBadge({ connected, lastSync }) {
  const on = connected;
  return (
    <div className={`conn-badge ${on ? "on" : "connecting"}`}>
      <span className={`live-dot ${on ? "on" : "connecting"}`} />
      {on ? "EN VIVO" : "CONECTANDO"}
      <span className="conn-time">· {lastSync}</span>
    </div>
  );
}
