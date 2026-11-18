# PWA principal · Configuración web

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/config/runtimeConfig.js`](../../../apps/referidos-app/src/config/runtimeConfig.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/config/runtimeConfig.js`](../../../apps/referidos-app/src/config/runtimeConfig.js#L1)

Normaliza la configuración de ventana y variables Vite para que cada artefacto pueda señalar a su propio runtime.

**Superficie que exporta.** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81), [`getRuntimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L103).

**Módulos que lo cargan.** [`AdminTopbar.jsx`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L11) (importa), [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L24) (importa), [`LeafletMapPicker.jsx`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L3) (importa), [`supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L3) (importa), [`SupportChatHubBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L10) (importa), [`authService.js`](../../../apps/referidos-app/src/services/authService.js#L4) (importa), [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L8) (importa), [`mfaService.js`](../../../apps/referidos-app/src/services/mfaService.js#L2) (importa).

#### [`importEnv`](../../../apps/referidos-app/src/config/runtimeConfig.js#L1) · variable de módulo

Declara `importEnv` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`mode`](../../../apps/referidos-app/src/config/runtimeConfig.js#L10) (accede al módulo), [`appEnv`](../../../apps/referidos-app/src/config/runtimeConfig.js#L11) (accede al módulo), [`appId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L12) (accede al módulo), [`appVersion`](../../../apps/referidos-app/src/config/runtimeConfig.js#L16) (accede al módulo), [`buildId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L27) (accede al módulo), [`buildNumber`](../../../apps/referidos-app/src/config/runtimeConfig.js#L35) (accede al módulo), [`releaseId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L39) (accede al módulo), [`artifactId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L43) (accede al módulo), [`releaseChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L47) (accede al módulo), [`appChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L51) (accede al módulo), [`sourceCommitSha`](../../../apps/referidos-app/src/config/runtimeConfig.js#L55) (accede al módulo), [`defaultTenantId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L59) (accede al módulo) y 6 más.

#### [`browserWindow`](../../../apps/referidos-app/src/config/runtimeConfig.js#L2) · variable de módulo

Declara `browserWindow` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`runtimeWindowConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L3) (referencia), [`redirectFromOrigin`](../../../apps/referidos-app/src/config/runtimeConfig.js#L66) (referencia).

#### [`runtimeWindowConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L3) · variable de módulo

Declara `runtimeWindowConfig` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`appEnv`](../../../apps/referidos-app/src/config/runtimeConfig.js#L11) (accede al módulo), [`appId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L12) (accede al módulo), [`appVersion`](../../../apps/referidos-app/src/config/runtimeConfig.js#L14) (accede al módulo), [`buildId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L24) (accede al módulo), [`buildNumber`](../../../apps/referidos-app/src/config/runtimeConfig.js#L34) (accede al módulo), [`releaseId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L38) (accede al módulo), [`artifactId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L42) (accede al módulo), [`releaseChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L46) (accede al módulo), [`appChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L50) (accede al módulo), [`sourceCommitSha`](../../../apps/referidos-app/src/config/runtimeConfig.js#L54) (accede al módulo), [`defaultTenantId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L58) (accede al módulo), [`supabaseUrl`](../../../apps/referidos-app/src/config/runtimeConfig.js#L61) (accede al módulo) y 5 más.

#### [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L5) · función

Implementa `as String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/config/runtimeConfig.js#L6).
- **Lo usa** [`mode`](../../../apps/referidos-app/src/config/runtimeConfig.js#L10) (llama), [`appEnv`](../../../apps/referidos-app/src/config/runtimeConfig.js#L11) (llama), [`appId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L12) (llama), [`appVersion`](../../../apps/referidos-app/src/config/runtimeConfig.js#L13) (llama), [`buildId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L23) (llama), [`buildNumber`](../../../apps/referidos-app/src/config/runtimeConfig.js#L33) (llama), [`releaseId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L37) (llama), [`artifactId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L41) (llama), [`releaseChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L45) (llama), [`appChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L49) (llama), [`sourceCommitSha`](../../../apps/referidos-app/src/config/runtimeConfig.js#L53) (llama), [`defaultTenantId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L57) (llama) y 6 más.

#### [`mode`](../../../apps/referidos-app/src/config/runtimeConfig.js#L10) · variable de módulo

Declara `mode` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L10).
- **Lo usa** [`appEnv`](../../../apps/referidos-app/src/config/runtimeConfig.js#L11) (referencia), [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L99) (referencia).

#### [`appEnv`](../../../apps/referidos-app/src/config/runtimeConfig.js#L11) · variable de módulo

Declara `appEnv` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L11).
- **Lo usa** [`releaseChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L47) (referencia), [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L82) (referencia).

#### [`appId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L12) · variable de módulo

Declara `appId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L12).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L83) (referencia).

#### [`appVersion`](../../../apps/referidos-app/src/config/runtimeConfig.js#L13) · variable de módulo

Declara `appVersion` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L13).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L84) (referencia).

#### [`buildId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L23) · variable de módulo

Declara `buildId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L23).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L85) (referencia).

#### [`buildNumber`](../../../apps/referidos-app/src/config/runtimeConfig.js#L33) · variable de módulo

Declara `buildNumber` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L33).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L86) (referencia).

#### [`releaseId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L37) · variable de módulo

Declara `releaseId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L37).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L87) (referencia).

#### [`artifactId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L41) · variable de módulo

Declara `artifactId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L41).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L88) (referencia).

#### [`releaseChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L45) · variable de módulo

Declara `releaseChannel` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L45).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L89) (referencia).

#### [`appChannel`](../../../apps/referidos-app/src/config/runtimeConfig.js#L49) · variable de módulo

Declara `appChannel` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L49).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L90) (referencia).

#### [`sourceCommitSha`](../../../apps/referidos-app/src/config/runtimeConfig.js#L53) · variable de módulo

Declara `sourceCommitSha` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L53).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L91) (referencia).

#### [`defaultTenantId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L57) · variable de módulo

Declara `defaultTenantId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L57).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L92) (referencia).

#### [`supabaseUrl`](../../../apps/referidos-app/src/config/runtimeConfig.js#L61) · variable de módulo

Declara `supabaseUrl` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L61).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L93) (referencia).

#### [`supabaseAnonKey`](../../../apps/referidos-app/src/config/runtimeConfig.js#L62) · variable de módulo

Declara `supabaseAnonKey` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L62).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L94) (referencia).

#### [`redirectFromOrigin`](../../../apps/referidos-app/src/config/runtimeConfig.js#L66) · variable de módulo

Declara `redirectFromOrigin` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`authRedirectUrl`](../../../apps/referidos-app/src/config/runtimeConfig.js#L69) (referencia).

#### [`authRedirectUrl`](../../../apps/referidos-app/src/config/runtimeConfig.js#L67) · variable de módulo

Declara `authRedirectUrl` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L67).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L95) (referencia).

#### [`googleClientId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L71) · variable de módulo

Declara `googleClientId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L71).
- **Lo usa** [`googleOneTapClientId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L77) (referencia), [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L96) (referencia).

#### [`googleOneTapClientId`](../../../apps/referidos-app/src/config/runtimeConfig.js#L75) · variable de módulo

Declara `googleOneTapClientId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L75).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L97) (referencia).

#### [`mapTilerKey`](../../../apps/referidos-app/src/config/runtimeConfig.js#L79) · variable de módulo

Declara `mapTilerKey` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/config/runtimeConfig.js#L79).
- **Lo usa** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L98) (referencia).

#### [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) · variable de módulo · exportado

Declara `runtimeConfig` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getRuntimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L104) (referencia), [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L18) (accede al módulo), [`GOOGLE_ONE_TAP_CLIENT_ID`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L30) (accede al módulo), [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L127) (accede al módulo), [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L21) (accede al módulo), [`SUPABASE_URL`](../../../apps/referidos-app/src/lib/supabaseClient.js#L11) (accede al módulo), [`SUPABASE_ANON_KEY`](../../../apps/referidos-app/src/lib/supabaseClient.js#L12) (accede al módulo), [`resolveSupportAppChannel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L14) (accede al módulo), [`context`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L54) (accede al módulo), [`signInWithOAuth`](../../../apps/referidos-app/src/services/authService.js#L27) (accede al módulo), [`DEFAULT_TENANT_HINT`](../../../apps/referidos-app/src/services/loggingClient.js#L12) (accede al módulo), [`DEFAULT_APP_ID`](../../../apps/referidos-app/src/services/loggingClient.js#L13) (accede al módulo) y 9 más.

#### [`getRuntimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L103) · función · exportado

Obtiene o resuelve `Runtime Config` para entregarlo al consumidor.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.
