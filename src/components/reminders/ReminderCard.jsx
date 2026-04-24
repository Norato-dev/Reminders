import { getCategoryColor, getPriorityColor, formatDateTime, isOverdue } from "../../utils/formatters";
import { EMOJI_MAP, PRIORITY } from "../../constants";

export function ReminderCard({ reminder: r, ringing, onToggleDone, onEdit, onDelete, onDismissRing }) {
  const catColor = getCategoryColor(r.category);
  const priColor = getPriorityColor(r.priority);
  const overdue = isOverdue(r);

  return (
    <div className={`reminder-card ${r.done ? "done" : ""} ${ringing ? "ringing" : ""}`}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3.5, background: catColor, borderRadius: "3px 0 0 3px" }} />
      <div className="cat-dot" style={{ background: `${catColor}1E` }}>
        {EMOJI_MAP[r.category]}
      </div>
      <div className="reminder-info">
        <div className="reminder-title">{r.title}</div>
        {r.description && <div className="reminder-desc">{r.description}</div>}
        <div className="reminder-meta">
          <span className="time-badge" style={{ color: overdue && !r.done ? "var(--danger)" : "var(--text2)" }}>
            🕐 {formatDateTime(r.date, r.time)}{overdue && !r.done && " · Vencido"}
          </span>
          <span className="tag" style={{ background: `${priColor}18`, color: priColor, border: `1px solid ${priColor}38` }}>
            {PRIORITY.find((p) => p.id === r.priority)?.label}
          </span>
          {r.repeat && r.repeat !== "none" && (
            <span className="tag" style={{ background: "rgba(0,0,0,0.035)", color: "var(--text3)", border: "1px solid var(--border)" }}>
              🔄 {r.repeat === "daily" ? "Diario" : r.repeat === "weekly" ? "Semanal" : "Mensual"}
            </span>
          )}
        </div>
      </div>
      <div className="reminder-actions">
        {ringing && (
          <button className="icon-btn" onClick={() => onDismissRing(r.id)} title="Silenciar">🔕</button>
        )}
        <button className="icon-btn check" onClick={() => onToggleDone(r.id)} title={r.done ? "Pendiente" : "Completar"}>
          {r.done ? "↩" : "✓"}
        </button>
        <button className="icon-btn" onClick={() => onEdit(r)} title="Editar">✏</button>
        <button className="icon-btn danger" onClick={() => onDelete(r.id)} title="Eliminar">✕</button>
      </div>
    </div>
  );
}
