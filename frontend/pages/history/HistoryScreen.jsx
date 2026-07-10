function HistoryScreen({ go, monthlyHistory, categories, transactions, paymentMethods }) {
  const avgIncome = monthlyHistory.length ? monthlyHistory.reduce((s, m) => s + m.ingresos, 0) / monthlyHistory.length : 0;
  const avgExpense = monthlyHistory.length ? monthlyHistory.reduce((s, m) => s + m.gastos, 0) / monthlyHistory.length : 0;
  const [catSel, setCatSel] = useState("");
  const [monthSel, setMonthSel] = useState("");

  const byCategory = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => { byCategory[t.categoryId] = (byCategory[t.categoryId] || 0) + t.amount; });
  const topCatEntry = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  const topCat = topCatEntry ? categories.find((c) => c.id === Number(topCatEntry[0])) : null;

  const byPm = {};
  transactions.forEach((t) => { byPm[t.paymentMethodId] = (byPm[t.paymentMethodId] || 0) + 1; });
  const topPmEntry = Object.entries(byPm).sort((a, b) => b[1] - a[1])[0];
  const topPm = topPmEntry ? paymentMethods.find((p) => p.id === Number(topPmEntry[0])) : null;

  return (
    <>
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">Tendencias mensuales</h3>
          <div className="stat-block">
            <div><span>Promedio de ingresos mensual</span><b>{fmt(avgIncome)}</b></div>
            <div><span>Promedio de gastos mensual</span><b>{fmt(avgExpense)}</b></div>
            <div><span>Categoría con mayor gasto</span><b>{topCat?.name || "—"}</b></div>
            <div><span>Medio de pago más usado</span><b>{topPm?.name || "—"}</b></div>
            <div><span>Balance mensual promedio</span><b className={avgIncome - avgExpense >= 0 ? "text-green" : "text-red"}>{fmt(avgIncome - avgExpense)}</b></div>
          </div>
        </Clay>
        <Clay>
          <h3 className="section-title">Consolidado mensual</h3>
          {monthlyHistory.length === 0 ? <p className="empty">Aún no hay historial suficiente.</p> : (
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={monthlyHistory} barGap={6}>
                <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="#D9E1EE" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `${Math.round(v / 1000000)}M`} />
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="ingresos" fill={COLORS.blue.solid} radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900} />
                <Bar dataKey="gastos" fill={COLORS.amber.solid} radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Clay>
      </div>
      <div className="grid grid--2">
        <Clay>
          <h3 className="section-title">Consulta por categoría</h3>
          <p className="hint">Selecciona la categoría que deseas consultar</p>
          <select className="clay-select" value={catSel} onChange={(e) => setCatSel(e.target.value)}>
            <option value="">Selecciona una categoría</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ClayButton tone="ink" style={{ marginTop: 12 }} onClick={() => catSel && go("historyCategory", Number(catSel))}>Consultar</ClayButton>
        </Clay>
        <Clay>
          <h3 className="section-title">Consulta por mes</h3>
          <p className="hint">Selecciona el mes que deseas consultar</p>
          <select className="clay-select" value={monthSel} onChange={(e) => setMonthSel(e.target.value)}>
            <option value="">Selecciona un mes</option>
            {monthlyHistory.map((m) => <option key={m.label} value={m.label}>{m.label}</option>)}
          </select>
          <ClayButton tone="ink" style={{ marginTop: 12 }} onClick={() => monthSel && go("historyMonth", monthSel)}>Consultar</ClayButton>
        </Clay>
      </div>
    </>
  );
}

export default HistoryScreen;