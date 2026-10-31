import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-line rounded-xl p-8"
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
          className="w-full mb-4 px-3 py-2.5 border border-line-strong rounded-lg text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
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
