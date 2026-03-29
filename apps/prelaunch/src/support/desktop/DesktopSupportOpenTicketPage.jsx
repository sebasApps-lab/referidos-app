import { useSupportOpenTicketController } from "../useSupportOpenTicketController";
import DesktopSupportOpenTicketForm from "./components/DesktopSupportOpenTicketForm";
import DesktopSupportOpenTicketHeader from "./components/DesktopSupportOpenTicketHeader";
import DesktopSupportOpenTicketHero from "./components/DesktopSupportOpenTicketHero";

export default function DesktopSupportOpenTicketPage() {
  const controller = useSupportOpenTicketController();

  return (
    <div className="support-open-ticket help-center help-center--business">
      <DesktopSupportOpenTicketHeader
        backTo={controller.backTo}
        headerActions={controller.desktopHeaderActions}
      />

      <main className="support-open-ticket__main">
        <DesktopSupportOpenTicketHero />
        <DesktopSupportOpenTicketForm controller={controller} />
      </main>
    </div>
  );
}
