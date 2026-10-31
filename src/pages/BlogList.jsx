import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { listPublishedPosts } from "../lib/posts";
import { siteUrl } from "../config/site";
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
      <Helmet>
        <title>Blog | phillipLabs</title>
        <meta name="description" content="Case studies and guides on websites, CRM, and business systems for Kenyan SMBs." />
        <link rel="canonical" href={siteUrl("/blog")} />
        <meta property="og:title" content="Blog | phillipLabs" />
        <meta property="og:description" content="Case studies and guides on websites, CRM, and business systems for Kenyan SMBs." />
        <meta property="og:url" content={siteUrl("/blog")} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Wrap className="max-w-[780px]! pt-[72px] pb-[100px]">
        <h1 className="text-4xl font-semibold tracking-[-0.02em] mb-3">Blog</h1>
        <p className="text-muted mb-12">
          Case studies and guides on building websites and systems that actually help a business run.
        </p>

        <div className="flex flex-col">
          {posts === null && <p className="text-muted">Loading…</p>}
          {posts?.length === 0 && <p className="text-muted">No posts yet — check back soon.</p>}
          {posts?.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block py-6 border-b border-line no-underline text-ink">
              <span className="text-xs font-semibold text-accent uppercase tracking-[0.04em]">
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
