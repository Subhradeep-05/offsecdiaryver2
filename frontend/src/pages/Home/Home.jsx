import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { motion } from "framer-motion";


const Home = () => {

  const [typedText, setTypedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const canvasRef = useRef(null);
  const fullCommand = 'whoami --capabilities';

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const heroSection = canvas.parentElement;

    const setCanvasDimensions = () => {
      const width = heroSection.clientWidth;
      const height = heroSection.clientHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      canvas.style.display = 'block';
    };

    setCanvasDimensions();
    setTimeout(() => setCanvasDimensions(), 100);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(220, 38, 38, 0.38)';
      ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;

      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 75);

    const handleResize = () => setCanvasDimensions();
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullCommand.length) {
        setTypedText(fullCommand.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="home-content">

      {/* ── HERO ── */}
      <section className="hero">
        <canvas ref={canvasRef} className="matrix-bg"></canvas>
        <div className="scanline"></div>
        <div className="glitch-overlay"></div>

        <div className="hero-container">
          {/* Terminal card */}
          <div className="hero-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">root@offsecdiary:~#</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="prompt">root@offsecdiary</span>
                <span className="path">~</span>
                <span className="cursor">$</span>
                <span className="command">{typedText}</span>
                <span className="cursor-blink">|</span>
              </div>
              {showOutput && (
                <div className="terminal-output">
                  <div className="output-line">[+] Penetration Testing</div>
                  <div className="output-line">[+] Red Team Operations</div>
                  <div className="output-line">[+] Offensive Security Research</div>
                  <div className="output-line">[+] Secure Systems Engineering</div>
                  <div className="output-line success">[+] Loading security research modules...</div>
                  <div className="output-line success" style={{ color: '#ef4444', fontWeight: 'bold' }}>
                    [*] System Ready
                  </div>
                  <div className="output-line success" style={{ color: '#ef4444', fontWeight: 'bold' }}>
                    [*] Access granted
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hero text */}
          <div className="hero-content">
            <div className="glitch-wrapper">
              <div className="hero-tagline">HACK | DEFEND | INNOVATE</div>
              <h2 className="hero-title" data-text="OFFENSIVE RESEARCH.STRONGER DEFENSES">
                <span className="line1">OFFENSIVE RESEARCH.</span><br />
                <span className="line2">STRONGER DEFENSES</span>
              </h2>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number" id="exploits">10+</span>
                <span className="stat-label">SECURITY RESEARCH<br />INITIATIVES</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" id="systems">25+</span>
                <span className="stat-label">SECURITY<br />TOOLS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" id="success">GROWING</span>
                <span className="stat-label">CYBER<br />SYSTEM</span>
              </div>
            </div>

            <div className="hero-cta">
              <Link to="/enquiry" className="btn btn-primary">
                <span className="btn-text">Open Secure Channel</span>
              </Link>
              <Link to="/services" className="btn btn-secondary">
                <span className="btn-icon">&gt;&gt;</span> Enter security lab
              </Link>
            </div>
          </div>
        </div>

        <div className="floating-code">
          <div className="code-snippet" style={{ top: '20%', left: '8%' }}>
            <code>import socket</code>
          </div>
          <div className="code-snippet" style={{ top: '42%', right: '8%' }}>
            <code>chmod +x research_tool</code>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="threat-intel">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">[ SECURITY OPERATIONS ]</span>
            <h2 className="section-title">
              <span className="title-line"></span>
              OUR OFFENSIVE CAPABILITIES
              <span className="title-line"></span>
            </h2>
          </div>

          <div className="capabilities-grid">
            {[
              {
                title: 'CTF BUILDING & HOSTING',
              },
              {
                title: 'ADVERSARIAL SECURITY LEARNING PROGRAMS',
              },
              {
                title: 'RESEARCH & DEVELOPMENT',
              },
              {
                title: 'PENETRATION TESTING & VA',
              },
              {
                title: 'SECURITY TOOL DEVELOPMENT',
              },
              {
                title: 'EXPERT SESSIONS',
              },
              {
                title: 'OPEN WORKSHOPS',
              },
            ].map((capability, index) => (
              <div className="capability-card" key={index}>
                <h3 className="card-title">{capability.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH OPERATIONS ── */}
      <section className="why-section">
        <div className="why-header">
          <div className="ops-label">[ ABOUT OFFSECDIARY ]</div>
          <h2 className="section-title">
            <span className="title-line"></span>
            RESEARCH OPERATIONS
            <span className="title-line"></span>
          </h2>
          <p className="why-quote">
            OffsecDiary is a cybersecurity research and development initiative focused on offensive security.
            Research examines system vulnerabilities across hardware and software environments. Insights drive
            the development of practical security technologies for stronger digital protection.
          </p>
        </div>

        {/* Who We Are */}
        <div className="who-box info-box">
          <h3 className="box-title">WHO WE ARE</h3>
          <p>
            Built around offensive security thinking, technical curiosity, and deep system analysis.
            Focus on understanding how systems break, how attacks evolve, and how security technologies
            can be engineered stronger.
          </p>
        </div>

        {/* What We Do */}
        <div className="what-box info-box">
          <h3 className="box-title">WHAT WE DO</h3>

          <div className="what-we-do-grid">
            {[
              {
                title: 'Hardware Security Research',
                body: 'Secure charging cable concepts, monitored power devices, and personal safety hardware innovations.',
                delay: 0.1,
              },
              {
                title: 'Software Security Development',
                body: 'Password protection systems, SOS safety applications, and Data Loss Prevention (DLP) technologies.',
                delay: 0.2,
              },
              {
                title: 'Cybersecurity Research Tools',
                body: 'Study and development of IDPS concepts, anti-tamper mechanisms, encryption resilience, and data analysis tools.',
                delay: 0.3,
              },
              {
                title: 'Security Testing & Validation',
                body: 'Penetration testing and vulnerability assessment for real-world security evaluation.',
                delay: 0.4,
              },
              {
                title: 'Security Programs',
                body: 'Operation Zero Trust, and cybersecurity workshops.',
                delay: 0.5,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="what-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay }}
              >
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── R&D FOCUS ── */}
      <section className="rd-focus">
        <span className="section-tag">[ ADVANCING CYBERSECURITY THROUGH RESEARCH AND INNOVATION ]</span>
        <div className="rd-container">
          <h2 className="section-title">
            <span className="title-line"></span>
            RESEARCH &amp; INNOVATION LAB
            <span className="title-line"></span>
          </h2>
          <p className="rd-description">
            At OffSecDiary, we focus on research-driven cybersecurity innovation across offensive, defensive,
            and AI-based systems. Our work involves building, testing, and analyzing real-world security
            solutions to address emerging digital and physical threats.
          </p>
          <div className="rd-highlights">
            <div className="highlight">
              <Link to="/certifications" className="highlight-link">
                <span className="highlight-icon">[ VIEW CERTIFICATIONS ]</span>
                <h2>CyberSecurity Certifications</h2>
                <p>
                  Access our research-backed certification tracks focused on hands-on learning,
                  real-world scenarios, and domain-specific expertise in modern cybersecurity fields.
                </p>
              </Link>
            </div>
            <div className="highlight">
              <Link to="/services#our-tools" className="highlight-link">
                <span className="highlight-icon">[ VIEW TOOLS ]</span>
                <h2>Experimental Systems and Prototypes</h2>
                <p>
                  We design and build prototype security tools, defensive systems, and hardware
                  concepts to test real-world attack and defense scenarios.
                </p>
              </Link>
            </div>
            <div className="highlight">
              <Link to="/services/1" className="highlight-link">
                <span className="highlight-icon">[ INITIATE RESEARCH ]</span>
                <h2>Applied Security Research</h2>
                <p>
                  Our research is focused on practical implementation — translating theoretical
                  concepts into deployable security solutions and products.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">[ TESTIMONIALS ]</span>
            <h2 className="section-title">
              <span className="title-line"></span>
              FIELD-NOTES
              <span className="title-line"></span>
            </h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                quote:
                  'Working with OffSecDiary has been an eye-opening experience. The focus here is not just tools or tactics, but understanding security problems through research.',
                role: 'Research Contributor',
              },
              {
                quote:
                  'The discussions and sessions push you to think beyond conventional cybersecurity approaches. It\'s refreshing to see such a research-focused mindset.',
                role: 'Program Participant',
              },
              {
                quote:
                  'OffSecDiary is building a space where experimentation, learning, and responsible security research come together.',
                role: 'Technical Collaborator',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="testimonial-avatar"></div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-role">— {testimonial.role}</div>
              </motion.div>
            ))}
          </div>

          <p className="testimonials-footer">
            Insights and perspectives from individuals engaging with OffSecDiary's research initiatives.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="cta-container">
          <div className="cta-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>

            <div className="cta-content">
              <h2 className="cta-title">
                <span className="cta-prompt">root@offsecdiary:~#</span>
                <span className="cta-command">./initiate_research.sh</span>
              </h2>

              <p className="cta-description">
                Focused on advancing cybersecurity through research, experimentation, and responsible innovation.
                Be part of an ecosystem exploring new ideas to strengthen digital resilience.
              </p>

              <div className="cta-buttons">
                <Link to="/joinus" className="btn btn-primary">
                  <span className="btn-text">START ENGAGEMENT</span>
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  <span className="btn-icon">&gt;&gt;</span> VIEW OPERATIONS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;