import { Component } from "react";

export default class AdminErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Admin crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6">
          <div className="w-full max-w-md bg-white border border-line rounded-xl p-8">
            <div className="text-sm font-semibold text-red-600 mb-2">
              Admin failed to load
            </div>
            <p className="text-sm text-muted mb-4">
              This is almost always a missing or invalid Firebase config in{" "}
              <code className="text-xs bg-[#f1f1f1] px-1 py-0.5 rounded">.env</code>.
              Check that all <code className="text-xs bg-[#f1f1f1] px-1 py-0.5 rounded">VITE_FIREBASE_*</code>{" "}
              values are set and match your Firebase project's web app config.
            </p>
            <pre className="text-xs bg-[#f7f7f7] border border-line rounded-lg p-3 overflow-auto max-h-40 text-red-700">
              {String(this.state.error?.message || this.state.error)}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
