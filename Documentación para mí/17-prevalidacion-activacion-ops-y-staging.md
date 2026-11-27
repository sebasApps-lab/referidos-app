# Prevalidación de activación de OPS y prueba de Staging

Revisión del 27 de noviembre de 2026 en `fix/versioning-staging-safeguards`, sobre el commit revisado `50cf546`. El [PR #42](https://github.com/sebasApps-lab/referidos-app/pull/42) ejecuta validaciones de código y PostgreSQL desechable. La rama y el PR usan `[skip netlify]` para omitir publicaciones automáticas de revisión. [Documentación de Netlify](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#skip-a-deploy)

## Correcciones de esta revisión

| Hallazgo | Resolución |
| --- | --- |
| El detector leía el formato de texto de Git con nombres entrecomillados y escapes octales para los acentos. La ruta de Markdown no coincidía con las reglas del mapa. | Leer `git diff --name-status -z` y conservar las rutas UTF-8. Se mantienen los controles estrictos y el tratamiento de renombres y copias. El detector aplicado al diff original del PR reportó cero archivos sin clasificar. |
| Las migraciones 000044 y 000045 compartían el identificador que usa el ledger de Supabase. La prueba basada sólo en nombres de archivo no detectaba la colisión. | Conservar 000044 con versión `20261126` y registrar 000045 con versión `20261127`. CI comprueba la unicidad de los prefijos del proyecto. Los dos archivos dejan la transacción exterior al aplicador, de modo que Supabase pueda registrar el SQL y el ledger juntos. El runner aislado aplica cada cambio nuevo en una transacción. |
| El deploy activo de Netlify podía cambiar después de obtener evidencia y mientras OPS verificaba el artefacto. | Volver a leer el sitio y el ID activo justo antes del RPC oficial. Si cambió, conservar la publicación original y bloquear el cierre como `netlify_deploy_superseded`. Si la lectura falla, aplazar el cierre con reintentos limitados. La ventana entre servicios se controla suspendiendo otras publicaciones del sitio. |
| La API de Netlify omitió `draft` en el deploy activo observado. | Admitir la omisión sólo con evidencia positiva de publicación en el contexto activo del sitio esperado, estado `ready` y fecha de publicación válida. Una vista previa, `draft: true` o una fecha ausente carecen de esa evidencia. |

[Detector](../tooling/versioning/shared.mjs) · [Prueba de PostgreSQL](../tooling/versioning/run-ops-postgres-tests.mjs) · [Reconciliador](../apps/referidos-ops/supabase/functions/_shared/deploy-reconciliation.mjs) · [Versiones de migración en Supabase](https://supabase.com/docs/guides/deployment/branching/troubleshooting#semi)

## Evidencia disponible

| Comprobación | Resultado |
| --- | --- |
| Candidata y ZIP | Prelaunch Web `0.3.4`, release Staging `0783a235-e786-4bb9-8277-ae58801597fc`, artefacto original Development `340e76f4-a244-409d-8d90-1fd4934df751`. La extracción y la huella del ZIP local de 7 542 582 bytes están verificadas. |
| Rama remota | El SHA de la candidata `e9c64d1e94097fae92c28a89ea72732c970dfcce` es ancestro de `staging` en `fa919a829b3997d84b591553cedda3c3f69d3558`. |
| Sitio y runtime visibles | El `app-config.js` público de `testing-goplip` respondió HTTP 200 y mostró `prelaunch/staging`, versión `0.3.4`, la release y artefacto esperados, el SHA exacto y el runtime `iegjfeaadayfvqockwov.supabase.co`. Se consultaron únicamente los campos de identidad. |
| Workflow y configuración en GitHub | El workflow manual de despliegue está registrado como activo. La rama de revisión contiene el paso `prepared`. Las referencias remotas `dev`, `staging` y `main` todavía carecen de ese contrato. Se verificó la presencia de los nombres de configuración de OPS, Netlify, runtime y tenant de Staging en los secretos del repositorio. |
| Publicación anterior para rollback | La API de Netlify reportó `testing-goplip`, Project ID `e1eccda0-9bda-4ff6-99af-807064edd9e5`, con el deploy activo `69dbbd2d02f842918d3dcc50` en estado `ready`. La URL del deploy consultada mostró la misma identidad pública y el sitio respondió HTTP 200. El run histórico `24310257510` terminó con éxito para el SHA de la candidata. Queda pendiente confirmar el permiso de restauración y repetir las lecturas inmediatamente antes de la prueba. |
| Publicaciones concurrentes observables | GitHub reportó cero ejecuciones `queued`, `in_progress`, `waiting`, `pending` y `requested` del workflow de artefactos. Netlify no mostró deploys activos en curso en el inventario del sitio observado. Faltan los conteos de OPS y la confirmación de exclusividad en la futura ventana. |
| Esquema y actividad alojados | Pendientes el historial aplicado de OPS y del runtime, las definiciones y permisos efectivos, los intentos y funciones activos, y la accesibilidad actual del ZIP desde Storage. |

[Comparación de GitHub](https://github.com/sebasApps-lab/referidos-app/compare/e9c64d1e94097fae92c28a89ea72732c970dfcce...fa919a829b3997d84b591553cedda3c3f69d3558) · [Run histórico](https://github.com/sebasApps-lab/referidos-app/actions/runs/24310257510) · [Sitio público de Staging](https://testing-goplip.netlify.app/)

## Decisión y evidencia para desbloquearla

| Paso | Decisión | Evidencia o autorización necesaria |
| --- | --- | --- |
| Activación de OPS | **NO-GO** | Un operador autorizado exporta el preflight de sólo lectura de OPS, confirma versiones de funciones y referencias efectivas, verifica que las ejecuciones anteriores estén drenadas y aprueba una ventana con respaldo y restauración ensayada. La guarda de promociones de 000045 afecta a OPS global y requiere aprobación explícita por su impacto futuro en Production. |
| Cron Staging | **NO-GO** | Validar la revisión de la función, limitarla a `staging`, verificar el token separado y decidir si `pg_net` es aceptable según quién pueda conectarse a la base. Preparar monitoreo de estado y cola sin valores sensibles. |
| Prueba de publicación en Staging | **NO-GO** | Tras activar OPS, comprobar por lectura el gate del runtime, el ZIP actual, que no haya publicaciones simultáneas y que el deploy previo siga activo en el sitio exacto. Un operador Netlify debe confirmar que puede restaurar ese ID. La ejecución requiere una autorización separada. |

Para la revisión pueden usarse exportaciones de solo lectura, resultados filtrados o capturas del operador autorizado. Los encabezados de autenticación, tokens, claves de API y payloads de runtime quedan fuera de los informes. [Revisión de migraciones](../docs/versioning/ops-durable-migration-review.md) · [Preflight de OPS](../tooling/versioning/sql/ops-durable-preflight.sql) · [Activación y reversión](../docs/versioning/ops-attempts-activation-and-recovery.md) · [Staging y rollback](../docs/versioning/staging-rollout-and-rollback.md)
