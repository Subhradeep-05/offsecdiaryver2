import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, ArrowRight } from "lucide-react";
import "./join-forms.css";

export default function InternshipForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    phone: "",
    location: "",
    aadhar: "",
    domain: "",
    experience: "",
    tools: "",
    skillLevel: "",
    hoursPerDay: "",
    workDemo: null,
    resumeLink: "",
    linkedin: "",
    discovery: "",
    reason: "",
    expectations: "",
    agree: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const payload = { ...form, formType: "INTERNSHIP" };

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    try {
      await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
      alert(
        "APPLICATION SUBMITTED\nWe'll review your internship application and get back to you soon!"
      );
      setForm({
        email: "",
        phone: "",
        location: "",
        aadhar: "",
        domain: "",
        experience: "",
        tools: "",
        skillLevel: "",
        hoursPerDay: "",
        workDemo: null,
        resumeLink: "",
        linkedin: "",
        discovery: "",
        reason: "",
        expectations: "",
        agree: false,
      });
    } catch (err) {
      alert("SUBMISSION FAILED\nSomething went wrong. Please try again.");
    } finally {
      setIsSubmitted(false);
    }
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="form-header"
        >
          <div className="form-tag-box">
            <span className="form-tag">[ INTERNSHIP APPLICATION ]</span>
          </div>
          <div className="form-title">
            <div className="accent-line left"></div>
            <h2 className="section-title">
              <span className="title-line"></span>
              INTERNSHIP PROGRAM
              <span className="title-line"></span>
            </h2>
            <div className="accent-line right"></div>
          </div>
          <p className="form-description">
            Apply for our hands-on internship program. Get real research exposure, task-driven learning, and mentorship from industry experts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="form-section"
        >
          <form onSubmit={handleSubmit} className="application-form">
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="location">City / Location</label>
              <input
                id="location"
                type="text"
                placeholder="Enter your city or location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="aadhar">Aadhar (Cert. Verification)</label>
              <input
                id="aadhar"
                type="text"
                placeholder="Enter your Aadhar number"
                value={form.aadhar}
                onChange={(e) => setForm({ ...form, aadhar: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="domain">Select the Domain You Want to Apply For</label>
              <select
                id="domain"
                value={form.domain}
                onChange={(e) => setForm({ ...form, domain: e.target.value })}
                required
              >
                <option value="">-- SELECT DOMAIN --</option>
                <option value="content-writing">Content Writing</option>
                <option value="ctf-developer">CTF Developer</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="software-development">Software Development</option>
                <option value="research-development">Research & Development (R&D)</option>
                 <option value="vapt intern">vapt intern</option>
                <option value="design-content-creation">Design & Content Creation</option>
                <option value="business-development">Business And Development Associate</option>
                <option value="mechatronics">Mechatronics (Remote)</option>
                <option value="data-analyst">Data Analyst</option>
                <option value="security-associate">Security Associate</option>
              </select>
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="experience">Do you have any prior experience in this domain?</label>
              <select
                id="experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                required
              >
                <option value="">-- SELECT EXPERIENCE LEVEL --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="basic-knowledge">Some basic knowledge</option>
              </select>
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="tools">What tools or concepts are you familiar with?</label>
              <textarea
                id="tools"
                placeholder="List the tools or concepts you are familiar with..."
                value={form.tools}
                onChange={(e) => setForm({ ...form, tools: e.target.value })}
                required
                rows="4"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="skillLevel">Rate your skill level for the selected domain</label>
              <select
                id="skillLevel"
                value={form.skillLevel}
                onChange={(e) => setForm({ ...form, skillLevel: e.target.value })}
                required
              >
                <option value="">-- SELECT SKILL LEVEL --</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="hoursPerDay">How many hours per day can you give?</label>
              <select
                id="hoursPerDay"
                value={form.hoursPerDay}
                onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })}
                required
              >
                <option value="">-- SELECT HOURS --</option>
                <option value="1-2">1-2 hours</option>
                <option value="2-3">2-3 hours</option>
                <option value="3-4">3-4 hours</option>
                <option value="4+">More than 4 hours</option>
              </select>
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="workDemo">Your Work Demo</label>
              <input
                id="workDemo"
                type="file"
                onChange={(e) => setForm({ ...form, workDemo: e.target.files[0] })}
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="resumeLink">Resume / Portfolio Link</label>
              <input
                id="resumeLink"
                type="url"
                placeholder="Link to your resume or portfolio"
                value={form.resumeLink}
                onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="linkedin">LinkedIn Profile</label>
              <input
                id="linkedin"
                type="url"
                placeholder="Link to your LinkedIn profile"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="discovery">Tell us how you discovered OffSecDiary?</label>
              <textarea
                id="discovery"
                placeholder="Your answer..."
                value={form.discovery}
                onChange={(e) => setForm({ ...form, discovery: e.target.value })}
                required
                rows="3"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="reason">Why did you choose to apply after discovering it?</label>
              <textarea
                id="reason"
                placeholder="Your answer..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
                rows="3"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label htmlFor="expectations">What do you expect from us?</label>
              <textarea
                id="expectations"
                placeholder="Your answer..."
                value={form.expectations}
                onChange={(e) => setForm({ ...form, expectations: e.target.value })}
                required
                rows="3"
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  required
                />
                I agree to the Terms & Conditions mentioned above.
              </label>
            </motion.div>

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
