# GitHub Actions: disparadores, jobs, permisos y pasos

[Volver a la referencia de infraestructura](README.md)

Los enlaces a líneas apuntan al checkout analizado. Las relaciones se obtuvieron leyendo declaraciones, imports y configuraciones. Los valores de credenciales y datos operativos se dejan en sus archivos de origen.

## Archivos en este capítulo

- [.github/workflows/ci-android-pr.yml](#githubworkflowsci-android-pryml)
- [.github/workflows/ci-pr.yml](#githubworkflowsci-pryml)
- [.github/workflows/versioning-apply-migrations.yml](#githubworkflowsversioning-apply-migrationsyml)
- [.github/workflows/versioning-deploy-artifact.yml](#githubworkflowsversioning-deploy-artifactyml)
- [.github/workflows/versioning-detect-dev.yml](#githubworkflowsversioning-detect-devyml)
- [.github/workflows/versioning-detect-pr.yml](#githubworkflowsversioning-detect-pryml)
- [.github/workflows/versioning-local-artifact-sync.yml](#githubworkflowsversioning-local-artifact-syncyml)
- [.github/workflows/versioning-promote.yml](#githubworkflowsversioning-promoteyml)
- [.github/workflows/versioning-record-deployment.yml](#githubworkflowsversioning-record-deploymentyml)
- [.github/workflows/versioning-release-dev.yml](#githubworkflowsversioning-release-devyml)

## .github/workflows/ci-android-pr.yml

[Abrir fuente](../../../.github/workflows/ci-android-pr.yml) · 79 líneas de texto.

Workflow de lint y typecheck para cambios Android y de sus paquetes relevantes en PR hacia staging/main. El flujo de compilación local y firma tiene sus propios scripts.

Disparadores: `pull_request`. [L3](../../../.github/workflows/ci-android-pr.yml#L3)

- [pull_request](../../../.github/workflows/ci-android-pr.yml#L4). Configura `branches`, `paths`, `types`.
  - Ramas: `staging`, `main`.

Permisos del workflow: `contents=read`. [L24](../../../.github/workflows/ci-android-pr.yml#L24)

### `android-lint`

Job [android-lint](../../../.github/workflows/ci-android-pr.yml#L28). Runner `ubuntu-latest`.

- [Checkout](../../../.github/workflows/ci-android-pr.yml#L32). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Node](../../../.github/workflows/ci-android-pr.yml#L35). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Install dependencies](../../../.github/workflows/ci-android-pr.yml#L40). Instala las dependencias con el lockfile que corresponde a la revisión del job.
- [Run Android lint](../../../.github/workflows/ci-android-pr.yml#L51). Aplica reglas de lint para detectar problemas de sintaxis, estilo o alcance antes del build.

### `android-typecheck`

Job [android-typecheck](../../../.github/workflows/ci-android-pr.yml#L54). Runner `ubuntu-latest`.

- [Checkout](../../../.github/workflows/ci-android-pr.yml#L58). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Node](../../../.github/workflows/ci-android-pr.yml#L61). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Install dependencies](../../../.github/workflows/ci-android-pr.yml#L66). Instala las dependencias con el lockfile que corresponde a la revisión del job.
- [Run Android typecheck](../../../.github/workflows/ci-android-pr.yml#L77). Pide al compilador que valide los tipos del workspace Android.


## .github/workflows/ci-pr.yml

[Abrir fuente](../../../.github/workflows/ci-pr.yml) · 201 líneas de texto.

Clasifica el PR y ejecuta lint, runner de pruebas por workspaces y builds de las dos apps web. Admite un alcance especial de cambios de workflow.

Disparadores: `pull_request`. [L3](../../../.github/workflows/ci-pr.yml#L3)

- [pull_request](../../../.github/workflows/ci-pr.yml#L4). Configura `branches`, `types`.
  - Ramas: `staging`, `main`.

Permisos del workflow: `contents=read`. [L14](../../../.github/workflows/ci-pr.yml#L14)

### `detect`

Job [detect](../../../.github/workflows/ci-pr.yml#L18). Runner `ubuntu-latest`. Publica `workflow_pack_only`.

- [Checkout](../../../.github/workflows/ci-pr.yml#L24). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Classify PR scope](../../../.github/workflows/ci-pr.yml#L29). Determina qué pipeline se activa a partir de los archivos o el contexto del evento. Identificador de outputs `classify`. Ejecuta [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs), [promote-release.mjs](../../../tooling/versioning/promote-release.mjs), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs), [upload-sourcemaps.mjs](../../../tooling/observability/upload-sourcemaps.mjs).

### `lint`

Job [lint](../../../.github/workflows/ci-pr.yml#L79). Runner `ubuntu-latest`. Depende de `detect`.

- [Checkout](../../../.github/workflows/ci-pr.yml#L84). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Workflow pack lint gate](../../../.github/workflows/ci-pr.yml#L87). Aplica reglas de lint para detectar problemas de sintaxis, estilo o alcance antes del build. Tiene condición propia.
- [Setup Node](../../../.github/workflows/ci-pr.yml#L91). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`. Tiene condición propia.
- [Install dependencies](../../../.github/workflows/ci-pr.yml#L97). Instala las dependencias con el lockfile que corresponde a la revisión del job. Tiene condición propia.
- [Run lint](../../../.github/workflows/ci-pr.yml#L113). Aplica reglas de lint para detectar problemas de sintaxis, estilo o alcance antes del build. Tiene condición propia.

### `test`

Job [test](../../../.github/workflows/ci-pr.yml#L120). Runner `ubuntu-latest`. Depende de `detect`.

- [Checkout](../../../.github/workflows/ci-pr.yml#L125). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Workflow pack test gate](../../../.github/workflows/ci-pr.yml#L128). Comprueba el código con las pruebas o validaciones definidas para el alcance. Tiene condición propia.
- [Setup Node](../../../.github/workflows/ci-pr.yml#L132). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`. Tiene condición propia.
- [Install dependencies](../../../.github/workflows/ci-pr.yml#L138). Instala las dependencias con el lockfile que corresponde a la revisión del job. Tiene condición propia.
- [Run tests](../../../.github/workflows/ci-pr.yml#L154). Comprueba el código con las pruebas o validaciones definidas para el alcance. Tiene condición propia.

### `build`

Job [build](../../../.github/workflows/ci-pr.yml#L160). Runner `ubuntu-latest`. Depende de `detect`.

- [Checkout](../../../.github/workflows/ci-pr.yml#L165). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Workflow pack build gate](../../../.github/workflows/ci-pr.yml#L168). Genera la salida del workspace o valida que pueda compilar. Tiene condición propia.
- [Setup Node](../../../.github/workflows/ci-pr.yml#L172). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`. Tiene condición propia.
- [Install dependencies](../../../.github/workflows/ci-pr.yml#L178). Instala las dependencias con el lockfile que corresponde a la revisión del job. Tiene condición propia.
- [Build Referidos App](../../../.github/workflows/ci-pr.yml#L194). Genera la salida del workspace o valida que pueda compilar. Tiene condición propia.
- [Build Prelaunch](../../../.github/workflows/ci-pr.yml#L198). Genera la salida del workspace o valida que pueda compilar. Tiene condición propia.


## .github/workflows/versioning-apply-migrations.yml

[Abrir fuente](../../../.github/workflows/versioning-apply-migrations.yml) · 124 líneas de texto.

Workflow manual para validar entorno runtime, hacer checkout del commit y aplicar migraciones con Supabase CLI. Separa cambiar el esquema de publicar la web.

Disparadores: `workflow_dispatch`. [L3](../../../.github/workflows/versioning-apply-migrations.yml#L3)

- [workflow_dispatch](../../../.github/workflows/versioning-apply-migrations.yml#L4). Configura `inputs`.
  - [request_id](../../../.github/workflows/versioning-apply-migrations.yml#L6). ID interno de solicitud. Tipo `string`. Obligatorio.
  - [product_key](../../../.github/workflows/versioning-apply-migrations.yml#L10). Producto (referidos_app | prelaunch_web). Tipo `string`. Obligatorio.
  - [env_key](../../../.github/workflows/versioning-apply-migrations.yml#L14). Entorno destino (staging | prod). Tipo `string`. Obligatorio.
  - [semver](../../../.github/workflows/versioning-apply-migrations.yml#L18). Version semver. Tipo `string`. Obligatorio.
  - [target_project_ref](../../../.github/workflows/versioning-apply-migrations.yml#L22). Supabase project ref destino. Tipo `string`. Obligatorio.
  - [source_commit_sha](../../../.github/workflows/versioning-apply-migrations.yml#L26). Commit de release. Tipo `string`.
  - [source_branch](../../../.github/workflows/versioning-apply-migrations.yml#L30). Rama origen. Tipo `string`.
  - [target_branch](../../../.github/workflows/versioning-apply-migrations.yml#L34). Rama destino. Tipo `string`.
  - [required_migrations](../../../.github/workflows/versioning-apply-migrations.yml#L38). Lista JSON de versiones requeridas. Tipo `string`.

Permisos del workflow: `contents=read`. [L43](../../../.github/workflows/versioning-apply-migrations.yml#L43)

### `apply-migrations`

Job [apply-migrations](../../../.github/workflows/versioning-apply-migrations.yml#L47). Runner `ubuntu-latest`.
Variables de entrada y contexto en [L49](../../../.github/workflows/versioning-apply-migrations.yml#L49): `REQUEST_ID`, `PRODUCT_KEY`, `ENV_KEY`, `SEMVER`, `TARGET_PROJECT_REF`, `SOURCE_COMMIT_SHA`, `SOURCE_BRANCH`, `TARGET_BRANCH`, `REQUIRED_MIGRATIONS`, `SUPABASE_ACCESS_TOKEN`.

- [Validar input y resolver runtime](../../../.github/workflows/versioning-apply-migrations.yml#L61). Prepara un valor que consumen pasos posteriores. Revisa entradas y outputs al seguir el alcance. Identificador de outputs `plan`.
- [Checkout release commit](../../../.github/workflows/versioning-apply-migrations.yml#L92). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Supabase CLI](../../../.github/workflows/versioning-apply-migrations.yml#L98). Prepara un valor que consumen pasos posteriores. Revisa entradas y outputs al seguir el alcance. Acción `supabase/setup-cli@v1`.
- [Mostrar contexto](../../../.github/workflows/versioning-apply-migrations.yml#L103). Ejecuta el comando o bloque definido para este paso del job.
- [Apply migrations (db push)](../../../.github/workflows/versioning-apply-migrations.yml#L118). Gestiona el flujo de migración del runtime seleccionado.


## .github/workflows/versioning-deploy-artifact.yml

[Abrir fuente](../../../.github/workflows/versioning-deploy-artifact.yml) · 783 líneas de texto.

Valida producto/entorno y descarga el artefacto de la release. Escribe app-config.js, registra sourcemaps, publica Netlify y reporta resultado a OPS.

Disparadores: `workflow_dispatch`. [L3](../../../.github/workflows/versioning-deploy-artifact.yml#L3)

- [workflow_dispatch](../../../.github/workflows/versioning-deploy-artifact.yml#L4). Configura `inputs`.
  - [request_id](../../../.github/workflows/versioning-deploy-artifact.yml#L6). ID de la solicitud de deploy. Tipo `string`. Obligatorio.
  - [product_key](../../../.github/workflows/versioning-deploy-artifact.yml#L10). Producto (referidos_app | prelaunch_web). Tipo `string`. Obligatorio.
  - [env_key](../../../.github/workflows/versioning-deploy-artifact.yml#L14). Entorno destino (staging | prod). Tipo `string`. Obligatorio.
  - [semver](../../../.github/workflows/versioning-deploy-artifact.yml#L18). Version semver. Tipo `string`. Obligatorio.
  - [source_commit_sha](../../../.github/workflows/versioning-deploy-artifact.yml#L22). Commit exacto a desplegar. Tipo `string`. Obligatorio.
  - [source_branch](../../../.github/workflows/versioning-deploy-artifact.yml#L26). Rama origen. Tipo `string`.
  - [target_branch](../../../.github/workflows/versioning-deploy-artifact.yml#L30). Rama destino. Tipo `string`.
  - [callback_url](../../../.github/workflows/versioning-deploy-artifact.yml#L34). URL de callback para finalizar deploy. Tipo `string`. Obligatorio.
  - [deploy_execution_id](../../../.github/workflows/versioning-deploy-artifact.yml#L38). ID interno de ejecucion de deploy. Tipo `string`. Obligatorio.
  - [actor](../../../.github/workflows/versioning-deploy-artifact.yml#L42). Actor que disparo el deploy. Tipo `string`.

Permisos del workflow: `contents=write`, `actions=read`. [L47](../../../.github/workflows/versioning-deploy-artifact.yml#L47)

### `deploy-artifact`

Job [deploy-artifact](../../../.github/workflows/versioning-deploy-artifact.yml#L52). Runner `ubuntu-latest`.
Variables de entrada y contexto en [L54](../../../.github/workflows/versioning-deploy-artifact.yml#L54): `PRODUCT_KEY`, `ENV_KEY`, `REQUEST_ID`, `SEMVER`, `SOURCE_COMMIT_SHA`, `SOURCE_BRANCH`, `TARGET_BRANCH`, `CALLBACK_URL`, `DEPLOY_EXECUTION_ID`, `WORKFLOW_ACTOR`, `NETLIFY_AUTH_TOKEN`, `VERSIONING_DEPLOY_CALLBACK_TOKEN`, `NETLIFY_SITE_ID_REFERIDOS_APP_STAGING`, `NETLIFY_SITE_ID_REFERIDOS_APP_PROD`, `NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING`, `NETLIFY_SITE_ID_PRELAUNCH_WEB_PROD`, `OBS_SUPABASE_URL_STAGING`, `OBS_SUPABASE_URL_PROD`, `OBS_SUPABASE_SECRET_KEY_STAGING`, `OBS_SUPABASE_SECRET_KEY_PROD`, `OBS_SUPABASE_SERVICE_ROLE_KEY_STAGING`, `OBS_SUPABASE_SERVICE_ROLE_KEY_PROD`, `VITE_SUPABASE_URL_STAGING`, `VITE_SUPABASE_URL_PROD`, `VITE_SUPABASE_ANON_KEY_STAGING`, `VITE_SUPABASE_ANON_KEY_PROD`, `OBS_TENANT_ID_STAGING`, `OBS_TENANT_ID_PROD`, `OBS_TENANT_NAME_STAGING`, `OBS_TENANT_NAME_PROD`, `SUPABASE_URL_STAGING`, `SUPABASE_URL_PROD`, `SUPABASE_SECRET_KEY_STAGING`, `SUPABASE_SECRET_KEY_PROD`, `SUPABASE_SERVICE_ROLE_KEY_STAGING`, `SUPABASE_SERVICE_ROLE_KEY_PROD`, `VERSIONING_ARTIFACTS_BUCKET`.

- [Validar input y resolver plan](../../../.github/workflows/versioning-deploy-artifact.yml#L93). Prepara un valor que consumen pasos posteriores. Revisa entradas y outputs al seguir el alcance. Identificador de outputs `plan`.
- [Resolver credenciales Supabase observability](../../../.github/workflows/versioning-deploy-artifact.yml#L164). Prepara un valor que consumen pasos posteriores. Revisa entradas y outputs al seguir el alcance. Identificador de outputs `obs`.
- [Resolver variables Vite Supabase](../../../.github/workflows/versioning-deploy-artifact.yml#L194). Prepara un valor que consumen pasos posteriores. Revisa entradas y outputs al seguir el alcance. Identificador de outputs `vite_supabase`.
- [Resolver tenant observability](../../../.github/workflows/versioning-deploy-artifact.yml#L234). Prepara un valor que consumen pasos posteriores. Revisa entradas y outputs al seguir el alcance. Identificador de outputs `obs_tenant`.
- [Checkout commit exacto](../../../.github/workflows/versioning-deploy-artifact.yml#L255). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Node](../../../.github/workflows/versioning-deploy-artifact.yml#L261). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Install dependencies](../../../.github/workflows/versioning-deploy-artifact.yml#L266). Instala las dependencias con el lockfile que corresponde a la revisión del job.
- [Registrar run de workflow en backend](../../../.github/workflows/versioning-deploy-artifact.yml#L269). Conecta el trabajo y el artefacto con la identidad de la release para mantener trazabilidad. Puede continuar tras un fallo de este paso.
- [Resolve release artifact metadata](../../../.github/workflows/versioning-deploy-artifact.yml#L331). Conecta el trabajo y el artefacto con la identidad de la release para mantener trazabilidad. Identificador de outputs `artifact_meta`.
- [Download release artifact from GitHub Actions](../../../.github/workflows/versioning-deploy-artifact.yml#L430). Recupera la copia de artefacto del proveedor indicado por los metadatos de la release. Acción `actions/download-artifact@v4`. Tiene condición propia.
- [Download release artifact from Supabase Storage](../../../.github/workflows/versioning-deploy-artifact.yml#L440). Recupera la copia de artefacto del proveedor indicado por los metadatos de la release. Tiene condición propia.
- [Validate artifact provider](../../../.github/workflows/versioning-deploy-artifact.yml#L486). Comprueba que exista una fuente de artefacto compatible antes de continuar. Tiene condición propia.
- [Prepare publish dir from artifact](../../../.github/workflows/versioning-deploy-artifact.yml#L494). Empaqueta, registra o traslada el contenido del build según el paso. Identificador de outputs `build`.
- [Generar runtime app-config.js](../../../.github/workflows/versioning-deploy-artifact.yml#L523). Ejecuta el comando o bloque definido para este paso del job. Identificador de outputs `runtime_config`.
- [Upload sourcemaps + registrar release metadata](../../../.github/workflows/versioning-deploy-artifact.yml#L603). Conecta el trabajo y el artefacto con la identidad de la release para mantener trazabilidad. Identificador de outputs `sourcemaps`. Ejecuta [upload-sourcemaps.mjs](../../../tooling/observability/upload-sourcemaps.mjs).
- [Deploy artifact a Netlify](../../../.github/workflows/versioning-deploy-artifact.yml#L625). Entrega el directorio armado al destino web configurado. Identificador de outputs `deploy`.
- [Crear tag de produccion](../../../.github/workflows/versioning-deploy-artifact.yml#L642). Ejecuta el comando o bloque definido para este paso del job. Identificador de outputs `tag_prod`. Tiene condición propia.
- [Finalizar deploy en backend](../../../.github/workflows/versioning-deploy-artifact.yml#L665). Informa el estado final y el contexto de ejecución al registro operativo. Tiene condición propia.


## .github/workflows/versioning-detect-dev.yml

[Abrir fuente](../../../.github/workflows/versioning-detect-dev.yml) · 213 líneas de texto.

Responde a push de desarrollo. Clasifica cambios, produce changesets y ejecuta gates del código asociado antes de una release explícita.

Disparadores: `push`. [L3](../../../.github/workflows/versioning-detect-dev.yml#L3)

- [push](../../../.github/workflows/versioning-detect-dev.yml#L4). Configura `branches`.
  - Ramas: `dev`, `develop`.

### `detect`

Job [detect](../../../.github/workflows/versioning-detect-dev.yml#L10). Runner `ubuntu-latest`. Publica `workflow_pack_only`.

- [Checkout](../../../.github/workflows/versioning-detect-dev.yml#L16). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Classify push scope](../../../.github/workflows/versioning-detect-dev.yml#L21). Determina qué pipeline se activa a partir de los archivos o el contexto del evento. Identificador de outputs `classify`. Ejecuta [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs), [promote-release.mjs](../../../tooling/versioning/promote-release.mjs), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs), [upload-sourcemaps.mjs](../../../tooling/observability/upload-sourcemaps.mjs).
- [Setup Node](../../../.github/workflows/versioning-detect-dev.yml#L71). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Detect versioning changeset](../../../.github/workflows/versioning-detect-dev.yml#L76). Calcula el changeset que alimenta revisión o versionado. Ejecuta [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs).
- [Upload changeset artifact](../../../.github/workflows/versioning-detect-dev.yml#L85). Empaqueta, registra o traslada el contenido del build según el paso. Acción `actions/upload-artifact@v4`.

### `lint`

Job [lint](../../../.github/workflows/versioning-detect-dev.yml#L91). Runner `ubuntu-latest`. Depende de `detect`.

- [Checkout](../../../.github/workflows/versioning-detect-dev.yml#L96). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Workflow pack lint gate](../../../.github/workflows/versioning-detect-dev.yml#L99). Aplica reglas de lint para detectar problemas de sintaxis, estilo o alcance antes del build. Tiene condición propia.
- [Setup Node](../../../.github/workflows/versioning-detect-dev.yml#L103). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`. Tiene condición propia.
- [Install dependencies](../../../.github/workflows/versioning-detect-dev.yml#L109). Instala las dependencias con el lockfile que corresponde a la revisión del job. Tiene condición propia.
- [Run lint](../../../.github/workflows/versioning-detect-dev.yml#L125). Aplica reglas de lint para detectar problemas de sintaxis, estilo o alcance antes del build. Tiene condición propia.

### `test`

Job [test](../../../.github/workflows/versioning-detect-dev.yml#L132). Runner `ubuntu-latest`. Depende de `detect`.

- [Checkout](../../../.github/workflows/versioning-detect-dev.yml#L137). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Workflow pack test gate](../../../.github/workflows/versioning-detect-dev.yml#L140). Comprueba el código con las pruebas o validaciones definidas para el alcance. Tiene condición propia.
- [Setup Node](../../../.github/workflows/versioning-detect-dev.yml#L144). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`. Tiene condición propia.
- [Install dependencies](../../../.github/workflows/versioning-detect-dev.yml#L150). Instala las dependencias con el lockfile que corresponde a la revisión del job. Tiene condición propia.
- [Run tests](../../../.github/workflows/versioning-detect-dev.yml#L166). Comprueba el código con las pruebas o validaciones definidas para el alcance. Tiene condición propia.

### `build`

Job [build](../../../.github/workflows/versioning-detect-dev.yml#L172). Runner `ubuntu-latest`. Depende de `detect`.

- [Checkout](../../../.github/workflows/versioning-detect-dev.yml#L177). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Workflow pack build gate](../../../.github/workflows/versioning-detect-dev.yml#L180). Genera la salida del workspace o valida que pueda compilar. Tiene condición propia.
- [Setup Node](../../../.github/workflows/versioning-detect-dev.yml#L184). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`. Tiene condición propia.
- [Install dependencies](../../../.github/workflows/versioning-detect-dev.yml#L190). Instala las dependencias con el lockfile que corresponde a la revisión del job. Tiene condición propia.
- [Build Referidos App](../../../.github/workflows/versioning-detect-dev.yml#L206). Genera la salida del workspace o valida que pueda compilar. Tiene condición propia.
- [Build Prelaunch](../../../.github/workflows/versioning-detect-dev.yml#L210). Genera la salida del workspace o valida que pueda compilar. Tiene condición propia.


## .github/workflows/versioning-detect-pr.yml

[Abrir fuente](../../../.github/workflows/versioning-detect-pr.yml) · 88 líneas de texto.

Previsualiza el tipo de cambios en PR y publica su changeset. Puede gestionar el label de incremento mayor.

Disparadores: `pull_request`. [L3](../../../.github/workflows/versioning-detect-pr.yml#L3)

- [pull_request](../../../.github/workflows/versioning-detect-pr.yml#L4). Configura `types`.

Permisos del workflow: `contents=read`, `pull-requests=write`, `issues=write`. [L7](../../../.github/workflows/versioning-detect-pr.yml#L7)

### `detect`

Job [detect](../../../.github/workflows/versioning-detect-pr.yml#L13). Runner `ubuntu-latest`.

- [Checkout](../../../.github/workflows/versioning-detect-pr.yml#L16). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Node](../../../.github/workflows/versioning-detect-pr.yml#L21). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Detect versioning changeset](../../../.github/workflows/versioning-detect-pr.yml#L26). Calcula el changeset que alimenta revisión o versionado. Ejecuta [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs).
- [Auto-apply semver major label](../../../.github/workflows/versioning-detect-pr.yml#L36). Traduce el incremento de versión en una etiqueta visible de GitHub. Acción `actions/github-script@v7`.
- [Upload changeset artifact](../../../.github/workflows/versioning-detect-pr.yml#L83). Empaqueta, registra o traslada el contenido del build según el paso. Acción `actions/upload-artifact@v4`.


## .github/workflows/versioning-local-artifact-sync.yml

[Abrir fuente](../../../.github/workflows/versioning-local-artifact-sync.yml) · 282 líneas de texto.

Coordina un runner local con OPS. Descarga el artefacto del proveedor disponible, lo copia al almacenamiento local y actualiza estado del request.

Disparadores: `workflow_dispatch`. [L3](../../../.github/workflows/versioning-local-artifact-sync.yml#L3)

- [workflow_dispatch](../../../.github/workflows/versioning-local-artifact-sync.yml#L4). Configura `inputs`.
  - [request_id](../../../.github/workflows/versioning-local-artifact-sync.yml#L6). ID de solicitud de sync local. Tipo `string`. Obligatorio.
  - [node_key](../../../.github/workflows/versioning-local-artifact-sync.yml#L10). Node key. Tipo `string`. Obligatorio.
  - [runner_label](../../../.github/workflows/versioning-local-artifact-sync.yml#L14). Label del self-hosted runner. Tipo `string`. Obligatorio.
  - [artifact_name](../../../.github/workflows/versioning-local-artifact-sync.yml#L18). Nombre del artifact en GitHub Actions. Tipo `string`. Obligatorio.
  - [artifact_provider](../../../.github/workflows/versioning-local-artifact-sync.yml#L22). Proveedor del artifact (github_actions | supabase_storage). Tipo `string`.
  - [artifact_key](../../../.github/workflows/versioning-local-artifact-sync.yml#L26). Artifact key. Tipo `string`.
  - [artifact_storage_bucket](../../../.github/workflows/versioning-local-artifact-sync.yml#L30). Bucket de storage (si provider=supabase_storage). Tipo `string`.
  - [artifact_storage_path](../../../.github/workflows/versioning-local-artifact-sync.yml#L34). Path del objeto en storage. Tipo `string`.
  - [artifact_download_url](../../../.github/workflows/versioning-local-artifact-sync.yml#L38). Signed URL para descargar artifact desde storage. Tipo `string`.
  - [github_run_id](../../../.github/workflows/versioning-local-artifact-sync.yml#L42). Run ID donde se generó el artifact. Tipo `string`. Obligatorio.
  - [github_repository](../../../.github/workflows/versioning-local-artifact-sync.yml#L46). owner/repo del artifact. Tipo `string`. Obligatorio.
  - [product_key](../../../.github/workflows/versioning-local-artifact-sync.yml#L50). Producto. Tipo `string`. Obligatorio.
  - [env_key](../../../.github/workflows/versioning-local-artifact-sync.yml#L54). Entorno. Tipo `string`. Obligatorio.
  - [semver](../../../.github/workflows/versioning-local-artifact-sync.yml#L58). Version. Tipo `string`. Obligatorio.
  - [source_commit_sha](../../../.github/workflows/versioning-local-artifact-sync.yml#L62). Commit source. Tipo `string`. Obligatorio.
  - [actor](../../../.github/workflows/versioning-local-artifact-sync.yml#L66). Actor. Tipo `string`.

Permisos del workflow: `contents=read`, `actions=read`. [L71](../../../.github/workflows/versioning-local-artifact-sync.yml#L71)

### `sync-local`

Job [sync-local](../../../.github/workflows/versioning-local-artifact-sync.yml#L76). Runner `self-hosted`, `${{ inputs.runner_label }}`.
Variables de entrada y contexto en [L83](../../../.github/workflows/versioning-local-artifact-sync.yml#L83): `OPS_SUPABASE_URL`, `VERSIONING_LOCAL_SYNC_TOKEN`, `VERSIONING_LOCAL_ARTIFACTS_DIR`, `REQUEST_ID`, `NODE_KEY`, `PRODUCT_KEY`, `ENV_KEY`, `SEMVER`, `SOURCE_COMMIT_SHA`, `ACTOR`, `ARTIFACT_PROVIDER`, `ARTIFACT_STORAGE_BUCKET`, `ARTIFACT_STORAGE_PATH`, `ARTIFACT_DOWNLOAD_URL`.

- [Mark request running](../../../.github/workflows/versioning-local-artifact-sync.yml#L99). Ejecuta el comando o bloque definido para este paso del job.
- [Download release artifact (GitHub Actions)](../../../.github/workflows/versioning-local-artifact-sync.yml#L142). Recupera la copia de artefacto del proveedor indicado por los metadatos de la release. Acción `actions/download-artifact@v4`. Tiene condición propia.
- [Download release artifact (Supabase Storage)](../../../.github/workflows/versioning-local-artifact-sync.yml#L152). Recupera la copia de artefacto del proveedor indicado por los metadatos de la release. Tiene condición propia.
- [Validate artifact provider](../../../.github/workflows/versioning-local-artifact-sync.yml#L168). Comprueba que exista una fuente de artefacto compatible antes de continuar. Tiene condición propia.
- [Copy artifact to local storage](../../../.github/workflows/versioning-local-artifact-sync.yml#L173). Empaqueta, registra o traslada el contenido del build según el paso. Identificador de outputs `copy_local`.
- [Finalize local sync callback](../../../.github/workflows/versioning-local-artifact-sync.yml#L222). Informa el estado final y el contexto de ejecución al registro operativo. Tiene condición propia.


## .github/workflows/versioning-promote.yml

[Abrir fuente](../../../.github/workflows/versioning-promote.yml) · 64 líneas de texto.

Despacha el registro de promoción de una release con producto, ambientes y SemVer.

Disparadores: `workflow_dispatch`. [L3](../../../.github/workflows/versioning-promote.yml#L3)

- [workflow_dispatch](../../../.github/workflows/versioning-promote.yml#L4). Configura `inputs`.
  - [product](../../../.github/workflows/versioning-promote.yml#L6). Producto (referidos_app | prelaunch_web | android_app). Tipo `choice`. Obligatorio.
  - [from_env](../../../.github/workflows/versioning-promote.yml#L14). Entorno origen. Tipo `choice`. Obligatorio.
  - [to_env](../../../.github/workflows/versioning-promote.yml#L21). Entorno destino. Tipo `choice`. Obligatorio.
  - [semver](../../../.github/workflows/versioning-promote.yml#L28). Version semver (ej: 0.5.3). Tipo `string`. Obligatorio.
  - [notes](../../../.github/workflows/versioning-promote.yml#L32). Notas de promocion. Tipo `string`.

### `promote`

Job [promote](../../../.github/workflows/versioning-promote.yml#L38). Runner `ubuntu-latest`.

- [Checkout](../../../.github/workflows/versioning-promote.yml#L41). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Node](../../../.github/workflows/versioning-promote.yml#L44). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Install dependencies](../../../.github/workflows/versioning-promote.yml#L49). Instala las dependencias con el lockfile que corresponde a la revisión del job.
- [Promote release](../../../.github/workflows/versioning-promote.yml#L52). Registra el paso de una release al entorno solicitado. Ejecuta [promote-release.mjs](../../../tooling/versioning/promote-release.mjs).


## .github/workflows/versioning-record-deployment.yml

[Abrir fuente](../../../.github/workflows/versioning-record-deployment.yml) · 69 líneas de texto.

Registra el resultado de un despliegue en la plataforma de versionado. Útil si se necesita ingreso operativo separado de la entrega.

Disparadores: `workflow_dispatch`. [L3](../../../.github/workflows/versioning-record-deployment.yml#L3)

- [workflow_dispatch](../../../.github/workflows/versioning-record-deployment.yml#L4). Configura `inputs`.
  - [product](../../../.github/workflows/versioning-record-deployment.yml#L6). Producto. Tipo `choice`. Obligatorio.
  - [env](../../../.github/workflows/versioning-record-deployment.yml#L14). Entorno. Tipo `choice`. Obligatorio.
  - [semver](../../../.github/workflows/versioning-record-deployment.yml#L22). Version semver (ej: 0.5.3). Tipo `string`. Obligatorio.
  - [deployment_id](../../../.github/workflows/versioning-record-deployment.yml#L26). ID del deployment CI/CD. Tipo `string`. Obligatorio.
  - [status](../../../.github/workflows/versioning-record-deployment.yml#L30). Estado deployment. Tipo `choice`. Obligatorio.
  - [logs_url](../../../.github/workflows/versioning-record-deployment.yml#L37). URL logs (opcional). Tipo `string`.

### `record`

Job [record](../../../.github/workflows/versioning-record-deployment.yml#L43). Runner `ubuntu-latest`.

- [Checkout](../../../.github/workflows/versioning-record-deployment.yml#L46). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Node](../../../.github/workflows/versioning-record-deployment.yml#L49). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Install dependencies](../../../.github/workflows/versioning-record-deployment.yml#L54). Instala las dependencias con el lockfile que corresponde a la revisión del job.
- [Record deployment](../../../.github/workflows/versioning-record-deployment.yml#L57). Informa el estado final y el contexto de ejecución al registro operativo. Ejecuta [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs).


## .github/workflows/versioning-release-dev.yml

[Abrir fuente](../../../.github/workflows/versioning-release-dev.yml) · 578 líneas de texto.

Detecta diff, genera notas, aplica changeset, arma build, empaqueta artefacto, sube backup/registro y finaliza metadata en dev.

Disparadores: `workflow_dispatch`. [L3](../../../.github/workflows/versioning-release-dev.yml#L3)

- [workflow_dispatch](../../../.github/workflows/versioning-release-dev.yml#L4). Configura `inputs`.
  - [mode](../../../.github/workflows/versioning-release-dev.yml#L6). release | backfill_artifact. Tipo `string`.
  - [ref](../../../.github/workflows/versioning-release-dev.yml#L10). Branch/ref to release from (default: dev). Tipo `string`.
  - [release_id](../../../.github/workflows/versioning-release-dev.yml#L14). Required for backfill_artifact mode. Tipo `string`.
  - [source_commit_sha](../../../.github/workflows/versioning-release-dev.yml#L18). Optional commit SHA to checkout (used by backfill_artifact). Tipo `string`.
  - [base_ref](../../../.github/workflows/versioning-release-dev.yml#L22). Optional base commit/ref for changeset diff (default: HEAD~1). Tipo `string`.
  - [product_filter](../../../.github/workflows/versioning-release-dev.yml#L26). Optional product key filter (referidos_app | prelaunch_web | android_app). Tipo `string`.
  - [override_semver](../../../.github/workflows/versioning-release-dev.yml#L30). Optional semver override (X.Y.Z). Tipo `string`.
  - [release_notes](../../../.github/workflows/versioning-release-dev.yml#L34). Optional notes for this dev release. Tipo `string`.

### `release-dev`

Job [release-dev](../../../.github/workflows/versioning-release-dev.yml#L40). Runner `ubuntu-latest`.

- [Checkout](../../../.github/workflows/versioning-release-dev.yml#L43). Fija el código del job en la revisión indicada. Los pasos siguientes leen archivos de esa copia. Acción `actions/checkout@v4`.
- [Setup Node](../../../.github/workflows/versioning-release-dev.yml#L49). Prepara Node.js antes de instalar dependencias o ejecutar comandos de workspace. Acción `actions/setup-node@v4`.
- [Install dependencies](../../../.github/workflows/versioning-release-dev.yml#L54). Instala las dependencias con el lockfile que corresponde a la revisión del job.
- [Resolve effective base ref](../../../.github/workflows/versioning-release-dev.yml#L57). Ejecuta el comando o bloque definido para este paso del job. Identificador de outputs `base_ref`. Tiene condición propia.
- [Detect versioning changeset](../../../.github/workflows/versioning-release-dev.yml#L87). Calcula el changeset que alimenta revisión o versionado. Tiene condición propia. Ejecuta [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs).
- [Generate release notes auto](../../../.github/workflows/versioning-release-dev.yml#L99). Construye las notas que acompañan a la release. Identificador de outputs `release_notes`. Tiene condición propia.
- [Apply changeset and create dev release](../../../.github/workflows/versioning-release-dev.yml#L151). Materializa el changeset como revisión y release en OPS. Tiene condición propia. Ejecuta [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs).
- [Resolve release row for artifact](../../../.github/workflows/versioning-release-dev.yml#L173). Conecta el trabajo y el artefacto con la identidad de la release para mantener trazabilidad. Identificador de outputs `release_row`.
- [Resolve artifact build plan](../../../.github/workflows/versioning-release-dev.yml#L279). Conecta el trabajo y el artefacto con la identidad de la release para mantener trazabilidad. Identificador de outputs `artifact_plan`. Tiene condición propia.
- [Build release artifact](../../../.github/workflows/versioning-release-dev.yml#L307). Empaqueta, registra o traslada el contenido del build según el paso. Identificador de outputs `build_artifact`. Tiene condición propia.
- [Package release artifact](../../../.github/workflows/versioning-release-dev.yml#L331). Empaqueta, registra o traslada el contenido del build según el paso. Identificador de outputs `package_artifact`. Tiene condición propia.
- [Upload release backup artifact (GitHub)](../../../.github/workflows/versioning-release-dev.yml#L368). Empaqueta, registra o traslada el contenido del build según el paso. Acción `actions/upload-artifact@v4`. Identificador de outputs `upload_release_backup`. Tiene condición propia.
- [Upload release artifact to Supabase Storage](../../../.github/workflows/versioning-release-dev.yml#L378). Empaqueta, registra o traslada el contenido del build según el paso. Identificador de outputs `upload_storage`. Tiene condición propia.
- [Register artifact metadata in OPS](../../../.github/workflows/versioning-release-dev.yml#L456). Empaqueta, registra o traslada el contenido del build según el paso. Tiene condición propia.
- [Allocate build number for release](../../../.github/workflows/versioning-release-dev.yml#L534). Genera la salida del workspace o valida que pueda compilar. Tiene condición propia.
