import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function NotConfigured() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-xl border border-line p-6 text-sm">
        <p className="font-semibold text-base mb-1">Firebase is not configured for this build.</p>
        <p className="text-muted mb-3">The admin needs the <code className="text-ink">VITE_FIREBASE_*</code> variables. On Vercel: Project, Settings, Environment Variables. Add them for Production, then redeploy (they are baked in at build time).</p>
        <p className="text-muted">Locally: copy <code className="text-ink">.env.example</code> to <code className="text-ink">.env</code>, fill it in and restart <code className="text-ink">npm run dev</code>.</p>
      </div>
    </div>
  );
}

export default function AdminGuard({ children }) {
  const { user, isAdmin, loading, denied, configured, logout } = useAuth();
  const location = useLocation();

  if (!configured) return <NotConfigured />;
  if (loading) {
    return <div className="flex h-screen items-center justify-center text-sm text-muted">Loading…</div>;
  }
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  if (!isAdmin) {
    const copy = () => navigator.clipboard?.writeText(user.uid).catch(() => {});
    const reason =
      denied === "no-admin-doc"
        ? "You are signed in, but there is no admin record for this account yet."
        : denied === "permission-denied"
          ? "Firestore refused the check. The security rules from firestore.rules are probably not published in Firebase yet."
          : `The admin check failed (${denied || "unknown"}). Check your connection and Firebase config.`;
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-xl border border-line p-6 text-sm">
          <p className="font-semibold text-base mb-1">This account is not authorised for the admin area.</p>
          <p className="text-muted mb-4">{reason}</p>
          {denied === "no-admin-doc" && (
            <ol className="list-decimal pl-5 text-muted mb-4 space-y-1">
              <li>Open Firebase console, then Firestore Database.</li>
              <li>Start a collection named <code className="text-ink">admins</code>.</li>
              <li>Set the Document ID to the user ID below (exactly, no spaces).</li>
              <li>Add any field, for example <code className="text-ink">role</code> = <code className="text-ink">owner</code>, then save and sign in again.</li>
            </ol>
          )}
          <div className="mb-4">
            <div className="text-xs text-muted mb-1">Signed in as {user.email}</div>
            <button onClick={copy} title="Copy" className="w-full text-left font-mono text-xs bg-surface-low rounded-lg px-3 py-2 border-none cursor-pointer break-all">{user.uid}</button>
          </div>
          <button onClick={logout} className="px-4 py-2 rounded-lg bg-[#111111] text-white font-semibold cursor-pointer border-none">Sign out</button>
        </div>
      </div>
    );
  }
  return children;
}
