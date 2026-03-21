import { Navigate, useParams } from "react-router-dom";
import {
  categoryResources,
  HelpCenterLayout,
  sidebarCategories,
} from "./helpCenterShared";

export default function HelpCenterCategoryPage() {
  const { category = "" } = useParams();
  const resourceItems = categoryResources[category];

  if (!resourceItems) {
    return <Navigate to="/ayuda/es" replace />;
  }

  return (
    <HelpCenterLayout
      sidebarItems={sidebarCategories}
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
