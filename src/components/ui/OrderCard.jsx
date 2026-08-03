import React from "react";
import { ArrowRight, CheckCircle2, Eye, Clock, AlertTriangle, Camera, PackagePlus, Wallet, StickyNote } from "lucide-react";
import { ACTION_LABEL, URGENT_AFTER, SERVICE_META, TIER_META, PAYMENT_META, STATUS_META } from "../../data.js";

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

function TierBadge({ tier }) {
  if (!tier || !TIER_META[tier]) return null;
  const m = TIER_META[tier];
  const Icon = m.icon;
  return (
    <span className="tier-badge" style={{ color: m.color, background: m.bg }}>
      <Icon size={11} strokeWidth={2.3} />
      {tier}
    </span>
  );
}

function PaymentChip({ payment }) {
  const m = PAYMENT_META[payment];
  if (!m) return null;
  const Icon = m.icon;
  return (
    <span className="oc-chip oc-pay" style={{ color: m.color, background: m.bg }}>
      <Icon size={11} strokeWidth={2.3} />
      {m.label}
    </span>
  );
}

export default function OrderCard({ r, now, onAdvance, onOpen, busy }) {
  const meta = STATUS_META[r.status] || {};
  const svc = SERVICE_META[r.service] || { name: r.service, icon: PackagePlus, tint: "#0F766E", tintBg: "#CCFBF1" };
  const SvcIcon = svc.icon;
  const action = ACTION_LABEL[r.status];
  const isDone = r.status === "Listo";
  const waited = now - (r.createdAt || now);
  const urgent = !isDone && waited > (URGENT_AFTER[r.status] || 9999) * 60000;
  const justArrived = !isDone && waited < 1000 * 60 * 1.5;

  return (
    <article
      className={`order-card ${urgent ? "is-urgent" : ""} ${justArrived ? "is-new" : ""}`}
      style={{ "--tint": meta.color, "--tint-bg": meta.bg }}
      onClick={() => onOpen(r)}
    >
      <div className="oc-media" style={{ background: svc.tintBg }}>
        <div className="oc-media-icon" style={{ color: svc.tint }}>
          <SvcIcon size={34} strokeWidth={1.9} />
        </div>
        <span className="oc-status-rail" title={r.status}>
          <span className="oc-status-dot" />
          {r.status}
        </span>
        {urgent && (
          <span className="oc-urgent-flag">
            <AlertTriangle size={12} strokeWidth={2.4} /> Urgente
          </span>
        )}
      </div>

      <div className="oc-body">
        <div className="oc-top">
          <div className="oc-id mono">#{String(r.id).replace(/[^0-9]/g, "") || r.id}</div>
          <PaymentChip payment={r.payment} />
        </div>

        <h3 className="oc-name">{r.name}</h3>
        <div className="oc-vehicle">{r.vehicle || "—"}</div>

        <div className="oc-tags">
          <span className="oc-chip oc-svc" style={{ color: svc.tint, background: svc.tintBg }}>
            {svc.name}
          </span>
          <TierBadge tier={r.tier} />
        </div>

        {r.addOns?.length > 0 && (
          <div className="oc-addons">
            <PackagePlus size={12} strokeWidth={2.2} className="oc-addons-ico" />
            {r.addOns.map((a) => (
              <span key={a} className="oc-addon">{a}</span>
            ))}
          </div>
        )}

        {r.notes && (
          <div className="oc-note">
            <StickyNote size={12} strokeWidth={2.2} />
            <span>{r.notes}</span>
          </div>
        )}

        <div className="oc-foot">
          <span className={`oc-wait ${urgent ? "urgent" : ""}`}>
            <Clock size={13} strokeWidth={2.2} />
            {fmtWait(waited)}
          </span>
          {r.photoCount > 0 && (
            <span className="oc-photos">
              <Camera size={12} strokeWidth={2.2} /> {r.photoCount}
            </span>
          )}
        </div>
      </div>

      <div className="oc-actions" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`oc-btn ${isDone ? "oc-btn-done" : "oc-btn-go"}`}
          disabled={busy || isDone}
          onClick={() => !isDone && onAdvance(r)}
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
        <button type="button" className="oc-btn oc-btn-ghost" onClick={() => onOpen(r)}>
          <Eye size={15} strokeWidth={2.2} /> Detalle
        </button>
      </div>
    </article>
  );
}
