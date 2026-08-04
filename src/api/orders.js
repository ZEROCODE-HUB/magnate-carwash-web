// Capa de datos de pedidos de comida del PANEL ADMIN
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function normalizeOrders(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.orders)) return payload.orders;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

export async function fetchMenu() {
  const res = await fetch(`${API_URL}/api/menu`);
  if (!res.ok) throw new Error("No se pudo cargar el menú");
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_URL}/api/orders`);
  if (!res.ok) throw new Error("No se pudieron cargar los pedidos");
  return normalizeOrders(await res.json());
}

export async function advanceOrder(id, status) {
  const res = await fetch(`${API_URL}/api/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("No se pudo actualizar el estado");
  return res.json();
}

export function subscribeToOrders(onUpdate) {
  const source = new EventSource(`${API_URL}/api/orders/stream`);
  source.onmessage = (event) => {
    try {
      onUpdate(normalizeOrders(JSON.parse(event.data)));
    } catch (e) {
      console.error("Error parseando evento del servidor", e);
    }
  };
  return () => source.close();
}
