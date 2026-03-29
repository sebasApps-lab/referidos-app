import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";
import HelpCenterDesktopCategoryPage from "./desktop/HelpCenterDesktopCategoryPage";
import HelpCenterMobileCategoryPage from "./mobile/HelpCenterMobileCategoryPage";

export default function HelpCenterCategoryPage() {
  return (
    <HelpCenterTreeRoute
      DesktopComponent={HelpCenterDesktopCategoryPage}
      MobileComponent={HelpCenterMobileCategoryPage}
    />
  );
}
