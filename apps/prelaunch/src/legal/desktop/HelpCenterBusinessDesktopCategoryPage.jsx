import { Navigate, useParams } from "react-router-dom";
import { buildCategoryResources } from "../helpCenterShared";
import DesktopBusinessHelpCenterLayout from "./DesktopBusinessHelpCenterLayout";

export default function HelpCenterBusinessDesktopCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda-negocios/es";
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <DesktopBusinessHelpCenterLayout
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
