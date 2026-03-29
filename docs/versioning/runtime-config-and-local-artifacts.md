# Runtime Config + Bundle Unico

## Objetivo
- Compilar una sola vez el frontend por release (mismo commit/semver).
- Evitar rebuild diferente por entorno.
- Inyectar solo config publica por entorno en `app-config.js`.

## Como quedo implementado
- Cada app carga `app-config.js` antes de iniciar React:
  - `apps/referidos-app/index.html`
  - `apps/prelaunch/index.html`
- Fallback local:
  - `apps/referidos-app/public/app-config.js`
  - `apps/prelaunch/public/app-config.js`
- Loader de config runtime:
  - `apps/referidos-app/src/config/runtimeConfig.js`
  - `apps/prelaunch/src/config/runtimeConfig.js`

## Pipeline de deploy
- Workflow: `.github/workflows/versioning-deploy-artifact.yml`
- Build:
  - Ya no inyecta `VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY` ni `VITE_ENV` en build.
- Post-build:
  - Genera `dist/app-config.js` por entorno.
  - `referidos_app` usa `window.__REFERIDOS_RUNTIME_CONFIG__`.
  - `prelaunch_web` usa `window.__PRELAUNCH_RUNTIME_CONFIG__`.
- Deploy:
  - Netlify recibe artefacto estatico (`--dir ...`) y no compila.

## Que cambia de seguridad/visibilidad
- `app-config.js` es publico en navegador (igual que cualquier `VITE_*` en frontend).
- Solo debe contener datos publicos (URL Supabase publica, anon key/publicable key, app env/version).
- Secretos reales (service role, tokens internos) siguen en Edge/CI y no van al browser.

---

# Artifacts canonicos en Supabase Storage

## Buckets
- Bucket privado canónico: `versioning-artifacts` (OPS project).
- Cada release guarda un `.zip` en:
  - `<product_key>/<version_label>/<sha12>/<artifact_name>.zip`

## Canon de deploy
- El release en `dev` crea/sube artifact al bucket privado y registra metadata en OPS DB.
- `staging` y `prod` despliegan desde ese artifact (no recompilan por entorno).
- Si una release promovida no tiene artifact propio por `release_id`, el sistema resuelve por `product + version_label` (reuso del artifact canónico).

## Retencion automatica
- Se conserva un artifact mientras esté referenciado por al menos un `env head` (`dev/staging/prod`).
- Cuando ya no está referenciado por ningún entorno, se elimina del bucket y se marca `storage_deleted_at` en metadata.

---

# Registro local de artifacts (en tu PC)

## Opciones actuales
- Opcion recomendada: Sync desde panel `Versionado -> Builds -> Sync a PC`.
- Opcion CLI local (manual): `tooling/versioning/archive-local-artifact.mjs`.

## Estructura local
- Carpeta base: `versioning/local-artifacts/`
- Registro: `versioning/local-artifacts/registry.json`
- Bundles archivados: `versioning/local-artifacts/<producto>/<artifact_key>/bundle`

## Flujo recomendado
1. Crear release en `dev` desde panel.
2. El workflow sube zip a bucket privado y registra metadata.
3. En tab `Builds`, seleccionar nodo local y usar `Sync a PC`.
4. El runner local descarga desde storage y copia en carpeta local configurada.

## Estados sugeridos
- dev: `released`
- staging: `deployed`
- prod: `deployed`
- rollback: `rolled_back`

## Resultado
- Puedes saber rapido:
  - que build corresponde a cada release (`semver + sha`),
  - en que entorno quedo (`dev/staging/prod`),
  - donde esta el bundle exacto en disco.
