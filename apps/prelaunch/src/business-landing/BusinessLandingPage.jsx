import AdaptiveRoute from "../UI-detect/AdaptiveRoute";
import "./businessLandingPage.css";

export default function BusinessLandingPage() {
  return (
    <AdaptiveRoute
      desktopLoader={() => import("./desktop/DesktopWaitlistLandingPage")}
      mobileLoader={() => import("./mobile/MobileBusinessLandingPage")}
    />
  );
}
