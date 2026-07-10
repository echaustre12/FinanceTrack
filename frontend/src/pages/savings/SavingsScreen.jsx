function SavingsScreen({ openGoal, items, onCreate, onDelete }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState({ name: "", targetAmount: "" });
  const [toDelete, setToDelete] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  return (
    <>
      <div className="grid grid--2">
        {items.length === 0 && <p className="empty">Aún no tienes metas de ahorro.</p>}
        {items.map((g, i) => {
          const pct = g.targetAmount > 0 ? Math.round((g.currentAmount / g.targetAmount) * 100) : 0;
          return (
            <Clay key={g.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openGoal(g.id)}>
              <div className="card-head">
                <div className="card-head-left"><IconChip icon={PiggyBank} color={pct >= 100 ? "green" : "amber"} size={36} /><h4>{g.name}</h4></div>
                <ChevronRight size={16} color="#B6C0D6" />
              </div>
              <Progress value={g.currentAmount} max={g.targetAmount || 1} color={pct >= 100 ? "green" : "amber"} />
              <div className="cat-stats">
                <span>Objetivo: <b>{fmt(g.targetAmount)}</b></span>
                <span>Ahorrado: <b>{fmt(g.currentAmount)}</b></span>
              </div>
            </Clay>
          );
        })}
      </div>
      <div className="action-row">
        <ClayButton tone="soft-blue" icon={Plus} onClick={() => setShowCreate(true)}>Crear nueva meta</ClayButton>
        <ClayButton tone="soft-red" icon={Trash2} onClick={() => setShowDelete(true)}>Eliminar meta</ClayButton>
      </div>

      {showCreate && (
        <Modal title="Nueva meta de ahorro" onClose={() => setShowCreate(false)}>
          <label className="field-label">Nombre de la meta</label>
          <input className="clay-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej. Vacaciones" />
          <label className="field-label">Cantidad objetivo</label>
          <input className="clay-input" type="number" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} placeholder="Ej. 2000000" />
          <ErrorText>{error}</ErrorText>
          <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} disabled={saving} onClick={async () => {
            if (!form.name || !form.targetAmount) { setError("Todos los campos son obligatorios."); return; }
            setSaving(true); setError(null);
            try { await onCreate({ name: form.name, targetAmount: Number(form.targetAmount) }); setForm({ name: "", targetAmount: "" }); setShowCreate(false); }
            catch (e) { setError(e.message); } finally { setSaving(false); }
          }}>{saving ? "Guardando..." : "Guardar meta"}</ClayButton>
        </Modal>
      )}
      {showDelete && (
        <Modal title="Eliminar meta" onClose={() => setShowDelete(false)}>
          <p className="hint">Lo ahorrado se transferirá a otra meta existente.</p>
          <select className="clay-select" value={toDelete} onChange={(e) => setToDelete(e.target.value)}>
            <option value="">Selecciona una meta</option>
            {items.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <ErrorText>{error}</ErrorText>
          <ClayButton tone="soft-red" style={{ marginTop: 14 }} icon={Trash2} disabled={saving} onClick={async () => {
            if (!toDelete) return;
            setSaving(true); setError(null);
            try { await onDelete(toDelete); setToDelete(""); setShowDelete(false); }
            catch (e) { setError(e.message); } finally { setSaving(false); }
          }}>{saving ? "Eliminando..." : "Eliminar"}</ClayButton>
        </Modal>
      )}
    </>
  );
}

export default SavingsScreen;