import React from "react";
import { useCacheStore } from "./cacheStore";

const EMPTY_ORDER = [];

export default function CacheOutlet({ scope }) {
  const order = useCacheStore((state) => state.order[scope] ?? EMPTY_ORDER);
  const views = useCacheStore((state) => state.views);
  const activeKey = useCacheStore((state) => state.activeKeys[scope] || null);

  return (
    <>
      {order.map((key) => {
        const entry = views[key];
        if (!entry) return null;
        const isActive = key === activeKey;
        return (
          <div
            key={key}
            data-cache-key={key}
            aria-hidden={!isActive}
            style={{ display: isActive ? "block" : "none" }}
          >
            {entry.element}
          </div>
        );
      })}
    </>
  );
}
