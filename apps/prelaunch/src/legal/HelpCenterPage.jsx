import {
  defaultResources,
  HelpCenterLayout,
  sidebarCategories,
} from "./helpCenterShared";

export default function HelpCenterPage() {
  return (
    <HelpCenterLayout
      sidebarItems={sidebarCategories}
      resourceItems={defaultResources}
    />
  );
}
