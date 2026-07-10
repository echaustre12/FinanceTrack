function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="user-menu" ref={ref}>
      <button className="avatar-chip" onClick={() => setOpen((o) => !o)}><User size={20} /></button>
      {open && (
        <div className="user-dropdown">
          <button className="user-dropdown-item" onClick={() => { setShowInfo(true); setOpen(false); }}>
            <UserCircle2 size={16} /> Mi información
          </button>
          <button className="user-dropdown-item user-dropdown-item--danger" onClick={onLogout}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      )}
      {showInfo && (
        <Modal title="Mi información" onClose={() => setShowInfo(false)}>
          <div className="stat-block">
            <div><span>Nombre</span><b>{user?.name || "—"}</b></div>
            <div><span>Correo</span><b>{user?.email || "—"}</b></div>
            <div><span>Teléfono</span><b>{user?.phoneNumber || "—"}</b></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UserMenu;