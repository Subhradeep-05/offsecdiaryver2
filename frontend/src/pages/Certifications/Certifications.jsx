import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { isNewAddition, hasNotificationBeenShown, markNotificationAsShown } from "../../utils/eventNotificationUtils";
import "./Certifications.css";
import certificationsData from "../../data/certifications.json";
import { Route } from "react-router-dom";

const categories = [
  { id: "ctf-part",     label: "CTF Participation",   json: "/data/ctf_participation.json" },
  { id: "ctf-win",      label: "CTF Winners",          json: "/data/ctf_winners.json" },
  { id: "intern-cert",  label: "Certifications",       json: "/data/internship_certificates.json" },
  { id: "guest-cert",   label: "Guest Speakers",       json: "/data/internship_guest_speakers.json" },
  { id: "sr-cert",      label: "Special Recognition",  json: "/data/internship_special_recognition.json" },
  { id: "ctf-badge",    label: "CTF Badges",           json: "/data/ctf_winner_badges.json" },
  { id: "shadow-badge", label: "Shadow Corps",         json: "/data/shadow_corps_badges.json" },
  { id: "cadet-badge",  label: "Cadet Badges",         json: "/data/cadet_badges.json" },
];

const LEVEL_COLOR = {
  Beginner:     { bg: "#0d2b1a", border: "#22c55e", text: "#22c55e" },
  Intermediate: { bg: "#1a1a00", border: "#eab308", text: "#eab308" },
  Advanced:     { bg: "#2b0d0d", border: "#ef4444", text: "#ef4444" },
};

// Add a mapping for certification titles to their respective form URLs
const FORM_URLS = {
  RedVector: "/redvector-form",
  CISEH: "/ciseh-form",
  OCDS: "/ocds-form",
  OCDFS: "/ocdfs-form",
  CARLA: "/carla-form",
  COTMS: "/cotms-form",
  OCDPA: "/ocdpa-form",
  OCMEF: "/ocmef-form",
  OCWS: "/ocws-form",
};

/* ── Single accordion card ─────────────────────────────────── */
function CertCard({ cert, index, isActive, onToggle, certificationBadges }) {
  const lvl = LEVEL_COLOR[cert.level] || LEVEL_COLOR["Advanced"];
  const badgeImage = certificationBadges[cert.title]?.badge_image;

  return (
    <motion.div
      className={`acc-card acc-card--expanded ${isActive ? "acc-card--open" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      {/* Top accent bar */}
      <div className="acc-card__bar" />

      {/* ── Header ── */}
      <div className="acc-card__header" onClick={onToggle}>
        {/* Badge Image */}
        {badgeImage && (
          <div className="acc-card__badge">
            <img src={badgeImage} alt={`${cert.title} Badge`} className="badge-img" />
          </div>
        )}

        {/* Title block */}
        <div className="acc-card__titles">
          <span className="acc-card__code">{cert.title}</span>
          <span className="acc-card__fullname">{cert.fullName}</span>
        </div>

        {/* Right: toggle */}
        <motion.div
          className="acc-card__toggle"
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          +
        </motion.div>
      </div>

      {/* ── Body ── */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="body"
            className="acc-card__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="acc-card__body-inner">

              {/* About */}
              <div className="acc-body__about">
                <span className="acc-body__label">// ABOUT</span>
                <p>{cert.about}</p>
              </div>

              <div className="acc-body__grid">
                {/* Highlights */}
                <div className="acc-body__col">
                  <span className="acc-body__label">// HIGHLIGHTS</span>
                  <ul className="acc-body__list">
                    {cert.highlights.map((item, i) => (
                      <li key={i}><span className="li-dot" />{ item}</li>
                    ))}
                  </ul>
                </div>

                {/* Modules */}
                <div className="acc-body__col">
                  <span className="acc-body__label">// CORE MODULES</span>
                  <ul className="acc-body__list">
                    {cert.modules.map((item, i) => (
                      <li key={i}><span className="li-dot" />{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                {cert.tools && cert.tools.length > 0 && (
                  <div className="acc-body__col">
                    <span className="acc-body__label">// TOOLS</span>
                    <div className="acc-body__tags">
                      {cert.tools.map((t, i) => (
                        <span key={i} className="acc-body__tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Curriculum */}
                {cert.curriculum && cert.curriculum.length > 0 && (
                  <div className="acc-body__col">
                    <span className="acc-body__label">// CURRICULUM</span>
                    <ol className="acc-body__list acc-body__list--ol">
                      {cert.curriculum.map((item, i) => (
                        <li key={i}><span className="li-num">{String(i + 1).padStart(2, "0")}</span>{item}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Footer row */}
              <div className="acc-body__footer">
                <div className="acc-body__mode">
                  <span className="acc-body__label">MODE</span>
                  <span>{cert.mode}</span>
                </div>
                <button
                  className="acc-body__enroll"
                  onClick={() => {
                    const formUrl = FORM_URLS[cert.title] || "/"; // Default to home if no URL is found
                    console.log("Certification Title:", cert.title);
                    console.log("Form URL:", formUrl);
                    window.open(formUrl, "_self"); // Open the form in the same tab
                  }}
                >
                  <span>ENROLL NOW</span>
                  <span className="enroll-arrow">→</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Certifications section ────────────────────────────────── */
function CertificationsSection() {
  const [activeId, setActiveId] = useState(null);
  const [certificationBadges, setCertificationBadges] = useState({});

  useEffect(() => {
    async function fetchBadges() {
      try {
        const response = await fetch("/data/certification_badges.json");
        const data = await response.json();
        setCertificationBadges(data);
      } catch (error) {
        console.error("Failed to fetch certification badges:", error);
      }
    }

    fetchBadges();
  }, []);

  return (
    <div className="certifications-section">
      <div className="custom-section-header">
        <div className="header-tag-box">
          <span className="header-tag">[ CERTIFICATIONS ]</span>
        </div>
        <div className="header-main-title">
          <div className="accent-line left" />
          <h2>Cybersecurity Certifications</h2>
          <div className="accent-line right" />
        </div>
        <p className="section-subtext">
          Structured, research-driven programs designed to build real-world
          offensive and defensive security skills.
        </p>
      </div>

      <div className="certification-accordion">
        {certificationsData.certifications.map((cert, i) => (
          <CertCard
            key={cert.id}
            cert={cert}
            index={i}
            isActive={activeId === cert.id}
            onToggle={() => setActiveId((p) => (p === cert.id ? null : cert.id))}
            certificationBadges={certificationBadges}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────── */
export default function Certifications() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { success } = useNotification();

  const [activeCategory, setActiveCategory] = useState(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // if a category id is provided in the url, activate that category
  useEffect(() => {
    if (id) {
      const cat = categories.find(c => c.id === id);
      setActiveCategory(cat || null);
      setResult(null);
    }
  }, [id]);

  /* ======================
     CHECK FOR NEW CERTIFICATIONS
  ====================== */

  useEffect(() => {
    // Check for newly added certifications
    if (certificationsData && certificationsData.certifications) {
      certificationsData.certifications.forEach((cert) => {
        if (cert.dateAdded && isNewAddition(cert, 7)) {
          const notificationKey = `cert_new_${cert.id}`;
          if (!hasNotificationBeenShown(notificationKey)) {
            success(
              "✨ NEW CERTIFICATION",
              `"${cert.title}" (${cert.fullName}) has been added to our catalog!`,
              {
                duration: 6000,
                dismissible: true,
              }
            );
            markNotificationAsShown(notificationKey);
          }
        }
      });
    }
  }, [success]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!activeCategory) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(activeCategory.json);
      const data = await res.json();
      const info = data[input.trim().toUpperCase()];

      if (!info) {
        setResult({ valid: false });
      } else {
        setResult({ valid: true, data: info });
      }
    } catch {
      setResult({ error: true });
    }

    setLoading(false);
  };

  return (
    <div className="cert-page">
      <CertificationsSection />

      {/* HEADER */}
      <div className="custom-section-header">
        <div className="header-tag-box">
          <span className="header-tag">[ VERIFICATION PORTAL ]</span>
        </div>
        <div className="header-main-title">
          <div className="accent-line left"></div>
          <h2>UNIVERSAL CERTIFICATE VERIFICATION</h2>
          <div className="accent-line right"></div>
        </div>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="cert-category-grid">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cert-btn ${activeCategory?.id === cat.id ? "active" : ""}`}
            onClick={() => {
              // if already active, clear and return to base URL
              if (activeCategory?.id === cat.id) {
                navigate("/certifications");
                return;
              }
              navigate(`/certifications/${cat.id}`);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* VERIFICATION PANEL */}
      {activeCategory && (
        <div className="verify-wrapper">
          <h3>{activeCategory.label}</h3>

          <form onSubmit={handleVerify} className="verify-form">
            <input
              type="text"
              placeholder="Enter Certificate ID"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button type="submit">Verify</button>
          </form>

          <div className="results">
            {loading && <div className="loading">Checking...</div>}

            {result?.valid === false && (
              <div className="invalid">
                ❌ Certificate Not Found
              </div>
            )}

            {result?.error && (
              <div className="invalid">
                Error loading registry.
              </div>
            )}

            {result?.valid && (
              <div className="valid">
                ✅ Certificate Verified
                <div className="details">
                  {Object.entries(result.data).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.toUpperCase()}:</strong> {value}
                    </p>
                  ))}
                  {result.data.badge_image && (
                    <img
                      src={result.data.badge_image}
                      alt="Badge"
                      className="badge-img"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}