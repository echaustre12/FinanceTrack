import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";
import {
  Home, Wallet, History, Tag, Calendar, RefreshCcw,
  PiggyBank, Bell, User, Plus, Trash2, ArrowLeft, TrendingUp,
  TrendingDown, X, ChevronRight, CreditCard, Menu, Check, LogOut,
  UserCircle2, ArrowDownCircle, ArrowUpCircle
} from "lucide-react";

import useCollection from "./hooks/useCollection";

import LandingChoice from "./pages/auth/LandingChoice";
import Dashboard from "./pages/dashboard/Dashboard";

import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import ClayButton from "./components/ui/ClayButton";
import Clay from "./components/ui/Clay";
import IconChip from "./components/ui/IconChip";
import ErrorText from "./components/ui/ErrorText";
import Loading from "./components/ui/Loading";
import Modal from "./components/ui/Modal";
import PaymentMethodList from "./components/ui/PaymenthMethodList";
import Progress from "./components/ui/Progress";
import QuickActions from "./components/ui/QuickActions";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";

import rawFetch from "./api/client";

import ACTIVE_MAP from "./constants/routes";
import COLORS from "./constants/colors";
import NAV from "./constants/navigation";
import CAT_PALETTE from "./constants/categoryPalette";
import API_BASE from "./api/client"

export default function App() {
  const [authView, setAuthView] = useState("landing"); // landing | login | register
  const [prefillEmail, setPrefillEmail] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [view, setView] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selCategory, setSelCategory] = useState(null);
  const [selPm, setSelPm] = useState(null);
  const [selGoal, setSelGoal] = useState(null);
  const [selMonth, setSelMonth] = useState(null);
  const [expenseModal, setExpenseModal] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);

  const authed = !!token;

  const catsRaw = useCollection(token, "/api/categories", authed);
  const pmsRaw = useCollection(token, "/api/payment-methods", authed);
  const expensesRaw = useCollection(token, "/api/expenses", authed);
  const incomesRaw = useCollection(token, "/api/incomes", authed);
  const recurringRaw = useCollection(token, "/api/recurring-payments", authed);
  const savingsRaw = useCollection(token, "/api/saving-goals", authed);
  const budgetsRaw = useCollection(token, "/api/category-budgets", authed);
  const periodsRaw = useCollection(token, "/api/financial-periods", authed);
  const notifsRaw = useCollection(token, "/api/notifications", authed);

  const categories = useMemo(() => (catsRaw.items || []).map((c, i) => ({ ...c, color: CAT_PALETTE[i % CAT_PALETTE.length] })), [catsRaw.items]);
  const paymentMethods = pmsRaw.items || [];
  const currentPeriod = useMemo(() => {
    const list = periodsRaw.items || [];
    return list.find((p) => p.status) || list[list.length - 1] || null;
  }, [periodsRaw.items]);

  const transactions = useMemo(() => {
    const exp = (expensesRaw.items || []).map((e) => ({ ...e, type: "expense" }));
    const inc = (incomesRaw.items || []).map((i) => ({ ...i, type: "income" }));
    return [...exp, ...inc].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expensesRaw.items, incomesRaw.items]);

  const monthTransactions = useMemo(() => {
    if (!currentPeriod) return transactions;
    return transactions.filter((t) => t.financialPeriodId === currentPeriod.id);
  }, [transactions, currentPeriod]);

  const categoryStats = useMemo(() => categories.map((c) => {
    const budget = (budgetsRaw.items || []).find((b) => b.categoryId === c.id && (!currentPeriod || b.financialPeriodId === currentPeriod.id));
    const spent = monthTransactions.filter((t) => t.type === "expense" && t.categoryId === c.id).reduce((s, t) => s + t.amount, 0);
    return { ...c, budget: budget?.budgetLimit || 0, spent };
  }), [categories, budgetsRaw.items, monthTransactions, currentPeriod]);

  const pmStats = useMemo(() => {
    const map = {};
    paymentMethods.forEach((pm) => {
      const received = monthTransactions.filter((t) => t.type === "income" && t.paymentMethodId === pm.id).reduce((s, t) => s + t.amount, 0);
      const spent = monthTransactions.filter((t) => t.type === "expense" && t.paymentMethodId === pm.id).reduce((s, t) => s + t.amount, 0);
      map[pm.id] = { received, spent };
    });
    return map;
  }, [paymentMethods, monthTransactions]);

  const monthFlow = useMemo(() => {
    return [...monthTransactions].sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((t) => ({ label: t.date?.slice(8, 10), value: t.type === "income" ? t.amount : -t.amount }));
  }, [monthTransactions]);

  const categoryHistoryFor = (categoryId) => {
    const grouped = {};
    transactions.filter((t) => t.type === "expense" && t.categoryId === categoryId).forEach((t) => {
      const l = monthLabel(t.date);
      grouped[l] = (grouped[l] || 0) + t.amount;
    });
    return Object.entries(grouped).map(([label, value]) => ({ label, value }));
  };

  const monthlyHistory = useMemo(() => {
    const grouped = {};
    transactions.forEach((t) => {
      const l = monthLabel(t.date);
      if (!grouped[l]) grouped[l] = { label: l, ingresos: 0, gastos: 0, order: new Date(t.date) };
      if (t.type === "income") grouped[l].ingresos += t.amount; else grouped[l].gastos += t.amount;
    });
    return Object.values(grouped).sort((a, b) => a.order - b.order);
  }, [transactions]);

  const go = (v, payload) => {
    if (v === "categoryDetail") setSelCategory(payload);
    if (v === "paymentDetail") setSelPm(payload);
    if (v === "savingDetail") setSelGoal(payload);
    if (v === "historyCategory") setSelCategory(payload);
    if (v === "historyMonth") setSelMonth(payload);
    setView(v);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };
  const goHome = () => go("dashboard");

  const handleLogout = () => {
    setToken(null); setUser(null); setAuthView("landing"); setView("dashboard");
  };

  const createExpense = (body) => rawFetch("/api/expenses", { method: "POST", body: JSON.stringify({ ...body, financialPeriodId: currentPeriod?.id }) }, token).then(() => expensesRaw.reload());
  const createIncome = (body) => rawFetch("/api/incomes", { method: "POST", body: JSON.stringify({ ...body, financialPeriodId: currentPeriod?.id }) }, token).then(() => incomesRaw.reload());

  /* -------- Not authenticated -------- */
  if (!authed) {
    return (
      <>
        {authView === "landing" && <LandingChoice onGoLogin={() => setAuthView("login")} onGoRegister={() => setAuthView("register")} />}
        {authView === "register" && (
          <RegisterForm
            onGoLogin={() => setAuthView("login")}
            onRegistered={(email) => { setPrefillEmail(email); setAuthView("login"); }}
          />
        )}
        {authView === "login" && (
          <LoginForm
            prefillEmail={prefillEmail}
            onGoRegister={() => setAuthView("register")}
            onLoggedIn={(tok, u) => { setToken(tok); setUser(u); setView("dashboard"); }}
          />
        )}
      </>
    );
  }

  const titles = {
    dashboard: ["Bienvenido a FinanceTrack" + (user?.name ? `, ${user.name}` : ""), "Este es el resumen de tu mes"],
    plan: ["Tu plan mensual", "Presupuesto por categoría y medios de pago disponibles"],
    categoryDetail: ["Detalle de categoría", null],
    transactions: ["Transacciones de este mes", null],
    paymentDetail: ["Detalle del medio de pago", null],
    history: ["Tu historial usando FinanceTrack", null],
    historyCategory: ["Historial por categoría", null],
    historyMonth: [`Historial · ${selMonth || ""}`, null],
    categories: ["Tus categorías de gastos", null],
    recurring: ["Tus pagos recurrentes", null],
    calendar: ["Calendario", "Pagos recurrentes, ingresos y gastos grandes de este mes"],
    savings: ["Tus metas de ahorro", null],
    savingDetail: ["Detalle de la meta", null],
  };
  const [title, subtitle] = titles[view] || titles.dashboard;
  const showBack = ["categoryDetail", "paymentDetail", "historyCategory", "historyMonth", "savingDetail"].includes(view);
  const backTargets = { categoryDetail: "plan", paymentDetail: "transactions", historyCategory: "history", historyMonth: "history", savingDetail: "savings" };

  let screen;
  const anyLoading = catsRaw.loading || pmsRaw.loading || expensesRaw.loading || incomesRaw.loading;
  const anyError = catsRaw.error || pmsRaw.error || expensesRaw.error || incomesRaw.error;

  switch (view) {
    case "dashboard":
      screen = <Dashboard go={go} categoryStats={categoryStats} monthFlow={monthFlow} notifications={notifsRaw.items || []}
        categories={categories} paymentMethods={paymentMethods} onExpense={() => setExpenseModal(true)} onIncome={() => setIncomeModal(true)} />;
      break;
    case "plan":
      screen = <PlanScreen go={go} openCategory={(id) => go("categoryDetail", id)} categoryStats={categoryStats}
        paymentMethods={paymentMethods} pmStats={pmStats} currentPeriod={currentPeriod} onCreatePaymentMethod={(b) => rawFetch("/api/payment-methods", { method: "POST", body: JSON.stringify(b) }, token).then(() => pmsRaw.reload())} />;
      break;
    case "categoryDetail":
      screen = <CategoryDetail categoryId={selCategory} go={go} categoryStats={categoryStats} categoryHistory={categoryHistoryFor(selCategory)}
        recurring={recurringRaw.items || []} transactions={monthTransactions} categories={categories} paymentMethods={paymentMethods} />;
      break;
    case "transactions":
      screen = <TransactionsScreen go={go} monthFlow={monthFlow} pmStats={pmStats} paymentMethods={paymentMethods} transactions={monthTransactions}
        categories={categories} onCreatePaymentMethod={(b) => rawFetch("/api/payment-methods", { method: "POST", body: JSON.stringify(b) }, token).then(() => pmsRaw.reload())}
        onExpense={() => setExpenseModal(true)} onIncome={() => setIncomeModal(true)} />;
      break;
    case "paymentDetail":
      screen = <PaymentMethodDetail pmId={selPm} go={go} paymentMethods={paymentMethods} pmStats={pmStats} transactions={monthTransactions} categories={categories} />;
      break;
    case "history":
      screen = <HistoryScreen go={go} monthlyHistory={monthlyHistory} categories={categories} transactions={transactions} paymentMethods={paymentMethods} />;
      break;
    case "historyCategory":
      screen = <HistoryCategoryScreen categoryId={selCategory} go={go} categories={categories} transactions={transactions} />;
      break;
    case "historyMonth":
      screen = <HistoryMonthScreen month={selMonth} go={go} transactions={transactions} categories={categories} paymentMethods={paymentMethods} />;
      break;
    case "categories":
      screen = <CategoriesScreen openCategory={(id) => go("categoryDetail", id)} categories={categories}
        onCreate={(b) => catsRaw.create(b)} onDelete={(id) => catsRaw.remove(id)} />;
      break;
    case "recurring":
      screen = <RecurringScreen items={recurringRaw.items || []} categories={categories} onCreate={(b) => recurringRaw.create(b)} onDelete={(id) => recurringRaw.remove(id)} />;
      break;
    case "calendar":
      screen = <CalendarScreen recurring={recurringRaw.items || []} transactions={monthTransactions} currentPeriod={currentPeriod} />;
      break;
    case "savings":
      screen = <SavingsScreen openGoal={(id) => go("savingDetail", id)} items={savingsRaw.items || []} onCreate={(b) => savingsRaw.create(b)} onDelete={(id) => savingsRaw.remove(id)} />;
      break;
    case "savingDetail":
      screen = <SavingGoalDetail goalId={selGoal} go={go} items={savingsRaw.items || []} token={token} />;
      break;
    default:
      screen = <Dashboard go={go} categoryStats={categoryStats} monthFlow={monthFlow} notifications={[]} categories={categories} paymentMethods={paymentMethods} onExpense={() => setExpenseModal(true)} onIncome={() => setIncomeModal(true)} />;
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar view={view} setView={go} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        {mobileOpen && <div className="mobile-veil" onClick={() => setMobileOpen(false)} />}
        <main className="app-main">
          <TopBar title={title} subtitle={subtitle} onHome={goHome} onBack={showBack ? () => go(backTargets[view]) : null}
            user={user} onLogout={handleLogout} setMobileOpen={setMobileOpen} />
          {anyError && <p className="error-text">No se pudo conectar con el backend: {anyError}. Verifica que esté corriendo en {API_BASE} y que existan los endpoints correspondientes.</p>}
          {anyLoading ? <Loading label="Cargando tu información..." /> : screen}
        </main>
      </div>
      {expenseModal && <ExpenseFormModal categories={categories} paymentMethods={paymentMethods} onClose={() => setExpenseModal(false)} onSave={createExpense} />}
      {incomeModal && <IncomeFormModal paymentMethods={paymentMethods} onClose={() => setIncomeModal(false)} onSave={createIncome} />}
    </>
  );
}