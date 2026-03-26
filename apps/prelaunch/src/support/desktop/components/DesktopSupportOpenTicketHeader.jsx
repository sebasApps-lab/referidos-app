import { HelpCenterHeader } from "../../../legal/helpCenterShared";

export default function DesktopSupportOpenTicketHeader({ backTo, headerActions }) {
  return (
    <HelpCenterHeader
      basePath={backTo}
      headerTitle="Recibir ayuda o soporte"
      titleTo={null}
      headerActions={headerActions}
    />
  );
}
