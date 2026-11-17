import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { listPublishedPosts } from "../lib/posts";
import Wrap from "../components/Wrap";

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
      <Wrap className="max-w-[780px]! pt-[72px] pb-[100px]">
        <h1 className="text-4xl font-semibold tracking-[-0.02em] mb-3">Blog</h1>
        <p className="text-muted mb-12">
          Case studies and guides on building websites and systems that actually help a business run.
        </p>

        <div className="flex flex-col">
          {posts === null && <p className="text-muted">Loading…</p>}
          {posts?.length === 0 && <p className="text-muted">No posts yet — check back soon.</p>}
          {posts?.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card-interactive block py-5 px-5 mb-3 no-underline text-ink">
              <span className="text-xs font-semibold text-accent-strong uppercase tracking-[0.04em]">
                {post.tag} · {post.date}
              </span>
              <h2 className="text-2xl my-1.5">{post.title}</h2>
              <p className="text-muted text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </Wrap>
    </>
  );
}
