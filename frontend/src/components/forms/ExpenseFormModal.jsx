import React, { useState } from "react";
import { Check } from "lucide-react";

import Modal from "../ui/Modal";
import ErrorText from "../ui/ErrorText";
import ClayButton from "../ui/ClayButton";

function ExpenseFormModal({ categories, paymentMethods, onClose, onSave }) {
  const [form, setForm] = useState({ amount: "", description: "", date: "", categoryId: "", paymentMethodId: "" });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const ready = form.amount && form.description && form.date && form.categoryId && form.paymentMethodId;

  const submit = async () => {
    if (!ready) { setError("Todos los campos son obligatorios."); return; }
    setSaving(true); setError(null);
    try {
      await onSave({
        amount: Number(form.amount), description: form.description, date: form.date,
        categoryId: Number(form.categoryId), paymentMethodId: Number(form.paymentMethodId),
      });
      onClose();
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  };

  return (
    <Modal title="Registrar gasto" onClose={onClose}>
      <label className="field-label">Cantidad</label>
      <input className="clay-input" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Ej. 45000" />
      <label className="field-label">Descripción</label>
      <input className="clay-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ej. Cine con amigos" />
      <label className="field-label">Fecha</label>
      <input className="clay-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <label className="field-label">Categoría</label>
      <select className="clay-select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
        <option value="">Selecciona una categoría</option>
        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <label className="field-label">Método de pago</label>
      <select className="clay-select" value={form.paymentMethodId} onChange={(e) => setForm({ ...form, paymentMethodId: e.target.value })}>
        <option value="">Selecciona un método</option>
        {paymentMethods.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <ErrorText>{error}</ErrorText>
      <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} disabled={saving} onClick={submit}>
        {saving ? "Guardando..." : "Guardar gasto"}
      </ClayButton>
    </Modal>
  );
}

export default ExpenseFormModal;