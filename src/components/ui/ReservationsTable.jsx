import React from "react";
import { ArrowRight, CheckCircle2, Eye } from "lucide-react";
import { SERVICES, STATUS_FLOW } from "../../data.js";
import Avatar from "./Avatar.jsx";
import StatusChip from "./StatusChip.jsx";
import TierBadge from "./TierBadge.jsx";
import IconButton from "./IconButton.jsx";

function fmtTime(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

export default function ReservationsTable({ reservations, onAdvance, onOpen, busyId }) {
  if (reservations.length === 0) return null;

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Vehículo</th>
            <th>Servicio</th>
            <th>Recibido</th>
            <th>Estado</th>
            <th style={{ textAlign: "right" }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => {
            const svc = SERVICES.find((s) => s.id === r.service);
            const next = STATUS_FLOW[STATUS_FLOW.indexOf(r.status) + 1];
            const loading = busyId === r.id;
            return (
              <tr key={r.id} onClick={() => onOpen(r)} style={{ cursor: "pointer" }}>
                <td>
                  <div className="client-cell">
                    <Avatar name={r.name} />
                    <div style={{ minWidth: 0 }}>
                      <div className="cell-main" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 190 }}>
                        {r.name}
                      </div>
                      {r.tier ? (
                        <div style={{ marginTop: 2 }}>
                          <TierBadge tier={r.tier} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </td>
                <td className="cell-main">{r.vehicle || "—"}</td>
                <td>
                  <span className="cell-main">{svc?.name || "—"}</span>
                  {r.time ? <span className="cell-sub">{r.time} hs</span> : null}
                </td>
                <td className="cell-mono">{fmtTime(r.createdAt)}</td>
                <td>
                  <StatusChip status={r.status} />
                </td>
                <td>
                  <div className="row-actions">
                    <IconButton
                      icon={Eye}
                      label="Ver detalle"
                      bordered
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen(r);
                      }}
                    />
                    {r.status === "Listo" ? (
                      <span className="done-tag">
                        <CheckCircle2 size={15} strokeWidth={2.4} />
                        Entregado
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        disabled={loading}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdvance(r);
                        }}
                        style={{ minWidth: 96, justifyContent: "space-between" }}
                      >
                        {loading ? "Enviando…" : (
                          <>
                            {next}
                            <ArrowRight size={13} strokeWidth={2.4} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
