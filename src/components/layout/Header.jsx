export function Header({ onNew, onSettings }) {
  return (
    <div className="header">
      <div className="header-top">
        <h1>Mis <em>recordatorios</em> 🌸</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn-icon-pill" onClick={onSettings} title="Configuración">
            ⚙️
          </button>
          <button className="btn-primary" onClick={onNew}>
            <span style={{ fontSize: 17, lineHeight: 1 }}>+</span> Nuevo
          </button>
        </div>
      </div>
      <p className="header-date">{new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}</p>
    </div>
  );
}
