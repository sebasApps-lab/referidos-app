# Entornos y secrets (estado final aplicado)

## 1) Mapa de proyectos

Runtime:
- `dev` -> Supabase `btvrtxdizqsqrzdsgvsj`
- `staging` -> Supabase `iegjfeaadayfvqockwov`
- `prod` -> Supabase `ztcsrfwvjgqnmhnlpeye`

Ops:
- `referidos-ops` -> Supabase `ymhaveuksdzlfuecvkmx`

Netlify:
- PWA staging/prod en sitios separados
- prelaunch staging/prod en sitios separados (si staging existe)

## 2) Aislamiento de versionado

Queda asi:
- el dashboard general sigue leyendo/escribiendo runtime por entorno
- SOLO el panel de versionado usa `versioning-ops-proxy`
- ese proxy habla con `referidos-ops`

Implementacion:
- proxy runtime: `apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts`
- servicio UI: `apps/referidos-app/src/admin/versioning/services/versioningService.js`
- funciones ops invocadas internamente:
  - `versioning-dev-release-create`
  - `versioning-deploy-execute`

## 3) Secrets requeridos por proyecto

## 3.1 `referidos-ops` (Supabase Edge secrets)

Requeridos:
- `GITHUB_DEPLOY_OWNER`
- `GITHUB_DEPLOY_REPO`
- `GITHUB_DEPLOY_TOKEN`
- `DEPLOY_BRANCH_DEV`
- `DEPLOY_BRANCH_STAGING`
- `DEPLOY_BRANCH_PROD`
- `VERSIONING_DEV_RELEASE_WORKFLOW`
- `VERSIONING_DEV_RELEASE_REF`
- `VERSIONING_DEV_RELEASE_ALLOWED_REFS`
- `VERSIONING_DEPLOY_WORKFLOW`
- `VERSIONING_DEPLOY_WORKFLOW_REF`
- `VERSIONING_DEPLOY_CALLBACK_TOKEN`
- `VERSIONING_PROXY_SHARED_TOKEN`

Opcionales:
- `VERSIONING_DEPLOY_CALLBACK_URL`
- `SUPABASE_ENV=ops`

Notas:
- `VERSIONING_PROXY_SHARED_TOKEN` protege llamadas internas desde `versioning-ops-proxy`.
- `versioning-deploy-callback` valida `VERSIONING_DEPLOY_CALLBACK_TOKEN`.

## 3.2 Runtime `dev/staging/prod` (Supabase Edge secrets)

Requeridos para el proxy:
- `VERSIONING_OPS_URL` = `https://ymhaveuksdzlfuecvkmx.supabase.co`
- `VERSIONING_OPS_SECRET_KEY` = secret key de `referidos-ops`
- `VERSIONING_PROXY_SHARED_TOKEN` = mismo valor configurado en ops

No requerido en runtime para versionado:
- no hace falta `GITHUB_DEPLOY_*`
- no hace falta `VERSIONING_DEPLOY_*` (salvo si mantienes funciones antiguas activas)

## 3.3 GitHub repository secrets

Requeridos para workflows de versionado:
- `SUPABASE_URL` = `https://ymhaveuksdzlfuecvkmx.supabase.co`
- `SUPABASE_SECRET_KEY` = secret key de `referidos-ops`

Requeridos para deploy artifact exacto:
- `NETLIFY_AUTH_TOKEN`
- `VERSIONING_DEPLOY_CALLBACK_TOKEN` (igual al de ops)
- `NETLIFY_SITE_ID_REFERIDOS_APP_STAGING`
- `NETLIFY_SITE_ID_REFERIDOS_APP_PROD`
- `NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING` (si aplica)
- `NETLIFY_SITE_ID_PRELAUNCH_WEB_PROD`

Fallback opcional:
- `NETLIFY_SITE_ID_STAGING`
- `NETLIFY_SITE_ID_PROD`

## 4) Configuracion de funciones en ops

Archivo:
- `apps/referidos-ops/supabase/config.toml`

Config requerida:
- `versioning-deploy-callback`: `verify_jwt = false`
- `versioning-deploy-execute`: `verify_jwt = false`
- `versioning-dev-release-create`: `verify_jwt = false`

Motivo:
- estas funciones aceptan 2 modelos:
  - llamado directo con JWT admin (validacion interna manual)
  - llamado interno por proxy con `x-versioning-proxy-token`

## 5) Comandos de despliegue

```powershell
$OPS_REF = "ymhaveuksdzlfuecvkmx"
```

Migraciones en ops:
```powershell
cd apps/referidos-ops
supabase db push --project-ref $OPS_REF
```

Funciones ops:
```powershell
supabase functions deploy versioning-dev-release-create --project-ref $OPS_REF
supabase functions deploy versioning-deploy-execute --project-ref $OPS_REF
supabase functions deploy versioning-deploy-callback --project-ref $OPS_REF --no-verify-jwt
```

Funcion proxy en runtime (ejemplo dev):
```powershell
cd apps/referidos-app
supabase functions deploy versioning-ops-proxy --project-ref btvrtxdizqsqrzdsgvsj
```

Repetir proxy para staging/prod:
```powershell
supabase functions deploy versioning-ops-proxy --project-ref iegjfeaadayfvqockwov
supabase functions deploy versioning-ops-proxy --project-ref ztcsrfwvjgqnmhnlpeye
```

## 6) Ejemplo de set de secrets

Ops:
```powershell
$OPS_REF = "ymhaveuksdzlfuecvkmx"
supabase secrets set --project-ref $OPS_REF GITHUB_DEPLOY_OWNER="TU_OWNER" GITHUB_DEPLOY_REPO="referidos-app" GITHUB_DEPLOY_TOKEN="ghp_xxx" DEPLOY_BRANCH_DEV="dev" DEPLOY_BRANCH_STAGING="staging" DEPLOY_BRANCH_PROD="main" VERSIONING_DEV_RELEASE_WORKFLOW="versioning-release-dev.yml" VERSIONING_DEV_RELEASE_REF="dev" VERSIONING_DEV_RELEASE_ALLOWED_REFS="dev,develop" VERSIONING_DEPLOY_WORKFLOW="versioning-deploy-artifact.yml" VERSIONING_DEPLOY_WORKFLOW_REF="dev" VERSIONING_DEPLOY_CALLBACK_TOKEN="token_largo_unico" VERSIONING_PROXY_SHARED_TOKEN="token_largo_unico_proxy" SUPABASE_ENV="ops"
```

Runtime (dev):
```powershell
$DEV_REF = "btvrtxdizqsqrzdsgvsj"
supabase secrets set --project-ref $DEV_REF VERSIONING_OPS_URL="https://ymhaveuksdzlfuecvkmx.supabase.co" VERSIONING_OPS_SECRET_KEY="sb_secret_ops_xxx" VERSIONING_PROXY_SHARED_TOKEN="token_largo_unico_proxy"
```

## 7) Validacion funcional rapida

1. Login admin en PWA del entorno (dev/staging/prod).
2. Abrir panel `admin/versionado/global`.
3. Verificar:
- listado de releases carga
- promociones y deploy requests cargan
- crear release dev funciona
- trigger deploy pipeline funciona
4. Confirmar en ops:
- tablas `version_*` cambian en `referidos-ops`, no en runtime.
