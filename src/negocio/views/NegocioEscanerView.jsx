import React from "react";
import CacheView from "../../cache/CacheView";
import { CACHE_KEYS } from "../../cache/cacheKeys";

export default function NegocioEscanerView() {
  return (
    <CacheView
      scope="negocio"
      cacheKey={CACHE_KEYS.NEGOCIO_ESCANEAR}
      fallbackTo={CACHE_KEYS.NEGOCIO_INICIO}
    />
  );
}
