import AdaptiveRoute from "../UI-detect/AdaptiveRoute";
import DesktopWaitlistLandingPage from "./desktop/DesktopWaitlistLandingPage";
import MobileBusinessLandingPage from "./mobile/MobileBusinessLandingPage";
import "./businessLandingPage.css";

export default function BusinessLandingPage() {
  return (
    <AdaptiveRoute
      DesktopComponent={DesktopWaitlistLandingPage}
      MobileComponent={MobileBusinessLandingPage}
    />
  );
}
