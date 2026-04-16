import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, AlertCircle } from "lucide-react";
import "./join-forms.css";

export default function CertificationsForm() {
  const navigate = useNavigate();
  const [formSection, setFormSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    aadhar: "",
    domain: "",
    motivation: "",
    priorExperience: "",
    experienceDescription: "",
    toolsKnowledge: "",
    skillLevel: "",
    hoursPerDay: "",
    workDemo: null,
    resumePortfolio: null,
    linkedinProfile: "",
    agreedToTerms: false
  });

  const domains = [
    "Content Writing",
    "CTF Developer",
    "UI/UX Design",
    "Software Development",
    "Research & Development (R&D)",
    "Design & Content Creation",
    "Business And Development Associate",
    "Mechatronics (Remote)",
    "Data Analyst",
    "Security Associate"
  ];

  const handleFileChange = (field, file) => {
    setForm({ ...form, [field]: file });
  };

  const handleNextSection = () => {
    if (formSection < 3) setFormSection(formSection + 1);
  };

  const handlePrevSection = () => {
    if (formSection > 0) setFormSection(formSection - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreedToTerms) {
      alert("Please agree to the Terms & Conditions to proceed");
      return;
    }

    setIsSubmitted(true);

    const payload = { ...form, formType: "CERTIFICATIONS" };

    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'workDemo' || key === 'resumePortfolio') {
        if (payload[key]) {
          formData.append(key, payload[key]);
        }
      } else {
        formData.append(key, payload[key] || "");
      }
    });

    try {
      await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
      alert("APPLICATION SUBMITTED\nWe'll review your certification enrollment and get back to you soon!");
      setForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        aadhar: "",
        domain: "",
        motivation: "",
        priorExperience: "",
        experienceDescription: "",
        toolsKnowledge: "",
        skillLevel: "",
        hoursPerDay: "",
        workDemo: null,
        resumePortfolio: null,
        linkedinProfile: "",
        agreedToTerms: false
      });
      setFormSection(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting your application. Please try again later.");
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
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="form-header"
        >
          <div className="form-tag-box">
            <span className="form-tag">[ CERTIFICATIONS ]</span>
          </div>
          <div className="form-title">
            
            <h2 className="section-title">
            <span className="title-line"></span>
            CYBERSECURITY CERTIFICATIONS
            <span className="title-line"></span>
          </h2>
            
          </div>
          <p className="form-description">
            Apply for industry-recognized cybersecurity certifications. Structured learning paths with practical hands-on training for real-world security impact.
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
            {/* SECTION 0: BASIC INFO */}
            {formSection === 0 && (
              <motion.div
                key="section-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="section-title">Basic Information</h3>
                
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

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                >
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@domain.com"
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

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <label htmlFor="city">City / Location</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Your city or location"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="aadhar">Aadhar (Cert. Verification)</label>
                  <input
                    id="aadhar"
                    type="text"
                    placeholder="Your Aadhar number"
                    value={form.aadhar}
                    onChange={(e) => setForm({ ...form, aadhar: e.target.value })}
                    required
                  />
                </motion.div>
              </motion.div>
            )}

            {/* SECTION 1: DOMAIN SELECTION */}
            {formSection === 1 && (
              <motion.div
                key="section-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="section-title">Domain Selection</h3>
                <label className="section-label">Select the Domain You Want to Apply For</label>
                <div className="domain-options">
                  {domains.map((d) => (
                    <motion.label key={d} className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="domain"
                        value={d}
                        checked={form.domain === d}
                        onChange={(e) => setForm({ ...form, domain: e.target.value })}
                        required
                      />
                      <span>{d}</span>
                    </motion.label>
                  ))}
                </div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <label htmlFor="motivation">Why do you want to join this domain?</label>
                  <textarea
                    id="motivation"
                    placeholder="Tell us about your interest and goals..."
                    value={form.motivation}
                    onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                    required
                    rows="4"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* SECTION 2: EXPERIENCE */}
            {formSection === 2 && (
              <motion.div
                key="section-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="section-title">Experience Details</h3>
                
                <div className="experience-question">
                  <label className="section-label">Do you have any prior experience in this domain?</label>
                  <div className="radio-options">
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="priorExperience"
                        value="Yes"
                        checked={form.priorExperience === "Yes"}
                        onChange={(e) => setForm({ ...form, priorExperience: e.target.value })}
                        required
                      />
                      <span>Yes</span>
                    </motion.label>
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="priorExperience"
                        value="No"
                        checked={form.priorExperience === "No"}
                        onChange={(e) => setForm({ ...form, priorExperience: e.target.value })}
                        required
                      />
                      <span>No</span>
                    </motion.label>
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="priorExperience"
                        value="Some basic knowledge"
                        checked={form.priorExperience === "Some basic knowledge"}
                        onChange={(e) => setForm({ ...form, priorExperience: e.target.value })}
                        required
                      />
                      <span>Some basic knowledge</span>
                    </motion.label>
                  </div>
                </div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="experienceDescription">Please describe your previous experience in this domain.</label>
                  <textarea
                    id="experienceDescription"
                    placeholder="Details about your past experience..."
                    value={form.experienceDescription}
                    onChange={(e) => setForm({ ...form, experienceDescription: e.target.value })}
                    rows="4"
                  />
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <label htmlFor="toolsKnowledge">What tools or concepts are you familiar with?</label>
                  <textarea
                    id="toolsKnowledge"
                    placeholder="List tools, frameworks, concepts, etc..."
                    value={form.toolsKnowledge}
                    onChange={(e) => setForm({ ...form, toolsKnowledge: e.target.value })}
                    rows="3"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* SECTION 3: SKILLS & AVAILABILITY */}
            {formSection === 3 && (
              <motion.div
                key="section-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="section-title">Skills & Availability</h3>

                <div className="skill-section">
                  <label className="section-label">Rate your skill level for the selected domain</label>
                  <div className="radio-options">
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="skillLevel"
                        value="Beginner"
                        checked={form.skillLevel === "Beginner"}
                        onChange={(e) => setForm({ ...form, skillLevel: e.target.value })}
                        required
                      />
                      <span>Beginner</span>
                    </motion.label>
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="skillLevel"
                        value="Intermediate"
                        checked={form.skillLevel === "Intermediate"}
                        onChange={(e) => setForm({ ...form, skillLevel: e.target.value })}
                        required
                      />
                      <span>Intermediate</span>
                    </motion.label>
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="skillLevel"
                        value="Advanced"
                        checked={form.skillLevel === "Advanced"}
                        onChange={(e) => setForm({ ...form, skillLevel: e.target.value })}
                        required
                      />
                      <span>Advanced</span>
                    </motion.label>
                  </div>
                </div>

                <div className="hours-section">
                  <label className="section-label">How many hours per day can you give?</label>
                  <div className="radio-options">
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="hoursPerDay"
                        value="1-2 hours"
                        checked={form.hoursPerDay === "1-2 hours"}
                        onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })}
                        required
                      />
                      <span>1-2 hours</span>
                    </motion.label>
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="hoursPerDay"
                        value="2-3 hours"
                        checked={form.hoursPerDay === "2-3 hours"}
                        onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })}
                        required
                      />
                      <span>2-3 hours</span>
                    </motion.label>
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="hoursPerDay"
                        value="3-4 hours"
                        checked={form.hoursPerDay === "3-4 hours"}
                        onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })}
                        required
                      />
                      <span>3-4 hours</span>
                    </motion.label>
                    <motion.label className="radio-option" whileHover={{ x: 5 }}>
                      <input
                        type="radio"
                        name="hoursPerDay"
                        value="More than 4 hours"
                        checked={form.hoursPerDay === "More than 4 hours"}
                        onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })}
                        required
                      />
                      <span>More than 4 hours</span>
                    </motion.label>
                  </div>
                </div>

                <motion.div
                  className="form-group file-upload-section"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="workDemo">Your work demo</label>
                  <input
                    id="workDemo"
                    type="file"
                    onChange={(e) => handleFileChange('workDemo', e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.zip,.rar"
                  />
                  <small>Upload up to 10 supported files. Max 10 MB per file.</small>
                </motion.div>

                <motion.div
                  className="form-group file-upload-section"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <label htmlFor="resumePortfolio">Resume / Portfolio Link</label>
                  <input
                    id="resumePortfolio"
                    type="file"
                    onChange={(e) => handleFileChange('resumePortfolio', e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.zip,.rar"
                  />
                  <small>Upload up to 10 supported files. Max 10 MB per file.</small>
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="linkedinProfile">LinkedIn Profile</label>
                  <input
                    id="linkedinProfile"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={form.linkedinProfile}
                    onChange={(e) => setForm({ ...form, linkedinProfile: e.target.value })}
                    required
                  />
                </motion.div>

                {/* Terms & Conditions Section */}
                <motion.div
                  className="terms-section"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="terms-header">
                    <h4>📋 Terms & Conditions</h4>
                  </div>

                  <motion.div className="terms-content" initial={{ maxHeight: 0, opacity: 0 }} animate={{ maxHeight: 500, opacity: 1 }} transition={{ duration: 0.3 }}>
                    <div className="terms-text">
                      <h4>1. Eligibility</h4>
                      <p>Participants must be at least 18 years old and have basic knowledge of cybersecurity concepts. OffSecDiary reserves the right to assess participant eligibility based on submitted information.</p>

                      <h4>2. Code of Conduct</h4>
                      <p>All participants agree to maintain the highest ethical standards. Any engaging in unauthorized access, illegal activities, or violations of laws will result in immediate disqualification and potential legal action.</p>

                      <h4>3. Intellectual Property</h4>
                      <p>All course materials, research, and exercises created by OffSecDiary are proprietary. Participants agree not to reproduce, distribute, or share course materials without permission.</p>

                      <h4>4. Confidentiality</h4>
                      <p>Participants may encounter sensitive information during certifications. All such information must be kept confidential. Breach of confidentiality may result in legal action.</p>

                      <h4>5. Liability</h4>
                      <p>OffSecDiary is not responsible for any damages, losses, or legal consequences resulting from the misuse of knowledge gained through our certifications. Participants use this knowledge solely for ethical and legal purposes.</p>

                      <h4>6. Certification Validity</h4>
                      <p>Certifications issued by OffSecDiary are valid for the period specified at enrollment. OffSecDiary reserves the right to revoke certifications if ethical violations are discovered.</p>

                      <h4>7. Data Privacy</h4>
                      <p>Your personal information will be used solely for certification purposes and program administration. We will not share your data with third parties without consent.</p>

                      <h4>8. Modifications</h4>
                      <p>OffSecDiary reserves the right to modify program content, schedules, and terms. Participants will be notified of any changes in advance.</p>

                      <h4>9. Acceptance</h4>
                      <p>By submitting this form and checking the agreement checkbox, you acknowledge that you have read, understood, and agree to all terms and conditions outlined above.</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Terms Checkbox */}
                <motion.div
                  className="form-group checkbox-group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.agreedToTerms}
                      onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })}
                    />
                    <span>I have read and agree to the Terms & Conditions</span>
                  </label>
                </motion.div>
              </motion.div>
            )}

            {/* SECTION NAVIGATION */}
            <div className="form-navigation">
              {formSection > 0 && (
                <motion.button type="button" onClick={handlePrevSection} className="nav-btn back-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ArrowLeft size={18} /> Back
                </motion.button>
              )}
              <div className="section-counter">
                {formSection + 1} / 4
              </div>
              {formSection < 3 && (
                <motion.button type="button" onClick={handleNextSection} className="nav-btn next-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Next <ArrowRight size={18} />
                </motion.button>
              )}
              {formSection === 3 && (
                <motion.button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitted || !form.agreedToTerms}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  SUBMIT APPLICATION
                  <ArrowRight size={18} />
                </motion.button>
              )}
            </div>
          </form>

          {/* Info Notice */}
          <motion.div
            className="security-notice"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AlertCircle size={24} style={{ color: "#dc2626" }} />
            <p>Your application is secure and will be reviewed by our team within 3-5 business days.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
