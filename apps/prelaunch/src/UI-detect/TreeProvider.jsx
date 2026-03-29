import { useEffect, useState } from "react";
import { detectTree } from "./detectTree";
import { TreeContext } from "./useTree";

const TREE_ATTR = "data-ui-tree";
const LEGACY_TREE_ATTR = "data-prelaunch-root-entry";

export default function TreeProvider({ children }) {
  const [tree] = useState(() => detectTree());

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");

    for (const node of [html, body, root]) {
      if (!node) continue;
      node.setAttribute(TREE_ATTR, tree);
      node.setAttribute(LEGACY_TREE_ATTR, tree);
    }

    return () => {
      for (const node of [html, body, root]) {
        if (!node) continue;
        node.removeAttribute(TREE_ATTR);
        node.removeAttribute(LEGACY_TREE_ATTR);
      }
    };
  }, [tree]);

  return <TreeContext.Provider value={tree}>{children}</TreeContext.Provider>;
}
