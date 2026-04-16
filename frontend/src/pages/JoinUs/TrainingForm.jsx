import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, ArrowRight } from "lucide-react";
import "./join-forms.css";

export default function TrainingForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    duration: "",
    motivation: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const payload = { ...form, formType: "CERTIFICATIONS" };

    await fetch("/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });
    alert("APPLICATION SUBMITTED\nWe'll review your application and get back to you soon!");
    setForm({
      name: "",
      email: "",
      phone: "",
      education: "",
      experience: "",
      duration: "",
      motivation: ""
    });
  };

  return (
    <motion.div className="form-page">
      <button className="back-button" onClick={() => navigate("/joinus")}>
        <ArrowLeft size={20} /> Back to Join Us
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="form-container"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="form-header"
        >
          <div className="form-tag-box">
            <span className="form-tag">[ TRAINING APPLICATION ]</span>
          </div>
          <div className="form-title">
            <div className="accent-line left"></div>
            <h1>Training Programs</h1>
            <div className="accent-line right"></div>
          </div>
          <p className="form-description">
            Apply for our comprehensive offensive security training programs. Select your preferred duration and tell us about your goals.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="form-section"
        >
          <form onSubmit={handleSubmit} className="application-form">
            {/* Name Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </motion.div>

            {/* Phone Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Your contact number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </motion.div>

            {/* Education Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <label htmlFor="education">Educational Background</label>
              <input
                id="education"
                type="text"
                placeholder="e.g., B.Tech CSE, BCA, etc."
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
              />
            </motion.div>

            {/* Experience Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="experience">Relevant Experience</label>
              <input
                id="experience"
                type="text"
                placeholder="Any previous security experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              />
            </motion.div>

            {/* Training Duration */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <label htmlFor="duration">Preferred Training Duration</label>
              <select
                id="duration"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                required
              >
                <option value="">-- SELECT DURATION --</option>
                <option value="1-month">1 Month – Fundamentals</option>
                <option value="3-months">3 Months – Practical Exploitation</option>
                <option value="6-months">6 Months – Advanced Research</option>
              </select>
            </motion.div>

            {/* Motivation Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="motivation">What motivates you to join this training?</label>
              <textarea
                id="motivation"
                placeholder="Tell us about your goals and what you want to learn..."
                value={form.motivation}
                onChange={(e) => setForm({ ...form, motivation: e.target.value })}
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
              SUBMIT APPLICATION
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
            <p>Your application is secure and will be reviewed by our team within 3-5 business days.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
