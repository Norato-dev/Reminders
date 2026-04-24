import { useState } from "react";

const defaultForm = {
  title: "", description: "", date: "", time: "",
  category: "personal", priority: "medium", repeat: "none",
};

export function useReminderForm() {
  const [form, setForm] = useState(defaultForm);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const openCreate = () => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    setForm({
      title: "", description: "",
      date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
      time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
      category: "personal", priority: "medium", repeat: "none",
    });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (r) => {
    setForm({
      title: r.title, description: r.description || "",
      date: r.date, time: r.time,
      category: r.category, priority: r.priority, repeat: r.repeat || "none",
    });
    setEditId(r.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
  };

  return { form, setForm, showModal, editId, openCreate, openEdit, closeModal };
}
