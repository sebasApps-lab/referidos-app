import { Navigate, useParams } from "react-router-dom";
import { buildCategoryResources } from "../helpCenterData";
import MobileConsumerHelpCenterLayout from "./MobileConsumerHelpCenterLayout";

export default function HelpCenterMobileCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda/es";
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <MobileConsumerHelpCenterLayout
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
