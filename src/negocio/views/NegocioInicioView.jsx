import React from "react";
import CacheView from "../../cache/CacheView";
import { CACHE_KEYS } from "../../cache/cacheKeys";

export default function NegocioInicioView() {
  return (
    <CacheView scope="negocio" cacheKey={CACHE_KEYS.NEGOCIO_INICIO} />
  );
}
