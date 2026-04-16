import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, ArrowRight } from "lucide-react";
import "./enquiry-terminal.css";

const servicesData = [
  {
    id: 0,
    title: "CTF DESIGNING & HOSTING",
    description:
      "Design and hosting of real-world Capture The Flag challenges based on offensive security scenarios, attack methodologies, and practical exploitation techniques.",
  },
  {
    id: 1,
    title: "OFFENSIVE SECURITY TRAINING",
    description:
      "Comprehensive training programs on offensive security techniques, ethical hacking, and exploitation methodologies for professionals and beginners.",
  },
  {
    id: 2,
    title: "RESEARCH & DEVELOPMENT",
    description:
      "Custom R&D services for developing security tools, exploits, and methodologies tailored to your organizational needs.",
  },
  {
    id: 3,
    title: "OPEN WORKSHOPS",
    description:
      "Community-driven workshops covering offensive security basics, case studies, and hands-on practical sessions.",
  },
  {
    id: 4,
    title: "PENETRATION TESTING & VA",
    description:
      "Professional penetration testing and vulnerability assessment services for comprehensive security evaluations.",
  },
  {
    id: 5,
    title: "SECURITY TOOL DEVELOPMENT",
    description:
      "Custom security tool development, enhancement, and integration services for advanced threat analysis.",
  },
  {
    id: 6,
    title: "EXPERT SESSIONS",
    description:
      "One-on-one expert consultation sessions for deep dives into specific offensive security topics.",
  }
];

export default function EnquiryTerminal() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get service from URL if provided, otherwise start with empty
  const serviceIndex = id ? parseInt(id) : null;
  const initialService = serviceIndex !== null && servicesData[serviceIndex]
    ? servicesData[serviceIndex].title
    : "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    service: initialService,
    details: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const payload = { ...form, formType: "ENQUIRY" };

    await fetch("/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    alert("TRANSMISSION SUCCESSFUL\nSecure channel established.");
    setForm({
      name: "",
      email: "",
      org: "",
      service: "",
      details: "",
    });
  };

  return (
    <motion.div className="enquiry-terminal-page">
      <button className="back-button" onClick={() => navigate(id ? `/know-more/${id}` : "/services")}>
        <ArrowLeft size={20} /> {id ? "Back to Service Details" : "Back to Services"}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="enquiry-terminal-container"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="terminal-header"
        >
          <div className="terminal-title">
            <div className="accent-line left"></div>
            <h2 className="section-title">ESTABLISH SECURE COMMUNICATION</h2>
            <div className="accent-line right"></div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="terminal-form-section"
        >
          <form onSubmit={handleSubmit} className="terminal-form">
            {/* Name Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="name">Operator Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <label htmlFor="email">Secure Comm Link (Email)</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </motion.div>

            {/* Organization Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="org">Organization / Department</label>
              <input
                id="org"
                type="text"
                placeholder="Your organization name"
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
              />
            </motion.div>

            {/* Service Selection */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <label htmlFor="service">Service Requested</label>
              <select
                id="service"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                required
              >
                <option value="">-- SELECT A SERVICE --</option>
                <option value="CTF DESIGNING & HOSTING">CTF Building & Hosting</option>
                <option value="OFFENSIVE SECURITY TRAINING">Offensive Security Training</option>
                <option value="RESEARCH & DEVELOPMENT">Research & Development</option>
                <option value="OPEN WORKSHOPS">Free Workshops</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>

            {/* Details Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="details">Mission Details & Requirements</label>
              <textarea
                id="details"
                placeholder="Describe your security needs, timeline, budget, and any specific requirements..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                required
                rows="6"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitted}
            >
              <Send size={18} />
              TRANSMIT ENQUIRY
              <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Security Notice */}
          <motion.div
            className="security-notice"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="notice-badge">🔒</span>
            <p>Your information is encrypted and will be handled with strict confidentiality.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
