import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
