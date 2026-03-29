import { buildDefaultResources } from "../helpCenterData";
import DesktopBusinessHelpCenterLayout from "./DesktopBusinessHelpCenterLayout";

export default function HelpCenterBusinessDesktopPage() {
  return (
    <DesktopBusinessHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
