import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { NotConfigured } from "../AdminGuard";

const MESSAGES = {
  "auth/invalid-credential": "Wrong email or password.",
  "auth/wrong-password": "Wrong email or password.",
  "auth/user-not-found": "No account with that email. Create the user in Firebase, Authentication.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
  "auth/unauthorized-domain": "This domain is not allowed. Add it in Firebase, Authentication, Settings, Authorized domains.",
  "auth/invalid-api-key": "The Firebase API key is wrong or missing in this build.",
  "auth/operation-not-allowed": "Email/Password sign-in is off. Enable it in Firebase, Authentication, Sign-in method.",
  "auth/network-request-failed": "Network problem. Check your connection and try again.",
};

export default function Login() {
  const { user, login, configured } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!configured) return <NotConfigured />;
  if (user) {
    const dest = location.state?.from?.pathname || "/admin";
    return <Navigate to={dest} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(MESSAGES[err?.code] || `Sign-in failed (${err?.code || "unknown error"}).`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-svh flex items-center justify-center bg-[#fafafa] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-line rounded-xl p-5 sm:p-8"
      >
        <div className="mb-6">
          <span className="font-semibold text-lg tracking-[-0.01em]">
            phillip<span className="text-accent">Labs</span>
          </span>
          <div className="text-xs text-muted mt-0.5">Admin sign in</div>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2.5 border border-line-strong rounded-lg text-base sm:text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
        />

        <label className="block text-sm font-medium mb-1.5" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2.5 border border-line-strong rounded-lg text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#111111] text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
