import { useEffect, useRef } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { waMsg, STATS } from "../data/constants";

const WORDS = ["Websites.", "Dashboards.", "CRM Systems.", "Digital Tools."];

const WaIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 175.216 175.552" fill="currentColor">
    <path d="M87.6 0C39.3 0 0 39.3 0 87.6c0 15.5 4.1 30.2 11.3 43L0 175.6l46.5-11.2c12.4 6.5 26.5 10.2 41.1 10.2 48.3 0 87.6-39.3 87.6-87.6C175.2 39.3 135.9 0 87.6 0zm0 160.3c-13.6 0-26.4-3.7-37.3-10.2l-2.7-1.6-27.7 7 7.3-26.9-1.7-2.8C18.7 115.2 15 101.7 15 87.6 15 47.5 47.5 15 87.6 15c40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.7-72.6 72.7z"/>
    <path d="M127.8 105.7c-2.1-1-12.4-6.1-14.3-6.8-1.9-.7-3.3-1-4.7.9-1.4 1.9-5.4 6.8-6.6 8.2-1.2 1.4-2.4 1.6-4.5.5-2.1-1-8.8-3.2-16.8-10.3-6.2-5.5-10.4-12.3-11.6-14.4-1.2-2.1-.1-3.2.9-4.2.9-.9 2.1-2.4 3.1-3.6 1-1.2 1.4-2.1 2.1-3.5.7-1.4.4-2.6-.2-3.7-.5-1-4.7-11.3-6.4-15.5-1.7-4.1-3.4-3.5-4.7-3.6-.6-.1-2-.1-4-.1s-4.9.8-7 2.9c-2.1 2.1-8 7.8-8 19 0 11.2 8.1 22.1 9.3 23.6 1.2 1.5 15.9 24.3 38.6 34.1 5.4 2.3 9.6 3.7 12.9 4.7 5.4 1.7 10.3 1.5 14.2.9 4.3-.7 13.3-5.4 15.2-10.7 1.9-5.2 1.9-9.7 1.3-10.6-.5-.9-2-1.5-4.1-2.5z"/>
  </svg>
);

export default function Hero() {
  const typed = useTypewriter(WORDS);
  const canvasRef = useRef(null);
  const animRef  = useRef(null);

  /* Three.js particles */
  useEffect(() => {
    function init() {
      const T = window.THREE;
      const canvas = canvasRef.current;
      if (!T || !canvas) return;
      const W = canvas.offsetWidth || window.innerWidth;
      const H = canvas.offsetHeight || window.innerHeight;
      const renderer = new T.WebGLRenderer({ canvas, alpha:true, antialias:true });
      renderer.setSize(W,H); renderer.setPixelRatio(Math.min(devicePixelRatio,2));
      renderer.setClearColor(0x000000,0);
      const scene = new T.Scene();
      const cam = new T.PerspectiveCamera(55,W/H,0.1,1000);
      cam.position.z = 6;
      const N = 2000;
      const pos=new Float32Array(N*3), col=new Float32Array(N*3), sz=new Float32Array(N);
      const CA=new T.Color("#d4874a"), CD=new T.Color("#1a2035"), CG=new T.Color("#22c55e");
      for(let i=0;i<N;i++){
        const i3=i*3, r=5+Math.random()*9;
        const th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1);
        pos[i3]=r*Math.sin(ph)*Math.cos(th); pos[i3+1]=r*Math.sin(ph)*Math.sin(th); pos[i3+2]=r*Math.cos(ph)-1.5;
        const roll=Math.random(), c=roll<0.07?CA:roll<0.025?CG:CD, b=0.3+Math.random()*0.7;
        col[i3]=c.r*b; col[i3+1]=c.g*b; col[i3+2]=c.b*b;
        sz[i]=roll<0.07?3.5+Math.random():1+Math.random()*1.4;
      }
      const geo=new T.BufferGeometry();
      geo.setAttribute("position",new T.BufferAttribute(pos,3));
      geo.setAttribute("color",new T.BufferAttribute(col,3));
      geo.setAttribute("size",new T.BufferAttribute(sz,1));
      const mat=new T.PointsMaterial({size:0.038,vertexColors:true,transparent:true,opacity:0.78,sizeAttenuation:true});
      const pts=new T.Points(geo,mat); scene.add(pts);
      let mx=0,my=0;
      const onM=e=>{mx=(e.clientX/innerWidth-0.5)*2;my=-(e.clientY/innerHeight-0.5)*2};
      const onR=()=>{const w=canvas.offsetWidth,h=canvas.offsetHeight;renderer.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()};
      window.addEventListener("mousemove",onM,{passive:true});
      window.addEventListener("resize",onR,{passive:true});
      let t=0;
      const tick=()=>{
        animRef.current=requestAnimationFrame(tick); t+=0.0022;
        pts.rotation.y=t*0.05+mx*0.09; pts.rotation.x=t*0.022+my*0.06;
        const s=geo.attributes.size;
        for(let i=0;i<N;i++) if(sz[i]>2.5) s.array[i]=sz[i]*(0.78+0.22*Math.sin(t*2.2+i));
        s.needsUpdate=true; renderer.render(scene,cam);
      };
      tick();
      return ()=>{ window.removeEventListener("mousemove",onM); window.removeEventListener("resize",onR); cancelAnimationFrame(animRef.current); renderer.dispose(); };
    }
    if(window.THREE){init();}
    else{const id=setInterval(()=>{if(window.THREE){clearInterval(id);init();}},80); return ()=>clearInterval(id);}
    return ()=>cancelAnimationFrame(animRef.current);
  },[]);

  /* GSAP entrance */
  useEffect(()=>{
    const g=window.gsap; if(!g)return;
    const tl=g.timeline({defaults:{ease:"power3.out"}});
    tl.fromTo(".h-badge",{opacity:0,y:20},{opacity:1,y:0,duration:0.7},0.15)
      .fromTo(".h-title",{opacity:0,y:38},{opacity:1,y:0,duration:0.95},0.35)
      .fromTo(".h-sub",  {opacity:0,y:22},{opacity:1,y:0,duration:0.8},0.58)
      .fromTo(".h-ctas", {opacity:0,y:18},{opacity:1,y:0,duration:0.7},0.76)
      .fromTo(".h-stats",{opacity:0,y:16},{opacity:1,y:0,duration:0.65},0.94);
  },[]);

  return (
    <section id="about" style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      textAlign:"center",
      padding:"100px var(--gutter) 90px",
      position:"relative", overflow:"hidden",
    }}>
      {/* Canvas */}
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>

      {/* Ambient glows */}
      <div style={{position:"absolute",top:"38%",left:"50%",transform:"translate(-50%,-50%)",
        width:"min(700px,90vw)",height:460,
        background:"radial-gradient(ellipse,rgba(212,135,74,0.1) 0%,transparent 65%)",
        pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"absolute",bottom:"15%",right:"8%",
        width:240,height:240,
        background:"radial-gradient(ellipse,rgba(37,211,102,0.05) 0%,transparent 70%)",
        pointerEvents:"none",zIndex:0}}/>

      {/* ── Content ── */}
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:920}}>

        {/* Badge */}
        <div className="h-badge" style={{opacity:0,marginBottom:28}}>
          <span style={{
            display:"inline-flex",alignItems:"center",gap:8,
            background:"var(--amber-dim)",
            border:"1px solid var(--amber-bd)",
            borderRadius:100, padding:"7px 18px",
            fontFamily:"var(--font-mono)",
            fontSize:"var(--fs-10)",
            letterSpacing:"0.25em",textTransform:"uppercase",
            color:"var(--amber)",
            boxShadow:"0 2px 12px rgba(212,135,74,0.1), 0 1px 0 rgba(255,255,255,0.05) inset",
          }}>
            <span style={{
              width:6,height:6,borderRadius:"50%",
              background:"var(--amber)",
              animation:"pulseGlow 2s ease-in-out infinite",
            }}/>
            Nairobi-Based Freelance Developer
          </span>
        </div>

        {/* Headline */}
        <h1 className="h-title" style={{
          opacity:0,
          fontFamily:"var(--font)",
          fontSize:"var(--fs-hero)",
          fontWeight:800,
          letterSpacing:"-0.04em",
          lineHeight:1.06,
          marginBottom:22,
          color:"var(--text-1)",
        }}>
          Hi, I'm Phillip.
          <br/>
          <span style={{color:"var(--text-3)",fontWeight:700}}>I build custom </span>
          <span style={{
            color:"var(--amber)",
            background:"linear-gradient(135deg,var(--amber),var(--amber-light))",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          }}>
            {typed}
            <span style={{
              display:"inline-block",width:"0.06em",marginLeft:3,
              background:"var(--amber)",verticalAlign:"middle",
              height:"0.82em",borderRadius:2,
              animation:"blink 1s step-end infinite",
            }}/>
          </span>
        </h1>

        {/* Sub */}
        <p className="h-sub" style={{
          opacity:0,
          fontFamily:"var(--font)",
          fontSize:"var(--fs-18)",
          fontWeight:400,
          color:"var(--text-3)",
          maxWidth:560,
          lineHeight:1.82,
          margin:"0 auto 44px",
        }}>
          Freelance web developer in Nairobi, Kenya. I build{" "}
          <strong style={{color:"var(--text-2)",fontWeight:700}}>fully custom</strong>{" "}
          websites and business systems — cafes, boutiques, coaches, repair shops.{" "}
          <span style={{color:"var(--amber)",fontWeight:600}}>No templates. Ever.</span>
        </p>

        {/* CTAs */}
        <div className="h-ctas" style={{
          opacity:0,display:"flex",gap:14,
          flexWrap:"wrap",justifyContent:"center",marginBottom:72,
        }}>
          {/* Primary WA */}
          <a href={waMsg("Hi Phillip! I want to order a website. Let's talk.")}
            target="_blank" rel="noopener noreferrer"
            className="clay-btn"
            style={{
              background:"var(--wa)",color:"#fff",
              fontSize:"var(--fs-16)",fontWeight:700,
              padding:"14px 30px",
              letterSpacing:"-0.01em",
            }}>
            <WaIcon size={18}/>
            Order via WhatsApp
          </a>

          {/* Secondary */}
          <button
            onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
            className="clay-btn"
            style={{
              background:"var(--surface)",
              color:"var(--text-2)",
              border:"1px solid var(--border-2)",
              fontSize:"var(--fs-16)",fontWeight:700,
              padding:"14px 30px",
              letterSpacing:"-0.01em",
            }}>
            View Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="h-stats" style={{
          opacity:0,
          display:"flex",flexWrap:"wrap",
          justifyContent:"center",gap:0,
          borderTop:"1px solid var(--border)",
          paddingTop:40,
        }}>
          {STATS.map(([n,l],i)=>(
            <div key={l} style={{
              textAlign:"center",
              padding:"0 clamp(20px,4vw,44px)",
              borderRight:i<STATS.length-1?"1px solid var(--border)":"none",
            }}>
              <div style={{
                fontFamily:"var(--font)",fontWeight:800,
                fontSize:"var(--fs-32)",
                color:"var(--amber)",
                lineHeight:1.1,marginBottom:6,
                letterSpacing:"-0.03em",
              }}>{n}</div>
              <div style={{
                fontFamily:"var(--font-mono)",
                fontSize:"var(--fs-10)",
                letterSpacing:"0.22em",
                textTransform:"uppercase",
                color:"var(--text-3)",
              }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      {/* <div style={{
        position:"absolute",bottom:28,left:"50%",
        transform:"translateX(-50%)",
        display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:1,
      }}>
        <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-10)",letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--text-4)"}}>scroll</span>
        <div style={{width:1,height:34,background:"linear-gradient(to bottom,var(--border-2),transparent)",animation:"floatY 2.5s ease-in-out infinite"}}/>
      </div> */}
    </section>
  );
}
