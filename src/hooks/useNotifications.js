import { useState, useCallback } from "react";

export function useNotifications() {
  const [notifPerm, setNotifPerm] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  const requestNotif = async () => {
    const perm = await Notification.requestPermission();
    setNotifPerm(perm);
    return perm;
  };

  const sendNotification = useCallback((title, body) => {
    if (notifPerm === "granted") {
      new Notification(title, { body });
    }
  }, [notifPerm]);

  return { notifPerm, requestNotif, sendNotification };
}
