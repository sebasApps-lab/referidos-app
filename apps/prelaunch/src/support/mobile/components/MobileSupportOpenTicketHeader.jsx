import { HelpCenterMobileHeader } from "../../../legal/mobile/helpCenterMobileShared";

export default function MobileSupportOpenTicketHeader({
  backTo,
  headerActions,
  drawerId,
  drawerItems,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}) {
  return (
    <HelpCenterMobileHeader
      basePath={backTo}
      headerTitle="Recibir ayuda o soporte"
      titleTo={null}
      headerActions={headerActions}
      drawerActions={[]}
      drawerId={drawerId}
      drawerTitle="Men\u00fa"
      drawerItems={drawerItems}
      activeItemKey={null}
      isMenuOpen={isMenuOpen}
      onToggleMenu={onToggleMenu}
      onCloseMenu={onCloseMenu}
    />
  );
}
