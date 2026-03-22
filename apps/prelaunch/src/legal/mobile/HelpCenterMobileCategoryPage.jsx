import { Navigate, useParams } from "react-router-dom";
import {
  buildCategoryResources,
  buildSidebarCategories,
} from "../helpCenterShared";
import { clientMobileHeaderActions } from "./helpCenterMobileConfig";
import { HelpCenterMobileLayout } from "./helpCenterMobileShared";

export default function HelpCenterMobileCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda/es";
  const sidebarItems = buildSidebarCategories(basePath);
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <HelpCenterMobileLayout
      basePath={basePath}
      headerTitle="Centro de ayuda"
      theme="consumer"
      headerActions={clientMobileHeaderActions}
      ctaProps={{ emailLabel: "Email" }}
      sidebarItems={sidebarItems}
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
