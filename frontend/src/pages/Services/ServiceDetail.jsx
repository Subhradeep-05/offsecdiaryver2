import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, Users, Send, ArrowRight } from "lucide-react";
import "./service-detail.css";
import ServiceInfoCard from "../../components/ServiceInfoCard";

const servicesData = [
  {
    id: 0,
    title: 'CTF DESIGNING & HOSTING',
    description:
      'Design and hosting of real-world Capture The Flag challenges based on offensive security scenarios, attack methodologies, and practical exploitation techniques.',
    techs: ['Real-World Scenarios', 'Attack Simulation', 'Hands-on Challenges'],
    fullDetails: {
      overview: 'Our CTF (Capture The Flag) services provide immersive cybersecurity challenges that simulate real-world attack scenarios. Perfect for training, competitions, and community engagement.',
      features: [
        'Custom challenge design based on real vulnerabilities',
        'Attack methodology training and guidance',
        'Hands-on real world scenarios for practical learning',
        'Detailed writeups and solutions'
      ],
      duration: [
        'Flexible - Based on Requirements',
        'Challenge development timelines vary depending on complexity, number of scenarios, and customization requirements, but can be adjusted for urgent or large-scale deployments.'
      ],
      audience: [
        'Open for Everyone',
        'Educational Institutions & Colleges',
        'Technical Clubs & Cybersecurity Communities',
        'Companies & Corporate Security Teams',
        'Hackathons & Competitions',
        'Training Programs & Workshops',
        'Students & Individual Learners',
        'Government / Defense / Research Teams'
      ],
      pricing: [
        'Custom Pricing - Based on Scope',
        'Pricing depends on:',
        'Number of challenges',
        'Difficulty level',
        'Infrastructure requirements',
        'Custom branding & features',
        'Connect with our team to discuss your requirements and receive a tailored quote.'
      ]
    }
  },
  
  {
    id:4 ,
    title: 'OFFENSIVE SECURITY TRAINING',
    description:
      'Hands-on offensive security training programs focused on attacker mindset and real-world workflows.',
    techs: [
      'Fundamentals',
      'Practical Exploitation',
      'Advanced Research'
    ],
    fullDetails: {
      overview: 'Comprehensive offensive security training from beginner to advanced levels. Learn hands-on penetration testing, exploitation, and adversarial techniques used by real attackers.',
      features: [
        'Live instructor-led training sessions',
        'Hands-on lab environments with vulnerable systems',
        'Real-world case studies and attack scenarios',
        'Industry-standard tools and frameworks',
        'Certificate of completion upon successful completion'
      ],
      duration: '1 Month, 3 Months, or 6 Months programs',
      audience: 'Security enthusiasts, IT professionals, ethical hackers',
      pricing: 'Starting from ₹15,000 per month'
    }
  },
  {
    id: 1,
    title: 'RESEARCH & DEVELOPMENT',
    description:
      'The research pool includes security-focused hardware product design, modern threat-aware protection tools, and advanced cybersecurity software solutions built to address emerging digital and physical security challenges. ',
    techs: ['Offensive Security Research', 'Security Product Development', 'Cybersecurity Hardware Innovation', 'Threat-Aware Security Systems', 'Personal Security Technologies', 'Digital Defense Solutions', 'Security Automation Tools', 'Secure Communication Technologies'],
    fullDetails: {
      overview: 'One-of-its-kind research initiatives focused on offensive security, national-interest security technologies, and solutions designed to strengthen an individual\'s personal defensive arsenal.',
      features: [
        'Security-Focused Hardware Product Design',
        'Threat-Aware Protection Software Development',
        'Personal Security & Digital Defense Tools',
        'National-Interest Security Technologies',
        'Secure Communication & Data Protection Technologies'
      ],
      additionalFeatures: [
        'Real-World Security Problem Solving',
        'Product-Oriented Security Research',
        'Hardware + Software Security Innovation',
        'Focus on Practical Deployment',
        'Scalable & Industry-Relevant Innovations'
      ],
      duration: 'Continuous Research & Product Development',
      audience: ['Individuals', 'Organizations', 'National Security Ecosystems'],
      pricing: 'Product-Based & Variable'
    }
  },
  {
    id: 2,
    title: 'OPEN WORKSHOPS',
    description:
      'Real-world cybersecurity and technology workshops focused on domains where security is non-negotiable. ',
    techs: ['Cybersecurity Workshops', 'Offensive Security Sessions', 'Hands-On Cybersecurity Learning', 'Software Development Security', 'Game Development Security', 'Mobile Application Security', 'UI/UX Security Considerations', 'Web Application Security', 'API Security Awareness', 'Cloud Security Fundamentals', 'DevSecOps Awareness', 'Digital Forensics Basics', 'AI Security & Emerging Technologies', 'IoT & Hardware Security', 'Infrastructure Security'],
    fullDetails: {
      overview: 'Regular open workshops focused on cybersecurity concepts, offensive security learning, and emerging threat awareness. These sessions include hands-on practical demonstrations that are rarely covered in conventional learning environments.',
      features: [
        'Multi-Domain Technology Security Coverage (Software Development, Game Development, Mobile Apps, UI/UX, Cloud & Emerging Technologies)',
        'Hands-on Cybersecurity Demonstrations & Practical Case Studies',
        'Security Implications Across Modern Technology Domains',
        'Industry-Driven Practical Sessions',
        'Sessions Led by Experts with 3+ Years Domain & 8+ Years Cybersecurity Experience',
        'Live Demonstrations & Real-World Examples',
        'Interactive Q&A & Discussion-Driven Sessions',
        'Beginner to Advanced Friendly',
        'Guest Speaker & Invited Sessions Available',
        'Workshops for Colleges, Organizations, Conferences & Technical Events'
      ],
      duration: '2–3 Hours Per Session (Flexible Based on Topic)',
      audience: ['Students', 'Organizations', 'Developers', 'Security Enthusiasts', 'Anyone Interested in Security'],
      pricing: 'Open Workshops – complimentary\n\nGuest Sessions / Invited Workshops - Custom & Negotiable'
    }
  },
  {
    id: 3,
    title: 'PENETRATION TESTING & VA',
    description:
      'Real-world penetration testing and vulnerability assessment services focused on identifying security weaknesses across applications, infrastructure, and modern technology environments. ',
    techs: ['Penetration Testing', 'Vulnerability Assessment', 'Web Application Security Testing', 'Mobile Application Penetration Testing', 'API Security Testing', 'Cloud Security Assessment', 'Infrastructure Security Testing', 'Product Security Assessment', 'Red Team Simulation', 'Offensive Security Testing', 'DevSecOps Security Testing', 'Application Security Testing'],
    fullDetails: {
      overview: 'Penetration Testing & Vulnerability Assessment services focused on identifying and validating real-world security risks across applications, infrastructure, and digital platforms. We provide security testing, simulating real attacker behavior to uncover vulnerabilities before exploitation. Services can be delivered as one-time assessments, pre-launch testing, or ongoing security evaluations for organizations, startups, and digital products. ',
      features: [
        'Remote Penetration Testing & Vulnerability Assessments',
        'Web & Mobile Application Security Testing',
        'API Security & Backend Infrastructure Testing',
        'Cloud Security Assessments',
        'Network & Infrastructure Penetration Testing',
        'Startup & Product Security Testing',
        'Manual Testing with Automated Validation',
        'Detailed Vulnerability Reports with Risk Prioritization',
        'Remediation Guidance & Security Recommendations',
        'Continuous & On-Demand Testing Support'
      ],
      duration: 'Project-Based - Depends on Scope & Complexity',
      audience: ['Organizations', 'Startups', 'Companies', 'Product Teams', 'Developers', 'Platforms', 'Anyone Requiring Security Testing'],
      pricing: 'Custom & Scope-Based\n\nPricing depends on: Scope of Testing, Infrastructure Size, Testing Type, Engagement Duration, Security Requirements'
    }
  },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const serviceIndex = parseInt(id);

  const service = servicesData.find((service) => service.id === parseInt(id));

  if (!service) {
    console.log('Service not found for ID:', id);
    return (
      <motion.div className="service-detail-page">
        <div className="not-found">
          <h1>Service Not Found</h1>
          <button onClick={() => navigate("/services")}>Back to Services</button>
        </div>
      </motion.div>
    );
  }

  console.log('Service ID:', id);
  console.log('Selected Service:', service);

  return (
    <motion.div className="service-detail-page">
      <button className="back-button" onClick={() => navigate("/services")}>
        <ArrowLeft size={20} /> Back to Services
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="detail-container"
      >
        <div className="detail-header-section">
          <div className="custom-section-header">
            <div className="header-tag-box">
              <span className="header-tag">[ OFFENSIVE SECURITY ]</span>
            </div>
            <div className="header-main-title">
              <div className="accent-line left"></div>
              <h1>{service.title}</h1>
              <div className="accent-line right"></div>
            </div>
          </div>
          <p className="detail-description">{service.description}</p>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h2>Overview</h2>
            <p>{service.fullDetails.overview}</p>
          </div>

          <div className="detail-section">
            <h2>Key Features</h2>
            <ul className="features-list">
              {service.fullDetails.features.map((feature, idx) => (
                <li key={idx}>
                  <CheckCircle size={20} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {service.id === 1 && (
            <>
              <div className="detail-section">
                <h2>Key Research Areas & Features</h2>
                <ul className="features-list">
                  {service.fullDetails.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h2>What Makes Our R&D Different</h2>
                <ul className="features-list">
                  {service.fullDetails.additionalFeatures.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div className="detail-grid">
            <ServiceInfoCard icon="" title="Duration">
              {Array.isArray(service.fullDetails.duration) ? (
                <ul>
                  {service.fullDetails.duration.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{service.fullDetails.duration}</p>
              )}
            </ServiceInfoCard>

            <ServiceInfoCard icon="" title="Audience">
              {Array.isArray(service.fullDetails.audience) ? (
                <ul>
                  {service.fullDetails.audience.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{service.fullDetails.audience}</p>
              )}
            </ServiceInfoCard>

            <ServiceInfoCard icon="" title="Pricing">
              {Array.isArray(service.fullDetails.pricing) ? (
                <ul>
                  {service.fullDetails.pricing.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{service.fullDetails.pricing}</p>
              )}
            </ServiceInfoCard>
          </div>

          <div className="detail-section">
            <h2>Technologies & Keywords</h2>
            <div className="tech-group">
              {service.techs.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="cta-section">
            </div>
 <div className="know-more-redirect-section">
            <div className="redirect-content">
              <h2>Ready to Get Started?</h2>
              <p>Submit your enquiry and our team will connect with you within 24 hours to discuss how this service can meet your specific needs.</p>
              <motion.button
                className="redirect-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/enquiry-terminal/${serviceIndex}`)}
              >
                <Send size={20} />
                PROCEED TO ENQUIRY TERMINAL
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
