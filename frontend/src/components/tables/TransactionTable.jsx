function TransactionTable({ rows, categories, paymentMethods }) {
  if (!rows.length) return <p className="empty">Aún no hay movimientos registrados.</p>;
  return (
    <div className="tx-table">
      {rows.map((t) => {
        const pm = paymentMethods.find((p) => p.id === t.paymentMethodId);
        const cat = t.categoryId ? categories.find((c) => c.id === t.categoryId) : null;
        return (
          <div className="tx-row" key={`${t.type}-${t.id}`}>
            <IconChip icon={t.type === "income" ? TrendingUp : TrendingDown} color={t.type === "income" ? "green" : "red"} size={36} />
            <div className="tx-row-mid">
              <strong>{t.description}</strong>
              <span>{t.date} · {pm?.name || "—"}{cat ? ` · ${cat.name}` : ""}</span>
            </div>
            <b className={t.type === "income" ? "text-green" : "text-red"}>{t.type === "income" ? "+" : "-"}{fmt(t.amount)}</b>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionTable;