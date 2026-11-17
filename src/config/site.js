// Single source of truth for values that change when the site moves to a
// custom domain or contact details change. Defaults live in
// /site.defaults.json (shared with vite.config.js and the build scripts);
// override per environment with VITE_* variables. Contact details can also
// be changed at runtime from Admin → Settings (see lib/settings.jsx).
import defaults from "../../site.defaults.json";

const env = import.meta.env;

export const BRAND = defaults.brand;
export const SITE_URL = (env.VITE_SITE_URL || defaults.siteUrl).replace(/\/$/, "");
export const CONTACT_EMAIL = env.VITE_CONTACT_EMAIL || defaults.email;
export const CONTACT_PHONE = env.VITE_CONTACT_PHONE || defaults.phone;
export const LOCATION = defaults.location;

// Optional scheduler link (Cal.com / Calendly / Google Calendar appointment
// page). When empty, "Book a call" falls back to a pre-filled WhatsApp message.
export const BOOKING_URL = env.VITE_BOOKING_URL || "";

export function siteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
