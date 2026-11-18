import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, LogOut, ExternalLink, Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "./AuthContext";

const NAV = [
  { to: "/admin", label: "Dashboard", short: "Home", icon: LayoutDashboard, end: true },
  { to: "/admin/posts", label: "Blog Posts", short: "Blog", icon: FileText },
  { to: "/admin/projects", label: "Projects", short: "Projects", icon: Briefcase },
  { to: "/admin/settings", label: "Settings", short: "Settings", icon: SettingsIcon },
];

const ghost = "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:bg-[#f1f1f1] hover:text-ink transition-colors";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-svh md:flex bg-[#fafafa] text-ink">
      {/* Desktop / tablet sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 sticky top-0 h-svh border-r border-line bg-white flex-col">
        <div className="px-5 py-5 border-b border-line">
          <span className="font-semibold text-lg tracking-[-0.01em]">
            phillip<span className="text-accent">Labs</span>
          </span>
          <div className="text-xs text-muted mt-0.5">Admin</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-[#111111] text-white" : "text-muted hover:bg-[#f1f1f1] hover:text-ink"
                }`
              }
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-line space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className={ghost}>
            <ExternalLink size={16} strokeWidth={2} /> View site
          </a>
          <button onClick={logout} className={`w-full ${ghost}`}>
            <LogOut size={16} strokeWidth={2} /> Sign out
          </button>
          {user?.email && <div className="px-3 pt-2 text-xs text-muted truncate">{user.email}</div>}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-20 flex items-center justify-between gap-2 h-14 px-4 bg-white border-b border-line">
        <span className="font-semibold text-base tracking-[-0.01em] whitespace-nowrap">
          phillip<span className="text-accent">Labs</span>
          <span className="ml-2 text-xs font-medium text-muted">Admin</span>
        </span>
        <div className="flex items-center gap-1">
          <a href="/" target="_blank" rel="noreferrer" aria-label="View site" className="w-10 h-10 grid place-items-center rounded-lg text-muted hover:bg-[#f1f1f1]">
            <ExternalLink size={18} />
          </a>
          <button onClick={logout} aria-label="Sign out" className="w-10 h-10 grid place-items-center rounded-lg text-muted hover:bg-[#f1f1f1] border-none bg-transparent cursor-pointer">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 md:py-8 pb-28 md:pb-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      <nav aria-label="Admin" className="md:hidden fixed bottom-0 inset-x-0 z-30 grid grid-cols-4 bg-white border-t border-line pb-[env(safe-area-inset-bottom)]">
        {NAV.map(({ to, short, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 h-14 text-[11px] font-semibold no-underline ${isActive ? "text-accent-strong" : "text-muted"}`
            }
          >
            <Icon size={20} strokeWidth={2} />
            {short}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
