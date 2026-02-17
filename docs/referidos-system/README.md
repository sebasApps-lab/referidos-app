# Referidos-system: guia operativa de versionado

Baseline del sistema: `0.5.0`.

## 1) Que controla este sistema

Para cada producto y entorno guarda:

- cambios detectados por git
- revisiones por componente
- releases semver
- promociones entre entornos
- solicitudes y ejecucion de deploy
- auditoria de acciones

Productos:

- `referidos_app` (PWA)
- `prelaunch_web`
- `android_app`

Entornos:

- `dev`
- `staging`
- `prod`

## 2) Flujo actual (resumen corto)

1. Push a `dev` o `develop`:
- corre `versioning-detect-dev.yml`
- solo detecta cambios (`detect`)
- NO crea release automaticamente

2. Crear release de `dev`:
- desde panel admin (`/admin/versionado/global`) con boton `Relase`
- o con Edge Function `versioning-dev-release-create`
- esto dispara `versioning-release-dev.yml`

3. Promover release:
- `dev -> staging`
- `staging -> prod`

4. Deploy:
- solo permitido para `staging` y `prod`
- se ejecuta desde gate/admin
- valida que el `source_commit_sha` este en la rama destino
- si no esta, requiere `Subir release` (merge controlado)
- luego dispara workflow `versioning-deploy-artifact.yml` (checkout exacto por SHA + deploy artifact a Netlify)
- finaliza estado por callback (`versioning-deploy-callback`)

## 3) Conceptos clave

`changeset`:
- lista de componentes impactados por un rango git

`bump`:
- incremento semver (`major`, `minor`, `patch`, `none`)

`release`:
- version semver publicada en un entorno

`promotion`:
- mover una semver exacta entre entornos

`deploy`:
- publicacion real en infraestructura (Netlify)

## 4) Scripts y comandos

Desde raiz del repo:

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
- se usa para inicializacion/backfill, no en cada cambio

## 5) Mensajes de commit (sin PR labels)

Si no usas PR labels, el sistema toma senales del commit message.

1. `major`:

```text
feat!: cambiar contrato de soporte
BREAKING CHANGE: ahora el campo X es obligatorio
```

2. `minor`:

```text
feat: agregar filtro por estado en panel
```

3. `patch`:

```text
fix: corregir validacion de whatsapp
refactor: simplificar parser de versionado
perf: optimizar carga de tickets
```

4. `none`:

```text
docs: actualizar guia de versionado
```

## 6) Donde vive el sistema

Schema/migraciones:

- `apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql`
- `apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql`
- (y migraciones posteriores relacionadas)

Edge Functions principales:

- `apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts`
- `apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts`

Panel admin:

- `apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx`

CI:

- `.github/workflows/versioning-detect-dev.yml`
- `.github/workflows/versioning-release-dev.yml`
- `.github/workflows/versioning-promote.yml`
- `.github/workflows/versioning-record-deployment.yml`
- `.github/workflows/versioning-deploy-artifact.yml`
- `.github/workflows/versioning-detect-pr.yml`

## 7) Documentos relacionados

- `docs/referidos-system/entornos-y-secrets.md`
- `docs/referidos-system/operacion-sin-pr-netlify.md`
- `docs/versioning-system.md`
