import AdaptiveRoute from "../UI-detect/AdaptiveRoute";
import "./supportOpenTicket.css";

export default function SupportOpenTicketPage() {
  return (
    <AdaptiveRoute
      desktopLoader={() => import("./desktop/DesktopSupportOpenTicketPage")}
      mobileLoader={() => import("./mobile/MobileSupportOpenTicketPage")}
    />
  );
}
