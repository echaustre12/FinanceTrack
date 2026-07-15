import React, { useMemo } from "react";

import Clay from "../../components/ui/Clay";
import FlowChart from "../../components/charts/FlowChart";
import TransactionTable from "../../components/tables/TransactionTable";
import { fmt } from "../../hooks/useCollection";
import { monthLabel } from "../../hooks/useCollection";
import { buildAccumulatedFlow } from "../../components/charts/chart";

function HistoryMonthScreen({ month, go, transactions, categories, paymentMethods }) {
  const rows = transactions.filter((t) => monthLabel(t.date) === month);
  const ingresos = rows.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const gastos = rows.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const flow = useMemo(() => buildAccumulatedFlow(rows), [rows]);
  return (
    <>
      <div className="grid grid--2">
        <Clay>
          <div className="stats-grid">
            <div className="stat-item">
              <span>Total recibido</span>
              <b className="text-green">{fmt(ingresos)}</b>
            </div>
            <div className="stat-item">
              <span>Total gastado</span>
              <b className="text-red">{fmt(gastos)}</b>
            </div>
            <div className="stat-item">
              <span>Ahorro total</span>
              <b className={ingresos - gastos >= 0 ? "text-green" : "text-red"}>
                {fmt(ingresos - gastos)}
              </b>
            </div>
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