import React from "react";
import { Menu } from "lucide-react";
import IconButton from "./IconButton.jsx";
import Avatar from "./Avatar.jsx";
import ConnectionBadge from "./ConnectionBadge.jsx";

export default function Topbar({ onMenu, connected, lastSync }) {
  return (
    <header className="topbar">
      <IconButton icon={Menu} label="Abrir menú" className="hamburger" onClick={onMenu} bordered />
      <div className="topbar-crumb">
        <span>Panel de operaciones</span>
        <span className="sep">/</span>
        <span className="current">Reservas</span>
      </div>
      <div className="topbar-title-block">
        <div className="topbar-title">Reservas</div>
        <div className="topbar-sub">Gestión del flujo de lavado en tiempo real</div>
      </div>
      <div className="topbar-spacer" />
      <ConnectionBadge connected={connected} lastSync={lastSync} />
      <Avatar name="Admin Magnate" />
    </header>
  );
}
