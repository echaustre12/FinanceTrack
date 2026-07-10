function CalendarScreen({ recurring, transactions, currentPeriod }) {
  const base = currentPeriod ? new Date(currentPeriod.startDate) : new Date();
  const year = base.getFullYear(), month = base.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const events = {};
  recurring.forEach((r) => { events[r.dayMonth] = [...(events[r.dayMonth] || []), { label: r.name, tone: "amber" }]; });
  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (t.type === "income") events[day] = [...(events[day] || []), { label: t.description, tone: "green" }];
      else if (t.amount > 100000) events[day] = [...(events[day] || []), { label: t.description, tone: "red" }];
    }
  });

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Clay>
      <div className="cal-legend">
        <span><i className="dot dot--amber" /> Pago recurrente próximo</span>
        <span><i className="dot dot--green" /> Ingreso recibido</span>
        <span><i className="dot dot--red" /> Gasto mayor a $100.000</span>
      </div>
      <div className="cal-grid cal-grid--head">{["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => <div key={d}>{d}</div>)}</div>
      <div className="cal-grid">
        {cells.map((d, i) => (
          <div className={`cal-cell ${d ? "" : "cal-cell--empty"}`} key={i}>
            {d && (
              <>
                <span className="cal-day">{d}</span>
                <div className="cal-events">
                  {(events[d] || []).map((e, idx) => <span key={idx} className={`cal-tag cal-tag--${e.tone}`}>{e.label}</span>)}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Clay>
  );
}

export default CalendarScreen;