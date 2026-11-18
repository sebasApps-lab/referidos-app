# Paquetes compartidos · platform-web

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/platform-web/src/biometrics/biometricService.js`](../../../packages/platform-web/src/biometrics/biometricService.js#L1)
- [`packages/platform-web/src/device/deviceInfo.js`](../../../packages/platform-web/src/device/deviceInfo.js#L1)
- [`packages/platform-web/src/index.js`](../../../packages/platform-web/src/index.js#L1)
- [`packages/platform-web/src/storage/secureStorageService.js`](../../../packages/platform-web/src/storage/secureStorageService.js#L1)

## Símbolos y conexiones

### [`packages/platform-web/src/biometrics/biometricService.js`](../../../packages/platform-web/src/biometrics/biometricService.js#L1)

Modela disponibilidad y comportamiento biométrico para navegador en este paquete. Verifica el consumidor porque la PWA tiene código propio.

**Superficie que exporta.** [`isBiometricAvailable`](../../../packages/platform-web/src/biometrics/biometricService.js#L1), [`promptBiometric`](../../../packages/platform-web/src/biometrics/biometricService.js#L5).

**Módulos que lo cargan.** [`index.js`](../../../packages/platform-web/src/index.js#L2) (reexporta).

#### [`isBiometricAvailable`](../../../packages/platform-web/src/biometrics/biometricService.js#L1) · función · asíncrona · exportado

Comprueba `Biometric Available` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `ok`, `available`, `reason`.

#### [`promptBiometric`](../../../packages/platform-web/src/biometrics/biometricService.js#L5) · función · asíncrona · exportado

Implementa `prompt Biometric` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Retorno visible o tipo declarado** `ok`, `verified`, `error`.

### [`packages/platform-web/src/device/deviceInfo.js`](../../../packages/platform-web/src/device/deviceInfo.js#L1)

Obtiene o construye identificadores y detalles web usados por lógica de plataforma.

**Superficie que exporta.** [`getPlatformInfo`](../../../packages/platform-web/src/device/deviceInfo.js#L1).

**Módulos que lo cargan.** [`index.js`](../../../packages/platform-web/src/index.js#L3) (reexporta).

#### [`getPlatformInfo`](../../../packages/platform-web/src/device/deviceInfo.js#L1) · función · exportado

Obtiene o resuelve `Platform Info` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `platform`, `runtime`, `userAgent`.

### [`packages/platform-web/src/index.js`](../../../packages/platform-web/src/index.js#L1)

Agrupa exports del adaptador de navegador.

**Reexporta.** `*` de [`secureStorageService.js`](../../../packages/platform-web/src/storage/secureStorageService.js), `*` de [`biometricService.js`](../../../packages/platform-web/src/biometrics/biometricService.js), `*` de [`deviceInfo.js`](../../../packages/platform-web/src/device/deviceInfo.js).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/platform-web/src/storage/secureStorageService.js`](../../../packages/platform-web/src/storage/secureStorageService.js#L1)

Adaptador de almacenamiento web que usa localStorage. Coexiste con IndexedDB y Web Crypto del servicio interno de referidos-app.

**Superficie que exporta.** [`saveBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L35), [`loadBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L40), [`deleteBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L44), [`savePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L48), [`loadPinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L53), [`deletePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L57), [`clearUserSecurityMaterial`](../../../packages/platform-web/src/storage/secureStorageService.js#L61).

**Módulos que lo cargan.** [`index.js`](../../../packages/platform-web/src/index.js#L1) (reexporta).

#### [`namespace`](../../../packages/platform-web/src/storage/secureStorageService.js#L1) · función

Implementa `namespace` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `userId`, `key`.
- **Lo usa** [`saveBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L36) (llama), [`loadBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L41) (llama), [`deleteBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L45) (llama), [`savePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L49) (llama), [`loadPinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L54) (llama), [`deletePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L58) (llama).

#### [`safeJsonParse`](../../../packages/platform-web/src/storage/secureStorageService.js#L3) · función

Implementa `safe Json Parse` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de raw`.
- **Lo usa** [`getJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L28) (llama).

#### [`getItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L12) · función

Obtiene o resuelve `Item` para entregarlo al consumidor.

- **Entradas** `key`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `localStorage.getItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.getItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L14).
- **Lo usa** [`getJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L28) (llama).

#### [`setItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L17) · función

Aplica o guarda `Item` para que el estado refleje la operación.

- **Entradas** `key`, `value`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `localStorage.setItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.setItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L19).
- **Lo usa** [`setJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L32) (llama).

#### [`removeItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L22) · función

Limpia o restablece `Item` como parte de este flujo.

- **Entradas** `key`.
- **Efectos y APIs** `localStorage.removeItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.removeItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L24).
- **Lo usa** [`deleteBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L45) (llama), [`deletePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L58) (llama).

#### [`getJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L27) · función · asíncrona

Obtiene o resuelve `Json` para entregarlo al consumidor.

- **Entradas** `key`.
- **Llamadas directas en el cuerpo** [`safeJsonParse`](../../../packages/platform-web/src/storage/secureStorageService.js#L28), [`getItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L28).
- **Lo usa** [`loadBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L41) (llama), [`loadPinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L54) (llama).

#### [`setJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L31) · función · asíncrona

Aplica o guarda `Json` para que el estado refleje la operación.

- **Entradas** `key`, `value`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Llamadas directas en el cuerpo** [`setItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L32).
- **Lo usa** [`saveBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L36) (llama), [`savePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L49) (llama).

#### [`saveBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L35) · función · asíncrona · exportado

Aplica o guarda `Biometric Token` para que el estado refleje la operación.

- **Entradas** `userId`, `token`.
- **Retorno visible o tipo declarado** `ok`.
- **Actualizaciones de estado o acciones** `setJson`.
- **Llamadas directas en el cuerpo** [`setJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L36), [`namespace`](../../../packages/platform-web/src/storage/secureStorageService.js#L36).

#### [`loadBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L40) · función · asíncrona · exportado

Obtiene o resuelve `Biometric Token` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`getJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L41), [`namespace`](../../../packages/platform-web/src/storage/secureStorageService.js#L41).

#### [`deleteBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L44) · función · asíncrona · exportado

Limpia o restablece `Biometric Token` como parte de este flujo.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`removeItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L45), [`namespace`](../../../packages/platform-web/src/storage/secureStorageService.js#L45).
- **Lo usa** [`clearUserSecurityMaterial`](../../../packages/platform-web/src/storage/secureStorageService.js#L62) (llama).

#### [`savePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L48) · función · asíncrona · exportado

Aplica o guarda `Pin Hash` para que el estado refleje la operación.

- **Entradas** `userId`, `payload`.
- **Retorno visible o tipo declarado** `ok`.
- **Actualizaciones de estado o acciones** `setJson`.
- **Llamadas directas en el cuerpo** [`setJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L49), [`namespace`](../../../packages/platform-web/src/storage/secureStorageService.js#L49).

#### [`loadPinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L53) · función · asíncrona · exportado

Obtiene o resuelve `Pin Hash` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`getJson`](../../../packages/platform-web/src/storage/secureStorageService.js#L54), [`namespace`](../../../packages/platform-web/src/storage/secureStorageService.js#L54).

#### [`deletePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L57) · función · asíncrona · exportado

Limpia o restablece `Pin Hash` como parte de este flujo.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`removeItem`](../../../packages/platform-web/src/storage/secureStorageService.js#L58), [`namespace`](../../../packages/platform-web/src/storage/secureStorageService.js#L58).
- **Lo usa** [`clearUserSecurityMaterial`](../../../packages/platform-web/src/storage/secureStorageService.js#L63) (llama).

#### [`clearUserSecurityMaterial`](../../../packages/platform-web/src/storage/secureStorageService.js#L61) · función · asíncrona · exportado

Limpia o restablece `User Security Material` como parte de este flujo.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`deleteBiometricToken`](../../../packages/platform-web/src/storage/secureStorageService.js#L62), [`deletePinHash`](../../../packages/platform-web/src/storage/secureStorageService.js#L63).
