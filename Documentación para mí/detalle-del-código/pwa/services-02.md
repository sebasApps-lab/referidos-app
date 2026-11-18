# PWA principal · Servicios de datos · 2 de 2

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/services/secureStorageService.js`](../../../apps/referidos-app/src/services/secureStorageService.js#L1)
- [`apps/referidos-app/src/services/sessionDevicesService.js`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L1)
- [`apps/referidos-app/src/services/territoryClient.js`](../../../apps/referidos-app/src/services/territoryClient.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/services/secureStorageService.js`](../../../apps/referidos-app/src/services/secureStorageService.js#L1)

Guarda en IndexedDB material cifrado de dispositivo y hashes de PIN con Web Crypto. Administra intentos y limpieza por usuario.

**Superficie que exporta.** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L56), [`generatePinSalt`](../../../apps/referidos-app/src/services/secureStorageService.js#L155), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L158), [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L179), [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L187), [`deleteBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L195), [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L199), [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L207), [`deletePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L215), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219), [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227), [`deleteDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L235), [`getPinAttemptState`](../../../apps/referidos-app/src/services/secureStorageService.js#L239), [`recordPinAttempt`](../../../apps/referidos-app/src/services/secureStorageService.js#L242), [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/services/secureStorageService.js#L258).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L11) (importa), [`ModalAccessMethods.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L7) (importa), [`ModalPinVerify.jsx`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L3) (importa), [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L11) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L103) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L99) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L29) (importa).

#### [`DB_NAME`](../../../apps/referidos-app/src/services/secureStorageService.js#L1) · variable de módulo

Declara `DB_NAME` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`openDb`](../../../apps/referidos-app/src/services/secureStorageService.js#L15) (referencia).

#### [`DB_VERSION`](../../../apps/referidos-app/src/services/secureStorageService.js#L2) · variable de módulo

Declara `DB_VERSION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`openDb`](../../../apps/referidos-app/src/services/secureStorageService.js#L15) (referencia).

#### [`STORE_NAME`](../../../apps/referidos-app/src/services/secureStorageService.js#L3) · variable de módulo

Declara `STORE_NAME` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`request.onupgradeneeded`](../../../apps/referidos-app/src/services/secureStorageService.js#L18) (referencia), [`withStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L29) (referencia).

#### [`encoder`](../../../apps/referidos-app/src/services/secureStorageService.js#L5) · variable de módulo

Declara `encoder` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L122) (accede al módulo), [`encryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L135) (accede al módulo), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L161) (accede al módulo).

#### [`decoder`](../../../apps/referidos-app/src/services/secureStorageService.js#L6) · variable de módulo

Declara `decoder` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L105) (accede al módulo), [`decryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L152) (accede al módulo).

#### [`toBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L8) · función

Implementa `to Base64` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `buffer`.
- **Llamadas directas en el cuerpo** [`btoa`](../../../apps/referidos-app/src/services/secureStorageService.js#L9).
- **Lo usa** [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L128) (llama), [`encryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L141) (llama), [`generatePinSalt`](../../../apps/referidos-app/src/services/secureStorageService.js#L156) (llama), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L176) (llama).

#### [`fromBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L10) · función

Implementa `from Base64` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`Uint8Array.from`](../../../apps/referidos-app/src/services/secureStorageService.js#L11), [`atob`](../../../apps/referidos-app/src/services/secureStorageService.js#L11), [`c.charCodeAt`](../../../apps/referidos-app/src/services/secureStorageService.js#L11).
- **Lo usa** [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L101) (llama), [`decryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L148) (llama), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L169) (llama).

#### [`openDb`](../../../apps/referidos-app/src/services/secureStorageService.js#L13) · función

Inicia `Db` y prepara sus dependencias.

- **Efectos y APIs** `indexedDB.open`.
- **Llamadas directas en el cuerpo** [`indexedDB.open`](../../../apps/referidos-app/src/services/secureStorageService.js#L15).
- **Lo usa** [`withStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L27) (llama).

#### [`request.onupgradeneeded`](../../../apps/referidos-app/src/services/secureStorageService.js#L16) · función asignada · dentro de [`openDb`](../../../apps/referidos-app/src/services/secureStorageService.js#L13)

Maneja `upgradeneeded` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `ausencia de db.objectStoreNames.contains`.
- **Llamadas directas en el cuerpo** [`db.objectStoreNames.contains`](../../../apps/referidos-app/src/services/secureStorageService.js#L18), [`db.createObjectStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L19).

#### [`request.onsuccess`](../../../apps/referidos-app/src/services/secureStorageService.js#L22) · función asignada · dentro de [`openDb`](../../../apps/referidos-app/src/services/secureStorageService.js#L13)

Maneja `success` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`resolve`](../../../apps/referidos-app/src/services/secureStorageService.js#L22).

#### [`request.onerror`](../../../apps/referidos-app/src/services/secureStorageService.js#L23) · función asignada · dentro de [`openDb`](../../../apps/referidos-app/src/services/secureStorageService.js#L13)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`reject`](../../../apps/referidos-app/src/services/secureStorageService.js#L23).

#### [`withStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L26) · función · asíncrona

Implementa `with Store` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `mode`, `handler`.
- **Llamadas directas en el cuerpo** [`openDb`](../../../apps/referidos-app/src/services/secureStorageService.js#L27), [`db.transaction`](../../../apps/referidos-app/src/services/secureStorageService.js#L29), [`tx.objectStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L30), [`handler`](../../../apps/referidos-app/src/services/secureStorageService.js#L31).
- **Lo usa** [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L36) (llama), [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L43) (llama), [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L50) (llama).

#### [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L35) · función

Obtiene o resuelve `Item` para entregarlo al consumidor.

- **Entradas** `key`.
- **Llamadas directas en el cuerpo** [`withStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L36), [`store.get`](../../../apps/referidos-app/src/services/secureStorageService.js#L37).
- **Lo usa** [`getOrCreateWrappingKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L75) (llama), [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L97) (llama), [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L190) (llama), [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L210) (llama), [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L230) (llama), [`getPinAttemptState`](../../../apps/referidos-app/src/services/secureStorageService.js#L240) (llama).

#### [`request.onsuccess`](../../../apps/referidos-app/src/services/secureStorageService.js#L38) · función asignada · dentro de [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L35)

Maneja `success` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`resolve`](../../../apps/referidos-app/src/services/secureStorageService.js#L38).

#### [`request.onerror`](../../../apps/referidos-app/src/services/secureStorageService.js#L39) · función asignada · dentro de [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L35)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`reject`](../../../apps/referidos-app/src/services/secureStorageService.js#L39).

#### [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L42) · función

Aplica o guarda `Item` para que el estado refleje la operación.

- **Entradas** `key`, `value`.
- **Llamadas directas en el cuerpo** [`withStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L43), [`store.put`](../../../apps/referidos-app/src/services/secureStorageService.js#L44).
- **Lo usa** [`getOrCreateWrappingKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L91) (llama), [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L128) (llama), [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L183) (llama), [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L203) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L223) (llama), [`recordPinAttempt`](../../../apps/referidos-app/src/services/secureStorageService.js#L245) (llama).

#### [`request.onsuccess`](../../../apps/referidos-app/src/services/secureStorageService.js#L45) · función asignada · dentro de [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L42)

Maneja `success` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`resolve`](../../../apps/referidos-app/src/services/secureStorageService.js#L45).

#### [`request.onerror`](../../../apps/referidos-app/src/services/secureStorageService.js#L46) · función asignada · dentro de [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L42)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`reject`](../../../apps/referidos-app/src/services/secureStorageService.js#L46).

#### [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L49) · función

Limpia o restablece `Item` como parte de este flujo.

- **Entradas** `key`.
- **Llamadas directas en el cuerpo** [`withStore`](../../../apps/referidos-app/src/services/secureStorageService.js#L50), [`store.delete`](../../../apps/referidos-app/src/services/secureStorageService.js#L51).
- **Lo usa** [`deleteBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L196) (llama), [`deletePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L216) (llama), [`deleteDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L236) (llama), [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/services/secureStorageService.js#L262) (llama).

#### [`request.onsuccess`](../../../apps/referidos-app/src/services/secureStorageService.js#L52) · función asignada · dentro de [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L49)

Maneja `success` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`resolve`](../../../apps/referidos-app/src/services/secureStorageService.js#L52).

#### [`request.onerror`](../../../apps/referidos-app/src/services/secureStorageService.js#L53) · función asignada · dentro de [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L49)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`reject`](../../../apps/referidos-app/src/services/secureStorageService.js#L53).

#### [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L56) · función · asíncrona · exportado

Obtiene o resuelve `Secure Storage Mode` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `mode`, `webauthn`, `prf`.
- **Condiciones que evalúa** `ausencia de window.PublicKeyCredential o ausencia de navigator.credentials`, `ausencia de uvpa`.
- **Llamadas directas en el cuerpo** [`catch`](../../../apps/referidos-app/src/services/secureStorageService.js#L60), [`window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable`](../../../apps/referidos-app/src/services/secureStorageService.js#L60).
- **Lo usa** [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L180) (llama), [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L188) (llama), [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L200) (llama), [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L208) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L220) (llama), [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L228) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L205) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L50) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L206) (llama).

#### [`getOrCreateWrappingKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L74) · función · asíncrona

Obtiene o resuelve `Or Create Wrapping Key` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `window.crypto.subtle.importKey`, `window.crypto.subtle.generateKey`, `window.crypto.subtle.exportKey`.
- **Condiciones que evalúa** `stored.jwk`.
- **Llamadas directas en el cuerpo** [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L75), [`window.crypto.subtle.importKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L77), [`window.crypto.subtle.generateKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L85), [`window.crypto.subtle.exportKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L90), [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L91).
- **Lo usa** [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L99) (llama).

#### [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L95) · función · asíncrona

Obtiene o resuelve `Or Create Device Key` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `window.crypto.subtle.decrypt`, `window.crypto.subtle.importKey`, `window.crypto.subtle.generateKey`, `window.crypto.subtle.exportKey`, `window.crypto.getRandomValues`, `window.crypto.subtle.encrypt`.
- **Condiciones que evalúa** `stored.data y stored.iv`.
- **Llamadas directas en el cuerpo** [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L97), [`getOrCreateWrappingKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L99), [`window.crypto.subtle.decrypt`](../../../apps/referidos-app/src/services/secureStorageService.js#L100), [`fromBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L101), [`decoder.decode`](../../../apps/referidos-app/src/services/secureStorageService.js#L105), [`window.crypto.subtle.importKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L106), [`window.crypto.subtle.generateKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L114), [`window.crypto.subtle.exportKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L119), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/services/secureStorageService.js#L121), [`encoder.encode`](../../../apps/referidos-app/src/services/secureStorageService.js#L122), [`window.crypto.subtle.encrypt`](../../../apps/referidos-app/src/services/secureStorageService.js#L123), [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L128) y 1 más.
- **Lo usa** [`encryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L133) (llama), [`decryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L146) (llama).

#### [`encryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L132) · función · asíncrona

Implementa `encrypt For User` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `userId`, `payload`.
- **Retorno visible o tipo declarado** `iv`, `data`.
- **Efectos y APIs** `window.crypto.getRandomValues`, `window.crypto.subtle.encrypt`.
- **Llamadas directas en el cuerpo** [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L133), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/services/secureStorageService.js#L134), [`encoder.encode`](../../../apps/referidos-app/src/services/secureStorageService.js#L135), [`window.crypto.subtle.encrypt`](../../../apps/referidos-app/src/services/secureStorageService.js#L136), [`toBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L141).
- **Lo usa** [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L182) (llama), [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L202) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L222) (llama).

#### [`decryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L144) · función · asíncrona

Implementa `decrypt For User` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `userId`, `payload`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `window.crypto.subtle.decrypt`.
- **Condiciones que evalúa** `ausencia de payload.iv o ausencia de payload.data`.
- **Llamadas directas en el cuerpo** [`getOrCreateDeviceKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L146), [`window.crypto.subtle.decrypt`](../../../apps/referidos-app/src/services/secureStorageService.js#L147), [`fromBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L148), [`decoder.decode`](../../../apps/referidos-app/src/services/secureStorageService.js#L152).
- **Lo usa** [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L192) (llama), [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L212) (llama), [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L232) (llama).

#### [`generatePinSalt`](../../../apps/referidos-app/src/services/secureStorageService.js#L155) · función · exportado

Implementa `generate Pin Salt` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Llamadas directas en el cuerpo** [`toBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L156), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/services/secureStorageService.js#L156).
- **Lo usa** [`savePin`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L74) (llama), [`savePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L695) (llama), [`savePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L678) (llama).

#### [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L158) · función · asíncrona · exportado

Comprueba `h Pin` para decidir si se admite o continúa la operación.

- **Entradas** `pin`, `salt`, `iterations = valor por defecto`.
- **Efectos y APIs** `window.crypto.subtle.importKey`, `window.crypto.subtle.deriveBits`.
- **Llamadas directas en el cuerpo** [`window.crypto.subtle.importKey`](../../../apps/referidos-app/src/services/secureStorageService.js#L159), [`encoder.encode`](../../../apps/referidos-app/src/services/secureStorageService.js#L161), [`window.crypto.subtle.deriveBits`](../../../apps/referidos-app/src/services/secureStorageService.js#L166), [`fromBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L169), [`toBase64`](../../../apps/referidos-app/src/services/secureStorageService.js#L176).
- **Lo usa** [`savePin`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L75) (llama), [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L44) (llama), [`savePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L696) (llama), [`savePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L679) (llama).

#### [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L179) · función · asíncrona · exportado

Aplica o guarda `Biometric Token` para que el estado refleje la operación.

- **Entradas** `userId`, `token`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Condiciones que evalúa** `mode`.
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L180), [`encryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L182), [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L183).
- **Lo usa** [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L138) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L902) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L885) (llama).

#### [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L187) · función · asíncrona · exportado

Obtiene o resuelve `Biometric Token` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `mode`, `ausencia de encrypted`.
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L188), [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L190), [`decryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L192).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L214) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L215) (llama), [`requestLocalVerification`](../../../apps/referidos-app/src/store/appStore.js#L180) (llama).

#### [`deleteBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L195) · función · asíncrona · exportado

Limpia o restablece `Biometric Token` como parte de este flujo.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L196).
- **Lo usa** [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/services/secureStorageService.js#L259) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L781) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L764) (llama).

#### [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L199) · función · asíncrona · exportado

Aplica o guarda `Pin Hash` para que el estado refleje la operación.

- **Entradas** `userId`, `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Condiciones que evalúa** `mode`.
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L200), [`encryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L202), [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L203).
- **Lo usa** [`savePin`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L76) (llama), [`savePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L697) (llama), [`savePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L680) (llama).

#### [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L207) · función · asíncrona · exportado

Obtiene o resuelve `Pin Hash` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `mode`, `ausencia de encrypted`.
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L208), [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L210), [`decryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L212).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L213) (llama), [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L39) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L214) (llama).

#### [`deletePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L215) · función · asíncrona · exportado

Limpia o restablece `Pin Hash` como parte de este flujo.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L216).
- **Lo usa** [`recordPinAttempt`](../../../apps/referidos-app/src/services/secureStorageService.js#L253) (llama), [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/services/secureStorageService.js#L260) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L816) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L799) (llama).

#### [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219) · función · asíncrona · exportado

Aplica o guarda `Device Secret` para que el estado refleje la operación.

- **Entradas** `userId`, `secret`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Condiciones que evalúa** `mode`.
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L220), [`encryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L222), [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L223).
- **Lo usa** [`savePin`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L72) (llama), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L135) (llama), [`savePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L693) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L899) (llama), [`savePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L676) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L882) (llama).

#### [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227) · función · asíncrona · exportado

Obtiene o resuelve `Device Secret` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `mode`, `ausencia de encrypted`.
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L228), [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L230), [`decryptForUser`](../../../apps/referidos-app/src/services/secureStorageService.js#L232).
- **Lo usa** [`savePin`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L68) (llama), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L131) (llama), [`savePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L689) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L895) (llama), [`savePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L672) (llama), [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L878) (llama).

#### [`deleteDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L235) · función · asíncrona · exportado

Limpia o restablece `Device Secret` como parte de este flujo.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L236).
- **Lo usa** [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/services/secureStorageService.js#L261) (llama).

#### [`getPinAttemptState`](../../../apps/referidos-app/src/services/secureStorageService.js#L239) · función · asíncrona · exportado

Obtiene o resuelve `Pin Attempt State` para entregarlo al consumidor.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`getItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L240).
- **Lo usa** [`recordPinAttempt`](../../../apps/referidos-app/src/services/secureStorageService.js#L243) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L23) (llama).

#### [`recordPinAttempt`](../../../apps/referidos-app/src/services/secureStorageService.js#L242) · función · asíncrona · exportado

Aplica o guarda `Pin Attempt` para que el estado refleje la operación.

- **Entradas** `userId`, `ok`, `maxAttempts = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `lockedUntil`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Condiciones que evalúa** `ok`, `nextCount`.
- **Llamadas directas en el cuerpo** [`getPinAttemptState`](../../../apps/referidos-app/src/services/secureStorageService.js#L243), [`setItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L245), [`deletePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L253).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L47) (llama).

#### [`clearUserSecurityMaterial`](../../../apps/referidos-app/src/services/secureStorageService.js#L258) · función · asíncrona · exportado

Limpia o restablece `User Security Material` como parte de este flujo.

- **Entradas** `userId`.
- **Llamadas directas en el cuerpo** [`deleteBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L259), [`deletePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L260), [`deleteDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L261), [`deleteItem`](../../../apps/referidos-app/src/services/secureStorageService.js#L262).
- **Lo usa** [`logout`](../../../apps/referidos-app/src/store/appStore.js#L473) (llama).

### [`apps/referidos-app/src/services/sessionDevicesService.js`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L1)

Invoca las funciones de registro, listado y revocación de sesiones de dispositivo. Adjunta metadatos del navegador donde corresponde.

**Superficie que exporta.** [`registerCurrentSessionDevice`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L129), [`listCurrentUserSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L138), [`revokeSessionById`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L148), [`revokeAllSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L152).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L98) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L94) (importa), [`errorPolicyService.js`](../../../apps/referidos-app/src/services/errorPolicyService.js#L3) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L20) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`DEVICE_ID_KEY`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L3) · variable de módulo

Declara `DEVICE_ID_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getOrCreateDeviceId`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L7) (referencia).

#### [`getOrCreateDeviceId`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L5) · función

Obtiene o resuelve `Or Create Device Id` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `null`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `window.localStorage.getItem`, `globalThis.crypto.randomUUID`, `window.localStorage.setItem`.
- **Condiciones que evalúa** `undefined`, `existing y existing.length`.
- **Llamadas directas en el cuerpo** [`window.localStorage.getItem`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L7), [`globalThis.crypto.randomUUID`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L9), [`window.localStorage.setItem`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L10).
- **Lo usa** [`registerCurrentSessionDevice`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L130) (llama).

#### [`getPlatform`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L14) · función

Obtiene o resuelve `Platform` para entregarlo al consumidor.

- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.matchMedia`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L16).
- **Lo usa** [`registerCurrentSessionDevice`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L134) (llama).

#### [`invokeSessionFunction`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L20) · función · asíncrona

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Entradas** `name`, `body = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `code`, `status`, `error`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `error`, `ausencia de data o object`, `data.ok`.
- **Contrato de datos** Auth `getSession` en [`sessionDevicesService.js:23`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L23).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L23), [`supabase.functions.invoke`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L33), [`normalizeFunctionError`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L41).
- **Lo usa** [`registerCurrentSessionDevice`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L132) (llama), [`listCurrentUserSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L139) (llama), [`revokeSessionById`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L149) (llama), [`revokeAllSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L153) (llama).

#### [`normalizeFunctionError`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L66) · función · asíncrona

Normaliza `Function Error` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `error`.
- **Retorno visible o tipo declarado** `ok`, `code`, `status`, `details`, `error`.
- **Condiciones que evalúa** `response y object`, `payload y object`, `code o 401 o normalizedMessage.includes`, `ausencia de status`.
- **Llamadas directas en el cuerpo** [`json`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L76), [`response.clone`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L76), [`toLowerCase`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L87), [`normalizedMessage.includes`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L88).
- **Lo usa** [`invokeSessionFunction`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L41) (llama).

#### [`formatLastActive`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L102) · función

Formatea `Last Active` para que el consumidor lo pueda presentar.

- **Entradas** `isoDate`.
- **Condiciones que evalúa** `ausencia de isoDate`, `Number.isNaN`, `deltaMs`, `mins`, `hours`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L105).
- **Lo usa** [`mapSession`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L123) (llama).

#### [`mapSession`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L116) · función

Construye el valor de sesión a partir de los datos del flujo.

- **Entradas** `session`.
- **Retorno visible o tipo declarado** `id`, `sessionId`, `device`, `platform`, `location`, `lastActive`, `current`, `revokedAt`.
- **Llamadas directas en el cuerpo** [`formatLastActive`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L123).
- **Lo usa** [`listCurrentUserSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L144) (referencia).

#### [`registerCurrentSessionDevice`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L129) · función · asíncrona · exportado

Aplica o guarda `Current Session Device` para que el estado refleje la operación.

- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de deviceId`.
- **Llamadas directas en el cuerpo** [`getOrCreateDeviceId`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L130), [`invokeSessionFunction`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L132), [`getPlatform`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L134).
- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L572) (llama).

#### [`listCurrentUserSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L138) · función · asíncrona · exportado

Obtiene o resuelve `Current User Sessions` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `ok`, `currentSessionId`, `sessions`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`invokeSessionFunction`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L139), [`response.sessions.map`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L144).
- **Lo usa** [`loadSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L174) (llama), [`loadOwnerSessions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L172) (llama).

#### [`revokeSessionById`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L148) · función · asíncrona · exportado

Limpia o restablece `Session By Id` como parte de este flujo.

- **Entradas** `sessionId`.
- **Llamadas directas en el cuerpo** [`invokeSessionFunction`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L149).
- **Lo usa** [`handleCloseSession`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L189) (llama), [`handleCloseOwnerSession`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L187) (llama).

#### [`revokeAllSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L152) · función · asíncrona · exportado

Limpia o restablece `All Sessions` como parte de este flujo.

- **Llamadas directas en el cuerpo** [`invokeSessionFunction`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L153).
- **Lo usa** [`handleCloseAllSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L207) (llama), [`handleCloseAllOwners`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L205) (llama), [`maybeSignOut`](../../../apps/referidos-app/src/services/errorPolicyService.js#L53) (llama).

### [`apps/referidos-app/src/services/territoryClient.js`](../../../apps/referidos-app/src/services/territoryClient.js#L1)

Consulta provincias, cantones y parroquias para construir selectores encadenados de territorio.

**Superficie que exporta.** [`fetchProvincias`](../../../apps/referidos-app/src/services/territoryClient.js#L17), [`fetchCantonesByProvincia`](../../../apps/referidos-app/src/services/territoryClient.js#L39), [`fetchParroquiasByCanton`](../../../apps/referidos-app/src/services/territoryClient.js#L67).

**Módulos que lo cargan.** [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L6) (importa).

**Dependencias del archivo.** [`../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../utils/textCase`](../../../apps/referidos-app/src/utils/textCase.js).

#### [`CACHE_TTL_MS`](../../../apps/referidos-app/src/services/territoryClient.js#L5) · variable de módulo

Declara `CACHE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`isFresh`](../../../apps/referidos-app/src/services/territoryClient.js#L14) (referencia).

#### [`cache`](../../../apps/referidos-app/src/services/territoryClient.js#L7) · variable de módulo

Agrupa la configuración o catálogo de `cache` para que sus consumidores lean claves comunes.

- **Campos o contexto** `provincias`, `cantonesByProvincia`, `parroquiasByCanton`.
- **Lo usa** [`fetchProvincias`](../../../apps/referidos-app/src/services/territoryClient.js#L18) (accede al módulo), [`fetchCantonesByProvincia`](../../../apps/referidos-app/src/services/territoryClient.js#L44) (accede al módulo), [`fetchParroquiasByCanton`](../../../apps/referidos-app/src/services/territoryClient.js#L72) (accede al módulo).

#### [`isFresh`](../../../apps/referidos-app/src/services/territoryClient.js#L13) · función

Comprueba `Fresh` para decidir si se admite o continúa la operación.

- **Entradas** `entry`.
- **Lo usa** [`fetchProvincias`](../../../apps/referidos-app/src/services/territoryClient.js#L18) (llama), [`fetchCantonesByProvincia`](../../../apps/referidos-app/src/services/territoryClient.js#L45) (llama), [`fetchParroquiasByCanton`](../../../apps/referidos-app/src/services/territoryClient.js#L73) (llama).

#### [`fetchProvincias`](../../../apps/referidos-app/src/services/territoryClient.js#L17) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`provincias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L4) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `data`, `cached`, `error`.
- **Condiciones que evalúa** `isFresh`, `error`.
- **Contrato de datos** tabla o vista [`provincias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L4) (`select`) en [`territoryClient.js:22`](../../../apps/referidos-app/src/services/territoryClient.js#L22), tabla o bucket [`provincias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L4) en [`territoryClient.js:22`](../../../apps/referidos-app/src/services/territoryClient.js#L22).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) (llama).
- **Llamadas directas en el cuerpo** [`isFresh`](../../../apps/referidos-app/src/services/territoryClient.js#L18), [`order`](../../../apps/referidos-app/src/services/territoryClient.js#L22), [`select`](../../../apps/referidos-app/src/services/territoryClient.js#L22), [`supabase.from`](../../../apps/referidos-app/src/services/territoryClient.js#L22), [`map`](../../../apps/referidos-app/src/services/territoryClient.js#L31), [`toTitleCaseEs`](../../../apps/referidos-app/src/services/territoryClient.js#L33).
- **Lo usa** [`loadProvincias`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L138) (llama).

#### [`fetchCantonesByProvincia`](../../../apps/referidos-app/src/services/territoryClient.js#L39) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`cantones`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L9) y coordina las demás operaciones de esta ficha.

- **Entradas** `provinciaId`.
- **Retorno visible o tipo declarado** `ok`, `data`, `cached`, `error`.
- **Condiciones que evalúa** `ausencia de provinciaId`, `cached y isFresh`, `error`.
- **Contrato de datos** tabla o vista [`cantones`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L9) (`select`) en [`territoryClient.js:49`](../../../apps/referidos-app/src/services/territoryClient.js#L49), tabla o bucket [`cantones`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L9) en [`territoryClient.js:49`](../../../apps/referidos-app/src/services/territoryClient.js#L49).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) (llama).
- **Llamadas directas en el cuerpo** [`cache.cantonesByProvincia.get`](../../../apps/referidos-app/src/services/territoryClient.js#L44), [`isFresh`](../../../apps/referidos-app/src/services/territoryClient.js#L45), [`order`](../../../apps/referidos-app/src/services/territoryClient.js#L49), [`eq`](../../../apps/referidos-app/src/services/territoryClient.js#L49), [`select`](../../../apps/referidos-app/src/services/territoryClient.js#L49), [`supabase.from`](../../../apps/referidos-app/src/services/territoryClient.js#L49), [`map`](../../../apps/referidos-app/src/services/territoryClient.js#L59), [`toTitleCaseEs`](../../../apps/referidos-app/src/services/territoryClient.js#L61), [`cache.cantonesByProvincia.set`](../../../apps/referidos-app/src/services/territoryClient.js#L63).
- **Lo usa** [`loadCantones`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L516) (llama).

#### [`fetchParroquiasByCanton`](../../../apps/referidos-app/src/services/territoryClient.js#L67) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`parroquias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L17) y coordina las demás operaciones de esta ficha.

- **Entradas** `cantonId`.
- **Retorno visible o tipo declarado** `ok`, `data`, `cached`, `error`.
- **Condiciones que evalúa** `ausencia de cantonId`, `cached y isFresh`, `error`.
- **Contrato de datos** tabla o vista [`parroquias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L17) (`select`) en [`territoryClient.js:77`](../../../apps/referidos-app/src/services/territoryClient.js#L77), tabla o bucket [`parroquias`](../../../apps/referidos-app/supabase/migrations/20250230_000003_direcciones_place_provider.sql#L17) en [`territoryClient.js:77`](../../../apps/referidos-app/src/services/territoryClient.js#L77).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) (llama).
- **Llamadas directas en el cuerpo** [`cache.parroquiasByCanton.get`](../../../apps/referidos-app/src/services/territoryClient.js#L72), [`isFresh`](../../../apps/referidos-app/src/services/territoryClient.js#L73), [`order`](../../../apps/referidos-app/src/services/territoryClient.js#L77), [`eq`](../../../apps/referidos-app/src/services/territoryClient.js#L77), [`select`](../../../apps/referidos-app/src/services/territoryClient.js#L77), [`supabase.from`](../../../apps/referidos-app/src/services/territoryClient.js#L77), [`map`](../../../apps/referidos-app/src/services/territoryClient.js#L87), [`toTitleCaseEs`](../../../apps/referidos-app/src/services/territoryClient.js#L89), [`cache.parroquiasByCanton.set`](../../../apps/referidos-app/src/services/territoryClient.js#L91).
- **Lo usa** [`loadParroquias`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L549) (llama).
