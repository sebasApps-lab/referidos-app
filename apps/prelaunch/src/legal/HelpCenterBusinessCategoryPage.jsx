import HelpCenterTreeRoute from "./help-center/HelpCenterTreeRoute";
import HelpCenterBusinessDesktopCategoryPage from "./desktop/HelpCenterBusinessDesktopCategoryPage";
import HelpCenterBusinessMobileCategoryPage from "./mobile/HelpCenterBusinessMobileCategoryPage";

export default function HelpCenterBusinessCategoryPage() {
  return (
    <HelpCenterTreeRoute
      DesktopComponent={HelpCenterBusinessDesktopCategoryPage}
      MobileComponent={HelpCenterBusinessMobileCategoryPage}
    />
  );
}
