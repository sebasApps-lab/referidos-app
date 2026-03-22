import {
  buildDefaultResources,
  buildSidebarCategories,
} from "../helpCenterShared";
import { businessMobileHeaderActions } from "./helpCenterMobileConfig";
import { HelpCenterMobileLayout } from "./helpCenterMobileShared";

export default function HelpCenterBusinessMobilePage() {
  const basePath = "/ayuda-negocios/es";

  return (
    <HelpCenterMobileLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda para Negocios"
      theme="business"
      headerActions={businessMobileHeaderActions}
      ctaProps={{ emailLabel: "Email" }}
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={buildDefaultResources()}
    />
  );
}
