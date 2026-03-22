import {
  buildDefaultResources,
  buildSidebarCategories,
  HelpCenterLayout,
} from "../helpCenterShared";
import { clientDesktopHeaderActions } from "./helpCenterDesktopConfig";

export default function HelpCenterDesktopPage() {
  const basePath = "/ayuda/es";

  return (
    <HelpCenterLayout
      basePath={basePath}
      theme="consumer"
      headerActions={clientDesktopHeaderActions}
      sidebarItems={buildSidebarCategories(basePath)}
      resourceItems={buildDefaultResources()}
    />
  );
}
