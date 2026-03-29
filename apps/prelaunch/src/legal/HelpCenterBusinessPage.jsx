import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";
import HelpCenterBusinessDesktopPage from "./desktop/HelpCenterBusinessDesktopPage";
import HelpCenterBusinessMobilePage from "./mobile/HelpCenterBusinessMobilePage";

export default function HelpCenterBusinessPage() {
  return (
    <HelpCenterTreeRoute
      DesktopComponent={HelpCenterBusinessDesktopPage}
      MobileComponent={HelpCenterBusinessMobilePage}
    />
  );
}
