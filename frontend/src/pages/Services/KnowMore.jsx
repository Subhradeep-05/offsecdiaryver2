import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, ArrowRight, CheckCircle } from "lucide-react";
import "./know-more.css";

const servicesData = [
  {
    id: 0,
    title: 'CTF BUILDING & HOSTING',
    description:
      'Design and hosting of real-world Capture The Flag challenges based on offensive security scenarios, attack methodologies, and practical exploitation techniques.',
    fullDetails: {
      overview: 'Our CTF (Capture The Flag) services provide immersive cybersecurity challenges that simulate real-world attack scenarios. Perfect for training, competitions, and community engagement.',
      whatYouGet: [
        'Custom challenge design based on real vulnerabilities',
        'Attack methodology training and guidance',
        'Hands-on real world scenarios for practical learning',
        'Detailed writeups and solutions'
      ],
      whyChoose: [
        'Industry-experienced designers',
        'Realistic attack simulations',
        'Community-driven approach',
        'Flexible hosting options',
        'Comprehensive documentation'
      ],
      nextSteps: 'Schedule a consultation to discuss your specific requirements.'
    }
  },
  {
    id: 1,
    title: 'OFFENSIVE SECURITY TRAINING',
    description:
      'Hands-on offensive security training programs focused on attacker mindset and real-world workflows.',
    fullDetails: {
      overview: 'Comprehensive offensive security training from beginner to advanced levels. Learn hands-on penetration testing, exploitation, and adversarial techniques used by real attackers.',
      whatYouGet: [
        'Live instructor-led training sessions',
        'Hands-on lab environments with vulnerable systems',
        'Real-world case studies and attack scenarios',
        'Industry-standard tools and frameworks',
        'Certificate of completion upon successful completion'
      ],
      whyChoose: [
        'Expert instructors with 5+ years experience',
        'Practical, hands-on learning',
        'Customizable curricula',
        'Lifetime lab access',
        'Career guidance included'
      ],
      nextSteps: 'Contact us to enroll in the next batch of training programs.'
    }
  },
  {
    id: 2,
    title: 'RESEARCH & DEVELOPMENT',
    description:
      'Offensive security research covering vulnerabilities, attack vectors, product concepts, and emerging threat techniques.',
    fullDetails: {
      overview: 'Cutting-edge security research and development services. We uncover vulnerabilities, analyze attack vectors, and develop innovative security solutions.',
      whatYouGet: [
        'Zero-day vulnerability research',
        'Threat intelligence gathering and analysis',
        'Security tool development and customization',
        'Attack vector analysis and documentation',
        'Research paper publication support'
      ],
      whyChoose: [
        'Published researchers',
        'Cutting-edge methodology',
        'Custom research scope',
        'Comprehensive reporting',
        'IP protection guaranteed'
      ],
      nextSteps: 'Let us know your research goals and we\'ll provide a detailed proposal.'
    }
  },
  {
    id: 3,
    title: 'OPEN WORKSHOPS',
    description:
      'Community-driven cybersecurity workshops focused on practical offensive security learning and awareness.',
    fullDetails: {
      overview: 'Regular free workshops for the community to learn cybersecurity basics and advanced techniques. Building awareness and fostering a security-conscious community.',
      whatYouGet: [
        'Monthly workshop series on trending topics',
        'Live coding and hands-on demonstrations',
        'Q&A sessions with industry experts',
        'Resource materials and tools provided',
        'Networking opportunities with security professionals'
      ],
      whyChoose: [
        'Completely free',
        'Expert-led sessions',
        'Practical focus',
        'Community-driven',
        'Flexible scheduling'
      ],
      nextSteps: 'Subscribe to our newsletter to get notified about upcoming workshops.'
    }
  },
  {
    id: 4,
    title: 'PENETRATION TESTING & VA',
    description:
      'Ethical penetration testing and vulnerability assessments based on realistic attacker behavior and structured methodologies.',
    fullDetails: {
      overview: 'Professional penetration testing and vulnerability assessment services using industry best practices and methodologies.',
      whatYouGet: [
        'Comprehensive network penetration testing',
        'Web application security assessments',
        'Social engineering and phishing simulations',
        'Detailed vulnerability reports with remediation',
        'Post-assessment consultation and support'
      ],
      whyChoose: [
        'OWASP Top 10 certified team',
        'Real-world attack simulations',
        'Detailed remediation guidance',
        'Full scope flexibility',
        'Ongoing support included'
      ],
      nextSteps: 'Request a security assessment quote tailored to your organization.'
    }
  },
  {
    id: 5,
    title: 'SECURITY TOOL DEVELOPMENT',
    description:
      'Development of custom offensive security tools for research, automation, and practical security testing.',
    fullDetails: {
      overview: 'Custom security tool development tailored to specific organizational needs. From automated testing frameworks to specialized exploitation tools.',
      whatYouGet: [
        'Bespoke tool development and customization',
        'Integration with existing security infrastructure',
        'Automation framework development',
        'Technical documentation and training',
        'Ongoing support and updates'
      ],
      whyChoose: [
        'Full-stack developers',
        'Agile development process',
        'Custom architecture',
        'Complete documentation',
        'Long-term support'
      ],
      nextSteps: 'Share your tool requirements and we\'ll create a development roadmap.'
    }
  },
  {
    id: 6,
    title: 'EXPERT SESSIONS',
    description:
      'Industry-led expert sessions covering real attack case studies and advanced cybersecurity concepts.',
    fullDetails: {
      overview: 'Learn directly from cybersecurity experts with real-world experience. In-depth discussions on advanced topics and real attack case studies.',
      whatYouGet: [
        'Expert-led technical sessions',
        'Real attack case study analysis',
        'Q&A with seasoned professionals',
        'Advanced concept deep-dives',
        'Recorded sessions available for replay'
      ],
      whyChoose: [
        'Industry veterans',
        'Real-world insights',
        'Interactive format',
        'Recording available',
        'Lifetime access'
      ],
      nextSteps: 'Register for our upcoming expert sessions and expand your knowledge.'
    }
  }
];

export default function KnowMore() {
  const { id } = useParams();
  const navigate = useNavigate();
  const serviceIndex = parseInt(id);
  const service = servicesData[serviceIndex];

  if (!service) {
    return (
      <motion.div className="know-more-page">
        <div className="not-found">
          <h1>Service Not Found</h1>
          <button onClick={() => navigate("/services")}>Back to Services</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="know-more-page">
      <button className="back-button" onClick={() => navigate("/services")}>
        <ArrowLeft size={20} /> Back to Services
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="know-more-container"
      >
        <div className="know-more-header">
          <div className="custom-section-header">
            <div className="header-tag-box">
              <span className="header-tag">[ SERVICE DETAILS ]</span>
            </div>
            <div className="header-main-title">
              <div className="accent-line left"></div>
              <h1>{service.title}</h1>
              <div className="accent-line right"></div>
            </div>
          </div>
          <p className="header-subtitle">{service.description}</p>
        </div>

        <div className="know-more-content">
          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="content-section"
          >
            <h2>📋 Overview</h2>
            <p>{service.fullDetails.overview}</p>
          </motion.div>

          {/* What You Get */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="content-section"
          >
            <h2>✨ What You Get</h2>
            <ul className="benefits-list">
              {service.fullDetails.whatYouGet.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="content-section"
          >
            <h2>🎯 Why Choose Us</h2>
            <div className="benefits-grid">
              {service.fullDetails.whyChoose.map((item, idx) => (
                <div key={idx} className="benefit-card">
                  <div className="benefit-icon">
                    <CheckCircle size={24} />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Ready to Proceed Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="proceed-section"
          >
            <div className="proceed-content">
              <h2>Ready to Get Started?</h2>
              <p>{service.fullDetails.nextSteps}</p>
              <motion.button
                className="proceed-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/enquiry-terminal/${serviceIndex}`)}
              >
                <Send size={20} />
                PROCEED TO ENQUIRY TERMINAL
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
