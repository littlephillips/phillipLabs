import fs from "node:fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const defaults = JSON.parse(fs.readFileSync(new URL("./site.defaults.json", import.meta.url), "utf8"));

// index.html contains %VITE_*% placeholders (JSON-LD, OG tags). Vite only
// replaces placeholders whose variable is defined, so without a .env the
// literal "%VITE_SITE_URL%" used to ship to production. This fills them with
// the shared defaults whenever the env var is missing.
function htmlDefaults(env) {
  const values = {
    VITE_SITE_URL: (env.VITE_SITE_URL || defaults.siteUrl).replace(/\/$/, ""),
    VITE_CONTACT_EMAIL: env.VITE_CONTACT_EMAIL || defaults.email,
    VITE_CONTACT_PHONE: "+" + (env.VITE_CONTACT_PHONE || defaults.phone),
  };
  return {
    name: "html-env-defaults",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replace(/%(VITE_[A-Z_]+)%/g, (m, k) => values[k] ?? m),
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), tailwindcss(), htmlDefaults(env)],
    server: { hmr: { overlay: false } },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            firebase: ["firebase/app", "firebase/firestore/lite"],
          },
        },
      },
    },
  };
});
