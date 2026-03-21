import { NAV_LINKS, waMsg, EMAIL, SOCIALS } from "../data/constants";

const WaIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 175.216 175.552" fill="currentColor">
    <path d="M87.6 0C39.3 0 0 39.3 0 87.6c0 15.5 4.1 30.2 11.3 43L0 175.6l46.5-11.2c12.4 6.5 26.5 10.2 41.1 10.2 48.3 0 87.6-39.3 87.6-87.6C175.2 39.3 135.9 0 87.6 0zm0 160.3c-13.6 0-26.4-3.7-37.3-10.2l-2.7-1.6-27.7 7 7.3-26.9-1.7-2.8C18.7 115.2 15 101.7 15 87.6 15 47.5 47.5 15 87.6 15c40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.7-72.6 72.7z"/>
    <path d="M127.8 105.7c-2.1-1-12.4-6.1-14.3-6.8-1.9-.7-3.3-1-4.7.9-1.4 1.9-5.4 6.8-6.6 8.2-1.2 1.4-2.4 1.6-4.5.5-2.1-1-8.8-3.2-16.8-10.3-6.2-5.5-10.4-12.3-11.6-14.4-1.2-2.1-.1-3.2.9-4.2.9-.9 2.1-2.4 3.1-3.6 1-1.2 1.4-2.1 2.1-3.5.7-1.4.4-2.6-.2-3.7-.5-1-4.7-11.3-6.4-15.5-1.7-4.1-3.4-3.5-4.7-3.6-.6-.1-2-.1-4-.1s-4.9.8-7 2.9c-2.1 2.1-8 7.8-8 19 0 11.2 8.1 22.1 9.3 23.6 1.2 1.5 15.9 24.3 38.6 34.1 5.4 2.3 9.6 3.7 12.9 4.7 5.4 1.7 10.3 1.5 14.2.9 4.3-.7 13.3-5.4 15.2-10.7 1.9-5.2 1.9-9.7 1.3-10.6-.5-.9-2-1.5-4.1-2.5z"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"var(--bg)", borderTop:"1px solid var(--border)", position:"relative", overflow:"hidden" }}>

      {/* Links grid */}
      <div className="wrap" style={{ padding:"72px var(--gutter) 0", position:"relative", zIndex:2 }}>
        <div className="ft-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr", gap:48, marginBottom:64 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"clamp(1.1rem,1.8vw,1.35rem)", color:"var(--text-1)", marginBottom:16 }}>
              phillip<em style={{ fontStyle:"italic", color:"var(--gold)" }}>Labs</em><span style={{ color:"var(--gold)" }}>.</span>
            </div>
            <p style={{ fontSize:"var(--fs-14)", color:"var(--text-3)", lineHeight:1.85, maxWidth:210, marginBottom:24, fontWeight:300 }}>
              Nairobi-based freelance web developer. Custom digital solutions for Kenyan small businesses.
            </p>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {SOCIALS.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                  style={{ width:34, height:34, background:"var(--surface)", borderRadius:"var(--radius)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-3)", textDecoration:"none", transition:"all 0.22s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color+"55"; e.currentTarget.style.color = s.color; e.currentTarget.style.background = s.color+"12"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <span style={{ width:13, height:13, display:"flex" }} dangerouslySetInnerHTML={{ __html: s.svg }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="sec-label" style={{ marginBottom:20 }}>Navigate</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior:"smooth" })}
                  style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font)", fontSize:"var(--fs-14)", color:"var(--text-3)", textAlign:"left", padding:0, transition:"color 0.2s", width:"fit-content", fontWeight:300 }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--text-1)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-3)"}>{l}</button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="sec-label" style={{ marginBottom:20 }}>Services</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {["Custom Websites","CRM & Dashboards","E-commerce","SEO & Performance","WhatsApp Integration","Maintenance"].map(s => (
                <span key={s} style={{ fontFamily:"var(--font)", fontSize:"var(--fs-14)", color:"var(--text-3)", fontWeight:300 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="sec-label" style={{ marginBottom:20 }}>Contact</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <a href={waMsg("Hi Phillip!")} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"var(--font)", fontSize:"var(--fs-14)", color:"var(--text-3)", textDecoration:"none", transition:"color 0.2s", display:"flex", alignItems:"center", gap:9, fontWeight:300 }}
                onMouseEnter={e => e.currentTarget.style.color = "#25D366"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-3)"}>
                <WaIcon size={13} /> +254 797 321 068
              </a>
              <a href={`mailto:${EMAIL}`}
                style={{ fontFamily:"var(--font)", fontSize:"var(--fs-14)", color:"var(--text-3)", textDecoration:"none", transition:"color 0.2s", display:"flex", alignItems:"center", gap:9, fontWeight:300 }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-3)"}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, opacity:0.5 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                {EMAIL}
              </a>
              <span style={{ fontFamily:"var(--font)", fontSize:"var(--fs-14)", color:"var(--text-3)", display:"flex", alignItems:"center", gap:9, fontWeight:300 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, opacity:0.5 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Nairobi, Kenya
              </span>
            </div>
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--border)" }} />
      </div>

      {/* ── Giant outlined brand text ── */}
      <div style={{ position:"relative", width:"100%", overflow:"hidden", lineHeight:0, zIndex:1 }}>
        <svg viewBox="0 0 1400 260" preserveAspectRatio="xMidYMid meet"
          style={{ width:"100%", height:"auto", display:"block", maxHeight:270 }}
          aria-hidden="true">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#c9a96e" stopOpacity="0.0" />
              <stop offset="25%"  stopColor="#c9a96e" stopOpacity="0.5" />
              <stop offset="50%"  stopColor="#dbbf8a" stopOpacity="0.4" />
              <stop offset="75%"  stopColor="#c9a96e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <text x="50%" y="88%" textAnchor="middle" dominantBaseline="auto"
            style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize: 230,
              fontWeight: 700,
              fontStyle: "italic",
              fill: "none",
              stroke: "url(#goldGrad)",
              strokeWidth: 0.8,
              letterSpacing: "-4px",
            }}>
            phillipLabs.
          </text>
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="wrap" style={{ position:"relative", zIndex:2, padding:"0 var(--gutter) 28px", display:"flex", flexWrap:"wrap", gap:12, justifyContent:"space-between", alignItems:"center" }}>
        <p style={{ fontFamily:"var(--font)", fontSize:"var(--fs-10)", color:"var(--text-4)", letterSpacing:"0.1em" }}>© {year} phillipLabs. All rights reserved.</p>
        <p style={{ fontFamily:"var(--font)", fontSize:"var(--fs-10)", color:"var(--text-4)", letterSpacing:"0.1em" }}>100% Custom Code · No Templates · Nairobi, Kenya</p>
      </div>

      <style>{`
        @media(max-width:900px){ .ft-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:560px){ .ft-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

