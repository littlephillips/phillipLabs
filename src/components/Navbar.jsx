import { useState, useEffect } from "react";
import { NAV_LINKS, waMsg } from "../data/constants";

export default function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "0 5vw",
          background: scrolled ? "rgba(12,14,20,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid #242838" : "1px solid transparent",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            cursor: "pointer",
          }}
          onClick={() => scrollTo("About")}
        >
          <span style={{ color: "#e8e4dc" }}>phillipLabs</span>
          <span style={{ color: "#c8853a" }}>.</span>
        </div>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
          }}
          className="desk-nav"
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: active === l ? "#c8853a" : "#7a7870",
                transition: "color 0.3s",
                padding: "4px 0",
                borderBottom: active === l ? "1px solid #c8853a" : "1px solid transparent",
              }}
            >
              {l}
            </button>
          ))}
          <a
            href={waMsg("Hi Phillip, I'd like to discuss a website project!")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "9px 18px",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            💬 WhatsApp
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ham"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#e8e4dc",
            fontSize: 22,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 68, left: 0, right: 0,
            zIndex: 99,
            background: "rgba(12,14,20,0.98)",
            backdropFilter: "blur(20px)",
            padding: "24px 5vw 32px",
            borderBottom: "1px solid #242838",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#b8b4ac",
                textAlign: "left",
                padding: "14px 0",
                borderBottom: "1px solid #242838",
              }}
            >
              {l}
            </button>
          ))}
          <a
            href={waMsg("Hi Phillip, I'd like to discuss a website project!")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 16,
              background: "#25D366",
              color: "#fff",
              borderRadius: 10,
              padding: 14,
              fontSize: 14,
              fontWeight: 500,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            💬 Order via WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media(max-width: 768px) {
          .desk-nav { display: none !important; }
          .ham { display: block !important; }
        }
      `}</style>
    </>
  );
}
