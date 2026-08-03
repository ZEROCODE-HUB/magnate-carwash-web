import React from "react";

export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="empty">
      {Icon ? (
        <div className="empty-icon">
          <Icon size={26} strokeWidth={1.7} />
        </div>
      ) : null}
      <div className="empty-title">{title}</div>
      {text ? <div className="empty-text">{text}</div> : null}
      {action ? <div className="empty-action">{action}</div> : null}
    </div>
  );
}
