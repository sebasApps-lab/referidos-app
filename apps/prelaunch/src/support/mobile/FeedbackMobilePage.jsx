import { useId, useState } from "react";
import MobileSupportOpenTicketHeader from "./components/MobileSupportOpenTicketHeader";
import MobileFeedbackMessageBlock from "./components/MobileFeedbackMessageBlock";
import { useFeedbackPageController } from "../useFeedbackPageController";

export default function FeedbackMobilePage() {
  const controller = useFeedbackPageController();
  const drawerId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="feedback-page support-open-ticket help-center help-center--business help-center-mobile help-center-mobile--business feedback-page--mobile-tree">
      <MobileSupportOpenTicketHeader
        backTo={controller.backTo}
        headerActions={controller.mobileHeaderActions}
        drawerId={drawerId}
        drawerItems={controller.mobileDrawerItems}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      <main className="support-open-ticket__main feedback-page__main">
        <MobileFeedbackMessageBlock controller={controller} />
      </main>
    </div>
  );
}
