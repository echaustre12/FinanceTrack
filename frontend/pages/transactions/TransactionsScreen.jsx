function TransactionsScreen({ go, monthFlow, pmStats, paymentMethods, transactions, categories, onCreatePaymentMethod, onExpense, onIncome }) {
  const totalReceived = Object.values(pmStats).reduce((s, v) => s + v.received, 0);
  return (
    <>
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">En total has recibido</h3>
          <p className="big-number">{fmt(totalReceived)}</p>
          <h4 className="mt" style={{ marginBottom: 6 }}></h4>
          <PaymentMethodList paymentMethods={paymentMethods} stats={pmStats} onOpen={(id) => go("paymentDetail", id)} onCreate={onCreatePaymentMethod} />
        </Clay>
        <Clay>
          <h3 className="section-title">Flujo de este mes</h3>
          <FlowChart data={monthFlow} />
        </Clay>
      </div>
      <Clay><QuickActions onExpense={onExpense} onIncome={onIncome} /></Clay>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={transactions} categories={categories} paymentMethods={paymentMethods} />
      </Clay>
    </>
  );
}

export default TransactionsScreen;