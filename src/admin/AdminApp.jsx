import { Routes, Route } from "react-router-dom";
import AdminErrorBoundary from "./AdminErrorBoundary";
import { AuthProvider } from "./AuthContext";
import AdminGuard from "./AdminGuard";
import AdminLayout from "./AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostsList from "./pages/PostsList";
import PostEditor from "./pages/PostEditor";
import ProjectsList from "./pages/ProjectsList";
import ProjectEditor from "./pages/ProjectEditor";

// Everything under /admin lives inside this boundary + provider. A bad
// Firebase config, an auth error, or a crash in any admin page is contained
// here, it can never take down the public marketing site, which mounts
// entirely separately in App.jsx.
export default function AdminApp() {
  return (
    <AdminErrorBoundary>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="posts/:id" element={<PostEditor />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/:id" element={<ProjectEditor />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AdminErrorBoundary>
  );
}
