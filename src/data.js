import { Droplets, Wind, Sparkles, CircleDot, TimerReset, CheckCircle2, Crown, Award, Medal, Car, Camera, PackagePlus, Wallet, AlertTriangle, ShoppingBag, Coffee, UtensilsCrossed, Clock } from "lucide-react";
import { T } from "./theme.js";

import carwashImg1 from "./imágenes/carwash/WhatsApp Image 2026-08-04 at 12.56.35 PM.jpeg";
import carwashImg2 from "./imágenes/carwash/WhatsApp Image 2026-08-04 at 12.56.56 PM.jpeg";
import restauranteImg1 from "./imágenes/restaurante/WhatsApp Image 2026-08-04 at 12.57.27 PM.jpeg";
import cafeImg1 from "./imágenes/cafe/WhatsApp Image 2026-08-04 at 12.57.56 PM.jpeg";
import cafeImg2 from "./imágenes/cafe/WhatsApp Image 2026-08-04 at 12.58.14 PM.jpeg";

export const STATUS_FLOW = ["Reservado", "Recibido", "Lavando", "Aspirado", "Detailing", "Secado", "Listo"];

// Flujo de estados para pedidos de COMIDA
export const ORDER_STATUS_FLOW = ["Recibido", "En preparación", "Listo para retirar", "Entregado"];

export const ORDER_ACTION_LABEL = {
  "Recibido": "Confirmar pedido",
  "En preparación": "Marcar preparado",
  "Listo para retirar": "Marcar entregado",
  "Entregado": null,
};

export const ORDER_URGENT_AFTER = {
  "Recibido": 10,
  "En preparación": 20,
  "Listo para retirar": 15,
  "Entregado": 9999,
};

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
  "basico": { name: "Lavado Básico", icon: Droplets, tint: "#1D6FB8", tintBg: "#E1EEFB", image: carwashImg1 },
  "premium": { name: "Lavado Premium", icon: Sparkles, tint: "#0E7C86", tintBg: "#DCF0F1", image: carwashImg2 },
  "encerado": { name: "Encerado", icon: Crown, tint: "#B45309", tintBg: "#FBEECF", image: carwashImg2 },
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

// ─────────────────────────────────────────────────────────────
// Metadatos para pedidos de comida
// ─────────────────────────────────────────────────────────────
export const ORDER_STATUS_META = {
  "Recibido": { color: "#6B7B76", bg: "#EDF0EF", icon: TimerReset },
  "En preparación": { color: T.primary, bg: "#CCFBF1", icon: Sparkles },
  "Listo para retirar": { color: T.accent, bg: "#FEF3C7", icon: ShoppingBag },
  "Entregado": { color: T.success, bg: "#D1FAE5", icon: CheckCircle2 },
};

export const MENU_CATEGORY_META = {
  restaurant: { name: "Restaurante", icon: UtensilsCrossed, color: T.primary, bg: "#CCFBF1", image: restauranteImg1 },
  cafeteria: { name: "Cafetería", icon: Coffee, color: T.info, bg: "#E1EFFA", image: cafeImg1 },
  kiosco: { name: "Kiosco", icon: ShoppingBag, color: "#B45309", bg: "#FEE5C7", image: cafeImg2 },
};

export function nextOrderStatus(status) {
  const idx = ORDER_STATUS_FLOW.indexOf(status);
  return ORDER_STATUS_FLOW[idx + 1] || null;
}

function ORDER_MENU_ITEMS() {
  return [
    { id: "m-rest-01", name: "Milanesa de carne", description: "Milanesa de carne con papas fritas", price: 12500, category: "restaurant" },
    { id: "m-rest-02", name: "Burger especial", description: "Hamburguesa doble queso con bacon", price: 14500, category: "restaurant" },
    { id: "m-rest-03", name: "Pizza margarita", description: "Masa fina, mozzarella fundida y albahaca fresca", price: 11500, category: "restaurant" },
    { id: "m-rest-04", name: "Pasta al pesto", description: "Pasta fresca con salsa de pesto y piñones", price: 13000, category: "restaurant" },
    { id: "m-rest-05", name: "Ensalada César", description: "Lechuga romana, parmesano, croutones y aderezo César", price: 10000, category: "restaurant" },
    { id: "m-rest-06", name: "File de merluza", description: "File de merluza al horno con purrón y ensalada mixta", price: 13500, category: "restaurant" },
    { id: "m-rest-07", name: "Ravioles de queso", description: "Ravioles rellenos de queso con salsa de tomate", price: 10500, category: "restaurant" },
    { id: "m-rest-08", name: "Parrillada mixta", description: "Asado mixto: vacío, chorizo y morcilla", price: 18000, category: "restaurant" },
    { id: "m-rest-09", name: "Tacos al pastor", description: "Tres tacos con piña, cebolla y cilantro", price: 9500, category: "restaurant" },
    { id: "m-rest-10", name: "Helado casero", description: "Helado de vainilla con salsa de chocolate", price: 6000, category: "restaurant" },

    { id: "m-cafe-01", name: "Café espresso", description: "Café recién molido, 25ml de crema", price: 3500, category: "cafeteria" },
    { id: "m-cafe-02", name: "Café con leche", description: "Café con leche vapor, 200ml", price: 4200, category: "cafeteria" },
    { id: "m-cafe-03", name: "Capuchino", description: "Espresso con espuma de leche y cacao", price: 4800, category: "cafeteria" },
    { id: "m-cafe-04", name: "Latte vainilla", description: "Café con leche, jarabe de vainilla y canilla", price: 5400, category: "cafeteria" },
    { id: "m-cafe-05", name: "Chicano", description: "Café con leche, huevo y tostada", price: 5800, category: "cafeteria" },
    { id: "m-cafe-06", name: "Té de hierbas", description: "Selección de té verde, manzanilla o boldo", price: 3200, category: "cafeteria" },
    { id: "m-cafe-07", name: "Medialuna", description: "Medialuna de mantequilla y azúcar", price: 2800, category: "cafeteria" },
    { id: "m-cafe-08", name: "Sándwich de miga", description: "Sándwich de miga de pollo o queso", price: 5500, category: "cafeteria" },
    { id: "m-cafe-09", name: "Tosty completín", description: "Pan integral, huevo frito, tomate y queso", price: 6200, category: "cafeteria" },
    { id: "m-cafe-10", name: "Budín de pan", description: "Budín casero con nueces y pasas", price: 3800, category: "cafeteria" },
    { id: "m-cafe-11", name: "Jugo natural", description: "Zumo de naranja, zanahoria o pomelo", price: 4000, category: "cafeteria" },
    { id: "m-cafe-12", name: "Infusión fría", description: "Agua con infusión de frutas y hierbas", price: 3500, category: "cafeteria" },

    { id: "m-kios-01", name: "Alfajor de maicena", description: "Alfajor de maicena con dulce de leche", price: 2200, category: "kiosco" },
    { id: "m-kios-02", name: "Churros x2", description: "Churros calientes con azúcar y chocolate", price: 3500, category: "kiosco" },
    { id: "m-kios-03", name: "Galletas sabor a chocolate", description: "Paquete de 4 galletas", price: 2800, category: "kiosco" },
    { id: "m-kios-04", name: "Barrita de cereal", description: "Barrita energética de avena y frutos secos", price: 2400, category: "kiosco" },
    { id: "m-kios-05", name: "Sandwich de galleta", description: "Galleta con crema de leche", price: 1800, category: "kiosco" },
    { id: "m-kios-06", name: "Yogur natural", description: "Yogur natural servido con granola", price: 3200, category: "kiosco" },
    { id: "m-kios-07", name: "Bebida gaseosa 500ml", description: "Coca-Cola, Sprite o Fanta", price: 2500, category: "kiosco" },
    { id: "m-kios-08", name: "Agua mineral 500ml", description: "Agua mineral sin gas", price: 1800, category: "kiosco" },
  ];
}

export const MENU_ITEMS_MAP = {};
ORDER_MENU_ITEMS().forEach((m) => {
  MENU_ITEMS_MAP[m.id] = m;
});

// Datos de demo para pedidos de comida (resguardo offline)
const now2 = Date.now();
export const DEMO_ORDERS = [
  {
    id: "O-1001",
    name: "Ana Gómez",
    categoria: "restaurant",
    items: [{ id: "m-rest-01", qty: 1, name: "Milanesa de carne", price: 12500 }],
    status: "Recibido",
    createdAt: now2 - 1000 * 60 * 3,
  },
  {
    id: "O-1002",
    name: "Luis Ferreyra",
    categoria: "cafeteria",
    items: [{ id: "m-cafe-03", qty: 2, name: "Capuchino", price: 4800 }],
    status: "En preparación",
    createdAt: now2 - 1000 * 60 * 8,
  },
  {
    id: "O-1003",
    name: "Carla Ruiz",
    categoria: "kiosco",
    items: [{ id: "m-kios-01", qty: 1, name: "Alfajor de maicena", price: 2200 }, { id: "m-kios-04", qty: 2, name: "Barrita de cereal", price: 2400 }],
    status: "Listo para retirar",
    createdAt: now2 - 1000 * 60 * 14,
  },
];
