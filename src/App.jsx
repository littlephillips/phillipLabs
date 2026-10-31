import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import CookieConsent from "./components/CookieConsent";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

import { initAnalyticsIfConsented } from "./utils/consent";

// Code-split: firebase/auth, the markdown editor, image uploader, and every
// admin page (~all of src/admin) only load when someone actually visits
// /admin. Public visitors never download any of it.
const AdminApp = lazy(() => import("./admin/AdminApp"));

function AdminLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-muted">
      Loading…
    </div>
  );
}

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // wait a tick for the target route's content to mount
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin) initAnalyticsIfConsented();
  }, [isAdmin]);

  return (
    <>
      <ScrollToHash />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<AdminLoadingFallback />}>
                <AdminApp />
              </Suspense>
            }
          />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWhatsApp />}
      {!isAdmin && <CookieConsent />}
    </>
  );
}
