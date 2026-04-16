import { createContext, useState, useCallback } from "react";

export const NotificationPreferencesContext = createContext();

export function NotificationPreferencesProvider({ children }) {
  const [enabledNotifications, setEnabledNotifications] = useState(true);

  const resetAllNotifications = useCallback(() => {
    // Clear all notification keys from localStorage
    Object.keys(localStorage)
      .filter((key) => key.startsWith("notification_"))
      .forEach((key) => localStorage.removeItem(key));
  }, []);

  const resetNotificationByKey = useCallback((key) => {
    localStorage.removeItem(`notification_${key}`);
  }, []);

  const toggleNotifications = useCallback(() => {
    setEnabledNotifications((prev) => !prev);
  }, []);

  const getDismissedNotifications = useCallback(() => {
    const dismissed = [];
    Object.keys(localStorage)
      .filter((key) => key.startsWith("notification_"))
      .forEach((key) => {
        dismissed.push({
          key: key.replace("notification_", ""),
          dismissedAt: localStorage.getItem(key),
        });
      });
    return dismissed;
  }, []);

  return (
    <NotificationPreferencesContext.Provider
      value={{
        enabledNotifications,
        toggleNotifications,
        resetAllNotifications,
        resetNotificationByKey,
        getDismissedNotifications,
      }}
    >
      {children}
    </NotificationPreferencesContext.Provider>
  );
}
