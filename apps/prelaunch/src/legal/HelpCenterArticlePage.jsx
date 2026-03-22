import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";
import HelpCenterDesktopArticlePage from "./desktop/HelpCenterDesktopArticlePage";
import HelpCenterMobileArticlePage from "./mobile/HelpCenterMobileArticlePage";

export default function HelpCenterArticlePage() {
  return (
    <HelpCenterTreeRoute
      DesktopComponent={HelpCenterDesktopArticlePage}
      MobileComponent={HelpCenterMobileArticlePage}
    />
  );
}
