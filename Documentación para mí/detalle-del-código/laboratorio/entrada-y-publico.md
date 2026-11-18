# Laboratorio web · Entradas y código público

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-pwa/public/app-config.js`](../../../apps/referidos-pwa/public/app-config.js#L1)
- [`apps/referidos-pwa/src/App.jsx`](../../../apps/referidos-pwa/src/App.jsx#L1)
- [`apps/referidos-pwa/src/main.jsx`](../../../apps/referidos-pwa/src/main.jsx#L1)
- [`apps/referidos-pwa/src/routes.jsx`](../../../apps/referidos-pwa/src/routes.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-pwa/public/app-config.js`](../../../apps/referidos-pwa/public/app-config.js#L1)

Inicializa la configuración pública del laboratorio web.

#### Acciones al cargar el módulo

- **Actualizaciones de estado o acciones** `window.__REFERIDOS_RUNTIME_CONFIG__`.

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-pwa/src/App.jsx`](../../../apps/referidos-pwa/src/App.jsx#L1)

Monta la tabla de rutas dentro de Suspense y ofrece el estado de carga.

**Superficie que exporta.** [`App`](../../../apps/referidos-pwa/src/App.jsx#L12).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/referidos-pwa/src/main.jsx#L5) (importa).

**Dependencias del archivo.** `react`, [`./routes`](../../../apps/referidos-pwa/src/routes.jsx).

#### [`LoadingScreen`](../../../apps/referidos-pwa/src/App.jsx#L4) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`App`](../../../apps/referidos-pwa/src/App.jsx#L14) (renderiza).

#### [`App`](../../../apps/referidos-pwa/src/App.jsx#L12) · componente React · exportación por defecto

Monta `Suspense`, `LoadingScreen`, `AppRoutes`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Suspense`, `LoadingScreen`, `AppRoutes`.
- **Usa código de** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L14) (renderiza).
- **Lo usa** [`main.jsx`](../../../apps/referidos-pwa/src/main.jsx#L28) (renderiza).

### [`apps/referidos-pwa/src/main.jsx`](../../../apps/referidos-pwa/src/main.jsx#L1)

Monta React con BrowserRouter y gestiona registro PWA según el entorno.

**Dependencias del archivo.** `react`, `react-dom/client`, `react-router-dom`, `virtual:pwa-register`, [`./App`](../../../apps/referidos-pwa/src/App.jsx).

#### Acciones al cargar el módulo

- **Interfaz que monta** `React.StrictMode`, `BrowserRouter`, `App`.
- **Efectos y APIs** `navigator.serviceWorker.getRegistrations`.
- **Condiciones que evalúa** `import.meta.env.PROD y ausencia de isLocalDevHost`, `serviceWorker`.
- **Usa código de** [`App`](../../../apps/referidos-pwa/src/App.jsx#L12) (renderiza).
- **Llamadas directas en el cuerpo** [`registerSW`](../../../apps/referidos-pwa/src/main.jsx#L16), [`then`](../../../apps/referidos-pwa/src/main.jsx#L18), [`navigator.serviceWorker.getRegistrations`](../../../apps/referidos-pwa/src/main.jsx#L18), [`registrations.forEach`](../../../apps/referidos-pwa/src/main.jsx#L19), [`registration.unregister`](../../../apps/referidos-pwa/src/main.jsx#L20), [`render`](../../../apps/referidos-pwa/src/main.jsx#L25), [`ReactDOM.createRoot`](../../../apps/referidos-pwa/src/main.jsx#L25), [`document.getElementById`](../../../apps/referidos-pwa/src/main.jsx#L25).

#### [`isLocalDevHost`](../../../apps/referidos-pwa/src/main.jsx#L10) · variable de módulo

Declara `isLocalDevHost` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`window.location.hostname.endsWith`](../../../apps/referidos-pwa/src/main.jsx#L13).
- **Lo usa** [`main.jsx`](../../../apps/referidos-pwa/src/main.jsx#L15) (referencia).

### [`apps/referidos-pwa/src/routes.jsx`](../../../apps/referidos-pwa/src/routes.jsx#L1)

Define rutas funcionales de maqueta, carga diferida y fallback a la bienvenida.

**Superficie que exporta.** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L14).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-pwa/src/App.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`.

#### [`AuthEntry`](../../../apps/referidos-pwa/src/routes.jsx#L4) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AuthEntry`](../../../apps/referidos-pwa/src/pages/AuthEntry.jsx#L4) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-pwa/src/routes.jsx#L4).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L17) (renderiza).

#### [`PruebaPage`](../../../apps/referidos-pwa/src/routes.jsx#L5) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`PruebaPage`](../../../apps/referidos-pwa/src/pages/PruebaPage.jsx#L295) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-pwa/src/routes.jsx#L5).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L19) (renderiza).

#### [`Prueba1Page`](../../../apps/referidos-pwa/src/routes.jsx#L6) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`Prueba1Page`](../../../apps/referidos-pwa/src/pages/Prueba1Page.jsx#L295) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-pwa/src/routes.jsx#L6).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L20) (renderiza).

#### [`Prueba2Page`](../../../apps/referidos-pwa/src/routes.jsx#L7) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`Prueba2Page`](../../../apps/referidos-pwa/src/pages/Prueba2Page.jsx#L295) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-pwa/src/routes.jsx#L7).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L21) (renderiza).

#### [`Prueba3Page`](../../../apps/referidos-pwa/src/routes.jsx#L8) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`Prueba3Page`](../../../apps/referidos-pwa/src/pages/Prueba3Page.jsx#L295) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-pwa/src/routes.jsx#L8).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L22) (renderiza).

#### [`Prueba4Page`](../../../apps/referidos-pwa/src/routes.jsx#L9) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`Prueba4Page`](../../../apps/referidos-pwa/src/pages/Prueba4Page.jsx#L295) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-pwa/src/routes.jsx#L9).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L23) (renderiza).

#### [`NegocioCrearPromoPage`](../../../apps/referidos-pwa/src/routes.jsx#L10) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`NegocioCrearPromoPage`](../../../apps/referidos-pwa/src/pages/NegocioCrearPromoPage.jsx#L347) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-pwa/src/routes.jsx#L10).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L26) (renderiza).

#### [`AppRoutes`](../../../apps/referidos-pwa/src/routes.jsx#L14) · componente React · exportación por defecto

Monta `Routes`, `Route`, `AuthEntry`, `PruebaPage`, `Prueba1Page`, `Prueba2Page` y decide qué vista queda asociada a cada entrada de navegación.

**Entradas de navegación**

- `/` → `AuthEntry` ([línea 17](../../../apps/referidos-pwa/src/routes.jsx#L17))
- `/auth` → `AuthEntry` ([línea 18](../../../apps/referidos-pwa/src/routes.jsx#L18))
- `/prueba` → `PruebaPage` ([línea 19](../../../apps/referidos-pwa/src/routes.jsx#L19))
- `/prueba1` → `Prueba1Page` ([línea 20](../../../apps/referidos-pwa/src/routes.jsx#L20))
- `/prueba2` → `Prueba2Page` ([línea 21](../../../apps/referidos-pwa/src/routes.jsx#L21))
- `/prueba3` → `Prueba3Page` ([línea 22](../../../apps/referidos-pwa/src/routes.jsx#L22))
- `/prueba4` → `Prueba4Page` ([línea 23](../../../apps/referidos-pwa/src/routes.jsx#L23))
- `/negocio/panel/crear-promo` → `NegocioCrearPromoPage` ([línea 24](../../../apps/referidos-pwa/src/routes.jsx#L24))
- `*` → `Navigate` ([línea 28](../../../apps/referidos-pwa/src/routes.jsx#L28))

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Routes`, `Route`, `AuthEntry`, `PruebaPage`, `Prueba1Page`, `Prueba2Page`, `Prueba3Page`, `Prueba4Page`, `NegocioCrearPromoPage`, `Navigate`.
- **Lo usa** [`App`](../../../apps/referidos-pwa/src/App.jsx#L15) (renderiza).
