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
      />

      <main className="support-open-ticket__main feedback-page__main">
        <DesktopFeedbackMessageBlock controller={controller} />
      </main>
    </div>
  );
}
