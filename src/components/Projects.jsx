import { useState, useEffect, useRef } from "react";
import { PROJECTS } from "../data/constants";

/* project links */
const PROJECT_URLS = {
  "Logic Architect":        "https://logicarchitect54.web.app/",  
  "Admin Logic Architect":  "https://logicarchitectcrm.web.app/crm", 

  "Estaka Parts":           "https://estakaparts.web.app/",
  "Admin Estaka Parts":     "https://estaka-crm.web.app/",

  "AllinEvents":            "https://allineventsclient.web.app/",
  "Admin AllinEvents":      "https://allinevents-6be19.web.app/crm",

  "Cash Advance":           "https://cash-advance-72.web.app/",
  
  "Peak Performance Co.":   "#",
  "Glam Studio":            "#",
  "Iron & Sweat Gym":       "#",
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);

  const tags = ["All",...new Set(PROJECTS.map(p=>p.tag))];
  const shown = filter==="All" ? PROJECTS : PROJECTS.filter(p=>p.tag===filter);

  useEffect(()=>{
    const g=window.gsap,ST=window.ScrollTrigger; if(!g||!ST)return;
    g.registerPlugin(ST);
    g.fromTo(".proj-hdr",{opacity:0,y:28},{opacity:1,y:0,duration:0.85,scrollTrigger:{trigger:sectionRef.current,start:"top 80%"}});
  },[]);

  useEffect(()=>{
    const g=window.gsap; if(!g)return;
    g.fromTo(".proj-card",{opacity:0,y:26,scale:0.97},{opacity:1,y:0,scale:1,duration:0.58,stagger:0.07,ease:"power3.out"});
  },[filter]);

  return (
    <section id="projects" ref={sectionRef} style={{
      padding:"var(--sec-pad) 0",
      background:"var(--surface)",
      borderTop:"1px solid var(--border)",
      borderBottom:"1px solid var(--border)",
    }}>
      <div className="wrap">
        {/* Header */}
        <div className="proj-hdr" style={{opacity:0,marginBottom:52}}>
          <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--amber)"}}>Portfolio</span>
          <h2 style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-48)",letterSpacing:"-0.04em",color:"var(--text-1)",marginTop:12,lineHeight:1.08}}>Done Projects</h2>
          <p style={{fontSize:"var(--fs-14)",color:"var(--text-3)",marginTop:10}}>Click any project to open it in a new tab.</p>
        </div>

        {/* Filter tabs */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:44}}>
          {tags.map(t=>(
            <button key={t} onClick={()=>setFilter(t)} style={{
              background: filter===t ? "var(--amber)" : "transparent",
              color: filter===t ? "#0a0c12" : "var(--text-3)",
              border:`1px solid ${filter===t?"var(--amber)":"var(--border)"}`,
              borderRadius:100, padding:"7px 18px",
              fontFamily:"var(--font)",fontSize:"var(--fs-12)",fontWeight:600,
              letterSpacing:"0.04em",cursor:"pointer",
              transition:"all 0.22s",
              boxShadow: filter===t ? "0 4px 16px rgba(212,135,74,0.28),0 1px 0 rgba(255,255,255,0.08) inset" : "none",
            }}
            onMouseEnter={e=>{if(filter!==t){e.currentTarget.style.borderColor="var(--border-2)";e.currentTarget.style.color="var(--text-2)";}}}
            onMouseLeave={e=>{if(filter!==t){e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-3)";}}}
            >{t}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:18}}>
          {shown.map((p,idx)=>{
            const url = PROJECT_URLS[p.title];
            return (
              <a
                key={p.title}
                href={url || "#"}
                target={url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="proj-card"
                style={{
                  opacity:0,
                  display:"block",
                  textDecoration:"none",
                  background:"var(--bg-card)",
                  border:"1px solid var(--border)",
                  borderRadius:"var(--clay-radius)",
                  padding:"28px 26px",
                  position:"relative",overflow:"hidden",
                  cursor: url ? "pointer" : "default",
                  boxShadow:"var(--clay-shadow)",
                  transition:"transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={e=>{
                  e.currentTarget.style.transform="translateY(-5px) scale(1.01)";
                  e.currentTarget.style.boxShadow=`var(--clay-shadow-hover)`;
                  e.currentTarget.style.borderColor=p.color+"66";
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.transform="translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow="var(--clay-shadow)";
                  e.currentTarget.style.borderColor="var(--border)";
                }}
              >
                {/* Top stripe */}
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:p.color,borderRadius:"22px 22px 0 0",opacity:0.75}}/>
                <div style={{position:"absolute",top:0,left:0,right:0,height:72,background:`linear-gradient(180deg,${p.color}12,transparent)`,pointerEvents:"none"}}/>

                {/* Top row */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,marginTop:4}}>
                  <span style={{
                    fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",
                    letterSpacing:"0.2em",textTransform:"uppercase",
                    color:p.color,
                    background:`${p.color}18`,
                    padding:"3px 10px",borderRadius:100,
                  }}>{p.tag}</span>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",color:"var(--text-4)",letterSpacing:"0.1em"}}>
                      {String(PROJECTS.indexOf(p)+1).padStart(2,"0")}
                    </span>
                    {url && (
                      <span style={{color:"var(--text-3)",display:"flex",alignItems:"center"}}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>

                <h3 style={{
                  fontFamily:"var(--font)",fontWeight:800,
                  fontSize:"var(--fs-20)",
                  color:"var(--text-1)",marginBottom:10,
                  letterSpacing:"-0.03em",lineHeight:1.2,
                }}>{p.title}</h3>

                <p style={{fontSize:"var(--fs-14)",color:"var(--text-3)",lineHeight:1.8,marginBottom:20}}>{p.desc}</p>

                {/* Stack */}
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {p.stack.map(s=>(
                    <span key={s} style={{
                      fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",
                      color:"var(--text-4)",
                      background:"var(--bg)",
                      border:"1px solid var(--border)",
                      borderRadius:6,padding:"2px 8px",
                    }}>{s}</span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
