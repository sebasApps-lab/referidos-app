import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";

export default function HelpCenterBusinessArticlePage() {
  return (
    <HelpCenterTreeRoute
      desktopLoader={() => import("./desktop/HelpCenterBusinessDesktopArticlePage")}
      mobileLoader={() => import("./mobile/HelpCenterBusinessMobileArticlePage")}
    />
  );
}
