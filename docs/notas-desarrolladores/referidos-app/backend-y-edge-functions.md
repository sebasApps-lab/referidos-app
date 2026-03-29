# Backend y edge functions

## Supabase client runtime

`src/lib/supabaseClient.js` crea un singleton browser con PKCE y `persistSession`.
Lee `supabaseUrl` y `supabaseAnonKey` desde `src/config/runtimeConfig.js`.

## Grupos funcionales de edge functions en `apps/referidos-app/supabase/functions`

### Auth, registro y sesion

- `onboarding`
- `validate-registration`
- `session-register`
- `session-list`
- `session-revoke`
- `session-revoke-all`
- `set-password`
- `create-registration-code`
- `list-registration-codes`
- `revoke-registration-code`
- `validate-registration-code`
- `delete-account`

### Direcciones

- `address-search`
- `address-reverse`

### Observability y logs

- `log-event`
- `obs-ingest`
- `obs-policy`
- `obs-release`
- `obs-release-sync`
- `obs-symbolicate`
- `ops-telemetry-sync-dispatch`

### Prelaunch y analytics

- `prelaunch-ingest`
- `waitlist-signup`
- `admin-prelaunch-metrics`

### Soporte

Funciones por hilo, estado y sesion:

- `support-create-thread`
- `support-create-anon-thread`
- `support-create-irregular-thread`
- `support-anon-thread-status`
- `support-assign-thread`
- `support-close-thread`
- `support-cancel-thread`
- `support-retake-thread`
- `support-update-status`
- `support-add-note`
- `support-start-session`
- `support-end-session`
- `support-agent-ping`
- `support-admin-start-session`
- `support-admin-end-session`
- `support-admin-ping`
- `support-admin-deny-session`
- `support-admin-create-user`
- `support-link-anon-to-user`
- `support-thread-workflow-action`
- `support-set-auto-assign-mode`
- `support-opening-message-sent`
- `support-log-event`
- `support-webhook-whatsapp`
- `support-whatsapp-name-updated`

### Bridges a OPS

- `versioning-ops-proxy`
- `support-ops-proxy`
- `versioning-dev-release-create`
- `versioning-deploy-execute`
- `versioning-deploy-callback`
- `versioning-runtime-migrations`

## Servicios frontend que consumen esos bridges

- `src/admin/versioning/services/versioningService.js`
- `src/admin/support/services/supportMacrosOpsService.js`
- `src/admin/apps/services/supportAppsService.js`
- `src/admin/prelaunch/services/prelaunchMetrics.js`

## Lectura de revision

- La app principal mantiene la UI y el runtime auth del producto.
- Los planos operativos sensibles se externalizan a `referidos-ops` mediante proxies.
- La relacion entre UI admin y backend operativo no es directa; esa separacion es deliberada.
