import React from "react";
import CacheView from "../../cache/CacheView";
import { CACHE_KEYS } from "../../cache/cacheKeys";

export default function ClientePerfilView() {
  return (
    <CacheView
      scope="cliente"
      cacheKey={CACHE_KEYS.CLIENTE_PERFIL}
      fallbackTo={CACHE_KEYS.CLIENTE_INICIO}
    />
  );
}
