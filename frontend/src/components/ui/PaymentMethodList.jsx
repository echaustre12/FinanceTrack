import React, { useState } from "react";
import { Plus, CreditCard, ChevronRight, Check } from "lucide-react";

import IconChip from "./IconChip";
import Modal from "./Modal";
import ClayButton from "./ClayButton";
import ErrorText from "./ErrorText";
import { fmt } from "../../hooks/useCollection";

function PaymentMethodList({ paymentMethods, stats, onOpen, onCreate }) {
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!name.trim()) { setError("El nombre es obligatorio."); return; }
    setSaving(true); setError(null);
    try { await onCreate({ name: name.trim() }); setName(""); setShowCreate(false); }
    catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  return (
    <>
      <div className="card-head">
        <h3 className="section-title" style={{ marginBottom: 0 }}>Medios de pago</h3>
        <button className="icon-btn" onClick={() => setShowCreate(true)} title="Añadir método de pago"><Plus size={16} /></button>
      </div>
      <div className="pm-list">
        {paymentMethods.length === 0 && <p className="empty">Aún no tienes métodos de pago registrados.</p>}
        {paymentMethods.map((pm) => {
          const s = stats?.[pm.id] || { received: 0, spent: 0 };
          return (
            <div className="pm-row" key={pm.id} onClick={() => onOpen(pm.id)}>
              <IconChip icon={CreditCard} color="blue" size={36} />
              <div className="pm-row-text">
                <strong>{pm.name}</strong>
                <span>Disponible: {fmt(s.received - s.spent)}</span>
              </div>
              <ChevronRight size={16} color="#B6C0D6" />
            </div>
          );
        })}
      </div>
      {showCreate && (
        <Modal title="Nuevo método de pago" onClose={() => setShowCreate(false)}>
          <label className="field-label">Nombre</label>
          <input className="clay-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Nequi" />
          <ErrorText>{error}</ErrorText>
          <ClayButton tone="ink" style={{ marginTop: 14 }} icon={Check} disabled={saving} onClick={submit}>
            {saving ? "Guardando..." : "Guardar método de pago"}
          </ClayButton>
        </Modal>
      )}
    </>
  );
}

export default PaymentMethodList;