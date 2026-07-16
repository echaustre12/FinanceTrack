import { useState, useEffect } from "react";
import COLORS from "../../constants/colors";

function GoalRing({ pct, size = 190, color = "blue" }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnimated(pct), 120); return () => clearTimeout(t); }, [pct]);
  const r = size / 2 - 18;
  const c = 2 * Math.PI * r;
  const off = c - (animated / 100) * c;
  const col = COLORS[color].solid;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#E3E9F4" strokeWidth={18} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={col} strokeWidth={18} fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.34,1.56,.64,1)" }} />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={size * 0.22} fontWeight={800} fill="#14213D" fontFamily="Sora, sans-serif">
        {Math.round(animated)}%
      </text>
    </svg>
  );
}

export default GoalRing;