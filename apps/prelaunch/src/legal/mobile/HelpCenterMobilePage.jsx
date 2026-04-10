import { buildLegalResources } from "../helpCenterData";
import MobileConsumerHelpCenterLayout from "./MobileConsumerHelpCenterLayout";

export default function HelpCenterMobilePage() {
  return (
    <MobileConsumerHelpCenterLayout
      resourceItems={buildLegalResources("/ayuda/es")}
      activeCategoryKey="legal"
    />
  );
}
