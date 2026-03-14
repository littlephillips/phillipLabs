import { useState, useEffect } from "react";
import { NAV_LINKS } from "./data/constants";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Pricing from "./components/Pricing";
import WhyMe from "./components/WhyMe";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  const [active, setActive] = useState("About");

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const Lenis = window.Lenis;
    if (!Lenis) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Use plain RAF — avoids GSAP ticker time-unit mismatch bug
    let raf;
    const animate = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Keep ScrollTrigger in sync if GSAP is present
    const ST = window.ScrollTrigger;
    if (ST) lenis.on("scroll", ST.update);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = NAV_LINKS.map((n) =>
      document.getElementById(n.toLowerCase())
    ).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar active={active} setActive={setActive} />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Pricing />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
