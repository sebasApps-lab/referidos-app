# Android · Servicios, estado y UI compartida · 3 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/shared/services/supportDeskQueries.ts`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L1)
- [`apps/referidos-android/src/shared/services/supportOps.ts`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L1)
- [`apps/referidos-android/src/shared/services/supportRuntimeFlags.ts`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L1)
- [`apps/referidos-android/src/shared/services/systemFeatureFlags.ts`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L1)
- [`apps/referidos-android/src/shared/services/versioningService.ts`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/shared/services/supportDeskQueries.ts`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L1)

Lee la vista `support_threads_inbox`, con fallback a la tabla de hilos si el esquema esperado falta. Consulta ficha, notas, eventos, agente, jornadas, issues, dashboard y catálogo de errores. Normaliza campos y combina resultados para evitar repetir lógica operativa en el perfil y en el admin.

**Superficie que exporta.** [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L51), [`fetchSupportThreadDetail`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L108), [`fetchSupportThreadEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L141), [`fetchSupportAgentEventsHistory`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L157), [`fetchSupportThreadNotes`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L173), [`fetchSupportLogEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L189), [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L267), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L284), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L302), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L369), [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L412), [`fetchSupportIssueEventsContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L427), [`fetchSupportErrorCatalog`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L442), [`toSupportThreadSubtitle`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L457).

**Módulos que lo cargan.** [`AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L8) (importa), [`AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L6) (importa), [`AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L14) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L9) (importa), [`AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L8) (importa), [`AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L6) (importa), [`AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L10) (importa), [`AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L8) (importa), [`AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L9) (importa), [`AdminUsuariosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L8) (importa), [`SoportePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L9) (importa), [`SoporteErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L7) (importa), [`SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L18) (importa), [`SoporteInicioScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L10) (importa), [`SoporteIssuesScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L7) (importa), [`SoporteJornadasScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L8) (importa) y 1 más.

**Dependencias del archivo.** [`./entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`Result`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L3) · tipo TypeScript

Describe la forma del contrato de `Result`, con campos `ok`, `data`, `error`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `ok`, `data`, `error`.

#### [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L9) · función

Obtiene o resuelve `Error Message` para entregarlo al consumidor.

- **Entradas** `error`.
- **Lo usa** [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L14) (llama), [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L100) (llama), [`fetchSupportThreadDetail`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L136) (llama), [`fetchSupportThreadEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L153) (llama), [`fetchSupportAgentEventsHistory`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L169) (llama), [`fetchSupportThreadNotes`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L185) (llama), [`fetchSupportLogEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L237) (llama), [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L280) (llama), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L298) (llama), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L316) (llama), [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L423) (llama), [`fetchSupportIssueEventsContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L438) (llama) y 1 más.

#### [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L13) · función

Comprueba `Missing Column Error` para decidir si se admite o continúa la operación.

- **Entradas** `error`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L14), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L14), [`text.includes`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L16).
- **Lo usa** [`fetchSupportLogEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L236) (llama), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L340) (llama).

#### [`normalizeInboxRow`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L23) · función

Normaliza `Inbox Row` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `row`.
- **Retorno visible o tipo declarado** `request_origin`, `origin_source`, `app_channel`, `contact_display`, `anon_public_id`, `personal_queue`, `assigned_at`, `released_to_general_at`, `retake_requested_at`, `handoff_required`, `handoff_reason`, `handoff_at`, `handoff_message_confirmed_at`, `opening_message_sent_at`, `opening_message_actor_id`.
- **Lo usa** [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L81) (referencia), [`fetchSupportThreadDetail`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L126) (llama).

#### [`mergeById`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L44) · función

Procesa `By Id` según el criterio del módulo.

- **Entradas** `list`.
- **Llamadas directas en el cuerpo** [`values`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L46), [`map`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L46).
- **Lo usa** [`fetchSupportLogEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L227) (llama).

#### [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L51) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `options`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeUserId`, `ausencia de options.isAdmin`, `ausencia de inboxResult.error`, `legacyResult.error`.
- **Contrato de datos** tabla o vista [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) (`select`) en [`supportDeskQueries.ts:65`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L65), tabla o bucket [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) en [`supportDeskQueries.ts:65`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L65), tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`supportDeskQueries.ts:84`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L84), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`supportDeskQueries.ts:84`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L84).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L60), [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L65), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L65), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L65), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L65), [`inboxQuery.or`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L74), [`map`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L81), [`legacyQuery.or`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L93), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L100).
- **Lo usa** [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L377) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L69) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L42) (llama), [`loadThreads`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L95) (llama), [`loadOverview`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L41) (llama).

#### [`fetchSupportThreadDetail`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L108) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `threadPublicId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeThreadPublicId`, `ausencia de enriched.error`, `fallback.error`.
- **Contrato de datos** tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`supportDeskQueries.ts:117`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L117), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`supportDeskQueries.ts:117`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L117).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L112), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L117), [`eq`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L117), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L117), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L117), [`normalizeInboxRow`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L126), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L136).
- **Lo usa** [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L161) (llama).

#### [`fetchSupportThreadEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L141) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_thread_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L300) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `threadId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeThreadId`, `error`.
- **Contrato de datos** tabla o vista [`support_thread_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L300) (`select`) en [`supportDeskQueries.ts:147`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L147), tabla o bucket [`support_thread_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L300) en [`supportDeskQueries.ts:147`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L147).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L145), [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L147), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L147), [`eq`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L147), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L147), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L147), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L153).
- **Lo usa** [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L173) (llama).

#### [`fetchSupportAgentEventsHistory`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L157) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_agent_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L384) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `agentId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeAgentId`, `error`.
- **Contrato de datos** tabla o vista [`support_agent_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L384) (`select`) en [`supportDeskQueries.ts:163`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L163), tabla o bucket [`support_agent_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L384) en [`supportDeskQueries.ts:163`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L163).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L161), [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L163), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L163), [`eq`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L163), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L163), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L163), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L169).
- **Lo usa** [`loadEvents`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L58) (llama), [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L59) (llama).

#### [`fetchSupportThreadNotes`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L173) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_thread_notes`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L313) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `threadId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeThreadId`, `error`.
- **Contrato de datos** tabla o vista [`support_thread_notes`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L313) (`select`) en [`supportDeskQueries.ts:179`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L179), tabla o bucket [`support_thread_notes`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L313) en [`supportDeskQueries.ts:179`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L179).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L177), [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L179), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L179), [`eq`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L179), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L179), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L179), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L185).
- **Lo usa** [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L174) (llama), [`addNote`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L336) (llama).

#### [`fetchSupportLogEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L189) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `options = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Efectos y APIs** `supportLogQueries.push`.
- **Condiciones que evalúa** `threadId`, `userId`, `supportLogQueries.length`, `ausencia de anyError`, `ausencia de isMissingColumnError`, `error`.
- **Contrato de datos** tabla o vista [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) (`select`) en [`supportDeskQueries.ts:204`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L204), tabla o bucket [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) en [`supportDeskQueries.ts:204`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L204), tabla o vista [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) (`select`) en [`supportDeskQueries.ts:241`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L241), tabla o bucket [`obs_events`](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L91) en [`supportDeskQueries.ts:241`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L241).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L198), [`supportLogQueries.push`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L203), [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L204), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L204), [`eq`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L204), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L204), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L204), [`entries.find`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L225), [`slice`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L227), [`sort`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L227), [`mergeById`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L227), [`entries.flatMap`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L227) y 5 más.
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L20) (llama), [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L175) (llama).

#### [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L267) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `agentId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeAgentId`, `error`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`select`) en [`supportDeskQueries.ts:273`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L273), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`supportDeskQueries.ts:273`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L273).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L271), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L273), [`eq`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L273), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L273), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L273), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L280).
- **Lo usa** [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L178) (llama), [`loadState`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L48) (llama), [`loadSessionState`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L71) (llama), [`loadOverview`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L39) (llama), [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L52) (llama).

#### [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L284) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `agentId`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de safeAgentId`, `error`.
- **Contrato de datos** tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`supportDeskQueries.ts:290`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`supportDeskQueries.ts:290`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L288), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), [`is`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), [`eq`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L290), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L298).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L67) (llama), [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L179) (llama), [`loadState`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L49) (llama), [`loadSessionState`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L72) (llama), [`loadOverview`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L40) (llama).

#### [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L302) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `profileResult.error`, `ausencia de agentIds.length`, `usersResult.error y ausencia de isMissingColumnError`, `sessionsResult.error y ausencia de isMissingColumnError`, `ticketsResult.error y ausencia de isMissingColumnError`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`select`) en [`supportDeskQueries.ts:307`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L307), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`supportDeskQueries.ts:307`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L307), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`supportDeskQueries.ts:324`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L324), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`supportDeskQueries.ts:324`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L324), tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`supportDeskQueries.ts:328`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L328), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`supportDeskQueries.ts:328`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L328), tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`supportDeskQueries.ts:333`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L333), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`supportDeskQueries.ts:333`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L333).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L307), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L307), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L307), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L307), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L316), [`filter`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L320), [`profiles.map`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L320), [`in`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L324), [`is`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L328), [`isMissingColumnError`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L340), [`map`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L350).
- **Lo usa** [`loadOverview`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L166) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L68) (llama), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L36) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L47) (llama).

#### [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L369) · función · asíncrona · exportado

Obtiene o resuelve `Support Status Summary` para entregarlo al consumidor.

- **Entradas** `supabase`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Llamadas directas en el cuerpo** [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L377).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L63) (llama), [`loadOverview`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L165) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L48) (llama), [`loadOverview`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L46) (llama).

#### [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L412) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) (`select`) en [`supportDeskQueries.ts:416`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L416), tabla o bucket [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) en [`supportDeskQueries.ts:416`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L416).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L416), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L416), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L416), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L416), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L423).
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L39) (llama), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L23) (llama), [`loadData`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L29) (llama).

#### [`fetchSupportIssueEventsContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L427) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) (`select`) en [`supportDeskQueries.ts:431`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L431), tabla o bucket [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) en [`supportDeskQueries.ts:431`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L431).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L431), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L431), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L431), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L431), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L438).
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L40) (llama), [`loadData`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L30) (llama).

#### [`fetchSupportErrorCatalog`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L442) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `limit = valor por defecto`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `data`, `error`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) (`select`) en [`supportDeskQueries.ts:446`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L446), tabla o bucket [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) en [`supportDeskQueries.ts:446`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L446).
- **Llamadas directas en el cuerpo** [`limit`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L446), [`order`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L446), [`select`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L446), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L446), [`getErrorMessage`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L453).
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L20) (llama), [`loadRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L59) (llama).

#### [`toSupportThreadSubtitle`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L457) · función · exportado

Implementa `to Support Thread Subtitle` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `thread`.
- **Usa código de** [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`formatDateTime`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L458).
- **Lo usa** [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L216) (llama), [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L310) (llama).

### [`apps/referidos-android/src/shared/services/supportOps.ts`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L1)

Envuelve `support-ops-proxy` para apps, macros/categorías, estados y edición. Incluye el disparo de sincronizaciones de apps y macros al runtime y funciones autenticadas para listar, crear y revocar códigos de registro.

**Superficie que exporta.** [`parseAliasesInput`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L12), [`formatAliasesInput`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L20), [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L44), [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L65), [`fetchSupportApps`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L97), [`createSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L116), [`updateSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L142), [`setSupportAppActive`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L169), [`listSupportMacroCatalog`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L183), [`createSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L193), [`updateSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L197), [`setSupportMacroCategoryStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L201), [`deleteSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L214), [`createSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L220), [`updateSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L224), [`setSupportMacroStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L228), [`deleteSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L241), [`invokeRegistrationFunction`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L247), [`listRegistrationCodes`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L268), [`createRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L273), [`revokeRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L277).

**Módulos que lo cargan.** [`AdminAppsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L6) (importa), [`AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L7) (importa), [`AdminSupportCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L6) (importa), [`SoporteIrregularScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L10) (importa), [`SoporteTicketScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L23) (importa).

**Dependencias del archivo.** [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`toUniqueLowerArray`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L3) · función

Implementa `to Unique Lower Array` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `values = valor por defecto`.
- **Retorno visible o tipo declarado** `lista`.
- **Condiciones que evalúa** `ausencia de Array.isArray`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L7), [`values.map`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L7), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L7), [`trim`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L7).
- **Lo usa** [`parseAliasesInput`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L13) (llama), [`formatAliasesInput`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L21) (llama), [`createSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L130) (llama), [`updateSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L158) (llama).

#### [`parseAliasesInput`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L12) · función · exportado

Extrae o interpreta `Aliases Input` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toUniqueLowerArray`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L13), [`map`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L14), [`split`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L14), [`item.trim`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L16).

#### [`formatAliasesInput`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L20) · función · exportado

Formatea `Aliases Input` para que el consumidor lo pueda presentar.

- **Entradas** `values`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L21), [`toUniqueLowerArray`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L21).
- **Lo usa** [`startEdit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L156) (llama).

#### [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L24) · función · asíncrona

Implementa `invoke Proxy` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `name`, `action`, `payload = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de data.ok`.
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L25).
- **Lo usa** [`fetchSupportApps`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L98) (llama), [`createSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L123) (llama), [`updateSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L151) (llama), [`setSupportAppActive`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L170) (llama), [`listSupportMacroCatalog`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L187) (llama), [`createSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L194) (llama), [`updateSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L198) (llama), [`setSupportMacroCategoryStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L208) (llama), [`deleteSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L215) (llama), [`createSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L221) (llama), [`updateSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L225) (llama), [`setSupportMacroStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L235) (llama) y 1 más.

#### [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L44) · función · asíncrona · exportado

Consulta o invoca Edge [`ops-support-apps-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{mode, forceFull, trigger} = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`ops-support-apps-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts) en [`supportOps.ts:49`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L49).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L49).
- **Lo usa** [`fetchSupportApps`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L104) (llama), [`createSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L134) (llama), [`updateSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L161) (llama), [`setSupportAppActive`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L175) (llama), [`handleSync`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L117) (llama).

#### [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L65) · función · asíncrona · exportado

Consulta o invoca Edge [`ops-support-macros-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{mode, panelKey, forceFull, limit} = valor por defecto`.
- **Condiciones que evalúa** `Number.isFinite`, `error`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`ops-support-macros-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts) en [`supportOps.ts:85`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L85).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L85).
- **Lo usa** [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L120) (llama), [`loadCategories`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L34) (llama), [`loadCatalog`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L137) (llama).

#### [`fetchSupportApps`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L97) · función · asíncrona · exportado

Obtiene o resuelve `Support Apps` para entregarlo al consumidor.

- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L98), [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L104).
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L49) (llama).

#### [`createSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L116) · función · asíncrona · exportado

Construye `Support App` a partir de los datos del flujo.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L123), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L124), [`trim`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L124), [`toUniqueLowerArray`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L130), [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L134).
- **Lo usa** [`handleSubmit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L94) (llama).

#### [`updateSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L142) · función · asíncrona · exportado

Aplica o guarda `Support App` para que el estado refleje la operación.

- **Entradas** `appId`, `payload`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L151), [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L153), [`trim`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L153), [`toUniqueLowerArray`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L158), [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L161).
- **Lo usa** [`handleSubmit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L86) (llama).

#### [`setSupportAppActive`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L169) · función · asíncrona · exportado

Aplica o guarda `Support App Active` para que el estado refleje la operación.

- **Entradas** `appId`, `active`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L170), [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L175).
- **Lo usa** [`handleToggleActive`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L137) (llama).

#### [`listSupportMacroCatalog`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L183) · función · asíncrona · exportado

Obtiene o resuelve `Support Macro Catalog` para entregarlo al consumidor.

- **Entradas** `{includeArchived, includeDraft} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L187).
- **Lo usa** [`loadCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L83) (llama).

#### [`createSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L193) · función · asíncrona · exportado

Construye `Support Macro Category` a partir de los datos del flujo.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L194).
- **Lo usa** [`submitCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L153) (llama).

#### [`updateSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L197) · función · asíncrona · exportado

Aplica o guarda `Support Macro Category` para que el estado refleje la operación.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L198).
- **Lo usa** [`submitCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L150) (llama).

#### [`setSupportMacroCategoryStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L201) · función · asíncrona · exportado

Aplica o guarda `Support Macro Category Status` para que el estado refleje la operación.

- **Entradas** `{categoryId, status}`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L208).
- **Lo usa** [`updateCategoryStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L227) (llama).

#### [`deleteSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L214) · función · asíncrona · exportado

Limpia o restablece `Support Macro Category` como parte de este flujo.

- **Entradas** `{categoryId}`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L215).
- **Lo usa** [`removeCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L245) (llama).

#### [`createSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L220) · función · asíncrona · exportado

Construye `Support Macro` a partir de los datos del flujo.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L221).
- **Lo usa** [`submitMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L187) (llama).

#### [`updateSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L224) · función · asíncrona · exportado

Aplica o guarda `Support Macro` para que el estado refleje la operación.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L225).
- **Lo usa** [`submitMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L184) (llama).

#### [`setSupportMacroStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L228) · función · asíncrona · exportado

Aplica o guarda `Support Macro Status` para que el estado refleje la operación.

- **Entradas** `{macroId, status}`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L235).
- **Lo usa** [`updateMacroStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L261) (llama).

#### [`deleteSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L241) · función · asíncrona · exportado

Limpia o restablece `Support Macro` como parte de este flujo.

- **Entradas** `{macroId}`.
- **Llamadas directas en el cuerpo** [`invokeProxy`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L242).
- **Lo usa** [`removeMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L279) (llama).

#### [`invokeRegistrationFunction`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L247) · función · asíncrona · exportado

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Entradas** `name`, `body = valor por defecto`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `error`, `data.ok`.
- **Contrato de datos** Auth `getSession` en [`supportOps.ts:250`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L250).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L250), [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L254).
- **Lo usa** [`listRegistrationCodes`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L269) (llama), [`createRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L274) (llama), [`revokeRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L278) (llama).

#### [`listRegistrationCodes`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L268) · función · asíncrona · exportado

Obtiene o resuelve `Registration Codes` para entregarlo al consumidor.

- **Entradas** `limit = valor por defecto`.
- **Llamadas directas en el cuerpo** [`invokeRegistrationFunction`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L269).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L94) (llama).

#### [`createRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L273) · función · asíncrona · exportado

Construye `Registration Code` a partir de los datos del flujo.

- **Llamadas directas en el cuerpo** [`invokeRegistrationFunction`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L274).
- **Lo usa** [`handleCreateCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L193) (llama).

#### [`revokeRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L277) · función · asíncrona · exportado

Limpia o restablece `Registration Code` como parte de este flujo.

- **Entradas** `id`.
- **Llamadas directas en el cuerpo** [`invokeRegistrationFunction`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L278).
- **Lo usa** [`handleRevokeCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L209) (llama).

### [`apps/referidos-android/src/shared/services/supportRuntimeFlags.ts`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L1)

Carga y normaliza la fila de configuración en `support_runtime_flags`, conserva una copia y notifica a suscriptores locales. Expone cambios de permisos de sesión/jornada, autoasignación y otros valores operativos que usan los paneles de soporte.

**Superficie que exporta.** [`SupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L3), [`DEFAULT_SUPPORT_RUNTIME_FLAGS`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L18), [`getCachedSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L130), [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L134), [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L164), [`setSupportRuntimeFlag`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L202), [`subscribeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L215).

**Módulos que lo cargan.** [`AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L17) (importa).

**Dependencias del archivo.** [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`SupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L3) · tipo TypeScript · exportado

Describe la forma del contrato de `Support Runtime Flags`, con campos `require_session_authorization`, `require_jornada_authorization`, `auto_assign_enabled`, `max_assigned_tickets`, `max_processing_tickets`, `wait_user_to_personal_queue_minutes`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `require_session_authorization`, `require_jornada_authorization`, `auto_assign_enabled`, `max_assigned_tickets`, `max_processing_tickets`, `wait_user_to_personal_queue_minutes`, `personal_queue_release_minutes`, `personal_queue_release_overload_minutes`, `personal_queue_overload_threshold`, `retake_reassignment_window_mode`, `retake_reassignment_window_hours`, `retake_reassignment_multiplier`.
- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L79) (referencia).

#### [`DEFAULT_SUPPORT_RUNTIME_FLAGS`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L18) · variable de módulo · exportado

Declara `DEFAULT_SUPPORT_RUNTIME_FLAGS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`cachedFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L34) (referencia), [`normalizeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L51) (referencia), [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L149) (referencia), [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L80) (referencia), [`toggleSupportFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L130) (referencia).

#### [`listeners`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L33) · variable de módulo

Declara `listeners` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`emitFlagsChange`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L121) (accede al módulo), [`subscribeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L217) (accede al módulo).

#### [`cachedFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L34) · variable de módulo

Declara `cachedFlags` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getCachedSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L131) (referencia), [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L136) (referencia), [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L198) (referencia).

#### [`hasFetchedFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L35) · variable de módulo

Declara `hasFetchedFlags` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L135) (referencia).

#### [`asInt`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L37) · función

Implementa `as Int` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`, `min = valor por defecto`, `max = valor por defecto`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`.
- **Lo usa** [`normalizeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L62) (llama).

#### [`asNumber`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L43) · función

Implementa `as Number` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`, `min = valor por defecto`, `max = valor por defecto`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`.
- **Lo usa** [`normalizeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L107) (llama).

#### [`normalizeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L49) · función

Normaliza `Support Runtime Flags` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `SupportRuntimeFlags`.
- **Condiciones que evalúa** `ausencia de raw o object o Array.isArray`, `normalized.max_processing_tickets`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L53), [`trim`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L53), [`asInt`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L62), [`includes`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L98), [`asNumber`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L107).
- **Lo usa** [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L154) (llama), [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L169) (llama).

#### [`emitFlagsChange`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L120) · función

Emite o envía `Flags Change` en el flujo del archivo.

- **Entradas** `nextFlags`.
- **Llamadas directas en el cuerpo** [`listeners.forEach`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L121), [`listener`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L123).
- **Lo usa** [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L198) (llama).

#### [`getCachedSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L130) · función · exportado

Obtiene o resuelve `Cached Support Runtime Flags` para entregarlo al consumidor.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L134) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) y coordina las demás operaciones de esta ficha.

- **Entradas** `{force} = valor por defecto`.
- **Condiciones que evalúa** `ausencia de force y hasFetchedFlags`, `error o ausencia de data`.
- **Contrato de datos** tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) (`select`) en [`supportRuntimeFlags.ts:140`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L140), tabla o bucket [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) en [`supportRuntimeFlags.ts:140`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L140).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L140), [`eq`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L140), [`select`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L140), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L140), [`normalizeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L154).
- **Lo usa** [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L168) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L93) (llama).

#### [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L164) · función · asíncrona · exportado

Guarda datos en tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) y coordina las demás operaciones de esta ficha.

- **Entradas** `patch = valor por defecto`, `{updatedBy} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `flags`.
- **Condiciones que evalúa** `updatedBy`, `error`.
- **Contrato de datos** tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) (`upsert + select`) en [`supportRuntimeFlags.ts:180`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L180), tabla o vista [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) (`upsert`) en [`supportRuntimeFlags.ts:180`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L180), tabla o bucket [`support_runtime_flags`](../../../apps/referidos-app/supabase/migrations/20260311_000033_support_runtime_flags.sql#L2) en [`supportRuntimeFlags.ts:180`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L180).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L168), [`normalizeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L169), [`maybeSingle`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L180), [`select`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L180), [`upsert`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L180), [`supabase.from`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L180), [`emitFlagsChange`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L198).
- **Lo usa** [`setSupportRuntimeFlag`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L207) (llama), [`handleSaveRuntimeConfig`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L154) (llama).

#### [`setSupportRuntimeFlag`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L202) · función · asíncrona · exportado

Aplica o guarda `Support Runtime Flag` para que el estado refleje la operación.

- **Entradas** `flagKey`, `enabled`, `{updatedBy} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L207).
- **Lo usa** [`toggleSupportFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L135) (llama).

#### [`subscribeSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L215) · función · exportado

Inicia `Support Runtime Flags` y prepara sus dependencias.

- **Entradas** `onChange`.
- **Condiciones que evalúa** `function`.
- **Llamadas directas en el cuerpo** [`listeners.add`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L217), [`listeners.delete`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L219).

### [`apps/referidos-android/src/shared/services/systemFeatureFlags.ts`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L1)

Persiste flags del sistema en AsyncStorage, inicializa valores predeterminados, mantiene una caché y notifica cambios a suscriptores. Controla estados como Apple OAuth o actualizaciones de soporte donde el código los consume. Sus datos viven en este dispositivo.

**Superficie que exporta.** [`DEFAULT_SYSTEM_FEATURE_FLAGS`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L5), [`getCachedSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L41), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45), [`setSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L57), [`setSystemFeatureFlag`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L72), [`isSupportLiveUpdatesEnabled`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L81), [`isAppleOAuthEnabled`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L85), [`subscribeSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L89).

**Módulos que lo cargan.** [`AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L12) (importa), [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L12) (importa), [`AdminPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L7) (importa), [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L18) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L18) (importa), [`SoportePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L8) (importa).

**Dependencias del archivo.** `@react-native-async-storage/async-storage`.

#### [`STORAGE_KEY`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L3) · variable de módulo

Declara `STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L48) (referencia), [`setSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L64) (referencia).

#### [`DEFAULT_SYSTEM_FEATURE_FLAGS`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L5) · variable de módulo · exportado

Declara `DEFAULT_SYSTEM_FEATURE_FLAGS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SystemFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L13) (referencia), [`cachedFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L16) (referencia), [`normalizeFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L21) (referencia), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L49) (referencia), [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L78) (referencia), [`toggleSystemFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L112) (referencia).

#### [`SystemFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L13) · tipo TypeScript

Describe la forma del contrato de `System Flags`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`listeners`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L15) · variable de módulo

Declara `listeners` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`emitFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L32) (accede al módulo), [`subscribeSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L91) (accede al módulo).

#### [`cachedFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L16) · variable de módulo

Declara `cachedFlags` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getCachedSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L42) (referencia), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L46) (referencia), [`setSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L59) (referencia), [`isSupportLiveUpdatesEnabled`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L82) (accede al módulo), [`isAppleOAuthEnabled`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L86) (accede al módulo).

#### [`hasLoadedFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L17) · variable de módulo

Declara `hasLoadedFlags` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L46) (referencia).

#### [`normalizeFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L19) · función

Normaliza `Flags` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `SystemFlags`.
- **Condiciones que evalúa** `ausencia de raw o object o Array.isArray`, `key`.
- **Llamadas directas en el cuerpo** [`forEach`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L25).
- **Lo usa** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L49) (llama), [`setSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L58) (llama).

#### [`emitFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L31) · función

Emite o envía `Flags` en el flujo del archivo.

- **Entradas** `nextFlags`.
- **Llamadas directas en el cuerpo** [`listeners.forEach`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L32), [`listener`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L34).
- **Lo usa** [`setSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L68) (llama).

#### [`getCachedSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L41) · función · exportado

Obtiene o resuelve `Cached System Feature Flags` para entregarlo al consumidor.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45) · función · asíncrona · exportado

Obtiene o resuelve `System Feature Flags` para entregarlo al consumidor.

- **Entradas** `{force} = valor por defecto`.
- **Efectos y APIs** `AsyncStorage.getItem`.
- **Condiciones que evalúa** `ausencia de force y hasLoadedFlags`.
- **Llamadas directas en el cuerpo** [`AsyncStorage.getItem`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L48), [`normalizeFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L49).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L92) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L59) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L32) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L142) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L170) (llama), [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L69) (llama).

#### [`setSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L57) · función · asíncrona · exportado

Aplica o guarda `System Feature Flags` para que el estado refleje la operación.

- **Entradas** `nextState`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `AsyncStorage.setItem`.
- **Llamadas directas en el cuerpo** [`normalizeFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L58), [`AsyncStorage.setItem`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L64), [`emitFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L68).
- **Lo usa** [`setSystemFeatureFlag`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L76) (llama).

#### [`setSystemFeatureFlag`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L72) · función · asíncrona · exportado

Aplica o guarda `System Feature Flag` para que el estado refleje la operación.

- **Entradas** `flagKey`, `enabled`.
- **Actualizaciones de estado o acciones** `setSystemFeatureFlags`.
- **Llamadas directas en el cuerpo** [`setSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L76).
- **Lo usa** [`toggleSystemFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L117) (llama).

#### [`isSupportLiveUpdatesEnabled`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L81) · función · exportado

Comprueba `Support Live Updates Enabled` para decidir si se admite o continúa la operación.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`isAppleOAuthEnabled`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L85) · función · exportado

Comprueba `Apple O Auth Enabled` para decidir si se admite o continúa la operación.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`subscribeSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L89) · función · exportado

Inicia `System Feature Flags` y prepara sus dependencias.

- **Entradas** `onChange`.
- **Condiciones que evalúa** `function`.
- **Llamadas directas en el cuerpo** [`listeners.add`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L91), [`listeners.delete`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L93).

### [`apps/referidos-android/src/shared/services/versioningService.ts`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L1)

Formatea versiones y traduce métodos de pantalla a acciones de `versioning-ops-proxy`. Expone catálogos, historial, drift, snapshots, releases, artefactos, nodos, sincronización y gates de despliegue/migraciones. Es el sitio para diagnosticar diferencias entre la acción enviada por Android y lo que espera el proxy runtime.

**Superficie que exporta.** [`formatVersionLabel`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L16), [`fetchVersioningCatalog`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L67), [`fetchLatestReleases`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L71), [`fetchReleasesByProductEnv`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L77), [`fetchReleaseComponents`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L85), [`fetchReleaseSnapshot`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L91), [`fetchComponentHistory`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L105), [`fetchComponentCatalog`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L112), [`fetchDrift`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L118), [`fetchDeployRequests`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L126), [`fetchPromotionHistory`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L138), [`fetchBuildTimeline`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L145), [`fetchReleaseArtifacts`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L165), [`fetchLocalArtifactNodes`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L175), [`upsertLocalArtifactNode`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L185), [`fetchLocalArtifactSyncRequests`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L210), [`requestLocalArtifactSync`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L226), [`previewDevRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L254), [`createDevRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L264), [`backfillReleaseArtifact`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L278), [`fetchWorkflowPackStatus`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L294), [`syncWorkflowPack`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L302), [`validateEnvironmentContract`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L314), [`checkReleaseMigrations`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L327), [`applyReleaseMigrations`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L343) y 9 más.

**Módulos que lo cargan.** [`AdminVersioningScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L6) (importa).

**Dependencias del archivo.** [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`bySemverDesc`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L3) · función

Implementa `by Semver Desc` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`, `b`.
- **Condiciones que evalúa** `aMajor`, `aMinor`, `aPatch`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L13).
- **Lo usa** [`fetchReleasesByProductEnv`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L82) (referencia).

#### [`formatVersionLabel`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L16) · función · exportado

Formatea `Version Label` para que el consumidor lo pueda presentar.

- **Entradas** `row`.
- **Condiciones que evalúa** `ausencia de row.prerelease_tag`.
- **Lo usa** [`safeVersionLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L56) (llama).

#### [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L22) · función · asíncrona

Consulta o invoca Edge [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `action`, `payload = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de errorData y context`, `function`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:23`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L23).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L23), [`context.clone`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L35), [`json`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L36), [`context.json`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L38).
- **Lo usa** [`fetchVersioningCatalog`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L68) (llama), [`fetchLatestReleases`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L72) (llama), [`fetchReleasesByProductEnv`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L78) (llama), [`fetchReleaseComponents`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L86) (llama), [`fetchReleaseSnapshot`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L97) (llama), [`fetchComponentHistory`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L106) (llama), [`fetchComponentCatalog`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L113) (llama), [`fetchDrift`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L119) (llama), [`fetchDeployRequests`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L131) (llama), [`fetchPromotionHistory`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L139) (llama), [`fetchBuildTimeline`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L154) (llama), [`fetchReleaseArtifacts`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L169) (llama) y 21 más.

#### [`fetchVersioningCatalog`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L67) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_versioning_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Contrato de datos** acción de proxy `fetch_versioning_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:68`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L68).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L68).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L220) (llama).

#### [`fetchLatestReleases`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L71) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_latest_releases` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `envKey = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_latest_releases` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:72`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L72).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L72).

#### [`fetchReleasesByProductEnv`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L77) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_releases_by_product_env` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `productKey`, `envKey = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_releases_by_product_env` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:78`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L78).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L78), [`sort`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L82).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L238) (llama).

#### [`fetchReleaseComponents`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L85) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_release_components` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `releaseId`.
- **Contrato de datos** acción de proxy `fetch_release_components` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:86`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L86).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L86).
- **Lo usa** [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L206) (llama).

#### [`fetchReleaseSnapshot`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L91) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_release_snapshot` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{releaseId, productKey, envKey, semver} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_release_snapshot` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:97`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L97).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L97).
- **Lo usa** [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L205) (llama).

#### [`fetchComponentHistory`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L105) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_component_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `componentId`, `limit = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_component_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:106`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L106).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L106).

#### [`fetchComponentCatalog`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L112) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_component_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `productKey`.
- **Contrato de datos** acción de proxy `fetch_component_catalog` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:113`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L113).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L113).

#### [`fetchDrift`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L118) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_drift` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `productKey`, `envA = valor por defecto`, `envB = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_drift` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:119`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L119).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L119).
- **Lo usa** [`handleDrift`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L352) (llama).

#### [`fetchDeployRequests`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L126) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_deploy_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{envKey, status, productKey} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_deploy_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:131`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L131).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L131).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L240) (llama).

#### [`fetchPromotionHistory`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L138) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_promotion_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productId, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_promotion_history` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:139`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L139).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L139).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L242) (llama).

#### [`fetchBuildTimeline`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L145) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_build_timeline` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, releaseId, eventType, status, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_build_timeline` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:154`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L154).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L154).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L244) (llama).

#### [`fetchReleaseArtifacts`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L165) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_release_artifacts` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_release_artifacts` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:169`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L169).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L169).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L239) (llama).

#### [`fetchLocalArtifactNodes`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L175) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_local_artifact_nodes` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{onlyActive, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_local_artifact_nodes` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:179`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L179).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L179).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L246) (llama).

#### [`upsertLocalArtifactNode`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L185) · función · asíncrona · exportado

Consulta o invoca acción de proxy `upsert_local_artifact_node` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{nodeKey, displayName, runnerLabel, osName, active, metadata}`.
- **Contrato de datos** acción de proxy `upsert_local_artifact_node` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:200`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L200).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L200).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L859) (llama).

#### [`fetchLocalArtifactSyncRequests`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L210) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_local_artifact_sync_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, status, nodeKey, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_local_artifact_sync_requests` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:217`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L217).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L217).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L247) (llama).

#### [`requestLocalArtifactSync`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L226) · función · asíncrona · exportado

Consulta o invoca acción de proxy `request_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{releaseId, productKey, envKey, semver, nodeKey, notes, metadata}`.
- **Contrato de datos** acción de proxy `request_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:243`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L243).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L243).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L905) (llama).

#### [`previewDevRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L254) · función · asíncrona · exportado

Consulta o invoca acción de proxy `preview_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, ref} = valor por defecto`.
- **Contrato de datos** acción de proxy `preview_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:258`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L258).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L258).
- **Lo usa** [`handlePreviewDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L319) (llama).

#### [`createDevRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L264) · función · asíncrona · exportado

Consulta o invoca acción de proxy `create_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, ref, overrideSemver, releaseNotes} = valor por defecto`.
- **Contrato de datos** acción de proxy `create_dev_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:270`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L270).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L270).
- **Lo usa** [`handleCreateDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L334) (llama).

#### [`backfillReleaseArtifact`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L278) · función · asíncrona · exportado

Consulta o invoca acción de proxy `backfill_release_artifact` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{releaseId, productKey, ref, sourceCommitSha, releaseNotes} = valor por defecto`.
- **Contrato de datos** acción de proxy `backfill_release_artifact` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:285`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L285).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L285).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L650) (llama).

#### [`fetchWorkflowPackStatus`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L294) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_workflow_pack_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{sourceRef} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_workflow_pack_status` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:297`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L297).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L297).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L248) (llama).

#### [`syncWorkflowPack`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L302) · función · asíncrona · exportado

Consulta o invoca acción de proxy `sync_workflow_pack` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{sourceRef, syncStaging, syncProd} = valor por defecto`.
- **Contrato de datos** acción de proxy `sync_workflow_pack` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:307`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L307).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L307).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L459) (llama).

#### [`validateEnvironmentContract`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L314) · función · asíncrona · exportado

Consulta o invoca acción de proxy `validate_environment` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey}`.
- **Contrato de datos** acción de proxy `validate_environment` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:321`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L321).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L321).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L556) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L570) (llama).

#### [`checkReleaseMigrations`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L327) · función · asíncrona · exportado

Consulta o invoca acción de proxy `check_release_migrations` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver}`.
- **Contrato de datos** acción de proxy `check_release_migrations` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:336`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L336).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L336).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L710) (llama).

#### [`applyReleaseMigrations`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L343) · función · asíncrona · exportado

Consulta o invoca acción de proxy `apply_release_migrations` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, sourceBranch, targetBranch}`.
- **Contrato de datos** acción de proxy `apply_release_migrations` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:356`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L356).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L356).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L732) (llama).

#### [`promoteRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L365) · función · asíncrona · exportado

Consulta o invoca acción de proxy `promote_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, fromEnv, toEnv, semver, actor, notes}`.
- **Contrato de datos** acción de proxy `promote_release` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:380`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L380).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L380).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L670) (llama).

#### [`requestDeploy`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L390) · función · asíncrona · exportado

Consulta o invoca acción de proxy `request_deploy` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, actor, notes, metadata}`.
- **Contrato de datos** acción de proxy `request_deploy` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:405`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L405).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L405).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L749) (llama).

#### [`approveDeployRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L415) · función · asíncrona · exportado

Consulta o invoca acción de proxy `approve_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, actor, forceAdminOverride, notes}`.
- **Contrato de datos** acción de proxy `approve_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:426`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L426).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L426).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L786) (llama).

#### [`executeDeployRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L434) · función · asíncrona · exportado

Consulta o invoca acción de proxy `execute_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, actor, status, deploymentId, logsUrl, metadata}`.
- **Contrato de datos** acción de proxy `execute_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:449`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L449).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L449).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L823) (llama).

#### [`rejectDeployRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L459) · función · asíncrona · exportado

Consulta o invoca acción de proxy `reject_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, actor, reason}`.
- **Contrato de datos** acción de proxy `reject_deploy_request` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:468`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L468).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L468).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L798) (llama).

#### [`triggerDeployPipeline`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L475) · función · asíncrona · exportado

Consulta o invoca acción de proxy `trigger_deploy_pipeline` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, forceAdminOverride, skipMerge, syncRelease, syncOnly, sourceBranch, targetBranch}`.
- **Contrato de datos** acción de proxy `trigger_deploy_pipeline` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:492`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L492).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L492).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L810) (llama).

#### [`syncReleaseBranch`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L503) · función · asíncrona · exportado

Consulta o invoca acción de proxy `sync_release_branch` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, fromEnv, toEnv, semver, checkOnly, autoMerge, createPr, sourceBranch, targetBranch, operation, pullNumber, commentBody}`.
- **Contrato de datos** acción de proxy `sync_release_branch` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:530`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L530).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L530).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L690) (llama).

#### [`fetchEnvConfigVersions`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L546) · función · asíncrona · exportado

Consulta o invoca acción de proxy `fetch_env_config_versions` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{productKey, envKey, semver, releaseId, configKey, limit} = valor por defecto`.
- **Contrato de datos** acción de proxy `fetch_env_config_versions` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:554`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L554).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L554).
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L245) (llama).

#### [`cancelLocalArtifactSyncRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L564) · función · asíncrona · exportado

Consulta o invoca acción de proxy `cancel_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{requestId, errorDetail, metadata}`.
- **Contrato de datos** acción de proxy `cancel_local_artifact_sync` mediante [`versioning-ops-proxy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts) en [`versioningService.ts:573`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L573).
- **Llamadas directas en el cuerpo** [`invokeVersioningOps`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L573).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L947) (llama).
