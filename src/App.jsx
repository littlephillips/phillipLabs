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

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map((n) =>
      document.getElementById(n.toLowerCase())
    ).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(
              e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)
            );
          }
        });
      },
      { threshold: 0.35 }
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
