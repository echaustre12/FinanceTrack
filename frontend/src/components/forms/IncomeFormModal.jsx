import React, { useState } from "react";
import { Check } from "lucide-react";

import Modal from "../ui/Modal";
import ClayButton from "../ui/ClayButton";
import ErrorText from "../ui/ErrorText";

function IncomeFormModal({ paymentMethods, onClose, onSave, income = null }) {
  const [form, setForm] = useState({
    amount: income?.amount ?? "",
    description: income?.description ?? "",
    date: income?.date ?? "",
    paymentMethodId: income?.paymentMethodId ?? ""
  });

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const ready =
    form.amount &&
    form.description &&
    form.date &&
    form.paymentMethodId;

  const submit = async () => {
    if (!ready) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await onSave({
        id: income?.id,
        amount: Number(form.amount),
        description: form.description,
        date: form.date,
        paymentMethodId: Number(form.paymentMethodId),
      });

      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Registrar ingreso" onClose={onClose}>
      <div className="form-box">

        <label className="field-label">Cantidad</label>
        <input
          className="clay-input"
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          placeholder="Ej. 3200000"
        />

        <label className="field-label">Descripción</label>
        <input
          className="clay-input"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Ej. Pago de salario"
        />

        <label className="field-label">Fecha</label>
        <input
          className="clay-input"
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <label className="field-label">Método de pago</label>
        <select
          className="clay-select"
          value={form.paymentMethodId}
          onChange={(e) =>
            setForm({ ...form, paymentMethodId: e.target.value })
          }
        >
          <option value="">Selecciona un método</option>

          {paymentMethods.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}

        </select>

        <ErrorText>{error}</ErrorText>

        <div className="form-actions">
          <ClayButton
            tone="ink"
            icon={Check}
            disabled={saving}
            onClick={submit}
          >
            {saving
              ? "Guardando..."
              : income
              ? "Actualizar ingreso"
              : "Guardar ingreso"}
          </ClayButton>
        </div>

      </div>
    </Modal>
  );
}

export default IncomeFormModal;