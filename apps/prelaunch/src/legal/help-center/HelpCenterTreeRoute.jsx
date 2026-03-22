import { useEffect, useState } from "react";
import { detectHelpCenterTree } from "./detectHelpCenterTree";

export default function HelpCenterTreeRoute({
  DesktopComponent,
  MobileComponent,
}) {
  const [tree, setTree] = useState(() => detectHelpCenterTree());

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateTree = () => {
      setTree(detectHelpCenterTree());
    };

    window.addEventListener("resize", updateTree);
    return () => window.removeEventListener("resize", updateTree);
  }, []);

  if (tree === "mobile") {
    return <MobileComponent />;
  }

  return <DesktopComponent />;
}
