import { useState, useCallback } from "react";
import { generateId } from "../utils/storage";

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, body) => {
    const toastId = generateId();
    setToasts((p) => [...p, { id: toastId, title, body }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== toastId)), 7000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismissToast };
}
