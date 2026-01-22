import React from "react";
import CacheView from "../../cache/CacheView";
import { CACHE_KEYS } from "../../cache/cacheKeys";

export default function ClienteHistorialView() {
  return (
    <CacheView
      scope="cliente"
      cacheKey={CACHE_KEYS.CLIENTE_HISTORIAL}
      fallbackTo={CACHE_KEYS.CLIENTE_INICIO}
    />
  );
}
