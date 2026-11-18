# Paquetes compartidos · api-client

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/api-client/src/address/gpsFallback.js`](../../../packages/api-client/src/address/gpsFallback.js#L1)
- [`packages/api-client/src/address/reverse.js`](../../../packages/api-client/src/address/reverse.js#L1)
- [`packages/api-client/src/address/search.js`](../../../packages/api-client/src/address/search.js#L1)
- [`packages/api-client/src/address/territory.js`](../../../packages/api-client/src/address/territory.js#L1)
- [`packages/api-client/src/auth/onboarding.js`](../../../packages/api-client/src/auth/onboarding.js#L1)
- [`packages/api-client/src/auth/registration.js`](../../../packages/api-client/src/auth/registration.js#L1)
- [`packages/api-client/src/clients/createSupabaseMobileClient.js`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L1)
- [`packages/api-client/src/clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js#L1)
- [`packages/api-client/src/createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L1)
- [`packages/api-client/src/index.js`](../../../packages/api-client/src/index.js#L1)
- [`packages/api-client/src/logs/logEvent.js`](../../../packages/api-client/src/logs/logEvent.js#L1)
- [`packages/api-client/src/prelaunch/anonIdentity.js`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L1)
- [`packages/api-client/src/prelaunch/createPrelaunchClient.js`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L1)
- [`packages/api-client/src/prelaunch/index.js`](../../../packages/api-client/src/prelaunch/index.js#L1)
- [`packages/api-client/src/support/supportClient.js`](../../../packages/api-client/src/support/supportClient.js#L1)

## Símbolos y conexiones

### [`packages/api-client/src/address/gpsFallback.js`](../../../packages/api-client/src/address/gpsFallback.js#L1)

Lee y guarda ubicación GPS de respaldo en el runtime para la sesión del usuario.

**Superficie que exporta.** [`saveGpsFallbackLocation`](../../../packages/api-client/src/address/gpsFallback.js#L1), [`getGpsFallbackLocation`](../../../packages/api-client/src/address/gpsFallback.js#L52).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L5) (importa).

#### [`saveGpsFallbackLocation`](../../../packages/api-client/src/address/gpsFallback.js#L1) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `{lat, lng}`.
- **Retorno visible o tipo declarado** `ok`, `error`, `id`, `updated`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `ausencia de session.user`, `userErr o ausencia de userRow.id`, `existingErr`, `existing.id`, `error`, `error o ausencia de created.id`.
- **Contrato de datos** Auth `getSession` en [`gpsFallback.js:8`](../../../packages/api-client/src/address/gpsFallback.js#L8), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`gpsFallback.js:11`](../../../packages/api-client/src/address/gpsFallback.js#L11), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`gpsFallback.js:11`](../../../packages/api-client/src/address/gpsFallback.js#L11), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`gpsFallback.js:21`](../../../packages/api-client/src/address/gpsFallback.js#L21), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`gpsFallback.js:21`](../../../packages/api-client/src/address/gpsFallback.js#L21), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`update`) en [`gpsFallback.js:38`](../../../packages/api-client/src/address/gpsFallback.js#L38), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert + select`) en [`gpsFallback.js:43`](../../../packages/api-client/src/address/gpsFallback.js#L43), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert`) en [`gpsFallback.js:43`](../../../packages/api-client/src/address/gpsFallback.js#L43).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../packages/api-client/src/address/gpsFallback.js#L8), [`maybeSingle`](../../../packages/api-client/src/address/gpsFallback.js#L11), [`eq`](../../../packages/api-client/src/address/gpsFallback.js#L11), [`select`](../../../packages/api-client/src/address/gpsFallback.js#L11), [`supabase.from`](../../../packages/api-client/src/address/gpsFallback.js#L11), [`toISOString`](../../../packages/api-client/src/address/gpsFallback.js#L34), [`update`](../../../packages/api-client/src/address/gpsFallback.js#L38), [`insert`](../../../packages/api-client/src/address/gpsFallback.js#L43).
- **Lo usa** [`saveGpsFallback`](../../../packages/api-client/src/createMobileApi.js#L23) (llama).

#### [`getGpsFallbackLocation`](../../../packages/api-client/src/address/gpsFallback.js#L52) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`.
- **Retorno visible o tipo declarado** `ok`, `error`, `location`.
- **Condiciones que evalúa** `ausencia de session.user`, `userErr o ausencia de userRow.id`, `error`, `ausencia de data.lat o ausencia de data.lng`.
- **Contrato de datos** Auth `getSession` en [`gpsFallback.js:53`](../../../packages/api-client/src/address/gpsFallback.js#L53), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`gpsFallback.js:56`](../../../packages/api-client/src/address/gpsFallback.js#L56), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`gpsFallback.js:56`](../../../packages/api-client/src/address/gpsFallback.js#L56), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`gpsFallback.js:63`](../../../packages/api-client/src/address/gpsFallback.js#L63), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`gpsFallback.js:63`](../../../packages/api-client/src/address/gpsFallback.js#L63).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../packages/api-client/src/address/gpsFallback.js#L53), [`maybeSingle`](../../../packages/api-client/src/address/gpsFallback.js#L56), [`eq`](../../../packages/api-client/src/address/gpsFallback.js#L56), [`select`](../../../packages/api-client/src/address/gpsFallback.js#L56), [`supabase.from`](../../../packages/api-client/src/address/gpsFallback.js#L56).
- **Lo usa** [`getGpsFallback`](../../../packages/api-client/src/createMobileApi.js#L24) (llama).

### [`packages/api-client/src/address/reverse.js`](../../../packages/api-client/src/address/reverse.js#L1)

Envuelve geocodificación inversa, a partir de latitud y longitud.

**Superficie que exporta.** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L19).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L4) (importa).

**Dependencias del archivo.** [`../clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js).

#### [`CACHE_TTL_MS`](../../../packages/api-client/src/address/reverse.js#L3) · variable de módulo

Declara `CACHE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L33) (referencia).

#### [`MIN_INTERVAL_MS`](../../../packages/api-client/src/address/reverse.js#L4) · variable de módulo

Declara `MIN_INTERVAL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L40) (referencia).

#### [`memoryCache`](../../../packages/api-client/src/address/reverse.js#L6) · variable de módulo

Declara `memoryCache` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L32) (accede al módulo).

#### [`inFlight`](../../../packages/api-client/src/address/reverse.js#L7) · variable de módulo

Declara `inFlight` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L37) (accede al módulo).

#### [`lastRequestAt`](../../../packages/api-client/src/address/reverse.js#L8) · variable de módulo

Declara `lastRequestAt` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L40) (referencia).

#### [`buildKey`](../../../packages/api-client/src/address/reverse.js#L10) · función

Construye `Key` a partir de los datos del flujo.

- **Entradas** `lat`, `lng`, `{language}`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../packages/api-client/src/address/reverse.js#L11).
- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L31) (llama).

#### [`waitMs`](../../../packages/api-client/src/address/reverse.js#L14) · función · asíncrona

Coordina `Ms` con la planificación o reintento del flujo.

- **Entradas** `ms`.
- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `ms`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../packages/api-client/src/address/reverse.js#L16).
- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L41) (llama).

#### [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L19) · función · asíncrona · exportado

Consulta o invoca Edge o adaptador [`address-reverse`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `supabase`, `lat`, `lng`, `{language, skipCache} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`, `cached`, `source`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `ausencia de skipCache y cached y CACHE_TTL_MS`, `inFlight.has`, `ausencia de response.ok`, `ausencia de result`.
- **Contrato de datos** Edge o adaptador [`address-reverse`](../../../apps/referidos-app/supabase/functions/address-reverse/index.ts) en [`reverse.js:44`](../../../packages/api-client/src/address/reverse.js#L44).
- **Usa código de** [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`buildKey`](../../../packages/api-client/src/address/reverse.js#L31), [`memoryCache.get`](../../../packages/api-client/src/address/reverse.js#L32), [`inFlight.has`](../../../packages/api-client/src/address/reverse.js#L37), [`inFlight.get`](../../../packages/api-client/src/address/reverse.js#L37), [`waitMs`](../../../packages/api-client/src/address/reverse.js#L41), [`invokeWithSession`](../../../packages/api-client/src/address/reverse.js#L44), [`memoryCache.set`](../../../packages/api-client/src/address/reverse.js#L58), [`inFlight.set`](../../../packages/api-client/src/address/reverse.js#L62), [`inFlight.delete`](../../../packages/api-client/src/address/reverse.js#L64).
- **Lo usa** [`reverse`](../../../packages/api-client/src/createMobileApi.js#L22) (llama).

### [`packages/api-client/src/address/search.js`](../../../packages/api-client/src/address/search.js#L1)

Encamina búsqueda de direcciones al endpoint y adapta sus datos a la interfaz móvil.

**Superficie que exporta.** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L21).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L3) (importa).

**Dependencias del archivo.** [`@referidos/domain`](../../../packages/domain/src/index.js), [`../clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js).

#### [`CACHE_TTL_MS`](../../../packages/api-client/src/address/search.js#L4) · variable de módulo

Declara `CACHE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L38) (referencia).

#### [`MIN_INTERVAL_MS`](../../../packages/api-client/src/address/search.js#L5) · variable de módulo

Declara `MIN_INTERVAL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L45) (referencia).

#### [`MIN_QUERY_LENGTH`](../../../packages/api-client/src/address/search.js#L6) · variable de módulo

Declara `MIN_QUERY_LENGTH` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L32) (referencia).

#### [`memoryCache`](../../../packages/api-client/src/address/search.js#L8) · variable de módulo

Declara `memoryCache` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L37) (accede al módulo).

#### [`inFlight`](../../../packages/api-client/src/address/search.js#L9) · variable de módulo

Declara `inFlight` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L42) (accede al módulo).

#### [`lastRequestAt`](../../../packages/api-client/src/address/search.js#L10) · variable de módulo

Declara `lastRequestAt` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L45) (referencia).

#### [`buildKey`](../../../packages/api-client/src/address/search.js#L12) · función

Construye `Key` a partir de los datos del flujo.

- **Entradas** `query`, `{limit, country, language}`.
- **Usa código de** [`normalizeLooseSearch`](../../../packages/domain/src/normalizers/text.js#L36) (llama).
- **Llamadas directas en el cuerpo** [`normalizeLooseSearch`](../../../packages/api-client/src/address/search.js#L13).
- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L36) (llama).

#### [`waitMs`](../../../packages/api-client/src/address/search.js#L16) · función · asíncrona

Coordina `Ms` con la planificación o reintento del flujo.

- **Entradas** `ms`.
- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `ms`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../packages/api-client/src/address/search.js#L18).
- **Lo usa** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L46) (llama).

#### [`searchAddresses`](../../../packages/api-client/src/address/search.js#L21) · función · asíncrona · exportado

Consulta o invoca Edge o adaptador [`address-search`](../../../apps/referidos-app/supabase/functions/address-search/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `supabase`, `query`, `{limit, country, language, skipCache} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `results`, `skipped`, `cached`, `source`.
- **Condiciones que evalúa** `trimmed.length`, `ausencia de skipCache y cached y CACHE_TTL_MS`, `inFlight.has`, `ausencia de response.ok`.
- **Contrato de datos** Edge o adaptador [`address-search`](../../../apps/referidos-app/supabase/functions/address-search/index.ts) en [`search.js:49`](../../../packages/api-client/src/address/search.js#L49).
- **Usa código de** [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/api-client/src/address/search.js#L31), [`buildKey`](../../../packages/api-client/src/address/search.js#L36), [`memoryCache.get`](../../../packages/api-client/src/address/search.js#L37), [`inFlight.has`](../../../packages/api-client/src/address/search.js#L42), [`inFlight.get`](../../../packages/api-client/src/address/search.js#L42), [`waitMs`](../../../packages/api-client/src/address/search.js#L46), [`invokeWithSession`](../../../packages/api-client/src/address/search.js#L49), [`response.data.results.map`](../../../packages/api-client/src/address/search.js#L56), [`memoryCache.set`](../../../packages/api-client/src/address/search.js#L64), [`inFlight.set`](../../../packages/api-client/src/address/search.js#L68), [`inFlight.delete`](../../../packages/api-client/src/address/search.js#L70).
- **Lo usa** [`search`](../../../packages/api-client/src/createMobileApi.js#L21) (llama).

### [`packages/api-client/src/address/territory.js`](../../../packages/api-client/src/address/territory.js#L1)

Consulta catálogo territorial para formularios de provincia, cantón y parroquia.

**Superficie que exporta.** [`fetchProvincias`](../../../packages/api-client/src/address/territory.js#L23), [`fetchCantonesByProvincia`](../../../packages/api-client/src/address/territory.js#L45), [`fetchParroquiasByCanton`](../../../packages/api-client/src/address/territory.js#L72).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L6) (importa).

#### [`CACHE_TTL_MS`](../../../packages/api-client/src/address/territory.js#L1) · variable de módulo

Declara `CACHE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`isFresh`](../../../packages/api-client/src/address/territory.js#L20) (referencia).

#### [`cache`](../../../packages/api-client/src/address/territory.js#L3) · variable de módulo

Agrupa la configuración o catálogo de `cache` para que sus consumidores lean claves comunes.

- **Campos o contexto** `provincias`, `cantonesByProvincia`, `parroquiasByCanton`.
- **Lo usa** [`fetchProvincias`](../../../packages/api-client/src/address/territory.js#L24) (accede al módulo), [`fetchCantonesByProvincia`](../../../packages/api-client/src/address/territory.js#L49) (accede al módulo), [`fetchParroquiasByCanton`](../../../packages/api-client/src/address/territory.js#L76) (accede al módulo).

#### [`toTitleCaseEs`](../../../packages/api-client/src/address/territory.js#L9) · función

Implementa `to Title Case Es` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de text`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/api-client/src/address/territory.js#L10), [`trim`](../../../packages/api-client/src/address/territory.js#L10), [`join`](../../../packages/api-client/src/address/territory.js#L12), [`map`](../../../packages/api-client/src/address/territory.js#L12), [`filter`](../../../packages/api-client/src/address/territory.js#L12), [`text.split`](../../../packages/api-client/src/address/territory.js#L12), [`toUpperCase`](../../../packages/api-client/src/address/territory.js#L15), [`part.charAt`](../../../packages/api-client/src/address/territory.js#L15), [`part.slice`](../../../packages/api-client/src/address/territory.js#L15).
- **Lo usa** [`fetchProvincias`](../../../packages/api-client/src/address/territory.js#L39) (llama), [`fetchCantonesByProvincia`](../../../packages/api-client/src/address/territory.js#L66) (llama), [`fetchParroquiasByCanton`](../../../packages/api-client/src/address/territory.js#L93) (llama).

#### [`isFresh`](../../../packages/api-client/src/address/territory.js#L19) · función

Comprueba `Fresh` para decidir si se admite o continúa la operación.

- **Entradas** `ts`.
- **Lo usa** [`fetchProvincias`](../../../packages/api-client/src/address/territory.js#L24) (llama), [`fetchCantonesByProvincia`](../../../packages/api-client/src/address/territory.js#L50) (llama), [`fetchParroquiasByCanton`](../../../packages/api-client/src/address/territory.js#L77) (llama).

#### [`fetchProvincias`](../../../packages/api-client/src/address/territory.js#L23) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`provincias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L4) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`.
- **Retorno visible o tipo declarado** `ok`, `data`, `cached`, `error`.
- **Condiciones que evalúa** `isFresh`, `error`.
- **Contrato de datos** tabla o vista [`provincias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L4) (`select`) en [`territory.js:28`](../../../packages/api-client/src/address/territory.js#L28), tabla o bucket [`provincias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L4) en [`territory.js:28`](../../../packages/api-client/src/address/territory.js#L28).
- **Llamadas directas en el cuerpo** [`isFresh`](../../../packages/api-client/src/address/territory.js#L24), [`order`](../../../packages/api-client/src/address/territory.js#L28), [`select`](../../../packages/api-client/src/address/territory.js#L28), [`supabase.from`](../../../packages/api-client/src/address/territory.js#L28), [`map`](../../../packages/api-client/src/address/territory.js#L37), [`toTitleCaseEs`](../../../packages/api-client/src/address/territory.js#L39).
- **Lo usa** [`fetchProvincias`](../../../packages/api-client/src/createMobileApi.js#L25) (llama).

#### [`fetchCantonesByProvincia`](../../../packages/api-client/src/address/territory.js#L45) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`cantones`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L9) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `provinciaId`.
- **Retorno visible o tipo declarado** `ok`, `data`, `cached`, `error`.
- **Condiciones que evalúa** `ausencia de provincia`, `cached y isFresh`, `error`.
- **Contrato de datos** tabla o vista [`cantones`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L9) (`select`) en [`territory.js:54`](../../../packages/api-client/src/address/territory.js#L54), tabla o bucket [`cantones`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L9) en [`territory.js:54`](../../../packages/api-client/src/address/territory.js#L54).
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/api-client/src/address/territory.js#L46), [`cache.cantonesByProvincia.get`](../../../packages/api-client/src/address/territory.js#L49), [`isFresh`](../../../packages/api-client/src/address/territory.js#L50), [`order`](../../../packages/api-client/src/address/territory.js#L54), [`eq`](../../../packages/api-client/src/address/territory.js#L54), [`select`](../../../packages/api-client/src/address/territory.js#L54), [`supabase.from`](../../../packages/api-client/src/address/territory.js#L54), [`map`](../../../packages/api-client/src/address/territory.js#L64), [`toTitleCaseEs`](../../../packages/api-client/src/address/territory.js#L66), [`cache.cantonesByProvincia.set`](../../../packages/api-client/src/address/territory.js#L68).
- **Lo usa** [`fetchCantones`](../../../packages/api-client/src/createMobileApi.js#L26) (llama).

#### [`fetchParroquiasByCanton`](../../../packages/api-client/src/address/territory.js#L72) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`parroquias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L17) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `cantonId`.
- **Retorno visible o tipo declarado** `ok`, `data`, `cached`, `error`.
- **Condiciones que evalúa** `ausencia de canton`, `cached y isFresh`, `error`.
- **Contrato de datos** tabla o vista [`parroquias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L17) (`select`) en [`territory.js:81`](../../../packages/api-client/src/address/territory.js#L81), tabla o bucket [`parroquias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L17) en [`territory.js:81`](../../../packages/api-client/src/address/territory.js#L81).
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/api-client/src/address/territory.js#L73), [`cache.parroquiasByCanton.get`](../../../packages/api-client/src/address/territory.js#L76), [`isFresh`](../../../packages/api-client/src/address/territory.js#L77), [`order`](../../../packages/api-client/src/address/territory.js#L81), [`eq`](../../../packages/api-client/src/address/territory.js#L81), [`select`](../../../packages/api-client/src/address/territory.js#L81), [`supabase.from`](../../../packages/api-client/src/address/territory.js#L81), [`map`](../../../packages/api-client/src/address/territory.js#L91), [`toTitleCaseEs`](../../../packages/api-client/src/address/territory.js#L93), [`cache.parroquiasByCanton.set`](../../../packages/api-client/src/address/territory.js#L95).
- **Lo usa** [`fetchParroquias`](../../../packages/api-client/src/createMobileApi.js#L27) (llama).

### [`packages/api-client/src/auth/onboarding.js`](../../../packages/api-client/src/auth/onboarding.js#L1)

Llama a onboarding con sesión. Entrega a Android estado de acceso, perfil y pasos pendientes.

**Superficie que exporta.** [`runOnboardingCheck`](../../../packages/api-client/src/auth/onboarding.js#L3).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L1) (importa).

**Dependencias del archivo.** [`../clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js).

#### [`runOnboardingCheck`](../../../packages/api-client/src/auth/onboarding.js#L3) · función · asíncrona · exportado

Consulta o invoca Edge o adaptador [`onboarding`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `supabase`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Contrato de datos** Edge o adaptador [`onboarding`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts) en [`onboarding.js:4`](../../../packages/api-client/src/auth/onboarding.js#L4).
- **Usa código de** [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`invokeWithSession`](../../../packages/api-client/src/auth/onboarding.js#L4).
- **Lo usa** [`runOnboardingCheck`](../../../packages/api-client/src/createMobileApi.js#L17) (llama).

### [`packages/api-client/src/auth/registration.js`](../../../packages/api-client/src/auth/registration.js#L1)

Invoca validate-registration, que valida el registro del usuario de la sesión. Delega normalización del resultado al contrato móvil.

**Superficie que exporta.** [`runValidateRegistration`](../../../packages/api-client/src/auth/registration.js#L3).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L2) (importa).

**Dependencias del archivo.** [`../clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js).

#### [`runValidateRegistration`](../../../packages/api-client/src/auth/registration.js#L3) · función · asíncrona · exportado

Consulta o invoca Edge o adaptador [`validate-registration`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `supabase`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Contrato de datos** Edge o adaptador [`validate-registration`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts) en [`registration.js:4`](../../../packages/api-client/src/auth/registration.js#L4).
- **Usa código de** [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`invokeWithSession`](../../../packages/api-client/src/auth/registration.js#L4).
- **Lo usa** [`runValidateRegistration`](../../../packages/api-client/src/createMobileApi.js#L18) (llama).

### [`packages/api-client/src/clients/createSupabaseMobileClient.js`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L1)

Construye el cliente Supabase para React Native. Define opciones de auth, almacenamiento cuando se inyecta y manejo de sesión sin depender del navegador.

**Superficie que exporta.** [`createSupabaseMobileClient`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L12).

**Módulos que lo cargan.** [`index.js`](../../../packages/api-client/src/index.js#L1) (reexporta), [`index.js`](../../../packages/api-client/src/index.js#L5) (reexporta createSupabaseClient).

**Dependencias del archivo.** `@supabase/supabase-js`.

#### [`DEFAULT_OPTIONS`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L3) · variable de módulo

Agrupa la configuración o catálogo de `DEFAULT OPTIONS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `auth`.
- **Lo usa** [`createSupabaseMobileClient`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L21) (referencia).

#### [`createSupabaseMobileClient`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L12) · función · exportado

Construye `Supabase Mobile Client` a partir de los datos del flujo.

- **Entradas** `{url, anonKey, options} = valor por defecto`.
- **Condiciones que evalúa** `ausencia de url o ausencia de anonKey`.
- **Llamadas directas en el cuerpo** [`createClient`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L20).
- **Lo usa** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (llama).

### [`packages/api-client/src/clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js#L1)

Obtiene token vigente y ofrece invocación autenticada de funciones. Uniforma respuestas de falta de sesión y fallo de transporte.

**Superficie que exporta.** [`getAccessToken`](../../../packages/api-client/src/clients/sessionHelpers.js#L1), [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6).

**Módulos que lo cargan.** [`reverse.js`](../../../packages/api-client/src/address/reverse.js#L1) (importa), [`search.js`](../../../packages/api-client/src/address/search.js#L2) (importa), [`onboarding.js`](../../../packages/api-client/src/auth/onboarding.js#L1) (importa), [`registration.js`](../../../packages/api-client/src/auth/registration.js#L1) (importa), [`supportClient.js`](../../../packages/api-client/src/support/supportClient.js#L1) (importa), [`logEvent.js`](../../../packages/api-client/src/logs/logEvent.js#L1) (importa).

#### [`getAccessToken`](../../../packages/api-client/src/clients/sessionHelpers.js#L1) · función · asíncrona · exportado

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Entradas** `supabase`.
- **Contrato de datos** Auth `getSession` en [`sessionHelpers.js:2`](../../../packages/api-client/src/clients/sessionHelpers.js#L2).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L2).
- **Lo usa** [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L7) (llama).

#### [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6) · función · asíncrona · exportado

Implementa `invoke With Session` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `fnName`, `{body} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `ausencia de accessToken`, `error`.
- **Llamadas directas en el cuerpo** [`getAccessToken`](../../../packages/api-client/src/clients/sessionHelpers.js#L7), [`supabase.functions.invoke`](../../../packages/api-client/src/clients/sessionHelpers.js#L10).
- **Lo usa** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L44) (llama), [`searchAddresses`](../../../packages/api-client/src/address/search.js#L49) (llama), [`runOnboardingCheck`](../../../packages/api-client/src/auth/onboarding.js#L4) (llama), [`runValidateRegistration`](../../../packages/api-client/src/auth/registration.js#L4) (llama), [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L4) (llama), [`logEvent`](../../../packages/api-client/src/logs/logEvent.js#L4) (llama).

### [`packages/api-client/src/createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L1)

Ensamble de operaciones móviles sobre un cliente Supabase inyectado. Organiza Auth, dirección, soporte y logs con una interfaz estable para Android. Importa un helper de logs excluido por .gitignore en este checkout.

**Superficie que exporta.** [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14).

**Módulos que lo cargan.** [`index.js`](../../../packages/api-client/src/index.js#L2) (reexporta), [`index.js`](../../../packages/api-client/src/index.js#L8) (reexporta createApiClient).

**Dependencias del archivo.** [`./auth/onboarding.js`](../../../packages/api-client/src/auth/onboarding.js), [`./auth/registration.js`](../../../packages/api-client/src/auth/registration.js), [`./address/search.js`](../../../packages/api-client/src/address/search.js), [`./address/reverse.js`](../../../packages/api-client/src/address/reverse.js), [`./address/gpsFallback.js`](../../../packages/api-client/src/address/gpsFallback.js), [`./address/territory.js`](../../../packages/api-client/src/address/territory.js), [`./support/supportClient.js`](../../../packages/api-client/src/support/supportClient.js), [`./logs/logEvent.js`](../../../packages/api-client/src/logs/logEvent.js).

#### [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14) · función · exportado

Construye `Mobile Api` a partir de los datos del flujo.

- **Entradas** `supabase`.
- **Retorno visible o tipo declarado** `auth`, `address`, `support`, `logs`.
- **Lo usa** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (llama).

#### [`runOnboardingCheck`](../../../packages/api-client/src/createMobileApi.js#L17) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Maneja `Onboarding Check` y coordina las acciones indicadas abajo.

- **Usa código de** [`runOnboardingCheck`](../../../packages/api-client/src/auth/onboarding.js#L3) (llama).
- **Llamadas directas en el cuerpo** [`runOnboardingCheck`](../../../packages/api-client/src/createMobileApi.js#L17).

#### [`runValidateRegistration`](../../../packages/api-client/src/createMobileApi.js#L18) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Maneja `Validate Registration` y coordina las acciones indicadas abajo.

- **Usa código de** [`runValidateRegistration`](../../../packages/api-client/src/auth/registration.js#L3) (llama).
- **Llamadas directas en el cuerpo** [`runValidateRegistration`](../../../packages/api-client/src/createMobileApi.js#L18).

#### [`search`](../../../packages/api-client/src/createMobileApi.js#L21) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `search`.

- **Entradas** `query`, `options`.
- **Usa código de** [`searchAddresses`](../../../packages/api-client/src/address/search.js#L21) (llama).
- **Llamadas directas en el cuerpo** [`searchAddresses`](../../../packages/api-client/src/createMobileApi.js#L21).

#### [`reverse`](../../../packages/api-client/src/createMobileApi.js#L22) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `reverse`.

- **Entradas** `lat`, `lng`, `options`.
- **Usa código de** [`reverseGeocode`](../../../packages/api-client/src/address/reverse.js#L19) (llama).
- **Llamadas directas en el cuerpo** [`reverseGeocode`](../../../packages/api-client/src/createMobileApi.js#L22).

#### [`saveGpsFallback`](../../../packages/api-client/src/createMobileApi.js#L23) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Aplica o guarda `Gps Fallback` para que el estado refleje la operación.

- **Entradas** `payload`.
- **Usa código de** [`saveGpsFallbackLocation`](../../../packages/api-client/src/address/gpsFallback.js#L1) (llama).
- **Llamadas directas en el cuerpo** [`saveGpsFallbackLocation`](../../../packages/api-client/src/createMobileApi.js#L23).

#### [`getGpsFallback`](../../../packages/api-client/src/createMobileApi.js#L24) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Obtiene o resuelve `Gps Fallback` para entregarlo al consumidor.

- **Usa código de** [`getGpsFallbackLocation`](../../../packages/api-client/src/address/gpsFallback.js#L52) (llama).
- **Llamadas directas en el cuerpo** [`getGpsFallbackLocation`](../../../packages/api-client/src/createMobileApi.js#L24).

#### [`fetchProvincias`](../../../packages/api-client/src/createMobileApi.js#L25) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Obtiene o resuelve `Provincias` para entregarlo al consumidor.

- **Usa código de** [`fetchProvincias`](../../../packages/api-client/src/address/territory.js#L23) (llama).
- **Llamadas directas en el cuerpo** [`fetchProvincias`](../../../packages/api-client/src/createMobileApi.js#L25).

#### [`fetchCantones`](../../../packages/api-client/src/createMobileApi.js#L26) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Obtiene o resuelve `Cantones` para entregarlo al consumidor.

- **Entradas** `provinciaId`.
- **Usa código de** [`fetchCantonesByProvincia`](../../../packages/api-client/src/address/territory.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`fetchCantonesByProvincia`](../../../packages/api-client/src/createMobileApi.js#L26).

#### [`fetchParroquias`](../../../packages/api-client/src/createMobileApi.js#L27) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Obtiene o resuelve `Parroquias` para entregarlo al consumidor.

- **Entradas** `cantonId`.
- **Usa código de** [`fetchParroquiasByCanton`](../../../packages/api-client/src/address/territory.js#L72) (llama).
- **Llamadas directas en el cuerpo** [`fetchParroquiasByCanton`](../../../packages/api-client/src/createMobileApi.js#L27).

#### [`createThread`](../../../packages/api-client/src/createMobileApi.js#L30) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Construye el valor de hilo a partir de los datos del flujo.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.createSupportThread`](../../../packages/api-client/src/createMobileApi.js#L30).

#### [`assignThread`](../../../packages/api-client/src/createMobileApi.js#L31) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `assign Thread`.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.assignSupportThread`](../../../packages/api-client/src/createMobileApi.js#L31).

#### [`updateStatus`](../../../packages/api-client/src/createMobileApi.js#L32) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Aplica o guarda el valor de estado para que el estado refleje la operación.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.updateSupportStatus`](../../../packages/api-client/src/createMobileApi.js#L32).

#### [`addNote`](../../../packages/api-client/src/createMobileApi.js#L33) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `add Note`.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.addSupportNote`](../../../packages/api-client/src/createMobileApi.js#L33).

#### [`closeThread`](../../../packages/api-client/src/createMobileApi.js#L34) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Finaliza el valor de hilo y ajusta el estado que depende de esa operación.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.closeSupportThread`](../../../packages/api-client/src/createMobileApi.js#L34).

#### [`createIrregular`](../../../packages/api-client/src/createMobileApi.js#L35) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Construye `Irregular` a partir de los datos del flujo.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.createIrregularThread`](../../../packages/api-client/src/createMobileApi.js#L35).

#### [`startSession`](../../../packages/api-client/src/createMobileApi.js#L36) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Inicia el valor de sesión y prepara sus dependencias.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.startSupportSession`](../../../packages/api-client/src/createMobileApi.js#L36).

#### [`endSession`](../../../packages/api-client/src/createMobileApi.js#L37) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Finaliza el valor de sesión y ajusta el estado que depende de esa operación.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.endSupportSession`](../../../packages/api-client/src/createMobileApi.js#L37).

#### [`pingSession`](../../../packages/api-client/src/createMobileApi.js#L38) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `ping Session`.

- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.pingSupportSession`](../../../packages/api-client/src/createMobileApi.js#L38).

#### [`startAdminSession`](../../../packages/api-client/src/createMobileApi.js#L39) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Inicia `Admin Session` y prepara sus dependencias.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.startAdminSupportSession`](../../../packages/api-client/src/createMobileApi.js#L39).

#### [`endAdminSession`](../../../packages/api-client/src/createMobileApi.js#L40) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Finaliza `Admin Session` y ajusta el estado que depende de esa operación.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.endAdminSupportSession`](../../../packages/api-client/src/createMobileApi.js#L40).

#### [`pingAdminSession`](../../../packages/api-client/src/createMobileApi.js#L41) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `ping Admin Session`.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.pingAdminSupportSession`](../../../packages/api-client/src/createMobileApi.js#L41).

#### [`denyAdminSession`](../../../packages/api-client/src/createMobileApi.js#L42) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `deny Admin Session`.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.denyAdminSupportSession`](../../../packages/api-client/src/createMobileApi.js#L42).

#### [`createAdminUser`](../../../packages/api-client/src/createMobileApi.js#L43) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Construye `Admin User` a partir de los datos del flujo.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.createSupportAdminUser`](../../../packages/api-client/src/createMobileApi.js#L43).

#### [`cancelThread`](../../../packages/api-client/src/createMobileApi.js#L44) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Comprueba `cel Thread` para decidir si se admite o continúa la operación.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.cancelSupportThread`](../../../packages/api-client/src/createMobileApi.js#L44).

#### [`requestRetake`](../../../packages/api-client/src/createMobileApi.js#L45) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `request Retake`.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.requestSupportThreadRetake`](../../../packages/api-client/src/createMobileApi.js#L45).

#### [`markOpeningMessageSent`](../../../packages/api-client/src/createMobileApi.js#L46) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Coordina cambios de estado durante `mark Opening Message Sent`.

- **Entradas** `payload`.
- **Actualizaciones de estado o acciones** `markSupportOpeningMessageSent`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.markSupportOpeningMessageSent`](../../../packages/api-client/src/createMobileApi.js#L47).

#### [`markWhatsAppNameChanged`](../../../packages/api-client/src/createMobileApi.js#L48) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Coordina cambios de estado durante `mark Whats App Name Changed`.

- **Entradas** `payload`.
- **Actualizaciones de estado o acciones** `markSupportWhatsAppNameChanged`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.markSupportWhatsAppNameChanged`](../../../packages/api-client/src/createMobileApi.js#L49).

#### [`workflowAction`](../../../packages/api-client/src/createMobileApi.js#L50) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `workflow Action`.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.sendSupportWorkflowAction`](../../../packages/api-client/src/createMobileApi.js#L50).

#### [`setAutoAssignMode`](../../../packages/api-client/src/createMobileApi.js#L51) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Aplica o guarda `Auto Assign Mode` para que el estado refleje la operación.

- **Entradas** `payload`.
- **Actualizaciones de estado o acciones** `setSupportAutoAssignMode`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.setSupportAutoAssignMode`](../../../packages/api-client/src/createMobileApi.js#L51).

#### [`trackMacroEvents`](../../../packages/api-client/src/createMobileApi.js#L52) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Emite o envía `Macro Events` en el flujo del archivo.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.trackSupportMacroEvents`](../../../packages/api-client/src/createMobileApi.js#L52).

#### [`createThread`](../../../packages/api-client/src/createMobileApi.js#L54) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Construye el valor de hilo a partir de los datos del flujo.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.createAnonymousSupportThread`](../../../packages/api-client/src/createMobileApi.js#L54).

#### [`getThreadStatus`](../../../packages/api-client/src/createMobileApi.js#L55) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Obtiene o resuelve `Thread Status` para entregarlo al consumidor.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.getAnonymousSupportThreadStatus`](../../../packages/api-client/src/createMobileApi.js#L55).

#### [`linkToUser`](../../../packages/api-client/src/createMobileApi.js#L56) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Función auxiliar de `createMobileApi` para `link To User`.

- **Entradas** `payload`.
- **Usa código de** [`Módulo`](../../../packages/api-client/src/support/supportClient.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`support.linkAnonymousThreadToUser`](../../../packages/api-client/src/createMobileApi.js#L56).

#### [`logEvent`](../../../packages/api-client/src/createMobileApi.js#L60) · función · dentro de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14)

Emite o envía el valor de evento en el flujo del archivo.

- **Entradas** `payload`.
- **Usa código de** [`logEvent`](../../../packages/api-client/src/logs/logEvent.js#L3) (llama).
- **Llamadas directas en el cuerpo** [`logEvent`](../../../packages/api-client/src/createMobileApi.js#L60).

### [`packages/api-client/src/index.js`](../../../packages/api-client/src/index.js#L1)

Agrega exports y nombres históricos createApiClient y createSupabaseClient. Importar esta entrada carga las dependencias de la rama móvil.

**Reexporta.** `*` de [`createSupabaseMobileClient.js`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js), `*` de [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js), `*` de [`index.js`](../../../packages/api-client/src/prelaunch/index.js), `createSupabaseClient` de [`createSupabaseMobileClient`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js), `createApiClient` de [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js).

**Módulos que lo cargan.** [`mobileApi.ts`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L1) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/api-client/src/logs/logEvent.js`](../../../packages/api-client/src/logs/logEvent.js#L1)

Archivo presente en este checkout e ignorado por Git. El API móvil versionado lo importa para el logging. Un clon limpio no lo incluye.

**Superficie que exporta.** [`logEvent`](../../../packages/api-client/src/logs/logEvent.js#L3).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L12) (importa).

**Dependencias del archivo.** [`../clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js).

#### [`logEvent`](../../../packages/api-client/src/logs/logEvent.js#L3) · función · asíncrona · exportado

Consulta o invoca Edge o adaptador [`log-event`](../../../apps/referidos-app/supabase/functions/log-event/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `supabase`, `payload`.
- **Contrato de datos** Edge o adaptador [`log-event`](../../../apps/referidos-app/supabase/functions/log-event/index.ts) en [`logEvent.js:4`](../../../packages/api-client/src/logs/logEvent.js#L4).
- **Usa código de** [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`invokeWithSession`](../../../packages/api-client/src/logs/logEvent.js#L4).
- **Lo usa** [`logEvent`](../../../packages/api-client/src/createMobileApi.js#L60) (llama).

### [`packages/api-client/src/prelaunch/anonIdentity.js`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L1)

Crea o recupera identificadores de navegador/visita y extrae UTM. El cliente lo usa para contexto de captación, no como autenticación de usuario.

**Superficie que exporta.** [`getOrCreateAnonId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L38), [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L51), [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L72), [`extractUtmFromSearch`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L88).

**Módulos que lo cargan.** [`createPrelaunchClient.js`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L1) (importa), [`index.js`](../../../packages/api-client/src/prelaunch/index.js#L1) (reexporta).

#### [`DEFAULT_PREFIX`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L1) · variable de módulo

Declara `DEFAULT_PREFIX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getOrCreateAnonId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L40) (referencia), [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L53) (referencia), [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L75) (referencia).

#### [`DEFAULT_SESSION_TIMEOUT_MS`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L2) · variable de módulo

Declara `DEFAULT_SESSION_TIMEOUT_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L54) (referencia), [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L76) (referencia).

#### [`safeStorage`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L4) · función

Implementa `safe Storage` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `storageCandidate`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de storageCandidate`, `function`.
- **Lo usa** [`getOrCreateAnonId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L39) (llama), [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L52) (llama), [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L73) (llama).

#### [`createUuid`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L15) · función

Construye `Uuid` a partir de los datos del flujo.

- **Efectos y APIs** `globalThis.crypto.randomUUID`.
- **Condiciones que evalúa** `globalThis.crypto.randomUUID`.
- **Llamadas directas en el cuerpo** [`globalThis.crypto.randomUUID`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L17), [`slice`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L19), [`toString`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L19).
- **Lo usa** [`getOrCreateAnonId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L42) (llama), [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L56) (llama).

#### [`parseSessionPayload`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L22) · función

Extrae o interpreta `Session Payload` de los argumentos, estado o datos de entrada.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `null`, `id`, `last_seen_at`.
- **Condiciones que evalúa** `ausencia de raw`, `ausencia de parsed o object`, `string o ausencia de parsed.id`.
- **Lo usa** [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L59) (llama).

#### [`getOrCreateAnonId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L38) · función · exportado

Obtiene o resuelve `Or Create Anon Id` para entregarlo al consumidor.

- **Entradas** `{localStorageRef, keyPrefix} = valor por defecto`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Condiciones que evalúa** `ausencia de localStorageRef`, `existing`.
- **Llamadas directas en el cuerpo** [`safeStorage`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L39), [`createUuid`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L42), [`localStorageRef.getItem`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L44), [`localStorageRef.setItem`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L47).
- **Lo usa** [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L79) (llama).

#### [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L51) · función · exportado

Obtiene o resuelve `Or Create Visit Session Id` para entregarlo al consumidor.

- **Entradas** `{sessionStorageRef, keyPrefix, sessionTimeoutMs} = valor por defecto`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Condiciones que evalúa** `ausencia de sessionStorageRef`, `existing y sessionTimeoutMs`.
- **Llamadas directas en el cuerpo** [`safeStorage`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L52), [`createUuid`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L56), [`parseSessionPayload`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L59), [`sessionStorageRef.getItem`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L59), [`sessionStorageRef.setItem`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L61).
- **Lo usa** [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L80) (llama).

#### [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L72) · función · exportado

Construye `Anonymous Identity` a partir de los datos del flujo.

- **Entradas** `{localStorageRef, sessionStorageRef, keyPrefix, sessionTimeoutMs} = valor por defecto`.
- **Retorno visible o tipo declarado** `anon_id`, `visit_session_id`.
- **Llamadas directas en el cuerpo** [`safeStorage`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L73), [`getOrCreateAnonId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L79), [`getOrCreateVisitSessionId`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L80).
- **Lo usa** [`getIdentity`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L55) (llama).

#### [`extractUtmFromSearch`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L88) · función · exportado

Extrae o interpreta `Utm From Search` de los argumentos, estado o datos de entrada.

- **Entradas** `search = valor por defecto`.
- **Retorno visible o tipo declarado** `source`, `medium`, `campaign`, `term`, `content`.
- **Llamadas directas en el cuerpo** [`params.get`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L91).
- **Lo usa** [`getDefaultUtm`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L38) (llama), [`resolveUtmPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L33) (llama).

### [`packages/api-client/src/prelaunch/createPrelaunchClient.js`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L1)

Ensambla cliente fetch público para waitlist, analytics, soporte y feedback. Incluye clave publicable y adjunta contexto de app/tenant e identidad anónima.

**Superficie que exporta.** [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42).

**Módulos que lo cargan.** [`index.js`](../../../packages/api-client/src/prelaunch/index.js#L2) (reexporta).

**Dependencias del archivo.** [`./anonIdentity.js`](../../../packages/api-client/src/prelaunch/anonIdentity.js), [`../../../feedback-sdk/src/publicClient.js`](../../../packages/feedback-sdk/src/publicClient.js), [`../../../feedback-sdk/src/shared.js`](../../../packages/feedback-sdk/src/shared.js).

#### [`DEFAULT_TENANT_HINT`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L5) · variable de módulo

Declara `DEFAULT_TENANT_HINT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L45) (referencia).

#### [`DEFAULT_APP_CHANNEL`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L6) · variable de módulo

Declara `DEFAULT_APP_CHANNEL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L46) (referencia).

#### [`normalizeRoleIntent`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L8) · función

Normaliza `Role Intent` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L9), [`trim`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L9).
- **Lo usa** [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L135) (llama).

#### [`resolveUtmPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L14) · función

Obtiene o resuelve `Utm Payload` para entregarlo al consumidor.

- **Entradas** `utm`.
- **Retorno visible o tipo declarado** `source`, `medium`, `campaign`, `term`, `content`.
- **Condiciones que evalúa** `utm y object y ausencia de Array.isArray`, `undefined`.
- **Usa código de** [`extractUtmFromSearch`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L88) (llama).
- **Llamadas directas en el cuerpo** [`extractUtmFromSearch`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L33).
- **Lo usa** [`ingest`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L117) (llama), [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L140) (llama), [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L181) (llama).

#### [`normalizePath`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L36) · función

Normaliza `Path` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `path`.
- **Condiciones que evalúa** `string y path.trim`, `undefined`.
- **Llamadas directas en el cuerpo** [`path.trim`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L37), [`slice`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L37).
- **Lo usa** [`ingest`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L115) (llama), [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L177) (llama).

#### [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42) · función · exportado

Construye `Prelaunch Client` a partir de los datos del flujo.

- **Entradas** `{supabaseUrl, publishableKey, tenantHint, appChannel, identityKeyPrefix, sessionTimeoutMs} = valor por defecto`.
- **Retorno visible o tipo declarado** `identity`, `analytics`, `waitlist`, `support`, `feedback`.
- **Condiciones que evalúa** `ausencia de supabaseUrl o ausencia de publishableKey`.
- **Lo usa** [`prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L15) (llama).

#### [`getIdentity`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L54) · función · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Obtiene o resuelve `Identity` para entregarlo al consumidor.

- **Usa código de** [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L72) (llama).
- **Llamadas directas en el cuerpo** [`buildAnonymousIdentity`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L55).
- **Lo usa** [`withSharedPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L94) (llama), [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L102) (referencia).

#### [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L61) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Función auxiliar de `createPrelaunchClient` para `invoke Public`.

- **Entradas** `fnName`, `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Efectos y APIs** `solicitud HTTP por fetch`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`fetch`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L63), [`catch`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L72), [`response.json`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L72).
- **Lo usa** [`ingest`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L111) (llama), [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L131) (llama), [`listAnonymousCategories`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L146) (llama), [`createAnonymousThread`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L148) (llama), [`cancelAnonymousThread`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L150) (llama), [`requestThreadRetake`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L152) (llama), [`getAnonymousThreadStatus`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L154) (llama), [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L170) (referencia).

#### [`withSharedPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L91) · función · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Función auxiliar de `createPrelaunchClient` para `with Shared Payload`.

- **Entradas** `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `tenant_hint`, `app_channel`.
- **Llamadas directas en el cuerpo** [`getIdentity`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L94).
- **Lo usa** [`ingest`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L113) (llama), [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L133) (llama), [`listAnonymousCategories`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L146) (llama), [`createAnonymousThread`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L148) (llama), [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L171) (llama).

#### [`ingest`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L105) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Consulta o invoca Edge o adaptador [`prelaunch-ingest`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{event_type, path, props, utm} = valor por defecto`.
- **Contrato de datos** Edge o adaptador [`prelaunch-ingest`](../../../apps/referidos-app/supabase/functions/prelaunch-ingest/index.ts) en [`createPrelaunchClient.js:111`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L111).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L111), [`withSharedPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L113), [`normalizePath`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L115), [`resolveUtmPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L117).

#### [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L122) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Consulta o invoca Edge o adaptador [`waitlist-signup`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{email, role_intent, source, consent_version, honeypot, referral_code, utm} = valor por defecto`.
- **Contrato de datos** Edge o adaptador [`waitlist-signup`](../../../apps/referidos-app/supabase/functions/waitlist-signup/index.ts) en [`createPrelaunchClient.js:131`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L131).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L131), [`withSharedPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L133), [`normalizeRoleIntent`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L135), [`resolveUtmPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L140).

#### [`listAnonymousCategories`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L145) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Consulta o invoca Edge o adaptador [`support-anon-categories`](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Contrato de datos** Edge o adaptador [`support-anon-categories`](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts) en [`createPrelaunchClient.js:146`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L146).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L146), [`withSharedPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L146).

#### [`createAnonymousThread`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L147) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Consulta o invoca Edge o adaptador [`support-create-anon-thread`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Contrato de datos** Edge o adaptador [`support-create-anon-thread`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts) en [`createPrelaunchClient.js:148`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L148).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L148), [`withSharedPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L148).

#### [`cancelAnonymousThread`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L149) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Consulta o invoca Edge o adaptador [`support-anon-cancel-thread`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Contrato de datos** Edge o adaptador [`support-anon-cancel-thread`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts) en [`createPrelaunchClient.js:150`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L150).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L150).

#### [`requestThreadRetake`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L151) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Consulta o invoca Edge o adaptador [`support-retake-thread`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Contrato de datos** Edge o adaptador [`support-retake-thread`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts) en [`createPrelaunchClient.js:152`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L152).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L152).

#### [`getAnonymousThreadStatus`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L153) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Consulta o invoca Edge o adaptador [`support-anon-thread-status`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Contrato de datos** Edge o adaptador [`support-anon-thread-status`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts) en [`createPrelaunchClient.js:154`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L154).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L154).

#### [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L157) · función · asíncrona · dentro de [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42)

Función auxiliar de `createPrelaunchClient` para `submit`.

- **Entradas** `{name, email, message, origin_role, origin_source, source_route, source_surface, honeypot, context, utm} = valor por defecto`.
- **Usa código de** [`invokePublicFeedbackSubmit`](../../../packages/feedback-sdk/src/publicClient.js#L13) (llama), [`normalizeFeedbackOriginRole`](../../../packages/feedback-sdk/src/shared.js#L7) (llama).
- **Llamadas directas en el cuerpo** [`invokePublicFeedbackSubmit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L169), [`withSharedPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L171), [`normalizeFeedbackOriginRole`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L175), [`normalizePath`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L177), [`resolveUtmPayload`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L181).

### [`packages/api-client/src/prelaunch/index.js`](../../../packages/api-client/src/prelaunch/index.js#L1)

Exporta el cliente público y helpers de identidad para que Prelaunch use una entrada distinta de Android.

**Reexporta.** `*` de [`anonIdentity.js`](../../../packages/api-client/src/prelaunch/anonIdentity.js), `*` de [`createPrelaunchClient.js`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js).

**Módulos que lo cargan.** [`prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L1) (importa), [`index.js`](../../../packages/api-client/src/index.js#L3) (reexporta).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/api-client/src/support/supportClient.js`](../../../packages/api-client/src/support/supportClient.js#L1)

Reúne invocaciones móviles de tickets, cambios de estado, asignación, jornadas y operaciones de soporte sobre un cliente inyectado.

**Superficie que exporta.** [`createSupportThread`](../../../packages/api-client/src/support/supportClient.js#L17), [`assignSupportThread`](../../../packages/api-client/src/support/supportClient.js#L21), [`updateSupportStatus`](../../../packages/api-client/src/support/supportClient.js#L25), [`addSupportNote`](../../../packages/api-client/src/support/supportClient.js#L29), [`closeSupportThread`](../../../packages/api-client/src/support/supportClient.js#L33), [`createIrregularThread`](../../../packages/api-client/src/support/supportClient.js#L37), [`startSupportSession`](../../../packages/api-client/src/support/supportClient.js#L41), [`endSupportSession`](../../../packages/api-client/src/support/supportClient.js#L45), [`pingSupportSession`](../../../packages/api-client/src/support/supportClient.js#L49), [`startAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L53), [`endAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L57), [`pingAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L61), [`denyAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L65), [`createSupportAdminUser`](../../../packages/api-client/src/support/supportClient.js#L69), [`cancelSupportThread`](../../../packages/api-client/src/support/supportClient.js#L73), [`createAnonymousSupportThread`](../../../packages/api-client/src/support/supportClient.js#L77), [`getAnonymousSupportThreadStatus`](../../../packages/api-client/src/support/supportClient.js#L81), [`requestSupportThreadRetake`](../../../packages/api-client/src/support/supportClient.js#L85), [`markSupportOpeningMessageSent`](../../../packages/api-client/src/support/supportClient.js#L89), [`markSupportWhatsAppNameChanged`](../../../packages/api-client/src/support/supportClient.js#L93), [`sendSupportWorkflowAction`](../../../packages/api-client/src/support/supportClient.js#L97), [`setSupportAutoAssignMode`](../../../packages/api-client/src/support/supportClient.js#L101), [`linkAnonymousThreadToUser`](../../../packages/api-client/src/support/supportClient.js#L105), [`trackSupportMacroEvents`](../../../packages/api-client/src/support/supportClient.js#L109).

**Módulos que lo cargan.** [`createMobileApi.js`](../../../packages/api-client/src/createMobileApi.js#L11) (importa).

**Dependencias del archivo.** [`../clients/sessionHelpers.js`](../../../packages/api-client/src/clients/sessionHelpers.js).

#### [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L3) · función · asíncrona

Implementa `invoke Support` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `fnName`, `payload = valor por defecto`.
- **Usa código de** [`invokeWithSession`](../../../packages/api-client/src/clients/sessionHelpers.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`invokeWithSession`](../../../packages/api-client/src/support/supportClient.js#L4).
- **Lo usa** [`createSupportThread`](../../../packages/api-client/src/support/supportClient.js#L18) (llama), [`assignSupportThread`](../../../packages/api-client/src/support/supportClient.js#L22) (llama), [`updateSupportStatus`](../../../packages/api-client/src/support/supportClient.js#L26) (llama), [`addSupportNote`](../../../packages/api-client/src/support/supportClient.js#L30) (llama), [`closeSupportThread`](../../../packages/api-client/src/support/supportClient.js#L34) (llama), [`createIrregularThread`](../../../packages/api-client/src/support/supportClient.js#L38) (llama), [`startSupportSession`](../../../packages/api-client/src/support/supportClient.js#L42) (llama), [`endSupportSession`](../../../packages/api-client/src/support/supportClient.js#L46) (llama), [`pingSupportSession`](../../../packages/api-client/src/support/supportClient.js#L50) (llama), [`startAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L54) (llama), [`endAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L58) (llama), [`pingAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L62) (llama) y 8 más.

#### [`invokeSupportPublic`](../../../packages/api-client/src/support/supportClient.js#L7) · función · asíncrona

Implementa `invoke Support Public` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `fnName`, `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/api-client/src/support/supportClient.js#L8).
- **Lo usa** [`createAnonymousSupportThread`](../../../packages/api-client/src/support/supportClient.js#L78) (llama), [`getAnonymousSupportThreadStatus`](../../../packages/api-client/src/support/supportClient.js#L82) (llama), [`requestSupportThreadRetake`](../../../packages/api-client/src/support/supportClient.js#L86) (llama).

#### [`createSupportThread`](../../../packages/api-client/src/support/supportClient.js#L17) · función · asíncrona · exportado

Construye `Support Thread` a partir de los datos del flujo.

- **Entradas** `supabase`, `payload`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L18).

#### [`assignSupportThread`](../../../packages/api-client/src/support/supportClient.js#L21) · función · asíncrona · exportado

Implementa `assign Support Thread` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L22).

#### [`updateSupportStatus`](../../../packages/api-client/src/support/supportClient.js#L25) · función · asíncrona · exportado

Aplica o guarda `Support Status` para que el estado refleje la operación.

- **Entradas** `supabase`, `payload`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L26).

#### [`addSupportNote`](../../../packages/api-client/src/support/supportClient.js#L29) · función · asíncrona · exportado

Implementa `add Support Note` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L30).

#### [`closeSupportThread`](../../../packages/api-client/src/support/supportClient.js#L33) · función · asíncrona · exportado

Finaliza `Support Thread` y ajusta el estado que depende de esa operación.

- **Entradas** `supabase`, `payload`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L34).

#### [`createIrregularThread`](../../../packages/api-client/src/support/supportClient.js#L37) · función · asíncrona · exportado

Construye `Irregular Thread` a partir de los datos del flujo.

- **Entradas** `supabase`, `payload`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L38).

#### [`startSupportSession`](../../../packages/api-client/src/support/supportClient.js#L41) · función · asíncrona · exportado

Inicia `Support Session` y prepara sus dependencias.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L42).

#### [`endSupportSession`](../../../packages/api-client/src/support/supportClient.js#L45) · función · asíncrona · exportado

Finaliza `Support Session` y ajusta el estado que depende de esa operación.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L46).

#### [`pingSupportSession`](../../../packages/api-client/src/support/supportClient.js#L49) · función · asíncrona · exportado

Implementa `ping Support Session` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L50).

#### [`startAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L53) · función · asíncrona · exportado

Inicia `Admin Support Session` y prepara sus dependencias.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L54).

#### [`endAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L57) · función · asíncrona · exportado

Finaliza `Admin Support Session` y ajusta el estado que depende de esa operación.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L58).

#### [`pingAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L61) · función · asíncrona · exportado

Implementa `ping Admin Support Session` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L62).

#### [`denyAdminSupportSession`](../../../packages/api-client/src/support/supportClient.js#L65) · función · asíncrona · exportado

Implementa `deny Admin Support Session` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L66).

#### [`createSupportAdminUser`](../../../packages/api-client/src/support/supportClient.js#L69) · función · asíncrona · exportado

Construye `Support Admin User` a partir de los datos del flujo.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L70).

#### [`cancelSupportThread`](../../../packages/api-client/src/support/supportClient.js#L73) · función · asíncrona · exportado

Comprueba `cel Support Thread` para decidir si se admite o continúa la operación.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L74).

#### [`createAnonymousSupportThread`](../../../packages/api-client/src/support/supportClient.js#L77) · función · asíncrona · exportado

Construye `Anonymous Support Thread` a partir de los datos del flujo.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupportPublic`](../../../packages/api-client/src/support/supportClient.js#L78).

#### [`getAnonymousSupportThreadStatus`](../../../packages/api-client/src/support/supportClient.js#L81) · función · asíncrona · exportado

Obtiene o resuelve `Anonymous Support Thread Status` para entregarlo al consumidor.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupportPublic`](../../../packages/api-client/src/support/supportClient.js#L82).

#### [`requestSupportThreadRetake`](../../../packages/api-client/src/support/supportClient.js#L85) · función · asíncrona · exportado

Implementa `request Support Thread Retake` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupportPublic`](../../../packages/api-client/src/support/supportClient.js#L86).

#### [`markSupportOpeningMessageSent`](../../../packages/api-client/src/support/supportClient.js#L89) · función · asíncrona · exportado

Implementa `mark Support Opening Message Sent` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L90).

#### [`markSupportWhatsAppNameChanged`](../../../packages/api-client/src/support/supportClient.js#L93) · función · asíncrona · exportado

Implementa `mark Support Whats App Name Changed` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L94).

#### [`sendSupportWorkflowAction`](../../../packages/api-client/src/support/supportClient.js#L97) · función · asíncrona · exportado

Emite o envía `Support Workflow Action` en el flujo del archivo.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L98).

#### [`setSupportAutoAssignMode`](../../../packages/api-client/src/support/supportClient.js#L101) · función · asíncrona · exportado

Aplica o guarda `Support Auto Assign Mode` para que el estado refleje la operación.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L102).

#### [`linkAnonymousThreadToUser`](../../../packages/api-client/src/support/supportClient.js#L105) · función · asíncrona · exportado

Implementa `link Anonymous Thread To User` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeSupport`](../../../packages/api-client/src/support/supportClient.js#L106).

#### [`trackSupportMacroEvents`](../../../packages/api-client/src/support/supportClient.js#L109) · función · asíncrona · exportado

Guarda datos en tabla o vista [`support_macro_usage_events`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L4) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `{events} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de Array.isArray o events.length`, `ausencia de payload.length`, `error`.
- **Contrato de datos** tabla o vista [`support_macro_usage_events`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L4) (`insert`) en [`supportClient.js:142`](../../../packages/api-client/src/support/supportClient.js#L142), tabla o bucket [`support_macro_usage_events`](../../../apps/referidos-app/supabase/migrations/20260306_000028_support_macro_usage_analytics.sql#L4) en [`supportClient.js:142`](../../../packages/api-client/src/support/supportClient.js#L142).
- **Llamadas directas en el cuerpo** [`filter`](../../../packages/api-client/src/support/supportClient.js#L117), [`map`](../../../packages/api-client/src/support/supportClient.js#L117), [`events.filter`](../../../packages/api-client/src/support/supportClient.js#L117), [`insert`](../../../packages/api-client/src/support/supportClient.js#L142), [`supabase.from`](../../../packages/api-client/src/support/supportClient.js#L142).
