import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, RotateCcw, X, Eye } from "lucide-react";
import { useNotificationPreferences } from "../../hooks/useNotificationPreferences";
import "./NotificationPreferences.css";

export default function NotificationPreferences() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    resetAllNotifications,
    resetNotificationByKey,
    getDismissedNotifications,
    toggleNotifications,
    enabledNotifications,
  } = useNotificationPreferences();

  const dismissedNotifications = getDismissedNotifications();

  const handleResetAll = () => {
    resetAllNotifications();
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleResetOne = (key) => {
    resetNotificationByKey(key);
  };

  return (
    <>
      <motion.button
        className="notification-prefs-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Notification Preferences"
      >
        <Bell size={20} />
        {dismissedNotifications.length > 0 && (
          <span className="notification-badge">{dismissedNotifications.length}</span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="notification-prefs-panel"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="prefs-header">
              <h3>Dismissed Notifications</h3>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {showSuccessMessage && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ✅ All notifications reset! You'll see them again.
              </motion.div>
            )}

            {dismissedNotifications.length > 0 ? (
              <div className="prefs-list">
                {dismissedNotifications.map((notif) => (
                  <motion.div
                    key={notif.key}
                    className="prefs-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="prefs-item-content">
                      <div className="prefs-item-key">
                        {notif.key.replace(/_/g, " ").toUpperCase()}
                      </div>
                      <div className="prefs-item-time">
                        Dismissed at{" "}
                        {new Date(notif.dismissedAt).toLocaleTimeString()}
                      </div>
                    </div>
                    <button
                      className="reset-one-btn"
                      onClick={() => handleResetOne(notif.key)}
                      title="Show this notification again"
                    >
                      <Eye size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="no-dismissed-empty">
                ✓ All notifications enabled
                <br />
                <span style={{ fontSize: "11px" }}>Dismissed notifications will appear here</span>
              </div>
            )}

            {dismissedNotifications.length > 0 && (
              <motion.button
                className="reset-all-btn"
                onClick={handleResetAll}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={16} />
                Show All Notifications Again
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="prefs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
