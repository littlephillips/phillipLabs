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
  stack: "",
  color: "#e07b1f",
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

  useEffect(() => {
    if (isNew) return;
    getProjectById(id).then((project) => {
      if (project) {
        setForm({ ...project, stack: (project.stack || []).join(", ") });
      }
      setLoading(false);
    });
  }, [id, isNew]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    const data = {
      ...form,
      order: Number(form.order) || 0,
      stack: form.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (isNew) {
        await createProject(data);
      } else {
        await updateProject(id, data);
      }
      navigate("/admin/projects");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] mb-6">
        {isNew ? "New project" : "Edit project"}
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          />
        </Field>
        <Field label="Category tag">
          <input
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="e.g. Logistics"
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
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
          className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
        />
      </Field>

      <div className="mt-4">
        <Field label="Tech stack (comma-separated)">
          <input
            value={form.stack}
            onChange={(e) => set("stack", e.target.value)}
            placeholder="React, Tailwind, Node.js, Firebase"
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Field label="Display order">
          <input
            type="number"
            value={form.order}
            onChange={(e) => set("order", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          />
        </Field>
        <Field label="Type">
          <select
            value={form.variant}
            onChange={(e) => set("variant", e.target.value)}
            className="w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm"
          >
            <option value="">Customer-facing site</option>
            <option value="admin">Admin dashboard</option>
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

      <div className="flex gap-3 mt-6">
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
