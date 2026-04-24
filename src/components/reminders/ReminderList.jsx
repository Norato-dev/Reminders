import { ReminderCard } from "./ReminderCard";
import { EmptyState } from "../ui/EmptyState";

export function ReminderList({ reminders, ringingId, onToggleDone, onEdit, onDelete, onDismissRing }) {
  if (reminders.length === 0) return <EmptyState />;

  return (
    <div className="reminders-list">
      {reminders.map((r) => (
        <ReminderCard
          key={r.id}
          reminder={r}
          ringing={ringingId === r.id}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onDelete={onDelete}
          onDismissRing={onDismissRing}
        />
      ))}
    </div>
  );
}
