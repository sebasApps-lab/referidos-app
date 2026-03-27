import { buildSidebarCategories, HelpCenterLayout } from "../helpCenterShared";
import { clientDesktopHeaderActions } from "./helpCenterDesktopConfig";

export default function DesktopConsumerHelpCenterLayout({
  resourceItems = [],
  activeCategoryKey = null,
  content = null,
}) {
  const basePath = "/ayuda/es";

  return (
    <HelpCenterLayout
      basePath={basePath}
      theme="consumer"
      headerActions={clientDesktopHeaderActions}
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={resourceItems}
      activeCategoryKey={activeCategoryKey}
      content={content}
    />
  );
}
