# Validación en Staging y recuperación de una publicación

La primera prueba de publicación debe limitarse a **Prelaunch Web en Staging** y usar `0.3.4`. El sitio ya sirve esa versión. La prueba futura evaluaría el workflow protegido con el mismo ZIP y un intento nuevo.

**Decisión actual para la prueba** · **NO-GO**. Identificamos la candidata, el runtime y el deploy anterior mediante lecturas. Quedan pendientes el gate de Staging, los intentos de OPS, la coincidencia efectiva de credenciales y destino, el permiso de restauración, la congelación de vías de publicación y el GO separado de activación de OPS. [Activación de OPS](ops-attempts-activation-and-recovery.md)

## Candidata comprobada localmente

| Dato | Valor |
| --- | --- |
| Producto y destino | `prelaunch_web`, entorno `staging`, rama `staging`, sitio Netlify `testing-goplip` |
| Runtime esperado | `referidos-app-staging`, ref `iegjfeaadayfvqockwov` |
| Versión y SHA | `0.3.4` · `e9c64d1e94097fae92c28a89ea72732c970dfcce` |
| Release de Staging | `0783a235-e786-4bb9-8277-ae58801597fc` |
| Release propietaria del ZIP en Desarrollo | `0d1e110c-0241-46f8-bf45-5369dc820f43` |
| Promoción Desarrollo → Staging | `50761606-162b-4ea0-9f3f-bcc800e4a067` |
| Artefacto OPS | `340e76f4-a244-409d-8d90-1fd4934df751` |
| Huella y tamaño del ZIP | `d629839a29da70f0d411514f0f04bc37285c2975c8d81a57147add1276cd20c8` · 7 542 582 bytes |
| Ejecución histórica | Actions registró `success` para la ejecución `24310257510` con el mismo SHA. |
| Ascendencia en GitHub | La rama remota `staging` resolvía a `fa919a829b3997d84b591553cedda3c3f69d3558`. Su base común con la candidata es `e9c64d1e94097fae92c28a89ea72732c970dfcce`. |

El 26 de noviembre de 2026 se verificó el ZIP de OPS contra el registro y se extrajo localmente. La resolución por cadena de promoción y el callback con ID explícito pasaron. El callback histórico sin ese ID obtuvo `artifact_not_found`. El 27 de noviembre se repitió la comprobación SHA-256 sobre el ZIP local exacto. [Auditoría de compatibilidad](../../Documentación%20para%20mí/14-auditoria-compatibilidad-y-merge.md) · [Ejecución histórica](https://github.com/sebasApps-lab/referidos-app/actions/runs/24310257510) · [Ascendencia en GitHub](https://github.com/sebasApps-lab/referidos-app/compare/e9c64d1e94097fae92c28a89ea72732c970dfcce...fa919a829b3997d84b591553cedda3c3f69d3558)

### Deploy anterior observado el 27 de noviembre de 2026

- Entre las 13:10 y las 13:17, hora de Guayaquil, los GET públicos del sitio y de su configuración respondieron 200. La página referenciaba `app-config.js`. El archivo indicó `prelaunch`, `staging`, versión `0.3.4`, release `0783a235-e786-4bb9-8277-ae58801597fc`, artefacto `340e76f4-a244-409d-8d90-1fd4934df751` y host `iegjfeaadayfvqockwov.supabase.co`. Se cotejó la misma identidad contra el permalink. Su módulo JavaScript principal también respondió 200. Las huellas SHA-256 del HTML y del archivo de configuración son `97daa8d9f8567a36544d60a8ce6f8a184cfcb85eb8af728219c5902cf7b1c103` y `f737c96a55069f7e8efc4600138ee97d1a3b7e10ca7f0f59d26698e75fc0ba2b`. [Sitio público](https://testing-goplip.netlify.app/) · [Permalink del deploy](https://69dbbd2d02f842918d3dcc50--testing-goplip.netlify.app/)
- Netlify identificó el proyecto como `e1eccda0-9bda-4ff6-99af-807064edd9e5` y la publicación activa como `69dbbd2d02f842918d3dcc50`, estado `ready`, rama `staging` y título con versión y SHA exactos. La fecha del registro es `2026-04-12T15:41:40.562Z`. El campo `context=production` corresponde al dominio principal de este proyecto Staging. El inventario visible devolvió dos deploys en estado `ready` y ninguna página siguiente. [Detalle del deploy](https://app.netlify.com/projects/testing-goplip/deploys/69dbbd2d02f842918d3dcc50)
- Este es el candidato a restaurar. La prueba de salud observada cubre disponibilidad HTTP e identidad de configuración. Falta la verificación funcional de referencia y confirmar que el operador tiene permiso efectivo para **Publish Deploy** sobre ese ID. El inventario de Netlify es una observación puntual. La ausencia de intentos en OPS y la capacidad de congelar publicadores requieren verificación propia.

## Verificaciones previas

| Comprobación | Evidencia que debe quedar registrada |
| --- | --- |
| Revisión del workflow | SHA del código de control del deploy, distinto del SHA de la release. En la revisión de GitHub, el workflow figura activo en la rama por defecto `main`. Las ramas `dev`, `staging` y `main` aún carecían del paso `prepared`. La rama de revisión lo incluye. Confirmar que la ref efectiva configurada en OPS apunta al SHA autorizado y que sus funciones y RPC corresponden a esa revisión. |
| Solicitud y gate | ID de la solicitud autorizada para `prelaunch_web/staging/0.3.4`, aprobación registrada, release de Staging exacta y ancestro de la rama destino. Revisar las migraciones requeridas en el runtime de Staging antes de autorizar la operación. Si hay pendientes, detener esta prueba y revisar el cambio de esquema en su propio procedimiento. |
| Inventario de OPS | Artefacto exacto, bucket privado, tamaño y SHA-256. Recuperar una copia de verificación y ejecutar el verificador local. Si ha desaparecido o cambiaron sus bytes, detener la prueba. |
| Identidad y estado anterior de Netlify | Cotejar `e1eccda0-9bda-4ff6-99af-807064edd9e5` con `NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING` efectivo en OPS y GitHub. Repetir `GET /api/v1/sites/{siteId}` y lectura del deploy exacto inmediatamente antes de la ventana. Conservar el `published_deploy.id` actual y su permalink, más una comprobación funcional de referencia. Guardar de forma privada las huellas de archivos y los campos de identidad, omitiendo claves. |
| Runtime y observabilidad de Staging | `VITE_SUPABASE_URL_STAGING` debe identificar `iegjfeaadayfvqockwov.supabase.co` y la clave publicable debe corresponder a ese proyecto. La URL de observabilidad apunta al mismo runtime por defecto. Si existe un proyecto OBS dedicado e intencional, confirmar su ref e introducirla en la variable de GitHub `VERSIONING_OBS_PROJECT_REF_STAGING`. El equivalente de producción es `VERSIONING_OBS_PROJECT_REF_PROD`, fuera de esta prueba. |
| Tenant de observabilidad | Corroborar que `OBS_TENANT_ID_STAGING` y `OBS_TENANT_NAME_STAGING` identifican la misma fila activa en el proyecto OBS seleccionado. Comprobar que la credencial de observabilidad de Staging tiene acceso al bucket privado y al registro de releases. |
| Identidad del control plane | En el workflow de deploy, `SUPABASE_URL` y `SUPABASE_SECRET_KEY` identifican OPS. Revisar que `VERSIONING_DEPLOY_CALLBACK_TOKEN` se comparte entre ese workflow y el callback de OPS, y que el token GitHub de OPS permite despachar el workflow autorizado. El token de Netlify debe permitir la consulta y publicación del sitio de Staging. Verificar los permisos sin registrar los valores de los tokens. |
| Intentos y concurrencia | Consultar la exportación de OPS para solicitudes anteriores, intentos durables y leases. Confirmar que GitHub no tenga runs en cola o activos para ese destino, y que Netlify carezca de builds o publicaciones en curso. Mantener congelados los accesos alternos al sitio hasta el cierre y la última verificación. |
| Capacidad de recuperar | El operador responsable debe confirmar su permiso de recrear la publicación mediante **Publish Deploy** en este proyecto. Comprueba el acceso al detalle de `69dbbd2d02f842918d3dcc50` y el rol efectivo. Mientras ese deploy esté activo, el control de restauración puede no aparecer en su ficha. Puede verificarse el permiso en la configuración del proyecto o en la ficha de otro deploy histórico del mismo sitio, sin ejecutar la acción. Si cambia el deploy activo, volver a evaluar qué ID constituye el rollback saludable. |

Los valores de los secrets y el estado activo de GitHub, Netlify y Supabase requieren verificación con una sesión autorizada. Los nombres de variables del repositorio sólo describen el cableado esperado. La combinación de un sitio con ID distinto, un proyecto equivocado, un tenant diferente, un gate pendiente, un ZIP no verificable o la ausencia del deploy de recuperación bloquea la prueba. [Contrato de variables y secrets](../../versioning/env.contract.json) · [Workflow de publicación](../../.github/workflows/versioning-deploy-artifact.yml)

Los nombres de los secrets de repositorio esperados para Prelaunch Staging están registrados en GitHub. La comprobación de nombres no abre los valores ni acredita que sean válidos o efectivos. Para cerrar el preflight faltan impresiones filtradas del operador de OPS/Runtime y confirmación del operador de Netlify con el permiso de restauración. [Contrato de variables y secrets](../../versioning/env.contract.json)

### Comprobar el gate sin escribir en OPS

1. Ejecutar el preflight de solo lectura en OPS y comparar `candidate_runtime_gate_preflight` con la identidad exacta de la candidata. Confirmar que `gate_would_select_candidate` sea verdadero. El resultado incluye `source_changeset_id` y únicamente las versiones requeridas por el gate, derivadas de `version_changeset_items.changed_paths`. Si falta el changeset o su procedencia, conservar el gate pendiente hasta confirmar que la ausencia sea legítima. [Preflight de OPS](../../tooling/versioning/sql/ops-durable-preflight.sql)
2. En el runtime `iegjfeaadayfvqockwov`, exportar sólo `supabase_migrations.schema_migrations.version` mediante lectura autorizada. Comparar las versiones requeridas con las aplicadas y registrar las faltantes. El árbol Git del SHA sirve para cotejar el origen de los archivos.
3. Durante esta revisión, usar el cotejo de sólo lectura. La operación alojada `check_release_migrations` escribe una fila de auditoría en OPS al responder correctamente. En una futura ventana autorizada, el gate formal debe devolver la misma release, `runtime_project_ref=iegjfeaadayfvqockwov` y una lista vacía de faltantes. [Implementación del gate](../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts)

## Prueba local sin servicios externos

La CI usa Node.js 22, Python 3.12 y la versión de Deno del lockfile. El runner hace checkout y prepara las dependencias con los scripts de instalación desactivados. Las pruebas usan archivos sintéticos y sustituyen las llamadas a servicios. El test de la función Edge usa un import map local y se ejecuta sin permiso de red. Las suites prescinden de credenciales de despliegue y conexiones a OPS o Netlify.

```bash
npm ci --ignore-scripts --workspaces=false --omit=dev --no-audit --no-fund
node --test tooling/versioning/*.test.mjs tooling/observability/upload-sourcemaps.test.mjs
for test_file in tooling/versioning/test-*.py; do
  python -B "$test_file"
done
DENO_NO_UPDATE_CHECK=1 node node_modules/deno/bin.cjs test \
  --no-config --no-lock --no-remote --no-npm --no-check \
  --import-map=tooling/versioning/deploy-callback-integration/imports.json \
  --allow-env=VERSIONING_DEPLOY_CALLBACK_TOKEN,OBS_RELEASE_SYNC_TOKEN,OBS_RELEASE_SYNC_URL_STAGING,OBS_RELEASE_SYNC_TENANT_HINT \
  tooling/versioning/deploy-callback-integration/handler_test.ts
```

Para repetir la comprobación histórica, usar el export autorizado y los ZIP ya descargados en una carpeta fuera de Git. El auditor devuelve código 2 cuando hay registros bloqueados, incluso si la candidata seleccionada pasa. Confirmar el resultado de su fila exacta.

```bash
node tooling/versioning/audit-historical-releases.mjs \
  --snapshot "$OPS_SNAPSHOT" --evidence "$STORAGE_EVIDENCE" --archives "$PRIVATE_ZIPS"

python -B tooling/versioning/prepare-release-artifact.py \
  --archive "$CANDIDATE_ZIP" --output "$NEW_TEST_DIR" \
  --checksum d629839a29da70f0d411514f0f04bc37285c2975c8d81a57147add1276cd20c8 \
  --size 7542582
```

Pasar la ejecución offline antes de pedir la comprobación alojada. [CI](../../.github/workflows/ci-versioning.yml) · [Auditor histórico](../../tooling/versioning/audit-historical-releases.mjs) · [Verificador de ZIP](../../tooling/versioning/prepare-release-artifact.py)

| Fallo simulado | Comprobación esperada |
| --- | --- |
| Sitio, proyecto Supabase o tenant equivocado | El proceso se detiene antes de publicar, con un error que identifica la validación fallida. |
| ZIP ausente, checksum o tamaño incorrectos | No se prepara un directorio para publicar con esos bytes. |
| Identidad o evento de callback repetido | El mismo intento conserva su identidad y su resultado. Un evento tardío no rebaja un resultado terminal confirmado. |
| La publicación ocurre y el callback falla | Se conserva evidencia del deploy y queda pendiente el cierre OPS. La repetición de una consulta de estado no vuelve a publicar. |
| Netlify devuelve error tras invocar el comando | Si la consulta confirma el ID activo exacto, se conserva el resultado publicado con el error del workflow por separado. Si la evidencia sigue incompleta, OPS retiene el intento como `not_confirmed`. |
| Netlify devuelve `429` o `503` al consultar | El verificador reintenta el GET dentro de su límite. Una lectura posterior puede confirmar el mismo ID sin volver a invocar la publicación. |
| Candidato para limpieza de Storage | El plan es de solo lectura. La prueba de Staging preserva los ZIP que hagan falta para revisar o recuperar el despliegue anterior. |

## Criterios de una única publicación alojada

1. Registrar el deploy publicado previo y la identidad de la candidata. Solicitar y aprobar en el flujo habitual de OPS sólo para `prelaunch_web/staging`. Conservar ID de solicitud y ejecución de GitHub. La opción `--prod` de Netlify se refiere al deploy publicado del sitio ya seleccionado, que en esta prueba es exclusivamente `testing-goplip`.
2. El workflow valida el proyecto Supabase, tenant, identidad del sitio, commit, promoción y ZIP antes de publicar. El callback síncrono `started` debe confirmar el intento exacto y `prepared` otorgar un permiso de publicación de un solo uso. La ausencia de cualquiera de los dos acuses detiene la publicación. Los sourcemaps van al almacenamiento de observabilidad designado. El árbol público debe tener los archivos previstos de la versión sin publicar los mapas de fuentes.
3. La ejecución debe devolver el ID del nuevo deploy. La consulta a Netlify debe confirmar ese mismo ID como `published_deploy`, en estado `ready` y no borrador. Ante latencia de Netlify, consultar de nuevo el estado mediante GET. Conservar la URL de la ejecución y el ID de publicación para contrastarlos con el callback.
4. En una sesión nueva, abrir la URL de Staging y verificar la versión y el SHA, el ZIP esperado y el hostname Supabase de `app-config.js`. Probar la página principal, una navegación propia de Prelaunch y una recarga en una ruta directa. Comprobar que una URL de sourcemap conocida carece del contenido del mapa, incluso si el router devuelve HTML de fallback. Confirmar que OPS cerró el intento correcto con el mismo ID de deploy y consultar de nuevo qué ID sirve Netlify antes de levantar la congelación.
5. Si Netlify publica y el cierre OPS falla, preservar la evidencia de ambos estados, revisar su correlación y conciliar antes de autorizar otra publicación. El estado `not_confirmed` mantiene bloqueado el reintento de la solicitud mientras se aclara el resultado remoto. Consultar el deploy activo y la ejecución original antes de retirar ese bloqueo mediante el procedimiento autorizado. Un error previo al comando de publicación se estudia con los logs del mismo intento.

La lectura `operation: "reconciliation"` de `versioning-deploy-execute` toma `request_id` y devuelve la publicación observada, el estado del registro y el intento enlazado. Se usa con la sesión autorizada y la identidad de la solicitud. Si falta la evidencia de cierre, comparar el resumen del run original con Netlify, incluyendo el Project ID, el deploy ID y la configuración publicada. Conservar el motivo de bloqueo. Cualquier reparación que escriba en OPS necesita autorización propia. [Consulta de conciliación](../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts)

Mantener Producción fuera de esta comprobación. La decisión sobre su publicación requiere una revisión separada de la evidencia de Staging.

### Si Netlify cambia durante el cierre

El reconciliador compara de nuevo el deploy activo justo antes del cierre oficial. Si Netlify identifica otro deploy, OPS conserva la prueba histórica de que el intento publicó y bloquea su conciliación como publicación vigente. Si la lectura no es concluyente, se conserva el bloqueo y se vuelve a consultar. Queda una ventana entre esa última lectura y la confirmación en PostgreSQL porque los dos servicios no participan en una misma transacción. Para reducirla en una futura prueba, congelar auto-publicación, hooks, ejecuciones manuales y restauraciones que afecten al sitio. Si se observa otro ID al releer tras el commit, detener la ventana y evaluar el incidente con ambos IDs y el intento original. [Código de conciliación](../../apps/referidos-ops/supabase/functions/_shared/deploy-reconciliation.mjs)

Un bloqueo de auto-publicación puede permitir que Netlify construya un deploy sin servirlo en el dominio principal. Si ese control está activo en la ventana autorizada, comprobar si necesita una publicación explícita por el operador designado. El estado `ready` de un build por sí solo no equivale a `published_deploy`. [Bloqueo de deploys de Netlify](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#locked-deploys)

## Recuperación de Staging

1. Si la futura prueba publicada falla, cotejar el deploy previo guardado en esa ventana con la referencia inicial `69dbbd2d02f842918d3dcc50` y el Project ID `e1eccda0-9bda-4ff6-99af-807064edd9e5`. Confirmar estado `ready`, permalink, configuración y salud funcional. Mantener la congelación del sitio y confirmar la autorización de restauración antes de actuar.
2. En el proyecto Netlify de Staging, abrir el deploy previo exacto y elegir **Publish Deploy**. Netlify vuelve a servir ese deploy existente. Un deploy de otro sitio o un valor de versión sin ID verificable dejan la recuperación bloqueada. [Rollback de Netlify](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#rollbacks)
3. Leer otra vez el sitio para confirmar que el ID anterior está publicado y listo. Verificar las URLs, el hostname Supabase, la huella de configuración y las mismas rutas funcionales establecidas antes de la prueba. Al volver a un deploy histórico se recuperan todos sus archivos, incluidos sourcemaps si estaban presentes. Registrar ese resultado y escalar su corrección según la política del proyecto.
4. Registrar en el incidente el intento fallido, el ID restaurado y las comprobaciones posteriores. Conciliar el estado de OPS con la evidencia de Netlify mediante el procedimiento autorizado, conservando el rastro del intento. La recuperación del frontend afecta al deploy de Netlify. Los cambios de esquema o datos de Supabase tienen su propio procedimiento.
