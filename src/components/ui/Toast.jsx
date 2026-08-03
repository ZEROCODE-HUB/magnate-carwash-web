import React from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ICONS = {
  success: { icon: CheckCircle2, bg: "#E3F5E8", color: "#15803D" },
  error: { icon: XCircle, bg: "#FDE8E8", color: "#DC2626" },
  info: { icon: Info, bg: "#E1EFFA", color: "#0369A1" },
};

export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" role="region" aria-live="polite">
      {toasts.map((t) => {
        const c = ICONS[t.variant] || ICONS.info;
        const Icon = c.icon;
        return (
          <div key={t.id} className="toast" role="status">
            <span className="toast-icon" style={{ background: c.bg, color: c.color }}>
              <Icon size={16} strokeWidth={2.2} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="toast-title">{t.title}</div>
              {t.msg ? <div className="toast-msg">{t.msg}</div> : null}
            </div>
            <button type="button" className="toast-close" onClick={() => onDismiss(t.id)} aria-label="Cerrar aviso">
              <X size={14} strokeWidth={2.2} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
