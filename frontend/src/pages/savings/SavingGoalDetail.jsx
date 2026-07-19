import React, { useState, useEffect } from "react";
import { Plus, Check, Pencil, Trash2 } from "lucide-react";

import Clay from "../../components/ui/Clay";
import GoalRing from "../../components/charts/GoalRing";
import Loading from "../../components/ui/Loading";
import rawFetch from "../../api/client";
import ClayButton from "../../components/ui/ClayButton";
import { fmt } from "../../hooks/useCollection";
import Modal from "../../components/ui/Modal"
import ErrorText from "../../components/ui/ErrorText";
import ConfirmModal from "../../components/ui/ConfirmModal";
import SavingContributionCard from "../../components/ui/SavingContributionCard";

function SavingGoalDetail({ goalId, go, items, token, reloadSavings }) {
  const goal = items.find((g) => g.id === goalId);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [editingContribution, setEditingContribution] = useState(null);
  const [deletingContribution, setDeletingContribution] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    description: ""
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!goal) return;
    setLoading(true);
    rawFetch(`/api/saving-contributions/goal/${goalId}`, {}, token)
      .then((d) => setContributions(d || []))
      .catch(() => setContributions([]))
      .finally(() => setLoading(false));
  }, [goalId, token]);

  const refreshGoal = async () => {
    const data = await rawFetch(
      `/api/saving-contributions/goal/${goalId}`,
      {},
      token
    );
    setContributions(data || []);
    await reloadSavings();
  };

  if (!goal) return <p className="empty">Meta no encontrada.</p>;
  const pct = goal.targetAmount > 0 ? Math.round((goal.currentAmount / goal.targetAmount) * 100) : 0;

  return (
    <>
      <div className="grid grid--2">
        <Clay className="center-col"><GoalRing pct={pct} color={pct >= 100 ? "green" : "amber"} /></Clay>
        <Clay>
          <h3 className="mt" style={{ marginBottom: "0.75rem" }}>{goal.name}</h3>
          <div className="stat-block" style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ opacity: 0.7 }}>Objetivo</span>
              <b>{fmt(goal.targetAmount)}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ opacity: 0.7 }}>Cantidad ahorrada</span>
              <b>{fmt(goal.currentAmount)}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ opacity: 0.7 }}>Falta por ahorrar</span>
              <b className={pct >= 100 ? "text-green" : ""}>{fmt(Math.max(0, goal.targetAmount - goal.currentAmount))}</b>
            </div>
          </div>
        </Clay>
      </div>

      <Clay className="action-row" style={{ display: "flex", justifyContent: "center" }}>
        <ClayButton
          tone="soft-blue"
          icon={Plus}
          style={{ width: "auto", flex: "none" }}
          onClick={() => {
            setEditingContribution(null);
            setForm({
              amount: "",
              description: ""
            });
            setShowContributionForm(true);
          }}
        >
          Añadir un aporte a tu meta
        </ClayButton>
      </Clay>

      <Clay>
        <h3 className="mt" style={{ marginBottom: "0.75rem" }}>Contribuciones</h3>
        {
        loading 
        ?
        <Loading />
        :
        <SavingContributionCard
          rows={contributions}
          onEdit={(c)=>{
            setEditingContribution(c);
            setForm({
              amount:c.amount,
              description:c.description
            });
            setShowContributionForm(true);
          }}
          onDelete={(c)=>setDeletingContribution(c)}
        />
        }
      </Clay>
      {
      showContributionForm &&
      <Modal
          title={
              editingContribution
              ? "Editar aporte"
              : "Nuevo aporte"
          }
          onClose={()=>setShowContributionForm(false)}
      >
      <label className="field-label">
      Cantidad
      </label>
      <input
          className="clay-input"
          type="number"
          value={form.amount}
          onChange={e=>setForm({
              ...form,
              amount:e.target.value
          })}
      />
      <label className="field-label">
      Descripción
      </label>
      <input
          className="clay-input"
          value={form.description}
          onChange={e=>setForm({
              ...form,
              description:e.target.value
          })}
      />
      <ErrorText>
          {error}
      </ErrorText>
      <ClayButton
          tone="ink"
          icon={Check}
          disabled={saving}
          onClick={async()=>{
              setSaving(true);
              try{
                  if(editingContribution){
                      await rawFetch(
                          `/api/saving-contributions/${editingContribution.id}`,
                          {
                              method:"PUT",
                              body:JSON.stringify({
                                  amount:Number(form.amount),
                                  description:form.description
                              })
                          },
                          token
                      );
                  }else{
                      await rawFetch(
                          `/api/saving-contributions/goal/${goalId}`,
                          {
                              method:"POST",
                              body:JSON.stringify({
                                  savingGoalId:goalId,
                                  amount:Number(form.amount),
                                  description:form.description
                              })
                          },
                          token
                      );
                  }
                  await refreshGoal();
                  setShowContributionForm(false);
              }finally{
                  setSaving(false);
              }
          }}
      >
      {
      saving
      ? "Guardando..."
      : editingContribution
      ? "Actualizar aporte"
      : "Guardar aporte"
      }
      </ClayButton>
      </Modal>
      }
      {
      deletingContribution &&
      <ConfirmModal
          title="Eliminar aporte"
          message={`¿Deseas eliminar "${deletingContribution.description}"?`}
          onClose={()=>setDeletingContribution(null)}
          onConfirm={async()=>{
              await rawFetch(
                  `/api/saving-contributions/${deletingContribution.id}`,
                  {
                      method:"DELETE"
                  },
                  token
              );
              await refreshGoal();
              setShowContributionForm(false);
          }}
      />
      }
    </>
  );
}

export default SavingGoalDetail;