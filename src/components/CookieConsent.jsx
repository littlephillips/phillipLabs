import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent } from "../utils/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed left-4 right-4 bottom-4 z-[1000] max-w-[520px] mx-auto bg-ink text-white rounded-xl px-5 py-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
      <p className="text-sm mb-3.5 leading-[1.5]">
        This site uses cookies for basic analytics to understand how visitors use it. See the{" "}
        <Link to="/privacy" className="text-white underline">
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <div className="flex gap-2.5">
        <button
          onClick={() => choose("accepted")}
          className="bg-white text-ink border-none px-[18px] py-[13px] rounded-[7px] font-semibold text-sm cursor-pointer min-h-11"
        >
          Accept
        </button>
        <button
          onClick={() => choose("declined")}
          className="bg-transparent text-white border border-white/30 px-[18px] py-[13px] rounded-[7px] font-semibold text-sm cursor-pointer min-h-11"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
