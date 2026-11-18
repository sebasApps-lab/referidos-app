# Android · Servicios, estado y UI compartida · 2 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/shared/services/entityQueries.ts`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L1)
- [`apps/referidos-android/src/shared/services/mobileApi.ts`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L1)
- [`apps/referidos-android/src/shared/services/sessionDevices.ts`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L1)
- [`apps/referidos-android/src/shared/services/supportCatalog.ts`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/shared/services/entityQueries.ts`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L1)

Accede a usuarios, negocios, sucursales, promos, historial QR, tickets y eventos. `maybeSingleByAnyColumn` y `listByAnyColumn` prueban nombres históricos cuando falta una columna. Centraliza las mutaciones de promos/sucursales, el vínculo `promos_sucursales` y el RPC `redeem_valid_qr`. También ofrece normalizadores de fechas/estados y el selector `readFirst` para registros heterogéneos.

**Superficie que exporta.** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L115), [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L122), [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L130), [`fetchPromoFeed`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L138), [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L147), [`fetchQrHistoryByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L155), [`fetchSupportTicketsPublic`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L163), [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L176), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L204), [`redeemValidQrCode`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L246), [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L261), [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L313), [`deletePromoById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L342), [`updateBranchStateById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L362), [`linkPromoToBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L406), [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L445), [`fetchPromoBranchLinksByPromoId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L477), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510), [`toDisplayStatus`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L523).

**Módulos que lo cargan.** [`AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L7) (importa), [`AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L7) (importa), [`AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L9) (importa), [`AdminIssueEventDetailScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L7) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L13) (importa), [`AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L9) (importa), [`AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L7) (importa), [`AdminNegociosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L6) (importa), [`AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L6) (importa), [`AdminQRsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L6) (importa), [`AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L6) (importa), [`AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L15) (importa), [`AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L12) (importa), [`AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L15) (importa), [`AdminUsuariosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L7) (importa), [`ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L9) (importa) y 15 más.

#### [`Result`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L1) · tipo TypeScript

Describe la forma del contrato de `Result`, con campos `ok`, `data`, `error`, `column`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `ok`, `data`, `error`, `column`.

#### [`USER_ID_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L8) · variable de módulo

Declara `USER_ID_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L119) (referencia).

#### [`BUSINESS_ID_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L9) · variable de módulo

Declara `BUSINESS_ID_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L127) (referencia), [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L135) (referencia), [`fetchQrHistoryByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L160) (referencia), [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L279) (referencia).

#### [`CLIENT_ID_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L10) · variable de módulo

Declara `CLIENT_ID_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L152) (referencia).

#### [`SUPPORT_USER_PUBLIC_ID_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L11) · variable de módulo

Declara `SUPPORT_USER_PUBLIC_ID_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L187) (referencia).

#### [`PROMO_STATUS_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L12) · variable de módulo

Declara `PROMO_STATUS_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L281) (referencia), [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L324) (referencia).

#### [`PROMO_TITLE_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L13) · variable de módulo

Declara `PROMO_TITLE_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L280) (referencia).

#### [`PROMO_DESC_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L14) · variable de módulo

Declara `PROMO_DESC_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L282) (referencia).

#### [`BRANCH_STATUS_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L15) · variable de módulo

Declara `BRANCH_STATUS_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`updateBranchStateById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L373) (referencia).

#### [`BRANCH_TYPE_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L16) · variable de módulo

Declara `BRANCH_TYPE_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`updateBranchStateById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L388) (referencia).

#### [`PROMO_BRANCH_PROMO_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L17) · variable de módulo

Declara `PROMO_BRANCH_PROMO_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`linkPromoToBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L417) (referencia), [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L456) (referencia), [`fetchPromoBranchLinksByPromoId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L485) (referencia).

#### [`PROMO_BRANCH_BRANCH_COLUMNS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L18) · variable de módulo

Declara `PROMO_BRANCH_BRANCH_COLUMNS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`linkPromoToBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L418) (referencia), [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L457) (referencia).

#### [`OBS_LEVELS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L19) · variable de módulo

Declara `OBS_LEVELS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeObsLevel`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L43) (accede al módulo).

#### [`OBS_DOMAINS`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L20) · variable de módulo

Declara `OBS_DOMAINS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeObsDomain`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L48) (accede al módulo).

#### [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L22) · función

Obtiene o resuelve `Error Message` para entregarlo al consumidor.

- **Entradas** `error`.
- **Lo usa** [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L27) (llama), [`isNoRowsDeletedError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L37) (llama), [`maybeSingleByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L70) (llama), [`listByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L93) (llama), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L111) (llama), [`fetchPromoFeed`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L143) (llama), [`fetchSupportTicketsPublic`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L172) (llama), [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L197) (llama), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L235) (llama), [`redeemValidQrCode`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L256) (llama), [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L304) (llama), [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L336) (llama) y 5 más.

#### [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L26) · función

Comprueba `Missing Column Error` para decidir si se admite o continúa la operación.

- **Entradas** `error`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L27), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L27), [`text.includes`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L29).
- **Lo usa** [`maybeSingleByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L69) (llama), [`listByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L92) (llama), [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L196) (llama), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L234) (llama), [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L303) (llama), [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L335) (llama), [`updateBranchStateById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L384) (llama), [`linkPromoToBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L432) (llama), [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L469) (llama), [`fetchPromoBranchLinksByPromoId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L492) (llama).

#### [`isNoRowsDeletedError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L36) · función

Comprueba `No Rows Deleted Error` para decidir si se admite o continúa la operación.

- **Entradas** `error`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L37), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L37), [`text.includes`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L38).
- **Lo usa** [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L332) (llama), [`deletePromoById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L356) (llama), [`updateBranchStateById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L381) (llama), [`linkPromoToBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L429) (llama), [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L466) (llama).

#### [`normalizeObsLevel`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L41) · función

Normaliza `Obs Level` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L42), [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L42), [`OBS_LEVELS.includes`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L43).
- **Lo usa** [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L213) (llama).

#### [`normalizeObsDomain`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L46) · función

Normaliza `Obs Domain` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L47), [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L47), [`OBS_DOMAINS.includes`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L48).
- **Lo usa** [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L214) (llama).

#### [`maybeSingleByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L51) · función · asíncrona

Lee una fila probando nombres de columna alternativos que se conservan por compatibilidad entre esquemas.

- **Entradas** `supabase`, `table`, `columns`, `value`.
- **Retorno visible o tipo declarado** `ok`, `data`, `column`, `error`.
- **Condiciones que evalúa** `ausencia de error`, `data`, `isMissingColumnError`, `lastError`.
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L59), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L59), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L59), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L59), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L69), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L70).
- **Lo usa** [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L119) (llama).

#### [`listByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L76) · función · asíncrona

Hace una consulta de lista y vuelve a intentar con el siguiente nombre de columna cuando detecta una variante de esquema.

- **Entradas** `supabase`, `table`, `columns`, `value`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`, `column`, `error`.
- **Condiciones que evalúa** `ausencia de error`, `isMissingColumnError`, `lastError`.
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L85), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L85), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L85), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L85), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L92), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L93).
- **Lo usa** [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L127) (llama), [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L135) (llama), [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L152) (llama), [`fetchQrHistoryByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L160) (llama).

#### [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de authId`, `error`.
- **Contrato de datos** Auth `getSession` en [`entityQueries.ts:102`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L102), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`entityQueries.ts:106`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L106), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`entityQueries.ts:106`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L106).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L102), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L106), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L106), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L106), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L106), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L111).
- **Lo usa** [`loadRecent`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L38) (llama), [`loadHistory`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L53) (llama), [`loadRecent`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L47) (llama), [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L105) (llama), [`loadDashboard`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L43) (llama), [`loadTickets`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L109) (llama), [`loadBusiness`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L118) (llama), [`loadTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L137) (llama).

#### [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L115) · función · asíncrona · exportado

Obtiene o resuelve `Business By User Id` para entregarlo al consumidor.

- **Entradas** `supabase`, `userId`.
- **Retorno visible o tipo declarado** `Promise`.
- **Llamadas directas en el cuerpo** [`maybeSingleByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L119).
- **Lo usa** [`loadRecent`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L55) (llama), [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L114) (llama), [`loadDashboard`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L52) (llama), [`loadBusiness`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L125) (llama).

#### [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L122) · función · asíncrona · exportado

Obtiene o resuelve `Branches By Business Id` para entregarlo al consumidor.

- **Entradas** `supabase`, `businessId`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`.
- **Llamadas directas en el cuerpo** [`listByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L127).
- **Lo usa** [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L125) (llama), [`loadDashboard`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L64) (llama).

#### [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L130) · función · asíncrona · exportado

Obtiene o resuelve `Promos By Business Id` para entregarlo al consumidor.

- **Entradas** `supabase`, `businessId`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`.
- **Llamadas directas en el cuerpo** [`listByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L135).
- **Lo usa** [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L124) (llama), [`loadDashboard`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L65) (llama).

#### [`fetchPromoFeed`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L138) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`select`) en [`entityQueries.ts:142`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L142), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`entityQueries.ts:142`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L142).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L142), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L142), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L142), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L143).
- **Lo usa** [`loadPromos`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L37) (llama).

#### [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L147) · función · asíncrona · exportado

Obtiene o resuelve `Qr History By Client Id` para entregarlo al consumidor.

- **Entradas** `supabase`, `clientId`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`.
- **Llamadas directas en el cuerpo** [`listByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L152).
- **Lo usa** [`loadRecent`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L46) (llama), [`loadHistory`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L63) (llama).

#### [`fetchQrHistoryByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L155) · función · asíncrona · exportado

Obtiene o resuelve `Qr History By Business Id` para entregarlo al consumidor.

- **Entradas** `supabase`, `businessId`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`.
- **Llamadas directas en el cuerpo** [`listByAnyColumn`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L160).
- **Lo usa** [`loadRecent`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L61) (llama).

#### [`fetchSupportTicketsPublic`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L163) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) (`select`) en [`entityQueries.ts:167`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L167), tabla o bucket [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) en [`entityQueries.ts:167`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L167).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L167), [`order`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L167), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L167), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L167), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L172).

#### [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L176) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `userPublicId`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`, `column`.
- **Condiciones que evalúa** `ausencia de safeUserPublicId`, `ausencia de error`, `isMissingColumnError`, `lastError`.
- **Contrato de datos** tabla o vista [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) (`select`) en [`entityQueries.ts:188`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L188), tabla o bucket [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) en [`entityQueries.ts:188`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L188).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L181), [`limit`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L188), [`order`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L188), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L188), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L188), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L188), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L196), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L197).
- **Lo usa** [`loadTickets`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L124) (llama), [`loadTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L151) (llama).

#### [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L204) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `options = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `level`, `domain`, `ausencia de error`, `isMissingColumnError`.
- **Contrato de datos** tabla o vista [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) (`select`) en [`entityQueries.ts:223`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L223), tabla o bucket [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) en [`entityQueries.ts:223`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L223).
- **Llamadas directas en el cuerpo** [`normalizeObsLevel`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L213), [`normalizeObsDomain`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L214), [`limit`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L223), [`order`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L223), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L223), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L223), [`query.eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L229), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L234), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L235).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L67) (llama), [`loadOverview`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L167) (llama), [`loadEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L99) (llama).

#### [`redeemValidQrCode`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L246) · función · asíncrona · exportado

Llama al canje del runtime para la lectura del escáner Android. El servicio transforma el resultado a la convención móvil.

- **Entradas** `supabase`, `code`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeCode`, `error`, `ausencia de data`.
- **Contrato de datos** RPC [`redeem_valid_qr`](../../../apps/referidos-app/supabase/migrations/20250303_000001_groups_points_tiers.sql#L476) en [`entityQueries.ts:253`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L253).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L250), [`supabase.rpc`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L253), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L256).
- **Lo usa** [`handleProcessCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L101) (llama).

#### [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L261) · función · asíncrona · exportado

Guarda datos en tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `input`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`, `column`.
- **Condiciones que evalúa** `ausencia de businessId`, `ausencia de title`, `description`, `ausencia de error`, `isMissingColumnError`.
- **Contrato de datos** tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`insert + select`) en [`entityQueries.ts:290`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L290), tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`insert`) en [`entityQueries.ts:290`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L290), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`entityQueries.ts:290`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L290).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L270), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L290), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L290), [`insert`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L290), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L290), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L303), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L304).
- **Lo usa** [`createPromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L150) (llama).

#### [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L313) · función · asíncrona · exportado

Actualiza datos en tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `promoId`, `nextStatus`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`, `column`.
- **Condiciones que evalúa** `ausencia de safePromoId`, `ausencia de safeStatus`, `ausencia de error o isNoRowsDeletedError`, `isMissingColumnError`.
- **Contrato de datos** tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`update + select`) en [`entityQueries.ts:325`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325), tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`update`) en [`entityQueries.ts:325`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`entityQueries.ts:325`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L318), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325), [`update`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L325), [`isNoRowsDeletedError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L332), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L335), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L336).
- **Lo usa** [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L103) (llama), [`changePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L173) (llama).

#### [`deletePromoById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L342) · función · asíncrona · exportado

Elimina datos de tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `promoId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safePromoId`, `ausencia de error o isNoRowsDeletedError`.
- **Contrato de datos** tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`delete + select`) en [`entityQueries.ts:349`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349), tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`delete`) en [`entityQueries.ts:349`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`entityQueries.ts:349`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L346), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349), [`delete`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L349), [`isNoRowsDeletedError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L356), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L359).
- **Lo usa** [`onConfirm`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L197) (llama).

#### [`updateBranchStateById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L362) · función · asíncrona · exportado

Actualiza datos en tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `branchId`, `nextState`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`, `column`.
- **Condiciones que evalúa** `ausencia de safeBranchId`, `ausencia de safeState`, `ausencia de error o isNoRowsDeletedError`, `isMissingColumnError`.
- **Contrato de datos** tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`update + select`) en [`entityQueries.ts:374`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`update`) en [`entityQueries.ts:374`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374), tabla o bucket [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) en [`entityQueries.ts:374`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L367), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374), [`update`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L374), [`isNoRowsDeletedError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L381), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L384), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L385).
- **Lo usa** [`transitionBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L266) (llama).

#### [`linkPromoToBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L406) · función · asíncrona · exportado

Guarda datos en tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `promoId`, `branchId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`, `column`.
- **Condiciones que evalúa** `ausencia de safePromoId`, `ausencia de safeBranchId`, `ausencia de error o isNoRowsDeletedError`, `isMissingColumnError`, `text.includes`.
- **Contrato de datos** tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) (`insert + select`) en [`entityQueries.ts:423`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L423), tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) (`insert`) en [`entityQueries.ts:423`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L423), tabla o bucket [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) en [`entityQueries.ts:423`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L423).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L411), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L423), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L423), [`insert`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L423), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L423), [`isNoRowsDeletedError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L429), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L432), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L434), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L434), [`text.includes`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L435).
- **Lo usa** [`onSelect`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L246) (llama).

#### [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L445) · función · asíncrona · exportado

Elimina datos de tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `promoId`, `branchId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`, `column`.
- **Condiciones que evalúa** `ausencia de safePromoId`, `ausencia de safeBranchId`, `ausencia de error o isNoRowsDeletedError`, `isMissingColumnError`.
- **Contrato de datos** tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) (`delete + select`) en [`entityQueries.ts:458`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458), tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) (`delete`) en [`entityQueries.ts:458`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458), tabla o bucket [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) en [`entityQueries.ts:458`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L450), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458), [`delete`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L458), [`isNoRowsDeletedError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L466), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L469), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L470).
- **Lo usa** [`onSelect`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L245) (llama).

#### [`fetchPromoBranchLinksByPromoId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L477) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `promoId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`, `column`.
- **Condiciones que evalúa** `ausencia de safePromoId`, `ausencia de error`, `isMissingColumnError`.
- **Contrato de datos** tabla o vista [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) (`select`) en [`entityQueries.ts:486`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L486), tabla o bucket [`promos_sucursales`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L97) en [`entityQueries.ts:486`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L486).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L481), [`eq`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L486), [`select`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L486), [`supabase.from`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L486), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L492), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L493).
- **Lo usa** [`loadPromoLinks`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L80) (llama).

#### [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) · función · exportado

Extrae o interpreta `First` de los argumentos, estado o datos de entrada.

- **Entradas** `row`, `keys`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `value`, `ausencia de text`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L503).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L87) (llama), [`filtered`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L45) (llama), [`metrics`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L68) (llama), [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L112) (llama), [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L523) (llama), [`metrics`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L62) (llama), [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L76) (llama), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L44) (llama), [`filtered`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L73) (llama), [`metrics`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L83) (llama), [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L132) (llama), [`filtered`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L48) (llama) y 67 más.

#### [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) · función · exportado

Formatea `Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L513), [`date.toLocaleString`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L514).
- **Lo usa** [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L138) (llama), [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L530) (llama), [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L86) (llama), [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L185) (llama), [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L146) (llama), [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L138) (llama), [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L151) (llama), [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L185) (llama), [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L121) (llama), [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L189) (llama), [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L288) (llama), [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L298) (llama) y 18 más.

#### [`toDisplayStatus`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L523) · función · exportado

Implementa `to Display Status` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de text`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L524).
- **Lo usa** [`listRows`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L83) (llama), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L582) (llama), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L643) (llama).

### [`apps/referidos-android/src/shared/services/mobileApi.ts`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L1)

Valida las variables al importar, crea un único cliente Supabase, compone `mobileApi` y conecta el SDK de observabilidad con contexto Android. Concentra la configuración para que las pantallas no creen clientes separados. El API compartido tiene una importación local que conviene comprobar desde un checkout nuevo.

**Superficie que exporta.** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7), [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14).

**Módulos que lo cargan.** [`App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L17) (importa), [`AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L6) (importa), [`AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L5) (importa), [`AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L8) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L8) (importa), [`AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L7) (importa), [`AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L5) (importa), [`AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L12) (importa), [`AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L7) (importa), [`AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L8) (importa), [`AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L7) (importa), [`AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L7) (importa), [`AdminUsuariosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L6) (importa), [`AddressStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L15) (importa), [`useAuthEngine.ts`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L17) (importa), [`ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L6) (importa) y 28 más.

**Dependencias del archivo.** [`@referidos/api-client`](../../../packages/api-client/src/index.js), [`@referidos/observability-sdk`](../../../packages/observability-sdk/src/index.js), [`@shared/constants/env`](../../../apps/referidos-android/src/shared/constants/env.ts).

#### Acciones al cargar el módulo

- **Usa código de** [`assertMobileEnv`](../../../apps/referidos-android/src/shared/constants/env.ts#L48) (llama).
- **Llamadas directas en el cuerpo** [`assertMobileEnv`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L5).

#### [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) · variable de módulo · exportado

Declara `supabase` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`createSupabaseMobileClient`](../../../packages/api-client/src/clients/createSupabaseMobileClient.js#L12) (llama), [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L37) (accede al módulo).
- **Llamadas directas en el cuerpo** [`createSupabaseClient`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7).
- **Lo usa** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (referencia), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L63) (referencia), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L20) (referencia), [`countRows`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L116) (accede al módulo), [`loadOverview`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L161) (accede al módulo), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L39) (referencia), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L23) (referencia), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L20) (referencia), [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L103) (referencia), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L67) (referencia), [`handleAuthorize`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L159) (accede al módulo), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L36) (referencia) y 73 más.

#### [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) · variable de módulo · exportado

Declara `mobileApi` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`createMobileApi`](../../../packages/api-client/src/createMobileApi.js#L14) (llama).
- **Llamadas directas en el cuerpo** [`createApiClient`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12).
- **Lo usa** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L15) (referencia), [`setInterval · callback`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L98) (accede al módulo), [`handleStartAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L107) (accede al módulo), [`handleEndAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L126) (accede al módulo), [`handleStartAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L175) (accede al módulo), [`handleEndAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L189) (accede al módulo), [`handleDenyRequest`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L206) (accede al módulo), [`handleAssign`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L220) (accede al módulo), [`startAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L139) (accede al módulo), [`endAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L153) (accede al módulo), [`denyRequest`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L170) (accede al módulo), [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L123) (accede al módulo) y 37 más.

#### [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) · variable de módulo · exportado

Declara `observability` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164) (llama), [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L37) (accede al módulo).
- **Llamadas directas en el cuerpo** [`createObservabilityClient`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14).
- **Lo usa** [`installGlobalErrorTracking`](../../../apps/referidos-android/src/app/App.tsx#L84) (accede al módulo), [`unhandledHandler`](../../../apps/referidos-android/src/app/App.tsx#L100) (accede al módulo), [`syncRouteContext`](../../../apps/referidos-android/src/app/App.tsx#L137) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L162) (accede al módulo), [`addEventListener · callback`](../../../apps/referidos-android/src/app/App.tsx#L179) (accede al módulo), [`addEventListener · callback`](../../../apps/referidos-android/src/app/App.tsx#L190) (accede al módulo), [`setInterval · callback`](../../../apps/referidos-android/src/app/App.tsx#L196) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L213) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L228) (accede al módulo), [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L124) (accede al módulo), [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L114) (accede al módulo), [`handleStartAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L113) (accede al módulo) y 14 más.

### [`apps/referidos-android/src/shared/services/sessionDevices.ts`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L1)

Crea o conserva el identificador de dispositivo local, llama funciones para registrar, listar y revocar sesiones, interpreta errores de Edge Functions y forma filas de dispositivo/actividad para la vista. El registro aquí se usa desde el panel de sesiones.

**Superficie que exporta.** [`registerCurrentSessionDevice`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L133), [`listCurrentUserSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L142), [`revokeSessionById`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L152), [`revokeAllSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L156).

**Módulos que lo cargan.** [`ProfileRuntimePanels.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L11) (importa).

**Dependencias del archivo.** `@react-native-async-storage/async-storage`, `react-native`, [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`DEVICE_ID_KEY`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L5) · variable de módulo

Declara `DEVICE_ID_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getOrCreateDeviceId`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L9) (referencia).

#### [`getOrCreateDeviceId`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L7) · función · asíncrona

Obtiene o resuelve `Or Create Device Id` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `AsyncStorage.getItem`, `AsyncStorage.setItem`.
- **Condiciones que evalúa** `existing y existing.length`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.getItem`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L9), [`slice`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L11), [`toString`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L11), [`AsyncStorage.setItem`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L12).
- **Lo usa** [`registerCurrentSessionDevice`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L134) (llama).

#### [`normalizeFunctionError`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L19) · función · asíncrona

Normaliza `Function Error` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `error`.
- **Retorno visible o tipo declarado** `ok`, `code`, `status`, `details`, `error`.
- **Condiciones que evalúa** `response y object`, `payload y object`, `code o 401 o normalizedMessage.includes`, `ausencia de status`.
- **Llamadas directas en el cuerpo** [`response.clone`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L30), [`json`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L31), [`response.json`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L33), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L45), [`normalizedMessage.includes`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L46).
- **Lo usa** [`invokeSessionFunction`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L81) (llama).

#### [`invokeSessionFunction`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L60) · función · asíncrona

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Entradas** `name`, `body = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `code`, `status`, `error`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `error`, `ausencia de data o object`, `data.ok`.
- **Contrato de datos** Auth `getSession` en [`sessionDevices.ts:63`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L63).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L63), [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L73), [`normalizeFunctionError`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L81).
- **Lo usa** [`registerCurrentSessionDevice`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L136) (llama), [`listCurrentUserSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L143) (llama), [`revokeSessionById`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L153) (llama), [`revokeAllSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L157) (llama).

#### [`formatLastActive`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L106) · función

Formatea `Last Active` para que el consumidor lo pueda presentar.

- **Entradas** `isoDate`.
- **Condiciones que evalúa** `ausencia de isoDate`, `Number.isNaN`, `deltaMs`, `mins`, `hours`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L109).
- **Lo usa** [`mapSession`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L127) (llama).

#### [`mapSession`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L120) · función

Construye el valor de sesión a partir de los datos del flujo.

- **Entradas** `session`.
- **Retorno visible o tipo declarado** `id`, `sessionId`, `device`, `platform`, `location`, `lastActive`, `current`, `revokedAt`.
- **Llamadas directas en el cuerpo** [`formatLastActive`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L127).
- **Lo usa** [`listCurrentUserSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L148) (referencia).

#### [`registerCurrentSessionDevice`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L133) · función · asíncrona · exportado

Aplica o guarda `Current Session Device` para que el estado refleje la operación.

- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de deviceId`.
- **Llamadas directas en el cuerpo** [`getOrCreateDeviceId`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L134), [`invokeSessionFunction`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L136).
- **Lo usa** [`loadSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L156) (llama).

#### [`listCurrentUserSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L142) · función · asíncrona · exportado

Obtiene o resuelve `Current User Sessions` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `ok`, `currentSessionId`, `sessions`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`invokeSessionFunction`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L143), [`response.sessions.map`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L148).
- **Lo usa** [`loadSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L157) (llama).

#### [`revokeSessionById`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L152) · función · asíncrona · exportado

Limpia o restablece `Session By Id` como parte de este flujo.

- **Entradas** `sessionId`.
- **Llamadas directas en el cuerpo** [`invokeSessionFunction`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L153).
- **Lo usa** [`handleCloseSession`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L173) (llama).

#### [`revokeAllSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L156) · función · asíncrona · exportado

Limpia o restablece `All Sessions` como parte de este flujo.

- **Llamadas directas en el cuerpo** [`invokeSessionFunction`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L157).
- **Lo usa** [`handleCloseOtherSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L186) (llama).

### [`apps/referidos-android/src/shared/services/supportCatalog.ts`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L1)

Lee `support_macro_categories_cache` y `support_macros_cache`, normaliza nombres, estados y audiencias. Filtra macros por entorno, app, rol, estado y categoría antes de presentarlas. Permite usar la copia del runtime sin acoplar los dispositivos al control OPS.

**Superficie que exporta.** [`normalizeSupportAppKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L151), [`normalizeSupportEnvKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L157), [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L163), [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L215).

**Módulos que lo cargan.** [`SoporteIrregularScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L9) (importa), [`SoporteTicketScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L18) (importa).

**Dependencias del archivo.** [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`APP_ALIASES`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L3) · variable de módulo

Declara `APP_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeSupportAppKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L154) (accede al módulo).

#### [`ENV_ALIASES`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L22) · variable de módulo

Declara `ENV_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeSupportEnvKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L160) (accede al módulo).

#### [`THREAD_STATUS_ALIASES`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L31) · variable de módulo

Declara `THREAD_STATUS_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeThreadStatus`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L137) (accede al módulo).

#### [`CATEGORY_WILDCARD_CODES`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L61) · variable de módulo

Declara `CATEGORY_WILDCARD_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L313) (accede al módulo).

#### [`CATEGORY_ALIASES`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L70) · variable de módulo

Declara `CATEGORY_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeCategoryCode`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L148) (accede al módulo).

#### [`AUDIENCE_ROLE_ALIASES`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L92) · variable de módulo

Declara `AUDIENCE_ROLE_ALIASES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeAudienceRoles`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L128) (accede al módulo), [`resolveThreadAudienceRole`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L239) (accede al módulo).

#### [`ALLOWED_AUDIENCE_ROLES`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L102) · variable de módulo

Declara `ALLOWED_AUDIENCE_ROLES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeAudienceRoles`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L129) (accede al módulo).

#### [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L110) · función

Implementa `as String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L112).
- **Lo usa** [`normalizeArray`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L119) (llama), [`normalizeThreadStatus`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L136) (llama), [`normalizeCategoryCode`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L141) (llama), [`normalizeSupportAppKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L152) (llama), [`normalizeSupportEnvKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L158) (llama), [`resolveThreadAudienceRole`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L229) (llama), [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L255) (llama), [`sortMacros`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L289) (llama).

#### [`normalizeArray`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L116) · función

Normaliza `Array` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `values`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `ausencia de Array.isArray`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L119), [`values.map`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L119), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L119), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L119).
- **Lo usa** [`normalizeAudienceRoles`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L127) (llama), [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L197) (llama), [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L328) (llama).

#### [`normalizeAudienceRoles`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L124) · función

Normaliza `Audience Roles` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `values`, `fallback = valor por defecto`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L127), [`map`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L127), [`normalizeArray`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L127), [`AUDIENCE_ROLE_ALIASES.get`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L128), [`ALLOWED_AUDIENCE_ROLES.has`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L129).
- **Lo usa** [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L202) (llama), [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L337) (llama).

#### [`normalizeThreadStatus`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L135) · función

Normaliza `Thread Status` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L136), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L136), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L136), [`THREAD_STATUS_ALIASES.get`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L137).
- **Lo usa** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L262) (llama).

#### [`normalizeCategoryCode`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L140) · función

Normaliza `Category Code` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L141), [`normalize`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L141), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L141), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L141), [`CATEGORY_ALIASES.get`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L148).
- **Lo usa** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L258) (llama).

#### [`normalizeSupportAppKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L151) · función · exportado

Normaliza `Support App Key` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L152), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L152), [`APP_ALIASES.get`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L154).
- **Lo usa** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L249) (llama).

#### [`normalizeSupportEnvKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L157) · función · exportado

Normaliza `Support Env Key` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L158), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L158), [`ENV_ALIASES.get`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L160).
- **Lo usa** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L250) (llama), [`runtimeEnvKey`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L108) (llama).

#### [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L163) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) y coordina las demás operaciones de esta ficha.

- **Entradas** `{publishedOnly} = valor por defecto`.
- **Retorno visible o tipo declarado** `source`, `categories`, `macros`, `error`.
- **Condiciones que evalúa** `publishedOnly`, `categoriesError o macrosError`.
- **Contrato de datos** tabla o vista [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) (`select`) en [`supportCatalog.ts:164`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L164), tabla o bucket [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) en [`supportCatalog.ts:164`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L164), tabla o vista [`support_macros_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L36) (`select`) en [`supportCatalog.ts:170`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L170), tabla o bucket [`support_macros_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L36) en [`supportCatalog.ts:170`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L170).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`order`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L164), [`select`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L164), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L164), [`categoriesQuery.in`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L179), [`macrosQuery.in`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L180), [`map`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L195), [`normalizeArray`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L197), [`normalizeAudienceRoles`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L202).
- **Lo usa** [`loadCategories`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L31) (llama), [`loadCatalog`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L134) (llama).

#### [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L215) · función · exportado

Procesa `Support Macros For Thread` según el criterio del módulo.

- **Entradas** `{thread, macros, categories, runtimeEnvKey}`.
- **Retorno visible o tipo declarado** `lista`, `booleano`.
- **Condiciones que evalúa** `ausencia de thread`, `currentThreadStatus`, `macroStatus`, `ausencia de threadStatus`, `ausencia de allowedThreadStatuses.has`, `categoryCode`, `ausencia de isWildcardCategory y categoryCode`, `ausencia de threadAudienceRole` y 5 más.
- **Llamadas directas en el cuerpo** [`normalizeSupportAppKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L249), [`normalizeSupportEnvKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L250), [`resolveThreadAudienceRole`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L251), [`filter`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L253), [`map`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L253), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L255), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L255), [`normalizeCategoryCode`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L258), [`normalizeThreadStatus`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L262), [`allowedThreadStatuses.has`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L307), [`categoryCodeById.get`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L310), [`CATEGORY_WILDCARD_CODES.has`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L313) y 10 más.
- **Lo usa** [`macros`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L241) (llama).

#### [`resolveThreadAudienceRole`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L228) · función · dentro de [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L215)

Obtiene o resuelve `Thread Audience Role` para entregarlo al consumidor.

- **Condiciones que evalúa** `requestOrigin`, `normalized`, `userPublicId.startsWith`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L229), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L229), [`AUDIENCE_ROLE_ALIASES.get`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L239), [`toUpperCase`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L243), [`userPublicId.startsWith`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L244).
- **Lo usa** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L251) (llama).

#### [`sortMacros`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L284) · función · dentro de [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L215)

Procesa `Macros` según el criterio del módulo.

- **Entradas** `list`.
- **Condiciones que evalúa** `aSort`.
- **Llamadas directas en el cuerpo** [`list.sort`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L285), [`localeCompare`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L289), [`asString`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L289).
- **Lo usa** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L340) (llama).
