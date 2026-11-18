import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Import } from "lucide-react";
import { listAllPosts, deletePost, createPost } from "../../lib/posts";
import { BLOG_POSTS as LEGACY_MD_POSTS } from "../../utils/blog";

export default function PostsList() {
  const [posts, setPosts] = useState(null);
  const [importing, setImporting] = useState(false);

  async function refresh() {
    setPosts(await listAllPosts());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    await deletePost(id);
    refresh();
  }

  // One-time helper: pulls in the two posts that were originally written as
  // markdown files in src/content/blog before the CMS existed. Safe to run
  // more than once — it just creates duplicates if re-run, so it's meant to
  // be used once per post then ignored (or the button removed later).
  async function handleImportLegacy() {
    setImporting(true);
    try {
      for (const post of LEGACY_MD_POSTS) {
        await createPost({
          title: post.title,
          slug: post.slug,
          date: post.date,
          excerpt: post.excerpt,
          tag: post.tag,
          body: post.rawBody || "",
          coverImage: "",
          published: true,
        });
      }
      await refresh();
    } finally {
      setImporting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em]">Blog Posts</h1>
        <div className="flex flex-wrap gap-2">
          {LEGACY_MD_POSTS.length > 0 && (
            <button
              onClick={handleImportLegacy}
              disabled={importing}
              className="flex items-center justify-center gap-1.5 border border-line-strong bg-white text-sm font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap hover:bg-[#f7f7f7] disabled:opacity-60"
            >
              <Import size={16} /> {importing ? "Importing…" : "Import legacy posts"}
            </button>
          )}
          <Link
            to="/admin/posts/new"
            className="flex items-center justify-center gap-1.5 bg-accent text-white text-sm font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap hover:brightness-105"
          >
            <Plus size={16} /> New post
          </Link>
        </div>
      </div>

      {posts === null && <p className="text-sm text-muted">Loading…</p>}
      {posts?.length === 0 && (
        <p className="text-sm text-muted">No posts yet — create your first one.</p>
      )}

      <div className="divide-y divide-line border border-line rounded-xl bg-white overflow-hidden">
        {posts?.map((post) => (
          <div key={post.id} className="flex items-center gap-2 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-sm truncate min-w-0">{post.title}</span>
                <span
                  className={`shrink-0 text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                    post.published
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="text-xs text-muted mt-0.5">{post.date}</div>
            </div>
            <Link
              to={`/admin/posts/${post.id}`}
              className="shrink-0 p-2.5 rounded-lg text-muted hover:bg-[#f1f1f1] hover:text-ink"
            >
              <Pencil size={16} />
            </Link>
            <button
              onClick={() => handleDelete(post.id, post.title)}
              className="shrink-0 p-2.5 rounded-lg text-muted hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
