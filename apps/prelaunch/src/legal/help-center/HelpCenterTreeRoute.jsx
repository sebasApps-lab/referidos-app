import AdaptiveRoute from "../../UI-detect/AdaptiveRoute";

export default function HelpCenterTreeRoute({
  DesktopComponent,
  MobileComponent,
  desktopLoader,
  mobileLoader,
}) {
  return (
    <AdaptiveRoute
      DesktopComponent={DesktopComponent}
      MobileComponent={MobileComponent}
      desktopLoader={desktopLoader}
      mobileLoader={mobileLoader}
    />
  );
}
