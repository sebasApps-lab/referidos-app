import { Navigate, useParams } from "react-router-dom";
import {
  buildCategoryResources,
  buildSidebarCategories,
} from "../helpCenterShared";
import { businessMobileHeaderActions } from "./helpCenterMobileConfig";
import { HelpCenterMobileLayout } from "./helpCenterMobileShared";

export default function HelpCenterBusinessMobileCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda-negocios/es";
  const sidebarItems = buildSidebarCategories(basePath);
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <HelpCenterMobileLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda para Negocios"
      theme="business"
      headerActions={businessMobileHeaderActions}
      ctaProps={{ emailLabel: "Email" }}
      sidebarItems={sidebarItems}
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
