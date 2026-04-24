import { CATEGORIES, PRIORITY, EMOJI_MAP } from "../../constants";

export function ReminderModal({ form, setForm, editId, onSave, onClose }) {
  const isValid = form.title.trim() && form.date && form.time;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-handle" />
        <div className="modal-title">{editId ? "Editar recordatorio" : "Nuevo recordatorio 🌸"}</div>

        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            placeholder="¿Qué necesitas recordar?"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            placeholder="Detalles adicionales (opcional)"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </div>

        <div className="row-2">
          <div className="form-group">
            <label>Fecha *</label>
            <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Hora *</label>
            <input type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} />
          </div>
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <div className="chip-group">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`chip ${form.category === c.id ? "selected" : ""}`}
                onClick={() => setForm((f) => ({ ...f, category: c.id }))}
                style={form.category === c.id ? { borderColor: c.color, background: `${c.color}18`, color: c.color } : {}}
              >
                {EMOJI_MAP[c.id]} {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="row-2">
          <div className="form-group">
            <label>Prioridad</label>
            <div className="chip-group" style={{ flexDirection: "column" }}>
              {PRIORITY.map((p) => (
                <button
                  key={p.id}
                  className={`chip ${form.priority === p.id ? "selected" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, priority: p.id }))}
                  style={form.priority === p.id ? { borderColor: p.color, background: `${p.color}18`, color: p.color } : {}}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Repetir</label>
            <select value={form.repeat} onChange={(e) => setForm((f) => ({ ...f, repeat: e.target.value }))}>
              <option value="none">Sin repetición</option>
              <option value="daily">Diariamente</option>
              <option value="weekly">Semanalmente</option>
              <option value="monthly">Mensualmente</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button
            className="btn-primary"
            onClick={onSave}
            disabled={!isValid}
            style={{ opacity: !isValid ? 0.5 : 1 }}
          >
            {editId ? "Guardar cambios" : "Crear recordatorio"}
          </button>
        </div>
      </div>
    </div>
  );
}
