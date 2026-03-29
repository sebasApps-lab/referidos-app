import { useTree } from "./useTree";

export default function AdaptiveRoute({ DesktopComponent, MobileComponent }) {
  const tree = useTree();
  const DesktopView = DesktopComponent;
  const MobileView = MobileComponent;

  if (tree === "mobile") {
    return <MobileView />;
  }

  return <DesktopView />;
}
