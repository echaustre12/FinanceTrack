function CategoryDetail({ categoryId, go, categoryStats, categoryHistory, recurring, transactions, categories, paymentMethods }) {
  const cat = categoryStats.find((c) => c.id === categoryId);
  if (!cat) return <p className="empty">Categoría no encontrada.</p>;
  const catTx = transactions.filter((t) => t.categoryId === categoryId);
  const pending = recurring.filter((r) => r.categoryId === categoryId);
  const remaining = cat.budget - cat.spent;
  return (
    <>
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">Resumen de {cat.name}</h3>
          <div className="stat-block">
            <div><span>Presupuestado</span><b>{fmt(cat.budget)}</b></div>
            <div><span>Gastado hasta ahora</span><b>{fmt(cat.spent)}</b></div>
            <div><span>{remaining >= 0 ? "Te quedan" : "Excediste por"}</span><b className={remaining < 0 ? "text-red" : "text-green"}>{fmt(Math.abs(remaining))}</b></div>
          </div>
          <Progress value={cat.spent} max={cat.budget || 1} color={remaining < 0 ? "red" : cat.color} />
          {pending.length > 0 && (
            <>
              <h4 className="mt">Pagos recurrentes pendientes</h4>
              {pending.map((p) => <div key={p.id} className="mini-row"><span>{p.name}</span><b>{fmt(p.amount)}</b></div>)}
            </>
          )}
        </Clay>
        <Clay>
          <h3 className="section-title">Flujo de dinero para esta categoría</h3>
          <FlowChart data={categoryHistory} />
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Transacciones</h3>
        <TransactionTable rows={catTx} categories={categories} paymentMethods={paymentMethods} />
      </Clay>
    </>
  );
}

export default CategoryDetail;