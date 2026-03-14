import { useState, useEffect } from "react";
import { NAV_LINKS, waMsg } from "../data/constants";

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 175.216 175.552" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M87.6 0C39.3 0 0 39.3 0 87.6c0 15.5 4.1 30.2 11.3 43L0 175.6l46.5-11.2c12.4 6.5 26.5 10.2 41.1 10.2 48.3 0 87.6-39.3 87.6-87.6C175.2 39.3 135.9 0 87.6 0zm0 160.3c-13.6 0-26.4-3.7-37.3-10.2l-2.7-1.6-27.7 7 7.3-26.9-1.7-2.8C18.7 115.2 15 101.7 15 87.6 15 47.5 47.5 15 87.6 15c40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.7-72.6 72.7z"/>
    <path d="M127.8 105.7c-2.1-1-12.4-6.1-14.3-6.8-1.9-.7-3.3-1-4.7.9-1.4 1.9-5.4 6.8-6.6 8.2-1.2 1.4-2.4 1.6-4.5.5-2.1-1-8.8-3.2-16.8-10.3-6.2-5.5-10.4-12.3-11.6-14.4-1.2-2.1-.1-3.2 0.9-4.2.9-.9 2.1-2.4 3.1-3.6 1-1.2 1.4-2.1 2.1-3.5.7-1.4.4-2.6-.2-3.7-.5-1-4.7-11.3-6.4-15.5-1.7-4.1-3.4-3.5-4.7-3.6-.6-.1-2-.1-4-.1s-4.9.8-7 2.9c-2.1 2.1-8 7.8-8 19 0 11.2 8.1 22.1 9.3 23.6 1.2 1.5 15.9 24.3 38.6 34.1 5.4 2.3 9.6 3.7 12.9 4.7 5.4 1.7 10.3 1.5 14.2.9 4.3-.7 13.3-5.4 15.2-10.7 1.9-5.2 1.9-9.7 1.3-10.6-.5-.9-2-1.5-4.1-2.5z"/>
  </svg>
);

export default function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Nav bar ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 70,
        background: scrolled ? "rgba(10,12,18,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s",
      }}>
        {/* Full-width inner row */}
        <div className="wrap" style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}>

          {/* Logo */}
          <div onClick={() => scrollTo("About")} style={{
            fontFamily: "var(--font)", fontWeight: 800,
            fontSize: "var(--fs-20)",
            letterSpacing: "-0.04em",
            cursor: "pointer", userSelect: "none", flexShrink: 0,
            color: "var(--text-1)",
          }}>
            phillip<span style={{ color: "var(--amber)" }}>Labs</span><span style={{ color: "var(--amber)" }}>.</span>
          </div>

          {/* Desktop nav — fills the middle */}
          <div className="desk-nav" style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font)",
                fontSize: "var(--fs-14)",
                fontWeight: active === l ? 700 : 500,
                color: active === l ? "var(--text-1)" : "var(--text-3)",
                padding: "8px 16px", borderRadius: 10,
                transition: "color 0.2s, background 0.2s",
                position: "relative",
              }}
              onMouseEnter={e => { if (active !== l) { e.currentTarget.style.color="var(--text-2)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}}
              onMouseLeave={e => { if (active !== l) { e.currentTarget.style.color="var(--text-3)"; e.currentTarget.style.background="none"; }}}
              >
                {l}
                {active === l && <span style={{
                  position:"absolute", bottom:4, left:"50%",
                  transform:"translateX(-50%)",
                  width:5, height:5, borderRadius:"50%",
                  background:"var(--amber)",
                  boxShadow:"0 0 8px var(--amber)",
                  display:"block",
                  animation: "pulseGlow 2s ease-in-out infinite",
                }} />}
              </button>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a href={waMsg("Hi Phillip, I'd like to discuss a website project!")}
            target="_blank" rel="noopener noreferrer"
            className="desk-nav clay-btn"
            style={{
              background: "var(--wa)",
              color: "#fff",
              fontSize: "var(--fs-14)",
              fontWeight: 700,
              padding: "10px 22px",
              flexShrink: 0,
              letterSpacing: "-0.01em",
            }}>
            <WaIcon size={16} />
            WhatsApp Me
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="ham" style={{
            display:"none", flexShrink:0,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12, cursor:"pointer",
            width:42, height:42,
            alignItems:"center", justifyContent:"center",
            flexDirection:"column", gap:5,
            boxShadow: "var(--clay-shadow-sm)",
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:"block", height:1.5, borderRadius:2,
                background: menuOpen && i===1 ? "transparent" : "var(--text-2)",
                width: i===1 ? (menuOpen ? 0 : 13) : 18,
                transform: menuOpen && i===0 ? "rotate(45deg) translate(0,3px)" :
                           menuOpen && i===2 ? "rotate(-45deg) translate(0,-3px)" : "none",
                transition:"all 0.28s",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="mobile-menu" style={{
        position:"fixed", top:70, left:0, right:0, zIndex:999,
        background:"rgba(10,12,18,0.97)",
        backdropFilter:"blur(24px)",
        padding: menuOpen ? "20px var(--gutter) 28px" : "0 var(--gutter)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transform: menuOpen ? "translateY(0)" : "translateY(-6px)",
        transition:"opacity 0.28s, transform 0.28s",
        display:"none",
        borderBottom: "1px solid var(--border)",
      }}>
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => scrollTo(l)} style={{
            display:"block", width:"100%",
            background:"none", border:"none",
            borderBottom:"1px solid var(--border)",
            cursor:"pointer", fontFamily:"var(--font)",
            fontSize:"var(--fs-16)", fontWeight:600,
            color: active===l ? "var(--amber)" : "var(--text-2)",
            textAlign:"left", padding:"16px 0",
          }}>{l}</button>
        ))}
        
        {/*  whatsapp cta in mobile menu */}
        {/* <a href={waMsg("Hi Phillip, I'd like to discuss a website project!")}
          target="_blank" rel="noopener noreferrer"
          style={{
            marginTop:18, display:"flex", alignItems:"center",
            justifyContent:"center", gap:8,
            background:"var(--wa)", color:"#fff", borderRadius:14,
            padding:"14px 20px", fontFamily:"var(--font)",
            fontSize:"var(--fs-14)", fontWeight:700, textDecoration:"none",
          }}>
          <WaIcon size={17} /> WhatsApp Me
        </a> */}
      </div>

      <style>{`
        @media(max-width:860px){
          .desk-nav{display:none!important}
          .ham{display:flex!important}
          .mobile-menu{display:block!important}
        }
      `}</style>
    </>
  );
}
