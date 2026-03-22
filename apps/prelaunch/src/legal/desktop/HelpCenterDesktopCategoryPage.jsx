import { Navigate, useParams } from "react-router-dom";
import {
  buildCategoryResources,
  buildSidebarCategories,
  HelpCenterLayout,
} from "../helpCenterShared";
import { clientDesktopHeaderActions } from "./helpCenterDesktopConfig";

export default function HelpCenterDesktopCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda/es";
  const sidebarItems = buildSidebarCategories(basePath);
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <HelpCenterLayout
      basePath={basePath}
      theme="consumer"
      headerActions={clientDesktopHeaderActions}
      sidebarItems={sidebarItems}
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
