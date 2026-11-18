# PWA principal · Layouts

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/layouts/footer/BottomNavBase.jsx`](../../../apps/referidos-app/src/layouts/footer/BottomNavBase.jsx#L1)
- [`apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx`](../../../apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx#L1)
- [`apps/referidos-app/src/layouts/header-elements/index.js`](../../../apps/referidos-app/src/layouts/header-elements/index.js#L1)
- [`apps/referidos-app/src/layouts/header-elements/TabTitle.jsx`](../../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx#L1)
- [`apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx`](../../../apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx#L1)
- [`apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx`](../../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx#L1)
- [`apps/referidos-app/src/layouts/header-panels/index.js`](../../../apps/referidos-app/src/layouts/header-panels/index.js#L1)
- [`apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L1)
- [`apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx#L1)
- [`apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx#L1)
- [`apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx#L1)
- [`apps/referidos-app/src/layouts/MainLayout.jsx`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/layouts/footer/BottomNavBase.jsx`](../../../apps/referidos-app/src/layouts/footer/BottomNavBase.jsx#L1)

Proporciona botones y disposición de navegación inferior que pueden configurar diferentes roles.

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx`](../../../apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx#L1)

Agrupa los botones disponibles en la cabecera y emite sus acciones al contenedor.

**Superficie que exporta.** [`HeaderActions`](../../../apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-elements/index.js#L2) (reexporta HeaderActions).

**Dependencias del archivo.** `lucide-react`.

#### [`HeaderActions`](../../../apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx#L3) · componente React · exportación por defecto

Monta `button`, `MapPin`, `Bell`, `Timer`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onToggleLocation, locationOpen, locationPanel, onToggleNotifications, notificationsOpen, notificationsPanel, onToggleQueue, queueOpen, queuePanel, notiCount}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `MapPin`, `Bell`, `Timer`.

### [`apps/referidos-app/src/layouts/header-elements/index.js`](../../../apps/referidos-app/src/layouts/header-elements/index.js#L1)

Punto de importación público de `header-elements`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Reexporta.** `UserIdentity` de [`default`](../../../apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx), `HeaderActions` de [`default`](../../../apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx), `TabTitle` de [`default`](../../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx).

**Módulos que lo cargan.** [`NegocioHeader.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L8) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/layouts/header-elements/TabTitle.jsx`](../../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx#L1)

Muestra el título de la pestaña o sección que el contexto de rol seleccionó.

**Superficie que exporta.** [`TabTitle`](../../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx#L1).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-elements/index.js#L3) (reexporta TabTitle).

#### [`TabTitle`](../../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, action}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L132) (renderiza).

### [`apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx`](../../../apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx#L1)

Dibuja nombre, imagen y otros elementos de identidad en cabecera.

**Superficie que exporta.** [`UserIdentity`](../../../apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-elements/index.js#L1) (reexporta UserIdentity).

**Dependencias del archivo.** `react-router-dom`.

#### [`UserIdentity`](../../../apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx#L3) · componente React · exportación por defecto

Monta `Link`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{profilePath, avatarSrc, tier, displayName}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`, `img`.

### [`apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx`](../../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx#L1)

Proporciona la estructura visual para que los paneles se monten con dimensiones y separación consistentes.

**Superficie que exporta.** [`HeaderPanelContainer`](../../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-panels/index.js#L1) (reexporta HeaderPanelContainer).

**Dependencias del archivo.** `react`.

#### [`HeaderPanelContainer`](../../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx#L3) · componente React · exportación por defecto

Monta `Wrapper`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, wrapperClassName, panelClassName, panelProps, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Wrapper`.
- **Lo usa** [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L201) (renderiza), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1882) (renderiza).

### [`apps/referidos-app/src/layouts/header-panels/index.js`](../../../apps/referidos-app/src/layouts/header-panels/index.js#L1)

Punto de importación público de `header-panels`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Reexporta.** `HeaderPanelContainer` de [`default`](../../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx), `LocationPanel` de [`default`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx), `NotificationsPanel` de [`default`](../../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx), `QueuePanel` de [`default`](../../../apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx), `SearchbarPanel` de [`default`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx).

**Módulos que lo cargan.** [`NegocioHeader.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L4) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L43) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L1)

Expone opciones de ubicación dentro de la cabecera y pasa las callbacks al panel activo.

**Superficie que exporta.** [`LocationPanel`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L4).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-panels/index.js#L2) (reexporta LocationPanel).

**Dependencias del archivo.** `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx).

#### [`LocationPanel`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L4) · componente React · exportación por defecto

Monta `Badge`, `button`, `Pencil`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locations, open, onEditLocation, onViewAll}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Badge`, `button`, `Pencil`.
- **Usa código de** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`safeLocations.map`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L26).

#### [`button.onClick`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L36) · callback JSX · dentro de [`LocationPanel`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onEditLocation`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L36).

#### [`button.onClick`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L47) · callback JSX · dentro de [`LocationPanel`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onViewAll`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L47).

### [`apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx#L1)

Muestra la superficie de notificaciones como panel de cabecera.

**Superficie que exporta.** [`NotificationsPanel`](../../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx#L1).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-panels/index.js#L3) (reexporta NotificationsPanel).

#### [`NotificationsPanel`](../../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx#L1) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{notifications}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Llamadas directas en el cuerpo** [`notifications.map`](../../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx#L11).
- **Lo usa** [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L256) (renderiza).

### [`apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx#L1)

Presenta el estado de cola de soporte en la cabecera y sus acciones.

**Superficie que exporta.** [`QueuePanel`](../../../apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx#L1).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-panels/index.js#L4) (reexporta QueuePanel).

#### [`QueuePanel`](../../../apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.

### [`apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx#L1)

Coloca la barra o controles de búsqueda dentro de la superficie de cabecera.

**Superficie que exporta.** [`SearchbarPanel`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/layouts/header-panels/index.js#L5) (reexporta SearchbarPanel).

**Dependencias del archivo.** [`../../search/SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx).

#### [`SearchbarPanel`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx#L3) · componente React · exportación por defecto

Monta `SearchBar`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange, onFilters, onFocus, onCancel, showBack, autoFocus}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchBar`.
- **Usa código de** [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3) (renderiza).
- **Lo usa** [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1899) (renderiza).

### [`apps/referidos-app/src/layouts/MainLayout.jsx`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L1)

Agrupa el shell general en los consumidores que no montan un layout de rol especializado.

**Superficie que exporta.** [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L10).

**Dependencias del archivo.** `react`, [`../components/header/Header`](../../../apps/referidos-app/src/components/header/Header.jsx), [`../components/footer/Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx), [`../components/menus/MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx), [`../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`HEADER_COLLAPSED_HEIGHT`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L8) · variable de módulo

Declara `HEADER_COLLAPSED_HEIGHT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L16) (referencia).

#### [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L10) · componente React · exportación por defecto

Monta `Header`, `Footer`, `MenuLateral`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`, `logout mediante useAppStore`, `selector s.logout`, `[headerHeight, setHeaderHeight] mediante useState`, `[menuOpen, setMenuOpen] mediante useState`.
- **Interfaz que monta** `Header`, `Footer`, `MenuLateral`.
- **Hooks que llama** `useAppStore`, `useState`.
- **Condiciones que evalúa** `bootstrap o undefined`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16) (renderiza), [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L10) (renderiza), [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L7) (renderiza).

#### [`handleHeaderHeight`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L19) · callback React · dentro de [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L10)

Atiende `Header.onHeaderHeightChange` y aplica la acción vinculada a ese control.

- **Entradas** `h`.
- **Recibe eventos de** `Header.onHeaderHeightChange`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setHeaderHeight`.
- **Llamadas directas en el cuerpo** [`setHeaderHeight`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L20).
- **Lo usa** [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L40) (pasa a onHeaderHeightChange).

#### [`Header.onOpenMenu`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L41) · callback JSX · dentro de [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L10)

Responde al evento de interfaz `Header.onOpenMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMenuOpen`.
- **Llamadas directas en el cuerpo** [`setMenuOpen`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L41).

#### [`MenuLateral.onClose`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L76) · callback JSX · dentro de [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L10)

Responde al evento de interfaz `MenuLateral.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMenuOpen`.
- **Llamadas directas en el cuerpo** [`setMenuOpen`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L76).
