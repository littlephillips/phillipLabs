import Seo from "../components/Seo";
import Work from "../components/Work";

export default function WorkPage() {
  return (
    <>
      <Seo title="Our Work: Live Websites & Dashboards | phillipLabs" description="Live websites, dashboards and systems built for Kenyan businesses: Qwetu Movers, Estaka Parts, AllinEvents, Cash Advance and more." path="/work" />
      <Work standalone />
    </>
  );
}
