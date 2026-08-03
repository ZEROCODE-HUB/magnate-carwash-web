import React from "react";

const VARIANT = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
  "soft-danger": "btn-soft-danger",
};

const SIZE = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export default function Button({ variant = "primary", size = "md", icon: Icon, disabled, className = "", children, ...props }) {
  return (
    <button
      className={["btn", VARIANT[variant], SIZE[size], className].filter(Boolean).join(" ")}
      disabled={disabled}
      {...props}
    >
      {Icon ? <Icon size={15} style={{ flexShrink: 0 }} strokeWidth={2.2} /> : null}
      {children}
    </button>
  );
}
