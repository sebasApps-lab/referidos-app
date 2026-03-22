import {
  buildDefaultResources,
  buildSidebarCategories,
  HelpCenterLayout,
} from "../helpCenterShared";

export default function HelpCenterBusinessDesktopPage() {
  const basePath = "/ayuda-negocios/es";

  return (
    <HelpCenterLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda de Negocios o Empresas"
      theme="business"
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={buildDefaultResources()}
    />
  );
}
