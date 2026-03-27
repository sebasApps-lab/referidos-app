import { buildSidebarCategories, HelpCenterLayout } from "../helpCenterShared";

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
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={resourceItems}
      activeCategoryKey={activeCategoryKey}
      content={content}
    />
  );
}
