export function StatsRow({ upcomingCount, overdueCount, doneCount }) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="num" style={{ color: "#B07CC6" }}>{upcomingCount}</div>
        <div className="lbl">Próximos</div>
      </div>
      <div className="stat-card">
        <div className="num" style={{ color: "#D95F6B" }}>{overdueCount}</div>
        <div className="lbl">Vencidos</div>
      </div>
      <div className="stat-card">
        <div className="num" style={{ color: "#6DAF96" }}>{doneCount}</div>
        <div className="lbl">Completados</div>
      </div>
    </div>
  );
}
