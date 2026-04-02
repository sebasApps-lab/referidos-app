import { HelpCenterFooter } from "../../legal/helpCenterShared";
import DesktopSupportOpenTicketHeader from "./components/DesktopSupportOpenTicketHeader";
import DesktopFeedbackMessageBlock from "./components/DesktopFeedbackMessageBlock";
import { useFeedbackPageController } from "../useFeedbackPageController";

export default function FeedbackDesktopPage() {
  const controller = useFeedbackPageController();

  return (
    <div className="feedback-page support-open-ticket help-center help-center--business">
      <DesktopSupportOpenTicketHeader
        backTo={controller.backTo}
        headerActions={controller.desktopHeaderActions}
        brandVariant="feedback"
      />

      <main className="support-open-ticket__main feedback-page__main">
        <DesktopFeedbackMessageBlock controller={controller} />
      </main>

      <HelpCenterFooter basePath={controller.backTo} brandVariant="feedback" />
    </div>
  );
}
