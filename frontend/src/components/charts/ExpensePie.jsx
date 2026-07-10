function ExpensePie({ categoryStats, height = 200, innerRadius = 55 }) {
  const data = categoryStats.filter((c) => c.spent > 0).map((c) => ({ name: c.name, value: c.spent, color: COLORS[c.color]?.solid || COLORS.blue.solid }));
  if (data.length === 0) return <p className="empty">Aún no registras gastos este mes.</p>;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={innerRadius} outerRadius={innerRadius + 32}
          paddingAngle={4} cornerRadius={10} isAnimationActive animationDuration={1000}>
          {data.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
        </Pie>
        <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none", boxShadow: "0 8px 24px rgba(20,33,61,0.15)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpensePie;