import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminGuard({ children }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-sm text-muted">Loading…</div>;
  }
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  if (!isAdmin) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 text-sm text-muted">
        <p>This account is not authorised for the admin area.</p>
        <button onClick={logout} className="px-4 py-2 rounded-lg bg-[#111111] text-white font-semibold cursor-pointer border-none">Sign out</button>
      </div>
    );
  }
  return children;
}
