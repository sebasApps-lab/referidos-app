# PWA principal · Entradas y código público

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/public/app-config.js`](../../../apps/referidos-app/public/app-config.js#L1)
- [`apps/referidos-app/public/service-worker.js`](../../../apps/referidos-app/public/service-worker.js#L1)
- [`apps/referidos-app/src/App.jsx`](../../../apps/referidos-app/src/App.jsx#L1)
- [`apps/referidos-app/src/main.jsx`](../../../apps/referidos-app/src/main.jsx#L1)
- [`apps/referidos-app/src/routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/public/app-config.js`](../../../apps/referidos-app/public/app-config.js#L1)

Configuración pública que el HTML carga antes de React para escoger valores de runtime. El workflow puede generar el objeto final del despliegue.

#### Acciones al cargar el módulo

- **Actualizaciones de estado o acciones** `window.__REFERIDOS_RUNTIME_CONFIG__`.

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/public/service-worker.js`](../../../apps/referidos-app/public/service-worker.js#L1)

Worker manual versionado como recurso público. Registra eventos de ciclo de vida o red según este archivo. La integración PWA que usa Vite se configura por separado.

#### Acciones al cargar el módulo

- **Efectos y APIs** `self.addEventListener`.
- **Llamadas directas en el cuerpo** [`self.addEventListener`](../../../apps/referidos-app/public/service-worker.js#L14).

#### [`CACHE_NAME`](../../../apps/referidos-app/public/service-worker.js#L4) · variable de módulo

Declara `CACHE_NAME` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`addEventListener · callback`](../../../apps/referidos-app/public/service-worker.js#L16) (referencia), [`addEventListener · callback`](../../../apps/referidos-app/public/service-worker.js#L41) (referencia).

#### [`URLS_TO_CACHE`](../../../apps/referidos-app/public/service-worker.js#L7) · variable de módulo

Conserva la lista de `URLS TO CACHE` usada por el módulo.

- **Lo usa** [`addEventListener · callback`](../../../apps/referidos-app/public/service-worker.js#L17) (referencia).

#### [`addEventListener · callback`](../../../apps/referidos-app/public/service-worker.js#L14) · callback de infraestructura

Recibe eventos de la suscripción o listener registrado por `el módulo`.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.waitUntil`](../../../apps/referidos-app/public/service-worker.js#L15), [`then`](../../../apps/referidos-app/public/service-worker.js#L16), [`caches.open`](../../../apps/referidos-app/public/service-worker.js#L16), [`cache.addAll`](../../../apps/referidos-app/public/service-worker.js#L17).

#### [`addEventListener · callback`](../../../apps/referidos-app/public/service-worker.js#L23) · callback de infraestructura

Recibe eventos de la suscripción o listener registrado por `el módulo`.

- **Entradas** `event`.
- **Efectos y APIs** `solicitud HTTP por fetch`.
- **Condiciones que evalúa** `response`.
- **Llamadas directas en el cuerpo** [`event.respondWith`](../../../apps/referidos-app/public/service-worker.js#L24), [`then`](../../../apps/referidos-app/public/service-worker.js#L25), [`caches.match`](../../../apps/referidos-app/public/service-worker.js#L25), [`fetch`](../../../apps/referidos-app/public/service-worker.js#L30).

#### [`addEventListener · callback`](../../../apps/referidos-app/public/service-worker.js#L36) · callback de infraestructura

Recibe eventos de la suscripción o listener registrado por `el módulo`.

- **Entradas** `event`.
- **Condiciones que evalúa** `key`.
- **Llamadas directas en el cuerpo** [`event.waitUntil`](../../../apps/referidos-app/public/service-worker.js#L37), [`then`](../../../apps/referidos-app/public/service-worker.js#L38), [`caches.keys`](../../../apps/referidos-app/public/service-worker.js#L38), [`names.map`](../../../apps/referidos-app/public/service-worker.js#L40), [`caches.delete`](../../../apps/referidos-app/public/service-worker.js#L42).

### [`apps/referidos-app/src/App.jsx`](../../../apps/referidos-app/src/App.jsx#L1)

Coordina bootstrap y telemetría, monta los modales, captura fallos React y permite que Suspense cubra las rutas diferidas.

**Superficie que exporta.** [`App`](../../../apps/referidos-app/src/App.jsx#L37).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/referidos-app/src/main.jsx#L5) (importa).

**Dependencias del archivo.** `react`, [`./store/appStore`](../../../apps/referidos-app/src/store/appStore.js), `react-router-dom`, [`./router/guards/pwaGuard`](../../../apps/referidos-app/src/router/guards/pwaGuard.js), [`./routes`](../../../apps/referidos-app/src/routes.jsx), [`./modals/ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx), [`./hooks/useBootstrapAuth`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js), [`./hooks/useAppLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js), [`./components/errors/AppErrorBoundary`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx), [`./errors/ErrorRuntimeBridge`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx).

#### [`PwaGuardWrapper`](../../../apps/referidos-app/src/App.jsx#L13) · función

Observa el estado de usuario y la ubicación, y delega la redirección del contexto PWA a pwaGuard. Es el puente entre la navegación instalada y el árbol React.

- **Entradas** `{children}`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`.
- **Hooks que llama** `useAppStore`, `useLocation`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Lo usa** [`App`](../../../apps/referidos-app/src/App.jsx#L46) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/App.jsx#L19) · callback de infraestructura · dentro de [`PwaGuardWrapper`](../../../apps/referidos-app/src/App.jsx#L13)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PwaGuardWrapper`.

- **Efectos y APIs** `window.location.replace`.
- **Condiciones que evalúa** `bootstrap`, `redir`, `import.meta.env.DEV`.
- **Usa código de** [`pwaGuard`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L16) (llama), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (accede al módulo).
- **Llamadas directas en el cuerpo** [`pwaGuard`](../../../apps/referidos-app/src/App.jsx#L22), [`useAppStore.getState`](../../../apps/referidos-app/src/App.jsx#L24), [`window.location.replace`](../../../apps/referidos-app/src/App.jsx#L28).

#### [`App`](../../../apps/referidos-app/src/App.jsx#L37) · componente React · exportación por defecto

Monta el límite de errores, los proveedores globales y el router. Ejecuta el arranque de sesión y el logger una vez por ciclo de montaje.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AppErrorBoundary`, `ErrorRuntimeBridge`, `ModalProvider`, `PwaGuardWrapper`, `Suspense`, `AppRoutes`.
- **Hooks que llama** `useBootstrapAuth`, `useAppLogger`.
- **Usa código de** [`useBootstrapAuth`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L10) (llama), [`useAppLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L21) (llama), [`AppErrorBoundary`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L4) (renderiza), [`ErrorRuntimeBridge`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L5) (renderiza), [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7) (renderiza), [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L60) (renderiza).
- **Lo usa** [`main.jsx`](../../../apps/referidos-app/src/main.jsx#L33) (renderiza).

### [`apps/referidos-app/src/main.jsx`](../../../apps/referidos-app/src/main.jsx#L1)

Arranca React y BrowserRouter, carga estilos compartidos y registra el worker del plugin en hosts productivos.

**Dependencias del archivo.** `react`, `react-dom/client`, `react-router-dom`, [`./App`](../../../apps/referidos-app/src/App.jsx), `virtual:pwa-register`.

#### Acciones al cargar el módulo

- **Interfaz que monta** `React.StrictMode`, `BrowserRouter`, `App`.
- **Efectos y APIs** `navigator.serviceWorker.getRegistrations`.
- **Condiciones que evalúa** `import.meta.env.PROD y ausencia de isLocalDevHost`, `serviceWorker`.
- **Usa código de** [`App`](../../../apps/referidos-app/src/App.jsx#L37) (renderiza).
- **Llamadas directas en el cuerpo** [`registerSW`](../../../apps/referidos-app/src/main.jsx#L21), [`then`](../../../apps/referidos-app/src/main.jsx#L23), [`navigator.serviceWorker.getRegistrations`](../../../apps/referidos-app/src/main.jsx#L23), [`registrations.forEach`](../../../apps/referidos-app/src/main.jsx#L24), [`registration.unregister`](../../../apps/referidos-app/src/main.jsx#L25), [`render`](../../../apps/referidos-app/src/main.jsx#L30), [`ReactDOM.createRoot`](../../../apps/referidos-app/src/main.jsx#L30), [`document.getElementById`](../../../apps/referidos-app/src/main.jsx#L30).

#### [`isLocalDevHost`](../../../apps/referidos-app/src/main.jsx#L15) · variable de módulo

Declara `isLocalDevHost` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`window.location.hostname.endsWith`](../../../apps/referidos-app/src/main.jsx#L18).
- **Lo usa** [`main.jsx`](../../../apps/referidos-app/src/main.jsx#L20) (referencia).

### [`apps/referidos-app/src/routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L1)

Declara el árbol navegable y enlaza guard, layout y pantalla. Usa las rutas de aquí para distinguir wrappers históricos y entradas vigentes.

**Superficie que exporta.** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L60).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`./router/guards/RequireAuth`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx), [`./router/guards/RequireRole`](../../../apps/referidos-app/src/router/guards/RequireRole.jsx), [`./cliente/layout/ClienteLayout`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`./negocio/layout/NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`./cliente/views/ClienteInicioView`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx), [`./cliente/views/ClienteEscanerView`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx), [`./cliente/views/ClienteHistorialView`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx), [`./cliente/views/ClientePerfilView`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx), [`./negocio/views/NegocioInicioView`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx), [`./negocio/views/NegocioEscanerView`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx), [`./negocio/views/NegocioGestionarView`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx), [`./negocio/views/NegocioPerfilView`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx), [`@referidos/support-sdk/agent/SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx), [`@referidos/support-sdk/agent/SupportInicio`](../../../packages/support-sdk/src/agent/SupportInicio.jsx), [`@referidos/support-sdk/agent/SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx), [`@referidos/support-sdk/agent/SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx) y 9 más.

#### [`AuthEntry`](../../../apps/referidos-app/src/routes.jsx#L33) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AuthEntry`](../../../apps/referidos-app/src/pages/AuthEntry.jsx#L4) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L33).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L64) (renderiza).

#### [`AppGate`](../../../apps/referidos-app/src/routes.jsx#L34) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AppGate`](../../../apps/referidos-app/src/pages/AppGate.jsx#L31) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L34).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L64) (renderiza).

#### [`LandingPage`](../../../apps/referidos-app/src/routes.jsx#L35) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L103) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L35).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L66) (renderiza).

#### [`LegalRouter`](../../../apps/referidos-app/src/routes.jsx#L36) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`LegalRouter`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L17) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L36).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L70) (renderiza).

#### [`AdminInicio`](../../../apps/referidos-app/src/routes.jsx#L38) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminInicio`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L9) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L38).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L117) (renderiza).

#### [`AdminUsuarios`](../../../apps/referidos-app/src/routes.jsx#L39) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminUsuarios`](../../../apps/referidos-app/src/pages/admin/AdminUsuarios.jsx#L6) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L39).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L127) (renderiza).

#### [`AdminNegocios`](../../../apps/referidos-app/src/routes.jsx#L40) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminNegocios`](../../../apps/referidos-app/src/pages/admin/AdminNegocios.jsx#L6) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L40).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L137) (renderiza).

#### [`AdminPromos`](../../../apps/referidos-app/src/routes.jsx#L41) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminPromos`](../../../apps/referidos-app/src/pages/admin/AdminPromos.jsx#L6) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L41).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L147) (renderiza).

#### [`AdminQRs`](../../../apps/referidos-app/src/routes.jsx#L42) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminQRs`](../../../apps/referidos-app/src/pages/admin/AdminQRs.jsx#L6) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L42).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L157) (renderiza).

#### [`AdminReportes`](../../../apps/referidos-app/src/routes.jsx#L43) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminReportes`](../../../apps/referidos-app/src/pages/admin/AdminReportes.jsx#L6) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L43).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L167) (renderiza).

#### [`AdminLogs`](../../../apps/referidos-app/src/routes.jsx#L44) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminLogs`](../../../apps/referidos-app/src/pages/admin/AdminLogs.jsx#L6) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L44).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L177) (renderiza).

#### [`AdminObservability`](../../../apps/referidos-app/src/routes.jsx#L45) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminObservability`](../../../apps/referidos-app/src/pages/admin/AdminObservability.jsx#L8) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L45).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L251) (renderiza).

#### [`AdminDevErrors`](../../../apps/referidos-app/src/routes.jsx#L46) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminDevErrors`](../../../apps/referidos-app/src/pages/admin/AdminDevErrors.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L46).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L285) (renderiza).

#### [`AdminDatos`](../../../apps/referidos-app/src/routes.jsx#L47) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminDatos`](../../../apps/referidos-app/src/pages/admin/AdminDatos.jsx#L6) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L47).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L187) (renderiza).

#### [`AdminApps`](../../../apps/referidos-app/src/routes.jsx#L48) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminApps`](../../../apps/referidos-app/src/pages/admin/AdminApps.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L48).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L197) (renderiza).

#### [`AdminSistema`](../../../apps/referidos-app/src/routes.jsx#L49) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminSistema`](../../../apps/referidos-app/src/pages/admin/AdminSistema.jsx#L7) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L49).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L237) (renderiza).

#### [`AdminDashboard`](../../../apps/referidos-app/src/routes.jsx#L50) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminDashboard`](../../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L50).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L207) (renderiza).

#### [`AdminDashboardAnalytics`](../../../apps/referidos-app/src/routes.jsx#L51) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminDashboardAnalytics`](../../../apps/referidos-app/src/pages/admin/AdminDashboardAnalytics.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L51).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L217) (renderiza).

#### [`AdminDashboardDlqEvents`](../../../apps/referidos-app/src/routes.jsx#L52) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminDashboardDlqEvents`](../../../apps/referidos-app/src/pages/admin/AdminDashboardDlqEvents.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L52).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L227) (renderiza).

#### [`AdminVersioningOverview`](../../../apps/referidos-app/src/routes.jsx#L53) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminVersioningOverview`](../../../apps/referidos-app/src/pages/admin/AdminVersioningOverview.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L53).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L295) (renderiza).

#### [`AdminVersioningReleases`](../../../apps/referidos-app/src/routes.jsx#L54) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminVersioningReleases`](../../../apps/referidos-app/src/pages/admin/AdminVersioningReleases.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L54).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L305) (renderiza).

#### [`AdminDocumentation`](../../../apps/referidos-app/src/routes.jsx#L55) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminDocumentation`](../../../apps/referidos-app/src/pages/admin/AdminDocumentation.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L55).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L315) (renderiza).

#### [`AdminLegal`](../../../apps/referidos-app/src/routes.jsx#L56) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`AdminLegal`](../../../apps/referidos-app/src/pages/admin/AdminLegal.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L56).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L325) (renderiza).

#### [`PromoDetalle`](../../../apps/referidos-app/src/routes.jsx#L58) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/referidos-app/src/routes.jsx#L58).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L430) (renderiza).

#### [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L60) · componente React · exportación por defecto

Monta `Routes`, `Route`, `AppGate`, `AuthEntry`, `LandingPage`, `Navigate` y decide qué vista queda asociada a cada entrada de navegación.

**Entradas de navegación**

- `/` → `AppGate`, `AuthEntry` ([línea 64](../../../apps/referidos-app/src/routes.jsx#L64))
- `/auth` → `AppGate`, `AuthEntry` ([línea 65](../../../apps/referidos-app/src/routes.jsx#L65))
- `/inicio` → `LandingPage` ([línea 66](../../../apps/referidos-app/src/routes.jsx#L66))
- `/privacy` → `Navigate` ([línea 67](../../../apps/referidos-app/src/routes.jsx#L67))
- `/terms` → `Navigate` ([línea 68](../../../apps/referidos-app/src/routes.jsx#L68))
- `/delete-data` → `Navigate` ([línea 69](../../../apps/referidos-app/src/routes.jsx#L69))
- `/legal/:locale/:document` → `LegalRouter` ([línea 70](../../../apps/referidos-app/src/routes.jsx#L70))
- `/app` → `AppGate` ([línea 73](../../../apps/referidos-app/src/routes.jsx#L73))
- `/cliente` → `RequireAuth`, `RequireRole`, `ClienteLayout` ([línea 76](../../../apps/referidos-app/src/routes.jsx#L76))
- `index` → `Navigate` ([línea 86](../../../apps/referidos-app/src/routes.jsx#L86))
- `inicio` → `ClienteInicioView` ([línea 87](../../../apps/referidos-app/src/routes.jsx#L87))
- `escanear` → `ClienteEscanerView` ([línea 88](../../../apps/referidos-app/src/routes.jsx#L88))
- `perfil` → `ClientePerfilView` ([línea 89](../../../apps/referidos-app/src/routes.jsx#L89))
- `historial` → `ClienteHistorialView` ([línea 90](../../../apps/referidos-app/src/routes.jsx#L90))
- `/negocio` → `RequireAuth`, `RequireRole`, `NegocioLayout` ([línea 94](../../../apps/referidos-app/src/routes.jsx#L94))
- `inicio` → `NegocioInicioView` ([línea 105](../../../apps/referidos-app/src/routes.jsx#L105))
- `escanear` → `NegocioEscanerView` ([línea 106](../../../apps/referidos-app/src/routes.jsx#L106))
- `perfil` → `NegocioPerfilView` ([línea 107](../../../apps/referidos-app/src/routes.jsx#L107))
- `gestionar` → `NegocioGestionarView` ([línea 108](../../../apps/referidos-app/src/routes.jsx#L108))
- `/admin/inicio` → `RequireAuth`, `RequireRole`, `AdminInicio` ([línea 112](../../../apps/referidos-app/src/routes.jsx#L112))
- `/admin/usuarios` → `RequireAuth`, `RequireRole`, `AdminUsuarios` ([línea 122](../../../apps/referidos-app/src/routes.jsx#L122))
- `/admin/negocios` → `RequireAuth`, `RequireRole`, `AdminNegocios` ([línea 132](../../../apps/referidos-app/src/routes.jsx#L132))
- `/admin/promos` → `RequireAuth`, `RequireRole`, `AdminPromos` ([línea 142](../../../apps/referidos-app/src/routes.jsx#L142))
- `/admin/qrs` → `RequireAuth`, `RequireRole`, `AdminQRs` ([línea 152](../../../apps/referidos-app/src/routes.jsx#L152))
- `/admin/reportes` → `RequireAuth`, `RequireRole`, `AdminReportes` ([línea 162](../../../apps/referidos-app/src/routes.jsx#L162))
- `/admin/logs` → `RequireAuth`, `RequireRole`, `AdminLogs` ([línea 172](../../../apps/referidos-app/src/routes.jsx#L172))
- `/admin/datos` → `RequireAuth`, `RequireRole`, `AdminDatos` ([línea 182](../../../apps/referidos-app/src/routes.jsx#L182))
- `/admin/apps` → `RequireAuth`, `RequireRole`, `AdminApps` ([línea 192](../../../apps/referidos-app/src/routes.jsx#L192))
- `/admin/dashboard` → `RequireAuth`, `RequireRole`, `AdminDashboard` ([línea 202](../../../apps/referidos-app/src/routes.jsx#L202))
- `/admin/dashboard/analytics` → `RequireAuth`, `RequireRole`, `AdminDashboardAnalytics` ([línea 212](../../../apps/referidos-app/src/routes.jsx#L212))
- `/admin/dashboard/telemetry-dlq` → `RequireAuth`, `RequireRole`, `AdminDashboardDlqEvents` ([línea 222](../../../apps/referidos-app/src/routes.jsx#L222))
- `/admin/sistema` → `RequireAuth`, `RequireRole`, `AdminSistema` ([línea 232](../../../apps/referidos-app/src/routes.jsx#L232))
- `/admin/analytics` → `Navigate` ([línea 242](../../../apps/referidos-app/src/routes.jsx#L242))
- `/admin/issues` → `RequireAuth`, `RequireRole`, `AdminObservability` ([línea 246](../../../apps/referidos-app/src/routes.jsx#L246))
- `/admin/issues/events` → `RequireAuth`, `RequireRole`, `AdminObservability` ([línea 256](../../../apps/referidos-app/src/routes.jsx#L256))
- `/admin/issues/events/details` → `RequireAuth`, `RequireRole`, `AdminObservability` ([línea 266](../../../apps/referidos-app/src/routes.jsx#L266))
- `/admin/observability` → `Navigate` ([línea 276](../../../apps/referidos-app/src/routes.jsx#L276))
- `/admin/error-codes` → `RequireAuth`, `RequireRole`, `AdminDevErrors` ([línea 280](../../../apps/referidos-app/src/routes.jsx#L280))
- `/admin/versionado/global` → `RequireAuth`, `RequireRole`, `AdminVersioningOverview` ([línea 290](../../../apps/referidos-app/src/routes.jsx#L290))
- `/admin/versionado/detalle` → `RequireAuth`, `RequireRole`, `AdminVersioningReleases` ([línea 300](../../../apps/referidos-app/src/routes.jsx#L300))
- `/admin/documentacion` → `RequireAuth`, `RequireRole`, `AdminDocumentation` ([línea 310](../../../apps/referidos-app/src/routes.jsx#L310))
- `/admin/legal` → `RequireAuth`, `RequireRole`, `AdminLegal` ([línea 320](../../../apps/referidos-app/src/routes.jsx#L320))
- `/admin/soporte` → `RequireAuth`, `RequireRole`, `AdminSupportDesk` ([línea 330](../../../apps/referidos-app/src/routes.jsx#L330))
- `/admin/panel-tickets` → `RequireAuth`, `RequireRole`, `AdminSupportTicketsPanel` ([línea 340](../../../apps/referidos-app/src/routes.jsx#L340))
- `/admin/macros` → `RequireAuth`, `RequireRole`, `AdminSupportCatalogPanel` ([línea 350](../../../apps/referidos-app/src/routes.jsx#L350))
- `/admin/macros/categoria/:categoryId` → `RequireAuth`, `RequireRole`, `AdminSupportCatalogPanel` ([línea 360](../../../apps/referidos-app/src/routes.jsx#L360))
- `/admin/macros/:macroId` → `RequireAuth`, `RequireRole`, `AdminSupportCatalogPanel` ([línea 370](../../../apps/referidos-app/src/routes.jsx#L370))
- `/admin/soporte/panel-tickets` → `Navigate` ([línea 380](../../../apps/referidos-app/src/routes.jsx#L380))
- `/admin/soporte/macros` → `Navigate` ([línea 381](../../../apps/referidos-app/src/routes.jsx#L381))
- `/admin/soporte/macros/categoria/:categoryId` → `RequireAuth`, `RequireRole`, `AdminSupportCatalogPanel` ([línea 382](../../../apps/referidos-app/src/routes.jsx#L382))
- `/admin/soporte/macros/:macroId` → `RequireAuth`, `RequireRole`, `AdminSupportCatalogPanel` ([línea 392](../../../apps/referidos-app/src/routes.jsx#L392))
- `/admin/soporte/ticket/:threadId` → `RequireAuth`, `RequireRole`, `AdminSupportTicket` ([línea 402](../../../apps/referidos-app/src/routes.jsx#L402))
- `/admin/asesores` → `RequireAuth`, `RequireRole`, `AdminSupportAgents` ([línea 412](../../../apps/referidos-app/src/routes.jsx#L412))
- `/detalle/:id` → `RequireAuth`, `RequireRole`, `ClienteLayout`, `PromoDetalle` ([línea 424](../../../apps/referidos-app/src/routes.jsx#L424))
- `*` → `Navigate` ([línea 438](../../../apps/referidos-app/src/routes.jsx#L438))
- `/soporte` → `RequireAuth`, `RequireRole`, `SupportLayout` ([línea 441](../../../apps/referidos-app/src/routes.jsx#L441))
- `inicio` → `SupportInicio` ([línea 452](../../../apps/referidos-app/src/routes.jsx#L452))
- `inbox` → `SupportInbox` ([línea 453](../../../apps/referidos-app/src/routes.jsx#L453))
- `jornadas` → `SupportJornadas` ([línea 454](../../../apps/referidos-app/src/routes.jsx#L454))
- `issues` → `SupportIssues` ([línea 455](../../../apps/referidos-app/src/routes.jsx#L455))
- `catalogo-errores` → `SupportErrorCatalog` ([línea 456](../../../apps/referidos-app/src/routes.jsx#L456))
- `error-catalog` → `Navigate` ([línea 457](../../../apps/referidos-app/src/routes.jsx#L457))
- `ticket/:threadId` → `SupportTicket` ([línea 458](../../../apps/referidos-app/src/routes.jsx#L458))
- `irregulares` → `SupportIrregular` ([línea 459](../../../apps/referidos-app/src/routes.jsx#L459))

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Routes`, `Route`, `AppGate`, `AuthEntry`, `LandingPage`, `Navigate`, `LegalRouter`, `RequireAuth`, `RequireRole`, `ClienteLayout`, `ClienteInicioView`, `ClienteEscanerView`, `ClientePerfilView`, `ClienteHistorialView`, `NegocioLayout`, `NegocioInicioView`, `NegocioEscanerView`, `NegocioPerfilView`, `NegocioGestionarView` y 33 más.
- **Usa código de** [`RequireAuth`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx#L6) (renderiza), [`RequireRole`](../../../apps/referidos-app/src/router/guards/RequireRole.jsx#L6) (renderiza), [`ClienteLayout`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L322) (renderiza), [`ClienteInicioView`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L5) (renderiza), [`ClienteEscanerView`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L5) (renderiza), [`ClientePerfilView`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L5) (renderiza), [`ClienteHistorialView`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L5) (renderiza), [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L325) (renderiza), [`NegocioInicioView`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L5) (renderiza), [`NegocioEscanerView`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L5) (renderiza) y 15 más.
- **Lo usa** [`App`](../../../apps/referidos-app/src/App.jsx#L48) (renderiza).
