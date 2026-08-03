import React from "react";

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 18px", borderBottom: "1px solid #E5EAE8" }}>
        <span className="sk sk-circle" style={{ width: 34, height: 34 }} />
        <span className="sk" style={{ width: 160, height: 12 }} />
        <span className="sk" style={{ width: 110, height: 12 }} />
        <span className="sk" style={{ width: 120, height: 12 }} />
        <span className="sk" style={{ width: 70, height: 20, borderRadius: 999 }} />
        <span className="sk" style={{ width: 90, height: 28, borderRadius: 8, marginLeft: "auto" }} />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="sk-row">
          <span className="sk sk-circle" style={{ width: 34, height: 34 }} />
          <span className="sk" style={{ width: 170, height: 12 }} />
          <span className="sk" style={{ width: 110, height: 12 }} />
          <span className="sk" style={{ width: 120, height: 12 }} />
          <span className="sk" style={{ width: 70, height: 20, borderRadius: 999 }} />
          <span className="sk" style={{ width: 90, height: 28, borderRadius: 8, marginLeft: "auto" }} />
        </div>
      ))}
    </div>
  );
}
