import { Navigate, useParams } from "react-router-dom";
import {
  buildCategoryResources,
  buildSidebarCategories,
  HelpCenterLayout,
} from "../helpCenterShared";

export default function HelpCenterBusinessDesktopCategoryPage() {
  const { category = "" } = useParams();
  const basePath = "/ayuda-negocios/es";
  const sidebarItems = buildSidebarCategories(basePath);
  const resourceItems = buildCategoryResources(basePath)[category];

  if (!resourceItems) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <HelpCenterLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda de Negocios o Empresas"
      theme="business"
      sidebarItems={sidebarItems}
      resourceItems={resourceItems}
      activeCategoryKey={category}
    />
  );
}
