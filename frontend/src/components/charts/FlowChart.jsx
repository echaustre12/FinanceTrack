import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { fmt } from "../../hooks/useCollection";
import COLORS from "../../constants/colors";

function FlowChart({ data, height = 200 }) {
  if (!data || data.length === 0) return <p className="empty">Sin movimientos para graficar todavía.</p>;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.blue.solid} stopOpacity={0.35} />
            <stop offset="100%" stopColor={COLORS.blue.solid} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="#D9E1EE" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#7686A3" }} axisLine={false} tickLine={false} width={40}
          tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
        <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 14, border: "none", boxShadow: "0 8px 24px rgba(20,33,61,0.15)" }} />
        <Area type="monotone" dataKey="value" stroke={COLORS.blue.solid} strokeWidth={3}
          fill="url(#flowFill)" isAnimationActive animationDuration={1100} dot={{ r: 4, fill: COLORS.blue.solid }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default FlowChart;