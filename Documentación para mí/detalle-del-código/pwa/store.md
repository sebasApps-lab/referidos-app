# PWA principal · Estado global

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/store/appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/store/appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L1)

Centraliza bootstrap, sesión, perfil, acceso local, promociones y acciones de QR. Coordina deduplicación del arranque, reintentos de dispositivo y limpieza al salir.

**Superficie que exporta.** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L3) (importa), [`AdminTopbar.jsx`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L10) (importa), [`FeatureFlags.jsx`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L16) (importa), [`AdminSupportDesk.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L5) (importa), [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L3) (importa), [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L7) (importa), [`AccountVerifyMethodStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L4) (importa), [`AccountVerifyPrompt.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L3) (importa), [`AccountVerifyReadyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L4) (importa), [`AccountVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L3) (importa), [`AddPasswordStep.jsx`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L3) (importa), [`BusinessVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L3) (importa), [`VerifyEmailStep.jsx`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L3) (importa), [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L3) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L3) (importa), [`ClienteFooter.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L5) (importa) y 31 más.

**Dependencias del archivo.** `zustand`, `zustand/middleware`, [`../services/authService`](../../../apps/referidos-app/src/services/authService.js), [`@referidos/support-sdk/supportClient`](../../../packages/support-sdk/src/supportClient.js), [`../services/promoService`](../../../apps/referidos-app/src/services/promoService.js), [`../services/qrService`](../../../apps/referidos-app/src/services/qrService.js), [`../services/commentService`](../../../apps/referidos-app/src/services/commentService.js), [`../utils/errorUtils`](../../../apps/referidos-app/src/utils/errorUtils.js), [`../services/onboardingClient`](../../../apps/referidos-app/src/services/onboardingClient.js), [`../services/sessionDevicesService`](../../../apps/referidos-app/src/services/sessionDevicesService.js), [`../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js), [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../services/secureStorageService`](../../../apps/referidos-app/src/services/secureStorageService.js), [`../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../modals/modalStore`](../../../apps/referidos-app/src/modals/modalStore.js).

#### [`promosRefreshTimer`](../../../apps/referidos-app/src/store/appStore.js#L34) · variable de módulo

Declara `promosRefreshTimer` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L292) (referencia), [`promosVisibilityHandler`](../../../apps/referidos-app/src/store/appStore.js#L789) (referencia), [`stopPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L804) (referencia).

#### [`promosVisibilityHandler`](../../../apps/referidos-app/src/store/appStore.js#L35) · variable de módulo

Declara `promosVisibilityHandler` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`startPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L785) (referencia), [`stopPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L808) (referencia).

#### [`promosAutoRefreshActive`](../../../apps/referidos-app/src/store/appStore.js#L36) · variable de módulo

Declara `promosAutoRefreshActive` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L291) (referencia), [`setTimeout · callback`](../../../apps/referidos-app/src/store/appStore.js#L300) (referencia), [`startPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L782) (referencia), [`promosVisibilityHandler`](../../../apps/referidos-app/src/store/appStore.js#L787) (referencia), [`setPromosVisible`](../../../apps/referidos-app/src/store/appStore.js#L818) (referencia).

#### [`bootstrapInFlightPromise`](../../../apps/referidos-app/src/store/appStore.js#L37) · variable de módulo

Declara `bootstrapInFlightPromise` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L502) (referencia).

#### [`SECURITY_LEVELS`](../../../apps/referidos-app/src/store/appStore.js#L39) · variable de módulo

Agrupa la configuración o catálogo de `SECURITY LEVELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `NONE`, `UNLOCK_LOCAL`, `REAUTH_SENSITIVE`.
- **Lo usa** [`SECURITY_LEVEL_ORDER`](../../../apps/referidos-app/src/store/appStore.js#L46) (accede al módulo), [`defaultSecurityState`](../../../apps/referidos-app/src/store/appStore.js#L77) (accede al módulo), [`resolveUnlockLevel`](../../../apps/referidos-app/src/store/appStore.js#L105) (accede al módulo), [`require`](../../../apps/referidos-app/src/store/appStore.js#L122) (accede al módulo), [`unlockWithBiometrics`](../../../apps/referidos-app/src/store/appStore.js#L234) (accede al módulo), [`unlockWithPin`](../../../apps/referidos-app/src/store/appStore.js#L247) (accede al módulo), [`unlockWithPassword`](../../../apps/referidos-app/src/store/appStore.js#L260) (accede al módulo), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L639) (accede al módulo).

#### [`SECURITY_LEVEL_ORDER`](../../../apps/referidos-app/src/store/appStore.js#L45) · variable de módulo

Declara `SECURITY_LEVEL_ORDER` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`require`](../../../apps/referidos-app/src/store/appStore.js#L125) (accede al módulo).

#### [`UNLOCK_LOCAL_TTL_MS`](../../../apps/referidos-app/src/store/appStore.js#L51) · variable de módulo

Declara `UNLOCK_LOCAL_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`unlockWithBiometrics`](../../../apps/referidos-app/src/store/appStore.js#L231) (referencia), [`unlockWithPin`](../../../apps/referidos-app/src/store/appStore.js#L244) (referencia).

#### [`REAUTH_SENSITIVE_TTL_MS`](../../../apps/referidos-app/src/store/appStore.js#L52) · variable de módulo

Declara `REAUTH_SENSITIVE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`unlockWithPassword`](../../../apps/referidos-app/src/store/appStore.js#L257) (referencia).

#### [`SESSION_BOOTSTRAP_ACTION_KEY`](../../../apps/referidos-app/src/store/appStore.js#L53) · variable de módulo

Declara `SESSION_BOOTSTRAP_ACTION_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L559) (referencia).

#### [`SESSION_POLICY_RETRY_CAP`](../../../apps/referidos-app/src/store/appStore.js#L54) · variable de módulo

Declara `SESSION_POLICY_RETRY_CAP` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L571) (referencia).

#### [`sleep`](../../../apps/referidos-app/src/store/appStore.js#L56) · función

Implementa `sleep` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `ms`.
- **Efectos y APIs** `setTimeout`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/store/appStore.js#L56).
- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L601) (llama).

#### [`createRandomBuffer`](../../../apps/referidos-app/src/store/appStore.js#L58) · función

Construye `Random Buffer` a partir de los datos del flujo.

- **Entradas** `size`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Llamadas directas en el cuerpo** [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/store/appStore.js#L60).
- **Lo usa** [`requestLocalVerification`](../../../apps/referidos-app/src/store/appStore.js#L186) (llama).

#### [`bufferFromBase64Url`](../../../apps/referidos-app/src/store/appStore.js#L64) · función

Implementa `buffer From Base64 Url` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `replace`, `value.replace`.
- **Condiciones que evalúa** `ausencia de value`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/store/appStore.js#L66), [`value.replace`](../../../apps/referidos-app/src/store/appStore.js#L66), [`=.repeat`](../../../apps/referidos-app/src/store/appStore.js#L67), [`window.atob`](../../../apps/referidos-app/src/store/appStore.js#L68), [`binary.charCodeAt`](../../../apps/referidos-app/src/store/appStore.js#L71).
- **Lo usa** [`requestLocalVerification`](../../../apps/referidos-app/src/store/appStore.js#L183) (llama).

#### [`defaultSecurityState`](../../../apps/referidos-app/src/store/appStore.js#L76) · variable de módulo

Agrupa la configuración o catálogo de `default Security State` para que sus consumidores lean claves comunes.

- **Campos o contexto** `unlockLevel`, `unlockedAt`, `unlockMethod`, `unlockExpiresAt`, `pendingAction`, `pendingLevel`, `pendingMethod`, `rules`.
- **Lo usa** [`reset`](../../../apps/referidos-app/src/store/appStore.js#L272) (referencia), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L339) (referencia), [`logout`](../../../apps/referidos-app/src/store/appStore.js#L488) (referencia).

#### [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) · hook o store · exportado

Crea el store principal. Reúne sesión, onboarding, promociones, caché y desbloqueo de la interfaz. Sus acciones internas se detallan en las fichas que siguen.

- **Retorno visible o tipo declarado** `bootstrap`, `bootstrapError`, `usuario`, `onboarding`, `ratings`, `promos`, `promosLoadedAt`, `promosRefreshing`, `promosVisible`, `scannerPermissionPrompted`, `scannerManualFallbackShown`, `negocios`, `accessMethods`, `suspendViewportResize`, `suspendViewportAfterNext`, `justCompletedRegistration`, `emailVerifiedSessionAt`, `loading` y 25 más.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-app/src/store/appStore.js#L87), [`persist`](../../../apps/referidos-app/src/store/appStore.js#L88).
- **Lo usa** [`PwaGuardWrapper`](../../../apps/referidos-app/src/App.jsx#L14) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/App.jsx#L24) (accede al módulo), [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L14) (llama), [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L71) (llama), [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L13) (llama), [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L149) (llama), [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L118) (llama), [`advanceClientFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L147) (accede al módulo), [`AccountVerifyMethodStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L17) (llama), [`AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L13) (llama), [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L17) (llama), [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L46) (llama) y 46 más.

#### [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L90) · función

Aplica o guarda `Security` para que el estado refleje la operación.

- **Entradas** `partial`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L91).
- **Lo usa** [`resolveUnlockLevel`](../../../apps/referidos-app/src/store/appStore.js#L104) (llama), [`require`](../../../apps/referidos-app/src/store/appStore.js#L128) (llama), [`unlockWithBiometrics`](../../../apps/referidos-app/src/store/appStore.js#L233) (llama), [`unlockWithPin`](../../../apps/referidos-app/src/store/appStore.js#L246) (llama), [`unlockWithPassword`](../../../apps/referidos-app/src/store/appStore.js#L259) (llama), [`reset`](../../../apps/referidos-app/src/store/appStore.js#L271) (llama), [`setRule`](../../../apps/referidos-app/src/store/appStore.js#L276) (llama), [`setRules`](../../../apps/referidos-app/src/store/appStore.js#L284) (llama).

#### [`resolveUnlockLevel`](../../../apps/referidos-app/src/store/appStore.js#L98) · función

Obtiene o resuelve `Unlock Level` para entregarlo al consumidor.

- **Condiciones que evalúa** `security.unlockExpiresAt`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/store/appStore.js#L99), [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L104).
- **Lo usa** [`require`](../../../apps/referidos-app/src/store/appStore.js#L123) (llama).

#### [`require`](../../../apps/referidos-app/src/store/appStore.js#L119) · función

Implementa `require` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `action`.
- **Retorno visible o tipo declarado** `ok`, `requiredLevel`, `currentLevel`, `pendingMethod`.
- **Condiciones que evalúa** `SECURITY_LEVEL_ORDER.currentLevel`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/store/appStore.js#L120), [`resolveUnlockLevel`](../../../apps/referidos-app/src/store/appStore.js#L123), [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L128).

#### [`requestLocalVerification`](../../../apps/referidos-app/src/store/appStore.js#L151) · función

Implementa `request Local Verification` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `{onVerified, onBlocked, requireVerifiedEmail, userId} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `reason`, `method`.
- **Efectos y APIs** `navigator.credentials.get`, `modalApi.openModal`.
- **Condiciones que evalúa** `requireVerifiedEmail y ausencia de onboarding.email_confirmed`, `hasFingerprint`, `ausencia de window.PublicKeyCredential o ausencia de window.crypto.getRandomValues`, `available`, `ausencia de resolvedUserId`, `ausencia de credentialId`, `ausencia de credentialBuffer`, `hasPin`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4) (accede al módulo), [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L187) (llama).
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/store/appStore.js#L157), [`useModalStore.getState`](../../../apps/referidos-app/src/store/appStore.js#L159), [`onBlocked`](../../../apps/referidos-app/src/store/appStore.js#L161), [`PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable`](../../../apps/referidos-app/src/store/appStore.js#L177), [`loadBiometricToken`](../../../apps/referidos-app/src/store/appStore.js#L180), [`bufferFromBase64Url`](../../../apps/referidos-app/src/store/appStore.js#L183), [`createRandomBuffer`](../../../apps/referidos-app/src/store/appStore.js#L186), [`navigator.credentials.get`](../../../apps/referidos-app/src/store/appStore.js#L193), [`onVerified`](../../../apps/referidos-app/src/store/appStore.js#L194), [`modalApi.openModal`](../../../apps/referidos-app/src/store/appStore.js#L203).

#### [`requestPasswordVerification`](../../../apps/referidos-app/src/store/appStore.js#L213) · función

Implementa `request Password Verification` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `{onVerified, onBlocked, requireVerifiedEmail, email} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `reason`, `method`.
- **Efectos y APIs** `modalApi.openModal`.
- **Condiciones que evalúa** `requireVerifiedEmail y ausencia de onboarding.email_confirmed`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4) (accede al módulo).
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/store/appStore.js#L219), [`useModalStore.getState`](../../../apps/referidos-app/src/store/appStore.js#L220), [`onBlocked`](../../../apps/referidos-app/src/store/appStore.js#L222), [`modalApi.openModal`](../../../apps/referidos-app/src/store/appStore.js#L225).

#### [`unlockWithBiometrics`](../../../apps/referidos-app/src/store/appStore.js#L231) · función

Implementa `unlock With Biometrics` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `ttlMs = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`.
- **Llamadas directas en el cuerpo** [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L233).

#### [`unlockWithPin`](../../../apps/referidos-app/src/store/appStore.js#L244) · función

Implementa `unlock With Pin` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `ttlMs = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`.
- **Llamadas directas en el cuerpo** [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L246).

#### [`unlockWithPassword`](../../../apps/referidos-app/src/store/appStore.js#L257) · función

Implementa `unlock With Password` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `ttlMs = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`.
- **Llamadas directas en el cuerpo** [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L259).

#### [`reset`](../../../apps/referidos-app/src/store/appStore.js#L270) · función

Implementa `reset` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Llamadas directas en el cuerpo** [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L271).

#### [`setRule`](../../../apps/referidos-app/src/store/appStore.js#L275) · función

Aplica o guarda `Rule` para que el estado refleje la operación.

- **Entradas** `action`, `level`.
- **Llamadas directas en el cuerpo** [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L276), [`get`](../../../apps/referidos-app/src/store/appStore.js#L278).

#### [`setRules`](../../../apps/referidos-app/src/store/appStore.js#L283) · función

Aplica o guarda `Rules` para que el estado refleje la operación.

- **Entradas** `rules = valor por defecto`.
- **Llamadas directas en el cuerpo** [`updateSecurity`](../../../apps/referidos-app/src/store/appStore.js#L284).

#### [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L290) · función

Coordina `Promos Refresh` con la planificación o reintento del flujo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `ausencia de promosAutoRefreshActive`, `promosRefreshTimer`, `undefined`, `document.visibilityState`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/store/appStore.js#L293), [`setTimeout`](../../../apps/referidos-app/src/store/appStore.js#L299).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/store/appStore.js#L302) (llama), [`promosVisibilityHandler`](../../../apps/referidos-app/src/store/appStore.js#L795) (llama), [`startPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L800) (llama), [`setPromosVisible`](../../../apps/referidos-app/src/store/appStore.js#L819) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/store/appStore.js#L299) · callback de infraestructura · asíncrona · dentro de [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L290)

Ejecuta trabajo diferido o periódico iniciado por `schedulePromosRefresh`.

- **Condiciones que evalúa** `ausencia de promosAutoRefreshActive`.
- **Llamadas directas en el cuerpo** [`loadPromos`](../../../apps/referidos-app/src/store/appStore.js#L301), [`get`](../../../apps/referidos-app/src/store/appStore.js#L301), [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L302).

#### [`setUser`](../../../apps/referidos-app/src/store/appStore.js#L342) · función

Aplica o guarda el valor de usuario para que el estado refleje la operación.

- **Entradas** `usuario`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L342).

#### [`setAccessMethods`](../../../apps/referidos-app/src/store/appStore.js#L343) · función

Aplica o guarda `Access Methods` para que el estado refleje la operación.

- **Entradas** `methods`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L344).

#### [`setSuspendViewportResize`](../../../apps/referidos-app/src/store/appStore.js#L350) · función

Aplica o guarda `Suspend Viewport Resize` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L350).

#### [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/store/appStore.js#L351) · función

Aplica o guarda `Suspend Viewport After Next` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L352).

#### [`freezeViewportAfterNextUpdate`](../../../apps/referidos-app/src/store/appStore.js#L353) · función

Implementa `freeze Viewport After Next Update` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L354).

#### [`setScannerPermissionPrompted`](../../../apps/referidos-app/src/store/appStore.js#L355) · función

Aplica o guarda `Scanner Permission Prompted` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L356).

#### [`setScannerManualFallbackShown`](../../../apps/referidos-app/src/store/appStore.js#L357) · función

Aplica o guarda `Scanner Manual Fallback Shown` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L358).

#### [`setJustCompletedRegistration`](../../../apps/referidos-app/src/store/appStore.js#L359) · función

Aplica o guarda `Just Completed Registration` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L360).

#### [`setEmailVerifiedSessionAt`](../../../apps/referidos-app/src/store/appStore.js#L361) · función

Aplica o guarda `Email Verified Session At` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L362).

#### [`login`](../../../apps/referidos-app/src/store/appStore.js#L367) · función · asíncrona

Traduce el login de UI a Auth y vuelve a resolver el onboarding antes de dejar que la interfaz navegue por rol.

- **Entradas** `email`, `password`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de result.ok`, `ausencia de boot.ok`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`signInWithEmail`](../../../apps/referidos-app/src/services/authService.js#L96) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/store/appStore.js#L368), [`set`](../../../apps/referidos-app/src/store/appStore.js#L371), [`signInWithEmail`](../../../apps/referidos-app/src/store/appStore.js#L373), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L384), [`get`](../../../apps/referidos-app/src/store/appStore.js#L384), [`handleError`](../../../apps/referidos-app/src/store/appStore.js#L401).

#### [`register`](../../../apps/referidos-app/src/store/appStore.js#L411) · función · asíncrona

Implementa `register` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `{email, password, telefono, nombre, role}`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`, `warning`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`signUpWithEmail`](../../../apps/referidos-app/src/services/authService.js#L144) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/store/appStore.js#L412), [`set`](../../../apps/referidos-app/src/store/appStore.js#L416), [`signUpWithEmail`](../../../apps/referidos-app/src/store/appStore.js#L418), [`handleError`](../../../apps/referidos-app/src/store/appStore.js#L437).

#### [`logout`](../../../apps/referidos-app/src/store/appStore.js#L448) · función · asíncrona

Cierra la sesión local y limpia estado de usuario, caché y material de seguridad que no debe pasar a otra sesión.

- **Actualizaciones de estado o acciones** `clearUserSecurityMaterial`, `clearAll`.
- **Condiciones que evalúa** `isSupport`, `userId`.
- **Contrato de datos** Auth `getSession` en [`appStore.js:454`](../../../apps/referidos-app/src/store/appStore.js#L454).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`endSupportSession`](../../../packages/support-sdk/src/supportClient.js#L180) (llama), [`signOut`](../../../apps/referidos-app/src/services/authService.js#L174) (llama), [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/services/secureStorageService.js#L258) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/store/appStore.js#L449), [`get`](../../../apps/referidos-app/src/store/appStore.js#L451), [`supabase.auth.getSession`](../../../apps/referidos-app/src/store/appStore.js#L454), [`endSupportSession`](../../../apps/referidos-app/src/store/appStore.js#L461), [`signOut`](../../../apps/referidos-app/src/store/appStore.js#L463), [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/store/appStore.js#L473), [`clearAll`](../../../apps/referidos-app/src/store/appStore.js#L475), [`useCacheStore.getState`](../../../apps/referidos-app/src/store/appStore.js#L475), [`set`](../../../apps/referidos-app/src/store/appStore.js#L476).

#### [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L498) · función · asíncrona

Reconcilia sesión, registro del dispositivo y resultado de onboarding al arrancar. Los guards observan el estado resultante antes de montar la ruta privada.

- **Entradas** `{force} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `usuario`, `code`, `error`, `recoverable`.
- **Actualizaciones de estado o acciones** `setRules`.
- **Efectos y APIs** `modalApi.openModal`.
- **Condiciones que evalúa** `bootstrapInFlightPromise`, `ausencia de session.access_token`, `userProbeError o ausencia de userProbeData.user.id`, `ausencia de canStart`, `sessionRegister.ok`, `policy.ui.show`, `policy.retry.allowed`, `ausencia de sessionRegister.ok` y 3 más.
- **Contrato de datos** Auth `getSession` en [`appStore.js:518`](../../../apps/referidos-app/src/store/appStore.js#L518), Auth `getUser` en [`appStore.js:538`](../../../apps/referidos-app/src/store/appStore.js#L538), Auth `signOut` en [`appStore.js:541`](../../../apps/referidos-app/src/store/appStore.js#L541).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`beginPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L207) (llama), [`registerCurrentSessionDevice`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L129) (llama), [`evaluateErrorPolicy`](../../../apps/referidos-app/src/services/loggingClient.js#L203) (llama), [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4) (accede al módulo), [`endPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L211) (llama), [`signOut`](../../../apps/referidos-app/src/services/authService.js#L174) (llama), [`reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L190) (llama), [`runOnboardingCheck`](../../../apps/referidos-app/src/services/onboardingClient.js#L5) (llama) y 1 más.
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/store/appStore.js#L499), [`get`](../../../apps/referidos-app/src/store/appStore.js#L508), [`set`](../../../apps/referidos-app/src/store/appStore.js#L510), [`supabase.auth.getSession`](../../../apps/referidos-app/src/store/appStore.js#L518), [`supabase.auth.getUser`](../../../apps/referidos-app/src/store/appStore.js#L538), [`supabase.auth.signOut`](../../../apps/referidos-app/src/store/appStore.js#L541), [`beginPolicyAction`](../../../apps/referidos-app/src/store/appStore.js#L559), [`registerCurrentSessionDevice`](../../../apps/referidos-app/src/store/appStore.js#L572), [`toLowerCase`](../../../apps/referidos-app/src/store/appStore.js#L575), [`evaluateErrorPolicy`](../../../apps/referidos-app/src/store/appStore.js#L576), [`useModalStore.getState`](../../../apps/referidos-app/src/store/appStore.js#L589), [`modalApi.openModal`](../../../apps/referidos-app/src/store/appStore.js#L590) y 7 más.

#### [`loadPromos`](../../../apps/referidos-app/src/store/appStore.js#L752) · función · asíncrona

Carga o reutiliza el catálogo activo. Gestiona estados de carga y actualización y guarda cuándo fue consultado.

- **Entradas** `{silent, force} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `cached`, `error`, `data`.
- **Condiciones que evalúa** `ausencia de force y loadedAt`, `silent`, `ausencia de ok`.
- **Usa código de** [`getActivePromos`](../../../apps/referidos-app/src/services/promoService.js#L4) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/store/appStore.js#L753), [`set`](../../../apps/referidos-app/src/store/appStore.js#L758), [`getActivePromos`](../../../apps/referidos-app/src/store/appStore.js#L763), [`handleError`](../../../apps/referidos-app/src/store/appStore.js#L776).

#### [`startPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L781) · función

Inicia `Promos Auto Refresh` y prepara sus dependencias.

- **Efectos y APIs** `document.addEventListener`.
- **Condiciones que evalúa** `promosAutoRefreshActive`, `ausencia de promosVisibilityHandler y undefined`.
- **Llamadas directas en el cuerpo** [`document.addEventListener`](../../../apps/referidos-app/src/store/appStore.js#L797), [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L800).

#### [`promosVisibilityHandler`](../../../apps/referidos-app/src/store/appStore.js#L786) · función asignada · dentro de [`startPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L781)

Coordina cambios de estado durante `promos Visibility Handler`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `ausencia de promosAutoRefreshActive`, `document.visibilityState`, `promosRefreshTimer`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/store/appStore.js#L790), [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L795).

#### [`stopPromosAutoRefresh`](../../../apps/referidos-app/src/store/appStore.js#L802) · función

Finaliza `Promos Auto Refresh` y ajusta el estado que depende de esa operación.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `document.removeEventListener`.
- **Condiciones que evalúa** `promosRefreshTimer`, `promosVisibilityHandler y undefined`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/store/appStore.js#L805), [`document.removeEventListener`](../../../apps/referidos-app/src/store/appStore.js#L809).

#### [`setPromosVisible`](../../../apps/referidos-app/src/store/appStore.js#L816) · función

Aplica o guarda `Promos Visible` para que el estado refleje la operación.

- **Entradas** `visible`.
- **Condiciones que evalúa** `promosAutoRefreshActive`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/store/appStore.js#L817), [`schedulePromosRefresh`](../../../apps/referidos-app/src/store/appStore.js#L819).

#### [`initRatings`](../../../apps/referidos-app/src/store/appStore.js#L825) · función

Inicia `Ratings` y prepara sus dependencias.

- **Entradas** `promos`.
- **Condiciones que evalúa** `length`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/store/appStore.js#L826), [`promos.forEach`](../../../apps/referidos-app/src/store/appStore.js#L829), [`set`](../../../apps/referidos-app/src/store/appStore.js#L832).

#### [`generatePromoQr`](../../../apps/referidos-app/src/store/appStore.js#L838) · función

Implementa `generate Promo Qr` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `promoId`.
- **Usa código de** [`generatePromoQr`](../../../apps/referidos-app/src/services/qrService.js#L14) (llama).
- **Llamadas directas en el cuerpo** [`generatePromoQr`](../../../apps/referidos-app/src/store/appStore.js#L838).

#### [`generateValidQr`](../../../apps/referidos-app/src/store/appStore.js#L839) · función

Implementa `generate Valid Qr` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `promoId`, `opts`.
- **Usa código de** [`generateValidQr`](../../../apps/referidos-app/src/services/qrService.js#L35) (llama).
- **Llamadas directas en el cuerpo** [`generateValidQr`](../../../apps/referidos-app/src/store/appStore.js#L839).

#### [`getActiveValidQr`](../../../apps/referidos-app/src/store/appStore.js#L840) · función

Obtiene o resuelve `Active Valid Qr` para entregarlo al consumidor.

- **Entradas** `promoId`.
- **Usa código de** [`getActiveValidQr`](../../../apps/referidos-app/src/services/qrService.js#L60) (llama).
- **Llamadas directas en el cuerpo** [`getActiveValidQr`](../../../apps/referidos-app/src/store/appStore.js#L840).

#### [`redeemValidQr`](../../../apps/referidos-app/src/store/appStore.js#L841) · función

Implementa `redeem Valid Qr` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `code`.
- **Usa código de** [`redeemValidQr`](../../../apps/referidos-app/src/services/qrService.js#L119) (llama).
- **Llamadas directas en el cuerpo** [`redeemValidQr`](../../../apps/referidos-app/src/store/appStore.js#L841).

#### [`addComentario`](../../../apps/referidos-app/src/store/appStore.js#L846) · función

Implementa `add Comentario` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `payload`.
- **Usa código de** [`addComentario`](../../../apps/referidos-app/src/services/commentService.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`addComentario`](../../../apps/referidos-app/src/store/appStore.js#L846).

#### [`partialize`](../../../apps/referidos-app/src/store/appStore.js#L853) · función

Implementa `partialize` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`migrate`](../../../apps/referidos-app/src/store/appStore.js#L854) · función

Implementa `migrate` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.
