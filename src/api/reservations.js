// Capa de datos del PANEL ADMIN — mismo servidor que consume client-app.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchReservations() {
  const res = await fetch(`${API_URL}/api/reservations`);
  if (!res.ok) throw new Error("No se pudieron cargar las reservas");
  return res.json();
}

export async function advanceReservation(id, status) {
  const res = await fetch(`${API_URL}/api/reservations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("No se pudo actualizar el estado");
  return res.json();
}

export function subscribeToReservations(onUpdate) {
  const source = new EventSource(`${API_URL}/api/stream`);
  source.onmessage = (event) => {
    try {
      onUpdate(JSON.parse(event.data));
    } catch (e) {
      console.error("Error parseando evento del servidor", e);
    }
  };
  return () => source.close();
}
