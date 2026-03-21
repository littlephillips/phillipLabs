import { useEffect, useRef } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { waMsg, STATS } from "../data/constants";

const WORDS = ["Websites.", "Dashboards.", "CRM Systems.", "Digital Tools.", "BusinessSolutions.", "Saas Products"];

const WaIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 175.216 175.552" fill="currentColor">
    <path d="M87.6 0C39.3 0 0 39.3 0 87.6c0 15.5 4.1 30.2 11.3 43L0 175.6l46.5-11.2c12.4 6.5 26.5 10.2 41.1 10.2 48.3 0 87.6-39.3 87.6-87.6C175.2 39.3 135.9 0 87.6 0zm0 160.3c-13.6 0-26.4-3.7-37.3-10.2l-2.7-1.6-27.7 7 7.3-26.9-1.7-2.8C18.7 115.2 15 101.7 15 87.6 15 47.5 47.5 15 87.6 15c40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.7-72.6 72.7z"/>
    <path d="M127.8 105.7c-2.1-1-12.4-6.1-14.3-6.8-1.9-.7-3.3-1-4.7.9-1.4 1.9-5.4 6.8-6.6 8.2-1.2 1.4-2.4 1.6-4.5.5-2.1-1-8.8-3.2-16.8-10.3-6.2-5.5-10.4-12.3-11.6-14.4-1.2-2.1-.1-3.2.9-4.2.9-.9 2.1-2.4 3.1-3.6 1-1.2 1.4-2.1 2.1-3.5.7-1.4.4-2.6-.2-3.7-.5-1-4.7-11.3-6.4-15.5-1.7-4.1-3.4-3.5-4.7-3.6-.6-.1-2-.1-4-.1s-4.9.8-7 2.9c-2.1 2.1-8 7.8-8 19 0 11.2 8.1 22.1 9.3 23.6 1.2 1.5 15.9 24.3 38.6 34.1 5.4 2.3 9.6 3.7 12.9 4.7 5.4 1.7 10.3 1.5 14.2.9 4.3-.7 13.3-5.4 15.2-10.7 1.9-5.2 1.9-9.7 1.3-10.6-.5-.9-2-1.5-4.1-2.5z"/>
  </svg>
);

export default function Hero() {
  const typed = useTypewriter(WORDS);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  /* ── Three.js: full-bleed immersive background ── */
  useEffect(() => {
    function init() {
      const T = window.THREE;
      const canvas = canvasRef.current;
      if (!T || !canvas) return;

      const W = window.innerWidth;
      const H = window.innerHeight;

      const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new T.Scene();
      const cam = new T.PerspectiveCamera(60, W / H, 0.1, 2000);
      cam.position.z = 5;

      /* ── Orbital rings ── */
      const rings = [];
      const ringDefs = [
        { radius: 3.2, tube: 0.005,  color: 0xe0924f, opacity: 0.22, rx: 0.4,  rz: 0.2  },
        { radius: 4.8, tube: 0.003,  color: 0xe8a96e, opacity: 0.14, rx: -0.6, rz: 0.5  },
        { radius: 6.2, tube: 0.0025, color: 0x97765a, opacity: 0.09, rx: 1.1,  rz: -0.3 },
        { radius: 2.0, tube: 0.004,  color: 0x22c55e, opacity: 0.13, rx: 0.9,  rz: 0.7  },
        { radius: 7.8, tube: 0.002,  color: 0xe0924f, opacity: 0.05, rx: -0.3, rz: 1.2  },
      ];
      ringDefs.forEach((rd, idx) => {
        const geo = new T.TorusGeometry(rd.radius, rd.tube, 2, 300);
        const mat = new T.MeshBasicMaterial({ color: rd.color, transparent: true, opacity: rd.opacity });
        const mesh = new T.Mesh(geo, mat);
        mesh.rotation.x = rd.rx;
        mesh.rotation.z = rd.rz;
        scene.add(mesh);
        rings.push({ mesh, speed: 0.0003 + idx * 0.00015 });
      });

      /* ── Star / particle field ── */
      const N = 2600;
      const pos    = new Float32Array(N * 3);
      const col    = new Float32Array(N * 3);
      const sizes  = new Float32Array(N);
      const phases = new Float32Array(N);

      const cAmber = new T.Color("#e0924f");
      const cLight = new T.Color("#e8a96e");
      const cGreen = new T.Color("#22c55e");
      const cDim   = new T.Color("#1e2540");
      const cDeep  = new T.Color("#0f1320");

      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const r  = 2.5 + Math.random() * 13;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i3]     = r * Math.sin(ph) * Math.cos(th);
        pos[i3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pos[i3 + 2] = r * Math.cos(ph);

        const roll = Math.random();
        let c = roll < 0.06 ? cAmber : roll < 0.10 ? cLight : roll < 0.14 ? cGreen : roll < 0.55 ? cDim : cDeep;
        const b = 0.35 + Math.random() * 0.65;
        col[i3] = c.r * b; col[i3 + 1] = c.g * b; col[i3 + 2] = c.b * b;

        sizes[i]  = roll < 0.14 ? 2.8 + Math.random() * 2.0 : 0.6 + Math.random() * 1.3;
        phases[i] = Math.random() * Math.PI * 2;
      }

      const ptGeo = new T.BufferGeometry();
      ptGeo.setAttribute("position", new T.BufferAttribute(pos, 3));
      ptGeo.setAttribute("color",    new T.BufferAttribute(col, 3));
      ptGeo.setAttribute("size",     new T.BufferAttribute(sizes, 1));
      const ptMat = new T.PointsMaterial({ size: 0.033, vertexColors: true, transparent: true, opacity: 0.88, sizeAttenuation: true });
      const pts = new T.Points(ptGeo, ptMat);
      scene.add(pts);

      /* ── Central pulse sphere ── */
      const coreGeo = new T.SphereGeometry(0.36, 32, 32);
      const coreMat = new T.MeshBasicMaterial({ color: 0xe0924f, transparent: true, opacity: 0.07 });
      const core    = new T.Mesh(coreGeo, coreMat);
      scene.add(core);

      const glowGeo = new T.TorusGeometry(0.58, 0.014, 2, 120);
      const glowMat = new T.MeshBasicMaterial({ color: 0xe0924f, transparent: true, opacity: 0.38 });
      const glow    = new T.Mesh(glowGeo, glowMat);
      scene.add(glow);

      /* ── Mouse parallax ── */
      let mx = 0, my = 0, camX = 0, camY = 0;
      const onM = e => { mx = (e.clientX / innerWidth - 0.5) * 2; my = -(e.clientY / innerHeight - 0.5) * 2; };
      const onR = () => { const w = innerWidth, h = innerHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
      window.addEventListener("mousemove", onM, { passive: true });
      window.addEventListener("resize",    onR, { passive: true });

      let t = 0;
      const tick = () => {
        animRef.current = requestAnimationFrame(tick);
        t += 0.0017;

        // Smooth parallax
        camX += (mx * 0.15 - camX) * 0.035;
        camY += (my * 0.10 - camY) * 0.035;

        pts.rotation.y = t * 0.05 + camX * 0.45;
        pts.rotation.x = t * 0.016 + camY * 0.38;

        // Rings drift
        rings.forEach(({ mesh, speed }, idx) => {
          mesh.rotation.y += speed;
          mesh.rotation.x += speed * 0.28 * (idx % 2 === 0 ? 1 : -1);
        });

        // Pulse bright dots
        const sa = ptGeo.attributes.size;
        for (let i = 0; i < N; i++) {
          if (sizes[i] > 2) sa.array[i] = sizes[i] * (0.76 + 0.24 * Math.sin(t * 2.6 + phases[i]));
        }
        sa.needsUpdate = true;

        // Core pulse
        const p = 0.85 + 0.15 * Math.sin(t * 1.9);
        core.scale.setScalar(p);
        coreMat.opacity = 0.04 + 0.07 * Math.sin(t * 1.9);
        glow.rotation.z = t * 0.85;
        glow.rotation.x = t * 0.28;
        glowMat.opacity = 0.18 + 0.2 * Math.sin(t * 1.9);

        renderer.render(scene, cam);
      };
      tick();

      return () => {
        window.removeEventListener("mousemove", onM);
        window.removeEventListener("resize", onR);
        cancelAnimationFrame(animRef.current);
        renderer.dispose();
      };
    }

    if (window.THREE) {
      return init();
    } else {
      const id = setInterval(() => { if (window.THREE) { clearInterval(id); init(); } }, 80);
      return () => clearInterval(id);
    }
  }, []);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const g = window.gsap; if (!g) return;
    const tl = g.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".h-badge",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, 0.2)
      .fromTo(".h-title",  { opacity: 0, y: 52 }, { opacity: 1, y: 0, duration: 1.05 }, 0.36)
      .fromTo(".h-typed",  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7  }, 0.60)
      .fromTo(".h-sub",    { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75 }, 0.74)
      .fromTo(".h-ctas",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.90)
      .fromTo(".h-stats",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6  }, 1.06);
  }, []);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "110px var(--gutter) 90px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Canvas — full-bleed behind everything */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Vignette — protects center text readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: [
          "radial-gradient(ellipse 60% 65% at 50% 50%, transparent 15%, rgba(10,12,18,0.5) 60%, rgba(10,12,18,0.92) 100%)",
        ].join(","),
      }} />

      {/* Amber center glow */}
      <div style={{
        position: "absolute", top: "42%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(700px, 85vw)", height: 420,
        background: "radial-gradient(ellipse, rgba(212,135,74,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* ── All content ── */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 860 }}>

        {/* Headline */}
        <h1 className="h-title" style={{
          opacity: 0,
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-hero)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          marginBottom: 22,
          color: "var(--text-1)",
        }}>
          Your Business<br />
          Deserves a{" "}
          <span style={{
            background: "linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Real Website.
          </span>
        </h1>

        {/* Typewriter */}
        <div className="h-typed" style={{
          opacity: 0,
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-16)",
          color: "var(--text-3)", marginBottom: 24,
          letterSpacing: "0.04em",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          flexWrap: "wrap",
        }}>
          <span style={{ color: "var(--amber)", opacity: 0.6 }}>›</span>
          I build custom{" "}
          <span style={{ color: "var(--amber)", fontWeight: 700, minWidth: 170, textAlign: "left" }}>
            {typed}
            <span style={{
              display: "inline-block", width: "0.05em", marginLeft: 2,
              background: "var(--amber)", verticalAlign: "middle",
              height: "1em", borderRadius: 2,
              animation: "blink 1s step-end infinite",
            }} />
          </span>
        </div>

        {/* Sub */}
        <p className="h-sub" style={{
          opacity: 0,
          fontSize: "var(--fs-16)", color: "var(--text-3)",
          maxWidth: 520, lineHeight: 1.85,
          margin: "0 auto 42px",
        }}>
          Freelance web developer in Nairobi building{" "}
          <strong style={{ color: "var(--text-2)", fontWeight: 700 }}>fully custom</strong>{" "}
          websites and business systems for Kenyan small businesses.{" "}
          <span style={{ color: "var(--amber)", fontWeight: 600 }}>No templates. Ever.</span>
        </p>

        {/* CTAs */}
        <div className="h-ctas" style={{
          opacity: 0,
          display: "flex", gap: 14, flexWrap: "wrap",
          justifyContent: "center", marginBottom: 64,
        }}>
          <a
            href={waMsg("Hi Phillip! I want to order a website. Let's talk.")}
            target="_blank" rel="noopener noreferrer"
            className="clay-btn"
            style={{ background: "var(--wa)", color: "#fff", fontSize: "var(--fs-16)", fontWeight: 700, padding: "15px 32px" }}
          >
            <WaIcon size={18} />
            Start Your Project
          </a>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="clay-btn"
            style={{
              background: "rgba(10,12,18,0.65)", backdropFilter: "blur(16px)",
              color: "var(--text-2)", border: "1px solid var(--border-2)",
              fontSize: "var(--fs-16)", fontWeight: 600, padding: "15px 28px",
            }}
          >
            See My Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Stats — frosted glass pill */}
        <div className="h-stats" style={{
          opacity: 0,
          display: "inline-flex", flexWrap: "wrap",
          justifyContent: "center",
          background: "rgba(10,12,18,0.62)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "20px 8px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset",
        }}>
          {STATS.map(([n, l], i) => (
            <div key={l} style={{
              textAlign: "center",
              padding: "0 clamp(18px, 3.5vw, 42px)",
              borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "var(--fs-32)", color: "var(--amber)",
                lineHeight: 1.1, marginBottom: 5, letterSpacing: "-0.03em",
              }}>{n}</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--fs-10)",
                letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-3)",
              }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 600px) {
          #about { padding: 100px 20px 80px !important; }
          .h-ctas { flex-direction: column !important; align-items: stretch !important; }
          .h-ctas a, .h-ctas button { justify-content: center !important; width: 100% !important; }
          .h-stats > div { padding: 0 12px !important; }
        }
      `}</style>
    </section>
  );
}