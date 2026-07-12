import React, { useState, useEffect } from "react";

import Clay from "../../components/ui/Clay";
import GoalRing from "../../components/charts/GoalRing"
import Loading from "../../components/ui/Loading";
import rawFetch from "../../api/client";
import { fmt } from "../../hooks/useCollection";

function SavingGoalDetail({ goalId, go, items, token }) {
  const goal = items.find((g) => g.id === goalId);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!goal) return;
    setLoading(true);
    rawFetch(`/api/saving-goals/${goalId}`, {}, token)
      .then((d) => setContributions(d?.contributions || []))
      .catch(() => setContributions([]))
      .finally(() => setLoading(false));
  }, [goalId]); // eslint-disable-line

  if (!goal) return <p className="empty">Meta no encontrada.</p>;
  const pct = goal.targetAmount > 0 ? Math.round((goal.currentAmount / goal.targetAmount) * 100) : 0;
  return (
    <>
      <div className="grid grid--2">
        <Clay className="center-col"><GoalRing pct={pct} color={pct >= 100 ? "green" : "amber"} /></Clay>
        <Clay>
          <h3 className="section-title">{goal.name}</h3>
          <div className="stat-block">
            <div><span>Objetivo</span><b>{fmt(goal.targetAmount)}</b></div>
            <div><span>Cantidad ahorrada</span><b>{fmt(goal.currentAmount)}</b></div>
            <div><span>Falta por ahorrar</span><b className={pct >= 100 ? "text-green" : ""}>{fmt(Math.max(0, goal.targetAmount - goal.currentAmount))}</b></div>
          </div>
        </Clay>
      </div>
      <Clay>
        <h3 className="section-title">Contribuciones</h3>
        {loading ? <Loading /> : contributions.length === 0 ? (
          <p className="empty">Aún no registras contribuciones para esta meta.</p>
        ) : contributions.map((c, i) => (
          <div className="mini-row" key={i}><span>{c.contributionDate}</span><b className="text-green">+{fmt(c.amount)}</b></div>
        ))}
      </Clay>
    </>
  );
}

export default SavingGoalDetail;