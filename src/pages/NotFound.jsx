import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Wrap from "../components/Wrap";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | phillipLabs" description="This page does not exist." path="/404" noindex />
      <Wrap className="py-24 text-center max-w-[560px]!">
        <p className="text-sm font-bold text-accent-strong tracking-[0.06em] mb-2">404</p>
        <h1 className="text-4xl font-semibold tracking-[-0.02em] mb-3">We couldn't find that page</h1>
        <p className="text-muted mb-8">It may have moved. Try one of these instead.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="bg-ink text-white px-5 py-3 rounded-lg font-semibold text-sm no-underline">Home</Link>
          <Link to="/work" className="bg-surface-low px-5 py-3 rounded-lg font-semibold text-sm no-underline text-ink">See our work</Link>
          <Link to="/contact" className="bg-surface-low px-5 py-3 rounded-lg font-semibold text-sm no-underline text-ink">Contact</Link>
        </div>
      </Wrap>
    </>
  );
}
