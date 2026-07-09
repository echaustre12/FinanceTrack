import React, { useState, useMemo, useEffect } from "react";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";
import {
  Home, Wallet, History, Tag, CalendarClock, Calendar, RefreshCcw,
  PiggyBank, Bell, User, Plus, Trash2, ArrowLeft, TrendingUp, LogOut,
  TrendingDown, X, ChevronRight, CreditCard, Menu, Check, Settings
} from "lucide-react";

/* ============================= TOKENS ============================= */
const COLORS = {
  blue: { solid: "#3B6FE0", soft: "#DCE6FB", text: "#2451B8" },
  green: { solid: "#2FAE79", soft: "#DCF3E9", text: "#1F8F62" },
  red: { solid: "#E25555", soft: "#FBE1E1", text: "#C23E3E" },
  amber: { solid: "#E0A23B", soft: "#FBEBD3", text: "#B87F1F" },
};

const fmt = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

/* ============================= MOCK DATA ============================= */
const CATEGORIES = [
  { id: 1, name: "Alimentación", color: "blue", budget: 800000, spent: 540000 },
  { id: 2, name: "Transporte", color: "green", budget: 300000, spent: 210000 },
  { id: 3, name: "Entretenimiento", color: "amber", budget: 250000, spent: 265000 },
  { id: 4, name: "Salud", color: "red", budget: 200000, spent: 60000 },
  { id: 5, name: "Educación", color: "blue", budget: 400000, spent: 400000 },
  { id: 6, name: "Hogar", color: "green", budget: 600000, spent: 380000 },
];

const PAYMENT_METHODS = [
  { id: 1, name: "Tarjeta Débito", received: 3200000, spent: 2100000 },
  { id: 2, name: "Tarjeta Crédito", received: 0, spent: 850000 },
  { id: 3, name: "Efectivo", received: 400000, spent: 220000 },
];

const FLOW_JUNIO = [
  { day: "1", value: 500000 }, { day: "5", value: 250000 },
  { day: "10", value: 300000 }, { day: "15", value: 220000 },
  { day: "20", value: 170000 }, { day: "25", value: 200000 },
  { day: "30", value: 100000 },
];

const TRANSACTIONS = [
  { id: 1, date: "2026-06-28", desc: "Supermercado La Canasta", amount: 185000, type: "expense", categoryId: 1, paymentMethodId: 1 },
  { id: 2, date: "2026-06-26", desc: "Pago salario", amount: 3200000, type: "income", categoryId: null, paymentMethodId: 1 },
  { id: 3, date: "2026-06-24", desc: "Uber al trabajo", amount: 32000, type: "expense", categoryId: 2, paymentMethodId: 3 },
  { id: 4, date: "2026-06-20", desc: "Netflix + Spotify", amount: 58000, type: "expense", categoryId: 3, paymentMethodId: 2 },
  { id: 5, date: "2026-06-18", desc: "Cita odontológica", amount: 60000, type: "expense", categoryId: 4, paymentMethodId: 3 },
  { id: 6, date: "2026-06-15", desc: "Curso de inglés", amount: 400000, type: "expense", categoryId: 5, paymentMethodId: 1 },
  { id: 7, date: "2026-06-10", desc: "Servicios públicos", amount: 210000, type: "expense", categoryId: 6, paymentMethodId: 1 },
  { id: 8, date: "2026-06-05", desc: "Cine con amigos", amount: 45000, type: "expense", categoryId: 3, paymentMethodId: 2 },
];

const RECURRING = [
  { id: 1, name: "Arriendo", categoryId: 6, amount: 900000, day: 5 },
  { id: 2, name: "Gimnasio", categoryId: 4, amount: 90000, day: 10 },
  { id: 3, name: "Plataformas streaming", categoryId: 3, amount: 58000, day: 20 },
  { id: 4, name: "Seguro celular", categoryId: 6, amount: 35000, day: 28 },
];

const SAVING_GOALS = [
  { id: 1, name: "Viaje a Cartagena", target: 3000000, current: 2010000,
    contributions: [{ date: "2026-05-02", amount: 500000 }, { date: "2026-05-30", amount: 700000 }, { date: "2026-06-20", amount: 810000 }] },
  { id: 2, name: "Fondo de emergencia", target: 5000000, current: 1250000,
    contributions: [{ date: "2026-04-15", amount: 500000 }, { date: "2026-06-01", amount: 750000 }] },
  { id: 3, name: "Nuevo portátil", target: 2200000, current: 900000,
    contributions: [{ date: "2026-06-10", amount: 900000 }] },
  { id: 4, name: "Regalo de fin de año", target: 600000, current: 600000,
    contributions: [{ date: "2026-03-10", amount: 300000 }, { date: "2026-05-10", amount: 300000 }] },
];

const HISTORY_MONTHS = [
  { month: "Abril", ingresos: 4000000, gastos: 3800000 },
  { month: "Mayo", ingresos: 4100000, gastos: 3600000 },
  { month: "Junio", ingresos: 3850000, gastos: 3700000 },
  { month: "Julio", ingresos: 4200000, gastos: 4100000 },
];

const CATEGORY_HISTORY = [
  { month: "Ene", gastos: 380000 }, { month: "Feb", gastos: 360000 },
  { month: "Mar", gastos: 370000 }, { month: "Abr", gastos: 410000 },
  { month: "May", gastos: 330000 }, { month: "Jun", gastos: 397000 },
  { month: "Jul", gastos: 300000 },
];

const NOTIFICATIONS = [
  { id: 1, message: "Entretenimiento superó su presupuesto de este mes", type: "red" },
  { id: 2, message: "Arriendo se debita en 3 días", type: "amber" },
  { id: 3, message: "Meta 'Regalo de fin de año' completada 🎉", type: "green" },
];

const catById = (id) => CATEGORIES.find((c) => c.id === id);
const pmById = (id) => PAYMENT_METHODS.find((p) => p.id === id);

/* ============================= PRIMITIVES ============================= */
function Clay({ children, className = "", style = {}, tone = "surface", onClick, as: Tag = "div" }) {
  return (
    <Tag className={`clay clay--${tone} ${className}`} style={style} onClick={onClick}>
      {children}
    </Tag>
  );
}

function IconChip({ icon: Icon, color = "blue", size = 44 }) {
  const c = COLORS[color];
  return (
    <div
      className="icon-chip"
      style={{ width: size, height: size, background: c.soft, color: c.text }}
    >
      <Icon size={size * 0.5} strokeWidth={2.2} />
    </div>
  );
}

function Progress({ value, max, color = "blue" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const c = COLORS[color];
  return (
    <div className="progress-track">
      <div
        className="progress-fill"
        style={{ width: `${pct}%`, background: c.solid }}
      />
    </div>
  );
}

function ClayButton({ children, onClick, tone = "ink", icon: Icon, style = {} }) {
  return (
    <button className={`clay-btn clay-btn--${tone}`} onClick={onClick} style={style}>
      {Icon && <Icon size={16} strokeWidth={2.4} />}
      {children}
    </button>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-veil" onClick={onClose}>
      <Clay tone="surface" className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </Clay>
    </div>
  );
}

/* ============================= CHART HELPERS ============================= */
function FlowChart({ data = FLOW_JUNIO, height = 200 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.blue.solid} stopOpacity={0.35} />
            <stop offset="100%" stopColor={COLORS.blue.solid} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="#D9E1EE" />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} width={40}
          tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
        <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none", boxShadow: "0 8px 24px rgba(20,33,61,0.15)" }} />
        <Area type="monotone" dataKey="value" stroke={COLORS.blue.solid} strokeWidth={3}
          fill="url(#flowFill)" isAnimationActive animationDuration={1100} dot={{ r: 4, fill: COLORS.blue.solid }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function ExpensePie({ height = 200, innerRadius = 55 }) {
  const data = CATEGORIES.map((c) => ({ name: c.name, value: c.spent, color: COLORS[c.color].solid }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={innerRadius} outerRadius={innerRadius + 32}
          paddingAngle={4} cornerRadius={10} isAnimationActive animationDuration={1000}>
          {data.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
        </Pie>
        <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none", boxShadow: "0 8px 24px rgba(20,33,61,0.15)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function GoalRing({ pct, size = 190, color = "blue" }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);
  const r = size / 2 - 18;
  const c = 2 * Math.PI * r;
  const off = c - (animated / 100) * c;
  const col = COLORS[color].solid;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#E3E9F4" strokeWidth={18} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={col} strokeWidth={18} fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.34,1.56,.64,1)" }} />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={size * 0.22} fontWeight={800} fill="#14213D" fontFamily="Sora, sans-serif">
        {Math.round(animated)}%
      </text>
    </svg>
  );
}

/* ============================= LAYOUT ============================= */
const NAV = [
  { key: "plan", label: "Tu plan", icon: Wallet },
  { key: "transactions", label: "Transacciones de este mes", icon: History },
  { key: "history", label: "Historial", icon: TrendingUp },
  { key: "categories", label: "Categorías", icon: Tag },
  { key: "recurring", label: "Pagos Recurrentes", icon: RefreshCcw },
  { key: "calendar", label: "Calendario", icon: Calendar },
  { key: "savings", label: "Ahorros", icon: PiggyBank },
];

function Sidebar({ view, setView, mobileOpen, setMobileOpen }) {
  return (
    <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">FT</div>
        <span>FinanceTrack</span>
      </div>
      <nav>
        {NAV.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${view === item.key || (view === "dashboard" && item.key === "plan") ? "" : ""} ${view.startsWith(item.key) || (item.key === "plan" && (view === "plan" || view === "categoryDetail")) || (item.key === "transactions" && view === "paymentDetail") || (item.key === "history" && (view === "historyCategory" || view === "historyMonth")) || (item.key === "savings" && view === "savingDetail") ? "nav-item--active" : ""}`}
            onClick={() => { setView(item.key); setMobileOpen(false); }}
          >
            <item.icon size={18} strokeWidth={2.2} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">Diseño claymorphism · FinanceTrack 2026</div>
    </aside>
  );
}

function TopBar({ title, subtitle, onBack, setMobileOpen }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="icon-btn mobile-only" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
        {onBack && (
          <button className="icon-btn" onClick={onBack}><ArrowLeft size={18} /></button>
        )}
        <div>
          <h1>{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="avatar-chip"><User size={20} /></div>
    </div>
  );
}

/* ============================= SCREENS ============================= */
function Landing({ onEnter }) {
  return (
    <div className="landing">
      <div className="landing-inner">
        <div className="brand-mark brand-mark--lg">FT</div>
        <h1>FinanceTrack</h1>
        <p>Organiza tus gastos, registra tus ingresos y ten control total sobre tu vida financiera.</p>
        <div className="landing-actions">
          <ClayButton tone="ink" onClick={onEnter}>Regístrate</ClayButton>
          <ClayButton tone="ghost" onClick={onEnter}>Inicia Sesión</ClayButton>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ go }) {
  return (
    <>
      <TopBar title="Bienvenido a FinanceTrack, Luis" subtitle="Este es el resumen de tu mes" setMobileOpen={() => {}} />
      <div className="grid grid--2">
        <Clay className="fade-in" style={{ animationDelay: "0ms" }}>
          <div className="card-head">
            <div className="card-head-left"><IconChip icon={TrendingUp} color="blue" /><h3>Flujo de Junio 2026</h3></div>
            <ClayButton tone="soft-blue" onClick={() => go("transactions")}>Ver detalle</ClayButton>
          </div>
          <FlowChart />
        </Clay>
        <Clay className="fade-in" style={{ animationDelay: "80ms" }} onClick={() => go("categories")}>
          <div className="card-head">
            <div className="card-head-left"><IconChip icon={Wallet} color="red" /><h3>Gastos por categoría</h3></div>
            <ChevronRight size={18} color="#7686A3" />
          </div>
          <ExpensePie />
        </Clay>
      </div>
      <Clay className="fade-in" style={{ animationDelay: "160ms" }}>
        <div className="card-head">
          <div className="card-head-left"><IconChip icon={Bell} color="amber" /><h3>Recordatorios</h3></div>
        </div>
        <div className="notif-list">
          {NOTIFICATIONS.map((n) => (
            <div className="notif-item" key={n.id}>
              <span className={`dot dot--${n.type}`} />
              <span>{n.message}</span>
            </div>
          ))}
        </div>
      </Clay>
    </>
  );
}

function PlanScreen({ go, openCategory }) {
  return (
    <>
      <TopBar title="Luis, este es tu plan mensual para Junio 2026" subtitle="Presupuesto por categoría y medios de pago disponibles" />
      <div className="grid grid--plan">
        <Clay className="fade-in">
          <h3 className="section-title">Medios de pago</h3>
          <div className="pm-list">
            {PAYMENT_METHODS.map((pm) => (
              <div className="pm-row" key={pm.id} onClick={() => go("paymentDetail", pm.id)}>
                <IconChip icon={CreditCard} color="blue" size={36} />
                <div className="pm-row-text">
                  <strong>{pm.name}</strong>
                  <span>Disponible: {fmt(pm.received - pm.spent)}</span>
                </div>
                <ChevronRight size={16} color="#B6C0D6" />
              </div>
            ))}
          </div>
        </Clay>
        <div className="grid grid--2 grid--nogap-parent">
          {CATEGORIES.map((c, i) => {
            const remaining = c.budget - c.spent;
            const over = remaining < 0;
            return (
              <Clay key={c.id} className="fade-in cat-card" style={{ animationDelay: `${i * 60}ms` }} onClick={() => openCategory(c.id)}>
                <div className="card-head">
                  <div className="card-head-left"><IconChip icon={Tag} color={c.color} size={36} /><h4>{c.name}</h4></div>
                </div>
                <Progress value={c.spent} max={c.budget} color={over ? "red" : c.color} />
                <div className="cat-stats">
                  <span>Presupuestado: <b>{fmt(c.budget)}</b></span>
                  <span>Gastado: <b>{fmt(c.spent)}</b></span>
                  <span className={over ? "text-red" : ""}>{over ? "Te excediste: " : "Te quedan: "}<b>{fmt(Math.abs(remaining))}</b></span>
                </div>
              </Clay>
            );
          })}
        </div>
      </div>
    </>
  );
}

function CategoryDetail({ categoryId, go }) {
  const cat = catById(categoryId);
  const catTx = TRANSACTIONS.filter((t) => t.categoryId === categoryId);
  const pending = RECURRING.filter((r) => r.categoryId === categoryId);
  const remaining = cat.budget - cat.spent;
  return (
    <>
      <TopBar title={`${cat.name} · Junio 2026`} onBack={() => go("plan")} />
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">Resumen</h3>
          <div className="stat-block">
            <div><span>Presupuestado</span><b>{fmt(cat.budget)}</b></div>
            <div><span>Gastado hasta ahora</span><b>{fmt(cat.spent)}</b></div>
            <div><span>{remaining >= 0 ? "Te quedan" : "Excediste por"}</span><b className={remaining < 0 ? "text-red" : "text-green"}>{fmt(Math.abs(remaining))}</b></div>
          </div>
          <Progress value={cat.spent} max={cat.budget} color={remaining < 0 ? "red" : cat.color} />
          {pending.length > 0 && (
            <>
              <h4 className="mt">Pagos recurrentes pendientes</h4>
              {pending.map((p) => <div key={p.id} className="mini-row"><span>{p.name}</span><b>{fmt(p.amount)}</b></div>)}
            </>
          )}
        </Clay>
        <Clay>
          <h3 className="section-title">Flujo de dinero para esta categoría</h3>
          <FlowChart data={CATEGORY_HISTORY.map((d) => ({ day: d.month, value: d.gastos }))} />
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={catTx} />
      </Clay>
    </>
  );
}

function TransactionTable({ rows }) {
  if (!rows.length) return <p className="empty">Aún no hay movimientos registrados este mes.</p>;
  return (
    <div className="tx-table">
      {rows.map((t) => {
        const pm = pmById(t.paymentMethodId);
        const cat = t.categoryId ? catById(t.categoryId) : null;
        return (
          <div className="tx-row" key={t.id}>
            <IconChip icon={t.type === "income" ? TrendingUp : TrendingDown} color={t.type === "income" ? "green" : "red"} size={36} />
            <div className="tx-row-mid">
              <strong>{t.desc}</strong>
              <span>{t.date} · {pm?.name}{cat ? ` · ${cat.name}` : ""}</span>
            </div>
            <b className={t.type === "income" ? "text-green" : "text-red"}>
              {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
            </b>
          </div>
        );
      })}
    </div>
  );
}

function TransactionsScreen({ go }) {
  const totalReceived = PAYMENT_METHODS.reduce((s, p) => s + p.received, 0);
  return (
    <>
      <TopBar title="Transacciones · Junio 2026" />
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">En total has recibido</h3>
          <p className="big-number">{fmt(totalReceived)}</p>
          <h4 className="mt">Medios de pago</h4>
          <div className="pm-list">
            {PAYMENT_METHODS.map((pm) => (
              <div className="pm-row" key={pm.id} onClick={() => go("paymentDetail", pm.id)}>
                <IconChip icon={CreditCard} color="blue" size={36} />
                <div className="pm-row-text"><strong>{pm.name}</strong><span>Disponible: {fmt(pm.received - pm.spent)}</span></div>
                <ChevronRight size={16} color="#B6C0D6" />
              </div>
            ))}
          </div>
        </Clay>
        <Clay>
          <h3 className="section-title">Flujo de Junio 2026</h3>
          <FlowChart />
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={TRANSACTIONS} />
      </Clay>
    </>
  );
}

function PaymentMethodDetail({ pmId, go }) {
  const pm = pmById(pmId);
  const pmTx = TRANSACTIONS.filter((t) => t.paymentMethodId === pmId);
  const byCategory = {};
  pmTx.filter((t) => t.type === "expense").forEach((t) => {
    byCategory[t.categoryId] = (byCategory[t.categoryId] || 0) + t.amount;
  });
  const topCat = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  return (
    <>
      <TopBar title={`${pm.name} · Junio 2026`} onBack={() => go("transactions")} />
      <div className="grid grid--2">
        <Clay>
          <div className="stat-block">
            <div><span>Recibido</span><b>{fmt(pm.received)}</b></div>
            <div><span>Gastado hasta ahora</span><b>{fmt(pm.spent)}</b></div>
            <div><span>Te quedan</span><b className="text-green">{fmt(pm.received - pm.spent)}</b></div>
          </div>
          {topCat && (
            <>
              <h4 className="mt">Categoría con más gastos</h4>
              <div className="mini-row"><span>{catById(Number(topCat[0]))?.name}</span><b>{fmt(topCat[1])}</b></div>
            </>
          )}
        </Clay>
        <Clay>
          <h3 className="section-title">Flujo de dinero</h3>
          <FlowChart />
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={pmTx} />
      </Clay>
    </>
  );
}

function HistoryScreen({ go }) {
  const avgIncome = HISTORY_MONTHS.reduce((s, m) => s + m.ingresos, 0) / HISTORY_MONTHS.length;
  const avgExpense = HISTORY_MONTHS.reduce((s, m) => s + m.gastos, 0) / HISTORY_MONTHS.length;
  const [catSel, setCatSel] = useState("");
  const [monthSel, setMonthSel] = useState("");
  return (
    <>
      <TopBar title="Luis, este es tu historial usando FinanceTrack" />
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">Tendencias mensuales</h3>
          <div className="stat-block">
            <div><span>Promedio de ingresos mensual</span><b>{fmt(avgIncome)}</b></div>
            <div><span>Promedio de gastos mensual</span><b>{fmt(avgExpense)}</b></div>
            <div><span>Categoría con mayor gasto</span><b>Alimentación</b></div>
            <div><span>Medio de pago más usado</span><b>Tarjeta Débito</b></div>
            <div><span>Balance mensual promedio</span><b className="text-green">{fmt(avgIncome - avgExpense)}</b></div>
          </div>
        </Clay>
        <Clay>
          <h3 className="section-title">Consolidado mensual</h3>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={HISTORY_MONTHS} barGap={6}>
              <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="#D9E1EE" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `${Math.round(v / 1000000)}M`} />
              <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="ingresos" fill={COLORS.blue.solid} radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900} />
              <Bar dataKey="gastos" fill={COLORS.amber.solid} radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </Clay>
      </div>
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">Consulta por categoría</h3>
          <p className="hint">Selecciona la categoría que deseas consultar</p>
          <select className="clay-select" value={catSel} onChange={(e) => setCatSel(e.target.value)}>
            <option value="">Selecciona una categoría</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ClayButton tone="ink" style={{ marginTop: 12 }} onClick={() => catSel && go("historyCategory", Number(catSel))}>Consultar</ClayButton>
        </Clay>
        <Clay>
          <h3 className="section-title">Consulta por mes</h3>
          <p className="hint">Selecciona el mes que deseas consultar</p>
          <select className="clay-select" value={monthSel} onChange={(e) => setMonthSel(e.target.value)}>
            <option value="">Selecciona un mes</option>
            {HISTORY_MONTHS.map((m) => <option key={m.month} value={m.month}>{m.month}</option>)}
          </select>
          <ClayButton tone="ink" style={{ marginTop: 12 }} onClick={() => monthSel && go("historyMonth", monthSel)}>Consultar</ClayButton>
        </Clay>
      </div>
    </>
  );
}

function HistoryCategoryScreen({ categoryId, go }) {
  const cat = catById(categoryId);
  return (
    <>
      <TopBar title={`Consolidado mensual · ${cat.name}`} onBack={() => go("history")} />
      <Clay>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={CATEGORY_HISTORY}>
            <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="#D9E1EE" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
            <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none" }} />
            <Bar dataKey="gastos" fill={COLORS[cat.color].solid} radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </Clay>
      <Clay>
        <h3 className="section-title">Tendencias de la categoría</h3>
        <div className="stat-block">
          <div><span>Mes con mayor gasto</span><b>Abril · {fmt(410000)}</b></div>
          <div><span>Mes con menor gasto</span><b>Julio · {fmt(300000)}</b></div>
          <div><span>Presupuesto inicial promedio</span><b>{fmt(cat.budget)}</b></div>
          <div><span>Gasto mensual real promedio</span><b>{fmt(365000)}</b></div>
        </div>
      </Clay>
    </>
  );
}

function HistoryMonthScreen({ month, go }) {
  const data = HISTORY_MONTHS.find((m) => m.month === month) || HISTORY_MONTHS[0];
  return (
    <>
      <TopBar title={`Transacciones · ${month}`} onBack={() => go("history")} />
      <div className="grid grid--2">
        <Clay>
          <div className="stat-block">
            <div><span>En total recibiste</span><b>{fmt(data.ingresos)}</b></div>
            <div><span>Ahorrado en Tarjeta Débito</span><b>{fmt(500000)}</b></div>
            <div><span>Ahorrado en Efectivo</span><b>{fmt(120000)}</b></div>
            <div><span>Medio de pago más utilizado</span><b>Tarjeta Débito</b></div>
            <div><span>Ahorraste</span><b className="text-green">{fmt(data.ingresos - data.gastos)}</b></div>
          </div>
        </Clay>
        <Clay>
          <h3 className="section-title">Flujo del mes consultado</h3>
          <FlowChart />
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={TRANSACTIONS} />
      </Clay>
    </>
  );
}

function CategoriesScreen({ openCategory }) {
  const [items, setItems] = useState(CATEGORIES.map((c) => c.name));
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newName, setNewName] = useState("");
  const [toDelete, setToDelete] = useState("");

  return (
    <>
      <TopBar title="Luis, estas son tus categorías de gastos" />
      <div className="grid grid--2 cat-manage-grid">
        {CATEGORIES.filter((c) => items.includes(c.name)).map((c, i) => (
          <Clay key={c.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openCategory(c.id)}>
            <div className="card-head">
              <div className="card-head-left"><IconChip icon={Tag} color={c.color} size={36} /><h4>{c.name}</h4></div>
              <ChevronRight size={16} color="#B6C0D6" />
            </div>
          </Clay>
        ))}
      </div>
      <div className="action-row">
        <ClayButton tone="soft-blue" icon={Plus} onClick={() => setShowCreate(true)}>Crear nueva categoría</ClayButton>
        <ClayButton tone="soft-red" icon={Trash2} onClick={() => setShowDelete(true)}>Eliminar categoría</ClayButton>
      </div>

      {showCreate && (
        <Modal title="Nueva categoría" onClose={() => setShowCreate(false)}>
          <label className="field-label">Nombre de la categoría</label>
          <input className="clay-input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ej. Mascotas" />
          <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} onClick={() => {
            if (newName.trim()) { setItems([...items, newName.trim()]); setNewName(""); setShowCreate(false); }
          }}>Guardar categoría</ClayButton>
        </Modal>
      )}
      {showDelete && (
        <Modal title="Eliminar categoría" onClose={() => setShowDelete(false)}>
          <select className="clay-select" value={toDelete} onChange={(e) => setToDelete(e.target.value)}>
            <option value="">Selecciona una categoría</option>
            {items.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <ClayButton tone="soft-red" style={{ marginTop: 14 }} icon={Trash2} onClick={() => {
            if (toDelete) { setItems(items.filter((n) => n !== toDelete)); setToDelete(""); setShowDelete(false); }
          }}>Eliminar</ClayButton>
        </Modal>
      )}
    </>
  );
}

function RecurringScreen() {
  const [items, setItems] = useState(RECURRING);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState({ name: "", categoryId: "", amount: "", day: "" });
  const [toDelete, setToDelete] = useState("");

  const canSave = form.name && form.categoryId && form.amount && form.day;

  return (
    <>
      <TopBar title="Luis, estos son tus pagos recurrentes" />
      <div className="grid grid--2">
        {items.map((p, i) => (
          <Clay key={p.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <h4>{p.name}</h4>
            <div className="stat-block">
              <div><span>Categoría</span><b>{catById(p.categoryId)?.name}</b></div>
              <div><span>Cantidad</span><b>{fmt(p.amount)}</b></div>
              <div><span>Día del mes</span><b>{p.day}</b></div>
            </div>
          </Clay>
        ))}
      </div>
      <div className="action-row">
        <ClayButton tone="soft-blue" icon={Plus} onClick={() => setShowCreate(true)}>Crear nuevo pago</ClayButton>
        <ClayButton tone="soft-red" icon={Trash2} onClick={() => setShowDelete(true)}>Eliminar pago</ClayButton>
      </div>

      {showCreate && (
        <Modal title="Nuevo pago recurrente" onClose={() => setShowCreate(false)}>
          <label className="field-label">Nombre del pago</label>
          <input className="clay-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej. Suscripción" />
          <label className="field-label">Categoría</label>
          <select className="clay-select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">Selecciona</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label className="field-label">Cantidad</label>
          <input className="clay-input" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Ej. 90000" />
          <label className="field-label">Día del mes</label>
          <input className="clay-input" type="number" min="1" max="31" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} placeholder="Ej. 15" />
          <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} onClick={() => {
            if (!canSave) return;
            setItems([...items, { id: Date.now(), name: form.name, categoryId: Number(form.categoryId), amount: Number(form.amount), day: Number(form.day) }]);
            setForm({ name: "", categoryId: "", amount: "", day: "" });
            setShowCreate(false);
          }}>Guardar pago</ClayButton>
        </Modal>
      )}
      {showDelete && (
        <Modal title="Eliminar pago recurrente" onClose={() => setShowDelete(false)}>
          <select className="clay-select" value={toDelete} onChange={(e) => setToDelete(e.target.value)}>
            <option value="">Selecciona un pago</option>
            {items.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <ClayButton tone="soft-red" style={{ marginTop: 14 }} icon={Trash2} onClick={() => {
            if (toDelete) { setItems(items.filter((p) => String(p.id) !== String(toDelete))); setToDelete(""); setShowDelete(false); }
          }}>Eliminar</ClayButton>
        </Modal>
      )}
    </>
  );
}

function CalendarScreen() {
  const [monthOffset] = useState(0);
  const base = new Date(2026, 5, 1);
  const daysInMonth = new Date(2026, 6, 0).getDate();
  const firstWeekday = base.getDay();
  const events = {
    5: [{ label: "Arriendo", tone: "amber" }],
    10: [{ label: "Gimnasio", tone: "amber" }],
    15: [{ label: "Curso inglés (gasto grande)", tone: "red" }],
    20: [{ label: "Streaming", tone: "amber" }],
    26: [{ label: "Salario recibido", tone: "green" }],
    28: [{ label: "Seguro celular", tone: "amber" }],
  };
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <>
      <TopBar title="Calendario" subtitle="Pagos recurrentes, ingresos y gastos grandes de Junio 2026" />
      <Clay>
        <div className="cal-legend">
          <span><i className="dot dot--amber" /> Pago recurrente próximo</span>
          <span><i className="dot dot--green" /> Ingreso recibido</span>
          <span><i className="dot dot--red" /> Gasto mayor a $100.000</span>
        </div>
        <div className="cal-grid cal-grid--head">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="cal-grid">
          {cells.map((d, i) => (
            <div className={`cal-cell ${d ? "" : "cal-cell--empty"}`} key={i}>
              {d && (
                <>
                  <span className="cal-day">{d}</span>
                  <div className="cal-events">
                    {(events[d] || []).map((e, idx) => (
                      <span key={idx} className={`cal-tag cal-tag--${e.tone}`}>{e.label}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Clay>
    </>
  );
}

function SavingsScreen({ openGoal }) {
  const [items, setItems] = useState(SAVING_GOALS);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState({ name: "", target: "" });
  const [toDelete, setToDelete] = useState("");

  return (
    <>
      <TopBar title="Luis, estas son tus metas de ahorro" />
      <div className="grid grid--2">
        {items.map((g, i) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <Clay key={g.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openGoal(g.id)}>
              <div className="card-head">
                <div className="card-head-left"><IconChip icon={PiggyBank} color={pct >= 100 ? "green" : "amber"} size={36} /><h4>{g.name}</h4></div>
                <ChevronRight size={16} color="#B6C0D6" />
              </div>
              <Progress value={g.current} max={g.target} color={pct >= 100 ? "green" : "amber"} />
              <div className="cat-stats">
                <span>Objetivo: <b>{fmt(g.target)}</b></span>
                <span>Ahorrado: <b>{fmt(g.current)}</b></span>
              </div>
            </Clay>
          );
        })}
      </div>
      <div className="action-row">
        <ClayButton tone="soft-blue" icon={Plus} onClick={() => setShowCreate(true)}>Crear nueva meta</ClayButton>
        <ClayButton tone="soft-red" icon={Trash2} onClick={() => setShowDelete(true)}>Eliminar meta</ClayButton>
      </div>

      {showCreate && (
        <Modal title="Nueva meta de ahorro" onClose={() => setShowCreate(false)}>
          <label className="field-label">Nombre de la meta</label>
          <input className="clay-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej. Vacaciones" />
          <label className="field-label">Cantidad objetivo</label>
          <input className="clay-input" type="number" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} placeholder="Ej. 2000000" />
          <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} onClick={() => {
            if (!form.name || !form.target) return;
            setItems([...items, { id: Date.now(), name: form.name, target: Number(form.target), current: 0, contributions: [] }]);
            setForm({ name: "", target: "" });
            setShowCreate(false);
          }}>Guardar meta</ClayButton>
        </Modal>
      )}
      {showDelete && (
        <Modal title="Eliminar meta" onClose={() => setShowDelete(false)}>
          <p className="hint">Lo ahorrado se transferirá a otra meta existente.</p>
          <select className="clay-select" value={toDelete} onChange={(e) => setToDelete(e.target.value)}>
            <option value="">Selecciona una meta</option>
            {items.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <ClayButton tone="soft-red" style={{ marginTop: 14 }} icon={Trash2} onClick={() => {
            if (toDelete) { setItems(items.filter((g) => String(g.id) !== String(toDelete))); setToDelete(""); setShowDelete(false); }
          }}>Eliminar</ClayButton>
        </Modal>
      )}
    </>
  );
}

function SavingGoalDetail({ goalId, go }) {
  const goal = SAVING_GOALS.find((g) => g.id === goalId);
  const pct = Math.round((goal.current / goal.target) * 100);
  return (
    <>
      <TopBar title={`Luis, esta es la información de "${goal.name}"`} onBack={() => go("savings")} />
      <div className="grid grid--2">
        <Clay className="center-col">
          <GoalRing pct={pct} color={pct >= 100 ? "green" : "amber"} />
        </Clay>
        <Clay>
          <div className="stat-block">
            <div><span>Objetivo</span><b>{fmt(goal.target)}</b></div>
            <div><span>Cantidad ahorrada</span><b>{fmt(goal.current)}</b></div>
            <div><span>Falta por ahorrar</span><b className={pct >= 100 ? "text-green" : ""}>{fmt(Math.max(0, goal.target - goal.current))}</b></div>
          </div>
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Contribuciones</h3>
        {goal.contributions.length === 0 ? (
          <p className="empty">Aún no registras contribuciones para esta meta.</p>
        ) : goal.contributions.map((c, i) => (
          <div className="mini-row" key={i}><span>{c.date}</span><b className="text-green">+{fmt(c.amount)}</b></div>
        ))}
      </Clay>
    </>
  );
}

/* ============================= APP ============================= */
export default function App() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selCategory, setSelCategory] = useState(null);
  const [selPm, setSelPm] = useState(null);
  const [selGoal, setSelGoal] = useState(null);
  const [selMonth, setSelMonth] = useState(null);

  const go = (v, payload) => {
    if (v === "categoryDetail") setSelCategory(payload);
    if (v === "paymentDetail") setSelPm(payload);
    if (v === "savingDetail") setSelGoal(payload);
    if (v === "historyCategory") setSelCategory(payload);
    if (v === "historyMonth") setSelMonth(payload);
    setView(v);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const openCategory = (id) => go("categoryDetail", id);
  const openGoal = (id) => go("savingDetail", id);

  if (!entered) return (
    <>
      <GlobalStyles />
      <Landing onEnter={() => { setEntered(true); setView("dashboard"); }} />
    </>
  );

  let screen;
  switch (view) {
    case "dashboard": screen = <Dashboard go={go} />; break;
    case "plan": screen = <PlanScreen go={go} openCategory={openCategory} />; break;
    case "categoryDetail": screen = <CategoryDetail categoryId={selCategory} go={go} />; break;
    case "transactions": screen = <TransactionsScreen go={go} />; break;
    case "paymentDetail": screen = <PaymentMethodDetail pmId={selPm} go={go} />; break;
    case "history": screen = <HistoryScreen go={go} />; break;
    case "historyCategory": screen = <HistoryCategoryScreen categoryId={selCategory} go={go} />; break;
    case "historyMonth": screen = <HistoryMonthScreen month={selMonth} go={go} />; break;
    case "categories": screen = <CategoriesScreen openCategory={openCategory} />; break;
    case "recurring": screen = <RecurringScreen />; break;
    case "calendar": screen = <CalendarScreen />; break;
    case "savings": screen = <SavingsScreen openGoal={openGoal} />; break;
    case "savingDetail": screen = <SavingGoalDetail goalId={selGoal} go={go} />; break;
    default: screen = <Dashboard go={go} />;
  }

  return (
    <>
      <GlobalStyles />
      <div className="app-shell">
        <Sidebar view={view} setView={go} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        {mobileOpen && <div className="mobile-veil" onClick={() => setMobileOpen(false)} />}
        <main className="app-main">
          <button className="icon-btn mobile-only mobile-menu-btn" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          {screen}
        </main>
      </div>
    </>
  );
}

/* ============================= STYLES ============================= */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

      :root {
        --bg: #EDF1F7;
        --surface: #F7F9FC;
        --ink: #14213D;
        --ink-soft: #5B6B8C;
        --shadow-dark: rgba(163,177,198,0.55);
        --shadow-light: rgba(255,255,255,0.9);
      }
      * { box-sizing: border-box; }
      .app-shell, .landing { font-family: 'Inter', sans-serif; color: var(--ink); }
      h1, h2, h3, h4 { font-family: 'Sora', sans-serif; margin: 0; }
      b, .mono { font-family: 'IBM Plex Mono', monospace; }

      .app-shell { display: flex; min-height: 100vh; background: var(--bg); }

      /* Sidebar */
      .sidebar { width: 250px; background: linear-gradient(180deg,#14213D,#1B2C52); color: #E7ECF7; padding: 26px 18px; flex-shrink: 0; display: flex; flex-direction: column; }
      .sidebar-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 30px; font-family: 'Sora'; font-weight: 700; font-size: 17px; }
      .brand-mark { width: 38px; height: 38px; border-radius: 14px; background: #3B6FE0; display: flex; align-items: center; justify-content: center; font-family: 'Sora'; font-weight: 800; color: #fff; box-shadow: 4px 4px 10px rgba(0,0,0,0.25), -2px -2px 6px rgba(255,255,255,0.08); }
      .brand-mark--lg { width: 72px; height: 72px; border-radius: 24px; font-size: 26px; margin-bottom: 18px; }
      .nav-item { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; background: none; border: none; color: #B9C4DC; padding: 12px 14px; border-radius: 14px; font-size: 14px; font-weight: 500; cursor: pointer; margin-bottom: 4px; transition: all .18s ease; }
      .nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
      .nav-item--active { background: #3B6FE0; color: #fff; box-shadow: 0 6px 16px rgba(59,111,224,0.4); }
      .sidebar-foot { margin-top: auto; font-size: 11px; color: #6C7BA0; padding-top: 16px; }

      /* Main */
      .app-main { flex: 1; padding: 30px 36px 60px; max-width: 1180px; }
      .topbar { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; }
      .topbar-left { display: flex; align-items: center; gap: 12px; }
      .topbar h1 { font-size: 24px; font-weight: 700; }
      .subtitle { margin: 4px 0 0; color: var(--ink-soft); font-size: 13px; }
      .avatar-chip { width: 42px; height: 42px; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; box-shadow: 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light); }

      /* Clay */
      .clay { background: var(--surface); border-radius: 26px; padding: 22px; box-shadow: 9px 9px 18px var(--shadow-dark), -9px -9px 18px var(--shadow-light), inset 0 1px 1px rgba(255,255,255,0.7); margin-bottom: 20px; }
      .cat-card, [onClick] { cursor: pointer; }
      .grid { display: grid; gap: 20px; }
      .grid--2 { grid-template-columns: 1fr 1fr; }
      .grid--plan { grid-template-columns: 300px 1fr; align-items: start; }
      .grid--plan .grid--2 { margin-bottom: 0; }
      .grid--nogap-parent { margin-bottom: 0; }
      .cat-manage-grid { grid-template-columns: repeat(2, 1fr); }

      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
      .card-head-left { display: flex; align-items: center; gap: 12px; }
      .section-title { font-size: 15px; margin-bottom: 14px; }

      .icon-chip { border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 4px 4px 8px rgba(163,177,198,0.4), -3px -3px 6px rgba(255,255,255,0.8), inset 0 -3px 4px rgba(0,0,0,0.06); flex-shrink: 0; }

      .progress-track { height: 12px; border-radius: 20px; background: #E3E9F4; overflow: hidden; box-shadow: inset 2px 2px 4px rgba(163,177,198,0.5); margin: 6px 0 12px; }
      .progress-fill { height: 100%; border-radius: 20px; transition: width 1s cubic-bezier(.34,1.56,.64,1); }

      .cat-stats { display: flex; flex-direction: column; gap: 4px; font-size: 12.5px; color: var(--ink-soft); }
      .cat-stats b { color: var(--ink); }
      .text-red { color: #C23E3E; } .text-green { color: #1F8F62; }

      .clay-btn { border: none; border-radius: 16px; padding: 10px 18px; font-family: 'Inter'; font-weight: 600; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: all .15s ease; }
      .clay-btn:active { transform: translateY(2px); }
      .clay-btn--ink { background: var(--ink); color: #fff; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); }
      .clay-btn--ghost { background: var(--surface); color: var(--ink); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); }
      .clay-btn--soft-blue { background: ${COLORS.blue.soft}; color: ${COLORS.blue.text}; }
      .clay-btn--soft-red { background: ${COLORS.red.soft}; color: ${COLORS.red.text}; }
      .icon-btn { background: var(--surface); border: none; border-radius: 12px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--ink); }

      .notif-list { display: flex; flex-direction: column; gap: 12px; }
      .notif-item { display: flex; align-items: center; gap: 10px; font-size: 13.5px; }
      .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
      .dot--red { background: #E25555; } .dot--amber { background: #E0A23B; } .dot--green { background: #2FAE79; } .dot--blue { background: #3B6FE0; }

      .pm-list { display: flex; flex-direction: column; gap: 10px; }
      .pm-row { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 16px; cursor: pointer; transition: background .15s; }
      .pm-row:hover { background: rgba(59,111,224,0.06); }
      .pm-row-text { display: flex; flex-direction: column; font-size: 13px; flex: 1; }
      .pm-row-text span { color: var(--ink-soft); font-size: 12px; }

      .stat-block { display: flex; flex-direction: column; gap: 10px; margin-bottom: 6px; }
      .stat-block > div { display: flex; justify-content: space-between; font-size: 13.5px; color: var(--ink-soft); }
      .stat-block b { color: var(--ink); }
      .mini-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px dashed #E1E7F1; }
      .mt { margin-top: 18px; margin-bottom: 8px; font-size: 14px; }
      .big-number { font-family: 'IBM Plex Mono'; font-size: 28px; font-weight: 600; margin: 4px 0 0; }

      .tx-table { display: flex; flex-direction: column; gap: 8px; }
      .tx-row { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 16px; }
      .tx-row:hover { background: rgba(20,33,61,0.03); }
      .tx-row-mid { flex: 1; display: flex; flex-direction: column; font-size: 13.5px; }
      .tx-row-mid span { color: var(--ink-soft); font-size: 11.5px; }
      .empty { color: var(--ink-soft); font-size: 13px; }

      .action-row { display: flex; gap: 12px; margin-top: 4px; }

      .clay-select, .clay-input { width: 100%; padding: 11px 14px; border: none; border-radius: 14px; background: var(--bg); box-shadow: inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light); font-family: 'Inter'; font-size: 13.5px; color: var(--ink); margin-bottom: 6px; }
      .field-label { font-size: 12.5px; color: var(--ink-soft); margin: 10px 0 4px; display: block; }

      .modal-veil { position: fixed; inset: 0; background: rgba(20,33,61,0.35); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
      .modal-box { width: 100%; max-width: 380px; margin: 0; }
      .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }

      .cal-legend { display: flex; gap: 18px; font-size: 12px; color: var(--ink-soft); margin-bottom: 16px; flex-wrap: wrap; }
      .cal-legend span { display: flex; align-items: center; gap: 6px; }
      .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
      .cal-grid--head { font-size: 11px; color: var(--ink-soft); text-align: center; margin-bottom: 4px; font-weight: 600; }
      .cal-cell { background: var(--bg); border-radius: 14px; min-height: 78px; padding: 8px; box-shadow: inset 2px 2px 4px var(--shadow-dark); }
      .cal-cell--empty { background: transparent; box-shadow: none; }
      .cal-day { font-size: 12px; font-weight: 600; color: var(--ink-soft); }
      .cal-events { display: flex; flex-direction: column; gap: 3px; margin-top: 4px; }
      .cal-tag { font-size: 9.5px; padding: 2px 6px; border-radius: 8px; font-weight: 600; }
      .cal-tag--amber { background: ${COLORS.amber.soft}; color: ${COLORS.amber.text}; }
      .cal-tag--red { background: ${COLORS.red.soft}; color: ${COLORS.red.text}; }
      .cal-tag--green { background: ${COLORS.green.soft}; color: ${COLORS.green.text}; }

      .center-col { display: flex; align-items: center; justify-content: center; }

      .fade-in { animation: clayPop .6s cubic-bezier(.2,.8,.2,1.1) backwards; }
      @keyframes clayPop { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

      .landing { min-height: 100vh; background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 40px; }
      .landing-inner { text-align: center; max-width: 420px; }
      .landing-inner h1 { font-size: 34px; margin: 6px 0 10px; }
      .landing-inner p { color: var(--ink-soft); font-size: 14.5px; margin-bottom: 26px; }
      .landing-actions { display: flex; gap: 14px; justify-content: center; }

      .mobile-only { display: none; }
      .mobile-veil { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 39; }
      .mobile-menu-btn { margin-bottom: 14px; }

      @media (max-width: 920px) {
        .grid--2, .grid--plan, .cat-manage-grid { grid-template-columns: 1fr; }
        .app-main { padding: 20px 16px 50px; }
        .sidebar { position: fixed; z-index: 40; height: 100vh; transform: translateX(-100%); transition: transform .25s ease; }
        .sidebar--open { transform: translateX(0); }
        .mobile-only { display: flex; }
      }
    `}</style>
  );
}