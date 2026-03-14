import { useEffect, useRef } from "react";
import { EMAIL, SOCIALS, waMsg } from "../data/constants";
import OrderForm from "./OrderForm";

const WaIcon=({size=22})=>(
  <svg width={size} height={size} viewBox="0 0 175.216 175.552" fill="currentColor">
    <path d="M87.6 0C39.3 0 0 39.3 0 87.6c0 15.5 4.1 30.2 11.3 43L0 175.6l46.5-11.2c12.4 6.5 26.5 10.2 41.1 10.2 48.3 0 87.6-39.3 87.6-87.6C175.2 39.3 135.9 0 87.6 0zm0 160.3c-13.6 0-26.4-3.7-37.3-10.2l-2.7-1.6-27.7 7 7.3-26.9-1.7-2.8C18.7 115.2 15 101.7 15 87.6 15 47.5 47.5 15 87.6 15c40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.7-72.6 72.7z"/>
    <path d="M127.8 105.7c-2.1-1-12.4-6.1-14.3-6.8-1.9-.7-3.3-1-4.7.9-1.4 1.9-5.4 6.8-6.6 8.2-1.2 1.4-2.4 1.6-4.5.5-2.1-1-8.8-3.2-16.8-10.3-6.2-5.5-10.4-12.3-11.6-14.4-1.2-2.1-.1-3.2.9-4.2.9-.9 2.1-2.4 3.1-3.6 1-1.2 1.4-2.1 2.1-3.5.7-1.4.4-2.6-.2-3.7-.5-1-4.7-11.3-6.4-15.5-1.7-4.1-3.4-3.5-4.7-3.6-.6-.1-2-.1-4-.1s-4.9.8-7 2.9c-2.1 2.1-8 7.8-8 19 0 11.2 8.1 22.1 9.3 23.6 1.2 1.5 15.9 24.3 38.6 34.1 5.4 2.3 9.6 3.7 12.9 4.7 5.4 1.7 10.3 1.5 14.2.9 4.3-.7 13.3-5.4 15.2-10.7 1.9-5.2 1.9-9.7 1.3-10.6-.5-.9-2-1.5-4.1-2.5z"/>
  </svg>
);

export default function Contact() {
  const sectionRef=useRef(null);

  useEffect(()=>{
    const g=window.gsap,ST=window.ScrollTrigger; if(!g||!ST)return;
    g.registerPlugin(ST);
    g.fromTo(".ct-left",{opacity:0,x:-28},{opacity:1,x:0,duration:0.85,scrollTrigger:{trigger:sectionRef.current,start:"top 78%"}});
    g.fromTo(".ct-right",{opacity:0,x:28},{opacity:1,x:0,duration:0.85,delay:0.12,scrollTrigger:{trigger:sectionRef.current,start:"top 78%"}});
  },[]);

  return (
    <section id="contact" ref={sectionRef} style={{padding:"var(--sec-pad) 0"}}>
      <div className="wrap" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:60}}>
        {/* Left */}
        <div className="ct-left" style={{opacity:0}}>
          <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--amber)"}}>Let's Work Together</span>
          <h2 style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-48)",letterSpacing:"-0.04em",color:"var(--text-1)",marginTop:12,marginBottom:20,lineHeight:1.08}}>Ready to Build<br/>Something?</h2>
          <p style={{fontSize:"var(--fs-16)",color:"var(--text-3)",lineHeight:1.85,marginBottom:40,maxWidth:400}}>
            Whether you need a simple website or a full business operations system — I'm here. Fastest way is WhatsApp.
          </p>

          {/* Contact cards */}
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:36}}>
            {/* WA */}
            <a href={waMsg("Hi Phillip! I want to discuss a web project.")}
              target="_blank" rel="noopener noreferrer"
              className="clay-sm"
              style={{
                display:"flex",alignItems:"center",gap:16,
                padding:"16px 18px",textDecoration:"none",
                background:"var(--wa-dim)",
                border:"1px solid rgba(37,211,102,0.18)",
                borderRadius:"var(--clay-radius-sm)",
                transition:"background 0.25s,transform 0.25s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(37,211,102,0.13)";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="var(--wa-dim)";e.currentTarget.style.transform="translateY(0)";}}
            >
              <span style={{color:"var(--wa)",flexShrink:0}}><WaIcon size={22}/></span>
              <div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--wa)",marginBottom:3}}>WhatsApp (Fastest)</div>
                <div style={{fontFamily:"var(--font)",fontWeight:600,fontSize:"var(--fs-16)",color:"var(--text-2)"}}>+254 797 321 068</div>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${EMAIL}`}
              className="clay-sm"
              style={{
                display:"flex",alignItems:"center",gap:16,
                padding:"16px 18px",textDecoration:"none",
                background:"var(--amber-dim)",
                border:"1px solid var(--amber-bd)",
                borderRadius:"var(--clay-radius-sm)",
                transition:"background 0.25s,transform 0.25s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="var(--amber-glow)";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="var(--amber-dim)";e.currentTarget.style.transform="translateY(0)";}}
            >
              <span style={{color:"var(--amber)",flexShrink:0}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                </svg>
              </span>
              <div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--amber)",marginBottom:3}}>Email</div>
                <div style={{fontFamily:"var(--font)",fontWeight:600,fontSize:"var(--fs-14)",color:"var(--text-2)"}}>{EMAIL}</div>
              </div>
            </a>
          </div>

          {/* Socials */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {SOCIALS.map(s=>(
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                className="clay-sm"
                style={{
                  width:42,height:42,
                  background:"var(--bg-card)",borderRadius:12,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:"var(--text-3)",textDecoration:"none",
                  transition:"all 0.22s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color+"66";e.currentTarget.style.color=s.color;e.currentTarget.style.background=s.color+"14";e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-3)";e.currentTarget.style.background="var(--bg-card)";e.currentTarget.style.transform="translateY(0)";}}>
                <span style={{width:16,height:16,display:"flex"}} dangerouslySetInnerHTML={{__html:s.svg}}/>
              </a>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="ct-right" style={{opacity:0}}><OrderForm/></div>
      </div>
    </section>
  );
}
