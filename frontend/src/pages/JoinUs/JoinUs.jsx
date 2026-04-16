import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./JoinUs.css";
import CertificationsForm from "./CertificationsForm";

export default function JoinUs() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="join-page">

      {/* HEADER */}

      <section className="unified-section">

        <div className="section-header">
          <span className="section-tag">[ JOIN THE NETWORK ]</span>

          <h2 className="section-title">
            <span className="title-line"></span>
            JOIN OFFSECDIARY
            <span className="title-line"></span>
          </h2>

          <p className="join-intro">
            Join OffSecDiary and become part of a growing cybersecurity ecosystem focused on research, innovation, and real-world security impact.
          </p>
        </div>

        {/* PROGRAM BLOCKS */}

        <div className="join-grid">

          {/* CERTIFICATIONS */}

          <JoinCard
            title="Certifications"
            points={[
              "Structured learning paths",
              "Practical hands-on training",
              "Industry-recognized credentials"
            ]}
            onClick={() => navigate("/certifications")}
            button="Explore Certifications"
          />

          {/* INTERNSHIP */}

          <JoinCard
            title="Internship Program"
            points={[
              "Hands-on research exposure",
              "Task-driven learning",
              "Mentorship & career growth"
            ]}
            onClick={() => navigate("/internship-form")}
            button="Apply for Internship"
          />

          {/* SHADOW CORPS */}

          <JoinCard
            title="Shadow Corps"
            points={[
              "Observe real-world operations",
              "Learn from industry experts",
              "Build professional network"
            ]}
            onClick={() => navigate("/shadow-corps-form")}
            button="Join Shadow Corps"
          />

          {/* SPEAKER */}

          <JoinCard
            title="OffSecDiary Speaker"
            points={[
              "Share your expertise",
              "Inspire community members",
              "Build thought leadership"
            ]}
            onClick={() => navigate("/speaker-form")}
            button="Become a Speaker"
          />

        </div>

        {/* MODAL FOR SPEAKER FORM */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="modal-title">Become an OffSecDiary Speaker</h3>
          <form className="speaker-form">
            <label>
              Name:
              <input type="text" name="name" placeholder="Your Name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" placeholder="Your Email" required />
            </label>
            <label>
              Expertise:
              <textarea name="expertise" placeholder="Your Area of Expertise" required />
            </label>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </Modal>

        {/* ELIGIBILITY */}

        <div className="eligibility-grid">

          <EligibilityCard
            title="We're Looking For"
            list={[
              "Passion for cybersecurity",
              "Strong ethical mindset",
              "Willingness for hands-on learning",
              "Commitment to community growth"
            ]}
          />

          <motion.div
            className="query-terminal"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/enquiry")}
          >
            <h3>Have a Query?</h3>
            <p>Click here to visit our enquiry page and get your questions answered.</p>
          </motion.div>

        </div>

      </section>

    </div>
  );
}

/* ================= CARD COMPONENTS ================= */

function JoinCard({ title, points, onClick, button }) {
  return (
    <motion.div
      className="join-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <h3>{title}</h3>

      <ul>
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <button onClick={onClick} className="join-btn">
        {button}
      </button>
    </motion.div>
  );
}

function EligibilityCard({ title, list }) {
  return (
    <motion.div
      className="eligibility-card"
      whileHover={{ scale: 1.02 }}
    >
      <h3>{title}</h3>

      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
