import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { listPublishedPosts } from "../lib/posts";
import Wrap from "../components/Wrap";

// Only real http(s) image URLs are rendered (Cloudinary covers from the admin).
const cover = (u) => (/^https?:\/\//i.test(u || "") ? u : "");

export default function BlogList() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    listPublishedPosts()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <>
      <Seo title="Blog: Websites & Business Systems | phillipLabs" description="Case studies and guides on websites, CRM and business systems for Kenyan businesses." path="/blog" />
      <Wrap className="max-w-[780px]! pt-8 pb-12 lg:pt-10">
        <h1 className="text-4xl font-bold tracking-[-0.02em] mb-2">Blog</h1>
        <p className="text-muted mb-8">
          Case studies and guides on building websites and systems that actually help a business run.
        </p>

        <div className="flex flex-col">
          {posts === null && <p className="text-muted">Loading…</p>}
          {posts?.length === 0 && <p className="text-muted">No posts yet — check back soon.</p>}
          {posts?.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card-interactive group flex flex-col sm:flex-row gap-4 p-3 mb-3 no-underline text-ink">
              {cover(post.coverImage) && (
                <img
                  src={cover(post.coverImage)}
                  alt=""
                  width="480"
                  height="270"
                  loading="lazy"
                  className="w-full sm:w-56 aspect-video object-cover rounded-xl shrink-0 bg-surface-low"
                />
              )}
              <div className="px-1 sm:py-1 min-w-0">
                <span className="text-xs font-semibold text-accent-strong uppercase tracking-[0.04em]">
                  {post.tag} · {post.date}
                </span>
                <h2 className="text-xl font-semibold my-1.5 tracking-[-0.01em]">{post.title}</h2>
                <p className="text-muted text-sm line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Wrap>
    </>
  );
}
