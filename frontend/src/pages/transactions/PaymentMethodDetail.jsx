import Clay from "../../components/ui/Clay";
import TransactionTable from "../../components/tables/TransactionTable";
import { fmt } from "../../hooks/useCollection";

function PaymentMethodDetail({ pmId, go, paymentMethods, pmStats, transactions, categories, onEditExpense, onDeleteExpense }) {
  const pm = paymentMethods.find((p) => p.id === pmId);
  if (!pm) return <p className="empty">Método de pago no encontrado.</p>;
  const stats = pmStats[pmId] || { received: 0, spent: 0 };
  const pmTx = transactions.filter((t) => t.paymentMethodId === pmId);
  const byCategory = {};
  pmTx.filter((t) => t.type === "expense").forEach((t) => { byCategory[t.categoryId] = (byCategory[t.categoryId] || 0) + t.amount; });
  const topCatEntry = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const topCat = topCatEntry ? categories.find((c) => c.id === Number(topCatEntry[0])) : null;
  return (
    <>
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">{pm.name}</h3>
          <div className="stat-block">
            <div><span>Recibido</span><b>{fmt(stats.received)}</b></div>
            <div><span>Gastado hasta ahora</span><b>{fmt(stats.spent)}</b></div>
            <div><span>Te quedan</span><b className="text-green">{fmt(stats.received - stats.spent)}</b></div>
          </div>
          {topCat && (
            <>
              <h4 className="mt">Categoría con más gastos</h4>
              <div className="mini-row"><span>{topCat.name}</span><b>{fmt(topCatEntry[1])}</b></div>
            </>
          )}
        </Clay>
        <Clay>
          <h3 className="section-title">Transacciones de este medio</h3>
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={pmTx} categories={categories} paymentMethods={paymentMethods} onEdit={onEditExpense} onDelete={onDeleteExpense} />
      </Clay>
    </>
  );
}

export default PaymentMethodDetail;