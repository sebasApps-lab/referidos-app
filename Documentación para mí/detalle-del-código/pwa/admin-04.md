# PWA principal · Admin y operación · 4 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/promos/PromosTable.jsx`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L1)
- [`apps/referidos-app/src/admin/qrs/QRDetalle.jsx`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx#L1)
- [`apps/referidos-app/src/admin/qrs/QRsTable.jsx`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L1)
- [`apps/referidos-app/src/admin/reportes/ReportesTable.jsx`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L1)
- [`apps/referidos-app/src/admin/services/adminUser.js`](../../../apps/referidos-app/src/admin/services/adminUser.js#L1)
- [`apps/referidos-app/src/admin/sistema/FeatureFlags.jsx`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L1)
- [`apps/referidos-app/src/admin/sistema/RegistroCodes.jsx`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L1)
- [`apps/referidos-app/src/admin/support/AdminSupportAgents.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/promos/PromosTable.jsx`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L1)

Presenta promociones, filtros y selección administrativa para inspección y cambios de estado.

**Superficie que exporta.** [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L43).

**Módulos que lo cargan.** [`AdminPromos.jsx`](../../../apps/referidos-app/src/pages/admin/AdminPromos.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx).

#### [`PROMOS`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L7) · variable de módulo

Conserva la lista de el valor de promociones usada por el módulo.

- **Lo usa** [`filtered`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L48) (accede al módulo).

#### [`STATUS_VARIANT`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L37) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `activo`, `pendiente`, `pausado`.
- **Lo usa** [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L119) (accede al módulo).

#### [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L43) · componente React · exportación por defecto

Monta `button`, `Tag`, `Search`, `input`, `Filter`, `select`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`.
- **Interfaz que monta** `button`, `Tag`, `Search`, `input`, `Filter`, `select`, `Table`, `Badge`, `AlertTriangle`.
- **Hooks que llama** `useState`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L111).
- **Lo usa** [`AdminPromos`](../../../apps/referidos-app/src/pages/admin/AdminPromos.jsx#L12) (renderiza).

#### [`filtered`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L47) · cálculo memorizado · dentro de [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L43)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`PROMOS.filter`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L48), [`includes`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L49), [`promo.titulo.toLowerCase`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L49), [`query.toLowerCase`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L51).
- **Lo usa** [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L111) (accede al módulo).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L81) · callback JSX · dentro de [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L81).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L90) · callback JSX · dentro de [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L43)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setStatusFilter`.
- **Llamadas directas en el cuerpo** [`setStatusFilter`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L90).

### [`apps/referidos-app/src/admin/qrs/QRDetalle.jsx`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx#L1)

Presenta datos de un QR seleccionado para que admin revise su estado y acciones.

**Superficie que exporta.** [`QRDetalle`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx#L6).

**Módulos que lo cargan.** [`QRsTable.jsx`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx).

#### [`QRDetalle`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx#L6) · componente React · exportación por defecto

Monta `button`, `Badge`, `Fingerprint`, `ShieldAlert`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, onClose, qr}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `button`, `Badge`, `Fingerprint`, `ShieldAlert`.
- **Condiciones que evalúa** `ausencia de open o ausencia de qr`.
- **Usa código de** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Lo usa** [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L147) (renderiza).

### [`apps/referidos-app/src/admin/qrs/QRsTable.jsx`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L1)

Presenta inventario y filtros de administración QR y conecta el acceso al detalle.

**Superficie que exporta.** [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47).

**Módulos que lo cargan.** [`AdminQRs.jsx`](../../../apps/referidos-app/src/pages/admin/AdminQRs.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./QRDetalle`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx).

#### [`QRS`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L8) · variable de módulo

Conserva la lista de `QRS` usada por el módulo.

- **Lo usa** [`filtered`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L54) (accede al módulo).

#### [`STATUS_VARIANT`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L41) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `valido`, `canjeado`, `expirado`.
- **Lo usa** [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L129) (accede al módulo).

#### [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47) · componente React · exportación por defecto

Monta `button`, `QrCode`, `Search`, `input`, `Filter`, `select`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`, `[selected, setSelected] mediante useState`, `[drawerOpen, setDrawerOpen] mediante useState`.
- **Interfaz que monta** `button`, `QrCode`, `Search`, `input`, `Filter`, `select`, `Table`, `Badge`, `QRDetalle`.
- **Hooks que llama** `useState`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza), [`QRDetalle`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx#L6) (renderiza).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L120).
- **Lo usa** [`AdminQRs`](../../../apps/referidos-app/src/pages/admin/AdminQRs.jsx#L9) (renderiza).

#### [`filtered`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L53) · cálculo memorizado · dentro de [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`QRS.filter`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L54), [`includes`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L55), [`qr.id.toLowerCase`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L55), [`query.toLowerCase`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L55).
- **Lo usa** [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L120) (accede al módulo).

#### [`openDrawer`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L62) · función · dentro de [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47)

Inicia `Drawer` y prepara sus dependencias.

- **Entradas** `qr`.
- **Actualizaciones de estado o acciones** `setSelected`, `setDrawerOpen`.
- **Llamadas directas en el cuerpo** [`setSelected`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L63), [`setDrawerOpen`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L64).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L137) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L90) · callback JSX · dentro de [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L90).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L99) · callback JSX · dentro de [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setStatusFilter`.
- **Llamadas directas en el cuerpo** [`setStatusFilter`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L99).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L137) · callback JSX · dentro de [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openDrawer`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L137).

#### [`QRDetalle.onClose`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L149) · callback JSX · dentro de [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L47)

Responde al evento de interfaz `QRDetalle.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDrawerOpen`.
- **Llamadas directas en el cuerpo** [`setDrawerOpen`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L149).

### [`apps/referidos-app/src/admin/reportes/ReportesTable.jsx`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L1)

Lista reportes que requieren operación administrativa y coloca sus acciones de estado.

**Superficie que exporta.** [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L46).

**Módulos que lo cargan.** [`AdminReportes.jsx`](../../../apps/referidos-app/src/pages/admin/AdminReportes.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx).

#### [`REPORTES`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L7) · variable de módulo

Conserva la lista de `REPORTES` usada por el módulo.

- **Lo usa** [`filtered`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L51) (accede al módulo).

#### [`STATUS_VARIANT`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L40) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `abierto`, `en_revision`, `resuelto`.
- **Lo usa** [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L127) (accede al módulo).

#### [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L46) · componente React · exportación por defecto

Monta `button`, `AlertTriangle`, `Search`, `input`, `Filter`, `select`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`.
- **Interfaz que monta** `button`, `AlertTriangle`, `Search`, `input`, `Filter`, `select`, `Table`, `Badge`.
- **Hooks que llama** `useState`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L114).
- **Lo usa** [`AdminReportes`](../../../apps/referidos-app/src/pages/admin/AdminReportes.jsx#L12) (renderiza).

#### [`filtered`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L50) · cálculo memorizado · dentro de [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L46)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`REPORTES.filter`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L51), [`includes`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L52), [`reporte.texto.toLowerCase`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L52), [`query.toLowerCase`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L54).
- **Lo usa** [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L114) (accede al módulo).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L84) · callback JSX · dentro de [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L46)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L84).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L93) · callback JSX · dentro de [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L46)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setStatusFilter`.
- **Llamadas directas en el cuerpo** [`setStatusFilter`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L93).

### [`apps/referidos-app/src/admin/services/adminUser.js`](../../../apps/referidos-app/src/admin/services/adminUser.js#L1)

Agrupa la resolución del usuario administrador que comparten páginas y hooks.

**Superficie que exporta.** [`fetchAdminUser`](../../../apps/referidos-app/src/admin/services/adminUser.js#L2).

#### [`fetchAdminUser`](../../../apps/referidos-app/src/admin/services/adminUser.js#L2) · función · asíncrona · exportado

Obtiene o resuelve `Admin User` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `ok`, `data`.

### [`apps/referidos-app/src/admin/sistema/FeatureFlags.jsx`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L1)

Presenta controles o estado de configuración operativa en la pantalla Sistema.

**Superficie que exporta.** [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59).

**Módulos que lo cargan.** [`AdminSistema.jsx`](../../../apps/referidos-app/src/pages/admin/AdminSistema.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`@referidos/support-sdk/runtime/systemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js), [`@referidos/support-sdk/runtime/supportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`FLAGS`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L18) · variable de módulo

Conserva la lista de `FLAGS` usada por el módulo.

- **Lo usa** [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L176) (accede al módulo).

#### [`SUPPORT_AUTH_FLAGS`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L46) · variable de módulo

Conserva la lista de `SUPPORT AUTH FLAGS` usada por el módulo.

- **Lo usa** [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L426) (accede al módulo).

#### [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59) · componente React · exportación por defecto

Monta `Shield`, `button`, `input`, `select`, `ToggleLeft`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[state, setState] mediante useState`, `[supportAuthState, setSupportAuthState] mediante useState`, `[supportAuthLoading, setSupportAuthLoading] mediante useState`, `[supportAuthError, setSupportAuthError] mediante useState`, `[savingSupportFlag, setSavingSupportFlag] mediante useState`, `[supportConfigDraft, setSupportConfigDraft] mediante useState`, `[savingSupportConfig, setSavingSupportConfig] mediante useState`, `usuario mediante useAppStore`, `selector s.usuario`.
- **Interfaz que monta** `Shield`, `button`, `input`, `select`, `ToggleLeft`.
- **Hooks que llama** `useState`, `useAppStore`, `useEffect`.
- **Usa código de** [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L28) (llama), [`getCachedSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L123) (llama), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`getSystemFeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L60), [`getCachedSupportRuntimeFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L62), [`FLAGS.map`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L176), [`SUPPORT_AUTH_FLAGS.map`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L426).
- **Lo usa** [`AdminSistema`](../../../apps/referidos-app/src/pages/admin/AdminSistema.jsx#L14) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L73) · callback de infraestructura · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `FeatureFlags`.

- **Usa código de** [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L71) (llama).
- **Llamadas directas en el cuerpo** [`subscribeSystemFeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L73).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L75) · callback de infraestructura · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `FeatureFlags`.

- **Efectos y APIs** `unsubscribe`.
- **Usa código de** [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L208) (llama).
- **Llamadas directas en el cuerpo** [`loadSupportAuth`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L84), [`subscribeSupportRuntimeFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L85), [`unsubscribe`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L88).

#### [`loadSupportAuth`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L77) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L75)

Obtiene o resuelve `Support Auth` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setSupportAuthLoading`, `setSupportAuthState`.
- **Condiciones que evalúa** `ausencia de active`.
- **Usa código de** [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L127) (llama).
- **Llamadas directas en el cuerpo** [`setSupportAuthLoading`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L78), [`fetchSupportRuntimeFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L79), [`setSupportAuthState`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L81).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L84) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L92) · callback de infraestructura · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `FeatureFlags`.

- **Actualizaciones de estado o acciones** `setSupportConfigDraft`.
- **Llamadas directas en el cuerpo** [`setSupportConfigDraft`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L93).

#### [`toggleFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L96) · función · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Coordina cambios de estado durante `toggle Flag`.

- **Entradas** `key`.
- **Actualizaciones de estado o acciones** `setSystemFeatureFlag`, `setState`.
- **Usa código de** [`setSystemFeatureFlag`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L55) (llama).
- **Llamadas directas en el cuerpo** [`setSystemFeatureFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L98), [`setState`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L99).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L197) (llama).

#### [`toggleSupportAuthFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L102) · función · asíncrona · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Coordina cambios de estado durante `toggle Support Auth Flag`.

- **Entradas** `key`.
- **Actualizaciones de estado o acciones** `setSupportAuthError`, `setSavingSupportFlag`, `setSupportRuntimeFlag`, `setSupportAuthState`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`setSupportRuntimeFlag`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L195) (llama).
- **Llamadas directas en el cuerpo** [`setSupportAuthError`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L105), [`setSavingSupportFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L106), [`setSupportRuntimeFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L107), [`setSupportAuthState`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L115).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L448) (llama).

#### [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L118) · función · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Maneja `Support Config Field` y coordina las acciones indicadas abajo.

- **Entradas** `key`, `value`.
- **Actualizaciones de estado o acciones** `setSupportConfigDraft`.
- **Llamadas directas en el cuerpo** [`setSupportConfigDraft`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L119).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L234) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L261) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L274) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L287) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L303) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L321) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L339) (llama), [`select.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L352) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L370) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L388) (llama).

#### [`saveSupportConfig`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L125) · función · asíncrona · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Aplica o guarda `Support Config` para que el estado refleje la operación.

- **Actualizaciones de estado o acciones** `setSupportAuthError`, `setSavingSupportConfig`, `setSupportAuthState`, `setSupportConfigDraft`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`updateSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L157) (llama).
- **Llamadas directas en el cuerpo** [`setSupportAuthError`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L126), [`setSavingSupportConfig`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L127), [`updateSupportRuntimeFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L152), [`setSupportAuthState`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L160), [`setSupportConfigDraft`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L161).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L401) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L197) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggleFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L197).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L233) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L234).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L260) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L261).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L273) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L274).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L286) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L287).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L302) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L303).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L320) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L321).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L338) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L339).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L351) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L352).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L369) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L370).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L387) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleSupportConfigField`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L388).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L401) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`saveSupportConfig`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L401).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L448) · callback JSX · dentro de [`FeatureFlags`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L59)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggleSupportAuthFlag`](../../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx#L448).

### [`apps/referidos-app/src/admin/sistema/RegistroCodes.jsx`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L1)

Carga y gestiona códigos de alta mediante funciones Edge de creación, listado y revocación.

**Superficie que exporta.** [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31).

**Módulos que lo cargan.** [`AdminSistema.jsx`](../../../apps/referidos-app/src/pages/admin/AdminSistema.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`STATUS_VARIANT`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L8) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `activo`, `usado`, `revocado`, `expirado`.
- **Lo usa** [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L186) (accede al módulo).

#### [`formatDate`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L15) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L18), [`slice`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L19), [`date.toISOString`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L19).
- **Lo usa** [`rows`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L114) (llama).

#### [`getStatus`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L22) · función

Obtiene o resuelve el valor de estado para entregarlo al consumidor.

- **Entradas** `row`.
- **Condiciones que evalúa** `row.revoked_at`, `row.used_at`, `row.expires_at`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L25).
- **Lo usa** [`rows`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L113) (llama).

#### [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31) · componente React · exportación por defecto

Monta `button`, `Plus`, `Table`, `Badge`, `KeyRound`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[codes, setCodes] mediante useState`, `[loading, setLoading] mediante useState`, `[creating, setCreating] mediante useState`, `[revokingId, setRevokingId] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `button`, `Plus`, `Table`, `Badge`, `KeyRound`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`rows.map`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L179).
- **Lo usa** [`AdminSistema`](../../../apps/referidos-app/src/pages/admin/AdminSistema.jsx#L15) (renderiza).

#### [`invokeWithAuth`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L38) · callback React · asíncrona · dentro de [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31)

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Entradas** `fnName`, `options = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `invokeError`, `data.ok`.
- **Contrato de datos** Auth `getSession` en [`RegistroCodes.jsx:39`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L39).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L39), [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L43).
- **Lo usa** [`fetchCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L65) (llama), [`handleCreate`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L85) (llama), [`handleRevoke`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L99) (llama).

#### [`fetchCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L61) · callback React · asíncrona · dentro de [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31)

Obtiene o resuelve `Codes` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setCodes`.
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L62), [`setError`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L63), [`invokeWithAuth`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L65), [`setCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L68).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L78) (llama), [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L79) (referencia), [`handleCreate`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L86) (llama), [`handleRevoke`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L102) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L77) · callback de infraestructura · dentro de [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `RegistroCodes`.

- **Llamadas directas en el cuerpo** [`fetchCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L78).

#### [`handleCreate`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L81) · función · asíncrona · dentro de [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setCreating`, `setError`.
- **Llamadas directas en el cuerpo** [`setCreating`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L82), [`setError`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L83), [`invokeWithAuth`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L85), [`fetchCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L86).
- **Lo usa** [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L132) (pasa a onClick).

#### [`handleRevoke`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L94) · función · asíncrona · dentro de [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31)

Maneja `Revoke` y coordina las acciones indicadas abajo.

- **Entradas** `row`.
- **Actualizaciones de estado o acciones** `setRevokingId`, `setError`.
- **Condiciones que evalúa** `ausencia de row.id`.
- **Llamadas directas en el cuerpo** [`setRevokingId`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L96), [`setError`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L97), [`invokeWithAuth`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L99), [`fetchCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L102).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L197) (llama).

#### [`rows`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L110) · cálculo memorizado · dentro de [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31)

Función auxiliar de `RegistroCodes` para `rows`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`codes.map`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L111), [`getStatus`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L113), [`formatDate`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L114).
- **Lo usa** [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L167) (accede al módulo).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L197) · callback JSX · dentro de [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L31)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleRevoke`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L197).

### [`apps/referidos-app/src/admin/support/AdminSupportAgents.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1)

Consulta perfiles, jornadas y tickets de agentes. Coordina control operativo y acciones sobre disponibilidad.

**Superficie que exporta.** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L27) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../layout/AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`@referidos/support-sdk/supportClient`](../../../packages/support-sdk/src/supportClient.js).

#### [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16) · componente React · exportación por defecto

Monta `AdminLayout`, `button`, `input`, `select`, `Users`, `RefreshCw`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[agents, setAgents] mediante useState`, `[loading, setLoading] mediante useState`, `[phoneDrafts, setPhoneDrafts] mediante useState`, `[authorizedUntilDrafts, setAuthorizedUntilDrafts] mediante useState`, `[authorizedFromDrafts, setAuthorizedFromDrafts] mediante useState`, `[usersMap, setUsersMap] mediante useState`, `[sessionsMap, setSessionsMap] mediante useState`, `[activeTicketsMap, setActiveTicketsMap] mediante useState`, `[, setRecentTicketsMap] mediante useState`, `[, setNameDrafts] mediante useState`, `[expandedMap, setExpandedMap] mediante useState`, `[agentErrors, setAgentErrors] mediante useState`, `[availableThreads, setAvailableThreads] mediante useState`, `[assignErrors, setAssignErrors] mediante useState` y 12 más.
- **Interfaz que monta** `AdminLayout`, `button`, `input`, `select`, `Users`, `RefreshCw`, `Check`, `X`, `ChevronUp`, `ChevronDown`, `Pencil`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Usa código de** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`handleCreateChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L613), [`agents.map`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L706), [`computeGlow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L709), [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L729), [`formatSupportPhone`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L739), [`formatTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L754), [`getShiftDuration`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L760), [`getAgentDateRange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L763), [`split`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L972), [`hourOptions.map`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L995), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1027), [`pad2`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1028) y 6 más.
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L417) (renderiza).

#### [`authorizedAgentsCount`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L50) · cálculo memorizado · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Función auxiliar de `AdminSupportAgents` para `authorized Agents Count`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`agents.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L50).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L675) (referencia).

#### [`formatTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L54) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Formatea el valor de hora para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L57), [`date.toLocaleTimeString`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L58).
- **Lo usa** [`getAgentFromTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L181) (llama), [`getAgentUntilTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L183) (llama), [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L281) (llama), [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L397) (llama), [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L516) (llama), [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L754) (llama).

#### [`formatDate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L66) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L69), [`date.toLocaleDateString`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L70).
- **Lo usa** [`getAgentDateRange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L186) (llama), [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1038) (llama).

#### [`formatSupportPhone`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L77) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Formatea `Support Phone` para que el consumidor lo pueda presentar.

- **Entradas** `rawValue`.
- **Efectos y APIs** `rawValue.replace`.
- **Condiciones que evalúa** `ausencia de rawValue`, `local.startsWith`, `local.length`.
- **Llamadas directas en el cuerpo** [`rawValue.replace`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L79), [`local.startsWith`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L81), [`local.slice`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L82).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L739) (llama).

#### [`normalizeSupportPhoneInput`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L93) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Normaliza `Support Phone Input` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `value.replace`.
- **Condiciones que evalúa** `ausencia de value`, `digits.startsWith`, `digits.length y digits.startsWith`.
- **Llamadas directas en el cuerpo** [`value.replace`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L95), [`digits.startsWith`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L96), [`digits.slice`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L97).
- **Lo usa** [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L279) (llama), [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L394) (llama), [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L513) (llama), [`input.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L915) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L929) (llama).

#### [`formatSupportPhoneForSave`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L106) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Formatea `Support Phone For Save` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `value.replace`.
- **Condiciones que evalúa** `ausencia de value`, `digits.startsWith`, `digits.length y digits.startsWith`, `digits.length`.
- **Llamadas directas en el cuerpo** [`value.replace`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L108), [`digits.startsWith`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L109), [`digits.slice`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L113).
- **Lo usa** [`hasAgentChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L195) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1180) (llama).

#### [`buildHourOptions`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L121) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Construye `Hour Options` a partir de los datos del flujo.

- **Efectos y APIs** `options.push`.
- **Llamadas directas en el cuerpo** [`options.push`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L124), [`padStart`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L124), [`hour.toString`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L124).
- **Lo usa** [`hourOptions`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L129) (llama).

#### [`hourOptions`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L129) · cálculo memorizado · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Función auxiliar de `AdminSupportAgents` para `hour Options`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`buildHourOptions`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L129).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L995) (accede al módulo).

#### [`pad2`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L131) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Función auxiliar de `AdminSupportAgents` para `pad2`.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`padStart`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L131), [`value.toString`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L131).
- **Lo usa** [`clampToShift`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L148) (llama), [`getShiftDuration`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L177) (llama), [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L988) (llama), [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1020) (llama), [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1028) (llama).

#### [`parseTimeToMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L133) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Extrae o interpreta `Time To Minutes` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L135), [`value.split`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L135), [`parseInt`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L135).
- **Lo usa** [`clampToShift`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L141) (llama), [`getAllowedUntilMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L152) (llama), [`isAfterLimit`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L158) (llama).

#### [`clampToShift`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L140) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Función auxiliar de `AdminSupportAgents` para `clamp To Shift`.

- **Entradas** `fromTime`, `untilTime`.
- **Condiciones que evalúa** `fromMinutes o untilMinutes`, `diff`.
- **Llamadas directas en el cuerpo** [`parseTimeToMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L141), [`pad2`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L148).
- **Lo usa** [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L287) (llama), [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L404) (llama), [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L523) (llama).

#### [`getAllowedUntilMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L151) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Obtiene o resuelve `Allowed Until Minutes` para entregarlo al consumidor.

- **Entradas** `fromTime`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `fromMinutes`.
- **Llamadas directas en el cuerpo** [`parseTimeToMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L152).
- **Lo usa** [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L987) (llama), [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1019) (llama).

#### [`isAfterLimit`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L157) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Comprueba `After Limit` para decidir si se admite o continúa la operación.

- **Entradas** `fromTime`, `untilTime`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `fromMinutes o untilMinutes`, `diff`.
- **Llamadas directas en el cuerpo** [`parseTimeToMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L158).
- **Lo usa** [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L984) (llama), [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1016) (llama), [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1111) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1189) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1236) (llama).

#### [`getShiftDuration`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L166) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Obtiene o resuelve `Shift Duration` para entregarlo al consumidor.

- **Entradas** `agent`.
- **Condiciones que evalúa** `ausencia de agent.authorized_from o ausencia de agent.authorized_until`, `Number.isNaN`, `diffMs`, `hours`.
- **Llamadas directas en el cuerpo** [`start.getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L170), [`end.getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L170), [`pad2`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L177).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L760) (llama).

#### [`getAgentFromTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L180) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Obtiene o resuelve `Agent From Time` para entregarlo al consumidor.

- **Entradas** `agent`.
- **Llamadas directas en el cuerpo** [`formatTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L181).
- **Lo usa** [`hasAgentChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L198) (llama), [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1036) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1067) (llama).

#### [`getAgentUntilTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L182) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Obtiene o resuelve `Agent Until Time` para entregarlo al consumidor.

- **Entradas** `agent`.
- **Llamadas directas en el cuerpo** [`formatTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L183).
- **Lo usa** [`hasAgentChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L201) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1071) (llama), [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1163) (llama).

#### [`getAgentDateRange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L184) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Obtiene o resuelve `Agent Date Range` para entregarlo al consumidor.

- **Entradas** `agent`.
- **Condiciones que evalúa** `ausencia de agent.authorized_from o ausencia de agent.authorized_until`, `ausencia de startDate o ausencia de endDate o startDate`.
- **Llamadas directas en el cuerpo** [`formatDate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L186).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L763) (llama).

#### [`hasAgentChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L192) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Comprueba `Agent Changes` para decidir si se admite o continúa la operación.

- **Entradas** `agent`.
- **Llamadas directas en el cuerpo** [`formatSupportPhoneForSave`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L195), [`getAgentFromTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L198), [`getAgentUntilTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L201).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1172) (llama).

#### [`timeValueToIso`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L205) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Función auxiliar de `AdminSupportAgents` para `time Value To Iso`.

- **Entradas** `timeValue`, `dayOffset = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de timeValue`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L207), [`timeValue.split`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L207), [`parseInt`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L207), [`ecuNow.getUTCFullYear`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L212), [`ecuNow.getUTCMonth`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L213), [`ecuNow.getUTCDate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L214), [`toISOString`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L220).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1184) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1231) (llama).

#### [`buildEcuadorDate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L223) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Construye `Ecuador Date` a partir de los datos del flujo.

- **Entradas** `hour`, `minute = valor por defecto`, `dayOffset = valor por defecto`.
- **Llamadas directas en el cuerpo** [`ecuNow.getUTCFullYear`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L227), [`ecuNow.getUTCMonth`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L228), [`ecuNow.getUTCDate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L229).
- **Lo usa** [`computeGlow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L248) (llama).

#### [`computeGlow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L238) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Función auxiliar de `AdminSupportAgents` para `compute Glow`.

- **Entradas** `agent`.
- **Condiciones que evalúa** `agent.blocked`, `ausencia de agent.authorized_for_work`, `sessionsMap.agent.user_id`, `Number.isNaN`, `now`.
- **Llamadas directas en el cuerpo** [`buildEcuadorDate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L248), [`startAt.getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L252), [`endAt.getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L252).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L709) (llama).

#### [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L265) · función · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Consulta o invoca tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setLoading`, `setAgents`, `setPhoneDrafts`, `setAuthorizedUntilDrafts`, `setAuthorizedFromDrafts`, `setPhoneEditingMap`, `setTimeFromEditingMap`, `setTimeUntilEditingMap`, `setUsersMap`, `setNameDrafts`, `setSessionsMap`, `setActiveTicketsMap` y 2 más.
- **Efectos y APIs** `list.push`.
- **Condiciones que evalúa** `ausencia de mountedRef.current`, `data y data.length`, `ausencia de thread.assigned_agent_id`, `list.length`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`select`) en [`AdminSupportAgents.jsx:267`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L267), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`AdminSupportAgents.jsx:267`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L267), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`AdminSupportAgents.jsx:306`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L306), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AdminSupportAgents.jsx:306`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L306), tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`AdminSupportAgents.jsx:326`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L326), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`AdminSupportAgents.jsx:326`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L326), tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`AdminSupportAgents.jsx:336`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L336), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`AdminSupportAgents.jsx:336`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L336).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L266), [`order`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L267), [`select`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L267), [`supabase.from`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L267), [`setAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L274), [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L278), [`normalizeSupportPhoneInput`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L279), [`formatTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L281), [`clampToShift`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L287), [`setPhoneDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L289), [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L290), [`setAuthorizedFromDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L291) y 15 más.
- **Lo usa** [`refreshAllAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L452) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L462) (llama), [`handleCreate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L586) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1334) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1381) (llama).

#### [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L379) · función · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Consulta o invoca tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Entradas** `userId`.
- **Actualizaciones de estado o acciones** `setRefreshingMap`, `setAgents`, `setPhoneDrafts`, `setAuthorizedUntilDrafts`, `setAuthorizedFromDrafts`, `setUsersMap`, `setSessionsMap`, `setActiveTicketsMap`.
- **Condiciones que evalúa** `ausencia de agent`, `userRow`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`select`) en [`AdminSupportAgents.jsx:381`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L381), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`AdminSupportAgents.jsx:381`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L381), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`AdminSupportAgents.jsx:415`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L415), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AdminSupportAgents.jsx:415`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L415), tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`AdminSupportAgents.jsx:424`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L424), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`AdminSupportAgents.jsx:424`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L424), tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`AdminSupportAgents.jsx:435`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L435), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`AdminSupportAgents.jsx:435`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L435).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setRefreshingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L380), [`maybeSingle`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L381), [`eq`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L381), [`select`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L381), [`supabase.from`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L381), [`setAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L389), [`prev.map`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L390), [`setPhoneDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L392), [`normalizeSupportPhoneInput`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L394), [`formatTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L397), [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L402), [`clampToShift`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L404) y 6 más.
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L717) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L842) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L854) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L871) (llama).

#### [`refreshAllAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L448) · función · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setGlobalRefreshing`.
- **Condiciones que evalúa** `globalRefreshing`, `mountedRef.current`.
- **Llamadas directas en el cuerpo** [`setGlobalRefreshing`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L450), [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L452).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L688) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L460) · callback de infraestructura · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportAgents`.

- **Llamadas directas en el cuerpo** [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L462).

#### [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L488) · función · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Actualiza datos en tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Entradas** `userId`, `patch`.
- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setAgentErrors`, `setAgents`, `setPhoneDrafts`, `setAuthorizedUntilDrafts`, `setAuthorizedFromDrafts`.
- **Condiciones que evalúa** `error o ausencia de data`, `patch.authorized_for_work y patch.blocked`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`update + select`) en [`AdminSupportAgents.jsx:489`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489), tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`update`) en [`AdminSupportAgents.jsx:489`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`AdminSupportAgents.jsx:489`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`pingAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L233) (llama).
- **Llamadas directas en el cuerpo** [`single`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489), [`select`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489), [`eq`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489), [`update`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489), [`supabase.from`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L489), [`setAgentErrors`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L498), [`setAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L508), [`prev.map`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L509), [`setPhoneDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L511), [`normalizeSupportPhoneInput`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L513), [`formatTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L516), [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L521) y 3 más.
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L780) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L811) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1176) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1228) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1275) (llama).

#### [`isPhoneValid`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L543) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Comprueba `Phone Valid` para decidir si se admite o continúa la operación.

- **Entradas** `rawValue`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L544), [`digits.startsWith`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L546).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1177) (llama).

#### [`handleCreateChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L550) · función · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Maneja `Create Change` y coordina las acciones indicadas abajo.

- **Entradas** `field`.
- **Actualizaciones de estado o acciones** `setCreateForm`.
- **Llamadas directas en el cuerpo** [`setCreateForm`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L551).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L613) (llama).

#### [`handleCreate`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L557) · función · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setCreateError`, `setCreateResult`, `setCreateLoading`, `setCreateForm`.
- **Condiciones que evalúa** `ausencia de payload.nombre o ausencia de payload.apellido o ausencia de payload.email`, `ausencia de result.ok`.
- **Usa código de** [`createSupportAdminUser`](../../../packages/support-sdk/src/supportClient.js#L255) (llama).
- **Llamadas directas en el cuerpo** [`setCreateError`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L558), [`setCreateResult`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L559), [`createForm.nombre.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L561), [`createForm.apellido.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L562), [`createForm.email.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L563), [`setCreateLoading`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L571), [`createSupportAdminUser`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L572), [`setCreateForm`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L579), [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L586).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L656) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L602) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCreateOpen`.
- **Llamadas directas en el cuerpo** [`setCreateOpen`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L602).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L717) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L717).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L775) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActionLoadingMap`, `setExpandedMap`.
- **Condiciones que evalúa** `ok`.
- **Llamadas directas en el cuerpo** [`setActionLoadingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L776), [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L780), [`setExpandedMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L789).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L806) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActionLoadingMap`.
- **Llamadas directas en el cuerpo** [`setActionLoadingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L807), [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L811).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L838) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`startAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L211) (llama).
- **Llamadas directas en el cuerpo** [`startAdminSupportSession`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L839), [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L842).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L850) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`denyAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L244) (llama).
- **Llamadas directas en el cuerpo** [`denyAdminSupportSession`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L851), [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L854).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L866) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`endAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L222) (llama).
- **Llamadas directas en el cuerpo** [`endAdminSupportSession`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L867), [`refreshAgentRow`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L871).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L880) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedMap`.
- **Llamadas directas en el cuerpo** [`setExpandedMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L881).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L912) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setPhoneDrafts`.
- **Llamadas directas en el cuerpo** [`setPhoneDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L913), [`normalizeSupportPhoneInput`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L915).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L926) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPhoneDrafts`, `setPhoneEditingMap`.
- **Llamadas directas en el cuerpo** [`setPhoneDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L927), [`normalizeSupportPhoneInput`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L929), [`setPhoneEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L933).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L951) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPhoneEditingMap`.
- **Llamadas directas en el cuerpo** [`setPhoneEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L952).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L974) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setAuthorizedFromDrafts`, `setAuthorizedUntilDrafts`.
- **Condiciones que evalúa** `isAfterLimit`.
- **Llamadas directas en el cuerpo** [`current.split`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L977), [`setAuthorizedFromDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L978), [`isAfterLimit`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L984), [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L985), [`getAllowedUntilMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L987), [`pad2`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L988).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1007) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setAuthorizedFromDrafts`, `setAuthorizedUntilDrafts`.
- **Condiciones que evalúa** `isAfterLimit`.
- **Llamadas directas en el cuerpo** [`current.split`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1009), [`setAuthorizedFromDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1010), [`isAfterLimit`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1016), [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1017), [`getAllowedUntilMinutes`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1019), [`pad2`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1020).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1047) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTimeFromEditingMap`, `setTimeUntilEditingMap`.
- **Llamadas directas en el cuerpo** [`setTimeFromEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1048), [`setTimeUntilEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1052).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1064) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setAuthorizedFromDrafts`, `setAuthorizedUntilDrafts`, `setTimeFromEditingMap`, `setTimeUntilEditingMap`.
- **Llamadas directas en el cuerpo** [`setAuthorizedFromDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1065), [`getAgentFromTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1067), [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1069), [`getAgentUntilTime`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1071), [`setTimeFromEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1073), [`setTimeUntilEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1077).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1096) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setAuthorizedUntilDrafts`.
- **Llamadas directas en el cuerpo** [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1100), [`current.split`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1102).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1130) · callback JSX · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setAuthorizedUntilDrafts`.
- **Llamadas directas en el cuerpo** [`setAuthorizedUntilDrafts`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1133), [`current.split`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1135).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1175) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPhoneEditingMap`, `setTimeFromEditingMap`, `setTimeUntilEditingMap`.
- **Condiciones que evalúa** `ok`.
- **Llamadas directas en el cuerpo** [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1176), [`isPhoneValid`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1177), [`formatSupportPhoneForSave`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1180), [`timeValueToIso`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1184), [`isAfterLimit`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1189), [`setPhoneEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1201), [`setTimeFromEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1205), [`setTimeUntilEditingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1209).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1223) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActionLoadingMap`, `setExpandedMap`.
- **Condiciones que evalúa** `ok`.
- **Llamadas directas en el cuerpo** [`setActionLoadingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1224), [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1228), [`timeValueToIso`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1231), [`isAfterLimit`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1236), [`setExpandedMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1252).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1270) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActionLoadingMap`.
- **Llamadas directas en el cuerpo** [`setActionLoadingMap`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1271), [`updateAgent`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1275).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1315) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setAssignErrors`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`closeSupportThread`](../../../packages/support-sdk/src/supportClient.js#L143) (llama).
- **Llamadas directas en el cuerpo** [`closeSupportThread`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1316), [`setAssignErrors`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1323), [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1334).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1364) · callback JSX · asíncrona · dentro de [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setAssignErrors`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`assignSupportThread`](../../../packages/support-sdk/src/supportClient.js#L55) (llama).
- **Llamadas directas en el cuerpo** [`assignSupportThread`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1365), [`setAssignErrors`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1370), [`loadAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L1381).
