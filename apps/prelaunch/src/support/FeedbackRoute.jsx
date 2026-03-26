import AdaptiveRoute from "../UI-detect/AdaptiveRoute";
import FeedbackDesktopPage from "./desktop/FeedbackDesktopPage";
import FeedbackMobilePage from "./mobile/FeedbackMobilePage";

export default function FeedbackRoute() {
  return (
    <AdaptiveRoute
      DesktopComponent={FeedbackDesktopPage}
      MobileComponent={FeedbackMobilePage}
    />
  );
}
