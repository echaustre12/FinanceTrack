import { TrendingDown, TrendingUp, Pencil, Trash2 } from "lucide-react";

import IconChip from "../ui/IconChip";
import ClayButton from "../ui/ClayButton";
import { fmt } from "../../hooks/useCollection";

function TransactionTable({ rows, categories, paymentMethods, onEdit, onDelete }) {
  if (!rows.length) return <p className="empty">Aún no hay movimientos registrados.</p>;

  return (
    <div className="tx-table">
      {rows.map((t) => {
        const pm = paymentMethods.find((p) => p.id === t.paymentMethodId);
        const cat = t.categoryId ? categories.find((c) => c.id === t.categoryId) : null;

        return (
          <div className="tx-row" key={`${t.type}-${t.id}`}>
            <IconChip
              icon={t.type === "income" ? TrendingUp : TrendingDown}
              color={t.type === "income" ? "green" : "red"}
              size={36}
            />

            <div className="tx-info">
              <strong>{t.description}</strong>

              <div className="tx-details">
                <span>{t.date}</span>
                <span>{pm?.name || "—"}</span>
                {cat && <span>{cat.name}</span>}
              </div>
            </div>

            <div className="tx-value">
              <b className={t.type === "income" ? "text-green" : "text-red"}>
                {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
              </b>

              {t.type === "expense" && (
                <div className="tx-actions">
                  <ClayButton
                    tone="soft-blue"
                    icon={Pencil}
                    onClick={() => onEdit?.(t)}
                  />

                  <ClayButton
                    tone="soft-red"
                    icon={Trash2}
                    onClick={() => onDelete?.(t)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionTable;