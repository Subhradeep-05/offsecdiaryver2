import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./join-forms.css";
import { ArrowLeft } from "lucide-react";

export default function SpeakerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    designation: "",
    organization: "",
    city: "",
    state: "",
    expertise: [],
    experience: "",
    bio: "",
    topics: [],
    previousEvents: "",
    supportingLinks: "",
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.declaration) {
      alert("Please agree to the declaration");
      return;
    }

    const payload = {
      ...formData,
      formType: "SPEAKER",
      expertise: Array.isArray(formData.expertise) ? formData.expertise.join(", ") : formData.expertise,
      topics: Array.isArray(formData.topics) ? formData.topics.join(", ") : formData.topics
    };

    try {
      await fetch(import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(payload),
      });
      alert("Thank you for your submission!\nWe'll review your application and get back to you soon!");
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        designation: "",
        organization: "",
        city: "",
        state: "",
        expertise: [],
        experience: "",
        bio: "",
        topics: [],
        previousEvents: "",
        supportingLinks: "",
        declaration: false,
      });
      navigate("/joinus");
    } catch (err) {
      alert("SUBMISSION FAILED\nSomething went wrong. Please try again.");
    }
  };

  return (
    <motion.div className="form-page">
      <button className="back-button" onClick={() => navigate("/joinus")}> 
        <ArrowLeft size={20} /> Back to Join Us
      </button>

      <section className="unified-section">
        <div className="section-header">
          <span className="section-tag">[ BECOME A SPEAKER ]</span>

          <h2 className="section-title">
            <span className="title-line"></span>
            Become an OffSecDiary Speaker
            <span className="title-line"></span>
          </h2>

          <p className="join-intro">
            Share your expertise, inspire community members, and build thought leadership by becoming an OffSecDiary speaker.
          </p>
        </div>

        <form className="speaker-form" onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              placeholder="Your First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              placeholder="Your Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile / WhatsApp Number:
            <input
              type="text"
              name="mobile"
              placeholder="Your Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email Address:
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Professional Title / Designation:
            <input
              type="text"
              name="designation"
              placeholder="Your Designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Organization / Institution Name:
            <input
              type="text"
              name="organization"
              placeholder="Your Organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              placeholder="Your City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              placeholder="Your State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>

          <fieldset>
            <legend>Area of Expertise (Select all that apply):</legend>
            {["Cyber Security", "Digital Forensics", "Cyber Law", "Online Safety & Awareness", "Ethical Hacking", "Cyber Crime Investigation", "Data Privacy", "Social Media Safety", "Other"].map((expertise) => (
              <label key={expertise}>
                <input
                  type="checkbox"
                  name="expertise"
                  value={expertise}
                  checked={formData.expertise.includes(expertise)}
                  onChange={handleChange}
                />
                {expertise}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Years of Experience:</legend>
            {["0 - 2 Years", "3 - 5 Years", "6 - 10 Years", "10+ Years"].map(
              (experience) => (
                <label key={experience}>
                  <input
                    type="radio"
                    name="experience"
                    value={experience}
                    checked={formData.experience === experience}
                    onChange={handleChange}
                  />
                  {experience}
                </label>
              )
            )}
          </fieldset>

          <label>
            Brief Professional Bio (150-200 words):
            <textarea
              name="bio"
              placeholder="Enter your bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </label>

          <fieldset>
            <legend>Topics You Can Speak On (Select all that apply):</legend>
            {["Cyber Crime Prevention", "Online Safety for Students", "Emerging Cyber Threats", "Cyber Bullying & Scams", "Digital Hygiene & Safe Internet Practices", "Data Protection & Privacy", "Responsible Online Behaviour", "Case Studies / Real Incidents", "Other"].map((topic) => (
              <label key={topic}>
                <input
                  type="checkbox"
                  name="topics"
                  value={topic}
                  checked={formData.topics.includes(topic)}
                  onChange={handleChange}
                />
                {topic}
              </label>
            ))}
          </fieldset>

          <label>
            Why do you want to join Operation Zero Trust as a Speaker?
            <textarea
              name="reason"
              placeholder="Enter your reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Have you spoken at cyber awareness programs before?
            <select
              name="spokenBefore"
              value={formData.spokenBefore}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label>
            If yes, please mention previous events / institutions:
            <textarea
              name="previousEvents"
              placeholder="Enter details"
              value={formData.previousEvents}
              onChange={handleChange}
              required={formData.spokenBefore === "Yes"}
            />
          </label>

          <label>
            Supporting Links (LinkedIn Profile, Website, Portfolio, etc.):
            <textarea
              name="supportingLinks"
              placeholder="Enter links"
              value={formData.supportingLinks}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  declaration: e.target.checked,
                }))
              }
              required
            />
            I confirm that the information provided above is true and I support the mission of Operation Zero Trust.
          </label>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <div className="back-button-container">
          <Link to="/joinus" className="back-to-joinus">
            <span>&larr;</span> Back to Join Us
          </Link>
        </div>
      </section>
    </motion.div>
  );
}