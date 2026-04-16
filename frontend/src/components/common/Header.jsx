import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/header.css";
import logo from "../../assets/images/bootlogo_noname.PNG";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="command-header">

      {/* TOP SYSTEM BAR */}
      <div className="system-bar">
        <div className="system-left">
          <span className="sys-dot"></span>
          <span>SYSTEM STATUS:</span>
          <span className="sys-online">ONLINE</span>
        </div>

        <div className="system-center">
          <span className="sys-id">offsecdiary</span>
          <span className="sys-tagline">HACK | DEFEND | INNOVATE</span>
        </div>

        <div className="system-right">
          <span className="sys-time">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* MAIN COMMAND STRIP */}
      <div className="command-strip">

        {/* LOGO + NAME */}
        <div className="command-logo" onClick={() => navigate("/boot")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="OffSecDiary Logo" className="brand-logo" />
          <span className="brand-name">OFFSECDIARY</span>
        </div>

        {/* NAV */}
        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`command-nav ${menuOpen ? "open" : ""}`}
             onClick={() => setMenuOpen(false)}>
          <NavLink to="/" end data-cmd="00">HOME</NavLink>
          <NavLink to="/events" data-cmd="01">EVENTS</NavLink>
          <NavLink to="/gallery" data-cmd="02">GALLERY</NavLink>
          <NavLink to="/blogs" data-cmd="03">BLOGS</NavLink>
          <NavLink to="/certifications" data-cmd="04">CERTIFICATIONS</NavLink>
          <NavLink to="/services" data-cmd="05">SERVICES</NavLink>
          <NavLink to="/JoinUs" data-cmd="06">JOIN US</NavLink>
        </nav>

        {/* CTA */}
        <NavLink to="/enquiry" className="command-action">
          INITIATE_CONTACT
        </NavLink>
      </div>

      <div className="scanline"></div>
    </header>
  );
}
