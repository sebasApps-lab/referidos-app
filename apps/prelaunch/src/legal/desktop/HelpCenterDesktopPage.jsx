import { buildDefaultResources } from "../helpCenterShared";
import DesktopConsumerHelpCenterLayout from "./DesktopConsumerHelpCenterLayout";

export default function HelpCenterDesktopPage() {
  return (
    <DesktopConsumerHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
