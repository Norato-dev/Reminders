export function NotifBanner({ onActivate }) {
  return (
    <div className="notif-banner">
      <span>🔔</span>
      <span>Activa las notificaciones para recibir alertas aunque no tengas la app abierta.</span>
      <button onClick={onActivate}>Activar</button>
    </div>
  );
}
