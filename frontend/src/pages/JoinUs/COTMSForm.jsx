import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import "./join-forms.css";

const COTMSForm = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    dob: "",
    phone: "",
    address: "",
    state: "",
    registrationDate: "",
    institution: "",
    course: "",
    aadhar: "",
    transactionId: "",
    paymentScreenshot: null,
    referral: "",
    terms: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.terms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    setIsSubmitted(true);

    try {
      const payload = { ...form, formType: "CERTIFICATIONS", certificationName: "COTMS" };

      await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      alert(
        "APPLICATION SUBMITTED!\nWe'll review your application and get back to you soon!"
      );
      setForm({
        email: "",
        fullName: "",
        dob: "",
        phone: "",
        address: "",
        state: "",
        registrationDate: "",
        institution: "",
        course: "",
        aadhar: "",
        transactionId: "",
        paymentScreenshot: null,
        referral: "",
        terms: "",
      });
    } catch (err) {
      alert("SUBMISSION FAILED\nSomething went wrong. Please try again.");
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <motion.div className="form-page">
      <button
        className="back-button"
        onClick={() => navigate("/certifications")}
      >
        <ArrowLeft size={20} /> Back to Certifications
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
            <span className="form-tag">
              [ COTMS APPLICATION ]
            </span>
          </div>
          <h2 style={{ color: "#f4a261" }}>
            Certified OSINT & Threat Monitoring Specialist
          </h2>
          <p className="form-description">
            A 4-month, structured, mentor-led certification program designed to build deep expertise in open-source intelligence (OSINT), digital footprint analysis, and proactive threat monitoring. Learn to gather intelligence from publicly available sources and monitor emerging cyber and reputational threats.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="form-section"
        >
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth*</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Address*</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-group">
              <label>State*</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleInputChange}
                placeholder="Enter your state"
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Registration*</label>
              <input
                type="date"
                name="registrationDate"
                value={form.registrationDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>College/University/School*</label>
              <input
                type="text"
                name="institution"
                value={form.institution}
                onChange={handleInputChange}
                placeholder="Enter your institution"
                required
              />
            </div>

            <div className="form-group">
              <label>Course (Degree)*</label>
              <input
                type="text"
                name="course"
                value={form.course}
                onChange={handleInputChange}
                placeholder="Enter your course"
                required
              />
            </div>

            <div className="form-group">
              <label>Aadhar Number (For personal verification)</label>
              <input
                type="text"
                name="aadhar"
                value={form.aadhar}
                onChange={handleInputChange}
                placeholder="Enter your Aadhar number"
              />
            </div>

            <div className="form-group">
              <label>Payment (Cert. Investment: ₹12,000)</label>
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src="/data/QR/COTMS.png"
                  alt="COTMS Payment QR Code"
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                />
              </div>
              <label>Enter your transaction ID*</label>
              <input
                type="text"
                name="transactionId"
                value={form.transactionId}
                onChange={handleInputChange}
                placeholder="Enter your transaction ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload the Screenshot of Payment*</label>
              <input
                type="file"
                name="paymentScreenshot"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Referral (If no referral, write N/A)*</label>
              <input
                type="text"
                name="referral"
                value={form.referral}
                onChange={handleInputChange}
                placeholder="Enter referral or N/A"
                required
              />
            </div>

            <div className="form-group">
              <label>Do you agree to the Terms & Conditions?*</label>
              <select
                name="terms"
                value={form.terms}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitted}
            >
              <Send size={20} />
              {isSubmitted ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="security-notice"
          >
            <span className="notice-badge">🔒</span>
            <p>
              Your data is secure and encrypted. We follow industry-standard
              security practices. Limited seats available - early registration
              is recommended.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default COTMSForm;
