import { PiggyBank, Pencil, Trash2 } from "lucide-react";

import IconChip from "../ui/IconChip";
import ClayButton from "../ui/ClayButton";
import { fmt } from "../../hooks/useCollection";

function SavingContributionCard({
  rows,
  onEdit,
  onDelete
}) {

  if (!rows.length) {
    return (
      <p className="empty">
        Aún no hay aportes registrados.
      </p>
    );
  }

  return (
    <div className="tx-table">

      {rows.map((c) => (

        <div className="tx-row" key={c.id}>

          <IconChip
            icon={PiggyBank}
            color="green"
            size={36}
          />


          <div className="tx-info">

            <strong>
              {c.description || "Aporte de ahorro"}
            </strong>


            <div className="tx-details">

              <span>
                {c.contributionDate}
              </span>

              <span>
                Contribución
              </span>

            </div>

          </div>


          <div className="tx-value">

            <b className="text-green">
              +{fmt(c.amount)}
            </b>


            <div className="tx-actions">

              <ClayButton
                tone="soft-blue"
                icon={Pencil}
                onClick={() => onEdit?.(c)}
              />


              <ClayButton
                tone="soft-red"
                icon={Trash2}
                onClick={() => onDelete?.(c)}
              />

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}


export default SavingContributionCard;