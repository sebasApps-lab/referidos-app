import { buildDefaultResources } from "../helpCenterShared";
import DesktopBusinessHelpCenterLayout from "./DesktopBusinessHelpCenterLayout";

export default function HelpCenterBusinessDesktopPage() {
  return (
    <DesktopBusinessHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
