import { TrendingUp, Wallet, ChevronRight, Bell } from "lucide-react";

import ClayButton from "../../components/ui/ClayButton";
import Clay from "../../components/ui/Clay";
import IconChip from "../../components/ui/IconChip";
import QuickActions from "../../components/ui/QuickActions";
import FlowChart from "../../components/charts/FlowChart";
import ExpensePie from "../../components/charts/ExpensePie";

function Dashboard({ go, categoryStats, monthFlow, notifications, categories, paymentMethods, onExpense, onIncome }) {
  return (
    <>
      <div className="grid grid--2">
        <Clay className="fade-in" style={{ animationDelay: "0ms" }}>
          <div className="card-head">
            <div className="card-head-left"><IconChip icon={TrendingUp} color="blue" /><h3>Flujo de este mes</h3></div>
            <ClayButton tone="soft-blue" onClick={() => go("transactions")}>Ver detalle</ClayButton>
          </div>
          <FlowChart data={monthFlow} />
        </Clay>
        <Clay className="fade-in" style={{ animationDelay: "80ms" }} onClick={() => go("categories")}>
          <div className="card-head">
            <div className="card-head-left"><IconChip icon={Wallet} color="red" /><h3>Gastos por categoría</h3></div>
            <ChevronRight size={18} color="#7686A3" />
          </div>
          <ExpensePie categoryStats={categoryStats} />
        </Clay>
      </div>
      <Clay className="fade-in" style={{ animationDelay: "140ms" }}>
        <QuickActions onExpense={onExpense} onIncome={onIncome} />
      </Clay>
      <Clay className="fade-in" style={{ animationDelay: "180ms" }}>
        <div className="card-head">
          <div className="card-head-left"><IconChip icon={Bell} color="amber" /><h3>Recordatorios</h3></div>
        </div>
        {notifications.length === 0
          ? <p className="empty">No tienes recordatorios pendientes.</p>
          : (
            <div className="notif-list">
              {notifications.map((n) => (
                <div className="notif-item" key={n.id}><span className="dot dot--amber" /><span>{n.message}</span></div>
              ))}
            </div>
          )}
      </Clay>
    </>
  );
}

export default Dashboard;