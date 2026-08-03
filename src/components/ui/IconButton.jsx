import React from "react";

export default function IconButton({ icon: Icon, label, size = 16, bordered = false, primaryHover = false, className = "", ...props }) {
  const cls = ["icon-btn", bordered ? "bordered" : "", primaryHover ? "primary-hover" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} aria-label={label} title={label} {...props}>
      <Icon size={size} strokeWidth={2.1} />
    </button>
  );
}
