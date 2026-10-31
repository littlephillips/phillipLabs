import { CONTACT_EMAIL } from "../config/site.js"

export const PHONE = "254710715653";
export const EMAIL = CONTACT_EMAIL;
export const LOCATION = "Nairobi, Kenya"
export const WA_BASE = `https://wa.me/${PHONE}`;
export const waMsg = (msg) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

// update based on developer availability for projects
export const AVAILABILITY = "Available for projects"

// Swap this for a real Calendly/Google Calendar booking link when set up.
export const BOOKING_URL = waMsg(
  "Hi phillipLabs, I'd like to book a free 20-min call to talk about a website/system for my business."
);

// ---------------------------------------------------------------------------
// NAVIGATION LINKS
// ---------------------------------------------------------------------------
export const NAV_LINKS = ["Work", "Services", "Process", "Pricing", "Contact", "FAQ",  "Blog"];

// ---------------------------------------------------------------------------
// HERO / POSITIONING
// ---------------------------------------------------------------------------
export const HERO = {
  headline: "Your Business Deserves an Online Presence",
  headlineAccent: "IT'S TIME, TO DO IT!",
  sub:
    "We build Sites wired with SEO, Lead generation, Google analytics, paired with the whatsapp integration, CMS, or CRM system that runs behind them, so Customers can find you and you can Manage it all from one place. Let yours be next ...",
  // ctaPrimary: "Book a free 20-min call",
  ctaPrimary: "Text us on WhatsApp",
  ctaSecondary: "See recent work",
};

export const PROOF_LOGOS_NOTE =  "Recent projects: real client work, screenshots below.";

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------
export const SERVICES = [
  {
    icon: "Globe2",
    title: "Client-Facing Websites",
    desc: "Fast, mobile-first sites that represent your brand properly,homepage, services, contact all hand-coded, zero page builders.",
  },
  {
    icon: "LayoutDashboard",
    title: "CMS, CRM & Dashboards",
    desc: "From a content system you can update yourself to a full CRM or ops dashboard manage content, clients, and reports in one place.",
  },
  {
    icon: "ShoppingCart",
    title: "E-commerce & M-Pesa",
    desc: "Online stores with M-Pesa/Daraja integration, inventory, and order tracking built around how your business actually sells.",
  },
  {
    icon: "SearchCheck",
    title: "SEO & Performance",
    desc: "Technical SEO baked in from day one, structured data, fast load times, mobile-first, Google Analytics.",
  },
  {
    icon: "MessageCircle",
    title: "WhatsApp & Live Chat",
    desc: "Ordering and enquiries routed straight into WhatsApp so leads never sit in an inbox nobody checks.",
  },
  {
    icon: "RefreshCw",
    title: "Maintenance & Support",
    desc: "Monthly plans for updates, security patches, content changes, and reporting, so the site stays healthy after launch.",
  },
];

// ---------------------------------------------------------------------------
export const PROJECTS = [
  {
    tag: "Power and Electrical ",
    title: "Augtech Enterprises",
    img: "/assets/img/work/augtech.png",
    url: "#",
    desc: "A showcase of Professional electrical and power handlers,it's for individuals and companies  in need of power and electrical solutions.",
    stack: ["React", "Tailwind", "Node.js", "EmailJs", "Google Cloud"],
    color: "#ed2fb4",
  },
  {
    tag: "Logistics",
    title: "Qwetu Movers",
    img: "/assets/img/work/qwetumovers.jpg",
    url: "https://qwetumovers.co.ke/",
    desc: "Reliable moving and storage services for individuals and businesses in Kenya.",
    stack: ["React", "Tailwind", "Node.js", "Firebase", "Cloudinary", "EmailJs", "Google Cloud"],
    color: "#2f6fed",
  },
  {
    tag: "Online Course",
    title: "Logic Architect",
    img: "/assets/img/work/logicArchitect.jpg",
    url: "https://logicarchitect54.web.app/",
    desc: "Online course that teaches the mental models, pseudocode patterns, and architectural thinking that separate developers who get hired from those who don't.",
    stack: ["React", "Tailwind", "Node.js", "Mpesa Daraja", "Paypal", "Firebase", "Google Cloud"],
    color: "#1f9e5c",
  },
  {
    tag: "Online Course",
    title: "Logic Architect — Admin",
    variant: "admin",
    img: "/assets/img/work/logicArchitectCrm.jpg",
    url: "https://logicarchitectcrm.web.app/crm",
    desc: "Admins control the Logic Architect platform — courses, user access, payment processing, refunds and support.",
    stack: ["React", "Tailwind", "Node.js", "Firebase", "Google Cloud"],
    color: "#1f9e5c",
  },
  {
    tag: "Repair Shop",
    title: "Estaka Parts",
    img: "/assets/img/work/estakaparts.png",
    url: "https://estakaparts.web.app/",
    desc: "Customer-facing site for browsing parts, requesting quotes, and leaving reviews for Estaka Parts.",
    stack: ["React", "Tailwind", "Node.js", "WhatsApp API", "Map API", "Firebase", "Google Cloud"],
    color: "#c8862c",
  },
  {
    tag: "Repair Shop",
    title: "Estaka Parts — Admin",
    variant: "admin",
    img: "/assets/img/work/estakapart_crm.jpg",
    url: "https://estaka-crm.web.app/",
    desc: "Owners manage Estaka Parts' inventory, requests, reviews and a live kill-switch for public write access.",
    stack: ["React", "Tailwind", "Node.js", "WhatsApp API", "Map API", "Firebase", "Google Cloud"],
    color: "#c8862c",
  },
  {
    tag: "Event Agency",
    title: "AllinEvents",
    img: "/assets/img/work/allInvents.jpg",
    url: "https://allineventsclient.web.app/",
    desc: "Event management site for creating, browsing, and organizing events with registration and ticketing.",
    stack: ["React", "Tailwind", "Node.js", "WhatsApp API", "Map API", "Firebase", "Google Cloud"],
    color: "#7c4dd6",
  },
  {
    tag: "Event Agency",
    title: "AllinEvents — Admin",
    variant: "admin",
    img: "/assets/img/work/allInvents_crm.jpg",
    url: "https://allinevents-6be19.web.app/crm",
    desc: "Admin dashboard for bookings, client and event tracking, reviews, and pipeline value across the agency.",
    stack: ["React", "Tailwind", "Node.js", "WhatsApp API", "Map API", "Firebase", "Google Cloud"],
    color: "#7c4dd6",
  },
  {
    tag: "MicroFinance",
    title: "Cash Advance",
    img: "/assets/img/work/cashdvance.jpg",
    url: "https://cash-advance-72.web.app/",
    desc: "Web-based microfinance system for user registration, loan applications, approvals, disbursement, and reporting.",
    stack: ["React", "Tailwind", "Node.js", "Firebase", "Google Cloud"],
    color: "#1a8f8f",
  },
];


// ---------------------------------------------------------------------------
// PROCESS
// ---------------------------------------------------------------------------
export const PROCESS = [
  {
    step: "01",
    icon: "PhoneCall",
    title: "Free 20-min call",
    desc: "We talk through what your business needs, a site, a booking system, an order dashboard and whether it's a fit. No pressure, no obligation.",
  },
  {
    step: "02",
    icon: "FileCheck2",
    title: "Fixed quote & deposit",
    desc: "You get a clear price and timeline in writing. A 40% deposit locks in your build slot; the balance is due on delivery.",
  },
  {
    step: "03",
    icon: "Code2",
    title: "Build & check-ins",
    desc: "I build in stages and share progress links as I go, so you're never waiting weeks to see anything.",
  },
  {
    step: "04",
    icon: "Rocket",
    title: "Launch & handover",
    desc: "Your site goes live, you get a short walkthrough of anything you'll manage yourself, plus your free revisions.",
  },
  {
    step: "05",
    icon: "LifeBuoy",
    title: "Ongoing support (optional)",
    desc: "Pick a monthly plan for updates and fixes, or call it done, the site is yours either way.",
  },
];

// ---------------------------------------------------------------------------
// PRICING TERMS
// ---------------------------------------------------------------------------
export const PRICING_TERMS = {
  deposit: "60% deposit to start, balance on delivery.",
  timeline: "Typical turnaround: 1–3 weeks depending on package.",
  urgency: "I take on a limited number of builds at a time to keep quality and response time high.",
  currency: "All prices in Kenyan Shillings (KES).",
};

export const FAQ = [
  {
    q: "How long does a website actually take?",
    a: "Most Bronze/Silver sites take 1–3 weeks from deposit to launch. Gold and Platinum builds with CRM or ecommerce typically take 3–6 weeks, depending on how much content and integration is involved.",
  },
  {
    q: "What do I need to have ready before we start?",
    a: "Ideally your business name, logo (if you have one), a rough list of pages/services, and any text or photos you want used. If you don't have these yet, I can help you put together a simple content plan on the call.",
  },
  {
    q: "Do you build on WordPress or Wix?",
    a: "No — everything is hand-coded, so there's no monthly page-builder fee, no bloated plugins, and the site is genuinely fast. You own the code outright.",
  },
  {
    q: "Can I make changes myself after launch?",
    a: "Depends on the package. Silver and up include a lightweight dashboard so you can edit products/services yourself. For anything else, revisions are included per your package, and ongoing support plans cover the rest.",
  },
  {
    q: "How does payment work?",
    a: "A 40% deposit via M-Pesa or bank transfer secures your build slot. The remaining 60% is due when the site is ready to launch.",
  },
   {
    q: "Do I get an invoice and a receipt ?",
    a: "Yes, An invoice is offered before the design and build process Starts, and a receipt is issued on payment, all for proffessional record keeping and tracking.",
  },
  {
    q: "What if I need something not listed in a package?",
    a: "Most custom requests (multi-language, booking systems, advanced integrations) can be scoped as an add-on. Mention it on the call and I'll give you a straight price.",
  },
];

export const SOCIALS = [
  {
    name: "WhatsApp",
    color: "#25D366",
    url: WA_BASE,
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  },
  {
    name: "Instagram",
    color: "#E1306C",
    url: "https://www.instagram.com/little_phillips/",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    url: "https://www.linkedin.com/in/phillip-kinuthia-10a2101a0/",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    name: "GitHub",
    color: "#e8e4dc",
    url: "https://github.com/littlephillips/",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
  {
    name: "Medium",
    color: "#00ab6c",
    url: "https://medium.com/@phillipkinuthia72",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
  },
  {
    name: "Facebook",
    color: "#1877F2",
    url: "https://www.facebook.com/phillip.phillips.1800/",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  },
];


// ---------------------------------------------------------------------------
export const PACKAGES = [
  {
    tier: "Bronze",
    label: "Starter",
    price: "8K – 12K",
    monthly: "700",
    pages: "1–5 pages",
    revisions: "1 revision",
    color: "#a9764a",
    icon: "Package",
    features: [
      "Homepage & About page",
      "Service/product listing (view-only)",
      "Contact page + Google Maps",
      "Social media & WhatsApp integration",
      "Fully responsive design",
      "1 free revision",
    ],
    best: "Businesses that just want an online presence.",
  },
  {
    tier: "Silver",
    label: "Business",
    price: "13K – 25K",
    monthly: "1,200",
    pages: "5–10 pages",
    revisions: "2 revisions",
    color: "#7c828c",
    icon: "Layers",
    features: [
      "Everything in Bronze",
      "Optional CRM-lite dashboard",
      "Add/edit services & products",
      "Track basic inquiries & orders",
      "WhatsApp integration",
      "Basic SEO & Google Analytics",
      "2 free revisions",
    ],
    best: "Businesses that want to self-manage and track activity.",
  },
  {
    tier: "Gold",
    label: "Advanced",
    price: "25K – 50K",
    monthly: "2,400",
    pages: "10–20 pages",
    revisions: "3 revisions",
    color: "#e07b1f",
    icon: "Award",
    features: [
      "Everything in Silver",
      "Full CRM & product management",
      "Customer & client tracking",
      "Stock/availability tracking",
      "Basic reporting & analytics",
      "Blog setup & enhanced SEO",
      "Optional ecommerce / payment",
      "3 free revisions",
    ],
    best: "Businesses needing inventory, booking or client tracking.",
    featured: true,
  },
  {
    tier: "Platinum",
    label: "Enterprise",
    price: "50K+",
    monthly: "3,600",
    pages: "20–30+ pages",
    revisions: "Unlimited",
    color: "#0b0b10",
    icon: "Gem",
    features: [
      "Everything in Gold",
      "Full operations CRM & client database",
      "Employee accounts & permissions",
      "Order & appointment tracking",
      "Automated notifications & reminders",
      "Advanced analytics & reporting",
      "Multi-language support",
      "Dedicated project manager",
      "Annual redesign credit",
      "Post-launch marketing kit",
    ],
    best: "Full digital ops — marketing, CRM & internal workflow.",
  },
];

export const ADDONS = [
  { name: "Basic Maintenance", price: "Ksh 700/mo", desc: "Bug fixes, backups, security updates" },
  { name: "Business Support", price: "Ksh 1,200/mo", desc: "Product updates, small dashboard tweaks" },
  { name: "Growth Plan", price: "Ksh 2,400/mo", desc: "SEO, analytics reporting, landing pages" },
  { name: "Premium Support", price: "Ksh 3,600/mo", desc: "Full CRM support, priority assistance" },
];

export const WHY = [
  {
    num: "01",
    icon: "Code2",
    title: "100% Custom Code",
    desc: "No WordPress, no Wix, no page builders. Every line written from scratch for your specific needs.",
  },
  {
    num: "02",
    icon: "Layers",
    title: "Flexible Packages",
    desc: "Start small with a simple site. Upgrade to CRM, ecommerce, or full operations as you grow.",
  },
  {
    num: "03",
    icon: "MapPin",
    title: "Built for Kenya",
    desc: "Nairobi-based support, WhatsApp-first communication. We understand the local market.",
  },
  {
    num: "04",
    icon: "TrendingUp",
    title: "SEO from Day One",
    desc: "Technical SEO, structured data, and performance optimization built in, not bolted on later.",
  },
  {
    num: "05",
    icon: "MessageCircle",
    title: "Order via WhatsApp",
    desc: "No complicated forms. Just message Us directly, describe your vision, and we get started.",
  },
];

export const STATS = [
  ["10+", "Projects Delivered"],
  ["4+", "Years Experience"],
  ["100%", "Custom Code"],
  ["Kenya", "Based & Available"],
];
