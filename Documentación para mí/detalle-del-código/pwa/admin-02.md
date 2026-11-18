# PWA principal · Admin y operación · 2 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/layout/AdminLayout.jsx`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L1)
- [`apps/referidos-app/src/admin/layout/AdminSidebar.jsx`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L1)
- [`apps/referidos-app/src/admin/layout/AdminTopbar.jsx`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L1)
- [`apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L1)
- [`apps/referidos-app/src/admin/legal/legalDocsRegistry.js`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L1)
- [`apps/referidos-app/src/admin/logs/LogsTable.jsx`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L1)
- [`apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx#L1)
- [`apps/referidos-app/src/admin/negocios/NegociosTable.jsx`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L1)
- [`apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L1)
- [`apps/referidos-app/src/admin/observability/brandIconPolicy.js`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L1)
- [`apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/layout/AdminLayout.jsx`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L1)

Monta estructura admin, barra, navegación y contenido para mantener contexto entre paneles.

**Superficie que exporta.** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10).

**Módulos que lo cargan.** [`AdminSupportAgents.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L3) (importa), [`AdminSupportCatalogPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L4) (importa), [`AdminSupportControlPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L21) (importa), [`AdminSupportDesk.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L2) (importa), [`AdminSupportTicket.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L2) (importa), [`AdminApps.jsx`](../../../apps/referidos-app/src/pages/admin/AdminApps.jsx#L2) (importa), [`AdminDashboard.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx#L2) (importa), [`AdminDashboardAnalytics.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDashboardAnalytics.jsx#L2) (importa), [`AdminDashboardDlqEvents.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDashboardDlqEvents.jsx#L2) (importa), [`AdminDatos.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDatos.jsx#L3) (importa), [`AdminDevErrors.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDevErrors.jsx#L2) (importa), [`AdminDocumentation.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDocumentation.jsx#L2) (importa), [`AdminInicio.jsx`](../../../apps/referidos-app/src/pages/admin/AdminInicio.jsx#L3) (importa), [`AdminLegal.jsx`](../../../apps/referidos-app/src/pages/admin/AdminLegal.jsx#L2) (importa), [`AdminLogs.jsx`](../../../apps/referidos-app/src/pages/admin/AdminLogs.jsx#L3) (importa), [`AdminNegocios.jsx`](../../../apps/referidos-app/src/pages/admin/AdminNegocios.jsx#L3) (importa) y 11 más.

**Dependencias del archivo.** `react`, `react-router-dom`, [`./AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx), [`./AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx), [`../observability/AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx).

#### [`ADMIN_SIDEBAR_COLLAPSED_KEY`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L8) · variable de módulo

Declara `ADMIN_SIDEBAR_COLLAPSED_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L14) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L39) (referencia).

#### [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10) · componente React · exportación por defecto

Monta `AdminRuntimeErrorModalHost`, `AdminSidebar`, `AdminTopbar`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children, title, subtitle}`.
- **Retorno visible o tipo declarado** `booleano`, `JSX`.
- **Estado o valores vinculados** `[sidebarOpen, setSidebarOpen] mediante useState`, `[sidebarCollapsed, setSidebarCollapsed] mediante useState`.
- **Interfaz que monta** `AdminRuntimeErrorModalHost`, `AdminSidebar`, `AdminTopbar`.
- **Hooks que llama** `useState`, `useLocation`, `useNavigate`, `useEffect`.
- **Efectos y APIs** `window.localStorage.getItem`.
- **Condiciones que evalúa** `undefined`.
- **Usa código de** [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L23) (renderiza), [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L69) (renderiza), [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L13) (renderiza).
- **Llamadas directas en el cuerpo** [`window.localStorage.getItem`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L14).
- **Lo usa** [`AdminSupportAgents`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L590) (renderiza), [`AdminSupportCatalogPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L1699) (renderiza), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1855) (renderiza), [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L70) (renderiza), [`AdminSupportTicket`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L7) (renderiza), [`AdminApps`](../../../apps/referidos-app/src/pages/admin/AdminApps.jsx#L7) (renderiza), [`AdminDashboard`](../../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx#L7) (renderiza), [`AdminDashboardAnalytics`](../../../apps/referidos-app/src/pages/admin/AdminDashboardAnalytics.jsx#L7) (renderiza), [`AdminDashboardDlqEvents`](../../../apps/referidos-app/src/pages/admin/AdminDashboardDlqEvents.jsx#L7) (renderiza), [`AdminDatos`](../../../apps/referidos-app/src/pages/admin/AdminDatos.jsx#L8) (renderiza), [`AdminDevErrors`](../../../apps/referidos-app/src/pages/admin/AdminDevErrors.jsx#L7) (renderiza), [`AdminDocumentation`](../../../apps/referidos-app/src/pages/admin/AdminDocumentation.jsx#L7) (renderiza) y 15 más.

#### [`handleRefreshPanel`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L19) · callback React · dentro de [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10)

Atiende `AdminTopbar.onRefreshPanel` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `AdminTopbar.onRefreshPanel`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`params.set`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L21), [`params.toString`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L22), [`navigate`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L23).
- **Lo usa** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L59) (pasa a onRefreshPanel).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L32) · callback de infraestructura · dentro de [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminLayout`.

- **Actualizaciones de estado o acciones** `setSidebarOpen`.
- **Llamadas directas en el cuerpo** [`setSidebarOpen`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L33).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L36) · callback de infraestructura · dentro de [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminLayout`.

- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `window.localStorage.setItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.localStorage.setItem`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L38).

#### [`AdminSidebar.onClose`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L49) · callback JSX · dentro de [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10)

Responde al evento de interfaz `AdminSidebar.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSidebarOpen`.
- **Llamadas directas en el cuerpo** [`setSidebarOpen`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L49).

#### [`AdminSidebar.onToggleCollapsed`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L51) · callback JSX · dentro de [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10)

Responde al evento de interfaz `AdminSidebar.onToggleCollapsed`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSidebarCollapsed`.
- **Llamadas directas en el cuerpo** [`setSidebarCollapsed`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L51).

#### [`AdminTopbar.onOpenMenu`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L58) · callback JSX · dentro de [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10)

Responde al evento de interfaz `AdminTopbar.onOpenMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSidebarOpen`.
- **Llamadas directas en el cuerpo** [`setSidebarOpen`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L58).

### [`apps/referidos-app/src/admin/layout/AdminSidebar.jsx`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L1)

Define grupos de accesos administrativos y los enlaces correspondientes del menú lateral.

**Superficie que exporta.** [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L69).

**Módulos que lo cargan.** [`AdminLayout.jsx`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx).

#### [`NAV_GROUPS`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L24) · variable de módulo

Conserva la lista de `NAV GROUPS` usada por el módulo.

- **Lo usa** [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L128) (accede al módulo).

#### [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L69) · componente React · exportación por defecto

Monta `ShieldCheck`, `Badge`, `Link`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, onClose, collapsed, onToggleCollapsed}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ShieldCheck`, `Badge`, `Link`, `button`.
- **Hooks que llama** `useLocation`.
- **Usa código de** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`NAV_GROUPS.map`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L128), [`group.items.map`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L141), [`isActive`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L142).
- **Lo usa** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L47) (renderiza).

#### [`isActive`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L77) · función · dentro de [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L69)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Entradas** `path`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L78).
- **Lo usa** [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L142) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L190) · callback JSX · dentro de [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L69)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onToggleCollapsed`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L190).

### [`apps/referidos-app/src/admin/layout/AdminTopbar.jsx`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L1)

Presenta el encabezado común de administración, incluidas acciones que coinciden con la ruta activa.

**Superficie que exporta.** [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L13).

**Módulos que lo cargan.** [`AdminLayout.jsx`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L13) · componente React · exportación por defecto

Monta `button`, `Menu`, `ShieldCheck`, `RefreshCcw`, `Bell`, `LogOut`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, subtitle, onOpenMenu, onRefreshPanel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `logout mediante useAppStore`, `selector s.logout`.
- **Interfaz que monta** `button`, `Menu`, `ShieldCheck`, `RefreshCcw`, `Bell`, `LogOut`.
- **Hooks que llama** `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toUpperCase`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L24), [`join`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L24), [`map`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L24), [`slice`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L24), [`split`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L24).
- **Lo usa** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L55) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L38) · callback JSX · dentro de [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L13)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onOpenMenu`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L38).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L63) · callback JSX · dentro de [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L13)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onRefreshPanel`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L63).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L92) · callback JSX · dentro de [`AdminTopbar`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L13)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`logout`](../../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx#L92).

### [`apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L1)

Organiza la consulta de publicaciones legales desde administración.

**Superficie que exporta.** [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20).

**Módulos que lo cargan.** [`AdminLegal.jsx`](../../../apps/referidos-app/src/pages/admin/AdminLegal.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../docs/MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx), [`./legalDocsRegistry`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js).

#### [`byTitleAsc`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L6) · función

Implementa `by Title Asc` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`, `b`.
- **Llamadas directas en el cuerpo** [`localeCompare`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L7).
- **Lo usa** [`filteredDocs`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L36) (referencia).

#### [`statusLabel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L10) · función

Implementa `status Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `statusKey`.
- **Condiciones que evalúa** `key`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L11).
- **Lo usa** [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L120) (llama).

#### [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20) · componente React · exportación por defecto

Monta `Scale`, `ShieldCheck`, `Tag`, `FileCheck2`, `Search`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[search, setSearch] mediante useState`, `[activeDocId, setActiveDocId] mediante useState`.
- **Interfaz que monta** `Scale`, `ShieldCheck`, `Tag`, `FileCheck2`, `Search`, `input`, `FileText`, `button`, `MarkdownArticle`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`LEGAL_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L273) (accede al módulo), [`LEGAL_POLICY_SUMMARY`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L285) (accede al módulo), [`MarkdownArticle`](../../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx#L234) (renderiza).
- **Llamadas directas en el cuerpo** [`statusRows.map`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L115), [`statusLabel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L120), [`filteredDocs.map`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L150).
- **Lo usa** [`AdminLegal`](../../../apps/referidos-app/src/pages/admin/AdminLegal.jsx#L11) (renderiza).

#### [`filteredDocs`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L24) · cálculo memorizado · dentro de [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20)

Procesa `ed Docs` según el criterio del módulo.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de query`.
- **Usa código de** [`LEGAL_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L273) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L25), [`search.trim`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L25), [`sort`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L26), [`LEGAL_DOCS.filter`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L26), [`includes`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L30), [`doc.title.toLowerCase`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L30), [`doc.pathLabel.toLowerCase`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L31), [`doc.documentId.toLowerCase`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L32), [`doc.version.toLowerCase`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L33).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L40) (accede al módulo), [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L47) (referencia), [`activeDoc`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L50) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L39) · callback de infraestructura · dentro de [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminLegalPanel`.

- **Actualizaciones de estado o acciones** `setActiveDocId`.
- **Condiciones que evalúa** `ausencia de filteredDocs.length`, `ausencia de filteredDocs.some`.
- **Llamadas directas en el cuerpo** [`setActiveDocId`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L41), [`filteredDocs.some`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L44).

#### [`activeDoc`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L50) · cálculo memorizado · dentro de [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20)

Función auxiliar de `AdminLegalPanel` para `active Doc`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`filteredDocs.find`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L50).
- **Lo usa** [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L185) (referencia).

#### [`statusRows`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L55) · cálculo memorizado · dentro de [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20)

Función auxiliar de `AdminLegalPanel` para `status Rows`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`LEGAL_POLICY_SUMMARY`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L285) (accede al módulo).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L56), [`sort`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L56), [`a.localeCompare`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L57).
- **Lo usa** [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L115) (accede al módulo).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L136) · callback JSX · dentro de [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSearch`.
- **Llamadas directas en el cuerpo** [`setSearch`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L136).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L156) · callback JSX · dentro de [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L20)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveDocId`.
- **Llamadas directas en el cuerpo** [`setActiveDocId`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L156).

### [`apps/referidos-app/src/admin/legal/legalDocsRegistry.js`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L1)

Selecciona los documentos legales que expone el panel de admin y unifica nombres de documento.

**Superficie que exporta.** [`LEGAL_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L273), [`LEGAL_POLICY_SUMMARY`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L285).

**Módulos que lo cargan.** [`AdminLegalPanel.jsx`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L4) (importa).

**Dependencias del archivo.** [`../../../../../docs/legal/README.md?raw`](../../../docs/legal/README.md), [`../../../../../docs/legal/brand-icon-policy.md?raw`](../../../docs/legal/brand-icon-policy.md), [`../../../../../docs/legal/brand-icon-manifest.md?raw`](../../../docs/legal/brand-icon-manifest.md), [`../../../../../packages/legal-content/content/es/privacy.md?raw`](../../../packages/legal-content/content/es/privacy.md), [`../../../../../packages/legal-content/content/es/terms.md?raw`](../../../packages/legal-content/content/es/terms.md), [`../../../../../packages/legal-content/content/es/data-deletion.md?raw`](../../../packages/legal-content/content/es/data-deletion.md), [`../../../../../packages/legal-content/content/en/privacy.md?raw`](../../../packages/legal-content/content/en/privacy.md), [`../../../../../packages/legal-content/content/en/terms.md?raw`](../../../packages/legal-content/content/en/terms.md), [`../../../../../packages/legal-content/content/en/data-deletion.md?raw`](../../../packages/legal-content/content/en/data-deletion.md), [`../observability/brandIconPolicy`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js).

#### [`extractMetaLine`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L15) · función

Extrae o interpreta `Meta Line` de los argumentos, estado o datos de entrada.

- **Entradas** `markdown`, `key`.
- **Llamadas directas en el cuerpo** [`match`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L17), [`match.1.trim`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L18).
- **Lo usa** [`extractDocMeta`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L23) (llama).

#### [`extractDocMeta`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L21) · función

Extrae o interpreta `Doc Meta` de los argumentos, estado o datos de entrada.

- **Entradas** `markdown`, `fallback = valor por defecto`.
- **Retorno visible o tipo declarado** `version`, `documentId`, `updatedAt`.
- **Llamadas directas en el cuerpo** [`extractMetaLine`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L23).
- **Lo usa** [`LEGAL_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L274) (llama).

#### [`normalizeDateFromInput`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L29) · función

Normaliza `Date From Input` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `rawValue`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de raw`, `isoMatch`, `slashMatch`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L30), [`raw.toUpperCase`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L32), [`raw.match`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L34).
- **Lo usa** [`extractLegalLastUpdated`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L55) (llama).

#### [`extractLegalLastUpdated`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L46) · función

Extrae o interpreta `Legal Last Updated` de los argumentos, estado o datos de entrada.

- **Entradas** `markdown`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `line.replace`.
- **Condiciones que evalúa** `ausencia de lower.includes`, `normalized`.
- **Llamadas directas en el cuerpo** [`content.split`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L48), [`line.toLowerCase`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L51), [`lower.includes`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L52), [`line.replace`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L53), [`trim`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L54), [`join`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L54), [`slice`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L54), [`clean.split`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L54), [`normalizeDateFromInput`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L55).
- **Lo usa** [`buildLegalContentVersion`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L72) (llama), [`buildLegalContentDoc`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L84) (llama).

#### [`stableHash`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L61) · función

Implementa `stable Hash` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `input`.
- **Llamadas directas en el cuerpo** [`raw.charCodeAt`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L65), [`padStart`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L68), [`toString`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L68).
- **Lo usa** [`buildLegalContentVersion`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L74) (llama).

#### [`buildLegalContentVersion`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L71) · función

Construye `Legal Content Version` a partir de los datos del flujo.

- **Entradas** `markdown`, `fallbackLabel = valor por defecto`.
- **Condiciones que evalúa** `updated`.
- **Llamadas directas en el cuerpo** [`extractLegalLastUpdated`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L72), [`slice`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L74), [`stableHash`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L74).
- **Lo usa** [`buildLegalContentDoc`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L85) (llama).

#### [`buildLegalContentDoc`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L77) · función

Construye `Legal Content Doc` a partir de los datos del flujo.

- **Entradas** `{id, title, pathLabel, markdown, documentId}`.
- **Retorno visible o tipo declarado** `id`, `title`, `pathLabel`, `markdown`, `version`, `documentId`, `updatedAt`.
- **Efectos y APIs** `id.replace`.
- **Llamadas directas en el cuerpo** [`extractLegalLastUpdated`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L84), [`buildLegalContentVersion`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L85), [`toLowerCase`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L85), [`id.replace`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L85).
- **Lo usa** [`RAW_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L229) (llama).

#### [`collectPolicyRows`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L97) · función

Implementa `collect Policy Rows` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Efectos y APIs** `rows.push`.
- **Condiciones que evalúa** `ausencia de entry o key`.
- **Usa código de** [`getBrandIconPolicy`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L220) (llama).
- **Llamadas directas en el cuerpo** [`getBrandIconPolicy`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L98), [`rows.push`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L106), [`rows.sort`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L118), [`localeCompare`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L119).
- **Lo usa** [`policyRows`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L200) (llama).

#### [`summarizePolicyRows`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L123) · función

Implementa `summarize Policy Rows` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rows`.
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L126).
- **Lo usa** [`policySummary`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L201) (llama).

#### [`statusLabel`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L138) · función

Implementa `status Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `statusKey`.
- **Condiciones que evalúa** `key`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L139).
- **Lo usa** [`buildRuntimeSnapshotMarkdown`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L151) (llama).

#### [`buildRuntimeSnapshotMarkdown`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L148) · función

Construye `Runtime Snapshot Markdown` a partir de los datos del flujo.

- **Entradas** `rows`, `summary`.
- **Efectos y APIs** `acc.row.group.push`.
- **Condiciones que evalúa** `ausencia de acc.row.group`.
- **Usa código de** [`BRAND_ICON_POLICY_META`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L149), [`sort`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L149), [`a.localeCompare`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L150), [`statusLabel`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L151), [`rows.reduce`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L159), [`acc.row.group.push`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L161), [`join`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L165), [`items.map`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L168), [`slice`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L183), [`toISOString`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L183).
- **Lo usa** [`runtimeSnapshotMd`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L202) (llama).

#### [`policyRows`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L200) · variable de módulo

Declara `policyRows` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`collectPolicyRows`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L200).
- **Lo usa** [`policySummary`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L201) (referencia), [`runtimeSnapshotMd`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L202) (referencia).

#### [`policySummary`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L201) · variable de módulo

Declara `policySummary` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`summarizePolicyRows`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L201).
- **Lo usa** [`runtimeSnapshotMd`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L202) (referencia), [`LEGAL_POLICY_SUMMARY`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L289) (accede al módulo).

#### [`runtimeSnapshotMd`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L202) · variable de módulo

Declara `runtimeSnapshotMd` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`buildRuntimeSnapshotMarkdown`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L202).
- **Lo usa** [`RAW_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L227) (referencia).

#### [`RAW_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L204) · variable de módulo

Conserva la lista de `RAW DOCS` usada por el módulo.

- **Usa código de** [`legalIndexMd`](../../../docs/legal/README.md) (referencia), [`brandPolicyMd`](../../../docs/legal/brand-icon-policy.md) (referencia), [`brandManifestMd`](../../../docs/legal/brand-icon-manifest.md) (referencia), [`legalContentPrivacyEs`](../../../packages/legal-content/content/es/privacy.md) (referencia), [`legalContentTermsEs`](../../../packages/legal-content/content/es/terms.md) (referencia), [`legalContentDataDeletionEs`](../../../packages/legal-content/content/es/data-deletion.md) (referencia), [`legalContentPrivacyEn`](../../../packages/legal-content/content/en/privacy.md) (referencia), [`legalContentTermsEn`](../../../packages/legal-content/content/en/terms.md) (referencia), [`legalContentDataDeletionEn`](../../../packages/legal-content/content/en/data-deletion.md) (referencia).
- **Llamadas directas en el cuerpo** [`buildLegalContentDoc`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L229).
- **Lo usa** [`LEGAL_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L273) (accede al módulo).

#### [`LEGAL_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L273) · variable de módulo · exportado

Declara `LEGAL_DOCS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`BRAND_ICON_POLICY_META`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`RAW_DOCS.map`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L273), [`extractDocMeta`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L274), [`slice`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L277), [`toISOString`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L277).
- **Lo usa** [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L22) (accede al módulo), [`filteredDocs`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L26) (accede al módulo).

#### [`LEGAL_POLICY_SUMMARY`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L285) · variable de módulo · exportado

Agrupa la configuración o catálogo de `LEGAL POLICY SUMMARY` para que sus consumidores lean claves comunes.

- **Campos o contexto** `version`, `reviewIntervalDays`, `owner`, `totalEntries`, `logosEnabled`, `fallbackOnly`, `statusCounts`.
- **Usa código de** [`BRAND_ICON_POLICY_META`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L9) (accede al módulo).
- **Lo usa** [`statusRows`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L56) (accede al módulo), [`AdminLegalPanel`](../../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx#L71) (accede al módulo).

### [`apps/referidos-app/src/admin/logs/LogsTable.jsx`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L1)

Consulta y organiza eventos de soporte para la pantalla de logs.

**Superficie que exporta.** [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L43).

**Módulos que lo cargan.** [`AdminLogs.jsx`](../../../apps/referidos-app/src/pages/admin/AdminLogs.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx).

#### [`LEVEL_VARIANT`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L7) · variable de módulo

Agrupa la configuración o catálogo de `LEVEL VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `fatal`, `error`, `warn`, `info`, `debug`.
- **Lo usa** [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L150) (accede al módulo).

#### [`formatDate`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L15) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L18), [`format`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L19).
- **Lo usa** [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L179) (llama).

#### [`supportActorLabel`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L28) · función

Implementa `support Actor Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `log`.
- **Condiciones que evalúa** `publicUserId`, `log.user_id`.
- **Llamadas directas en el cuerpo** [`userRef.public_user_id.trim`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L31), [`slice`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L33).
- **Lo usa** [`filteredLogs`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L83) (llama), [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L163) (llama).

#### [`compactMessage`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L37) · función

Implementa `compact Message` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `message`.
- **Condiciones que evalúa** `ausencia de text`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L38), [`text.slice`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L40).
- **Lo usa** [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L155) (llama).

#### [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L43) · componente React · exportación por defecto

Monta `Search`, `input`, `button`, `RefreshCw`, `AlertCircle`, `Table`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[logs, setLogs] mediante useState`, `[query, setQuery] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `Search`, `input`, `button`, `RefreshCw`, `AlertCircle`, `Table`, `Badge`, `ShieldCheck`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`filteredLogs.map`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L148), [`toLowerCase`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L149), [`compactMessage`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L155), [`supportActorLabel`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L163), [`slice`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L165), [`formatDate`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L179).
- **Lo usa** [`AdminLogs`](../../../apps/referidos-app/src/pages/admin/AdminLogs.jsx#L9) (renderiza).

#### [`loadLogs`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L49) · función · asíncrona · dentro de [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L43)

Consulta o invoca tabla o vista [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setLogs`.
- **Condiciones que evalúa** `fetchError`.
- **Contrato de datos** tabla o vista [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) (`select`) en [`LogsTable.jsx:53`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L53), tabla o bucket [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) en [`LogsTable.jsx:53`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L53).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L50), [`setError`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L51), [`limit`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L53), [`order`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L53), [`select`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L53), [`supabase.from`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L53), [`setLogs`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L63).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L73) (llama), [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L123) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L72) · callback de infraestructura · dentro de [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L43)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LogsTable`.

- **Llamadas directas en el cuerpo** [`loadLogs`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L73).

#### [`filteredLogs`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L76) · cálculo memorizado · dentro de [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L43)

Procesa `ed Logs` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L77), [`query.trim`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L77), [`logs.filter`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L79), [`supportActorLabel`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L83), [`category.includes`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L88), [`message.includes`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L89), [`route.includes`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L90), [`actor.includes`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L91), [`threadId.includes`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L92), [`componentKey.includes`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L93), [`releaseVersion.includes`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L94).
- **Lo usa** [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L148) (accede al módulo).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L116) · callback JSX · dentro de [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L43)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L116).

### [`apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx#L1)

Expone datos y acciones del negocio elegido desde su listado administrativo.

**Superficie que exporta.** [`NegocioDetalle`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx#L6).

**Módulos que lo cargan.** [`NegociosTable.jsx`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx).

#### [`NegocioDetalle`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx#L6) · componente React · exportación por defecto

Monta `button`, `Badge`, `Store`, `MapPin`, `Building`, `Shield`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, onClose, negocio}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `button`, `Badge`, `Store`, `MapPin`, `Building`, `Shield`.
- **Condiciones que evalúa** `ausencia de open o ausencia de negocio`.
- **Usa código de** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Lo usa** [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L155) (renderiza).

### [`apps/referidos-app/src/admin/negocios/NegociosTable.jsx`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L1)

Controla filtros, selección y acciones sobre el listado de negocios que usa el panel.

**Superficie que exporta.** [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47).

**Módulos que lo cargan.** [`AdminNegocios.jsx`](../../../apps/referidos-app/src/pages/admin/AdminNegocios.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./NegocioDetalle`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx).

#### [`NEGOCIOS`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L8) · variable de módulo

Conserva la lista de `NEGOCIOS` usada por el módulo.

- **Lo usa** [`filtered`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L54) (accede al módulo).

#### [`STATUS_VARIANT`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L41) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `activo`, `inactivo`, `suspendido`.
- **Lo usa** [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L132) (accede al módulo).

#### [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47) · componente React · exportación por defecto

Monta `button`, `Store`, `Search`, `input`, `Filter`, `select`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[query, setQuery] mediante useState`, `[sectorFilter, setSectorFilter] mediante useState`, `[selected, setSelected] mediante useState`, `[drawerOpen, setDrawerOpen] mediante useState`.
- **Interfaz que monta** `button`, `Store`, `Search`, `input`, `Filter`, `select`, `Table`, `Badge`, `NegocioDetalle`.
- **Hooks que llama** `useState`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza), [`NegocioDetalle`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx#L6) (renderiza).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L122).
- **Lo usa** [`AdminNegocios`](../../../apps/referidos-app/src/pages/admin/AdminNegocios.jsx#L12) (renderiza).

#### [`filtered`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L53) · cálculo memorizado · dentro de [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`NEGOCIOS.filter`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L54), [`includes`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L55), [`negocio.nombre.toLowerCase`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L55), [`query.toLowerCase`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L57).
- **Lo usa** [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L122) (accede al módulo).

#### [`openDrawer`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L64) · función · dentro de [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47)

Inicia `Drawer` y prepara sus dependencias.

- **Entradas** `negocio`.
- **Actualizaciones de estado o acciones** `setSelected`, `setDrawerOpen`.
- **Llamadas directas en el cuerpo** [`setSelected`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L65), [`setDrawerOpen`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L66).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L145) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L92) · callback JSX · dentro de [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L92).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L101) · callback JSX · dentro de [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSectorFilter`.
- **Llamadas directas en el cuerpo** [`setSectorFilter`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L101).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L145) · callback JSX · dentro de [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openDrawer`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L145).

#### [`NegocioDetalle.onClose`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L157) · callback JSX · dentro de [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L47)

Responde al evento de interfaz `NegocioDetalle.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDrawerOpen`.
- **Llamadas directas en el cuerpo** [`setDrawerOpen`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L157).

### [`apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L1)

Traduce errores del runtime de administración a un modal de diagnóstico o recuperación.

**Superficie que exporta.** [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L23).

**Módulos que lo cargan.** [`AdminLayout.jsx`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`DEDUPE_WINDOW_MS`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L6) · variable de módulo

Declara `DEDUPE_WINDOW_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L33) (referencia).

#### [`toEventKey`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L8) · función

Implementa `to Event Key` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event = valor por defecto`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L29) (llama).

#### [`formatNow`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L12) · función

Formatea `Now` para que el consumidor lo pueda presentar.

- **Llamadas directas en el cuerpo** [`toLocaleString`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L13).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L40) (llama).

#### [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L23) · componente React · exportación por defecto

Monta `AlertTriangle`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `[queue, setQueue] mediante useState`, `[, setLastByKey] mediante useState`.
- **Interfaz que monta** `AlertTriangle`, `button`.
- **Hooks que llama** `useState`, `useEffect`.
- **Condiciones que evalúa** `ausencia de current`.
- **Lo usa** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L46) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L27) · callback de infraestructura · dentro de [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminRuntimeErrorModalHost`.

- **Retorno visible o tipo declarado** `key`.
- **Actualizaciones de estado o acciones** `setLastByKey`, `setQueue`.
- **Efectos y APIs** `unsubscribe`.
- **Condiciones que evalúa** `DEDUPE_WINDOW_MS`.
- **Usa código de** [`subscribeErrorEvents`](../../../apps/referidos-app/src/services/loggingClient.js#L195) (llama).
- **Llamadas directas en el cuerpo** [`subscribeErrorEvents`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L28), [`toEventKey`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L29), [`setLastByKey`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L31), [`setQueue`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L36), [`formatNow`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L40), [`unsubscribe`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L54).

#### [`current`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L57) · cálculo memorizado · dentro de [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L23)

Función auxiliar de `AdminRuntimeErrorModalHost` para `current`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L58) (referencia).

#### [`close`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L60) · función · dentro de [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L23)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setQueue`.
- **Llamadas directas en el cuerpo** [`setQueue`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L61), [`items.slice`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L61).
- **Lo usa** [`AdminRuntimeErrorModalHost`](../../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx#L74) (pasa a onClick).

### [`apps/referidos-app/src/admin/observability/brandIconPolicy.js`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L1)

Define criterios de uso de activos de marca para identificar fuentes en observabilidad.

**Superficie que exporta.** [`BRAND_ICON_LEGAL_STATUS`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L1), [`BRAND_ICON_POLICY_META`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L9), [`BRAND_ICON_UI_NOTICE`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L15), [`BRAND_ICON_ANDROID_ATTRIBUTION`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L18), [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L198), [`getBrandIconPolicy`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L220).

**Módulos que lo cargan.** [`legalDocsRegistry.js`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L10) (importa), [`IssuesTable.jsx`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L23) (importa).

#### [`BRAND_ICON_LEGAL_STATUS`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L1) · variable de módulo · exportado

Declara `BRAND_ICON_LEGAL_STATUS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`APPROVED_STATUSES`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L22) (accede al módulo), [`BRAND_ICON_POLICY`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L32) (accede al módulo), [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L206) (accede al módulo).

#### [`BRAND_ICON_POLICY_META`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L9) · variable de módulo · exportado

Declara `BRAND_ICON_POLICY_META` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`buildRuntimeSnapshotMarkdown`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L181) (accede al módulo), [`LEGAL_DOCS`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L275) (accede al módulo), [`LEGAL_POLICY_SUMMARY`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L286) (accede al módulo).

#### [`BRAND_ICON_UI_NOTICE`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L15) · variable de módulo · exportado

Declara `BRAND_ICON_UI_NOTICE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`brandLegalNotes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L949) (referencia).

#### [`BRAND_ICON_ANDROID_ATTRIBUTION`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L18) · variable de módulo · exportado

Declara `BRAND_ICON_ANDROID_ATTRIBUTION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`BRAND_ICON_POLICY`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L152) (referencia).

#### [`APPROVED_STATUSES`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L21) · variable de módulo

Declara `APPROVED_STATUSES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`shouldRenderIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L195) (accede al módulo).

#### [`BRAND_ICON_POLICY`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L26) · variable de módulo

Declara `BRAND_ICON_POLICY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L201) (accede al módulo), [`getBrandIconPolicy`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L221) (referencia).

#### [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L189) · función

Normaliza `Key` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L191), [`value.trim`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L191).
- **Lo usa** [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L199) (llama).

#### [`shouldRenderIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L194) · función

Comprueba `Render Icon` para decidir si se admite o continúa la operación.

- **Entradas** `legalStatus`, `iconUrl`.
- **Llamadas directas en el cuerpo** [`APPROVED_STATUSES.has`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L195).
- **Lo usa** [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L215) (llama).

#### [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L198) · función · exportado

Obtiene o resuelve `Brand Icon` para entregarlo al consumidor.

- **Entradas** `group`, `key`, `fallbackLabel = valor por defecto`.
- **Retorno visible o tipo declarado** `key`, `label`, `iconUrl`, `showIcon`.
- **Llamadas directas en el cuerpo** [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L199), [`shouldRenderIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L215).
- **Lo usa** [`withPolicy`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L340) (llama).

#### [`getBrandIconPolicy`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L220) · función · exportado

Obtiene o resuelve `Brand Icon Policy` para entregarlo al consumidor.

- **Lo usa** [`collectPolicyRows`](../../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js#L98) (llama).

### [`apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L1)

Presenta el catálogo obs_error_catalog para dar contexto y clasificación a los códigos de error.

**Superficie que exporta.** [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L65).

**Módulos que lo cargan.** [`AdminDevErrors.jsx`](../../../apps/referidos-app/src/pages/admin/AdminDevErrors.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`@referidos/observability`](../../../packages/observability/src/index.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx).

#### [`STATUS_VARIANT`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L8) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `pending`, `defined`, `ignored`.
- **Lo usa** [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L166) (accede al módulo).

#### [`EXTRA_KNOWN_CODES`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L14) · variable de módulo

Conserva la lista de `EXTRA KNOWN CODES` usada por el módulo.

- **Lo usa** [`KNOWN_CODES`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L30) (referencia).

#### [`KNOWN_CODES`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L29) · variable de módulo

Declara `KNOWN_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`OBS_ERROR_CODES`](../../../packages/observability/src/schema/errorCodes.js#L1) (referencia).
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L29).
- **Lo usa** [`buildFallbackRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L35) (accede al módulo).

#### [`buildFallbackRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L33) · función

Construye `Fallback Rows` a partir de los datos del flujo.

- **Llamadas directas en el cuerpo** [`toISOString`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L34), [`KNOWN_CODES.map`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L35).
- **Lo usa** [`loadRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L83) (llama).

#### [`formatDate`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L52) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `iso`.
- **Condiciones que evalúa** `ausencia de iso`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L55), [`format`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L56).
- **Lo usa** [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L176) (llama).

#### [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L65) · componente React · exportación por defecto

Monta `Search`, `input`, `button`, `RefreshCw`, `Table`, `Badge`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[query, setQuery] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `Search`, `input`, `button`, `RefreshCw`, `Table`, `Badge`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L159), [`formatDate`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L176).
- **Lo usa** [`AdminDevErrors`](../../../apps/referidos-app/src/pages/admin/AdminDevErrors.jsx#L11) (renderiza).

#### [`loadRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L71) · función · asíncrona · dentro de [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L65)

Consulta o invoca tabla o vista [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `fetchError`.
- **Contrato de datos** tabla o vista [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) (`select`) en [`ErrorCatalogTable.jsx:74`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L74), tabla o bucket [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) en [`ErrorCatalogTable.jsx:74`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L74).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L72), [`setError`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L73), [`limit`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L74), [`order`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L74), [`select`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L74), [`supabase.from`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L74), [`setRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L83), [`buildFallbackRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L83).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L92) (llama), [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L133) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L91) · callback de infraestructura · dentro de [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L65)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ErrorCatalogTable`.

- **Llamadas directas en el cuerpo** [`loadRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L92).

#### [`filtered`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L95) · cálculo memorizado · dentro de [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L65)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L96), [`query.trim`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L96), [`rows.filter`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L98), [`code.includes`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L106), [`status.includes`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L107), [`message.includes`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L108), [`route.includes`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L109), [`category.includes`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L110), [`description.includes`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L111).
- **Lo usa** [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L159) (accede al módulo).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L126) · callback JSX · dentro de [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L65)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L126).
