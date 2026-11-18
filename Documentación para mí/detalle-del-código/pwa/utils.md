# PWA principal · Utilidades

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/utils/dateUtils.js`](../../../apps/referidos-app/src/utils/dateUtils.js#L1)
- [`apps/referidos-app/src/utils/errorUtils.js`](../../../apps/referidos-app/src/utils/errorUtils.js#L1)
- [`apps/referidos-app/src/utils/googleOneTap.js`](../../../apps/referidos-app/src/utils/googleOneTap.js#L1)
- [`apps/referidos-app/src/utils/sanitize.js`](../../../apps/referidos-app/src/utils/sanitize.js#L1)
- [`apps/referidos-app/src/utils/storage.js`](../../../apps/referidos-app/src/utils/storage.js#L1)
- [`apps/referidos-app/src/utils/textCase.js`](../../../apps/referidos-app/src/utils/textCase.js#L1)
- [`apps/referidos-app/src/utils/validators.js`](../../../apps/referidos-app/src/utils/validators.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/utils/dateUtils.js`](../../../apps/referidos-app/src/utils/dateUtils.js#L1)

Unifica el tratamiento de fechas que aparecen en pantallas y servicios.

**Superficie que exporta.** [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/utils/dateUtils.js#L2).

**Módulos que lo cargan.** [`PromoCardCercanas.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L4) (importa), [`InicioPromos.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L5) (importa), [`PromoDetalle.jsx`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L8) (importa).

#### [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/utils/dateUtils.js#L2) · función · exportado

Formatea `Date Iso To Dd Mm Yyyy` para que el consumidor lo pueda presentar.

- **Entradas** `iso`.
- **Condiciones que evalúa** `ausencia de iso`.
- **Llamadas directas en el cuerpo** [`padStart`](../../../apps/referidos-app/src/utils/dateUtils.js#L6), [`d.getDate`](../../../apps/referidos-app/src/utils/dateUtils.js#L6), [`d.getMonth`](../../../apps/referidos-app/src/utils/dateUtils.js#L7), [`d.getFullYear`](../../../apps/referidos-app/src/utils/dateUtils.js#L8).
- **Lo usa** [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L67) (llama), [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L140) (llama), [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L190) (llama).

### [`apps/referidos-app/src/utils/errorUtils.js`](../../../apps/referidos-app/src/utils/errorUtils.js#L1)

Normaliza excepciones y valores de error a mensajes consumibles por la interfaz.

**Superficie que exporta.** [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4).

**Módulos que lo cargan.** [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L5) (importa), [`EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L5) (importa), [`useScannerState.ts`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L5) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L18) (importa).

**Dependencias del archivo.** [`../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4) · función · exportado

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Entradas** `error`.
- **Condiciones que evalúa** `import.meta.env.DEV`.
- **Usa código de** [`logError`](../../../apps/referidos-app/src/services/loggingClient.js#L185) (llama), [`reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L190) (llama).
- **Llamadas directas en el cuerpo** [`logError`](../../../apps/referidos-app/src/utils/errorUtils.js#L6), [`reportError`](../../../apps/referidos-app/src/utils/errorUtils.js#L7).
- **Lo usa** [`fetchData`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L127) (llama), [`handleCode`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L224) (llama), [`handleCode`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L239) (llama), [`login`](../../../apps/referidos-app/src/store/appStore.js#L401) (llama), [`register`](../../../apps/referidos-app/src/store/appStore.js#L437) (llama), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L727) (llama), [`loadPromos`](../../../apps/referidos-app/src/store/appStore.js#L776) (llama).

### [`apps/referidos-app/src/utils/googleOneTap.js`](../../../apps/referidos-app/src/utils/googleOneTap.js#L1)

Aísla la inicialización de Google One Tap y el intercambio de credenciales desde navegador.

**Superficie que exporta.** [`requestGoogleCredential`](../../../apps/referidos-app/src/utils/googleOneTap.js#L39).

**Módulos que lo cargan.** [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L10) (importa).

#### [`SCRIPT_SRC`](../../../apps/referidos-app/src/utils/googleOneTap.js#L2) · variable de módulo

Declara `SCRIPT_SRC` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L27) (referencia).

#### [`loaderPromise`](../../../apps/referidos-app/src/utils/googleOneTap.js#L3) · variable de módulo

Declara `loaderPromise` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L16) (referencia).

#### [`ensureBrowser`](../../../apps/referidos-app/src/utils/googleOneTap.js#L5) · función

Implementa `ensure Browser` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Condiciones que evalúa** `undefined`.
- **Lo usa** [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L14) (llama).

#### [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L13) · función

Obtiene o resuelve `Google Client` para entregarlo al consumidor.

- **Efectos y APIs** `existing.addEventListener`.
- **Condiciones que evalúa** `window.google.accounts.id`, `loaderPromise`, `existing`.
- **Llamadas directas en el cuerpo** [`ensureBrowser`](../../../apps/referidos-app/src/utils/googleOneTap.js#L14), [`document.querySelector`](../../../apps/referidos-app/src/utils/googleOneTap.js#L19), [`existing.addEventListener`](../../../apps/referidos-app/src/utils/googleOneTap.js#L21), [`document.createElement`](../../../apps/referidos-app/src/utils/googleOneTap.js#L26), [`document.head.appendChild`](../../../apps/referidos-app/src/utils/googleOneTap.js#L33).
- **Lo usa** [`requestGoogleCredential`](../../../apps/referidos-app/src/utils/googleOneTap.js#L41) (llama).

#### [`addEventListener · callback`](../../../apps/referidos-app/src/utils/googleOneTap.js#L21) · callback de infraestructura · dentro de [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L13)

Recibe eventos de la suscripción o listener registrado por `loadGoogleClient`.

- **Llamadas directas en el cuerpo** [`resolve`](../../../apps/referidos-app/src/utils/googleOneTap.js#L21).

#### [`addEventListener · callback`](../../../apps/referidos-app/src/utils/googleOneTap.js#L22) · callback de infraestructura · dentro de [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L13)

Recibe eventos de la suscripción o listener registrado por `loadGoogleClient`.

- **Llamadas directas en el cuerpo** [`reject`](../../../apps/referidos-app/src/utils/googleOneTap.js#L22).

#### [`script.onload`](../../../apps/referidos-app/src/utils/googleOneTap.js#L31) · función asignada · dentro de [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L13)

Maneja `load` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`resolve`](../../../apps/referidos-app/src/utils/googleOneTap.js#L31).

#### [`script.onerror`](../../../apps/referidos-app/src/utils/googleOneTap.js#L32) · función asignada · dentro de [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L13)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`reject`](../../../apps/referidos-app/src/utils/googleOneTap.js#L32).

#### [`requestGoogleCredential`](../../../apps/referidos-app/src/utils/googleOneTap.js#L39) · función · asíncrona · exportado

Implementa `request Google Credential` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `{clientId, context}`.
- **Condiciones que evalúa** `ausencia de clientId`, `settled`, `notification.isNotDisplayed o notification.isSkippedMoment`, `notification.isDismissedMoment`, `reason`.
- **Llamadas directas en el cuerpo** [`loadGoogleClient`](../../../apps/referidos-app/src/utils/googleOneTap.js#L41), [`google.accounts.id.initialize`](../../../apps/referidos-app/src/utils/googleOneTap.js#L53), [`google.accounts.id.prompt`](../../../apps/referidos-app/src/utils/googleOneTap.js#L71), [`notification.isNotDisplayed`](../../../apps/referidos-app/src/utils/googleOneTap.js#L73), [`notification.isSkippedMoment`](../../../apps/referidos-app/src/utils/googleOneTap.js#L73), [`finish`](../../../apps/referidos-app/src/utils/googleOneTap.js#L74), [`notification.isDismissedMoment`](../../../apps/referidos-app/src/utils/googleOneTap.js#L77), [`notification.getDismissedReason`](../../../apps/referidos-app/src/utils/googleOneTap.js#L79), [`notification.getNotDisplayedReason`](../../../apps/referidos-app/src/utils/googleOneTap.js#L80).
- **Lo usa** [`startGoogleOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L769) (llama).

#### [`finish`](../../../apps/referidos-app/src/utils/googleOneTap.js#L46) · función · dentro de [`requestGoogleCredential`](../../../apps/referidos-app/src/utils/googleOneTap.js#L39)

Función auxiliar de `requestGoogleCredential` para `finish`.

- **Entradas** `payload`, `isError = valor por defecto`.
- **Condiciones que evalúa** `settled`, `isError`.
- **Llamadas directas en el cuerpo** [`reject`](../../../apps/referidos-app/src/utils/googleOneTap.js#L49), [`resolve`](../../../apps/referidos-app/src/utils/googleOneTap.js#L50).
- **Lo usa** [`callback`](../../../apps/referidos-app/src/utils/googleOneTap.js#L58) (llama), [`requestGoogleCredential`](../../../apps/referidos-app/src/utils/googleOneTap.js#L74) (llama).

#### [`callback`](../../../apps/referidos-app/src/utils/googleOneTap.js#L55) · función · dentro de [`requestGoogleCredential`](../../../apps/referidos-app/src/utils/googleOneTap.js#L39)

Función auxiliar de `requestGoogleCredential` para `callback`.

- **Entradas** `response`.
- **Condiciones que evalúa** `settled`, `response.credential`.
- **Llamadas directas en el cuerpo** [`finish`](../../../apps/referidos-app/src/utils/googleOneTap.js#L58).

### [`apps/referidos-app/src/utils/sanitize.js`](../../../apps/referidos-app/src/utils/sanitize.js#L1)

Limpia valores de texto para su uso en formularios y resultados.

**Superficie que exporta.** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2).

**Módulos que lo cargan.** [`HistorialItem.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L4) (importa), [`HistorialItemActivo.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L4) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L15) (importa), [`PromoCardCercanas.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L5) (importa), [`PromoCardHot.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L3) (importa), [`PromoCardNuevas.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L4) (importa), [`PromoCardVariant.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L4) (importa), [`PromoDetalle.jsx`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L4) (importa), [`EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L6) (importa), [`ScannerResultCard.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L2) (importa).

#### [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) · función · exportado

Normaliza `Text` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de value`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/utils/sanitize.js#L4).
- **Lo usa** [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L234) (llama), [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L208) (llama), [`safeResults`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L72) (llama), [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L12) (llama), [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L16) (llama), [`PromoCardNuevas`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L12) (llama), [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L11) (llama), [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L77) (llama), [`ResultCard`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L49) (llama), [`ScannerResultCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L45) (llama).

### [`apps/referidos-app/src/utils/storage.js`](../../../apps/referidos-app/src/utils/storage.js#L1)

Agrupa utilidades de almacenamiento del navegador para persistencias de poca escala.

**Superficie que exporta.** [`safeGetItem`](../../../apps/referidos-app/src/utils/storage.js#L1), [`safeSetItem`](../../../apps/referidos-app/src/utils/storage.js#L11), [`safeRemoveItem`](../../../apps/referidos-app/src/utils/storage.js#L21).

#### [`safeGetItem`](../../../apps/referidos-app/src/utils/storage.js#L1) · función · exportado

Implementa `safe Get Item` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `key`, `defaultValue = valor por defecto`.
- **Efectos y APIs** `localStorage.getItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.getItem`](../../../apps/referidos-app/src/utils/storage.js#L4).

#### [`safeSetItem`](../../../apps/referidos-app/src/utils/storage.js#L11) · función · exportado

Coordina cambios de estado durante `safe Set Item`.

- **Entradas** `key`, `value`.
- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `localStorage.setItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.setItem`](../../../apps/referidos-app/src/utils/storage.js#L14).

#### [`safeRemoveItem`](../../../apps/referidos-app/src/utils/storage.js#L21) · función · exportado

Implementa `safe Remove Item` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `key`.
- **Retorno visible o tipo declarado** `booleano`.
- **Efectos y APIs** `localStorage.removeItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.removeItem`](../../../apps/referidos-app/src/utils/storage.js#L24).

### [`apps/referidos-app/src/utils/textCase.js`](../../../apps/referidos-app/src/utils/textCase.js#L1)

Estandariza capitalización de texto visible y etiquetas.

**Superficie que exporta.** [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17).

**Módulos que lo cargan.** [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L23) (importa), [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L13) (importa), [`territoryClient.js`](../../../apps/referidos-app/src/services/territoryClient.js#L3) (importa).

#### [`LOWERCASE_WORDS`](../../../apps/referidos-app/src/utils/textCase.js#L1) · variable de módulo

Declara `LOWERCASE_WORDS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L31) (accede al módulo).

#### [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) · función · exportado

Implementa `to Title Case Es` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de text`, `ausencia de word`, `part`, `ausencia de part`, `index y LOWERCASE_WORDS.has`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/utils/textCase.js#L18), [`replace`](../../../apps/referidos-app/src/utils/textCase.js#L20), [`text.toLowerCase`](../../../apps/referidos-app/src/utils/textCase.js#L20), [`lower.split`](../../../apps/referidos-app/src/utils/textCase.js#L21), [`words.map`](../../../apps/referidos-app/src/utils/textCase.js#L22), [`word.split`](../../../apps/referidos-app/src/utils/textCase.js#L24), [`join`](../../../apps/referidos-app/src/utils/textCase.js#L25), [`parts.map`](../../../apps/referidos-app/src/utils/textCase.js#L25), [`LOWERCASE_WORDS.has`](../../../apps/referidos-app/src/utils/textCase.js#L31), [`toUpperCase`](../../../apps/referidos-app/src/utils/textCase.js#L34), [`part.charAt`](../../../apps/referidos-app/src/utils/textCase.js#L34), [`part.slice`](../../../apps/referidos-app/src/utils/textCase.js#L34) y 1 más.
- **Lo usa** [`handleClientAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L838) (llama), [`handleBusinessAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L959) (llama), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L591) (llama), [`formatProvince`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1918) (llama), [`fetchProvincias`](../../../apps/referidos-app/src/services/territoryClient.js#L33) (llama), [`fetchCantonesByProvincia`](../../../apps/referidos-app/src/services/territoryClient.js#L61) (llama), [`fetchParroquiasByCanton`](../../../apps/referidos-app/src/services/territoryClient.js#L89) (llama).

### [`apps/referidos-app/src/utils/validators.js`](../../../apps/referidos-app/src/utils/validators.js#L1)

Agrupa validaciones de formularios para que los pasos manejen reglas y mensajes de forma coherente.

**Superficie que exporta.** [`EMAIL_RE`](../../../apps/referidos-app/src/utils/validators.js#L1), [`PHONE_RE`](../../../apps/referidos-app/src/utils/validators.js#L2), [`CODE_RE`](../../../apps/referidos-app/src/utils/validators.js#L3), [`validateEmail`](../../../apps/referidos-app/src/utils/validators.js#L5), [`validatePhone`](../../../apps/referidos-app/src/utils/validators.js#L9), [`validateCode`](../../../apps/referidos-app/src/utils/validators.js#L13), [`validarCedula`](../../../apps/referidos-app/src/utils/validators.js#L17).

**Módulos que lo cargan.** [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L2) (importa), [`AccountVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L4) (importa), [`BusinessVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L4) (importa), [`RoleSelectStep.jsx`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L2) (importa), [`ModalCodigoNegocio.jsx`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L5) (importa), [`ModalSplashChoiceOverlay.jsx`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L4) (importa).

#### [`EMAIL_RE`](../../../apps/referidos-app/src/utils/validators.js#L1) · variable de módulo · exportado

Declara `EMAIL_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`validateEmail`](../../../apps/referidos-app/src/utils/validators.js#L6) (accede al módulo), [`validateEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L169) (accede al módulo).

#### [`PHONE_RE`](../../../apps/referidos-app/src/utils/validators.js#L2) · variable de módulo · exportado

Declara `PHONE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`validatePhone`](../../../apps/referidos-app/src/utils/validators.js#L10) (accede al módulo).

#### [`CODE_RE`](../../../apps/referidos-app/src/utils/validators.js#L3) · variable de módulo · exportado

Declara `CODE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`validateCode`](../../../apps/referidos-app/src/utils/validators.js#L14) (accede al módulo), [`validateNegocioCode`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L350) (accede al módulo), [`handleCodigoConfirm`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L71) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L30) (accede al módulo).

#### [`validateEmail`](../../../apps/referidos-app/src/utils/validators.js#L5) · función · exportado

Comprueba el valor de correo para decidir si se admite o continúa la operación.

- **Entradas** `email`.
- **Llamadas directas en el cuerpo** [`EMAIL_RE.test`](../../../apps/referidos-app/src/utils/validators.js#L6).
- **Lo usa** [`handleEmailLogin`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L198) (llama).

#### [`validatePhone`](../../../apps/referidos-app/src/utils/validators.js#L9) · función · exportado

Comprueba el valor de teléfono para decidir si se admite o continúa la operación.

- **Entradas** `phone`.
- **Llamadas directas en el cuerpo** [`PHONE_RE.test`](../../../apps/referidos-app/src/utils/validators.js#L10).

#### [`validateCode`](../../../apps/referidos-app/src/utils/validators.js#L13) · función · exportado

Comprueba `Code` para decidir si se admite o continúa la operación.

- **Entradas** `code`.
- **Llamadas directas en el cuerpo** [`CODE_RE.test`](../../../apps/referidos-app/src/utils/validators.js#L14).

#### [`validarCedula`](../../../apps/referidos-app/src/utils/validators.js#L17) · función · exportado

Implementa `validar Cedula` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `cedula`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de test`, `provincia`, `prod`.
- **Llamadas directas en el cuerpo** [`test`](../../../apps/referidos-app/src/utils/validators.js#L18), [`parseInt`](../../../apps/referidos-app/src/utils/validators.js#L19), [`cedula.slice`](../../../apps/referidos-app/src/utils/validators.js#L19), [`map`](../../../apps/referidos-app/src/utils/validators.js#L22), [`cedula.split`](../../../apps/referidos-app/src/utils/validators.js#L22).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L72) (llama), [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L30) (llama).
