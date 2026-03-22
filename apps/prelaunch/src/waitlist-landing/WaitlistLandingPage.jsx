import { useEffect, useState } from "react";
import DesktopWaitlistLandingPage from "./desktop/DesktopWaitlistLandingPage";
import MobileWaitlistLandingPage from "./mobile/MobileWaitlistLandingPage";
import "./waitlistLandingPage.css";

const ROOT_ATTR = "data-prelaunch-root-entry";

function detectDeviceTree() {
  if (typeof window === "undefined") return "desktop";

  const userAgent = navigator.userAgent || "";
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    userAgent,
  );

  const uaDataMobile = navigator.userAgentData?.mobile;
  if (uaDataMobile === true) {
    return "mobile";
  }

  if (typeof uaDataMobile === "boolean" && !isMobileUserAgent) {
    return uaDataMobile ? "mobile" : "desktop";
  }

  return isMobileUserAgent ? "mobile" : "desktop";
}

export default function WaitlistLandingPage() {
  const [tree] = useState(() => detectDeviceTree());

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.setAttribute(ROOT_ATTR, tree);
    body.setAttribute(ROOT_ATTR, tree);

    return () => {
      html.removeAttribute(ROOT_ATTR);
      body.removeAttribute(ROOT_ATTR);
    };
  }, [tree]);

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
  }, [tree]);

  if (tree === "desktop") {
    return <DesktopWaitlistLandingPage />;
  }

  return <MobileWaitlistLandingPage />;
}
