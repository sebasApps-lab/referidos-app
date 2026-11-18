# PWA principal · Servicios de datos · 1 de 2

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/services/addressReverseClient.js`](../../../apps/referidos-app/src/services/addressReverseClient.js#L1)
- [`apps/referidos-app/src/services/addressSearchClient.js`](../../../apps/referidos-app/src/services/addressSearchClient.js#L1)
- [`apps/referidos-app/src/services/authService.js`](../../../apps/referidos-app/src/services/authService.js#L1)
- [`apps/referidos-app/src/services/commentService.js`](../../../apps/referidos-app/src/services/commentService.js#L1)
- [`apps/referidos-app/src/services/errorPolicyService.js`](../../../apps/referidos-app/src/services/errorPolicyService.js#L1)
- [`apps/referidos-app/src/services/gpsFallbackClient.js`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L1)
- [`apps/referidos-app/src/services/loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L1)
- [`apps/referidos-app/src/services/mfaService.js`](../../../apps/referidos-app/src/services/mfaService.js#L1)
- [`apps/referidos-app/src/services/onboardingClient.js`](../../../apps/referidos-app/src/services/onboardingClient.js#L1)
- [`apps/referidos-app/src/services/promoService.js`](../../../apps/referidos-app/src/services/promoService.js#L1)
- [`apps/referidos-app/src/services/qrService.js`](../../../apps/referidos-app/src/services/qrService.js#L1)
- [`apps/referidos-app/src/services/registrationClient.js`](../../../apps/referidos-app/src/services/registrationClient.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/services/addressReverseClient.js`](../../../apps/referidos-app/src/services/addressReverseClient.js#L1)

Envía coordenadas a address-reverse y entrega dirección normalizada para el flujo del mapa.

**Superficie que exporta.** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L22).

**Módulos que lo cargan.** [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L4) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`CACHE_TTL_MS`](../../../apps/referidos-app/src/services/addressReverseClient.js#L4) · variable de módulo

Declara `CACHE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L35) (referencia).

#### [`MIN_INTERVAL_MS`](../../../apps/referidos-app/src/services/addressReverseClient.js#L5) · variable de módulo

Declara `MIN_INTERVAL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L44) (referencia).

#### [`memoryCache`](../../../apps/referidos-app/src/services/addressReverseClient.js#L7) · variable de módulo

Declara `memoryCache` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L34) (accede al módulo).

#### [`inFlight`](../../../apps/referidos-app/src/services/addressReverseClient.js#L8) · variable de módulo

Declara `inFlight` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L39) (accede al módulo).

#### [`lastRequestAt`](../../../apps/referidos-app/src/services/addressReverseClient.js#L9) · variable de módulo

Declara `lastRequestAt` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L44) (referencia).

#### [`buildKey`](../../../apps/referidos-app/src/services/addressReverseClient.js#L11) · función

Construye `Key` a partir de los datos del flujo.

- **Entradas** `lat`, `lng`, `{language}`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../apps/referidos-app/src/services/addressReverseClient.js#L12).
- **Lo usa** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L33) (llama).

#### [`waitMs`](../../../apps/referidos-app/src/services/addressReverseClient.js#L17) · función · asíncrona

Coordina `Ms` con la planificación o reintento del flujo.

- **Entradas** `ms`.
- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `ms`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/services/addressReverseClient.js#L19).
- **Lo usa** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L47) (llama).

#### [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L22) · función · asíncrona · exportado

Consulta o invoca Edge [`address-reverse`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts) y coordina las demás operaciones de esta ficha.

- **Entradas** `lat`, `lng`, `{language, skipCache} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`, `cached`, `source`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `ausencia de skipCache y cached y CACHE_TTL_MS`, `inFlight.has`, `ausencia de session.access_token`, `error`, `ausencia de result`.
- **Contrato de datos** Auth `getSession` en [`addressReverseClient.js:50`](../../../apps/referidos-app/src/services/addressReverseClient.js#L50), Edge [`address-reverse`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts) en [`addressReverseClient.js:55`](../../../apps/referidos-app/src/services/addressReverseClient.js#L55).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`buildKey`](../../../apps/referidos-app/src/services/addressReverseClient.js#L33), [`memoryCache.get`](../../../apps/referidos-app/src/services/addressReverseClient.js#L34), [`inFlight.has`](../../../apps/referidos-app/src/services/addressReverseClient.js#L39), [`inFlight.get`](../../../apps/referidos-app/src/services/addressReverseClient.js#L40), [`waitMs`](../../../apps/referidos-app/src/services/addressReverseClient.js#L47), [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/addressReverseClient.js#L50), [`supabase.functions.invoke`](../../../apps/referidos-app/src/services/addressReverseClient.js#L55), [`memoryCache.set`](../../../apps/referidos-app/src/services/addressReverseClient.js#L81), [`inFlight.set`](../../../apps/referidos-app/src/services/addressReverseClient.js#L85), [`inFlight.delete`](../../../apps/referidos-app/src/services/addressReverseClient.js#L87).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L407) (llama).

### [`apps/referidos-app/src/services/addressSearchClient.js`](../../../apps/referidos-app/src/services/addressSearchClient.js#L1)

Valida y envía búsqueda a address-search. Traduce la respuesta geográfica a sugerencias seleccionables.

**Superficie que exporta.** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L41).

**Módulos que lo cargan.** [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L3) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`CACHE_TTL_MS`](../../../apps/referidos-app/src/services/addressSearchClient.js#L4) · variable de módulo

Declara `CACHE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L57) (referencia).

#### [`MIN_INTERVAL_MS`](../../../apps/referidos-app/src/services/addressSearchClient.js#L5) · variable de módulo

Declara `MIN_INTERVAL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L66) (referencia).

#### [`MIN_QUERY_LENGTH`](../../../apps/referidos-app/src/services/addressSearchClient.js#L6) · variable de módulo

Declara `MIN_QUERY_LENGTH` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L51) (referencia).

#### [`memoryCache`](../../../apps/referidos-app/src/services/addressSearchClient.js#L8) · variable de módulo

Declara `memoryCache` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L56) (accede al módulo).

#### [`inFlight`](../../../apps/referidos-app/src/services/addressSearchClient.js#L9) · variable de módulo

Declara `inFlight` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L61) (accede al módulo).

#### [`lastRequestAt`](../../../apps/referidos-app/src/services/addressSearchClient.js#L10) · variable de módulo

Declara `lastRequestAt` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L66) (referencia).

#### [`normalizeQuery`](../../../apps/referidos-app/src/services/addressSearchClient.js#L12) · función

Normaliza `Query` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`, `text.replace`.
- **Condiciones que evalúa** `token`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/services/addressSearchClient.js#L13), [`toLowerCase`](../../../apps/referidos-app/src/services/addressSearchClient.js#L13), [`replace`](../../../apps/referidos-app/src/services/addressSearchClient.js#L14), [`text.normalize`](../../../apps/referidos-app/src/services/addressSearchClient.js#L14), [`text.replace`](../../../apps/referidos-app/src/services/addressSearchClient.js#L15), [`map`](../../../apps/referidos-app/src/services/addressSearchClient.js#L17), [`filter`](../../../apps/referidos-app/src/services/addressSearchClient.js#L17), [`text.split`](../../../apps/referidos-app/src/services/addressSearchClient.js#L17), [`tokens.join`](../../../apps/referidos-app/src/services/addressSearchClient.js#L29).
- **Lo usa** [`buildKey`](../../../apps/referidos-app/src/services/addressSearchClient.js#L33) (llama).

#### [`buildKey`](../../../apps/referidos-app/src/services/addressSearchClient.js#L32) · función

Construye `Key` a partir de los datos del flujo.

- **Entradas** `query`, `{limit, country, language}`.
- **Llamadas directas en el cuerpo** [`normalizeQuery`](../../../apps/referidos-app/src/services/addressSearchClient.js#L33).
- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L55) (llama).

#### [`waitMs`](../../../apps/referidos-app/src/services/addressSearchClient.js#L36) · función · asíncrona

Coordina `Ms` con la planificación o reintento del flujo.

- **Entradas** `ms`.
- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `ms`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/services/addressSearchClient.js#L38).
- **Lo usa** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L69) (llama).

#### [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L41) · función · asíncrona · exportado

Consulta o invoca Edge [`address-search`](../../../apps/referidos-app/supabase/functions/address-search/index.ts) y coordina las demás operaciones de esta ficha.

- **Entradas** `query`, `{limit, country, language, skipCache} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `results`, `skipped`, `cached`, `error`, `label`, `raw_label`, `display_label`, `provider`, `source`.
- **Condiciones que evalúa** `trimmed.length`, `ausencia de skipCache y cached y CACHE_TTL_MS`, `inFlight.has`, `ausencia de session.access_token`, `error`.
- **Contrato de datos** Auth `getSession` en [`addressSearchClient.js:72`](../../../apps/referidos-app/src/services/addressSearchClient.js#L72), Edge [`address-search`](../../../apps/referidos-app/supabase/functions/address-search/index.ts) en [`addressSearchClient.js:77`](../../../apps/referidos-app/src/services/addressSearchClient.js#L77).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/services/addressSearchClient.js#L50), [`buildKey`](../../../apps/referidos-app/src/services/addressSearchClient.js#L55), [`memoryCache.get`](../../../apps/referidos-app/src/services/addressSearchClient.js#L56), [`inFlight.has`](../../../apps/referidos-app/src/services/addressSearchClient.js#L61), [`inFlight.get`](../../../apps/referidos-app/src/services/addressSearchClient.js#L62), [`waitMs`](../../../apps/referidos-app/src/services/addressSearchClient.js#L69), [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/addressSearchClient.js#L72), [`supabase.functions.invoke`](../../../apps/referidos-app/src/services/addressSearchClient.js#L77), [`data.results.map`](../../../apps/referidos-app/src/services/addressSearchClient.js#L93), [`memoryCache.set`](../../../apps/referidos-app/src/services/addressSearchClient.js#L105), [`inFlight.set`](../../../apps/referidos-app/src/services/addressSearchClient.js#L109), [`inFlight.delete`](../../../apps/referidos-app/src/services/addressSearchClient.js#L111).
- **Lo usa** [`handleSearch`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L997) (llama).

### [`apps/referidos-app/src/services/authService.js`](../../../apps/referidos-app/src/services/authService.js#L1)

Adapta inicio de sesión, registro y cierre a Supabase Auth, espera el perfil y llama a delete-account para la baja.

**Superficie que exporta.** [`signInWithOAuth`](../../../apps/referidos-app/src/services/authService.js#L25), [`signInWithGoogleIdToken`](../../../apps/referidos-app/src/services/authService.js#L72), [`signInWithEmail`](../../../apps/referidos-app/src/services/authService.js#L96), [`signUpWithEmail`](../../../apps/referidos-app/src/services/authService.js#L144), [`signOut`](../../../apps/referidos-app/src/services/authService.js#L174), [`deleteUserAccount`](../../../apps/referidos-app/src/services/authService.js#L188), [`updateUserProfile`](../../../apps/referidos-app/src/services/authService.js#L252), [`getSessionUserProfile`](../../../apps/referidos-app/src/services/authService.js#L279).

**Módulos que lo cargan.** [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L8) (importa), [`DangerZone.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L5) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L4) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`./loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js), [`../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### [`wait`](../../../apps/referidos-app/src/services/authService.js#L6) · función

Implementa `wait` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `ms`.
- **Efectos y APIs** `setTimeout`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/services/authService.js#L6).
- **Lo usa** [`waitForUser`](../../../apps/referidos-app/src/services/authService.js#L17) (llama).

#### [`waitForUser`](../../../apps/referidos-app/src/services/authService.js#L8) · función · asíncrona

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `id_auth`, `attempts = valor por defecto`, `delay = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `error`, `data`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`authService.js:10`](../../../apps/referidos-app/src/services/authService.js#L10), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`authService.js:10`](../../../apps/referidos-app/src/services/authService.js#L10).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../apps/referidos-app/src/services/authService.js#L10), [`eq`](../../../apps/referidos-app/src/services/authService.js#L10), [`select`](../../../apps/referidos-app/src/services/authService.js#L10), [`supabase.from`](../../../apps/referidos-app/src/services/authService.js#L10), [`wait`](../../../apps/referidos-app/src/services/authService.js#L17).
- **Lo usa** [`signInWithEmail`](../../../apps/referidos-app/src/services/authService.js#L110) (llama).

#### [`DEFAULT_REDIRECT`](../../../apps/referidos-app/src/services/authService.js#L22) · variable de módulo

Declara `DEFAULT_REDIRECT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`signInWithOAuth`](../../../apps/referidos-app/src/services/authService.js#L27) (referencia).

#### [`signInWithOAuth`](../../../apps/referidos-app/src/services/authService.js#L25) · función · asíncrona · exportado

Opera sobre Auth `signInWithOAuth`. El resultado se adapta al contrato del consumidor.

- **Entradas** `provider`, `opts = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `redirected`, `error`.
- **Condiciones que evalúa** `error`, `res.url`.
- **Contrato de datos** Auth `signInWithOAuth` en [`authService.js:36`](../../../apps/referidos-app/src/services/authService.js#L36).
- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/authService.js#L31), [`supabase.auth.signInWithOAuth`](../../../apps/referidos-app/src/services/authService.js#L36), [`window.location.assign`](../../../apps/referidos-app/src/services/authService.js#L61).
- **Lo usa** [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L735) (llama), [`fallbackToOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L755) (llama).

#### [`signInWithGoogleIdToken`](../../../apps/referidos-app/src/services/authService.js#L72) · función · asíncrona · exportado

Opera sobre Auth `signInWithIdToken`. El resultado se adapta al contrato del consumidor.

- **Entradas** `{token, nonce}`.
- **Condiciones que evalúa** `nonce`, `error`.
- **Contrato de datos** Auth `signInWithIdToken` en [`authService.js:82`](../../../apps/referidos-app/src/services/authService.js#L82).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/authService.js#L73), [`supabase.auth.signInWithIdToken`](../../../apps/referidos-app/src/services/authService.js#L82).
- **Lo usa** [`startGoogleOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L782) (llama).

#### [`signInWithEmail`](../../../apps/referidos-app/src/services/authService.js#L96) · función · asíncrona · exportado

Opera sobre Auth `signInWithPassword`. El resultado se adapta al contrato del consumidor.

- **Entradas** `email`, `password`.
- **Retorno visible o tipo declarado** `ok`, `user`, `pendingProfile`, `error`.
- **Condiciones que evalúa** `signInError`, `ausencia de signInData.user`, `ausencia de userData`.
- **Contrato de datos** Auth `signInWithPassword` en [`authService.js:104`](../../../apps/referidos-app/src/services/authService.js#L104).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/authService.js#L97), [`supabase.auth.signInWithPassword`](../../../apps/referidos-app/src/services/authService.js#L104), [`waitForUser`](../../../apps/referidos-app/src/services/authService.js#L110).
- **Lo usa** [`login`](../../../apps/referidos-app/src/store/appStore.js#L373) (llama).

#### [`signUpWithEmail`](../../../apps/referidos-app/src/services/authService.js#L144) · función · asíncrona · exportado

Opera sobre Auth `signUp`. El resultado se adapta al contrato del consumidor.

- **Entradas** `{email, password}`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `signUpError`.
- **Contrato de datos** Auth `signUp` en [`authService.js:152`](../../../apps/referidos-app/src/services/authService.js#L152).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/authService.js#L145), [`supabase.auth.signUp`](../../../apps/referidos-app/src/services/authService.js#L152).
- **Lo usa** [`register`](../../../apps/referidos-app/src/store/appStore.js#L418) (llama).

#### [`signOut`](../../../apps/referidos-app/src/services/authService.js#L174) · función · asíncrona · exportado

Opera sobre Auth `signOut`. El resultado se adapta al contrato del consumidor.

- **Entradas** `{scope} = valor por defecto`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Auth `signOut` en [`authService.js:177`](../../../apps/referidos-app/src/services/authService.js#L177).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/authService.js#L176), [`supabase.auth.signOut`](../../../apps/referidos-app/src/services/authService.js#L177).
- **Lo usa** [`logout`](../../../apps/referidos-app/src/store/appStore.js#L463) (llama), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L633) (llama).

#### [`deleteUserAccount`](../../../apps/referidos-app/src/services/authService.js#L188) · función · asíncrona · exportado

Consulta o invoca Edge [`delete-account`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts) y coordina las demás operaciones de esta ficha.

- **Entradas** `id_auth`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de id_auth`, `ausencia de session.access_token`, `error`, `data.ok`, `msg.includes`.
- **Contrato de datos** Auth `getSession` en [`authService.js:197`](../../../apps/referidos-app/src/services/authService.js#L197), Edge [`delete-account`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts) en [`authService.js:209`](../../../apps/referidos-app/src/services/authService.js#L209).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/authService.js#L189), [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/authService.js#L197), [`supabase.functions.invoke`](../../../apps/referidos-app/src/services/authService.js#L209), [`toLowerCase`](../../../apps/referidos-app/src/services/authService.js#L226), [`msg.includes`](../../../apps/referidos-app/src/services/authService.js#L228).
- **Lo usa** [`onConfirm`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L30) (llama).

#### [`updateUserProfile`](../../../apps/referidos-app/src/services/authService.js#L252) · función · asíncrona · exportado

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `{id_auth, ...payload}`.
- **Retorno visible o tipo declarado** `ok`, `error`, `user`.
- **Condiciones que evalúa** `ausencia de id_auth`, `error`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update + select`) en [`authService.js:259`](../../../apps/referidos-app/src/services/authService.js#L259), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`authService.js:259`](../../../apps/referidos-app/src/services/authService.js#L259), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`authService.js:259`](../../../apps/referidos-app/src/services/authService.js#L259).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/authService.js#L253), [`slice`](../../../apps/referidos-app/src/services/authService.js#L255), [`maybeSingle`](../../../apps/referidos-app/src/services/authService.js#L259), [`select`](../../../apps/referidos-app/src/services/authService.js#L259), [`eq`](../../../apps/referidos-app/src/services/authService.js#L259), [`update`](../../../apps/referidos-app/src/services/authService.js#L259), [`supabase.from`](../../../apps/referidos-app/src/services/authService.js#L259).

#### [`getSessionUserProfile`](../../../apps/referidos-app/src/services/authService.js#L279) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de session`.
- **Contrato de datos** Auth `getSession` en [`authService.js:283`](../../../apps/referidos-app/src/services/authService.js#L283), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`authService.js:287`](../../../apps/referidos-app/src/services/authService.js#L287), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`authService.js:287`](../../../apps/referidos-app/src/services/authService.js#L287).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/authService.js#L283), [`maybeSingle`](../../../apps/referidos-app/src/services/authService.js#L287), [`eq`](../../../apps/referidos-app/src/services/authService.js#L287), [`select`](../../../apps/referidos-app/src/services/authService.js#L287), [`supabase.from`](../../../apps/referidos-app/src/services/authService.js#L287).

### [`apps/referidos-app/src/services/commentService.js`](../../../apps/referidos-app/src/services/commentService.js#L1)

Inserta el comentario y la valoración de una promoción en Supabase.

**Superficie que exporta.** [`addComentario`](../../../apps/referidos-app/src/services/commentService.js#L4).

**Módulos que lo cargan.** [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L17) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`addComentario`](../../../apps/referidos-app/src/services/commentService.js#L4) · función · asíncrona · exportado

Guarda datos en tabla o vista [`comentarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L132) y coordina las demás operaciones de esta ficha.

- **Entradas** `{promoId, clienteId, estrellas, texto}`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`comentarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L132) (`insert + select`) en [`commentService.js:6`](../../../apps/referidos-app/src/services/commentService.js#L6), tabla o vista [`comentarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L132) (`insert`) en [`commentService.js:6`](../../../apps/referidos-app/src/services/commentService.js#L6), tabla o bucket [`comentarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L132) en [`commentService.js:6`](../../../apps/referidos-app/src/services/commentService.js#L6).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../apps/referidos-app/src/services/commentService.js#L6), [`select`](../../../apps/referidos-app/src/services/commentService.js#L6), [`insert`](../../../apps/referidos-app/src/services/commentService.js#L6), [`supabase.from`](../../../apps/referidos-app/src/services/commentService.js#L6), [`toString`](../../../apps/referidos-app/src/services/commentService.js#L9).
- **Lo usa** [`addComentario`](../../../apps/referidos-app/src/store/appStore.js#L846) (llama).

### [`apps/referidos-app/src/services/errorPolicyService.js`](../../../apps/referidos-app/src/services/errorPolicyService.js#L1)

Interpreta decisiones del runtime de errores para convertirlas en acciones de recuperación y política de sesión.

**Superficie que exporta.** [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L83).

**Módulos que lo cargan.** [`ErrorRuntimeBridge.jsx`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L2) (importa).

**Dependencias del archivo.** [`../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../modals/modalStore`](../../../apps/referidos-app/src/modals/modalStore.js), [`./sessionDevicesService`](../../../apps/referidos-app/src/services/sessionDevicesService.js), [`./loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`SENSITIVE_REAUTH_RULES`](../../../apps/referidos-app/src/services/errorPolicyService.js#L6) · variable de módulo

Agrupa la configuración o catálogo de `SENSITIVE REAUTH RULES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `transfer_points`, `redeem_qr`, `update_profile`, `admin_sensitive_action`.
- **Lo usa** [`maybeDegradeUam`](../../../apps/referidos-app/src/services/errorPolicyService.js#L67) (referencia).

#### [`MESSAGE_BY_KEY`](../../../apps/referidos-app/src/services/errorPolicyService.js#L13) · variable de módulo

Agrupa la configuración o catálogo de `MESSAGE BY KEY` para que sus consumidores lean claves comunes.

- **Campos o contexto** `session_revoked`, `session_unregistered`, `auth_unauthorized`, `auth_token_invalid`, `network_error`, `edge_unavailable`, `edge_timeout`, `policy_unavailable`, `unknown_error`.
- **Lo usa** [`resolveMessage`](../../../apps/referidos-app/src/services/errorPolicyService.js#L39) (accede al módulo).

#### [`resolveMessage`](../../../apps/referidos-app/src/services/errorPolicyService.js#L32) · función

Obtiene o resuelve `Message` para entregarlo al consumidor.

- **Entradas** `policy = valor por defecto`, `event = valor por defecto`.
- **Retorno visible o tipo declarado** `title`, `message`.
- **Lo usa** [`maybeShowModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L74) (llama).

#### [`shouldShowModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L43) · función

Comprueba `Show Modal` para decidir si se admite o continúa la operación.

- **Entradas** `policy = valor por defecto`.
- **Lo usa** [`maybeShowModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L73) (llama).

#### [`maybeSignOut`](../../../apps/referidos-app/src/services/errorPolicyService.js#L47) · función · asíncrona

Implementa `maybe Sign Out` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `policy = valor por defecto`.
- **Condiciones que evalúa** `action`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (accede al módulo), [`revokeAllSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L152) (llama).
- **Llamadas directas en el cuerpo** [`useAppStore.getState`](../../../apps/referidos-app/src/services/errorPolicyService.js#L50), [`revokeAllSessions`](../../../apps/referidos-app/src/services/errorPolicyService.js#L53), [`appState.logout`](../../../apps/referidos-app/src/services/errorPolicyService.js#L58).
- **Lo usa** [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L92) (llama).

#### [`maybeDegradeUam`](../../../apps/referidos-app/src/services/errorPolicyService.js#L61) · función

Coordina cambios de estado durante `maybe Degrade Uam`.

- **Entradas** `policy = valor por defecto`.
- **Actualizaciones de estado o acciones** `setRules`.
- **Condiciones que evalúa** `policy.uam.degrade_to`, `security.setRules`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (accede al módulo).
- **Llamadas directas en el cuerpo** [`useAppStore.getState`](../../../apps/referidos-app/src/services/errorPolicyService.js#L63), [`security.setRules`](../../../apps/referidos-app/src/services/errorPolicyService.js#L65).
- **Lo usa** [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L90) (llama).

#### [`maybeShowModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L72) · función

Implementa `maybe Show Modal` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `policy = valor por defecto`, `event = valor por defecto`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `ausencia de shouldShowModal`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4) (accede al módulo).
- **Llamadas directas en el cuerpo** [`shouldShowModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L73), [`resolveMessage`](../../../apps/referidos-app/src/services/errorPolicyService.js#L74), [`openModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L75), [`useModalStore.getState`](../../../apps/referidos-app/src/services/errorPolicyService.js#L75).
- **Lo usa** [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L91) (llama).

#### [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L83) · función · asíncrona · exportado

Aplica o guarda `Error Policy` para que el estado refleje la operación.

- **Entradas** `event = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `code`.
- **Condiciones que evalúa** `ausencia de canStart`.
- **Usa código de** [`beginPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L207) (llama), [`endPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L211) (llama).
- **Llamadas directas en el cuerpo** [`beginPolicyAction`](../../../apps/referidos-app/src/services/errorPolicyService.js#L86), [`maybeDegradeUam`](../../../apps/referidos-app/src/services/errorPolicyService.js#L90), [`maybeShowModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L91), [`maybeSignOut`](../../../apps/referidos-app/src/services/errorPolicyService.js#L92), [`endPolicyAction`](../../../apps/referidos-app/src/services/errorPolicyService.js#L95).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L8) (llama).

### [`apps/referidos-app/src/services/gpsFallbackClient.js`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L1)

Lee o guarda para el usuario una dirección de respaldo que puede usarse cuando no hay posición actual.

**Superficie que exporta.** [`saveGpsFallbackLocation`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L3), [`getGpsFallbackLocation`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L66).

**Módulos que lo cargan.** [`useLocationStep.js`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L3) (importa), [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L5) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`saveGpsFallbackLocation`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L3) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `{lat, lng}`.
- **Retorno visible o tipo declarado** `ok`, `error`, `id`, `updated`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `ausencia de session.user`, `userErr o ausencia de userRow.id`, `existingErr`, `existing.id`, `error`, `error o ausencia de created.id`.
- **Contrato de datos** Auth `getSession` en [`gpsFallbackClient.js:10`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L10), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`gpsFallbackClient.js:15`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L15), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`gpsFallbackClient.js:15`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L15), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`gpsFallbackClient.js:25`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L25), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`gpsFallbackClient.js:25`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L25), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`update`) en [`gpsFallbackClient.js:45`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L45), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert + select`) en [`gpsFallbackClient.js:55`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L55), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert`) en [`gpsFallbackClient.js:55`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L55).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L10), [`maybeSingle`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L15), [`eq`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L15), [`select`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L15), [`supabase.from`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L15), [`toISOString`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L41), [`update`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L45), [`insert`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L55).
- **Lo usa** [`requestLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L74) (llama).

#### [`getGpsFallbackLocation`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L66) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `error`, `location`.
- **Condiciones que evalúa** `ausencia de session.user`, `userErr o ausencia de userRow.id`, `error`, `ausencia de data.lat o ausencia de data.lng`.
- **Contrato de datos** Auth `getSession` en [`gpsFallbackClient.js:67`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L67), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`gpsFallbackClient.js:72`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L72), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`gpsFallbackClient.js:72`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L72), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`gpsFallbackClient.js:82`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L82), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`gpsFallbackClient.js:82`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L82).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L67), [`maybeSingle`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L72), [`eq`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L72), [`select`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L72), [`supabase.from`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L72).
- **Lo usa** [`loadFallbackLocation`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L334) (llama).

### [`apps/referidos-app/src/services/loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L1)

Configura observabilidad compartida, registro de release, eventos, breadcrumbs, flush y evaluación de política desde navegador.

**Superficie que exporta.** [`initLogger`](../../../apps/referidos-app/src/services/loggingClient.js#L125), [`setLoggerEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L133), [`setLoggerUser`](../../../apps/referidos-app/src/services/loggingClient.js#L138), [`setLoggerContext`](../../../apps/referidos-app/src/services/loggingClient.js#L144), [`logEvent`](../../../apps/referidos-app/src/services/loggingClient.js#L148), [`logBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L167), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171), [`logError`](../../../apps/referidos-app/src/services/loggingClient.js#L185), [`reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L190), [`subscribeErrorEvents`](../../../apps/referidos-app/src/services/loggingClient.js#L195), [`flushLogs`](../../../apps/referidos-app/src/services/loggingClient.js#L199), [`evaluateErrorPolicy`](../../../apps/referidos-app/src/services/loggingClient.js#L203), [`beginPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L207), [`endPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L211).

**Módulos que lo cargan.** [`AdminRuntimeErrorModalHost.jsx`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L3) (importa), [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L22) (importa), [`AppErrorBoundary.jsx`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L2) (importa), [`ErrorRuntimeBridge.jsx`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L3) (importa), [`useAppLogger.js`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L4) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L113) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L109) (importa), [`SupportChatHubBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L9) (importa), [`SupportChatTicketsBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L6) (importa), [`SupportEmail.jsx`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L3) (importa), [`supportChatClient.js`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L2) (importa), [`useScannerState.ts`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L4) (importa), [`authService.js`](../../../apps/referidos-app/src/services/authService.js#L3) (importa), [`errorPolicyService.js`](../../../apps/referidos-app/src/services/errorPolicyService.js#L4) (importa), [`onboardingClient.js`](../../../apps/referidos-app/src/services/onboardingClient.js#L3) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L21) (importa) y 1 más.

**Dependencias del archivo.** [`@referidos/observability`](../../../packages/observability/src/index.js), [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### Acciones al cargar el módulo

- **Condiciones que evalúa** `ausencia de globalScope.OBS_SINGLETON_KEY`, `ausencia de globalScope.POLICY_SINGLETON_KEY`, `ausencia de globalScope.RUNTIME_SINGLETON_KEY`.
- **Usa código de** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (referencia), [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21) (llama), [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57) (llama).
- **Llamadas directas en el cuerpo** [`createObservabilityClient`](../../../apps/referidos-app/src/services/loggingClient.js#L43), [`createPolicyRuntime`](../../../apps/referidos-app/src/services/loggingClient.js#L62), [`createErrorRuntime`](../../../apps/referidos-app/src/services/loggingClient.js#L65).

#### [`importEnv`](../../../apps/referidos-app/src/services/loggingClient.js#L11) · variable de módulo

Declara `importEnv` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`DEFAULT_ENV`](../../../apps/referidos-app/src/services/loggingClient.js#L14) (accede al módulo), [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L52) (referencia).

#### [`DEFAULT_TENANT_HINT`](../../../apps/referidos-app/src/services/loggingClient.js#L12) · variable de módulo

Declara `DEFAULT_TENANT_HINT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L47) (referencia), [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L88) (referencia).

#### [`DEFAULT_APP_ID`](../../../apps/referidos-app/src/services/loggingClient.js#L13) · variable de módulo

Declara `DEFAULT_APP_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L48) (referencia), [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L89) (referencia).

#### [`DEFAULT_ENV`](../../../apps/referidos-app/src/services/loggingClient.js#L14) · variable de módulo

Declara `DEFAULT_ENV` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`DEFAULT_RELEASE_CHANNEL`](../../../apps/referidos-app/src/services/loggingClient.js#L20) (referencia), [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L57) (referencia), [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L95) (referencia).

#### [`DEFAULT_VERSION`](../../../apps/referidos-app/src/services/loggingClient.js#L15) · variable de módulo

Declara `DEFAULT_VERSION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L54) (referencia), [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L90) (referencia).

#### [`DEFAULT_BUILD_ID`](../../../apps/referidos-app/src/services/loggingClient.js#L16) · variable de módulo

Declara `DEFAULT_BUILD_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L55) (referencia), [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L91) (referencia).

#### [`DEFAULT_BUILD_NUMBER`](../../../apps/referidos-app/src/services/loggingClient.js#L17) · variable de módulo

Declara `DEFAULT_BUILD_NUMBER` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L56) (referencia), [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L92) (referencia).

#### [`DEFAULT_RELEASE_ID`](../../../apps/referidos-app/src/services/loggingClient.js#L18) · variable de módulo

Declara `DEFAULT_RELEASE_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L93) (referencia).

#### [`DEFAULT_ARTIFACT_ID`](../../../apps/referidos-app/src/services/loggingClient.js#L19) · variable de módulo

Declara `DEFAULT_ARTIFACT_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L94) (referencia).

#### [`DEFAULT_RELEASE_CHANNEL`](../../../apps/referidos-app/src/services/loggingClient.js#L20) · variable de módulo

Declara `DEFAULT_RELEASE_CHANNEL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L103) (referencia).

#### [`DEFAULT_SOURCE_COMMIT_SHA`](../../../apps/referidos-app/src/services/loggingClient.js#L21) · variable de módulo

Declara `DEFAULT_SOURCE_COMMIT_SHA` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L99) (referencia).

#### [`LOG_LEVELS`](../../../apps/referidos-app/src/services/loggingClient.js#L23) · variable de módulo

Declara `LOG_LEVELS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`sanitizeLevel`](../../../apps/referidos-app/src/services/loggingClient.js#L117) (accede al módulo).

#### [`LOG_CATEGORIES`](../../../apps/referidos-app/src/services/loggingClient.js#L24) · variable de módulo

Declara `LOG_CATEGORIES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`sanitizeCategory`](../../../apps/referidos-app/src/services/loggingClient.js#L122) (accede al módulo).

#### [`OBS_SINGLETON_KEY`](../../../apps/referidos-app/src/services/loggingClient.js#L37) · variable de módulo

Declara `OBS_SINGLETON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L42) (referencia).

#### [`POLICY_SINGLETON_KEY`](../../../apps/referidos-app/src/services/loggingClient.js#L38) · variable de módulo

Declara `POLICY_SINGLETON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L61) (referencia).

#### [`RUNTIME_SINGLETON_KEY`](../../../apps/referidos-app/src/services/loggingClient.js#L39) · variable de módulo

Declara `RUNTIME_SINGLETON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L64) (referencia), [`runtime`](../../../apps/referidos-app/src/services/loggingClient.js#L76) (referencia).

#### [`globalScope`](../../../apps/referidos-app/src/services/loggingClient.js#L41) · variable de módulo

Declara `globalScope` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L42) (accede al módulo), [`runtime`](../../../apps/referidos-app/src/services/loggingClient.js#L76) (accede al módulo).

#### [`runtime`](../../../apps/referidos-app/src/services/loggingClient.js#L76) · variable de módulo

Declara `runtime` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`initLogger`](../../../apps/referidos-app/src/services/loggingClient.js#L128) (accede al módulo), [`setLoggerEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L135) (accede al módulo), [`setLoggerUser`](../../../apps/referidos-app/src/services/loggingClient.js#L139) (accede al módulo), [`setLoggerContext`](../../../apps/referidos-app/src/services/loggingClient.js#L145) (accede al módulo), [`logEvent`](../../../apps/referidos-app/src/services/loggingClient.js#L158) (accede al módulo), [`logBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L168) (accede al módulo), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L175) (accede al módulo), [`logError`](../../../apps/referidos-app/src/services/loggingClient.js#L187) (accede al módulo), [`reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L192) (accede al módulo), [`subscribeErrorEvents`](../../../apps/referidos-app/src/services/loggingClient.js#L196) (accede al módulo), [`flushLogs`](../../../apps/referidos-app/src/services/loggingClient.js#L200) (accede al módulo), [`evaluateErrorPolicy`](../../../apps/referidos-app/src/services/loggingClient.js#L204) (accede al módulo) y 2 más.

#### [`initialized`](../../../apps/referidos-app/src/services/loggingClient.js#L78) · variable de módulo

Declara `initialized` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`initLogger`](../../../apps/referidos-app/src/services/loggingClient.js#L126) (referencia).

#### [`releaseRegistered`](../../../apps/referidos-app/src/services/loggingClient.js#L79) · variable de módulo

Declara `releaseRegistered` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L83) (referencia).

#### [`loggerEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L80) · variable de módulo

Declara `loggerEnabled` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`initLogger`](../../../apps/referidos-app/src/services/loggingClient.js#L129) (referencia), [`setLoggerEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L135) (referencia), [`logEvent`](../../../apps/referidos-app/src/services/loggingClient.js#L155) (referencia), [`logError`](../../../apps/referidos-app/src/services/loggingClient.js#L186) (referencia), [`reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L191) (referencia).

#### [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L82) · función · asíncrona

Consulta o invoca Edge [`obs-release`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts). El resultado se adapta al contrato del consumidor.

- **Condiciones que evalúa** `releaseRegistered`.
- **Contrato de datos** Edge [`obs-release`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts) en [`loggingClient.js:86`](../../../apps/referidos-app/src/services/loggingClient.js#L86).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/services/loggingClient.js#L86).
- **Lo usa** [`initLogger`](../../../apps/referidos-app/src/services/loggingClient.js#L130) (llama).

#### [`sanitizeLevel`](../../../apps/referidos-app/src/services/loggingClient.js#L115) · función

Normaliza `Level` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`value.toLowerCase`](../../../apps/referidos-app/src/services/loggingClient.js#L116), [`LOG_LEVELS.has`](../../../apps/referidos-app/src/services/loggingClient.js#L117).
- **Lo usa** [`logEvent`](../../../apps/referidos-app/src/services/loggingClient.js#L156) (llama).

#### [`sanitizeCategory`](../../../apps/referidos-app/src/services/loggingClient.js#L120) · función

Normaliza `Category` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`value.toLowerCase`](../../../apps/referidos-app/src/services/loggingClient.js#L121), [`LOG_CATEGORIES.has`](../../../apps/referidos-app/src/services/loggingClient.js#L122).
- **Lo usa** [`logEvent`](../../../apps/referidos-app/src/services/loggingClient.js#L157) (llama).

#### [`initLogger`](../../../apps/referidos-app/src/services/loggingClient.js#L125) · función · exportado

Inicia `Logger` y prepara sus dependencias.

- **Actualizaciones de estado o acciones** `setEnabled`.
- **Condiciones que evalúa** `initialized`.
- **Llamadas directas en el cuerpo** [`runtime.init`](../../../apps/referidos-app/src/services/loggingClient.js#L128), [`runtime.setEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L129), [`registerReleaseOnce`](../../../apps/referidos-app/src/services/loggingClient.js#L130).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L28) (llama).

#### [`setLoggerEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L133) · función · exportado

Aplica o guarda `Logger Enabled` para que el estado refleje la operación.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setEnabled`.
- **Llamadas directas en el cuerpo** [`runtime.setEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L135).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L33) (llama).

#### [`setLoggerUser`](../../../apps/referidos-app/src/services/loggingClient.js#L138) · función · exportado

Aplica o guarda `Logger User` para que el estado refleje la operación.

- **Entradas** `{role} = valor por defecto`.
- **Actualizaciones de estado o acciones** `setContext`.
- **Llamadas directas en el cuerpo** [`runtime.setContext`](../../../apps/referidos-app/src/services/loggingClient.js#L139).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L34) (llama).

#### [`setLoggerContext`](../../../apps/referidos-app/src/services/loggingClient.js#L144) · función · exportado

Aplica o guarda `Logger Context` para que el estado refleje la operación.

- **Entradas** `partial = valor por defecto`.
- **Actualizaciones de estado o acciones** `setContext`.
- **Llamadas directas en el cuerpo** [`runtime.setContext`](../../../apps/referidos-app/src/services/loggingClient.js#L145).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L43) (llama).

#### [`logEvent`](../../../apps/referidos-app/src/services/loggingClient.js#L148) · función · exportado

Emite o envía el valor de evento en el flujo del archivo.

- **Entradas** `{level, category, message, context, context_extra}`.
- **Condiciones que evalúa** `ausencia de loggerEnabled`.
- **Llamadas directas en el cuerpo** [`sanitizeLevel`](../../../apps/referidos-app/src/services/loggingClient.js#L156), [`sanitizeCategory`](../../../apps/referidos-app/src/services/loggingClient.js#L157), [`runtime.logEvent`](../../../apps/referidos-app/src/services/loggingClient.js#L158).

#### [`logBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L167) · función · exportado

Emite o envía `Breadcrumb` en el flujo del archivo.

- **Entradas** `message`, `context = valor por defecto`.
- **Llamadas directas en el cuerpo** [`runtime.addBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L168).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L49) (llama).

#### [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) · función · exportado

Emite o envía `Catalog Breadcrumb` en el flujo del archivo.

- **Entradas** `code`, `data = valor por defecto`, `overrides = valor por defecto`.
- **Condiciones que evalúa** `ausencia de key`.
- **Usa código de** [`getBreadcrumbTemplate`](../../../packages/observability/src/breadcrumbs/catalog.js#L109) (llama).
- **Llamadas directas en el cuerpo** [`code.trim`](../../../apps/referidos-app/src/services/loggingClient.js#L172), [`getBreadcrumbTemplate`](../../../apps/referidos-app/src/services/loggingClient.js#L174), [`runtime.addBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L175), [`toISOString`](../../../apps/referidos-app/src/services/loggingClient.js#L180).
- **Lo usa** [`handleEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L435) (llama), [`handleHelpSelect`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1239) (llama), [`handleHelpSelect`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1222) (llama), [`handleCreate`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L94) (llama), [`onConfirmCancel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L130) (llama), [`handleOpenWhatsapp`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L156) (llama), [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L176) (llama), [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L65) (llama), [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L125) (llama), [`button.onClick`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L41) (llama), [`createSupportChatThread`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L5) (llama), [`fetchSupportChatTickets`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L29) (llama) y 18 más.

#### [`logError`](../../../apps/referidos-app/src/services/loggingClient.js#L185) · función · exportado

Emite o envía el valor de error en el flujo del archivo.

- **Entradas** `error`, `context = valor por defecto`.
- **Condiciones que evalúa** `ausencia de loggerEnabled`.
- **Llamadas directas en el cuerpo** [`runtime.logError`](../../../apps/referidos-app/src/services/loggingClient.js#L187).
- **Lo usa** [`AppErrorBoundary.componentDidCatch`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L15) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L6) (llama).

#### [`reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L190) · función · asíncrona · exportado

Emite o envía el valor de error en el flujo del archivo.

- **Entradas** `error`, `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de loggerEnabled`.
- **Llamadas directas en el cuerpo** [`runtime.reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L192).
- **Lo usa** [`AppErrorBoundary.componentDidCatch`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L19) (llama), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L660) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L7) (llama).

#### [`subscribeErrorEvents`](../../../apps/referidos-app/src/services/loggingClient.js#L195) · función · exportado

Inicia `Error Events` y prepara sus dependencias.

- **Entradas** `listener`.
- **Llamadas directas en el cuerpo** [`runtime.subscribeErrors`](../../../apps/referidos-app/src/services/loggingClient.js#L196).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L28) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L7) (llama).

#### [`flushLogs`](../../../apps/referidos-app/src/services/loggingClient.js#L199) · función · asíncrona · exportado

Coordina `Logs` con la planificación o reintento del flujo.

- **Llamadas directas en el cuerpo** [`runtime.flush`](../../../apps/referidos-app/src/services/loggingClient.js#L200).

#### [`evaluateErrorPolicy`](../../../apps/referidos-app/src/services/loggingClient.js#L203) · función · asíncrona · exportado

Implementa `evaluate Error Policy` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`runtime.evaluatePolicy`](../../../apps/referidos-app/src/services/loggingClient.js#L204).
- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L576) (llama).

#### [`beginPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L207) · función · exportado

Implementa `begin Policy Action` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `actionKey`.
- **Llamadas directas en el cuerpo** [`runtime.beginPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L208).
- **Lo usa** [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L86) (llama), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L559) (llama).

#### [`endPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L211) · función · exportado

Finaliza `Policy Action` y ajusta el estado que depende de esa operación.

- **Entradas** `actionKey`.
- **Llamadas directas en el cuerpo** [`runtime.endPolicyAction`](../../../apps/referidos-app/src/services/loggingClient.js#L212).
- **Lo usa** [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L95) (llama), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L608) (llama).

### [`apps/referidos-app/src/services/mfaService.js`](../../../apps/referidos-app/src/services/mfaService.js#L1)

Adapta alta, desafío, verificación y baja de TOTP, consulta el nivel de garantía y sincroniza flags del perfil.

**Superficie que exporta.** [`getMfaAssuranceLevel`](../../../apps/referidos-app/src/services/mfaService.js#L7), [`listMfaFactors`](../../../apps/referidos-app/src/services/mfaService.js#L15), [`enrollTotp`](../../../apps/referidos-app/src/services/mfaService.js#L61), [`challengeTotp`](../../../apps/referidos-app/src/services/mfaService.js#L80), [`verifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L90), [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L102), [`unenrollFactor`](../../../apps/referidos-app/src/services/mfaService.js#L123), [`syncTotpFlags`](../../../apps/referidos-app/src/services/mfaService.js#L131), [`pickActiveTotpFactor`](../../../apps/referidos-app/src/services/mfaService.js#L151).

**Módulos que lo cargan.** [`AddTwoFAStep.jsx`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L4) (importa), [`ModalTwoFADisable.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L5) (importa), [`ModalTwoFAEnroll.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L5) (importa), [`ModalTwoFAVerify.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L4) (importa), [`useMfaGate.js`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L4) (importa), [`useMfaState.js`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L2) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L4) · función

Implementa `to Error Message` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `error`, `fallback`.
- **Lo usa** [`getMfaAssuranceLevel`](../../../apps/referidos-app/src/services/mfaService.js#L10) (llama), [`listMfaFactors`](../../../apps/referidos-app/src/services/mfaService.js#L28) (llama), [`enrollTotp`](../../../apps/referidos-app/src/services/mfaService.js#L73) (llama), [`challengeTotp`](../../../apps/referidos-app/src/services/mfaService.js#L85) (llama), [`verifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L97) (llama), [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L109) (llama), [`unenrollFactor`](../../../apps/referidos-app/src/services/mfaService.js#L126) (llama), [`syncTotpFlags`](../../../apps/referidos-app/src/services/mfaService.js#L146) (llama).

#### [`getMfaAssuranceLevel`](../../../apps/referidos-app/src/services/mfaService.js#L7) · función · asíncrona · exportado

Opera sobre Auth `getAuthenticatorAssuranceLevel`. El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Auth `getAuthenticatorAssuranceLevel` en [`mfaService.js:8`](../../../apps/referidos-app/src/services/mfaService.js#L8).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.mfa.getAuthenticatorAssuranceLevel`](../../../apps/referidos-app/src/services/mfaService.js#L8), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L10).
- **Lo usa** [`resolveGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L28) (llama).

#### [`listMfaFactors`](../../../apps/referidos-app/src/services/mfaService.js#L15) · función · asíncrona · exportado

Opera sobre Auth `listFactors` y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Efectos y APIs** `solicitud HTTP por fetch`.
- **Condiciones que evalúa** `ausencia de error y isValidPayload`, `ausencia de accessToken o ausencia de supabaseUrl o ausencia de anonKey`, `ausencia de response.ok`, `ausencia de payloadOk`.
- **Contrato de datos** Auth `listFactors` en [`mfaService.js:16`](../../../apps/referidos-app/src/services/mfaService.js#L16), Auth `getSession` en [`mfaService.js:23`](../../../apps/referidos-app/src/services/mfaService.js#L23).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.mfa.listFactors`](../../../apps/referidos-app/src/services/mfaService.js#L16), [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/mfaService.js#L23), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L28), [`fetch`](../../../apps/referidos-app/src/services/mfaService.js#L31), [`catch`](../../../apps/referidos-app/src/services/mfaService.js#L39), [`response.json`](../../../apps/referidos-app/src/services/mfaService.js#L39).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L82) (llama), [`prepareEnrollment`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L64) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L25) (llama), [`refresh`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L14) (llama).

#### [`enrollTotp`](../../../apps/referidos-app/src/services/mfaService.js#L61) · función · asíncrona · exportado

Opera sobre Auth `enroll`. El resultado se adapta al contrato del consumidor.

- **Entradas** `{friendlyName, issuer} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `errorCode`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Auth `enroll` en [`mfaService.js:65`](../../../apps/referidos-app/src/services/mfaService.js#L65).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.mfa.enroll`](../../../apps/referidos-app/src/services/mfaService.js#L65), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L73).
- **Lo usa** [`startEnroll`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L66) (llama), [`startEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L50) (llama).

#### [`challengeTotp`](../../../apps/referidos-app/src/services/mfaService.js#L80) · función · asíncrona · exportado

Opera sobre Auth `challenge`. El resultado se adapta al contrato del consumidor.

- **Entradas** `factorId`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Auth `challenge` en [`mfaService.js:81`](../../../apps/referidos-app/src/services/mfaService.js#L81).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.mfa.challenge`](../../../apps/referidos-app/src/services/mfaService.js#L81), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L85).
- **Lo usa** [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L114) (llama).

#### [`verifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L90) · función · asíncrona · exportado

Opera sobre Auth `verify`. El resultado se adapta al contrato del consumidor.

- **Entradas** `{factorId, challengeId, code}`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Auth `verify` en [`mfaService.js:91`](../../../apps/referidos-app/src/services/mfaService.js#L91).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.mfa.verify`](../../../apps/referidos-app/src/services/mfaService.js#L91), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L97).
- **Lo usa** [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L116) (llama).

#### [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L102) · función · asíncrona · exportado

Opera sobre Auth `challengeAndVerify`. El resultado se adapta al contrato del consumidor.

- **Entradas** `{factorId, code}`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `function`, `error`, `ausencia de challenge.ok`.
- **Contrato de datos** Auth `challengeAndVerify` en [`mfaService.js:104`](../../../apps/referidos-app/src/services/mfaService.js#L104).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.mfa.challengeAndVerify`](../../../apps/referidos-app/src/services/mfaService.js#L104), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L109), [`challengeTotp`](../../../apps/referidos-app/src/services/mfaService.js#L114), [`verifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L116).
- **Lo usa** [`handleVerify`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L223) (llama), [`handleVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L144) (llama), [`handleVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L52) (llama).

#### [`unenrollFactor`](../../../apps/referidos-app/src/services/mfaService.js#L123) · función · asíncrona · exportado

Opera sobre Auth `unenroll`. El resultado se adapta al contrato del consumidor.

- **Entradas** `factorId`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Auth `unenroll` en [`mfaService.js:124`](../../../apps/referidos-app/src/services/mfaService.js#L124).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.mfa.unenroll`](../../../apps/referidos-app/src/services/mfaService.js#L124), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L126).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L113) (llama), [`handleDisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L48) (llama), [`prepareEnrollment`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L78) (llama).

#### [`syncTotpFlags`](../../../apps/referidos-app/src/services/mfaService.js#L131) · función · asíncrona · exportado

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `{enabled}`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de authId`, `error`.
- **Contrato de datos** Auth `getSession` en [`mfaService.js:132`](../../../apps/referidos-app/src/services/mfaService.js#L132), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`mfaService.js:141`](../../../apps/referidos-app/src/services/mfaService.js#L141), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`mfaService.js:141`](../../../apps/referidos-app/src/services/mfaService.js#L141).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/mfaService.js#L132), [`toISOString`](../../../apps/referidos-app/src/services/mfaService.js#L139), [`eq`](../../../apps/referidos-app/src/services/mfaService.js#L141), [`update`](../../../apps/referidos-app/src/services/mfaService.js#L141), [`supabase.from`](../../../apps/referidos-app/src/services/mfaService.js#L141), [`toErrorMessage`](../../../apps/referidos-app/src/services/mfaService.js#L146).
- **Lo usa** [`handleVerify`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L232) (llama), [`handleDisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L52) (llama), [`handleVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L153) (llama).

#### [`pickActiveTotpFactor`](../../../apps/referidos-app/src/services/mfaService.js#L151) · función · exportado

Extrae o interpreta `Active Totp Factor` de los argumentos, estado o datos de entrada.

- **Entradas** `factors = valor por defecto`.
- **Llamadas directas en el cuerpo** [`factors.find`](../../../apps/referidos-app/src/services/mfaService.js#L152), [`includes`](../../../apps/referidos-app/src/services/mfaService.js#L153), [`toLowerCase`](../../../apps/referidos-app/src/services/mfaService.js#L153).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L102) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L33) (llama), [`refresh`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L23) (llama).

### [`apps/referidos-app/src/services/onboardingClient.js`](../../../apps/referidos-app/src/services/onboardingClient.js#L1)

Obtiene una sesión y consulta la función onboarding para resolver perfil, pasos y acceso.

**Superficie que exporta.** [`runOnboardingCheck`](../../../apps/referidos-app/src/services/onboardingClient.js#L5).

**Módulos que lo cargan.** [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L19) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`./loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`runOnboardingCheck`](../../../apps/referidos-app/src/services/onboardingClient.js#L5) · función · asíncrona · exportado

Consulta o invoca Edge [`onboarding`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `error`, `ausencia de data`.
- **Contrato de datos** Auth `getSession` en [`onboardingClient.js:7`](../../../apps/referidos-app/src/services/onboardingClient.js#L7), Edge [`onboarding`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts) en [`onboardingClient.js:15`](../../../apps/referidos-app/src/services/onboardingClient.js#L15).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/onboardingClient.js#L6), [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/onboardingClient.js#L7), [`supabase.functions.invoke`](../../../apps/referidos-app/src/services/onboardingClient.js#L15).
- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L690) (llama).

### [`apps/referidos-app/src/services/promoService.js`](../../../apps/referidos-app/src/services/promoService.js#L1)

Consulta promociones activas y detalle e incluye información relacionada para componer las tarjetas de producto.

**Superficie que exporta.** [`getActivePromos`](../../../apps/referidos-app/src/services/promoService.js#L4), [`getPromoById`](../../../apps/referidos-app/src/services/promoService.js#L46).

**Módulos que lo cargan.** [`PromoDetalle.jsx`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L5) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L10) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`getActivePromos`](../../../apps/referidos-app/src/services/promoService.js#L4) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`select`) en [`promoService.js:6`](../../../apps/referidos-app/src/services/promoService.js#L6), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`promoService.js:6`](../../../apps/referidos-app/src/services/promoService.js#L6).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`order`](../../../apps/referidos-app/src/services/promoService.js#L6), [`eq`](../../../apps/referidos-app/src/services/promoService.js#L6), [`select`](../../../apps/referidos-app/src/services/promoService.js#L6), [`supabase.from`](../../../apps/referidos-app/src/services/promoService.js#L6), [`data.map`](../../../apps/referidos-app/src/services/promoService.js#L26).
- **Lo usa** [`loadPromos`](../../../apps/referidos-app/src/store/appStore.js#L763) (llama).

#### [`getPromoById`](../../../apps/referidos-app/src/services/promoService.js#L46) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) y coordina las demás operaciones de esta ficha.

- **Entradas** `promoId`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`, `ausencia de data`.
- **Contrato de datos** tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`select`) en [`promoService.js:48`](../../../apps/referidos-app/src/services/promoService.js#L48), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`promoService.js:48`](../../../apps/referidos-app/src/services/promoService.js#L48).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../apps/referidos-app/src/services/promoService.js#L48), [`eq`](../../../apps/referidos-app/src/services/promoService.js#L48), [`select`](../../../apps/referidos-app/src/services/promoService.js#L48), [`supabase.from`](../../../apps/referidos-app/src/services/promoService.js#L48).
- **Lo usa** [`loadPromo`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L90) (llama).

### [`apps/referidos-app/src/services/qrService.js`](../../../apps/referidos-app/src/services/qrService.js#L1)

Adapta las cinco RPC de QR a resultados de UI. Distingue QR de promo, QR válido y temporal, consulta de historial y canje.

**Superficie que exporta.** [`generatePromoQr`](../../../apps/referidos-app/src/services/qrService.js#L14), [`generateValidQr`](../../../apps/referidos-app/src/services/qrService.js#L35), [`getActiveValidQr`](../../../apps/referidos-app/src/services/qrService.js#L60), [`getQrHistory`](../../../apps/referidos-app/src/services/qrService.js#L87), [`redeemValidQr`](../../../apps/referidos-app/src/services/qrService.js#L119).

**Módulos que lo cargan.** [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L4) (importa), [`PromoDetalle.jsx`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L6) (importa), [`EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L4) (importa), [`useScannerState.ts`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L3) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L11) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`normalizeStatus`](../../../apps/referidos-app/src/services/qrService.js#L4) · función

Normaliza el valor de estado antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `row`.
- **Condiciones que evalúa** `ausencia de row.expires_at`, `statusFromDb`, `expiresMs`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/services/qrService.js#L7).
- **Lo usa** [`generateValidQr`](../../../apps/referidos-app/src/services/qrService.js#L46) (llama), [`getActiveValidQr`](../../../apps/referidos-app/src/services/qrService.js#L73) (llama), [`getQrHistory`](../../../apps/referidos-app/src/services/qrService.js#L97) (llama).

#### [`generatePromoQr`](../../../apps/referidos-app/src/services/qrService.js#L14) · función · asíncrona · exportado

Pide a la base el código asociado a una promoción. El formato y la política de emisión viven en la RPC referenciada.

- **Entradas** `promoId`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** RPC [`generate_promo_qr`](../../../apps/referidos-app/supabase/migrations/20250209_000001_qr_hmac.sql#L187) en [`qrService.js:16`](../../../apps/referidos-app/src/services/qrService.js#L16).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.rpc`](../../../apps/referidos-app/src/services/qrService.js#L16).
- **Lo usa** [`loadStaticQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L101) (llama), [`generatePromoQr`](../../../apps/referidos-app/src/store/appStore.js#L838) (llama).

#### [`generateValidQr`](../../../apps/referidos-app/src/services/qrService.js#L35) · función · asíncrona · exportado

Pide un QR válido para una promoción y distingue la opción de reutilización o generación forzada.

- **Entradas** `promoId`, `{force} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** RPC [`generate_valid_qr`](../../../apps/referidos-app/supabase/migrations/20250303_000001_groups_points_tiers.sql#L344) en [`qrService.js:37`](../../../apps/referidos-app/src/services/qrService.js#L37).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.rpc`](../../../apps/referidos-app/src/services/qrService.js#L37), [`normalizeStatus`](../../../apps/referidos-app/src/services/qrService.js#L46).
- **Lo usa** [`generateValidQr`](../../../apps/referidos-app/src/store/appStore.js#L839) (llama).

#### [`getActiveValidQr`](../../../apps/referidos-app/src/services/qrService.js#L60) · función · asíncrona · exportado

Consulta el QR de la promoción que la sesión del cliente puede mostrar como activo.

- **Entradas** `promoId`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`, `ausencia de data`.
- **Contrato de datos** RPC [`get_active_valid_qr`](../../../apps/referidos-app/supabase/migrations/20250209_000001_qr_hmac.sql#L327) en [`qrService.js:62`](../../../apps/referidos-app/src/services/qrService.js#L62).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.rpc`](../../../apps/referidos-app/src/services/qrService.js#L62), [`normalizeStatus`](../../../apps/referidos-app/src/services/qrService.js#L73).
- **Lo usa** [`loadValidQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L110) (llama), [`getActiveValidQr`](../../../apps/referidos-app/src/store/appStore.js#L840) (llama).

#### [`getQrHistory`](../../../apps/referidos-app/src/services/qrService.js#L87) · función · asíncrona · exportado

Obtiene historial de QR paginado por límite y adapta los registros para su presentación.

- **Entradas** `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** RPC [`get_qr_history`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L127) en [`qrService.js:89`](../../../apps/referidos-app/src/services/qrService.js#L89).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.rpc`](../../../apps/referidos-app/src/services/qrService.js#L89), [`map`](../../../apps/referidos-app/src/services/qrService.js#L94), [`normalizeStatus`](../../../apps/referidos-app/src/services/qrService.js#L97).
- **Lo usa** [`fetchData`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L109) (llama).

#### [`redeemValidQr`](../../../apps/referidos-app/src/services/qrService.js#L119) · función · asíncrona · exportado

Entrega el código leído a la operación de canje del backend y adapta su respuesta al escáner.

- **Entradas** `code`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`, `ausencia de data`.
- **Contrato de datos** RPC [`redeem_valid_qr`](../../../apps/referidos-app/supabase/migrations/20250303_000001_groups_points_tiers.sql#L476) en [`qrService.js:121`](../../../apps/referidos-app/src/services/qrService.js#L121).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.rpc`](../../../apps/referidos-app/src/services/qrService.js#L121).
- **Lo usa** [`handleCode`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L192) (llama), [`handleCode`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L196) (llama), [`redeemValidQr`](../../../apps/referidos-app/src/store/appStore.js#L841) (llama).

### [`apps/referidos-app/src/services/registrationClient.js`](../../../apps/referidos-app/src/services/registrationClient.js#L1)

Envía la sesión a validate-registration y normaliza el resultado que procesa AppGate.

**Superficie que exporta.** [`runValidateRegistration`](../../../apps/referidos-app/src/services/registrationClient.js#L4).

**Módulos que lo cargan.** [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L21) (importa), [`AppGate.jsx`](../../../apps/referidos-app/src/pages/AppGate.jsx#L5) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`runValidateRegistration`](../../../apps/referidos-app/src/services/registrationClient.js#L4) · función · asíncrona · exportado

Consulta o invoca Edge [`validate-registration`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `error`.
- **Contrato de datos** Auth `getSession` en [`registrationClient.js:5`](../../../apps/referidos-app/src/services/registrationClient.js#L5), Edge [`validate-registration`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts) en [`registrationClient.js:10`](../../../apps/referidos-app/src/services/registrationClient.js#L10).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/registrationClient.js#L5), [`supabase.functions.invoke`](../../../apps/referidos-app/src/services/registrationClient.js#L10).
- **Lo usa** [`handleBusinessAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1202) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/pages/AppGate.jsx#L102) (llama).
