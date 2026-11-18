# Prelaunch · Entradas y código público

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/public/app-config.js`](../../../apps/prelaunch/public/app-config.js#L1)
- [`apps/prelaunch/src/main.jsx`](../../../apps/prelaunch/src/main.jsx#L1)

## Símbolos y conexiones

### [`apps/prelaunch/public/app-config.js`](../../../apps/prelaunch/public/app-config.js#L1)

Punto de inicialización público del objeto de configuración de Prelaunch. El cliente elige el backend y release a partir de él.

#### Acciones al cargar el módulo

- **Actualizaciones de estado o acciones** `window.__PRELAUNCH_RUNTIME_CONFIG__`.

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/prelaunch/src/main.jsx`](../../../apps/prelaunch/src/main.jsx#L1)

Monta React, Router, TreeProvider y las rutas vigentes. Inicia observabilidad en idle y define qué pantallas se incluyen solo en dev.

**Dependencias del archivo.** `react`, `react-dom/client`, `react-router-dom`, [`./config/runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js), [`./UI-detect/TreeProvider`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx), [`./waitlist-landing/WaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx).

#### Acciones al cargar el módulo

**Entradas de navegación**

- `/` → `WaitlistLandingPage` ([línea 50](../../../apps/prelaunch/src/main.jsx#L50))
- `/components` → `ComponentsPlaygroundPage` ([línea 52](../../../apps/prelaunch/src/main.jsx#L52))
- `/negocios` → `BusinessLandingPage` ([línea 55](../../../apps/prelaunch/src/main.jsx#L55))
- `/ayuda/es` → `HelpCenterPage` ([línea 57](../../../apps/prelaunch/src/main.jsx#L57))
- `/ayuda/es/categoria/:category` → `HelpCenterCategoryPage` ([línea 58](../../../apps/prelaunch/src/main.jsx#L58))
- `/ayuda/es/articulo/:doc` → `HelpCenterArticlePage` ([línea 59](../../../apps/prelaunch/src/main.jsx#L59))
- `/soporte/abrir-ticket` → `SupportOpenTicketPage` ([línea 60](../../../apps/prelaunch/src/main.jsx#L60))
- `/soporte-chat` → `Navigate` ([línea 61](../../../apps/prelaunch/src/main.jsx#L61))
- `/soporte-correo` → `Navigate` ([línea 65](../../../apps/prelaunch/src/main.jsx#L65))
- `/feedback` → `FeedbackRoute` ([línea 69](../../../apps/prelaunch/src/main.jsx#L69))
- `/ayuda/*` → `Navigate` ([línea 70](../../../apps/prelaunch/src/main.jsx#L70))
- `/ayuda-negocios/*` → `Navigate` ([línea 71](../../../apps/prelaunch/src/main.jsx#L71))
- `*` → `Navigate` ([línea 72](../../../apps/prelaunch/src/main.jsx#L72))

- **Interfaz que monta** `React.StrictMode`, `TreeProvider`, `BrowserRouter`, `Suspense`, `Routes`, `Route`, `WaitlistLandingPage`, `ComponentsPlaygroundPage`, `BusinessLandingPage`, `HelpCenterPage`, `HelpCenterCategoryPage`, `HelpCenterArticlePage`, `SupportOpenTicketPage`, `Navigate`, `FeedbackRoute`.
- **Usa código de** [`TreeProvider`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L8) (renderiza), [`WaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L5) (renderiza), [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Llamadas directas en el cuerpo** [`startPrelaunchObservability`](../../../apps/prelaunch/src/main.jsx#L42), [`render`](../../../apps/prelaunch/src/main.jsx#L44), [`ReactDOM.createRoot`](../../../apps/prelaunch/src/main.jsx#L44), [`document.getElementById`](../../../apps/prelaunch/src/main.jsx#L44).

#### [`HelpCenterPage`](../../../apps/prelaunch/src/main.jsx#L9) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`HelpCenterPage`](../../../apps/prelaunch/src/legal/HelpCenterPage.jsx#L3) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/main.jsx#L9).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L57) (renderiza).

#### [`HelpCenterCategoryPage`](../../../apps/prelaunch/src/main.jsx#L10) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`HelpCenterCategoryPage`](../../../apps/prelaunch/src/legal/HelpCenterCategoryPage.jsx#L3) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/main.jsx#L10).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L58) (renderiza).

#### [`HelpCenterArticlePage`](../../../apps/prelaunch/src/main.jsx#L11) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`HelpCenterArticlePage`](../../../apps/prelaunch/src/legal/HelpCenterArticlePage.jsx#L3) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/main.jsx#L11).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L59) (renderiza).

#### [`SupportOpenTicketPage`](../../../apps/prelaunch/src/main.jsx#L12) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`SupportOpenTicketPage`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L4) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/main.jsx#L12).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L60) (renderiza).

#### [`FeedbackRoute`](../../../apps/prelaunch/src/main.jsx#L13) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`FeedbackRoute`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/main.jsx#L13).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L69) (renderiza).

#### [`BusinessLandingPage`](../../../apps/prelaunch/src/main.jsx#L14) · variable de módulo

Declara `BusinessLandingPage` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`BusinessLandingPage`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L4) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/main.jsx#L15).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L54) (referencia).

#### [`ComponentsPlaygroundPage`](../../../apps/prelaunch/src/main.jsx#L17) · variable de módulo

Declara `ComponentsPlaygroundPage` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`ComponentsPlaygroundPage`](../../../apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx#L3) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/main.jsx#L18).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L51) (referencia).

#### [`startPrelaunchObservability`](../../../apps/prelaunch/src/main.jsx#L21) · función

Inicia `Prelaunch Observability` y prepara sus dependencias.

- **Efectos y APIs** `window.requestIdleCallback`, `window.setTimeout`.
- **Condiciones que evalúa** `undefined`, `requestIdleCallback`.
- **Llamadas directas en el cuerpo** [`window.requestIdleCallback`](../../../apps/prelaunch/src/main.jsx#L35), [`window.setTimeout`](../../../apps/prelaunch/src/main.jsx#L39).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L42) (llama).

#### [`boot`](../../../apps/prelaunch/src/main.jsx#L26) · función · dentro de [`startPrelaunchObservability`](../../../apps/prelaunch/src/main.jsx#L21)

Función auxiliar de `startPrelaunchObservability` para `boot`.

- **Usa código de** [`Módulo`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L1) (carga diferida).
- **Llamadas directas en el cuerpo** [`catch`](../../../apps/prelaunch/src/main.jsx#L27), [`then`](../../../apps/prelaunch/src/main.jsx#L27), [`initPrelaunchObservability`](../../../apps/prelaunch/src/main.jsx#L29).
- **Lo usa** [`startPrelaunchObservability`](../../../apps/prelaunch/src/main.jsx#L35) (referencia).
