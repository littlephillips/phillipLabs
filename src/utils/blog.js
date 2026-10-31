import { marked } from "marked";

// Vite loads every markdown file in src/content/blog as raw text at build time.
const files = import.meta.glob("../content/blog/*.md", { eager: true, query: "?raw", import: "default" });

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const [, fm, body] = match;
  const meta = {};
  fm.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    meta[key] = value;
  });
  return { meta, body };
}

function loadPosts() {
  return Object.values(files)
    .map((raw) => {
      const { meta, body } = parseFrontmatter(raw);
      return {
        title: meta.title || "Untitled",
        slug: meta.slug,
        date: meta.date || "",
        excerpt: meta.excerpt || "",
        tag: meta.tag || "Article",
        html: marked.parse(body),
        rawBody: body,
      };
    })
    .filter((p) => p.slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const BLOG_POSTS = loadPosts();

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
