# Operacion Sin PR + Netlify (guia detallada)

## Para quien es esta guia

Esta guia es para tu flujo actual:

- trabajas solo
- usas `git add .`, `git commit -m`, `git push`
- no usas Pull Request normalmente
- tienes Netlify conectado a `main`

Objetivo:

- mantener versionado funcionando bien
- evitar confusiones entre dev, staging y prod
- saber exactamente que comando usar y cuando

## Respuesta corta: sin PR falla el versionado?

No, no falla.

El sistema funciona sin PR porque:

1. Detecta cambios por git diff/commit.
2. Crea releases en `dev` desde pushes a `dev`/`develop` (workflow CI).
3. Promueve versiones a `staging`/`prod` por comando o workflow manual.

Lo que pierdes sin PR:

1. Labels de PR (`semver:major/minor/patch/none`) automaticos.
2. Revisión visual previa en PR.

## Que poner en commit -m en cada caso (sin PR)

Como no usas PR/labels, tu version se decide por mensaje de commit + reglas del repo.

Usa esto:

1. major (rompe compatibilidad)

```text
feat!: cambiar contrato de soporte
```

y en el cuerpo agrega:

```text
BREAKING CHANGE: ahora el campo X es obligatorio
```

2. minor (funcion nueva compatible)

```text
feat: agregar filtro por estado en panel
```

3. patch (arreglo/mejora interna)

```text
fix: corregir validacion de whatsapp
refactor: simplificar parser de versionado
perf: optimizar carga de tickets
```

4. none (sin impacto funcional)

```text
docs: actualizar guia de versionado
```

(Esto queda `none` si solo tocaste docs.)

Nota:

- si usas `chore/test/ci` y tocaste codigo runtime, el sistema puede terminar en `patch` por fallback.

## Si no usas PR, como decides major/minor/patch?

Usa commits convencionales:

1. `feat:` -> normalmente `minor`
2. `fix:` / `refactor:` / `perf:` -> normalmente `patch`
3. `BREAKING CHANGE` o `!` en commit -> `major`

Ejemplos:

```text
feat: agregar filtro en panel tickets
```

```text
fix: corregir validacion de whatsapp en soporte anonimo
```

```text
feat!: cambiar contrato de support endpoint
BREAKING CHANGE: support payload ahora requiere origin_source
```

## Que son "contratos importantes" en este proyecto

Son cambios que pueden romper compatibilidad entre apps/sistemas.

Considera "contrato importante" cuando tocas:

1. `packages/api-client/src/**`
2. `packages/support-sdk/src/**`
3. `packages/platform-rn/src/**`
4. `packages/security-core/src/**`
5. `apps/referidos-app/supabase/functions/**`
6. estructuras DB/migraciones que cambian comportamiento esperado por clientes

Si cambias estos puntos:

1. revisa si rompe compatibilidad real
2. si rompe, usa commit con `!` y/o `BREAKING CHANGE`

## Flujo diario recomendado (sin PR)

### 1) Preparar terminal en raiz

```powershell
cd C:\Users\Sebas\Documents\referidos-app
```

### 2) Trabajar en rama de desarrollo

Si usas rama permanente `dev`, puedes trabajar directo ahi:

```powershell
git checkout dev
```

Opcional (mas limpio) usar rama temporal:

```powershell
git checkout -b feat/ajuste-x
```

### 3) Hacer cambios y validar build

Para PWA:

```powershell
npm run build -w apps/referidos-app
```

Para prelaunch:

```powershell
npm run build -w apps/prelaunch
```

### 4) Detectar impacto de versionado (recomendado)

```powershell
npm run versioning:detect
```

### 5) Commit y push

```powershell
git add .
git commit -m "feat: descripcion del cambio"
git push
```

Si trabajaste en rama temporal, luego integras a `dev`.

## Como llega a dev en versionado

Con CI actual:

1. Push a `dev` o `develop`.
2. Workflow `versioning-release-dev.yml` corre.
3. Se detectan cambios.
4. Se crea/actualiza release de entorno `dev` en DB de versionado.

No necesitas correr manualmente `versioning:apply` si CI ya lo hace.

## "Promover" vs "Deploy" vs "Registrar deploy"

Si, hoy puedes promover desde panel (`/admin/versionado/global`).

1. Promover

- mover una version en el sistema de versionado (ej. `dev -> staging`)
- no publica nada por si sola

2. Deploy

- publicar de verdad en Netlify/infra

3. Registrar deploy

- guardar en DB: esta version se desplego, con exito/fallo, ID, logs
- sirve para auditoria, trazabilidad, metricas y rollback

Estado actual:

1. Promocion: visual en panel.
2. Registro de deploy: ahora tambien visual en panel via gate de deploy (ademas del comando/workflow).

## Como promover a staging y prod (sin PR)

### Opcion A: desde Admin (visual)

Ya existe en:

- `/admin/versionado/global`

Bloque: `Promover release`.

Pasos:

1. Seleccionar producto (`referidos_app`, `prelaunch_web`, `android_app`).
2. Seleccionar `from` y `to` (`dev -> staging`, `staging -> prod`).
3. Seleccionar version (`semver`) a promover.
4. Añadir notas.
5. Clic `Promover release`.

### Opcion B: por comando (fallback)

1. Exportar credenciales:

```powershell
$env:SUPABASE_URL = "https://TU_PROYECTO.supabase.co"
$env:SUPABASE_SECRET_KEY = "sb_secret_xxx"
```

2. Promover dev -> staging:

```powershell
npm run versioning:promote -- --product referidos_app --from dev --to staging --semver 0.5.3 --notes "QA aprobado"
```

3. Promover staging -> prod:

```powershell
npm run versioning:promote -- --product referidos_app --from staging --to prod --semver 0.5.3 --notes "Release produccion"
```

## Confirmar deploys antes de ejecutar

Estado actual:

1. Gate pre-deploy en Admin: implementado.
2. Regla four-eyes: implementada.
3. Excepcion admin: puede aprobar/ejecutar sin segunda aprobacion (admin override).
4. Al ejecutar deploy desde el gate, se registra automaticamente en `version_deployments`.
5. Sigue existiendo fallback por comando/workflow (`versioning:record-deploy`).

Checklist manual recomendado antes de promover:

1. Build OK.
2. Sin errores críticos en soporte/observability.
3. Drift razonable entre entornos.
4. Version objetivo correcta.
5. Notas de release claras.

## Netlify: necesitas staging separado?

Recomendación profesional: si.

Tu situación actual:

1. `main` desplega en Netlify (prod).
2. `dev` lo corres local con `npm run dev:app`.

Para staging real:

1. crea un segundo sitio/proyecto en Netlify
2. con la misma repo
3. rama de deploy: `staging` (o `develop`)
4. variables de entorno propias de staging

Flujo sugerido:

1. Desarrollo en `dev`
2. Integras a `staging` y validas en Netlify staging
3. Si todo OK, integras a `main` para producción

## Supabase: proyecto separado, branches y datos

### Si creo proyecto aparte para staging, donde vive dev?

Puedes hacerlo de dos formas:

1. recomendada: `dev` en local (o proyecto dev separado), `staging` en proyecto staging, `prod` en proyecto prod.
2. alternativa: usar Supabase Branching para ambientes temporales, manteniendo prod aislado.

Si tienes proyecto staging separado, no necesitas que `dev` use la misma DB de staging.

### Si uso ramas de Supabase, hay variables distintas?

Si. Cada branch/proyecto tiene:

1. URL propia
2. publishable key propia
3. secret key propia
4. secrets/config por entorno

### Se deben mergear datos de staging a prod?

No es buena practica mezclar datos de staging con datos de produccion.

Correcto:

1. promover codigo/migraciones
2. mantener datos staging aislados
3. no copiar datos de prueba a prod

### Beta con usuarios reales de prod: a que DB van los datos?

Si son usuarios reales y funcionalidad en entorno de produccion, los datos van a DB prod.

Si pruebas beta en staging, van a staging y no se deben mezclar con prod.

Para beta en prod sin riesgo:

1. usa feature flags
2. habilita solo a usuarios/grupos permitidos
3. monitorea y apaga rapido si hay problema

## Flujo recomendado de ramas (simple)

1. `dev`: trabajo diario
2. `staging`: pruebas casi reales
3. `main`: producción

Comandos comunes:

```powershell
git checkout dev
git pull
```

```powershell
git checkout staging
git merge dev
git push
```

```powershell
git checkout main
git merge staging
git push
```

## Comandos clave de referencia rapida

Detectar cambios:

```powershell
npm run versioning:detect
```

Promover:

```powershell
npm run versioning:promote -- --product referidos_app --from dev --to staging --semver 0.5.3
```

Registrar deploy:

```powershell
npm run versioning:record-deploy -- --product referidos_app --env prod --semver 0.5.3 --deployment-id deploy-123 --status success
```

## Claves necesarias para deploy desde panel (GitHub merge + Netlify webhook)

Para que el boton `Ejecutar pipeline` del gate funcione, debes configurar secrets en Supabase Edge Functions.

### A) Claves GitHub

1. `GITHUB_DEPLOY_OWNER`

- valor: owner de tu repo (usuario u organizacion)
- ejemplo: `Sebas` o `mi-org`

2. `GITHUB_DEPLOY_REPO`

- valor: nombre del repo
- ejemplo: `referidos-app`

3. `GITHUB_DEPLOY_TOKEN`

- valor: Personal Access Token de GitHub con permisos para merge en branches protegidas
- recomendado: Fine-grained PAT con permisos `Contents: Read and write`, `Pull requests: Read and write` en ese repo

Donde obtenerlo en GitHub:

1. GitHub -> avatar (arriba derecha) -> `Settings`
2. `Developer settings`
3. `Personal access tokens`
4. `Fine-grained tokens`
5. `Generate new token`

### B) Claves Netlify

Define al menos un hook por entorno:

1. `NETLIFY_BUILD_HOOK_STAGING`
2. `NETLIFY_BUILD_HOOK_PROD`

Opcional por producto (prioridad mas alta):

1. `NETLIFY_BUILD_HOOK_REFERIDOS_APP_STAGING`
2. `NETLIFY_BUILD_HOOK_REFERIDOS_APP_PROD`
3. `NETLIFY_BUILD_HOOK_PRELAUNCH_WEB_STAGING`
4. `NETLIFY_BUILD_HOOK_PRELAUNCH_WEB_PROD`

Donde obtenerlo en Netlify:

1. Netlify -> Site -> `Site configuration`
2. `Build & deploy`
3. `Build hooks`
4. `Add build hook`
5. Selecciona branch a construir (`staging` o `main`)
6. Copia URL del hook

### C) Branch mapping (opcional)

Si tus ramas no son las default, configura:

1. `DEPLOY_BRANCH_DEV` (default `dev`)
2. `DEPLOY_BRANCH_STAGING` (default `staging`)
3. `DEPLOY_BRANCH_PROD` (default `main`)

### D) Cargar secrets en Supabase

Desde `apps/referidos-app`:

```powershell
supabase secrets set GITHUB_DEPLOY_OWNER=TU_OWNER
```

```powershell
supabase secrets set GITHUB_DEPLOY_REPO=TU_REPO
```

```powershell
supabase secrets set GITHUB_DEPLOY_TOKEN=ghp_xxx
```

```powershell
supabase secrets set NETLIFY_BUILD_HOOK_STAGING=https://api.netlify.com/build_hooks/xxx
```

```powershell
supabase secrets set NETLIFY_BUILD_HOOK_PROD=https://api.netlify.com/build_hooks/yyy
```

Si usas ramas custom:

```powershell
supabase secrets set DEPLOY_BRANCH_DEV=dev
supabase secrets set DEPLOY_BRANCH_STAGING=staging
supabase secrets set DEPLOY_BRANCH_PROD=main
```

### E) Deploy de la Edge Function

```powershell
supabase functions deploy versioning-deploy-execute
```

## Errores comunes

Error `Missing SUPABASE_URL`:

1. falta exportar variable en esa terminal

Error `Missing SUPABASE_SECRET_KEY`:

1. falta secret key de servidor

Error 5xx Cloudflare/Supabase:

1. reintentar
2. limpiar variables proxy de sesión

## Conclusión

Tu flujo sin PR es válido.

Para robustez:

1. usa commit messages convencionales
2. usa promoción visual en Admin
3. agrega Netlify de staging separado
4. promueve a prod solo desde staging validado
