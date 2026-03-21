import { useState, useEffect, useRef } from "react";
import { PROJECTS } from "../data/constants";

const PROJECT_URLS = {
  "Logic Architect":       "https://logicarchitect54.web.app/",
  "Admin Logic Architect": "https://logicarchitectcrm.web.app/crm",
  "Estaka Parts":          "https://estakaparts.web.app/",
  "Admin Estaka Parts":    "https://estaka-crm.web.app/",
  "AllinEvents":           "https://allineventsclient.web.app/",
  "Admin AllinEvents":     "https://allinevents-6be19.web.app/crm",
  "Cash Advance":          "https://cash-advance-72.web.app/",
  "Peak Performance Co.":  "#",
  "Glam Studio":           "#",
  "Iron & Sweat Gym":      "#",
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);

  const tags = ["All", ...new Set(PROJECTS.map(p => p.tag))];
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === filter);

  useEffect(() => {
    const g = window.gsap, ST = window.ScrollTrigger;
    if (!g || !ST) return;
    g.registerPlugin(ST);
    g.fromTo(".proj-hdr", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
  }, []);

  useEffect(() => {
    const g = window.gsap; if (!g) return;
    g.fromTo(".proj-card", { opacity: 0, y: 20, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" });
  }, [filter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "var(--sec-pad) 0",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="wrap">
        {/* Header */}
        <div className="proj-hdr" style={{ opacity: 0, marginBottom: 44 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-10)", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--amber)" }}>Portfolio</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-48)", letterSpacing: "-0.03em", color: "var(--text-1)", marginTop: 10, lineHeight: 1.08 }}>
                Live Projects
              </h2>
            </div>
            <p style={{ fontSize: "var(--fs-13, 0.82rem)", color: "var(--text-4)", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
              Click any card to open live →
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 36 }}>
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                background: filter === t ? "var(--amber)" : "var(--bg-card)",
                color: filter === t ? "#0a0c12" : "var(--text-3)",
                border: `1px solid ${filter === t ? "var(--amber)" : "var(--border)"}`,
                borderRadius: 100, padding: "6px 16px",
                fontFamily: "var(--font)", fontSize: "var(--fs-12)", fontWeight: 600,
                letterSpacing: "0.03em", cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: filter === t ? "0 4px 14px rgba(212,135,74,0.25)" : "none",
              }}
              onMouseEnter={e => { if (filter !== t) { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text-2)"; } }}
              onMouseLeave={e => { if (filter !== t) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; } }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid — tighter, compact cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 14,
        }}>
          {shown.map((p) => {
            const url = PROJECT_URLS[p.title];
            const isLive = url && url !== "#";
            return (
              <a
                key={p.title}
                href={url || "#"}
                target={isLive ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="proj-card"
                style={{
                  opacity: 0,
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 18,
                  padding: "20px 20px 18px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: isLive ? "pointer" : "default",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.28)",
                  transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.4)`;
                  e.currentTarget.style.borderColor = p.color + "55";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.28)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {/* Top color stripe */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: p.color, borderRadius: "18px 18px 0 0", opacity: 0.8,
                }} />
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 56,
                  background: `linear-gradient(180deg, ${p.color}10, transparent)`,
                  pointerEvents: "none",
                }} />

                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: p.color, background: `${p.color}16`,
                    padding: "2px 9px", borderRadius: 100, border: `1px solid ${p.color}28`,
                  }}>{p.tag}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-4)" }}>
                      {String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}
                    </span>
                    {isLive && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 600,
                  fontSize: "var(--fs-18)", color: "var(--text-1)",
                  marginBottom: 7, letterSpacing: "-0.02em", lineHeight: 1.25,
                }}>{p.title}</h3>

                <p style={{
                  fontSize: "var(--fs-12)", color: "var(--text-3)",
                  lineHeight: 1.75, marginBottom: 16, flex: 1,
                }}>{p.desc}</p>

                {/* Stack pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
                  {p.stack.slice(0, 4).map(s => (
                    <span key={s} style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                      color: "var(--text-4)", background: "var(--bg)",
                      border: "1px solid var(--border)", borderRadius: 5,
                      padding: "2px 7px",
                    }}>{s}</span>
                  ))}
                  {p.stack.length > 4 && (
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                      color: "var(--text-4)", padding: "2px 4px",
                    }}>+{p.stack.length - 4}</span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @media(max-width: 640px) {
          #projects .wrap > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media(min-width: 641px) and (max-width: 960px) {
          #projects .wrap > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
