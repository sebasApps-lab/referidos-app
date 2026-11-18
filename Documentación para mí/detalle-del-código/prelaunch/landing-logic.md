# Prelaunch · Lógica de registro

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/landing-logic/useLandingLeadCapture.js`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/landing-logic/useLandingLeadCapture.js`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L1)

Centraliza input, honeypot, estado de envío, errores y telemetría. Devuelve la respuesta para que cada variante decida cuándo abrir su confirmación.

**Superficie que exporta.** [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L17).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L3) (importa), [`DesktopBusinessInterestModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/components/DesktopBusinessInterestModal.jsx#L3) (importa), [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L4) (importa), [`MobileBusinessInterestModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileBusinessInterestModal.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js), [`../waitlist/waitlistApi`](../../../apps/prelaunch/src/waitlist/waitlistApi.js).

#### [`getWaitlistErrorMessage`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L5) · función

Obtiene o resuelve `Waitlist Error Message` para entregarlo al consumidor.

- **Entradas** `errorCode`.
- **Condiciones que evalúa** `errorCode`.
- **Lo usa** [`submit`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L59) (llama).

#### [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L17) · hook React · exportación por defecto

Comparte el formulario de captación entre desktop, móvil y el interés de negocio. Expone valores, estados, errores y callbacks a las vistas.

- **Entradas** `{role, source, consentVersion, path, surface, tree, page} = valor por defecto`.
- **Retorno visible o tipo declarado** `email`, `setEmail`, `honeypot`, `setHoneypot`, `status`, `errorMessage`, `submit`, `resetStatus`, `clear`.
- **Estado o valores vinculados** `[email, setEmailState] mediante useState`, `[honeypot, setHoneypot] mediante useState`, `[status, setStatus] mediante useState`, `[errorMessage, setErrorMessage] mediante useState`.
- **Hooks que llama** `useState`.
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L75) (llama), [`DesktopBusinessInterestModal`](../../../apps/prelaunch/src/waitlist-landing/desktop/components/DesktopBusinessInterestModal.jsx#L36) (llama), [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L86) (llama), [`MobileBusinessInterestModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileBusinessInterestModal.jsx#L36) (llama).

#### [`setEmail`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L31) · función · dentro de [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L17)

Aplica o guarda el valor de correo para que el estado refleje la operación.

- **Entradas** `nextValue`.
- **Actualizaciones de estado o acciones** `setEmailState`, `setStatus`, `setErrorMessage`.
- **Condiciones que evalúa** `status`.
- **Llamadas directas en el cuerpo** [`setEmailState`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L32), [`setStatus`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L34), [`setErrorMessage`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L35).
- **Lo usa** [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L121) (referencia).

#### [`resetStatus`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L39) · función · dentro de [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L17)

Limpia o restablece el valor de estado como parte de este flujo.

- **Actualizaciones de estado o acciones** `setStatus`, `setErrorMessage`.
- **Llamadas directas en el cuerpo** [`setStatus`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L40), [`setErrorMessage`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L41).
- **Lo usa** [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L127) (referencia).

#### [`clear`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L44) · función · dentro de [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L17)

Coordina cambios de estado durante `clear`.

- **Actualizaciones de estado o acciones** `setEmailState`, `setHoneypot`, `setStatus`, `setErrorMessage`.
- **Llamadas directas en el cuerpo** [`setEmailState`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L45), [`setHoneypot`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L46), [`setStatus`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L47), [`setErrorMessage`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L48).
- **Lo usa** [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L128) (referencia).

#### [`submit`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L51) · función · asíncrona · dentro de [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L17)

Evita envíos repetidos mientras carga, llama al cliente de waitlist y traduce el resultado a éxito, registro previo o error. Emite la señal de telemetría correspondiente.

- **Retorno visible o tipo declarado** `ok`, `error`, `already`, `data`.
- **Actualizaciones de estado o acciones** `setStatus`, `setErrorMessage`.
- **Condiciones que evalúa** `status`, `ausencia de normalizedEmail`, `ausencia de response.ok`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama), [`submitWaitlistSignup`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L14) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L56), [`setStatus`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L58), [`setErrorMessage`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L59), [`getWaitlistErrorMessage`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L59), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L60), [`submitWaitlistSignup`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L77).
- **Lo usa** [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L126) (referencia).
