import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { listAllProjects, deleteProject } from "../../lib/projects";

export default function ProjectsList() {
  const [projects, setProjects] = useState(null);

  async function refresh() {
    setProjects(await listAllProjects());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    await deleteProject(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">Projects</h1>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-1.5 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:brightness-105"
        >
          <Plus size={16} /> New project
        </Link>
      </div>

      {projects === null && <p className="text-sm text-muted">Loading…</p>}
      {projects?.length === 0 && (
        <p className="text-sm text-muted">No projects yet — add your first one.</p>
      )}

      <div className="divide-y divide-line border border-line rounded-xl bg-white overflow-hidden">
        {projects?.map((project) => (
          <div key={project.id} className="flex items-center gap-4 px-5 py-4">
            <GripVertical size={16} className="text-line-strong shrink-0" />
            {project.img && (
              <img
                src={project.img}
                alt=""
                className="w-14 h-10 object-cover rounded-md border border-line shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate">{project.title}</span>
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                    project.published
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {project.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="text-xs text-muted mt-0.5">{project.tag}</div>
            </div>
            <Link
              to={`/admin/projects/${project.id}`}
              className="p-2 rounded-lg text-muted hover:bg-[#f1f1f1] hover:text-ink"
            >
              <Pencil size={16} />
            </Link>
            <button
              onClick={() => handleDelete(project.id, project.title)}
              className="p-2 rounded-lg text-muted hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted mt-3">
        Drag-to-reorder isn't wired up yet — set the "Order" field on each project to control display order for now.
      </p>
    </div>
  );
}
