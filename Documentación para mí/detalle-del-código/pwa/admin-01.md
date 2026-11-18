# PWA principal · Admin y operación · 1 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L1)
- [`apps/referidos-app/src/admin/apps/services/supportAppsService.js`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L1)
- [`apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L1)
- [`apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L1)
- [`apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L1)
- [`apps/referidos-app/src/admin/dashboard/dashboardProducts.js`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L1)
- [`apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L1)
- [`apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L1)
- [`apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L1)
- [`apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx`](../../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx#L1)
- [`apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L1)
- [`apps/referidos-app/src/admin/docs/docsRegistry.js`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L1)
- [`apps/referidos-app/src/admin/docs/MarkdownArticle.jsx`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L1)
- [`apps/referidos-app/src/admin/hooks/useAdminUser.js`](../../../apps/referidos-app/src/admin/hooks/useAdminUser.js#L1)
- [`apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L1)
- [`apps/referidos-app/src/admin/inicio/InicioCharts.jsx`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L1)
- [`apps/referidos-app/src/admin/inicio/InicioKPIs.jsx`](../../../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx#L1)
- [`apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L1)

Permite consultar y gestionar las aplicaciones del circuito de soporte. Las actualizaciones operativas pasan por el proxy OPS.

**Superficie que exporta.** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43).

**Módulos que lo cargan.** [`AdminApps.jsx`](../../../apps/referidos-app/src/pages/admin/AdminApps.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`./services/supportAppsService`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js).

#### [`getCountdownLabel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L12) · función

Obtiene o resuelve `Countdown Label` para entregarlo al consumidor.

- **Entradas** `purgeAfter`, `nowMs`.
- **Condiciones que evalúa** `ausencia de purgeAfter`, `ausencia de Number.isFinite`, `remainingMs`, `totalHours`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L14).
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L282) (llama).

#### [`emptyCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L24) · función

Implementa `empty Create Draft` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Retorno visible o tipo declarado** `appKey`, `appCode`, `displayName`, `originSourceDefault`, `aliasesInput`.
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L54) (llama), [`handleSelectApp`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L111) (llama), [`handleOpenCreate`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L118) (llama), [`handleCreate`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L147) (llama).

#### [`toEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L34) · función

Implementa `to Edit Draft` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `app`.
- **Retorno visible o tipo declarado** `appCode`, `displayName`, `originSourceDefault`, `aliasesInput`.
- **Usa código de** [`formatAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L22) (llama).
- **Llamadas directas en el cuerpo** [`formatAliasesInput`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L39).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L100) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L440) (llama).

#### [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43) · componente React · exportación por defecto

Monta `button`, `RefreshCw`, `X`, `Plus`, `input`, `select`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[apps, setApps] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[message, setMessage] mediante useState`, `[error, setError] mediante useState`, `[selectedAppId, setSelectedAppId] mediante useState`, `[editing, setEditing] mediante useState`, `[savingEdit, setSavingEdit] mediante useState`, `[createOpen, setCreateOpen] mediante useState`, `[creating, setCreating] mediante useState`, `[createDraft, setCreateDraft] mediante useState`, `[editDraft, setEditDraft] mediante useState`, `[nowMs, setNowMs] mediante useState`.
- **Interfaz que monta** `button`, `RefreshCw`, `X`, `Plus`, `input`, `select`, `Pencil`, `Check`, `Trash2`, `RotateCcw`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`formatAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L22) (llama).
- **Llamadas directas en el cuerpo** [`emptyCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L54), [`apps.map`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L280), [`getCountdownLabel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L282), [`formatAliasesInput`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L527).
- **Lo usa** [`AdminApps`](../../../apps/referidos-app/src/pages/admin/AdminApps.jsx#L11) (renderiza).

#### [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L63) · callback React · asíncrona · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Obtiene o resuelve `Apps` para entregarlo al consumidor.

- **Entradas** `silent = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setApps`, `setSelectedAppId`.
- **Condiciones que evalúa** `silent`, `current y rows.some`.
- **Usa código de** [`fetchSupportApps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L72) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L64), [`setLoading`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L65), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L66), [`fetchSupportApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L68), [`setApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L69), [`setSelectedAppId`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L70), [`rows.some`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L71).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L85) (llama), [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L86) (referencia), [`handleRefresh`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L105) (llama), [`handleCreate`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L148) (llama), [`handleSaveEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L179) (llama), [`handleSoftDelete`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L201) (llama), [`handleRestore`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L218) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L84) · callback de infraestructura · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminAppsPanel`.

- **Llamadas directas en el cuerpo** [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L85).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L88) · callback de infraestructura · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminAppsPanel`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L89), [`clearInterval`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L90).

#### [`setInterval · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L89) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L88)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setNowMs`.
- **Llamadas directas en el cuerpo** [`setNowMs`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L89).

#### [`selectedApp`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L94) · cálculo memorizado · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Procesa `ed App` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`apps.find`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L94).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L99) (referencia), [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L102) (referencia), [`handleSaveEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L158) (referencia), [`handleSoftDelete`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L188) (referencia), [`handleRestore`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L210) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L440) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L98) · callback de infraestructura · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminAppsPanel`.

- **Actualizaciones de estado o acciones** `setEditDraft`, `setEditing`.
- **Condiciones que evalúa** `ausencia de selectedApp`.
- **Llamadas directas en el cuerpo** [`setEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L100), [`toEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L100), [`setEditing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L101).

#### [`handleRefresh`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L104) · función · asíncrona · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Llamadas directas en el cuerpo** [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L105).
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L237) (pasa a onClick).

#### [`handleSelectApp`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L108) · función · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Maneja `Select App` y coordina las acciones indicadas abajo.

- **Entradas** `appId`.
- **Actualizaciones de estado o acciones** `setSelectedAppId`, `setCreateOpen`, `setCreateDraft`, `setMessage`, `setError`.
- **Llamadas directas en el cuerpo** [`setSelectedAppId`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L109), [`setCreateOpen`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L110), [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L111), [`emptyCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L111), [`setMessage`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L112), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L113).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L287) (llama).

#### [`handleOpenCreate`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L116) · función · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setCreateOpen`, `setCreateDraft`, `setEditing`, `setMessage`, `setError`.
- **Llamadas directas en el cuerpo** [`setCreateOpen`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L117), [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L118), [`emptyCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L118), [`setEditing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L119), [`setMessage`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L120), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L121).
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L262) (pasa a onClick).

#### [`handleCreate`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L124) · función · asíncrona · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setCreating`, `setMessage`, `setCreateOpen`, `setCreateDraft`, `setSelectedAppId`.
- **Usa código de** [`createSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L92) (llama), [`parseAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L14) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L125), [`trim`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L125), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L130), [`setCreating`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L134), [`setMessage`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L136), [`createSupportApp`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L138), [`parseAliasesInput`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L143), [`setCreateOpen`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L146), [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L147), [`emptyCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L147), [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L148), [`setSelectedAppId`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L149).
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L400) (pasa a onClick).

#### [`handleSaveEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L157) · función · asíncrona · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setSavingEdit`, `setMessage`, `setEditing`.
- **Condiciones que evalúa** `ausencia de selectedApp`, `ausencia de appCode o ausencia de displayName o ausencia de originSourceDefault`.
- **Usa código de** [`updateSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L122) (llama), [`parseAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L14) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L159), [`trim`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L159), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L163), [`setSavingEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L167), [`setMessage`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L169), [`updateSupportApp`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L171), [`parseAliasesInput`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L175), [`setEditing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L178), [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L179).
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L551) (pasa a onClick).

#### [`handleSoftDelete`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L187) · función · asíncrona · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSavingEdit`, `setError`, `setMessage`, `setSupportAppActive`, `setEditing`.
- **Condiciones que evalúa** `ausencia de selectedApp`, `ausencia de ok`.
- **Usa código de** [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L148) (llama).
- **Llamadas directas en el cuerpo** [`window.confirm`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L189), [`setSavingEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L194), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L195), [`setMessage`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L196), [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L198), [`setEditing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L200), [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L201).
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L563) (pasa a onClick).

#### [`handleRestore`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L209) · función · asíncrona · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSavingEdit`, `setError`, `setMessage`, `setSupportAppActive`, `setEditing`.
- **Condiciones que evalúa** `ausencia de selectedApp`.
- **Usa código de** [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L148) (llama).
- **Llamadas directas en el cuerpo** [`setSavingEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L211), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L212), [`setMessage`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L213), [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L215), [`setEditing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L217), [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L218).
- **Lo usa** [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L573) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L287) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSelectApp`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L287).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L332) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCreateDraft`.
- **Llamadas directas en el cuerpo** [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L333).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L345) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCreateDraft`.
- **Llamadas directas en el cuerpo** [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L346).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L358) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCreateDraft`.
- **Llamadas directas en el cuerpo** [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L359).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L371) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCreateDraft`.
- **Llamadas directas en el cuerpo** [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L372).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L390) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCreateDraft`.
- **Llamadas directas en el cuerpo** [`setCreateDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L391).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L425) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditing`, `setError`, `setMessage`.
- **Llamadas directas en el cuerpo** [`setEditing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L426), [`setError`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L427), [`setMessage`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L428).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L438) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditing`, `setEditDraft`.
- **Llamadas directas en el cuerpo** [`setEditing`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L439), [`setEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L440), [`toEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L440).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L469) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEditDraft`.
- **Llamadas directas en el cuerpo** [`setEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L470).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L487) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEditDraft`.
- **Llamadas directas en el cuerpo** [`setEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L488).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L505) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEditDraft`.
- **Llamadas directas en el cuerpo** [`setEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L506).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L529) · callback JSX · dentro de [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEditDraft`.
- **Llamadas directas en el cuerpo** [`setEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L530).

### [`apps/referidos-app/src/admin/apps/services/supportAppsService.js`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L1)

Envuelve acciones del registro de apps y dispara la sincronización de OPS hacia el runtime.

**Superficie que exporta.** [`parseAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L14), [`formatAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L22), [`dispatchSupportAppsSync`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L47), [`fetchSupportApps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L72), [`createSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L92), [`updateSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L122), [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L148).

**Módulos que lo cargan.** [`AdminAppsPanel.jsx`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L3) (importa).

**Dependencias del archivo.** [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`toUniqueLowerArray`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L3) · función

Implementa `to Unique Lower Array` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `values = valor por defecto`.
- **Retorno visible o tipo declarado** `lista`.
- **Condiciones que evalúa** `ausencia de Array.isArray`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L7), [`values.map`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L7), [`toLowerCase`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L8), [`trim`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L8).
- **Lo usa** [`parseAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L15) (llama), [`formatAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L23) (llama), [`createSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L103) (llama), [`updateSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L130) (llama).

#### [`parseAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L14) · función · exportado

Extrae o interpreta `Aliases Input` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toUniqueLowerArray`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L15), [`map`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L16), [`split`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L16), [`item.trim`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L18).
- **Lo usa** [`handleCreate`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L143) (llama), [`handleSaveEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L175) (llama).

#### [`formatAliasesInput`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L22) · función · exportado

Formatea `Aliases Input` para que el consumidor lo pueda presentar.

- **Entradas** `values`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L23), [`toUniqueLowerArray`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L23).
- **Lo usa** [`toEditDraft`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L39) (llama), [`AdminAppsPanel`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L527) (llama).

#### [`invokeSupportOps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L26) · función · asíncrona

Consulta o invoca Edge [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `action`, `payload = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportAppsService.js:27`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L27).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L27).
- **Lo usa** [`fetchSupportApps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L73) (llama), [`createSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L105) (llama), [`updateSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L132) (llama), [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L149) (llama).

#### [`dispatchSupportAppsSync`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L47) · función · asíncrona · exportado

Consulta o invoca Edge [`ops-support-apps-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{mode, forceFull, trigger} = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`ops-support-apps-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts) en [`supportAppsService.js:52`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L52).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L52).
- **Lo usa** [`fetchSupportApps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L79) (llama), [`createSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L114) (llama), [`updateSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L140) (llama), [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L154) (llama).

#### [`fetchSupportApps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L72) · función · asíncrona · exportado

Consulta o invoca acción de proxy `list_support_apps` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Contrato de datos** acción de proxy `list_support_apps` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportAppsService.js:73`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L73).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L73), [`dispatchSupportAppsSync`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L79).
- **Lo usa** [`loadApps`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L68) (llama).

#### [`createSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L92) · función · asíncrona · exportado

Consulta o invoca acción de proxy `create_support_app` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Contrato de datos** acción de proxy `create_support_app` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportAppsService.js:105`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L105).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L93), [`trim`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L93), [`toUniqueLowerArray`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L103), [`invokeSupportOps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L105), [`dispatchSupportAppsSync`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L114).
- **Lo usa** [`handleCreate`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L138) (llama).

#### [`updateSupportApp`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L122) · función · asíncrona · exportado

Consulta o invoca acción de proxy `update_support_app` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `appId`, `payload`.
- **Contrato de datos** acción de proxy `update_support_app` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportAppsService.js:132`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L132).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L123), [`trim`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L123), [`toUniqueLowerArray`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L130), [`invokeSupportOps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L132), [`dispatchSupportAppsSync`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L140).
- **Lo usa** [`handleSaveEdit`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L171) (llama).

#### [`setSupportAppActive`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L148) · función · asíncrona · exportado

Consulta o invoca acción de proxy `set_support_app_active` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `appId`, `active`.
- **Contrato de datos** acción de proxy `set_support_app_active` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportAppsService.js:149`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L149).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L149), [`dispatchSupportAppsSync`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L154).
- **Lo usa** [`handleSoftDelete`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L198) (llama), [`handleRestore`](../../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx#L215) (llama).

### [`apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L1)

Presenta el área de analítica del dashboard y selecciona el panel según el producto.

**Superficie que exporta.** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L47).

**Módulos que lo cargan.** [`AdminDashboardAnalytics.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDashboardAnalytics.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`../ops/useOpsTelemetryHotSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js), [`../prelaunch/PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx), [`./dashboardProducts`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js), [`./hooks/useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js).

#### [`formatDate`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L9) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L12), [`date.toLocaleString`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L13).
- **Lo usa** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L91) (llama).

#### [`ProductTabs`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L22) · componente React

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{selectedProduct, onSelect}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Usa código de** [`DASHBOARD_PRODUCTS`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`DASHBOARD_PRODUCTS.map`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L25).
- **Lo usa** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L96) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L31) · callback JSX · dentro de [`ProductTabs`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L22)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onSelect`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L31).

#### [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L47) · componente React · exportación por defecto

Monta `ProductTabs`, `PrelaunchAnalyticsPanel`, `Rocket`, `BarChart3`, `Activity`, `Clock3`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ProductTabs`, `PrelaunchAnalyticsPanel`, `Rocket`, `BarChart3`, `Activity`, `Clock3`.
- **Hooks que llama** `useSearchParams`, `useDashboardProdVersions`, `useOpsTelemetryHotSync`.
- **Usa código de** [`normalizeDashboardProductKey`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L16) (llama), [`getDashboardProductMeta`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L22) (llama), [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15) (llama), [`useOpsTelemetryHotSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L6) (llama), [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159) (renderiza).
- **Llamadas directas en el cuerpo** [`normalizeDashboardProductKey`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L49), [`searchParams.get`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L49), [`getDashboardProductMeta`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L50), [`products.find`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L52), [`trim`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L89), [`formatDate`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L91).
- **Lo usa** [`AdminDashboardAnalytics`](../../../apps/referidos-app/src/pages/admin/AdminDashboardAnalytics.jsx#L11) (renderiza).

#### [`handleSelectProduct`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L62) · función · dentro de [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L47)

Atiende `ProductTabs.onSelect` y aplica la acción vinculada a ese control.

- **Entradas** `productKey`.
- **Recibe eventos de** `ProductTabs.onSelect`.
- **Actualizaciones de estado o acciones** `setSearchParams`.
- **Usa código de** [`normalizeDashboardProductKey`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L16) (llama).
- **Llamadas directas en el cuerpo** [`next.set`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L64), [`normalizeDashboardProductKey`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L64), [`setSearchParams`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L65).
- **Lo usa** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L98) (pasa a onSelect).

### [`apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L1)

Muestra eventos de un grupo de fallos de ingestión y navega su paginación. El cambio local reemplaza el JSON del evento por metadatos de tamaño y forma.

**Superficie que exporta.** [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113).

**Módulos que lo cargan.** [`AdminDashboardDlqEvents.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDashboardDlqEvents.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`./services/opsTelemetryDlqService`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js).

#### [`PAGE_SIZE`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L6) · variable de módulo

Declara `PAGE_SIZE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loadEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L136) (referencia), [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L168) (referencia).

#### [`formatDateTime`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L8) · función

Formatea `Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L11), [`date.toLocaleString`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L12).
- **Lo usa** [`EventCard`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L52) (llama), [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L192) (llama).

#### [`labelOrFallback`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L23) · función

Formatea `Or Fallback` para que el consumidor lo pueda presentar.

- **Entradas** `value`, `fallback`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L24).
- **Lo usa** [`EventCard`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L42) (llama), [`currentGroupMeta`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L161) (llama).

#### [`formatBytes`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L27) · función

Formatea `Bytes` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de Number.isFinite o bytes`, `bytes`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L31).
- **Lo usa** [`EventCard`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L81) (llama).

#### [`EventCard`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L36) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{event}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`labelOrFallback`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L42), [`formatDateTime`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L52), [`formatBytes`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L81), [`map`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L96).
- **Lo usa** [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L236) (renderiza).

#### [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113) · componente React · exportación por defecto

Monta `button`, `ArrowLeft`, `RefreshCw`, `EventCard`, `ChevronLeft`, `ChevronRight`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[events, setEvents] mediante useState`, `[totalCount, setTotalCount] mediante useState`, `[nextPurgeAt, setNextPurgeAt] mediante useState`, `[page, setPage] mediante useState`.
- **Interfaz que monta** `button`, `ArrowLeft`, `RefreshCw`, `EventCard`, `ChevronLeft`, `ChevronRight`.
- **Hooks que llama** `useNavigate`, `useSearchParams`, `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L116), [`searchParams.get`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L116), [`formatDateTime`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L192), [`events.map`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L235).
- **Lo usa** [`AdminDashboardDlqEvents`](../../../apps/referidos-app/src/pages/admin/AdminDashboardDlqEvents.jsx#L11) (renderiza).

#### [`loadEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L125) · callback React · asíncrona · dentro de [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113)

Obtiene o resuelve el valor de eventos para entregarlo al consumidor.

- **Entradas** `{silent, targetPage} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setEvents`, `setTotalCount`, `setNextPurgeAt`, `setPage`.
- **Condiciones que evalúa** `silent`.
- **Usa código de** [`fetchDlqPurgeEvents`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L127), [`setLoading`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L129), [`setError`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L131), [`fetchDlqPurgeEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L134), [`setEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L139), [`setTotalCount`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L140), [`setNextPurgeAt`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L141), [`trim`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L141), [`setPage`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L142).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L155) (llama), [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L156) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L208) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L247) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L256) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L154) · callback de infraestructura · dentro de [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminDashboardDlqEventsPanel`.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L155).

#### [`currentGroupMeta`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L158) · cálculo memorizado · dentro de [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113)

Función auxiliar de `AdminDashboardDlqEventsPanel` para `current Group Meta`.

- **Retorno visible o tipo declarado** `null`, `reason`, `domain`, `sourceProject`, `sourceEnv`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de events.length`.
- **Llamadas directas en el cuerpo** [`labelOrFallback`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L161).
- **Lo usa** [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L196) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L177) · callback JSX · dentro de [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L177).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L208) · callback JSX · dentro de [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L208).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L247) · callback JSX · dentro de [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L247).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L256) · callback JSX · dentro de [`AdminDashboardDlqEventsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L113)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L256).

### [`apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L1)

Resume versiones, métricas por producto y estado de la cola en la portada del dashboard.

**Superficie que exporta.** [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L70).

**Módulos que lo cargan.** [`AdminDashboard.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`./hooks/useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js), [`./OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx).

#### [`formatDate`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L7) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L10), [`date.toLocaleString`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L11).
- **Lo usa** [`ProductCard`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L27) (llama).

#### [`ProductCard`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L20) · componente React

Monta `button`, `Rocket`, `MonitorSmartphone`, `ArrowRight`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{product, onSelect}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `Rocket`, `MonitorSmartphone`, `ArrowRight`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L22), [`formatDate`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L27).
- **Lo usa** [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L121) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L32) · callback JSX · dentro de [`ProductCard`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L20)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onSelect`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L32).

#### [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L70) · componente React · exportación por defecto

Monta `button`, `RefreshCw`, `ProductCard`, `OpsTelemetryDlqPanel`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `RefreshCw`, `ProductCard`, `OpsTelemetryDlqPanel`.
- **Hooks que llama** `useNavigate`, `useDashboardProdVersions`.
- **Usa código de** [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15) (llama), [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88) (renderiza).
- **Llamadas directas en el cuerpo** [`products.map`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L120).
- **Lo usa** [`AdminDashboard`](../../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx#L11) (renderiza).

#### [`handleSelect`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L74) · función · dentro de [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L70)

Atiende `ProductCard.onSelect` y aplica la acción vinculada a ese control.

- **Entradas** `productKey`.
- **Recibe eventos de** `ProductCard.onSelect`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L75), [`encodeURIComponent`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L75).
- **Lo usa** [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L124) (pasa a onSelect).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L97) · callback JSX · dentro de [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L70)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`reload`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L97).

### [`apps/referidos-app/src/admin/dashboard/dashboardProducts.js`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L1)

Define productos y etiquetas para que overview, analítica y versiones se refieran a las mismas claves.

**Superficie que exporta.** [`DASHBOARD_PRODUCTS`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L1), [`normalizeDashboardProductKey`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L16), [`getDashboardProductMeta`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L22).

**Módulos que lo cargan.** [`AdminDashboardAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L6) (importa), [`useDashboardProdVersions.js`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L3) (importa).

#### [`DASHBOARD_PRODUCTS`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L1) · variable de módulo · exportado

Conserva la lista de `DASHBOARD PRODUCTS` usada por el módulo.

- **Lo usa** [`getDashboardProductMeta`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L24) (accede al módulo), [`ProductTabs`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L25) (accede al módulo), [`products`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L51) (accede al módulo).

#### [`normalizeDashboardProductKey`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L16) · función · exportado

Normaliza `Dashboard Product Key` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L17), [`trim`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L17).
- **Lo usa** [`getDashboardProductMeta`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L24) (llama), [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L49) (llama), [`handleSelectProduct`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L64) (llama).

#### [`getDashboardProductMeta`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L22) · función · exportado

Obtiene o resuelve `Dashboard Product Meta` para entregarlo al consumidor.

- **Entradas** `productKey`.
- **Llamadas directas en el cuerpo** [`DASHBOARD_PRODUCTS.find`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L24), [`normalizeDashboardProductKey`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L24).
- **Lo usa** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L50) (llama).

### [`apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L1)

Carga las versiones de producción que se presentan junto a los productos del dashboard.

**Superficie que exporta.** [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15).

**Módulos que lo cargan.** [`AdminDashboardAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L7) (importa), [`AdminDashboardOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L4) (importa).

**Dependencias del archivo.** `react`, [`../../versioning/services/versioningService`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js), [`../dashboardProducts`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js).

#### [`toReleaseMap`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L5) · función

Implementa `to Release Map` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rows = valor por defecto`.
- **Condiciones que evalúa** `ausencia de productKey o map.has`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L8), [`trim`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L8), [`map.has`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L9), [`map.set`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L10).
- **Lo usa** [`releaseByProduct`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L47) (llama).

#### [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15) · hook React · exportado

Agrupa estado, contexto o efectos de `Dashboard Prod Versions` para sus consumidores React.

- **Retorno visible o tipo declarado** `loading`, `refreshing`, `error`, `products`, `reload`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[rows, setRows] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Lo usa** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L51) (llama), [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L72) (llama).

#### [`reload`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L21) · callback React · asíncrona · dentro de [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15)

Coordina cambios de estado durante `reload`.

- **Entradas** `{silent} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `silent`.
- **Usa código de** [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L94) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L23), [`setLoading`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L25), [`setError`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L27), [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L30), [`setRows`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L31).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L44) (llama), [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L45) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L43) · callback de infraestructura · dentro de [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useDashboardProdVersions`.

- **Llamadas directas en el cuerpo** [`reload`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L44).

#### [`releaseByProduct`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L47) · cálculo memorizado · dentro de [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15)

Función auxiliar de `useDashboardProdVersions` para `release By Product`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`toReleaseMap`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L47).
- **Lo usa** [`products`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L53) (accede al módulo).

#### [`products`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L50) · cálculo memorizado · dentro de [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L15)

Función auxiliar de `useDashboardProdVersions` para `products`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`DASHBOARD_PRODUCTS`](../../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`DASHBOARD_PRODUCTS.map`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L51), [`releaseByProduct.get`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L53).
- **Lo usa** [`useDashboardProdVersions`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L62) (referencia).

### [`apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L1)

Muestra el agregado de la cola de eventos fallidos y permite navegar hacia su desglose.

**Superficie que exporta.** [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88).

**Módulos que lo cargan.** [`AdminDashboardOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`./services/opsTelemetryDlqService`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js).

#### [`formatDateTime`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L6) · función

Formatea `Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L9), [`date.toLocaleString`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L10).
- **Lo usa** [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L182) (llama).

#### [`formatCompactDateTime`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L20) · función

Formatea `Compact Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L23), [`date.toLocaleString`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L24).
- **Lo usa** [`GroupCard`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L76) (llama).

#### [`formatBytes`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L33) · función

Formatea `Bytes` para que el consumidor lo pueda presentar.

- **Entradas** `bytes`.
- **Condiciones que evalúa** `bytes`, `ausencia de Number.isFinite o value`, `value`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L38).
- **Lo usa** [`GroupCard`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L75) (llama), [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L195) (llama).

#### [`labelOrFallback`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L43) · función

Formatea `Or Fallback` para que el consumidor lo pueda presentar.

- **Entradas** `value`, `fallback`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L44).
- **Lo usa** [`GroupCard`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L48) (llama).

#### [`GroupCard`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L47) · componente React

Monta `button`, `ArrowRight`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{group, onOpen}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ArrowRight`.
- **Llamadas directas en el cuerpo** [`labelOrFallback`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L48), [`formatBytes`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L75), [`formatCompactDateTime`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L76).
- **Lo usa** [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L220) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L56) · callback JSX · dentro de [`GroupCard`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L47)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onOpen`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L56).

#### [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88) · componente React · exportación por defecto

Monta `Trash2`, `button`, `RefreshCw`, `AlertTriangle`, `GroupCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[summary, setSummary] mediante useState`, `[groups, setGroups] mediante useState`.
- **Interfaz que monta** `Trash2`, `button`, `RefreshCw`, `AlertTriangle`, `GroupCard`.
- **Hooks que llama** `useNavigate`, `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`formatDateTime`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L182), [`formatBytes`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L195), [`groups.map`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L219).
- **Lo usa** [`AdminDashboardOverviewPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx#L128) (renderiza).

#### [`reload`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L96) · callback React · asíncrona · dentro de [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88)

Coordina cambios de estado durante `reload`.

- **Entradas** `{silent} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setSummary`, `setGroups`.
- **Condiciones que evalúa** `silent`.
- **Usa código de** [`fetchDlqPurgePreview`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L24) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L98), [`setLoading`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L100), [`setError`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L102), [`fetchDlqPurgePreview`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L105), [`setSummary`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L106), [`setGroups`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L107).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L120) (llama), [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L121) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L157) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L119) · callback de infraestructura · dentro de [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `OpsTelemetryDlqPanel`.

- **Llamadas directas en el cuerpo** [`reload`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L120).

#### [`headline`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L123) · cálculo memorizado · dentro de [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88)

Función auxiliar de `OpsTelemetryDlqPanel` para `headline`.

- **Retorno visible o tipo declarado** `totalEvents`, `totalGroups`, `totalBytes`, `nextPurgeAt`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L182) (accede al módulo).

#### [`openGroup`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L130) · función · dentro de [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88)

Atiende `GroupCard.onOpen` y aplica la acción vinculada a ese control.

- **Entradas** `groupKey = valor por defecto`.
- **Recibe eventos de** `GroupCard.onOpen`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `groupKey`.
- **Llamadas directas en el cuerpo** [`search.set`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L133), [`navigate`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L135), [`search.toString`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L135).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L206) (llama), [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L223) (pasa a onOpen).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L157) · callback JSX · dentro de [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`reload`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L157).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L206) · callback JSX · dentro de [`OpsTelemetryDlqPanel`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L88)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openGroup`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L206).

### [`apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L1)

Invoca ops-telemetry-admin-proxy y traduce acciones de resumen, grupos y eventos a respuestas del panel.

**Superficie que exporta.** [`fetchDlqPurgePreview`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L24), [`fetchDlqPurgeEvents`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L28).

**Módulos que lo cargan.** [`AdminDashboardDlqEventsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L4) (importa), [`OpsTelemetryDlqPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L4) (importa).

**Dependencias del archivo.** [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`invokeOpsTelemetryAdmin`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L3) · función · asíncrona

Consulta o invoca Edge [`ops-telemetry-admin-proxy`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `action`, `payload = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`ops-telemetry-admin-proxy`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts) en [`opsTelemetryDlqService.js:4`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L4).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L4).
- **Lo usa** [`fetchDlqPurgePreview`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L25) (llama), [`fetchDlqPurgeEvents`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L33) (llama).

#### [`fetchDlqPurgePreview`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L24) · función · asíncrona · exportado

Obtiene o resuelve `Dlq Purge Preview` para entregarlo al consumidor.

- **Entradas** `{limit} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeOpsTelemetryAdmin`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L25).
- **Lo usa** [`reload`](../../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx#L105) (llama).

#### [`fetchDlqPurgeEvents`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L28) · función · asíncrona · exportado

Obtiene o resuelve `Dlq Purge Events` para entregarlo al consumidor.

- **Entradas** `{groupKey, limit, offset} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeOpsTelemetryAdmin`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L33).
- **Lo usa** [`loadEvents`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx#L134) (llama).

### [`apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx`](../../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx#L1)

Contiene las gráficas que se presentan en el área de datos administrativos.

**Superficie que exporta.** [`ChartsAvanzados`](../../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx#L6).

**Módulos que lo cargan.** [`AdminDatos.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDatos.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`ChartsAvanzados`](../../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx#L6) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `BarChart3`, `PieChart`, `TrendingDown`, `Activity`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `BarChart3`, `PieChart`, `TrendingDown`, `Activity`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx#L39), [`funnel.map`](../../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx#L100).
- **Lo usa** [`AdminDatos`](../../../apps/referidos-app/src/pages/admin/AdminDatos.jsx#L12) (renderiza).

### [`apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L1)

Monta el navegador interno de documentación operativa con artículos del registro.

**Superficie que exporta.** [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10).

**Módulos que lo cargan.** [`AdminDocumentation.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDocumentation.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`./docsRegistry`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js), [`./MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx).

#### [`byTitleAsc`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L6) · función

Implementa `by Title Asc` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`, `b`.
- **Llamadas directas en el cuerpo** [`localeCompare`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L7).
- **Lo usa** [`docsForGroup`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L27) (referencia).

#### [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10) · componente React · exportación por defecto

Monta `button`, `Search`, `input`, `BookOpen`, `FileText`, `MarkdownArticle`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[activeGroup, setActiveGroup] mediante useState`, `[search, setSearch] mediante useState`, `[activeDocId, setActiveDocId] mediante useState`.
- **Interfaz que monta** `button`, `Search`, `input`, `BookOpen`, `FileText`, `MarkdownArticle`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`DOC_GROUPS`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L17) (accede al módulo), [`MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L234) (renderiza).
- **Llamadas directas en el cuerpo** [`DOC_GROUPS.map`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L49), [`docsForGroup.map`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L84).
- **Lo usa** [`AdminDocumentation`](../../../apps/referidos-app/src/pages/admin/AdminDocumentation.jsx#L11) (renderiza).

#### [`docsForGroup`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L15) · cálculo memorizado · dentro de [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10)

Función auxiliar de `AdminDocumentationPanel` para `docs For Group`.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de query`.
- **Usa código de** [`DOCS_REGISTRY`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L24) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L16), [`search.trim`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L16), [`sort`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L17), [`filter`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L17), [`DOCS_REGISTRY.filter`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L17), [`includes`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L22), [`doc.title.toLowerCase`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L22), [`doc.pathLabel.toLowerCase`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L23).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L31) (accede al módulo), [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L38) (referencia), [`activeDoc`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L41) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L30) · callback de infraestructura · dentro de [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminDocumentationPanel`.

- **Actualizaciones de estado o acciones** `setActiveDocId`.
- **Condiciones que evalúa** `ausencia de docsForGroup.length`, `ausencia de docsForGroup.some`.
- **Llamadas directas en el cuerpo** [`setActiveDocId`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L32), [`docsForGroup.some`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L35).

#### [`activeDoc`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L41) · cálculo memorizado · dentro de [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10)

Función auxiliar de `AdminDocumentationPanel` para `active Doc`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`docsForGroup.find`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L41).
- **Lo usa** [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L116) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L53) · callback JSX · dentro de [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveGroup`.
- **Llamadas directas en el cuerpo** [`setActiveGroup`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L53).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L70) · callback JSX · dentro de [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSearch`.
- **Llamadas directas en el cuerpo** [`setSearch`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L70).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L90) · callback JSX · dentro de [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveDocId`.
- **Llamadas directas en el cuerpo** [`setActiveDocId`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L90).

### [`apps/referidos-app/src/admin/docs/docsRegistry.js`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L1)

Selecciona y organiza los artículos que están disponibles en el panel interno, con sus identificadores de navegación.

**Superficie que exporta.** [`DOC_GROUPS`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L17), [`DOCS_REGISTRY`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L24).

**Módulos que lo cargan.** [`AdminDocumentationPanel.jsx`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L3) (importa).

**Dependencias del archivo.** [`../../../../../README.md?raw`](../../../README.md), [`../../../../../docs/README.md?raw`](../../../docs/README.md), [`../../../../../docs/versioning-system.md?raw`](../../../docs/versioning-system.md), [`../../../../../docs/referidos-system/README.md?raw`](../../../docs/referidos-system/README.md), [`../../../../../docs/referidos-system/operacion-sin-pr-netlify.md?raw`](../../../docs/referidos-system/operacion-sin-pr-netlify.md), [`../../../../../docs/referidos-system/entornos-y-secrets.md?raw`](../../../docs/referidos-system/entornos-y-secrets.md), [`../../../../../docs/referidos-system/support-macros-ops-cache.md?raw`](../../../docs/referidos-system/support-macros-ops-cache.md), [`../../../docs/README.md?raw`](../../../apps/referidos-app/docs/README.md), [`../../../../../apps/prelaunch/docs/README.md?raw`](../../../apps/prelaunch/docs/README.md), [`../../../../../apps/referidos-android/docs/README.md?raw`](../../../apps/referidos-android/docs/README.md), [`../../../../../apps/referidos-android/README.md?raw`](../../../apps/referidos-android/README.md), [`../../../../../docs/android-migration-plan.md?raw`](../../../docs/android-migration-plan.md), [`../../../../../docs/android-parity-checklist.md?raw`](../../../docs/android-parity-checklist.md), [`../../../../../docs/android-phase-playbook.md?raw`](../../../docs/android-phase-playbook.md), [`../../../../../docs/referidos-system/android-support-cleanup-pending.md?raw`](../../../docs/referidos-system/android-support-cleanup-pending.md).

#### [`DOC_GROUPS`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L17) · variable de módulo · exportado

Conserva la lista de `DOC GROUPS` usada por el módulo.

- **Lo usa** [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L11) (accede al módulo).

#### [`DOCS_REGISTRY`](../../../apps/referidos-app/src/admin/docs/docsRegistry.js#L24) · variable de módulo · exportado

Conserva la lista de `DOCS REGISTRY` usada por el módulo.

- **Usa código de** [`repoRootReadme`](../../../README.md) (referencia), [`docsIndex`](../../../docs/README.md) (referencia), [`docsVersioningCore`](../../../docs/referidos-system/README.md) (referencia), [`docsVersioningQuick`](../../../docs/versioning-system.md) (referencia), [`docsVersioningNoPrNetlify`](../../../docs/referidos-system/operacion-sin-pr-netlify.md) (referencia), [`docsEnvsSecrets`](../../../docs/referidos-system/entornos-y-secrets.md) (referencia), [`docsSupportMacrosOpsCache`](../../../docs/referidos-system/support-macros-ops-cache.md) (referencia), [`pwaDocsReadme`](../../../apps/referidos-app/docs/README.md) (referencia), [`prelaunchDocsReadme`](../../../apps/prelaunch/docs/README.md) (referencia), [`androidDocsReadme`](../../../apps/referidos-android/docs/README.md) (referencia) y 5 más.
- **Lo usa** [`docsForGroup`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L17) (accede al módulo).

### [`apps/referidos-app/src/admin/docs/MarkdownArticle.jsx`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L1)

Renderiza bloques Markdown para mostrar los artículos de operación dentro de la app admin.

**Superficie que exporta.** [`MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L234).

**Módulos que lo cargan.** [`AdminDocumentationPanel.jsx`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L4) (importa), [`AdminLegalPanel.jsx`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`renderInlineMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L3) · función

Implementa `render Inline Markdown` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `text`, `keyPrefix = valor por defecto`.
- **Efectos y APIs** `parts.push`.
- **Condiciones que evalúa** `match.index`, `linkLabel y linkHref`, `boldText`, `codeText`, `italicText`, `lastIndex`.
- **Llamadas directas en el cuerpo** [`tokenPattern.exec`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L11), [`parts.push`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L15), [`value.slice`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L15), [`test`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L22).
- **Lo usa** [`BlockRenderer`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L183) (llama).

#### [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L69) · función

Extrae o interpreta `Markdown` de los argumentos, estado o datos de entrada.

- **Entradas** `markdownText`.
- **Efectos y APIs** `codeLines.push`, `blocks.push`, `bulletList.push`, `orderedList.push`, `paragraph.push`.
- **Condiciones que evalúa** `inCode`, `startsWith`, `trimmed.startsWith`, `ausencia de trimmed`, `headingMatch`, `bulletMatch`, `orderedMatch`.
- **Llamadas directas en el cuerpo** [`split`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L70), [`startsWith`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L112), [`line.trim`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L112), [`flushCode`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L114), [`codeLines.push`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L116), [`trimmed.startsWith`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L123), [`flushAll`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L124), [`trim`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L126), [`trimmed.slice`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L126), [`trimmed.match`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L135), [`blocks.push`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L138), [`flushParagraph`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L148) y 5 más.
- **Lo usa** [`blocks`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L235) (llama).

#### [`flushParagraph`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L79) · función · dentro de [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L69)

Coordina `Paragraph` con la planificación o reintento del flujo.

- **Efectos y APIs** `blocks.push`.
- **Condiciones que evalúa** `ausencia de paragraph.length`.
- **Llamadas directas en el cuerpo** [`blocks.push`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L81), [`paragraph.join`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L81).
- **Lo usa** [`flushAll`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L105) (llama), [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L148) (llama).

#### [`flushBulletList`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L85) · función · dentro de [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L69)

Coordina `Bullet List` con la planificación o reintento del flujo.

- **Efectos y APIs** `blocks.push`.
- **Condiciones que evalúa** `ausencia de bulletList.length`.
- **Llamadas directas en el cuerpo** [`blocks.push`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L87).
- **Lo usa** [`flushAll`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L106) (llama), [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L157) (llama).

#### [`flushOrderedList`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L91) · función · dentro de [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L69)

Coordina `Ordered List` con la planificación o reintento del flujo.

- **Efectos y APIs** `blocks.push`.
- **Condiciones que evalúa** `ausencia de orderedList.length`.
- **Llamadas directas en el cuerpo** [`blocks.push`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L93).
- **Lo usa** [`flushAll`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L107) (llama), [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L149) (llama).

#### [`flushCode`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L97) · función · dentro de [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L69)

Coordina `Code` con la planificación o reintento del flujo.

- **Efectos y APIs** `blocks.push`.
- **Condiciones que evalúa** `ausencia de codeLines.length`.
- **Llamadas directas en el cuerpo** [`blocks.push`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L99), [`codeLines.join`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L99).
- **Lo usa** [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L114) (llama).

#### [`flushAll`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L104) · función · dentro de [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L69)

Coordina `All` con la planificación o reintento del flujo.

- **Llamadas directas en el cuerpo** [`flushParagraph`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L105), [`flushBulletList`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L106), [`flushOrderedList`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L107).
- **Lo usa** [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L124) (llama).

#### [`headingClass`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L170) · función

Implementa `heading Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `level`.
- **Condiciones que evalúa** `level`.
- **Lo usa** [`BlockRenderer`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L182) (llama).

#### [`BlockRenderer`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L178) · componente React

Monta `Tag`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{block, index}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Tag`.
- **Condiciones que evalúa** `block.type`.
- **Llamadas directas en el cuerpo** [`headingClass`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L182), [`renderInlineMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L183), [`block.items.map`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L191).
- **Lo usa** [`MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L248) (renderiza).

#### [`MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L234) · componente React · exportación por defecto

Monta `BlockRenderer`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{markdown}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `BlockRenderer`.
- **Condiciones que evalúa** `ausencia de blocks.length`.
- **Llamadas directas en el cuerpo** [`blocks.map`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L247).
- **Lo usa** [`AdminDocumentationPanel`](../../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx#L122) (renderiza), [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L202) (renderiza).

#### [`blocks`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L235) · cálculo memorizado · dentro de [`MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L234)

Función auxiliar de `MarkdownArticle` para `blocks`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`parseMarkdown`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L235).
- **Lo usa** [`MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L237) (accede al módulo).

### [`apps/referidos-app/src/admin/hooks/useAdminUser.js`](../../../apps/referidos-app/src/admin/hooks/useAdminUser.js#L1)

Proporciona al área de admin el estado y resolución del usuario ya autenticado.

**Superficie que exporta.** [`useAdminUser`](../../../apps/referidos-app/src/admin/hooks/useAdminUser.js#L2).

#### [`useAdminUser`](../../../apps/referidos-app/src/admin/hooks/useAdminUser.js#L2) · hook React · exportado

Agrupa estado, contexto o efectos de `Admin User` para sus consumidores React.

- **Retorno visible o tipo declarado** `loading`, `data`, `error`.

### [`apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L1)

Muestra un recordatorio local de renovación de credenciales de GitHub y guarda la fecha registrada. Las credenciales se gestionan fuera del navegador.

**Superficie que exporta.** [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21).

**Módulos que lo cargan.** [`AdminInicio.jsx`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`STORAGE_KEY`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L4) · variable de módulo

Declara `STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L26) (referencia), [`persistDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L57) (referencia).

#### [`TOKEN_VALID_DAYS`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L5) · variable de módulo

Declara `TOKEN_VALID_DAYS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`computed`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L43) (referencia), [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L90) (referencia).

#### [`DAY_MS`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L6) · variable de módulo

Declara `DAY_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`computed`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L43) (referencia).

#### [`toDateInputValue`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L8) · función

Implementa `to Date Input Value` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `date`.
- **Llamadas directas en el cuerpo** [`date.getFullYear`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L9), [`padStart`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L10), [`date.getMonth`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L10), [`date.getDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L11).
- **Lo usa** [`handleRenewToday`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L73) (llama).

#### [`parseStoredDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L15) · función

Extrae o interpreta `Stored Date` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de value o string`.
- **Llamadas directas en el cuerpo** [`parsed.getTime`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L18).
- **Lo usa** [`computed`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L33) (llama).

#### [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21) · componente React · exportación por defecto

Monta `KeyRound`, `button`, `RefreshCw`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[lastRenewedInput, setLastRenewedInput] mediante useState`, `[savedMessage, setSavedMessage] mediante useState`.
- **Interfaz que monta** `KeyRound`, `button`, `RefreshCw`, `input`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`computed.nextDate.toLocaleDateString`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L134).
- **Lo usa** [`AdminInicio`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L17) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L25) · callback de infraestructura · dentro de [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `GithubTokenRenewalCard`.

- **Actualizaciones de estado o acciones** `setLastRenewedInput`.
- **Efectos y APIs** `window.localStorage.getItem`.
- **Condiciones que evalúa** `stored`.
- **Llamadas directas en el cuerpo** [`window.localStorage.getItem`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L26), [`setLastRenewedInput`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L28).

#### [`computed`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L32) · cálculo memorizado · dentro de [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21)

Función auxiliar de `GithubTokenRenewalCard` para `computed`.

- **Retorno visible o tipo declarado** `hasDate`, `nextDate`, `remainingDays`, `expired`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de baseDate`.
- **Llamadas directas en el cuerpo** [`parseStoredDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L33), [`baseDate.getTime`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L43), [`nextDate.getTime`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L45), [`now.getTime`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L45).
- **Lo usa** [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L129) (accede al módulo).

#### [`persistDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L55) · función · dentro de [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21)

Aplica o guarda el valor de fecha para que el estado refleje la operación.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setLastRenewedInput`, `setSavedMessage`, `setItem`.
- **Efectos y APIs** `window.localStorage.removeItem`, `window.localStorage.setItem`.
- **Condiciones que evalúa** `ausencia de value`.
- **Llamadas directas en el cuerpo** [`window.localStorage.removeItem`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L57), [`setLastRenewedInput`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L58), [`setSavedMessage`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L59), [`window.localStorage.setItem`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L63).
- **Lo usa** [`handleSaveDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L69) (llama), [`handleRenewToday`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L74) (llama).

#### [`handleSaveDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L68) · función · dentro de [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Llamadas directas en el cuerpo** [`persistDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L69).
- **Lo usa** [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L120) (pasa a onClick).

#### [`handleRenewToday`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L72) · función · dentro de [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSavedMessage`.
- **Llamadas directas en el cuerpo** [`toDateInputValue`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L73), [`persistDate`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L74), [`setSavedMessage`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L75).
- **Lo usa** [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L97) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L115) · callback JSX · dentro de [`GithubTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L21)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setLastRenewedInput`.
- **Llamadas directas en el cuerpo** [`setLastRenewedInput`](../../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx#L115).

### [`apps/referidos-app/src/admin/inicio/InicioCharts.jsx`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L1)

Agrupa gráficas presentadas en el inicio de administración.

**Superficie que exporta.** [`InicioCharts`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L6).

**Módulos que lo cargan.** [`AdminInicio.jsx`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`InicioCharts`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L6) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `TrendingUp`, `Sparkles`, `BarChart3`, `ArrowUpRight`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `TrendingUp`, `Sparkles`, `BarChart3`, `ArrowUpRight`.
- **Llamadas directas en el cuerpo** [`qrBars.map`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L40), [`userBars.map`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L74), [`topPromos.map`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L100), [`map`](../../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx#L134).
- **Lo usa** [`AdminInicio`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L19) (renderiza).

### [`apps/referidos-app/src/admin/inicio/InicioKPIs.jsx`](../../../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx#L1)

Construye las tarjetas de indicadores de la portada administrativa.

**Superficie que exporta.** [`InicioKPIs`](../../../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx#L14).

**Módulos que lo cargan.** [`AdminInicio.jsx`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`InicioKPIs`](../../../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx#L14) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`.
- **Llamadas directas en el cuerpo** [`stats.map`](../../../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx#L65).
- **Lo usa** [`AdminInicio`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L16) (renderiza).

### [`apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L1)

Muestra un recordatorio local equivalente para Netlify. El estado local representa seguimiento de fecha.

**Superficie que exporta.** [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21).

**Módulos que lo cargan.** [`AdminInicio.jsx`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L7) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`STORAGE_KEY`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L4) · variable de módulo

Declara `STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L26) (referencia), [`persistDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L57) (referencia).

#### [`TOKEN_VALID_DAYS`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L5) · variable de módulo

Declara `TOKEN_VALID_DAYS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`computed`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L43) (referencia), [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L90) (referencia).

#### [`DAY_MS`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L6) · variable de módulo

Declara `DAY_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`computed`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L43) (referencia).

#### [`toDateInputValue`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L8) · función

Implementa `to Date Input Value` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `date`.
- **Llamadas directas en el cuerpo** [`date.getFullYear`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L9), [`padStart`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L10), [`date.getMonth`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L10), [`date.getDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L11).
- **Lo usa** [`handleRenewToday`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L73) (llama).

#### [`parseStoredDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L15) · función

Extrae o interpreta `Stored Date` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de value o string`.
- **Llamadas directas en el cuerpo** [`parsed.getTime`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L18).
- **Lo usa** [`computed`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L33) (llama).

#### [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21) · componente React · exportación por defecto

Monta `KeyRound`, `button`, `RefreshCw`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[lastRenewedInput, setLastRenewedInput] mediante useState`, `[savedMessage, setSavedMessage] mediante useState`.
- **Interfaz que monta** `KeyRound`, `button`, `RefreshCw`, `input`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`computed.nextDate.toLocaleDateString`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L134).
- **Lo usa** [`AdminInicio`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L18) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L25) · callback de infraestructura · dentro de [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NetlifyTokenRenewalCard`.

- **Actualizaciones de estado o acciones** `setLastRenewedInput`.
- **Efectos y APIs** `window.localStorage.getItem`.
- **Condiciones que evalúa** `stored`.
- **Llamadas directas en el cuerpo** [`window.localStorage.getItem`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L26), [`setLastRenewedInput`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L28).

#### [`computed`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L32) · cálculo memorizado · dentro de [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21)

Función auxiliar de `NetlifyTokenRenewalCard` para `computed`.

- **Retorno visible o tipo declarado** `hasDate`, `nextDate`, `remainingDays`, `expired`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de baseDate`.
- **Llamadas directas en el cuerpo** [`parseStoredDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L33), [`baseDate.getTime`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L43), [`nextDate.getTime`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L45), [`now.getTime`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L45).
- **Lo usa** [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L129) (accede al módulo).

#### [`persistDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L55) · función · dentro de [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21)

Aplica o guarda el valor de fecha para que el estado refleje la operación.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setLastRenewedInput`, `setSavedMessage`, `setItem`.
- **Efectos y APIs** `window.localStorage.removeItem`, `window.localStorage.setItem`.
- **Condiciones que evalúa** `ausencia de value`.
- **Llamadas directas en el cuerpo** [`window.localStorage.removeItem`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L57), [`setLastRenewedInput`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L58), [`setSavedMessage`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L59), [`window.localStorage.setItem`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L63).
- **Lo usa** [`handleSaveDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L69) (llama), [`handleRenewToday`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L74) (llama).

#### [`handleSaveDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L68) · función · dentro de [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Llamadas directas en el cuerpo** [`persistDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L69).
- **Lo usa** [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L120) (pasa a onClick).

#### [`handleRenewToday`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L72) · función · dentro de [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSavedMessage`.
- **Llamadas directas en el cuerpo** [`toDateInputValue`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L73), [`persistDate`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L74), [`setSavedMessage`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L75).
- **Lo usa** [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L97) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L115) · callback JSX · dentro de [`NetlifyTokenRenewalCard`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L21)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setLastRenewedInput`.
- **Llamadas directas en el cuerpo** [`setLastRenewedInput`](../../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx#L115).
