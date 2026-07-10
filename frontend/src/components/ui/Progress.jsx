import { COLORS } from "../../constants/colors";

function Progress({ value, max, color = "blue" }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const c = COLORS[color] || COLORS.blue;
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${pct}%`, background: c.solid }} />
    </div>
  );
}

export default Progress;