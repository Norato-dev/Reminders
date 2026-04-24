import { useState, useEffect, useRef } from "react";
import { useReminders } from "./hooks/useReminders";
import { useAlarm } from "./hooks/useAlarm";
import { useToasts } from "./hooks/useToasts";
import { useReminderForm } from "./hooks/useReminderForm";
import { useNotifications } from "./hooks/useNotifications";
import { usePushSubscription } from "./hooks/usePushSubscription";
import { Header } from "./components/layout/Header";
import { NotifBanner } from "./components/banners/NotifBanner";
import { StatsRow } from "./components/ui/StatsRow";
import { Filters } from "./components/ui/Filters";
import { ReminderList } from "./components/reminders/ReminderList";
import { ReminderModal } from "./components/modals/ReminderModal";
import { ToastContainer } from "./components/ui/ToastContainer";
import "./styles/app.css";

export default function App() {
  const { reminders, addReminder, updateReminder, deleteReminder, toggleDone, triggerReminder, markTriggered } = useReminders();
  const { triggerAlarm } = useAlarm();
  const { toasts, addToast, dismissToast } = useToasts();
  const { form, setForm, showModal, editId, openCreate, openEdit, closeModal } = useReminderForm();
  const { notifPerm, requestNotif, sendNotification } = useNotifications();
  const { subscribe } = usePushSubscription();
  const [filter, setFilter] = useState("all");
  const [ringingId, setRingingId] = useState(null);

  // Auto-register push subscription if permission already granted
  useEffect(() => {
    if (notifPerm === "granted") subscribe();
  }, [notifPerm, subscribe]);

  // Keep a ref so the interval always sees fresh reminders without restarting
  const remindersRef = useRef(reminders);
  useEffect(() => { remindersRef.current = reminders; }, [reminders]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      remindersRef.current.forEach((r) => {
        if (r.done || r.triggered) return;
        const dt = new Date(`${r.date}T${r.time}`);
        if (Math.abs(now - dt) < 30000) {
          triggerAlarm();
          setRingingId(r.id);
          addToast(`⏰ ${r.title}`, r.description || "¡Es hora de tu recordatorio!");
          sendNotification(r.title, r.description || "¡Es hora de tu recordatorio!");
          triggerReminder(r.id);
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [addToast, triggerAlarm, sendNotification, triggerReminder]);

  const handleSave = () => {
    if (!form.title.trim() || !form.date || !form.time) return;
    if (editId) {
      updateReminder(editId, form);
    } else {
      addReminder(form);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    deleteReminder(id);
    if (ringingId === id) setRingingId(null);
  };

  const handleToggleDone = (id) => {
    toggleDone(id);
    if (ringingId === id) setRingingId(null);
  };

  const handleDismissRing = (id) => {
    markTriggered(id);
    setRingingId(null);
  };

  const handleRequestNotif = async () => {
    const perm = await requestNotif();
    if (perm === "granted") subscribe();
  };

  const now = new Date();
  const upcomingCount = reminders.filter((r) => !r.done && new Date(`${r.date}T${r.time}`) > now).length;
  const doneCount = reminders.filter((r) => r.done).length;
  const overdueCount = reminders.filter((r) => !r.done && new Date(`${r.date}T${r.time}`) < now).length;

  const filtered = reminders
    .filter((r) => {
      if (filter === "upcoming") return !r.done && new Date(`${r.date}T${r.time}`) >= now;
      if (filter === "done") return r.done;
      if (filter === "overdue") return !r.done && new Date(`${r.date}T${r.time}`) < now;
      return true;
    })
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  return (
    <>
      <div className="app">
        <Header onNew={openCreate} />
        {notifPerm === "default" && <NotifBanner onActivate={handleRequestNotif} />}
        <StatsRow upcomingCount={upcomingCount} overdueCount={overdueCount} doneCount={doneCount} />
        <Filters active={filter} onChange={setFilter} />
        <ReminderList
          reminders={filtered}
          ringingId={ringingId}
          onToggleDone={handleToggleDone}
          onEdit={openEdit}
          onDelete={handleDelete}
          onDismissRing={handleDismissRing}
        />
      </div>

      {showModal && (
        <ReminderModal
          form={form}
          setForm={setForm}
          editId={editId}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
