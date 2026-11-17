// Generates sitemap.xml into dist/ after `vite build`, including one URL
// per blog post found in Firestore (falls back to legacy markdown files in
// src/content/blog if Firestore isn't reachable at build time).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DEFAULTS = JSON.parse(fs.readFileSync(path.join(root, "site.defaults.json"), "utf8"));

function readEnvVar(name, fallback) {
  const envPath = path.join(root, ".env");
  if (fs.existsSync(envPath)) {
    const match = fs
      .readFileSync(envPath, "utf8")
      .match(new RegExp(`^${name}=(.*)$`, "m"));
    if (match) return match[1].trim();
  }
  return process.env[name] || fallback;
}

const SITE = readEnvVar("VITE_SITE_URL", DEFAULTS.siteUrl).replace(/\/$/, "");

async function getFirestoreSlugs() {
  if (!readEnvVar("VITE_FIREBASE_PROJECT_ID")) return null; // not configured: use legacy markdown slugs
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
  } catch {
    return null; // signal "couldn't reach Firestore" so we fall back
  }
}

function getLegacyMarkdownSlugs() {
  const dir = path.join(root, "src/content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const match = raw.match(/slug:\s*"?([^"\n]+)"?/);
      return match ? match[1].trim() : null;
    })
    .filter(Boolean);
}

const staticUrls = ["/", "/services", "/work", "/process", "/pricing", "/faq", "/contact", "/blog"]; // /privacy is noindex, so excluded
const firestoreSlugs = await getFirestoreSlugs();
const blogSlugs = firestoreSlugs !== null ? firestoreSlugs : getLegacyMarkdownSlugs();
const blogUrls = blogSlugs.map((slug) => `/blog/${slug}`);
const urls = [...staticUrls, ...blogUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join("\n")}
</urlset>
`;

const outDir = path.join(root, "dist");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
