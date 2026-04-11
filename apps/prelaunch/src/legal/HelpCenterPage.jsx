import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";

export default function HelpCenterPage() {
  return (
    <HelpCenterTreeRoute
      desktopLoader={() => import("./desktop/HelpCenterDesktopPage")}
      mobileLoader={() => import("./mobile/HelpCenterMobilePage")}
    />
  );
}
