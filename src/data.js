import { Droplets, Wind, Sparkles, CircleDot, TimerReset, CheckCircle2, Crown, Award, Medal, Car, Camera, PackagePlus, Wallet, AlertTriangle } from "lucide-react";
import { T } from "./theme.js";

export const STATUS_FLOW = ["Reservado", "Recibido", "Lavando", "Aspirado", "Detailing", "Secado", "Listo"];

// Etiqueta del botón de acción principal según el estado actual.
// Es la respuesta inmediata a "¿qué hago ahora?" para cada tarjeta.
export const ACTION_LABEL = {
  "Reservado": "Recibir cliente",
  "Recibido": "Iniciar lavado",
  "Lavando": "Pasar a aspirado",
  "Aspirado": "Detailing",
  "Detailing": "Secar",
  "Secado": "Marcar listo",
  "Listo": null,
};

// Minutos de espera que disparan la bandera de urgencia por columna.
// Sirve para que el operario vea de inmediato lo que lleva demasiado tiempo.
export const URGENT_AFTER = {
  "Reservado": 12,
  "Recibido": 18,
  "Lavando": 25,
  "Aspirado": 22,
  "Detailing": 22,
  "Secado": 18,
  "Listo": 9999,
};

export function nextStatus(status) {
  const idx = STATUS_FLOW.indexOf(status);
  return STATUS_FLOW[idx + 1] || null;
}

export const STATUS_META = {
  "Reservado": { color: "#6B7B76", bg: "#EDF0EF", icon: TimerReset },
  "Recibido": { color: T.primary, bg: "#D6F3EE", icon: CircleDot },
  "Lavando": { color: "#1D6FB8", bg: "#E1EEFB", icon: Droplets },
  "Aspirado": { color: "#7C4DB8", bg: "#EDE4F8", icon: Sparkles },
  "Detailing": { color: "#B45309", bg: "#FBEECF", icon: Sparkles },
  "Secado": { color: "#0E7C86", bg: "#DCF0F1", icon: Wind },
  "Listo": { color: T.success, bg: "#E2F4E7", icon: CheckCircle2 },
};

export const SERVICES = [
  { id: "basico", name: "Lavado Básico" },
  { id: "premium", name: "Lavado Premium" },
  { id: "encerado", name: "Encerado" },
];

export const TIER_META = {
  "Bronce": { color: "#9A5B22", bg: "#F3E7DB", icon: Medal },
  "Plata": { color: "#5B6B72", bg: "#E9EEEF", icon: Award },
  "Oro": { color: "#B45309", bg: "#FBEBCB", icon: Crown },
};

// Íconos de presentación por servicio (visual grande en la tarjeta).
export const SERVICE_META = {
  "basico": { name: "Lavado Básico", icon: Droplets, tint: "#1D6FB8", tintBg: "#E1EEFB", image: "https://picsum.photos/seed/magnate-basico/800/500" },
  "premium": { name: "Lavado Premium", icon: Sparkles, tint: "#0E7C86", tintBg: "#DCF0F1", image: "https://picsum.photos/seed/magnate-premium/800/500" },
  "encerado": { name: "Encerado", icon: Crown, tint: "#B45309", tintBg: "#FBEECF", image: "https://picsum.photos/seed/magnate-encerado/800/500" },
};

export const PAYMENT_META = {
  "pagado": { label: "Pagado", color: "#15803D", bg: "#E3F5E8", icon: Wallet },
  "pendiente": { label: "Pendiente", color: "#B45309", bg: "#FDF1DE", icon: Wallet },
};

// Conjunto de datos de demostración. Se usa como respaldo cuando el
// servidor no está disponible para que el tablero sea visible de inmediato.
const now = Date.now();
export const DEMO_RESERVATIONS = [
  {
    id: "R-1042",
    name: "Lucía Fernández",
    vehicle: "Toyota Corolla · ABC 123",
    tier: "Oro",
    service: "premium",
    status: "Reservado",
    createdAt: now - 1000 * 60 * 4,
    notes: "Cliente frecuente. Dejar secado sin marcas.",
    addOns: ["Encerado", "Limpieza tapiz"],
    payment: "pendiente",
    demo: true,
  },
  {
    id: "R-1043",
    name: "Martín Gómez",
    vehicle: "Ford Focus · DEF 456",
    tier: "Plata",
    service: "basico",
    status: "Recibido",
    createdAt: now - 1000 * 60 * 16,
    notes: "",
    addOns: [],
    payment: "pagado",
    demo: true,
  },
  {
    id: "R-1044",
    name: "Carla Ruiz",
    vehicle: "Volkswagen Golf · GHI 789",
    tier: "Oro",
    service: "premium",
    status: "Lavando",
    createdAt: now - 1000 * 60 * 31,
    notes: "Interior con pelo de mascota.",
    addOns: ["Aspirado profundo"],
    payment: "pagado",
    demo: true,
  },
  {
    id: "R-1045",
    name: "Diego Torres",
    vehicle: "Honda Civic · JKL 012",
    tier: "Bronce",
    service: "encerado",
    status: "Aspirado",
    createdAt: now - 1000 * 60 * 26,
    notes: "",
    addOns: [],
    payment: "pendiente",
    demo: true,
  },
  {
    id: "R-1046",
    name: "Sofía Paz",
    vehicle: "Peugeot 208 · MNO 345",
    tier: "Plata",
    service: "premium",
    status: "Detailing",
    createdAt: now - 1000 * 60 * 40,
    notes: "Revisar rayón en puerta trasera.",
    addOns: ["Pulido"],
    payment: "pagado",
    demo: true,
  },
  {
    id: "R-1047",
    name: "Tomás Vidal",
    vehicle: "Renault Sandero · PQR 678",
    tier: "Bronce",
    service: "basico",
    status: "Secado",
    createdAt: now - 1000 * 60 * 22,
    notes: "",
    addOns: [],
    payment: "pagado",
    demo: true,
  },
  {
    id: "R-1048",
    name: "Valeria Soto",
    vehicle: "Fiat Cronos · STU 901",
    tier: "Oro",
    service: "premium",
    status: "Listo",
    createdAt: now - 1000 * 60 * 52,
    notes: "Listo para entregar en mostrador.",
    addOns: ["Encerado"],
    payment: "pagado",
    demo: true,
  },
  {
    id: "R-1049",
    name: "Nicolás Ramos",
    vehicle: "Chevrolet Onix · VWX 234",
    tier: "Plata",
    service: "basico",
    status: "Reservado",
    createdAt: now - 1000 * 60 * 1,
    notes: "",
    addOns: ["Limpieza tapiz"],
    payment: "pendiente",
    demo: true,
  },
];
