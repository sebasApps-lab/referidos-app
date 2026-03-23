import { useEffect } from "react";
import DesktopWaitlistLandingPage from "./desktop/DesktopWaitlistLandingPage";
import "./businessLandingPage.css";

const ROOT_ATTR = "data-prelaunch-root-entry";

export default function BusinessLandingPage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.setAttribute(ROOT_ATTR, "desktop");
    body.setAttribute(ROOT_ATTR, "desktop");

    return () => {
      html.removeAttribute(ROOT_ATTR);
      body.removeAttribute(ROOT_ATTR);
    };
  }, []);

  return <DesktopWaitlistLandingPage />;
}
