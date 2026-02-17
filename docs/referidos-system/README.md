# Referidos-system: guia operativa de versionado

Baseline del sistema: `0.5.0`.

Control plane central:
- proyecto Supabase: `referidos-ops`
- URL: `https://ymhaveuksdzlfuecvkmx.supabase.co`
- ref: `ymhaveuksdzlfuecvkmx`

## 1) Arquitectura final aplicada

Hoy el sistema queda separado en 2 planos:

1. Plano runtime (por entorno):
- `dev` -> `btvrtxdizqsqrzdsgvsj`
- `staging` -> `iegjfeaadayfvqockwov`
- `prod` -> `ztcsrfwvjgqnmhnlpeye`
- mantiene datos funcionales: usuarios, soporte, negocio, etc.

2. Plano ops (unico):
- `referidos-ops`
- mantiene versionado, promociones, gate de deploy, auditoria de deploy.

## 2) Aislamiento del panel de versionado (aplicado)

El panel de versionado en la PWA ahora SI esta aislado a ops.

Como funciona:

1. Frontend admin:
- `apps/referidos-app/src/admin/versioning/services/versioningService.js`
- ya no consulta tablas/versioning RPC locales.
- ahora llama solo a `supabase.functions.invoke("versioning-ops-proxy", ...)`.

2. Proxy en runtime:
- `apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts`
- valida auth local + rol admin local.
- reenvia operaciones de versionado a `referidos-ops`.

3. Operaciones en ops:
- lecturas/RPC por cliente service-role de ops.
- operaciones de pipeline/deploy/release-dev por edge functions de ops:
  - `versioning-deploy-execute`
  - `versioning-dev-release-create`
- autenticacion interna por header seguro `x-versioning-proxy-token`.

4. Ops functions habilitadas para proxy interno:
- `apps/referidos-ops/supabase/config.toml`
- `verify_jwt = false` en:
  - `versioning-deploy-execute`
  - `versioning-dev-release-create`
  - `versioning-deploy-callback` (ya estaba)

5. Seguridad:
- las funciones ops siguen validando admin por JWT para uso directo.
- para uso interno aceptan token compartido (`VERSIONING_PROXY_SHARED_TOKEN`).
- el proxy local exige admin local antes de reenviar.

## 3) Que controla el sistema

Por producto y entorno:
- changesets detectados
- revisiones de componentes
- releases semver
- promociones entre entornos
- solicitudes/aprobaciones/ejecucion de deploy
- auditoria

Productos:
- `referidos_app`
- `prelaunch_web`
- `android_app`

Entornos versionados:
- `dev`
- `staging`
- `prod`

## 4) Flujo operativo

1. Push a `dev`/`develop`:
- corre `versioning-detect-dev.yml`
- detecta cambios
- no crea release automaticamente

2. Crear release de DEVELOPMENT:
- desde panel admin (boton `Relase`)
- o `versioning-dev-release-create`
- dispara workflow `versioning-release-dev.yml`

3. Promover release:
- `dev -> staging`
- `staging -> prod`

4. Deploy:
- solo `staging`/`prod`
- gate de aprobacion
- valida commit exacto (`source_commit_sha`)
- si falta codigo en rama destino: `Subir release`
- deploy exacto por workflow `versioning-deploy-artifact.yml`
- callback finaliza estado (`versioning-deploy-callback`)

## 5) Mensajes de commit (sin PR labels)

`major`:
```text
feat!: cambiar contrato de soporte
BREAKING CHANGE: ahora el campo X es obligatorio
```

`minor`:
```text
feat: agregar filtro por estado en panel
```

`patch`:
```text
fix: corregir validacion de whatsapp
refactor: simplificar parser de versionado
perf: optimizar carga de tickets
```

`none`:
```text
docs: actualizar guia de versionado
```

## 6) Ubicacion de piezas clave

Migrations ops:
- `apps/referidos-ops/supabase/migrations/20260219_000013_ops_versioning_prereqs.sql`
- `apps/referidos-ops/supabase/migrations/20260220_000014_ops_versioning_prereq_helpers.sql`
- `apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql`
- `apps/referidos-ops/supabase/migrations/20260222_000015_versioning_deploy_gate.sql`
- `apps/referidos-ops/supabase/migrations/20260223_000016_versioning_execute_deploy_started.sql`
- `apps/referidos-ops/supabase/migrations/20260224_000017_versioning_request_deploy_env_guard.sql`
- `apps/referidos-ops/supabase/migrations/20260225_000018_versioning_deploy_artifact_finalize.sql`

Edge functions runtime (bridge):
- `apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts`

Edge functions ops:
- `apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts`
- `apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts`
- `apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts`

UI panel:
- `apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx`
- `apps/referidos-app/src/admin/versioning/services/versioningService.js`

Workflows:
- `.github/workflows/versioning-detect-dev.yml`
- `.github/workflows/versioning-release-dev.yml`
- `.github/workflows/versioning-promote.yml`
- `.github/workflows/versioning-record-deployment.yml`
- `.github/workflows/versioning-deploy-artifact.yml`
- `.github/workflows/versioning-detect-pr.yml`

## 7) Comandos base

Desde raiz:

```powershell
npm run versioning:detect
```

```powershell
$env:VERSIONING_TARGET_ENV = "dev"
npm run versioning:apply
```

```powershell
npm run versioning:promote -- --product referidos_app --from dev --to staging --semver 0.5.3
```

```powershell
npm run versioning:record-deploy -- --product referidos_app --env prod --semver 0.5.3 --deployment-id deploy-123 --status success
```

`versioning:bootstrap`:
- solo inicializacion/backfill

## 8) Documentos relacionados

- `docs/referidos-system/entornos-y-secrets.md`
- `docs/referidos-system/operacion-sin-pr-netlify.md`
- `docs/versioning-system.md`
- `apps/referidos-ops/README.md`

## 9) Checklist de salud (rapido)

1. `referidos-ops` migrado y funciones deployadas.
2. runtime del entorno con:
- `VERSIONING_OPS_URL`
- `VERSIONING_OPS_SECRET_KEY`
- `VERSIONING_PROXY_SHARED_TOKEN`
3. `versioning-ops-proxy` deployado en runtime.
4. UI admin en `/admin/versionado/global` carga sin `missing_ops_env`.

Logs utiles:

```powershell
supabase functions logs versioning-ops-proxy --project-ref btvrtxdizqsqrzdsgvsj
supabase functions logs versioning-deploy-execute --project-ref ymhaveuksdzlfuecvkmx
supabase functions logs versioning-dev-release-create --project-ref ymhaveuksdzlfuecvkmx
```
