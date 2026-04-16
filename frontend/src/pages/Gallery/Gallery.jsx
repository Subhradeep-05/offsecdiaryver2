import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import "./Gallery.css";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const galleryEvents = [
    {
      id: 1,
      title: "Reckon 7.0 – Sponsorship & Judging",
      type: "HACKATHON",
      date: "2026-03-14",
      dateDisplay: "14–15 MAR 2026",
      status: "Closed",
      overview: "OffSecDiary proudly participated in Reckon 7.0 as a sponsor and part of the judging panel. The team engaged on-ground with participants, evaluated innovative cybersecurity and tech solutions, and contributed to fostering a competitive and collaborative hackathon environment.",
      links: [
        { title: "Devfolio", url: "https://reckon-7.devfolio.co/overview" },
        { title: "LinkedIn", url: "https://www.linkedin.com/posts/dscjgi_reckon7-dscju-hackathon-ugcPost-7438645468949295104-UKy0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFIOg3MB3buMNnaylmOqC4csaUfvmQe66nQ" }
      ],
      img: "/images/Email header.jpg.jpeg",
      photos: []
    },
    {
      id: 2,
      title: "Operation Zero Trust – First Awareness Session",
      type: "CAMPAIGN",
      date: "2026-02-17",
      dateDisplay: "17 FEB 2026",
      status: "Closed",
      overview: "A cyber awareness session focused on understanding real-world threats such as phishing and online fraud. The session explored how attackers manipulate human behavior and provided practical guidance on safeguarding digital identity, along with clear steps to respond to and report cyber incidents.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/posts/offsecdiary_offsecdiary-operationzerotrust-cyberawareness-activity-7427968912811692033-3A7v?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFIOg3MB3buMNnaylmOqC4csaUfvmQe66nQ" }
      ],
      img: "/images/OperationZeroTrust.png",
      photos: []
    },
    {
      id: 3,
      title: "Operation Zero Trust",
      type: "CAMPAIGN",
      date: "2026-02-12",
      dateDisplay: "12 FEB 2026",
      status: "Live",
      overview: "A live cyber awareness initiative focused on building a Zero Trust mindset. The campaign highlights how modern cyber attacks unfold in real-world scenarios, emphasizing human vulnerabilities, digital behavior patterns, and proactive safety practices to prevent cyber incidents before they occur.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/posts/offsecdiary_operationzerotrust-cyberawareness-digitalsafety-activity-7426310633761193984-Pe_P?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFIOg3MB3buMNnaylmOqC4csaUfvmQe66nQ" },
        { title: "Register Now", url: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__iK5hvhURUhFV1kzVVNaNThXWE1DUk0yMUpKMkZIVi4u&route=shorturl" }
      ],
      img: "/images/OperationZeroTrust.png",
      photos: []
    },
    {
      id: 4,
      title: "CISEH Orientation Workshop",
      type: "WORKSHOP",
      date: "2026-01-12",
      dateDisplay: "12 JAN 2026",
      status: "Closed",
      overview: "An orientation session introducing the CISEH cybersecurity certification program. The workshop highlighted core offensive security concepts, provided clarity on the program structure, and offered insights into hands-on learning through guided sessions and real-world problem-solving approaches.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/posts/offsecdiary_newyear-offsecdiary-hackculture-activity-7412834226229727233-ltFY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFIOg3MB3buMNnaylmOqC4csaUfvmQe66nQ" }
      ],
      img: "/images/CISEHWorkshop.png",
      photos: []
    },
    {
      id: 5,
      title: "OFSD Open Offensive CTF Challenge 2025",
      type: "CTF",
      date: "2025-11-29",
      dateDisplay: "29 NOV 2025",
      status: "Closed",
      overview: "A 6-hour live Capture The Flag (CTF) competition designed to simulate real-world cybersecurity challenges. Participants engaged in hands-on tasks across web exploitation, cryptography, forensics, and OSINT, testing their analytical thinking and vulnerability exploitation skills.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/posts/offsecdiary_offsecdiary-cyberinternship-hackculture-activity-7396221562313449472-2tfl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFIOg3MB3buMNnaylmOqC4csaUfvmQe66nQ" }
      ],
      img: "/images/CTFChallenge.png",
      photos: []
    },
    {
      id: 6,
      title: "Offensive Security Workshop",
      type: "WORKSHOP",
      date: "2025-10-29",
      dateDisplay: "29 OCT 2025",
      status: "Closed",
      overview: "An introductory workshop focused on building an attacker's mindset and understanding the fundamentals of offensive security. Participants explored the cyber kill chain, basic ethical hacking concepts, and live reconnaissance demonstrations, along with a beginner-friendly cybersecurity career roadmap.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/posts/offsecdiary_offsecdiary-offensivesecurity-ethicalhacking-activity-7388068549182795776-S9bV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFIOg3MB3buMNnaylmOqC4csaUfvmQe66nQ" }
      ],
      img: "/images/FreeOffensiveSecWorkshop.png",
      photos: []
    }
  ];

  // Sort by date (latest to oldest)
  const sortedGalleryEvents = [...galleryEvents].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filters = ["ALL", "WORKSHOP", "HACKATHON", "CAMPAIGN", "CTF"];

  const filteredItems =
    activeFilter === "ALL"
      ? sortedGalleryEvents
      : sortedGalleryEvents.filter((item) => item.type === activeFilter);

  // ESC + Arrow navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === 0 ? filteredItems.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filteredItems.length]);

  return (
    <div className="gallery-page">
      {/* HERO */}
      {/* ================= GALLERY HEADER ================= */}
<header className="custom-section-header">
  <div className="header-tag-box">
    <span className="header-tag">[ MEDIA ARCHIVE ]</span>
  </div>
  <div className="header-main-title">
    <div className="accent-line left"></div>
    <h2>Gallery</h2>
    <div className="accent-line right"></div>
  </div>
  <p className="gallery-subtitle">Visual Archives of Operations & Missions</p>
</header>

      {/* FILTERS */}
      <div className="gallery-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "active-filter" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* GRID */}
      <motion.div
  className="gallery-grid"
  layout
>
  <AnimatePresence>
    {filteredItems.map((item, index) => (
      <motion.div
        className="gallery-card"
        key={item.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={() => setSelectedIndex(index)}
      >
        <img
  src={item.img}
  alt={item.title}
  loading="lazy"
  onLoad={(e) => e.target.classList.add("loaded")}
/>
        <div className="gallery-info">
          <h3>{item.title}</h3>
          <p>{item.type} • {item.dateDisplay}</p>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>


      {/* MODAL VIEW */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="gallery-modal-content"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="gallery-close" onClick={() => setSelectedIndex(null)}>✕</span>

              <div className="scanline-overlay"></div>

              <img
                src={filteredItems[selectedIndex].img}
                alt={filteredItems[selectedIndex].title}
              />

              <div className="gallery-modal-info">
                <h2>{filteredItems[selectedIndex].title}</h2>
                
                <div className="event-meta">
                  <span className="event-date">{filteredItems[selectedIndex].dateDisplay}</span>
                  <span className={`event-status ${filteredItems[selectedIndex].status.toLowerCase()}`}>
                    {filteredItems[selectedIndex].status}
                  </span>
                </div>

                <div className="event-overview">
                  <h3>Overview</h3>
                  <p>{filteredItems[selectedIndex].overview}</p>
                </div>

                <div className="event-links">
                  {filteredItems[selectedIndex].links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="explore-link"
                    >
                      {link.title}
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>

                <p className="gallery-hint">
                  [ ESC to close | ← → to navigate ]
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
