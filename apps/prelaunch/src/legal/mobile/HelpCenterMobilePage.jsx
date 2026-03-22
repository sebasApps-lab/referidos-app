import {
  buildDefaultResources,
  buildSidebarCategories,
} from "../helpCenterShared";
import { clientMobileHeaderActions } from "./helpCenterMobileConfig";
import { HelpCenterMobileLayout } from "./helpCenterMobileShared";

export default function HelpCenterMobilePage() {
  const basePath = "/ayuda/es";

  return (
    <HelpCenterMobileLayout
      basePath={basePath}
      headerTitle="Centro de ayuda"
      theme="consumer"
      headerActions={clientMobileHeaderActions}
      ctaProps={{ emailLabel: "Email" }}
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={buildDefaultResources()}
    />
  );
}
