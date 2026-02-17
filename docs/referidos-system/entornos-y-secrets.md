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
- backend ops: `versioning-dev-release-create`, `versioning-deploy-execute`, `versioning-deploy-callback`

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

Opcionales:
- `VERSIONING_DEPLOY_CALLBACK_URL`
- `SUPABASE_ENV=ops`

## 3.2 Supabase runtime `dev/staging/prod` (Edge secrets)

Requeridos para el bridge:
- `VERSIONING_OPS_URL` = `https://ymhaveuksdzlfuecvkmx.supabase.co`
- `VERSIONING_OPS_SECRET_KEY` = secret key de `referidos-ops`
- `VERSIONING_PROXY_SHARED_TOKEN` = mismo valor que en ops

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

## 4) Config de funciones en ops

Archivo:
- `apps/referidos-ops/supabase/config.toml`

Debe incluir:
- `[functions.versioning-deploy-callback] verify_jwt = false`
- `[functions.versioning-deploy-execute] verify_jwt = false`
- `[functions.versioning-dev-release-create] verify_jwt = false`

Motivo:
- llamada directa con JWT admin
- llamada interna con `x-versioning-proxy-token`

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
supabase functions deploy versioning-deploy-execute --project-ref $OPS_REF
supabase functions deploy versioning-deploy-callback --project-ref $OPS_REF --no-verify-jwt
```

Set secrets ops (ejemplo):
```powershell
supabase secrets set --project-ref $OPS_REF GITHUB_DEPLOY_OWNER="TU_OWNER" GITHUB_DEPLOY_REPO="referidos-app" GITHUB_DEPLOY_TOKEN="ghp_xxx" DEPLOY_BRANCH_DEV="dev" DEPLOY_BRANCH_STAGING="staging" DEPLOY_BRANCH_PROD="main" VERSIONING_DEV_RELEASE_WORKFLOW="versioning-release-dev.yml" VERSIONING_DEV_RELEASE_REF="dev" VERSIONING_DEV_RELEASE_ALLOWED_REFS="dev,develop" VERSIONING_DEPLOY_WORKFLOW="versioning-deploy-artifact.yml" VERSIONING_DEPLOY_WORKFLOW_REF="dev" VERSIONING_DEPLOY_CALLBACK_TOKEN="token_callback_largo" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo" SUPABASE_ENV="ops"
```

Set secrets runtime dev (ejemplo):
```powershell
supabase secrets set --project-ref $DEV_REF VERSIONING_OPS_URL="https://ymhaveuksdzlfuecvkmx.supabase.co" VERSIONING_OPS_SECRET_KEY="sb_secret_ops_xxx" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo"
```

Deploy proxy en dev:
```powershell
cd apps/referidos-app
supabase functions deploy versioning-ops-proxy --project-ref $DEV_REF
```

Si ya validaste en dev:
```powershell
supabase secrets set --project-ref $STG_REF VERSIONING_OPS_URL="https://ymhaveuksdzlfuecvkmx.supabase.co" VERSIONING_OPS_SECRET_KEY="sb_secret_ops_xxx" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo"
supabase functions deploy versioning-ops-proxy --project-ref $STG_REF
supabase secrets set --project-ref $PROD_REF VERSIONING_OPS_URL="https://ymhaveuksdzlfuecvkmx.supabase.co" VERSIONING_OPS_SECRET_KEY="sb_secret_ops_xxx" VERSIONING_PROXY_SHARED_TOKEN="token_proxy_largo"
supabase functions deploy versioning-ops-proxy --project-ref $PROD_REF
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

## 9) Nota de rollout seguro

Para rollout por fases:
1. activar solo en `dev`
2. validar flujo completo
3. replicar a `staging`
4. replicar a `prod`
