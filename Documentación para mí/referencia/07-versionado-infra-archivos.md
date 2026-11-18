# Archivos de infraestructura y versionado

Referencia del [capítulo de versionado](../07-versionado-y-despliegue.md). Para Gradle, wrappers Windows y controles por fase, sigue la [referencia de Android](04-android-build.md).


## `.`

- [.editorconfig](../../.editorconfig) — Fija convenciones compartidas de encoding, fin de línea e indentación. Es la referencia para cambios de formato que cruzan plataformas.

## `.github/workflows`

- [ci-android-pr.yml](../../.github/workflows/ci-android-pr.yml) — Gates de PR sobre Android y paquetes relacionados que instalan workspaces seleccionados, lint y typecheck. Los chequeos de Gradle locales se describen en el capítulo Android.
- [ci-pr.yml](../../.github/workflows/ci-pr.yml) — Clasifica el PR y ejecuta lint, runner de pruebas por workspaces y builds de las dos apps web. Admite un alcance especial de cambios de workflow.
- [versioning-apply-migrations.yml](../../.github/workflows/versioning-apply-migrations.yml) — Workflow manual para validar entorno runtime, hacer checkout del commit y aplicar migraciones con Supabase CLI. Separa cambiar el esquema de publicar la web.
- [versioning-deploy-artifact.yml](../../.github/workflows/versioning-deploy-artifact.yml) — Valida producto/entorno y descarga el artefacto de la release. Escribe app-config.js, registra sourcemaps, publica Netlify y reporta resultado a OPS.
- [versioning-detect-dev.yml](../../.github/workflows/versioning-detect-dev.yml) — Responde a push de desarrollo. Clasifica cambios, produce changesets y ejecuta gates del código asociado antes de una release explícita.
- [versioning-detect-pr.yml](../../.github/workflows/versioning-detect-pr.yml) — Previsualiza el tipo de cambios en PR y publica su changeset. Puede gestionar el label de incremento mayor.
- [versioning-local-artifact-sync.yml](../../.github/workflows/versioning-local-artifact-sync.yml) — Coordina un runner local con OPS. Descarga el artefacto del proveedor disponible, lo copia al almacenamiento local y actualiza estado del request.
- [versioning-promote.yml](../../.github/workflows/versioning-promote.yml) — Despacha el registro de promoción de una release con producto, ambientes y SemVer.
- [versioning-record-deployment.yml](../../.github/workflows/versioning-record-deployment.yml) — Registra el resultado de un despliegue en la plataforma de versionado. Útil si se necesita ingreso operativo separado de la entrega.
- [versioning-release-dev.yml](../../.github/workflows/versioning-release-dev.yml) — Detecta diff, genera notas, aplica changeset, arma build, empaqueta artefacto, sube backup/registro y finaliza metadata en dev.

## `.`

- [.gitignore](../../.gitignore) — Controla exclusión de productos de build, dependencias, configuración local y logs. La regla general logs afecta al helper móvil no versionado.
- [.npmrc](../../.npmrc) — Opciones de npm que aplican en la raíz y afectan instalación de los workspaces. Consulta este archivo junto con el lockfile al investigar diferencias.

## `.vscode`

- [extensions.json](../../.vscode/extensions.json) — Recomendaciones de extensiones para el editor en este repositorio.

## `.`

- [README.md](../../README.md) — Índice original del monorepo. Señala aplicaciones principales y guías de versionado. **Lo usa:** [docsRegistry.js](../../apps/referidos-app/src/admin/docs/docsRegistry.js).
- [eslint.config.js](../../eslint.config.js) — Configura reglas y entornos para JS/JSX, hooks React, Vite y tooling Node. Define también artefactos excluidos del lint.
- [package-lock.json](../../package-lock.json) — Registro de resolución exacta para npm ci, incluidas dependencias transitivas y workspaces. Actualiza al cambiar manifests.
- [package.json](../../package.json) — Declara workspaces, scripts de cada app, tooling y dependencias comunes. Es el punto para saber qué comando está respaldado por el repo.

## `tooling/fonts`

- [subset-prelaunch-fonts.mjs](../../tooling/fonts/subset-prelaunch-fonts.mjs) — Produce archivos de fuente reducidos para Prelaunch a partir de fuentes originales. Revisa la carga del CSS antes de ajustar fuentes o pesos.

## `tooling/guardrails`

- [check-mojibake.mjs](../../tooling/guardrails/check-mojibake.mjs) — Detecta caracteres mal decodificados en archivos de texto. Forma parte del comando lint de la raíz.

## `tooling/observability`

- [upload-sourcemaps.mjs](../../tooling/observability/upload-sourcemaps.mjs) — Recorre los mapas del dist, comprueba sourcesContent, los copia a Storage, registra el manifiesto de release y gestiona limpieza de versiones anteriores. El workflow decide qué directorio termina en Netlify.

## `tooling/scripts`

- [import_inec_territorial.psql](../../tooling/scripts/import_inec_territorial.psql) — Importa el catálogo territorial del INEC al esquema esperado por los selectores de dirección. Requiere datos y proyecto objetivo correctos.
- [migrate_auth_and_sync.js](../../tooling/scripts/migrate_auth_and_sync.js) — Script de mantenimiento histórico para migrar o sincronizar perfiles con Auth. Revisa cuidadosamente entradas, destino y comportamiento antes de considerar su uso.

## `tooling/versioning`

- [apply-changeset.mjs](../../tooling/versioning/apply-changeset.mjs) — Lee el changeset, valida el destino y lo aplica en OPS con contexto de commit y versión. Sirve de entrada del workflow dev. **Conecta con:** [shared.mjs](../../tooling/versioning/shared.mjs), [supabase-client.mjs](../../tooling/versioning/supabase-client.mjs).
- [archive-local-artifact.mjs](../../tooling/versioning/archive-local-artifact.mjs) — Prepara una copia local de artefactos de build junto a información para identificar la versión. **Conecta con:** [shared.mjs](../../tooling/versioning/shared.mjs).
- [bootstrap-baseline.mjs](../../tooling/versioning/bootstrap-baseline.mjs) — Inicializa el catálogo y baseline de productos/componentes de OPS. Corresponde a arranque o backfill controlado. **Conecta con:** [shared.mjs](../../tooling/versioning/shared.mjs), [supabase-client.mjs](../../tooling/versioning/supabase-client.mjs).
- [detect-changes.mjs](../../tooling/versioning/detect-changes.mjs) — Lee el diff entre referencias, aplica el mapa de rutas y arma el changeset. Es el sitio para investigar por qué un archivo incrementa o no un producto. **Conecta con:** [shared.mjs](../../tooling/versioning/shared.mjs).
- [promote-release.mjs](../../tooling/versioning/promote-release.mjs) — Llama a OPS para promover la release por SemVer de un entorno a otro. **Conecta con:** [supabase-client.mjs](../../tooling/versioning/supabase-client.mjs).
- [record-deployment.mjs](../../tooling/versioning/record-deployment.mjs) — Persiste estado, identificador y contexto del despliegue en OPS. **Conecta con:** [supabase-client.mjs](../../tooling/versioning/supabase-client.mjs), [shared.mjs](../../tooling/versioning/shared.mjs).
- [shared.mjs](../../tooling/versioning/shared.mjs) — Utilidades de errores, entorno, semver, cambios y normalización reutilizadas por comandos de versionado. **Interfaz:** `REPO_ROOT`, `loadComponentMap`, `toPosixPath`, `unique`, `ensureDir`, `hashText`, `hashFiles`, `globToRegExp`, `matchesGlob`. **Lo usa:** [apply-changeset.mjs](../../tooling/versioning/apply-changeset.mjs), [archive-local-artifact.mjs](../../tooling/versioning/archive-local-artifact.mjs), [bootstrap-baseline.mjs](../../tooling/versioning/bootstrap-baseline.mjs) y 2 más.
- [supabase-client.mjs](../../tooling/versioning/supabase-client.mjs) — Crea el cliente Supabase usado por el tooling con credenciales de servidor del proceso. **Interfaz:** `getSupabaseAdminClient`, `mustSingle`, `mustData`. **Lo usa:** [apply-changeset.mjs](../../tooling/versioning/apply-changeset.mjs), [bootstrap-baseline.mjs](../../tooling/versioning/bootstrap-baseline.mjs), [promote-release.mjs](../../tooling/versioning/promote-release.mjs) y 1 más.

## `versioning`

- [component-map.json](../../versioning/component-map.json) — Mapa de rutas, grupos, productos y componentes que usa el detector. Distingue cambios de contrato, docs y recursos ignorados.
- [env.contract.json](../../versioning/env.contract.json) — Lista nombres de variables necesarias u opcionales y algunas reglas de validación por entorno y producto. No es un archivo para cargar secretos.

## `versioning/local-artifacts`

- [.gitkeep](../../versioning/local-artifacts/.gitkeep) — Marcador para que Git conserve el directorio de artefactos locales incluso vacío.

## `.`

- [vite.prelaunch.config.js](../../vite.prelaunch.config.js) — Configuración Vite alternativa en la raíz. El comando build:prelaunch usa el workspace y su vite.config.js, así que confirma el invocador antes de tocarla.
