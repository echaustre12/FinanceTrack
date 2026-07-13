import React, { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

import Clay from "../../components/ui/Clay";
import ClayButton from "../../components/ui/ClayButton";
import Modal from "../../components/ui/Modal";
import ErrorText from "../../components/ui/ErrorText";
import { fmt } from "../../hooks/useCollection";

function RecurringScreen({ items, categories, onCreate, onDelete }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState({ name: "", categoryId: "", amount: "", dayMonth: "" });
  const [toDelete, setToDelete] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const canSave = form.name && form.categoryId && form.amount && form.dayMonth;

  return (
    <>
      <div className="grid grid--2">
        {items.length === 0 && <p className="empty">Aún no tienes pagos recurrentes definidos.</p>}
        {items.map((p, i) => (
          <Clay key={p.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <h4>{p.name}</h4>
            <div className="stat-block">
              <div><span>Categoría: </span><b>{categories.find((c) => c.id === p.categoryId)?.name || "—"}</b></div>
              <div><span>Cantidad: </span><b>{fmt(p.amount)}</b></div>
              <div><span>Día del mes: </span><b>{p.dayMonth}</b></div>
            </div>
          </Clay>
        ))}
      </div>
      <div className="action-row">
        <ClayButton tone="soft-blue" icon={Plus} onClick={() => setShowCreate(true)}>Crear nuevo pago</ClayButton>
        <ClayButton tone="soft-red" icon={Trash2} onClick={() => setShowDelete(true)}>Eliminar pago</ClayButton>
      </div>

      {showCreate && (
        <Modal title="Nuevo pago recurrente" onClose={() => setShowCreate(false)}>
          <label className="field-label">Nombre del pago</label>
          <input className="clay-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej. Suscripción" />
          <label className="field-label">Categoría</label>
          <select className="clay-select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">Selecciona</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label className="field-label">Cantidad</label>
          <input className="clay-input" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Ej. 90000" />
          <label className="field-label">Día del mes</label>
          <input className="clay-input" type="number" min="1" max="31" value={form.dayMonth} onChange={(e) => setForm({ ...form, dayMonth: e.target.value })} placeholder="Ej. 15" />
          <ErrorText>{error}</ErrorText>
          <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} disabled={saving} onClick={async () => {
            if (!canSave) { setError("Todos los campos son obligatorios."); return; }
            setSaving(true); setError(null);
            try {
              await onCreate({ name: form.name, categoryId: Number(form.categoryId), amount: Number(form.amount), dayMonth: Number(form.dayMonth) });
              setForm({ name: "", categoryId: "", amount: "", dayMonth: "" }); setShowCreate(false);
            } catch (e) { setError(e.message); } finally { setSaving(false); }
          }}>{saving ? "Guardando..." : "Guardar pago"}</ClayButton>
        </Modal>
      )}
      {showDelete && (
        <Modal title="Eliminar pago recurrente" onClose={() => setShowDelete(false)}>
          <select className="clay-select" value={toDelete} onChange={(e) => setToDelete(e.target.value)}>
            <option value="">Selecciona un pago</option>
            {items.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
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

export default RecurringScreen;