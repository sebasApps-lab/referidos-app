# Paquetes compartidos · support-sdk · 3 de 3

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/support-sdk/src/agent/SupportWorkQueueDock.jsx`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L1)
- [`packages/support-sdk/src/data/supportCatalog.js`](../../../packages/support-sdk/src/data/supportCatalog.js#L1)
- [`packages/support-sdk/src/runtime/supportRuntimeFlags.js`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L1)
- [`packages/support-sdk/src/runtime/systemFeatureFlags.js`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L1)
- [`packages/support-sdk/src/supportClient.js`](../../../packages/support-sdk/src/supportClient.js#L1)
- [`packages/support-sdk/store/appStore.js`](../../../packages/support-sdk/store/appStore.js#L1)

## Símbolos y conexiones

### [`packages/support-sdk/src/agent/SupportWorkQueueDock.jsx`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L1)

Presenta la cola de trabajo y señales accionables sin depender de una sola ruta de ticket.

**Superficie que exporta.** [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L11).

**Módulos que lo cargan.** [`SupportLayout.jsx`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../store/appStore`](../../../packages/support-sdk/store/appStore.js), [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js), [`@referidos/notifications-sdk`](../../../packages/notifications-sdk/src/index.js), [`../runtime/systemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js).

#### [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L11) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `lastAssignedNoticeIdRef mediante useRef`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useAppStore`, `useNavigate`, `useRef`, `useSupportWorkQueueNotifications`, `useEffect`.
- **Condiciones que evalúa** `ausencia de currentTicket y queueCount y notices.length`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L63) (llama), [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42) (llama), [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (referencia).
- **Llamadas directas en el cuerpo** [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L14), [`notices.find`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L36), [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L37).
- **Lo usa** [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L92) (renderiza).

#### [`notificationPolicy`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L17) · cálculo memorizado · dentro de [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L11)

Función auxiliar de `SupportWorkQueueDock` para `notification Policy`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`createNotificationPolicy`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L18).
- **Lo usa** [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L33) (referencia).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L40) · callback de infraestructura · dentro de [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L11)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportWorkQueueDock`.

- **Condiciones que evalúa** `ausencia de noticeId`, `lastAssignedNoticeIdRef.current`, `undefined o function`, `function`, `undefined y function`.
- **Llamadas directas en el cuerpo** [`window.dispatchEvent`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L48), [`document.createEvent`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L59), [`fallbackEvent.initEvent`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L60).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L85) · callback JSX · dentro de [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L11)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L85).

### [`packages/support-sdk/src/data/supportCatalog.js`](../../../packages/support-sdk/src/data/supportCatalog.js#L1)

Datos auxiliares de soporte, etiquetas y opciones de catálogo que consume la interfaz.

**Superficie que exporta.** [`normalizeSupportAppKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L151), [`normalizeSupportEnvKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L157), [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/data/supportCatalog.js#L163), [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L215).

**Módulos que lo cargan.** [`SupportIrregular.jsx`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L3) (importa), [`SupportTicket.jsx`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L37) (importa).

**Dependencias del archivo.** [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js).

#### [`APP_ALIASES`](../../../packages/support-sdk/src/data/supportCatalog.js#L3) · variable de módulo

Declara `APP_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeSupportAppKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L154) (accede al módulo).

#### [`ENV_ALIASES`](../../../packages/support-sdk/src/data/supportCatalog.js#L22) · variable de módulo

Declara `ENV_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeSupportEnvKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L160) (accede al módulo).

#### [`THREAD_STATUS_ALIASES`](../../../packages/support-sdk/src/data/supportCatalog.js#L31) · variable de módulo

Declara `THREAD_STATUS_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeThreadStatus`](../../../packages/support-sdk/src/data/supportCatalog.js#L137) (accede al módulo).

#### [`CATEGORY_WILDCARD_CODES`](../../../packages/support-sdk/src/data/supportCatalog.js#L61) · variable de módulo

Declara `CATEGORY_WILDCARD_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L307) (accede al módulo).

#### [`CATEGORY_ALIASES`](../../../packages/support-sdk/src/data/supportCatalog.js#L70) · variable de módulo

Declara `CATEGORY_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeCategoryCode`](../../../packages/support-sdk/src/data/supportCatalog.js#L148) (accede al módulo).

#### [`AUDIENCE_ROLE_ALIASES`](../../../packages/support-sdk/src/data/supportCatalog.js#L92) · variable de módulo

Declara `AUDIENCE_ROLE_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeAudienceRoles`](../../../packages/support-sdk/src/data/supportCatalog.js#L128) (accede al módulo), [`resolveThreadAudienceRole`](../../../packages/support-sdk/src/data/supportCatalog.js#L234) (accede al módulo).

#### [`ALLOWED_AUDIENCE_ROLES`](../../../packages/support-sdk/src/data/supportCatalog.js#L102) · variable de módulo

Declara `ALLOWED_AUDIENCE_ROLES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeAudienceRoles`](../../../packages/support-sdk/src/data/supportCatalog.js#L129) (accede al módulo).

#### [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L110) · función

Implementa `as String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../packages/support-sdk/src/data/supportCatalog.js#L112).
- **Lo usa** [`normalizeArray`](../../../packages/support-sdk/src/data/supportCatalog.js#L119) (llama), [`normalizeThreadStatus`](../../../packages/support-sdk/src/data/supportCatalog.js#L136) (llama), [`normalizeCategoryCode`](../../../packages/support-sdk/src/data/supportCatalog.js#L141) (llama), [`normalizeSupportAppKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L152) (llama), [`normalizeSupportEnvKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L158) (llama), [`resolveThreadAudienceRole`](../../../packages/support-sdk/src/data/supportCatalog.js#L224) (llama), [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L253) (llama), [`sortMacros`](../../../packages/support-sdk/src/data/supportCatalog.js#L282) (llama).

#### [`normalizeArray`](../../../packages/support-sdk/src/data/supportCatalog.js#L116) · función

Normaliza `Array` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `values`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `ausencia de Array.isArray`.
- **Llamadas directas en el cuerpo** [`filter`](../../../packages/support-sdk/src/data/supportCatalog.js#L119), [`values.map`](../../../packages/support-sdk/src/data/supportCatalog.js#L119), [`toLowerCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L119), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L119).
- **Lo usa** [`normalizeAudienceRoles`](../../../packages/support-sdk/src/data/supportCatalog.js#L127) (llama), [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/data/supportCatalog.js#L197) (llama), [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L322) (llama).

#### [`normalizeAudienceRoles`](../../../packages/support-sdk/src/data/supportCatalog.js#L124) · función

Normaliza `Audience Roles` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `values`, `fallback = valor por defecto`.
- **Llamadas directas en el cuerpo** [`filter`](../../../packages/support-sdk/src/data/supportCatalog.js#L127), [`map`](../../../packages/support-sdk/src/data/supportCatalog.js#L127), [`normalizeArray`](../../../packages/support-sdk/src/data/supportCatalog.js#L127), [`AUDIENCE_ROLE_ALIASES.get`](../../../packages/support-sdk/src/data/supportCatalog.js#L128), [`ALLOWED_AUDIENCE_ROLES.has`](../../../packages/support-sdk/src/data/supportCatalog.js#L129).
- **Lo usa** [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/data/supportCatalog.js#L202) (llama), [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L331) (llama).

#### [`normalizeThreadStatus`](../../../packages/support-sdk/src/data/supportCatalog.js#L135) · función

Normaliza `Thread Status` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../packages/support-sdk/src/data/supportCatalog.js#L136), [`toLowerCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L136), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L136), [`THREAD_STATUS_ALIASES.get`](../../../packages/support-sdk/src/data/supportCatalog.js#L137).
- **Lo usa** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L260) (llama).

#### [`normalizeCategoryCode`](../../../packages/support-sdk/src/data/supportCatalog.js#L140) · función

Normaliza `Category Code` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`replace`](../../../packages/support-sdk/src/data/supportCatalog.js#L141), [`normalize`](../../../packages/support-sdk/src/data/supportCatalog.js#L141), [`toLowerCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L141), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L141), [`CATEGORY_ALIASES.get`](../../../packages/support-sdk/src/data/supportCatalog.js#L148).
- **Lo usa** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L256) (llama).

#### [`normalizeSupportAppKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L151) · función · exportado

Normaliza `Support App Key` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L152), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L152), [`APP_ALIASES.get`](../../../packages/support-sdk/src/data/supportCatalog.js#L154).
- **Lo usa** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L244) (llama), [`select.onChange`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L101) (llama), [`ticketAppKey`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L753) (llama).

#### [`normalizeSupportEnvKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L157) · función · exportado

Normaliza `Support Env Key` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L158), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L158), [`ENV_ALIASES.get`](../../../packages/support-sdk/src/data/supportCatalog.js#L160).
- **Lo usa** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L248) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L746) (llama).

#### [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/data/supportCatalog.js#L163) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) y coordina las demás operaciones de esta ficha.

- **Entradas** `{publishedOnly} = valor por defecto`.
- **Retorno visible o tipo declarado** `source`, `categories`, `macros`, `error`.
- **Condiciones que evalúa** `publishedOnly`, `categoriesError o macrosError`.
- **Contrato de datos** tabla o vista [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) (`select`) en [`supportCatalog.js:164`](../../../packages/support-sdk/src/data/supportCatalog.js#L164), tabla o bucket [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) en [`supportCatalog.js:164`](../../../packages/support-sdk/src/data/supportCatalog.js#L164), tabla o vista [`support_macros_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L36) (`select`) en [`supportCatalog.js:170`](../../../packages/support-sdk/src/data/supportCatalog.js#L170), tabla o bucket [`support_macros_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L36) en [`supportCatalog.js:170`](../../../packages/support-sdk/src/data/supportCatalog.js#L170).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`order`](../../../packages/support-sdk/src/data/supportCatalog.js#L164), [`select`](../../../packages/support-sdk/src/data/supportCatalog.js#L164), [`supabase.from`](../../../packages/support-sdk/src/data/supportCatalog.js#L164), [`categoriesQuery.in`](../../../packages/support-sdk/src/data/supportCatalog.js#L179), [`macrosQuery.in`](../../../packages/support-sdk/src/data/supportCatalog.js#L180), [`map`](../../../packages/support-sdk/src/data/supportCatalog.js#L195), [`normalizeArray`](../../../packages/support-sdk/src/data/supportCatalog.js#L197), [`normalizeAudienceRoles`](../../../packages/support-sdk/src/data/supportCatalog.js#L202).
- **Lo usa** [`loadCatalog`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L19) (llama), [`fetchCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L663) (llama).

#### [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L215) · función · exportado

Procesa `Support Macros For Thread` según el criterio del módulo.

- **Entradas** `{thread, macros, categories, runtimeEnvKey}`.
- **Retorno visible o tipo declarado** `lista`, `booleano`.
- **Condiciones que evalúa** `ausencia de thread`, `currentThreadStatus`, `macroStatus`, `ausencia de threadStatus`, `ausencia de allowedThreadStatuses.has`, `categoryCode`, `ausencia de isWildcardCategory y categoryCode`, `ausencia de threadAudienceRole` y 5 más.
- **Llamadas directas en el cuerpo** [`normalizeSupportAppKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L244), [`normalizeSupportEnvKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L248), [`resolveThreadAudienceRole`](../../../packages/support-sdk/src/data/supportCatalog.js#L249), [`filter`](../../../packages/support-sdk/src/data/supportCatalog.js#L251), [`map`](../../../packages/support-sdk/src/data/supportCatalog.js#L251), [`toLowerCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L253), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L253), [`normalizeCategoryCode`](../../../packages/support-sdk/src/data/supportCatalog.js#L256), [`normalizeThreadStatus`](../../../packages/support-sdk/src/data/supportCatalog.js#L260), [`allowedThreadStatuses.has`](../../../packages/support-sdk/src/data/supportCatalog.js#L298), [`categoryCodeById.get`](../../../packages/support-sdk/src/data/supportCatalog.js#L303), [`CATEGORY_WILDCARD_CODES.has`](../../../packages/support-sdk/src/data/supportCatalog.js#L307) y 10 más.
- **Lo usa** [`macros`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L939) (llama).

#### [`resolveThreadAudienceRole`](../../../packages/support-sdk/src/data/supportCatalog.js#L223) · función · dentro de [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L215)

Obtiene o resuelve `Thread Audience Role` para entregarlo al consumidor.

- **Condiciones que evalúa** `requestOrigin`, `normalized`, `userPublicId.startsWith`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L224), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L224), [`AUDIENCE_ROLE_ALIASES.get`](../../../packages/support-sdk/src/data/supportCatalog.js#L234), [`toUpperCase`](../../../packages/support-sdk/src/data/supportCatalog.js#L238), [`userPublicId.startsWith`](../../../packages/support-sdk/src/data/supportCatalog.js#L239).
- **Lo usa** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L249) (llama).

#### [`sortMacros`](../../../packages/support-sdk/src/data/supportCatalog.js#L277) · función · dentro de [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L215)

Procesa `Macros` según el criterio del módulo.

- **Entradas** `list`.
- **Condiciones que evalúa** `aSort`.
- **Llamadas directas en el cuerpo** [`list.sort`](../../../packages/support-sdk/src/data/supportCatalog.js#L278), [`localeCompare`](../../../packages/support-sdk/src/data/supportCatalog.js#L282), [`asString`](../../../packages/support-sdk/src/data/supportCatalog.js#L282).
- **Lo usa** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L334) (llama).

### [`packages/support-sdk/src/runtime/supportRuntimeFlags.js`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L1)

Lee, normaliza y aplica flags de ejecución de soporte como autorización y jornada.

**Superficie que exporta.** [`DEFAULT_SUPPORT_RUNTIME_FLAGS`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L5), [`getCachedSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L123), [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L127), [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L157), [`setSupportRuntimeFlag`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L195), [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L208).

**Módulos que lo cargan.** [`FeatureFlags.jsx`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L9) (importa), [`SupportGate.jsx`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L6) (importa).

**Dependencias del archivo.** [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js).

#### [`CHANGE_EVENT`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L3) · variable de módulo

Declara `CHANGE_EVENT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`emitFlagsChange`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L114) (referencia), [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L218) (referencia).

#### [`DEFAULT_SUPPORT_RUNTIME_FLAGS`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L5) · variable de módulo · exportado

Declara `DEFAULT_SUPPORT_RUNTIME_FLAGS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`cachedFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L20) (referencia), [`normalizeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L41) (referencia), [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L142) (referencia).

#### [`cachedFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L20) · variable de módulo

Declara `cachedFlags` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getCachedSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L124) (referencia), [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L129) (referencia), [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L191) (referencia).

#### [`hasFetchedFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L21) · variable de módulo

Declara `hasFetchedFlags` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L128) (referencia).

#### [`hasWindow`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L23) · función

Comprueba `Window` para decidir si se admite o continúa la operación.

- **Lo usa** [`emitFlagsChange`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L111) (llama), [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L209) (llama).

#### [`asInt`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L27) · función

Implementa `as Int` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`, `min = valor por defecto`, `max = valor por defecto`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`.
- **Lo usa** [`normalizeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L52) (llama).

#### [`asNumber`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L33) · función

Implementa `as Number` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`, `min = valor por defecto`, `max = valor por defecto`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`.
- **Lo usa** [`normalizeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L97) (llama).

#### [`normalizeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L39) · función

Normaliza `Support Runtime Flags` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `raw`.
- **Condiciones que evalúa** `ausencia de raw o object o Array.isArray`, `normalized.max_processing_tickets`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L43), [`trim`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L43), [`asInt`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L52), [`includes`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L88), [`asNumber`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L97).
- **Lo usa** [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L147) (llama), [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L162) (llama), [`onCustomChange`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L214) (llama).

#### [`emitFlagsChange`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L110) · función

Emite o envía `Flags Change` en el flujo del archivo.

- **Entradas** `nextFlags`.
- **Condiciones que evalúa** `ausencia de hasWindow`.
- **Llamadas directas en el cuerpo** [`hasWindow`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L111), [`window.dispatchEvent`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L113).
- **Lo usa** [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L191) (llama).

#### [`getCachedSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L123) · función · exportado

Obtiene o resuelve `Cached Support Runtime Flags` para entregarlo al consumidor.

- **Lo usa** [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L62) (llama), [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L32) (llama).

#### [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L127) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) y coordina las demás operaciones de esta ficha.

- **Entradas** `{force} = valor por defecto`.
- **Condiciones que evalúa** `ausencia de force y hasFetchedFlags`, `error o ausencia de data`.
- **Contrato de datos** tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) (`select`) en [`supportRuntimeFlags.js:133`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L133), tabla o bucket [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) en [`supportRuntimeFlags.js:133`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L133).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L133), [`eq`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L133), [`select`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L133), [`supabase.from`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L133), [`normalizeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L147).
- **Lo usa** [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L161) (llama), [`loadSupportAuth`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L79) (llama), [`loadFlags`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L91) (llama).

#### [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L157) · función · asíncrona · exportado

Guarda datos en tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) y coordina las demás operaciones de esta ficha.

- **Entradas** `patch = valor por defecto`, `{updatedBy} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `flags`.
- **Condiciones que evalúa** `updatedBy`, `error`.
- **Contrato de datos** tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) (`upsert + select`) en [`supportRuntimeFlags.js:173`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L173), tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) (`upsert`) en [`supportRuntimeFlags.js:173`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L173), tabla o bucket [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) en [`supportRuntimeFlags.js:173`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L173).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L161), [`normalizeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L162), [`maybeSingle`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L173), [`select`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L173), [`upsert`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L173), [`supabase.from`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L173), [`emitFlagsChange`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L191).
- **Lo usa** [`setSupportRuntimeFlag`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L200) (llama), [`saveSupportConfig`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L152) (llama).

#### [`setSupportRuntimeFlag`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L195) · función · asíncrona · exportado

Aplica o guarda `Support Runtime Flag` para que el estado refleje la operación.

- **Entradas** `flagKey`, `enabled`, `{updatedBy} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L200).
- **Lo usa** [`toggleSupportAuthFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L107) (llama).

#### [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L208) · función · exportado

Inicia `Support Runtime Flags` y prepara sus dependencias.

- **Entradas** `onChange`.
- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de hasWindow o function`.
- **Llamadas directas en el cuerpo** [`hasWindow`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L209), [`window.addEventListener`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L218), [`window.removeEventListener`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L220).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L85) (llama), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L96) (llama).

#### [`onCustomChange`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L213) · función · dentro de [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L208)

Maneja `Custom Change` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`normalizeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L214), [`onChange`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L215).
- **Lo usa** [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L218) (referencia).

### [`packages/support-sdk/src/runtime/systemFeatureFlags.js`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L1)

Centraliza flags del sistema consumidos por auth y admin para habilitar comportamientos condicionales.

**Superficie que exporta.** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L28), [`setSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L39), [`setSystemFeatureFlag`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L55), [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L63), [`isAppleOAuthEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L67), [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L71).

**Módulos que lo cargan.** [`FeatureFlags.jsx`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L4) (importa), [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L35) (importa), [`SupportGate.jsx`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L5) (importa), [`SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L15) (importa), [`SupportWorkQueueDock.jsx`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L9) (importa).

#### [`STORAGE_KEY`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L1) · variable de módulo

Declara `STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L31) (referencia), [`setSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L43) (referencia), [`onStorage`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L82) (referencia).

#### [`CHANGE_EVENT`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L2) · variable de módulo

Declara `CHANGE_EVENT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`setSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L45) (referencia), [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L86) (referencia).

#### [`DEFAULT_FLAGS`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L4) · variable de módulo

Declara `DEFAULT_FLAGS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L18) (referencia), [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L29) (referencia).

#### [`hasWindow`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L12) · función

Comprueba `Window` para decidir si se admite o continúa la operación.

- **Lo usa** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L29) (llama), [`setSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L41) (llama), [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L72) (llama).

#### [`normalizeFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L16) · función

Normaliza `Flags` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `raw`.
- **Condiciones que evalúa** `ausencia de raw o object o Array.isArray`, `key`.
- **Llamadas directas en el cuerpo** [`forEach`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L22).
- **Lo usa** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L33) (llama), [`setSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L40) (llama), [`onCustomChange`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L77) (llama).

#### [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L28) · función · exportado

Obtiene o resuelve `System Feature Flags` para entregarlo al consumidor.

- **Efectos y APIs** `window.localStorage.getItem`.
- **Condiciones que evalúa** `ausencia de hasWindow`, `ausencia de raw`.
- **Llamadas directas en el cuerpo** [`hasWindow`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L29), [`window.localStorage.getItem`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L31), [`normalizeFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L33).
- **Lo usa** [`setSystemFeatureFlag`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L56) (llama), [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L64) (llama), [`isAppleOAuthEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L68) (llama), [`onStorage`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L83) (llama), [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L60) (llama), [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L165) (llama).

#### [`setSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L39) · función · exportado

Aplica o guarda `System Feature Flags` para que el estado refleje la operación.

- **Entradas** `nextState`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `window.localStorage.setItem`.
- **Condiciones que evalúa** `ausencia de hasWindow`.
- **Llamadas directas en el cuerpo** [`normalizeFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L40), [`hasWindow`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L41), [`window.localStorage.setItem`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L43), [`window.dispatchEvent`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L44).
- **Lo usa** [`setSystemFeatureFlag`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L57) (llama).

#### [`setSystemFeatureFlag`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L55) · función · exportado

Aplica o guarda `System Feature Flag` para que el estado refleje la operación.

- **Entradas** `flagKey`, `enabled`.
- **Actualizaciones de estado o acciones** `setSystemFeatureFlags`.
- **Llamadas directas en el cuerpo** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L56), [`setSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L57).
- **Lo usa** [`toggleFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L98) (llama).

#### [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L63) · función · exportado

Comprueba `Support Live Updates Enabled` para decidir si se admite o continúa la operación.

- **Llamadas directas en el cuerpo** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L64).
- **Lo usa** [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L19) (llama), [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L118) (llama), [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L14) (llama).

#### [`isAppleOAuthEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L67) · función · exportado

Comprueba `Apple O Auth Enabled` para decidir si se admite o continúa la operación.

- **Llamadas directas en el cuerpo** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L68).

#### [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L71) · función · exportado

Inicia `System Feature Flags` y prepara sus dependencias.

- **Entradas** `onChange`.
- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de hasWindow o function`.
- **Llamadas directas en el cuerpo** [`hasWindow`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L72), [`window.addEventListener`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L86), [`window.removeEventListener`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L90).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L73) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L167) (llama).

#### [`onCustomChange`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L76) · función · dentro de [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L71)

Maneja `Custom Change` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`normalizeFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L77), [`onChange`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L78).
- **Lo usa** [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L86) (referencia).

#### [`onStorage`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L81) · función · dentro de [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L71)

Maneja `Storage` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Condiciones que evalúa** `event.key`.
- **Llamadas directas en el cuerpo** [`onChange`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L83), [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L83).
- **Lo usa** [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L87) (referencia).

### [`packages/support-sdk/src/supportClient.js`](../../../packages/support-sdk/src/supportClient.js#L1)

Cliente web del dominio soporte. Lee datos y usa funciones Edge para asignación, estados, notas, jornadas, macros o señales según la operación.

**Superficie que exporta.** [`createSupportThread`](../../../packages/support-sdk/src/supportClient.js#L3), [`createAnonymousSupportThread`](../../../packages/support-sdk/src/supportClient.js#L16), [`getAnonymousSupportThreadStatus`](../../../packages/support-sdk/src/supportClient.js#L29), [`requestSupportThreadRetake`](../../../packages/support-sdk/src/supportClient.js#L42), [`assignSupportThread`](../../../packages/support-sdk/src/supportClient.js#L55), [`updateSupportStatus`](../../../packages/support-sdk/src/supportClient.js#L68), [`markSupportOpeningMessage`](../../../packages/support-sdk/src/supportClient.js#L81), [`markSupportWhatsAppNameChanged`](../../../packages/support-sdk/src/supportClient.js#L94), [`sendSupportWorkflowAction`](../../../packages/support-sdk/src/supportClient.js#L107), [`setSupportAutoAssignMode`](../../../packages/support-sdk/src/supportClient.js#L120), [`addSupportNote`](../../../packages/support-sdk/src/supportClient.js#L133), [`closeSupportThread`](../../../packages/support-sdk/src/supportClient.js#L143), [`createIrregularThread`](../../../packages/support-sdk/src/supportClient.js#L156), [`startSupportSession`](../../../packages/support-sdk/src/supportClient.js#L169), [`endSupportSession`](../../../packages/support-sdk/src/supportClient.js#L180), [`pingSupportSession`](../../../packages/support-sdk/src/supportClient.js#L200), [`startAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L211), [`endAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L222), [`pingAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L233), [`denyAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L244), [`createSupportAdminUser`](../../../packages/support-sdk/src/supportClient.js#L255), [`cancelSupportThread`](../../../packages/support-sdk/src/supportClient.js#L266), [`linkAnonymousThreadToUser`](../../../packages/support-sdk/src/supportClient.js#L277), [`trackSupportMacroEvents`](../../../packages/support-sdk/src/supportClient.js#L288).

**Módulos que lo cargan.** [`AdminSupportAgents.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L5) (importa), [`AdminSupportDesk.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L6) (importa), [`SupportChatHubBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L8) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L9) (importa), [`SupportGate.jsx`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L11) (importa), [`SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L8) (importa), [`SupportIrregular.jsx`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L2) (importa), [`SupportTicket.jsx`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L28) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js).

#### [`createSupportThread`](../../../packages/support-sdk/src/supportClient.js#L3) · función · asíncrona · exportado

Consulta o invoca Edge [`support-create-thread`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-create-thread`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts) en [`supportClient.js:4`](../../../packages/support-sdk/src/supportClient.js#L4).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L4).

#### [`createAnonymousSupportThread`](../../../packages/support-sdk/src/supportClient.js#L16) · función · asíncrona · exportado

Consulta o invoca Edge [`support-create-anon-thread`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-create-anon-thread`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts) en [`supportClient.js:17`](../../../packages/support-sdk/src/supportClient.js#L17).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L17).

#### [`getAnonymousSupportThreadStatus`](../../../packages/support-sdk/src/supportClient.js#L29) · función · asíncrona · exportado

Consulta o invoca Edge [`support-anon-thread-status`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-anon-thread-status`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts) en [`supportClient.js:30`](../../../packages/support-sdk/src/supportClient.js#L30).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L30).

#### [`requestSupportThreadRetake`](../../../packages/support-sdk/src/supportClient.js#L42) · función · asíncrona · exportado

Consulta o invoca Edge [`support-retake-thread`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-retake-thread`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts) en [`supportClient.js:43`](../../../packages/support-sdk/src/supportClient.js#L43).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L43).

#### [`assignSupportThread`](../../../packages/support-sdk/src/supportClient.js#L55) · función · asíncrona · exportado

Consulta o invoca Edge [`support-assign-thread`](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-assign-thread`](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts) en [`supportClient.js:56`](../../../packages/support-sdk/src/supportClient.js#L56).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L56).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1365) (llama), [`assignThreadNow`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L416) (llama).

#### [`updateSupportStatus`](../../../packages/support-sdk/src/supportClient.js#L68) · función · asíncrona · exportado

Consulta o invoca Edge [`support-update-status`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-update-status`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts) en [`supportClient.js:69`](../../../packages/support-sdk/src/supportClient.js#L69).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L69).
- **Lo usa** [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1334) (llama).

#### [`markSupportOpeningMessage`](../../../packages/support-sdk/src/supportClient.js#L81) · función · asíncrona · exportado

Consulta o invoca Edge [`support-opening-message-sent`](../../../apps/referidos-app/supabase/functions/support-opening-message-sent/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-opening-message-sent`](../../../apps/referidos-app/supabase/functions/support-opening-message-sent/index.ts) en [`supportClient.js:82`](../../../packages/support-sdk/src/supportClient.js#L82).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L82).
- **Lo usa** [`handleOpeningMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1387) (llama).

#### [`markSupportWhatsAppNameChanged`](../../../packages/support-sdk/src/supportClient.js#L94) · función · asíncrona · exportado

Consulta o invoca Edge [`support-whatsapp-name-updated`](../../../apps/referidos-app/supabase/functions/support-whatsapp-name-updated/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-whatsapp-name-updated`](../../../apps/referidos-app/supabase/functions/support-whatsapp-name-updated/index.ts) en [`supportClient.js:95`](../../../packages/support-sdk/src/supportClient.js#L95).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L95).
- **Lo usa** [`handleStartingContinue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1416) (llama).

#### [`sendSupportWorkflowAction`](../../../packages/support-sdk/src/supportClient.js#L107) · función · asíncrona · exportado

Consulta o invoca Edge [`support-thread-workflow-action`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-thread-workflow-action`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts) en [`supportClient.js:108`](../../../packages/support-sdk/src/supportClient.js#L108).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L108).
- **Lo usa** [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1443) (llama).

#### [`setSupportAutoAssignMode`](../../../packages/support-sdk/src/supportClient.js#L120) · función · asíncrona · exportado

Consulta o invoca Edge [`support-set-auto-assign-mode`](../../../apps/referidos-app/supabase/functions/support-set-auto-assign-mode/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-set-auto-assign-mode`](../../../apps/referidos-app/supabase/functions/support-set-auto-assign-mode/index.ts) en [`supportClient.js:121`](../../../packages/support-sdk/src/supportClient.js#L121).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L121).
- **Lo usa** [`handleSelectAdminAssignMode`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L459) (llama).

#### [`addSupportNote`](../../../packages/support-sdk/src/supportClient.js#L133) · función · asíncrona · exportado

Consulta o invoca Edge [`support-add-note`](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-add-note`](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts) en [`supportClient.js:134`](../../../packages/support-sdk/src/supportClient.js#L134).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L134).
- **Lo usa** [`handleAddNote`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1323) (llama).

#### [`closeSupportThread`](../../../packages/support-sdk/src/supportClient.js#L143) · función · asíncrona · exportado

Consulta o invoca Edge [`support-close-thread`](../../../apps/referidos-app/supabase/functions/support-close-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-close-thread`](../../../apps/referidos-app/supabase/functions/support-close-thread/index.ts) en [`supportClient.js:144`](../../../packages/support-sdk/src/supportClient.js#L144).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L144).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1316) (llama), [`handleClose`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1357) (llama), [`handleCloseOutcome`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1584) (llama).

#### [`createIrregularThread`](../../../packages/support-sdk/src/supportClient.js#L156) · función · asíncrona · exportado

Consulta o invoca Edge [`support-create-irregular-thread`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-create-irregular-thread`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts) en [`supportClient.js:157`](../../../packages/support-sdk/src/supportClient.js#L157).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L157).
- **Lo usa** [`handleCreate`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L55) (llama).

#### [`startSupportSession`](../../../packages/support-sdk/src/supportClient.js#L169) · función · asíncrona · exportado

Consulta o invoca Edge [`support-start-session`](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts). El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-start-session`](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts) en [`supportClient.js:170`](../../../packages/support-sdk/src/supportClient.js#L170).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L170).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L419) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L490) (llama).

#### [`endSupportSession`](../../../packages/support-sdk/src/supportClient.js#L180) · función · asíncrona · exportado

Consulta o invoca Edge [`support-end-session`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`, `data.ok`.
- **Contrato de datos** Edge [`support-end-session`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts) en [`supportClient.js:181`](../../../packages/support-sdk/src/supportClient.js#L181).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L181).
- **Lo usa** [`logout`](../../../apps/referidos-app/src/store/appStore.js#L461) (llama), [`requestEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L142) (llama).

#### [`pingSupportSession`](../../../packages/support-sdk/src/supportClient.js#L200) · función · asíncrona · exportado

Consulta o invoca Edge [`support-agent-ping`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts). El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-agent-ping`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts) en [`supportClient.js:201`](../../../packages/support-sdk/src/supportClient.js#L201).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L201).
- **Lo usa** [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L127) (llama), [`handleRefresh`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L479) (llama).

#### [`startAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L211) · función · asíncrona · exportado

Consulta o invoca Edge [`support-admin-start-session`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-admin-start-session`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts) en [`supportClient.js:212`](../../../packages/support-sdk/src/supportClient.js#L212).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L212).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L839) (llama), [`handleStart`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L51) (llama), [`ensureSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L404) (llama).

#### [`endAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L222) · función · asíncrona · exportado

Consulta o invoca Edge [`support-admin-end-session`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-admin-end-session`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts) en [`supportClient.js:223`](../../../packages/support-sdk/src/supportClient.js#L223).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L223).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L867) (llama), [`handleEnd`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L61) (llama).

#### [`pingAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L233) · función · asíncrona · exportado

Consulta o invoca Edge [`support-admin-ping`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts). El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-admin-ping`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts) en [`supportClient.js:234`](../../../packages/support-sdk/src/supportClient.js#L234).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L234).
- **Lo usa** [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L537) (llama), [`setInterval · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L44) (llama), [`handleRefresh`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L477) (llama).

#### [`denyAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L244) · función · asíncrona · exportado

Consulta o invoca Edge [`support-admin-deny-session`](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-admin-deny-session`](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/index.ts) en [`supportClient.js:245`](../../../packages/support-sdk/src/supportClient.js#L245).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L245).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L851) (llama).

#### [`createSupportAdminUser`](../../../packages/support-sdk/src/supportClient.js#L255) · función · asíncrona · exportado

Consulta o invoca Edge [`support-admin-create-user`](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-admin-create-user`](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts) en [`supportClient.js:256`](../../../packages/support-sdk/src/supportClient.js#L256).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L256).
- **Lo usa** [`handleCreate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L572) (llama).

#### [`cancelSupportThread`](../../../packages/support-sdk/src/supportClient.js#L266) · función · asíncrona · exportado

Consulta o invoca Edge [`support-cancel-thread`](../../../apps/referidos-app/supabase/functions/support-cancel-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-cancel-thread`](../../../apps/referidos-app/supabase/functions/support-cancel-thread/index.ts) en [`supportClient.js:267`](../../../packages/support-sdk/src/supportClient.js#L267).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L267).
- **Lo usa** [`onConfirmCancel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L133) (llama).

#### [`linkAnonymousThreadToUser`](../../../packages/support-sdk/src/supportClient.js#L277) · función · asíncrona · exportado

Consulta o invoca Edge [`support-link-anon-to-user`](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-link-anon-to-user`](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts) en [`supportClient.js:278`](../../../packages/support-sdk/src/supportClient.js#L278).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/supportClient.js#L278).

#### [`trackSupportMacroEvents`](../../../packages/support-sdk/src/supportClient.js#L288) · función · asíncrona · exportado

Guarda datos en tabla o vista [`support_macro_usage_events`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L4) y coordina las demás operaciones de esta ficha.

- **Entradas** `{events} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de Array.isArray o events.length`, `ausencia de payload.length`, `error`.
- **Contrato de datos** tabla o vista [`support_macro_usage_events`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L4) (`insert`) en [`supportClient.js:318`](../../../packages/support-sdk/src/supportClient.js#L318), tabla o bucket [`support_macro_usage_events`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L4) en [`supportClient.js:318`](../../../packages/support-sdk/src/supportClient.js#L318).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`filter`](../../../packages/support-sdk/src/supportClient.js#L293), [`map`](../../../packages/support-sdk/src/supportClient.js#L293), [`events.filter`](../../../packages/support-sdk/src/supportClient.js#L293), [`insert`](../../../packages/support-sdk/src/supportClient.js#L318), [`supabase.from`](../../../packages/support-sdk/src/supportClient.js#L318).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1249) (llama), [`executeMacroCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1266) (llama).

### [`packages/support-sdk/store/appStore.js`](../../../packages/support-sdk/store/appStore.js#L1)

Reexporta el store de referidos-app. Deja explícito el acoplamiento de estas pantallas a la sesión web.

**Reexporta.** `useAppStore` de [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js).

**Módulos que lo cargan.** [`SupportGate.jsx`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L4) (importa), [`SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L5) (importa), [`SupportJornadas.jsx`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L4) (importa), [`SupportSidebar.jsx`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L11) (importa), [`SupportTopbar.jsx`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L3) (importa), [`SupportWorkQueueDock.jsx`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L3) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.
