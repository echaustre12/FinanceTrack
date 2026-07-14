import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import Clay from "../../components/ui/Clay";
import { fmt } from "../../hooks/useCollection";
import COLORS from "../../constants/colors";

function HistoryCategoryScreen({ categoryId, go, categories, transactions }) {
  const cat = categories.find((c) => c.id === categoryId);
  if (!cat) return <p className="empty">Categoría no encontrada.</p>;
  const grouped = {};
  transactions.filter((t) => t.type === "expense" && t.categoryId === categoryId).forEach((t) => {
    const l = monthLabel(t.date);
    grouped[l] = (grouped[l] || 0) + t.amount;
  });
  const data = Object.entries(grouped).map(([label, gastos]) => ({ label, gastos }));
  const sorted = [...data].sort((a, b) => b.gastos - a.gastos);
  const avg = data.length ? data.reduce((s, d) => s + d.gastos, 0) / data.length : 0;
  return (
    <>
      <Clay>
        <h3 className="section-title">Consolidado mensual · {cat.name}</h3>
        {data.length === 0 ? <p className="empty">No hay gastos registrados en esta categoría.</p> : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="#D9E1EE" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none" }} />
              <Bar dataKey="gastos" fill={COLORS[cat.color]?.solid || COLORS.blue.solid} radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Clay>
      <Clay>
        <h3 className="section-title">Tendencias de la categoría</h3>
        <div className="stat-block">
          <div><span>Mes con mayor gasto</span><b>{sorted[0]?.label || "—"} · {fmt(sorted[0]?.gastos || 0)}</b></div>
          <div><span>Mes con menor gasto</span><b>{sorted[sorted.length - 1]?.label || "—"} · {fmt(sorted[sorted.length - 1]?.gastos || 0)}</b></div>
          <div><span>Gasto mensual real promedio</span><b>{fmt(avg)}</b></div>
        </div>
      </Clay>
    </>
  );
}

export default HistoryCategoryScreen;