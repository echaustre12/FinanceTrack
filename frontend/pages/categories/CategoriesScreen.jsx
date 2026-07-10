function CategoriesScreen({ openCategory, categories, onCreate, onDelete }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newName, setNewName] = useState("");
  const [toDelete, setToDelete] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  return (
    <>
      <div className="grid grid--2 cat-manage-grid">
        {categories.length === 0 && <p className="empty">Aún no tienes categorías creadas.</p>}
        {categories.map((c, i) => (
          <Clay key={c.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openCategory(c.id)}>
            <div className="card-head">
              <div className="card-head-left"><IconChip icon={Tag} color={c.color || "blue"} size={36} /><h4>{c.name}</h4></div>
              <ChevronRight size={16} color="#B6C0D6" />
            </div>
          </Clay>
        ))}
      </div>
      <div className="action-row">
        <ClayButton tone="soft-blue" icon={Plus} onClick={() => setShowCreate(true)}>Crear nueva categoría</ClayButton>
        <ClayButton tone="soft-red" icon={Trash2} onClick={() => setShowDelete(true)}>Eliminar categoría</ClayButton>
      </div>

      {showCreate && (
        <Modal title="Nueva categoría" onClose={() => setShowCreate(false)}>
          <label className="field-label">Nombre de la categoría</label>
          <input className="clay-input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ej. Mascotas" />
          <ErrorText>{error}</ErrorText>
          <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} disabled={saving} onClick={async () => {
            if (!newName.trim()) { setError("El nombre es obligatorio."); return; }
            setSaving(true); setError(null);
            try { await onCreate({ name: newName.trim() }); setNewName(""); setShowCreate(false); }
            catch (e) { setError(e.message); } finally { setSaving(false); }
          }}>{saving ? "Guardando..." : "Guardar categoría"}</ClayButton>
        </Modal>
      )}
      {showDelete && (
        <Modal title="Eliminar categoría" onClose={() => setShowDelete(false)}>
          <select className="clay-select" value={toDelete} onChange={(e) => setToDelete(e.target.value)}>
            <option value="">Selecciona una categoría</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
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

export default CategoriesScreen;