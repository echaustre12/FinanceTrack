import { TrendingUp, Wallet, ChevronRight, Bell } from "lucide-react";

import ClayButton from "../../components/ui/ClayButton";
import Clay from "../../components/ui/Clay";
import IconChip from "../../components/ui/IconChip";
import QuickActions from "../../components/ui/QuickActions";
import FlowChart from "../../components/charts/FlowChart";
import ExpensePie from "../../components/charts/ExpensePie";


function Dashboard({
  go,
  categoryStats,
  monthFlow,
  notifications,
  recurringPayments,
  onExpense,
  onIncome
}) {
  const today = new Date();
  const upcomingPayments = (recurringPayments || [])
    .map((p) => {
      const today = new Date();
      let paymentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        p.dayMonth
      );
      if (paymentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        paymentDate = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          p.dayMonth
        );
      }
      return {
        ...p,
        paymentDate
      };
    })
    .filter((p) => {
      const today = new Date();
      today.setHours(0,0,0,0);
      p.paymentDate.setHours(0,0,0,0);
      const diff =
        (p.paymentDate - today) /
        (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 5;
    })
    .sort(
      (a,b) => a.paymentDate - b.paymentDate
  );

  return (
    <>
      <div className="grid grid--2">
        <Clay
          className="fade-in"
          style={{ animationDelay:"0ms" }}
        >
          <div className="card-head">
            <div className="card-head-left">
              <IconChip
                icon={TrendingUp}
                color="blue"
              />
              <h3>
                Flujo de este mes
              </h3>
            </div>
            <ClayButton
              tone="soft-blue"
              onClick={() => go("transactions")}
            >
              Ver detalle
            </ClayButton>
          </div>
          <FlowChart data={monthFlow}/>
        </Clay>
        <Clay
          className="fade-in"
          style={{ animationDelay:"80ms" }}
          onClick={() => go("categories")}
        >
          <div className="card-head">
            <div className="card-head-left">
              <IconChip
                icon={Wallet}
                color="red"
              />
              <h3>
                Gastos por categoría
              </h3>
            </div>
            <ChevronRight
              size={18}
              color="#7686A3"
            />
          </div>
          <ExpensePie categoryStats={categoryStats}/>
        </Clay>
      </div>
      <Clay
        className="fade-in"
        style={{ animationDelay:"140ms" }}
      >
        <QuickActions
          onExpense={onExpense}
          onIncome={onIncome}
        />
      </Clay>
      <Clay
        className="fade-in"
        style={{ animationDelay:"180ms" }}
      >
        <div className="card-head">
          <div className="card-head-left title-space">
            <IconChip
              icon={Bell}
              color="amber"
            />
            <h3>
              Notificaciones
            </h3>
          </div>
        </div>
        {
          upcomingPayments.length === 0
          ?
          <p className="empty">
            No tienes pagos próximos.
          </p>
          :
          <div className="notif-list">
            {
              upcomingPayments.map((p)=>(
                <div
                  className="notif-item"
                  key={p.id}
                >
                  <span className="dot dot--amber"/>
                  <div>
                    <strong>
                      Pago recurrente: {p.name}
                    </strong>
                    <br />
                    <span>
                      Realiza el pago antes del{" "}
                      {p.paymentDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </Clay>
    </>
  );
}

export default Dashboard;