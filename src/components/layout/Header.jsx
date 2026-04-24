export function Header({ onNew, onSettings }) {
  return (
    <div className="header">
      <div className="header-left">
        <h1>Mis <em>recordatorios</em> 🌸</h1>
        <p>{new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button className="icon-btn" onClick={onSettings} title="Configuración" style={{ width: 38, height: 38, fontSize: 17 }}>
          ⚙️
        </button>
        <button className="btn-primary" onClick={onNew}>
          <span style={{ fontSize: 17, lineHeight: 1 }}>+</span> Nuevo
        </button>
      </div>
    </div>
  );
}
