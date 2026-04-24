export function Toast({ toast, onDismiss }) {
  return (
    <div className="toast">
      <button className="dismiss-btn" onClick={() => onDismiss(toast.id)}>✕</button>
      <div className="toast-title">{toast.title}</div>
      <div className="toast-body">{toast.body}</div>
    </div>
  );
}
