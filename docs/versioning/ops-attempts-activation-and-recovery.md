# Activación y recuperación de intentos de publicación en OPS

Este procedimiento prepara la activación de `durable_v1` en el proyecto **Referidos OPS**. La primera prueba de publicación corresponde a Prelaunch en Staging. La migración, el cambio de funciones, el ajuste de GitHub y la publicación siguen sujetos a autorización. [Prueba de Staging y recuperación del sitio](staging-rollout-and-rollback.md)

## Comprobaciones antes de activar

- Ejecuta los checks **Versioning offline** y **Versioning PostgreSQL**. El segundo levanta PostgreSQL 17, aplica el historial real de migraciones de versionado a una base desechable y ejecuta las regresiones SQL. El fixture aporta los roles de Supabase y las interfaces mínimas de Auth y Storage. [CI de versionado](../../.github/workflows/ci-versioning.yml) · [Configuración de OPS](../../apps/referidos-ops/supabase/config.toml) · [Runner de regresión](../../tooling/versioning/run-ops-postgres-tests.mjs)
- Identifica los SHA que se desplegarán para el workflow de GitHub y las funciones Edge de OPS. Conserva las referencias anteriores y verifica el respaldo de la base de OPS. Registra las solicitudes abiertas, su estado en Actions, cualquier publicación activa confirmada en Netlify y, para Staging, el deploy que serviría como recuperación.
- Acuerda una ventana sin nuevas solicitudes de publicación. Si existen ejecuciones previas, espera su cierre o verifica su resultado mediante las lecturas autorizadas de GitHub, Netlify y OPS. Una ejecución sin resultado confirmado mantiene la activación bloqueada hasta que se haya clasificado.
- Comprueba los destinos y los permisos sin exponer secretos. GitHub usa el token de callback de OPS y las credenciales de cada entorno. El reconciliador de OPS necesita `VERSIONING_DEPLOY_RECONCILE_TOKEN`, `NETLIFY_AUTH_TOKEN` para consultar la evidencia y la configuración de GitHub de OPS para las reservas que todavía no han sido despachadas. La sincronización de observabilidad usa la configuración OPS del runtime de destino. [Contrato de configuración](../../versioning/env.contract.json) · [Función de conciliación](../../apps/referidos-ops/supabase/functions/versioning-deploy-reconcile/index.ts)

Con una instancia local separada en un puerto distinto de 5432 se puede ejecutar la misma prueba SQL. Por ejemplo, con el clúster local aislado disponible en 55439:

```powershell
$env:VERSIONING_TEST_POSTGRES_PORT = '55439'
$env:VERSIONING_TEST_PSQL = 'C:\Program Files\PostgreSQL\18\bin\psql.exe'
node tooling/versioning/run-ops-postgres-tests.mjs
```

## Orden de activación

1. Con la ventana de cambios abierta y sin nuevos despachos, confirma el proyecto y el historial de migraciones de **OPS**. Revisa el plan y aplica `20261126_000044` seguida de `20261126_000045` mediante el procedimiento aprobado de ese proyecto. Si quedan otras migraciones pendientes, identifica el lote y revísalo antes de aplicar. La prueba de Staging no requiere modificar el esquema o los datos del runtime de aplicación. [Intentos durables](../../apps/referidos-ops/supabase/migrations/20261126_000044_versioning_durable_deploy_attempts.sql) · [Guarda de promoción](../../apps/referidos-ops/supabase/migrations/20261126_000045_versioning_require_staging_closure.sql)
2. Verifica que la tabla `version_deploy_attempts` y sus funciones están presentes, que los permisos de mutación corresponden al rol de servicio y que las solicitudes previas siguen consultables. Mantén el historial anterior disponible para comprobar operaciones iniciadas antes del cambio.
3. Publica las funciones Edge de la misma revisión en OPS con el despacho aún suspendido. Publica también `obs-release-sync` en el runtime de Staging dentro de esa ventana aprobada. El callback debe reconocer intentos históricos y el protocolo durable. El reconciliador comprueba que el runtime OBS confirmó el mismo intento y artefacto. Mantén el reconciliador sin invocaciones hasta que el workflow y el ejecutor compatibles estén activos. Su endpoint acepta POST mediante `x-versioning-reconcile-token` y usa un token propio. [Ejecutor](../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts) · [Callback](../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts) · [Sincronización OBS](../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts) · [Configuración Edge](../../apps/referidos-ops/supabase/config.toml)
4. Verifica que `VERSIONING_DEPLOY_WORKFLOW_REF` apunta al workflow compatible. El workflow debe enlazar la reserva con solicitud, ejecución de GitHub, release y artefacto exactos. Debe recibir el acuse de `started` y después el permiso explícito de `prepared` antes de invocar Netlify. Si falta cualquiera, mantener cerrado el despacho de la prueba. [Workflow y guardas](../../.github/workflows/versioning-deploy-artifact.yml)
5. Configura únicamente el alcance `staging` del reconciliador, verifica que sólo pueda reclamar intentos de ese entorno y activa el cron descrito más abajo cuando se autorice. El despacho usa en OPS los mismos Project ID que el workflow ya tiene en GitHub. Configura únicamente los destinos aprobados para esta prueba.
6. Habilita una única prueba autorizada en Staging. Guarda el ID de solicitud, `execution_id`, run de Actions, artefacto, Project ID de Netlify y deploy activo. Comprueba que OPS, GitHub y Netlify describen el mismo intento. Una reparación de observabilidad se evalúa después de confirmar la publicación y el cierre principal.

La promoción nueva hacia Producción exige un cierre durable de la release de Staging correspondiente. Un despliegue histórico registrado como exitoso puede conservarse para consulta. Si carece de cierre durable, no sirve para cumplir la guarda de una promoción nueva.

## Lectura del estado y recuperación

La operación `reconciliation` del ejecutor consulta una solicitud y reporta su estado sin volver a despachar. `official_close` indica si el núcleo de OPS terminó y `rollback_reference` sólo se emite para un intento durable que cerró con publicación verificada. Antes de usar esa referencia hay que cotejar el destino y el deploy con Netlify. La función separada de conciliación puede escribir en OPS y recuperar el **primer** despacho de una reserva pendiente. El endpoint reclama únicamente el entorno de la invocación, siempre que esté autorizado por `VERSIONING_DEPLOY_RECONCILE_ENVS`. Por defecto acepta Staging. Antes de invocarlo para la prueba, confirma con una lectura autorizada que los intentos de Staging corresponden a la ventana aprobada.

### Programación futura en OPS

Las migraciones no registran ni activan un cron. Después de autorización, verificar que OPS disponga de `pg_cron`, `pg_net` y Vault, y que se pueda inspeccionar el resultado del cron sin mostrar valores sensibles. Registrar en Vault la URL HTTPS exacta de la función de OPS con el nombre `ops_deploy_reconcile_url` y el token dedicado con el nombre `ops_deploy_reconcile_token`. El token de la función debe tener el mismo valor y ser distinto del token de callback.

```sql
SELECT cron.schedule('versioning-deploy-reconcile-staging', '* * * * *', $job$
  SELECT net.http_post(
    url := settings.url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-versioning-reconcile-token', settings.token),
    body := '{"env_key":"staging"}'::jsonb,
    timeout_milliseconds := 60000
  )
  FROM (
    SELECT
      (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'ops_deploy_reconcile_url') AS url,
      (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'ops_deploy_reconcile_token') AS token
  ) AS settings
  WHERE settings.url IS NOT NULL AND settings.token IS NOT NULL
$job$);
```

Confirmar que cada tick devuelve `ok` y revisar los intentos cuyo contador agotó el presupuesto. Una caída de red o la ausencia de un resultado en GitHub y Netlify se conserva como evidencia insuficiente. El bloqueo se mantiene para investigación. [Supabase Cron y Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions)

| Evidencia | Acción del operador |
| --- | --- |
| Reserva sin despacho | Confirmar el workflow y el destino de la reserva. La conciliación puede recuperar el primer despacho. |
| Despacho `unknown` o callback sin resultado | Consultar la ejecución original de GitHub y el estado de Netlify. Conservar la reserva y su bloqueo para evitar un segundo despacho. |
| `not_published` confirmado | Verificar la evidencia del fallo previo a publicación y cerrar el intento por el flujo autorizado. La decisión de iniciar otra solicitud es independiente del cierre anterior. |
| `not_confirmed` | Mantener bloqueados el intento y el destino hasta contar con una prueba de Netlify para la ejecución original. Preservar la evidencia disponible y la razón de conciliación. |
| `published` con conciliación OPS pendiente o incompleta | Confirmar el Project ID y el deploy exacto en Netlify. Permitir que la conciliación valide la evidencia y cierre el intento existente. No repetir la publicación. |
| Publicación cerrada con sincronización de observabilidad pendiente | Comprobar el snapshot técnico y sus credenciales del destino. Recuperar la sincronización de observabilidad por el reconciliador. |

El mismo intento debe conservar sus identificadores ante eventos duplicados, retrasos y fallos de registro. El workflow rechaza las repeticiones de una ejecución de Actions. Para recuperar un intento, conserva el run original y usa la conciliación autorizada. Deja trazabilidad de las consultas a GitHub y Netlify, los resultados de conciliación y la identidad del operador. [Código de conciliación](../../apps/referidos-ops/supabase/functions/_shared/deploy-reconciliation.mjs)

## Reversión de la activación

1. Si falla el cambio, suspende nuevos despachos y la programación futura con `SELECT cron.unschedule('versioning-deploy-reconcile-staging');` si estaba habilitada. Conserva el estado del sitio y de OPS, la lectura y los callbacks necesarios para los intentos que ya se iniciaron.
2. Registra los intentos durables abiertos y verifica la publicación activa por sitio. Reconcilia o preserva con su bloqueo los casos ambiguos. Un workflow anterior puede desconocer las reservas durables y no se debe volver a habilitar mientras quede alguna sin resolver.
3. Si hay que restaurar código, verifica que la revisión anterior de las funciones y del workflow sea compatible con las solicitudes existentes. Mantén la migración y sus filas como evidencia. Una reversión del esquema exige evaluación y autorización propias.
4. Si la aplicación de Staging publicó una versión problemática, restaura el deploy previo exacto de **ese mismo sitio** con el procedimiento de Netlify. Verifica su Project ID, deploy publicado, configuración de runtime y comportamiento. Registra la restauración junto al intento original. [Recuperación de Staging](staging-rollout-and-rollback.md#recuperación-de-staging)
