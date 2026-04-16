import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug, Lock, FileCode, Server, Database, Shield,
  Clock, User, ArrowRight
} from "lucide-react";
import "./services.css";

/* ================= THEMED HEADERS ================= */
const SectionHeader = ({ tag, title }) => (
  <div className="custom-section-header">
    <div className="header-tag-box">
      <span className="header-tag">[ {tag} ]</span>
    </div>
    <div className="header-main-title">
      <div className="accent-line left"></div>
      <h2>{title}</h2>
      <div className="accent-line right"></div>
    </div>
  </div>
);

/* ================= DATA: TOP SERVICES ================= */
const services = [
  {
    title: 'CTF DESIGNING & HOSTING',
    description:
      'Designing and hosting of real-world Capture The Flag challenges based on offensive security scenarios, attack methodologies, and practical exploitation techniques.',
    techs: ['Real-World Scenarios', 'Attack Simulation', 'Hands-on Challenges']
  },

  {
    title: 'RESEARCH & DEVELOPMENT',
    description:
      'Offensive security research covering vulnerabilities, attack vectors, product concepts, and emerging threat techniques.',
    techs: ['Vulnerability Research', 'Attack Vectors', 'Security Innovation']
  },

  {
    title: 'OPEN WORKSHOPS',
    description:
      'Real world skill-based cybersecurity workshops focused on practical offensive security learning and awareness.',
    techs: ['Live Workshops', 'Hands-on Labs', 'Community Learning']
  },

  {
    title: 'PENETRATION TESTING & VA',
    description:
      'Ethical penetration testing and vulnerability assessments based on realistic attacker behavior and structured methodologies.',
    techs: ['Manual Testing', 'Adversary Simulation', 'Security Assessment']
  },

  {
    title: 'OFFENSIVE SECURITY TRAINING',
    description:
      'Hands-on offensive security training programs focused on attacker mindset and real-world workflows.',
    techs: [
      'Fundamentals',
      'Practical Exploitation',
      'Advanced Research'
    ]
  }
]


/* ================= DATA: INTERACTIVE TOOLS ================= */
const toolsData = [
  { 
    id: 0, 
    name: "CRYPTOVAULT", 
    description: "Secure credential protection and encrypted secrets management platform designed for high-security environments. High-security password manager built using customized encryption architecture for advanced credential protection and secure secrets management.",
    status: "Under Development",
    color: "#f59e0b",
    stack: ["Go", "React", "Redis"],
    telemetry: { security: 84, uptime: 91 }
  },
  { 
    id: 1, 
    name: "DATA GUARD", 
    description: "Data Loss Prevention ecosystem designed to prevent unauthorized access, copying, and movement of sensitive information. Controlled access, encryption boundaries, and monitoring mechanisms to reduce data leakage risks across devices and environments.",
    status: "Research & Development",
    color: "#3b82f6",
    stack: ["Python", "TensorFlow", "PostgreSQL"],
    telemetry: { detection: 89, response: 87 }
  },
  { 
    id: 2, 
    name: "GATEKEEPER", 
    description: "Secure charging cable with physical toggle to block unauthorized data transfer while allowing safe fast charging. Designed to prevent data theft via public charging points.",
    status: "Hardware Research",
    color: "#a855f7",
    stack: ["C++", "Embedded", "ARM"],
    telemetry: { protection: 92, reliability: 85 }
  },
  { 
    id: 3, 
    name: "SECURE POWER", 
    description: "Secure personal power device designed with monitoring capabilities to reduce risks from unsafe charging environments and unknown connections.",
    status: "Concept Research",
    color: "#10b981",
    stack: ["Hardware Design", "Firmware", "IoT"],
    telemetry: { design: 75, testing: 60 }
  },
  { 
    id: 4, 
    name: "SAFEGUARD WEARABLE", 
    description: "Personal safety wearable focused on deterrence, emergency response, and secure alert mechanisms within legal and ethical safety frameworks.",
    status: "Research Phase",
    color: "#ef4444",
    stack: ["Swift", "Bluetooth", "Firebase"],
    telemetry: { accuracy: 88, battery: 80 }
  },
  { 
    id: 5, 
    name: "SOS SAFETY APP", 
    description: "Emergency safety application featuring timed alerts, biometric verification, and secure last-location sharing for emergency response.",
    status: "Development Phase",
    color: "#ec4899",
    stack: ["React Native", "Node.js", "MongoDB"],
    telemetry: { reliability: 91, speed: 86 }
  },
  { 
    id: 6, 
    name: "DEFENSIVE SECURITY RESEARCH TOOLS", 
    description: "Includes IDPS research, anti-tamper research, anti-forensic analysis, encryption protection mechanisms, and data exposure analysis tools. Designed to understand attack behavior and strengthen defensive security mechanisms.",
    status: "Research & Study",
    color: "#06b6d4",
    stack: ["Python", "Golang", "Linux"],
    telemetry: { coverage: 87, threats: 94 }
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(1);
  const navigate = useNavigate();
  const activeTool = toolsData[activeIndex];

  return (
    <div className="services-page">
      
      {/* SEGREGATION: OUR SERVICES */}
      <div className="snap-section services-section-wrapper">
        <section className="services-hero">
        </section>

        <SectionHeader tag="OPERATIONAL LOG" title="OUR SERVICES" />

        <section className="services-grid" id="our-services">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="service-content">

                <h3>{s.title}</h3>

                <p>{s.description}</p>

                <div className="tech-group">
                  {s.techs.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <button 
                  className="service-link"
                  onClick={() => navigate(`/services/${i}`)}
                >
                  Explore →
                </button>

              </div>
            </motion.div>
          ))}
        </section>
      </div>

      {/* SEGREGATION: OUR INNOVATIONS */}
      <div className="snap-section tools-section-wrapper">
        <SectionHeader tag="SECURITY INNOVATIONS" title="OUR TOOLS" />

        <section className="tools-interactive-section" id="our-tools">
          <div className="interactive-container">
            {/* Tool List - All Screen Sizes */}
            <div className="tools-list">
              {toolsData.map((tool, index) => (
                <div
                  key={tool.id}
                  className={`tool-card ${index === activeIndex ? 'active' : ''}`}
                  style={{
                    "--tool-theme": tool.color,
                    borderColor: index === activeIndex ? tool.color : '#2a2a2a'
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="tool-card-icon" style={{ color: tool.color }}>
                    <Lock size={24} />
                  </div>
                  <div className="tool-card-info">
                    <h4>{tool.name}</h4>
                    <span>{tool.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              className="tool-detail-card"
              key={activeTool?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="tool-detail-header">
                <div className="tool-icon-box" style={{ borderColor: activeTool?.color }}>
                  <Lock size={32} style={{ color: activeTool?.color }} />
                </div>
                <div className="tool-header-content">
                  <h2>{activeTool?.name}</h2>
                  <span className="tool-status-badge" style={{ backgroundColor: `${activeTool?.color}20`, color: activeTool?.color, borderColor: activeTool?.color }}>● {activeTool?.status.toUpperCase()}</span>
                </div>
              </div>

              <div className="tool-section">
                <h3>Overview</h3>
                <p>{activeTool?.description}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}