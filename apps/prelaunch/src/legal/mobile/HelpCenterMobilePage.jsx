import { buildDefaultResources } from "../helpCenterShared";
import MobileConsumerHelpCenterLayout from "./MobileConsumerHelpCenterLayout";

export default function HelpCenterMobilePage() {
  return (
    <MobileConsumerHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
