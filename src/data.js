import { Droplets, Wind, Sparkles, CircleDot, TimerReset, CheckCircle2, Crown, Award, Medal } from "lucide-react";
import { T } from "./theme.js";

export const STATUS_FLOW = ["Reservado", "Recibido", "Lavando", "Aspirado", "Detailing", "Secado", "Listo"];

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
