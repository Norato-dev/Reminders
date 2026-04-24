const FILTER_OPTIONS = [
  ["all", "Todos"],
  ["upcoming", "Próximos"],
  ["overdue", "Vencidos"],
  ["done", "Completados"],
];

export function Filters({ active, onChange }) {
  return (
    <div className="filters">
      {FILTER_OPTIONS.map(([val, lbl]) => (
        <button
          key={val}
          className={`filter-btn ${active === val ? "active" : ""}`}
          onClick={() => onChange(val)}
        >
          {lbl}
        </button>
      ))}
    </div>
  );
}
