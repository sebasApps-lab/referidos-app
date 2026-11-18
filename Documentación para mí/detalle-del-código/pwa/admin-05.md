# PWA principal · Admin y operación · 5 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1)

Administra macros y categorías, enlaza su navegación y consulta uso de macros.

**Superficie que exporta.** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L30) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`../layout/AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`./services/supportMacrosOpsService`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js).

#### [`GROUP_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L19) · variable de módulo

Conserva la lista de `GROUP OPTIONS` usada por el módulo.

- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1329) (accede al módulo).

#### [`APP_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L25) · variable de módulo

Conserva la lista de `APP OPTIONS` usada por el módulo.

- **Lo usa** [`resolveAppTagLabels`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L120) (accede al módulo), [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1229) (pasa a options), [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1287) (accede al módulo), [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1588) (pasa a options), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1650) (pasa a options).

#### [`ENV_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L32) · variable de módulo

Conserva la lista de `ENV OPTIONS` usada por el módulo.

- **Lo usa** [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1234) (pasa a options), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1651) (pasa a options).

#### [`ROLE_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L39) · variable de módulo

Conserva la lista de `ROLE OPTIONS` usada por el módulo.

- **Lo usa** [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1224) (pasa a options), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1649) (pasa a options).

#### [`THREAD_STATUS_ORDER`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L45) · variable de módulo

Conserva la lista de `THREAD STATUS ORDER` usada por el módulo.

- **Lo usa** [`rank`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L97) (accede al módulo), [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1216) (accede al módulo), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1647) (accede al módulo).

#### [`THREAD_STATUS_LABEL`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L46) · variable de módulo

Agrupa la configuración o catálogo de `THREAD STATUS LABEL` para que sus consumidores lean claves comunes.

- **Campos o contexto** `new`, `starting`, `assigned`, `in_progress`, `waiting_user`, `queued`, `closed`, `cancelled`, `sin_estado`.
- **Lo usa** [`groupedStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L449) (accede al módulo), [`selectedGroupMacrosByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L558) (accede al módulo), [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1218) (accede al módulo), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1647) (accede al módulo).

#### [`LIFECYCLE_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L58) · variable de módulo

Conserva la lista de `LIFECYCLE OPTIONS` usada por el módulo.

- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1302) (accede al módulo).

#### [`USAGE_WINDOWS`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L59) · variable de módulo

Conserva la lista de `USAGE WINDOWS` usada por el módulo.

- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1261) (accede al módulo).

#### [`EMPTY_USAGE`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L60) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY USAGE` para que sus consumidores lean claves comunes.

- **Campos o contexto** `shown_1d`, `shown_7d`, `shown_15d`, `shown_30d`, `copied_1d`, `copied_7d`, `copied_15d`, `copied_30d`.
- **Lo usa** [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1030) (referencia).

#### [`EMPTY_MACRO_FORM`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L70) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY MACRO FORM` para que sus consumidores lean claves comunes.

- **Campos o contexto** `title`, `body`, `category_id`, `thread_status`, `audience_roles`, `app_targets`, `env_targets`.
- **Lo usa** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L207) (referencia), [`openInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L679) (referencia), [`closeInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L700) (referencia).

#### [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L80) · función

Implementa `s` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `v`, `d = valor por defecto`.
- **Llamadas directas en el cuerpo** [`v.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L80).
- **Lo usa** [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L81) (llama), [`code`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L82) (llama), [`short`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L84) (llama), [`sortByPriority`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L104) (llama), [`loadMacroUsageSummary`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L239) (llama), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L305) (llama), [`categoryStats`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L414) (llama), [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L509) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L527) (llama), [`selectedGroupMacrosByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L550) (llama), [`selectedGroupMacrosByCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L566) (llama), [`workspaceLeftMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L606) (llama) y 13 más.

#### [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L81) · función

Implementa `arr` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `v`, `d = valor por defecto`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L81), [`v.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L81), [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L81), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L81).
- **Lo usa** [`matchApp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L85) (llama), [`normalizeAudienceRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L91) (llama), [`resolveAppTagLabels`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L118) (llama), [`resolveEnvTagLabels`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L125) (llama), [`toggleMulti`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L134) (llama), [`TogglePills`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L160) (llama), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L311) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L529) (llama), [`selectedGroupMacrosByCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L578) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L641) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L652) (llama), [`openInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L683) (llama) y 5 más.

#### [`code`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L82) · función

Implementa `code` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `v`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L82), [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L82), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L82).
- **Lo usa** [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L83) (llama).

#### [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L83) · función

Implementa `norm Category Code` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L83), [`code`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L83).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L306) (llama), [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L488) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L531) (llama), [`selectedGroupMacrosByCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L568) (llama), [`workspaceLeftMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L611) (llama), [`categoryMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L624) (llama), [`getMacroDisplayTitle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1004) (llama).

#### [`short`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L84) · función

Implementa `short` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `v`, `n = valor por defecto`.
- **Llamadas directas en el cuerpo** [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L84), [`slice`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L84).
- **Lo usa** [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1074) (llama).

#### [`matchApp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L85) · función

Implementa `match App` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `targets`, `appFilter`.
- **Llamadas directas en el cuerpo** [`includes`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L85), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L85).
- **Lo usa** [`filteredCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L396) (llama), [`filteredMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L403) (llama).

#### [`normalizeAudienceRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L86) · función

Normaliza `Audience Roles` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `values`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L91), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L91), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L91), [`allowed.has`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L93).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L322) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L640) (llama), [`openInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L682) (llama), [`submitInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L718) (llama), [`submitSaveMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L755) (llama).

#### [`rank`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L96) · función

Implementa `rank` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Llamadas directas en el cuerpo** [`THREAD_STATUS_ORDER.indexOf`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L97).
- **Lo usa** [`groupedStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L448) (llama), [`selectedGroupMacrosByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L555) (llama).

#### [`sortByPriority`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L100) · función

Procesa `By Priority` según el criterio del módulo.

- **Entradas** `a`, `b`.
- **Condiciones que evalúa** `aSort`.
- **Llamadas directas en el cuerpo** [`localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L104), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L104).
- **Lo usa** [`filteredMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L406) (referencia), [`groupedStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L449) (referencia), [`groupedRole`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L462) (referencia), [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L471) (referencia), [`selectedGroupMacrosByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L559) (referencia), [`selectedGroupMacrosByCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L587) (referencia), [`selectedGroupFlatMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L597) (referencia), [`workspaceLeftMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L602) (referencia).

#### [`badge`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L106) · función

Implementa `badge` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1058) (llama).

#### [`categoryBadge`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L111) · función

Implementa `category Badge` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1408) (llama).

#### [`escapeRegExp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L116) · función

Implementa `escape Reg Exp` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `value.replace`.
- **Llamadas directas en el cuerpo** [`value.replace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L116).
- **Lo usa** [`getMacroDisplayTitle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1021) (llama).

#### [`resolveAppTagLabels`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L117) · función

Obtiene o resuelve `App Tag Labels` para entregarlo al consumidor.

- **Entradas** `targets`.
- **Condiciones que evalúa** `normalized.includes`.
- **Llamadas directas en el cuerpo** [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L118), [`normalized.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L119), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L120), [`APP_OPTIONS.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L120), [`normalized.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L122), [`APP_OPTIONS.find`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L122).
- **Lo usa** [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1037) (llama).

#### [`resolveEnvTagLabels`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L124) · función

Obtiene o resuelve `Env Tag Labels` para entregarlo al consumidor.

- **Entradas** `targets`.
- **Retorno visible o tipo declarado** `lista`.
- **Efectos y APIs** `labels.push`.
- **Condiciones que evalúa** `normalized.includes`.
- **Llamadas directas en el cuerpo** [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L125), [`normalized.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L126), [`labels.push`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L128).
- **Lo usa** [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1039) (llama).

#### [`toggleMulti`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L133) · función

Implementa `toggle Multi` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `values`, `item`.
- **Retorno visible o tipo declarado** `lista`.
- **Condiciones que evalúa** `item`, `withoutAll.includes`.
- **Llamadas directas en el cuerpo** [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L134), [`list.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L135), [`list.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L136), [`withoutAll.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L137), [`withoutAll.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L138).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L169) (llama).

#### [`Card`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L144) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, headerRight, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1255) (renderiza), [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1556) (renderiza), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1607) (renderiza).

#### [`TogglePills`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L159) · componente React

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{options, values, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Llamadas directas en el cuerpo** [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L160), [`options.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L163), [`selected.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L164).
- **Lo usa** [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1223) (renderiza), [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1588) (renderiza), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1649) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L169) · callback JSX · dentro de [`TogglePills`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L159)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L169), [`toggleMulti`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L169).

#### [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182) · componente React · exportación por defecto

Monta `AdminLayout`, `button`, `RefreshCw`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[saving, setSaving] mediante useState`, `[error, setError] mediante useState`, `[ok, setOk] mediante useState`, `[catalogHint, setCatalogHint] mediante useState`, `[priorityFloatingMessage, setPriorityFloatingMessage] mediante useState`, `[groupBy, setGroupBy] mediante useState`, `[selectedGroupKey, setSelectedGroupKey] mediante useState`, `[appFilter, setAppFilter] mediante useState`, `[macroStatusFilter, setMacroStatusFilter] mediante useState`, `[search, setSearch] mediante useState`, `[categories, setCategories] mediante useState`, `[macros, setMacros] mediante useState` y 11 más.
- **Interfaz que monta** `AdminLayout`, `button`, `RefreshCw`.
- **Hooks que llama** `useNavigate`, `useParams`, `useState`, `useRef`, `useEffect`.
- **Usa código de** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1738), [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1738), [`categoryConfirm.macros.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1752).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L355) (renderiza).

#### [`loadMacroUsageSummary`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L237) · callback React · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Consulta o invoca RPC [`support_macro_usage_summary`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L117). El resultado se adapta al contrato del consumidor.

- **Entradas** `macroList`, `selectedAppFilter`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setUsageByMacroId`, `setCatalogHint`.
- **Condiciones que evalúa** `ausencia de macroIds.length`, `selectedAppFilter`, `usageError`, `ausencia de macroId`.
- **Contrato de datos** RPC [`support_macro_usage_summary`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L117) en [`AdminSupportCatalogPanel.jsx:251`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L251).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L239), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L239), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L239), [`setUsageByMacroId`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L242), [`supabase.rpc`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L251), [`setCatalogHint`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L253), [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L262).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L372) (llama), [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L373) (referencia).

#### [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L279) · callback React · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Coordina cambios de estado durante `load`.

- **Entradas** `manual = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setCatalogHint`, `setCategories`, `setMacros`, `setBaselineSortOrders`.
- **Condiciones que evalúa** `initialMacroCount`, `nextMacros.length`, `initialCategoryCount o nextCategories.length`.
- **Usa código de** [`listSupportMacroCatalog`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L24) (llama), [`dispatchSupportMacrosSync`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L76) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L280), [`setLoading`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L280), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L281), [`setCatalogHint`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L282), [`listSupportMacroCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L284), [`dispatchSupportMacrosSync`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L292), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L304), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L305), [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L306), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L311), [`nextCategories.reduce`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L313), [`normalizeAudienceRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L322) y 4 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L358) (llama), [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L359) (referencia), [`submitInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L725) (llama), [`submitSaveMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L760) (llama), [`setMacroLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L776) (llama), [`removeMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L792) (llama), [`executeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L906) (llama), [`applyPriorityChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L970) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1732) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L357) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L358).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L362) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `priorityMessageTimerRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L364).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L370) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Condiciones que evalúa** `loading`.
- **Llamadas directas en el cuerpo** [`loadMacroUsageSummary`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L372).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L375) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `setCollapsedMacroGroups`.
- **Llamadas directas en el cuerpo** [`setCollapsedMacroGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L376).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L379) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `setWorkspaceMacroSubgroup`.
- **Llamadas directas en el cuerpo** [`setWorkspaceMacroSubgroup`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L380).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L383) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `setInlineAddContext`.
- **Condiciones que evalúa** `ausencia de inlineAddContext`, `inlineAddContext.groupBy o inlineAddContext.parentGroupKey`.
- **Llamadas directas en el cuerpo** [`setInlineAddContext`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L386).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L390) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `setInlineAddContext`.
- **Condiciones que evalúa** `ausencia de macroId o ausencia de inlineAddContext`.
- **Llamadas directas en el cuerpo** [`setInlineAddContext`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L392).

#### [`filteredCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L396) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Categories` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`categories.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L396), [`matchApp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L396).
- **Lo usa** [`categoryStats`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L431) (referencia).

#### [`filteredMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L400) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Macros` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L401), [`search.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L401), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L402), [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L402), [`macros.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L402), [`matchApp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L403), [`includes`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L405).
- **Lo usa** [`categoryStats`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L413) (accede al módulo), [`groupedStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L443) (accede al módulo), [`groupedRole`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L454) (accede al módulo), [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L490) (accede al módulo).

#### [`categoryStats`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L409) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `category Stats`.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `byThreadStatus.c.m.thread_status.push`.
- **Llamadas directas en el cuerpo** [`filteredMacros.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L413), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L414), [`byThreadStatus.c.m.thread_status.push`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L418), [`base.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L434).
- **Lo usa** [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L486) (referencia).

#### [`groupedStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L441) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Status` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `groups.m.thread_status.push`.
- **Llamadas directas en el cuerpo** [`filteredMacros.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L443), [`groups.m.thread_status.push`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L445), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L447), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L447), [`rank`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L448).
- **Lo usa** [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L467) (accede al módulo).

#### [`groupedRole`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L452) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Role` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `groups.r.push`.
- **Llamadas directas en el cuerpo** [`filteredMacros.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L454), [`m.audience_roles.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L455), [`groups.r.push`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L457), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L460), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L460), [`a.0.localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L461).
- **Lo usa** [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L477) (accede al módulo).

#### [`catalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L465) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `catalog Groups`.

- **Retorno visible o tipo declarado** `id`, `category_id`, `label`, `code`, `description`, `status`, `sort_order`, `list`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `groupBy`, `statusDiff`, `sortDiff`.
- **Llamadas directas en el cuerpo** [`groupedStatus.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L467), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L471), [`groupedRole.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L477), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L486), [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L488), [`filteredMacros.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L490), [`localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L509), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L509).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L514) (accede al módulo), [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L540) (referencia), [`selectedGroup`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L543) (accede al módulo), [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1377) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L513) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `setSelectedGroupKey`.
- **Condiciones que evalúa** `ausencia de catalogGroups.length`, `selectedGroupKey`, `selectedGroupKey y catalogGroups.some`, `currentEditing`, `groupBy`, `fallbackGroupKey y catalogGroups.some`.
- **Llamadas directas en el cuerpo** [`setSelectedGroupKey`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L515), [`catalogGroups.some`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L519), [`macros.find`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L523), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L527), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L529), [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L531).

#### [`selectedGroup`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L543) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Group` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`catalogGroups.find`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L543).
- **Lo usa** [`selectedGroupMacrosByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L549) (referencia), [`selectedGroupMacrosByCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L565) (referencia), [`selectedGroupFlatMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L597) (referencia), [`workspaceLeftMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L602) (referencia), [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1378) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1467) (referencia).

#### [`selectedGroupMacrosByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L547) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Group Macros By Status` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `groups.status.push`.
- **Llamadas directas en el cuerpo** [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L549), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L550), [`groups.status.push`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L552), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L554), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L554), [`rank`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L555).
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1162) (referencia).

#### [`selectedGroupMacrosByCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L563) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Group Macros By Category` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `groups.categoryCode.list.push`.
- **Condiciones que evalúa** `sortDiff`.
- **Llamadas directas en el cuerpo** [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L565), [`categories.find`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L566), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L566), [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L568), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L578), [`groups.categoryCode.list.push`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L581), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L584), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L584), [`localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L592).
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1162) (referencia).

#### [`selectedGroupFlatMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L597) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Procesa `ed Group Flat Macros` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L597).
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1429) (accede al módulo).

#### [`workspaceLeftMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L601) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `workspace Left Macros`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de workspaceMacroSubgroup o workspaceMacroSubgroup.groupBy`, `groupBy`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L602), [`base.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L605), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L606), [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L611).
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1349) (accede al módulo), [`onMoveUp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1360) (referencia), [`onMoveDown`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1361) (referencia).

#### [`editing`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L617) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `editing`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`macros.find`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L617).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L633) (referencia), [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L644) (referencia), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1610) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1658) (accede al módulo).

#### [`editingCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L619) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `editing Category`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`categories.find`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L619).
- **Lo usa** [`categoryMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L623) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L647) (referencia), [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L654) (referencia), [`submitSaveCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L832) (referencia), [`triggerCategoryLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L854) (referencia), [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L872) (referencia), [`executeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L884) (referencia), [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1557) (referencia).

#### [`categoryMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L622) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `category Macros`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de editingCategory`.
- **Llamadas directas en el cuerpo** [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L624), [`macros.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L625), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L627).
- **Lo usa** [`openCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L813) (referencia), [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1586) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L632) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `setEditForm`.
- **Condiciones que evalúa** `ausencia de editing`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L634), [`normalizeAudienceRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L640), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L641).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L646) · callback de infraestructura · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogPanel`.

- **Actualizaciones de estado o acciones** `setCategoryEditForm`.
- **Condiciones que evalúa** `ausencia de editingCategory`.
- **Llamadas directas en el cuerpo** [`setCategoryEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L648), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L652).

#### [`categoryOptions`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L657) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `category Options`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `statusDiff`, `sortDiff`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L658), [`localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L663), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L663), [`orderedCategories.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L667).
- **Lo usa** [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1205) (accede al módulo), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1646) (accede al módulo).

#### [`openInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L677) · callback React · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Inicia `Inline Add Macro` y prepara sus dependencias.

- **Entradas** `context`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setInlineAddContext`, `setWorkspaceAddForm`, `setError`, `setOk`.
- **Llamadas directas en el cuerpo** [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L680), [`normalizeAudienceRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L682), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L683), [`setInlineAddContext`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L686), [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L691), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L692), [`setOk`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L693).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1464) (llama).

#### [`closeInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L698) · callback React · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setInlineAddContext`, `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setInlineAddContext`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L699), [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L700).
- **Lo usa** [`submitInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L729) (llama), [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1177) (pasa a onClick).

#### [`submitInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L703) · función · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `form.onSubmit` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `form.onSubmit`.
- **Actualizaciones de estado o acciones** `setError`, `setOk`, `setSaving`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `ausencia de s`, `createdId`.
- **Usa código de** [`createSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L55) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L704), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L705), [`setOk`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L706), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L707), [`setSaving`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L711), [`createSupportMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L713), [`normalizeAudienceRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L718), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L719), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L725), [`navigate`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L727), [`closeInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L729).
- **Lo usa** [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1185) (pasa a onSubmit).

#### [`submitSaveMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L738) · función · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `form.onSubmit` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `form.onSubmit`.
- **Actualizaciones de estado o acciones** `setError`, `setOk`, `setSaving`.
- **Condiciones que evalúa** `ausencia de macroId`, `ausencia de s`.
- **Usa código de** [`updateSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L59) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L739), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L741), [`setOk`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L742), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L743), [`setSaving`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L747), [`updateSupportMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L749), [`normalizeAudienceRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L755), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L756), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L760).
- **Lo usa** [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1642) (pasa a onSubmit).

#### [`setMacroLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L768) · función · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Aplica o guarda `Macro Lifecycle` para que el estado refleje la operación.

- **Entradas** `status`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSupportMacroStatus`.
- **Condiciones que evalúa** `ausencia de macroId`.
- **Usa código de** [`setSupportMacroStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L63) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L770), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L771), [`setOk`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L772), [`setSupportMacroStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L774), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L776).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1654) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1658) (llama).

#### [`removeMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L784) · función · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `ausencia de macroId o ausencia de window.confirm`.
- **Usa código de** [`deleteSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L70) (llama).
- **Llamadas directas en el cuerpo** [`window.confirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L785), [`setSaving`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L786), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L787), [`setOk`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L788), [`deleteSupportMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L790), [`navigate`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L791), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L792).
- **Lo usa** [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1667) (pasa a onClick).

#### [`openCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L800) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Inicia `Category Confirm` y prepara sus dependencias.

- **Entradas** `{action, title, confirmLabel, message, payload}`.
- **Actualizaciones de estado o acciones** `setCategoryConfirm`.
- **Llamadas directas en el cuerpo** [`setCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L807).
- **Lo usa** [`submitSaveCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L838) (llama), [`triggerCategoryLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L859) (llama), [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L873) (llama).

#### [`closeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L818) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setCategoryConfirm`.
- **Llamadas directas en el cuerpo** [`setCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L819).
- **Lo usa** [`executeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L905) (llama), [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1769) (pasa a onClick).

#### [`submitSaveCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L830) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `form.onSubmit` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `form.onSubmit`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de editingCategory`, `ausencia de s`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L831), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L833), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L834), [`openCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L838), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L848).
- **Lo usa** [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1579) (pasa a onSubmit).

#### [`triggerCategoryLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L853) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `trigger Category Lifecycle`.

- **Entradas** `nextStatus`.
- **Condiciones que evalúa** `ausencia de editingCategory`.
- **Llamadas directas en el cuerpo** [`openCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L859).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1591) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1592) (llama).

#### [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L871) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `ausencia de editingCategory`.
- **Llamadas directas en el cuerpo** [`openCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L873).
- **Lo usa** [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1593) (pasa a onClick).

#### [`executeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L883) · función · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSupportMacroCategoryStatus`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `ausencia de targetCategoryId`, `categoryConfirm.action`, `categoryConfirm.action.startsWith`.
- **Usa código de** [`updateSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L38) (llama), [`setSupportMacroCategoryStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L42) (llama), [`deleteSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L49) (llama).
- **Llamadas directas en el cuerpo** [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L884), [`setSaving`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L886), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L887), [`setOk`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L888), [`updateSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L891), [`categoryConfirm.action.startsWith`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L893), [`categoryConfirm.action.split`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L894), [`setSupportMacroCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L895), [`deleteSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L901), [`navigate`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L903), [`closeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L905), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L906).
- **Lo usa** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1777) (pasa a onClick).

#### [`pendingPriorityChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L915) · cálculo memorizado · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Función auxiliar de `AdminSupportCatalogPanel` para `pending Priority Changes`.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de macroId o baselineSortOrders.macroId`.
- **Llamadas directas en el cuerpo** [`macros.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L916), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L917).
- **Lo usa** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L923) (accede al módulo), [`applyPriorityChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L962) (accede al módulo).

#### [`moveMacroPriorityWithinList`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L925) · callback React · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Coordina cambios de estado durante `move Macro Priority Within List`.

- **Entradas** `orderedList`, `index`, `direction`.
- **Retorno visible o tipo declarado** `sort_order`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setMacros`.
- **Condiciones que evalúa** `targetIndex`, `ausencia de orderedIds.length`, `nextSortById.macroId`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L929), [`orderedList.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L929), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L929), [`orderedIds.splice`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L933), [`orderedIds.reduce`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L938), [`setMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L943), [`prev.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L944).
- **Lo usa** [`onMoveUp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1360) (llama), [`onMoveDown`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1361) (llama), [`onMoveUp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1522) (llama), [`onMoveDown`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1523) (llama).

#### [`applyPriorityChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L955) · función · asíncrona · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`.
- **Condiciones que evalúa** `ausencia de hasPendingPriorityChanges`.
- **Usa código de** [`updateSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L59) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L957), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L958), [`setOk`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L959), [`pendingPriorityChanges.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L962), [`updateSupportMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L963), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L970).
- **Lo usa** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1710) (pasa a onClick).

#### [`revertPriorityChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L978) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Retorno visible o tipo declarado** `sort_order`.
- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setMacros`, `setPriorityFloatingMessage`, `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `baselineSortOrders.macroId`, `priorityMessageTimerRef.current`.
- **Llamadas directas en el cuerpo** [`setMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L979), [`prev.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L980), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L981), [`setPriorityFloatingMessage`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L989), [`clearTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L991), [`setTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L993).
- **Lo usa** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1718) (pasa a onClick).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L993) · callback de infraestructura · dentro de [`revertPriorityChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L978)

Ejecuta trabajo diferido o periódico iniciado por `revertPriorityChanges`.

- **Actualizaciones de estado o acciones** `setPriorityFloatingMessage`.
- **Llamadas directas en el cuerpo** [`setPriorityFloatingMessage`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L994).

#### [`getMacroDisplayTitle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1000) · callback React · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Obtiene o resuelve `Macro Display Title` para entregarlo al consumidor.

- **Entradas** `macro`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `replace`, `cleaned.replace`.
- **Llamadas directas en el cuerpo** [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1001), [`categories.find`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1002), [`normCategoryCode`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1004), [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1009), [`replace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1013), [`escapeRegExp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1021), [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1022), [`cleaned.replace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1022).
- **Lo usa** [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1036) (llama).

#### [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1029) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Prepara contenido JSX usando `button`, `React.Fragment`, `ArrowUp`, `ArrowDown`.

- **Entradas** `macro`, `key`, `controls = valor por defecto`, `onOpenMacro = valor por defecto`, `view = valor por defecto`, `isSelected = valor por defecto`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `React.Fragment`, `ArrowUp`, `ArrowDown`.
- **Llamadas directas en el cuerpo** [`getMacroDisplayTitle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1036), [`resolveAppTagLabels`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1037), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1038), [`resolveEnvTagLabels`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1039), [`badge`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1058), [`appTagLabels.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1064), [`short`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1074), [`roleTagLabels.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1079), [`envTagLabels.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1087).
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1352) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1044) · callback JSX · dentro de [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1029)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1045).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1119) · callback JSX · dentro de [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1029)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1120), [`event.stopPropagation`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1121), [`controls.onMoveUp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1122).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1138) · callback JSX · dentro de [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1029)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1139), [`event.stopPropagation`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1140), [`controls.onMoveDown`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1141).

#### [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Coordina cambios de estado durante `render Catalog`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Card`, `button`, `select`, `Search`, `input`, `Plus`, `ChevronDown`, `ChevronUp`.
- **Actualizaciones de estado o acciones** `setWorkspaceMacroSubgroup`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`USAGE_WINDOWS.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1261), [`APP_OPTIONS.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1287), [`LIFECYCLE_OPTIONS.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1302), [`GROUP_OPTIONS.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1329), [`workspaceLeftMacros.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1351), [`macroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1352), [`navigate`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1364), [`catalogGroups.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1377), [`categoryBadge`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1408), [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1426), [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1426), [`selectedGroupFlatMacros.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1431) y 3 más.
- **Lo usa** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1738) (llama).

#### [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166) · función · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Prepara contenido JSX usando `button`, `ArrowLeft`, `form`, `input`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ArrowLeft`, `form`, `input`, `textarea`, `select`, `TogglePills`, `Plus`.
- **Llamadas directas en el cuerpo** [`categoryOptions.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1205), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1216), [`THREAD_STATUS_ORDER.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1216).
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1426) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1188) · callback JSX · dentro de [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1188).

#### [`textarea.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1195) · callback JSX · dentro de [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1195).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1202) · callback JSX · dentro de [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1202).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1213) · callback JSX · dentro de [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1213).

#### [`TogglePills.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1226) · callback JSX · dentro de [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166)

Responde al evento de interfaz `TogglePills.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `values`.
- **Actualizaciones de estado o acciones** `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1226).

#### [`TogglePills.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1231) · callback JSX · dentro de [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166)

Responde al evento de interfaz `TogglePills.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `values`.
- **Actualizaciones de estado o acciones** `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1231).

#### [`TogglePills.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1236) · callback JSX · dentro de [`renderInlineAddWorkspace`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1166)

Responde al evento de interfaz `TogglePills.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `values`.
- **Actualizaciones de estado o acciones** `setWorkspaceAddForm`.
- **Llamadas directas en el cuerpo** [`setWorkspaceAddForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1236).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1265) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDefaultUsageWindow`.
- **Llamadas directas en el cuerpo** [`setDefaultUsageWindow`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1265).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1284) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setAppFilter`.
- **Llamadas directas en el cuerpo** [`setAppFilter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1284).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1298) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setMacroStatusFilter`.
- **Llamadas directas en el cuerpo** [`setMacroStatusFilter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1298).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1315) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setSearch`.
- **Llamadas directas en el cuerpo** [`setSearch`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1315).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1333) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setGroupBy`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `macroId`.
- **Llamadas directas en el cuerpo** [`setGroupBy`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1334), [`navigate`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1335).

#### [`onMoveUp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1360) · función · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Maneja `Move Up` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`moveMacroPriorityWithinList`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1360).

#### [`onMoveDown`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1361) · función · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Maneja `Move Down` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`moveMacroPriorityWithinList`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1361).

#### [`div.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1384) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `div.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedGroupKey`.
- **Llamadas directas en el cuerpo** [`setSelectedGroupKey`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1384).

#### [`div.onKeyDown`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1385) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `div.onKeyDown`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSelectedGroupKey`.
- **Condiciones que evalúa** `event.key`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1387), [`setSelectedGroupKey`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1388).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1463) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1464), [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1469), [`arr`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1474).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1497) · callback JSX · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCollapsedMacroGroups`.
- **Llamadas directas en el cuerpo** [`setCollapsedMacroGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1498).

#### [`onMoveUp`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1522) · función · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Maneja `Move Up` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`moveMacroPriorityWithinList`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1522).

#### [`onMoveDown`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1523) · función · dentro de [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1157)

Maneja `Move Down` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`moveMacroPriorityWithinList`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1523).

#### [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1555) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Prepara contenido JSX usando `Card`, `Link`, `ArrowLeft`, `form`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Card`, `Link`, `ArrowLeft`, `form`, `input`, `textarea`, `TogglePills`, `button`, `Trash2`, `Save`.
- **Condiciones que evalúa** `loading`, `ausencia de editingCategory`.
- **Lo usa** [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1738) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1582) · callback JSX · dentro de [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1555)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setCategoryEditForm`.
- **Llamadas directas en el cuerpo** [`setCategoryEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1582).

#### [`textarea.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1584) · callback JSX · dentro de [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1555)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setCategoryEditForm`.
- **Llamadas directas en el cuerpo** [`setCategoryEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1584).

#### [`TogglePills.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1588) · callback JSX · dentro de [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1555)

Responde al evento de interfaz `TogglePills.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `values`.
- **Actualizaciones de estado o acciones** `setCategoryEditForm`.
- **Llamadas directas en el cuerpo** [`setCategoryEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1588).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1591) · callback JSX · dentro de [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1555)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`triggerCategoryLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1591).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1592) · callback JSX · dentro de [`renderCategoryEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1555)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`triggerCategoryLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1592).

#### [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602) · función · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Prepara contenido JSX usando `Card`, `Link`, `ArrowLeft`, `form`.

- **Entradas** `workspace = valor por defecto`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Card`, `Link`, `ArrowLeft`, `form`, `input`, `textarea`, `select`, `TogglePills`, `button`, `Trash2`, `Save`.
- **Condiciones que evalúa** `loading`, `ausencia de editing`, `workspace`.
- **Llamadas directas en el cuerpo** [`s`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1632), [`categoryOptions.map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1646), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1647), [`THREAD_STATUS_ORDER.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1647).
- **Lo usa** [`renderCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1426) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1643) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setEditForm`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1643).

#### [`textarea.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1644) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setEditForm`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1644).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1646) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setEditForm`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1646).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1647) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setEditForm`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1647).

#### [`TogglePills.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1649) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `TogglePills.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `values`.
- **Actualizaciones de estado o acciones** `setEditForm`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1649).

#### [`TogglePills.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1650) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `TogglePills.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `values`.
- **Actualizaciones de estado o acciones** `setEditForm`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1650).

#### [`TogglePills.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1651) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `TogglePills.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `values`.
- **Actualizaciones de estado o acciones** `setEditForm`.
- **Llamadas directas en el cuerpo** [`setEditForm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1651).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1654) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMacroLifecycle`.
- **Llamadas directas en el cuerpo** [`setMacroLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1654).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1658) · callback JSX · dentro de [`renderEdit`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1602)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMacroLifecycle`.
- **Llamadas directas en el cuerpo** [`setMacroLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1658).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1732) · callback JSX · dentro de [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L182)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1732).
