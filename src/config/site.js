// Single source of truth for values that change when the site moves off the
// Vercel subdomain onto a real domain, or the contact email changes.
// Update .env (VITE_SITE_URL / VITE_CONTACT_EMAIL) — never hardcode these
// elsewhere in the app again.

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://philliplabs.vercel.app"
).replace(/\/$/, "");

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "philliplabs72@gmail.com";

export function siteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
