// All public-site copy and structured content lives here (v2.1).
// Contact details, availability, stats and deposit % are the *defaults* for
// the values editable in Admin → Settings (see lib/settings.jsx).
// Rule: nothing on the site may promise something phillipLabs cannot show.
// Every claim below should be backed by a project in PROJECTS or a term in
// PRICING_TERMS.

import { CONTACT_EMAIL, CONTACT_PHONE, LOCATION as SITE_LOCATION } from "../config/site.js";

// ---------------------------------------------------------------------------
// SETTINGS DEFAULTS (overridden by Firestore doc settings/site)
// ---------------------------------------------------------------------------
export const DEFAULT_SETTINGS = {
  phone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  location: SITE_LOCATION,
  available: true,
  availability: "Available for projects",
  depositPercent: 40,
  popularTier: "Silver", // which website package gets the "Most popular" badge
  stats: [
    ["9", "Live builds"],
    ["6", "Businesses served"],
    ["4+", "Years building"],
    ["Nairobi", "Based & available"],
  ],
};

export const waLink = (phone, msg) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

// ---------------------------------------------------------------------------
// NAVIGATION (each entry is its own route; Home also scrolls through all)
// ---------------------------------------------------------------------------
export const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "Pricing", to: "/pricing" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
  { label: "Blog", to: "/blog" },
];

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------
export const HERO = {
  // headline: "Websites that win customers.",
  headline: "Your Business Deserves an Online Presence",
  // headlineAccent: "Systems that run the business.",
  headlineAccent: "IT'S TIME, TO DO IT!",
  // sub: "Custom websites for Kenyan businesses, plus the dashboards and systems that run them. Fixed price, one team on WhatsApp.",
   sub:
    "We build Sites wired with SEO, paired with Whatsapp integration,plus the Dashboards and Systems that run them So Customers can find you and you can Manage it all from one place. Let yours be next ...",
  ctaPrimary: "Chat on WhatsApp",
  ctaSecondary: "See real work",
  trust: ["Fixed price, agreed upfront", "You own the code", "Replies within hours"],
};

// ---------------------------------------------------------------------------
// SERVICES: three lanes, six services. Order = priority (websites first).
// ---------------------------------------------------------------------------
export const LANES = [
  { id: "websites", title: "Websites", tagline: "Get found. Get enquiries." },
  { id: "systems", title: "Business systems", tagline: "Run daily work in one place." },
  { id: "care", title: "Care", tagline: "Stay healthy after launch." },
];

export const SERVICES = [
  {
    slug: "business-websites",
    lane: "websites",
    icon: "Globe2",
    title: "Business websites",
    short: "Fast, mobile-first sites that make a business look as good as it is.",
    long: "A website for your business: home, services, about and contact, built to load fast on Kenyan mobile data and to turn visitors into WhatsApp enquiries. No page builders and no monthly platform fee.",
    includes: [
      "Custom design, fully responsive",
      "WhatsApp, call and map buttons built in",
      "Basic SEO and Google Analytics setup",
      "Yours to keep: code, domain, content",
    ],
    goodFor: "Shops, service companies, clinics, schools and anyone still relying on Facebook alone.",
    enquiry: "a business website",
  },
  {
    slug: "online-stores",
    lane: "websites",
    icon: "ShoppingCart",
    title: "Online stores & M-Pesa",
    short: "Sell online with M-Pesa checkout, stock and order tracking.",
    long: "A store built around how you actually sell: product catalogue, M-Pesa (Daraja) payments, stock levels and an order list you can manage yourself. Orders can also be routed to WhatsApp if that is how your customers prefer to buy.",
    includes: [
      "Product catalogue with categories",
      "M-Pesa / Daraja payment integration",
      "Stock and order tracking",
      "Order notifications to you",
    ],
    goodFor: "Retailers and parts or fragrance sellers who want orders without the back-and-forth.",
    enquiry: "an online store with M-Pesa",
  },
  {
    slug: "seo-speed",
    lane: "websites",
    icon: "SearchCheck",
    title: "SEO & speed",
    short: "Be found on Google and load fast on a phone.",
    long: "Technical SEO and performance work for a new or existing site: structured data, sitemap, page titles, image weight, Core Web Vitals and Google Business basics. We measure before and after so you can see what changed.",
    includes: [
      "Site audit with a prioritised fix list",
      "Structured data, sitemap, metadata",
      "Speed and Core Web Vitals fixes",
      "Monthly reporting (Growth plan)",
    ],
    goodFor: "Businesses with a site that nobody finds, or that feels slow on mobile.",
    enquiry: "SEO and speed improvements",
  },
  {
    slug: "dashboards-crm",
    lane: "systems",
    icon: "LayoutDashboard",
    title: "Dashboards & CRM",
    short: "One login to manage clients, content, orders and reports.",
    long: "An admin dashboard or CRM that sits behind your website: manage content, customers, enquiries, inventory and reports without calling a developer. Built with role-based access so staff only see what they should.",
    includes: [
      "Secure admin login with roles",
      "Clients, orders, stock or bookings tracking",
      "Simple reports and exports",
      "Live examples: Estaka, AllinEvents, Logic Architect",
    ],
    goodFor: "Owners who are outgrowing spreadsheets and WhatsApp threads.",
    enquiry: "a dashboard / CRM",
  },
  {
    slug: "custom-systems",
    lane: "systems",
    icon: "Workflow",
    title: "Custom business systems",
    short: "Invoicing, bookings, loans and other workflows, built to your process.",
    long: "When a template will not fit, we build the system: invoicing, appointment booking, loan management, internal tools and similar workflows. Every system starts with a free scoping call and a written scope, so you know the price before any code.",
    includes: [
      "Free scoping call and written scope",
      "Multi-user accounts and permissions",
      "Automated notifications and reminders",
      "Live example: Cash Advance (microfinance)",
    ],
    goodFor: "Businesses with a repeatable process that is currently done by hand.",
    enquiry: "a custom business system",
  },
  {
    slug: "care-plans",
    lane: "care",
    icon: "LifeBuoy",
    title: "Care plans",
    short: "Updates, backups, fixes and reporting, month to month.",
    long: "Monthly plans that keep your site or system secure and current: backups, security updates, content changes and small improvements. Cancel any time. The site is yours either way.",
    includes: [
      "Backups and security updates",
      "Content and small feature changes",
      "Priority response on WhatsApp",
      "Monthly plans from Ksh 700",
    ],
    goodFor: "Anyone who wants a developer on call without hiring one.",
    enquiry: "a monthly care plan",
  },
];

// ---------------------------------------------------------------------------
// WORK. kind: "website" | "system". Pills are coloured by kind (not per
// project) so the grid stays calm. Firestore docs mirror this shape.
// ---------------------------------------------------------------------------
export const WORK_KINDS = [
  { id: "all", label: "All" },
  { id: "website", label: "Websites" },
  { id: "system", label: "Systems" },
];

export const PROJECTS = [
  {
    title: "Qwetu Movers",
    kind: "website",
    tag: "Logistics",
    img: "/assets/img/work/qwetumovers.jpg",
    url: "https://qwetumovers.co.ke/",
    desc: "Moving and storage company site with a structured quote request that lands in WhatsApp.",
  },
  {
    title: "Estaka Parts",
    kind: "website",
    tag: "Auto parts",
    img: "/assets/img/work/estakaparts.jpg",
    url: "https://estakaparts.web.app/",
    desc: "Browse parts, request quotes and leave reviews, with WhatsApp ordering.",
  },
  {
    title: "Estaka Parts: Admin",
    kind: "system",
    tag: "Auto parts",
    img: "/assets/img/work/estakapart_crm.jpg",
    url: "https://estaka-crm.web.app/",
    desc: "Inventory, quote requests, reviews and a kill-switch for public write access.",
  },
  {
    title: "AllinEvents",
    kind: "website",
    tag: "Events",
    img: "/assets/img/work/allInvents.jpg",
    url: "https://allineventsclient.web.app/",
    desc: "Browse and book events with registration and ticketing.",
  },
  {
    title: "AllinEvents: Admin",
    kind: "system",
    tag: "Events",
    img: "/assets/img/work/allInvents_crm.jpg",
    url: "https://allinevents-6be19.web.app/crm",
    desc: "Bookings, clients, events, reviews and pipeline value in one dashboard.",
  },
  {
    title: "Logic Architect",
    kind: "website",
    tag: "Online course",
    img: "/assets/img/work/logicArchitect.jpg",
    url: "https://logicarchitect54.web.app/",
    desc: "Course platform with M-Pesa and PayPal payments for aspiring developers.",
  },
  {
    title: "Logic Architect: Admin",
    kind: "system",
    tag: "Online course",
    img: "/assets/img/work/logicArchitectCrm.jpg",
    url: "https://logicarchitectcrm.web.app/crm",
    desc: "Courses, learner access, payments, refunds and support in one place.",
  },
  {
    title: "Cash Advance",
    kind: "system",
    tag: "Microfinance",
    img: "/assets/img/work/cashdvance.jpg",
    url: "https://cash-advance-72.web.app/",
    desc: "Loan system: registration, applications, approvals, disbursement and reporting.",
  },
  {
    title: "Augtech Enterprises",
    kind: "website",
    tag: "Electrical",
    img: "/assets/img/work/augtech.jpg",
    url: "#",
    desc: "Showcase site for an electrical and power solutions company.",
  },
];

// ---------------------------------------------------------------------------
// PROCESS
// ---------------------------------------------------------------------------
export const PROCESS = [
  { step: "01", icon: "PhoneCall", title: "Free 20-min call", desc: "Tell us what the business needs. We tell you honestly if it is a fit." },
  { step: "02", icon: "FileCheck2", title: "Fixed quote", desc: "Price and timeline in writing. A deposit locks your build slot." },
  { step: "03", icon: "Code2", title: "Build in stages", desc: "You see working links as we go, not a big reveal weeks later." },
  { step: "04", icon: "Rocket", title: "Launch & handover", desc: "Go live, short walkthrough, free revisions per your package." },
  { step: "05", icon: "LifeBuoy", title: "Care (optional)", desc: "Monthly support, or call it done. The work is yours either way." },
];

// ---------------------------------------------------------------------------
// PRICING. Websites are tiered; systems are scoped. Single deposit rule:
// settings.depositPercent (default 40%) drives every mention of it.
// ---------------------------------------------------------------------------
export const PACKAGES = [
  {
    tier: "Bronze",
    label: "Starter",
    price: "8K – 12K",
    pages: "1–5 pages",
    revisions: "1 revision",
    icon: "Package",
    features: [
      "Homepage, About and Contact",
      "Services or product list (view-only)",
      "Google Maps, WhatsApp and social links",
      "Fully responsive design",
    ],
    best: "A business that just needs a proper online presence.",
  },
  {
    tier: "Silver",
    label: "Business",
    price: "13K – 25K",
    pages: "5–10 pages",
    revisions: "2 revisions",
    icon: "Layers",
    features: [
      "Everything in Bronze",
      "Light dashboard to edit services and products",
      "Track enquiries and basic orders",
      "Basic SEO and Google Analytics",
    ],
    best: "A business that wants to update its own site and track enquiries.",
  },
  {
    tier: "Gold",
    label: "Advanced",
    price: "25K – 50K",
    pages: "10–20 pages",
    revisions: "3 revisions",
    icon: "Award",
    features: [
      "Everything in Silver",
      "Full CRM and product management",
      "Stock or availability tracking",
      "Blog, enhanced SEO and reporting",
      "Optional online payments (M-Pesa)",
    ],
    best: "A business needing inventory, booking or client tracking.",
  },
];

export const SYSTEMS_PRICING = {
  price: "50K+",
  intro: "Systems are scoped, not guessed. After a free call you get a written scope and a fixed price.",
  includes: [
    "Everything in a website package, if you need one",
    "Custom workflow built to your process",
    "Staff accounts with roles and permissions",
    "Automated notifications and reminders",
    "Advanced reporting and exports",
    "Multi-language support on request",
  ],
  drivers: [
    "How many user roles there are",
    "Integrations (M-Pesa, SMS, email, WhatsApp)",
    "Reports and automations needed",
    "Data to migrate from spreadsheets",
  ],
};

export const ADDONS = [
  { name: "Basic Maintenance", price: "Ksh 700/mo", desc: "Backups, bug fixes, security updates" },
  { name: "Business Support", price: "Ksh 1,200/mo", desc: "Content updates, small dashboard tweaks" },
  { name: "Growth Plan", price: "Ksh 2,400/mo", desc: "SEO, analytics reporting, landing pages" },
  { name: "Systems Support", price: "Ksh 3,600/mo", desc: "Priority help for CRM and custom systems" },
];

export const pricingTerms = (deposit) => ({
  deposit: `${deposit}% deposit to start, ${100 - deposit}% on delivery.`,
  timeline: "Websites: 1–3 weeks. Systems: scoped on the call.",
  urgency: "We take a limited number of builds at a time to keep quality high.",
  currency: "All prices in Kenyan Shillings (KES), fixed once agreed.",
});

// ---------------------------------------------------------------------------
// WHY US: four reasons, each provable on this site.
// ---------------------------------------------------------------------------
export const WHY = [
  { num: "01", icon: "Rocket", title: "Real work you can open", desc: "Every project in our Work section is live. Click it, use it, judge it yourself." },
  { num: "02", icon: "FileCheck2", title: "Fixed price in writing", desc: "You know the cost and timeline before we start. No surprise invoices." },
  { num: "03", icon: "MapPin", title: "Built for Kenya", desc: "M-Pesa, WhatsApp-first communication and a team based in Nairobi." },
  { num: "04", icon: "Code2", title: "You own everything", desc: "Custom code, no page builders. The code, domain and data are yours." },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const FAQ = [
  {
    q: "Do you only build websites?",
    a: "Websites come first, but we also build the systems behind them: dashboards, CRMs, invoicing, bookings and loan tools. If a template will not fit your process, we scope a custom system on a free call.",
  },
  {
    q: "How long does a website take?",
    a: "Most Bronze and Silver sites take 1–3 weeks from deposit to launch. Gold builds with a CRM or online payments usually take 3–6 weeks. Systems are timed in the written scope.",
  },
  {
    q: "What do I need to have ready?",
    a: "Your business name, a logo if you have one, a rough list of pages or services, and any text or photos you want used. If you are missing some of it, we plan the content with you on the call.",
  },
  {
    q: "Do you use WordPress or Wix?",
    a: "No. Everything is developer written and tested, so there is no monthly builder fee, no plugin bloat, and the site is fast. You own the code.",
  },
  {
    q: "Can I make changes myself after launch?",
    a: "Silver and above include a light dashboard to edit services and products. Other changes are covered by your included revisions or a care plan.",
  },
  {
    q: "How does payment work?",
    a: "A deposit via M-Pesa or bank transfer secures your slot, and the balance is due when the work is ready to launch. You get an invoice before we start and a receipt on every payment.",
  },
  {
    q: "What if I need something not in a package?",
    a: "Most requests (booking, multi-language, extra integrations) can be scoped as add-ons. Mention it on the call and we give you a straight price.",
  },
];

// Social links only; icons are React components in components/SocialIcon.jsx.
export const SOCIALS = [
  { name: "WhatsApp", id: "whatsapp", url: null },
  { name: "Instagram", id: "instagram", url: "https://www.instagram.com/little_phillips/" },
  { name: "LinkedIn", id: "linkedin", url: "https://www.linkedin.com/in/phillip-kinuthia-10a2101a0/" },
  { name: "GitHub", id: "github", url: "https://github.com/littlephillips/" },
  { name: "Medium", id: "medium", url: "https://medium.com/@phillipkinuthia72" },
  { name: "Facebook", id: "facebook", url: "https://www.facebook.com/phillip.phillips.1800/" },
];
