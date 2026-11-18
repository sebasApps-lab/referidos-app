# Paquetes compartidos · platform-rn

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/platform-rn/src/biometrics/biometricService.js`](../../../packages/platform-rn/src/biometrics/biometricService.js#L1)
- [`packages/platform-rn/src/device/deviceInfo.js`](../../../packages/platform-rn/src/device/deviceInfo.js#L1)
- [`packages/platform-rn/src/index.js`](../../../packages/platform-rn/src/index.js#L1)
- [`packages/platform-rn/src/pin/pinPolicy.js`](../../../packages/platform-rn/src/pin/pinPolicy.js#L1)
- [`packages/platform-rn/src/storage/secureStorageService.js`](../../../packages/platform-rn/src/storage/secureStorageService.js#L1)

## Símbolos y conexiones

### [`packages/platform-rn/src/biometrics/biometricService.js`](../../../packages/platform-rn/src/biometrics/biometricService.js#L1)

Define el contrato de disponibilidad y prompt de biometría. La implementación en este checkout devuelve que no está configurada.

**Superficie que exporta.** [`isBiometricAvailable`](../../../packages/platform-rn/src/biometrics/biometricService.js#L1), [`promptBiometric`](../../../packages/platform-rn/src/biometrics/biometricService.js#L5).

**Módulos que lo cargan.** [`index.js`](../../../packages/platform-rn/src/index.js#L2) (reexporta).

#### [`isBiometricAvailable`](../../../packages/platform-rn/src/biometrics/biometricService.js#L1) · función · asíncrona · exportado

Comprueba `Biometric Available` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `ok`, `available`, `reason`.
- **Lo usa** [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L188) (llama), [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L226) (llama).

#### [`promptBiometric`](../../../packages/platform-rn/src/biometrics/biometricService.js#L5) · función · asíncrona · exportado

Implementa `prompt Biometric` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Retorno visible o tipo declarado** `ok`, `verified`, `error`.
- **Lo usa** [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L196) (llama), [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L234) (llama).

### [`packages/platform-rn/src/device/deviceInfo.js`](../../../packages/platform-rn/src/device/deviceInfo.js#L1)

Entrega información de dispositivo en forma consumible por capas que dependen de la plataforma.

**Superficie que exporta.** [`getPlatformInfo`](../../../packages/platform-rn/src/device/deviceInfo.js#L1).

**Módulos que lo cargan.** [`index.js`](../../../packages/platform-rn/src/index.js#L3) (reexporta).

#### [`getPlatformInfo`](../../../packages/platform-rn/src/device/deviceInfo.js#L1) · función · exportado

Obtiene o resuelve `Platform Info` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `platform`, `runtime`.

### [`packages/platform-rn/src/index.js`](../../../packages/platform-rn/src/index.js#L1)

Exporta almacenamiento, biometría y descripción de dispositivo.

**Reexporta.** `*` de [`secureStorageService.js`](../../../packages/platform-rn/src/storage/secureStorageService.js), `*` de [`biometricService.js`](../../../packages/platform-rn/src/biometrics/biometricService.js), `*` de [`deviceInfo.js`](../../../packages/platform-rn/src/device/deviceInfo.js).

**Módulos que lo cargan.** [`localAccessSecurity.ts`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L6) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/platform-rn/src/pin/pinPolicy.js`](../../../packages/platform-rn/src/pin/pinPolicy.js#L1)

Reglas móviles de formato de PIN conservadas junto a los adaptadores. La implementación de seguridad compartida también vive en security-core.

**Superficie que exporta.** [`PIN_LENGTH`](../../../packages/platform-rn/src/pin/pinPolicy.js#L1), [`PIN_MAX_ATTEMPTS`](../../../packages/platform-rn/src/pin/pinPolicy.js#L2), [`PIN_LOCK_MS`](../../../packages/platform-rn/src/pin/pinPolicy.js#L3), [`isValidPin`](../../../packages/platform-rn/src/pin/pinPolicy.js#L5).

#### [`PIN_LENGTH`](../../../packages/platform-rn/src/pin/pinPolicy.js#L1) · variable de módulo · exportado

Declara `PIN_LENGTH` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PIN_MAX_ATTEMPTS`](../../../packages/platform-rn/src/pin/pinPolicy.js#L2) · variable de módulo · exportado

Declara `PIN_MAX_ATTEMPTS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PIN_LOCK_MS`](../../../packages/platform-rn/src/pin/pinPolicy.js#L3) · variable de módulo · exportado

Declara `PIN_LOCK_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`isValidPin`](../../../packages/platform-rn/src/pin/pinPolicy.js#L5) · función · exportado

Comprueba `Valid Pin` para decidir si se admite o continúa la operación.

- **Entradas** `pin`.
- **Llamadas directas en el cuerpo** [`test`](../../../packages/platform-rn/src/pin/pinPolicy.js#L6).

### [`packages/platform-rn/src/storage/secureStorageService.js`](../../../packages/platform-rn/src/storage/secureStorageService.js#L1)

Implementa archivos lógicos de biometría, PIN y material de dispositivo en AsyncStorage. Incluye contador local y hash de fallback. Su nombre describe un contrato y la implementación debe evaluarse por separado.

**Superficie que exporta.** [`getSecureStorageMode`](../../../packages/platform-rn/src/storage/secureStorageService.js#L23), [`saveBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L27), [`loadBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L32), [`deleteBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L36), [`savePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L40), [`loadPinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L45), [`deletePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L49), [`clearPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L53), [`saveDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L57), [`loadDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L62), [`deleteDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L66), [`getPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L70), [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L77), [`clearUserSecurityMaterial`](../../../packages/platform-rn/src/storage/secureStorageService.js#L93), [`generatePinSalt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L100), [`hashPin`](../../../packages/platform-rn/src/storage/secureStorageService.js#L104).

**Módulos que lo cargan.** [`index.js`](../../../packages/platform-rn/src/index.js#L1) (reexporta).

**Dependencias del archivo.** `@react-native-async-storage/async-storage`.

#### [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L3) · función

Implementa `namespace` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `userId`, `key`.
- **Lo usa** [`saveBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L28) (llama), [`loadBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L33) (llama), [`deleteBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L37) (llama), [`savePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L41) (llama), [`loadPinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L46) (llama), [`deletePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L50) (llama), [`clearPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L54) (llama), [`saveDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L58) (llama), [`loadDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L63) (llama), [`deleteDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L67) (llama), [`getPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L71) (llama), [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L80) (llama).

#### [`safeJsonParse`](../../../packages/platform-rn/src/storage/secureStorageService.js#L5) · función

Implementa `safe Json Parse` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de raw`.
- **Lo usa** [`getJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L16) (llama).

#### [`getJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L14) · función · asíncrona

Obtiene o resuelve `Json` para entregarlo al consumidor.

- **Entradas** `key`.
- **Efectos y APIs** `AsyncStorage.getItem`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.getItem`](../../../packages/platform-rn/src/storage/secureStorageService.js#L15), [`safeJsonParse`](../../../packages/platform-rn/src/storage/secureStorageService.js#L16).
- **Lo usa** [`loadBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L33) (llama), [`loadPinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L46) (llama), [`loadDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L63) (llama), [`getPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L71) (llama).

#### [`setJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L19) · función · asíncrona

Aplica o guarda `Json` para que el estado refleje la operación.

- **Entradas** `key`, `value`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `AsyncStorage.setItem`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.setItem`](../../../packages/platform-rn/src/storage/secureStorageService.js#L20).
- **Lo usa** [`saveBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L28) (llama), [`savePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L41) (llama), [`saveDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L58) (llama), [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L80) (llama).

#### [`getSecureStorageMode`](../../../packages/platform-rn/src/storage/secureStorageService.js#L23) · función · asíncrona · exportado

Obtiene o resuelve `Secure Storage Mode` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `mode`, `webauthn`, `prf`.

#### [`saveBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L27) · función · asíncrona · exportado

Aplica o guarda `Biometric Token` para que el estado refleje la operación.

- **Entradas** `userId`, `token`.
- **Retorno visible o tipo declarado** `ok`.
- **Actualizaciones de estado o acciones** `setJson`.
- **Llamadas directas en el cuerpo** [`setJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L28), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L28).
- **Lo usa** [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L201) (llama).

#### [`loadBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L32) · función · asíncrona · exportado

Obtiene o resuelve `Biometric Token` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`getJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L33), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L33).
- **Lo usa** [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L221) (llama).

#### [`deleteBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L36) · función · asíncrona · exportado

Limpia o restablece `Biometric Token` como parte de este flujo.

- **Entradas** `userId`.
- **Efectos y APIs** `AsyncStorage.removeItem`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.removeItem`](../../../packages/platform-rn/src/storage/secureStorageService.js#L37), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L37).
- **Lo usa** [`clearUserSecurityMaterial`](../../../packages/platform-rn/src/storage/secureStorageService.js#L94) (llama), [`disableBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L251) (llama).

#### [`savePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L40) · función · asíncrona · exportado

Aplica o guarda `Pin Hash` para que el estado refleje la operación.

- **Entradas** `userId`, `payload`.
- **Retorno visible o tipo declarado** `ok`.
- **Actualizaciones de estado o acciones** `setJson`.
- **Llamadas directas en el cuerpo** [`setJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L41), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L41).
- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L102) (llama).

#### [`loadPinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L45) · función · asíncrona · exportado

Obtiene o resuelve `Pin Hash` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`getJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L46), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L46).
- **Lo usa** [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L138) (llama).

#### [`deletePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L49) · función · asíncrona · exportado

Limpia o restablece `Pin Hash` como parte de este flujo.

- **Entradas** `userId`.
- **Efectos y APIs** `AsyncStorage.removeItem`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.removeItem`](../../../packages/platform-rn/src/storage/secureStorageService.js#L50), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L50).
- **Lo usa** [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L88) (llama), [`clearUserSecurityMaterial`](../../../packages/platform-rn/src/storage/secureStorageService.js#L95) (llama), [`disablePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L172) (llama).

#### [`clearPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L53) · función · asíncrona · exportado

Limpia o restablece `Pin Attempt State` como parte de este flujo.

- **Entradas** `userId`.
- **Efectos y APIs** `AsyncStorage.removeItem`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.removeItem`](../../../packages/platform-rn/src/storage/secureStorageService.js#L54), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L54).
- **Lo usa** [`clearUserSecurityMaterial`](../../../packages/platform-rn/src/storage/secureStorageService.js#L97) (llama), [`disablePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L173) (llama).

#### [`saveDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L57) · función · asíncrona · exportado

Aplica o guarda `Device Secret` para que el estado refleje la operación.

- **Entradas** `userId`, `payload`.
- **Retorno visible o tipo declarado** `ok`.
- **Actualizaciones de estado o acciones** `setJson`.
- **Llamadas directas en el cuerpo** [`setJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L58), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L58).

#### [`loadDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L62) · función · asíncrona · exportado

Obtiene o resuelve `Device Secret` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`getJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L63), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L63).

#### [`deleteDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L66) · función · asíncrona · exportado

Limpia o restablece `Device Secret` como parte de este flujo.

- **Entradas** `userId`.
- **Efectos y APIs** `AsyncStorage.removeItem`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.removeItem`](../../../packages/platform-rn/src/storage/secureStorageService.js#L67), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L67).
- **Lo usa** [`clearUserSecurityMaterial`](../../../packages/platform-rn/src/storage/secureStorageService.js#L96) (llama).

#### [`getPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L70) · función · asíncrona · exportado

Obtiene o resuelve `Pin Attempt State` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`getJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L71), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L71).
- **Lo usa** [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L78) (llama), [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L91) (llama), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L129) (llama).

#### [`recordPinAttempt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L77) · función · asíncrona · exportado

Aplica o guarda `Pin Attempt` para que el estado refleje la operación.

- **Entradas** `userId`, `ok`, `maxAttempts = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `lockedUntil`.
- **Actualizaciones de estado o acciones** `setJson`.
- **Condiciones que evalúa** `ok`, `nextCount`.
- **Llamadas directas en el cuerpo** [`getPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L78), [`setJson`](../../../packages/platform-rn/src/storage/secureStorageService.js#L80), [`namespace`](../../../packages/platform-rn/src/storage/secureStorageService.js#L80), [`deletePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L88).
- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L113) (llama), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L149) (llama).

#### [`clearUserSecurityMaterial`](../../../packages/platform-rn/src/storage/secureStorageService.js#L93) · función · asíncrona · exportado

Limpia o restablece `User Security Material` como parte de este flujo.

- **Entradas** `userId`.
- **Actualizaciones de estado o acciones** `clearPinAttemptState`.
- **Llamadas directas en el cuerpo** [`deleteBiometricToken`](../../../packages/platform-rn/src/storage/secureStorageService.js#L94), [`deletePinHash`](../../../packages/platform-rn/src/storage/secureStorageService.js#L95), [`deleteDeviceSecret`](../../../packages/platform-rn/src/storage/secureStorageService.js#L96), [`clearPinAttemptState`](../../../packages/platform-rn/src/storage/secureStorageService.js#L97).

#### [`generatePinSalt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L100) · función · exportado

Implementa `generate Pin Salt` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Llamadas directas en el cuerpo** [`slice`](../../../packages/platform-rn/src/storage/secureStorageService.js#L101), [`toString`](../../../packages/platform-rn/src/storage/secureStorageService.js#L101).
- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L100) (llama).

#### [`hashPin`](../../../packages/platform-rn/src/storage/secureStorageService.js#L104) · función · asíncrona · exportado

Comprueba `h Pin` para decidir si se admite o continúa la operación.

- **Entradas** `pin`, `salt`, `iterations = valor por defecto`.
- **Llamadas directas en el cuerpo** [`input.charCodeAt`](../../../packages/platform-rn/src/storage/secureStorageService.js#L110), [`toString`](../../../packages/platform-rn/src/storage/secureStorageService.js#L118).
- **Lo usa** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L101) (llama), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L143) (llama).
