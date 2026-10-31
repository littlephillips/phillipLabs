import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "./AuthContext";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/posts", label: "Blog Posts", icon: FileText },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-[#fafafa] text-ink">
      <aside className="w-60 shrink-0 border-r border-line bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-line">
          <span className="font-semibold text-lg tracking-[-0.01em]">
            phillip<span className="text-accent">Labs</span>
          </span>
          <div className="text-xs text-muted mt-0.5">Admin</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#111111] text-white"
                    : "text-muted hover:bg-[#f1f1f1] hover:text-ink"
                }`
              }
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-line space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:bg-[#f1f1f1] hover:text-ink transition-colors"
          >
            <ExternalLink size={16} strokeWidth={2} />
            View site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:bg-[#f1f1f1] hover:text-ink transition-colors"
          >
            <LogOut size={16} strokeWidth={2} />
            Sign out
          </button>
          {user?.email && (
            <div className="px-3 pt-2 text-xs text-muted truncate">{user.email}</div>
          )}
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
