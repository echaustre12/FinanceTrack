import {
  Home,
  Wallet,
  History,
  Tag,
  Calendar,
  RefreshCcw,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

export const NAV = [
  { key: "dashboard", label: "Inicio", icon: Home },
  { key: "plan", label: "Tu plan", icon: Wallet },
  { key: "transactions", label: "Transacciones de este mes", icon: History },
  { key: "history", label: "Historial", icon: TrendingUp },
  { key: "categories", label: "Categorías", icon: Tag },
  { key: "recurring", label: "Pagos Recurrentes", icon: RefreshCcw },
  { key: "calendar", label: "Calendario", icon: Calendar },
  { key: "savings", label: "Ahorros", icon: PiggyBank },
];