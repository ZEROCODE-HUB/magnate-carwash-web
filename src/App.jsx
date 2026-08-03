import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Search, X, LayoutGrid, RefreshCw, Inbox, AlertTriangle, Sparkles } from "lucide-react";
import { STATUS_FLOW, STATUS_META, SERVICES } from "./data.js";
import { T } from "./theme.js";
import Sidebar from "./components/ui/Sidebar.jsx";
import Topbar from "./components/ui/Topbar.jsx";
import KpiCard from "./components/ui/KpiCard.jsx";
import DetailsPanel from "./components/ui/DetailsPanel.jsx";
import EmptyState from "./components/ui/EmptyState.jsx";
import TableSkeleton from "./components/ui/TableSkeleton.jsx";
import ToastStack from "./components/ui/Toast.jsx";
import Button from "./components/ui/Button.jsx";
import OperationsBoard from "./components/ui/OperationsBoard.jsx";
import BottomNav from "./components/ui/BottomNav.jsx";
import { fetchReservations, advanceReservation, subscribeToReservations } from "./api/reservations.js";
import { DEMO_RESERVATIONS } from "./data.js";

export default function App() {
  const [reservations, setReservations] = useState([]);
  const [connected, setConnected] = useState(false);
  const [lastSync, setLastSync] = useState("--:--:--");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const [demoMode, setDemoMode] = useState(false);

  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortDir, setSortDir] = useState("asc");
  const [busyId, setBusyId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("operaciones");
  const [toasts, setToasts] = useState([]);
  const liveHasData = useRef(false);
  const apiHost = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/^https?:\/\//, "");

  const load = useCallback(() => {
    setLoading(true);
    fetchReservations()
      .then((data) => {
        setError(null);
        if (data.length === 0 && !liveHasData.current) {
          setReservations(DEMO_RESERVATIONS);
          setDemoMode(true);
        } else {
          setReservations(data);
          setDemoMode(false);
        }
      })
      .catch(() => {
        setReservations(DEMO_RESERVATIONS);
        setDemoMode(true);
        setError(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const unsubscribe = subscribeToReservations((data) => {
      if (data.length > 0) liveHasData.current = true;
      setReservations(data);
      setConnected(true);
      setError(null);
      setDemoMode((prev) => (data.length === 0 ? prev : false));
      setLastSync(new Date().toLocaleTimeString("es-AR"));
    });
    return unsubscribe;
  }, [load]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

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

  function showDemo() {
    setReservations(DEMO_RESERVATIONS);
    setDemoMode(true);
  }

  return (
    <div className="app-shell">
      <Sidebar
        counts={counts}
        total={total}
        filterStatus={filterStatus}
        onFilter={setFilterStatus}
        view={view}
        onView={setView}
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
              <h1 className="page-title">{view === "operaciones" ? "Centro de operaciones" : "Métricas"}</h1>
              <p className="page-subtitle">
                {view === "operaciones"
                  ? "Tablero en vivo de lavado. Cada tarjeta es una orden activa: lo que acaba de llegar, lo que está en proceso y lo que falta entregar."
                  : "Indicadores del día. El trabajo en vivo vive en la pestaña Operaciones."}
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

          {view === "metricas" && (
            <section aria-label="Resumen del flujo">
              <div className="kpi-grid">
                <KpiCard
                  label="Total reservas"
                  value={total}
                  icon={LayoutGrid}
                  total
                  live={connected}
                  active={filterStatus === "all"}
                  onClick={() => { setFilterStatus("all"); setView("operaciones"); }}
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
                      onClick={() => { toggleStatusFilter(s); setView("operaciones"); }}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {view === "operaciones" && (
          <section aria-label="Tablero de operaciones en vivo">
            <div className="board-toolbar fade-up">
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div className="panel-head-title">Tablero en vivo</div>
                <span className="board-toolbar-sub">
                  {filtered.length} orden{filtered.length === 1 ? "" : "es"} activas
                  {filterStatus !== "all" ? ` · ${filterStatus}` : ""}
                </span>
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
                  aria-label="Buscar órdenes"
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
                  aria-label="Ordenar órdenes"
                  style={{ paddingRight: 30 }}
                >
                  <option value="asc">Más antiguas primero</option>
                  <option value="desc">Más recientes primero</option>
                </select>
              </div>
            </div>

            {demoMode && (
              <div className="board-demo-hint fade-up">
                <Sparkles size={15} strokeWidth={2.2} />
                <span>
                  Mostrando <strong>datos de demostración</strong>. Conectá el servidor para ver las órdenes en vivo.
                </span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={load} style={{ marginLeft: "auto" }}>
                  <RefreshCw size={13} /> Reintentar
                </button>
              </div>
            )}

            {loading && reservations.length === 0 ? (
              <TableSkeleton rows={5} />
            ) : reservations.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="Sin órdenes activas"
                text={`No hay datos del backend (${apiHost}). Si el servidor está en línea, probá cargar la demo para descartar un problema de render.`}
                action={
                  <>
                    <Button variant="secondary" size="md" onClick={load}>
                      Reintentar
                    </Button>
                    <Button variant="primary" size="md" onClick={showDemo}>
                      Cargar demo
                    </Button>
                  </>
                }
              />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={Search}
                title="Sin resultados"
                text={`No se encontraron órdenes que coincidan${query ? ` con "${query}"` : ""}${filterStatus !== "all" ? ` en estado "${filterStatus}"` : ""}.`}
                action={
                  <Button variant="secondary" size="md" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                }
              />
            ) : (
              <OperationsBoard
                reservations={filtered}
                now={now}
                onAdvance={handleAdvance}
                onOpen={(r) => setSelectedId(r.id)}
                busyId={busyId}
                filterStatus={filterStatus}
              />
            )}
          </section>
          )}

          <footer style={{ textAlign: "center", fontSize: 11.5, color: "var(--ink-4)", padding: "4px 0 10px" }}>
            Magnate · Panel de operaciones — actualización en tiempo real vía servidor local
          </footer>
        <BottomNav
          counts={counts}
          total={total}
          filterStatus={filterStatus}
          onFilter={setFilterStatus}
          onView={setView}
        />
        </main>
      </div>

      <DetailsPanel reservation={selected} onClose={() => setSelectedId(null)} onAdvance={handleAdvance} busy={busyId === selectedId} />

      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((x) => x.id !== id))} />
    </div>
  );
}
