# Validación en Staging y recuperación de una publicación

La primera comprobación alojada debe limitarse a **Prelaunch Web en Staging**. Conviene usar una republicación de la versión conocida `0.3.4` para comparar el resultado del workflow protegido con una publicación previa del mismo código. Este documento registra la evidencia de preparación. Quedan pendientes la lectura actual de Netlify y la prueba alojada con autorización expresa.

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
| Evidencia anterior de Staging | La auditoría registró `0.3.4` en el sitio de Staging y una publicación exitosa asociada a la ejecución 24310257510. |

El 26 de noviembre de 2026 se pudo verificar el ZIP descargado de OPS contra el registro y extraerlo localmente. La resolución por la cadena de promoción y el callback con el ID explícito del artefacto pasaron. El callback histórico sin ese ID obtuvo `artifact_not_found`. Este resultado identifica los bytes de la candidata. El identificador del deploy activo debe confirmarse en Netlify antes de intervenir. [Auditoría de compatibilidad](../../Documentación%20para%20mí/14-auditoria-compatibilidad-y-merge.md) · [Mapa de entornos y evidencia de despliegues](../../Documentación%20para%20mí/12-guia-de-releases-dev-staging-produccion.md#mapa-de-supabase-y-netlify) · [Ejecución histórica](https://github.com/sebasApps-lab/referidos-app/actions/runs/24310257510)

## Verificaciones previas

| Comprobación | Evidencia que debe quedar registrada |
| --- | --- |
| Revisión del workflow | SHA del código de control del deploy, distinto del SHA de la release que se va a publicar. Confirmar que OPS despacharía la revisión prevista mediante `VERSIONING_DEPLOY_WORKFLOW` y `VERSIONING_DEPLOY_WORKFLOW_REF`. Verificar también la versión de las funciones OPS y los RPC que requiere el cierre. |
| Solicitud y gate | ID de la solicitud autorizada para `prelaunch_web/staging/0.3.4`, aprobación registrada, release de Staging exacta y ancestro de la rama destino. Revisar las migraciones requeridas en el runtime de Staging antes de autorizar la operación. Si hay pendientes, detener esta prueba y revisar el cambio de esquema en su propio procedimiento. |
| Inventario de OPS | Artefacto exacto, bucket privado, tamaño y SHA-256. Recuperar una copia de verificación y ejecutar el verificador local. Si ha desaparecido o cambiaron sus bytes, detener la prueba. |
| Identidad y estado anterior de Netlify | Un operador autorizado debe consultar `GET /api/v1/sites/{siteId}`. Confirmar que el ID devuelto coincide con el configurado en `NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING` y que el nombre es `testing-goplip`. Guardar el `published_deploy.id` listo y su URL, y comprobar que se puede volver a publicar ese mismo deploy. Guardar de forma privada la huella de los archivos públicos de comprobación y los campos de identidad de `app-config.js` sin copiar claves. |
| Runtime y observabilidad de Staging | `VITE_SUPABASE_URL_STAGING` debe identificar `iegjfeaadayfvqockwov.supabase.co` y la clave publicable debe corresponder a ese proyecto. La URL de observabilidad apunta al mismo runtime por defecto. Si existe un proyecto OBS dedicado e intencional, confirmar su ref e introducirla en la variable de GitHub `VERSIONING_OBS_PROJECT_REF_STAGING`. El equivalente de producción es `VERSIONING_OBS_PROJECT_REF_PROD`, fuera de esta prueba. |
| Tenant de observabilidad | Corroborar que `OBS_TENANT_ID_STAGING` y `OBS_TENANT_NAME_STAGING` identifican la misma fila activa en el proyecto OBS seleccionado. Comprobar que la credencial de observabilidad de Staging tiene acceso al bucket privado y al registro de releases. |
| Identidad del control plane | En el workflow de deploy, `SUPABASE_URL` y `SUPABASE_SECRET_KEY` identifican OPS. Revisar que `VERSIONING_DEPLOY_CALLBACK_TOKEN` se comparte entre ese workflow y el callback de OPS, y que el token GitHub de OPS permite despachar el workflow autorizado. El token de Netlify debe permitir la consulta y publicación del sitio de Staging. Verificar los permisos sin registrar los valores de los tokens. |
| Capacidad de recuperar | Verificar con el operador que la publicación previa sigue disponible, que su permiso permite recuperarla y que el sitio no puede ser sobrescrito durante la ventana por un auto-deploy u otro operador. |

Los valores de los secrets y el estado activo de GitHub, Netlify y Supabase requieren verificación con una sesión autorizada. Los nombres de variables del repositorio sólo describen el cableado esperado. La combinación de un sitio con ID distinto, un proyecto equivocado, un tenant diferente, un gate pendiente, un ZIP no verificable o la ausencia del deploy de recuperación bloquea la prueba. [Contrato de variables y secrets](../../versioning/env.contract.json) · [Workflow de publicación](../../.github/workflows/versioning-deploy-artifact.yml)

La copia local de la referencia `origin/staging` registraba `baefd2b` y no contenía el SHA de la candidata al revisar este runbook. Comprueba la rama de GitHub antes de evaluar la relación de ancestro. La auditoría local tampoco confirma el historial de migraciones, los permisos de restauración ni el deploy que está publicado ahora.

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
2. El workflow valida el proyecto Supabase, tenant, identidad del sitio, commit, promoción y ZIP antes de publicar. El callback síncrono `started` debe confirmar el registro del intento con su ID de ejecución y el ID exacto del artefacto. Si ese paso falla, la publicación queda detenida. Los sourcemaps van al almacenamiento de observabilidad designado. El árbol público debe tener los archivos previstos de la versión sin publicar los mapas de fuentes.
3. La ejecución debe devolver el ID del nuevo deploy. La consulta a Netlify debe confirmar ese mismo ID como `published_deploy`, en estado `ready` y no borrador. Ante latencia de Netlify, consultar de nuevo el estado mediante GET. Conservar la URL de la ejecución y el ID de publicación para contrastarlos con el callback.
4. En una sesión nueva, abrir la URL de Staging y verificar la versión y el SHA, el ZIP esperado y el hostname Supabase de `app-config.js`. Probar la página principal, una navegación propia de Prelaunch y una recarga en una ruta directa. Comprobar que una URL de sourcemap conocida carece del contenido del mapa, incluso si el router devuelve HTML de fallback. Confirmar que OPS cerró el intento correcto con el mismo ID de deploy.
5. Si Netlify publica y el cierre OPS falla, preservar la evidencia de ambos estados, revisar su correlación y conciliar antes de autorizar otra publicación. El estado `not_confirmed` mantiene bloqueado el reintento de la solicitud mientras se aclara el resultado remoto. Consultar el deploy activo y la ejecución original antes de retirar ese bloqueo mediante el procedimiento autorizado. Un error previo al comando de publicación se estudia con los logs del mismo intento.

La lectura `operation: "reconciliation"` de `versioning-deploy-execute` toma `request_id` y devuelve la publicación observada, el estado del registro y el intento enlazado. Se usa con la sesión autorizada y la identidad de la solicitud. Si falta la evidencia de cierre, comparar el resumen del run original con Netlify, incluyendo el Project ID, el deploy ID y la configuración publicada. Conservar el motivo de bloqueo. Cualquier reparación que escriba en OPS necesita autorización propia. [Consulta de conciliación](../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts)

Mantener Producción fuera de esta comprobación. La decisión sobre su publicación requiere una revisión separada de la evidencia de Staging.

## Recuperación de Staging

1. Si la prueba publicada falla, identificar el último deploy confirmado como saludable y cotejarlo con el ID previo guardado para `testing-goplip`. Verificar la autorización de recuperación y detener publicaciones concurrentes mediante la coordinación operativa acordada.
2. En el proyecto Netlify de Staging, abrir el deploy previo exacto y elegir **Publish Deploy**. Netlify vuelve a servir ese deploy existente. Un deploy de otro sitio o un valor de versión sin ID verificable dejan la recuperación bloqueada. [Rollback de Netlify](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#rollbacks)
3. Leer otra vez el sitio para confirmar que el ID anterior está publicado y listo. Verificar las URLs, el hostname Supabase, la huella de configuración y las mismas rutas funcionales establecidas antes de la prueba. Al volver a un deploy histórico se recuperan todos sus archivos, incluidos sourcemaps si estaban presentes. Registrar ese resultado y escalar su corrección según la política del proyecto.
4. Registrar en el incidente el intento fallido, el ID restaurado y las comprobaciones posteriores. Conciliar el estado de OPS con la evidencia de Netlify mediante el procedimiento autorizado, conservando el rastro del intento. La recuperación del frontend afecta al deploy de Netlify. Los cambios de esquema o datos de Supabase tienen su propio procedimiento.
