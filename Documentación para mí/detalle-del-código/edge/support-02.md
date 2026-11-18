# Runtime · soporte · 2

Entradas de tickets y mensajes, cola del agente, jornadas y catálogo. Los archivos de este módulo comparten la lógica de autorización y los contratos de la base.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`support-ops-proxy/index.ts`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts)
- [`support-retake-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts)
- [`support-set-auto-assign-mode/index.ts`](../../../apps/referidos-app/supabase/functions/support-set-auto-assign-mode/index.ts)
- [`support-start-session/index.ts`](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts)
- [`support-thread-workflow-action/index.ts`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts)
- [`support-update-status/index.ts`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts)
- [`support-webhook-whatsapp/index.ts`](../../../apps/referidos-app/supabase/functions/support-webhook-whatsapp/index.ts)
- [`support-whatsapp-name-updated/index.ts`](../../../apps/referidos-app/supabase/functions/support-whatsapp-name-updated/index.ts)

## `support-ops-proxy/index.ts`

Verifica admin local y permite solo las operaciones de catálogo previstas hacia OPS. Traducir la acción en el servidor evita entregar al navegador las credenciales del catálogo central.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L525).
- **Referencias literales al nombre del endpoint:** [supportAppsService.js](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L27), [supportMacrosOpsService.js](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L4), [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L98), [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L123), [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L151), [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L170), [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L187), [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L194), [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L198), 6 más en el código.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Configuración que lee al inicializarse:** `SUPPORT_OPS_URL`, `SUPPORT_OPS_SECRET_KEY`, `SUPPORT_OPS_SHARED_TOKEN`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L9).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L36) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [ámbito de módulo · support-ops-proxy](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L48), [`invokeOpsFunction` · support-ops-proxy](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L89), [handler HTTP · support-ops-proxy](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L137).
- [`asObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L42) · Función. Normaliza una entrada a un objeto de propiedades para consumir payloads opcionales.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [handler HTTP · support-ops-proxy](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L136).
- [`ensureEnv()`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L52) · Función. Verifica o prepara el valor o paso `env` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-ops-proxy](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L112).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`.
- [`invokeOpsFunction(functionName: string, payload: JsonObject)`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L64) · Función, asíncrona. Llama a una función del proyecto de operaciones mediante el canal de servidor.
  - **Dónde se usa:** [handler HTTP · support-ops-proxy](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L159).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L36).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `detail`, `payload`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L101) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-ops-proxy` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`ensureEnv`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L52), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`asObject`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L42), [`asString`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L36), [`invokeOpsFunction`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts#L64).
  - **Propiedades de entrada leídas:** `body.action`, `body.payload`, `payload.tenant_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `action`, `payload`, `data`.

## `support-retake-thread/index.ts`

Autoriza al dueño o al portador del token de seguimiento, exige un estado retoma válido y marca la solicitud con el motor. Conserva continuidad de la conversación.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-retake-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L543).
- **Referencias literales al nombre del endpoint:** [supportChatClient.js](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L52), [createPrelaunchClient.js](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L152), [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L86).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `safeTrim`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `markSupportRetakeRequested`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`sha256(value: string)`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts#L12) · Función, asíncrona. Implementa el paso `sha256` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-retake-thread](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts#L62).
  - **Integraciones:** `crypto.subtle.digest`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts#L20) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-retake-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`sha256`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts#L12), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`markSupportRetakeRequested`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L961).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts#L40) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.tracking_token`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `409` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread_public_id`, `app_channel`, `retake_requested_at`, `estimated_delay_seconds`, `cycle`.

## `support-set-auto-assign-mode/index.ts`

Valida el agente y el valor de modo permitido, y modifica su perfil operativo. Cambiar el modo afecta la elegibilidad sin alterar el rol de Auth.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-set-auto-assign-mode/index.ts)

- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L102).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-set-auto-assign-mode/index.ts#L10) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-set-auto-assign-mode` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_profiles`](../../../apps/referidos-app/supabase/functions/support-set-auto-assign-mode/index.ts#L46) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L334) (`upsert`, `select`).
  - **Propiedades de entrada leídas:** `body.mode`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `profile`.

## `support-start-session/index.ts`

Valida perfil, reglas de autorización y jornada, y crea una sesión operativa del agente. Registra el evento y alimenta el motor de asignación. Es una sesión distinta a la sesión de inicio de sesión de Supabase Auth.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-start-session/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L474).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L42).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `loadSupportRuntimeFlags`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts#L12) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-start-session` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820), [`loadSupportRuntimeFlags`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L120).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_profiles`](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts#L42) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L334) (`upsert`, `select`, `update`), [`support_agent_sessions`](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts#L68) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L373) (`select`, `insert`), [`support_agent_events`](../../../apps/referidos-app/supabase/functions/support-start-session/index.ts#L181) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L386) (`insert`).
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `session_id`, `pending`, `pending_reason`.

## `support-thread-workflow-action/index.ts`

Expone acciones de flujo identificadas, entre ellas opening_message_reset e issue_context_set. Valida acceso, actualiza el metadato e inserta evento para que operaciones auxiliares también tengan traza.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L504).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L98).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveSupportThreadCategory`, `safeTrim`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`WorkflowAction`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts#L12).

### Funciones, handlers y clases

- [`asObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts#L31) · Función. Normaliza una entrada a un objeto de propiedades para consumir payloads opcionales.
  - **Tipo de retorno declarado:** `Record<string, unknown>`.
  - **Dónde se usa:** [handler HTTP · support-thread-workflow-action](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts#L66).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts#L36) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-thread-workflow-action` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`asObject`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts#L31), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`resolveSupportThreadCategory`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L214).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts#L77) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-thread-workflow-action/index.ts#L131) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.action`, `body.payload`, `payload.mode`, `payload.category`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread`, `action`, `event_at`.

## `support-update-status/index.ts`

Define transiciones permitidas, comprueba que soporte tenga asignación y actualiza marcas de tiempo, cola y campos relacionados. Registra eventos y permite reagendar la cola. Es una entrada para cambiar estado sin reimplementar el grafo en cada interfaz.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-update-status/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L462).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L26).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `loadSupportRuntimeFlags`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`normalizeQueueKind(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts#L24) · Función. Normaliza la modalidad de cola para el hilo de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-update-status](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts#L65).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts#L35) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-update-status` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`normalizeQueueKind`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts#L24), [`loadSupportRuntimeFlags`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L120), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts#L70) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-update-status/index.ts#L168) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.status`, `body.queue_kind`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `409`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread`, `cycle`.

## `support-webhook-whatsapp/index.ts`

Reserva el nombre del webhook y contesta a preflight. La implementación actual responde not_implemented con HTTP 501, por lo que la integración entrante sigue pendiente.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-webhook-whatsapp/index.ts)

- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `jsonResponse`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-webhook-whatsapp/index.ts#L4) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-webhook-whatsapp` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43).
  - **HTTP:** métodos comparados `OPTIONS` · estados de respuesta visibles `501` · encabezados leídos `origin` · campos de respuesta `ok`, `error`.

## `support-whatsapp-name-updated/index.ts`

Verifica un actor habilitado para el ticket, registra el cambio de nombre de WhatsApp en su contexto y notifica el flujo de asignación cuando aplica. Mantiene la confirmación operativa separada del webhook reservado.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-whatsapp-name-updated/index.ts)

- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L94).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `safeTrim`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `markSupportWhatsAppNameChanged`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-whatsapp-name-updated/index.ts#L12) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-whatsapp-name-updated` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`markSupportWhatsAppNameChanged`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L1062).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-whatsapp-name-updated/index.ts#L49) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.target_label`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread_public_id`, `whatsapp_name_changed_at`.
