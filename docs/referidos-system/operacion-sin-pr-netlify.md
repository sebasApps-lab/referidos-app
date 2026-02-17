# Operacion sin PR + Netlify (flujo actual)

## 1) Contexto

Esta guia asume:

- trabajas solo
- usas `git add .`, `git commit -m`, `git push`
- no usas PR en el flujo diario
- Netlify auto-deploy esta desactivado
- deploy se dispara desde panel admin/gate

## 2) Respuesta corta: funciona sin PR?

Si. El versionado funciona sin PR.

Lo que pierdes al no usar PR labels:
- control explicito `semver:*` por etiqueta

Lo que ganas:
- flujo mas rapido

## 3) Flujo operativo recomendado

### 3.1 Trabajo diario

```powershell
git checkout dev
git add .
git commit -m "feat: descripcion"
git push
```

Push a `dev` ejecuta solo `detect` (no crea release).

### 3.2 Crear release de DEVELOPMENT

Opciones:

1. Panel admin:
- `/admin/versionado/global`
- boton `Relase` en card `DEVELOPMENT`

2. API interna:
- Edge Function `versioning-dev-release-create`

Esto dispara workflow `versioning-release-dev.yml`.

### 3.3 Promover release

Desde panel:

1. `dev -> staging`
2. `staging -> prod`

La promocion mueve una semver exacta existente.

### 3.4 Deploy (staging/prod)

Desde gate/admin:

1. Crea/selecciona solicitud de deploy.
2. Si commit de release no esta en rama destino:
- aparece estado `release_sync_required`
- ejecutar `Subir release` (merge controlado por API)
3. Ejecutar deploy:
- dispara workflow de deploy exacto por commit (`versioning-deploy-artifact.yml`)
- registra deployment en DB

`dev` no se despliega por gate.

## 4) Que poner en commit -m (sin PR)

1. `major` (rompe compatibilidad):

```text
feat!: cambiar contrato de soporte
BREAKING CHANGE: ahora el campo X es obligatorio
```

2. `minor` (funcion nueva compatible):

```text
feat: agregar filtro por estado en panel
```

3. `patch` (fix/mejora interna):

```text
fix: corregir validacion de whatsapp
refactor: simplificar parser
perf: optimizar carga
```

4. `none`:

```text
docs: actualizar guia
```

## 5) Promover vs Deploy

`Promover`:
- mueve version entre entornos en el sistema de versionado
- no publica por si solo

`Deploy`:
- publica realmente en Netlify (artifact exacto del `source_commit_sha`)
- deja trazabilidad de ejecucion (`started/success/failed`)

## 6) Secrets: donde van

1. Supabase Edge secrets:
- para Edge Functions (`versioning-*`, soporte, prelaunch, geocoding)
- ver matriz completa en `docs/referidos-system/entornos-y-secrets.md`

2. GitHub repository secrets:
- para workflows de CI (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`)

3. Netlify:
- usa token + site id via GitHub secrets (`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID_*`)
4. Callback de deploy:
- requiere `VERSIONING_DEPLOY_CALLBACK_TOKEN` en GitHub secrets y en Supabase Edge secrets (mismo valor)

## 7) Comandos utiles

Detectar:

```powershell
npm run versioning:detect
```

Aplicar (manual local, opcional):

```powershell
$env:VERSIONING_TARGET_ENV = "dev"
npm run versioning:apply
```

Promover:

```powershell
npm run versioning:promote -- --product referidos_app --from dev --to staging --semver 0.5.3
```

Registrar deploy manual:

```powershell
npm run versioning:record-deploy -- --product referidos_app --env prod --semver 0.5.3 --deployment-id deploy-123 --status success
```

## 8) Troubleshooting rapido

`Missing SUPABASE_URL`:
- define `SUPABASE_URL` en esa terminal/shell

`Missing SUPABASE_SECRET_KEY`:
- define `SUPABASE_SECRET_KEY` en esa terminal/shell

`release_sync_required` en deploy:
- ejecutar `Subir release` y luego volver a deploy

`github_workflow_dispatch_failed` o fallo en workflow:
- revisar `GITHUB_DEPLOY_*`, workflow `versioning-deploy-artifact.yml`, `NETLIFY_AUTH_TOKEN` y `NETLIFY_SITE_ID_*`
