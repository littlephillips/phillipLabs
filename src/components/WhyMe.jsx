import { useEffect, useRef } from "react";
import { WHY } from "../data/constants";

export default function WhyMe() {
  const sectionRef = useRef(null);

  useEffect(()=>{
    const g=window.gsap,ST=window.ScrollTrigger; if(!g||!ST)return;
    g.registerPlugin(ST);
    g.fromTo(".why-hdr",{opacity:0,y:28},{opacity:1,y:0,duration:0.85,scrollTrigger:{trigger:sectionRef.current,start:"top 80%"}});
    sectionRef.current?.querySelectorAll(".why-card").forEach((c,i)=>{
      g.fromTo(c,{opacity:0,x:-22},{opacity:1,x:0,duration:0.6,delay:i*0.09,ease:"power3.out",scrollTrigger:{trigger:c,start:"top 88%"}});
    });
  },[]);

  return (
    <section style={{
      padding:"var(--sec-pad) 0",
      background:"var(--surface)",
      borderTop:"1px solid var(--border)",
      borderBottom:"1px solid var(--border)",
    }} ref={sectionRef}>
      <div className="wrap">
        {/* Header */}
        <div className="why-hdr" style={{opacity:0,marginBottom:60,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
          <div>
            <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--amber)"}}>Why Choose Me</span>
            <h2 style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-48)",letterSpacing:"-0.04em",color:"var(--text-1)",marginTop:12,lineHeight:1.08}}>Built Different.</h2>
          </div>
          {/* <p style={{fontSize:"var(--fs-16)",color:"var(--text-3)",maxWidth:320,lineHeight:1.8,paddingBottom:4}}>
            Not another freelancer with a Fiverr profile. Real code, real results, right here in Nairobi.
          </p> */}
        </div>

        {/* List */}
        <div style={{display:"flex",flexDirection:"column"}}>
          {WHY.map((w,i)=>(
            <div key={w.num} className="why-card" style={{
              opacity:0,
              display:"grid",
              gridTemplateColumns:"72px 1fr 1.4fr",
              gap:28,alignItems:"center",
              padding:"26px 28px",
              borderBottom:i<WHY.length-1?"1px solid var(--border)":"none",
              borderRadius:i===0?"var(--clay-radius) var(--clay-radius) 0 0":
                           i===WHY.length-1?"0 0 var(--clay-radius) var(--clay-radius)":"0",
              background:"var(--bg-card)",
              boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03)",
              transition:"background 0.22s",
              cursor:"default",
            }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--surface-2,#1a2030)"}
            onMouseLeave={e=>e.currentTarget.style.background="var(--bg-card)"}
            >
              <span style={{fontFamily:"var(--font-mono)",fontSize:"clamp(1.6rem,3vw,2.2rem)",color:"var(--text-4)",lineHeight:1,fontWeight:300}}>{w.num}</span>
              <h3 style={{fontFamily:"var(--font)",fontWeight:700,fontSize:"var(--fs-18)",color:"var(--text-1)",letterSpacing:"-0.02em"}}>{w.title}</h3>
              <p style={{fontSize:"var(--fs-14)",color:"var(--text-3)",lineHeight:1.8}}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:600px){.why-card{grid-template-columns:48px 1fr!important}.why-card>p{grid-column:2}}`}</style>
    </section>
  );
}
