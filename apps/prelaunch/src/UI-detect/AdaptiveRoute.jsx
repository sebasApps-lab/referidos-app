import { useTree } from "./useTree";

export default function AdaptiveRoute({ DesktopComponent, MobileComponent }) {
  const tree = useTree();

  if (tree === "mobile") {
    return <MobileComponent />;
  }

  return <DesktopComponent />;
}
