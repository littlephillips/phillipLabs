import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostById,
  createPost,
  updatePost,
  slugify,
  renderMarkdown,
} from "../../lib/posts";
import ImageUploader from "../components/ImageUploader";

const EMPTY = {
  title: "",
  slug: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tag: "Article",
  body: "",
  coverImage: "",
  published: false,
};

export default function PostEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (isNew) return;
    getPostById(id).then((post) => {
      if (post) {
        setForm(post);
        setSlugTouched(true);
      }
      setLoading(false);
    });
  }, [id, isNew]);

  function set(field, value) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "title" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleSave(publish) {
    setError("");
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Add a title and a slug first.");
      return;
    }
    setSaving(true);
    const data = { ...form, published: publish ?? form.published };
    try {
      if (isNew) {
        await createPost(data);
      } else {
        await updatePost(id, data);
      }
      navigate("/admin/posts");
    } catch (err) {
      setError(
        err?.code === "permission-denied"
          ? "Not saved: Firestore refused the write. Publish firestore.rules and check your admins/{uid} record."
          : `Not saved (${err?.code || err?.message || "unknown error"}). Check your connection and try again.`
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] mb-6">
        {isNew ? "New post" : "Edit post"}
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          />
        </Field>
        <Field label="Slug">
          <input
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value);
            }}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm font-mono"
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Field label="Date">
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          />
        </Field>
        <Field label="Tag">
          <input
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="e.g. Guide, Case Study"
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          />
        </Field>
        <Field label="Published">
          <label className="flex items-center gap-2 mt-2.5">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
            />
            <span className="text-sm text-muted">Live on the public blog</span>
          </label>
        </Field>
      </div>

      <Field label="Excerpt">
        <textarea
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
        />
      </Field>

      <div className="mt-4">
        <Field label="Cover image">
          <ImageUploader
            value={form.coverImage}
            onChange={(url) => set("coverImage", url)}
            folder="philliplabs/blog"
          />
        </Field>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium">Body (Markdown)</label>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="text-xs font-semibold text-accent"
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
        {preview ? (
          <div
            className="prose max-w-none border border-line-strong rounded-lg px-4 py-3 min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(form.body) }}
          />
        ) : (
          <textarea
            value={form.body}
            onChange={(e) => set("body", e.target.value)}
            rows={16}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm font-mono"
          />
        )}
      </div>

      {error && <div role="alert" className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="px-4 py-2.5 border border-line-strong rounded-lg text-sm font-semibold hover:bg-[#f7f7f7] disabled:opacity-60"
        >
          Save draft
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="px-4 py-2.5 bg-[#111111] text-white rounded-lg text-sm font-semibold disabled:opacity-60"
        >
          {saving ? "Saving…" : "Publish"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}
