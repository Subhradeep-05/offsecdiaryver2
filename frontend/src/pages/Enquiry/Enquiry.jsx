import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Send,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  Shield,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Mail
} from "lucide-react";

import "./Enquiry.css"; // create this file for styling
import logo from "/bootlogo_noname1.PNG"; // put your logo in public folder

const faqs = [
  {
    question: "HOW CAN I JOIN THE OFFSECDIARY COMMUNITY?",
    answer: "Follow OffSecDiary on LinkedIn, Instagram, and X. WhatsApp Channel coming soon."
  },
  {
    question: "ARE OFFSECDIARY WORKSHOPS PAID?",
    answer: "No. All OffSecDiary workshops are completely free."
  },
  {
    question: "CAN I JOIN OFFSECDIARY AS AN INTERN?",
    answer: "Yes. Visit the Join Us section for current openings."
  },
  {
    question: "ARE CERTIFICATES PROVIDED?",
    answer: "Yes. Certificates are issued for all programs."
  }

  , {
    question: "HOW DO I REGISTER FOR EVENTS OR WORKSHOPS?",
    answer: "All registrations are announced through our official website and social platforms. Each event has a dedicated registration link when it goes live."
  },
  {
    question: "CAN COLLEGES OR COMPANIES COLLABORATE WITH OFFSECDIARY?",
    answer: "Absolutely. We collaborate for workshops, training sessions, Workshops and Academics. Use the Enquiry page to initiate contact."
  },
  {
    question: "IS OFFSECDIARY A CERTIFIED ORGANIZATION?",
    answer: "OffSecDiary operates as an independent cybersecurity research and training initiative. Certificates issued are skill-based participation and achievement certificates."
  }

];

function FlipCard({ question, answer }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className="flip-card"
      onClick={() => setFlip(!flip)}
    >
      <motion.div
        className="flip-inner"
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div className="flip-front">
          <HelpCircle className="icon" />
          <h3>{question}</h3>
          <span>View Answer →</span>
        </div>

        {/* Back */}
        <div className="flip-back">
          <p>{answer}</p>
          <small>Click to flip back</small>
        </div>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || 'Pentest';

  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    service: "",
    details: ""
  });

  useEffect(() => {
    setForm(prev => ({ ...prev, service: serviceParam }));
  }, [serviceParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      ...form, 
      organization: form.org,
      formType: "ENQUIRY" 
    };

    await fetch("/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });
    alert("TRANSMISSION SUCCESSFUL\nSecure channel established.");
    setForm({ name: "", email: "", org: "", service: "Pentest", details: "" });
  };

  return (
    <div className="contact-page">
      {/* HEADER */}
      <header className="custom-section-header">
        <div className="header-tag-box">
          <span className="header-tag">[ ENQUIRY TERMINAL ]</span>
        </div>
        <div className="header-main-title">
          <div className="accent-line left"></div>
          <h2>Contact Us</h2>
          <div className="accent-line right"></div>
        </div>
        <p className="contact-system-subtitle">[ INITIATING SECURE COMMUNICATION CHANNEL ]</p>
      </header>

      <div className="contact-grid">

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="contact-form"
        >
          <h2><MessageSquare /> Request Intel</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Operator Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Comm Link (Email)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              placeholder="Organization"
              value={form.org}
              onChange={(e) => setForm({ ...form, org: e.target.value })}
            />
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option value="">-- SELECT A SERVICE --</option>
              <option value="CTF BUILDING & HOSTING">CTF Building & Hosting</option>
              <option value="CYBER WARFARE TRAINING">Cyber Warfare Training</option>
              <option value="RESEARCH & DEVELOPMENT">Research & Development</option>
              <option value="FREE WORKSHOPS">Free Workshops</option>
              <option value="PENETRATION TESTING & VA">Penetration Testing & VA</option>
              <option value="SECURITY TOOL DEVELOPMENT">Security Tool Development</option>
              <option value="EXPERT SESSIONS">Expert Sessions</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              placeholder="Mission Details..."
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              required
            />
            <button type="submit">
              TRANSMIT ENQUIRY <Send size={18} />
            </button>
          </form>
        </motion.div>

        {/* SIDE INFO */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="contact-info"
        >
          <h3> Contact Channels</h3>
          <p>📧 offsecdiary@gmail.com</p>
          <p>📞 +91 8871440062</p>

          <div className="socials">
            <a href="https://www.instagram.com/offsecdiary/?hl=en" target="_blank"><Instagram /></a>
            <a href="https://www.linkedin.com/company/offsecdiary/posts/?feedView=all" target="_blank"><Linkedin /></a>
            <a href="https://www.facebook.com/people/OffSec-Diary/61582379024581/#" target="_blank"><Facebook /></a>
          </div>

          <div className="official-box">
            <Shield />
            <p>
              [SYSTEM ADVISORY]
              Use email or secure enquiry for sensitive communication.
            </p>
          </div>
        </motion.div>

      </div>

      {/* ================= FAQ HEADER ================= */}
      <section className="faq-section">
        <header className="custom-section-header" style={{ marginTop: '100px' }}>
          <div className="header-tag-box">
            <span className="header-tag">[ KNOWLEDGE BASE ]</span>
          </div>
          <div className="header-main-title">
            <div className="accent-line left"></div>
            <h2>Debriefing FAQ</h2>
            <div className="accent-line right"></div>
          </div>
        </header>

        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <FlipCard key={i} {...faq} />
          ))}
        </div>
      </section>

    </div>
  );
}
