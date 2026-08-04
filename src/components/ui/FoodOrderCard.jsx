import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Eye, Clock, AlertTriangle, ShoppingBag, Plus } from "lucide-react";
import { ORDER_ACTION_LABEL, ORDER_URGENT_AFTER, MENU_CATEGORY_META, ORDER_STATUS_META, MENU_ITEMS_MAP } from "../../data.js";

function fmtWait(ms) {
  if (ms < 0) ms = 0;
  const totalMin = Math.floor(ms / 60000);
  if (totalMin < 60) return `${totalMin}m`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}h ${m}m`;
}

function initials(name) {
  return (name || "?")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function OrderCard({ order, now, onAdvance, onOpen, busy }) {
  const meta = ORDER_STATUS_META[order.status] || {};
  const catMeta = MENU_CATEGORY_META[order.categoria] || {};
  const Icon = catMeta.icon || ShoppingBag;
  const action = ORDER_ACTION_LABEL[order.status];
  const isDone = order.status === "Entregado";
  const waited = now - (order.createdAt || now);
  const urgent = !isDone && waited > (ORDER_URGENT_AFTER[order.status] || 9999) * 60000;
  const justArrived = !isDone && waited < 1000 * 60 * 1.5;
  const [imgOk, setImgOk] = useState(true);
  const itemCount = order.items?.reduce((sum, i) => sum + i.qty, 0) || 0;
  const orderTotal = order.items?.reduce((sum, i) => sum + (MENU_ITEMS_MAP[i.id]?.price || i.price || 0) * i.qty, 0) || 0;
  const img = catMeta.image;
  const showImg = img && imgOk;

  return (
    <article
      className={`order-card ${urgent ? "is-urgent" : ""} ${justArrived ? "is-new" : ""}`}
      style={{ "--tint": meta.color, "--tint-bg": meta.bg }}
      onClick={() => onOpen(order)}
    >
      <div className="oc-media" style={{ background: showImg ? "transparent" : catMeta.bg }}>
        {showImg ? (
          <>
            <img className="oc-photo" src={img} alt="" loading="lazy" onError={() => setImgOk(false)} />
            <div className="oc-media-shade" />
          </>
        ) : (
          <div className="oc-media-icon" style={{ color: catMeta.color }}>
            <Icon size={34} strokeWidth={1.9} />
          </div>
        )}
        <span className="oc-status-rail" title={order.status}>
          <span className="oc-status-dot" />
          {order.status}
        </span>
        {urgent && (
          <span className="oc-urgent-flag">
            <AlertTriangle size={12} strokeWidth={2.4} /> Urgente
          </span>
        )}
      </div>

      <div className="oc-body">
        <div className="oc-top">
          <div className="oc-id mono">#{String(order.id).replace(/[^0-9]/g, "") || order.id}</div>
          <span className="oc-chip oc-svc" style={{ color: catMeta.color, background: catMeta.bg }}>
            {catMeta.name}
          </span>
        </div>

        <h3 className="oc-name">{order.name}</h3>
        <div className="oc-vehicle">{itemCount} {itemCount === 1 ? "producto" : "productos"}</div>

        <div className="oc-tags">
          {order.items?.slice(0, 2).map((it, i) => {
            const def = MENU_ITEMS_MAP[it.id] || {};
            return (
              <span key={i} className="oc-addon">
                {def.name || it.id} x{it.qty}
              </span>
            );
          })}
          {order.items?.length > 2 && (
            <span className="oc-addon">+{order.items.length - 2} más</span>
          )}
        </div>

        <div className="oc-foot">
          <span className={`oc-wait ${urgent ? "urgent" : ""}`}>
            <Clock size={13} strokeWidth={2.2} />
            {fmtWait(waited)}
          </span>
          <span className="oc-photos" style={{ color: "var(--ink)", fontWeight: 700 }}>
            Total: ${orderTotal.toLocaleString("es-AR")}
          </span>
        </div>
      </div>

      <div className="oc-actions" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`oc-btn ${isDone ? "oc-btn-done" : "oc-btn-go"}`}
          disabled={busy || isDone}
          onClick={() => !isDone && onAdvance(order)}
        >
          {busy ? (
            "Procesando…"
          ) : isDone ? (
            <>
              <CheckCircle2 size={16} strokeWidth={2.4} /> Completado
            </>
          ) : (
            <>
              {action}
              <ArrowRight size={15} strokeWidth={2.4} />
            </>
          )}
        </button>
        <button type="button" className="oc-btn oc-btn-ghost" onClick={() => onOpen(order)}>
          <Eye size={15} strokeWidth={2.2} /> Detalle
        </button>
      </div>
    </article>
  );
}
