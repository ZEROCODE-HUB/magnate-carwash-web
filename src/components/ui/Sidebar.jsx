import React from "react";
import { CalendarClock, LayoutGrid, BarChart3, ShoppingBag } from "lucide-react";
import EagleMark from "../shared/EagleMark.jsx";
import { STATUS_FLOW, STATUS_META } from "../../data.js";

export default function Sidebar({ counts, total, filterStatus, onFilter, view, onView, connected, lastSync, open, onClose }) {
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
          <button
            type="button"
            className={`sidebar-item ${view === "operaciones" ? "active" : ""}`}
            onClick={() => { onFilter("all"); onView("operaciones"); onClose(); }}
            aria-pressed={view === "operaciones"}
          >
            <LayoutGrid size={15} strokeWidth={2.1} />
            Operaciones
            <span className="sidebar-item-count">{total}</span>
          </button>
          <button
            type="button"
            className={`sidebar-item ${view === "pedidos" ? "active" : ""}`}
            onClick={() => { onView("pedidos"); onClose(); }}
            aria-pressed={view === "pedidos"}
          >
            <ShoppingBag size={15} strokeWidth={2.1} />
            Pedidos
            <span className="sidebar-item-count">{0}</span>
          </button>
          <button
            type="button"
            className={`sidebar-item ${view === "metricas" ? "active" : ""}`}
            onClick={() => { onView("metricas"); onClose(); }}
            aria-pressed={view === "metricas"}
          >
            <BarChart3 size={15} strokeWidth={2.1} />
            Métricas
          </button>

          <div className="sidebar-section-label">Tip</div>
          <p className="sidebar-tip">
            Usá la barra inferior para filtrar el tablero por estado (Reservado, Lavando, Listo…).
          </p>
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
