import { useId, useState } from "react";
import { HelpCenterMobileFooter } from "../../legal/mobile/helpCenterMobileShared";
import { useSupportOpenTicketController } from "../useSupportOpenTicketController";
import MobileSupportOpenTicketForm from "./components/MobileSupportOpenTicketForm";
import MobileSupportOpenTicketHeader from "./components/MobileSupportOpenTicketHeader";
import MobileSupportOpenTicketHero from "./components/MobileSupportOpenTicketHero";

export default function MobileSupportOpenTicketPage() {
  const controller = useSupportOpenTicketController();
  const drawerId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="support-open-ticket help-center help-center--business help-center-mobile help-center-mobile--business support-open-ticket--mobile-tree">
      <MobileSupportOpenTicketHeader
        backTo={controller.backTo}
        headerActions={controller.mobileHeaderActions}
        drawerId={drawerId}
        drawerItems={controller.mobileDrawerItems}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      <main className="support-open-ticket__main">
        <MobileSupportOpenTicketHero />
        <MobileSupportOpenTicketForm controller={controller} />
      </main>

      <HelpCenterMobileFooter basePath={controller.backTo} />
    </div>
  );
}
