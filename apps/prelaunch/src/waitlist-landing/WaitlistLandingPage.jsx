import { useEffect } from "react";
import AdaptiveRoute from "../UI-detect/AdaptiveRoute";
import DesktopWaitlistLandingPage from "./desktop/DesktopWaitlistLandingPage";
import MobileWaitlistLandingPage from "./mobile/MobileWaitlistLandingPage";
import "./waitlistLandingPage.css";

export default function WaitlistLandingPage() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const scrollToHashTarget = () => {
      const hash = window.location.hash;
      if (!hash) {
        return;
      }

      const targetId = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const section = document.getElementById(targetId);
        if (!section) {
          return;
        }

        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  return (
    <AdaptiveRoute
      DesktopComponent={DesktopWaitlistLandingPage}
      MobileComponent={MobileWaitlistLandingPage}
    />
  );
}
