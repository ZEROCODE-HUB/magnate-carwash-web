import React from "react";
import { Inbox, ShoppingBag } from "lucide-react";
import FoodOrderCard from "./FoodOrderCard.jsx";
import { ORDER_STATUS_FLOW, ORDER_STATUS_META, MENU_CATEGORY_META, ORDER_URGENT_AFTER } from "../../data.js";

export default function PedidosBoard({ orders, now, onAdvance, onOpen, busyId, categoryFilter }) {
  const cats = categoryFilter === "all" ? Object.keys(MENU_CATEGORY_META) : [categoryFilter];

  const columns = ORDER_STATUS_FLOW.map((status) => {
    const meta = ORDER_STATUS_META[status] || {};
    const Icon = meta.icon;
    const items = orders.filter((o) => o.status === status);
    return { status, meta, Icon, items };
  });

  // Agrupar órdenes por rubro dentro de cada columna
  return (
    <div className="ops-board">
      {columns.map(({ status, meta, Icon, items }) => {
        // Filtrar items del rubro seleccionado
        const catItems = items.filter((o) => cats.includes(o.categoria));
        return (
          <section
            key={status}
            className={`ops-col ${catItems.length === 0 ? "ops-col-empty" : ""}`}
            style={{ "--col-tint": meta.color, "--col-bg": meta.bg }}
          >
            <header className="ops-col-head">
              <span className="ops-col-ico" style={{ color: meta.color, background: meta.bg }}>
                <Icon size={15} strokeWidth={2.2} />
              </span>
              <span className="ops-col-title">{status}</span>
              <span className="ops-col-count">{catItems.length}</span>
            </header>

            <div className="ops-col-body">
              {catItems.length === 0 ? (
                <div className="ops-col-placeholder">Sin órdenes</div>
              ) : (
                catItems.map((o) => (
                  <FoodOrderCard
                    key={o.id}
                    order={o}
                    now={now}
                    onAdvance={onAdvance}
                    onOpen={onOpen}
                    busy={busyId === o.id}
                  />
                ))
              )}
            </div>
          </section>
        );
      })}

      {/* Orphans (estados no reconocidos) */}
      {orders.filter((o) => !ORDER_STATUS_FLOW.includes(o.status)).length > 0 && (
        <section className="ops-col ops-col-empty" style={{ "--col-tint": "#6B7B76", "--col-bg": "#EDF0EF" }}>
          <header className="ops-col-head">
            <span className="ops-col-ico" style={{ color: "#6B7B76", background: "#EDF0EF" }}>
              <Inbox size={15} strokeWidth={2.2} />
            </span>
            <span className="ops-col-title">Otros</span>
            <span className="ops-col-count">{orders.filter((o) => !ORDER_STATUS_FLOW.includes(o.status)).length}</span>
          </header>
          <div className="ops-col-body">
            {orders.filter((o) => !ORDER_STATUS_FLOW.includes(o.status)).map((o) => (
              <FoodOrderCard
                key={o.id}
                order={o}
                now={now}
                onAdvance={onAdvance}
                onOpen={onOpen}
                busy={busyId === o.id}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
