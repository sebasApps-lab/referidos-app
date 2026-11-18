# Paquetes compartidos · security-core

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/security-core/src/index.js`](../../../packages/security-core/src/index.js#L1)
- [`packages/security-core/src/pin/pinPolicy.js`](../../../packages/security-core/src/pin/pinPolicy.js#L1)
- [`packages/security-core/src/unlock/unlockPolicy.js`](../../../packages/security-core/src/unlock/unlockPolicy.js#L1)

## Símbolos y conexiones

### [`packages/security-core/src/index.js`](../../../packages/security-core/src/index.js#L1)

Exporta las políticas sin acoplarlas a React o React Native.

**Reexporta.** `*` de [`pinPolicy.js`](../../../packages/security-core/src/pin/pinPolicy.js), `*` de [`unlockPolicy.js`](../../../packages/security-core/src/unlock/unlockPolicy.js).

**Módulos que lo cargan.** [`localAccessSecurity.ts`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L1) (importa), [`securityStore.ts`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L2) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/security-core/src/pin/pinPolicy.js`](../../../packages/security-core/src/pin/pinPolicy.js#L1)

Define longitud, límite de intentos, ventana de bloqueo y validación de PIN.

**Superficie que exporta.** [`PIN_LENGTH`](../../../packages/security-core/src/pin/pinPolicy.js#L1), [`PIN_MAX_ATTEMPTS`](../../../packages/security-core/src/pin/pinPolicy.js#L2), [`PIN_LOCK_MS`](../../../packages/security-core/src/pin/pinPolicy.js#L3), [`isValidPin`](../../../packages/security-core/src/pin/pinPolicy.js#L5).

**Módulos que lo cargan.** [`index.js`](../../../packages/security-core/src/index.js#L1) (reexporta).

#### [`PIN_LENGTH`](../../../packages/security-core/src/pin/pinPolicy.js#L1) · variable de módulo · exportado

Declara `PIN_LENGTH` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PIN_MAX_ATTEMPTS`](../../../packages/security-core/src/pin/pinPolicy.js#L2) · variable de módulo · exportado

Declara `PIN_MAX_ATTEMPTS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L113) (referencia), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L149) (referencia).

#### [`PIN_LOCK_MS`](../../../packages/security-core/src/pin/pinPolicy.js#L3) · variable de módulo · exportado

Declara `PIN_LOCK_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`isValidPin`](../../../packages/security-core/src/pin/pinPolicy.js#L5) · función · exportado

Comprueba `Valid Pin` para decidir si se admite o continúa la operación.

- **Entradas** `pin`.
- **Llamadas directas en el cuerpo** [`test`](../../../packages/security-core/src/pin/pinPolicy.js#L6).
- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L87) (llama), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L127) (llama).

### [`packages/security-core/src/unlock/unlockPolicy.js`](../../../packages/security-core/src/unlock/unlockPolicy.js#L1)

Niveles y métodos, selección del nivel requerido por acción y orden de suficiencia entre niveles.

**Superficie que exporta.** [`UNLOCK_LEVELS`](../../../packages/security-core/src/unlock/unlockPolicy.js#L1), [`UNLOCK_METHODS`](../../../packages/security-core/src/unlock/unlockPolicy.js#L7), [`getRequiredLevelForAction`](../../../packages/security-core/src/unlock/unlockPolicy.js#L15), [`isLevelSatisfied`](../../../packages/security-core/src/unlock/unlockPolicy.js#L28).

**Módulos que lo cargan.** [`index.js`](../../../packages/security-core/src/index.js#L2) (reexporta).

#### [`UNLOCK_LEVELS`](../../../packages/security-core/src/unlock/unlockPolicy.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `UNLOCK LEVELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `LOCKED`, `UNLOCK_LOCAL`, `REAUTH_SENSITIVE`.
- **Lo usa** [`getRequiredLevelForAction`](../../../packages/security-core/src/unlock/unlockPolicy.js#L24) (accede al módulo), [`isLevelSatisfied`](../../../packages/security-core/src/unlock/unlockPolicy.js#L30) (accede al módulo), [`normalizeLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L52) (accede al módulo).

#### [`UNLOCK_METHODS`](../../../packages/security-core/src/unlock/unlockPolicy.js#L7) · variable de módulo · exportado

Agrupa la configuración o catálogo de `UNLOCK METHODS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `NONE`, `PIN`, `BIOMETRIC`, `PASSWORD`, `OTP`.

#### [`getRequiredLevelForAction`](../../../packages/security-core/src/unlock/unlockPolicy.js#L15) · función · exportado

Obtiene o resuelve `Required Level For Action` para entregarlo al consumidor.

- **Entradas** `action`.
- **Llamadas directas en el cuerpo** [`sensitive.has`](../../../packages/security-core/src/unlock/unlockPolicy.js#L23).
- **Lo usa** [`requiredLevelForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L287) (llama), [`require`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L76) (llama).

#### [`isLevelSatisfied`](../../../packages/security-core/src/unlock/unlockPolicy.js#L28) · función · exportado

Comprueba `Level Satisfied` para decidir si se admite o continúa la operación.

- **Entradas** `currentLevel`, `requiredLevel`.
- **Lo usa** [`require`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L92) (llama).
