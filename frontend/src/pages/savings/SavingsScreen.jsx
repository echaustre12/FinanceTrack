import { useState } from "react";
import { Plus, Trash2, Check, PiggyBank, ChevronRight, Pencil } from "lucide-react";

import Clay from "../../components/ui/Clay";
import ClayButton from "../../components/ui/ClayButton";
import IconChip from "../../components/ui/IconChip";
import Progress from "../../components/ui/Progress";
import Modal from "../../components/ui/Modal";
import ErrorText from "../../components/ui/ErrorText";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { fmt } from "../../hooks/useCollection";

function SavingsScreen({ openGoal, items, onCreate, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [deletingGoal, setDeletingGoal] = useState(null);
  const [destinationGoal, setDestinationGoal] = useState("");

  const [form, setForm] = useState({
    name: "",
    targetAmount: ""
  });

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);


  const openCreate = () => {
    setEditingGoal(null);
    setForm({
      name: "",
      targetAmount: ""
    });
    setError(null);
    setShowForm(true);
  };


  const openEdit = (goal) => {
    setEditingGoal(goal);
    setForm({
      name: goal.name,
      targetAmount: goal.targetAmount
    });
    setError(null);
    setShowForm(true);
  };


  const submit = async () => {

    if (!form.name || !form.targetAmount) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setSaving(true);

    try {

      if (editingGoal) {

        await onUpdate({
          id: editingGoal.id,
          name: form.name,
          targetAmount: Number(form.targetAmount)
        });

      } else {

        await onCreate({
          name: form.name,
          targetAmount: Number(form.targetAmount)
        });

      }

      setShowForm(false);

    } catch (e) {

      setError(e.message);

    } finally {

      setSaving(false);

    }

  };


  const confirmDelete = async () => {

    if (items.length > 1 && !destinationGoal) {
      setError("Selecciona una meta destino para transferir los fondos.");
      return;
    }

    await onDelete(
      deletingGoal.id,
      items.length > 1
        ? {
            destinationGoalId: Number(destinationGoal)
          }
        : {}
    );

    setDeletingGoal(null);
    setDestinationGoal("");

  };


  return (
    <>


      <div className="grid grid--2">


        {
          items.length === 0 &&
          <p className="empty">
            Aún no tienes metas de ahorro.
          </p>
        }



        {
          items.map((g, i) => {

            const pct =
              g.targetAmount > 0
                ? Math.round((g.currentAmount / g.targetAmount) * 100)
                : 0;


            return (

              <Clay
                key={g.id}
                className="fade-in"
                style={{
                  animationDelay: `${i * 50}ms`
                }}
                onClick={() => openGoal(g.id)}
              >


                <div className="card-head">


                  <div className="card-head-left">


                    <IconChip
                      icon={PiggyBank}
                      color={pct >= 100 ? "green" : "amber"}
                      size={42}
                    />


                    <div className="saving-title">

                      <h4>
                        {g.name}
                      </h4>

                      <span>
                        {pct}% completado
                      </span>

                    </div>


                  </div>




                  <div className="saving-card-actions">


                    <ClayButton
                      tone="soft-blue"
                      icon={Pencil}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(g);
                      }}
                    >
                      Editar
                    </ClayButton>



                    <ClayButton
                      tone="soft-red"
                      icon={Trash2}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingGoal(g);
                      }}
                    >
                      Eliminar
                    </ClayButton>



                    <ChevronRight
                      size={18}
                      color="#B6C0D6"
                    />


                  </div>


                </div>





                <Progress
                  value={g.currentAmount}
                  max={g.targetAmount || 1}
                  color={pct >= 100 ? "green" : "amber"}
                />





                <div className="saving-summary">


                  <div className="saving-value">

                    <span>
                      Meta
                    </span>

                    <b>
                      {fmt(g.targetAmount)}
                    </b>

                  </div>




                  <div className="saving-value">

                    <span>
                      Ahorrado
                    </span>

                    <b className="text-green">
                      {fmt(g.currentAmount)}
                    </b>

                  </div>




                  <div className="saving-value">

                    <span>
                      Falta
                    </span>

                    <b>
                      {fmt(
                        Math.max(
                          0,
                          g.targetAmount - g.currentAmount
                        )
                      )}
                    </b>

                  </div>


                </div>


              </Clay>

            );

          })
        }


      </div>





      <div className="action-row">


        <ClayButton
          tone="soft-blue"
          icon={Plus}
          onClick={openCreate}
        >
          Crear nueva meta
        </ClayButton>


      </div>





      {
        showForm &&

        <Modal
          title={
            editingGoal
              ? "Editar meta de ahorro"
              : "Nueva meta de ahorro"
          }
          onClose={() => setShowForm(false)}
        >


          <label className="field-label">
            Nombre de la meta
          </label>


          <input
            className="clay-input"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />



          <label className="field-label">
            Cantidad objetivo
          </label>



          <input
            className="clay-input"
            type="number"
            value={form.targetAmount}
            onChange={(e) =>
              setForm({
                ...form,
                targetAmount: e.target.value
              })
            }
          />



          <ErrorText>
            {error}
          </ErrorText>




          <ClayButton
            tone="ink"
            icon={Check}
            disabled={saving}
            style={{
              marginTop: 14
            }}
            onClick={submit}
          >

            {
              saving
                ? "Guardando..."
                : editingGoal
                  ? "Actualizar meta"
                  : "Guardar meta"
            }


          </ClayButton>



        </Modal>

      }






      {
        deletingGoal &&

        <ConfirmModal

          title="Eliminar meta"

          message={
            items.length === 1
              ?
              "Esta es la única meta existente. Al eliminarla perderás el seguimiento del ahorro acumulado."
              :
              "Los fondos acumulados serán transferidos a otra meta existente."
          }


          onClose={() => {
            setDeletingGoal(null);
            setDestinationGoal("");
          }}


          onConfirm={confirmDelete}

        >


          {
            items.length > 1 &&

            <select
              className="clay-select"
              value={destinationGoal}
              onChange={(e) =>
                setDestinationGoal(e.target.value)
              }
            >

              <option value="">
                Selecciona meta destino
              </option>


              {
                items
                  .filter(x => x.id !== deletingGoal.id)
                  .map(x =>
                    <option
                      key={x.id}
                      value={x.id}
                    >
                      {x.name}
                    </option>
                  )
              }


            </select>

          }


        </ConfirmModal>

      }


    </>
  );
}

export default SavingsScreen;