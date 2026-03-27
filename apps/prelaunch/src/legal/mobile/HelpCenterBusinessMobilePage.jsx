import { buildDefaultResources } from "../helpCenterShared";
import MobileBusinessHelpCenterLayout from "./MobileBusinessHelpCenterLayout";

export default function HelpCenterBusinessMobilePage() {
  return (
    <MobileBusinessHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
