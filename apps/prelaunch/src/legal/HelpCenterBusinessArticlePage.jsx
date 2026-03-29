import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";
import HelpCenterBusinessDesktopArticlePage from "./desktop/HelpCenterBusinessDesktopArticlePage";
import HelpCenterBusinessMobileArticlePage from "./mobile/HelpCenterBusinessMobileArticlePage";

export default function HelpCenterBusinessArticlePage() {
  return (
    <HelpCenterTreeRoute
      DesktopComponent={HelpCenterBusinessDesktopArticlePage}
      MobileComponent={HelpCenterBusinessMobileArticlePage}
    />
  );
}
