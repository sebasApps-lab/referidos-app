# Referidos-system: guia operativa y versionado

## Objetivo

Este documento define como trabajar en el monorepo sin romper el sistema de versionado.

El sistema de versionado registra, para cada producto y entorno:

- cambios detectados por git
- revisiones de componentes
- releases semanticas
- promociones entre entornos
- deployments

Baseline actual: `0.5.0`.

## Alcance del monorepo

Productos versionados:

- `referidos_app` (PWA principal)
- `prelaunch_web` (prelaunch)
- `android_app` (app Android)

Entornos:

- `dev`
- `staging`
- `prod`

## Donde vive cada parte

Base de datos (schema + funciones + RLS):

- `apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql`

Mapa de componentes y reglas:

- `versioning/component-map.json`

Scripts de automatizacion:

- `tooling/versioning/detect-changes.mjs`
- `tooling/versioning/apply-changeset.mjs`
- `tooling/versioning/bootstrap-baseline.mjs`
- `tooling/versioning/promote-release.mjs`
- `tooling/versioning/record-deployment.mjs`

Scripts npm (raiz):

- `npm run versioning:detect`
- `npm run versioning:apply`
- `npm run versioning:bootstrap`
- `npm run versioning:promote`
- `npm run versioning:record-deploy`

Panel admin:

- `/admin/versionado/global`
- `/admin/versionado/detalle`

## Conceptos clave

`component`:

- unidad versionable (logica o archivo)

`revision`:

- numero incremental por componente + hash de contenido

`changeset`:

- set de componentes tocados en un commit/rango

`release`:

- version semver por producto+entorno (`X.Y.Z`)

`promotion`:

- copia una release estable de un entorno a otro

`deployment`:

- estado de publicacion real de una release

## Configuracion inicial (una sola vez por entorno de trabajo)

1. Estar en la raiz del repo:

```powershell
cd C:\Users\Sebas\Documents\referidos-app
```

2. Exportar variables para scripts server-side:

```powershell
$env:SUPABASE_URL = "https://TU_PROYECTO.supabase.co"
```

```powershell
$env:SUPABASE_SECRET_KEY = "sb_secret_xxx"
```

3. Si hay errores de red por proxy local roto, limpiar session vars:

```powershell
Remove-Item Env:ALL_PROXY,Env:HTTP_PROXY,Env:HTTPS_PROXY,Env:GIT_HTTP_PROXY,Env:GIT_HTTPS_PROXY -ErrorAction SilentlyContinue
```

4. Aplicar migraciones:

```powershell
cd apps/referidos-app
supabase db push --yes
cd ..\..
```

5. Cargar baseline completo de componentes/snapshots:

```powershell
npm run versioning:bootstrap
```

Notas:

- `bootstrap` NO se ejecuta todo el tiempo.
- `bootstrap` se usa para inicializar/backfill.

## Flujo git recomendado (actual)

Tu flujo base sigue siendo valido:

- `git add .`
- `git commit -m "..."`
- `git push`

Pero ahora agrega controles para que el versionado sea consistente.

### Flujo completo recomendado

1. Crear rama:

```powershell
git checkout -b feat/mi-cambio
```

2. Hacer cambios de codigo.

3. Validar build de lo tocado:

```powershell
npm run build -w apps/referidos-app
```

```powershell
npm run build -w apps/prelaunch
```

(usa solo los builds de las apps que tocaste)

4. Detectar impacto de versionado (opcional local, obligatorio en CI):

```powershell
npm run versioning:detect
```

5. Commit:

```powershell
git add .
git commit -m "feat: descripcion corta"
```

6. Push:

```powershell
git push -u origin feat/mi-cambio
```

7. En PR, aplicar label semver cuando corresponda:

- `semver:major`
- `semver:minor`
- `semver:patch`
- `semver:none`

## Reglas de bump semver

Prioridad de mayor a menor:

1. Label PR (`semver:*`)
2. Convencional commit (`BREAKING CHANGE`, `type!:`)
3. Reglas por rutas del `component-map`
4. Fallback por defecto

Reglas:

- `BREAKING CHANGE` o `type!:` => `major`
- `feat:` => `minor`
- `fix:` / `perf:` / `refactor:` => `patch`
- solo docs => `none`
- cambios contractuales (`contractGlobs`) => `major`

## Operacion diaria del versionado

### A) Detectar cambios

```powershell
npm run versioning:detect
```

Genera:

- `versioning/out/changeset.json`

### B) Aplicar changeset y crear release en dev

```powershell
$env:VERSIONING_TARGET_ENV = "dev"
npm run versioning:apply
```

### C) Promover release entre entornos

```powershell
npm run versioning:promote -- --product referidos_app --from dev --to staging --semver 0.5.3 --notes "Promocion QA"
```

```powershell
npm run versioning:promote -- --product referidos_app --from staging --to prod --semver 0.5.3 --notes "Release produccion"
```

### D) Registrar deployment real

```powershell
npm run versioning:record-deploy -- --product referidos_app --env prod --semver 0.5.3 --deployment-id deploy-123 --status success
```

## CI/CD actual

Workflows:

- `.github/workflows/versioning-detect-pr.yml`
- `.github/workflows/versioning-release-dev.yml`
- `.github/workflows/versioning-promote.yml`
- `.github/workflows/versioning-record-deployment.yml`

Secrets requeridos:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

## Cuando SI volver a correr bootstrap

Corre `npm run versioning:bootstrap` solo si:

1. Es primera inicializacion del sistema.
2. Hubo fallo parcial durante carga inicial.
3. Cambiaste fuertemente `versioning/component-map.json` y necesitas reconstruir snapshot base.

Para forzar snapshot:

```powershell
npm run versioning:bootstrap -- --force-snapshot
```

## Que NO hacer

1. No ejecutar scripts de versionado sin `SUPABASE_URL` y `SUPABASE_SECRET_KEY`.
2. No guardar secret keys en `.env` commiteados.
3. No usar `bootstrap` en cada push.
4. No editar `versioning/component-map.json` sin revisar impacto de `major/minor/contract`.
5. No saltarte labels semver cuando hay cambios de contrato.

## Troubleshooting

Error: `Missing SUPABASE_URL`

- Define `$env:SUPABASE_URL` en la terminal actual.

Error: `Missing SUPABASE_SECRET_KEY`

- Define `$env:SUPABASE_SECRET_KEY` en la terminal actual.

Error Cloudflare/Supabase 5xx durante bootstrap/apply:

- Reintentar comando.
- Limpiar proxy de sesion si aplica.
- Ejecutar por entornos:

```powershell
npm run versioning:bootstrap -- --envs dev
npm run versioning:bootstrap -- --envs staging,prod
```

Error de comando desde workspace de app:

- Los scripts `versioning:*` estan en el `package.json` raiz.
- Ejecutar en raiz del repo.

## Checklist antes de merge

1. Build local OK de apps tocadas.
2. Cambios mapean bien en `versioning:detect`.
3. Label semver correcto en PR.
4. No hay secretos en diffs.
5. Docs actualizadas si cambiaste flujo operativo.

## Referencias

Resumen rapido:

- `docs/versioning-system.md`

Indice docs:

- `docs/README.md`
