import { buildDefaultResources } from "../helpCenterData";
import MobileConsumerHelpCenterLayout from "./MobileConsumerHelpCenterLayout";

export default function HelpCenterMobilePage() {
  return (
    <MobileConsumerHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
