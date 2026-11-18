# PWA principal · Admin y operación · 9 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L1)

Navega releases y su detalle, incluyendo los estados disponibles de promoción y despliegue.

**Superficie que exporta.** [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121).

**Módulos que lo cargan.** [`AdminVersioningReleases.jsx`](../../../apps/referidos-app/src/pages/admin/AdminVersioningReleases.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./services/versioningService`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js).

#### [`DEFAULT_PRODUCT_KEY`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L13) · variable de módulo

Declara `DEFAULT_PRODUCT_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loadCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L150) (referencia).

#### [`ENV_ORDER`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L14) · variable de módulo

Conserva la lista de `ENV ORDER` usada por el módulo.

- **Lo usa** [`normalizeEnvList`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L44) (accede al módulo).

#### [`ENV_RANK`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L15) · variable de módulo

Agrupa la configuración o catálogo de `ENV RANK` para que sus consumidores lean claves comunes.

- **Campos o contexto** `dev`, `staging`, `prod`.
- **Lo usa** [`pickCanonicalRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L51) (accede al módulo).

#### [`EMPTY_COMPONENT_HASH`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L20) · variable de módulo

Declara `EMPTY_COMPONENT_HASH` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`resolveComponentState`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L85) (referencia).

#### [`semverRowSortDesc`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L22) · función

Implementa `semver Row Sort Desc` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`, `b`.
- **Condiciones que evalúa** `aMajor`, `aMinor`, `aPatch`, `aPre`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L35).
- **Lo usa** [`groupReleasesByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L61) (referencia).

#### [`normalizeEnvList`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L38) · función

Normaliza `Env List` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `rows`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L40), [`map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L40), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L41), [`ENV_ORDER.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L44), [`envSet.has`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L44).
- **Lo usa** [`groupReleasesByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L74) (llama).

#### [`pickCanonicalRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L47) · función

Extrae o interpreta `Canonical Release` de los argumentos, estado o datos de entrada.

- **Entradas** `rows`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de rows.length`, `ausencia de winner`, `currentRank`.
- **Llamadas directas en el cuerpo** [`rows.reduce`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L49), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L51), [`getTime`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L54).
- **Lo usa** [`groupReleasesByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L73) (llama).

#### [`groupReleasesByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L60) · función

Procesa `Releases By Version` según el criterio del módulo.

- **Entradas** `rows`.
- **Retorno visible o tipo declarado** `versionLabel`, `canonical`, `envs`, `rows`.
- **Efectos y APIs** `push`.
- **Condiciones que evalúa** `ausencia de map.has`.
- **Usa código de** [`formatVersionLabel`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L16) (llama).
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L61), [`formatVersionLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L65), [`map.has`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L66), [`map.set`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L67), [`push`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L69), [`map.get`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L69), [`map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L72), [`map.entries`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L72), [`pickCanonicalRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L73), [`normalizeEnvList`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L74).
- **Lo usa** [`loadReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L163) (llama).

#### [`resolveComponentState`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L84) · función

Obtiene o resuelve `Component State` para entregarlo al consumidor.

- **Entradas** `row`.
- **Condiciones que evalúa** `EMPTY_COMPONENT_HASH`, `revisionNo y sourceBranch y ausencia de sourceCommit.startsWith`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L87), [`sourceCommit.startsWith`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L92).
- **Lo usa** [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L334) (llama).

#### [`stateBadge`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L99) · función

Implementa `state Badge` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `state`.
- **Retorno visible o tipo declarado** `JSX`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L345) (llama).

#### [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121) · componente React · exportación por defecto

Monta `select`, `button`, `RefreshCw`, `Layers3`, `Table`, `History`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[products, setProducts] mediante useState`, `[selectedProduct, setSelectedProduct] mediante useState`, `[releaseGroups, setReleaseGroups] mediante useState`, `[selectedReleaseVersion, setSelectedReleaseVersion] mediante useState`, `[components, setComponents] mediante useState`, `[selectedComponentId, setSelectedComponentId] mediante useState`, `[historyRows, setHistoryRows] mediante useState`.
- **Interfaz que monta** `select`, `button`, `RefreshCw`, `Layers3`, `Table`, `History`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`products.map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L256), [`releaseGroups.map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L269), [`join`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L271), [`group.envs.map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L271), [`env.toUpperCase`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L271), [`selectedRelease.envs.map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L316), [`components.map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L333), [`resolveComponentState`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L334), [`stateBadge`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L345), [`historyRows.map`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L376), [`toLocaleString`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L388).
- **Lo usa** [`AdminVersioningReleases`](../../../apps/referidos-app/src/pages/admin/AdminVersioningReleases.jsx#L11) (renderiza).

#### [`selectedProductMeta`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L133) · cálculo memorizado · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Procesa `ed Product Meta` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`products.find`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L133).
- **Lo usa** [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L142) (referencia).

#### [`selectedRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L138) · cálculo memorizado · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Procesa `ed Release` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`releaseGroups.find`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L138).
- **Lo usa** [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L227) (referencia), [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L234) (referencia).

#### [`loadCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L145) · función · asíncrona · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Obtiene o resuelve `Catalog` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setProducts`, `setSelectedProduct`.
- **Condiciones que evalúa** `ausencia de selectedProduct y catalog.products.length`.
- **Usa código de** [`fetchVersioningCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L90) (llama).
- **Llamadas directas en el cuerpo** [`fetchVersioningCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L146), [`setProducts`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L147), [`catalog.products.find`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L150), [`setSelectedProduct`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L152).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L198) (llama).

#### [`loadReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L156) · función · asíncrona · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Obtiene o resuelve `Releases` para entregarlo al consumidor.

- **Entradas** `productKey`.
- **Actualizaciones de estado o acciones** `setReleaseGroups`, `setSelectedReleaseVersion`.
- **Condiciones que evalúa** `ausencia de productKey`, `ausencia de grouped.find`.
- **Usa código de** [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L100) (llama).
- **Llamadas directas en el cuerpo** [`setReleaseGroups`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L158), [`setSelectedReleaseVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L159), [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L162), [`groupReleasesByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L163), [`grouped.find`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L165).
- **Lo usa** [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L215) (llama).

#### [`loadComponents`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L170) · función · asíncrona · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Obtiene o resuelve `Components` para entregarlo al consumidor.

- **Entradas** `releaseGroup`.
- **Actualizaciones de estado o acciones** `setComponents`, `setSelectedComponentId`.
- **Condiciones que evalúa** `releaseId`, `selectedProduct y isInitialized`, `ausencia de rows.find`.
- **Usa código de** [`fetchReleaseComponents`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L108) (llama), [`fetchComponentCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L135) (llama).
- **Llamadas directas en el cuerpo** [`fetchReleaseComponents`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L174), [`fetchComponentCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L176), [`setComponents`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L178), [`rows.find`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L179), [`setSelectedComponentId`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L180).
- **Lo usa** [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L227) (llama).

#### [`loadHistory`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L184) · función · asíncrona · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Obtiene o resuelve `History` para entregarlo al consumidor.

- **Entradas** `componentId`.
- **Actualizaciones de estado o acciones** `setHistoryRows`.
- **Condiciones que evalúa** `ausencia de componentId`.
- **Usa código de** [`fetchComponentHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L128) (llama).
- **Llamadas directas en el cuerpo** [`setHistoryRows`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L186), [`fetchComponentHistory`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L189).
- **Lo usa** [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L239) (llama).

#### [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L193) · función · asíncrona · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Coordina cambios de estado durante `load`.

- **Entradas** `manual = valor por defecto`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`.
- **Condiciones que evalúa** `manual`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L194), [`setLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L195), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L196), [`loadCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L198).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L208) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L281) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L207) · callback de infraestructura · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningReleaseExplorerPanel`.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L208).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L212) · callback de infraestructura · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningReleaseExplorerPanel`.

- **Llamadas directas en el cuerpo** [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L220).

#### [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L213) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L212)

Coordina cambios de estado durante `run`.

- **Actualizaciones de estado o acciones** `setError`.
- **Llamadas directas en el cuerpo** [`loadReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L215), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L217).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L220) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L224) · callback de infraestructura · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningReleaseExplorerPanel`.

- **Llamadas directas en el cuerpo** [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L232).

#### [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L225) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L224)

Coordina cambios de estado durante `run`.

- **Actualizaciones de estado o acciones** `setError`.
- **Llamadas directas en el cuerpo** [`loadComponents`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L227), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L229).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L232) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L236) · callback de infraestructura · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningReleaseExplorerPanel`.

- **Llamadas directas en el cuerpo** [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L244).

#### [`run`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L237) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L236)

Coordina cambios de estado durante `run`.

- **Actualizaciones de estado o acciones** `setError`.
- **Llamadas directas en el cuerpo** [`loadHistory`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L239), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L241).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L244) (llama).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L253) · callback JSX · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSelectedProduct`.
- **Llamadas directas en el cuerpo** [`setSelectedProduct`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L253).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L264) · callback JSX · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSelectedReleaseVersion`.
- **Llamadas directas en el cuerpo** [`setSelectedReleaseVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L264).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L281) · callback JSX · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L281).

#### [`tr.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L341) · callback JSX · dentro de [`VersioningReleaseExplorerPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L121)

Responde al evento de interfaz `tr.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedComponentId`.
- **Llamadas directas en el cuerpo** [`setSelectedComponentId`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L341).
