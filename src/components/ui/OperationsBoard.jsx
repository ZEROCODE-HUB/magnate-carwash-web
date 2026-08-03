import React from "react";
import { Inbox } from "lucide-react";
import OrderCard from "./OrderCard.jsx";
import { STATUS_FLOW, STATUS_META } from "../../data.js";

export default function OperationsBoard({ reservations, now, onAdvance, onOpen, busyId, filterStatus }) {
  const known = STATUS_FLOW.filter((s) => filterStatus === "all" || filterStatus === s).map((status) => {
    const meta = STATUS_META[status] || {};
    const Icon = meta.icon;
    const items = reservations.filter((r) => r.status === status);
    return { status, meta, Icon, items };
  });

  // Nunca ocultar una orden: las que no coinciden con una columna conocida
  // caen en una lane de "Otros" para que siempre sean visibles.
  const orphans = reservations.filter((r) => !STATUS_FLOW.includes(r.status));
  const columns =
    orphans.length > 0
      ? [...known, { status: "Otros", meta: { color: "#6B7B76", bg: "#EDF0EF", icon: Inbox }, Icon: Inbox, items: orphans }]
      : known;

  return (
    <div className={`ops-board ${columns.length === 1 ? "ops-board-single" : ""}`}>
      {columns.map(({ status, meta, Icon, items }) => (
        <section
          key={status}
          className={`ops-col ${items.length === 0 ? "ops-col-empty" : ""}`}
          style={{ "--col-tint": meta.color, "--col-bg": meta.bg }}
        >
          <header className="ops-col-head">
            <span className="ops-col-ico" style={{ color: meta.color, background: meta.bg }}>
              <Icon size={15} strokeWidth={2.2} />
            </span>
            <span className="ops-col-title">{status}</span>
            <span className="ops-col-count">{items.length}</span>
          </header>

          <div className="ops-col-body">
            {items.length === 0 ? (
              <div className="ops-col-placeholder">Sin órdenes</div>
            ) : (
              items.map((r) => (
                <OrderCard
                  key={r.id}
                  r={r}
                  now={now}
                  onAdvance={onAdvance}
                  onOpen={onOpen}
                  busy={busyId === r.id}
                />
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
