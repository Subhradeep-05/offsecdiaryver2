import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./boot.css";
import logo from "../assets/images/bootlogo_noname.PNG";

const ASCII_BANNER = `
  ██████╗ ███████╗███████╗███████╗███████╗ ██████╗██████╗ ██╗ █████╗ ██████╗ ██╗   ██╗
 ██╔═══██╗██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝██╔══██╗██║██╔══██╗██╔══██╗╚██╗ ██╔╝
 ██║   ██║█████╗  █████╗  ███████╗█████╗  ██║     ██║  ██║██║███████║██████╔╝ ╚████╔╝ 
 ██║   ██║██╔══╝  ██╔══╝  ╚════██║██╔══╝  ██║     ██║  ██║██║██╔══██║██╔══██╗  ╚██╔╝  
 ╚██████╔╝██║     ██║     ███████║███████╗╚██████╗██████╔╝██║██║  ██║██║  ██║   ██║   
  ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚══════╝ ╚═════╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
 `;

const bootSequence = [
  { text: "[*] Initializing OFFSECDIARY v2.0.0...", delay: 120 },
  { text: "[+] Loading kernel modules...", delay: 180 },
  { text: "[+] Establishing secure connection...", delay: 220 },
  { text: "[+] Verifying cryptographic signatures...", delay: 200 },
  { text: "[+] Loading security research modules...", delay: 200 },

  { text: "[+] Initializing network interfaces...", delay: 160 },
  { text: "[*] System ready.", delay: 350 },
  { text: "[*] Access granted.", delay: 300 }
];

export default function BootScreen({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => [...prev, bootSequence[currentLine].text]);
        setCurrentLine((prev) => prev + 1);
      }, bootSequence[currentLine].delay);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 900);
      }, 600);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="boot-screen"
        >
          <motion.img
            src={logo}
            alt="Boot Logo"
            className="boot-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="boot-container">
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="boot-banner"
            >
              {ASCII_BANNER}
            </motion.pre>

            <div className="boot-logs">
              {displayedText.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`boot-line ${
                    line.includes("[*]")
                      ? "boot-warn"
                      : line.includes("[+]")
                      ? "boot-ok"
                      : "boot-neutral"
                  }`}
                >
                  {line}
                </motion.div>
              ))}

              {currentLine < bootSequence.length && (
                <span
                  className={`boot-cursor ${showCursor ? "visible" : "hidden"}`}
                >
                  █
                </span>
              )}
            </div>
          </div>

          <div className="boot-status">
            <div className="status-dot" />
            <span>SYSTEM BOOT IN PROGRESS</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
