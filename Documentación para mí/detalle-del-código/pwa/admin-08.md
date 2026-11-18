# PWA principal · Admin y operación · 8 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1)

Compone el mapa de productos, entornos y versiones dentro del área de versionado.

**Superficie que exporta.** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679).

**Módulos que lo cargan.** [`AdminVersioningOverview.jsx`](../../../apps/referidos-app/src/pages/admin/AdminVersioningOverview.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./services/versioningService`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js), [`./VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx).

#### [`ENV_OPTIONS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L45) · variable de módulo

Conserva la lista de `ENV OPTIONS` usada por el módulo.

- **Lo usa** [`envCards`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1668) (accede al módulo), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4387) (accede al módulo).

#### [`DEPLOY_ENV_OPTIONS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L46) · variable de módulo

Conserva la lista de `DEPLOY ENV OPTIONS` usada por el módulo.

- **Lo usa** [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1735) (accede al módulo), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2012) (accede al módulo), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2154) (accede al módulo), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2416) (accede al módulo), [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2731) (accede al módulo), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3347) (accede al módulo).

#### [`DEPLOYABLE_PRODUCTS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L47) · variable de módulo

Conserva la lista de `DEPLOYABLE PRODUCTS` usada por el módulo.

- **Lo usa** [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1724) (accede al módulo), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2012) (accede al módulo), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2154) (accede al módulo), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2410) (accede al módulo), [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2730) (accede al módulo), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3428) (accede al módulo).

#### [`PRODUCT_PRIORITY`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L48) · variable de módulo

Conserva la lista de `PRODUCT PRIORITY` usada por el módulo.

- **Lo usa** [`compareProductsForTabs`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L53) (accede al módulo).

#### [`compareProductsForTabs`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L50) · función

Procesa `Products For Tabs` según el criterio del módulo.

- **Entradas** `a`, `b`, `isInitialized`.
- **Condiciones que evalúa** `priorityA y priorityA o priorityB`, `initializedA`.
- **Llamadas directas en el cuerpo** [`PRODUCT_PRIORITY.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L53), [`PRODUCT_PRIORITY.indexOf`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L54), [`isInitialized`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L63), [`normalizeProductLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L67), [`labelA.localeCompare`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L69).
- **Lo usa** [`orderedProducts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L769) (llama), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L829) (llama).

#### [`normalizeProductLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L72) · función

Normaliza `Product Label` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `product`.
- **Condiciones que evalúa** `key`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L73), [`toUpperCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L78).
- **Lo usa** [`compareProductsForTabs`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L67) (llama), [`selectedProductLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L773) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3287) (llama).

#### [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L81) · función

Normaliza `Env Label` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `envKey`.
- **Condiciones que evalúa** `key`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L82), [`toUpperCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L86).
- **Lo usa** [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L552) (llama), [`handlePipelineAutoMerge`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1938) (llama), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2024) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2118) (llama), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2447) (llama), [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2736) (llama), [`requestDeployVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2761) (llama), [`requestMergeVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2776) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3546) (llama).

#### [`shortHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L89) · función

Implementa `short Hash` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `len = valor por defecto`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L90), [`normalized.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L92).
- **Lo usa** [`workflowPackSourceHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L777) (llama), [`workflowPackProductionHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L781) (llama), [`workflowPackProductionHead`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L785) (llama), [`handleSyncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L965) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3602) (llama).

#### [`normalizeProductMetadata`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L95) · función

Normaliza `Product Metadata` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `product`.
- **Condiciones que evalúa** `ausencia de metadata o object o Array.isArray`.
- **Lo usa** [`isProductInitialized`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L105) (llama), [`getInitialBaselineSemver`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L110) (llama).

#### [`isProductInitialized`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L101) · función

Comprueba `Product Initialized` para decidir si se admite o continúa la operación.

- **Entradas** `product`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de product`, `product.initialized`, `0`.
- **Llamadas directas en el cuerpo** [`normalizeProductMetadata`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L105).
- **Lo usa** [`initializedByProduct`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L758) (llama), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L824) (llama), [`envCards`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1676) (llama).

#### [`getInitialBaselineSemver`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L109) · función

Obtiene o resuelve `Initial Baseline Semver` para entregarlo al consumidor.

- **Entradas** `product`.
- **Condiciones que evalúa** `fromVersioning`, `fromRoot`.
- **Llamadas directas en el cuerpo** [`normalizeProductMetadata`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L110), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L111).
- **Lo usa** [`envCards`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1666) (llama).

#### [`normalizeReleaseStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L118) · función

Normaliza `Release Status` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `envKey`, `status`.
- **Condiciones que evalúa** `ausencia de normalizedStatus`, `normalizedStatus`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L119).
- **Lo usa** [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L496) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3335) (llama).

#### [`statusBadgeClass`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L127) · función

Implementa `status Badge Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3693) (llama).

#### [`formatDate`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L136) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`.
- **Llamadas directas en el cuerpo** [`toLocaleString`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L138).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3572) (llama).

#### [`versionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L141) · función

Implementa `version Key` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `envKey`, `versionLabel`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L142), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L142).
- **Lo usa** [`latestDeployRequestByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1630) (llama), [`getLatestDeployRequestForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1637) (llama), [`getMergeStatusForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1647) (llama), [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1744) (llama).

#### [`actionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L145) · función

Implementa `action Key` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `prefix`, `...parts`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L146), [`parts.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L146), [`replace`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L147).
- **Lo usa** [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2017) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2110) (llama), [`handleCheckReleaseGateByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2273) (llama), [`handleApplyMigrationsForCurrentGate`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2333) (llama), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2421) (llama), [`handleBackfillDevArtifact`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2904) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3371) (llama).

#### [`asRecord`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L152) · función

Implementa `as Record` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1332) (llama).

#### [`deploymentStateFromRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L156) · función

Implementa `deployment State From Request` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `row`.
- **Condiciones que evalúa** `ausencia de row`, `deploymentStatus`, `requestStatus`, `requestStatus o deploymentStatus`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L158).
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1334) (llama), [`getDeploymentStateForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1642) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4236) (llama).

#### [`deploymentStateBadgeClass`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L171) · función

Implementa `deployment State Badge Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `state`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L591) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4261) (llama).

#### [`deploymentStateLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L181) · función

Implementa `deployment State Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `state`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4265) (llama).

#### [`buildEventStatusBadgeClass`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L191) · función

Construye `Event Status Badge Class` a partir de los datos del flujo.

- **Entradas** `status`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L192).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3558) (llama).

#### [`normalizeCheckState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L201) · función

Normaliza `Check State` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L202).
- **Lo usa** [`checkStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L337) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3830) (llama).

#### [`checkBadgeClass`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L209) · función

Comprueba `Badge Class` para decidir si se admite o continúa la operación.

- **Entradas** `state`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3834) (llama).

#### [`checkBadgeLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L216) · función

Comprueba `Badge Label` para decidir si se admite o continúa la operación.

- **Entradas** `state`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3835) (llama).

#### [`REQUIRED_PIPELINE_CHECKS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L223) · variable de módulo

Conserva la lista de `REQUIRED PIPELINE CHECKS` usada por el módulo.

- **Lo usa** [`formatPipelineChecksSummary`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L227) (accede al módulo), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3829) (accede al módulo).

#### [`formatPipelineChecksSummary`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L225) · función

Formatea `Pipeline Checks Summary` para que el consumidor lo pueda presentar.

- **Entradas** `checks`.
- **Condiciones que evalúa** `ausencia de checks`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L227), [`REQUIRED_PIPELINE_CHECKS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L227).
- **Lo usa** [`handlePipelineRefreshChecks`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1904) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2233) (llama), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2632) (llama).

#### [`DEV_RELEASE_STEPS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L230) · variable de módulo

Conserva la lista de `DEV RELEASE STEPS` usada por el módulo.

- **Lo usa** [`createDevReleaseProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L292) (accede al módulo).

#### [`DEV_BACKFILL_STEPS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L237) · variable de módulo

Conserva la lista de `DEV BACKFILL STEPS` usada por el módulo.

- **Lo usa** [`createBackfillProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L309) (accede al módulo).

#### [`WORKFLOW_PACK_STEPS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L244) · variable de módulo

Conserva la lista de `WORKFLOW PACK STEPS` usada por el módulo.

- **Lo usa** [`createWorkflowPackProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L261) (accede al módulo).

#### [`createWorkflowPackProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L251) · función

Construye `Workflow Pack Progress` a partir de los datos del flujo.

- **Entradas** `{status, headline, detail, stepStatus}`.
- **Llamadas directas en el cuerpo** [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L257), [`WORKFLOW_PACK_STEPS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L261).
- **Lo usa** [`handleSyncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L923) (llama).

#### [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L268) · función

Construye `Progress State` a partir de los datos del flujo.

- **Entradas** `{status, headline, detail, steps}`.
- **Retorno visible o tipo declarado** `status`, `headline`, `detail`, `steps`.
- **Lo usa** [`createWorkflowPackProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L257) (llama), [`createDevReleaseProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L288) (llama), [`createBackfillProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L305) (llama), [`buildPromoteProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L368) (llama), [`buildMergeProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L409) (llama), [`createDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L438) (llama), [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1086) (llama), [`handlePipelineCancel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1977) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2115) (llama).

#### [`createDevReleaseProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L282) · función

Construye `Dev Release Progress` a partir de los datos del flujo.

- **Entradas** `{status, headline, detail, stepStatus}`.
- **Llamadas directas en el cuerpo** [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L288), [`DEV_RELEASE_STEPS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L292).
- **Lo usa** [`handleCreateDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2807) (llama).

#### [`createBackfillProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L299) · función

Construye `Backfill Progress` a partir de los datos del flujo.

- **Entradas** `{status, headline, detail, stepStatus}`.
- **Llamadas directas en el cuerpo** [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L305), [`DEV_BACKFILL_STEPS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L309).
- **Lo usa** [`handleBackfillDevArtifact`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2914) (llama).

#### [`workflowStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L316) · función

Implementa `workflow State To Progress` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`, `conclusion`.
- **Condiciones que evalúa** `includes`, `s y ausencia de c`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L317), [`includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L319).
- **Lo usa** [`workflowStateLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L329) (llama), [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1030) (llama), [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1365) (llama).

#### [`workflowStateLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L328) · función

Implementa `workflow State Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `run`.
- **Condiciones que evalúa** `state`.
- **Llamadas directas en el cuerpo** [`workflowStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L329).
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1367) (llama).

#### [`checkStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L336) · función

Comprueba `State To Progress` para decidir si se admite o continúa la operación.

- **Entradas** `state`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`normalizeCheckState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L337).
- **Lo usa** [`buildPromoteProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L352) (llama), [`buildMergeProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L393) (llama).

#### [`buildPromoteProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L344) · función

Construye `Promote Progress` a partir de los datos del flujo.

- **Entradas** `{status, detail, checks, prCreated, releaseSynced, mergeAttempted}`.
- **Llamadas directas en el cuerpo** [`checkStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L352), [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L368).
- **Lo usa** [`setPromoteProgressFromSyncPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1824) (llama).

#### [`buildMergeProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L385) · función

Construye `Merge Progress` a partir de los datos del flujo.

- **Entradas** `{status, detail, checks, prCreated, releaseSynced, mergeAttempted}`.
- **Llamadas directas en el cuerpo** [`checkStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L393), [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L409).
- **Lo usa** [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2022) (llama).

#### [`DEPLOY_PROGRESS_STEPS`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L425) · variable de módulo

Conserva la lista de `DEPLOY PROGRESS STEPS` usada por el módulo.

- **Lo usa** [`createDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L442) (accede al módulo).

#### [`createDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L433) · función

Construye `Deploy Progress` a partir de los datos del flujo.

- **Entradas** `{status, detail, stepStatus}`.
- **Llamadas directas en el cuerpo** [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L438), [`DEPLOY_PROGRESS_STEPS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L442).
- **Lo usa** [`finalizeDeployTracking`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1295) (llama), [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1372) (llama), [`updateDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2438) (llama).

#### [`uniqueReleaseRowsByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L449) · función

Implementa `unique Release Rows By Version` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rows`.
- **Efectos y APIs** `list.push`.
- **Condiciones que evalúa** `ausencia de versionLabel o seen.has`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L453), [`seen.has`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L454), [`seen.add`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L455), [`list.push`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L456).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1496) (llama).

#### [`parseSemverLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L461) · función

Extrae o interpreta `Semver Label` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`, `major`, `minor`, `patch`.
- **Condiciones que evalúa** `ausencia de match`.
- **Llamadas directas en el cuerpo** [`match`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L462), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L462).
- **Lo usa** [`compareSemverLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L472) (llama), [`submitDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3000) (llama).

#### [`compareSemverLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L471) · función

Procesa `Semver Label` según el criterio del módulo.

- **Entradas** `a`, `b`.
- **Condiciones que evalúa** `ausencia de parsedA o ausencia de parsedB`, `parsedA.major`, `parsedA.minor`.
- **Llamadas directas en el cuerpo** [`parseSemverLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L472).
- **Lo usa** [`submitDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3004) (llama).

#### [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L480) · componente React

Monta `button`, `ChevronDown`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{row, action, actions, message, progressState, disabled, deployState, mergeState, hasArtifact, buildDisplay}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[detailsExpanded, setDetailsExpanded] mediante useState`.
- **Interfaz que monta** `button`, `ChevronDown`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L493), [`normalizeReleaseStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L496), [`toUpperCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L499), [`statusLabel.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L499), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L501), [`commitSha.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L502), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L552), [`actionList.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L556), [`deploymentStateBadgeClass`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L591), [`renderProgressIcon`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L628), [`progress.steps.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L635).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3496) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L512) · callback de infraestructura · dentro de [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L480)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersionCard`.

- **Actualizaciones de estado o acciones** `setDetailsExpanded`.
- **Condiciones que evalúa** `ausencia de hasExpandableContent`.
- **Llamadas directas en el cuerpo** [`setDetailsExpanded`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L514).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L518) · callback de infraestructura · dentro de [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L480)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersionCard`.

- **Actualizaciones de estado o acciones** `setDetailsExpanded`.
- **Condiciones que evalúa** `progress o message y hasExpandableContent`.
- **Llamadas directas en el cuerpo** [`setDetailsExpanded`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L520).

#### [`renderProgressIcon`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L524) · función · dentro de [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L480)

Prepara contenido JSX usando `CheckCircle2`, `XCircle`, `RefreshCw`.

- **Entradas** `state`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CheckCircle2`, `XCircle`, `RefreshCw`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L628) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L663) · callback JSX · dentro de [`VersionCard`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L480)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDetailsExpanded`.
- **Llamadas directas en el cuerpo** [`setDetailsExpanded`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L663).

#### [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679) · componente React · exportación por defecto

Monta `button`, `RefreshCw`, `ChevronDown`, `Activity`, `VersioningArtifactsPanel`, `VersionCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[versioningTab, setVersioningTab] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[catalog, setCatalog] mediante useState`, `[activeProductKey, setActiveProductKey] mediante useState`, `[latestReleases, setLatestReleases] mediante useState`, `[driftFrom, setDriftFrom] mediante useState`, `[driftTo, setDriftTo] mediante useState`, `[driftRows, setDriftRows] mediante useState`, `[deployRequests, setDeployRequests] mediante useState`, `[releaseArtifacts, setReleaseArtifacts] mediante useState`, `[promotionHistory, setPromotionHistory] mediante useState`, `[releaseOpsMode, setReleaseOpsMode] mediante useState` y 44 más.
- **Interfaz que monta** `button`, `RefreshCw`, `ChevronDown`, `Activity`, `VersioningArtifactsPanel`, `VersionCard`, `ShieldCheck`, `Table`, `CheckCircle2`, `XCircle`, `ArrowRightLeft`, `React.Fragment`, `X`, `Rocket`, `textarea`, `GitCompare`, `select`, `input`.
- **Hooks que llama** `useState`, `useEffect`.
- **Efectos y APIs** `actions.push`.
- **Condiciones que evalúa** `ausencia de isActiveProductInitialized`, `envKey`, `showReleaseAction`, `showBackfillAction`, `showPromoteAction`, `DEPLOY_ENV_OPTIONS.includes y DEPLOYABLE_PRODUCTS.includes y hasValidVersion`, `ausencia de isMergedForCard`, `envKey y normalizedStatus`.
- **Usa código de** [`VersioningArtifactsPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L87) (renderiza), [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`workflowPackProgress.steps.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3227), [`renderWorkflowPackStepIcon`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3238), [`orderedProducts.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3268), [`normalizeProductLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3287), [`envCards.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3332), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3333), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3334), [`normalizeReleaseStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3335), [`artifactReleaseIdSet.has`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3339), [`DEPLOY_ENV_OPTIONS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3347), [`getDeploymentStateForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3348), [`getMergeStatusForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3352) y 31 más.
- **Lo usa** [`AdminVersioningOverview`](../../../apps/referidos-app/src/pages/admin/AdminVersioningOverview.jsx#L11) (renderiza).

#### [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L742) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Aplica o guarda `Promote Progress For Env` para que el estado refleje la operación.

- **Entradas** `envKey`, `progress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPromoteProgressByEnv`.
- **Condiciones que evalúa** `ausencia de key`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L743), [`setPromoteProgressByEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L745).
- **Lo usa** [`finalizeDeployTracking`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1293) (llama), [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1370) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1482) (referencia), [`setPromoteProgressFromSyncPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1822) (llama), [`handlePipelineCancel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1975) (llama), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2020) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2113) (llama), [`updateDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2436) (llama).

#### [`selectedProduct`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L752) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Procesa `ed Product` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`catalog.products.find`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L752).
- **Lo usa** [`selectedProductLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L773) (referencia), [`envCards`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1666) (referencia).

#### [`initializedByProduct`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L755) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Inicia `ialized By Product` y prepara sus dependencias.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`map.set`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L758), [`isProductInitialized`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L758).
- **Lo usa** [`orderedProducts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L765) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1543) (accede al módulo), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1578) (referencia), [`isActiveProductInitialized`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1684) (accede al módulo).

#### [`orderedProducts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L762) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `ordered Products`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L763), [`initializedByProduct.get`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L765), [`withMeta.sort`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L768), [`compareProductsForTabs`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L769).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1838) (accede al módulo), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1851) (referencia).

#### [`selectedProductLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L773) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Procesa `ed Product Label` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`normalizeProductLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L773).
- **Lo usa** [`requestCreateDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2675) (referencia), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3949) (referencia).

#### [`workflowPackSourceHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L777) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `workflow Pack Source Hash`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`shortHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L777).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3167) (referencia).

#### [`workflowPackProductionHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L781) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `workflow Pack Production Hash`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`shortHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L781).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3172) (referencia).

#### [`workflowPackProductionHead`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L785) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `workflow Pack Production Head`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`shortHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L785).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3173) (referencia).

#### [`promoteTargetEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L793) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `promote Target Env`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`promotedToTargetVersionSet`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1856) (referencia), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2100) (referencia), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3990) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4035) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4054) (referencia).

#### [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L798) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Coordina cambios de estado durante `load`.

- **Entradas** `manual = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setCatalog`, `setLatestReleases`, `setDeployRequests`, `setReleaseArtifacts`, `setWorkflowPackStatus`, `setActiveProductKey`, `setDriftRows`, `setPromotionHistory`, `setBuildTimelineRows` y 1 más.
- **Condiciones que evalúa** `manual`, `ausencia de activeExists o hasInitialized y ausencia de activeInitialized`, `selectedProductKey`.
- **Usa código de** [`fetchVersioningCatalog`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L90) (llama), [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L94) (llama), [`fetchDeployRequests`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L174) (llama), [`fetchReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L418) (llama), [`fetchWorkflowPackStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L306) (llama), [`fetchDrift`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L141) (llama), [`fetchPromotionHistory`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L167) (llama), [`fetchBuildTimeline`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L492) (llama), [`fetchEnvConfigVersions`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L512) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L799), [`setLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L800), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L801), [`fetchVersioningCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L804), [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L805), [`fetchDeployRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L806), [`fetchReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L807), [`catch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L811), [`fetchWorkflowPackStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L811), [`setCatalog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L816), [`setLatestReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L817), [`setDeployRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L818) y 20 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L892) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L893) (referencia), [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1158) (llama), [`finalizeDeployTracking`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1314) (llama), [`handlePipelineAutoMerge`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1945) (llama), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2063) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2171) (llama), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2548) (llama), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2636) (llama), [`handleApproveRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3084) (llama), [`handleRejectRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3102) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3151) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L891) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L892).

#### [`refreshLatestReleaseRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L895) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Coordina cambios de estado durante `refresh Latest Release Rows`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLatestReleases`.
- **Usa código de** [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L94) (llama).
- **Llamadas directas en el cuerpo** [`fetchLatestReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L896), [`setLatestReleases`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L897).
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1104) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1276) (referencia).

#### [`refreshReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L901) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Coordina cambios de estado durante `refresh Release Artifacts`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setReleaseArtifacts`.
- **Usa código de** [`fetchReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L418) (llama).
- **Llamadas directas en el cuerpo** [`fetchReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L902), [`setReleaseArtifacts`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L907).
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1120) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1276) (referencia).

#### [`refreshWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L911) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Coordina cambios de estado durante `refresh Workflow Pack`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setWorkflowPackStatus`.
- **Usa código de** [`fetchWorkflowPackStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L306) (llama).
- **Llamadas directas en el cuerpo** [`fetchWorkflowPackStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L912), [`setWorkflowPackStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L915).
- **Lo usa** [`handleSyncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L964) (llama).

#### [`handleSyncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L919) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setWorkflowPackMessage`, `setWorkflowPackExpanded`, `setWorkflowPackProgress`, `setWorkflowPackSyncing`.
- **Usa código de** [`syncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L314) (llama).
- **Llamadas directas en el cuerpo** [`setWorkflowPackMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L920), [`setWorkflowPackExpanded`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L921), [`setWorkflowPackProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L922), [`createWorkflowPackProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L923), [`setWorkflowPackSyncing`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L934), [`syncWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L936), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L942), [`includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L944), [`refreshWorkflowPack`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L964), [`shortHash`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L965).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3193) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1009) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `ausencia de devReleaseSyncing`, `timerId`.
- **Llamadas directas en el cuerpo** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1270), [`clearTimeout`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1274).

#### [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1016) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1009)

Coordina cambios de estado durante `tick`.

- **Retorno visible o tipo declarado** `status`.
- **Actualizaciones de estado o acciones** `setDevReleaseProgress`, `setDevReleaseMessage`, `setDevReleaseSyncing`.
- **Efectos y APIs** `dynamicSteps.push`, `setTimeout`.
- **Condiciones que evalúa** `cancelled`, `jobSteps.length`, `run y runState`, `isBackfillMode`, `isCompleted`, `step.key`, `step.status`, `isFatalPollingError` y 1 más.
- **Usa código de** [`fetchDevReleaseStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L366) (llama).
- **Llamadas directas en el cuerpo** [`fetchDevReleaseStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1020), [`workflowStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1030), [`dynamicSteps.push`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1051), [`dynamicSteps.some`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1079), [`test`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1082), [`setDevReleaseProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1085), [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1086), [`setDevReleaseMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1095), [`setDevReleaseSyncing`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1100), [`refreshLatestReleaseRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1104), [`find`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1107), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1110) y 8 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1270) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1278) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `ausencia de activeDeployTracking.requestId`, `timerId`.
- **Llamadas directas en el cuerpo** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1476), [`clearTimeout`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1480).

#### [`finalizeDeployTracking`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1287) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1278)

Coordina cambios de estado durante `finalize Deploy Tracking`.

- **Entradas** `{requests, status, detail, logsUrl}`.
- **Actualizaciones de estado o acciones** `setPromoteProgressForEnv`, `setDeployRequests`, `setDeployMessage`, `setDeploySyncRequired`, `setActiveDeployRequestId`, `setActiveDeployTracking`.
- **Condiciones que evalúa** `cancelled`, `envKey`, `logsUrl`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1290), [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1293), [`createDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1295), [`setDeployRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1309), [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1310), [`setDeploySyncRequired`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1311), [`setActiveDeployRequestId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1312), [`setActiveDeployTracking`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1313), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1314).
- **Lo usa** [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1403) (llama).

#### [`tick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1322) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1278)

Coordina cambios de estado durante `tick`.

- **Actualizaciones de estado o acciones** `setPromoteProgressForEnv`, `setDeployRequests`, `setDeployMessage`, `setActiveDeployRequestId`, `setActiveDeployTracking`.
- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `cancelled`, `dispatchStartedAt o workflowRunId`, `deployState`, `runState`, `ausencia de callbackSettled y Number.isFinite y CALLBACK_GRACE_MS`, `MAX_WAIT_MS`.
- **Usa código de** [`fetchDeployRequests`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L174) (llama), [`fetchDeployPipelineStatus`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L264) (llama).
- **Llamadas directas en el cuerpo** [`fetchDeployRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1326), [`find`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1329), [`asRecord`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1332), [`deploymentStateFromRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1334), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1335), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1336), [`fetchDeployPipelineStatus`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1354), [`workflowStateToProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1365), [`workflowStateLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1367), [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1370), [`createDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1372), [`finalizeDeployTracking`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1403) y 5 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1476) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1484) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Actualizaciones de estado o acciones** `setPromoteRows`, `setPromoteRowsLoading`, `setError`.
- **Condiciones que evalúa** `ausencia de activeProductKey`, `cancelled`.
- **Usa código de** [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L100) (llama).
- **Llamadas directas en el cuerpo** [`setPromoteRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1486), [`setPromoteRowsLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1490), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1491), [`finally`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1493), [`catch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1493), [`then`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1493), [`fetchReleasesByProductEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1493), [`uniqueReleaseRowsByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1496).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1513) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Actualizaciones de estado o acciones** `setPromoteMessage`, `setDeployMessage`, `setApprovalMessage`, `setDeploySyncRequired`, `setActiveDeployRequestId`, `setActiveDeployTracking`, `setPromoteDraft`, `setDevReleaseDraft`, `setDevReleaseDraftError`, `setEnvCardMessages`, `setSyncPipelineState`, `setSyncPipelineActionId` y 10 más.
- **Llamadas directas en el cuerpo** [`setPromoteMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1514), [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1515), [`setApprovalMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1516), [`setDeploySyncRequired`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1517), [`setActiveDeployRequestId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1518), [`setActiveDeployTracking`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1519), [`setPromoteDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1520), [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1521), [`setDevReleaseDraftError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1522), [`setEnvCardMessages`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1523), [`setSyncPipelineState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1524), [`setSyncPipelineActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1525) y 10 más.

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1538) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Actualizaciones de estado o acciones** `setPromoteDraft`.
- **Llamadas directas en el cuerpo** [`setPromoteDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1539).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1542) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Actualizaciones de estado o acciones** `setDevReleasePreviewInfo`, `setDevReleasePreviewError`, `setDevReleasePreviewLoading`.
- **Condiciones que evalúa** `ausencia de activeProductKey o ausencia de productInitialized`, `cancelled`.
- **Usa código de** [`previewDevRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L326) (llama).
- **Llamadas directas en el cuerpo** [`initializedByProduct.get`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1543), [`setDevReleasePreviewInfo`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1545), [`setDevReleasePreviewError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1546), [`setDevReleasePreviewLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1547), [`finally`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1555), [`catch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1555), [`then`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1555), [`previewDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1555).

#### [`driftSummary`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1580) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `drift Summary`.

- **Retorno visible o tipo declarado** `total`, `differs`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`driftRows.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1582).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4422) (accede al módulo).

#### [`buildTimelinePreviewRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1586) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Construye `Timeline Preview Rows` a partir de los datos del flujo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`buildTimelineRows.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1586).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3542) (accede al módulo).

#### [`envConfigPreviewRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1590) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `env Config Preview Rows`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`envConfigRows.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1590).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3597) (accede al módulo).

#### [`selectedProductDeployRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1595) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Procesa `ed Product Deploy Requests` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`deployRequests.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1595).
- **Lo usa** [`pendingDeployCount`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1600) (accede al módulo), [`approvedDeployCount`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1604) (accede al módulo), [`executedDeployCount`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1608) (accede al módulo), [`sortedDeployRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1614) (accede al módulo), [`latestDeployRequestByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1626) (accede al módulo), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2479) (accede al módulo), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2600) (referencia).

#### [`pendingDeployCount`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1600) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `pending Deploy Count`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`selectedProductDeployRequests.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1600).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3651) (referencia).

#### [`approvedDeployCount`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1604) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `approved Deploy Count`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`selectedProductDeployRequests.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1604).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3654) (referencia).

#### [`executedDeployCount`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1608) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Aplica o guarda `d Deploy Count` para que el estado refleje la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`selectedProductDeployRequests.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1608).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3657) (referencia).

#### [`sortedDeployRequests`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1612) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Procesa `ed Deploy Requests` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `rankA`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1614), [`selectedProductDeployRequests.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1614), [`getTime`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1620).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3681) (accede al módulo).

#### [`latestDeployRequestByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1624) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `latest Deploy Request By Version`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de map.has`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1626), [`selectedProductDeployRequests.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1626), [`getTime`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1628), [`versionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1630), [`map.has`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1631), [`map.set`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1631).
- **Lo usa** [`getLatestDeployRequestForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1637) (accede al módulo).

#### [`getLatestDeployRequestForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1637) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Obtiene o resuelve `Latest Deploy Request For Version` para entregarlo al consumidor.

- **Entradas** `envKey`, `versionLabel`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`latestDeployRequestByVersion.get`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1637), [`versionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1637).
- **Lo usa** [`getDeploymentStateForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1642) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4232) (llama).

#### [`getDeploymentStateForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1642) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Obtiene o resuelve `Deployment State For Version` para entregarlo al consumidor.

- **Entradas** `envKey`, `versionLabel`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`deploymentStateFromRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1642), [`getLatestDeployRequestForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1642).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3348) (llama).

#### [`getMergeStatusForVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1647) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Obtiene o resuelve `Merge Status For Version` para entregarlo al consumidor.

- **Entradas** `envKey`, `versionLabel`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`versionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1647).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3352) (llama).

#### [`artifactReleaseIdSet`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1651) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `artifact Release Id Set`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `releaseId`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1654), [`set.add`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1655).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3339) (accede al módulo).

#### [`envCards`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1660) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `env Cards`.

- **Retorno visible o tipo declarado** `product_key`, `env_key`, `version_label`, `status`, `source_commit_sha`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `row`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1662), [`latestReleases.filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1662), [`getInitialBaselineSemver`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1666), [`ENV_OPTIONS.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1668), [`rowsByEnv.get`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1669), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1671), [`isProductInitialized`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1676).
- **Lo usa** [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1729) (accede al módulo), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3332) (accede al módulo).

#### [`isActiveProductInitialized`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1684) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Comprueba `Active Product Initialized` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`initializedByProduct.get`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1684).
- **Lo usa** [`devPreviewHasPendingRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1689) (referencia), [`devPreviewSummaryMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1697) (referencia), [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1724) (referencia), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3358) (referencia).

#### [`devPreviewHasPendingRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1688) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `dev Preview Has Pending Release`.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de devReleasePreviewInfo o ausencia de isActiveProductInitialized`.
- **Lo usa** [`devPreviewSummaryMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1702) (referencia), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3362) (referencia).

#### [`devPreviewSummaryMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1696) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `dev Preview Summary Message`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de isActiveProductInitialized`, `devReleasePreviewLoading`, `devReleasePreviewError`, `ausencia de devReleasePreviewInfo`, `devPreviewHasPendingRelease`, `suggestedSemver`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1703).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3507) (referencia).

#### [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1719) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Coordina cambios de estado durante `refresh Merge Statuses`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setMergeStatusByVersion`.
- **Condiciones que evalúa** `devReleaseSyncing o promotingActionId`, `ausencia de targets.length`.
- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama).
- **Llamadas directas en el cuerpo** [`DEPLOYABLE_PRODUCTS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1724), [`setMergeStatusByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1725), [`filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1729), [`envCards.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1729), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1731), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1732), [`DEPLOY_ENV_OPTIONS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1735), [`targets.map`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1744), [`versionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1744), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1752).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1790) (llama), [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1791) (referencia), [`handlePipelineAutoMerge`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1946) (llama), [`handlePipelineCancel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1988) (llama), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2064) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1789) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Llamadas directas en el cuerpo** [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1790).

#### [`setSyncPipelineFromPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1794) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Aplica o guarda `Sync Pipeline From Payload` para que el estado refleje la operación.

- **Entradas** `payload`, `context = valor por defecto`, `isError = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSyncPipelineState`.
- **Condiciones que evalúa** `ausencia de pr y ausencia de checks y ausencia de payload.branches`.
- **Llamadas directas en el cuerpo** [`setSyncPipelineState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1798), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1800), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1801).
- **Lo usa** [`handlePipelineRefreshChecks`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1896) (llama), [`handlePipelineAutoMerge`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1935) (llama), [`handlePipelineCancel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1974) (llama), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2038) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2193) (llama), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2550) (llama), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2620) (llama).

#### [`setPromoteProgressFromSyncPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1816) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Aplica o guarda `Promote Progress From Sync Payload` para que el estado refleje la operación.

- **Entradas** `payload`, `{toEnv, detail, status, mergeAttempted} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPromoteProgressForEnv`.
- **Condiciones que evalúa** `ausencia de envKey`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1817), [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1822), [`buildPromoteProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1824).
- **Lo usa** [`handlePipelineRefreshChecks`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1897) (llama), [`handlePipelineAutoMerge`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1936) (llama), [`handlePipelineCancel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1991) (llama), [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2175) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1837) · callback de infraestructura · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `VersioningOverviewPanel`.

- **Actualizaciones de estado o acciones** `setActiveProductKey`.
- **Condiciones que evalúa** `ausencia de orderedProducts.length`, `activeProduct y ausencia de hasInitialized o activeProduct.initializedInDev`, `fallback.product_key`.
- **Llamadas directas en el cuerpo** [`orderedProducts.find`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1839), [`orderedProducts.some`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1842), [`setActiveProductKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1849).

#### [`promotedToTargetVersionSet`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1853) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `promoted To Target Version Set`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `promoteTargetEnv`, `versionLabel`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1857), [`set.add`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1858).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3985) (accede al módulo).

#### [`deployHistoryRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1865) · cálculo memorizado · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `deploy History Rows`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1866), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1867).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4230) (accede al módulo).

#### [`openConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1872) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Inicia `Confirm Dialog` y prepara sus dependencias.

- **Entradas** `dialog`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setConfirmDialog`.
- **Llamadas directas en el cuerpo** [`setConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1873).
- **Lo usa** [`requestBackfillBuild`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2709) (llama), [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2733) (llama), [`requestDeployVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2759) (llama), [`requestMergeVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2774) (llama), [`requestSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2788) (llama).

#### [`closeConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1876) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setConfirmDialog`.
- **Condiciones que evalúa** `confirmLoading`.
- **Llamadas directas en el cuerpo** [`setConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1878).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4607) (pasa a onClick).

#### [`handlePipelineRefreshChecks`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1881) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSyncPipelineActionId`, `setSyncPipelineFromPayload`, `setPromoteProgressFromSyncPayload`, `setPromoteMessage`.
- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama).
- **Llamadas directas en el cuerpo** [`setSyncPipelineActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1883), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1885), [`setSyncPipelineFromPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1896), [`setPromoteProgressFromSyncPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1897), [`setPromoteMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1903), [`formatPipelineChecksSummary`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1904).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3910) (pasa a onClick).

#### [`handlePipelineAutoMerge`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1920) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSyncPipelineActionId`, `setSyncPipelineFromPayload`, `setPromoteProgressFromSyncPayload`, `setPromoteMessage`.
- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama).
- **Llamadas directas en el cuerpo** [`setSyncPipelineActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1922), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1924), [`setSyncPipelineFromPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1935), [`setPromoteProgressFromSyncPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1936), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1938), [`setPromoteMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1942), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1945), [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1946).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3918) (pasa a onClick).

#### [`handlePipelineCancel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1962) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSyncPipelineActionId`, `setSyncPipelineFromPayload`, `setPromoteProgressForEnv`, `setPromoteMessage`, `setPromoteProgressFromSyncPayload`.
- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama).
- **Llamadas directas en el cuerpo** [`setSyncPipelineActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1965), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1967), [`setSyncPipelineFromPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1974), [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1975), [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1977), [`setPromoteMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1987), [`refreshMergeStatuses`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1988), [`setPromoteProgressFromSyncPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L1991).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3932) (pasa a onClick).

#### [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2003) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Merge Release` y coordina las acciones indicadas abajo.

- **Entradas** `{envKey, semver, source}`.
- **Actualizaciones de estado o acciones** `setDeployMessage`, `setMergingActionId`, `setEnvCardMessages`, `setPromoteProgressForEnv`, `setSyncPipelineFromPayload`.
- **Condiciones que evalúa** `ausencia de activeProductKey o ausencia de envKey o ausencia de semver`, `ausencia de DEPLOYABLE_PRODUCTS.includes o ausencia de DEPLOY_ENV_OPTIONS.includes`.
- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama).
- **Llamadas directas en el cuerpo** [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2009), [`DEPLOYABLE_PRODUCTS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2012), [`DEPLOY_ENV_OPTIONS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2012), [`actionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2017), [`setMergingActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2018), [`setEnvCardMessages`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2019), [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2020), [`buildMergeProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2022), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2024), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2033), [`setSyncPipelineFromPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2038), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2063) y 1 más.
- **Lo usa** [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3038) (llama).

#### [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2097) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Promote Version` y coordina las acciones indicadas abajo.

- **Entradas** `{semver, fromEnv, toEnv, source, notes, syncRelease}`.
- **Actualizaciones de estado o acciones** `setPromoteMessage`, `setPromotingActionId`, `setPromoteProgressForEnv`, `setPromoteDraft`, `setPromoteProgressFromSyncPayload`, `setSyncPipelineFromPayload`.
- **Condiciones que evalúa** `ausencia de activeProductKey o ausencia de semver`, `ausencia de syncRelease`, `syncRelease`, `ausencia de DEPLOYABLE_PRODUCTS.includes o ausencia de DEPLOY_ENV_OPTIONS.includes`.
- **Usa código de** [`promoteRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L149) (llama), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama).
- **Llamadas directas en el cuerpo** [`setPromoteMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2106), [`actionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2110), [`setPromotingActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2111), [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2113), [`createProgressState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2115), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2118), [`promoteRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2133), [`DEPLOYABLE_PRODUCTS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2154), [`DEPLOY_ENV_OPTIONS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2154), [`setPromoteDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2170), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2171), [`setPromoteProgressFromSyncPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2175) y 3 más.
- **Lo usa** [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3030) (llama).

#### [`handleCheckReleaseGateByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2266) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Check Release Gate By Version` y coordina las acciones indicadas abajo.

- **Entradas** `{envKey, semver, source}`.
- **Retorno visible o tipo declarado** `null`.
- **Actualizaciones de estado o acciones** `setMigrationGateActionId`, `setDeployMessage`, `setDeployMigrationGate`.
- **Condiciones que evalúa** `ausencia de activeProductKey o ausencia de envKey o ausencia de semver`, `result.gate_passed`.
- **Usa código de** [`checkReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L380) (llama).
- **Llamadas directas en el cuerpo** [`actionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2273), [`setMigrationGateActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2274), [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2275), [`checkReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2277), [`toISOString`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2287), [`setDeployMigrationGate`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2289).
- **Lo usa** [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2451) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4294) (llama).

#### [`handleApplyMigrationsForCurrentGate`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2324) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setDeployMessage`, `setMigrationApplyActionId`, `setDeployMigrationGate`.
- **Condiciones que evalúa** `ausencia de activeProductKey o ausencia de envKey o ausencia de semver`, `result.already_applied`.
- **Usa código de** [`applyReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L392) (llama), [`checkReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L380) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2326), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2327), [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2329), [`actionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2333), [`setMigrationApplyActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2334), [`applyReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2337), [`checkReleaseMigrations`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2354), [`setDeployMigrationGate`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2359), [`toISOString`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2363).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4210) (pasa a onClick).

#### [`handleValidateEnvironment`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2372) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setDeployMessage`, `setEnvValidationLoading`, `setEnvValidationState`.
- **Condiciones que evalúa** `ausencia de activeProductKey o ausencia de deployTargetEnv`.
- **Usa código de** [`validateEnvironmentContract`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L408) (llama).
- **Llamadas directas en el cuerpo** [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2374), [`setEnvValidationLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2378), [`validateEnvironmentContract`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2381), [`setEnvValidationState`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2385).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4133) (pasa a onClick).

#### [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2399) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Deploy By Version` y coordina las acciones indicadas abajo.

- **Entradas** `{envKey, semver, source, notes}`.
- **Actualizaciones de estado o acciones** `setDeployMessage`, `setDeployingActionId`, `setReleaseOpsMode`, `setDeployTargetEnv`, `setActiveDeployRequestId`, `setDeploySyncRequired`, `setActiveDeployTracking`, `setSyncPipelineFromPayload`.
- **Condiciones que evalúa** `ausencia de activeProductKey o ausencia de envKey o ausencia de semver`, `ausencia de DEPLOYABLE_PRODUCTS.includes`, `ausencia de DEPLOY_ENV_OPTIONS.includes`, `ausencia de gateResult.gate_passed`, `existingRequest.id`, `ausencia de normalizedRequestId`, `err.code`, `currentStage`.
- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama), [`requestDeploy`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L182) (llama), [`triggerDeployPipeline`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L244) (llama).
- **Llamadas directas en el cuerpo** [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2405), [`DEPLOYABLE_PRODUCTS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2410), [`DEPLOY_ENV_OPTIONS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2416), [`actionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2421), [`setDeployingActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2422), [`setReleaseOpsMode`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2423), [`setDeployTargetEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2424), [`updateDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2445), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2447), [`handleCheckReleaseGateByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2451), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2469), [`selectedProductDeployRequests.find`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2479) y 9 más.
- **Lo usa** [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3034) (llama).

#### [`updateDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2435) · función · dentro de [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2399)

Aplica o guarda `Deploy Progress` para que el estado refleje la operación.

- **Entradas** `status = valor por defecto`, `detail = valor por defecto`.
- **Actualizaciones de estado o acciones** `setPromoteProgressForEnv`.
- **Llamadas directas en el cuerpo** [`setPromoteProgressForEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2436), [`createDeployProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2438).
- **Lo usa** [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2445) (llama).

#### [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2593) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Sync Release` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setDeployMessage`, `setDeployingActionId`, `setSyncPipelineFromPayload`, `setDeploySyncRequired`.
- **Condiciones que evalúa** `ausencia de requestId`, `ausencia de toEnv o ausencia de semver`.
- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L276) (llama).
- **Llamadas directas en el cuerpo** [`setDeployMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2596), [`find`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2600), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2603), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2604), [`setDeployingActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2606), [`syncReleaseBranch`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2612), [`setSyncPipelineFromPayload`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2620), [`setDeploySyncRequired`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2630), [`formatPipelineChecksSummary`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2632), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2636).
- **Lo usa** [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3036) (llama).

#### [`requestCreateDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2658) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Coordina cambios de estado durante `request Create Dev Release`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setDevReleaseMessage`, `setDevReleaseDraftError`, `setCreatingDevRelease`, `setDevReleaseDraft`.
- **Condiciones que evalúa** `ausencia de activeProductKey`.
- **Usa código de** [`previewDevRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L326) (llama).
- **Llamadas directas en el cuerpo** [`setDevReleaseMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2659), [`setDevReleaseDraftError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2660), [`setCreatingDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2666), [`previewDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2668), [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2673), [`preview.changed_files.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2683), [`preview.contract_hits.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2684), [`preview.minor_hits.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2685), [`preview.commit_messages.slice`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2688).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3378) (referencia).

#### [`requestBackfillBuild`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2704) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Coordina cambios de estado durante `request Backfill Build`.

- **Entradas** `{releaseId, semver, sourceCommitSha, source}`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setDevReleaseMessage`.
- **Condiciones que evalúa** `ausencia de releaseId`.
- **Llamadas directas en el cuerpo** [`setDevReleaseMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2706), [`openConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2709).
- **Lo usa** [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3395) (llama).

#### [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2728) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `request Promote Version`.

- **Entradas** `{semver, fromEnv, toEnv, source, notes}`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`DEPLOYABLE_PRODUCTS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2730), [`DEPLOY_ENV_OPTIONS.includes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2731), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2731), [`openConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2733), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2736).
- **Lo usa** [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3418) (llama), [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3463) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4032) (llama).

#### [`requestDeployVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2758) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `request Deploy Version`.

- **Entradas** `{envKey, semver, source, notes}`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2759), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2761).
- **Lo usa** [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3486) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4311) (llama).

#### [`requestMergeVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2773) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Función auxiliar de `VersioningOverviewPanel` para `request Merge Version`.

- **Entradas** `{envKey, semver, source}`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2774), [`normalizeEnvLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2776).
- **Lo usa** [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3440) (llama).

#### [`requestSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2787) · callback React · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2788).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4351) (pasa a onClick).

#### [`handleCreateDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2798) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Create Dev Release` y coordina las acciones indicadas abajo.

- **Entradas** `{overrideSemver, releaseNotes} = valor por defecto`.
- **Actualizaciones de estado o acciones** `setDevReleaseMessage`, `setCreatingDevRelease`, `setDevReleaseProgress`, `setDevReleaseSyncing`, `setDevReleaseDraft`, `setDevReleaseDraftError`.
- **Condiciones que evalúa** `ausencia de activeProductKey`.
- **Usa código de** [`createDevRelease`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L336) (llama).
- **Llamadas directas en el cuerpo** [`setDevReleaseMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2799), [`setCreatingDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2805), [`setDevReleaseProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2806), [`createDevReleaseProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2807), [`find`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2820), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2823), [`createDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2826), [`setDevReleaseSyncing`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2848), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2854), [`toISOString`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2855), [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2865), [`setDevReleaseDraftError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2866).
- **Lo usa** [`submitDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3020) (llama).

#### [`handleBackfillDevArtifact`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2888) · callback React · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Backfill Dev Artifact` y coordina las acciones indicadas abajo.

- **Entradas** `{releaseId, semver, sourceCommitSha} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setDevReleaseMessage`, `setBackfillActionId`, `setDevReleaseProgress`, `setDevReleaseSyncing`.
- **Condiciones que evalúa** `ausencia de resolvedReleaseId`, `ausencia de activeProductKey`.
- **Usa código de** [`backfillReleaseArtifact`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L350) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2893), [`setDevReleaseMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2896), [`actionKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2904), [`setBackfillActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2911), [`setDevReleaseProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2913), [`createBackfillProgress`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2914), [`backfillReleaseArtifact`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2928), [`setDevReleaseSyncing`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2952), [`toISOString`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2958).
- **Lo usa** [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3032) (llama).

#### [`closeDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2984) · función · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setDevReleaseDraft`, `setDevReleaseDraftError`.
- **Condiciones que evalúa** `creatingDevRelease`.
- **Llamadas directas en el cuerpo** [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2986), [`setDevReleaseDraftError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2987).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4468) (pasa a onClick).

#### [`submitDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2990) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setDevReleaseDraftError`.
- **Condiciones que evalúa** `ausencia de devReleaseDraft`, `mode`, `ausencia de parseSemverLabel`, `parseSemverLabel y 0`, `ausencia de suggestedSemver o ausencia de parseSemverLabel`, `devReleaseDraft.shouldCreateRelease y mode`.
- **Llamadas directas en el cuerpo** [`setDevReleaseDraftError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2992), [`trim`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L2995), [`parseSemverLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3000), [`compareSemverLabel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3004), [`handleCreateDevRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3020).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4591) (pasa a onClick).

#### [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3026) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Confirm Action` y coordina las acciones indicadas abajo.

- **Entradas** `action`.
- **Condiciones que evalúa** `ausencia de action`, `type`.
- **Llamadas directas en el cuerpo** [`handlePromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3030), [`handleBackfillDevArtifact`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3032), [`handleDeployByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3034), [`handleSyncRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3036), [`handleMergeRelease`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3038).
- **Lo usa** [`handleConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3048) (llama), [`handleSecondaryConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3060) (llama).

#### [`handleConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3042) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setConfirmLoading`, `setConfirmDialog`.
- **Condiciones que evalúa** `ausencia de confirmDialog.action`.
- **Llamadas directas en el cuerpo** [`setConfirmLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3045), [`setConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3046), [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3048).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4638) (pasa a onClick).

#### [`handleSecondaryConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3054) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setConfirmLoading`, `setConfirmDialog`.
- **Condiciones que evalúa** `ausencia de confirmDialog.secondaryAction`.
- **Llamadas directas en el cuerpo** [`setConfirmLoading`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3057), [`setConfirmDialog`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3058), [`runConfirmAction`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3060).
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4627) (pasa a onClick).

#### [`handleApproveRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3066) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Approve Request` y coordina las acciones indicadas abajo.

- **Entradas** `requestId`, `forceAdminOverride = valor por defecto`.
- **Actualizaciones de estado o acciones** `setApprovalMessage`, `setDeployingActionId`.
- **Condiciones que evalúa** `result.already_processed o status`.
- **Usa código de** [`approveDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L200) (llama).
- **Llamadas directas en el cuerpo** [`setApprovalMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3067), [`setDeployingActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3068), [`approveDeployRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3070), [`toLowerCase`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3074), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3084).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3742) (llama).

#### [`handleRejectRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3092) · función · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Reject Request` y coordina las acciones indicadas abajo.

- **Entradas** `requestId`.
- **Actualizaciones de estado o acciones** `setApprovalMessage`, `setDeployingActionId`.
- **Usa código de** [`rejectDeployRequest`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L214) (llama).
- **Llamadas directas en el cuerpo** [`window.prompt`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3093), [`setApprovalMessage`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3094), [`setDeployingActionId`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3095), [`rejectDeployRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3097), [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3102).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3751) (llama).

#### [`renderWorkflowPackStepIcon`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3117) · función · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Prepara contenido JSX usando `CheckCircle2`, `XCircle`, `RefreshCw`.

- **Entradas** `state`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CheckCircle2`, `XCircle`, `RefreshCw`.
- **Condiciones que evalúa** `state`.
- **Lo usa** [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3238) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3131) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setVersioningTab`.
- **Llamadas directas en el cuerpo** [`setVersioningTab`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3131).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3140) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setVersioningTab`.
- **Llamadas directas en el cuerpo** [`setVersioningTab`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3140).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3151) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3151).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3205) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setWorkflowPackExpanded`.
- **Llamadas directas en el cuerpo** [`setWorkflowPackExpanded`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3205).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3274) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveProductKey`.
- **Condiciones que evalúa** `disabled`.
- **Llamadas directas en el cuerpo** [`setActiveProductKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3276).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3312) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveProductKey`.
- **Condiciones que evalúa** `disabled`.
- **Llamadas directas en el cuerpo** [`setActiveProductKey`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3314).

#### [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3394) · función · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Click` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`requestBackfillBuild`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3395).

#### [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3417) · función · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Click` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3418).

#### [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3439) · función · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Click` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`requestMergeVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3440).

#### [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3462) · función · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Click` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3463).

#### [`onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3485) · función · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Maneja `Click` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`requestDeployVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3486).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3742) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleApproveRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3742).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3751) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleRejectRequest`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3751).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3779) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setReleaseOpsMode`.
- **Llamadas directas en el cuerpo** [`setReleaseOpsMode`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3779).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3789) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setReleaseOpsMode`.
- **Llamadas directas en el cuerpo** [`setReleaseOpsMode`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3789).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3956) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPromoteSourceEnv`.
- **Llamadas directas en el cuerpo** [`setPromoteSourceEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L3956).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4023) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPromoteDraft`.
- **Llamadas directas en el cuerpo** [`setPromoteDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4023).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4031) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`requestPromoteVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4032).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4049) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPromoteDraft`.
- **Llamadas directas en el cuerpo** [`setPromoteDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4050).

#### [`textarea.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4073) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPromoteDraft`.
- **Llamadas directas en el cuerpo** [`setPromoteDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4074).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4115) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDeployTargetEnv`.
- **Llamadas directas en el cuerpo** [`setDeployTargetEnv`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4115).

#### [`textarea.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4174) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDeployNotes`.
- **Llamadas directas en el cuerpo** [`setDeployNotes`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4174).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4292) · callback JSX · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCheckReleaseGateByVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4294).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4310) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`requestDeployVersion`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4311).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4384) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDriftFrom`.
- **Llamadas directas en el cuerpo** [`setDriftFrom`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4384).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4395) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDriftTo`.
- **Llamadas directas en el cuerpo** [`setDriftTo`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4395).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4406) · callback JSX · asíncrona · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDriftRows`, `setError`.
- **Condiciones que evalúa** `ausencia de activeProductKey`.
- **Usa código de** [`fetchDrift`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L141) (llama).
- **Llamadas directas en el cuerpo** [`fetchDrift`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4409), [`setDriftRows`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4410), [`setError`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4412).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4524) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDevReleaseDraft`.
- **Llamadas directas en el cuerpo** [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4525).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4535) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDevReleaseDraft`.
- **Llamadas directas en el cuerpo** [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4536).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4549) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDevReleaseDraft`.
- **Llamadas directas en el cuerpo** [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4550).

#### [`textarea.onChange`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4561) · callback JSX · dentro de [`VersioningOverviewPanel`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L679)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDevReleaseDraft`.
- **Llamadas directas en el cuerpo** [`setDevReleaseDraft`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L4562).
