import ACTIVE_MAP from "../../constants/routes";
import NAV from "../../constants/navigation";

function Sidebar({ view, setView, mobileOpen, setMobileOpen }) {
  const activeKey = ACTIVE_MAP[view] || view;
  return (
    <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar-brand" onClick={() => { setView("dashboard"); setMobileOpen(false); }}>
        <div className="brand-mark">FT</div>
        <span>FinanceTrack</span>
      </div>
      <nav>
        {NAV.map((item) => (
          <button key={item.key} className={`nav-item ${activeKey === item.key ? "nav-item--active" : ""}`}
            onClick={() => { setView(item.key); setMobileOpen(false); }}>
            <item.icon size={18} strokeWidth={2.2} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">Diseño claymorphism · FinanceTrack 2026</div>
    </aside>
  );
}

export default Sidebar;