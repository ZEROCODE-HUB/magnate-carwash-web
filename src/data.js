import { Droplets, Wind, Sparkles, CircleDot, TimerReset, CheckCircle2, Crown, Award, Medal } from "lucide-react";
import { T } from "./theme.js";

export const STATUS_FLOW = ["Reservado", "Recibido", "Lavando", "Aspirado", "Detailing", "Secado", "Listo"];

export const STATUS_META = {
  "Reservado": { color: T.inkSoft, bg: "#ECEAE3", icon: TimerReset },
  "Recibido": { color: T.primary, bg: T.primarySoft, icon: CircleDot },
  "Lavando": { color: "#2472B8", bg: "#DCEBFA", icon: Droplets },
  "Aspirado": { color: "#7A57C2", bg: "#E9E1F7", icon: Sparkles },
  "Detailing": { color: T.accentDark, bg: T.accentSoft, icon: Sparkles },
  "Secado": { color: "#2F8F7A", bg: "#DCF2EB", icon: Wind },
  "Listo": { color: "#1B7A3D", bg: "#DEF3E3", icon: CheckCircle2 },
};

export const SERVICES = [
  { id: "basico", name: "Lavado Básico" },
  { id: "premium", name: "Lavado Premium" },
  { id: "encerado", name: "Encerado" },
];

export const TIER_META = {
  "Bronce": { color: "#A15C2A", bg: "#F1E1D2", icon: Medal },
  "Plata": { color: "#5B6B72", bg: "#E7ECEE", icon: Award },
  "Oro": { color: "#B8860B", bg: T.accentSoft, icon: Crown },
};
