import { STORAGE_KEY } from "../constants";

export function loadReminders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveReminders(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
