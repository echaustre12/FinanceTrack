import { Tag } from "lucide-react";

import Clay from "../../components/ui/Clay";
import IconChip from "../../components/ui/IconChip";
import PaymentMethodList from "../../components/ui/PaymentMethodList";
import Progress from "../../components/ui/Progress";
import { fmt } from "../../hooks/useCollection";

function PlanScreen({ go, openCategory, categoryStats, paymentMethods, pmStats, currentPeriod, onCreatePaymentMethod }) {
  return (
    <>
      <div className="grid grid--plan">
        <Clay className="fade-in">
          <PaymentMethodList paymentMethods={paymentMethods} stats={pmStats} onOpen={(id) => go("paymentDetail", id)} onCreate={onCreatePaymentMethod} />
        </Clay>
        <div className="grid grid--nogap-parent">
          {categoryStats.length === 0 && <p className="empty">Aún no tienes categorías creadas.</p>}
          {categoryStats.map((c, i) => {
            const remaining = c.budget - c.spent;
            const over = remaining < 0;
            return (
              <Clay key={c.id} className="fade-in cat-card" style={{ animationDelay: `${i * 60}ms` }} onClick={() => openCategory(c.id)}>
                <div className="card-head">
                  <div className="card-head-left"><IconChip icon={Tag} color={c.color} size={36} /><h4>{c.name}</h4></div>
                </div>
                <Progress value={c.spent} max={c.budget || 1} color={over ? "red" : c.color} />
                <div className="cat-stats">
                  <div className="stat-item">
                    <span>Presupuestado</span>
                    <b>{fmt(c.budget)}</b>
                  </div>

                  <div className="stat-item">
                    <span>Gastado</span>
                    <b>{fmt(c.spent)}</b>
                  </div>

                  <div className={`stat-item ${over ? "text-red" : ""}`}>
                    <span>{over ? "Te excediste" : "Te quedan"}</span>
                    <b>{fmt(Math.abs(remaining))}</b>
                  </div>
                </div>
              </Clay>
            );
          })}
        </div>
      </div>
      {!currentPeriod && <p className="hint">No se encontró un periodo financiero activo; crea uno desde el backend para ver presupuestos.</p>}
    </>
  );
}

export default PlanScreen;