import { Navigate, useParams } from "react-router-dom";
import { buildCategoryResources } from "../helpCenterData";
import DesktopConsumerHelpCenterLayout from "./DesktopConsumerHelpCenterLayout";

export default function HelpCenterDesktopCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda/es";
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <DesktopConsumerHelpCenterLayout
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
