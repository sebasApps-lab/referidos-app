import React from "react";
import CacheView from "../../cache/CacheView";
import { CACHE_KEYS } from "../../cache/cacheKeys";

export default function NegocioPerfilView() {
  return (
    <CacheView
      scope="negocio"
      cacheKey={CACHE_KEYS.NEGOCIO_PERFIL}
      fallbackTo={CACHE_KEYS.NEGOCIO_INICIO}
    />
  );
}
