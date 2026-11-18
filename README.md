# phillipLabs — Website

**v2.2** · Websites first, business systems second, care plans after. Nairobi, Kenya.
Live: https://philliplabs.vercel.app/

React 18 + Vite 5 + Tailwind v4 · Firebase (Auth + Firestore lite) for the admin and content · Cloudinary for images · Vercel for hosting · build-time prerender for SEO.

## Quick start

```bash
npm install
cp .env.example .env     # fill in only what you need; the site runs without Firebase
npm run dev              # http://localhost:5173
npm run build            # sitemap + vite build + prerender
npm run preview
```

Without Firebase keys the site renders its built-in content and the admin is disabled.

## Configuration

| Where | What |
|---|---|
| `site.defaults.json` | Brand, site URL, email, phone, location (used by the build and as fallbacks) |
| `.env` (`VITE_*`) | Firebase web config, Cloudinary cloud name + preset, optional `VITE_BOOKING_URL`. No secrets here. |
| Admin → Settings | Phone, email, deposit %, stats, scheduler link (stored in Firestore `settings/site`) |
| `src/data/constants.js` | Services, packages, systems pricing, FAQ, built-in projects |
| `firestore.rules` | Deploy to Firebase; admins are listed in `admins/{uid}` |

## Structure

```
src/
  components/   UI sections (Hero, Services, Work, Pricing, BriefForm, ...)
  pages/        Route pages (thin wrappers) + blog + privacy
  admin/        Lazy-loaded admin (projects, posts, settings)
  lib/          firebase, settings, projects, posts
  data/         constants.js (all site copy and pricing)
  config/       site.js (brand/contact constants)
scripts/        generate-sitemap.js, prerender.mjs
public/         robots.txt, llms.txt, assets
systemDocs/     All documentation (start at systemDocs/README.md)
```

## Docs

Start at [`systemDocs/README.md`](systemDocs/README.md): positioning, PRD, SRS, architecture, design system, UX, user journey, SEO, security, launch checklist, custom-domain guide, bugs and features.

## Before going live

Follow `systemDocs/LAUNCH_CHECKLIST.md` (Firebase rules + admin doc, disable sign-up, Cloudinary preset, env vars on Vercel, domain, re-run Lighthouse on production).
