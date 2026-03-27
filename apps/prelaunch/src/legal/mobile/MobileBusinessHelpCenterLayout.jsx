import { buildSidebarCategories } from "../helpCenterShared";
import { businessMobileHeaderActions } from "./helpCenterMobileConfig";
import { HelpCenterMobileLayout } from "./helpCenterMobileShared";

export default function MobileBusinessHelpCenterLayout({
  resourceItems = [],
  activeCategoryKey = null,
  content = null,
}) {
  const basePath = "/ayuda-negocios/es";

  return (
    <HelpCenterMobileLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda para Negocios"
      theme="business"
      headerActions={businessMobileHeaderActions}
      ctaProps={{ emailLabel: "Email" }}
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={resourceItems}
      activeCategoryKey={activeCategoryKey}
      content={content}
    />
  );
}
