export function Header({ onNew }) {
  return (
    <div className="header">
      <div className="header-left">
        <h1>Mis <em>recordatorios</em> 🌸</h1>
        <p>{new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>
      <button className="btn-primary" onClick={onNew}>
        <span style={{ fontSize: 17, lineHeight: 1 }}>+</span> Nuevo
      </button>
    </div>
  );
}
