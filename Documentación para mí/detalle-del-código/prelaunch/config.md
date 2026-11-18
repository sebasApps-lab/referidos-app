# Prelaunch · config

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/config/runtimeConfig.js`](../../../apps/prelaunch/src/config/runtimeConfig.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/config/runtimeConfig.js`](../../../apps/prelaunch/src/config/runtimeConfig.js#L1)

Normaliza la configuración pública. Resuelve window.__PRELAUNCH_RUNTIME_CONFIG__ y fallbacks de Vite para ambiente, backend, tenant y release.

**Superficie que exporta.** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61), [`getRuntimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L79).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L5) (importa), [`prelaunchObservability.js`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L6) (importa), [`prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L5) (importa), [`SupportRequestPage.jsx`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L11) (importa).

#### [`importEnv`](../../../apps/prelaunch/src/config/runtimeConfig.js#L1) · variable de módulo

Declara `importEnv` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`mode`](../../../apps/prelaunch/src/config/runtimeConfig.js#L10) (accede al módulo), [`appEnv`](../../../apps/prelaunch/src/config/runtimeConfig.js#L11) (accede al módulo), [`appId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L12) (accede al módulo), [`appVersion`](../../../apps/prelaunch/src/config/runtimeConfig.js#L16) (accede al módulo), [`buildId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L25) (accede al módulo), [`buildNumber`](../../../apps/prelaunch/src/config/runtimeConfig.js#L29) (accede al módulo), [`releaseId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L33) (accede al módulo), [`artifactId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L37) (accede al módulo), [`releaseChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L41) (accede al módulo), [`sourceCommitSha`](../../../apps/prelaunch/src/config/runtimeConfig.js#L45) (accede al módulo), [`defaultTenantId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L49) (accede al módulo), [`appChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L53) (accede al módulo) y 2 más.

#### [`browserWindow`](../../../apps/prelaunch/src/config/runtimeConfig.js#L2) · variable de módulo

Declara `browserWindow` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`runtimeWindowConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L3) (referencia).

#### [`runtimeWindowConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L3) · variable de módulo

Declara `runtimeWindowConfig` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`appEnv`](../../../apps/prelaunch/src/config/runtimeConfig.js#L11) (accede al módulo), [`appId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L12) (accede al módulo), [`appVersion`](../../../apps/prelaunch/src/config/runtimeConfig.js#L14) (accede al módulo), [`buildId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L24) (accede al módulo), [`buildNumber`](../../../apps/prelaunch/src/config/runtimeConfig.js#L28) (accede al módulo), [`releaseId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L32) (accede al módulo), [`artifactId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L36) (accede al módulo), [`releaseChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L40) (accede al módulo), [`sourceCommitSha`](../../../apps/prelaunch/src/config/runtimeConfig.js#L44) (accede al módulo), [`defaultTenantId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L48) (accede al módulo), [`appChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L52) (accede al módulo), [`supabaseUrl`](../../../apps/prelaunch/src/config/runtimeConfig.js#L55) (accede al módulo) y 1 más.

#### [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L5) · función

Implementa `as String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/prelaunch/src/config/runtimeConfig.js#L6).
- **Lo usa** [`mode`](../../../apps/prelaunch/src/config/runtimeConfig.js#L10) (llama), [`appEnv`](../../../apps/prelaunch/src/config/runtimeConfig.js#L11) (llama), [`appId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L12) (llama), [`appVersion`](../../../apps/prelaunch/src/config/runtimeConfig.js#L13) (llama), [`buildId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L23) (llama), [`buildNumber`](../../../apps/prelaunch/src/config/runtimeConfig.js#L27) (llama), [`releaseId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L31) (llama), [`artifactId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L35) (llama), [`releaseChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L39) (llama), [`sourceCommitSha`](../../../apps/prelaunch/src/config/runtimeConfig.js#L43) (llama), [`defaultTenantId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L47) (llama), [`appChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L51) (llama) y 2 más.

#### [`mode`](../../../apps/prelaunch/src/config/runtimeConfig.js#L10) · variable de módulo

Declara `mode` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L10).
- **Lo usa** [`appEnv`](../../../apps/prelaunch/src/config/runtimeConfig.js#L11) (referencia), [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L75) (referencia).

#### [`appEnv`](../../../apps/prelaunch/src/config/runtimeConfig.js#L11) · variable de módulo

Declara `appEnv` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L11).
- **Lo usa** [`releaseChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L41) (referencia), [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L62) (referencia).

#### [`appId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L12) · variable de módulo

Declara `appId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L12).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L63) (referencia).

#### [`appVersion`](../../../apps/prelaunch/src/config/runtimeConfig.js#L13) · variable de módulo

Declara `appVersion` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L13).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L64) (referencia).

#### [`buildId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L23) · variable de módulo

Declara `buildId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L23).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L65) (referencia).

#### [`buildNumber`](../../../apps/prelaunch/src/config/runtimeConfig.js#L27) · variable de módulo

Declara `buildNumber` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L27).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L66) (referencia).

#### [`releaseId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L31) · variable de módulo

Declara `releaseId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L31).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L67) (referencia).

#### [`artifactId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L35) · variable de módulo

Declara `artifactId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L35).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L68) (referencia).

#### [`releaseChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L39) · variable de módulo

Declara `releaseChannel` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L39).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L69) (referencia).

#### [`sourceCommitSha`](../../../apps/prelaunch/src/config/runtimeConfig.js#L43) · variable de módulo

Declara `sourceCommitSha` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L43).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L70) (referencia).

#### [`defaultTenantId`](../../../apps/prelaunch/src/config/runtimeConfig.js#L47) · variable de módulo

Declara `defaultTenantId` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L47).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L71) (referencia).

#### [`appChannel`](../../../apps/prelaunch/src/config/runtimeConfig.js#L51) · variable de módulo

Declara `appChannel` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L51).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L72) (referencia).

#### [`supabaseUrl`](../../../apps/prelaunch/src/config/runtimeConfig.js#L55) · variable de módulo

Declara `supabaseUrl` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L55).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L73) (referencia).

#### [`supabasePublishableKey`](../../../apps/prelaunch/src/config/runtimeConfig.js#L56) · variable de módulo

Declara `supabasePublishableKey` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`asString`](../../../apps/prelaunch/src/config/runtimeConfig.js#L56).
- **Lo usa** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L74) (referencia).

#### [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) · variable de módulo · exportado

Declara `runtimeConfig` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getRuntimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L80) (referencia), [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L51) (accede al módulo), [`SUPABASE_URL`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L8) (accede al módulo), [`SUPABASE_PUBLISHABLE_KEY`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L9) (accede al módulo), [`TENANT_HINT`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L10) (accede al módulo), [`APP_ID`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L11) (accede al módulo), [`APP_ENV`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L12) (accede al módulo), [`APP_VERSION`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L13) (accede al módulo), [`BUILD_ID`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L14) (accede al módulo), [`RELEASE_ID`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L15) (accede al módulo), [`SOURCE_COMMIT_SHA`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L16) (accede al módulo), [`SUPABASE_URL`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L7) (accede al módulo) y 4 más.

#### [`getRuntimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L79) · función · exportado

Obtiene o resuelve `Runtime Config` para entregarlo al consumidor.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.
