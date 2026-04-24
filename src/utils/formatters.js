import { CATEGORIES, PRIORITY } from "../constants";

export function getCategoryColor(catId) {
  return CATEGORIES.find((c) => c.id === catId)?.color || "#E8748A";
}

export function getPriorityColor(pId) {
  return PRIORITY.find((p) => p.id === pId)?.color || "#BBAAAA";
}

export function formatDateTime(date, time) {
  const dt = new Date(`${date}T${time}`);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let dateStr;
  if (dt.toDateString() === today.toDateString()) dateStr = "Hoy";
  else if (dt.toDateString() === tomorrow.toDateString()) dateStr = "Mañana";
  else dateStr = dt.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
  return `${dateStr}, ${time}`;
}

export function isOverdue(r) {
  return !r.done && new Date(`${r.date}T${r.time}`) < new Date();
}
