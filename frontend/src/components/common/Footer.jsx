import "../../styles/footer.css";
import logo from "../../assets/images/bootlogo_noname.PNG";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="command-footer">

      {/* SCANLINE */}
      <div className="footer-scanline"></div>

      <div className="footer-inner">

        {/* BRAND */}
        <div className="footer-brand">
          <img src={logo} alt="OffSecDiary Logo" className="footer-logo" />
          <span className="footer-name">OFFSECDIARY</span>
        </div>

        {/* LINKS */}
        <div className="footer-links">

          <div className="footer-col">
            <span className="footer-title">NAVIGATION</span>
            <a href="/">Home</a>
            <a href="/events">Events</a>
            <a href="/gallery">Gallery</a>
            <a href="/blogs">Blogs</a>
          </div>

          <div className="footer-col">
            <span className="footer-title">RESOURCES</span>
            <a href="/certifications">Certifications</a>
            <a href="/services">Services</a>
            <a href="/enquiry">Enquiry</a>
          </div>

          <div className="footer-col">
            <span className="footer-title">SYSTEM</span>
            <span className="footer-meta">Status: ONLINE</span>
            <span className="footer-meta">Node: OFFSECDIARY-CORE</span>
            <span className="footer-meta">Build: V2</span>
          </div>

        </div>

        {/* SOCIAL LINKS */}
        <div className="footer-socials">
          <a href="https://www.instagram.com/offsecdiary/?hl=en" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
          
          <a href="https://www.linkedin.com/company/offsecdiary/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://www.facebook.com/people/OffSec-Diary/61582379024581/#" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <span>© 2026 OFFSECDIARY — HACK | DEFEND | INNOVATE</span>
        <span className="footer-tagline">
          Built with curiosity, discipline, and controlled chaos.
        </span>
      </div>

    </footer>
  );
}
