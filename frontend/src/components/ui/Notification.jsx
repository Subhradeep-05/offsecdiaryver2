import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info, Clock } from "lucide-react";
import { NotificationContext } from "../../context/NotificationContext";
import "./Notification.css";

function NotificationItem({ notification, onClose }) {
  const typeConfig = {
    alert: {
      icon: AlertCircle,
      bgColor: "#2b0d0d",
      borderColor: "#ef4444",
      textColor: "#ef4444",
    },
    warning: {
      icon: Clock,
      bgColor: "#1a1a00",
      borderColor: "#eab308",
      textColor: "#eab308",
    },
    success: {
      icon: CheckCircle,
      bgColor: "#0d2b1a",
      borderColor: "#22c55e",
      textColor: "#22c55e",
    },
    info: {
      icon: Info,
      bgColor: "#0d1a2b",
      borderColor: "#3b82f6",
      textColor: "#3b82f6",
    },
  };

  const config = typeConfig[notification.type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <motion.div
      className="notification"
      style={{
        backgroundColor: config.bgColor,
        borderLeft: `4px solid ${config.borderColor}`,
      }}
      initial={{ opacity: 0, x: 100, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="notification__content">
        <IconComponent
          className="notification__icon"
          style={{ color: config.textColor }}
          size={24}
        />
        <div className="notification__text">
          {notification.title && (
            <h4 className="notification__title" style={{ color: config.textColor }}>
              {notification.title}
            </h4>
          )}
          <p className="notification__message">{notification.message}</p>
        </div>
      </div>

      {notification.dismissible && (
        <button
          className="notification__close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={20} />
        </button>
      )}
    </motion.div>
  );
}

export default function NotificationContainer() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className="notification-container">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
