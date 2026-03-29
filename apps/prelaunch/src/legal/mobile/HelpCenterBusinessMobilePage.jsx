import { buildDefaultResources } from "../helpCenterData";
import MobileBusinessHelpCenterLayout from "./MobileBusinessHelpCenterLayout";

export default function HelpCenterBusinessMobilePage() {
  return (
    <MobileBusinessHelpCenterLayout resourceItems={buildDefaultResources()} />
  );
}
