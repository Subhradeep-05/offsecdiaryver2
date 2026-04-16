import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import "./join-forms.css";

const CISEHForm = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    dob: "",
    phoneNumber: "",
    address: "",
    state: "",
    registrationDate: "",
    college: "",
    course: "",
    aadharNumber: "",
    transactionId: "",
    paymentScreenshot: null,
    referral: "",
    termsAgreed: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAgreed) {
      alert("You must agree to the Terms & Conditions to proceed.");
      return;
    }

    setIsSubmitted(true);

    try {
      const payload = { ...formData, formType: "CERTIFICATIONS", certificationName: "CISEH" };
      await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      alert("APPLICATION SUBMITTED!\nWe'll review your application and get back to you soon!");
      setFormData({
        email: "",
        fullName: "",
        dob: "",
        phoneNumber: "",
        address: "",
        state: "",
        registrationDate: "",
        college: "",
        course: "",
        aadharNumber: "",
        transactionId: "",
        paymentScreenshot: null,
        referral: "",
        termsAgreed: "",
      });
    } catch (err) {
      alert("SUBMISSION FAILED\nSomething went wrong. Please try again.");
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <motion.div className="form-page">
      <button className="back-button" onClick={() => navigate("/certifications")}>
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
            <span className="form-tag">[ CISEH APPLICATION ]</span>
          </div>
          <h2 style={{ color: "#f4a261" }}>Certified Information Security & Ethical Hacker</h2>
          <p className="form-description">
            CISEH is a 5-month, structured, mentor-led certification program designed to build a strong
            foundation in cybersecurity and ethical hacking.
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth*</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Address*</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-group">
              <label>State*</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Registration*</label>
              <input
                type="date"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>College/University/School*</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter your institution"
                required
              />
            </div>

            <div className="form-group">
              <label>Course (Degree)*</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter your course"
                required
              />
            </div>

            <div className="form-group">
              <label>Aadhar Number</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter your Aadhar number"
              />
            </div>

            <div className="form-group">
              <label>Payment (Cert. Investment: ₹15,000)</label>
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src="/data/QR/CISEH.png"
                  alt="CISEH Payment QR Code"
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                />
              </div>
              <label>Enter your transaction ID*</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter your transaction ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload the Screenshot of Payment*</label>
              <input
                type="file"
                name="paymentScreenshot"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Referral (If no referral, write N/A)*</label>
              <input
                type="text"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                placeholder="Enter referral or N/A"
                required
              />
            </div>

            <div className="form-group">
              <label>Do you agree to the Terms & Conditions?*</label>
              <select
                name="termsAgreed"
                value={formData.termsAgreed}
                onChange={handleChange}
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
              security practices.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CISEHForm;