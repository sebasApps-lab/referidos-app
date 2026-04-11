import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";

export default function HelpCenterBusinessCategoryPage() {
  return (
    <HelpCenterTreeRoute
      desktopLoader={() => import("./desktop/HelpCenterBusinessDesktopCategoryPage")}
      mobileLoader={() => import("./mobile/HelpCenterBusinessMobileCategoryPage")}
    />
  );
}
