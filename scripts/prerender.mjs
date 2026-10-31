import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const PORT = 4173;

function readEnvVar(name, fallback) {
  // .env isn't loaded automatically in a plain Node script — read it
  // manually so this stays consistent with src/config/site.js without
  // adding a dotenv dependency.
  const envPath = path.join(root, ".env");
  if (fs.existsSync(envPath)) {
    const match = fs
      .readFileSync(envPath, "utf8")
      .match(new RegExp(`^${name}=(.*)$`, "m"));
    if (match) return match[1].trim();
  }
  return process.env[name] || fallback;
}

const SITE_URL = readEnvVar("VITE_SITE_URL", "https://philliplabs.vercel.app").replace(/\/$/, "");

// Static routes always prerendered. Blog post routes are appended below
// once fetched from Firestore, so new posts get prerendered automatically
// on the next build — no code change needed.
const STATIC_ROUTES = ["/", "/privacy", "/blog"];

async function getBlogSlugs() {
  try {
    const { initializeApp } = await import("firebase/app");
    const { getFirestore, collection, getDocs, query, where } = await import(
      "firebase/firestore/lite"
    );
    const app = initializeApp({
      apiKey: readEnvVar("VITE_FIREBASE_API_KEY"),
      authDomain: readEnvVar("VITE_FIREBASE_AUTH_DOMAIN"),
      projectId: readEnvVar("VITE_FIREBASE_PROJECT_ID"),
      storageBucket: readEnvVar("VITE_FIREBASE_STORAGE_BUCKET"),
      messagingSenderId: readEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID"),
      appId: readEnvVar("VITE_FIREBASE_APP_ID"),
    });
    const db = getFirestore(app);
    const q = query(collection(db, "posts"), where("published", "==", true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data().slug).filter(Boolean);
  } catch (err) {
    console.warn(
      "[prerender] Couldn't fetch blog slugs from Firestore — skipping blog post prerendering this run.",
      err.message
    );
    return [];
  }
}

// Minimal static file server with SPA fallback (any unmatched path serves
// dist/index.html) — same behavior `vite preview` / most static hosts give
// a client-routed app, without pulling in an extra dependency.
function serveDist() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, decodeURIComponent(req.url.split("?")[0]));
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, "index.html");
    }
    const ext = path.extname(filePath);
    const types = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
    };
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error("[prerender] dist/ not found — run `vite build` first.");
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.warn(
      "[prerender] puppeteer not installed — skipping prerendering. " +
        "The site will still work, just without prerendered HTML for crawlers."
    );
    return;
  }

  const blogSlugs = await getBlogSlugs();
  const routes = [...STATIC_ROUTES, ...blogSlugs.map((s) => `/blog/${s}`)];

  const server = await serveDist();
  let browser;
  try {
    browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  } catch (err) {
    console.warn(
      "[prerender] Chrome failed to launch — skipping prerendering.",
      err.message
    );
    server.close();
    return;
  }

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });

  for (const route of routes) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 15000,
      });
      // brief settle time for any post-networkidle React state updates
      await new Promise((r) => setTimeout(r, 300));
      const html = await page.content();

      const outDir =
        route === "/" ? distDir : path.join(distDir, route.replace(/^\//, ""));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
      console.log(`[prerender] ✓ ${route}`);
    } catch (err) {
      console.warn(`[prerender] ✗ ${route} — ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done — ${routes.length} routes, site: ${SITE_URL}`);
}

main();
