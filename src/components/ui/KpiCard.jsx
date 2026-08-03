import React from "react";

export default function KpiCard({ label, value, color, bg, icon: Icon, active = false, total = false, onClick, live = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`kpi ${active ? "active" : ""} ${total ? "kpi-total" : ""}`}
      style={{ cursor: onClick ? "pointer" : "default", textAlign: "left" }}
      aria-pressed={active}
    >
      <div className="kpi-top">
        {Icon ? (
          <span className="kpi-icon" style={total ? {} : { color, background: bg }}>
            <Icon size={16} strokeWidth={2.1} />
          </span>
        ) : null}
        {live ? <span className="live-dot on" /> : null}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </button>
  );
}
