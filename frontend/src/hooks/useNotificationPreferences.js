import { useContext } from "react";
import { NotificationPreferencesContext } from "../context/NotificationPreferencesContext";

export function useNotificationPreferences() {
  const context = useContext(NotificationPreferencesContext);

  if (!context) {
    throw new Error(
      "useNotificationPreferences must be used within NotificationPreferencesProvider"
    );
  }

  return context;
}
