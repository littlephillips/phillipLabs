import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Home, Layers, Briefcase, Wallet, Menu, X, MessageCircle, HelpCircle, Workflow, BookOpen } from "lucide-react";
import { NAV_LINKS } from "../data/constants";
import { useSettings } from "../lib/settings";
import Wrap from "./Wrap";

// Quiet status badge: no background, a pulsing dot and green text.
function Availability({ short = false }) {
  const { available, availability } = useSettings();
  const text = short ? (available ? "Available" : "Booked") : availability;
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold whitespace-nowrap ${available ? "text-[#1b6e35]" : "text-muted"}`}>
      <span className="relative flex w-2 h-2" aria-hidden="true">
        {available && <span className="absolute inset-0 rounded-full bg-available opacity-60 animate-ping motion-reduce:animate-none" />}
        <span className={`relative w-2 h-2 rounded-full ${available ? "bg-available" : "bg-muted"}`} />
      </span>
      {text}
    </span>
  );
}

function BookButton({ className = "" }) {
  const { bookingHref, hasScheduler } = useSettings();
  return (
    <a
      href={bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`items-center justify-center bg-accent-strong text-white font-semibold no-underline transition-[filter,transform] hover:bg-accent-hover ${className}`}
    >
      {hasScheduler ? "Book a call" : "WhatsApp us"}
    </a>
  );
}

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/services", label: "Services", icon: Layers },
  { to: "/work", label: "Work", icon: Briefcase },
  { to: "/pricing", label: "Pricing", icon: Wallet },
];

const MORE = [
  { to: "/process", label: "How it works", icon: Workflow },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/blog", label: "Blog", icon: BookOpen },
  { to: "/contact", label: "Contact", icon: MessageCircle },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [more, setMore] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMore(false), [pathname]);

  useEffect(() => {
    if (!more) return;
    const onKey = (e) => e.key === "Escape" && setMore(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [more]);

  const logoClick = () => {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moreActive = MORE.some((m) => pathname.startsWith(m.to));

  return (
    <>
      <header className={`sticky top-0 z-[100] bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_8px_24px_-12px_rgba(40,28,8,0.3)]" : "shadow-[0_6px_14px_-12px_rgba(40,28,8,0.25)]"}`}>
        <Wrap className="flex items-center justify-between h-[60px] lg:h-[68px]">
          <Link to="/" onClick={logoClick} aria-label="phillipLabs home" className="flex items-center gap-[9px] no-underline rounded-md">
            <img src="/assets/img/logo-mark.png" alt="" width="28" height="28" className="w-7 h-7 object-contain rounded-[7px] bg-ink" />
            <span className="font-bold text-[1.12rem] tracking-[-0.01em] text-ink whitespace-nowrap">
              phillip<span className="text-accent-strong">Labs</span>
            </span>
          </Link>
          <span className="lg:hidden flex items-center gap-3 mr-auto ml-3">
            <span className="w-px h-4 bg-line-strong" aria-hidden="true" />
            <Availability short />
          </span>

          <nav className="hidden lg:flex items-center gap-[30px]" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative text-sm font-semibold py-1.5 tracking-[0.01em] no-underline group ${isActive ? "text-ink" : "text-muted hover:text-ink"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded bg-accent-strong origin-left transition-transform duration-200 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </NavLink>
            ))}
            <span className="w-px h-4 bg-line-strong" aria-hidden="true" />
            <Availability />
          </nav>

          <BookButton className="hidden lg:inline-flex px-5 py-2.5 rounded-lg text-sm" />

          {/* Mobile: quiet top bar. Navigation lives in the bottom tab bar. */}
          <BookButton className="lg:hidden inline-flex px-3.5 py-2 rounded-lg text-xs whitespace-nowrap" />
        </Wrap>
        {/* Soft fading edge so the bar clearly ends where the page begins */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Primary mobile"
        className="lg:hidden fixed bottom-0 inset-x-0 z-[300] bg-white/95 backdrop-blur shadow-[0_-6px_24px_rgba(16,16,20,0.08)] pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="grid grid-cols-5 list-none m-0 p-0">
          {TABS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={() => to === "/" && pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-0.5 min-h-14 text-[11px] font-semibold no-underline ${isActive ? "text-accent-strong" : "text-muted"}`
                }
              >
                <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => setMore((m) => !m)}
              aria-expanded={more}
              aria-controls="more-sheet"
              className={`w-full flex flex-col items-center justify-center gap-0.5 min-h-14 text-[11px] font-semibold bg-transparent border-none cursor-pointer ${moreActive || more ? "text-accent-strong" : "text-muted"}`}
            >
              {more ? <X size={20} strokeWidth={1.9} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.9} aria-hidden="true" />}
              More
            </button>
          </li>
        </ul>
      </nav>

      {more && (
        <div className="lg:hidden fixed inset-0 z-[290]" onClick={() => setMore(false)}>
          <div className="absolute inset-0 bg-[rgba(10,10,15,0.35)]" aria-hidden="true" />
          <div
            id="more-sheet"
            role="dialog"
            aria-label="More pages"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 bottom-[76px] bg-white rounded-2xl p-3 shadow-[0_20px_50px_-12px_rgba(16,16,20,0.35)]"
          >
            <ul className="grid grid-cols-2 gap-2 list-none m-0 p-0">
              {MORE.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl bg-surface text-ink no-underline text-sm font-semibold">
                    <Icon size={18} className="text-accent-strong" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
