import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";

export default function HelpCenterArticlePage() {
  return (
    <HelpCenterTreeRoute
      desktopLoader={() => import("./desktop/HelpCenterDesktopArticlePage")}
      mobileLoader={() => import("./mobile/HelpCenterMobileArticlePage")}
    />
  );
}
