import React from "react";
import { CalendarClock, LayoutGrid } from "lucide-react";
import EagleMark from "../shared/EagleMark.jsx";
import { STATUS_FLOW, STATUS_META } from "../../data.js";

export default function Sidebar({ counts, total, filterStatus, onFilter, connected, lastSync, open, onClose }) {
  return (
    <>
      {open && <div className="backdrop show" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Panel de operaciones">
        <div className="sidebar-brand">
          <span className="sidebar-brand-badge">
            <EagleMark size={20} />
          </span>
          <div>
            <div className="sidebar-brand-name">Magnate</div>
            <div className="sidebar-brand-sub">Panel de Operaciones</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Menú</div>
          <button type="button" className="sidebar-item active">
            <LayoutGrid size={15} strokeWidth={2.1} />
            Reservas
            <span className="sidebar-item-count">{total}</span>
          </button>

          <div className="sidebar-section-label">Flujo en vivo</div>
          <button
            type="button"
            className={`sidebar-item ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => {
              onFilter("all");
              onClose();
            }}
            aria-pressed={filterStatus === "all"}
          >
            <span className="live-dot on" style={{ boxShadow: "none" }} />
            Todas las reservas
            <span className="sidebar-item-count">{total}</span>
          </button>
          {STATUS_FLOW.map((s) => {
            const meta = STATUS_META[s];
            const Icon = meta.icon;
            return (
              <button
                key={s}
                type="button"
                className={`sidebar-item ${filterStatus === s ? "active" : ""}`}
                onClick={() => {
                  onFilter(s);
                  onClose();
                }}
                aria-pressed={filterStatus === s}
              >
                <Icon size={15} strokeWidth={2.1} style={{ color: meta.color }} />
                {s}
                <span className="sidebar-item-count">{counts[s] || 0}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="conn-card">
            <div className="conn-card-row">
              <span className={`live-dot ${connected ? "on" : "connecting"}`} />
              <span className="conn-card-label">{connected ? "Servidor en línea" : "Conectando al servidor"}</span>
            </div>
            <div className="conn-card-meta">
              {connected ? `Última actualización ${lastSync}` : "Esperando transmisión en vivo…"}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
