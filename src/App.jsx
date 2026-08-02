import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { T } from "./theme.js";
import { STATUS_FLOW, STATUS_META, SERVICES, TIER_META } from "./data.js";
import Pill from "./components/shared/Pill.jsx";
import EagleMark from "./components/shared/EagleMark.jsx";
import { card, advanceBtn } from "./components/shared/ui.js";
import { fetchReservations, advanceReservation, subscribeToReservations } from "./api/reservations.js";

export default function App() {
  const [reservations, setReservations] = useState([]);
  const [connected, setConnected] = useState(false);
  const [lastSync, setLastSync] = useState("--:--:--");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations()
      .then(setReservations)
      .catch(() => setError("No se pudo conectar con el servidor. ¿Está corriendo `npm run dev` en /server?"));

    const unsubscribe = subscribeToReservations((data) => {
      setReservations(data);
      setConnected(true);
      setLastSync(new Date().toLocaleTimeString("es-AR"));
    });
    return unsubscribe;
  }, []);

  async function handleAdvance(id, nextStatus) {
    try {
      await advanceReservation(id, nextStatus);
      // No hace falta actualizar el estado local a mano: el servidor
      // empuja la lista actualizada por SSE a todos los clientes conectados,
      // incluida esta misma pantalla.
    } catch {
      setError("No se pudo avanzar el estado. Intentá de nuevo.");
    }
  }

  const counts = STATUS_FLOW.reduce((acc, s) => {
    acc[s] = reservations.filter((r) => r.status === s).length;
    return acc;
  }, {});

  const liveBadge = (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: connected ? "#3D8F72" : T.coral }} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "white", opacity: 0.85 }}>
        {connected ? "EN VIVO" : "CONECTANDO..."}
      </span>
    </div>
  );

  return (
    <div style={{ minHeight: "100%", background: T.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "18px 22px", background: T.primaryDark, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EagleMark size={22} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17 }}>Panel Admin · Lavadero</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, opacity: 0.7 }}>Última actualización: {lastSync}</div>
          </div>
        </div>
        {liveBadge}
      </div>

      {error && (
        <div style={{ background: T.coralSoft, color: T.coral, padding: "10px 22px", fontFamily: "Inter, sans-serif", fontSize: 12.5 }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, padding: "14px 22px 6px", overflowX: "auto" }}>
        {STATUS_FLOW.map((s) => {
          const meta = STATUS_META[s];
          return (
            <div key={s} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10, padding: "8px 14px", minWidth: 92, textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, fontWeight: 700, color: meta.color }}>{counts[s]}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.inkSoft, fontWeight: 600 }}>{s}</div>
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 22px 22px" }}>
        {reservations.length === 0 && !error && (
          <div style={{ textAlign: "center", padding: 40, color: T.inkSoft, fontFamily: "Inter, sans-serif", fontSize: 13 }}>
            Sin reservas activas todavía. Reservá un lavado desde client-app para verlo aparecer acá.
          </div>
        )}
        {reservations
          .slice()
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((r) => {
            const meta = STATUS_META[r.status];
            const svc = SERVICES.find((s) => s.id === r.service);
            const next = STATUS_FLOW[STATUS_FLOW.indexOf(r.status) + 1];
            const tierMeta = TIER_META[r.tier];
            const TierIcon = tierMeta.icon;
            const Icon = meta.icon;
            return (
              <div key={r.id} style={{ ...card, marginBottom: 10, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: meta.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={19} color={meta.color} />
                </div>
                <div style={{ minWidth: 160, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13.5, color: T.ink }}>{r.name}</span>
                    <Pill bg={tierMeta.bg} color={tierMeta.color}><TierIcon size={10} /> {r.tier}</Pill>
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: T.inkSoft, marginTop: 2 }}>{r.vehicle}</div>
                </div>
                <div style={{ minWidth: 120 }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: T.ink, fontWeight: 600 }}>{svc?.name}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: T.inkSoft }}>{r.time} hs</div>
                </div>
                <Pill bg={meta.bg} color={meta.color} style={{ padding: "6px 12px" }}>{r.status.toUpperCase()}</Pill>
                {next ? (
                  <button onClick={() => handleAdvance(r.id, next)} style={advanceBtn}>
                    {next} <ArrowRight size={13} style={{ marginLeft: 5 }} />
                  </button>
                ) : (
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#1B7A3D", fontWeight: 700, padding: "8px 6px" }}>✓ Entregado</span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
