import AdaptiveRoute from "../UI-detect/AdaptiveRoute";
import "./supportOpenTicket.css";
import "./feedback.css";

export default function FeedbackRoute() {
  return (
    <AdaptiveRoute
      desktopLoader={() => import("./desktop/FeedbackDesktopPage")}
      mobileLoader={() => import("./mobile/FeedbackMobilePage")}
    />
  );
}
