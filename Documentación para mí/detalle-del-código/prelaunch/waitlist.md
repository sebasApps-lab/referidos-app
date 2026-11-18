# Prelaunch · Waitlist y referidos

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L1)
- [`apps/prelaunch/src/waitlist/legal/LegalHomePage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalHomePage.jsx#L1)
- [`apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L1)
- [`apps/prelaunch/src/waitlist/referralLinks.js`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L1)
- [`apps/prelaunch/src/waitlist/waitlistApi.js`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L1)

Resuelve documento legal de la lista según el parámetro de ruta y lo muestra en un marco común.

**Superficie que exporta.** [`LegalDocPage`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L24).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../legal/blocks/LegalContent`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content/prelaunch`](../../../packages/legal-content/src/prelaunch.js).

#### [`LEGAL_DOCS`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `LEGAL DOCS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `politicas-privacidad-lista`, `terminos-condiciones-lista`, `borrar-correo-lista`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L10).
- **Lo usa** [`current`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L27) (accede al módulo).

#### [`LegalDocPage`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L24) · componente React · exportación por defecto

Monta `Link`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`, `LegalContent`.
- **Hooks que llama** `useParams`.
- **Usa código de** [`Módulo`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx#L1) (renderiza).

#### [`current`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L27) · cálculo memorizado · dentro de [`LegalDocPage`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L24)

Función auxiliar de `LegalDocPage` para `current`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`LegalDocPage`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L77) (accede al módulo).

### [`apps/prelaunch/src/waitlist/legal/LegalHomePage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalHomePage.jsx#L1)

Presenta los enlaces a los documentos legales de la lista de espera.

**Superficie que exporta.** [`LegalHomePage`](../../../apps/prelaunch/src/waitlist/legal/LegalHomePage.jsx#L4).

**Dependencias del archivo.** `react`, `react-router-dom`.

#### [`LegalHomePage`](../../../apps/prelaunch/src/waitlist/legal/LegalHomePage.jsx#L4) · componente React · exportación por defecto

Monta `Link`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`.

### [`apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L1)

Contenedor simple para documentos legales de waitlist. Separa la presentación de la selección de documento.

**Superficie que exporta.** [`LegalSimplePage`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L24).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../legal/blocks/LegalContent`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content/prelaunch`](../../../packages/legal-content/src/prelaunch.js).

#### [`LEGAL_DOCS`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `LEGAL DOCS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `politicas-privacidad-lista`, `terminos-condiciones-lista`, `borrar-correo-lista`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L10).
- **Lo usa** [`current`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L26) (accede al módulo).

#### [`LegalSimplePage`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L24) · componente React · exportación por defecto

Monta `Link`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{doc}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`, `LegalContent`.
- **Usa código de** [`Módulo`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx#L1) (renderiza).

#### [`current`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L26) · cálculo memorizado · dentro de [`LegalSimplePage`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L24)

Función auxiliar de `LegalSimplePage` para `current`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`LegalSimplePage`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L81) (accede al módulo).

### [`apps/prelaunch/src/waitlist/referralLinks.js`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L1)

Normaliza rutas y genera enlaces absolutos de referido. Crea URLs por red y maneja opciones de compartir en Instagram.

**Superficie que exporta.** [`buildAbsoluteReferralLink`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L10), [`buildWhatsAppShareUrl`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L20), [`buildFacebookShareUrl`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L24), [`buildTwitterShareUrl`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L28), [`openInstagramShare`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L32).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L7) (importa), [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L7) (importa), [`MobileCongratsModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L4) (importa).

#### [`normalizeReferralPath`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L1) · función

Normaliza `Referral Path` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `referralLinkPath`, `fallbackPath = valor por defecto`.
- **Condiciones que evalúa** `ausencia de nextPath`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L2), [`nextPath.startsWith`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L7).
- **Lo usa** [`buildAbsoluteReferralLink`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L11) (llama).

#### [`buildAbsoluteReferralLink`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L10) · función · exportado

Construye `Absolute Referral Link` a partir de los datos del flujo.

- **Entradas** `referralLinkPath`, `fallbackPath = valor por defecto`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`normalizeReferralPath`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L11), [`toString`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L17).
- **Lo usa** [`handleWaitlistSubmit`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L223) (llama), [`handleWaitlistSubmit`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L214) (llama).

#### [`buildWhatsAppShareUrl`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L20) · función · exportado

Construye `Whats App Share Url` a partir de los datos del flujo.

- **Entradas** `referralLink`.
- **Llamadas directas en el cuerpo** [`encodeURIComponent`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L21).
- **Lo usa** [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L115) (llama).

#### [`buildFacebookShareUrl`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L24) · función · exportado

Construye `Facebook Share Url` a partir de los datos del flujo.

- **Entradas** `referralLink`.
- **Llamadas directas en el cuerpo** [`encodeURIComponent`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L25).
- **Lo usa** [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L129) (llama).

#### [`buildTwitterShareUrl`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L28) · función · exportado

Construye `Twitter Share Url` a partir de los datos del flujo.

- **Entradas** `referralLink`.
- **Llamadas directas en el cuerpo** [`encodeURIComponent`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L29).
- **Lo usa** [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L157) (llama).

#### [`openInstagramShare`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L32) · función · asíncrona · exportado

Inicia `Instagram Share` y prepara sus dependencias.

- **Entradas** `referralLink`.
- **Efectos y APIs** `navigator.clipboard.writeText`, `window.setTimeout`.
- **Condiciones que evalúa** `navigator.clipboard.writeText`, `undefined`.
- **Llamadas directas en el cuerpo** [`navigator.clipboard.writeText`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L35), [`window.location.assign`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L42), [`window.setTimeout`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L43).
- **Lo usa** [`handleInstagramShare`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L53) (llama).

#### [`setTimeout · callback`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L43) · callback de infraestructura · dentro de [`openInstagramShare`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L32)

Ejecuta trabajo diferido o periódico iniciado por `openInstagramShare`.

- **Llamadas directas en el cuerpo** [`window.location.assign`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L44).

### [`apps/prelaunch/src/waitlist/waitlistApi.js`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L1)

Normaliza correo y rol de intención, obtiene ref de la URL, añade UTM y adapta la respuesta de la función a la UI.

**Superficie que exporta.** [`submitWaitlistSignup`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L14).

**Módulos que lo cargan.** [`useLandingLeadCapture.js`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L3) (importa).

**Dependencias del archivo.** [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js).

#### [`getReferralCodeFromLocation`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L4) · función

Obtiene o resuelve `Referral Code From Location` para entregarlo al consumidor.

- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`toUpperCase`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L8), [`trim`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L8), [`params.get`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L8).
- **Lo usa** [`submitWaitlistSignup`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L40) (llama).

#### [`submitWaitlistSignup`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L14) · función · asíncrona · exportado

Emite o envía `Waitlist Signup` en el flujo del archivo.

- **Entradas** `{email, role, source, consentVersion, honeypot, referralCode} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de prelaunchClient`, `ausencia de normalizedEmail`, `ausencia de response.ok`.
- **Usa código de** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) (llama), [`getDefaultUtm`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L22), [`trim`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L27), [`prelaunchClient.waitlist.submit`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L34), [`toUpperCase`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L40), [`getReferralCodeFromLocation`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L40), [`getDefaultUtm`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L41).
- **Lo usa** [`submit`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L77) (llama).
