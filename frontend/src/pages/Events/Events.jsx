import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { useNotification } from "../../hooks/useNotification";
import {
  isEventLive,
  isEventClosingSoon,
  hasNotificationBeenShown,
  markNotificationAsShown,
  formatEventDate,
} from "../../utils/eventNotificationUtils";
import "./Events.css";

/* ======================
   EVENTS DATA
====================== */

const events = [
  {
    title: "Operation Zero Trust",
    date: "2026-02-12",
    type: "Campaign",
    status: "Live", // 👈 FORCE LIVE
    poster: "/images/image.png",
    link: "https://www.linkedin.com/posts/offsecdiary_operationzerotrust-cyberawareness-digitalsafety-activity-7426310633761193984-Pe_P?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAFIOg3MB3buMNnaylmOqC4csaUfvmQe66nQ&utm_campaign=copy_link"
  },

  {
    title: "RECKON 7.0",
    date: "2026-03-12",
    type: "Hackathon",
    status: "Closed",
    poster: "/images/Email header.jpg.jpeg",
    link: "https://www.linkedin.com/posts/dscjgi_reckon7-dscju-hackathon-ugcPost-7438645468949295104-UKy0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF01xKQBVBNN_oT01EkZaf5ZqpSeRBzIGvI"
  },

  {
    title: "OFSD Open Offensive CTF Challenge 2025",
    date: "2025-11-29",
    type: "CTF",
    status: "Closed",
    poster: "/images/CTFChallenge.png",
    link: "https://www.linkedin.com/posts/priyanshu-jangra-476a74240_cybersecurity-ctfchallenge2025-bugbounty-activity-7396554091881062402-OZWc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF01xKQBVBNN_oT01EkZaf5ZqpSeRBzIGvI"
  },

  {
    title: "Free Offensive Security Workshop (CISEH Orientation)",
    date: "2026-01-12",
    type: "Workshop",
    status: "Closed",
    poster: "/images/CISEHWorkshop.png",
    link: "https://www.linkedin.com/posts/offsecdiary_newyear-offsecdiary-hackculture-activity-7412834226229727233-ltFY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF01xKQBVBNN_oT01EkZaf5ZqpSeRBzIGvI"
  },

  {
    title: "Operation Zero Trust – First Awareness Session",
    date: "2026-02-17",
    type: "Campaign",
    status: "Closed",
    poster: "/images/image.png",
    link: "https://www.linkedin.com/posts/offsecdiary_offsecdiary-operationzerotrust-cyberawareness-activity-7427968912811692033-3A7v?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF01xKQBVBNN_oT01EkZaf5ZqpSeRBzIGvI"
  },

  {
    title: "Hack-N-Win 3.0 Hackathon",
    date: "March 2026",
    type: "Hackathon",
    status: "Closed",
    poster: "/images/hacknwiin-3.0.jpeg.jpeg",
    link: "file:///C:/Users/DELL/Downloads/offsecdiary_hacknwin_card%20(1)%20(1).html#"
  }
];

/* ======================
   TYPE COLORS
====================== */

const typeColors = {
  Workshop: "#ff1a1a",
  Conference: "#3b82f6",
  Training: "#f97316",
  CTF: "#22c55e",
  Campaign: "#ff1a1a"
};

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { alert, warning } = useNotification();

  const today = new Date();

  /* ======================
     CHECK FOR NOTIFICATIONS
  ====================== */

  useEffect(() => {
    // Check for live events
    const liveEvents = events.filter(isEventLive);
    liveEvents.forEach((event) => {
      const notificationKey = `event_live_${event.title}`;
      if (!hasNotificationBeenShown(notificationKey)) {
        alert(
          "🔴 EVENT LIVE",
          `"${event.title}" is happening right now! ${event.type} registration is open.`,
          {
            duration: 0, // Don't auto-dismiss
            dismissible: true,
          }
        );
        markNotificationAsShown(notificationKey);
      }
    });

    // Check for events closing soon (within 24 hours)
    const closingSoonEvents = events.filter((e) => isEventClosingSoon(e, 24));
    closingSoonEvents.forEach((event) => {
      const notificationKey = `event_closing_${event.title}`;
      if (!hasNotificationBeenShown(notificationKey)) {
        warning(
          "⏰ CLOSING SOON",
          `"${event.title}" (${event.type}) is closing soon on ${formatEventDate(event.date)}. Hurry!`,
          {
            duration: 8000,
            dismissible: true,
          }
        );
        markNotificationAsShown(notificationKey);
      }
    });
  }, [alert, warning]);

  /* ======================
     CUSTOM STATUS LOGIC
  ====================== */

  const categorizedEvents = events.map((event) => {
    let statusKey;

    // 🔥 FORCE LIVE ONLY for this event
    if (event.title === "Operation Zero Trust") {
      statusKey = "live";
    } else {
      const eventDate = new Date(event.date);

      if (eventDate.toDateString() === today.toDateString()) {
        statusKey = "live";
      } else if (eventDate > today) {
        statusKey = "upcoming";
      } else {
        statusKey = "past";
      }
    }

    return {
      ...event,
      statusKey,
      displayStatus:
        statusKey === "past"
          ? "Closed"
          : statusKey === "live"
            ? "Live"
            : "Upcoming"
    };
  });

  /* ======================
     SORTING (LIVE FIRST)
  ====================== */

  const sortedEvents = [...categorizedEvents].sort((a, b) => {
    if (a.statusKey === "live") return -1;
    if (b.statusKey === "live") return 1;
    return new Date(b.date) - new Date(a.date);
  });

  const filteredEvents = sortedEvents.filter((e) => {
    if (activeTab === "past") return e.statusKey === "past";
    if (activeTab === "live") return e.statusKey === "live";
    if (activeTab === "upcoming") return e.statusKey === "upcoming";
    return true;
  });

  return (
    <div className="events-page">

      {/* HEADER */}
      <header className="custom-section-header">
        <div className="header-tag-box">
          <span className="header-tag">[ OPERATION SCHEDULE ]</span>
        </div>

        <div className="header-main-title">
          <h2>Events</h2>
        </div>

        <div className="events-tabs">
          {["upcoming", "live", "past", "all"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all" ? "ALL EVENTS" : tab.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* EVENTS */}
      <section className="events-list">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="events-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  className="event-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span
                    className="event-type"
                    style={{ color: typeColors[event.type] }}
                  >
                    {event.type}
                  </span>

                  <img
                    src={event.poster}
                    alt={event.title}
                    className="event-poster"
                  />

                  <h3>
                    {event.title}
                    <br />
                  </h3>

                  {event.statusKey === "upcoming" && (
                    <div className="coming-soon-label">COMING SOON...</div>
                  )}

                  <div className="event-meta">
                    <span>
                      <Calendar size={14} />{" "}
                      {new Date(event.date).toDateString()}
                    </span>

                    <span>
                      <Users size={14} /> {event.displayStatus}
                    </span>
                  </div>

                  <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="event-btn"
                  >
                    VIEW <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="empty-events-state">
                {activeTab === "upcoming" ? "COMING SOON..." : "No events available."}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}