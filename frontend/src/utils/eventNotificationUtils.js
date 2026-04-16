/**
 * Check if an event is currently live
 */
export function isEventLive(event) {
  if (event.status === "Live") {
    return true;
  }

  const eventDate = new Date(event.date);
  const today = new Date();

  // Set time to midnight for date comparison
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate.toDateString() === today.toDateString();
}

/**
 * Check if an event is closing soon (within specified hours, default 24)
 */
export function isEventClosingSoon(event, hoursThreshold = 24) {
  const eventDate = new Date(event.date);
  const now = new Date();
  const timeUntilEvent = eventDate - now;
  const hoursUntilEvent = timeUntilEvent / (1000 * 60 * 60);

  return (
    hoursUntilEvent > 0 &&
    hoursUntilEvent <= hoursThreshold &&
    event.status !== "Closed"
  );
}

/**
 * Check if an event/certificate is new (added within last X days)
 */
export function isNewAddition(item, daysThreshold = 7) {
  if (!item.dateAdded) return false;

  const addedDate = new Date(item.dateAdded);
  const now = new Date();
  const daysSinceAdded = (now - addedDate) / (1000 * 60 * 60 * 24);

  return daysSinceAdded <= daysThreshold;
}

/**
 * Get all live events from an events array
 */
export function getLiveEvents(events) {
  return events.filter(isEventLive);
}

/**
 * Get all events closing soon from an events array
 */
export function getEventsClosingSoon(events, hoursThreshold = 24) {
  return events.filter((event) => isEventClosingSoon(event, hoursThreshold));
}

/**
 * Check if notification has already been shown (using localStorage)
 */
export function hasNotificationBeenShown(key) {
  const shownToday = localStorage.getItem(`notification_${key}`);
  if (!shownToday) return false;

  const lastShownDate = new Date(shownToday);
  const today = new Date();

  return lastShownDate.toDateString() === today.toDateString();
}

/**
 * Mark notification as shown (uses localStorage to prevent duplicate notifications)
 */
export function markNotificationAsShown(key) {
  localStorage.setItem(`notification_${key}`, new Date().toISOString());
}

/**
 * Format event date for display
 */
export function formatEventDate(date) {
  try {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return date;
  }
}
