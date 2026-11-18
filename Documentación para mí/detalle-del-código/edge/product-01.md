# Runtime · geocodificación, administración y Prelaunch

Endpoints para resolver direcciones, gestionar ciertos datos desde admin y recibir inscripciones, actividad y feedback desde la landing.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`address-reverse/index.ts`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts)
- [`address-search/index.ts`](../../../apps/referidos-app/supabase/functions/address-search/index.ts)
- [`admin-prelaunch-metrics/index.ts`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts)
- [`admin-revoke-qr/index.ts`](../../../apps/referidos-app/supabase/functions/admin-revoke-qr/index.ts)
- [`admin-update-negocio/index.ts`](../../../apps/referidos-app/supabase/functions/admin-update-negocio/index.ts)
- [`admin-update-promo/index.ts`](../../../apps/referidos-app/supabase/functions/admin-update-promo/index.ts)
- [`admin-update-reporte/index.ts`](../../../apps/referidos-app/supabase/functions/admin-update-reporte/index.ts)
- [`feedback-submit/index.ts`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts)
- [`prelaunch-ingest/index.ts`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts)
- [`waitlist-signup/index.ts`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts)

## `address-reverse/index.ts`

Valida la sesión y transforma coordenadas en datos útiles para una dirección. Usa caché, las mismas convenciones de normalización y el fallback de proveedor que la búsqueda de texto.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/address-reverse/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L432).
- **Referencias literales al nombre del endpoint:** [addressReverseClient.js](../../../apps/referidos-app/src/services/addressReverseClient.js#L55), [reverse.js](../../../packages/api-client/src/address/reverse.js#L44).
- **Importaciones locales:** [../_shared/addressNormalize.ts](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts) · `normalizeMapTilerResults`, `normalizeNominatimResults`, `NormalizedResult`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`, `MAPTILER_API_KEY`, `MAPTILER_KEY`, `MAPTILER_BASE_URL`, `OSM_BASE_URL`, `OSM_USER_AGENT`, `OSM_EMAIL`, `ADDRESS_CACHE_TTL_DAYS`, `OSM_MIN_INTERVAL_MS`.
- **Tipos declarados:** [`ProviderResult`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L50) (`id`, `label`, `lat`, `lng`, `street`, `house_number`, `city`, `region`, `country`, `postcode`), [`CachedRow`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L314) (`id`, `provider`, `results`, `raw_results`, `normalized_version`, `query`, `query_key`).

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L63) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `address-reverse` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L495), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L201), [`buildReverseKey`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L220), [`buildReverseQueryLike`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L232), [`buildReverseLanguageLike`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L238), [`getCachedResult`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L242), [`reverseMapTiler`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L394), [`normalizeMapTilerResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L322), [`storeCache`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L281), [`reverseNominatim`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L445), [`normalizeNominatimResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L442).
  - **Propiedades de entrada leídas:** `payload.lat`, `payload.lng`, `payload.language`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405` · encabezados leídos `origin` · campos de respuesta `ok`, `message`, `source`, `cached`, `provider`, `result`.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L201) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L80).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L495).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`buildReverseKey(lat: number, lng: number, language: string)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L220) · Función. Construye el identificador de caché a partir de coordenadas y del contexto de la consulta.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L97).
- [`truncateCoord(value: number, decimals: number)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L226) · Función. Acota el valor o paso `coord` del módulo.
  - **Dónde se usa:** [`buildReverseQueryLike` · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L233).
- [`buildReverseQueryLike(lat: number, lng: number)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L232) · Función. Compone el valor o paso `reverse query like` del módulo.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L98).
  - **Delega en:** [`truncateCoord`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L226).
- [`buildReverseLanguageLike(language: string)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L238) · Función. Compone el valor o paso `reverse language like` del módulo.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L99).
- [`getCachedResult(queryKey: string, allowExpired: boolean, fuzzy?: { queryLike, languageLike })`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L242) · Función, asíncrona. Obtiene la respuesta persistida para una clave de geocodificación.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L101).
  - **Delega en:** [`baseQuery`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L248), [`pickPreferredProvider`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L324), [`ensureNormalizedCacheRow`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L344).
  - **Retornos explícitos:** null explícito.
- [`baseQuery()`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L248) · Función. Implementa el paso `base query` del módulo.
  - **Dónde se usa:** [`getCachedResult` · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L258).
  - **Relaciones consultadas en este cuerpo:** [`address_search_cache`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L249) → [20250229_000002_address_search_cache.sql](../../../apps/referidos-app/supabase/migrations/20250229_000002_address_search_cache.sql#L8) (`select`).
- [`storeCache({ query, queryKey, provider, results, rawResults })`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L281) · Función, asíncrona. Persiste una respuesta de geocodificación junto con los datos que permiten reutilizarla.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L129).
  - **Relaciones consultadas en este cuerpo:** [`address_search_cache`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L298) → [20250229_000002_address_search_cache.sql](../../../apps/referidos-app/supabase/migrations/20250229_000002_address_search_cache.sql#L8) (`upsert`).
- [`pickPreferredProvider(rows?: Array<any>)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L324) · Función. Determina el valor o paso `preferred provider` del módulo.
  - **Dónde se usa:** [`getCachedResult` · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L262).
  - **Retornos explícitos:** null explícito.
- [`looksNormalized(results: unknown)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L331) · Función. Comprueba el valor o paso `normalized` del módulo.
  - **Dónde se usa:** [`ensureNormalizedCacheRow` · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L346).
  - **Retornos explícitos:** booleanos explícitos.
- [`ensureNormalizedCacheRow(row: CachedRow)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L344) · Función, asíncrona. Actualiza o reconstruye la forma normalizada de una fila que ya existía en caché.
  - **Dónde se usa:** [`getCachedResult` · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L264).
  - **Delega en:** [`looksNormalized`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L331), [`normalizeMapTilerResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L322), [`normalizeNominatimResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L442).
  - **Relaciones consultadas en este cuerpo:** [`address_search_cache`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L353) → [20250229_000002_address_search_cache.sql](../../../apps/referidos-app/supabase/migrations/20250229_000002_address_search_cache.sql#L8) (`update`).
  - **Retornos explícitos:** objeto con `normalized_version`, `results`, `raw_results` · null explícito.
- [`reverseMapTiler({ lat, lng, language })`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L394) · Función, asíncrona. Convierte coordenadas a una dirección usando MapTiler y adapta sus datos al flujo de reversa.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L121).
  - **Delega en:** [`pickContext`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L424).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `rateLimited`, `result`.
- [`pickContext(prefixes: string[])`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L424) · Función. Determina el valor o paso `context` del módulo.
  - **Dónde se usa:** [`reverseMapTiler` · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L436).
- [`reverseNominatim({ lat, lng, language })`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L445) · Función, asíncrona. Convierte coordenadas a una dirección usando Nominatim como proveedor de reversa.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L153).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `result`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L495) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L77), [`getAuthUser` · address-reverse](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts#L205).

## `address-search/index.ts`

Valida la sesión, sanea la consulta, revisa caché y consulta MapTiler o Nominatim. Guarda resultados normalizados y originales para mejorar latencia y poder reutilizar una respuesta cuando cambie la normalización. El endpoint es para texto a dirección.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/address-search/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/address-search/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L429).
- **Referencias literales al nombre del endpoint:** [addressSearchClient.js](../../../apps/referidos-app/src/services/addressSearchClient.js#L77), [search.js](../../../packages/api-client/src/address/search.js#L49).
- **Importaciones locales:** [../_shared/addressNormalize.ts](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts) · `normalizeMapTilerResults`, `normalizeNominatimResults`, `NormalizedResult`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`, `MAPTILER_API_KEY`, `MAPTILER_KEY`, `MAPTILER_BASE_URL`, `OSM_BASE_URL`, `OSM_USER_AGENT`, `OSM_EMAIL`, `ADDRESS_CACHE_TTL_DAYS`, `ADDRESS_SEARCH_MAX_LIMIT`, `OSM_MIN_INTERVAL_MS`.
- **Tipos declarados:** [`ProviderResult`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L51) (`id`, `label`, `lat`, `lng`, `street`, `house_number`, `city`, `region`, `country`, `postcode`), [`CachedRow`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L323) (`id`, `provider`, `results`, `raw_results`, `normalized_version`, `query`, `query_key`).

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L64) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `address-search` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L543), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L219), [`clampNumber`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L266), [`buildQueryKey`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L258), [`getCachedResult`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L270), [`normalizeQuery`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L238), [`searchMapTiler`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L429), [`normalizeMapTilerResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L322), [`storeCache`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L396), [`searchNominatim`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L488), [`normalizeNominatimResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L442).
  - **Propiedades de entrada leídas:** `payload.query`, `payload.q`, `payload.limit`, `payload.country`, `payload.language`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405` · encabezados leídos `origin` · campos de respuesta `ok`, `message`, `source`, `cached`, `provider`, `results`.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L219) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L81).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L543).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`normalizeQuery(value: string)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L238) · Función. Normaliza la consulta que se enviará al proveedor del módulo.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L109), [`getCachedResult` · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L299).
- [`buildQueryKey(query: string, options: { limit, country, language })`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L258) · Función. Construye el identificador de caché a partir de la búsqueda.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L107).
- [`clampNumber(value: number, min: number, max: number)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L266) · Función. Acota el valor numérico del módulo.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L103).
- [`getCachedResult(queryKey: string, allowExpired: boolean, fuzzy?: { normalizedQuery, keySuffix })`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L270) · Función, asíncrona. Obtiene la respuesta persistida para una clave de geocodificación.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L108).
  - **Delega en:** [`baseQuery`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L276), [`pickPreferredProvider`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L316), [`ensureNormalizedCacheRow`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L346), [`normalizeQuery`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L238).
  - **Retornos explícitos:** null explícito.
- [`baseQuery()`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L276) · Función. Implementa el paso `base query` del módulo.
  - **Dónde se usa:** [`getCachedResult` · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L286).
  - **Relaciones consultadas en este cuerpo:** [`address_search_cache`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L277) → [20250229_000002_address_search_cache.sql](../../../apps/referidos-app/supabase/migrations/20250229_000002_address_search_cache.sql#L8) (`select`).
- [`pickPreferredProvider(rows?: Array<any>)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L316) · Función. Determina el valor o paso `preferred provider` del módulo.
  - **Dónde se usa:** [`getCachedResult` · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L290).
  - **Retornos explícitos:** null explícito.
- [`looksNormalized(results: unknown)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L333) · Función. Comprueba el valor o paso `normalized` del módulo.
  - **Dónde se usa:** [`ensureNormalizedCacheRow` · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L348).
  - **Retornos explícitos:** booleanos explícitos.
- [`ensureNormalizedCacheRow(row: CachedRow)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L346) · Función, asíncrona. Actualiza o reconstruye la forma normalizada de una fila que ya existía en caché.
  - **Dónde se usa:** [`getCachedResult` · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L292).
  - **Delega en:** [`looksNormalized`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L333), [`normalizeMapTilerResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L322), [`normalizeNominatimResults`](../../../apps/referidos-app/supabase/functions/_shared/addressNormalize.ts#L442).
  - **Relaciones consultadas en este cuerpo:** [`address_search_cache`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L355) → [20250229_000002_address_search_cache.sql](../../../apps/referidos-app/supabase/migrations/20250229_000002_address_search_cache.sql#L8) (`update`).
  - **Retornos explícitos:** objeto con `normalized_version`, `results`, `raw_results` · null explícito.
- [`storeCache({ query, queryKey, provider, results, rawResults })`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L396) · Función, asíncrona. Persiste una respuesta de geocodificación junto con los datos que permiten reutilizarla.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L140).
  - **Relaciones consultadas en este cuerpo:** [`address_search_cache`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L413) → [20250229_000002_address_search_cache.sql](../../../apps/referidos-app/supabase/migrations/20250229_000002_address_search_cache.sql#L8) (`upsert`).
- [`searchMapTiler({ query, limit, country, language })`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L429) · Función, asíncrona. Consulta al proveedor MapTiler para resolver una búsqueda textual de direcciones.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L128).
  - **Delega en:** [`pickContext`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L466).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `rateLimited`, `results`, `id`, `label`, `lat`, `lng`, `street`, `house_number`, `city`, `region`, `country`, `postcode`.
- [`pickContext(prefixes: string[])`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L466) · Función. Determina el valor o paso `context` del módulo.
  - **Dónde se usa:** [`searchMapTiler` · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L478).
- [`searchNominatim({ query, limit, country, language })`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L488) · Función, asíncrona. Consulta al proveedor Nominatim para recuperar resultados de búsqueda de dirección.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L165).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `results`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L543) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L78), [`getAuthUser` · address-search](../../../apps/referidos-app/supabase/functions/address-search/index.ts#L223).

## `admin-prelaunch-metrics/index.ts`

Valida el perfil administrador y extrae agregados de prelaunch_visitors, prelaunch_events, waitlist_signups y support_threads. Trabaja por ventanas y dimensiones como fecha y origen. Da al panel conteos en lugar de delegar toda la agregación al navegador.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L444).
- **Referencias literales al nombre del endpoint:** [adminOps.ts](../../../apps/referidos-android/src/shared/services/adminOps.ts#L161), [prelaunchMetrics.js](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L39).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `safeTrim`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`EqFilter`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L83) (`kind`, `column`, `value`), [`InFilter`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L89) (`kind`, `column`, `values`), [`MetricFilter`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L95), [`TimelineBucket`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L97) (`day`, `page_views`, `unique_visitors`, `new_visitors`, `recurrent_visitors`, `cta_waitlist_clicks`, `waitlist_submits`, `support_tickets_created`, `feedback_submits`, `modal_views`, `link_clicks`, `avg_time_on_page_ms`, `avg_time_on_page_seconds`).

### Funciones, handlers y clases

- [`toDayKey(isoValue: string)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L113) · Función. Convierte la fecha a una clave de día del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L278).
  - **Retornos explícitos:** null explícito.
- [`buildTimelineSeed(days: number)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L119) · Función. Compone el valor o paso `timeline seed` del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L474).
- [`clampDays(value: unknown)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L149) · Función. Acota la ventana de días del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L272).
- [`readStringProp(props: Record<string, unknown> | null | undefined, key: string)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L158) · Función. Obtiene el valor o paso `string prop` del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L594).
- [`readNumberProp(props: Record<string, unknown> | null | undefined, key: string)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L166) · Función. Obtiene el valor o paso `number prop` del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L647).
- [`ensureSetMapValue(map: Map<string, Set<string>>, key: string)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L174) · Función. Verifica o prepara el valor o paso `set map value` del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L562).
- [`ensureNestedSetMapValue(map: Map<string, Map<string, Set<string>>>, outerKey: string, innerKey: string)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L181) · Función. Verifica o prepara el valor o paso `nested set map value` del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L614).
- [`mapToSortedCounts(map: Map<string, number>, keyName: string)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L196) · Función. Traduce el valor o paso `to sorted counts` del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L722).
- [`countRows(table: string, tenantId: string, sinceIso: string, dateColumn: string, appChannel: string | null, filters: MetricFilter[] = …)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L202) · Función, asíncrona. Implementa el paso `count rows` del módulo.
  - **Dónde se usa:** [handler HTTP · admin-prelaunch-metrics](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L354).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L236) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `admin-prelaunch-metrics` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`clampDays`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L149), [`toDayKey`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L113), [`countRows`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L202), [`buildTimelineSeed`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L119), [`ensureSetMapValue`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L174), [`readStringProp`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L158), [`ensureNestedSetMapValue`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L181) y 2 más.
  - **Relaciones consultadas en este cuerpo:** [`prelaunch_visitors`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L280) → [20260216_000010_prelaunch_analytics_antifraud.sql](../../../apps/referidos-app/supabase/migrations/20260216_000010_prelaunch_analytics_antifraud.sql#L17) (`select`), [`waitlist_signups`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L327) → [20260128_000001_verify_legal_and_waitlist_signups.sql](../../../apps/referidos-app/supabase/migrations/20260128_000001_verify_legal_and_waitlist_signups.sql#L19) (`select`), [`support_threads`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L339) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`), [`prelaunch_events`](../../../apps/referidos-app/supabase/functions/admin-prelaunch-metrics/index.ts#L518) → [20260216_000010_prelaunch_analytics_antifraud.sql](../../../apps/referidos-app/supabase/migrations/20260216_000010_prelaunch_analytics_antifraud.sql#L47) (`select`).
  - **Propiedades de entrada leídas:** `body.days`, `body.app_channel`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `range_days`, `app_channel`, `metrics`, `funnel`, `event_breakdown`, `waitlist_breakdown`, `support_breakdown`, `engagement`, `period_averages`, `comparisons`, `timeline`, `top_ip_risk`.
  - **Retornos explícitos:** objeto con `unique_visitors`, `new_visitors`, `recurrent_visitors`, `avg_time_on_page_ms`, `avg_time_on_page_seconds`, `modal_id`, `views`, `closes`, `unique_viewers`, `average_daily_unique_viewers`.

## `admin-revoke-qr/index.ts`

Valida admin, resuelve el identificador del QR y actualiza qr_validos con el cambio de revocación admitido. El canje y la supervisión pueden consultar el mismo estado persistido.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/admin-revoke-qr/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/admin-revoke-qr/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L516).
- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/admin-revoke-qr/index.ts#L10) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `admin-revoke-qr` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65).
  - **Relaciones consultadas en este cuerpo:** [`qr_validos`](../../../apps/referidos-app/supabase/functions/admin-revoke-qr/index.ts#L49) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L107), [20250209_000001_qr_hmac.sql](../../../apps/referidos-app/supabase/migrations/20250209_000001_qr_hmac.sql#L94) (`update`).
  - **Propiedades de entrada leídas:** `body.qr_id`, `body.code`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `qr`.

## `admin-update-negocio/index.ts`

Valida admin, limita los campos que acepta del cuerpo y actualiza un negocio. El handler hace explícito el perímetro de cambios de moderación y separa la edición operativa del formulario de alta.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/admin-update-negocio/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/admin-update-negocio/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L507).
- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/admin-update-negocio/index.ts#L10) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `admin-update-negocio` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65).
  - **Relaciones consultadas en este cuerpo:** [`negocios`](../../../apps/referidos-app/supabase/functions/admin-update-negocio/index.ts#L77) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L56) (`update`, `select`).
  - **Propiedades de entrada leídas:** `body.negocio_id`, `body.verificacion_estado`, `body.puede_publicar`, `body.puede_aparecer_publico`, `body.verificado`, `body.logo`, `body.categoria`, `body.subcategoria`, `body.nombre`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `negocio`.

## `admin-update-promo/index.ts`

Valida admin, comprueba la promoción y construye un parche con campos admitidos. Encapsula la moderación administrativa de promociones.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/admin-update-promo/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/admin-update-promo/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L510).
- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/admin-update-promo/index.ts#L10) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `admin-update-promo` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65).
  - **Relaciones consultadas en este cuerpo:** [`promos`](../../../apps/referidos-app/supabase/functions/admin-update-promo/index.ts#L72) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L83) (`update`).
  - **Propiedades de entrada leídas:** `body.promo_id`, `body.public_id`, `body.estado`, `body.titulo`, `body.descripcion`, `body.inicio`, `body.fin`, `body.imagen`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `promo`.

## `admin-update-reporte/index.ts`

Valida admin y aplica el cambio de estado permitido al reporte. La UI administra el flujo de moderación sin necesitar permisos de escritura generalizados.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/admin-update-reporte/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/admin-update-reporte/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L513).
- **Referencias literales al nombre del endpoint:** [adminOps.ts](../../../apps/referidos-android/src/shared/services/adminOps.ts#L151).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/admin-update-reporte/index.ts#L10) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `admin-update-reporte` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65).
  - **Relaciones consultadas en este cuerpo:** [`reportes`](../../../apps/referidos-app/supabase/functions/admin-update-reporte/index.ts#L51) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L145) (`update`, `select`).
  - **Propiedades de entrada leídas:** `body.reporte_id`, `body.estado`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `reporte`.

## `feedback-submit/index.ts`

Valida y sanea el mensaje, los datos de contacto permitidos y el contexto, resuelve el tenant y comprueba límites de entrada. Crea feedback_submissions y feedback_events para que el primer mensaje tenga un registro auditable separado del ticket de soporte.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts)

- **Referencias literales al nombre del endpoint:** [publicClient.js](../../../packages/feedback-sdk/src/publicClient.js#L2), [publicClient.js](../../../packages/feedback-sdk/src/publicClient.js#L14).
- **Importaciones locales:** [../_shared/observability.ts](../../../apps/referidos-app/supabase/functions/_shared/observability.ts) · `corsHeaders`, `jsonResponse`, `resolveTenantIdByHint`, `resolveTenantIdByOrigin`, `scrubUnknown`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`sanitizeUtm(value: unknown)`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L36) · Función. Sanea los campos de atribución de campaña del módulo.
  - **Dónde se usa:** [handler HTTP · feedback-submit](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L86).
  - **Delega en:** `isRecord`, `safeTrim`.
  - **Retornos explícitos:** objeto con `source`, `medium`, `campaign`, `term`, `content`.
- [`sanitizeContext(value: unknown)`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L47) · Función. Limita y limpia los campos de contexto que se reciben del cliente antes de almacenar el evento.
  - **Dónde se usa:** [handler HTTP · feedback-submit](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L87).
  - **Delega en:** `isRecord`, [`scrubUnknown`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L95).
- [`feedbackResponse(status: string, row: { id, public_id })`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L54) · Función. Compone el resultado HTTP del ingreso de feedback con los encabezados esperados por el cliente.
  - **Dónde se usa:** [handler HTTP · feedback-submit](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L245).
  - **Retornos explícitos:** objeto con `ok`, `status`, `feedback_id`, `feedback_public_id`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L63) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `feedback-submit` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L42), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L52), `safeTrim`, `normalizeFeedbackOriginRole`, `parseUuid`, `normalizeFeedbackName`, `normalizeFeedbackEmail`, `normalizeFeedbackMessage`, [`sanitizeUtm`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L36), [`sanitizeContext`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L47), [`resolveTenantIdByOrigin`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L377), [`resolveTenantIdByHint`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L391) y 5 más.
  - **Relaciones consultadas en este cuerpo:** [`tenants`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L92) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L6) (`select`), [`feedback_submissions`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L201) → [20260330_000047_feedback_and_intake_guard.sql](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L67) (`select`, `update`, `insert`), [`feedback_events`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L227) → [20260330_000047_feedback_and_intake_guard.sql](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L125) (`insert`).
  - **Propiedades de entrada leídas:** `body.tenant_hint`, `body.app_channel`, `body.origin_source`, `body.source_route`, `body.source_surface`, `body.origin_role`, `body.origin`, `body.anon_id`, `body.visit_session_id`, `body.honeypot`, `body.name`, `body.email`, `body.message`, `body.utm`, `body.context`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `429`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `status`, `spam`.
- [`recordGuard(outcome: string, reason: string, meta: Record<string, unknown> = …)`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L119) · Función. Implementa el paso `record guard` del módulo.
  - **Dónde se usa:** [handler HTTP · feedback-submit](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts#L141).
  - **Delega en:** `recordIntakeGuardEvent`.

## `prelaunch-ingest/index.ts`

Recibe eventos admitidos de Prelaunch, resuelve tenant, normaliza UTM y propiedades, e identifica la visita anónima. Persiste prelaunch_events y crea o actualiza prelaunch_visitors. Incluye límites para que el endpoint público de métricas no acepte tráfico sin filtros.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L447).
- **Referencias literales al nombre del endpoint:** [prelaunchSystem.js](../../../apps/prelaunch/src/services/prelaunchSystem.js#L97).
- **Importaciones locales:** [../_shared/observability.ts](../../../apps/referidos-app/supabase/functions/_shared/observability.ts) · `corsHeaders`, `jsonResponse`, `parseUserAgentSummary`, `resolveTenantIdByHint`, `resolveTenantIdByOrigin`, `scrubUnknown`, `sha256Hex`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Configuración que lee al inicializarse:** `PRELAUNCH_UA_PEPPER`, `PRELAUNCH_IP_RISK_PEPPER`.

### Funciones, handlers y clases

- [`safeTrim(value: unknown, max = …)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L57) · Función. Normaliza de forma defensiva el valor o paso `trim` del módulo.
  - **Dónde se usa:** [`normalizeEventType` · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L85), [`sanitizeUtm` · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L109), [handler HTTP · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L144).
- [`parseUuid(value: unknown)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L62) · Función. Interpreta el valor o paso `uuid` del módulo.
  - **Dónde se usa:** [handler HTTP · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L138).
  - **Retornos explícitos:** null explícito.
- [`getClientIp(req: Request)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L75) · Función. Resuelve la IP reportada por los encabezados de infraestructura para construir señales de ingreso.
  - **Dónde se usa:** [handler HTTP · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L169).
  - **HTTP:** encabezados leídos `cf-connecting-ip`, `x-forwarded-for`, `x-real-ip`.
- [`normalizeEventType(value: unknown)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L84) · Función. Normaliza el tipo de evento que se almacenará del módulo.
  - **Dónde se usa:** [handler HTTP · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L133).
  - **Delega en:** [`safeTrim`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L57).
  - **Retornos explícitos:** null explícito.
- [`sanitizeProps(value: unknown)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L90) · Función. Sanea las propiedades adicionales de ingreso del módulo.
  - **Dónde se usa:** [handler HTTP · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L146).
  - **Delega en:** [`scrubUnknown`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L95).
- [`sanitizeUtm(value: unknown)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L97) · Función. Sanea los campos de atribución de campaña del módulo.
  - **Dónde se usa:** [handler HTTP · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L147).
  - **Delega en:** [`safeTrim`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L57).
  - **Retornos explícitos:** objeto con `source`, `medium`, `campaign`, `term`, `content`.
- [`buildIpRiskId(ip: string)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L117) · Función, asíncrona. Compone un identificador de riesgo derivado de la IP para limitación y correlación.
  - **Dónde se usa:** [handler HTTP · prelaunch-ingest](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L170).
  - **Delega en:** [`sha256Hex`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L63).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L122) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `prelaunch-ingest` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L42), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L52), [`normalizeEventType`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L84), [`parseUuid`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L62), [`safeTrim`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L57), [`sanitizeProps`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L90), [`sanitizeUtm`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L97), [`resolveTenantIdByOrigin`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L377), [`resolveTenantIdByHint`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L391), [`getClientIp`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L75), [`buildIpRiskId`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L117), [`sha256Hex`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L63) y 1 más.
  - **Relaciones consultadas en este cuerpo:** [`tenants`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L153) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L6) (`select`), [`prelaunch_events`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L176) → [20260216_000010_prelaunch_analytics_antifraud.sql](../../../apps/referidos-app/supabase/migrations/20260216_000010_prelaunch_analytics_antifraud.sql#L47) (`select`, `insert`), [`prelaunch_visitors`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts#L222) → [20260216_000010_prelaunch_analytics_antifraud.sql](../../../apps/referidos-app/supabase/migrations/20260216_000010_prelaunch_analytics_antifraud.sql#L17) (`select`, `update`, `insert`).
  - **Propiedades de entrada leídas:** `body.event_type`, `body.type`, `body.anon_id`, `body.visit_session_id`, `body.app_channel`, `body.path`, `body.props`, `body.utm`, `body.tenant_hint`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `429`, `500` · encabezados leídos `origin`, `user-agent` · campos de respuesta `ok`, `error`, `deduped`, `event_type`, `tenant_id`, `app_channel`.

## `waitlist-signup/index.ts`

Normaliza correo, intención de rol, canal y consentimiento. Deduplica la inscripción y usa RPC para asegurar código propio, enlazar con usuario, atribuir un referido y devolver el resumen. Mantiene la captación separada del alta autenticada del producto.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/waitlist-signup/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L450).
- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`, `PRELAUNCH_UA_PEPPER`, `PRELAUNCH_IP_RISK_PEPPER`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L29) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `waitlist-signup` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L406), [`safeJson`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L328), [`isValidEmail`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L199), [`cleanText`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L203), [`resolveTenantId`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L272), [`normalizeRoleIntent`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L208), [`parseUuid`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L222), [`sanitizeUtm`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L235), [`getClientIp`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L304), [`buildIpRiskId`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L323), [`sha256`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L315), [`buildWaitlistSuccessPayload`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L342) y 1 más.
  - **Relaciones consultadas en este cuerpo:** [`waitlist_signups`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L91) → [20260128_000001_verify_legal_and_waitlist_signups.sql](../../../apps/referidos-app/supabase/migrations/20260128_000001_verify_legal_and_waitlist_signups.sql#L19) (`select`, `insert`).
  - **Propiedades de entrada leídas:** `payload.honeypot`, `payload.email`, `payload.tenant_hint`, `payload.app_channel`, `payload.role_intent`, `payload.source`, `payload.consent_version`, `payload.referral_code`, `payload.anon_id`, `payload.visit_session_id`, `payload.utm`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `429`, `500` · encabezados leídos `origin`, `user-agent` · campos de respuesta `ok`, `message`, `spam`, `already`.
- [`isValidEmail(email: string)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L199) · Función. Comprueba el valor o paso `valid email` del módulo.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L62).
- [`cleanText(value: unknown, maxLength: number)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L203) · Función. Implementa el paso `clean text` del módulo.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L66), [`sanitizeUtm` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L240), [`getOriginCandidates` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L266), [`resolveTenantId` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L284).
- [`normalizeRoleIntent(value: string)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L208) · Función. Normaliza el rol que se seleccionó durante la captación del módulo.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L74).
- [`buildReferralLinkPath(code: string | null, roleIntent: string)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L214) · Función. Construye la ruta que el cliente de Prelaunch puede compartir para el referido registrado.
  - **Dónde se usa:** [`buildWaitlistSuccessPayload` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L394).
  - **Retornos explícitos:** null explícito.
- [`parseUuid(value: unknown)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L222) · Función. Interpreta el valor o paso `uuid` del módulo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L78).
  - **Retornos explícitos:** null explícito.
- [`sanitizeUtm(value: unknown)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L235) · Función. Sanea los campos de atribución de campaña del módulo.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L80).
  - **Delega en:** [`cleanText`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L203).
  - **Retornos explícitos:** objeto con `source`, `medium`, `campaign`, `term`, `content`.
- [`normalizeOrigin(value: string | null)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L248) · Función. Normaliza el origen HTTP del módulo.
  - **Dónde se usa:** [`parseOriginFromReferer` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L257), [`getOriginCandidates` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L264).
  - **Retornos explícitos:** null explícito.
- [`parseOriginFromReferer(value: string | null)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L254) · Función. Extrae y normaliza el origen de la referencia de navegación.
  - **Dónde se usa:** [`getOriginCandidates` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L265).
  - **Delega en:** [`normalizeOrigin`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L248).
  - **Retornos explícitos:** null explícito.
- [`getOriginCandidates(req: Request)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L263) · Función. Reúne orígenes candidatos de la solicitud para buscar el ámbito del registro público.
  - **Dónde se usa:** [`resolveTenantId` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L273).
  - **Delega en:** [`normalizeOrigin`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L248), [`parseOriginFromReferer`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L254), [`cleanText`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L203).
  - **HTTP:** encabezados leídos `origin`, `referer`, `host`, `x-forwarded-proto`.
- [`resolveTenantId(req: Request, tenantHint: string)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L272) · Función, asíncrona. Determina el tenant cuyo ámbito se usará en las consultas del endpoint.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L68).
  - **Delega en:** [`getOriginCandidates`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L263), [`cleanText`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L203).
  - **Relaciones consultadas en este cuerpo:** [`tenant_origins`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L275) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L58) (`select`), [`tenants`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L286) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L6) (`select`).
- [`getClientIp(req: Request)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L304) · Función. Resuelve la IP reportada por los encabezados de infraestructura para construir señales de ingreso.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L82).
  - **HTTP:** encabezados leídos `x-forwarded-for`, `cf-connecting-ip`, `x-real-ip`.
- [`sha256(value: string)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L315) · Función, asíncrona. Implementa el paso `sha256` del módulo.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L86), [`buildIpRiskId` · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L325).
  - **Integraciones:** `crypto.subtle.digest`.
- [`buildIpRiskId(ip: string)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L323) · Función, asíncrona. Compone un identificador de riesgo derivado de la IP para limitación y correlación.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L83).
  - **Delega en:** [`sha256`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L315).
- [`safeJson(req: Request)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L328) · Función, asíncrona. Lee el cuerpo JSON con una ruta de error controlada para que el endpoint decida cómo responder.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L46).
  - **Retornos explícitos:** null explícito.
- [`isDuplicate(error: { code, message, details })`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L336) · Función. Comprueba el valor o paso `duplicate` del módulo.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L160).
  - **Retornos explícitos:** booleanos explícitos.
- [`buildWaitlistSuccessPayload({ signupId, roleIntent, referralCode, isNewSignup })`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L342) · Función, asíncrona. Arma la confirmación de lista de espera a partir del registro y los datos de referido devueltos por el runtime.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L126).
  - **Delega en:** [`buildReferralLinkPath`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L214).
  - **RPC:** [`ensure_waitlist_referral_code`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L353) → [20260332_000049_waitlist_referrals.sql](../../../apps/referidos-app/supabase/migrations/20260332_000049_waitlist_referrals.sql#L114), [`link_waitlist_signup_by_signup_id`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L357) → [20260332_000049_waitlist_referrals.sql](../../../apps/referidos-app/supabase/migrations/20260332_000049_waitlist_referrals.sql#L461), [`attach_waitlist_referral`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L363) → [20260332_000049_waitlist_referrals.sql](../../../apps/referidos-app/supabase/migrations/20260332_000049_waitlist_referrals.sql#L329), [`get_waitlist_referral_summary`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L375) → [20260332_000049_waitlist_referrals.sql](../../../apps/referidos-app/supabase/migrations/20260332_000049_waitlist_referrals.sql#L431).
  - **Retornos explícitos:** objeto con `ok`, `already`, `waitlist_signup_id`, `role_intent`, `referral_code`, `referral_link_path`, `referral_summary`, `referral_application`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L406) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · waitlist-signup](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L43).
