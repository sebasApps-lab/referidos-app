import React from "react";
import CacheView from "../../cache/CacheView";
import { CACHE_KEYS } from "../../cache/cacheKeys";

export default function ClienteEscanerView() {
  return (
    <CacheView
      scope="cliente"
      cacheKey={CACHE_KEYS.CLIENTE_ESCANEAR}
      fallbackTo={CACHE_KEYS.CLIENTE_INICIO}
    />
  );
}
