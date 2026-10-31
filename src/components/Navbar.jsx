import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV_LINKS, BOOKING_URL, AVAILABILITY } from "../data/constants";
import Wrap from "./Wrap";

function slugFor(link) {
  return link.toLowerCase();
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const ids = NAV_LINKS.filter((l) => l !== "Blog").map(slugFor);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !burgerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      document.body.style.overflow = "";
    };
  }, [open]);

  const goToSection = useCallback(
    (link) => {
      setOpen(false);
      const id = slugFor(link);
      if (link === "Blog") {
        navigate("/blog");
        return;
      }
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    [location.pathname, navigate]
  );

  return (
    <header
      className={`sticky top-0 z-[100] bg-white border-b border-line transition-shadow ${
        scrolled ? "shadow-[0_4px_20px_rgba(16,16,20,0.05)]" : ""
      }`}
    >
      <Wrap className="flex items-center justify-between h-[68px]">
        <Link to="/" className="flex items-center gap-[9px] no-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-md">
          <img src="/assets/img/logo-mark.png" alt="" className="w-7 h-7 object-contain rounded-[7px] bg-ink" />
          <span className="font-bold text-[1.12rem] tracking-[-0.01em] text-ink whitespace-nowrap">
            phillip<span className="text-accent">Labs</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-[30px]" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const id = slugFor(link);
            const isActive = link !== "Blog" ? activeSection === id : location.pathname.startsWith("/blog");
            return (
              <button
                key={link}
                onClick={() => goToSection(link)}
                aria-current={isActive ? "true" : undefined}
                className={`relative bg-transparent border-none cursor-pointer font-sans text-sm font-semibold py-1.5 tracking-[0.01em] group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded bg-accent origin-left transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            );
          })}
          <span className="flex items-center gap-[10px] text-xs font-medium text-muted border-l border-line pl-5 whitespace-nowrap">
            <span className="relative inline-block w-[8px] h-[8px] rounded-full bg-available">
              <span className="absolute -inset-[4px] rounded-full border border-available animate-orbit-pulse motion-reduce:animate-none" />
            </span> 
            {AVAILABILITY}
          </span>
        </nav>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-semibold no-underline shadow-[0_4px_14px_rgba(224,123,31,0.28)] transition-[filter,transform] hover:brightness-105 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Book a call
        </a>

        <button
          ref={burgerRef}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="lg:hidden flex flex-col justify-center gap-[5px] w-11 h-11 bg-transparent border-none cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <span className={`block w-5 h-0.5 mx-auto rounded bg-ink transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 mx-auto rounded bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 mx-auto rounded bg-ink transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </Wrap>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`absolute top-full left-0 right-0 bg-white border-t border-b border-line px-gutter pt-2 pb-[22px] z-[99] shadow-[0_16px_32px_-12px_rgba(16,16,20,0.14)] transition-all duration-200 ${
          open ? "flex flex-col opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-2"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => goToSection(link)}
            className="block w-full text-left py-3.5 bg-transparent border-none border-b border-line text-base font-semibold text-ink cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {link}
          </button>
        ))}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-4 bg-accent text-white py-[13px] rounded-lg font-semibold no-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Book a call
        </a>
        <div className="flex items-center gap-[10px] text-xs text-muted justify-center mt-4">
          <span className="relative inline-block w-[8px] h-[8px] rounded-full bg-available">
            <span className="absolute -inset-[4px] rounded-full border border-available animate-orbit-pulse motion-reduce:animate-none" />
          </span>
           {AVAILABILITY}
        </div>
      </div>
      {open && <div onClick={() => setOpen(false)} aria-hidden="true" className="fixed inset-0 top-[68px] bg-[rgba(10,10,15,0.28)] z-[98]" />}
    </header>
  );
}
