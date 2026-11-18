import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjectById,
  createProject,
  updateProject,
} from "../../lib/projects";
import ImageUploader from "../components/ImageUploader";

const EMPTY = {
  tag: "",
  title: "",
  img: "",
  url: "",
  desc: "",
  color: "#e07b1f",
  kind: "website",
  variant: "",
  order: 0,
  published: true,
};

export default function ProjectEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    getProjectById(id).then((project) => {
      if (project) {
        const { stack: _omit, ...rest } = project; // stack is no longer used
        setForm(rest);
      }
      setLoading(false);
    });
  }, [id, isNew]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setError("");
    if (!form.title.trim()) {
      setError("Add a title first.");
      return;
    }
    setSaving(true);
    const data = {
      ...form,
      order: Number(form.order) || 0,
    };
    try {
      if (isNew) {
        await createProject(data);
      } else {
        await updateProject(id, data);
      }
      navigate("/admin/projects");
    } catch (err) {
      // Without this a refused write (rules, expired login) failed silently and nothing was saved.
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
      <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] mb-5 sm:mb-6">
        {isNew ? "New project" : "Edit project"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-base sm:text-sm bg-white"
          />
        </Field>
        <Field label="Category tag">
          <input
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="e.g. Logistics"
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-base sm:text-sm bg-white"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Live URL">
          <input
            value={form.url}
            onChange={(e) => set("url", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm font-mono"
          />
        </Field>
        <Field label="Accent color">
          <input
            type="color"
            value={form.color}
            onChange={(e) => set("color", e.target.value)}
            className="w-16 h-10 border border-line-strong rounded-lg"
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={form.desc}
          onChange={(e) => set("desc", e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-base sm:text-sm bg-white"
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Field label="Display order">
          <input
            type="number"
            value={form.order}
            onChange={(e) => set("order", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-base sm:text-sm bg-white"
          />
        </Field>
        <Field label="Type (drives the Work filter)">
          <select
            value={form.kind || (form.variant === "admin" ? "system" : "website")}
            onChange={(e) => {
              set("kind", e.target.value);
              set("variant", e.target.value === "system" ? "admin" : "");
            }}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-base sm:text-sm bg-white"
          >
            <option value="website">Website (customer-facing)</option>
            <option value="system">System / dashboard</option>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Published">
          <label className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
            />
            <span className="text-sm text-muted">Visible in the Work section</span>
          </label>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Screenshot">
          <ImageUploader
            value={form.img}
            onChange={(url) => set("img", url)}
            folder="philliplabs/work"
          />
        </Field>
      </div>


      {error && <div role="alert" className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 [&>button]:w-full sm:[&>button]:w-auto">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2.5 bg-[#111111] text-white rounded-lg text-sm font-semibold disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save project"}
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
