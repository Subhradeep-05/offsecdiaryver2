import { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((config) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      type: "info", // 'info', 'success', 'warning', 'alert'
      title: "",
      message: "",
      duration: 6000,
      dismissible: true,
      ...config,
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto-dismiss after duration
    if (notification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
