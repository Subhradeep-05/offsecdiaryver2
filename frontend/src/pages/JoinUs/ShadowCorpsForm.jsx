import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, ArrowRight } from "lucide-react";
import "./join-forms.css";

export default function ShadowCorpsForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    fieldOfStudy: "",
    careerDegree: "",
    institutionName: "",
    city: "",
    state: "",
    socialHandle: "",
    cybersecurityTalks: [],
    joinShadowCorps: "",
    priorExperience: "",
    leadershipActivities: "",
    resource: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const fieldOfStudyOptions = ["College", "School", "Working Professional", "Other"];
  const joinOptions = ["Yes", "No", "Both"];
  const cybersecurityTalksOptions = [
    "Technical & Security",
    "Operational and Management Ideas",
    "Digital Security",
    "General & Foundational Ideas"
  ];

  const handleCybersecurityTalksChange = (option) => {
    setForm({
      ...form,
      cybersecurityTalks: form.cybersecurityTalks.includes(option)
        ? form.cybersecurityTalks.filter(item => item !== option)
        : [...form.cybersecurityTalks, option]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const payload = { 
      ...form, 
      cybersecurityTalks: form.cybersecurityTalks.join(", "),
      formType: "SHADOW CORPS" 
    };

    await fetch("/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });
    alert("APPLICATION SUBMITTED\nWe'll review your Shadow Corps application and get back to you soon!");
    setForm({
      name: "",
      contact: "",
      email: "",
      address: "",
      fieldOfStudy: "",
      careerDegree: "",
      institutionName: "",
      city: "",
      state: "",
      socialHandle: "",
      cybersecurityTalks: [],
      joinShadowCorps: "",
      priorExperience: "",
      leadershipActivities: "",
      resource: ""
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
         
         <span className="header-tag">[ SHADOW CORPS APPLICATION ]</span>
            <h2 className="section-title">
            <span className="title-line"></span>
            SHADOW CORPS APPLICATION
            <span className="title-line"></span>
          </h2>
          
          <div className="form-title">
          </div>
          <p className="form-description">
            Join our Shadow Corps program. Lead security initiatives, build community, and drive cybersecurity awareness on your campus.
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
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </motion.div>

            {/* Contact Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <label htmlFor="contact">Contact</label>
              <input
                id="contact"
                type="tel"
                placeholder="Your contact number"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
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

            {/* Address Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                placeholder="Your residential address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
            </motion.div>

            {/* Field of Study */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="fieldOfStudy">Field of Study</label>
              <select
                id="fieldOfStudy"
                value={form.fieldOfStudy}
                onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
                required
              >
                <option value="">-- SELECT --</option>
                {fieldOfStudyOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </motion.div>

            {/* Career / Degree */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <label htmlFor="careerDegree">Career / Degree</label>
              <input
                id="careerDegree"
                type="text"
                placeholder="e.g., B.Tech CSE, BCA, High School, etc."
                value={form.careerDegree}
                onChange={(e) => setForm({ ...form, careerDegree: e.target.value })}
                required
              />
            </motion.div>

            {/* Name of Institution */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="institutionName">Name of the Institution</label>
              <input
                id="institutionName"
                type="text"
                placeholder="Your college/school/organization name"
                value={form.institutionName}
                onChange={(e) => setForm({ ...form, institutionName: e.target.value })}
                required
              />
            </motion.div>

            {/* City */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="Your city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </motion.div>

            {/* State */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="Your state"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </motion.div>

            {/* Social Handle */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <label htmlFor="socialHandle">LinkedIn / Instagram Social Handle</label>
              <input
                id="socialHandle"
                type="text"
                placeholder="Your social media profile links or handles"
                value={form.socialHandle}
                onChange={(e) => setForm({ ...form, socialHandle: e.target.value })}
                required
              />
            </motion.div>

            {/* Cybersecurity Talks */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <label>Part of any Cybersecurity-related College Talks</label>
              <div className="checkbox-group-inline">
                {cybersecurityTalksOptions.map((option) => (
                  <label key={option} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={form.cybersecurityTalks.includes(option)}
                      onChange={() => handleCybersecurityTalksChange(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Join Shadow Corps */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
            >
              <label className="section-label">Do you want to join in Shadow Corps?</label>
              <div className="radio-options">
                {joinOptions.map((option) => (
                  <label key={option} className="radio-option">
                    <input
                      type="radio"
                      name="joinShadowCorps"
                      value={option}
                      checked={form.joinShadowCorps === option}
                      onChange={(e) => setForm({ ...form, joinShadowCorps: e.target.value })}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Prior Experience */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="priorExperience">Any prior experience in the field you chose?</label>
              <textarea
                id="priorExperience"
                placeholder="Describe any relevant experience you have..."
                value={form.priorExperience}
                onChange={(e) => setForm({ ...form, priorExperience: e.target.value })}
                rows="3"
              />
            </motion.div>

            {/* Leadership Activities */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 }}
            >
              <label htmlFor="leadershipActivities">If student, address the activities & what you take part and any position of leadership you held (not in school)</label>
              <textarea
                id="leadershipActivities"
                placeholder="Tell us about your leadership roles and activities outside of school..."
                value={form.leadershipActivities}
                onChange={(e) => setForm({ ...form, leadershipActivities: e.target.value })}
                rows="4"
                required
              />
            </motion.div>

            {/* Resource */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="resource">Resource</label>
              <input
                id="resource"
                type="text"
                placeholder="How did you hear about Shadow Corps? (e.g., Social Media, Friend, Event, etc.)"
                value={form.resource}
                onChange={(e) => setForm({ ...form, resource: e.target.value })}
                required
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
