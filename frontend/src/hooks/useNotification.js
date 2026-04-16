import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  const notify = {
    alert: (title, message, config = {}) =>
      context.addNotification({
        type: "alert",
        title,
        message,
        ...config,
      }),
    warning: (title, message, config = {}) =>
      context.addNotification({
        type: "warning",
        title,
        message,
        ...config,
      }),
    success: (title, message, config = {}) =>
      context.addNotification({
        type: "success",
        title,
        message,
        ...config,
      }),
    info: (title, message, config = {}) =>
      context.addNotification({
        type: "info",
        title,
        message,
        ...config,
      }),
  };

  return { ...notify, ...context };
}
