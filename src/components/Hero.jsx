import { useTypewriter } from "../hooks/useTypewriter";
import { waMsg, STATS } from "../data/constants";

const WORDS = ["Websites.", "Dashboards.", "CRM Systems.", "Digital Tools."];

export default function Hero() {
  const typed = useTypewriter(WORDS);

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
        padding: "120px 5vw 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%", left: "50%",
          transform: "translateX(-50%)",
          width: 700, height: 500,
          background: "radial-gradient(ellipse, rgba(200,133,58,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%", right: "8%",
          width: 300, height: 300,
          background: "radial-gradient(ellipse, rgba(139,143,168,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 500,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#c8853a",
          display: "block",
          marginBottom: 20,
          animation: "fadeUp 0.7s 0.1s both",
        }}
      >
        ◆ Nairobi-Based Freelance Developer
      </span>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 7vw, 6rem)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          marginBottom: 24,
          animation: "fadeUp 0.7s 0.25s both",
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #e8e4dc 30%, #c8853a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hi, I'm Phillip.
        </span>
        <br />
        <span style={{ color: "#e8e4dc" }}>I build custom </span>
        <span style={{ color: "#c8853a" }}>
          {typed}
          <span style={{ animation: "blink 1s step-end infinite", borderRight: "2.5px solid #c8853a" }}>&nbsp;</span>
        </span>
      </h1>

      {/* Sub */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "#8a8a98",
          maxWidth: 560,
          lineHeight: 1.8,
          marginBottom: 48,
          animation: "fadeUp 0.7s 0.4s both",
        }}
      >
        Freelance web developer based in Nairobi, Kenya. I build{" "}
        <strong style={{ color: "#b8b4ac" }}>fully custom</strong> websites and
        digital business systems for small businesses — cafes, boutiques, coaches,
        repair shops & more. No templates. Ever.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fadeUp 0.7s 0.55s both",
        }}
      >
        <a
          href={waMsg("Hi Phillip! I want to order a website. Let's talk.")}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#25D366",
            color: "#fff",
            borderRadius: 12,
            padding: "14px 28px",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(37,211,102,0.25)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(37,211,102,0.35)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(37,211,102,0.25)"; }}
        >
          💬 Order via WhatsApp
        </a>
        <button
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.04)",
            color: "#b8b4ac",
            border: "1px solid #2a2e38",
            borderRadius: 12,
            padding: "14px 28px",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3a3e48"; e.currentTarget.style.color = "#e8e4dc"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2e38"; e.currentTarget.style.color = "#b8b4ac"; }}
        >
          View Projects →
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: 48,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 80,
          animation: "fadeUp 0.7s 0.7s both",
        }}
      >
        {STATS.map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 900,
                color: "#c8853a",
              }}
            >
              {n}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7a7a8a",
                marginTop: 4,
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          animation: "bounce 2s infinite",
        }}
      >
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a7a8a" }}>
          scroll
        </div>
        <div
          style={{
            width: 1, height: 40,
            background: "linear-gradient(to bottom, #565660, transparent)",
          }}
        />
      </div>
    </section>
  );
}
