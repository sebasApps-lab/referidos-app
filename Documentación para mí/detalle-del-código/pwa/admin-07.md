# PWA principal · Admin y operación · 7 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L1)
- [`apps/referidos-app/src/admin/versioning/services/versioningService.js`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L1)
- [`apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L1)

Compone la tabla y filtros de usuarios y comunica una selección al detalle.

**Superficie que exporta.** [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75).

**Módulos que lo cargan.** [`AdminUsuarios.jsx`](../../../apps/referidos-app/src/pages/admin/AdminUsuarios.jsx#L4) (importa), [`AdminUsuariosClientes.jsx`](../../../apps/referidos-app/src/pages/admin/AdminUsuariosClientes.jsx#L4) (importa), [`AdminUsuariosNegocios.jsx`](../../../apps/referidos-app/src/pages/admin/AdminUsuariosNegocios.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./UsuarioDrawer`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx).

#### [`USERS`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L8) · variable de módulo

Conserva la lista de `USERS` usada por el módulo.

- **Lo usa** [`filteredUsers`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L84) (accede al módulo).

#### [`STATUS_VARIANT`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L66) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `active`, `pending`, `expired`, `blocked`, `suspended`, `deleted`.
- **Lo usa** [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L205) (accede al módulo).

#### [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75) · componente React · exportación por defecto

Monta `button`, `Filter`, `Search`, `input`, `SlidersHorizontal`, `select`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{defaultRole}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[query, setQuery] mediante useState`, `[roleFilter, setRoleFilter] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`, `[emailFilter, setEmailFilter] mediante useState`, `[selectedUser, setSelectedUser] mediante useState`, `[drawerOpen, setDrawerOpen] mediante useState`.
- **Interfaz que monta** `button`, `Filter`, `Search`, `input`, `SlidersHorizontal`, `select`, `Table`, `Badge`, `UsuarioDrawer`.
- **Hooks que llama** `useState`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza), [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza), [`UsuarioDrawer`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx#L6) (renderiza).
- **Llamadas directas en el cuerpo** [`filteredUsers.map`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L195).
- **Lo usa** [`AdminUsuarios`](../../../apps/referidos-app/src/pages/admin/AdminUsuarios.jsx#L12) (renderiza), [`AdminUsuariosClientes`](../../../apps/referidos-app/src/pages/admin/AdminUsuariosClientes.jsx#L12) (renderiza), [`AdminUsuariosNegocios`](../../../apps/referidos-app/src/pages/admin/AdminUsuariosNegocios.jsx#L12) (renderiza).

#### [`filteredUsers`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L83) · cálculo memorizado · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Procesa `ed Users` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`USERS.filter`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L84), [`includes`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L86), [`user.nombre.toLowerCase`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L86), [`query.toLowerCase`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L86), [`user.email.toLowerCase`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L87).
- **Lo usa** [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L195) (accede al módulo).

#### [`openDrawer`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L100) · función · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Inicia `Drawer` y prepara sus dependencias.

- **Entradas** `user`.
- **Actualizaciones de estado o acciones** `setSelectedUser`, `setDrawerOpen`.
- **Llamadas directas en el cuerpo** [`setSelectedUser`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L101), [`setDrawerOpen`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L102).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L226) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L136) · callback JSX · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L136).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L145) · callback JSX · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setRoleFilter`.
- **Llamadas directas en el cuerpo** [`setRoleFilter`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L145).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L159) · callback JSX · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setStatusFilter`.
- **Llamadas directas en el cuerpo** [`setStatusFilter`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L159).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L174) · callback JSX · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmailFilter`.
- **Llamadas directas en el cuerpo** [`setEmailFilter`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L174).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L226) · callback JSX · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openDrawer`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L226).

#### [`UsuarioDrawer.onClose`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L238) · callback JSX · dentro de [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L75)

Responde al evento de interfaz `UsuarioDrawer.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDrawerOpen`.
- **Llamadas directas en el cuerpo** [`setDrawerOpen`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L238).

### [`apps/referidos-app/src/admin/versioning/services/versioningService.js`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L1)

Encapsula acciones a versioning-ops-proxy. Los componentes usan nombres de operación de este módulo en lugar de hablar con OPS directo.

**Superficie que exporta.** [`formatVersionLabel`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L16), [`fetchVersioningCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L90), [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L94), [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L100), [`fetchReleaseComponents`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L108), [`fetchReleaseSnapshot`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L114), [`fetchComponentHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L128), [`fetchComponentCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L135), [`fetchDrift`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L141), [`promoteRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L149), [`fetchPromotionHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L167), [`fetchDeployRequests`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L174), [`requestDeploy`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L182), [`approveDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L200), [`rejectDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L214), [`executeDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L226), [`triggerDeployPipeline`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L244), [`fetchDeployPipelineStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L264), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276), [`fetchWorkflowPackStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L306), [`syncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L314), [`previewDevRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L326), [`createDevRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L336), [`backfillReleaseArtifact`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L350), [`fetchDevReleaseStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L366) y 11 más.

**Módulos que lo cargan.** [`useDashboardProdVersions.js`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L2) (importa), [`VersioningArtifactsPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L4) (importa), [`VersioningOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L15) (importa), [`VersioningReleaseExplorerPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L4) (importa).

**Dependencias del archivo.** [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`bySemverDesc`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L3) · función

Implementa `by Semver Desc` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`, `b`.
- **Condiciones que evalúa** `aMajor`, `aMinor`, `aPatch`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L13).
- **Lo usa** [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L105) (referencia).

#### [`formatVersionLabel`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L16) · función · exportado

Formatea `Version Label` para que el consumidor lo pueda presentar.

- **Entradas** `row`.
- **Condiciones que evalúa** `ausencia de row.prerelease_tag`.
- **Lo usa** [`groupReleasesByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L65) (llama).

#### [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L22) · función · asíncrona

Centraliza la llamada del panel al proxy de versionado en el runtime. Cada método de pantalla aporta la acción OPS y sus campos.

- **Entradas** `action`, `payload = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de errorData y error.context`, `function`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:23`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L23).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L23), [`error.context.clone`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L34), [`json`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L35), [`error.context.json`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L37).
- **Lo usa** [`fetchVersioningCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L91) (llama), [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L95) (llama), [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L101) (llama), [`fetchReleaseComponents`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L109) (llama), [`fetchReleaseSnapshot`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L120) (llama), [`fetchComponentHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L129) (llama), [`fetchComponentCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L136) (llama), [`fetchDrift`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L142) (llama), [`promoteRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L157) (llama), [`fetchPromotionHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L168) (llama), [`fetchDeployRequests`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L175) (llama), [`requestDeploy`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L190) (llama) y 23 más.

#### [`fetchVersioningCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L90) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_versioning_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Contrato de datos** acción de proxy `fetch_versioning_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:91`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L91).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L91).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L804) (llama), [`loadCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L146) (llama).

#### [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L94) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_latest_releases` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `envKey = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_latest_releases` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:95`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L95).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L95).
- **Lo usa** [`reload`](../../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js#L30) (llama), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L805) (llama), [`refreshLatestReleaseRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L896) (llama).

#### [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L100) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_releases_by_product_env` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `productKey`, `envKey`.
- **Contrato de datos** acción de proxy `fetch_releases_by_product_env` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:101`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L101).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L101), [`sort`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L105).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1493) (llama), [`loadReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L162) (llama).

#### [`fetchReleaseComponents`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L108) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_release_components` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `releaseId`.
- **Contrato de datos** acción de proxy `fetch_release_components` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:109`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L109).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L109).
- **Lo usa** [`loadComponents`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L174) (llama).

#### [`fetchReleaseSnapshot`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L114) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_release_snapshot` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{releaseId, productKey, envKey, semver} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_release_snapshot` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:120`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L120).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L120).

#### [`fetchComponentHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L128) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_component_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `componentId`, `limit = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_component_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:129`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L129).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L129).
- **Lo usa** [`loadHistory`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L189) (llama).

#### [`fetchComponentCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L135) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_component_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `productKey`.
- **Contrato de datos** acción de proxy `fetch_component_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:136`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L136).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L136).
- **Lo usa** [`loadComponents`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L176) (llama).

#### [`fetchDrift`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L141) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_drift` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `productKey`, `envA = valor por defecto`, `envB = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_drift` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:142`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L142).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L142).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L855) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4409) (llama).

#### [`promoteRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L149) · función · asíncrona · exportado

Consulta o invoca acción de proxy `promote_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, fromEnv, toEnv, semver, actor, notes}`.
- **Contrato de datos** acción de proxy `promote_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:157`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L157).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L157).
- **Lo usa** [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2133) (llama).

#### [`fetchPromotionHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L167) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_promotion_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productId, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_promotion_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:168`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L168).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L168).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L857) (llama).

#### [`fetchDeployRequests`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L174) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_deploy_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{envKey, status, productKey} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_deploy_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:175`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L175).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L175).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L806) (llama), [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1326) (llama).

#### [`requestDeploy`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L182) · función · asíncrona · exportado

Consulta o invoca acción de proxy `request_deploy` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, actor, notes, metadata}`.
- **Contrato de datos** acción de proxy `request_deploy` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:190`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L190).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L190).
- **Lo usa** [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2489) (llama).

#### [`approveDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L200) · función · asíncrona · exportado

Consulta o invoca acción de proxy `approve_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, actor, forceAdminOverride, notes}`.
- **Contrato de datos** acción de proxy `approve_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:206`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L206).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L206).
- **Lo usa** [`handleApproveRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3070) (llama).

#### [`rejectDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L214) · función · asíncrona · exportado

Consulta o invoca acción de proxy `reject_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, actor, reason}`.
- **Contrato de datos** acción de proxy `reject_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:219`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L219).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L219).
- **Lo usa** [`handleRejectRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3097) (llama).

#### [`executeDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L226) · función · asíncrona · exportado

Consulta o invoca acción de proxy `execute_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, actor, status, deploymentId, logsUrl, metadata}`.
- **Contrato de datos** acción de proxy `execute_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:234`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L234).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L234).

#### [`triggerDeployPipeline`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L244) · función · asíncrona · exportado

Pide al proxy el despacho del pipeline para una solicitud de deploy ya registrada.

- **Entradas** `{requestId, forceAdminOverride, skipMerge, syncRelease, syncOnly, sourceBranch, targetBranch}`.
- **Contrato de datos** acción de proxy `trigger_deploy_pipeline` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:253`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L253).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L253).
- **Lo usa** [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2517) (llama).

#### [`fetchDeployPipelineStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L264) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_deploy_pipeline_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, runId, dispatchStartedAt} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_deploy_pipeline_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:269`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L269).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L269).
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1354) (llama).

#### [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) · función · asíncrona · exportado

Consulta o invoca acción de proxy `sync_release_branch` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, fromEnv, toEnv, semver, checkOnly, autoMerge, createPr, sourceBranch, targetBranch, operation, pullNumber, commentBody}`.
- **Contrato de datos** acción de proxy `sync_release_branch` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:290`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L290).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L290).
- **Lo usa** [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1752) (llama), [`handlePipelineRefreshChecks`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1885) (llama), [`handlePipelineAutoMerge`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1924) (llama), [`handlePipelineCancel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1967) (llama), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2033) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2185) (llama), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2469) (llama), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2612) (llama).

#### [`fetchWorkflowPackStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L306) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_workflow_pack_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{sourceRef} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_workflow_pack_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:309`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L309).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L309).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L811) (llama), [`refreshWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L912) (llama).

#### [`syncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L314) · función · asíncrona · exportado

Consulta o invoca acción de proxy `sync_workflow_pack` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{sourceRef, syncStaging, syncProd} = valor por defecto`.
- **Contrato de datos** acción de proxy `sync_workflow_pack` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:319`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L319).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L319).
- **Lo usa** [`handleSyncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L936) (llama).

#### [`previewDevRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L326) · función · asíncrona · exportado

Consulta o invoca acción de proxy `preview_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, ref} = valor por defecto`.
- **Contrato de datos** acción de proxy `preview_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:330`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L330).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L330).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1555) (llama), [`requestCreateDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2668) (llama).

#### [`createDevRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L336) · función · asíncrona · exportado

Consulta o invoca acción de proxy `create_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, ref, overrideSemver, releaseNotes}`.
- **Contrato de datos** acción de proxy `create_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:342`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L342).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L342).
- **Lo usa** [`handleCreateDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2826) (llama).

#### [`backfillReleaseArtifact`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L350) · función · asíncrona · exportado

Consulta o invoca acción de proxy `backfill_release_artifact` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{releaseId, productKey, ref, sourceCommitSha, releaseNotes} = valor por defecto`.
- **Contrato de datos** acción de proxy `backfill_release_artifact` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:357`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L357).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L357).
- **Lo usa** [`handleBackfillDevArtifact`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2928) (llama).

#### [`fetchDevReleaseStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L366) · función · asíncrona · exportado

Consulta o invoca acción de proxy `dev_release_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, ref, runId, dispatchStartedAt} = valor por defecto`.
- **Contrato de datos** acción de proxy `dev_release_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:372`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L372).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L372).
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1020) (llama).

#### [`checkReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L380) · función · asíncrona · exportado

Solicita la comparación de migraciones que usa el gate de la release para el entorno destino.

- **Entradas** `{productKey, envKey, semver}`.
- **Contrato de datos** acción de proxy `check_release_migrations` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:385`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L385).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L385).
- **Lo usa** [`handleCheckReleaseGateByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2277) (llama), [`handleApplyMigrationsForCurrentGate`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2354) (llama).

#### [`applyReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L392) · función · asíncrona · exportado

Consulta o invoca acción de proxy `apply_release_migrations` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, sourceBranch, targetBranch}`.
- **Contrato de datos** acción de proxy `apply_release_migrations` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:399`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L399).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L399).
- **Lo usa** [`handleApplyMigrationsForCurrentGate`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2337) (llama).

#### [`validateEnvironmentContract`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L408) · función · asíncrona · exportado

Consulta o invoca acción de proxy `validate_environment` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey}`.
- **Contrato de datos** acción de proxy `validate_environment` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:412`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L412).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L412).
- **Lo usa** [`handleValidateEnvironment`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2381) (llama).

#### [`fetchReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L418) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_release_artifacts` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_release_artifacts` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:422`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L422).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L422).
- **Lo usa** [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L111) (llama), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L807) (llama), [`refreshReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L902) (llama).

#### [`fetchLocalArtifactNodes`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L428) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_local_artifact_nodes` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{onlyActive, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_local_artifact_nodes` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:432`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L432).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L432).
- **Lo usa** [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L115) (llama).

#### [`upsertLocalArtifactNode`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L438) · función · asíncrona · exportado

Consulta o invoca acción de proxy `upsert_local_artifact_node` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{nodeKey, displayName, runnerLabel, osName, active, metadata}`.
- **Contrato de datos** acción de proxy `upsert_local_artifact_node` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:446`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L446).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L446).
- **Lo usa** [`handleSaveNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L222) (llama).

#### [`fetchLocalArtifactSyncRequests`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L456) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_local_artifact_sync_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, status, nodeKey, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_local_artifact_sync_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:463`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L463).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L463).
- **Lo usa** [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L116) (llama).

#### [`requestLocalArtifactSync`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L472) · función · asíncrona · exportado

Consulta o invoca acción de proxy `request_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{releaseId, productKey, envKey, semver, nodeKey, notes, metadata}`.
- **Contrato de datos** acción de proxy `request_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:481`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L481).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L481).
- **Lo usa** [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L255) (llama).

#### [`fetchBuildTimeline`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L492) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_build_timeline` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, releaseId, eventType, status, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_build_timeline` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:501`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L501).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L501).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L862) (llama).

#### [`fetchEnvConfigVersions`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L512) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_env_config_versions` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, releaseId, configKey, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_env_config_versions` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:520`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L520).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L520).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L866) (llama).

#### [`cancelLocalArtifactSyncRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L530) · función · asíncrona · exportado

Consulta o invoca acción de proxy `cancel_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, errorDetail, metadata}`.
- **Contrato de datos** acción de proxy `cancel_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.js:535`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L535).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L535).
- **Lo usa** [`handleCancelSyncRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L282) (llama).

### [`apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L1)

Muestra inventario y operaciones disponibles para artefactos de release.

**Superficie que exporta.** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87).

**Módulos que lo cargan.** [`VersioningOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L42) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./services/versioningService`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js).

#### [`formatDate`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L13) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`.
- **Llamadas directas en el cuerpo** [`toLocaleString`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L15).
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L590) (llama).

#### [`syncStatusBadgeClass`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L18) · función

Implementa `sync Status Badge Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L19).
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L690) (llama).

#### [`SYNC_STATUS_FILTERS`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L28) · variable de módulo

Conserva la lista de `SYNC STATUS FILTERS` usada por el módulo.

- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L683) (accede al módulo).

#### [`RUNNER_OS_OPTIONS`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L34) · variable de módulo

Conserva la lista de `RUNNER OS OPTIONS` usada por el módulo.

- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L388) (accede al módulo).

#### [`normalizeHistorySyncStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L40) · función

Normaliza `History Sync Status` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `status`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L41).
- **Lo usa** [`filteredSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L175) (llama), [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L723) (llama).

#### [`isSyncInProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L46) · función

Comprueba `Sync In Progress` para decidir si se admite o continúa la operación.

- **Entradas** `status`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L47).
- **Lo usa** [`inProgressSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L166) (llama), [`filteredSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L171) (llama).

#### [`inProgressStepStates`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L51) · función

Implementa `in Progress Step States` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Retorno visible o tipo declarado** `queued`, `running`, `finalize`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L52).
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L633) (llama).

#### [`toNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L67) · función

Implementa `to Node Draft` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `node`.
- **Retorno visible o tipo declarado** `nodeKey`, `displayName`, `runnerLabel`, `osName`, `active`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L69), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L69).
- **Lo usa** [`handleEditNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L206) (llama).

#### [`emptyNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L77) · función

Implementa `empty Node Draft` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Retorno visible o tipo declarado** `nodeKey`, `displayName`, `runnerLabel`, `osName`, `active`.
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L102) (llama), [`openCreateNodeForm`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L197) (llama), [`handleSaveNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L230) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L340) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L446) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L525) (llama).

#### [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87) · componente React · exportación por defecto

Monta `button`, `RefreshCw`, `Plus`, `X`, `input`, `select`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{activeProductKey}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[message, setMessage] mediante useState`, `[artifacts, setArtifacts] mediante useState`, `[nodes, setNodes] mediante useState`, `[syncRows, setSyncRows] mediante useState`, `[selectedNodeKey, setSelectedNodeKey] mediante useState`, `[syncingReleaseId, setSyncingReleaseId] mediante useState`, `[cancellingSyncRequestId, setCancellingSyncRequestId] mediante useState`, `[savingNode, setSavingNode] mediante useState`, `[addNodeFormOpen, setAddNodeFormOpen] mediante useState`, `[editingNodeKey, setEditingNodeKey] mediante useState`, `[syncStatusFilter, setSyncStatusFilter] mediante useState` y 1 más.
- **Interfaz que monta** `button`, `RefreshCw`, `Plus`, `X`, `input`, `select`, `ServerCog`, `Table`, `HardDriveDownload`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`emptyNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L102), [`RUNNER_OS_OPTIONS.some`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L388), [`RUNNER_OS_OPTIONS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L391), [`nodes.map`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L416), [`productArtifacts.map`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L573), [`formatDate`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L590), [`envHeads.join`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L593), [`map`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L632), [`inProgressSyncRows.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L632), [`inProgressStepStates`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L633), [`renderProgressStepIcon`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L659), [`SYNC_STATUS_FILTERS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L683) y 3 más.
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3293) (renderiza).

#### [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L105) · callback React · asíncrona · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Obtiene o resuelve `Data` para entregarlo al consumidor.

- **Entradas** `silent = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setArtifacts`, `setNodes`, `setSyncRows`, `setSelectedNodeKey`.
- **Condiciones que evalúa** `silent`, `current y keys.has`, `nextNodes.length`.
- **Usa código de** [`fetchReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L418) (llama), [`fetchLocalArtifactNodes`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L428) (llama), [`fetchLocalArtifactSyncRequests`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L456) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L106), [`setLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L107), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L108), [`fetchReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L111), [`fetchLocalArtifactNodes`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L115), [`fetchLocalArtifactSyncRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L116), [`setArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L122), [`setNodes`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L124), [`setSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L125), [`setSelectedNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L127), [`nextNodes.map`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L128), [`keys.has`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L129).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L144) (llama), [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L145) (referencia), [`setInterval · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L187) (llama), [`handleSaveNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L236) (llama), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L264) (llama), [`handleCancelSyncRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L290) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L316) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L143) · callback de infraestructura · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningArtifactsPanel`.

- **Llamadas directas en el cuerpo** [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L144).

#### [`productArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L148) · cálculo memorizado · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Función auxiliar de `VersioningArtifactsPanel` para `product Artifacts`.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de activeProductKey`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L149).
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L573) (accede al módulo).

#### [`scopedNodeSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L156) · cálculo memorizado · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Función auxiliar de `VersioningArtifactsPanel` para `scoped Node Sync Rows`.

- **Retorno visible o tipo declarado** `lista`, `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedNodeKey`, `ausencia de activeProductKey`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L158).
- **Lo usa** [`inProgressSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L166) (accede al módulo), [`filteredSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L171) (accede al módulo).

#### [`inProgressSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L166) · cálculo memorizado · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Función auxiliar de `VersioningArtifactsPanel` para `in Progress Sync Rows`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`scopedNodeSyncRows.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L166), [`isSyncInProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L166).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L185) (accede al módulo), [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L190) (accede al módulo).

#### [`filteredSyncRows`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L170) · cálculo memorizado · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Procesa `ed Sync Rows` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `syncStatusFilter`.
- **Llamadas directas en el cuerpo** [`scopedNodeSyncRows.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L171), [`isSyncInProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L171), [`historyRows.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L174), [`normalizeHistorySyncStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L175).
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L709) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L183) · callback de infraestructura · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningArtifactsPanel`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Condiciones que evalúa** `ausencia de selectedNodeKey`, `inProgressSyncRows.length`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L186), [`clearInterval`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L189).

#### [`setInterval · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L186) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L183)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L187).

#### [`openCreateNodeForm`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L192) · callback React · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setAddNodeFormOpen`, `setEditingNodeKey`, `setNodeDraft`.
- **Condiciones que evalúa** `next`.
- **Llamadas directas en el cuerpo** [`setAddNodeFormOpen`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L193), [`setEditingNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L196), [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L197), [`emptyNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L197).
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L329) (pasa a onClick).

#### [`handleEditNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L203) · callback React · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Maneja `Edit Node` y coordina las acciones indicadas abajo.

- **Entradas** `node`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setAddNodeFormOpen`, `setEditingNodeKey`, `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setAddNodeFormOpen`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L204), [`setEditingNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L205), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L205), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L205), [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L206), [`toNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L206).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L449) (llama).

#### [`handleSaveNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L209) · callback React · asíncrona · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setSavingNode`, `setMessage`, `setNodeDraft`, `setEditingNodeKey`, `setAddNodeFormOpen`, `setSelectedNodeKey`.
- **Condiciones que evalúa** `ausencia de nodeKey o ausencia de displayName o ausencia de runnerLabel`, `editingNodeKey`.
- **Usa código de** [`upsertLocalArtifactNode`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L438) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L210), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L210), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L214), [`setSavingNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L218), [`setMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L220), [`upsertLocalArtifactNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L222), [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L230), [`emptyNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L230), [`setEditingNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L232), [`setAddNodeFormOpen`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L234), [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L236), [`setSelectedNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L237).
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L402) (pasa a onClick).

#### [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L246) · callback React · asíncrona · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Maneja `Sync Release` y coordina las acciones indicadas abajo.

- **Entradas** `releaseId`, `semver`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setSyncingReleaseId`, `setMessage`.
- **Condiciones que evalúa** `ausencia de selectedNodeKey`.
- **Usa código de** [`requestLocalArtifactSync`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L472) (llama).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L248), [`setSyncingReleaseId`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L251), [`setMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L252), [`requestLocalArtifactSync`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L255), [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L264).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L606) (llama).

#### [`handleCancelSyncRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L275) · callback React · asíncrona · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Maneja `Cancel Sync Request` y coordina las acciones indicadas abajo.

- **Entradas** `requestId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCancellingSyncRequestId`, `setError`, `setMessage`.
- **Condiciones que evalúa** `ausencia de normalizedRequestId`.
- **Usa código de** [`cancelLocalArtifactSyncRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L530) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L276), [`setCancellingSyncRequestId`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L278), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L279), [`setMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L280), [`cancelLocalArtifactSyncRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L282), [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L290).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L647) (llama).

#### [`renderProgressStepIcon`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L300) · función · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Prepara contenido JSX usando `CheckCircle2`, `RefreshCw`.

- **Entradas** `state`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CheckCircle2`, `RefreshCw`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L659) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L316) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadData`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L316).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L338) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setAddNodeFormOpen`, `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setAddNodeFormOpen`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L339), [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L340), [`emptyNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L340).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L356) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L356).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L365) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L365).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L374) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L374).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L383) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L383).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L431) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedNodeKey`, `setAddNodeFormOpen`.
- **Condiciones que evalúa** `addNodeFormOpen`.
- **Llamadas directas en el cuerpo** [`setSelectedNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L432), [`setAddNodeFormOpen`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L433).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L443) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingNodeKey`, `setNodeDraft`.
- **Condiciones que evalúa** `editingNodeKey`.
- **Llamadas directas en el cuerpo** [`setEditingNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L445), [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L446), [`emptyNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L446), [`handleEditNode`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L449).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L471) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L472).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L482) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L483).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L493) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L494).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L523) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingNodeKey`, `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setEditingNodeKey`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L524), [`setNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L525), [`emptyNodeDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L525).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L601) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `noNodeSelected`.
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L603), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L606).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L647) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCancelSyncRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L647).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L689) · callback JSX · dentro de [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSyncStatusFilter`.
- **Llamadas directas en el cuerpo** [`setSyncStatusFilter`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L689).
