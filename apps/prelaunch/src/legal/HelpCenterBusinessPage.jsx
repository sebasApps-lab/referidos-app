import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";

export default function HelpCenterBusinessPage() {
  return (
    <HelpCenterTreeRoute
      desktopLoader={() => import("./desktop/HelpCenterBusinessDesktopPage")}
      mobileLoader={() => import("./mobile/HelpCenterBusinessMobilePage")}
    />
  );
}
