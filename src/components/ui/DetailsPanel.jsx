import React from "react";
import { Check, ArrowRight, X, Timer, CalendarClock, Hash, Car } from "lucide-react";
import { STATUS_FLOW, STATUS_META, SERVICES, TIER_META } from "../../data.js";
import IconButton from "./IconButton.jsx";
import StatusChip from "./StatusChip.jsx";
import TierBadge from "./TierBadge.jsx";
import Avatar from "./Avatar.jsx";

export default function DetailsPanel({ reservation, onClose, onAdvance, busy }) {
  if (!reservation) return null;

  const svc = SERVICES.find((s) => s.id === reservation.service);
  const tierMeta = TIER_META[reservation.tier];
  const currentIdx = STATUS_FLOW.indexOf(reservation.status);
  const next = STATUS_FLOW[currentIdx + 1];
  const createdAt = reservation.createdAt
    ? new Date(reservation.createdAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "—";

  return (
    <div className="panel-overlay show" role="dialog" aria-modal="true" aria-label={`Detalle de reserva de ${reservation.name}`}>
      <div className="panel-overlay-bg" onClick={onClose} />
      <div className="slideover">
        <div className="slideover-head">
          <Avatar name={reservation.name} size={40} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {reservation.name}
            </div>
            <div style={{ marginTop: 3 }}>
              <StatusChip status={reservation.status} />
            </div>
          </div>
          <IconButton icon={X} label="Cerrar detalle" onClick={onClose} />
        </div>

        <div className="slideover-body">
          <div className="detail-section">
            <div className="detail-label">Información del vehículo</div>
            <div className="detail-row">
              <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
                <Car size={14} /> Vehículo
              </span>
              <span className="detail-value">{reservation.vehicle || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="muted" style={{ fontSize: 12.5 }}>Nivel de cliente</span>
              {tierMeta ? <TierBadge tier={reservation.tier} /> : <span className="detail-value">—</span>}
            </div>
          </div>

          <div className="detail-section" style={{ marginTop: 12 }}>
            <div className="detail-label">Servicio y horario</div>
            <div className="detail-row">
              <span className="muted" style={{ fontSize: 12.5 }}>Servicio</span>
              <span className="detail-value">{svc?.name || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
                <CalendarClock size={14} /> Turno
              </span>
              <span className="detail-value">{reservation.time ? `${reservation.time} hs` : "—"}</span>
            </div>
            <div className="detail-row">
              <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
                <Timer size={14} /> Ingresó
              </span>
              <span className="detail-value mono" style={{ fontSize: 12.5 }}>{createdAt}</span>
            </div>
            <div className="detail-row">
              <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
                <Hash size={14} /> Nº de reserva
              </span>
              <span className="detail-value mono" style={{ fontSize: 12.5 }}>{String(reservation.id).slice(0, 8)}</span>
            </div>
          </div>

          <div className="detail-section" style={{ marginTop: 12 }}>
            <div className="detail-label">Progreso del flujo</div>
            <div className="timeline" style={{ marginTop: 12 }}>
              {STATUS_FLOW.map((s, i) => {
                const meta = STATUS_META[s];
                const done = i < currentIdx;
                const current = i === currentIdx;
                return (
                  <div key={s} className={`tl-step ${done ? "done" : ""} ${current ? "current" : ""}`}>
                    <div className="tl-rail">
                      <span className="tl-dot">
                        {done ? <Check size={9} strokeWidth={3.5} /> : null}
                      </span>
                      {i < STATUS_FLOW.length - 1 ? <span className="tl-line" /> : null}
                    </div>
                    <div className="tl-content">
                      <div className="tl-label">
                        {current ? `${s} · ahora` : s}
                      </div>
                      {current ? <div className="tl-sub">En proceso en este momento</div> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {next ? (
          <div className="slideover-foot">
            <button type="button" className="btn btn-primary btn-lg" disabled={busy} onClick={() => onAdvance(reservation)}>
              {busy ? "Enviando…" : `Marcar como ${next}`}
              <ArrowRight size={16} strokeWidth={2.3} />
            </button>
          </div>
        ) : (
          <div className="slideover-foot">
            <span className="done-tag" style={{ fontSize: 13, margin: "auto" }}>
              Reserva completada y entregada al cliente
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
