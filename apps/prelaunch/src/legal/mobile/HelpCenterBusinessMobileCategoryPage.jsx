import { Navigate, useParams } from "react-router-dom";
import { buildCategoryResources } from "../helpCenterData";
import MobileBusinessHelpCenterLayout from "./MobileBusinessHelpCenterLayout";

export default function HelpCenterBusinessMobileCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda-negocios/es";
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <MobileBusinessHelpCenterLayout
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
