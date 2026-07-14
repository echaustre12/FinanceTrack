import Clay from "../../components/ui/Clay";
import FlowChart from "../../components/charts/FlowChart";
import TransactionTable from "../../components/tables/TransactionTable";
import { fmt } from "../../hooks/useCollection";

function HistoryMonthScreen({ month, go, transactions, categories, paymentMethods }) {
  const rows = transactions.filter((t) => monthLabel(t.date) === month);
  const ingresos = rows.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const gastos = rows.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const flow = [...rows].sort((a, b) => new Date(a.date) - new Date(b.date)).map((t) => ({ label: t.date.slice(8, 10), value: t.type === "income" ? t.amount : -t.amount }));
  return (
    <>
      <div className="grid grid--2">
        <Clay>
          <div className="stat-block">
            <div><span>En total recibiste</span><b>{fmt(ingresos)}</b></div>
            <div><span>Total gastado</span><b>{fmt(gastos)}</b></div>
            <div><span>Ahorraste</span><b className={ingresos - gastos >= 0 ? "text-green" : "text-red"}>{fmt(ingresos - gastos)}</b></div>
          </div>
        </Clay>
        <Clay>
          <h3 className="section-title">Movimientos del mes consultado</h3>
          <FlowChart data={flow} />
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={rows} categories={categories} paymentMethods={paymentMethods} />
      </Clay>
    </>
  );
}

export default HistoryMonthScreen;