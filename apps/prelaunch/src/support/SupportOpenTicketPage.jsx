import AdaptiveRoute from "../UI-detect/AdaptiveRoute";
import DesktopSupportOpenTicketPage from "./desktop/DesktopSupportOpenTicketPage";
import MobileSupportOpenTicketPage from "./mobile/MobileSupportOpenTicketPage";
import "./supportOpenTicket.css";

export default function SupportOpenTicketPage() {
  return (
    <AdaptiveRoute
      DesktopComponent={DesktopSupportOpenTicketPage}
      MobileComponent={MobileSupportOpenTicketPage}
    />
  );
}
