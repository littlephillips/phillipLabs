import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Globe, ShoppingCart, LayoutDashboard, Search, HelpCircle, Send } from "lucide-react";
import { PACKAGES } from "../data/constants";
import { useSettings } from "../lib/settings";

// Guided brief as a short stepper: one question per screen, tap to choose,
// progress pills at the bottom. Output is a structured WhatsApp message; no
// data is stored. Pre-filled from the URL (?need=website&package=Silver).

const NEEDS = [
  { id: "website", label: "A website", hint: "For a business, service or portfolio", icon: Globe },
  { id: "store", label: "An online store", hint: "Sell products with M-Pesa checkout", icon: ShoppingCart },
  { id: "system", label: "A dashboard or system", hint: "Bookings, invoicing, CRM, reports", icon: LayoutDashboard },
  { id: "seo", label: "SEO & speed", hint: "Get found on Google, load faster", icon: Search },
  { id: "unsure", label: "Not sure yet", hint: "We'll help you work it out", icon: HelpCircle },
];
const FEATURES = ["M-Pesa payments", "WhatsApp orders", "Admin dashboard", "Booking / appointments", "Blog", "Multi-language", "I already have a logo"];
const BUDGETS = ["Under 15K", "15K – 30K", "30K – 60K", "60K+", "Not sure"];
const TIMELINES = ["ASAP (2 weeks)", "Within a month", "I'm flexible"];
const NEED_TEXT = { website: "a website", store: "an online store", system: "a dashboard / business system", seo: "SEO & speed improvements", unsure: "advice on what I need" };

// A choice that clearly looks tappable: bordered, with a radio/check mark.
function Choice({ selected, onClick, multi = false, children, hint, icon: Icon, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative w-full text-left flex items-center gap-3 rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 min-h-12 bg-white cursor-pointer border-none transition-[box-shadow,background-color,transform] active:scale-[0.99] ${
        selected
          ? "bg-accent-strong/[0.06] shadow-[0_0_0_2px_var(--color-accent-strong)]"
          : "shadow-[0_0_0_1.5px_var(--color-line-strong)] hover:shadow-[0_0_0_1.5px_var(--color-accent-strong),0_6px_14px_-8px_rgba(180,90,10,0.4)]"
      } ${className}`}
    >
      {Icon && (
        <span className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center transition-colors ${selected ? "bg-accent-strong text-white" : "bg-surface-low text-accent-strong"}`}>
          <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="block text-[0.9rem] sm:text-[0.95rem] font-semibold text-ink leading-tight">{children}</span>
        {hint && <span className="block text-xs text-muted mt-0.5">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`shrink-0 w-5 h-5 flex items-center justify-center border-2 transition-colors ${multi ? "rounded-md" : "rounded-full"} ${selected ? "bg-accent-strong border-accent-strong text-white" : "border-line-strong bg-white"}`}
      >
        {selected && <Check size={12} strokeWidth={3.5} />}
      </span>
    </button>
  );
}

const input = "w-full bg-white rounded-xl px-3.5 py-3 text-[16px] text-ink font-sans outline-none box-border border-none shadow-[0_0_0_1.5px_var(--color-line-strong)] focus:shadow-[0_0_0_2px_var(--color-accent-strong)]";

export default function BriefForm() {
  const [params] = useSearchParams();
  const { wa } = useSettings();
  const pkgParam = PACKAGES.find((p) => p.tier === params.get("package"))?.tier || "";
  const needParam = NEEDS.some((n) => n.id === params.get("need")) ? params.get("need") : pkgParam ? "website" : "";

  const [form, setForm] = useState({ need: needParam, pkg: pkgParam, features: [], budget: "", timeline: "", name: "", business: "", details: "" });
  const [stepId, setStepId] = useState(needParam ? (pkgParam ? "extras" : needParam === "website" || needParam === "store" ? "package" : "extras") : "need");
  const [dir, setDir] = useState("next");
  const [reached, setReached] = useState(0);
  const [nameErr, setNameErr] = useState("");
  const timer = useRef(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleFeature = (x) => set("features", form.features.includes(x) ? form.features.filter((f) => f !== x) : [...form.features, x]);
  const showPackages = form.need === "website" || form.need === "store";
  const steps = ["need", ...(showPackages ? ["package"] : []), "extras", "plan", "you"];
  const idx = Math.max(0, steps.indexOf(stepId));
  const last = idx === steps.length - 1;

  const go = (id) => {
    const to = steps.indexOf(id);
    setDir(to >= idx ? "next" : "prev");
    setStepId(id);
    setReached((r) => Math.max(r, to));
  };
  const next = () => !last && go(steps[idx + 1]);
  const back = () => idx > 0 && go(steps[idx - 1]);

  const chooseNeed = (id) => {
    set("need", id);
    // Auto-advance: the next step depends on this choice.
    clearTimeout(timer.current);
    const willPkg = id === "website" || id === "store";
    timer.current = setTimeout(() => {
      setDir("next");
      setStepId(willPkg ? "package" : "extras");
      setReached((r) => Math.max(r, 1));
    }, 220);
  };

  const send = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setNameErr("Please add your name so we know who to reply to.");
      return;
    }
    const lines = [
      "Hi phillipLabs!",
      "",
      `I'm looking for ${NEED_TEXT[form.need] || "help with a project"}.`,
      "",
      `Name: ${form.name.trim()}`,
      form.business.trim() && `Business: ${form.business.trim()}`,
      form.pkg && `Package: ${form.pkg}`,
      form.features.length && `Needs: ${form.features.join(", ")}`,
      form.budget && `Budget: ${form.budget}`,
      form.timeline && `Timeline: ${form.timeline}`,
      form.details.trim() && `Details: ${form.details.trim()}`,
    ].filter(Boolean);
    window.open(wa(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const titles = {
    need: ["What do you need?", "Pick the closest one. You can change it later."],
    package: ["Pick a starting package", "Optional. Prices are in Ksh and fixed once agreed."],
    extras: ["Anything specific?", "Tick all that apply, or skip."],
    plan: ["Budget and timing", "Helps us suggest something realistic."],
    you: ["Almost done. Who are we talking to?", "Only your name is needed."],
  };
  const [title, sub] = titles[stepId];
  const canNext = stepId !== "need" || Boolean(form.need);

  return (
    <form onSubmit={send} noValidate className="card p-4 sm:p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-accent-strong">Step {idx + 1} of {steps.length}</span>
        <span className="text-xs text-muted">Takes about a minute</span>
      </div>

      <div key={stepId} className={`${dir === "next" ? "animate-step-next" : "animate-step-prev"} min-h-[300px] sm:min-h-[340px] flex flex-col`}>
        <h2 className="text-xl font-bold tracking-[-0.01em] leading-tight">{title}</h2>
        <p className="text-sm text-muted mb-3.5">{sub}</p>

        {stepId === "need" && (
          <div className="grid gap-2">
            {NEEDS.map((n) => <Choice key={n.id} icon={n.icon} hint={n.hint} selected={form.need === n.id} onClick={() => chooseNeed(n.id)}>{n.label}</Choice>)}
          </div>
        )}

        {stepId === "package" && (
          <div className="grid gap-2">
            {PACKAGES.map((p) => (
              <Choice key={p.tier} selected={form.pkg === p.tier} onClick={() => set("pkg", form.pkg === p.tier ? "" : p.tier)} hint={`${p.label} · ${p.pages}`}>
                {p.tier} <span className="font-bold text-accent-strong">· Ksh {p.price}</span>
              </Choice>
            ))}
            <Choice selected={form.pkg === "" } onClick={() => set("pkg", "")} hint="We'll recommend one on WhatsApp">Not sure yet</Choice>
          </div>
        )}

        {stepId === "extras" && (
          <div className="grid grid-cols-2 gap-2">
            {FEATURES.map((f) => <Choice multi key={f} selected={form.features.includes(f)} onClick={() => toggleFeature(f)}>{f}</Choice>)}
          </div>
        )}

        {stepId === "plan" && (
          <div className="flex flex-col gap-4">
            <fieldset className="border-none p-0 m-0">
              <legend className="text-sm font-bold text-ink mb-2 p-0">Roughly what budget do you have? <span className="font-medium text-muted">(Ksh)</span></legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUDGETS.map((b) => <Choice key={b} selected={form.budget === b} onClick={() => set("budget", form.budget === b ? "" : b)}>{b}</Choice>)}
              </div>
            </fieldset>
            <fieldset className="border-none p-0 m-0">
              <legend className="text-sm font-bold text-ink mb-2 p-0">When do you need it?</legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIMELINES.map((t) => <Choice key={t} selected={form.timeline === t} onClick={() => set("timeline", form.timeline === t ? "" : t)}>{t}</Choice>)}
              </div>
            </fieldset>
          </div>
        )}

        {stepId === "you" && (
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="bf-name" className="text-sm font-bold block mb-1.5">Your name</label>
              <input id="bf-name" autoComplete="name" value={form.name} onChange={(e) => { set("name", e.target.value); setNameErr(""); }} placeholder="Jane Mwangi" className={input} aria-invalid={!!nameErr} aria-describedby={nameErr ? "bf-name-err" : undefined} />
              {nameErr && <p id="bf-name-err" role="alert" className="text-xs text-[#b42318] mt-1">{nameErr}</p>}
            </div>
            <div>
              <label htmlFor="bf-biz" className="text-sm font-bold block mb-1.5">Business name <span className="font-medium text-muted">(optional)</span></label>
              <input id="bf-biz" autoComplete="organization" value={form.business} onChange={(e) => set("business", e.target.value)} placeholder="Leave blank for a personal project" className={input} />
            </div>
            <div>
              <label htmlFor="bf-details" className="text-sm font-bold block mb-1.5">Anything else? <span className="font-medium text-muted">(optional)</span></label>
              <textarea id="bf-details" rows={2} value={form.details} onChange={(e) => set("details", e.target.value)} placeholder="What would a great result look like?" className={`${input} resize-none`} />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-4">
        {idx > 0 && (
          <button type="button" onClick={back} aria-label="Back" className="inline-flex items-center justify-center gap-1.5 h-12 px-4 rounded-xl bg-white text-ink font-semibold text-sm border-none cursor-pointer shadow-[0_0_0_1.5px_var(--color-line-strong)] hover:shadow-[0_0_0_1.5px_var(--color-ink)] transition-shadow">
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
        )}
        {last ? (
          <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-wa text-white font-bold text-base border-none cursor-pointer shadow-[0_10px_22px_-8px_rgba(14,122,52,0.7)] hover:brightness-110">
            <Send size={17} aria-hidden="true" /> Send on WhatsApp
          </button>
        ) : (
          <button type="button" onClick={next} disabled={!canNext} className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-accent-strong text-white font-bold text-base border-none cursor-pointer shadow-[0_10px_22px_-8px_rgba(180,90,10,0.7)] hover:bg-accent-hover disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed">
            {stepId === "extras" && form.features.length === 0 ? "Skip" : "Next"} <ArrowRight size={17} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Progress pills: filled = done, wide = current. Visited steps are clickable. */}
      <ol className="flex items-center justify-center gap-2 mt-4 list-none p-0 m-0" aria-label="Progress">
        {steps.map((id, i) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => i <= Math.max(reached, idx) && go(id)}
              disabled={i > Math.max(reached, idx)}
              aria-label={`Step ${i + 1}: ${titles[id][0]}`}
              aria-current={i === idx ? "step" : undefined}
              className="p-2 -m-1 bg-transparent border-none cursor-pointer disabled:cursor-default"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-accent-strong" : i < idx ? "w-2 bg-accent-strong/60" : "w-2 bg-line-strong"}`} />
            </button>
          </li>
        ))}
      </ol>
    </form>
  );
}
