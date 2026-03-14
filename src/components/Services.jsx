import { useEffect, useRef } from "react";
import { SERVICES } from "../data/constants";

const ICONS = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="4" height="11"/><rect x="10" y="4" width="4" height="17"/><rect x="17" y="7" width="4" height="14"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
];

const ACCENT = ["#6366f1","#22c55e","#f59e0b","#ec4899","#14b8a6","#d4874a"];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(()=>{
    const g=window.gsap,ST=window.ScrollTrigger; if(!g||!ST)return;
    g.registerPlugin(ST);
    g.fromTo(".svc-hdr",{opacity:0,y:28},{opacity:1,y:0,duration:0.85,scrollTrigger:{trigger:sectionRef.current,start:"top 80%"}});
    sectionRef.current?.querySelectorAll(".svc-card").forEach((c,i)=>{
      g.fromTo(c,{opacity:0,y:32,scale:0.96},{opacity:1,y:0,scale:1,duration:0.65,delay:i*0.08,ease:"power3.out",scrollTrigger:{trigger:c,start:"top 88%"}});
    });
  },[]);

  return (
    <section id="services" ref={sectionRef} style={{padding:"var(--sec-pad) 0"}}>
      <div className="wrap">
        {/* Header */}
        <div className="svc-hdr" style={{opacity:0,marginBottom:60}}>
          <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--amber)"}}>What I Do</span>
          <h2 style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-48)",letterSpacing:"-0.04em",color:"var(--text-1)",marginTop:12,marginBottom:12,lineHeight:1.08}}>Services</h2>
          <p style={{fontSize:"var(--fs-16)",color:"var(--text-3)",maxWidth:400,lineHeight:1.8}}>End-to-end digital solutions built from scratch. Every project is unique.</p>
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
          {SERVICES.map((s,i)=>(
            <div key={s.title} className="svc-card clay" style={{opacity:0,padding:"32px 28px",position:"relative",overflow:"hidden"}}>
              {/* Top gradient tint */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:ACCENT[i],borderRadius:"22px 22px 0 0",opacity:0.8}}/>
              <div style={{position:"absolute",top:0,left:0,right:0,height:80,background:`linear-gradient(180deg,${ACCENT[i]}0d,transparent)`,pointerEvents:"none"}}/>

              {/* Number */}
              <span style={{position:"absolute",top:22,right:24,fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",color:"var(--text-4)",letterSpacing:"0.1em"}}>0{i+1}</span>

              {/* Icon */}
              <div style={{
                width:48,height:48,borderRadius:14,marginBottom:22,
                background:`${ACCENT[i]}18`,
                border:`1px solid ${ACCENT[i]}40`,
                display:"flex",alignItems:"center",justifyContent:"center",
                color:ACCENT[i],
                boxShadow:`0 4px 14px ${ACCENT[i]}22, 0 1px 0 rgba(255,255,255,0.06) inset`,
              }}>{ICONS[i]}</div>

              <h3 style={{fontFamily:"var(--font)",fontWeight:700,fontSize:"var(--fs-18)",color:"var(--text-1)",marginBottom:10,letterSpacing:"-0.02em"}}>{s.title}</h3>
              <p style={{fontSize:"var(--fs-14)",color:"var(--text-3)",lineHeight:1.82}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
