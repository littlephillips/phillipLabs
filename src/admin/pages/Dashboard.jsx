import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Briefcase, Plus } from "lucide-react";
import { listAllPosts } from "../../lib/posts";
import { listAllProjects } from "../../lib/projects";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([listAllPosts(), listAllProjects()]).then(([posts, projects]) => {
      setStats({
        posts: posts.length,
        published: posts.filter((p) => p.published).length,
        projects: projects.length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Blog posts" value={stats?.posts} />
        <StatCard label="Published" value={stats?.published} />
        <StatCard label="Projects" value={stats?.projects} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-3 border border-line rounded-xl p-5 hover:border-accent transition-colors"
        >
          <FileText size={20} className="text-accent" />
          <div>
            <div className="font-semibold text-sm">New blog post</div>
            <div className="text-xs text-muted">Write and publish a post</div>
          </div>
          <Plus size={16} className="ml-auto text-muted" />
        </Link>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-3 border border-line rounded-xl p-5 hover:border-accent transition-colors"
        >
          <Briefcase size={20} className="text-accent" />
          <div>
            <div className="font-semibold text-sm">New project</div>
            <div className="text-xs text-muted">Add to the Work section</div>
          </div>
          <Plus size={16} className="ml-auto text-muted" />
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border border-line rounded-xl p-5 bg-white">
      <div className="text-2xl font-semibold tracking-[-0.02em]">
        {value ?? "–"}
      </div>
      <div className="text-xs text-muted mt-1">{label}</div>
    </div>
  );
}
