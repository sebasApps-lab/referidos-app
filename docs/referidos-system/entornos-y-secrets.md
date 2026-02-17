# Entornos y secrets (versionado + deploy exacto)

## 1) Mapa oficial de entornos

1. `dev`
- Supabase: `btvrtxdizqsqrzdsgvsj`
- PWA y prelaunch corren local (`npm run dev:app`, `npm run dev:prelaunch`)
- No deploy formal de `dev` desde gate

2. `staging`
- Supabase: `iegjfeaadayfvqockwov`
- Netlify: sitio PWA staging (y prelaunch staging si decides usarlo)

3. `prod`
- Supabase: `ztcsrfwvjgqnmhnlpeye`
- Netlify: sitio PWA prod + sitio prelaunch prod

Regla:
- No mezclar datos entre `staging` y `prod`.

## 2) Secrets de dev release (que preguntaste)

Usados por `versioning-dev-release-create`:

1. `VERSIONING_DEV_RELEASE_WORKFLOW`
- workflow de GitHub a disparar.
- recomendado: `versioning-release-dev.yml`

2. `VERSIONING_DEV_RELEASE_REF`
- rama/ref sobre la que corre ese workflow.
- recomendado: `dev`

3. `VERSIONING_DEV_RELEASE_ALLOWED_REFS`
- lista CSV de refs permitidas.
- recomendado estricto: `dev`
- recomendado flexible: `dev,develop`

## 3) Supabase Edge secrets (por proyecto: dev/staging/prod)

Estos van en `supabase secrets` de cada proyecto.

### 3.1 Requeridos para soporte anonimo + analytics

- `PRELAUNCH_UA_PEPPER`
- `PRELAUNCH_IP_RISK_PEPPER`

### 3.2 Requeridos para geocoding

- `OSM_USER_AGENT`
- `OSM_EMAIL`

Opcionales geocoding:
- `MAPTILER_API_KEY` (o `MAPTILER_KEY`)
- `MAPTILER_BASE_URL`
- `OSM_BASE_URL`
- `ADDRESS_CACHE_TTL_DAYS`
- `ADDRESS_SEARCH_MAX_LIMIT`
- `OSM_MIN_INTERVAL_MS`

### 3.3 Requeridos para versionado/deploy

- `GITHUB_DEPLOY_OWNER`
- `GITHUB_DEPLOY_REPO`
- `GITHUB_DEPLOY_TOKEN`
- `DEPLOY_BRANCH_DEV` (normalmente `dev`)
- `DEPLOY_BRANCH_STAGING` (normalmente `staging`)
- `DEPLOY_BRANCH_PROD` (normalmente `main`)
- `VERSIONING_DEV_RELEASE_WORKFLOW`
- `VERSIONING_DEV_RELEASE_REF`
- `VERSIONING_DEV_RELEASE_ALLOWED_REFS`
- `VERSIONING_DEPLOY_WORKFLOW` (recomendado `versioning-deploy-artifact.yml`)
- `VERSIONING_DEPLOY_WORKFLOW_REF` (recomendado `dev` o rama donde vive el workflow)
- `VERSIONING_DEPLOY_CALLBACK_TOKEN` (token compartido con GitHub secret)

Opcional:
- `VERSIONING_DEPLOY_CALLBACK_URL` (si no lo defines, se construye con `SUPABASE_URL/URL`)
- `SUPABASE_ENV` (`dev`, `staging`, `prod`) para observabilidad

### 3.4 Variables base (inyectadas por Supabase runtime)

Normalmente no debes setearlas manualmente:

- `SUPABASE_URL` / `URL`
- `SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_ANON_KEY` / `PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` / `SUPABASE_SERVICE_ROLE_KEY` / `SECRET_KEY`

## 4) GitHub repository secrets (Actions)

Estos NO van en Supabase. Van en el repo de GitHub.

### 4.1 Requeridos para workflows de versionado

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

Nota:
- estos son usados por workflows `versioning-release-dev.yml`, `versioning-promote.yml`, `versioning-record-deployment.yml`.

### 4.2 Requeridos para deploy exacto por artifact

- `NETLIFY_AUTH_TOKEN`
- `VERSIONING_DEPLOY_CALLBACK_TOKEN` (debe coincidir con Edge secret del mismo nombre)

Site IDs (puedes usar especificos por app+env o fallback generico):

Especificos recomendados:
- `NETLIFY_SITE_ID_REFERIDOS_APP_STAGING`
- `NETLIFY_SITE_ID_REFERIDOS_APP_PROD`
- `NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING` (si existe prelaunch staging)
- `NETLIFY_SITE_ID_PRELAUNCH_WEB_PROD`

Fallback generico:
- `NETLIFY_SITE_ID_STAGING`
- `NETLIFY_SITE_ID_PROD`

## 5) Como funciona el deploy exacto ahora

1. Panel admin solicita deploy.
2. Edge `versioning-deploy-execute` valida:
- release promovida
- commit en rama destino (o requiere `Subir release`)
3. Edge dispara workflow `versioning-deploy-artifact.yml` con:
- `source_commit_sha` exacto
- `request_id`, app, env, semver
- `callback_url`
4. Workflow:
- checkout del commit exacto
- build del workspace (`referidos_app` o `prelaunch_web`)
- deploy a Netlify por CLI/API con `NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID_*`
5. Workflow llama callback `versioning-deploy-callback`.
6. Callback finaliza estado en DB (`success`/`failed`) via `versioning_finalize_deploy_request`.

## 6) Matriz minima por proyecto Supabase

### 6.1 Dev (`btvrtxdizqsqrzdsgvsj`)

Requeridos:
- `PRELAUNCH_UA_PEPPER`
- `PRELAUNCH_IP_RISK_PEPPER`
- `OSM_USER_AGENT`
- `OSM_EMAIL`
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

Opcionales:
- `VERSIONING_DEPLOY_CALLBACK_URL`
- tuning geocoding
- `SUPABASE_ENV=dev`

### 6.2 Staging (`iegjfeaadayfvqockwov`)

Misma lista funcional de `dev`, con valores propios de staging.

### 6.3 Prod (`ztcsrfwvjgqnmhnlpeye`)

Misma lista funcional de `dev`, con valores propios de prod.

## 7) Comandos utiles

```powershell
$DEV_REF = "btvrtxdizqsqrzdsgvsj"
$STAGING_REF = "iegjfeaadayfvqockwov"
$PROD_REF = "ztcsrfwvjgqnmhnlpeye"
```

Ejemplo set en dev (resumen):

```powershell
supabase secrets set --project-ref $DEV_REF PRELAUNCH_UA_PEPPER="..." PRELAUNCH_IP_RISK_PEPPER="..." OSM_USER_AGENT="referidos-app/1.0 (support@tudominio.com)" OSM_EMAIL="support@tudominio.com" GITHUB_DEPLOY_OWNER="TU_OWNER" GITHUB_DEPLOY_REPO="referidos-app" GITHUB_DEPLOY_TOKEN="ghp_xxx" DEPLOY_BRANCH_DEV="dev" DEPLOY_BRANCH_STAGING="staging" DEPLOY_BRANCH_PROD="main" VERSIONING_DEV_RELEASE_WORKFLOW="versioning-release-dev.yml" VERSIONING_DEV_RELEASE_REF="dev" VERSIONING_DEV_RELEASE_ALLOWED_REFS="dev" VERSIONING_DEPLOY_WORKFLOW="versioning-deploy-artifact.yml" VERSIONING_DEPLOY_WORKFLOW_REF="dev" VERSIONING_DEPLOY_CALLBACK_TOKEN="token_largo_unico"
```

## 8) Deploy de Edge Functions clave

```powershell
cd apps/referidos-app
```

```powershell
supabase functions deploy versioning-deploy-execute --project-ref $DEV_REF
supabase functions deploy versioning-dev-release-create --project-ref $DEV_REF
supabase functions deploy versioning-deploy-callback --project-ref $DEV_REF --no-verify-jwt
```

Repite con `$STAGING_REF` y `$PROD_REF`.
