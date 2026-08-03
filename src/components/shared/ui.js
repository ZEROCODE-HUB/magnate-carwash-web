import { T } from "../../theme.js";

export const card = {
  background: T.surface,
  border: `1px solid ${T.line}`,
  borderRadius: T.radiusLg,
  padding: 14,
  boxShadow: T.shadowSm,
};

export const advanceBtn = {
  background: T.accent,
  color: T.primaryDark,
  border: "none",
  borderRadius: 10,
  padding: "8px 12px",
  fontFamily: T.fontSans,
  fontWeight: 700,
  fontSize: 11.5,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
};
