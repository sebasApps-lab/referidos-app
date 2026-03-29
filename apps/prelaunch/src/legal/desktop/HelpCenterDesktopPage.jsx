import { buildDefaultResources } from "../helpCenterData";
import DesktopConsumerHelpCenterLayout from "./DesktopConsumerHelpCenterLayout";

export default function HelpCenterDesktopPage() {
  return (
    <DesktopConsumerHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
