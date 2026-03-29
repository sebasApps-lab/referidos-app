# Prelaunch legacy -> new landings

## Objetivo

Este archivo deja una implementacion de referencia para migrar la logica funcional que existia en `prelaunch legacy` hacia las paginas nuevas de `apps/prelaunch`, sin perder:

- captura de leads de waitlist
- distincion entre cliente y negocio
- soporte, ayuda y legal
- analitica de conversion
- observabilidad bootstrap y eventos de runtime
- protecciones basicas como honeypot, validacion y manejo de duplicados

La idea no es revivir el layout legacy, sino trasladar la logica util y medible al layout nuevo.

## Fuentes revisadas

### Branch actual

- `apps/prelaunch/src/main.jsx`
- `apps/prelaunch/src/observability/prelaunchObservability.js`
- `apps/prelaunch/src/services/prelaunchSystem.js`
- `apps/prelaunch/src/waitlist/waitlistApi.js`
- `apps/prelaunch/src/support/SupportRequestPage.jsx`
- `apps/prelaunch/src/support/FeedbackPage.jsx`
- `apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopWaitlistForm.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopBusinessInterestModal.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopCongratsModal.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/components/MobileBusinessInterestModal.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx`
- `apps/prelaunch/src/business-landing/BusinessLandingPage.jsx`
- `apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx`
- `apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx`
- `apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx`

### Branch de backup legacy

Referencia principal:

- `codex/archive-prelaunch-legacy-2026-03-20`

Archivos clave revisados:

- `apps/prelaunch/src/main.jsx`
- `apps/prelaunch/src/waitlist/WaitlistPage.jsx`
- `apps/prelaunch/src/home/PrelaunchHomePage.jsx`
- `apps/prelaunch/src/waitlist/waitlistApi.js`
- `apps/prelaunch/src/services/prelaunchSystem.js`
- `apps/prelaunch/src/observability/prelaunchObservability.js`
- `apps/prelaunch/src/support/SupportRequestPage.jsx`
- `apps/prelaunch/src/support/FeedbackPage.jsx`

## Resumen ejecutivo

La logica compartida de infraestructura no se perdio. `waitlistApi`, `prelaunchSystem` y `prelaunchObservability` siguen activos y practicamente equivalentes a legacy. Lo que si se perdio en la migracion a las nuevas landings es la capa de orquestacion en pagina:

- formularios que envian realmente a waitlist
- instrumentacion de `page_view` y CTAs
- feedback de `success`, `already`, `error`, `loading`
- proteccion honeypot
- enlaces reales de soporte/contacto en varios footers
- continuidad de tracking entre cliente y negocio
- metadatos de pagina que legacy si montaba en runtime

En otras palabras: el backend y la observabilidad base siguen vivos, pero las nuevas paginas todavia son mayormente una superficie visual.

## Lo que legacy hacia y debe conservarse

## 1. Bootstrap de observabilidad

Legacy y actual hacen esto igual:

- `main.jsx` ejecuta `initPrelaunchObservability()` antes de renderizar rutas.
- `prelaunchObservability.js` registra runtime, `prelaunch_loaded`, release, `flow: "prelaunch"` y `flow_step: "landing"`.
- `prelaunchSystem.js` expone el cliente de prelaunch, UTM y `ingestPrelaunchEvent`.

Esto es el punto de partida correcto y debe mantenerse.

## 2. Contrato de waitlist

Legacy usaba y actual sigue usando:

- `submitWaitlistSignup({ email, role, source, consentVersion, honeypot })`
- normalizacion de email
- mapping de `role_intent`:
  - `cliente` -> `cliente`
  - `negocio` o `negocio_interest` -> `negocio`
- envio de UTM por `getDefaultUtm()`

Por tanto, la migracion a las paginas nuevas no requiere cambiar contrato backend. Solo requiere volver a llamar este contrato desde las superficies nuevas.

## 3. Eventos legacy relevantes

En `WaitlistPage.jsx` y `PrelaunchHomePage.jsx` habia continuidad de negocio en estos eventos:

- `page_view`
- `cta_toggle_role`
- `cta_waitlist_open`
- `waitlist_submit`
- `download_click`
- `legacy_open`

Ademas habia fallback a `gtag` / `dataLayer` via `trackEvent(...)`. En la rama nueva ya no existe ese helper en las landings.

## 4. Estado de submit legacy

Legacy no disparaba un CTA "ciego". Tenia una maquina de estado util:

- `idle`
- `loading`
- `success`
- `already`
- `error`

Y diferenciaba:

- email invalido
- error de red / request
- email ya existente (`already`)
- exito real

Eso debe volver a existir en cada superficie publica que capture correos.

## 5. Proteccion basica legacy

Legacy incluia:

- validacion frontend de email
- campo honeypot oculto
- mensajes de error/success
- `aria-live` para feedback

En las nuevas landings eso falta en los formularios principales.

## 6. Soporte, ayuda y legal

Legacy ya trataba soporte y legal como parte del funnel:

- enlaces a privacidad y terminos
- soporte para borrar correo de waitlist via `/soporte-chat?tipo=borrar_correo_waitlist`
- paginas anonimas instrumentadas:
  - `SupportRequestPage` envia `page_view` y `support_ticket_created`
  - `FeedbackPage` envia `feedback_submit`

En la rama nueva esas paginas siguen vivas y son la fuente de verdad para soporte/legal. Las nuevas landings deben enlazarse correctamente a ellas, no inventar flujos paralelos.

## Estado actual por pagina nueva

## `/` -> `WaitlistLandingPage`

### Lo que ya hace bien

- Detecta arbol `desktop` vs `mobile`.
- Fija `data-prelaunch-root-entry`.
- Resuelve scroll por hash.
- Mantiene dos superficies distintas con layout nuevo.

### Gaps funcionales

#### Desktop cliente

- `DesktopWaitlistForm.jsx` solo guarda email en state local.
- El boton "Anadir correo" abre `DesktopCongratsModal` por callback visual.
- No llama `submitWaitlistSignup`.
- No envia `ingestPrelaunchEvent`.
- No maneja `loading`, `success`, `already`, `error`.
- No tiene honeypot.
- No decide cuando abrir el modal en base al resultado real.

#### Mobile cliente

- `MobileWaitlistForm.jsx` tampoco llama `submitWaitlistSignup`.
- El texto legal no navega a terminos/privacidad; son `span`.
- No hay eventos de analitica.
- No hay feedback de submit.
- No hay honeypot.

#### Cliente -> negocio desde landing cliente

- `DesktopBusinessInterestModal.jsx` y `MobileBusinessInterestModal.jsx` si llaman `submitWaitlistSignup`.
- Pero no emiten eventos de observabilidad de apertura, cierre, submit, error o success.
- Tampoco usan honeypot.

#### Footer / contacto

- Desktop footer muestra `Chat de soporte`, `Soporte por correo` y `Comentarios y sugerencias` como strings, no links.
- `MobileContactForm.jsx` es puramente visual:
  - no manda a backend
  - no navega a feedback
  - no navega a soporte
  - no emite analitica

#### Metadatos

- La landing nueva no inyecta `title`, `description`, `canonical`, `og:*`, `twitter:*`.
- Legacy si lo hacia en paginas importantes.

## `/negocios` -> `BusinessLandingPage`

### Lo que ya hace bien

- Tiene ruta propia.
- Reusa estructura visual consistente con el landing nuevo.
- Ya separa el funnel de negocios como pagina distinta.

### Gaps funcionales

- `DesktopBusinessPromoSection.jsx` tiene campo de correo y CTA, pero no hay input real manejado por controller ni submit real.
- El CTA "Empieza gratis" no llama `submitWaitlistSignup`.
- El bloque QR y botones de descarga no emiten `download_click`.
- El footer de contacto sigue con strings no clicables.
- No hay `page_view` especifico de la pagina negocio.
- No hay continuidad de `role_intent: "negocio"` en eventos.
- No hay honeypot.

## Soporte / feedback / ayuda

Esto si esta relativamente maduro y debe aprovecharse:

- `SupportRequestPage.jsx`
  - `page_view`
  - `support_ticket_created`
  - carga categorias anonimas
  - maneja ticket activo / retake / replace
- `FeedbackPage.jsx`
  - `feedback_submit`
- rutas actuales correctas:
  - `/ayuda/es`
  - `/ayuda/es/articulo/privacidad`
  - `/ayuda/es/articulo/terminos`
  - `/ayuda/es/articulo/borrar-datos`
  - `/soporte-chat`
  - `/soporte-correo`
  - `/feedback`

La implementacion nueva debe colgarse de estas rutas y no del esquema legacy `/legal/es/...`.

## Implementacion objetivo

## 1. Mantener la infraestructura compartida como source of truth

No tocar conceptualmente estos modulos:

- `apps/prelaunch/src/observability/prelaunchObservability.js`
- `apps/prelaunch/src/services/prelaunchSystem.js`
- `apps/prelaunch/src/waitlist/waitlistApi.js`
- `apps/prelaunch/src/support/supportApi.js`

La migracion debe vivir en la capa de UI y controladores de landing.

## 2. Crear una capa compartida de control para landings

Recomendacion: extraer logica reutilizable en algo como:

- `apps/prelaunch/src/landing-logic/useLandingLeadCapture.js`
- `apps/prelaunch/src/landing-logic/landingTelemetry.js`
- `apps/prelaunch/src/landing-logic/useLandingPageMeta.js`

No es obligatorio usar exactamente esos nombres, pero si separar logica de UI.

### `useLandingLeadCapture(...)`

Debe encapsular:

- `email`
- `setEmail`
- `honeypot`
- `setHoneypot`
- `status`
- `errorMessage`
- `successMessage`
- `submit()`
- `resetStatus()`

Inputs recomendados:

```js
useLandingLeadCapture({
  role,
  source,
  consentVersion,
  path,
  analyticsSurface,
  roleIntent,
})
```

Comportamiento requerido:

- trim y validacion de email
- bloquea doble submit durante `loading`
- llama `submitWaitlistSignup`
- interpreta `result.already`
- emite `ingestPrelaunchEvent("waitlist_submit", ...)`
- opcionalmente llama un helper `trackMarketingEvent(...)`

## 3. Reintroducir un helper de tracking best-effort

Legacy usaba `trackEvent`. En las nuevas landings conviene reintroducir un helper chico y sin dependencias:

```js
function trackMarketingEvent(eventName, payload = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
    return;
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }
}
```

Importante:

- `ingestPrelaunchEvent(...)` sigue siendo la via principal.
- `trackMarketingEvent(...)` es solo un mirror best-effort para marketing tags.

## 4. Reintroducir metadatos por pagina

Legacy ya tenia el patron. Debe volver a existir al menos para:

- `/`
- `/negocios`

Minimo requerido por pagina:

- `document.title`
- `meta[name="description"]`
- `meta[name="robots"]`
- `meta[property="og:type"]`
- `meta[property="og:title"]`
- `meta[property="og:description"]`
- `meta[property="og:image"]`
- `meta[property="og:url"]`
- `meta[name="twitter:card"]`
- `meta[name="twitter:title"]`
- `meta[name="twitter:description"]`
- `meta[name="twitter:image"]`
- `link[rel="canonical"]`
- `document.documentElement.lang = "es"`

## Implementacion detallada por superficie

## A. Landing cliente desktop

Archivos objetivo:

- `apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopWaitlistForm.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopCongratsModal.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopNavigationHeader.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopFooterColumns.jsx`
- `apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopHeroSection.jsx`

### Comportamiento requerido

1. `DesktopWaitlistLandingPage.jsx` debe ser el owner del submit real.
2. `DesktopWaitlistForm.jsx` debe volverse presentacional:
   - recibe `email`, `onEmailChange`, `onSubmit`, `status`, `errorMessage`
   - recibe `legal links`
   - recibe `honeypot props`
3. El modal de felicitaciones debe abrirse solo si el submit fue `success` o `already`.
4. El click del hero "Entrar a la lista de espera" debe emitir `cta_waitlist_open`.
5. El nav "Ayuda" debe emitir `cta_help_open`.
6. El nav "Para negocios" debe emitir:
   - `cta_toggle_role` con `role_intent: "negocio"`
   - `cta_business_interest_open`
7. Los links de footer de contacto deben navegar realmente:
   - `Chat de soporte` -> `/soporte-chat`
   - `Soporte por correo` -> `/soporte-correo`
   - `Comentarios y sugerencias` -> `/feedback`

### Fuente recomendada para submit API

- `source: "landing_waitlist"`
- `role: "cliente"`
- `consentVersion: "privacy_v1"`

### Props de observabilidad recomendadas

```js
{
  page: "waitlist_landing",
  tree: "desktop",
  surface: "waitlist_form",
  role_intent: "cliente"
}
```

### Nota sobre `DesktopCongratsModal.jsx`

Ahora mismo usa un `INVITE_LINK` fijo. Eso no representa logica legacy real. La implementacion correcta deberia ser una de estas dos:

- opcion recomendada: usar el modal solo como confirmacion de exito y quitar el link falso
- opcion futura: poblar el link con una referencia real de referral cuando exista backend

No se debe dejar el enlace hardcoded como si fuera funcional.

## B. Landing cliente mobile

Archivos objetivo:

- `apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx`

### Comportamiento requerido

1. `MobileWaitlistLandingPage.jsx` debe ser owner del submit de cliente.
2. `MobileWaitlistForm.jsx` debe dejar de ser un input aislado y recibir controller compartido.
3. El CTA hero "Entrar a la lista de espera" debe emitir `cta_waitlist_open`.
4. El CTA drawer "Ayuda" debe emitir `cta_help_open`.
5. El CTA drawer "Para negocios" debe emitir:
   - `cta_toggle_role` con `role_intent: "negocio"`
   - `cta_business_interest_open`
6. El texto legal del form debe usar links reales a:
   - `/ayuda/es/articulo/terminos`
   - `/ayuda/es/articulo/privacidad`
7. `MobileFooterSection.jsx` debe instrumentar los accesos a ayuda, borrar datos y negocio.

### Fuente recomendada para submit API

Para continuidad con legacy, mantener:

- `source: "landing_waitlist"`
- `role: "cliente"`
- `consentVersion: "privacy_v1"`

Y diferenciar mobile en eventos, no en el `source` del contrato:

```js
{
  page: "waitlist_landing",
  tree: "mobile",
  surface: "waitlist_form",
  role_intent: "cliente"
}
```

## C. Modal negocio desde landing cliente

Archivos objetivo:

- `apps/prelaunch/src/waitlist-landing/desktop/components/DesktopBusinessInterestModal.jsx`
- `apps/prelaunch/src/waitlist-landing/mobile/components/MobileBusinessInterestModal.jsx`

### Lo que ya existe

- submit real a `submitWaitlistSignup`
- `role: "negocio_interest"`
- `consentVersion: "business_panel_notify_v1"`

### Lo que falta

- evento `cta_business_interest_open` al abrir
- evento `cta_business_interest_close` al cerrar
- evento `waitlist_submit` con `role_intent: "negocio"`
- evento `waitlist_submit_error` si falla
- honeypot oculto
- opcionalmente tracking mirror con `trackMarketingEvent`

### Fuentes actuales que conviene mantener

- desktop: `source: "landing_business_modal"`
- mobile: `source: "landing_business_modal_mobile"`

Eso ya diferencia superficies y no hace falta cambiarlo.

## D. Landing negocio `/negocios`

Archivos objetivo:

- `apps/prelaunch/src/business-landing/BusinessLandingPage.jsx`
- `apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx`
- `apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx`
- `apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx`
- `apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx`
- `apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx`

### Comportamiento requerido

1. Emitir `page_view` especifico de negocio al montar.
2. Instrumentar hero CTA "Crear cuenta gratis" con `cta_waitlist_open`.
3. Convertir `DesktopBusinessPromoSection.jsx` en surface real de captura.
4. Los botones QR / descarga deben emitir `download_click`.
5. El footer de contacto debe navegar realmente a soporte/feedback.

### Contrato recomendado de lead capture

Para no mezclar con cliente:

- `role: "negocio_interest"`
- `source: "business_landing_waitlist"`
- `consentVersion: "business_panel_notify_v1"`

### Props de observabilidad recomendadas

```js
{
  page: "business_landing",
  tree: "desktop",
  surface: "business_waitlist",
  role_intent: "negocio"
}
```

### Nota importante

`apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx` hoy no parece ser la superficie principal usada por la pagina. La captura real visible vive en `DesktopBusinessPromoSection.jsx`. No conviene implementar submit en un componente no usado y dejar el CTA visible muerto.

## E. Contacto y feedback en landing mobile

`MobileContactForm.jsx` no existia como tal en legacy. Por eso no conviene inventar otro backend paralelo. La recomendacion correcta es:

- opcion recomendada:
  - convertir el bloque en un CTA hacia `/feedback` y `/soporte-correo`
  - mantener el form local solo como UI si el producto lo exige, pero que el submit navegue al flujo canonic
- opcion secundaria:
  - replicar la validacion de `FeedbackPage.jsx`
  - emitir `feedback_submit`
  - seguir dejando claro que es un intake liviano de frontend

La opcion recomendada es mas limpia porque evita duplicar reglas de validacion y observabilidad.

## Contrato de eventos recomendado

La meta es conservar nombres legacy donde exista continuidad y agregar granularidad solo donde aporte.

| Evento | Donde | Cuando | Props minimas |
| --- | --- | --- | --- |
| `page_view` | `/` | mount desktop/mobile | `page`, `tree`, `route` |
| `page_view` | `/negocios` | mount | `page`, `tree`, `route`, `role_intent` |
| `cta_waitlist_open` | hero/nav/drawer/buttons | scroll hacia form o apertura de bloque | `page`, `tree`, `surface`, `target` |
| `cta_help_open` | nav, drawer, footer | navegar a ayuda | `page`, `tree`, `surface`, `target` |
| `cta_toggle_role` | cliente -> negocio | entrar a modal negocio o ir a `/negocios` | `page`, `tree`, `role_intent` |
| `cta_business_interest_open` | modal negocio | open | `page`, `tree`, `surface` |
| `cta_business_interest_close` | modal negocio | close | `page`, `tree`, `surface`, `reason` |
| `waitlist_submit` | cliente | resultado submit | `page`, `tree`, `surface`, `role_intent`, `already` |
| `waitlist_submit` | negocio | resultado submit | `page`, `tree`, `surface`, `role_intent`, `already` |
| `waitlist_submit_error` | cliente/negocio | submit con error | `page`, `tree`, `surface`, `role_intent`, `error` |
| `download_click` | landing negocio | click descarga o QR CTA | `page`, `tree`, `surface`, `target`, `role_intent` |
| `feedback_open` | landing mobile contacto | abrir feedback canonic | `page`, `tree`, `surface` |
| `support_open` | footer/contacto | abrir soporte chat/correo | `page`, `tree`, `surface`, `channel` |

Notas:

- `route` puede resolverse con `window.location.pathname`.
- `tree` debe ser `desktop` o `mobile`.
- `surface` debe identificar el componente visible: `hero`, `waitlist_form`, `footer`, `drawer`, `business_modal`, `promo_section`, etc.
- Para submit de waitlist, si se usa un `source` canonico legacy en API, la diferencia de superficie se manda por `props`.

## Route mapping legacy -> nuevo

| Legacy | Nuevo | Observacion |
| --- | --- | --- |
| `/cliente-legacy` | `/` | la logica cliente pasa al landing actual |
| `/negocio-legacy` | `/negocios` y modal negocio desde `/` | hoy hay dos entradas de negocio |
| `/legal/es/privacidad` | `/ayuda/es/articulo/privacidad` | usar help center nuevo |
| `/legal/es/terminos` | `/ayuda/es/articulo/terminos` | usar help center nuevo |
| `/legal/es/borrar-datos` | `/ayuda/es/articulo/borrar-datos` | usar help center nuevo |
| `/soporte-chat?tipo=borrar_correo_waitlist` | igual | sigue siendo la ruta util para borrar email |

## Orden recomendado de implementacion

1. Reintroducir helper compartido de submit y tracking.
2. Implementar cliente desktop.
3. Implementar cliente mobile.
4. Instrumentar modales de negocio.
5. Implementar landing negocio `/negocios`.
6. Convertir footers y contacto a links y eventos reales.
7. Reintroducir metadatos de pagina.

Este orden minimiza regresiones porque primero recupera conversion y luego refina superficies secundarias.

## Checklist de aceptacion

- El landing cliente desktop envia correos reales a waitlist.
- El landing cliente mobile envia correos reales a waitlist.
- Negocio desde modal desktop/mobile envia correos reales y queda instrumentado.
- `/negocios` captura leads de negocio de verdad.
- Se recupera `loading`, `success`, `already`, `error` en todas las superficies publicas.
- Todos los formularios publicos tienen honeypot.
- Los footers de contacto son clicables y llevan a rutas reales.
- Los links legales usan `/ayuda/es/articulo/...`.
- Hay `page_view` en `/` y `/negocios`.
- Hay `waitlist_submit` y `download_click` donde corresponde.
- `DesktopCongratsModal` deja de depender de un invite link hardcoded.
- No se modifica la infraestructura base (`waitlistApi`, `prelaunchSystem`, `prelaunchObservability`) salvo necesidad real.

## Decisiones importantes

## 1. No duplicar backend

No crear un endpoint nuevo para capturar leads de landing si `submitWaitlistSignup` ya cubre el caso.

## 2. No duplicar soporte/legal

No recrear forms de soporte y legal dentro del landing si ya existen `SupportRequestPage` y `FeedbackPage`.

## 3. Mantener continuidad de naming donde aporte

Si hay dashboards o comparativas historicas, conviene:

- mantener `source: "landing_waitlist"` para cliente
- mantener `source: "landing_business_modal"` y `source: "landing_business_modal_mobile"` donde ya existen
- usar props de observabilidad para distinguir `tree` y `surface`

## 4. Separar UI de control

La nueva arquitectura esta mas fragmentada en componentes visuales. Si se mete logica de red en cada boton y modal por separado, se va a degradar rapido. La migracion correcta es con controller compartido y componentes presentacionales.

## Conclusiones practicas

La rama legacy no aporta un layout reutilizable. Aporta una lista muy clara de capacidades que el funnel nuevo todavia necesita recuperar:

- submit real
- tracking real
- feedback real
- enlaces reales
- metadata real
- continuidad entre cliente, negocio, ayuda y soporte

La rama nueva ya tiene la base correcta para hacerlo sin tocar backend:

- observabilidad bootstrap
- API de waitlist
- API de soporte
- rutas nuevas de ayuda/legal

Lo faltante es volver a cablear esa logica sobre los componentes nuevos.
