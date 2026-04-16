# Notification System Documentation

## Overview

The notification system provides a flexible way to display alerts, warnings, and success messages to users. It's fully integrated into the Events and Certifications pages to notify users about:

- **Live Events** - When an event is currently happening
- **Closing Soon** - When an event is about to close (within 24 hours)
- **New Certifications** - When new certifications are added to the catalog
- **New Events** - When new events are posted

## Features

✅ **Dismissible Notifications** - Users can close notifications with the X button  
✅ **Auto-dismiss** - Notifications can auto-close after a set duration  
✅ **Once Per Day** - Notifications only show once per day per event (using localStorage)  
✅ **Multiple Types** - Support for alert, warning, success, and info types  
✅ **Beautiful UI** - Glassmorphic design with icons and animations  
✅ **Responsive** - Works on mobile and desktop  

## 🔔 Notification Preferences (NEW!)

**Problem Solved:** Users can now re-enable dismissed notifications!

A **blue bell icon** appears in the bottom-right corner when notifications are dismissed. Click it to:

- ✅ **View dismissed notifications** - See all dismissed items with timestamps
- ✅ **Reset individual notifications** - Click the eye icon next to any notification
- ✅ **Show All Again** - Button to re-enable every dismissed notification at once

This way, users can dismiss notifications without permanently losing them!

### Notification Preferences Panel Features

- 🔔 **Badge Counter** - Small red badge shows number of dismissed notifications
- 📋 **List View** - Scrollable list of all dismissed notifications with times
- 👁️ **Individual Reset Buttons** - Eye icon to show a specific notification again
- 🔄 **Bulk Reset** - "Show All Notifications Again" button for one-click reset
- ✨ **Success Feedback** - Quick message confirms when notifications are reset
- 📱 **Mobile Responsive** - Works perfectly on all screen sizes

## How to Use

### 1. In Your Component

```jsx
import { useNotification } from "../../hooks/useNotification";

export default function MyComponent() {
  const { alert, warning, success, info } = useNotification();

  const showAlert = () => {
    alert("Alert Title", "This is an alert message", {
      duration: 0,        // 0 = no auto-dismiss, > 0 = milliseconds
      dismissible: true   // Allow user to close
    });
  };

  return <button onClick={showAlert}>Show Alert</button>;
}
```

### 2. Available Notification Types

```jsx
// Alert (for urgent/important messages) - Red
alert("Title", "Message", options);

// Warning (for caution messages) - Yellow  
warning("Title", "Message", options);

// Success (for positive messages) - Green
success("Title", "Message", options);

// Info (for informational messages) - Blue
info("Title", "Message", options);
```

### 3. Options Configuration

```jsx
{
  duration: 6000,      // Auto-dismiss after 6 seconds (0 = never)
  dismissible: true    // Show close button
}
```

## Event Data Structure

To enable notifications in your Events or Certifications, add these fields:

### Events with New Flag
```json
{
  "title": "My Event",
  "date": "2026-05-15",
  "type": "Workshop",
  "status": "Live",
  "dateAdded": "2026-04-02",  // ← Add this for "NEW" notification
  "poster": "/images/event.png",
  "link": "https://..."
}
```

### Certifications with New Flag
```json
{
  "id": "cert-001",
  "title": "Security Basics",
  "dateAdded": "2026-04-02",  // ← Add this for "NEW" notification
  "fullName": "Introduction to Cybersecurity",
  "level": "Beginner",
  "about": "...",
  ...
}
```

## Integration Points

### Events Page
- ✅ **Live Event Detection** - Shows alert when event status is "Live"
- ✅ **Closing Soon Detection** - Shows warning for events within 24 hours
- ✅ **Only Once Per Day** - Each event notification shows only once per day

### Certifications Page
- ✅ **New Certification Detection** - Shows success message when `dateAdded` is within 7 days
- ✅ **Only Once Per Day** - Each certification notification shows only once per day

## Preventing Duplicate Notifications

The system automatically prevents showing the same notification multiple times per day using localStorage. But you can re-enable dismissed notifications anytime!

### Re-enable Dismissed Notifications

A **blue bell icon** appears in the bottom-right corner showing the count of dismissed notifications. Click it to:

- **See all dismissed notifications** - View a list with timestamps
- **Reset individual notifications** - Click the eye icon to show it again
- **Show All Notifications Again** - Button to re-enable all at once

This way, users can dismiss notifications but retrieve them if needed.

### Using the Utility Functions

```jsx
import { 
  hasNotificationBeenShown, 
  markNotificationAsShown 
} from "../../utils/eventNotificationUtils";

// Check if notification was shown today
if (!hasNotificationBeenShown(`my_notification_key`)) {
  showNotification();
  // Mark as shown
  markNotificationAsShown(`my_notification_key`);
}
```

### Reset Notifications via Code

You can also programmatically reset notifications:

```jsx
import { useNotificationPreferences } from "../../hooks/useNotificationPreferences";

const { resetAllNotifications, resetNotificationByKey } = useNotificationPreferences();

// Reset all dismissed notifications
resetAllNotifications();

// Reset a specific notification
resetNotificationByKey("event_live_MyEvent");
```

## Event Notification Utilities

Located in `/src/utils/eventNotificationUtils.js`

### Available Functions

```jsx
// Check if event is currently live
isEventLive(event)

// Check if event closes within X hours (default 24)
isEventClosingSoon(event, 24)

// Check if item was added within X days (default 7)
isNewAddition(item, 7)

// Get all live events from array
getLiveEvents(events)

// Get all closing soon events from array  
getEventsClosingSoon(events, 24)

// Check if notification shown today
hasNotificationBeenShown(key)

// Mark notification as shown today
markNotificationAsShown(key)

// Format date for display
formatEventDate(date)
```

## Example: Adding to a New Page

```jsx
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { isEventLive, hasNotificationBeenShown, markNotificationAsShown } from "../../utils/eventNotificationUtils";

export default function MyPage() {
  const { alert, warning } = useNotification();

  useEffect(() => {
    const event = { title: "Test Event", status: "Live", date: "2026-04-02" };
    
    if (isEventLive(event)) {
      const key = `event_live_${event.title}`;
      if (!hasNotificationBeenShown(key)) {
        alert("Live Now", `${event.title} is happening!`);
        markNotificationAsShown(key);
      }
    }
  }, [alert]);

  return <div>My Page</div>;
}
```

## Managing Notification Preferences via Code

You can programmatically manage dismissed notifications:

```jsx
import { useNotificationPreferences } from "../../hooks/useNotificationPreferences";

export default function MyComponent() {
  const {
    resetAllNotifications,        // Reset all dismissed notifications
    resetNotificationByKey,       // Reset specific notification by key
    getDismissedNotifications,    // Get list of dismissed notifications
    toggleNotifications,          // Toggle notifications on/off globally
    enabledNotifications,         // Current state (enabled or disabled)
  } = useNotificationPreferences();

  return (
    <>
      <button onClick={resetAllNotifications}>
        Show All Notifications Again
      </button>
      <button onClick={() => resetNotificationByKey("event_live_MyEvent")}>
        Show Specific Notification
      </button>
    </>
  );
}
```

## Customization

### Change Notification Position
Edit `.notification-container` in `/src/components/ui/Notification.css`:

```css
.notification-container {
  position: fixed;
  top: 20px;      /* Change to 'bottom' if needed */
  right: 20px;    /* Or 'left' */
  /* ... */
}
```

### Change Colors
Edit the `typeConfig` object in [Notification.jsx](src/components/ui/Notification.jsx):

```jsx
const typeConfig = {
  alert: {
    icon: AlertCircle,
    bgColor: "#2b0d0d",    // Change background
    borderColor: "#ef4444", // Change border
    textColor: "#ef4444",  // Change text
  },
  // ... other types
};
```

### Change Default Auto-dismiss Duration
When calling notifications, override the `duration` option:

```jsx
alert("Title", "Message", { duration: 10000 }); // 10 seconds
```

## Troubleshooting

### Notifications not showing?
1. Make sure `NotificationProvider` wraps your app in `main.jsx`
2. Make sure `NotificationContainer` is in your `Layout.jsx`
3. Check console for errors

### Notification preferences panel not showing?
The bell icon only appears when there are dismissed notifications. Dismiss a notification first to see it.

### Dismissed notifications showing again?
When you click "Show All Notifications Again" or reset a specific notification, it clears the localStorage flag, allowing the notification to show again the next time the condition is met.

### Notifications showing multiple times?
The system uses localStorage keys like `notification_event_live_EventTitle`. 
Clear browser localStorage if needed for testing.

### Need to reset notifications?
Run in browser console:
```javascript
Object.keys(localStorage)
  .filter(k => k.startsWith('notification_'))
  .forEach(k => localStorage.removeItem(k));
```

## Best Practices

1. **Use appropriate types** - Alert for urgent, Warning for caution, Success for positive outcomes
2. **Keep messages short** - Users should understand at a glance
3. **Set duration wisely** - Critical alerts: duration 0 (manual dismiss), Info: 6000ms
4. **Use unique keys** - For `hasNotificationBeenShown()` to prevent duplicates
5. **Test on mobile** - Notifications are responsive but test your messages
6. **Users can recover dismissed notifications** - They'll see the bell icon in the corner to re-enable them
7. **Don't force views** - Let users choose if they want to see notifications again via the preferences panel
