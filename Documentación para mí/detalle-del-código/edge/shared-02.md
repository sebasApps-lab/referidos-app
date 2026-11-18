# Helpers compartidos de runtime · 2

Utilidades que consumen varias Edge Functions. El ámbito de cada símbolo se ve en las importaciones de los puntos de entrada.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`_shared/supportMacroCatalog.ts`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts)

## `_shared/supportMacroCatalog.ts`

Lee macros y categorías cacheadas, normaliza app, audiencia y códigos, y arma la lista pública de categorías según macros publicadas. El formulario público y la creación del ticket comparten así el criterio de qué categoría se puede ofrecer.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts)

- **Importaciones locales:** [support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `CATEGORY_LABELS`, `supabaseAdmin`.
- **Tipos declarados:** [`CacheCategoryRow`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L3) (`id`, `code`, `label`, `description`, `app_targets`, `sort_order`, `status`), [`CacheMacroRow`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L13) (`id`, `category_id`, `category_code`, `audience_roles`, `app_targets`, `status`), [`AnonymousSupportCategory`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L22) (`id`, `code`, `label`, `description`, `app_targets`, `sort_order`, `macro_count`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L51) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [`normalizeArray` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L59), [`normalizeSupportAppChannel` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L87), [`normalizeSupportCategoryCode` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L93), [`buildAnonymousCategoryList` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L149).
- [`normalizeArray(values: unknown, fallback: string[] = …)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L57) · Función. Normaliza la lista del módulo.
  - **Dónde se usa:** [`supportsAppTarget` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L103), [`hasAnonymousAudience` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L116), [`buildAnonymousCategoryList` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L179).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L51).
- [`normalizeSupportAppChannel(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L86) · Función, exportada. Normaliza el valor o paso `support app channel` del módulo.
  - **Dónde se usa:** [ámbito de módulo · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L86), [`buildAnonymousCategoryList` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L143).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L51).
- [`normalizeSupportCategoryCode(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L92) · Función, exportada. Normaliza el código de categoría consumido por el flujo de soporte del módulo.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L182), [ámbito de módulo · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L92), [`buildAnonymousCategoryList` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L150).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L51).
- [`supportsAppTarget(targets: unknown, appChannel: string)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L102) · Función. Comprueba el valor o paso `app target` del módulo.
  - **Dónde se usa:** [`buildAnonymousCategoryList` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L159).
  - **Delega en:** [`normalizeArray`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L57).
- [`normalizeRoleToken(value: string)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L107) · Función. Normaliza el identificador normalizado de rol del módulo.
  - **Dónde se usa:** [`hasAnonymousAudience` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L116).
- [`hasAnonymousAudience(audienceRoles: unknown)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L115) · Función. Comprueba si el valor admite el ingreso anónimo del módulo.
  - **Dónde se usa:** [`buildAnonymousCategoryList` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L158).
  - **Delega en:** [`normalizeArray`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L57).
  - **Retornos explícitos:** booleanos explícitos.
- [`humanizeCategoryCode(code: string)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L121) · Función. Implementa el paso `humanize category code` del módulo.
  - **Dónde se usa:** [`categoryLabelForCode` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L130).
- [`categoryLabelForCode(code: string)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L128) · Función, exportada. Implementa el paso `category label for code` del módulo.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L482), [ámbito de módulo · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L128), [`buildAnonymousCategoryList` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L184).
  - **Delega en:** [`humanizeCategoryCode`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L121).
- [`buildAnonymousCategoryList({ macros, categories, appChannel })`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L133) · Función. Compone la lista pública de categorías basándose en macros aplicables y metadatos del catálogo.
  - **Dónde se usa:** [`listAnonymousMacroCategoriesFromCache` · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L230).
  - **Delega en:** [`normalizeSupportAppChannel`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L86), [`asString`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L51), [`normalizeSupportCategoryCode`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L92), [`hasAnonymousAudience`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L115), [`supportsAppTarget`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L102), [`normalizeArray`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L57), [`categoryLabelForCode`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L128).
- [`listAnonymousMacroCategoriesFromCache({ appChannel } = …)`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L200) · Función, asíncrona, exportada. Lee el catálogo materializado de macros y deriva las categorías permitidas para una entrada anónima.
  - **Tipo de retorno declarado:** `Promise<{ categories, error }>`.
  - **Dónde se usa:** [handler HTTP · support-anon-categories](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts#L82), [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L214), [ámbito de módulo · supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L200).
  - **Delega en:** [`buildAnonymousCategoryList`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L133).
  - **Relaciones consultadas en este cuerpo:** [`support_macros_cache`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L210) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L38) (`select`), [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L214) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L8) (`select`).
  - **Retornos explícitos:** objeto con `categories`, `error`.
