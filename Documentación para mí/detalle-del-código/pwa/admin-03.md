# PWA principal · Admin y operación · 3 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/observability/IssuesTable.jsx`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1)
- [`apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L1)
- [`apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L1)
- [`apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L1)
- [`apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L1)
- [`apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L1)
- [`apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L1)
- [`apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L1)
- [`apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L1)
- [`apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/observability/IssuesTable.jsx`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1)

Consulta incidencias y eventos relacionados, administra selección y pide simbolización para detalle de stack.

**Superficie que exporta.** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655).

**Módulos que lo cargan.** [`AdminObservability.jsx`](../../../apps/referidos-app/src/pages/admin/AdminObservability.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./brandIconPolicy`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js).

#### [`LEVEL_VARIANT`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L29) · variable de módulo

Agrupa la configuración o catálogo de `LEVEL VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `fatal`, `error`, `warn`, `info`, `debug`.
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1457) (accede al módulo).

#### [`EVENT_DETAIL_SELECT`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L37) · variable de módulo

Declara `EVENT_DETAIL_SELECT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L37).
- **Lo usa** [`loadEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L713) (referencia), [`loadEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L735) (referencia).

#### [`formatDate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L100) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `iso`.
- **Condiciones que evalúa** `ausencia de iso`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L103), [`format`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L104).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1129) (llama).

#### [`parseSymbolicationFromEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L114) · función

Extrae o interpreta `Symbolication From Event` de los argumentos, estado o datos de entrada.

- **Entradas** `event`.
- **Retorno visible o tipo declarado** `symbolicated_stack`, `symbolication_status`, `symbolicated_at`, `symbolication_type`, `symbolication_release`, `null`.
- **Condiciones que evalúa** `event.symbolicated_stack y object`.
- **Lo usa** [`symbolicationInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L908) (llama).

#### [`formatFrame`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L127) · función

Formatea `Frame` para que el consumidor lo pueda presentar.

- **Entradas** `frame`.
- **Condiciones que evalúa** `ausencia de frame o object`, `original.source y original.line`, `frame.file y frame.line`.
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1353) (llama).

#### [`safeJson`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L139) · función

Implementa `safe Json` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1368) (llama).

#### [`asArray`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L147) · función

Implementa `as Array` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Lo usa** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L286) (llama), [`buildFailedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L570) (llama).

#### [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L151) · función

Implementa `as Object` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `value y object y ausencia de Array.isArray`.
- **Lo usa** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L285) (llama), [`detectBrowser`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L353) (llama), [`detectProvider`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L375) (llama), [`detectContactEmail`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L398) (llama), [`detectUserDisplayName`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L409) (llama), [`detectOs`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L424) (llama), [`detectDeviceType`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L445) (llama), [`normalizeBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L504) (llama), [`isErrorBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L545) (llama), [`buildFailedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L568) (llama).

#### [`asString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L156) · función

Implementa `as String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `string`, `number o boolean`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L158).
- **Lo usa** [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L169) (llama), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L176) (llama), [`formatSymbolicationStatus`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L193) (llama), [`formatKeyAsLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L279) (llama).

#### [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L167) · función

Implementa `first String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `...values`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `next`.
- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L169).
- **Lo usa** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L322) (llama), [`detectBrowser`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L357) (llama), [`detectProvider`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L380) (llama), [`detectContactEmail`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L400) (llama), [`detectUserDisplayName`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L411) (llama), [`detectOs`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L428) (llama), [`detectDeviceType`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L448) (llama), [`normalizeBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L506) (llama), [`isErrorBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L546) (llama), [`buildFailedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L577) (llama), [`brandLegalNotes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L946) (llama).

#### [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L175) · función

Normaliza `Key` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L176), [`toLowerCase`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L176), [`asString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L176).
- **Lo usa** [`formatSymbolicationType`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L207) (llama), [`formatLevelLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L215) (llama), [`formatLevelBadge`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L226) (llama), [`formatEventTypeLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L237) (llama), [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L301) (llama), [`detectBrowser`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L356) (llama), [`detectProvider`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L379) (llama), [`detectOs`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L427) (llama), [`detectDeviceType`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L447) (llama), [`isErrorBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L546) (llama), [`breadcrumbTimeline`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L968) (llama).

#### [`SYMBOLICATION_STATUS_LABELS`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L179) · variable de módulo

Agrupa la configuración o catálogo de `SYMBOLICATION STATUS LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `ok`, `ok:dev_native_stack`, `ok:dev_manifest_passthrough`, `ok:dev_no_mapped_frames`, `error:release_not_found`, `error:manifest_path_missing`, `error:manifest_download_failed`, `error:manifest_empty`, `error:manifest_invalid_json`, `error:no_mapped_frames`.
- **Lo usa** [`formatSymbolicationStatus`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L195) (accede al módulo).

#### [`formatSymbolicationStatus`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L192) · función

Formatea `Symbolication Status` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de key`, `known`, `key.startsWith`.
- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L193), [`key.startsWith`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L197), [`replace`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L198), [`key.slice`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L198).
- **Lo usa** [`buildImportantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L476) (llama), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1294) (llama).

#### [`formatSymbolicationType`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L206) · función

Formatea `Symbolication Type` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de key`, `key`.
- **Llamadas directas en el cuerpo** [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L207).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1295) (llama).

#### [`formatLevelLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L214) · función

Formatea `Level Label` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de key`, `key`.
- **Llamadas directas en el cuerpo** [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L215).
- **Lo usa** [`buildImportantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L466) (llama), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1268) (llama).

#### [`formatLevelBadge`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L225) · función

Formatea `Level Badge` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de key`, `key`.
- **Llamadas directas en el cuerpo** [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L226).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1458) (llama).

#### [`formatEventTypeLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L236) · función

Formatea `Event Type Label` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de key`, `key`.
- **Llamadas directas en el cuerpo** [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L237).
- **Lo usa** [`buildImportantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L467) (llama), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1269) (llama).

#### [`BREADCRUMB_STATUS_META`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L247) · variable de módulo

Agrupa la configuración o catálogo de `BREADCRUMB STATUS META` para que sus consumidores lean claves comunes.

- **Campos o contexto** `present`, `missing_early_boot`, `missing_runtime_failure`, `missing_source_uninstrumented`, `missing_payload_empty`, `missing_storage_unavailable`, `missing_unknown`.
- **Lo usa** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L324) (accede al módulo).

#### [`BREADCRUMB_SOURCE_LABELS`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L257) · variable de módulo

Agrupa la configuración o catálogo de `BREADCRUMB SOURCE LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `memory`, `storage`, `merged`, `provided`, `none`.
- **Lo usa** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L327) (accede al módulo).

#### [`BREADCRUMB_REASON_LABELS`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L265) · variable de módulo

Agrupa la configuración o catálogo de `BREADCRUMB REASON LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `runtime_not_initialized`, `runtime_init_failed`, `runtime_runtime_error`, `storage_unavailable`, `storage_read_failed`, `storage_write_failed`, `edge_without_breadcrumb_steps`, `worker_without_breadcrumb_steps`, `payload_breadcrumbs_empty`, `missing_reason_not_determined`.
- **Lo usa** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L329) (accede al módulo).

#### [`formatKeyAsLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L278) · función

Formatea `Key As Label` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Efectos y APIs** `raw.replace`.
- **Condiciones que evalúa** `ausencia de raw`.
- **Llamadas directas en el cuerpo** [`asString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L279), [`raw.replace`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L281).
- **Lo usa** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L324) (llama).

#### [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L284) · función

Obtiene o resuelve `Breadcrumb Diagnostics` para entregarlo al consumidor.

- **Entradas** `event`.
- **Retorno visible o tipo declarado** `count`, `lastAt`, `status`, `statusLabel`, `statusTone`, `source`, `sourceLabel`, `reason`, `reasonLabel`, `meta`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L285), [`asArray`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L286), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L301), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L322), [`formatKeyAsLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L324).
- **Lo usa** [`breadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L920) (llama).

#### [`breadcrumbStatusClass`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L334) · función

Implementa `breadcrumb Status Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `tone`.
- **Condiciones que evalúa** `tone`.
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1114) (llama).

#### [`withPolicy`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L339) · función

Implementa `with Policy` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `group`, `key`, `fallbackLabel = valor por defecto`.
- **Retorno visible o tipo declarado** `key`, `label`, `iconUrl`, `legalStatus`, `legalReason`, `sourceUrl`, `attribution`.
- **Usa código de** [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L198) (llama).
- **Llamadas directas en el cuerpo** [`resolveBrandIcon`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L340).
- **Lo usa** [`detectBrowser`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L364) (llama), [`detectProvider`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L388) (llama), [`detectOs`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L435) (llama).

#### [`detectBrowser`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L352) · función

Implementa `detect Browser` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Condiciones que evalúa** `ausencia de raw`, `raw.includes`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L353), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L356), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L357), [`withPolicy`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L364), [`raw.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L365).
- **Lo usa** [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L935) (llama).

#### [`detectProvider`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L374) · función

Implementa `detect Provider` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Condiciones que evalúa** `ausencia de raw`, `raw.includes`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L375), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L379), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L380), [`withPolicy`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L388), [`raw.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L389).
- **Lo usa** [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L936) (llama).

#### [`detectContactEmail`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L397) · función

Implementa `detect Contact Email` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L398), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L400).
- **Lo usa** [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L940) (llama).

#### [`detectUserDisplayName`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L408) · función

Implementa `detect User Display Name` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L409), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L411).
- **Lo usa** [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L939) (llama).

#### [`detectOs`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L423) · función

Implementa `detect Os` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Condiciones que evalúa** `ausencia de raw`, `raw.includes`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L424), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L427), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L428), [`withPolicy`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L435), [`raw.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L436).
- **Lo usa** [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L937) (llama).

#### [`detectDeviceType`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L444) · función

Implementa `detect Device Type` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`, `osKey`.
- **Retorno visible o tipo declarado** `key`, `label`, `Icon`.
- **Condiciones que evalúa** `raw.includes`, `osKey`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L445), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L447), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L448), [`raw.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L454).
- **Lo usa** [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L938) (llama).

#### [`buildImportantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L463) · función

Construye `Important Tags` a partir de los datos del flujo.

- **Entradas** `{event, symbolicationInfo, identity, breadcrumbDiagnostics}`.
- **Retorno visible o tipo declarado** `lista`.
- **Efectos y APIs** `tags.push`.
- **Condiciones que evalúa** `ausencia de event`, `breadcrumbDiagnostics.reasonLabel`.
- **Llamadas directas en el cuerpo** [`formatLevelLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L466), [`formatEventTypeLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L467), [`formatSymbolicationStatus`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L476), [`tags.push`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L492), [`tags.filter`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L494).
- **Lo usa** [`importantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L956) (llama).

#### [`tagToneClass`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L497) · función

Implementa `tag Tone Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `tone`.
- **Condiciones que evalúa** `tone`.
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1052) (llama).

#### [`normalizeBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L503) · función

Normaliza `Breadcrumb` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `entry`, `index`.
- **Retorno visible o tipo declarado** `id`, `index`, `title`, `timestamp`, `detail`, `meta`, `raw`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L504), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L506), [`filter`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L519).
- **Lo usa** [`breadcrumbTimeline`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L967) (llama).

#### [`toInt`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L538) · función

Implementa `to Int` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`.
- **Lo usa** [`buildFailedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L573) (llama).

#### [`isErrorBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L544) · función

Comprueba `Error Breadcrumb` para decidir si se admite o continúa la operación.

- **Entradas** `crumb`, `eventLevelKey`, `isLast`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `level`, `errorWords.some`, `isLast y eventLevelKey`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L545), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L546), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L546), [`toLowerCase`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L548), [`errorWords.some`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L562), [`hay.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L562).
- **Lo usa** [`breadcrumbTimeline`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L970) (llama).

#### [`buildFailedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L567) · función

Construye `Failed Code Context` a partir de los datos del flujo.

- **Entradas** `symbolicationInfo`, `symbolicatedFrames`.
- **Retorno visible o tipo declarado** `lineNo`, `text`, `highlight`, `source`, `line`, `column`, `frameLabel`, `lines`, `null`.
- **Condiciones que evalúa** `excerptLines.length`, `ausencia de frameWithExcerpt`, `ausencia de rawLines.length`.
- **Llamadas directas en el cuerpo** [`asObject`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L568), [`asArray`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L570), [`toInt`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L573), [`excerptLines.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L574), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L577), [`frames.find`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L591), [`rawLines.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L605).
- **Lo usa** [`failedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L983) (llama).

#### [`IdentityCard`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L622) · componente React

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, value, subtitle, iconUrl, FallbackIcon}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Llamadas directas en el cuerpo** [`React.createElement`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L627).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1062) (renderiza).

#### [`img.onError`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L635) · callback JSX · dentro de [`IdentityCard`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L622)

Responde al evento de interfaz `img.onError`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.

#### [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655) · componente React · exportación por defecto

Monta `button`, `ArrowLeft`, `RefreshCw`, `Tags`, `IdentityCard`, `Layers3`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[issues, setIssues] mediante useState`, `[events, setEvents] mediante useState`, `[eventDetails, setEventDetails] mediante useState`, `[query, setQuery] mediante useState`, `[loadingIssues, setLoadingIssues] mediante useState`, `[loadingEvents, setLoadingEvents] mediante useState`, `[error, setError] mediante useState`, `[symbolicateBusy, setSymbolicateBusy] mediante useState`, `[cacheIssueBusy, setCacheIssueBusy] mediante useState`, `[symbolicationError, setSymbolicationError] mediante useState`, `[symbolicationByEvent, setSymbolicationByEvent] mediante useState`, `[issuePulseId, setIssuePulseId] mediante useState`, `[eventPulseId, setEventPulseId] mediante useState`, `issuePulseTimeoutRef mediante useRef` y 1 más.
- **Interfaz que monta** `button`, `ArrowLeft`, `RefreshCw`, `Tags`, `IdentityCard`, `Layers3`, `AlertOctagon`, `Code2`, `Sparkles`, `Badge`, `Search`, `input`, `AlertCircle`, `Table`.
- **Hooks que llama** `useLocation`, `useNavigate`, `useSearchParams`, `useState`, `useRef`, `useEffect`.
- **Condiciones que evalúa** `isDetailsRoute`, `loadingEvents y ausencia de selectedEvent`, `ausencia de selectedEvent`, `isEventsRoute`.
- **Usa código de** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza), [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`path.endsWith`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L661), [`searchParams.get`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L664), [`importantTags.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1049), [`tagToneClass`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1052), [`brandLegalNotes.attributions.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1099), [`breadcrumbStatusClass`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1114), [`formatDate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1129), [`breadcrumbTimeline.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1146), [`crumb.meta.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1192), [`failedCodeContext.lines.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1233), [`formatLevelLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1268), [`formatEventTypeLabel`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1269) y 8 más.
- **Lo usa** [`AdminObservability`](../../../apps/referidos-app/src/pages/admin/AdminObservability.jsx#L33) (renderiza).

#### [`loadIssues`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L683) · función · asíncrona · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Consulta o invoca tabla o vista [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLoadingIssues`, `setError`, `setIssues`.
- **Condiciones que evalúa** `fetchError`.
- **Contrato de datos** tabla o vista [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) (`select`) en [`IssuesTable.jsx:686`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L686), tabla o bucket [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) en [`IssuesTable.jsx:686`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L686).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoadingIssues`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L684), [`setError`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L685), [`limit`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L686), [`order`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L686), [`select`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L686), [`supabase.from`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L686), [`setIssues`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L699).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L844) (llama), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1510) (pasa a onClick).

#### [`loadEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L703) · función · asíncrona · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Consulta o invoca tabla o vista [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) y coordina las demás operaciones de esta ficha.

- **Entradas** `targetIssueId`.
- **Actualizaciones de estado o acciones** `setEventPulseId`, `setSymbolicationError`, `setEvents`, `setLoadingEvents`.
- **Condiciones que evalúa** `ausencia de targetIssueId`, `fetchError`.
- **Contrato de datos** tabla o vista [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) (`select`) en [`IssuesTable.jsx:711`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711), tabla o bucket [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) en [`IssuesTable.jsx:711`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setEventPulseId`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L704), [`setSymbolicationError`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L705), [`setEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L707), [`setLoadingEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L710), [`limit`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711), [`order`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711), [`eq`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711), [`select`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711), [`supabase.from`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711).
- **Lo usa** [`cacheIssue`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L812) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L853) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1419) (llama).

#### [`loadEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L727) · función · asíncrona · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Consulta o invoca tabla o vista [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) y coordina las demás operaciones de esta ficha.

- **Entradas** `targetIssueId`, `targetEventId`.
- **Actualizaciones de estado o acciones** `setEventDetails`, `setLoadingEvents`, `setSymbolicationError`.
- **Condiciones que evalúa** `ausencia de targetEventId`, `fetchError o ausencia de data`, `fetchError`.
- **Contrato de datos** tabla o vista [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) (`select`) en [`IssuesTable.jsx:733`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L733), tabla o bucket [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) en [`IssuesTable.jsx:733`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L733).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L729), [`setLoadingEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L732), [`maybeSingle`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L733), [`eq`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L733), [`select`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L733), [`supabase.from`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L733), [`setSymbolicationError`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L744).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L859) (llama).

#### [`symbolicateEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L752) · función · asíncrona · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Consulta o invoca Edge [`obs-symbolicate`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `targetEventId`, `options = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Actualizaciones de estado o acciones** `setSymbolicateBusy`, `setSymbolicationError`, `setSymbolicationByEvent`.
- **Condiciones que evalúa** `ausencia de targetEventId`, `invokeError o ausencia de data.ok o ausencia de data.result`.
- **Contrato de datos** Edge [`obs-symbolicate`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts) en [`IssuesTable.jsx:756`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L756).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSymbolicateBusy`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L754), [`setSymbolicationError`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L755), [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L756), [`setSymbolicationByEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L776).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L860) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1028) (llama).

#### [`cacheIssue`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L783) · función · asíncrona · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Consulta o invoca Edge [`obs-symbolicate`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts). El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setCacheIssueBusy`, `setSymbolicationError`, `setSymbolicationByEvent`.
- **Condiciones que evalúa** `ausencia de issueId`, `invokeError o ausencia de data.ok`, `ausencia de item.event_id`, `length`.
- **Contrato de datos** Edge [`obs-symbolicate`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts) en [`IssuesTable.jsx:787`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L787).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setCacheIssueBusy`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L785), [`setSymbolicationError`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L786), [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L787), [`forEach`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L805), [`setSymbolicationByEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L810), [`loadEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L812).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1428) (pasa a onClick).

#### [`openEventsScreen`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L815) · función · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Inicia `Events Screen` y prepara sus dependencias.

- **Entradas** `targetIssueId`.
- **Actualizaciones de estado o acciones** `setIssuePulseId`, `clearTimeout`.
- **Efectos y APIs** `window.clearTimeout`, `window.setTimeout`.
- **Condiciones que evalúa** `ausencia de targetIssueId`, `issuePulseTimeoutRef.current`.
- **Llamadas directas en el cuerpo** [`setIssuePulseId`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L817), [`window.clearTimeout`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L819), [`window.setTimeout`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L821).
- **Lo usa** [`tr.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1539) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L821) · callback de infraestructura · dentro de [`openEventsScreen`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L815)

Ejecuta trabajo diferido o periódico iniciado por `openEventsScreen`.

- **Actualizaciones de estado o acciones** `setIssuePulseId`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`setIssuePulseId`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L822), [`navigate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L824), [`encodeURIComponent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L824).

#### [`openEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L828) · función · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Inicia `Event Details` y prepara sus dependencias.

- **Entradas** `targetEventId`.
- **Actualizaciones de estado o acciones** `setEventPulseId`, `clearTimeout`.
- **Efectos y APIs** `window.clearTimeout`, `window.setTimeout`.
- **Condiciones que evalúa** `ausencia de targetEventId o ausencia de issueId`, `eventPulseTimeoutRef.current`.
- **Llamadas directas en el cuerpo** [`setEventPulseId`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L830), [`window.clearTimeout`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L832), [`window.setTimeout`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L834).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1449) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L834) · callback de infraestructura · dentro de [`openEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L828)

Ejecuta trabajo diferido o periódico iniciado por `openEventDetails`.

- **Actualizaciones de estado o acciones** `setEventPulseId`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`setEventPulseId`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L835), [`navigate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L837), [`encodeURIComponent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L838).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L843) · callback de infraestructura · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `IssuesTable`.

- **Llamadas directas en el cuerpo** [`loadIssues`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L844).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L847) · callback de infraestructura · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `IssuesTable`.

- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `ausencia de isEventsRoute y ausencia de isDetailsRoute`, `ausencia de issueId`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L850), [`loadEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L853).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L856) · callback de infraestructura · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `IssuesTable`.

- **Actualizaciones de estado o acciones** `setSymbolicationError`.
- **Condiciones que evalúa** `ausencia de isDetailsRoute o ausencia de eventId o ausencia de issueId`.
- **Llamadas directas en el cuerpo** [`setSymbolicationError`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L858), [`loadEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L859), [`symbolicateEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L860).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L863) · callback de infraestructura · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `IssuesTable`.

- **Actualizaciones de estado o acciones** `setEventDetails`.
- **Condiciones que evalúa** `ausencia de isDetailsRoute`.
- **Llamadas directas en el cuerpo** [`setEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L865).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L870) · callback de infraestructura · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `IssuesTable`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `window.clearTimeout`.
- **Condiciones que evalúa** `issuePulseTimeoutRef.current`, `eventPulseTimeoutRef.current`.
- **Llamadas directas en el cuerpo** [`window.clearTimeout`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L871).

#### [`filteredIssues`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L877) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Procesa `ed Issues` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L878), [`query.trim`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L878), [`issues.filter`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L880), [`title.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L887), [`level.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L888), [`release.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L889), [`userName.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L890), [`userEmail.includes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L891).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1536) (accede al módulo).

#### [`selectedIssue`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L897) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Procesa `ed Issue` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`issues.find`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L897).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1410) (referencia).

#### [`selectedEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L901) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Procesa `ed Event` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `eventDetails.id`.
- **Llamadas directas en el cuerpo** [`events.find`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L903).
- **Lo usa** [`symbolicationInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L907) (referencia), [`breadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L920) (referencia), [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L925) (referencia), [`importantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L957) (referencia), [`breadcrumbTimeline`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L966) (referencia), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L988) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1028) (accede al módulo).

#### [`symbolicationInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L906) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `symbolication Info`.

- **Retorno visible o tipo declarado** `null`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedEvent`.
- **Llamadas directas en el cuerpo** [`parseSymbolicationFromEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L908).
- **Lo usa** [`symbolicatedFrames`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L913) (referencia), [`importantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L958) (referencia), [`failedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L983) (referencia), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1294) (referencia).

#### [`symbolicatedFrames`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L912) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `symbolicated Frames`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`failedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L983) (referencia), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1347) (accede al módulo).

#### [`breadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L920) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `breadcrumb Diagnostics`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`resolveBreadcrumbDiagnostics`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L920).
- **Lo usa** [`importantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L960) (referencia), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1115) (accede al módulo).

#### [`identityInfo`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L924) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `identity Info`.

- **Retorno visible o tipo declarado** `browser`, `provider`, `os`, `deviceType`, `userName`, `email`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedEvent`.
- **Llamadas directas en el cuerpo** [`detectBrowser`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L935), [`detectProvider`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L936), [`detectOs`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L937), [`detectDeviceType`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L938), [`detectUserDisplayName`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L939), [`detectContactEmail`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L940).
- **Lo usa** [`brandLegalNotes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L945) (referencia), [`importantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L959) (referencia), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1064) (accede al módulo).

#### [`brandLegalNotes`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L944) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `brand Legal Notes`.

- **Retorno visible o tipo declarado** `notice`, `attributions`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`BRAND_ICON_UI_NOTICE`](../../../apps/referidos-app/src/admin/observability/brandIconPolicy.js#L15) (referencia).
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L945), [`map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L945), [`firstString`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L946).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1098) (accede al módulo).

#### [`importantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L955) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `important Tags`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`buildImportantTags`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L956).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1049) (accede al módulo).

#### [`breadcrumbTimeline`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L965) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `breadcrumb Timeline`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `errorIndex y normalized.length y eventLevelKey`.
- **Llamadas directas en el cuerpo** [`raw.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L967), [`normalizeBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L967), [`normalizeKey`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L968), [`normalized.map`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L969), [`isErrorBreadcrumb`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L970), [`flags.lastIndexOf`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L972).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1111) (accede al módulo).

#### [`failedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L983) · cálculo memorizado · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Función auxiliar de `IssuesTable` para `failed Code Context`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`buildFailedCodeContext`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L983).
- **Lo usa** [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1226) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1002) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1002), [`encodeURIComponent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1002).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1017) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1017), [`encodeURIComponent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1017).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1028) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`symbolicateEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1028).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1403) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1403).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1419) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1419).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1449) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1449).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1503) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1503).

#### [`tr.onClick`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1539) · callback JSX · dentro de [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L655)

Responde al evento de interfaz `tr.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openEventsScreen`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1539).

### [`apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L1)

Dispara o programa sincronización de telemetría del runtime mediante la Edge Function de dispatch.

**Superficie que exporta.** [`useOpsTelemetryHotSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L6).

**Módulos que lo cargan.** [`AdminDashboardAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L4) (importa), [`AdminObservability.jsx`](../../../apps/referidos-app/src/pages/admin/AdminObservability.jsx#L5) (importa), [`AdminPrelaunchAnalytics.jsx`](../../../apps/referidos-app/src/pages/admin/AdminPrelaunchAnalytics.jsx#L4) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`DEFAULT_HOT_INTERVAL_MS`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L4) · variable de módulo

Declara `DEFAULT_HOT_INTERVAL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useOpsTelemetryHotSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L9) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L47) (referencia).

#### [`useOpsTelemetryHotSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L6) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Ops Telemetry Hot Sync` para sus consumidores React.

- **Entradas** `{enabled, panelKey, intervalMs} = valor por defecto`.
- **Estado o valores vinculados** `inFlightRef mediante useRef`.
- **Hooks que llama** `useRef`, `useEffect`.
- **Lo usa** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L54) (llama), [`AdminObservability`](../../../apps/referidos-app/src/pages/admin/AdminObservability.jsx#L26) (llama), [`AdminPrelaunchAnalytics`](../../../apps/referidos-app/src/pages/admin/AdminPrelaunchAnalytics.jsx#L32) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L13) · callback de infraestructura · dentro de [`useOpsTelemetryHotSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L6)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useOpsTelemetryHotSync`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `document.addEventListener`, `globalThis.clearInterval`, `document.removeEventListener`.
- **Condiciones que evalúa** `ausencia de enabled`, `undefined`.
- **Llamadas directas en el cuerpo** [`runSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L43), [`globalThis.setInterval`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L45), [`document.addEventListener`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L56), [`globalThis.clearInterval`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L61), [`document.removeEventListener`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L63).

#### [`runSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L18) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L13)

Consulta o invoca Edge [`ops-telemetry-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `force = valor por defecto`.
- **Condiciones que evalúa** `disposed o inFlightRef.current`, `ausencia de force y undefined y document.visibilityState`.
- **Contrato de datos** Edge [`ops-telemetry-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts) en [`useOpsTelemetryHotSync.js:30`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L30).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L30).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L43) (llama), [`setInterval · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L46) (llama), [`handleVisibility`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L51) (llama).

#### [`setInterval · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L45) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L13)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`runSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L46).

#### [`handleVisibility`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L49) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L13)

Maneja `Visibility` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `document.visibilityState`.
- **Llamadas directas en el cuerpo** [`runSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L51).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L56) (referencia).

### [`apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L1)

Comparte cálculos de escala, puntos, fechas o formato para tarjetas de gráficas SVG.

**Superficie que exporta.** [`clampChartMax`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L1), [`buildLineChartGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L7), [`buildVerticalBarGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L78), [`getMeterRatio`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L131).

**Módulos que lo cargan.** [`SvgMetricAverageCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L1) (importa), [`SvgMetricCompareCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L1) (importa), [`SvgMetricLineCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L1) (importa).

#### [`clampChartMax`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L1) · función · exportado

Implementa `clamp Chart Max` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `ausencia de Number.isFinite o parsed`.
- **Lo usa** [`buildVerticalBarGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L82) (llama), [`getMeterRatio`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L132) (llama).

#### [`buildLineChartGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L7) · función · exportado

Construye `Line Chart Geometry` a partir de los datos del flujo.

- **Entradas** `data = valor por defecto`, `{width, height} = valor por defecto`.
- **Retorno visible o tipo declarado** `value`, `x`, `y`, `width`, `height`, `padding`, `innerWidth`, `innerHeight`, `minValue`, `maxValue`, `points`, `linePath`, `areaPath`, `baselineY`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `minValue`, `maxValue`.
- **Llamadas directas en el cuerpo** [`safeData.map`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L11), [`join`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L51), [`points.map`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L51), [`point.x.toFixed`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L52), [`point.y.toFixed`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L52), [`points.x.toFixed`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L58), [`baselineY.toFixed`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L58), [`points.0.x.toFixed`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L59).
- **Lo usa** [`SvgMetricLineCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L10) (llama).

#### [`buildVerticalBarGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L78) · función · exportado

Construye `Vertical Bar Geometry` a partir de los datos del flujo.

- **Entradas** `values = valor por defecto`, `{width, height} = valor por defecto`.
- **Retorno visible o tipo declarado** `value`, `x`, `y`, `barWidth`, `barHeight`, `width`, `height`, `padding`, `innerHeight`, `innerWidth`, `maxValue`, `bars`.
- **Llamadas directas en el cuerpo** [`clampChartMax`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L82), [`safeValues.map`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L83).
- **Lo usa** [`SvgMetricCompareCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L14) (llama).

#### [`getMeterRatio`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L131) · función · exportado

Obtiene o resuelve `Meter Ratio` para entregarlo al consumidor.

- **Entradas** `value`, `maxValue`.
- **Llamadas directas en el cuerpo** [`clampChartMax`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L132).
- **Lo usa** [`SvgMetricAverageCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L11) (llama).

### [`apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L1)

Dibuja una tarjeta SVG para un valor promedio con la serie que la acompaña.

**Superficie que exporta.** [`SvgMetricAverageCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L3).

**Módulos que lo cargan.** [`PrelaunchAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L4) (importa).

**Dependencias del archivo.** [`./svgChartUtils`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js).

#### [`SvgMetricAverageCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{accentColor, helper, maxValue, title, value, valueLabel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Usa código de** [`getMeterRatio`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L131) (llama).
- **Llamadas directas en el cuerpo** [`getMeterRatio`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L11).
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L350) (renderiza).

### [`apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L1)

Dibuja métricas que comparan períodos o valores bajo un mismo formato.

**Superficie que exporta.** [`SvgMetricCompareCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L3).

**Módulos que lo cargan.** [`PrelaunchAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L5) (importa).

**Dependencias del archivo.** [`./svgChartUtils`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js).

#### [`SvgMetricCompareCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{helper, leftColor, leftLabel, leftValue, rightColor, rightLabel, rightValue, title, valueFormatter}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Usa código de** [`buildVerticalBarGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L78) (llama).
- **Llamadas directas en el cuerpo** [`buildVerticalBarGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L14), [`chart.bars.map`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L39), [`valueFormatter`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L57).
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L311) (renderiza).

### [`apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L1)

Representa la serie temporal de una métrica y su lectura en el panel.

**Superficie que exporta.** [`SvgMetricLineCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L3).

**Módulos que lo cargan.** [`PrelaunchAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L6) (importa).

**Dependencias del archivo.** [`./svgChartUtils`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js).

#### [`SvgMetricLineCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{color, data, helper, title, value}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Efectos y APIs** `replace`.
- **Usa código de** [`buildLineChartGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js#L7) (llama).
- **Llamadas directas en el cuerpo** [`buildLineChartGeometry`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L10), [`replace`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L13), [`toLowerCase`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L13), [`chart.points.map`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L64).
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L244) (renderiza), [`renderFunnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L422) (renderiza).

### [`apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L1)

Administra filtros, carga y resultado. Elige métricas mock en modo Vite DEV y el servicio en otros builds.

**Superficie que exporta.** [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L12).

**Módulos que lo cargan.** [`PrelaunchAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L7) (importa).

**Dependencias del archivo.** `react`, [`../mockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js), [`../services/prelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js).

#### [`INITIAL_FILTERS`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L5) · variable de módulo

Agrupa la configuración o catálogo de `INITIAL FILTERS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `days`, `appChannel`.
- **Lo usa** [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L12) (referencia).

#### [`USE_PRELAUNCH_ANALYTICS_MOCK`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L10) · variable de módulo

Declara `USE_PRELAUNCH_ANALYTICS_MOCK` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reload`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L31) (referencia).

#### [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L12) · hook React · exportado

Agrupa estado, contexto o efectos de `Prelaunch Metrics` para sus consumidores React.

- **Entradas** `initialFilters = valor por defecto`.
- **Retorno visible o tipo declarado** `filters`, `setFilters`, `loading`, `refreshing`, `error`, `metrics`, `summary`, `lastUpdatedAt`, `reload`.
- **Estado o valores vinculados** `[filters, setFilters] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[metrics, setMetrics] mediante useState`, `[lastUpdatedAt, setLastUpdatedAt] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L171) (llama).

#### [`reload`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L23) · callback React · asíncrona · dentro de [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L12)

Coordina cambios de estado durante `reload`.

- **Entradas** `{silent} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setMetrics`, `setLastUpdatedAt`.
- **Condiciones que evalúa** `silent`, `USE_PRELAUNCH_ANALYTICS_MOCK`, `ausencia de silent`, `ausencia de result.ok`.
- **Usa código de** [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L56) (llama), [`fetchPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L35) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L25), [`setLoading`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L27), [`setError`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L29), [`setMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L32), [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L32), [`setLastUpdatedAt`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L33), [`toISOString`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L33), [`fetchPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L39).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L54) (llama), [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L55) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L53) · callback de infraestructura · dentro de [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePrelaunchMetrics`.

- **Llamadas directas en el cuerpo** [`reload`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L54).

#### [`summary`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L57) · cálculo memorizado · dentro de [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L12)

Función auxiliar de `usePrelaunchMetrics` para `summary`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L82) (referencia).

### [`apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L1)

Produce muestras de analítica para ver estados y gráficos en desarrollo.

**Superficie que exporta.** [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L56).

**Módulos que lo cargan.** [`usePrelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L2) (importa).

#### [`round`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L1) · función

Implementa `round` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Lo usa** [`buildTimeline`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L20) (llama), [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L73) (llama).

#### [`isoDayOffset`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L5) · función

Comprueba `o Day Offset` para decidir si se admite o continúa la operación.

- **Entradas** `offset`.
- **Actualizaciones de estado o acciones** `setHours`, `setDate`.
- **Llamadas directas en el cuerpo** [`date.setHours`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L7), [`date.setDate`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L8), [`date.getDate`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L8), [`slice`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L9), [`date.toISOString`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L9).
- **Lo usa** [`buildTimeline`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L15) (llama).

#### [`buildTimeline`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L12) · función

Construye `Timeline` a partir de los datos del flujo.

- **Entradas** `days`, `factor`.
- **Retorno visible o tipo declarado** `day`, `unique_visitors`, `new_visitors`, `recurrent_visitors`, `page_views`, `cta_waitlist_clicks`, `waitlist_submits`, `support_tickets_created`, `avg_time_on_page_seconds`, `modal_views`.
- **Llamadas directas en el cuerpo** [`isoDayOffset`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L15), [`date.getDay`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L16), [`round`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L20), [`toFixed`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L29).
- **Lo usa** [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L65) (llama).

#### [`sum`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L47) · función

Implementa `sum` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rows`, `key`.
- **Llamadas directas en el cuerpo** [`rows.reduce`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L48).
- **Lo usa** [`avg`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L53) (llama), [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L67) (llama).

#### [`avg`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L51) · función

Implementa `avg` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rows`, `key`.
- **Condiciones que evalúa** `ausencia de rows.length`.
- **Llamadas directas en el cuerpo** [`sum`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L53).
- **Lo usa** [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L73) (llama).

#### [`buildMockPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L56) · función · exportado

Construye `Mock Prelaunch Metrics` a partir de los datos del flujo.

- **Entradas** `{days, appChannel} = valor por defecto`.
- **Retorno visible o tipo declarado** `metrics`, `funnel`, `event_breakdown`, `waitlist_breakdown`, `support_breakdown`, `engagement`, `timeline`, `period_averages`, `comparisons`, `top_ip_risk`.
- **Llamadas directas en el cuerpo** [`buildTimeline`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L65), [`sum`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L67), [`round`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L73), [`avg`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L73), [`timeline.map`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L74), [`toFixed`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L75), [`timeline.at`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L79), [`modalRows.map`](../../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js#L264).
- **Lo usa** [`reload`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L32) (llama).

### [`apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L1)

Compone filtros y gráficas de conversión de Prelaunch para el panel de administración.

**Superficie que exporta.** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159).

**Módulos que lo cargan.** [`AdminDashboardAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L5) (importa), [`AdminPrelaunchAnalytics.jsx`](../../../apps/referidos-app/src/pages/admin/AdminPrelaunchAnalytics.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Table`](../../../apps/referidos-app/src/components/ui/Table.jsx), [`./components/SvgMetricAverageCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx), [`./components/SvgMetricCompareCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx), [`./components/SvgMetricLineCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx), [`./hooks/usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js).

#### [`RANGE_OPTIONS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L9) · variable de módulo

Conserva la lista de `RANGE OPTIONS` usada por el módulo.

- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L700) (accede al módulo).

#### [`CHANNEL_OPTIONS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L18) · variable de módulo

Conserva la lista de `CHANNEL OPTIONS` usada por el módulo.

- **Lo usa** [`channelLabel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L184) (accede al módulo), [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L719) (accede al módulo).

#### [`TABS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L25) · variable de módulo

Conserva la lista de `TABS` usada por el módulo.

- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L751) (accede al módulo).

#### [`WAITLIST_ROLE_LABELS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L34) · variable de módulo

Agrupa la configuración o catálogo de `WAITLIST ROLE LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `cliente`, `negocio`.
- **Lo usa** [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L562) (accede al módulo).

#### [`WAITLIST_STATUS_LABELS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L39) · variable de módulo

Agrupa la configuración o catálogo de `WAITLIST STATUS LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `pending_confirm`, `active`, `unsubscribed`, `blocked`.
- **Lo usa** [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L567) (accede al módulo).

#### [`SUPPORT_STATUS_LABELS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L46) · variable de módulo

Agrupa la configuración o catálogo de `SUPPORT STATUS LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `new`, `assigned`, `in_progress`, `waiting_user`, `queued`, `closed`, `cancelled`.
- **Lo usa** [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L603) (accede al módulo).

#### [`SUPPORT_SEVERITY_LABELS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L56) · variable de módulo

Agrupa la configuración o catálogo de `SUPPORT SEVERITY LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `s0`, `s1`, `s2`, `s3`.
- **Lo usa** [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L608) (accede al módulo).

#### [`SUPPORT_CATEGORY_LABELS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L63) · variable de módulo

Agrupa la configuración o catálogo de `SUPPORT CATEGORY LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `acceso`, `verificacion`, `qr`, `promos`, `negocios_sucursales`, `pagos_plan`, `reporte_abuso`, `bug_performance`, `sugerencia`, `tier_beneficios`, `borrar_correo_waitlist`.
- **Lo usa** [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L632) (accede al módulo).

#### [`SECTION_LABELS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L77) · variable de módulo

Agrupa la configuración o catálogo de `SECTION LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `hero`, `waitlist_steps`, `waitlist_form`, `contact_block`, `footer`.
- **Lo usa** [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L460) (accede al módulo).

#### [`MODAL_LABELS`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L85) · variable de módulo

Agrupa la configuración o catálogo de `MODAL LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `business_interest`, `platform`, `team`, `invitation`, `congrats`.
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L384) (accede al módulo), [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L465) (accede al módulo).

#### [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L93) · función

Formatea `Number` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLocaleString`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L94).
- **Lo usa** [`BreakdownList`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L143) (llama), [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L246) (llama), [`renderFunnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L408) (llama), [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L508) (llama), [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L588) (llama), [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L635) (llama), [`renderRisk`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L675) (llama).

#### [`formatPercent`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L97) · función

Formatea `Percent` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`pct.toFixed`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L99).
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L325) (llama).

#### [`formatSeconds`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L102) · función

Formatea `Seconds` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L103).
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L294) (llama).

#### [`formatDateTime`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L106) · función

Formatea `Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `iso`.
- **Condiciones que evalúa** `ausencia de iso`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L109), [`date.toLocaleString`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L110).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L746) (llama).

#### [`truncateRiskId`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L118) · función

Implementa `truncate Risk Id` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `safe.length`.
- **Llamadas directas en el cuerpo** [`safe.slice`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L121).
- **Lo usa** [`renderRisk`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L672) (llama).

#### [`formatDayLabel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L124) · función

Formatea `Day Label` para que el consumidor lo pueda presentar.

- **Entradas** `day`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L125).
- **Lo usa** [`lineSeries`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L190) (llama).

#### [`BreakdownList`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L128) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, rows, labelResolver, valueResolver}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`rows.reduce`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L129), [`valueResolver`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L129), [`rows.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L135), [`labelResolver`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L137), [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L143).
- **Lo usa** [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L457) (renderiza), [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L559) (renderiza), [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L600) (renderiza).

#### [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159) · componente React · exportación por defecto

Monta `select`, `button`, `RefreshCw`, `Clock3`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[activeTab, setActiveTab] mediante useState`.
- **Interfaz que monta** `select`, `button`, `RefreshCw`, `Clock3`.
- **Hooks que llama** `useState`, `usePrelaunchMetrics`.
- **Usa código de** [`usePrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L12) (llama).
- **Llamadas directas en el cuerpo** [`RANGE_OPTIONS.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L700), [`CHANNEL_OPTIONS.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L719), [`formatDateTime`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L746), [`TABS.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L751), [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L782), [`renderFunnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L783), [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L784), [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L785), [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L786), [`renderRisk`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L787).
- **Lo usa** [`AdminDashboardAnalyticsPanel`](../../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx#L115) (renderiza), [`AdminPrelaunchAnalytics`](../../../apps/referidos-app/src/pages/admin/AdminPrelaunchAnalytics.jsx#L80) (renderiza).

#### [`funnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L173) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `funnel`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L266) (accede al módulo), [`renderFunnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L424) (accede al módulo).

#### [`eventBreakdown`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L174) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `event Breakdown`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`eventRows`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L220) (referencia).

#### [`waitlistBreakdown`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L175) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Coordina `list Breakdown` con la planificación o reintento del flujo.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L561) (accede al módulo).

#### [`supportBreakdown`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L176) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `support Breakdown`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L602) (accede al módulo).

#### [`engagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L177) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `engagement`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L459) (accede al módulo).

#### [`timeline`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L178) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `timeline`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`lineSeries`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L190) (accede al módulo), [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L377) (accede al módulo).

#### [`periodAverages`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L179) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `period Averages`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`modalAverageCards`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L206) (accede al módulo), [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L359) (accede al módulo).

#### [`comparisons`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L180) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `comparisons`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L313) (accede al módulo).

#### [`topIpRisk`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L181) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `top Ip Risk`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`renderRisk`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L662) (accede al módulo).

#### [`channelLabel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L183) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `channel Label`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`CHANNEL_OPTIONS.find`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L184).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L730) (referencia).

#### [`lineSeries`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L189) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `line Series`.

- **Retorno visible o tipo declarado** `unique`, `newVisitors`, `recurrent`, `pageViews`, `ctaClicks`, `waitlist`, `tickets`, `avgTime`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`timeline.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L190), [`formatDayLabel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L190).
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L248) (accede al módulo), [`renderFunnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L426) (accede al módulo).

#### [`modalAverageCards`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L206) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `modal Average Cards`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L206).
- **Lo usa** [`maxModalAverage`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L211) (accede al módulo), [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L381) (accede al módulo).

#### [`maxModalAverage`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L210) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `max Modal Average`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`modalAverageCards.reduce`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L211).
- **Lo usa** [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L387) (pasa a maxValue).

#### [`eventRows`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L219) · cálculo memorizado · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Función auxiliar de `PrelaunchAnalyticsPanel` para `event Rows`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L220).
- **Lo usa** [`renderFunnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L398) (accede al módulo).

#### [`handleReload`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L227) · función · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Llamadas directas en el cuerpo** [`reload`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L228).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L734) (pasa a onClick).

#### [`renderOverview`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L233) · función · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Prepara contenido JSX usando `SvgMetricLineCard`, `SvgMetricCompareCard`, `SvgMetricAverageCard`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SvgMetricLineCard`, `SvgMetricCompareCard`, `SvgMetricAverageCard`.
- **Usa código de** [`SvgMetricLineCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L3) (renderiza), [`SvgMetricCompareCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx#L3) (renderiza), [`SvgMetricAverageCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L246), [`formatSeconds`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L294), [`formatPercent`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L325), [`lineSeries.avgTime.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L354), [`lineSeries.ctaClicks.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L361), [`lineSeries.pageViews.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L369), [`timeline.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L377), [`modalAverageCards.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L381).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L782) (llama).

#### [`renderFunnel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L397) · función · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Prepara contenido JSX usando `SvgMetricLineCard`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SvgMetricLineCard`.
- **Usa código de** [`SvgMetricLineCard`](../../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`eventRows.reduce`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L398), [`eventRows.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L404), [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L408).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L783) (llama).

#### [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L454) · función · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Prepara contenido JSX usando `BreakdownList`, `Table`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `BreakdownList`, `Table`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L502), [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L508).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L784) (llama).

#### [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L556) · función · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Prepara contenido JSX usando `BreakdownList`, `Table`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `BreakdownList`, `Table`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L584), [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L588).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L785) (llama).

#### [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L597) · función · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Prepara contenido JSX usando `BreakdownList`, `Table`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `BreakdownList`, `Table`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L618), [`map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L626), [`sort`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L626), [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L635).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L786) (llama).

#### [`renderRisk`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L644) · función · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Prepara contenido JSX usando `ShieldAlert`, `Table`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ShieldAlert`, `Table`.
- **Usa código de** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`topIpRisk.map`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L669), [`truncateRiskId`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L672), [`formatNumber`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L675).
- **Lo usa** [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L787) (llama).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L695) · callback JSX · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setFilters`.
- **Llamadas directas en el cuerpo** [`setFilters`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L696).

#### [`select.onChange`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L714) · callback JSX · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setFilters`.
- **Llamadas directas en el cuerpo** [`setFilters`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L715).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L757) · callback JSX · dentro de [`PrelaunchAnalyticsPanel`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L159)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveTab`.
- **Llamadas directas en el cuerpo** [`setActiveTab`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L757).

### [`apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L1)

Pide datos administrativos de Prelaunch a su Edge Function y prepara la interacción con el hook.

**Superficie que exporta.** [`fetchPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L35).

**Módulos que lo cargan.** [`usePrelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L3) (importa).

**Dependencias del archivo.** [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`normalizeDays`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L3) · función

Normaliza `Days` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`.
- **Lo usa** [`fetchPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L40) (llama).

#### [`invokeWithAuth`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L9) · función · asíncrona

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Entradas** `fnName`, `body = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `error`, `data.ok`.
- **Contrato de datos** Auth `getSession` en [`prelaunchMetrics.js:12`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L12).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L12), [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L18).
- **Lo usa** [`fetchPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L39) (llama).

#### [`fetchPrelaunchMetrics`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L35) · función · asíncrona · exportado

Obtiene o resuelve `Prelaunch Metrics` para entregarlo al consumidor.

- **Entradas** `{days, appChannel} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeWithAuth`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L39), [`normalizeDays`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L40).
- **Lo usa** [`reload`](../../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js#L39) (llama).
