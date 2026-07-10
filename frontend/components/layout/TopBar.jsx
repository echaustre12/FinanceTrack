function TopBar({ title, subtitle, onBack, onHome, user, onLogout, setMobileOpen }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="icon-btn mobile-only" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
        {onBack && <button className="icon-btn" onClick={onBack} title="Atrás"><ArrowLeft size={18} /></button>}
        <button className="icon-btn" onClick={onHome} title="Ir al menú principal"><Home size={18} /></button>
        <div>
          <h1>{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
      </div>
      <UserMenu user={user} onLogout={onLogout} />
    </div>
  );
}

export default TopBar;