# Paquetes compartidos · notifications-sdk

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/notifications-sdk/src/appNotificationsSource.js`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L1)
- [`packages/notifications-sdk/src/index.js`](../../../packages/notifications-sdk/src/index.js#L1)
- [`packages/notifications-sdk/src/policies.js`](../../../packages/notifications-sdk/src/policies.js#L1)
- [`packages/notifications-sdk/src/useRoleNotifications.js`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L1)
- [`packages/notifications-sdk/src/useSupportWorkQueueNotifications.js`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L1)

## Símbolos y conexiones

### [`packages/notifications-sdk/src/appNotificationsSource.js`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L1)

Consulta app_notifications y llama a las RPC de marcar una selección o todas como leídas.

**Superficie que exporta.** [`fetchAppNotifications`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L6), [`markAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L36), [`markAllAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L56).

**Módulos que lo cargan.** [`index.js`](../../../packages/notifications-sdk/src/index.js#L7) (reexporta fetchAppNotifications), [`useRoleNotifications.js`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L8) (importa).

#### [`isTableMissing`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L1) · función

Comprueba `Table Missing` para decidir si se admite o continúa la operación.

- **Entradas** `error`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L2), [`message.includes`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L3).
- **Lo usa** [`fetchAppNotifications`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L27) (llama), [`markAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L48) (llama), [`markAllAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L64) (llama).

#### [`fetchAppNotifications`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L6) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`app_notifications`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L4) y coordina las demás operaciones de esta ficha.

- **Entradas** `{supabase, limit, unreadOnly, scope} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `ausencia de supabase`, `unreadOnly`, `scope`, `error`, `isTableMissing`.
- **Contrato de datos** tabla o vista [`app_notifications`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L4) (`select`) en [`appNotificationsSource.js:14`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L14), tabla o bucket [`app_notifications`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L4) en [`appNotificationsSource.js:14`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L14).
- **Llamadas directas en el cuerpo** [`limit`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L14), [`order`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L14), [`select`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L14), [`supabase.from`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L14), [`query.eq`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L22), [`isTableMissing`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L27).
- **Lo usa** [`refresh`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L45) (llama).

#### [`markAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L36) · función · asíncrona · exportado

Consulta o invoca RPC [`notifications_mark_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L158). El resultado se adapta al contrato del consumidor.

- **Entradas** `{supabase, ids} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `updated`.
- **Condiciones que evalúa** `ausencia de supabase`, `normalizedIds.length`, `error`, `isTableMissing`.
- **Contrato de datos** RPC [`notifications_mark_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L158) en [`appNotificationsSource.js:44`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L44).
- **Llamadas directas en el cuerpo** [`filter`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L41), [`supabase.rpc`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L44), [`isTableMissing`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L48).
- **Lo usa** [`markRead`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L65) (llama).

#### [`markAllAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L56) · función · asíncrona · exportado

Consulta o invoca RPC [`notifications_mark_all_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L184). El resultado se adapta al contrato del consumidor.

- **Entradas** `{supabase, scope} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `updated`.
- **Condiciones que evalúa** `ausencia de supabase`, `error`, `isTableMissing`.
- **Contrato de datos** RPC [`notifications_mark_all_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L184) en [`appNotificationsSource.js:62`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L62).
- **Llamadas directas en el cuerpo** [`supabase.rpc`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L62), [`isTableMissing`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L64).
- **Lo usa** [`markAllRead`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L83) (llama).

### [`packages/notifications-sdk/src/index.js`](../../../packages/notifications-sdk/src/index.js#L1)

Agrega fuentes, reglas y hooks para consumidores.

**Reexporta.** `createNotificationPolicy` de [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js), `normalizeNotificationRole` de [`normalizeNotificationRole`](../../../packages/notifications-sdk/src/policies.js), `canPollByPolicy` de [`canPollByPolicy`](../../../packages/notifications-sdk/src/policies.js), `canRealtimeByPolicy` de [`canRealtimeByPolicy`](../../../packages/notifications-sdk/src/policies.js), `fetchAppNotifications` de [`fetchAppNotifications`](../../../packages/notifications-sdk/src/appNotificationsSource.js), `markAppNotificationsRead` de [`markAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js), `markAllAppNotificationsRead` de [`markAllAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js), `useRoleNotifications` de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js), `useSupportWorkQueueNotifications` de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js).

**Módulos que lo cargan.** [`SupportChatTicketsBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L9) (importa), [`SupportWorkQueueDock.jsx`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L5) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/notifications-sdk/src/policies.js`](../../../packages/notifications-sdk/src/policies.js#L1)

Normaliza rol y define cuándo polling y Realtime son apropiados para su contexto.

**Superficie que exporta.** [`normalizeNotificationRole`](../../../packages/notifications-sdk/src/policies.js#L35), [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L45), [`canPollByPolicy`](../../../packages/notifications-sdk/src/policies.js#L55), [`canRealtimeByPolicy`](../../../packages/notifications-sdk/src/policies.js#L60).

**Módulos que lo cargan.** [`index.js`](../../../packages/notifications-sdk/src/index.js#L1) (reexporta createNotificationPolicy), [`useRoleNotifications.js`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L2) (importa), [`useSupportWorkQueueNotifications.js`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L2) (importa).

#### [`DEFAULT_POLICY`](../../../packages/notifications-sdk/src/policies.js#L1) · variable de módulo

Declara `DEFAULT_POLICY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L47) (referencia).

#### [`ROLE_POLICIES`](../../../packages/notifications-sdk/src/policies.js#L8) · variable de módulo

Declara `ROLE_POLICIES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L47) (accede al módulo).

#### [`normalizeNotificationRole`](../../../packages/notifications-sdk/src/policies.js#L35) · función · exportado

Normaliza `Notification Role` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `rawRole`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/notifications-sdk/src/policies.js#L36), [`trim`](../../../packages/notifications-sdk/src/policies.js#L36).
- **Lo usa** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L46) (llama), [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L30) (llama).

#### [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L45) · función · exportado

Construye `Notification Policy` a partir de los datos del flujo.

- **Entradas** `role`, `overrides = valor por defecto`.
- **Llamadas directas en el cuerpo** [`normalizeNotificationRole`](../../../packages/notifications-sdk/src/policies.js#L46).
- **Lo usa** [`notificationsPolicy`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L23) (llama), [`policy`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L32) (llama), [`policy`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L51) (llama), [`notificationPolicy`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L18) (llama).

#### [`canPollByPolicy`](../../../packages/notifications-sdk/src/policies.js#L55) · función · exportado

Comprueba `Poll By Policy` para decidir si se admite o continúa la operación.

- **Entradas** `policy`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/notifications-sdk/src/policies.js#L56).
- **Lo usa** [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L117) (llama).

#### [`canRealtimeByPolicy`](../../../packages/notifications-sdk/src/policies.js#L60) · función · exportado

Comprueba `Realtime By Policy` para decidir si se admite o continúa la operación.

- **Entradas** `policy`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de policy.realtime`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/notifications-sdk/src/policies.js#L61).
- **Lo usa** [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L129) (llama).

### [`packages/notifications-sdk/src/useRoleNotifications.js`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L1)

Recarga y sincroniza notificaciones para el usuario/rol con la política efectiva. Expone acciones de lectura al layout.

**Superficie que exporta.** [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21).

**Módulos que lo cargan.** [`index.js`](../../../packages/notifications-sdk/src/index.js#L12) (reexporta useRoleNotifications), [`useSupportWorkQueueNotifications.js`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L3) (importa).

**Dependencias del archivo.** `react`, [`./policies.js`](../../../packages/notifications-sdk/src/policies.js), [`./appNotificationsSource.js`](../../../packages/notifications-sdk/src/appNotificationsSource.js).

#### [`withVisibleGuard`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L14) · función

Implementa `with Visible Guard` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `policy`, `force = valor por defecto`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `force`, `ausencia de policy.visibilityAware`, `undefined`.
- **Lo usa** [`refresh`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L43) (llama).

#### [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21) · hook React · exportado

Agrupa estado, contexto o efectos de `Role Notifications` para sus consumidores React.

- **Entradas** `{supabase, role, policy, enabled, limit, scope, unreadOnly} = valor por defecto`.
- **Retorno visible o tipo declarado** `rows`, `loading`, `error`, `unreadCount`, `refresh`, `markRead`, `markAllRead`, `policy`, `role`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`normalizeNotificationRole`](../../../packages/notifications-sdk/src/policies.js#L35) (llama).
- **Llamadas directas en el cuerpo** [`normalizeNotificationRole`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L30).
- **Lo usa** [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L31) (llama), [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L59) (llama).

#### [`policy`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L32) · cálculo memorizado · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Función auxiliar de `useRoleNotifications` para `policy`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L32).
- **Lo usa** [`refresh`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L43) (referencia), [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L117) (referencia), [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L126) (referencia), [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L129) (referencia).

#### [`refresh`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L40) · callback React · asíncrona · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Coordina cambios de estado durante `refresh`.

- **Entradas** `force = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `ausencia de enabled`, `ausencia de supabase`, `ausencia de withVisibleGuard`, `ausencia de result.ok`.
- **Usa código de** [`fetchAppNotifications`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`withVisibleGuard`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L43), [`setLoading`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L44), [`fetchAppNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L45), [`setError`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L52), [`setRows`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L54).
- **Lo usa** [`run`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L107) (llama), [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L114) (referencia), [`setInterval · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L121) (llama), [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L141) (llama).

#### [`markRead`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L63) · callback React · asíncrona · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Coordina cambios de estado durante `mark Read`.

- **Entradas** `ids = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `markAppNotificationsRead`, `setRows`.
- **Condiciones que evalúa** `ausencia de enabled o ausencia de supabase`, `result.ok`.
- **Usa código de** [`markAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L36) (llama).
- **Llamadas directas en el cuerpo** [`markAppNotificationsRead`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L65), [`map`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L67), [`setRows`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L68), [`prev.map`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L69), [`selected.has`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L70), [`toISOString`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L71).
- **Lo usa** [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L162) (referencia).

#### [`markAllRead`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L81) · callback React · asíncrona · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Coordina cambios de estado durante `mark All Read`.

- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `markAllAppNotificationsRead`, `setRows`.
- **Condiciones que evalúa** `ausencia de enabled o ausencia de supabase`, `result.ok`.
- **Usa código de** [`markAllAppNotificationsRead`](../../../packages/notifications-sdk/src/appNotificationsSource.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`markAllAppNotificationsRead`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L83), [`setRows`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L85), [`prev.map`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L86), [`toISOString`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L89).
- **Lo usa** [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L163) (referencia).

#### [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L96) · callback de infraestructura · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useRoleNotifications`.

- **Actualizaciones de estado o acciones** `setRows`, `setLoading`, `setError`.
- **Condiciones que evalúa** `ausencia de enabled o ausencia de supabase`.
- **Llamadas directas en el cuerpo** [`setRows`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L99), [`setLoading`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L100), [`setError`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L101), [`run`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L109).

#### [`run`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L105) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L96)

Función auxiliar de `useEffect · callback` para `run`.

- **Condiciones que evalúa** `disposed`.
- **Llamadas directas en el cuerpo** [`refresh`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L107).
- **Lo usa** [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L109) (llama).

#### [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L116) · callback de infraestructura · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useRoleNotifications`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `globalThis.clearInterval`.
- **Condiciones que evalúa** `ausencia de enabled o ausencia de supabase o ausencia de canPollByPolicy`, `ausencia de intervalMs`.
- **Usa código de** [`canPollByPolicy`](../../../packages/notifications-sdk/src/policies.js#L55) (llama).
- **Llamadas directas en el cuerpo** [`canPollByPolicy`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L117), [`globalThis.setInterval`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L120), [`globalThis.clearInterval`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L124).

#### [`setInterval · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L120) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L116)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`refresh`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L121).

#### [`useEffect · callback`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L128) · callback de infraestructura · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useRoleNotifications`.

- **Efectos y APIs** `subscribe`, `supabase.channel`.
- **Condiciones que evalúa** `ausencia de enabled o ausencia de supabase o ausencia de canRealtimeByPolicy`.
- **Usa código de** [`canRealtimeByPolicy`](../../../packages/notifications-sdk/src/policies.js#L60) (llama).
- **Llamadas directas en el cuerpo** [`canRealtimeByPolicy`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L129), [`subscribe`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L131), [`on`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L131), [`supabase.channel`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L131), [`refresh`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L141), [`supabase.removeChannel`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L147).

#### [`unreadCount`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L152) · cálculo memorizado · dentro de [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21)

Función auxiliar de `useRoleNotifications` para `unread Count`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L152).
- **Lo usa** [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L160) (referencia).

### [`packages/notifications-sdk/src/useSupportWorkQueueNotifications.js`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L1)

Adapta señales de la cola de trabajo de soporte a avisos para agentes. Conserva la lógica de cola fuera del componente de UI.

**Superficie que exporta.** [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42).

**Módulos que lo cargan.** [`index.js`](../../../packages/notifications-sdk/src/index.js#L13) (reexporta useSupportWorkQueueNotifications).

**Dependencias del archivo.** `react`, [`./policies.js`](../../../packages/notifications-sdk/src/policies.js), [`./useRoleNotifications.js`](../../../packages/notifications-sdk/src/useRoleNotifications.js).

#### [`ACTIVE_STATUSES`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L5) · variable de módulo

Conserva la lista de `ACTIVE STATUSES` usada por el módulo.

- **Lo usa** [`fetchRows`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L102) (referencia).

#### [`statusPriority`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L7) · función

Implementa `status Priority` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`currentTicket`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L175) (llama).

#### [`formatSupportNotice`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L14) · función

Formatea `Support Notice` para que el consumidor lo pueda presentar.

- **Entradas** `row`.
- **Retorno visible o tipo declarado** `eventType`, `threadCode`, `message`.
- **Condiciones que evalúa** `eventType`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L15), [`trim`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L15).
- **Lo usa** [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L159) (llama).

#### [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42) · hook React · exportado

Agrupa estado, contexto o efectos de `Support Work Queue Notifications` para sus consumidores React.

- **Entradas** `{supabase, user, policy, enabled} = valor por defecto`.
- **Retorno visible o tipo declarado** `currentTicket`, `queueCount`, `notices`, `dismissNotice`, `loading`, `refresh`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[notices, setNotices] mediante useState`, `timersRef mediante useRef`, `consumedRef mediante useRef`.
- **Hooks que llama** `useState`, `useRef`, `useRoleNotifications`, `useEffect`.
- **Usa código de** [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L48), [`trim`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L48).
- **Lo usa** [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L30) (llama).

#### [`policy`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L51) · cálculo memorizado · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Función auxiliar de `useSupportWorkQueueNotifications` para `policy`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L51).
- **Lo usa** [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L62) (referencia), [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L112) (accede al módulo), [`setInterval · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L116) (accede al módulo).

#### [`clearNoticeTimer`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L69) · función · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Limpia o restablece `Notice Timer` como parte de este flujo.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `globalThis.clearTimeout`.
- **Condiciones que evalúa** `timer`.
- **Llamadas directas en el cuerpo** [`timersRef.current.get`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L70), [`globalThis.clearTimeout`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L72), [`timersRef.current.delete`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L73).
- **Lo usa** [`dismissNotice`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L78) (llama).

#### [`dismissNotice`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L77) · función · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Coordina cambios de estado durante `dismiss Notice`.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `clearNoticeTimer`, `setNotices`.
- **Llamadas directas en el cuerpo** [`clearNoticeTimer`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L78), [`setNotices`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L79), [`prev.filter`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L79).
- **Lo usa** [`setTimeout · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L162) (llama), [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L191) (referencia).

#### [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L82) · callback de infraestructura · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSupportWorkQueueNotifications`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `globalThis.clearTimeout`.
- **Llamadas directas en el cuerpo** [`timers.forEach`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L85), [`globalThis.clearTimeout`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L85), [`timers.clear`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L86).

#### [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L90) · callback de infraestructura · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSupportWorkQueueNotifications`.

- **Actualizaciones de estado o acciones** `setRows`, `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `subscribe`, `supabase.channel`, `globalThis.clearInterval`.
- **Condiciones que evalúa** `includes`, `policy.realtime`, `timer`, `channel`.
- **Llamadas directas en el cuerpo** [`setRows`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L92), [`fetchRows`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L109), [`includes`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L112), [`globalThis.setInterval`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L114), [`subscribe`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L128), [`on`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L128), [`supabase.channel`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L128), [`globalThis.clearInterval`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L147), [`supabase.removeChannel`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L148).

#### [`fetchRows`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L97) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L90)

Consulta o invoca tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setRows`.
- **Condiciones que evalúa** `disposed`.
- **Contrato de datos** tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`useSupportWorkQueueNotifications.js:98`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L98), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`useSupportWorkQueueNotifications.js:98`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L98).
- **Llamadas directas en el cuerpo** [`order`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L98), [`in`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L98), [`eq`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L98), [`select`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L98), [`supabase.from`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L98), [`setRows`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L106).
- **Lo usa** [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L109) (llama), [`setInterval · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L122) (llama).

#### [`setInterval · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L114) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L90)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Condiciones que evalúa** `policy.visibilityAware y undefined y document.visibilityState`.
- **Llamadas directas en el cuerpo** [`fetchRows`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L122).

#### [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L152) · callback de infraestructura · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSupportWorkQueueNotifications`.

- **Actualizaciones de estado o acciones** `setNotices`, `markRead`.
- **Efectos y APIs** `globalThis.setTimeout`.
- **Condiciones que evalúa** `ausencia de nextRows.length`.
- **Llamadas directas en el cuerpo** [`filter`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L153), [`unreadRows.filter`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L154), [`consumedRef.current.has`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L154), [`nextRows.forEach`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L157), [`slice`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L158), [`toString`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L158), [`formatSupportNotice`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L159), [`setNotices`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L160), [`globalThis.setTimeout`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L161), [`timersRef.current.set`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L164), [`consumedRef.current.add`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L165), [`notifications.markRead`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L166).

#### [`setTimeout · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L161) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L152)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`dismissNotice`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L162).

#### [`currentTicket`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L171) · cálculo memorizado · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Función auxiliar de `useSupportWorkQueueNotifications` para `current Ticket`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `priorityDiff`.
- **Llamadas directas en el cuerpo** [`sort`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L172), [`rows.filter`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L172), [`includes`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L173), [`statusPriority`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L175).
- **Lo usa** [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L188) (referencia).

#### [`queueCount`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L183) · cálculo memorizado · dentro de [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L42)

Coordina `Count` con la planificación o reintento del flujo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L183).
- **Lo usa** [`useSupportWorkQueueNotifications`](../../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L189) (referencia).
