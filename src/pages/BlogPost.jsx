import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { useParams, Link, Navigate } from "react-router-dom";
import { getPostBySlug, renderMarkdown } from "../lib/posts";
import { siteUrl } from "../config/site";
import Wrap from "../components/Wrap";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    setPost(undefined);
    getPostBySlug(slug)
      .then(setPost)
      .catch(() => setPost(null));
  }, [slug]);

  if (post === undefined) {
    return (
      <Wrap className="max-w-[720px]! pt-[72px] pb-[100px]">
        <p className="text-muted">Loading…</p>
      </Wrap>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <Seo title={`${post.title} | phillipLabs`} description={post.excerpt} path={`/blog/${post.slug}`} type="article">
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: "Phillip Kinuthia" },
            publisher: { "@type": "Organization", name: "phillipLabs" },
            mainEntityOfPage: siteUrl(`/blog/${post.slug}`),
          })}
        </script>
      </Seo>
      <Wrap className="max-w-[720px]! pt-[72px] pb-[100px]">
        <Link to="/blog" className="text-sm text-muted no-underline">
          ← Back to blog
        </Link>
        <span className="block mt-5 text-xs font-semibold text-accent-strong uppercase tracking-[0.04em]">
          {post.tag} · {post.date}
        </span>
        <h1 className="text-4xl my-2.5 mb-8">{post.title}</h1>
        <div
          className="prose prose-neutral max-w-none prose-headings:tracking-[-0.02em] prose-a:text-accent-strong "
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
        />
      </Wrap>
    </>
  );
}
