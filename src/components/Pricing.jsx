import { useState, useEffect, useRef } from "react";
import { PACKAGES, ADDONS, waMsg } from "../data/constants";
import CheckIcon from "./CheckIcon";

export default function Pricing() {
  const [monthly,setMonthly]=useState(false);
  const sectionRef=useRef(null);

  useEffect(()=>{
    const g=window.gsap,ST=window.ScrollTrigger; if(!g||!ST)return;
    g.registerPlugin(ST);
    g.fromTo(".pr-hdr",{opacity:0,y:28},{opacity:1,y:0,duration:0.85,scrollTrigger:{trigger:sectionRef.current,start:"top 80%"}});
    sectionRef.current?.querySelectorAll(".pkg-card").forEach((c,i)=>{
      g.fromTo(c,{opacity:0,y:32,scale:0.96},{opacity:1,y:0,scale:1,duration:0.65,delay:i*0.09,ease:"power3.out",scrollTrigger:{trigger:c,start:"top 88%"}});
    });
    sectionRef.current?.querySelectorAll(".addon-card").forEach((c,i)=>{
      g.fromTo(c,{opacity:0,y:22},{opacity:1,y:0,duration:0.5,delay:i*0.07,ease:"power3.out",scrollTrigger:{trigger:c,start:"top 90%"}});
    });
  },[]);

  return (
    <section id="pricing" ref={sectionRef} style={{padding:"var(--sec-pad) 0"}}>
      <div className="wrap">
        {/* Header */}
        <div className="pr-hdr" style={{opacity:0,marginBottom:52}}>
          <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--amber)"}}>Transparent Pricing</span>
          <h2 style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-48)",letterSpacing:"-0.04em",color:"var(--text-1)",marginTop:12,lineHeight:1.08}}>Packages</h2>
        </div>

        {/* Toggle */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:52}}>
          <span style={{fontFamily:"var(--font)",fontSize:"var(--fs-14)",fontWeight:600,color:!monthly?"var(--text-1)":"var(--text-4)",transition:"color 0.3s"}}>One-time</span>
          <div onClick={()=>setMonthly(!monthly)} style={{
            width:48,height:26,
            background:monthly?"var(--amber-dim)":"var(--surface)",
            border:`1px solid ${monthly?"var(--amber-bd)":"var(--border)"}`,
            borderRadius:100,position:"relative",cursor:"pointer",
            boxShadow:"var(--clay-shadow-sm)",transition:"all 0.3s",
          }}>
            <div style={{
              position:"absolute",top:3,left:monthly?24:3,
              width:18,height:18,borderRadius:"50%",background:"var(--amber)",
              transition:"left 0.3s cubic-bezier(0.4,0,0.2,1)",
              boxShadow:"0 0 10px rgba(212,135,74,0.5)",
            }}/>
          </div>
          <span style={{fontFamily:"var(--font)",fontSize:"var(--fs-14)",fontWeight:600,color:monthly?"var(--text-1)":"var(--text-4)",transition:"color 0.3s"}}>Monthly</span>
        </div>

        {/* Cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18,alignItems:"start"}}>
          {PACKAGES.map((p,i)=><PricingCard key={p.tier} pkg={p} monthly={monthly} idx={i}/>)}
        </div>

        {/* Addons */}
        <div style={{marginTop:80}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:30}}>
            <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--amber)",whiteSpace:"nowrap"}}>Monthly Subscriptions</span>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
            {ADDONS.map(a=>(
              <div key={a.name} className="addon-card clay-sm" style={{opacity:0,padding:"22px 20px",background:"var(--bg-card)",transition:"transform 0.25s, box-shadow 0.25s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}
              >
                <p style={{fontFamily:"var(--font)",fontWeight:700,fontSize:"var(--fs-16)",color:"var(--text-1)",marginBottom:6}}>{a.name}</p>
                <p style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-20)",color:"var(--amber)",marginBottom:8}}>{a.price}</p>
                <p style={{fontSize:"var(--fs-12)",color:"var(--text-3)",lineHeight:1.7}}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({pkg:p,monthly,idx}){
  return (
    <div className="pkg-card clay" style={{
      opacity:0,
      padding:"30px 24px",position:"relative",overflow:"hidden",
      transform:p.featured?"translateY(-10px)":"none",
      border:`1px solid ${p.featured?"var(--amber-bd)":"var(--border)"}`,
      boxShadow:p.featured
        ?"0 2px 0 rgba(255,255,255,0.09) inset,0 -2px 0 rgba(0,0,0,0.3) inset,0 20px 60px rgba(212,135,74,0.12),0 4px 16px rgba(0,0,0,0.4)"
        :"var(--clay-shadow)",
    }}>
      {/* Top stripe */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:p.color,borderRadius:"22px 22px 0 0",opacity:0.75}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:80,background:`linear-gradient(180deg,${p.color}10,transparent)`,pointerEvents:"none"}}/>

      {p.featured&&(
        <div style={{
          position:"absolute",top:14,right:14,
          fontFamily:"var(--font)",fontSize:"var(--fs-10)",fontWeight:700,
          letterSpacing:"0.08em",textTransform:"uppercase",
          background:"var(--amber)",color:"#0a0c12",
          padding:"3px 12px",borderRadius:100,
          boxShadow:"0 4px 14px rgba(212,135,74,0.35)",
        }}>Popular</div>
      )}

      {/* Tier badge */}
      <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:18,padding:"4px 12px",background:`${p.color}14`,borderRadius:100,border:`1px solid ${p.color}30`}}>
        <span style={{width:5,height:5,borderRadius:"50%",background:p.color,display:"block",boxShadow:`0 0 6px ${p.color}`}}/>
        <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.2em",textTransform:"uppercase",color:p.color}}>{p.tier}</span>
      </div>

      <h3 style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-24)",color:"var(--text-1)",letterSpacing:"-0.03em",marginBottom:14}}>{p.label}</h3>

      <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
        <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-12)",color:"var(--text-3)"}}>Ksh</span>
        <span style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-32)",color:"var(--text-1)",letterSpacing:"-0.04em"}}>{monthly?p.monthly:p.price}</span>
        {monthly&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-12)",color:"var(--text-3)"}}>/mo</span>}
      </div>

      <p style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",color:"var(--text-4)",letterSpacing:"0.06em",marginBottom:22}}>{p.pages} · {p.revisions}</p>

      <div style={{height:1,background:"var(--border)",marginBottom:20}}/>

      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10,marginBottom:26}}>
        {p.features.map(f=>(
          <li key={f} style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:"var(--fs-14)",color:"var(--text-2)",lineHeight:1.6}}>
            <CheckIcon color={p.color}/>{f}
          </li>
        ))}
      </ul>

      <a href={waMsg(`Hi Phillip! I'm interested in the ${p.tier} package (Ksh ${monthly?p.monthly+"/mo":p.price}). Let's talk!`)}
        target="_blank" rel="noopener noreferrer"
        className="clay-btn"
        style={{
          display:"flex",justifyContent:"center",
          padding:"13px 20px",
          fontSize:"var(--fs-14)",fontWeight:700,
          letterSpacing:"0.01em",
          background:p.featured?p.color:"transparent",
          color:p.featured?"#0a0c12":p.color,
          border:`1.5px solid ${p.color}`,
          marginBottom:16,width:"100%",
          boxShadow:p.featured?`0 6px 20px ${p.color}40,0 1px 0 rgba(255,255,255,0.1) inset`:"0 4px 12px rgba(0,0,0,0.25)",
        }}>
        Get Started →
      </a>

      <p style={{fontSize:"var(--fs-12)",color:"var(--text-3)",lineHeight:1.7,paddingTop:12,borderTop:"1px solid var(--border)"}}>
        <span style={{color:"var(--text-2)",fontWeight:700}}>Best for:</span> {p.best}
      </p>
    </div>
  );
}
