# Entornos y secrets (completo, actualizado)

Fecha de referencia: `2026-02-17`.

## 1) Topologia oficial

Runtime (datos funcionales):
- `dev` -> `btvrtxdizqsqrzdsgvsj`
- `staging` -> `iegjfeaadayfvqockwov`
- `prod` -> `ztcsrfwvjgqnmhnlpeye`

Control plane de versionado/deploy:
- `referidos-ops` -> `ymhaveuksdzlfuecvkmx`

Regla:
- runtime guarda negocio/usuarios/soporte.
- ops guarda versionado/promociones/deploy gate.

## 2) Aislamiento de panel (estado aplicado)

El panel de versionado en PWA usa bridge:
- frontend: `apps/referidos-app/src/admin/versioning/services/versioningService.js`
- bridge runtime: `apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts`
- backend ops: `versioning-dev-release-preview`, `versioning-dev-release-create`, `versioning-deploy-execute`, `versioning-deploy-callback`

Flujo:
1. admin se autentica en runtime (dev/staging/prod)
2. `versioning-ops-proxy` valida rol admin local
3. proxy llama a `referidos-ops` por server-to-server
4. estado de versionado se escribe solo en ops

## 3) Secrets requeridos por proyecto

## 3.1 Supabase `referidos-ops` (Edge secrets)

Requeridos:
- `GITHUB_DEPLOY_OWNER` (ej. `sebasApps-lab`)
- `GITHUB_DEPLOY_REPO` (solo nombre repo, ej. `referidos-app`; no URL completa)
- `GITHUB_DEPLOY_TOKEN` (PAT con permisos para workflow dispatch y merge)
- `DEPLOY_BRANCH_DEV` (ej. `dev`)
- `DEPLOY_BRANCH_STAGING` (ej. `staging`)
- `DEPLOY_BRANCH_PROD` (ej. `main`)
- `VERSIONING_DEV_RELEASE_WORKFLOW` (ej. `versioning-release-dev.yml`)
- `VERSIONING_DEV_RELEASE_REF` (ej. `dev`)
- `VERSIONING_DEV_RELEASE_ALLOWED_REFS` (ej. `dev,develop`)
- `VERSIONING_DEPLOY_WORKFLOW` (ej. `versioning-deploy-artifact.yml`)
- `VERSIONING_DEPLOY_WORKFLOW_REF` (ej. `dev`)
- `VERSIONING_DEPLOY_CALLBACK_TOKEN` (token compartido con GitHub secret)
- `VERSIONING_PROXY_SHARED_TOKEN` (token compartido con runtimes)
- `OBS_RELEASE_SYNC_TOKEN` (token interno para llamar `obs-release-sync` en runtime)
- `OBS_RELEASE_SYNC_URL_STAGING` (URL base del proyecto Supabase runtime staging, ej. `https://iegjfeaadayfvqockwov.supabase.co`)
- `OBS_RELEASE_SYNC_URL_PROD` (URL base del proyecto Supabase runtime prod, ej. `https://ztcsrfwvjgqnmhnlpeye.supabase.co`)

Opcionales:
- `OBS_RELEASE_SYNC_URL_DEV` (si quieres sincronizar snapshots en dev por callback)
- `OBS_RELEASE_SYNC_TENANT_HINT` (default `ReferidosAPP`)
- `VERSIONING_DEPLOY_CALLBACK_URL`
- `SUPABASE_ENV=ops`

## 3.2 Supabase runtime `dev/staging/prod` (Edge secrets)

Requeridos para el bridge:
- `VERSIONING_OPS_URL` = `https://ymhaveuksdzlfuecvkmx.supabase.co`
- `VERSIONING_OPS_SECRET_KEY` = secret key de `referidos-ops`
- `VERSIONING_PROXY_SHARED_TOKEN` = mismo valor que en ops
- `OBS_RELEASE_SYNC_TOKEN` = mismo token que en ops (validacion interna de `obs-release-sync`)

## 3.3 GitHub repository secrets

Requeridos para workflows de versionado:
- `SUPABASE_URL` = `https://ymhaveuksdzlfuecvkmx.supabase.co`
- `SUPABASE_SECRET_KEY` = secret key de `referidos-ops`

Requeridos para deploy artifact exacto:
- `NETLIFY_AUTH_TOKEN`
- `VERSIONING_DEPLOY_CALLBACK_TOKEN` (mismo valor de ops)
- `NETLIFY_SITE_ID_REFERIDOS_APP_STAGING`
- `NETLIFY_SITE_ID_REFERIDOS_APP_PROD`
- `NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING` (si aplica)
- `NETLIFY_SITE_ID_PRELAUNCH_WEB_PROD`

Fallback:
- `NETLIFY_SITE_ID_STAGING`
- `NETLIFY_SITE_ID_PROD`

## 3.4 Explicacion secret por secret (que hace y por que existe)

Ops:
- `GITHUB_DEPLOY_OWNER`: owner usado por API de GitHub para merges/workflows.
- `GITHUB_DEPLOY_REPO`: repo objetivo para dispatch/merge automatizado.
- `GITHUB_DEPLOY_TOKEN`: PAT tecnico con permisos para `actions:write` y merge.
- `DEPLOY_BRANCH_DEV|STAGING|PROD`: rama canonica por entorno para verificar/mergear `source_commit_sha`.
- `VERSIONING_DEV_RELEASE_WORKFLOW`: workflow que crea release de DEVELOPMENT.
- `VERSIONING_DEV_RELEASE_REF`: rama/ref desde donde se dispara ese workflow.
- `VERSIONING_DEV_RELEASE_ALLOWED_REFS`: allowlist de refs validas para evitar ejecuciones accidentales.
- `VERSIONING_DEPLOY_WORKFLOW`: workflow de deploy exacto por commit/artifact.
- `VERSIONING_DEPLOY_WORKFLOW_REF`: ref usada para disparar ese workflow.
- `VERSIONING_DEPLOY_CALLBACK_TOKEN`: firma callback GitHub -> edge para finalizar estado.
- `VERSIONING_PROXY_SHARED_TOKEN`: firma interna runtime proxy -> ops edge.
- `OBS_RELEASE_SYNC_TOKEN`: firma interna ops callback -> runtime `obs-release-sync`.
- `OBS_RELEASE_SYNC_URL_*`: endpoint runtime por entorno donde se sincroniza snapshot de release.
- `OBS_RELEASE_SYNC_TENANT_HINT`: tenant por defecto para persistir snapshot/release en observability runtime.

Runtime:
- `VERSIONING_OPS_URL`: URL del control plane (`referidos-ops`) para acciones de versionado.
- `VERSIONING_OPS_SECRET_KEY`: key server-to-server para consultas de versionado desde runtime.
- `VERSIONING_PROXY_SHARED_TOKEN`: evita que cualquier caller externo use endpoints internos de ops.
- `OBS_RELEASE_SYNC_TOKEN`: valida que solo ops pueda sincronizar snapshots al runtime.

GitHub:
- `SUPABASE_URL` + `SUPABASE_SECRET_KEY`: permiten a workflows registrar cambios en control plane ops.
- `NETLIFY_AUTH_TOKEN`: autentica deploy API/CLI a Netlify.
- `NETLIFY_SITE_ID_*`: determina exactamente que site de Netlify recibe cada deploy.

## 4) Config de funciones en ops

Archivo:
- `apps/referidos-ops/supabase/config.toml`

Debe incluir:
- `[functions.versioning-deploy-callback] verify_jwt = false`
- `[functions.versioning-deploy-execute] verify_jwt = false`
- `[functions.versioning-dev-release-create] verify_jwt = false`
- `[functions.versioning-dev-release-preview] verify_jwt = false`

Motivo:
- llamada directa con JWT admin
- llamada interna con `x-versioning-proxy-token`

## 4.1) Config de funciones en runtime

Archivo:
- `apps/referidos-app/supabase/config.toml`

Debe incluir:
- `[functions.obs-release-sync] verify_jwt = false`

Motivo:
- `obs-release-sync` se invoca desde `referidos-ops` con token interno (`x-obs-release-sync-token`), no con sesion de usuario.

## 5) Runbook de activacion (orden recomendado)

1. Aplicar migraciones en ops.
2. Configurar secrets en ops.
3. Deploy funciones de ops.
4. Configurar secrets runtime.
5. Deploy `versioning-ops-proxy` en runtime.
6. Probar UI admin en runtime.

## 6) Comandos exactos

Variables:
```powershell
$OPS_REF = "ymhaveuksdzlfuecvkmx"
$DEV_REF = "btvrtxdizqsqrzdsgvsj"
$STG_REF = "iegjfeaadayfvqockwov"
$PROD_REF = "ztcsrfwvjgqnmhnlpeye"
```

Migraciones ops:
```powershell
cd apps/referidos-ops
supabase db push --project-ref $OPS_REF
```

Deploy funciones ops:
```powershell
supabase functions deploy versioning-dev-release-create --project-ref $OPS_REF
supabase functions deploy versioning-dev-release-preview --project-ref $OPS_REF
supabase functions deploy versioning-deploy-execute --project-ref $OPS_REF
supabase functions deploy versioning-deploy-callback --project-ref $OPS_REF --no-verify-jwt
```

Set secrets ops (ejemplo):
```powershell
supabase secrets set --project-ref $OPS_REF GITHUB_DEPLOY_OWNER="TU_OWNER" GITHUB_DEPLOY_REPO="referidos-app" GITHUB_DEPLOY_TOKEN="ghp_xxx" DEPLOY_BRANCH_DEV="dev" DEPLOY_BRANCH_STAGING="staging" DEPLOY_BRANCH_PROD="main" VERSIONING_DEV_RELEASE_WORKFLOW="versioning-release-dev.yml" VERSIONING_DEV_RELEASE_REF="dev" VERSIONING_DEV_RELEASE_ALLOWED_REFS="dev,develop" VERSIONING_DEPLOY_WORKFLOW="versioning-deploy-artifact.yml" VERSIONING_DEPLOY_WORKFLOW_REF="dev" VERSIONING_DEPLOY_CALLBACK_TOKEN="token_callback_largo" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo" OBS_RELEASE_SYNC_TOKEN="token_obs_sync_largo" OBS_RELEASE_SYNC_URL_STAGING="https://iegjfeaadayfvqockwov.supabase.co" OBS_RELEASE_SYNC_URL_PROD="https://ztcsrfwvjgqnmhnlpeye.supabase.co" OBS_RELEASE_SYNC_URL_DEV="https://btvrtxdizqsqrzdsgvsj.supabase.co" OBS_RELEASE_SYNC_TENANT_HINT="ReferidosAPP" SUPABASE_ENV="ops"
```

Set secrets runtime dev (ejemplo):
```powershell
supabase secrets set --project-ref $DEV_REF VERSIONING_OPS_URL="https://ymhaveuksdzlfuecvkmx.supabase.co" VERSIONING_OPS_SECRET_KEY="sb_secret_ops_xxx" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo" OBS_RELEASE_SYNC_TOKEN="token_obs_sync_largo"
```

Deploy proxy en dev:
```powershell
cd apps/referidos-app
supabase functions deploy versioning-ops-proxy --project-ref $DEV_REF
supabase functions deploy obs-release-sync --project-ref $DEV_REF --no-verify-jwt
```

Si ya validaste en dev:
```powershell
supabase secrets set --project-ref $STG_REF VERSIONING_OPS_URL="https://ymhaveuksdzlfuecvkmx.supabase.co" VERSIONING_OPS_SECRET_KEY="sb_secret_ops_xxx" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo" OBS_RELEASE_SYNC_TOKEN="token_obs_sync_largo"
supabase functions deploy versioning-ops-proxy --project-ref $STG_REF
supabase functions deploy obs-release-sync --project-ref $STG_REF --no-verify-jwt
supabase secrets set --project-ref $PROD_REF VERSIONING_OPS_URL="https://ymhaveuksdzlfuecvkmx.supabase.co" VERSIONING_OPS_SECRET_KEY="sb_secret_ops_xxx" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo" OBS_RELEASE_SYNC_TOKEN="token_obs_sync_largo"
supabase functions deploy versioning-ops-proxy --project-ref $PROD_REF
supabase functions deploy obs-release-sync --project-ref $PROD_REF --no-verify-jwt
```

## 7) Verificacion y pruebas

Validar secrets en runtime:
```powershell
supabase secrets list --project-ref $DEV_REF
```

Validar functions deployadas:
```powershell
supabase functions list --project-ref $DEV_REF
supabase functions list --project-ref $OPS_REF
```

Validar en UI admin:
1. abrir `/admin/versionado/global` en dev
2. cargar catalogo/releases
3. crear release DEVELOPMENT
4. consultar deploy requests

Validar en DB ops:
- cambia `version_releases`, `version_promotions`, `version_deploy_requests` en `referidos-ops`
- no deben cambiar esas tablas en runtime

## 8) Troubleshooting real (errores comunes)

`missing_ops_env` en `versioning-ops-proxy`:
- falta uno de:
  - `VERSIONING_OPS_URL`
  - `VERSIONING_OPS_SECRET_KEY`
  - `VERSIONING_PROXY_SHARED_TOKEN`
- corregir secrets y redeploy proxy

`invalid_proxy_token` o falla interna auth:
- `VERSIONING_PROXY_SHARED_TOKEN` no coincide entre runtime y ops

`github_workflow_dispatch_failed`:
- revisar `GITHUB_DEPLOY_OWNER`, `GITHUB_DEPLOY_REPO`, `GITHUB_DEPLOY_TOKEN`
- confirmar permisos del PAT

`release_sync_required`:
- hacer `Subir release` y volver a deploy

`deploy_env_not_allowed`:
- deploy solo permitido en `staging` y `prod`

`obs_release_sync_failed` (en metadata del deploy request):
- revisar `OBS_RELEASE_SYNC_TOKEN` en ops y runtimes (debe coincidir)
- revisar `OBS_RELEASE_SYNC_URL_STAGING/PROD`
- revisar logs de `obs-release-sync` en runtime correspondiente

## 9) Nota de rollout seguro

Para rollout por fases:
1. activar solo en `dev`
2. validar flujo completo
3. replicar a `staging`
4. replicar a `prod`

## 10) Flujo de sincronizacion release -> observability

1. Se ejecuta deploy aprobado (`versioning-deploy-execute`) en `referidos-ops`.
2. Workflow de GitHub llama `versioning-deploy-callback` con estado final.
3. Si estado es `success`, callback llama `obs-release-sync` en runtime destino.
4. `obs-release-sync` trae snapshot desde ops y guarda:
- `obs_release_snapshots`
- `obs_release_snapshot_components`
- `obs_releases.meta.versioning`
5. `obs-ingest` usa snapshot local para resolver:
- `release_version_label`
- `release_version_id`
- `release_source_commit_sha`
- `resolved_component_key`
- `resolved_component_revision_no`
- `component_resolution_method`

Nota:
- No se usa fallback por fecha para legacy.
- Si no hay snapshot, el evento queda `component_resolution_method = unresolved`.

## 11) Ops telemetry hot/cold (runtime config)

Documento dedicado:
- `docs/referidos-system/ops-telemetry-cold-dispatch.md`

Estado actual:
- el sistema usa `ops_sync_outbox` en runtime y `ops_telemetry_*` en `referidos-ops`.
- la configuracion de `cold dispatch` se guarda en `public.ops_sync_runtime_config`.
- esa configuracion se hace con helper SQL idempotente (migracion `20260301_000023_ops_sync_runtime_config_helper.sql`).

SQL oficial para configurar (el mismo para cualquier entorno):
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://<RUNTIME_PROJECT_REF>.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

Regla:
- ejecutar este SQL en el proyecto runtime del entorno correspondiente.
- no guardar `CRON_TOKEN_LARGO` en repo ni en migraciones.

Plantilla por entorno:

`dev` (`btvrtxdizqsqrzdsgvsj`)
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://btvrtxdizqsqrzdsgvsj.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO_DEV>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

`staging` (`iegjfeaadayfvqockwov`) cuando se habilite:
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://iegjfeaadayfvqockwov.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO_STAGING>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

`prod` (`ztcsrfwvjgqnmhnlpeye`) cuando se habilite:
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://ztcsrfwvjgqnmhnlpeye.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO_PROD>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

Verificacion minima despues de configurar:
```sql
select tenant_id, runtime_base_url, enabled, updated_at
from public.ops_sync_runtime_config;
```

Si necesitas desactivar temporalmente el cold dispatch:
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://<RUNTIME_PROJECT_REF>.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO>',
  p_enabled := false,
  p_tenant_name := 'ReferidosAPP'
);
```

## 12) Macros de soporte en OPS + cache runtime (nuevo)

Arquitectura:
- escritura: panel admin -> `support-ops-proxy` (runtime) -> `ops-support-macros-admin` (ops)
- lectura soporte/admin: `support_macro_categories_cache` + `support_macros_cache` (runtime local)
- sync: `ops-support-macros-sync-dispatch` (runtime) <- `ops-support-macros-sync` (ops)

### 12.1 Secrets runtime (`dev/staging/prod`)

Obligatorios:
- `SUPPORT_OPS_URL` = `https://ymhaveuksdzlfuecvkmx.supabase.co`
- `SUPPORT_OPS_SECRET_KEY` = secret key de `referidos-ops`
- `SUPPORT_OPS_SHARED_TOKEN` = token compartido runtime <-> ops
- `SUPPORT_MACROS_SOURCE_PROJECT_REF` = ref del runtime (`btvrtxdizqsqrzdsgvsj` / `iegjfeaadayfvqockwov` / `ztcsrfwvjgqnmhnlpeye`)
- `SUPPORT_MACROS_SOURCE_ENV_KEY` = `dev|staging|prod`

Opcionales recomendados:
- `SUPPORT_MACROS_HOT_BATCH_LIMIT` (default `400`)
- `SUPPORT_MACROS_COLD_BATCH_LIMIT` (default `1000`)
- `SUPPORT_MACROS_CRON_TOKEN` (si quieres token fijo adicional al guardado en `ops_sync_runtime_config`)

### 12.2 Secrets OPS

Obligatorio:
- `SUPPORT_OPS_SHARED_TOKEN` = mismo valor que runtime

### 12.3 Config de funciones

`apps/referidos-app/supabase/config.toml`
- `[functions.support-ops-proxy] verify_jwt = false`
- `[functions.ops-support-macros-sync-dispatch] verify_jwt = false`

`apps/referidos-ops/supabase/config.toml`
- `[functions.ops-support-macros-admin] verify_jwt = false`
- `[functions.ops-support-macros-sync] verify_jwt = false`

### 12.4 Deploy de funciones

OPS:
```powershell
cd apps/referidos-ops
supabase functions deploy ops-support-macros-admin --project-ref ymhaveuksdzlfuecvkmx --no-verify-jwt
supabase functions deploy ops-support-macros-sync --project-ref ymhaveuksdzlfuecvkmx --no-verify-jwt
```

Runtime `dev`:
```powershell
cd apps/referidos-app
supabase functions deploy support-ops-proxy --project-ref btvrtxdizqsqrzdsgvsj --no-verify-jwt
supabase functions deploy ops-support-macros-sync-dispatch --project-ref btvrtxdizqsqrzdsgvsj --no-verify-jwt
```

Runtime `staging`:
```powershell
cd apps/referidos-app
supabase functions deploy support-ops-proxy --project-ref iegjfeaadayfvqockwov --no-verify-jwt
supabase functions deploy ops-support-macros-sync-dispatch --project-ref iegjfeaadayfvqockwov --no-verify-jwt
```

Runtime `prod`:
```powershell
cd apps/referidos-app
supabase functions deploy support-ops-proxy --project-ref ztcsrfwvjgqnmhnlpeye --no-verify-jwt
supabase functions deploy ops-support-macros-sync-dispatch --project-ref ztcsrfwvjgqnmhnlpeye --no-verify-jwt
```
