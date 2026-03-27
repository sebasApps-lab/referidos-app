import { buildSidebarCategories } from "../helpCenterShared";
import { clientMobileHeaderActions } from "./helpCenterMobileConfig";
import { HelpCenterMobileLayout } from "./helpCenterMobileShared";

export default function MobileConsumerHelpCenterLayout({
  resourceItems = [],
  activeCategoryKey = null,
  content = null,
}) {
  const basePath = "/ayuda/es";

  return (
    <HelpCenterMobileLayout
      basePath={basePath}
      headerTitle="Centro de ayuda"
      theme="consumer"
      headerActions={clientMobileHeaderActions}
      ctaProps={{ emailLabel: "Email" }}
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={resourceItems}
      activeCategoryKey={activeCategoryKey}
      content={content}
    />
  );
}
