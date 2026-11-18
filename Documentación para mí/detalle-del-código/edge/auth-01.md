# Runtime · identidad y sesiones

Alta, onboarding, códigos, contraseña y registro, consulta o revocación de sesiones.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`create-registration-code/index.ts`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts)
- [`delete-account/index.ts`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts)
- [`list-registration-codes/index.ts`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts)
- [`onboarding/index.ts`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts)
- [`revoke-registration-code/index.ts`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts)
- [`session-list/index.ts`](../../../apps/referidos-app/supabase/functions/session-list/index.ts)
- [`session-register/index.ts`](../../../apps/referidos-app/supabase/functions/session-register/index.ts)
- [`session-revoke-all/index.ts`](../../../apps/referidos-app/supabase/functions/session-revoke-all/index.ts)
- [`session-revoke/index.ts`](../../../apps/referidos-app/supabase/functions/session-revoke/index.ts)
- [`set-password/index.ts`](../../../apps/referidos-app/supabase/functions/set-password/index.ts)
- [`validate-registration-code/index.ts`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts)
- [`validate-registration/index.ts`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts)

## `create-registration-code/index.ts`

Verifica sesión y rol autorizado. Genera un código único con destino de rol y parámetros de vigencia, y registra su creador en codigos_registro. Es la entrada administrativa del mecanismo de invitación.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/create-registration-code/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L435).
- **Referencias literales al nombre del endpoint:** [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L274), [RegistroCodes.jsx](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L85).
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L21) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `create-registration-code` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L129), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L87), [`generateUniqueCode`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L106).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L40) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`), [`codigos_registro`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L69) (`insert`, `select`).
  - **Propiedades de entrada leídas:** `body.role`, `body.expires_at`, `body.code`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `403`, `404`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `message`, `data`.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L87) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · create-registration-code](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L37).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L129).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`generateUniqueCode()`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L106) · Función, asíncrona. Prueba disponibilidad en el catálogo para mantener códigos únicos en el ámbito correspondiente.
  - **Dónde se usa:** [handler HTTP · create-registration-code](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L64).
  - **Delega en:** [`randomSuffix`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L119).
  - **Relaciones consultadas en este cuerpo:** [`codigos_registro`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L109) (`select`).
  - **Retornos explícitos:** null explícito.
- [`randomSuffix(length: number)`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L119) · Función. Genera el sufijo aleatorio con el que se construye un código.
  - **Dónde se usa:** [`generateUniqueCode` · create-registration-code](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L108).
  - **Integraciones:** `crypto.getRandomValues`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L129) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · create-registration-code](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L34), [`getAuthUser` · create-registration-code](../../../apps/referidos-app/supabase/functions/create-registration-code/index.ts#L91).

## `delete-account/index.ts`

Valida la identidad, localiza perfil y negocios vinculados y ejecuta el borrado de registros y cuenta de Auth. Para cualquier cambio, revisa dependencias SQL y qué pasa si una fase falla, dado que Auth y Postgres atraviesan límites de operación distintos.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/delete-account/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/delete-account/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L426).
- **Referencias literales al nombre del endpoint:** [accountLifecycle.ts](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L24), [authService.js](../../../apps/referidos-app/src/services/authService.js#L209).
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts#L17) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `delete-account` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts#L104).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts#L56) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`, `delete`), [`negocios`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts#L67) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L56) (`delete`).
  - **Integraciones:** `supabasePublic.auth.getUser`, `supabaseAdmin.auth.admin.deleteUser`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `message`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/delete-account/index.ts#L104) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · delete-account](../../../apps/referidos-app/supabase/functions/delete-account/index.ts#L35).

## `list-registration-codes/index.ts`

Lista entradas de codigos_registro para roles habilitados con filtros y paginación. Separa la vista administrativa de códigos del flujo del solicitante.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/list-registration-codes/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L438).
- **Referencias literales al nombre del endpoint:** [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L269), [RegistroCodes.jsx](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L65).
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L18) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `list-registration-codes` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L111), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L86), [`clampInt`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L105).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L37) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`), [`codigos_registro`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L59) (`select`).
  - **Propiedades de entrada leídas:** `body.status`, `body.limit`, `body.offset`.
  - **HTTP:** métodos comparados `OPTIONS`, `GET`, `POST` · estados de respuesta visibles `200`, `400`, `403`, `404`, `405` · encabezados leídos `origin` · campos de respuesta `ok`, `message`, `data`, `count`.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L86) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · list-registration-codes](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L34).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L111).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`clampInt(value: string | number, min: number, max: number)`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L105) · Función. Acota el valor o paso `int` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · list-registration-codes](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L55).
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L111) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · list-registration-codes](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L31), [`getAuthUser` · list-registration-codes](../../../apps/referidos-app/supabase/functions/list-registration-codes/index.ts#L90).

## `onboarding/index.ts`

Resuelve el perfil y las relaciones de negocio para el usuario autenticado. Contrasta datos de Auth, estado de cuenta y dependencias necesarias, sincroniza señales de identidad cuando procede y devuelve allowAccess, reasons y datos para decidir qué pantalla seguir. Permite que web y Android compartan la decisión de entrada.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/onboarding/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/onboarding/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L402).
- **Referencias literales al nombre del endpoint:** [onboardingClient.js](../../../apps/referidos-app/src/services/onboardingClient.js#L15), [onboarding.js](../../../packages/api-client/src/auth/onboarding.js#L4).
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `SUPABASE_URL`, `URL`, `SUPABASE_PUBLISHABLE_KEY`, `PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `SECRET_KEY`.
- **Tipos declarados:** [`AccountStatus`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L45), [`OnboardingResult`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L53) (`ok`, `allowAccess`, `reasons`, `usuario`, `negocio`, `client_steps`, `email_confirmed`, `phone`, `ruc`, `verification_status`, `provider`, `providers`), [`UsuarioProfile`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L71) (`id`, `id_auth`, `email`, `role`, `nombre`, `apellido`, `telefono`, `verification_status`, `email_verificado`, `has_password`, `must_change_password`, `fecha_nacimiento`, `genero`, `account_status`, `cliente_profile_skipped`, `cliente_address_skipped` y 2 más), [`NegocioProfile`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L92) (`id`, `usuarioid`, `nombre`, `categoria`, `ruc`), [`SucursalProfile`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L100) (`id`, `negocioid`, `direccion_id`, `horarios`, `tipo`, `fechacreacion`), [`DireccionProfile`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L109) (`id`, `calles`, `sector`, `referencia`, `ciudad`, `provincia_id`, `canton_id`, `parroquia_id`, `parroquia`, `lat`, `lng`).

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L137) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `onboarding` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L552), [`hasHorarios`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L428).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L209) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`, `update`), [`identities`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L242) (`select`), [`users`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L260) (`select`), [`direcciones`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L335) → [20250225_000001_direcciones_negocios_usuarios.sql](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L7) (`select`), [`negocios`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L387) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L56) (`select`), [`sucursales`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L410) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L70), [20250227_000001_restore_sucursales_flags_verificacion.sql](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L7) (`select`).
  - **Integraciones:** `supabasePublic.auth.getUser`, `supabaseAdmin.auth.admin.getUserById`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `allowAccess`, `reasons`, `usuario`, `negocio`, `provider`.
- [`hasHorarios(value: unknown)`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L428) · Función. Comprueba el valor o paso `horarios` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · onboarding](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L435).
  - **Retornos explícitos:** booleanos explícitos.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L552) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · onboarding](../../../apps/referidos-app/supabase/functions/onboarding/index.ts#L147).

## `revoke-registration-code/index.ts`

Resuelve el actor autorizado y revoca un registro en codigos_registro. Cambiar su estado conserva antecedentes de emisión y evita gestionar vigencia desde la interfaz.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/revoke-registration-code/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L441).
- **Referencias literales al nombre del endpoint:** [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L278), [RegistroCodes.jsx](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L99).
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L18) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `revoke-registration-code` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L96), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L77).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L37) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`), [`codigos_registro`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L61) (`update`).
  - **Propiedades de entrada leídas:** `body.code`, `body.id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `403`, `404`, `405` · encabezados leídos `origin` · campos de respuesta `ok`, `message`, `data`.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L77) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · revoke-registration-code](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L34).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L96).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L96) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · revoke-registration-code](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L31), [`getAuthUser` · revoke-registration-code](../../../apps/referidos-app/supabase/functions/revoke-registration-code/index.ts#L81).

## `session-list/index.ts`

Lista filas de user_session_devices para el usuario autenticado y marca la sesión actual. Devuelve nombres legibles para la UI de seguridad.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/session-list/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/session-list/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L408).
- **Referencias literales al nombre del endpoint:** [sessionDevices.ts](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L143), [sessionDevicesService.js](../../../apps/referidos-app/src/services/sessionDevicesService.js#L139).
- **Importaciones locales:** [../_shared/session.ts](../../../apps/referidos-app/supabase/functions/_shared/session.ts) · `assertCurrentSessionRegisteredAndActive`, `corsHeaders`, `getAuthedUser`, `getSessionIdFromToken`, `json`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`SessionRow`](../../../apps/referidos-app/supabase/functions/session-list/index.ts#L11) (`id`, `session_id`, `device_id`, `label`, `platform`, `created_at`, `last_seen_at`, `revoked_at`).

### Funciones, handlers y clases

- [`titleFromPlatform(platform: string)`](../../../apps/referidos-app/supabase/functions/session-list/index.ts#L22) · Función. Implementa el paso `title from platform` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · session-list](../../../apps/referidos-app/supabase/functions/session-list/index.ts#L109).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/session-list/index.ts#L39) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `session-list` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L38), [`json`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L49), [`getAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L122), [`getSessionIdFromToken`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L106), [`assertCurrentSessionRegisteredAndActive`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L188), [`titleFromPlatform`](../../../apps/referidos-app/supabase/functions/session-list/index.ts#L22).
  - **Relaciones consultadas en este cuerpo:** [`user_session_devices`](../../../apps/referidos-app/supabase/functions/session-list/index.ts#L77) → [20260206_000001_user_session_devices.sql](../../../apps/referidos-app/supabase/migrations/20260206_000001_user_session_devices.sql#L6) (`update`, `select`).
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `500` · campos de respuesta `ok`, `code`, `message`, `current_session_id`, `sessions`.

## `session-register/index.ts`

Autentica el JWT y extrae la sesión. Registra o refresca dispositivo, plataforma, etiqueta y señal de agente de usuario, deduplica sesiones según el dispositivo y prunea registros. El registro hace posible inventariar y revocar dispositivos sin confundirlos con el perfil.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/session-register/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/session-register/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L405).
- **Referencias literales al nombre del endpoint:** [sessionDevices.ts](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L136), [sessionDevicesService.js](../../../apps/referidos-app/src/services/sessionDevicesService.js#L132).
- **Importaciones locales:** [../_shared/session.ts](../../../apps/referidos-app/supabase/functions/_shared/session.ts) · `corsHeaders`, `getAuthedUser`, `getSessionIdFromToken`, `hashUserAgent`, `json`, `pruneSessions`, `sanitizeDeviceId`, `sanitizeLabel`, `sanitizePlatform`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/session-register/index.ts#L15) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `session-register` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L38), [`json`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L49), [`getAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L122), [`getSessionIdFromToken`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L106), [`sanitizeDeviceId`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L74), [`sanitizeLabel`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L60), [`sanitizePlatform`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L67), [`hashUserAgent`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L255), [`pruneSessions`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L261).
  - **Relaciones consultadas en este cuerpo:** [`user_session_devices`](../../../apps/referidos-app/supabase/functions/session-register/index.ts#L64) → [20260206_000001_user_session_devices.sql](../../../apps/referidos-app/supabase/migrations/20260206_000001_user_session_devices.sql#L6) (`select`, `update`, `upsert`).
  - **Propiedades de entrada leídas:** `body.device_id`, `body.label`, `body.platform`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `405`, `500` · campos de respuesta `ok`, `code`, `message`, `session`, `current_session_id`.

## `session-revoke-all/index.ts`

Marca sesiones del mismo usuario en conjunto bajo la validación de la sesión actual. Soporta la acción de cerrar dispositivos desde seguridad sin que el cliente pueda modificar arbitrariamente las filas.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/session-revoke-all/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/session-revoke-all/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L414).
- **Referencias literales al nombre del endpoint:** [sessionDevices.ts](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L157), [sessionDevicesService.js](../../../apps/referidos-app/src/services/sessionDevicesService.js#L153).
- **Importaciones locales:** [../_shared/session.ts](../../../apps/referidos-app/supabase/functions/_shared/session.ts) · `assertCurrentSessionRegisteredAndActive`, `corsHeaders`, `getAuthedUser`, `getSessionIdFromToken`, `json`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/session-revoke-all/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `session-revoke-all` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L38), [`json`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L49), [`getAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L122), [`getSessionIdFromToken`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L106), [`assertCurrentSessionRegisteredAndActive`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L188).
  - **Relaciones consultadas en este cuerpo:** [`user_session_devices`](../../../apps/referidos-app/supabase/functions/session-revoke-all/index.ts#L48) → [20260206_000001_user_session_devices.sql](../../../apps/referidos-app/supabase/migrations/20260206_000001_user_session_devices.sql#L6) (`update`, `select`).
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `500` · campos de respuesta `ok`, `code`, `message`, `revoked_count`, `current_session_revoked`, `auth_global_signout`, `auth_global_signout_error`.

## `session-revoke/index.ts`

Valida sesión activa y titularidad, y marca una sesión concreta como revocada. La tabla de sesiones permite que las políticas y el bootstrap apliquen esa decisión.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/session-revoke/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/session-revoke/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L411).
- **Referencias literales al nombre del endpoint:** [sessionDevices.ts](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L153), [sessionDevicesService.js](../../../apps/referidos-app/src/services/sessionDevicesService.js#L149).
- **Importaciones locales:** [../_shared/session.ts](../../../apps/referidos-app/supabase/functions/_shared/session.ts) · `assertCurrentSessionRegisteredAndActive`, `corsHeaders`, `getAuthedUser`, `getSessionIdFromToken`, `json`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/session-revoke/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `session-revoke` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L38), [`json`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L49), [`getAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L122), [`getSessionIdFromToken`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L106), [`assertCurrentSessionRegisteredAndActive`](../../../apps/referidos-app/supabase/functions/_shared/session.ts#L188).
  - **Relaciones consultadas en este cuerpo:** [`user_session_devices`](../../../apps/referidos-app/supabase/functions/session-revoke/index.ts#L64) → [20260206_000001_user_session_devices.sql](../../../apps/referidos-app/supabase/migrations/20260206_000001_user_session_devices.sql#L6) (`update`, `select`).
  - **Propiedades de entrada leídas:** `body.session_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `404`, `405`, `500` · campos de respuesta `ok`, `code`, `message`, `revoked`, `revoked_session_id`, `current_session_revoked`.

## `set-password/index.ts`

Autentica al llamante y usa Auth Admin para establecer la contraseña de su propio usuario cuando el flujo lo permite. Centraliza las comprobaciones del cambio y la interacción con el proveedor de identidad.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/set-password/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/set-password/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L423).
- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L22) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `set-password` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L89), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L67).
  - **Integraciones:** `supabaseAdmin.auth.admin.updateUserById`.
  - **Propiedades de entrada leídas:** `payload.password`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `message`.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L67) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · set-password](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L39).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L89).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L89) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · set-password](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L36), [`getAuthUser` · set-password](../../../apps/referidos-app/supabase/functions/set-password/index.ts#L74).

## `validate-registration-code/index.ts`

Valida el token de usuario y comprueba código, rol esperado, revocación, vencimiento y estado de uso. Permite validación previa con consume desactivado. En modo consumo vincula su uso al usuario para impedir que el registro se dé por válido solo en pantalla.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/validate-registration-code/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L420).
- **Referencias literales al nombre del endpoint:** [useAuthActions.js](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L360), [useAuthActions.js](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L405).
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L16) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `validate-registration-code` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L123), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L104).
  - **Relaciones consultadas en este cuerpo:** [`codigos_registro`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L44) (`select`, `update`), [`usuarios`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L74) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`).
  - **Propiedades de entrada leídas:** `body.code`, `body.consume`, `body.expected_role`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `409` · encabezados leídos `origin` · campos de respuesta `ok`, `message`, `valid`, `reason`, `data`, `consumed`.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L104) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · validate-registration-code](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L32).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L123).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L123) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · validate-registration-code](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L29), [`getAuthUser` · validate-registration-code](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts#L108).

## `validate-registration/index.ts`

Valida completitud de cliente o negocio desde el perfil autenticado. Comprueba requisitos de dirección y sucursales, y activa el perfil y las filas de negocio aplicables cuando el alta alcanza el estado válido. Es el paso que convierte un formulario parcial en una cuenta utilizable.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/validate-registration/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L417).
- **Referencias literales al nombre del endpoint:** [registration.js](../../../packages/api-client/src/auth/registration.js#L4).
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `URL`, `SUPABASE_URL`, `PUBLISHABLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SECRET_KEY`, `SUPABASE_SECRET_KEY`.
- **Tipos declarados:** [`UsuarioRow`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L22) (`id`, `id_auth`, `role`, `nombre`, `apellido`, `fecha_nacimiento`, `genero`, `account_status`), [`NegocioRow`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L33) (`id`, `nombre`, `categoria`), [`SucursalRow`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L39) (`id`, `status`, `direccion_id`, `horarios`, `tipo`, `fechacreacion`).

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L48) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `validate-registration` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L434), [`getAuthUser`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L408), [`hasValue`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L430), [`normalizeStatus`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L127), [`sortByDate`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L130), [`sortByFecha`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L225), [`hasDireccion`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L279), [`hasHorarios`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L296).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L68) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`, `update`), [`negocios`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L113) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L56) (`select`, `update`), [`direcciones`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L141) → [20250225_000001_direcciones_negocios_usuarios.sql](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L7) (`select`, `delete`, `update`), [`sucursales`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L199) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L70), [20250227_000001_restore_sucursales_flags_verificacion.sql](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L7) (`select`, `delete`, `update`), [`verificacion_negocio`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L378) → [20250227_000001_restore_sucursales_flags_verificacion.sql](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L121) (`select`).
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `404`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `message`, `valid`.
- [`normalizeStatus(value: string | null)`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L127) · Función. Normaliza el valor o paso `status` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L159).
- [`sortByDate(rows: T[])`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L130) · Función. Implementa el paso `sort by date` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L167).
- [`sortByFecha(rows: SucursalRow[])`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L225) · Función. Implementa el paso `sort by fecha` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L233).
- [`hasDireccion(dir: null)`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L279) · Función. Comprueba el valor o paso `direccion` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L309).
  - **Delega en:** [`hasValue`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L430).
  - **Retornos explícitos:** booleanos explícitos.
- [`hasHorarios(value: unknown)`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L296) · Función. Comprueba el valor o paso `horarios` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L312).
  - **Retornos explícitos:** booleanos explícitos.
- [`getAuthUser(req: Request, corsHeaders: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L408) · Función, asíncrona. Obtiene el usuario de Auth asociado a la petición en el canal que espera sesión.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L65).
  - **Delega en:** [`json`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L434).
  - **Integraciones:** `supabasePublic.auth.getUser`.
  - **HTTP:** estados de respuesta visibles `401` · encabezados leídos `authorization` · campos de respuesta `ok`, `message`.
- [`hasValue(value: string | null)`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L430) · Función. Comprueba el valor o paso `value` del flujo de identidad.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L98), [`hasDireccion` · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L282).
- [`json(body: unknown, status = …, headers: Record<string, string> = …)`](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L434) · Función. Crea una respuesta JSON con el estado y los encabezados requeridos por el endpoint.
  - **Dónde se usa:** [handler HTTP · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L62), [`getAuthUser` · validate-registration](../../../apps/referidos-app/supabase/functions/validate-registration/index.ts#L415).
