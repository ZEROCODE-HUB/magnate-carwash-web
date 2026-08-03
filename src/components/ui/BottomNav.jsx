import React from "react";
import { LayoutGrid } from "lucide-react";
import { STATUS_FLOW, STATUS_META } from "../../data.js";

export default function BottomNav({ counts, total, filterStatus, onFilter, onView }) {
  const items = [
    { key: "all", label: "Todas", icon: LayoutGrid, color: "var(--brand)", bg: "var(--brand-soft)", count: total },
    ...STATUS_FLOW.map((s) => {
      const meta = STATUS_META[s] || {};
      return { key: s, label: s, icon: meta.icon, color: meta.color, bg: meta.bg, count: counts[s] || 0 };
    }),
  ];

  return (
    <nav className="bottom-nav" aria-label="Filtrar por estado">
      <div className="bottom-nav-scroll">
        {items.map((it) => {
          const Icon = it.icon;
          const active = filterStatus === it.key;
          return (
            <button
              key={it.key}
              type="button"
              className={`bn-item ${active ? "active" : ""}`}
              onClick={() => {
                onFilter(it.key);
                onView("operaciones");
              }}
              aria-pressed={active}
            >
              <span className="bn-ico" style={{ color: it.color, background: it.bg }}>
                <Icon size={15} strokeWidth={2.2} />
              </span>
              <span className="bn-label">{it.label}</span>
              <span className="bn-count">{it.count}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
