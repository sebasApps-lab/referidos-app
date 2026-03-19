import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MobileWaitlistLandingPage from "./MobileWaitlistLandingPage";
import "./blankPrelaunchPage.css";

const ROOT_ATTR = "data-prelaunch-root-entry";

function detectDeviceTree() {
  if (typeof window === "undefined") return "desktop";

  const userAgent = navigator.userAgent || "";
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    userAgent
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

export default function BlankPrelaunchPage() {
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

  if (tree === "desktop") {
    return <DesktopWaitlistLandingTree />;
  }

  return <MobileWaitlistLandingTree />;
}

function DesktopWaitlistLandingTree() {
  return <Navigate to="/figma-prototype" replace />;
}

function MobileWaitlistLandingTree() {
  return <MobileWaitlistLandingPage />;
}
