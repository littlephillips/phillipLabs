import { NAV_LINKS, waMsg, EMAIL, SOCIALS } from "../data/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0c0e14", borderTop: "1px solid #242838", padding: "60px 5vw 36px" }}>
      <div
        style={{
          maxWidth: 1280, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 48, marginBottom: 48,
        }}
      >
        {/* Brand + socials */}
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 900, color: "#e8e4dc", marginBottom: 14 }}>
            phillipLabs<span style={{ color: "#c8853a" }}>.</span>
          </div>
          <p style={{ fontSize: 13.5, color: "#9a9590", lineHeight: 1.8, maxWidth: 260, marginBottom: 22 }}>
            Nairobi based freelance web developer. Custom digital solutions for Kenyan small businesses.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {SOCIALS.map((s) => (
              <SocialIcon key={s.name} social={s} />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8853a", marginBottom: 20, fontWeight: 500 }}>
            Navigation
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#9a9590", textAlign: "left", padding: 0, transition: "color 0.25s", width: "fit-content" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8853a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9590")}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8853a", marginBottom: 20, fontWeight: 500 }}>
            Services
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Custom Websites", "CRM & Dashboards", "E-commerce & Payments", "SEO & Performance", "WhatsApp Integration", "Maintenance Plans"].map((s) => (
              <span key={s} style={{ fontSize: 14, color: "#9a9590" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8853a", marginBottom: 20, fontWeight: 500 }}>
            Contact
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <a
              href={waMsg("Hi Phillip!")}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: "#9a9590", textDecoration: "none", transition: "color 0.25s", display: "flex", alignItems: "center", gap: 10 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#25D366")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9590")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0,opacity:0.7}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              +254 797 321 068
            </a>
            <a
              href={`mailto:${EMAIL}`}
              style={{ fontSize: 14, color: "#9a9590", textDecoration: "none", transition: "color 0.25s", display: "flex", alignItems: "center", gap: 10 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c8853a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9590")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,opacity:0.7}}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
              {EMAIL}
            </a>
            <span style={{ fontSize: 14, color: "#9a9590", display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,opacity:0.7}}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Nairobi, Kenya
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          maxWidth: 1280, margin: "0 auto", paddingTop: 24,
          borderTop: "1px solid #1c2030",
          display: "flex", flexWrap: "wrap", gap: 12,
          justifyContent: "space-between", alignItems: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "#565660" }}>© {year} phillipLabs. All rights reserved.</p>
        <p style={{ fontSize: 12, color: "#565660" }}>100% Custom Code · No Templates · Nairobi, Kenya</p>
      </div>
    </footer>
  );
}

function SocialIcon({ social: s }) {
  return (
    <a
      href={s.url}
      target="_blank" rel="noopener noreferrer"
      title={s.name}
      style={{
        width: 40, height: 40, borderRadius: 10,
        background: "#1c2030", border: "1px solid #242838",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#7a7a8a", textDecoration: "none", transition: "all 0.25s", flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = s.color + "80";
        e.currentTarget.style.color = s.color;
        e.currentTarget.style.background = s.color + "18";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#242838";
        e.currentTarget.style.color = "#7a7a8a";
        e.currentTarget.style.background = "#1c2030";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span style={{ width: 16, height: 16, display: "flex" }} dangerouslySetInnerHTML={{ __html: s.svg }} />
    </a>
  );
}
