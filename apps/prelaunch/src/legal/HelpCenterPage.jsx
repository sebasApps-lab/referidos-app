import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";
import HelpCenterDesktopPage from "./desktop/HelpCenterDesktopPage";
import HelpCenterMobilePage from "./mobile/HelpCenterMobilePage";

export default function HelpCenterPage() {
  return (
    <HelpCenterTreeRoute
      DesktopComponent={HelpCenterDesktopPage}
      MobileComponent={HelpCenterMobilePage}
    />
  );
}
