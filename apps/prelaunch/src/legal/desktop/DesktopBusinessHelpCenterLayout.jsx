import { buildSidebarCategories, HelpCenterLayout } from "../helpCenterShared";
import { businessDesktopHeaderActions } from "./helpCenterDesktopConfig";

export default function DesktopBusinessHelpCenterLayout({
  resourceItems = [],
  activeCategoryKey = null,
  content = null,
}) {
  const basePath = "/ayuda-negocios/es";

  return (
    <HelpCenterLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda de Negocios o Empresas"
      theme="business"
      headerActions={businessDesktopHeaderActions}
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={resourceItems}
      activeCategoryKey={activeCategoryKey}
      content={content}
    />
  );
}
