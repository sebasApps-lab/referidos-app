import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";

export default function HelpCenterCategoryPage() {
  return (
    <HelpCenterTreeRoute
      desktopLoader={() => import("./desktop/HelpCenterDesktopCategoryPage")}
      mobileLoader={() => import("./mobile/HelpCenterMobileCategoryPage")}
    />
  );
}
