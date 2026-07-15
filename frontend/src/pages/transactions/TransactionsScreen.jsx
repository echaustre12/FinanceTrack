import Clay from "../../components/ui/Clay";
import FlowChart from "../../components/charts/FlowChart";
import QuickActions from "../../components/ui/QuickActions";
import { fmt } from "../../hooks/useCollection";
import PaymentMethodList from "../../components/ui/PaymentMethodList";
import TransactionTable from "../../components/tables/TransactionTable";

function TransactionsScreen({ go, monthFlow, pmStats, paymentMethods, transactions, categories, onCreatePaymentMethod, onExpense, onIncome, onEditExpense, onDeleteExpense, onEditIncome, onDeleteIncome }) {
  const totalReceived = Object.values(pmStats).reduce((s, v) => s + v.received, 0);
  return (
    <>
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">En total has recibido </h3>
          <p className="big-number">{fmt(totalReceived)}</p>
          <h4 className="mt" style={{ marginBottom: 6 }}></h4>
          <PaymentMethodList paymentMethods={paymentMethods} stats={pmStats} onOpen={(id) => go("paymentDetail", id)} onCreate={onCreatePaymentMethod} />
        </Clay>
        <Clay>
          <h3 className="section-title">Flujo de este mes </h3>
          <FlowChart data={monthFlow} />
        </Clay>
      </div>
      <Clay><QuickActions onExpense={onExpense} onIncome={onIncome} /></Clay>
      <Clay>
        <h3 className="section-title title-space">Transacciones</h3>
        <TransactionTable 
          rows={transactions}
          categories={categories}
          paymentMethods={paymentMethods}
          onEdit={(transaction) =>
            transaction.type === "expense"
              ? onEditExpense?.(transaction)
              : onEditIncome?.(transaction)
          }
          onDelete={(transaction) =>
            transaction.type === "expense"
              ? onDeleteExpense?.(transaction)
              : onDeleteIncome?.(transaction)
          }
        />
      </Clay>
    </>
  );
}

export default TransactionsScreen;