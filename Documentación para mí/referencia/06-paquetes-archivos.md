# Archivos de paquetes compartidos

Empieza por el [capítulo de paquetes](../06-paquetes-compartidos.md). Los exportados e imports ayudan a encontrar el consumidor que se afecta. El helper de logs móvil se marca como archivo local ignorado.


## `packages/api-client`

- [package.json](../../packages/api-client/package.json) — Manifiesto con los subpaths móviles y públicos, además de los aliases de compatibilidad. Declara Supabase y dominio.

## `packages/api-client/src/address`

- [gpsFallback.js](../../packages/api-client/src/address/gpsFallback.js) — Lee y guarda ubicación GPS de respaldo en el runtime para la sesión del usuario. **Interfaz:** `saveGpsFallbackLocation`, `getGpsFallbackLocation`. **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).
- [reverse.js](../../packages/api-client/src/address/reverse.js) — Envuelve geocodificación inversa, a partir de latitud y longitud. **Interfaz:** `reverseGeocode`. **Conecta con:** [sessionHelpers.js](../../packages/api-client/src/clients/sessionHelpers.js). **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).
- [search.js](../../packages/api-client/src/address/search.js) — Encamina búsqueda de direcciones al endpoint y adapta sus datos a la interfaz móvil. **Interfaz:** `searchAddresses`. **Conecta con:** [index.js](../../packages/domain/src/index.js), [sessionHelpers.js](../../packages/api-client/src/clients/sessionHelpers.js). **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).
- [territory.js](../../packages/api-client/src/address/territory.js) — Consulta catálogo territorial para formularios de provincia, cantón y parroquia. **Interfaz:** `fetchProvincias`, `fetchCantonesByProvincia`, `fetchParroquiasByCanton`. **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).

## `packages/api-client/src/auth`

- [onboarding.js](../../packages/api-client/src/auth/onboarding.js) — Llama a onboarding con sesión. Entrega a Android estado de acceso, perfil y pasos pendientes. **Interfaz:** `runOnboardingCheck`. **Conecta con:** [sessionHelpers.js](../../packages/api-client/src/clients/sessionHelpers.js). **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).
- [registration.js](../../packages/api-client/src/auth/registration.js) — Invoca validate-registration, que valida el registro del usuario de la sesión. Delega normalización del resultado al contrato móvil. **Interfaz:** `runValidateRegistration`. **Conecta con:** [sessionHelpers.js](../../packages/api-client/src/clients/sessionHelpers.js). **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).

## `packages/api-client/src/clients`

- [createSupabaseMobileClient.js](../../packages/api-client/src/clients/createSupabaseMobileClient.js) — Construye el cliente Supabase para React Native. Define opciones de auth, almacenamiento cuando se inyecta y manejo de sesión sin depender del navegador. **Interfaz:** `createSupabaseMobileClient`. **Lo usa:** [index.js](../../packages/api-client/src/index.js).
- [sessionHelpers.js](../../packages/api-client/src/clients/sessionHelpers.js) — Obtiene token vigente y ofrece invocación autenticada de funciones. Uniforma respuestas de falta de sesión y fallo de transporte. **Interfaz:** `getAccessToken`, `invokeWithSession`. **Lo usa:** [reverse.js](../../packages/api-client/src/address/reverse.js), [search.js](../../packages/api-client/src/address/search.js), [onboarding.js](../../packages/api-client/src/auth/onboarding.js) y 3 más.

## `packages/api-client/src`

- [createMobileApi.js](../../packages/api-client/src/createMobileApi.js) — Ensamble de operaciones móviles sobre un cliente Supabase inyectado. Organiza Auth, dirección, soporte y logs con una interfaz estable para Android. Importa un helper de logs excluido por .gitignore en este checkout. **Interfaz:** `createMobileApi`. **Conecta con:** [onboarding.js](../../packages/api-client/src/auth/onboarding.js), [registration.js](../../packages/api-client/src/auth/registration.js), [search.js](../../packages/api-client/src/address/search.js), [reverse.js](../../packages/api-client/src/address/reverse.js), [gpsFallback.js](../../packages/api-client/src/address/gpsFallback.js) y 3 más. **Lo usa:** [index.js](../../packages/api-client/src/index.js).
- [index.js](../../packages/api-client/src/index.js) — Agrega exports y nombres históricos createApiClient y createSupabaseClient. Importar esta entrada carga las dependencias de la rama móvil. **Interfaz:** `createSupabaseClient`, `createApiClient`. **Conecta con:** [createSupabaseMobileClient.js](../../packages/api-client/src/clients/createSupabaseMobileClient.js), [createMobileApi.js](../../packages/api-client/src/createMobileApi.js), [index.js](../../packages/api-client/src/prelaunch/index.js). **Lo usa:** [mobileApi.ts](../../apps/referidos-android/src/shared/services/mobileApi.ts).

## `packages/api-client/src/logs`

- [logEvent.js](../../packages/api-client/src/logs/logEvent.js) — Helper presente localmente para el envío de logging de Android. Se cataloga porque un import versionado depende de él. Git lo ignora mediante la regla logs y por tanto falta en un clon limpio. **Interfaz:** `logEvent`. **Conecta con:** [sessionHelpers.js](../../packages/api-client/src/clients/sessionHelpers.js). **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).

## `packages/api-client/src/prelaunch`

- [anonIdentity.js](../../packages/api-client/src/prelaunch/anonIdentity.js) — Crea o recupera identificadores de navegador/visita y extrae UTM. El cliente lo usa para contexto de captación, no como autenticación de usuario. **Interfaz:** `getOrCreateAnonId`, `getOrCreateVisitSessionId`, `buildAnonymousIdentity`, `extractUtmFromSearch`. **Lo usa:** [createPrelaunchClient.js](../../packages/api-client/src/prelaunch/createPrelaunchClient.js), [index.js](../../packages/api-client/src/prelaunch/index.js).
- [createPrelaunchClient.js](../../packages/api-client/src/prelaunch/createPrelaunchClient.js) — Ensambla cliente fetch público para waitlist, analytics, soporte y feedback. Incluye clave publicable y adjunta contexto de app/tenant e identidad anónima. **Interfaz:** `createPrelaunchClient`. **Conecta con:** [anonIdentity.js](../../packages/api-client/src/prelaunch/anonIdentity.js), [publicClient.js](../../packages/feedback-sdk/src/publicClient.js), [shared.js](../../packages/feedback-sdk/src/shared.js). **Lo usa:** [index.js](../../packages/api-client/src/prelaunch/index.js).
- [index.js](../../packages/api-client/src/prelaunch/index.js) — Exporta el cliente público y helpers de identidad para que Prelaunch use una entrada distinta de Android. **Conecta con:** [anonIdentity.js](../../packages/api-client/src/prelaunch/anonIdentity.js), [createPrelaunchClient.js](../../packages/api-client/src/prelaunch/createPrelaunchClient.js). **Lo usa:** [prelaunchSystem.js](../../apps/prelaunch/src/services/prelaunchSystem.js), [index.js](../../packages/api-client/src/index.js).

## `packages/api-client/src/support`

- [supportClient.js](../../packages/api-client/src/support/supportClient.js) — Reúne invocaciones móviles de tickets, cambios de estado, asignación, jornadas y operaciones de soporte sobre un cliente inyectado. **Interfaz:** `createSupportThread`, `assignSupportThread`, `updateSupportStatus`, `addSupportNote`, `closeSupportThread`, `createIrregularThread`, `startSupportSession`, `endSupportSession`, `pingSupportSession`. **Conecta con:** [sessionHelpers.js](../../packages/api-client/src/clients/sessionHelpers.js). **Lo usa:** [createMobileApi.js](../../packages/api-client/src/createMobileApi.js).

## `packages/domain`

- [package.json](../../packages/domain/package.json) — Declara exports de dominio sin enlazar el paquete a una UI.

## `packages/domain/src/auth`

- [authRoles.js](../../packages/domain/src/auth/authRoles.js) — Constantes para roles del flujo de registro. Evita dispersar nombres en el cliente móvil. **Interfaz:** `AUTH_ROLES`, `APP_ROLES`. **Lo usa:** [index.js](../../packages/domain/src/index.js).
- [authSteps.js](../../packages/domain/src/auth/authSteps.js) — Constantes para el identificador de cada paso de auth y onboarding. **Interfaz:** `AUTH_STEPS`, `AUTH_FORM_STEPS`. **Lo usa:** [flowRules.js](../../packages/domain/src/auth/flowRules.js), [index.js](../../packages/domain/src/index.js).
- [flowRules.js](../../packages/domain/src/auth/flowRules.js) — Resuelve el siguiente paso a partir de rol, metadata y resultado de onboarding. Mantiene lógica de decisión fuera de la pantalla. **Interfaz:** `hasReason`, `getMissingFieldsFromReasons`, `resolveClientPendingSteps`, `resolveRegistrationStep`, `resolveVerificationStep`. **Conecta con:** [authSteps.js](../../packages/domain/src/auth/authSteps.js). **Lo usa:** [index.js](../../packages/domain/src/index.js).

## `packages/domain/src/catalogs`

- [businessCategories.js](../../packages/domain/src/catalogs/businessCategories.js) — Lista categorías semánticas que usan formularios de negocio y el motor móvil. **Interfaz:** `BUSINESS_CATEGORIES`, `BUSINESS_SUBCATEGORIES`, `resolveCategoryPath`. **Lo usa:** [index.js](../../packages/domain/src/index.js).

## `packages/domain/src`

- [index.js](../../packages/domain/src/index.js) — Expone públicamente pasos, roles, categorías, normalizadores y validadores. **Conecta con:** [authSteps.js](../../packages/domain/src/auth/authSteps.js), [authRoles.js](../../packages/domain/src/auth/authRoles.js), [flowRules.js](../../packages/domain/src/auth/flowRules.js), [index.js](../../packages/domain/src/validators/index.js), [text.js](../../packages/domain/src/normalizers/text.js) y 3 más. **Lo usa:** [AuthFlowScreen.tsx](../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx), [OwnerProfileStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx), [useAuthEngine.ts](../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts) y 2 más.

## `packages/domain/src/normalizers`

- [phone.js](../../packages/domain/src/normalizers/phone.js) — Normaliza teléfonos para producir el formato esperado por el flujo. **Interfaz:** `COUNTRY_CODES`, `parsePhoneWithCountry`, `normalizePhoneDigits`, `isPhoneValidForCountry`, `toStoragePhone`, `toDisplayPhone`. **Lo usa:** [index.js](../../packages/domain/src/index.js).
- [text.js](../../packages/domain/src/normalizers/text.js) — Transformaciones reutilizables de texto para convertir entrada libre a forma consistente. **Interfaz:** `toTitleCaseEs`, `normalizeLooseSearch`. **Lo usa:** [index.js](../../packages/domain/src/index.js).
- [userProfile.js](../../packages/domain/src/normalizers/userProfile.js) — Formatea valores de perfil, como nombre y fecha, en campos del registro. **Interfaz:** `USER_NAME_MAX`, `normalizeUserName`, `formatBirthdateInput`, `parseBirthdate`, `buildBirthdateISO`, `getBirthdateStatus`, `formatBirthdateForInput`, `getUserProfileStatus`. **Lo usa:** [index.js](../../packages/domain/src/index.js).

## `packages/domain/src/validators`

- [index.js](../../packages/domain/src/validators/index.js) — Validadores comunes de datos de auth y perfil para reducir divergencias entre pasos. **Interfaz:** `EMAIL_RE`, `PHONE_EC_RE`, `CODE_RE`, `RUC_RE`, `validateEmail`, `validateEcuadorPhone`, `validateRegistrationCode`, `validarCedula`, `validateRucFromCedula`. **Lo usa:** [index.js](../../packages/domain/src/index.js).

## `packages/feedback-sdk`

- [package.json](../../packages/feedback-sdk/package.json) — Expone entrada, contrato compartido y cliente de envío público.

## `packages/feedback-sdk/src`

- [index.js](../../packages/feedback-sdk/src/index.js) — Agrega exports de normalización y transporte de feedback. **Conecta con:** [shared.js](../../packages/feedback-sdk/src/shared.js), [publicClient.js](../../packages/feedback-sdk/src/publicClient.js).
- [publicClient.js](../../packages/feedback-sdk/src/publicClient.js) — Invoca feedback-submit a través de Supabase o un invocador público inyectado según el consumidor. Uniforma resultado y error. **Interfaz:** `submitPublicFeedback`, `invokePublicFeedbackSubmit`. **Lo usa:** [createPrelaunchClient.js](../../packages/api-client/src/prelaunch/createPrelaunchClient.js), [index.js](../../packages/feedback-sdk/src/index.js).
- [shared.js](../../packages/feedback-sdk/src/shared.js) — Define tamaños, normaliza nombre, correo, texto y audiencia, y genera rangos de longitud para analítica. **Interfaz:** `FEEDBACK_NAME_MAX`, `FEEDBACK_EMAIL_MAX`, `FEEDBACK_MESSAGE_MAX`, `normalizeFeedbackOriginRole`, `normalizeFeedbackName`, `normalizeFeedbackEmail`, `normalizeFeedbackMessage`, `bucketFeedbackMessageLength`. **Conecta con:** [index.js](../../packages/intake-guard/src/index.js). **Lo usa:** [createPrelaunchClient.js](../../packages/api-client/src/prelaunch/createPrelaunchClient.js), [index.js](../../packages/feedback-sdk/src/index.js).

## `packages/intake-guard`

- [package.json](../../packages/intake-guard/package.json) — Declara punto de entrada único para utilidades del ingreso público.

## `packages/intake-guard/src`

- [index.js](../../packages/intake-guard/src/index.js) — Normaliza inputs, extrae IP, construye hashes y huellas de envío, calcula ventanas y registra señales en el runtime. Mantiene la política particular en cada endpoint. **Interfaz:** `safeTrim`, `isRecord`, `parseUuid`, `getClientIp`, `sha256Hex`, `buildDailyIpRiskId`, `buildUserAgentHash`, `buildContactHash`, `normalizeMessageForHash`. **Lo usa:** [shared.js](../../packages/feedback-sdk/src/shared.js).

## `packages/legal-content/content/en`

- [data-deletion.md](../../packages/legal-content/content/en/data-deletion.md) — Versión en inglés de eliminación de datos de producto. **Lo usa:** [legalDocsRegistry.js](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js), [index.js](../../packages/legal-content/src/index.js).
- [privacy.md](../../packages/legal-content/content/en/privacy.md) — Versión en inglés de privacidad de producto. **Lo usa:** [legalDocsRegistry.js](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js), [index.js](../../packages/legal-content/src/index.js).
- [terms.md](../../packages/legal-content/content/en/terms.md) — Versión en inglés de términos de producto. **Lo usa:** [legalDocsRegistry.js](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js), [index.js](../../packages/legal-content/src/index.js).

## `packages/legal-content/content/es`

- [borrar-correo-lista.md](../../packages/legal-content/content/es/borrar-correo-lista.md) — Procedimiento para retirar el correo de la lista de espera. **Lo usa:** [prelaunch.js](../../packages/legal-content/src/prelaunch.js).
- [data-deletion.md](../../packages/legal-content/content/es/data-deletion.md) — Procedimiento de eliminación de datos de producto en español. **Lo usa:** [legalDocsRegistry.js](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js), [index.js](../../packages/legal-content/src/index.js).
- [politicas-privacidad-lista.md](../../packages/legal-content/content/es/politicas-privacidad-lista.md) — Política de privacidad para la lista de espera pública. **Lo usa:** [prelaunch.js](../../packages/legal-content/src/prelaunch.js).
- [privacy.md](../../packages/legal-content/content/es/privacy.md) — Texto fuente de privacidad de producto en español. **Lo usa:** [legalDocsRegistry.js](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js), [index.js](../../packages/legal-content/src/index.js).
- [terminos-condiciones-lista.md](../../packages/legal-content/content/es/terminos-condiciones-lista.md) — Términos del registro previo al lanzamiento. **Lo usa:** [prelaunch.js](../../packages/legal-content/src/prelaunch.js).
- [terms.md](../../packages/legal-content/content/es/terms.md) — Texto fuente de términos de producto en español. **Lo usa:** [legalDocsRegistry.js](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js), [index.js](../../packages/legal-content/src/index.js).

## `packages/legal-content`

- [package.json](../../packages/legal-content/package.json) — Expone entradas separadas para app principal y Prelaunch.

## `packages/legal-content/src`

- [LegalContent.jsx](../../packages/legal-content/src/LegalContent.jsx) — Renderiza el Markdown del catálogo en componentes web. **Interfaz:** `LegalContent`. **Lo usa:** [index.js](../../packages/legal-content/src/index.js), [prelaunch.js](../../packages/legal-content/src/prelaunch.js).
- [index.js](../../packages/legal-content/src/index.js) — Importa documentos de producto en es/en como raw. Resuelve claves y locales y exporta el renderer común. **Interfaz:** `LEGAL_LOCALES`, `LEGAL_DOC_KEYS`, `normalizeLegalLocale`, `normalizeLegalDoc`, `getLegalMarkdown`, `LegalContent`. **Conecta con:** [LegalContent.jsx](../../packages/legal-content/src/LegalContent.jsx), [privacy.md](../../packages/legal-content/content/es/privacy.md), [terms.md](../../packages/legal-content/content/es/terms.md), [data-deletion.md](../../packages/legal-content/content/es/data-deletion.md), [privacy.md](../../packages/legal-content/content/en/privacy.md) y 2 más. **Lo usa:** [LegalContent.jsx](../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), [DataDeletionPage.jsx](../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx), [PrivacyPage.jsx](../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx) y 1 más.
- [prelaunch.js](../../packages/legal-content/src/prelaunch.js) — Resuelve los documentos legales de lista de espera. Usa fuente separada porque el tratamiento de datos y términos corresponde a otra superficie. **Interfaz:** `LEGAL_LOCALES`, `LEGAL_DOC_KEYS`, `normalizeLegalLocale`, `normalizeLegalDoc`, `getLegalMarkdown`, `LegalContent`. **Conecta con:** [LegalContent.jsx](../../packages/legal-content/src/LegalContent.jsx), [politicas-privacidad-lista.md](../../packages/legal-content/content/es/politicas-privacidad-lista.md), [terminos-condiciones-lista.md](../../packages/legal-content/content/es/terminos-condiciones-lista.md), [borrar-correo-lista.md](../../packages/legal-content/content/es/borrar-correo-lista.md). **Lo usa:** [LegalContent.jsx](../../apps/prelaunch/src/legal/blocks/LegalContent.jsx), [helpCenterArticles.js](../../apps/prelaunch/src/legal/helpCenterArticles.js), [DataDeletionPage.jsx](../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx) y 4 más.

## `packages/notifications-sdk`

- [package.json](../../packages/notifications-sdk/package.json) — Declara el paquete de hooks, políticas y acceso a notificaciones.

## `packages/notifications-sdk/src`

- [appNotificationsSource.js](../../packages/notifications-sdk/src/appNotificationsSource.js) — Consulta app_notifications y llama a las RPC de marcar una selección o todas como leídas. **Interfaz:** `fetchAppNotifications`, `markAppNotificationsRead`, `markAllAppNotificationsRead`. **Lo usa:** [index.js](../../packages/notifications-sdk/src/index.js), [useRoleNotifications.js](../../packages/notifications-sdk/src/useRoleNotifications.js).
- [index.js](../../packages/notifications-sdk/src/index.js) — Agrega fuentes, reglas y hooks para consumidores. **Interfaz:** `createNotificationPolicy`, `normalizeNotificationRole`, `canPollByPolicy`, `canRealtimeByPolicy`, `fetchAppNotifications`, `markAppNotificationsRead`, `markAllAppNotificationsRead`, `useRoleNotifications`, `useSupportWorkQueueNotifications`. **Conecta con:** [policies.js](../../packages/notifications-sdk/src/policies.js), [appNotificationsSource.js](../../packages/notifications-sdk/src/appNotificationsSource.js), [useRoleNotifications.js](../../packages/notifications-sdk/src/useRoleNotifications.js), [useSupportWorkQueueNotifications.js](../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js). **Lo usa:** [SupportChatTicketsBlock.jsx](../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx), [SupportWorkQueueDock.jsx](../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx).
- [policies.js](../../packages/notifications-sdk/src/policies.js) — Normaliza rol y define cuándo polling y Realtime son apropiados para su contexto. **Interfaz:** `normalizeNotificationRole`, `createNotificationPolicy`, `canPollByPolicy`, `canRealtimeByPolicy`. **Lo usa:** [index.js](../../packages/notifications-sdk/src/index.js), [useRoleNotifications.js](../../packages/notifications-sdk/src/useRoleNotifications.js), [useSupportWorkQueueNotifications.js](../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js).
- [useRoleNotifications.js](../../packages/notifications-sdk/src/useRoleNotifications.js) — Recarga y sincroniza notificaciones para el usuario/rol con la política efectiva. Expone acciones de lectura al layout. **Interfaz:** `useRoleNotifications`. **Conecta con:** [policies.js](../../packages/notifications-sdk/src/policies.js), [appNotificationsSource.js](../../packages/notifications-sdk/src/appNotificationsSource.js). **Lo usa:** [index.js](../../packages/notifications-sdk/src/index.js), [useSupportWorkQueueNotifications.js](../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js).
- [useSupportWorkQueueNotifications.js](../../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js) — Adapta señales de la cola de trabajo de soporte a avisos para agentes. Conserva la lógica de cola fuera del componente de UI. **Interfaz:** `useSupportWorkQueueNotifications`. **Conecta con:** [policies.js](../../packages/notifications-sdk/src/policies.js), [useRoleNotifications.js](../../packages/notifications-sdk/src/useRoleNotifications.js). **Lo usa:** [index.js](../../packages/notifications-sdk/src/index.js).

## `packages/observability-sdk`

- [package.json](../../packages/observability-sdk/package.json) — Exporta el cliente de observabilidad móvil y alias compatible.

## `packages/observability-sdk/src`

- [createMobileObservabilityClient.js](../../packages/observability-sdk/src/createMobileObservabilityClient.js) — Normaliza contexto, limpia valores, aplica límites y muestreo y programa el envío mediante el API móvil. **Interfaz:** `createMobileObservabilityClient`. **Lo usa:** [index.js](../../packages/observability-sdk/src/index.js).
- [index.js](../../packages/observability-sdk/src/index.js) — Entrada pública del SDK de observabilidad para Android. **Interfaz:** `createObservabilityClient`. **Conecta con:** [createMobileObservabilityClient.js](../../packages/observability-sdk/src/createMobileObservabilityClient.js). **Lo usa:** [mobileApi.ts](../../apps/referidos-android/src/shared/services/mobileApi.ts).

## `packages/observability`

- [package.json](../../packages/observability/package.json) — Publica subpaths de cliente, esquema, políticas, runtime y scrubber.

## `packages/observability/src/breadcrumbs`

- [catalog.js](../../packages/observability/src/breadcrumbs/catalog.js) — Catálogo de acciones diagnósticas y su versión. Construye breadcrumbs con vocabulario estable para analizar secuencias. **Interfaz:** `OBS_BREADCRUMB_CATALOG_VERSION`, `OBS_BREADCRUMB_CATALOG`, `getBreadcrumbTemplate`, `buildCatalogBreadcrumb`. **Lo usa:** [createObservabilityClient.js](../../packages/observability/src/client/createObservabilityClient.js), [index.js](../../packages/observability/src/index.js).

## `packages/observability/src/client`

- [createObservabilityClient.js](../../packages/observability/src/client/createObservabilityClient.js) — Facilita captura de errores, cola, deduplicación, envío por lotes y breadcrumbs de contexto. Se configura por app y destino. **Interfaz:** `createObservabilityClient`. **Conecta con:** [envelope.js](../../packages/observability/src/schema/envelope.js), [catalog.js](../../packages/observability/src/breadcrumbs/catalog.js), [scrub.js](../../packages/observability/src/utils/scrub.js). **Lo usa:** [index.js](../../packages/observability/src/index.js).

## `packages/observability/src`

- [index.js](../../packages/observability/src/index.js) — Punto agregado para clientes que arman su runtime web. **Interfaz:** `createObservabilityClient`, `buildReleaseFromEnv`, `normalizeEnvelope`, `validateEnvelope`, `OBS_ERROR_CODES`, `AUTHORITATIVE_LOGOUT_CODES`, `TRANSIENT_CODES`, `normalizeErrorCode`, `createPolicyRuntime`. **Conecta con:** [createObservabilityClient.js](../../packages/observability/src/client/createObservabilityClient.js), [envelope.js](../../packages/observability/src/schema/envelope.js), [errorCodes.js](../../packages/observability/src/schema/errorCodes.js), [uxPolicy.js](../../packages/observability/src/policy/uxPolicy.js), [scrub.js](../../packages/observability/src/utils/scrub.js) y 3 más. **Lo usa:** [prelaunchObservability.js](../../apps/prelaunch/src/observability/prelaunchObservability.js), [ErrorCatalogTable.jsx](../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx), [loggingClient.js](../../apps/referidos-app/src/services/loggingClient.js) y 1 más.

## `packages/observability/src/policy`

- [uxPolicy.js](../../packages/observability/src/policy/uxPolicy.js) — Resuelve la respuesta de interfaz según el evento, el error y la configuración de política. **Interfaz:** `createPolicyRuntime`. **Conecta con:** [errorCodes.js](../../packages/observability/src/schema/errorCodes.js). **Lo usa:** [index.js](../../packages/observability/src/index.js).

## `packages/observability/src/runtime`

- [createErrorRuntime.js](../../packages/observability/src/runtime/createErrorRuntime.js) — Crea el orquestador que conecta bus, política, UI y envío de eventos. **Interfaz:** `createErrorRuntime`. **Conecta con:** [errorCodes.js](../../packages/observability/src/schema/errorCodes.js), [errorBus.js](../../packages/observability/src/runtime/errorBus.js). **Lo usa:** [index.js](../../packages/observability/src/index.js).
- [errorBus.js](../../packages/observability/src/runtime/errorBus.js) — Distribución local de eventos o señales de errores entre componentes y runtime. **Interfaz:** `errorBus`. **Lo usa:** [index.js](../../packages/observability/src/index.js), [createErrorRuntime.js](../../packages/observability/src/runtime/createErrorRuntime.js).

## `packages/observability/src/schema`

- [envelope.js](../../packages/observability/src/schema/envelope.js) — Normaliza y valida el esquema común de evento y metadatos de release. **Interfaz:** `buildReleaseFromEnv`, `normalizeEnvelope`, `validateEnvelope`. **Conecta con:** [scrub.js](../../packages/observability/src/utils/scrub.js). **Lo usa:** [createObservabilityClient.js](../../packages/observability/src/client/createObservabilityClient.js), [index.js](../../packages/observability/src/index.js).
- [errorCodes.js](../../packages/observability/src/schema/errorCodes.js) — Catálogo de códigos estables que evita analizar solo textos de error libres. **Interfaz:** `OBS_ERROR_CODES`, `AUTHORITATIVE_LOGOUT_CODES`, `TRANSIENT_CODES`, `normalizeErrorCode`. **Lo usa:** [index.js](../../packages/observability/src/index.js), [uxPolicy.js](../../packages/observability/src/policy/uxPolicy.js), [createErrorRuntime.js](../../packages/observability/src/runtime/createErrorRuntime.js).

## `packages/observability/src/utils`

- [scrub.js](../../packages/observability/src/utils/scrub.js) — Enmascara patrones y campos sensibles en contexto. Su alcance depende de los valores y propiedades que reconozca. **Interfaz:** `scrubString`, `scrubUnknown`. **Lo usa:** [createObservabilityClient.js](../../packages/observability/src/client/createObservabilityClient.js), [index.js](../../packages/observability/src/index.js), [envelope.js](../../packages/observability/src/schema/envelope.js).

## `packages/platform-rn`

- [package.json](../../packages/platform-rn/package.json) — Declara los adaptadores móviles y la dependencia de almacenamiento.

## `packages/platform-rn/src/biometrics`

- [biometricService.js](../../packages/platform-rn/src/biometrics/biometricService.js) — Define el contrato de disponibilidad y prompt de biometría. La implementación en este checkout devuelve que no está configurada. **Interfaz:** `isBiometricAvailable`, `promptBiometric`. **Lo usa:** [index.js](../../packages/platform-rn/src/index.js).

## `packages/platform-rn/src/device`

- [deviceInfo.js](../../packages/platform-rn/src/device/deviceInfo.js) — Entrega información de dispositivo en forma consumible por capas que dependen de la plataforma. **Interfaz:** `getPlatformInfo`. **Lo usa:** [index.js](../../packages/platform-rn/src/index.js).

## `packages/platform-rn/src`

- [index.js](../../packages/platform-rn/src/index.js) — Exporta almacenamiento, biometría y descripción de dispositivo. **Conecta con:** [secureStorageService.js](../../packages/platform-rn/src/storage/secureStorageService.js), [biometricService.js](../../packages/platform-rn/src/biometrics/biometricService.js), [deviceInfo.js](../../packages/platform-rn/src/device/deviceInfo.js). **Lo usa:** [localAccessSecurity.ts](../../apps/referidos-android/src/shared/security/localAccessSecurity.ts).

## `packages/platform-rn/src/pin`

- [pinPolicy.js](../../packages/platform-rn/src/pin/pinPolicy.js) — Reglas móviles de formato de PIN conservadas junto a los adaptadores. La implementación de seguridad compartida también vive en security-core. **Interfaz:** `PIN_LENGTH`, `PIN_MAX_ATTEMPTS`, `PIN_LOCK_MS`, `isValidPin`.

## `packages/platform-rn/src/storage`

- [secureStorageService.js](../../packages/platform-rn/src/storage/secureStorageService.js) — Implementa archivos lógicos de biometría, PIN y material de dispositivo en AsyncStorage. Incluye contador local y hash de fallback. Su nombre describe un contrato y la implementación debe evaluarse por separado. **Interfaz:** `getSecureStorageMode`, `saveBiometricToken`, `loadBiometricToken`, `deleteBiometricToken`, `savePinHash`, `loadPinHash`, `deletePinHash`, `clearPinAttemptState`, `saveDeviceSecret`. **Lo usa:** [index.js](../../packages/platform-rn/src/index.js).

## `packages/platform-web`

- [package.json](../../packages/platform-web/package.json) — Expone adaptadores web de almacenamiento, biometría y dispositivo.

## `packages/platform-web/src/biometrics`

- [biometricService.js](../../packages/platform-web/src/biometrics/biometricService.js) — Modela disponibilidad y comportamiento biométrico para navegador en este paquete. Verifica el consumidor porque la PWA tiene código propio. **Interfaz:** `isBiometricAvailable`, `promptBiometric`. **Lo usa:** [index.js](../../packages/platform-web/src/index.js).

## `packages/platform-web/src/device`

- [deviceInfo.js](../../packages/platform-web/src/device/deviceInfo.js) — Obtiene o construye identificadores y detalles web usados por lógica de plataforma. **Interfaz:** `getPlatformInfo`. **Lo usa:** [index.js](../../packages/platform-web/src/index.js).

## `packages/platform-web/src`

- [index.js](../../packages/platform-web/src/index.js) — Agrupa exports del adaptador de navegador. **Conecta con:** [secureStorageService.js](../../packages/platform-web/src/storage/secureStorageService.js), [biometricService.js](../../packages/platform-web/src/biometrics/biometricService.js), [deviceInfo.js](../../packages/platform-web/src/device/deviceInfo.js).

## `packages/platform-web/src/storage`

- [secureStorageService.js](../../packages/platform-web/src/storage/secureStorageService.js) — Adaptador de almacenamiento web que usa localStorage. Coexiste con IndexedDB y Web Crypto del servicio interno de referidos-app. **Interfaz:** `saveBiometricToken`, `loadBiometricToken`, `deleteBiometricToken`, `savePinHash`, `loadPinHash`, `deletePinHash`, `clearUserSecurityMaterial`. **Lo usa:** [index.js](../../packages/platform-web/src/index.js).

## `packages/security-core`

- [package.json](../../packages/security-core/package.json) — Define entrada pública y subpaths de reglas de PIN y desbloqueo.

## `packages/security-core/src`

- [index.js](../../packages/security-core/src/index.js) — Exporta las políticas sin acoplarlas a React o React Native. **Conecta con:** [pinPolicy.js](../../packages/security-core/src/pin/pinPolicy.js), [unlockPolicy.js](../../packages/security-core/src/unlock/unlockPolicy.js). **Lo usa:** [localAccessSecurity.ts](../../apps/referidos-android/src/shared/security/localAccessSecurity.ts), [securityStore.ts](../../apps/referidos-android/src/shared/store/securityStore.ts).

## `packages/security-core/src/pin`

- [pinPolicy.js](../../packages/security-core/src/pin/pinPolicy.js) — Define longitud, límite de intentos, ventana de bloqueo y validación de PIN. **Interfaz:** `PIN_LENGTH`, `PIN_MAX_ATTEMPTS`, `PIN_LOCK_MS`, `isValidPin`. **Lo usa:** [index.js](../../packages/security-core/src/index.js).

## `packages/security-core/src/unlock`

- [unlockPolicy.js](../../packages/security-core/src/unlock/unlockPolicy.js) — Niveles y métodos, selección del nivel requerido por acción y orden de suficiencia entre niveles. **Interfaz:** `UNLOCK_LEVELS`, `UNLOCK_METHODS`, `getRequiredLevelForAction`, `isLevelSatisfied`. **Lo usa:** [index.js](../../packages/security-core/src/index.js).

## `packages/support-sdk/lib`

- [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js) — Resuelve el cliente web con una clave global de singleton compartida por convención. Revisa el orden de inicialización y los valores efectivos al aislar el SDK. **Interfaz:** `supabase`. **Lo usa:** [SupportErrorCatalog.jsx](../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx), [SupportGate.jsx](../../packages/support-sdk/src/agent/SupportGate.jsx), [SupportInbox.jsx](../../packages/support-sdk/src/agent/SupportInbox.jsx) y 7 más.

## `packages/support-sdk`

- [package.json](../../packages/support-sdk/package.json) — Declara integración con notifications-sdk. La PWA usa alias para importar módulos de agente.

## `packages/support-sdk/src/agent`

- [SupportDevDebugBanner.jsx](../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx) — Presenta información de diagnóstico en el contexto de desarrollo del agente. **Interfaz:** `SupportDevDebugBanner`. **Lo usa:** [SupportInbox.jsx](../../packages/support-sdk/src/agent/SupportInbox.jsx), [SupportTicket.jsx](../../packages/support-sdk/src/agent/SupportTicket.jsx).
- [SupportErrorCatalog.jsx](../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx) — Vista del catálogo de errores para consulta durante atención. **Interfaz:** `SupportErrorCatalog`. **Conecta con:** [index.js](../../packages/observability/src/index.js), [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js). **Lo usa:** [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportGate.jsx](../../packages/support-sdk/src/agent/SupportGate.jsx) — Interfaz de habilitación de la sesión de soporte. Ubica el requisito local y busca el permiso real en backend. **Interfaz:** `SupportGate`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js), [appStore.js](../../packages/support-sdk/store/appStore.js), [systemFeatureFlags.js](../../packages/support-sdk/src/runtime/systemFeatureFlags.js), [supportRuntimeFlags.js](../../packages/support-sdk/src/runtime/supportRuntimeFlags.js), [supportClient.js](../../packages/support-sdk/src/supportClient.js). **Lo usa:** [SupportInbox.jsx](../../packages/support-sdk/src/agent/SupportInbox.jsx).
- [SupportInbox.jsx](../../packages/support-sdk/src/agent/SupportInbox.jsx) — Lista, filtra y actualiza tickets. Su configuración permite reutilizar el inbox en superficies de administración. **Interfaz:** `SupportInbox`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js), [appStore.js](../../packages/support-sdk/store/appStore.js), [SupportGate.jsx](../../packages/support-sdk/src/agent/SupportGate.jsx), [SupportDevDebugBanner.jsx](../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx), [supportClient.js](../../packages/support-sdk/src/supportClient.js) y 1 más. **Lo usa:** [AdminSupportDesk.jsx](../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx), [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportInicio.jsx](../../packages/support-sdk/src/agent/SupportInicio.jsx) — Entrada del rol de soporte con el estado de disponibilidad y sus accesos. **Interfaz:** `SupportInicio`. **Lo usa:** [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportIrregular.jsx](../../packages/support-sdk/src/agent/SupportIrregular.jsx) — Flujo de captura de un caso irregular iniciado por el agente. **Interfaz:** `SupportIrregular`. **Conecta con:** [supportClient.js](../../packages/support-sdk/src/supportClient.js), [supportCatalog.js](../../packages/support-sdk/src/data/supportCatalog.js). **Lo usa:** [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportIssues.jsx](../../packages/support-sdk/src/agent/SupportIssues.jsx) — Consulta incidencias de observabilidad relacionadas con el trabajo de soporte. **Interfaz:** `SupportIssues`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js). **Lo usa:** [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportJornadas.jsx](../../packages/support-sdk/src/agent/SupportJornadas.jsx) — Muestra el estado e historial de jornadas/sesiones y expone las acciones correspondientes. **Interfaz:** `SupportJornadas`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js), [appStore.js](../../packages/support-sdk/store/appStore.js). **Lo usa:** [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportLayout.jsx](../../packages/support-sdk/src/agent/SupportLayout.jsx) — Armazón de soporte con navegación, estado de sesión, señales de cola y outlet para cada pantalla. **Interfaz:** `SupportLayout`. **Conecta con:** [SupportSidebar.jsx](../../packages/support-sdk/src/agent/SupportSidebar.jsx), [SupportTopbar.jsx](../../packages/support-sdk/src/agent/SupportTopbar.jsx), [SupportWorkQueueDock.jsx](../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx). **Lo usa:** [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportSidebar.jsx](../../packages/support-sdk/src/agent/SupportSidebar.jsx) — Navegación lateral del rol y acciones visibles por contexto. **Interfaz:** `SupportSidebar`. **Conecta con:** [appStore.js](../../packages/support-sdk/store/appStore.js). **Lo usa:** [SupportLayout.jsx](../../packages/support-sdk/src/agent/SupportLayout.jsx).
- [SupportTicket.jsx](../../packages/support-sdk/src/agent/SupportTicket.jsx) — Detalle del hilo, mensajes, notas, macros, asignación y cambios de workflow. Consume estados y clientes compartidos. **Interfaz:** `SupportTicket`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js), [supportClient.js](../../packages/support-sdk/src/supportClient.js), [supportCatalog.js](../../packages/support-sdk/src/data/supportCatalog.js), [SupportDevDebugBanner.jsx](../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx). **Lo usa:** [AdminSupportTicket.jsx](../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx), [routes.jsx](../../apps/referidos-app/src/routes.jsx).
- [SupportTopbar.jsx](../../packages/support-sdk/src/agent/SupportTopbar.jsx) — Cabecera del agente con navegación y controles de estado. **Interfaz:** `SupportTopbar`. **Conecta con:** [appStore.js](../../packages/support-sdk/store/appStore.js). **Lo usa:** [SupportLayout.jsx](../../packages/support-sdk/src/agent/SupportLayout.jsx).
- [SupportWorkQueueDock.jsx](../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx) — Presenta la cola de trabajo y señales accionables sin depender de una sola ruta de ticket. **Interfaz:** `SupportWorkQueueDock`. **Conecta con:** [appStore.js](../../packages/support-sdk/store/appStore.js), [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js), [index.js](../../packages/notifications-sdk/src/index.js), [systemFeatureFlags.js](../../packages/support-sdk/src/runtime/systemFeatureFlags.js). **Lo usa:** [SupportLayout.jsx](../../packages/support-sdk/src/agent/SupportLayout.jsx).

## `packages/support-sdk/src/data`

- [supportCatalog.js](../../packages/support-sdk/src/data/supportCatalog.js) — Datos auxiliares de soporte, etiquetas y opciones de catálogo que consume la interfaz. **Interfaz:** `normalizeSupportAppKey`, `normalizeSupportEnvKey`, `loadSupportCatalogFromCache`, `filterSupportMacrosForThread`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js). **Lo usa:** [SupportIrregular.jsx](../../packages/support-sdk/src/agent/SupportIrregular.jsx), [SupportTicket.jsx](../../packages/support-sdk/src/agent/SupportTicket.jsx).

## `packages/support-sdk/src/runtime`

- [supportRuntimeFlags.js](../../packages/support-sdk/src/runtime/supportRuntimeFlags.js) — Lee, normaliza y aplica flags de ejecución de soporte como autorización y jornada. **Interfaz:** `DEFAULT_SUPPORT_RUNTIME_FLAGS`, `getCachedSupportRuntimeFlags`, `fetchSupportRuntimeFlags`, `updateSupportRuntimeFlags`, `setSupportRuntimeFlag`, `subscribeSupportRuntimeFlags`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js). **Lo usa:** [FeatureFlags.jsx](../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx), [SupportGate.jsx](../../packages/support-sdk/src/agent/SupportGate.jsx).
- [systemFeatureFlags.js](../../packages/support-sdk/src/runtime/systemFeatureFlags.js) — Centraliza flags del sistema consumidos por auth y admin para habilitar comportamientos condicionales. **Interfaz:** `getSystemFeatureFlags`, `setSystemFeatureFlags`, `setSystemFeatureFlag`, `isSupportLiveUpdatesEnabled`, `isAppleOAuthEnabled`, `subscribeSystemFeatureFlags`. **Lo usa:** [FeatureFlags.jsx](../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx), [AuthFlow.jsx](../../apps/referidos-app/src/auth/AuthFlow.jsx), [SupportGate.jsx](../../packages/support-sdk/src/agent/SupportGate.jsx) y 2 más.

## `packages/support-sdk/src`

- [supportClient.js](../../packages/support-sdk/src/supportClient.js) — Cliente web del dominio soporte. Lee datos y usa funciones Edge para asignación, estados, notas, jornadas, macros o señales según la operación. **Interfaz:** `createSupportThread`, `createAnonymousSupportThread`, `getAnonymousSupportThreadStatus`, `requestSupportThreadRetake`, `assignSupportThread`, `updateSupportStatus`, `markSupportOpeningMessage`, `markSupportWhatsAppNameChanged`, `sendSupportWorkflowAction`. **Conecta con:** [supabaseClient.js](../../packages/support-sdk/lib/supabaseClient.js). **Lo usa:** [AdminSupportAgents.jsx](../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx), [AdminSupportDesk.jsx](../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx), [SupportChatHubBlock.jsx](../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx) y 5 más.

## `packages/support-sdk/store`

- [appStore.js](../../packages/support-sdk/store/appStore.js) — Reexporta el store de referidos-app. Deja explícito el acoplamiento de estas pantallas a la sesión web. **Interfaz:** `useAppStore`. **Conecta con:** [appStore.js](../../apps/referidos-app/src/store/appStore.js). **Lo usa:** [SupportGate.jsx](../../packages/support-sdk/src/agent/SupportGate.jsx), [SupportInbox.jsx](../../packages/support-sdk/src/agent/SupportInbox.jsx), [SupportJornadas.jsx](../../packages/support-sdk/src/agent/SupportJornadas.jsx) y 3 más.
