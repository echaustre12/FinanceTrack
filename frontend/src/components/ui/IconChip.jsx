import COLORS from "../../constants/colors";

function IconChip({ icon: Icon, color = "blue", size = 44 }) {
  const c = COLORS[color] || COLORS.blue;
  return (
    <div className="icon-chip" style={{ width: size, height: size, background: c.soft, color: c.text }}>
      <Icon size={size * 0.5} strokeWidth={2.2} />
    </div>
  );
}

export default IconChip;