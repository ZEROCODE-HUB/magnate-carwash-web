import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, X, LayoutGrid, RefreshCw, Inbox, AlertTriangle } from "lucide-react";
import { STATUS_FLOW, STATUS_META, SERVICES } from "./data.js";
import { T } from "./theme.js";
import Sidebar from "./components/ui/Sidebar.jsx";
import Topbar from "./components/ui/Topbar.jsx";
import KpiCard from "./components/ui/KpiCard.jsx";
import ReservationsTable from "./components/ui/ReservationsTable.jsx";
import DetailsPanel from "./components/ui/DetailsPanel.jsx";
import EmptyState from "./components/ui/EmptyState.jsx";
import TableSkeleton from "./components/ui/TableSkeleton.jsx";
import ToastStack from "./components/ui/Toast.jsx";
import Button from "./components/ui/Button.jsx";
import { fetchReservations, advanceReservation, subscribeToReservations } from "./api/reservations.js";

export default function App() {
  const [reservations, setReservations] = useState([]);
  const [connected, setConnected] = useState(false);
  const [lastSync, setLastSync] = useState("--:--:--");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortDir, setSortDir] = useState("asc");
  const [busyId, setBusyId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const load = useCallback(() => {
    setLoading(true);
    fetchReservations()
      .then((data) => {
        setReservations(data);
        setError(null);
      })
      .catch(() => setError("No se pudo conectar con el servidor. ¿Está corriendo `npm run dev` en /server?"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const unsubscribe = subscribeToReservations((data) => {
      setReservations(data);
      setConnected(true);
      setError(null);
      setLastSync(new Date().toLocaleTimeString("es-AR"));
    });
    return unsubscribe;
  }, [load]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setSelectedId(null);
        setSidebarOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pushToast = useCallback((t) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  async function handleAdvance(r) {
    if (busyId) return;
    const idx = STATUS_FLOW.indexOf(r.status);
    const next = STATUS_FLOW[idx + 1];
    if (!next) return;
    setBusyId(r.id);
    try {
      await advanceReservation(r.id, next);
      pushToast({ variant: "success", title: `Reserva avanzada`, msg: `${r.name} pasó de "${r.status}" a "${next}".` });
    } catch {
      pushToast({ variant: "error", title: "No se pudo actualizar", msg: "Hubo un error al avanzar el estado. Intentá de nuevo." });
    } finally {
      setBusyId(null);
    }
  }

  const counts = useMemo(
    () =>
      STATUS_FLOW.reduce((acc, s) => {
        acc[s] = reservations.filter((r) => r.status === s).length;
        return acc;
      }, {}),
    [reservations]
  );
  const total = reservations.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reservations
      .filter((r) => {
        if (filterStatus !== "all" && r.status !== filterStatus) return false;
        if (!q) return true;
        const svcName = SERVICES.find((s) => s.id === r.service)?.name || "";
        return [r.name, r.vehicle, r.tier, svcName].filter(Boolean).some((v) => String(v).toLowerCase().includes(q));
      })
      .sort((a, b) => (sortDir === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
  }, [reservations, query, filterStatus, sortDir]);

  const selected = useMemo(() => reservations.find((r) => r.id === selectedId) || null, [reservations, selectedId]);
  const hasFilters = filterStatus !== "all" || query.trim() !== "";

  function toggleStatusFilter(s) {
    setFilterStatus((prev) => (prev === s ? "all" : s));
  }
  function clearFilters() {
    setQuery("");
    setFilterStatus("all");
  }

  return (
    <div className="app-shell">
      <Sidebar
        counts={counts}
        total={total}
        filterStatus={filterStatus}
        onFilter={setFilterStatus}
        connected={connected}
        lastSync={lastSync}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-col">
        <Topbar onMenu={() => setSidebarOpen(true)} connected={connected} lastSync={lastSync} />

        <main className="content">
          {error && (
            <div
              className="fade-up"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: T.dangerSoft,
                border: `1px solid #F3C6C0`,
                color: "#9F1D1D",
                borderRadius: T.radiusLg,
                padding: "12px 16px",
                fontSize: 13,
              }}
            >
              <AlertTriangle size={17} strokeWidth={2.2} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{error}</span>
              <Button variant="soft-danger" size="sm" icon={RefreshCw} onClick={load}>
                Reintentar
              </Button>
            </div>
          )}

          <header className="page-header fade-up">
            <div>
              <h1 className="page-title">Reservas</h1>
              <p className="page-subtitle">
                Seguimiento del flujo de lavado en tiempo real. Hacé clic sobre una reserva para ver su detalle completo.
              </p>
            </div>
            <div className="page-actions">
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-4)" }}>
                Actualizado {lastSync}
              </span>
              <Button variant="secondary" size="md" icon={RefreshCw} onClick={load}>
                Actualizar
              </Button>
            </div>
          </header>

          <section aria-label="Resumen del flujo">
            <div className="kpi-grid">
              <KpiCard
                label="Total reservas"
                value={total}
                icon={LayoutGrid}
                total
                live={connected}
                active={filterStatus === "all"}
                onClick={() => setFilterStatus("all")}
              />
              {STATUS_FLOW.map((s) => {
                const meta = STATUS_META[s];
                const Icon = meta.icon;
                return (
                  <KpiCard
                    key={s}
                    label={s}
                    value={counts[s] || 0}
                    color={meta.color}
                    bg={meta.bg}
                    icon={Icon}
                    active={filterStatus === s}
                    onClick={() => toggleStatusFilter(s)}
                  />
                );
              })}
            </div>
          </section>

          <section className="card panel fade-up" aria-label="Listado de reservas">
            <div className="panel-head">
              <div style={{ minWidth: 0 }}>
                <div className="panel-head-title">Cola de trabajo</div>
                <div className="panel-head-sub">
                  {filtered.length} de {total} reservas
                  {filterStatus !== "all" ? ` · estado "${filterStatus}"` : ""}
                </div>
              </div>
              <div className="panel-head-spacer" />
              <div className="field search-w">
                <span className="field-icon">
                  <Search size={14} />
                </span>
                <input
                  className="input has-icon"
                  placeholder="Buscar cliente, vehículo…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Buscar reservas"
                />
                {query && (
                  <button type="button" className="input-clear" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">
                    <X size={13} strokeWidth={2.4} />
                  </button>
                )}
              </div>
              <div className="field">
                <select
                  className="input"
                  value={sortDir}
                  onChange={(e) => setSortDir(e.target.value)}
                  aria-label="Ordenar reservas"
                  style={{ paddingRight: 30 }}
                >
                  <option value="asc">Más antiguas primero</option>
                  <option value="desc">Más recientes primero</option>
                </select>
              </div>
            </div>

            {hasFilters && filtered.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 18px",
                  borderBottom: "1px solid var(--line)",
                  background: "var(--brand-softer)",
                  fontSize: 12.5,
                  color: "var(--brand-strong)",
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
                </span>
                <span style={{ opacity: 0.7 }}>para la búsqueda actual</span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-ghost btn-sm"
                  style={{ marginLeft: "auto", color: "var(--brand-strong)" }}
                >
                  <X size={13} /> Limpiar filtros
                </button>
              </div>
            )}

            {loading && reservations.length === 0 ? (
              <TableSkeleton rows={5} />
            ) : error && reservations.length === 0 ? (
              <EmptyState
                icon={AlertTriangle}
                title="Sin conexión con el servidor"
                text="No se pudieron cargar las reservas. Verificá que el servidor esté corriendo y reintentá."
                action={
                  <Button variant="primary" size="md" icon={RefreshCw} onClick={load}>
                    Reintentar conexión
                  </Button>
                }
              />
            ) : reservations.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="Sin reservas activas"
                text="Todavía no hay reservas en el sistema. Cuando un cliente reserve un lavado desde client-app, va a aparecer acá en tiempo real."
              />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={Search}
                title="Sin resultados"
                text={`No se encontraron reservas que coincidan${query ? ` con "${query}"` : ""}${filterStatus !== "all" ? ` en estado "${filterStatus}"` : ""}.`}
                action={
                  <Button variant="secondary" size="md" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                }
              />
            ) : (
              <ReservationsTable
                reservations={filtered}
                onAdvance={handleAdvance}
                onOpen={(r) => setSelectedId(r.id)}
                busyId={busyId}
              />
            )}
          </section>

          <footer style={{ textAlign: "center", fontSize: 11.5, color: "var(--ink-4)", padding: "4px 0 10px" }}>
            Magnate · Panel de operaciones — actualización en tiempo real vía servidor local
          </footer>
        </main>
      </div>

      <DetailsPanel reservation={selected} onClose={() => setSelectedId(null)} onAdvance={handleAdvance} busy={busyId === selectedId} />

      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((x) => x.id !== id))} />
    </div>
  );
}
