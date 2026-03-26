import AdaptiveRoute from "../../UI-detect/AdaptiveRoute";

export default function HelpCenterTreeRoute({
  DesktopComponent,
  MobileComponent,
}) {
  return (
    <AdaptiveRoute
      DesktopComponent={DesktopComponent}
      MobileComponent={MobileComponent}
    />
  );
}
