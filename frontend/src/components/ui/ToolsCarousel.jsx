import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Terminal, Shield, Zap, Lock, Eye, Cpu, Database, Globe, Code, Wifi, Fingerprint } from 'lucide-react';
import './tools-carousel.css';

const tools = [
  { name: 'CRYPTOVAULT', description: 'Password manager (encrypted)', status: 'Module Active' },
  { name: 'DATA GUARD', description: 'Data loss prevention system', status: 'Research' },
  { name: 'GATEKEEPER', description: 'Secure charging cable (data block)', status: 'Development' },
  { name: 'SECURE POWER', description: 'Safe charging device (concept)', status: 'Concept' },
  { name: 'SAFEGUARD WEARABLE', description: 'Personal safety device', status: 'Development' },
  { name: 'SOS SAFETY APP', description: 'Emergency app with alerts', status: 'Development' },
  { name: 'DEFENSIVE SECURITY TOOLS', description: 'IDPS, Anti-forensics, Encryption tools', status: 'Research' }
];

function ToolCard({ tool, rotation }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="tool-card-wrapper"
      style={{
        transform: `translate(-50%, -50%) rotateY(${rotation}deg) translateZ(300px)`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="tool-card"
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          rotateY: isHovered ? 0 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="tool-front">
          <h3 className="tool-name">{tool.name}</h3>
          <p className="tool-description">{tool.description}</p>
          <span className="tool-status">{tool.status}</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function ToolsCarousel() {
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Auto-rotation effect
  React.useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleDrag = (_, info) => {
    setIsAutoRotating(false);
    setRotation((prev) => prev + info.delta.x * 0.3);
  };

  const handleMouseEnter = () => setIsAutoRotating(false);
  const handleMouseLeave = () => setIsAutoRotating(true);

  return (
    <section className="tools-section">
      <div className="tools-header">
        <span className="section-tag">[ ARMORY MODULE ]</span>
        <h2 className="section-title">
          <span className="title-line"></span>
          OUR INNOVATIONS
          <span className="title-line"></span>
        </h2>
        <p>
          Industry-standard offensive security tools and custom utilities powering our operations.
        </p>
      </div>

      <div 
        className="tools-carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDrag={handleDrag}
          className="tools-carousel"
        >
          {tools.map((tool, index) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              rotation={(index * 360) / tools.length + rotation}
            />
          ))}
        </motion.div>

        <div className="tools-controls">
          <button 
            className="tools-nav-btn"
            onClick={() => setRotation((prev) => prev - 30)}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="tools-status">
            <span className="tools-count">{tools.length} TOOLS LOADED</span>
            <div className="tools-status-indicator">
              <span className="status-dot"></span>
              <span>OPERATIONAL</span>
            </div>
          </div>
          <button 
            className="tools-nav-btn"
            onClick={() => setRotation((prev) => prev + 30)}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="tools-drag-hint">
          <ChevronLeft size={16} />
          <span>DRAG TO BROWSE TOOLS</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </section>
  );
}
