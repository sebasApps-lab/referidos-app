# Android · Servicios, estado y UI compartida · 1 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/shared/constants/env.ts`](../../../apps/referidos-android/src/shared/constants/env.ts#L1)
- [`apps/referidos-android/src/shared/constants/supportCategories.ts`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L1)
- [`apps/referidos-android/src/shared/constants/supportDesk.ts`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L1)
- [`apps/referidos-android/src/shared/hooks/useRoleNotifications.ts`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L1)
- [`apps/referidos-android/src/shared/modals/ModalHost.tsx`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L1)
- [`apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L1)
- [`apps/referidos-android/src/shared/security/localAccessSecurity.ts`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L1)
- [`apps/referidos-android/src/shared/services/accountLifecycle.ts`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L1)
- [`apps/referidos-android/src/shared/services/adminOps.ts`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L1)
- [`apps/referidos-android/src/shared/services/appNotifications.ts`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/shared/constants/env.ts`](../../../apps/referidos-android/src/shared/constants/env.ts#L1)

Lee primero `env.json` y después variables disponibles en el proceso, normaliza comillas y valida URL/redirect. Concentra la selección de entorno y evita inicializar el cliente con parámetros vacíos.

**Superficie que exporta.** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L37), [`assertMobileEnv`](../../../apps/referidos-android/src/shared/constants/env.ts#L48).

**Módulos que lo cargan.** [`App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L16) (importa), [`useAuthEngine.ts`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L19) (importa), [`mobileApi.ts`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L3) (importa).

#### Acciones al cargar el módulo

- **Llamadas directas en el cuerpo** [`require`](../../../apps/referidos-android/src/shared/constants/env.ts#L8).

#### [`FILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L3) · variable de módulo

Declara `FILE_ENV` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`FILE_SUPABASE_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L19) (accede al módulo), [`FILE_SUPABASE_ANON_KEY`](../../../apps/referidos-android/src/shared/constants/env.ts#L20) (accede al módulo), [`FILE_APP_VERSION`](../../../apps/referidos-android/src/shared/constants/env.ts#L21) (accede al módulo), [`FILE_AUTH_REDIRECT_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L22) (accede al módulo).

#### [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L13) · función

Normaliza `Value` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-android/src/shared/constants/env.ts#L14), [`trim`](../../../apps/referidos-android/src/shared/constants/env.ts#L14).
- **Lo usa** [`FILE_SUPABASE_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L19) (llama), [`FILE_SUPABASE_ANON_KEY`](../../../apps/referidos-android/src/shared/constants/env.ts#L20) (llama), [`FILE_APP_VERSION`](../../../apps/referidos-android/src/shared/constants/env.ts#L21) (llama), [`FILE_AUTH_REDIRECT_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L22) (llama), [`RUNTIME_SUPABASE_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L24) (llama), [`RUNTIME_SUPABASE_ANON_KEY`](../../../apps/referidos-android/src/shared/constants/env.ts#L27) (llama), [`RUNTIME_APP_VERSION`](../../../apps/referidos-android/src/shared/constants/env.ts#L30) (llama), [`RUNTIME_AUTH_REDIRECT_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L33) (llama).

#### [`FILE_SUPABASE_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L19) · variable de módulo

Declara `FILE_SUPABASE_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L19).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L39) (referencia).

#### [`FILE_SUPABASE_ANON_KEY`](../../../apps/referidos-android/src/shared/constants/env.ts#L20) · variable de módulo

Declara `FILE_SUPABASE_ANON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L20).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L40) (referencia).

#### [`FILE_APP_VERSION`](../../../apps/referidos-android/src/shared/constants/env.ts#L21) · variable de módulo

Declara `FILE_APP_VERSION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L21).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L41) (referencia).

#### [`FILE_AUTH_REDIRECT_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L22) · variable de módulo

Declara `FILE_AUTH_REDIRECT_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L22).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L43) (referencia).

#### [`RUNTIME_SUPABASE_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L24) · variable de módulo

Declara `RUNTIME_SUPABASE_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L24).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L39) (referencia).

#### [`RUNTIME_SUPABASE_ANON_KEY`](../../../apps/referidos-android/src/shared/constants/env.ts#L27) · variable de módulo

Declara `RUNTIME_SUPABASE_ANON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L27).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L40) (referencia).

#### [`RUNTIME_APP_VERSION`](../../../apps/referidos-android/src/shared/constants/env.ts#L30) · variable de módulo

Declara `RUNTIME_APP_VERSION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L30).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L41) (referencia).

#### [`RUNTIME_AUTH_REDIRECT_URL`](../../../apps/referidos-android/src/shared/constants/env.ts#L33) · variable de módulo

Declara `RUNTIME_AUTH_REDIRECT_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`normalizeValue`](../../../apps/referidos-android/src/shared/constants/env.ts#L33).
- **Lo usa** [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L44) (referencia).

#### [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L37) · variable de módulo · exportado

Agrupa la configuración o catálogo de `MOBILE ENV` para que sus consumidores lean claves comunes.

- **Campos o contexto** `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `APP_VERSION`, `AUTH_REDIRECT_URL`.
- **Lo usa** [`assertMobileEnv`](../../../apps/referidos-android/src/shared/constants/env.ts#L49) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L164) (accede al módulo), [`startOAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L410) (accede al módulo), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L8) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L18) (accede al módulo).

#### [`assertMobileEnv`](../../../apps/referidos-android/src/shared/constants/env.ts#L48) · función · exportado

Comprueba `Mobile Env` para decidir si se admite o continúa la operación.

- **Condiciones que evalúa** `ausencia de MOBILE_ENV.SUPABASE_URL o ausencia de MOBILE_ENV.SUPABASE_ANON_KEY`, `ausencia de test`.
- **Llamadas directas en el cuerpo** [`test`](../../../apps/referidos-android/src/shared/constants/env.ts#L53).
- **Lo usa** [`mobileApi.ts`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L5) (llama).

### [`apps/referidos-android/src/shared/constants/supportCategories.ts`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L1)

Catálogo estático tipado de motivos disponibles para el autoservicio de cliente y negocio, con audiencia y descripción. Lo importan sus pantallas de perfil.

**Superficie que exporta.** [`SupportRole`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L1), [`SupportCategory`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L3), [`SUPPORT_CHAT_CATEGORIES`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L10).

**Módulos que lo cargan.** [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L17) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L17) (importa).

#### [`SupportRole`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L1) · tipo TypeScript · exportado

Describe la forma del contrato de `Support Role`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`SupportCategory`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L3) · tipo TypeScript · exportado

Describe la forma del contrato de `Support Category`, con campos `id`, `label`, `description`, `roles`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `label`, `description`, `roles`.

#### [`SUPPORT_CHAT_CATEGORIES`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L10) · variable de módulo · exportado

Conserva la lista de `SUPPORT CHAT CATEGORIES` usada por el módulo.

- **Lo usa** [`visibleCategories`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L70) (accede al módulo), [`visibleCategories`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L76) (accede al módulo).

### [`apps/referidos-android/src/shared/constants/supportDesk.ts`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L1)

Define IDs, etiquetas y tipos de filtros del inbox por estado y origen. El bloque operativo de las macros se carga en runtime.

**Superficie que exporta.** [`SUPPORT_STATUS_GROUPS`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L1), [`SUPPORT_ORIGIN_FILTERS`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L10), [`SupportStatusId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L16), [`SupportOriginFilterId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L17).

**Módulos que lo cargan.** [`SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L12) (importa).

#### [`SUPPORT_STATUS_GROUPS`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L1) · variable de módulo · exportado

Declara `SUPPORT_STATUS_GROUPS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportStatusId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L16) (referencia), [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L260) (accede al módulo).

#### [`SUPPORT_ORIGIN_FILTERS`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L10) · variable de módulo · exportado

Declara `SUPPORT_ORIGIN_FILTERS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportOriginFilterId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L17) (referencia), [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L275) (accede al módulo).

#### [`SupportStatusId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L16) · tipo TypeScript · exportado

Describe la forma del contrato de `Support Status Id`. TypeScript lo comprueba al compilar.

- **Lo usa** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L38) (referencia).

#### [`SupportOriginFilterId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L17) · tipo TypeScript · exportado

Describe la forma del contrato de `Support Origin Filter Id`. TypeScript lo comprueba al compilar.

- **Lo usa** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L39) (referencia).

### [`apps/referidos-android/src/shared/hooks/useRoleNotifications.ts`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L1)

Carga, refresca y marca notificaciones como leídas. Según política monta un intervalo de polling y una suscripción Realtime a `app_notifications` y los desmonta en cleanup. Expone conteo sin leer, error, carga y acciones para los paneles.

**Superficie que exporta.** [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22).

**Módulos que lo cargan.** [`ProfileRuntimePanels.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L5) (importa).

**Dependencias del archivo.** `react`, [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/appNotifications`](../../../apps/referidos-android/src/shared/services/appNotifications.ts).

#### [`UseRoleNotificationsOptions`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L13) · tipo TypeScript

Describe la forma del contrato de `Use Role Notifications Options`, con campos `role`, `policy`, `enabled`, `limit`, `scope`, `unreadOnly`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `role`, `policy`, `enabled`, `limit`, `scope`, `unreadOnly`.

#### [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22) · hook React · exportado

Agrupa estado, contexto o efectos de `Role Notifications` para sus consumidores React.

- **Entradas** `{role, policy, enabled, limit, scope, unreadOnly} = valor por defecto`.
- **Retorno visible o tipo declarado** `rows`, `loading`, `error`, `unreadCount`, `refresh`, `markRead`, `markAllRead`, `policy`, `role`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`normalizeNotificationRole`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L51) (llama).
- **Llamadas directas en el cuerpo** [`normalizeNotificationRole`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L30).
- **Lo usa** [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L68) (llama).

#### [`policy`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L32) · cálculo memorizado · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Función auxiliar de `useRoleNotifications` para `policy`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`createNotificationPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L61) (llama).
- **Llamadas directas en el cuerpo** [`createNotificationPolicy`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L32).
- **Lo usa** [`refresh`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L42) (referencia), [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L111) (referencia), [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L120) (referencia), [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L123) (referencia).

#### [`refresh`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L40) · callback React · asíncrona · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Coordina cambios de estado durante `refresh`.

- **Entradas** `force = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `ausencia de enabled`, `ausencia de force y ausencia de canPollByPolicy y rows.length`, `ausencia de result.ok`.
- **Usa código de** [`canPollByPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L71) (llama), [`fetchAppNotifications`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L82) (llama).
- **Llamadas directas en el cuerpo** [`canPollByPolicy`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L42), [`setLoading`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L43), [`fetchAppNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L44), [`setError`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L49), [`setRows`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L51).
- **Lo usa** [`run`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L101) (llama), [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L108) (referencia), [`setInterval · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L115) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L135) (llama).

#### [`markRead`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L59) · callback React · asíncrona · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Coordina cambios de estado durante `mark Read`.

- **Entradas** `ids = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `markAppNotificationsRead`, `setRows`.
- **Condiciones que evalúa** `ausencia de enabled`, `result.ok`.
- **Usa código de** [`markAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L109) (llama).
- **Llamadas directas en el cuerpo** [`markAppNotificationsRead`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L61), [`map`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L63), [`setRows`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L64), [`prev.map`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L65), [`selected.has`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L66), [`toISOString`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L67).
- **Lo usa** [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L156) (referencia).

#### [`markAllRead`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L75) · callback React · asíncrona · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Coordina cambios de estado durante `mark All Read`.

- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `markAllAppNotificationsRead`, `setRows`.
- **Condiciones que evalúa** `ausencia de enabled`, `result.ok`.
- **Usa código de** [`markAllAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L125) (llama).
- **Llamadas directas en el cuerpo** [`markAllAppNotificationsRead`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L77), [`setRows`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L79), [`prev.map`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L80), [`toISOString`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L83).
- **Lo usa** [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L157) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L90) · callback de infraestructura · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useRoleNotifications`.

- **Actualizaciones de estado o acciones** `setRows`, `setLoading`, `setError`.
- **Condiciones que evalúa** `ausencia de enabled`.
- **Llamadas directas en el cuerpo** [`setRows`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L93), [`setLoading`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L94), [`setError`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L95), [`run`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L103).

#### [`run`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L99) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L90)

Función auxiliar de `useEffect · callback` para `run`.

- **Condiciones que evalúa** `disposed`.
- **Llamadas directas en el cuerpo** [`refresh`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L101).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L103) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L110) · callback de infraestructura · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useRoleNotifications`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `globalThis.clearInterval`.
- **Condiciones que evalúa** `ausencia de enabled o ausencia de canPollByPolicy`, `ausencia de intervalMs`.
- **Usa código de** [`canPollByPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L71) (llama).
- **Llamadas directas en el cuerpo** [`canPollByPolicy`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L111), [`globalThis.setInterval`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L114), [`globalThis.clearInterval`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L118).

#### [`setInterval · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L114) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L110)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`refresh`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L115).

#### [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L122) · callback de infraestructura · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useRoleNotifications`.

- **Efectos y APIs** `subscribe`, `supabase.channel`.
- **Condiciones que evalúa** `ausencia de enabled o ausencia de canRealtimeByPolicy`.
- **Usa código de** [`canRealtimeByPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L76) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`canRealtimeByPolicy`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L123), [`subscribe`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L125), [`on`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L125), [`supabase.channel`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L125), [`refresh`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L135), [`supabase.removeChannel`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L141).

#### [`unreadCount`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L146) · cálculo memorizado · dentro de [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22)

Función auxiliar de `useRoleNotifications` para `unread Count`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L146).
- **Lo usa** [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L154) (referencia).

### [`apps/referidos-android/src/shared/modals/ModalHost.tsx`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L1)

Monta un solo modal React Native para confirmar, informar o escoger una opción. Traduce los modelos del store a entradas y acciones, de modo que cada pantalla conserve su lógica sin declarar otro host.

**Superficie que exporta.** [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20).

**Módulos que lo cargan.** [`App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L15) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts).

#### [`resolveToneStyle`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L14) · función

Obtiene o resuelve `Tone Style` para entregarlo al consumidor.

- **Entradas** `tone?`.
- **Retorno visible o tipo declarado** `color`, `bg`.
- **Condiciones que evalúa** `tone`.
- **Lo usa** [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L48) (llama).

#### [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20) · componente React · exportación por defecto

Monta `Modal`, `Pressable`, `View`, `Text`, `ScrollView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `modal mediante useModalStore`, `selector state.activeModal`, `closeModal mediante useModalStore`, `selector state.closeModal`, `confirm mediante useModalStore`, `selector state.confirm`, `cancel mediante useModalStore`, `selector state.cancel`, `acknowledge mediante useModalStore`, `selector state.acknowledge`, `pickOption mediante useModalStore`, `selector state.pickOption`, `applyPicker mediante useModalStore`, `selector state.applyPicker`.
- **Interfaz que monta** `Modal`, `Pressable`, `View`, `Text`, `ScrollView`.
- **Hooks que llama** `useModalStore`, `useEffect`.
- **Condiciones que evalúa** `ausencia de modal`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama).
- **Llamadas directas en el cuerpo** [`resolveToneStyle`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L48), [`modal.options.map`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L75).
- **Lo usa** [`App`](../../../apps/referidos-android/src/app/App.tsx#L254) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L29) · callback de infraestructura · dentro de [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalHost`.

- **Efectos y APIs** `BackHandler.addEventListener`.
- **Condiciones que evalúa** `ausencia de modal`.
- **Llamadas directas en el cuerpo** [`StatusBar.pushStackEntry`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L31), [`BackHandler.addEventListener`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L32), [`sub.remove`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L40), [`StatusBar.popStackEntry`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L41).

#### [`addEventListener · callback`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L32) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L29)

Recibe eventos de la suscripción o listener registrado por `useEffect · callback`.

- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `dismissible`.
- **Llamadas directas en el cuerpo** [`cancel`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L35).

#### [`Modal.onRequestClose`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L55) · callback JSX · dentro de [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20)

Responde al evento de interfaz `Modal.onRequestClose`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `dismissible`.
- **Llamadas directas en el cuerpo** [`cancel`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L56).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L61) · callback JSX · dentro de [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `dismissible`.
- **Llamadas directas en el cuerpo** [`cancel`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L62).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L65) · callback JSX · dentro de [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`Pressable.onPress`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L81) · callback JSX · dentro de [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`pickOption`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L81).

#### [`styles`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L144) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L144).
- **Lo usa** [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L60) (accede al módulo).

### [`apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L1)

Prueba si la implementación de `URL` del runtime cubre la funcionalidad que usa Supabase y define un reemplazo parcial cuando hace falta. Admite URLs relativas y cambio de protocolo para Realtime. Se carga antes del cliente, desde `index.js`.

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-android/index.js#L2) (importa).

#### Acciones al cargar el módulo

- **Actualizaciones de estado o acciones** `globalThis.URL`.
- **Condiciones que evalúa** `nativeUrlIsBroken`.
- **Llamadas directas en el cuerpo** [`nativeUrlIsBroken`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L257).

#### [`ParsedAbsolute`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L10) · tipo TypeScript

Describe la forma del contrato de `Parsed Absolute`, con campos `protocol`, `username`, `password`, `hostname`, `port`, `pathname`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `protocol`, `username`, `password`, `hostname`, `port`, `pathname`, `search`, `hash`.

#### [`ABSOLUTE_RE`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L21) · variable de módulo

Declara `ABSOLUTE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`parseAbsoluteUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L74) (referencia).

#### [`normalizePath`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L24) · función

Normaliza `Path` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `pathname`.
- **Efectos y APIs** `stack.push`.
- **Condiciones que evalúa** `ausencia de part o part`, `part`.
- **Llamadas directas en el cuerpo** [`pathname.split`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L25), [`stack.pop`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L30), [`stack.push`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L33), [`stack.join`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L35).
- **Lo usa** [`resolveRelativeUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L114) (llama).

#### [`parseHost`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L38) · función

Opera sobre Auth `indexOf` y coordina las demás operaciones de esta ficha.

- **Entradas** `authority`.
- **Retorno visible o tipo declarado** `username`, `password`, `hostname`, `port`.
- **Condiciones que evalúa** `at`, `sep`, `ausencia de hostPort.startsWith`, `colon`, `test`.
- **Contrato de datos** Auth `indexOf` en [`urlHermesPatch.ts:47`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L47), Auth `slice` en [`urlHermesPatch.ts:49`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L49).
- **Llamadas directas en el cuerpo** [`authority.lastIndexOf`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L43), [`authority.slice`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L45), [`auth.indexOf`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L47), [`auth.slice`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L49), [`hostPort.startsWith`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L58), [`hostPort.lastIndexOf`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L59), [`hostPort.slice`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L61), [`test`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L62).
- **Lo usa** [`parseAbsoluteUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L84) (llama), [`URLShim.host`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L196) (llama).

#### [`parseAbsoluteUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L72) · función

Extrae o interpreta `Absolute Url` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `ParsedAbsolute`, `protocol`, `username`, `password`, `hostname`, `port`, `pathname`, `search`, `hash`.
- **Condiciones que evalúa** `ausencia de match o ausencia de match.1`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L73), [`input.match`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L74), [`parseHost`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L84).
- **Lo usa** [`resolveRelativeUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L102) (llama), [`URLShim.assignFromAbsolute`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L145) (llama).

#### [`isAbsoluteUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L97) · función

Comprueba `Absolute Url` para decidir si se admite o continúa la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`test`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L98).
- **Lo usa** [`URLShim.constructor`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L132) (llama).

#### [`resolveRelativeUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L101) · función

Obtiene o resuelve `Relative Url` para entregarlo al consumidor.

- **Entradas** `input`, `baseHref`.
- **Condiciones que evalúa** `input.startsWith`.
- **Llamadas directas en el cuerpo** [`parseAbsoluteUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L102), [`input.startsWith`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L106), [`base.pathname.endsWith`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L111), [`base.pathname.slice`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L113), [`base.pathname.lastIndexOf`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L113), [`normalizePath`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L114).
- **Lo usa** [`URLShim.constructor`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L138) (llama).

#### [`URLShim`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L118) · clase

Agrupa `URL Shim` y los métodos que comparten su estado o ciclo de vida.

- **Lo usa** [`urlHermesPatch.ts`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L258) (referencia).

#### [`URLShim.constructor`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L128) · método de clase

Implementa el valor de function Object() { [native code] } dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `input`, `base?`.
- **Condiciones que evalúa** `ausencia de isAbsoluteUrl`, `ausencia de base`.
- **Llamadas directas en el cuerpo** [`isAbsoluteUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L132), [`base.toString`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L137), [`resolveRelativeUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L138), [`this.assignFromAbsolute`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L141).

#### [`URLShim.assignFromAbsolute`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L144) · método de clase

Implementa `assign From Absolute` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `absolute`.
- **Llamadas directas en el cuerpo** [`parseAbsoluteUrl`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L145).

#### [`URLShim.protocol`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L156) · método de clase

Implementa `protocol` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.protocol`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L159) · método de clase

Implementa `protocol` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L160), [`next.endsWith`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L161).

#### [`URLShim.username`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L164) · método de clase

Implementa el valor de nombre de usuario dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.username`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L167) · método de clase

Implementa el valor de nombre de usuario dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.

#### [`URLShim.password`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L171) · método de clase

Implementa el valor de contraseña dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.password`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L174) · método de clase

Implementa el valor de contraseña dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.

#### [`URLShim.hostname`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L178) · método de clase

Implementa `hostname` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.hostname`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L181) · método de clase

Implementa `hostname` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.

#### [`URLShim.port`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L185) · método de clase

Implementa `port` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.port`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L188) · método de clase

Implementa `port` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.

#### [`URLShim.host`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L192) · método de clase

Implementa `host` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.host`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L195) · método de clase

Implementa `host` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`parseHost`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L196).

#### [`URLShim.pathname`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L201) · método de clase

Implementa `pathname` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.pathname`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L204) · método de clase

Implementa `pathname` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`next.startsWith`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L206).

#### [`URLShim.search`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L209) · método de clase

Implementa `search` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.search`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L212) · método de clase

Implementa `search` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`next.startsWith`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L214).

#### [`URLShim.hash`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L217) · método de clase

Implementa `hash` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.hash`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L220) · método de clase

Implementa `hash` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`next.startsWith`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L222).

#### [`URLShim.origin`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L225) · método de clase

Implementa `origin` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.href`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L229) · método de clase

Implementa `href` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`URLShim.href`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L236) · método de clase

Implementa `href` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`this.assignFromAbsolute`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L237).

#### [`URLShim.toString`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L240) · método de clase

Implementa `to String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`nativeUrlIsBroken`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L245) · función

Implementa `native Url Is Broken` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Retorno visible o tipo declarado** `booleano`.
- **Efectos y APIs** `rt.protocol.replace`.
- **Llamadas directas en el cuerpo** [`rt.protocol.replace`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L250).
- **Lo usa** [`urlHermesPatch.ts`](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts#L257) (llama).

### [`apps/referidos-android/src/shared/security/localAccessSecurity.ts`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L1)

Adapta las reglas de PIN y acceso de `security-core` al almacenamiento/plataforma de `platform-rn`. Persiste PIN o biometría por identidad de Auth y refleja indicadores en la fila `usuarios`; separa `authUserId` del ID de tabla. Maneja intentos y desbloqueos e inicia reautenticación por correo, cuya confirmación sigue siendo local.

**Superficie que exporta.** [`AccessMethods`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L27), [`buildAccessMethodsFromUser`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L49), [`requireSecurityForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L58), [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L77), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L120), [`disablePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L164), [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L179), [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L215), [`disableBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L243), [`sendSensitiveReauthEmail`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L257), [`confirmSensitiveReauth`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L281), [`requiredLevelForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L286).

**Módulos que lo cargan.** [`AccessSecurityPanel.tsx`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L6) (importa), [`appStore.ts`](../../../apps/referidos-android/src/shared/store/appStore.ts#L6) (importa).

**Dependencias del archivo.** [`@referidos/security-core`](../../../packages/security-core/src/index.js), [`@referidos/platform-rn`](../../../packages/platform-rn/src/index.js), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/securityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts).

#### [`AccessMethods`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L27) · tipo TypeScript · exportado

Describe la forma del contrato de `Access Methods`, con campos `fingerprint`, `pin`, `password`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `fingerprint`, `pin`, `password`.
- **Lo usa** [`AppState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L20) (referencia).

#### [`MutationResult`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L33) · tipo TypeScript

Describe la forma del contrato de `Mutation Result`, con campos `ok`, `error`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `ok`, `error`.

#### [`PIN_HASH_ITERATIONS`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L38) · variable de módulo

Declara `PIN_HASH_ITERATIONS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L101) (referencia), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L146) (referencia).

#### [`normalizeUserIds`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L40) · función

Normaliza `User Ids` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `params`.
- **Retorno visible o tipo declarado** `authUserId`, `userRowId`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L44).
- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L82) (llama), [`disablePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L168) (llama), [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L183) (llama), [`disableBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L247) (llama).

#### [`buildAccessMethodsFromUser`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L49) · función · exportado

Construye `Access Methods From User` a partir de los datos del flujo.

- **Entradas** `user`.
- **Retorno visible o tipo declarado** `AccessMethods`, `fingerprint`, `pin`, `password`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L50).
- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-android/src/shared/store/appStore.ts#L120) (llama).

#### [`requireSecurityForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L58) · función · exportado

Comprueba `Security For Action` para decidir si se admite o continúa la operación.

- **Entradas** `action`.
- **Retorno visible o tipo declarado** `SecurityRequirementResult`.
- **Usa código de** [`SecurityRequirementResult`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L12) (referencia), [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) (accede al módulo).
- **Llamadas directas en el cuerpo** [`requireAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L59), [`useSecurityStore.getState`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L59).
- **Lo usa** [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L58) (llama).

#### [`updateUserAccessFlags`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L62) · función · asíncrona

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `userRowId`, `updates`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `error`.
- **Condiciones que evalúa** `ausencia de userRowId o ausencia de length`, `error`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`localAccessSecurity.ts:67`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L67), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`localAccessSecurity.ts:67`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L67).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`eq`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L67), [`update`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L67), [`supabase.from`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L67).
- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L114) (llama), [`disablePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L174) (llama), [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L210) (llama), [`disableBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L252) (llama).

#### [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L77) · función · asíncrona · exportado

Implementa `configure Pin Access` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `params`.
- **Retorno visible o tipo declarado** `ok`, `error`, `lockedUntil`.
- **Condiciones que evalúa** `ausencia de authUserId o ausencia de userRowId`, `ausencia de isValidPin`, `attempts.lockedUntil`, `ausencia de saveResult.ok`, `ausencia de userUpdate.ok`.
- **Usa código de** [`isValidPin`](../../../packages/security-core/src/pin/pinPolicy.js#L5) (llama), [`getPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L70) (llama), [`generatePinSalt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L100) (llama), [`hashPin`](../../../packages/platform-rn/src/storage/secureStorageService.js#L104) (llama), [`savePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L40) (llama), [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L77) (llama), [`PIN_MAX_ATTEMPTS`](../../../packages/security-core/src/pin/pinPolicy.js#L2) (referencia).
- **Llamadas directas en el cuerpo** [`normalizeUserIds`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L82), [`trim`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L83), [`isValidPin`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L87), [`getPinAttemptState`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L91), [`generatePinSalt`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L100), [`hashPin`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L101), [`savePinHash`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L102), [`toISOString`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L106), [`recordPinAttempt`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L113), [`updateUserAccessFlags`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L114).
- **Lo usa** [`handleSavePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L82) (llama).

#### [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L120) · función · asíncrona · exportado

Implementa `verify Pin And Unlock` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `params`.
- **Retorno visible o tipo declarado** `ok`, `error`, `lockedUntil`.
- **Condiciones que evalúa** `ausencia de authUserId`, `ausencia de isValidPin`, `attempts.lockedUntil`, `ausencia de stored.hash o ausencia de stored.salt`, `ausencia de success`.
- **Usa código de** [`isValidPin`](../../../packages/security-core/src/pin/pinPolicy.js#L5) (llama), [`getPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L70) (llama), [`loadPinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L45) (llama), [`hashPin`](../../../packages/platform-rn/src/storage/secureStorageService.js#L104) (llama), [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L77) (llama), [`PIN_MAX_ATTEMPTS`](../../../packages/security-core/src/pin/pinPolicy.js#L2) (referencia), [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L124), [`isValidPin`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L127), [`getPinAttemptState`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L129), [`loadPinHash`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L138), [`hashPin`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L143), [`recordPinAttempt`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L149), [`unlockWithPin`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L160), [`useSecurityStore.getState`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L160).
- **Lo usa** [`handleVerifyPin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L99) (llama).

#### [`disablePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L164) · función · asíncrona · exportado

Finaliza `Pin Access` y ajusta el estado que depende de esa operación.

- **Entradas** `params`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Actualizaciones de estado o acciones** `clearPinAttemptState`.
- **Condiciones que evalúa** `ausencia de authUserId o ausencia de userRowId`, `ausencia de userUpdate.ok`.
- **Usa código de** [`deletePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L49) (llama), [`clearPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L53) (llama).
- **Llamadas directas en el cuerpo** [`normalizeUserIds`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L168), [`deletePinHash`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L172), [`clearPinAttemptState`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L173), [`updateUserAccessFlags`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L174).
- **Lo usa** [`handleDisablePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L114) (llama).

#### [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L179) · función · asíncrona · exportado

Implementa `enroll Biometric Access` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `params`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de authUserId o ausencia de userRowId`, `ausencia de availability.ok o ausencia de availability.available`, `ausencia de prompt.ok o ausencia de prompt.verified`, `ausencia de saveResult.ok`, `ausencia de userUpdate.ok`.
- **Usa código de** [`isBiometricAvailable`](../../../packages/platform-rn/src/biometrics/biometricService.js#L1) (llama), [`promptBiometric`](../../../packages/platform-rn/src/biometrics/biometricService.js#L5) (llama), [`saveBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L27) (llama).
- **Llamadas directas en el cuerpo** [`normalizeUserIds`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L183), [`isBiometricAvailable`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L188), [`promptBiometric`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L196), [`saveBiometricToken`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L201), [`toISOString`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L202), [`updateUserAccessFlags`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L210).
- **Lo usa** [`handleEnrollBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L127) (llama).

#### [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L215) · función · asíncrona · exportado

Implementa `unlock With Biometric Access` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `params`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de authUserId`, `ausencia de token`, `ausencia de availability.ok o ausencia de availability.available`, `ausencia de prompt.ok o ausencia de prompt.verified`.
- **Usa código de** [`loadBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L32) (llama), [`isBiometricAvailable`](../../../packages/platform-rn/src/biometrics/biometricService.js#L1) (llama), [`promptBiometric`](../../../packages/platform-rn/src/biometrics/biometricService.js#L5) (llama), [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L216), [`loadBiometricToken`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L221), [`isBiometricAvailable`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L226), [`promptBiometric`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L234), [`unlockWithBiometrics`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L239), [`useSecurityStore.getState`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L239).
- **Lo usa** [`handleUnlockBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L139) (llama).

#### [`disableBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L243) · función · asíncrona · exportado

Finaliza `Biometric Access` y ajusta el estado que depende de esa operación.

- **Entradas** `params`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de authUserId o ausencia de userRowId`, `ausencia de userUpdate.ok`.
- **Usa código de** [`deleteBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L36) (llama).
- **Llamadas directas en el cuerpo** [`normalizeUserIds`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L247), [`deleteBiometricToken`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L251), [`updateUserAccessFlags`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L252).
- **Lo usa** [`handleDisableBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L150) (llama).

#### [`sendSensitiveReauthEmail`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L257) · función · asíncrona · exportado

Opera sobre Auth `reauthenticate` y coordina las demás operaciones de esta ficha.

- **Entradas** `email`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de normalized o ausencia de normalized.includes`, `function`, `error`.
- **Contrato de datos** Auth `reauthenticate` en [`localAccessSecurity.ts:264`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L264), Auth `signInWithOtp` en [`localAccessSecurity.ts:271`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L271).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L258), [`normalized.includes`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L259), [`supabase.auth.reauthenticate`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L264), [`supabase.auth.signInWithOtp`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L271).
- **Lo usa** [`handleSendReauthEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L168) (llama).

#### [`confirmSensitiveReauth`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L281) · función · exportado

Implementa `confirm Sensitive Reauth` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Retorno visible o tipo declarado** `ok`.
- **Usa código de** [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) (accede al módulo).
- **Llamadas directas en el cuerpo** [`unlockWithPassword`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L282), [`useSecurityStore.getState`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L282).
- **Lo usa** [`handleConfirmReauth`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L178) (llama).

#### [`requiredLevelForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L286) · función · exportado

Comprueba `d Level For Action` para decidir si se admite o continúa la operación.

- **Entradas** `action`.
- **Usa código de** [`getRequiredLevelForAction`](../../../packages/security-core/src/unlock/unlockPolicy.js#L15) (llama).
- **Llamadas directas en el cuerpo** [`getRequiredLevelForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L287).

### [`apps/referidos-android/src/shared/services/accountLifecycle.ts`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L1)

Invoca `delete-account` con la sesión actual y convierte la respuesta en estado útil para los perfiles. La política y el efecto de esta operación se implementan dentro de la Edge Function de Supabase.

**Superficie que exporta.** [`deleteCurrentUserAccount`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L7).

**Módulos que lo cargan.** [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L37) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L38) (importa).

**Dependencias del archivo.** [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L3) · función

Obtiene o resuelve `Error Message` para entregarlo al consumidor.

- **Entradas** `error`.
- **Lo usa** [`deleteCurrentUserAccount`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L34) (llama).

#### [`deleteCurrentUserAccount`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L7) · función · asíncrona · exportado

Consulta o invoca Edge [`delete-account`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts) y coordina las demás operaciones de esta ficha.

- **Entradas** `userAuthId`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de safeUserAuthId`, `ausencia de session.access_token`, `error`, `data.ok`.
- **Contrato de datos** Auth `getSession` en [`accountLifecycle.ts:15`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L15), Edge [`delete-account`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts) en [`accountLifecycle.ts:24`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L24).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L8), [`supabase.auth.getSession`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L15), [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L24), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L34).
- **Lo usa** [`onConfirm`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L303) (llama), [`onConfirm`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L337) (llama).

### [`apps/referidos-android/src/shared/services/adminOps.ts`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L1)

Lee y cuenta tablas para administración, con adaptación a columnas existentes. Centraliza las llamadas autenticadas de reportes y métricas Prelaunch y las consultas de eventos/issues. Recupera el access token de la sesión antes de invocar operaciones que lo requieren.

**Superficie que exporta.** [`countAdminRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L101), [`fetchAdminNegocios`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L114), [`fetchAdminPromos`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L121), [`fetchAdminQrs`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L128), [`fetchAdminReportes`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L135), [`updateAdminReporteStatus`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L142), [`fetchAdminPrelaunchMetrics`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L157), [`fetchAdminIssueEventDetail`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L167), [`cacheAdminIssue`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L185).

**Módulos que lo cargan.** [`AdminAnalyticsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L5) (importa), [`AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L5) (importa), [`AdminIssueEventDetailScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L6) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L7) (importa), [`AdminNegociosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L5) (importa), [`AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L5) (importa), [`AdminQRsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L5) (importa), [`AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L5) (importa).

**Dependencias del archivo.** [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L3) · función

Obtiene o resuelve `Error Message` para entregarlo al consumidor.

- **Entradas** `error`.
- **Lo usa** [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L8) (llama), [`selectTableRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L82) (llama), [`countAdminRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L106) (llama), [`fetchAdminIssueEventDetail`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L180) (llama).

#### [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L7) · función

Comprueba `Missing Column Error` para decidir si se admite o continúa la operación.

- **Entradas** `error`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L8), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L8), [`text.includes`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L10).
- **Lo usa** [`selectTableRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L81) (llama).

#### [`normalizeDays`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L17) · función

Normaliza `Days` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`.
- **Lo usa** [`fetchAdminPrelaunchMetrics`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L162) (llama).

#### [`getSessionAccessToken`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L23) · función · asíncrona

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Condiciones que evalúa** `ausencia de accessToken`.
- **Contrato de datos** Auth `getSession` en [`adminOps.ts:26`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L26).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L26).
- **Lo usa** [`invokeAuthedFunction`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L35) (llama).

#### [`invokeAuthedFunction`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L34) · función · asíncrona

Implementa `invoke Authed Function` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `name`, `body = valor por defecto`.
- **Condiciones que evalúa** `error`, `data.ok`.
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`getSessionAccessToken`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L35), [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L36).
- **Lo usa** [`updateAdminReporteStatus`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L151) (llama), [`fetchAdminPrelaunchMetrics`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L161) (llama), [`cacheAdminIssue`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L190) (llama).

#### [`selectTableRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L52) · función · asíncrona

Procesa `Table Rows` según el criterio del módulo.

- **Entradas** `table`, `options = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`, `orderColumn`, `error`.
- **Condiciones que evalúa** `ausencia de result.error`, `isMissingColumnError`, `lastError`, `fallback.error`.
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L67), [`order`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L67), [`select`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L67), [`supabase.from`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L67), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L81), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L82).
- **Lo usa** [`fetchAdminNegocios`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L115) (llama), [`fetchAdminPromos`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L122) (llama), [`fetchAdminQrs`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L129) (llama), [`fetchAdminReportes`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L136) (llama).

#### [`countAdminRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L101) · función · asíncrona · exportado

Procesa `Admin Rows` según el criterio del módulo.

- **Entradas** `table`.
- **Retorno visible o tipo declarado** `ok`, `count`, `error`.
- **Condiciones que evalúa** `error`.
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`select`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L102), [`supabase.from`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L102), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L106).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L58) (llama).

#### [`fetchAdminNegocios`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L114) · función · asíncrona · exportado

Obtiene o resuelve `Admin Negocios` para entregarlo al consumidor.

- **Entradas** `limit = valor por defecto`.
- **Llamadas directas en el cuerpo** [`selectTableRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L115).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L64) (llama), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L20) (llama).

#### [`fetchAdminPromos`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L121) · función · asíncrona · exportado

Obtiene o resuelve `Admin Promos` para entregarlo al consumidor.

- **Entradas** `limit = valor por defecto`.
- **Llamadas directas en el cuerpo** [`selectTableRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L122).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L65) (llama), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L34) (llama).

#### [`fetchAdminQrs`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L128) · función · asíncrona · exportado

Obtiene o resuelve `Admin Qrs` para entregarlo al consumidor.

- **Entradas** `limit = valor por defecto`.
- **Llamadas directas en el cuerpo** [`selectTableRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L129).
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L19) (llama).

#### [`fetchAdminReportes`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L135) · función · asíncrona · exportado

Obtiene o resuelve `Admin Reportes` para entregarlo al consumidor.

- **Entradas** `limit = valor por defecto`.
- **Llamadas directas en el cuerpo** [`selectTableRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L136).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L66) (llama), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L30) (llama).

#### [`updateAdminReporteStatus`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L142) · función · asíncrona · exportado

Aplica o guarda `Admin Reporte Status` para que el estado refleje la operación.

- **Entradas** `reporteId`, `estado`.
- **Condiciones que evalúa** `ausencia de safeReporteId`, `ausencia de safeEstado`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L143), [`invokeAuthedFunction`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L151).
- **Lo usa** [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L106) (llama).

#### [`fetchAdminPrelaunchMetrics`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L157) · función · asíncrona · exportado

Obtiene o resuelve `Admin Prelaunch Metrics` para entregarlo al consumidor.

- **Entradas** `{days, appChannel} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeAuthedFunction`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L161), [`normalizeDays`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L162), [`trim`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L163).
- **Lo usa** [`loadMetrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L38) (llama).

#### [`fetchAdminIssueEventDetail`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L167) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) y coordina las demás operaciones de esta ficha.

- **Entradas** `eventId`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeEventId`, `error`.
- **Contrato de datos** tabla o vista [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) (`select`) en [`adminOps.ts:173`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L173), tabla o bucket [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) en [`adminOps.ts:173`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L173).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L168), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L173), [`eq`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L173), [`select`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L173), [`supabase.from`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L173), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L180).
- **Lo usa** [`loadRow`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L36) (llama).

#### [`cacheAdminIssue`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L185) · función · asíncrona · exportado

Implementa `cache Admin Issue` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `issueId`.
- **Condiciones que evalúa** `ausencia de safeIssueId`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L186), [`invokeAuthedFunction`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L190).
- **Lo usa** [`handleCacheIssue`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L97) (llama).

### [`apps/referidos-android/src/shared/services/appNotifications.ts`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L1)

Consulta `app_notifications`, normaliza los roles y llama las RPC para marcar como leída una selección o un scope. Guarda preferencias de temas en AsyncStorage. Centraliza políticas de frecuencia, con modo híbrido para admin/soporte y carga por montaje para cliente/negocio.

**Superficie que exporta.** [`DEFAULT_NOTIFICATION_PREFS`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L5), [`normalizeNotificationRole`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L51), [`createNotificationPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L61), [`canPollByPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L71), [`canRealtimeByPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L76), [`fetchAppNotifications`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L82), [`markAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L109), [`markAllAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L125), [`getNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L152), [`setNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L161), [`toggleNotificationPref`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L171), [`getDeviceNotificationPermissionLabel`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L180).

**Módulos que lo cargan.** [`ProfileRuntimePanels.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L6) (importa), [`useRoleNotifications.ts`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L3) (importa).

**Dependencias del archivo.** `@react-native-async-storage/async-storage`, `react-native`, [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`DEFAULT_NOTIFICATION_PREFS`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L5) · variable de módulo · exportado

Declara `DEFAULT_NOTIFICATION_PREFS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizePrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L143) (referencia), [`getNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L155) (referencia), [`toggleNotificationPref`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L171) (referencia).

#### [`PREFS_STORAGE_KEY`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L11) · variable de módulo

Declara `PREFS_STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L154) (referencia), [`setNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L164) (referencia).

#### [`DEFAULT_POLICY`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L12) · variable de módulo

Declara `DEFAULT_POLICY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createNotificationPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L63) (referencia).

#### [`ROLE_POLICIES`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L19) · variable de módulo

Declara `ROLE_POLICIES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createNotificationPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L63) (referencia).

#### [`isTableMissing`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L46) · función

Comprueba `Table Missing` para decidir si se admite o continúa la operación.

- **Entradas** `error`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L47), [`message.includes`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L48).
- **Lo usa** [`fetchAppNotifications`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L100) (llama), [`markAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L117) (llama), [`markAllAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L129) (llama).

#### [`normalizeNotificationRole`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L51) · función · exportado

Normaliza `Notification Role` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `rawRole`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L52), [`trim`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L52).
- **Lo usa** [`createNotificationPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L62) (llama), [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L30) (llama).

#### [`createNotificationPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L61) · función · exportado

Construye `Notification Policy` a partir de los datos del flujo.

- **Entradas** `role`, `overrides = valor por defecto`.
- **Llamadas directas en el cuerpo** [`normalizeNotificationRole`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L62).
- **Lo usa** [`policy`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L32) (llama).

#### [`canPollByPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L71) · función · exportado

Comprueba `Poll By Policy` para decidir si se admite o continúa la operación.

- **Entradas** `policy`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L72).
- **Lo usa** [`refresh`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L42) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L111) (llama).

#### [`canRealtimeByPolicy`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L76) · función · exportado

Comprueba `Realtime By Policy` para decidir si se admite o continúa la operación.

- **Entradas** `policy`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de policy.realtime`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L77).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L123) (llama).

#### [`fetchAppNotifications`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L82) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`app_notifications`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L4) y coordina las demás operaciones de esta ficha.

- **Entradas** `{limit, unreadOnly, scope} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `unreadOnly`, `scope`, `error`, `isTableMissing`.
- **Contrato de datos** tabla o vista [`app_notifications`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L4) (`select`) en [`appNotifications.ts:87`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L87), tabla o bucket [`app_notifications`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L4) en [`appNotifications.ts:87`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L87).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L87), [`order`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L87), [`select`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L87), [`supabase.from`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L87), [`query.eq`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L95), [`isTableMissing`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L100).
- **Lo usa** [`refresh`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L44) (llama).

#### [`markAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L109) · función · asíncrona · exportado

Consulta o invoca RPC [`notifications_mark_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L158). El resultado se adapta al contrato del consumidor.

- **Entradas** `ids = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `updated`, `error`.
- **Condiciones que evalúa** `normalizedIds.length`, `error`, `isTableMissing`.
- **Contrato de datos** RPC [`notifications_mark_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L158) en [`appNotifications.ts:113`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L113).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L110), [`supabase.rpc`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L113), [`isTableMissing`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L117).
- **Lo usa** [`markRead`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L61) (llama).

#### [`markAllAppNotificationsRead`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L125) · función · asíncrona · exportado

Consulta o invoca RPC [`notifications_mark_all_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L184). El resultado se adapta al contrato del consumidor.

- **Entradas** `scope = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `updated`, `error`.
- **Condiciones que evalúa** `error`, `isTableMissing`.
- **Contrato de datos** RPC [`notifications_mark_all_read`](../../../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L184) en [`appNotifications.ts:127`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L127).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.rpc`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L127), [`isTableMissing`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L129).
- **Lo usa** [`markAllRead`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L77) (llama).

#### [`normalizePrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L141) · función

Normaliza `Prefs` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `promos`, `novedades`, `seguridad`.
- **Condiciones que evalúa** `ausencia de raw o object o Array.isArray`.
- **Lo usa** [`getNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L155) (llama), [`setNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L162) (llama).

#### [`getNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L152) · función · asíncrona · exportado

Obtiene o resuelve `Notification Prefs` para entregarlo al consumidor.

- **Efectos y APIs** `AsyncStorage.getItem`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.getItem`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L154), [`normalizePrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L155).
- **Lo usa** [`toggleNotificationPref`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L172) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L77) (llama).

#### [`setNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L161) · función · asíncrona · exportado

Aplica o guarda `Notification Prefs` para que el estado refleje la operación.

- **Entradas** `nextPrefs`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `AsyncStorage.setItem`.
- **Llamadas directas en el cuerpo** [`normalizePrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L162), [`AsyncStorage.setItem`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L164).
- **Lo usa** [`toggleNotificationPref`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L177) (llama).

#### [`toggleNotificationPref`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L171) · función · asíncrona · exportado

Coordina cambios de estado durante `toggle Notification Pref`.

- **Entradas** `key`.
- **Actualizaciones de estado o acciones** `setNotificationPrefs`.
- **Llamadas directas en el cuerpo** [`getNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L172), [`setNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L177).
- **Lo usa** [`handleTogglePref`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L86) (llama).

#### [`getDeviceNotificationPermissionLabel`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L180) · función · exportado

Obtiene o resuelve `Device Notification Permission Label` para entregarlo al consumidor.

- **Lo usa** [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L93) (llama).
