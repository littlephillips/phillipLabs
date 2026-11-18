import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import CookieConsent from "./components/CookieConsent";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import ProcessPage from "./pages/ProcessPage";
import PricingPage from "./pages/PricingPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import Privacy from "./pages/Privacy";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

import { initAnalyticsIfConsented } from "./utils/consent";

// Code-split: firebase/auth, the markdown editor and every admin page only
// load when someone visits /admin. Public visitors never download them.
const AdminApp = lazy(() => import("./admin/AdminApp"));

// Links written when the site was one long page (e.g. in blog posts) point at "/#contact".
const LEGACY_HASH = { "#contact": "/contact", "#order": "/contact", "#brief": "/contact" };

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/" && LEGACY_HASH[hash]) {
      navigate(LEGACY_HASH[hash], { replace: true });
      return undefined;
    }
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
      return () => clearTimeout(t);
    }
    // Query-only changes (service modal) must not jump to the top.
    window.scrollTo(0, 0);
  }, [pathname, hash, navigate]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin) initAnalyticsIfConsented();
  }, [isAdmin]);

  return (
    <div className="min-h-svh flex flex-col">
      <ScrollManager />
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-muted">Loading…</div>}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWhatsApp />}
      {!isAdmin && <CookieConsent />}
    </div>
  );
}
