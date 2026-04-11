import { buildLegalResources } from "../helpCenterData";
import DesktopConsumerHelpCenterLayout from "./DesktopConsumerHelpCenterLayout";

export default function HelpCenterDesktopPage() {
  return (
    <DesktopConsumerHelpCenterLayout
      resourceItems={buildLegalResources("/ayuda/es")}
      activeCategoryKey="legal"
    />
  );
}
