# Activación y recuperación de intentos de publicación en OPS

Este procedimiento prepara la activación de `durable_v1` en el proyecto **Referidos OPS**. La primera prueba de publicación corresponde a Prelaunch en Staging. La migración, el cambio de funciones, el ajuste de GitHub y la publicación siguen sujetos a autorización. [Prueba de Staging y recuperación del sitio](staging-rollout-and-rollback.md)

**Decisión actual de activación de OPS** · **NO-GO**. El ensayo local de las migraciones permite revisarlas, pero falta cotejar el inventario alojado, la versión de las funciones activas, los permisos y las operaciones en curso. OPS es compartido. El filtro `staging` limita el cron y el reconciliador. La migración lógica `000045` aplica la guarda a nuevas promociones de Production y el ejecutor durable atiende Staging y Production. Aplicar esos cambios a OPS compartido requiere una decisión explícita sobre ese impacto. Una prueba que exija aislar completamente Production necesita un OPS aislado o un cambio de alcance revisado.

## Comprobaciones antes de activar

- Ejecuta los checks **Versioning offline** y **Versioning PostgreSQL**. El segundo levanta PostgreSQL 17, aplica el historial real de migraciones de versionado a una base desechable y ejecuta las regresiones SQL. El fixture aporta los roles de Supabase y las interfaces mínimas de Auth y Storage. [CI de versionado](../../.github/workflows/ci-versioning.yml) · [Configuración de OPS](../../apps/referidos-ops/supabase/config.toml) · [Runner de regresión](../../tooling/versioning/run-ops-postgres-tests.mjs)
- Identifica los SHA que se desplegarán para el workflow de GitHub y las funciones Edge de OPS. Conserva las referencias anteriores y verifica el respaldo de la base de OPS. Registra las solicitudes abiertas, su estado en Actions, cualquier publicación activa confirmada en Netlify y, para Staging, el deploy que serviría como recuperación.
- Acuerda una ventana sin nuevas solicitudes de publicación. Si existen ejecuciones previas, espera su cierre o verifica su resultado mediante las lecturas autorizadas de GitHub, Netlify y OPS. Una ejecución sin resultado confirmado mantiene la activación bloqueada hasta que se haya clasificado.
- Comprueba los destinos y los permisos sin exponer secretos. GitHub usa el token de callback de OPS y las credenciales de cada entorno. El reconciliador de OPS necesita `VERSIONING_DEPLOY_RECONCILE_TOKEN`, `NETLIFY_AUTH_TOKEN` para consultar la evidencia y la configuración de GitHub de OPS para las reservas que todavía no han sido despachadas. La sincronización de observabilidad usa la configuración OPS del runtime de destino. [Contrato de configuración](../../versioning/env.contract.json) · [Función de conciliación](../../apps/referidos-ops/supabase/functions/versioning-deploy-reconcile/index.ts)

| Evidencia a consultar | Quién puede proporcionarla |
| --- | --- |
| Inventario SQL de Referidos OPS (`ymhaveuksdzlfuecvkmx`), historial de migraciones, RPC, índices, triggers, grants, extensiones y operaciones abiertas. Inventario de versiones o identificadores de despliegue de `versioning-deploy-execute`, `versioning-deploy-callback` y, si existe, `versioning-deploy-reconcile`. | Operador de Supabase OPS con acceso a catálogo y metadatos. Exportar únicamente el resultado de lectura. Confirmar la procedencia del código Edge con el registro de despliegue, ya que el número de versión por sí solo no identifica el SHA. |
| Workflow `versioning-deploy-artifact.yml`, rama por defecto, ref efectiva `VERSIONING_DEPLOY_WORKFLOW_REF` y el commit exacto que resuelve. Permisos efectivos de la identidad GitHub que usa OPS. | GitHub con lectura de Contents y Actions, y confirmación del administrador de que la identidad configurada puede despachar el workflow aprobado. Para secretos, revisar sólo nombres, alcance y coincidencia atestiguada por el custodio. |
| Callback efectivo de OPS en `https://ymhaveuksdzlfuecvkmx.supabase.co/functions/v1/versioning-deploy-callback`, coincidencia del token entre Edge y Actions y origen de `SUPABASE_URL`. | Custodio de configuración de OPS y GitHub. Basta la confirmación de coincidencia. |
| `NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING` efectivo en OPS y GitHub, `NETLIFY_AUTH_TOKEN` de OPS con acceso de lectura al sitio y credencial de Actions con permiso de publicar en ese mismo sitio. | Custodio de Netlify/GitHub/OPS. Entregar el ID de proyecto y evidencia de permisos o coincidencia. Mantener las credenciales en sus almacenes. |
| `VERSIONING_RUNTIME_URL_STAGING` o su fallback `OBS_RELEASE_SYNC_URL_STAGING`, ref `iegjfeaadayfvqockwov`, versión del `obs-release-sync`, y alcance del proxy y de su token compartido. | Operador del runtime Staging y custodio de OPS. Confirmar metadatos y configuración seleccionada, sin registrar valores de claves. |

Registrar para cada verificación el origen, entorno, hora, identidad efectiva y resultado. Un nombre de secret presente confirma que existe una entrada. Su valor, alcance y permisos requieren corroboración separada.

Con una instancia local separada en un puerto distinto de 5432 se puede ejecutar la misma prueba SQL. Por ejemplo, con el clúster local aislado disponible en 55439:

```powershell
$env:VERSIONING_TEST_POSTGRES_PORT = '55439'
$env:VERSIONING_TEST_PSQL = 'C:\Program Files\PostgreSQL\18\bin\psql.exe'
node tooling/versioning/run-ops-postgres-tests.mjs
```

## Orden de activación

1. **Suspende y drena.** Designa un operador para `testing-goplip` y confirma con todos los operadores el cierre temporal de entradas del panel OPS, lanzamientos manuales de Actions, reejecuciones, hooks, auto-publicación de Netlify y restauraciones manuales de ese sitio. Si se requiere cambiar una integración o pausar técnicamente una automatización, autoriza esa acción y su alcance antes de la ventana. Deshabilitar globalmente el workflow compartido también afecta a Production. Espera a que las ejecuciones lanzadas terminen y concílialas con sus callbacks existentes. Comparar OPS, ejecuciones en cola o activas de GitHub y deploys activos o en cola de Netlify inmediatamente antes del corte. Un intento ambiguo, o una entrada de publicación que no se pueda congelar, detiene el corte.
2. **Aplica el esquema de OPS.** Con el proyecto y el historial alojados cotejados, confirmar el respaldo y aplicar `20261126_000044` seguida de `20261127_000045` únicamente en el destino aprobado. Si quedan otras migraciones pendientes, identifica el lote y revísalo por separado. Verifica el historial y que la tabla, RPC y guardas nuevos existen, que las mutaciones corresponden a la identidad de servicio y que las solicitudes previas siguen consultables. El runtime de Staging mantiene su esquema. [Intentos durables](../../apps/referidos-ops/supabase/migrations/20261126_000044_versioning_durable_deploy_attempts.sql) · [Guarda de promoción](../../apps/referidos-ops/supabase/migrations/20261127_000045_versioning_require_staging_closure.sql)

   La comprobación de historial incluye `20260415` con su nombre y los 20 fragmentos originales. El preflight comprueba la huella ordenada y devuelve los permisos efectivos de DLQ. Una ausencia o discrepancia suspende la activación. La versión aparece en el directorio ejecutable como guarda y el SQL original se conserva fuera de ese directorio. Si el lote autorizado incluye la corrección de DLQ `20261128_000046`, aplícala después de `000045` y completa sus comprobaciones antes de actualizar las funciones. [Evidencia y guarda de 000043](ops-000043-history-recovery.md) · [Validación de 000046](ops-000046-dlq-validation.md)
3. **Actualiza los receptores antes del emisor.** En OPS, activa primero el callback compatible con la fase durable y con el historial. En el runtime Staging autorizado, activa `obs-release-sync` de la misma revisión. Después publica `versioning-deploy-reconcile` en OPS con alcance Staging y sin invocaciones programadas. Comprueba identidad de los despliegues sin fabricar callbacks ni iniciar intentos. El endpoint del worker usa `x-versioning-reconcile-token` y un token independiente del callback. [Callback](../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts) · [Sincronización OBS](../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts) · [Configuración Edge](../../apps/referidos-ops/supabase/config.toml)
4. **Fija workflow y emisor.** Verifica que la rama por defecto reconoce `versioning-deploy-artifact.yml`, y que la ref efectiva de despacho resuelve el SHA autorizado del workflow. Conserva el registro de la ref y SHA anteriores. La ref de ejecución del workflow y la rama destino cuya ascendencia se comprueba son dos valores distintos. Con el despacho todavía suspendido, activa `versioning-deploy-execute` de esa misma revisión. Comprueba el contrato de reserva, acuse de `started` y permiso explícito de `prepared`. [Ejecutor](../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts) · [Workflow y guardas](../../.github/workflows/versioning-deploy-artifact.yml)
5. **Autoriza la programación por separado.** Verifica el alcance `staging` y que el inventario de ese entorno sigue vacío. Instala el cron inactivo, si la programación está autorizada, y vuelve a confirmar el alcance, token separado y trazabilidad. Activa el job sólo después de autorizar ese paso. Valida un tick con cero intentos y comprueba que responde 200. El reconciliador puede despachar la primera ejecución de una reserva existente, por lo que el inventario vacío es condición del tick.
6. **Separa el GO de Staging.** Cerrar estas comprobaciones valida la activación de OPS. Mantén suspendidas las publicaciones hasta la autorización de una única prueba `prelaunch_web/staging`. Durante la prueba conservar el ID de solicitud, `execution_id`, run de Actions, artefacto, Project ID de Netlify y deploy activo. [Prueba de Staging y rollback](staging-rollout-and-rollback.md)

La promoción nueva hacia Producción exige un cierre durable de la release de Staging correspondiente. Un despliegue histórico registrado como exitoso puede conservarse para consulta. Si carece de cierre durable, no sirve para cumplir la guarda de una promoción nueva.

## Lectura del estado y recuperación

La operación `reconciliation` del ejecutor consulta una solicitud y reporta su estado sin volver a despachar. `official_close` indica si el núcleo de OPS terminó y `rollback_reference` sólo se emite para un intento durable que cerró con publicación verificada. Antes de usar esa referencia hay que cotejar el destino y el deploy con Netlify. La función separada de conciliación puede escribir en OPS y recuperar el **primer** despacho de una reserva pendiente. El endpoint reclama únicamente el entorno de la invocación, siempre que esté autorizado por `VERSIONING_DEPLOY_RECONCILE_ENVS`. Por defecto acepta Staging. Antes de invocarlo para la prueba, confirma con una lectura autorizada que los intentos de Staging corresponden a la ventana aprobada.

### Programación futura en OPS

Las migraciones dejan la programación fuera del cambio de esquema. Después de autorización, verificar `pg_cron`, `pg_net` y Vault, y la visibilidad del historial de ejecución. OPS debe tener únicamente roles de conexión directa aptos para leer temporalmente los headers en la cola de `pg_net`. Vault protege el valor en reposo, y `pg_net` materializa el token durante el envío. Si existen roles de conexión no confiables, el cron con ese token queda en **NO-GO** y se debe revisar un programador autorizado que no use esa cola. [Supabase Cron y Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions) · [Visibilidad de la cola de pg_net](https://supabase.com/kb/troubleshooting/database-roles-can-read-request-headers-queued-by-pg_net-ad6357)

El custodio configura `ops_deploy_reconcile_token` en Vault y confirma que coincide con `VERSIONING_DEPLOY_RECONCILE_TOKEN` de la función y que es distinto de `VERSIONING_DEPLOY_CALLBACK_TOKEN`. Usar el endpoint HTTPS fijo del OPS verificado y confirmar `VERSIONING_DEPLOY_RECONCILE_ENVS=staging`. La siguiente preparación queda pendiente de autorización y deja el job inactivo dentro de la misma transacción.

```sql
BEGIN;
DO $check$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'versioning-deploy-reconcile-staging') THEN
    RAISE EXCEPTION 'deploy_reconcile_job_already_exists';
  END IF;
END;
$check$;
SELECT cron.schedule('versioning-deploy-reconcile-staging', '* * * * *', $job$
  DO $tick$
  DECLARE
    token_value text;
    request_id bigint;
  BEGIN
    SELECT decrypted_secret INTO STRICT token_value
    FROM vault.decrypted_secrets
    WHERE name = 'ops_deploy_reconcile_token';

    IF coalesce(length(btrim(token_value)), 0) = 0 THEN
      RAISE EXCEPTION 'deploy_reconcile_token_unavailable';
    END IF;

    request_id := net.http_post(
      url := 'https://ymhaveuksdzlfuecvkmx.supabase.co/functions/v1/versioning-deploy-reconcile',
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-versioning-reconcile-token', token_value),
      body := '{"env_key":"staging"}'::jsonb,
      timeout_milliseconds := 60000
    );
    RAISE LOG 'versioning_reconcile_staging_request_id %', request_id;
  END;
  $tick$;
$job$);
SELECT cron.alter_job(jobid, active := false)
FROM cron.job WHERE jobname = 'versioning-deploy-reconcile-staging';
COMMIT;
```

Un futuro `cron.alter_job(..., active := true)` requiere que el operador confirme el ID y el único job de Staging de la ventana aprobada. Monitorear el historial del job y correlacionar el `request_id` registrado con sólo `id`, `status_code`, `timed_out` y `created` en `net._http_response`, más el resultado filtrado de la función en los logs de Edge. El éxito SQL de cron significa que se encoló el HTTP. La respuesta del worker y el estado del intento se verifican aparte. Alertar a un operador ante HTTP 401/403, fallos HTTP sostenidos, intentos estancados o un presupuesto agotado. El worker toma hasta tres intentos por lote con lease de 90 segundos y un máximo de 12 reclamaciones por fase. Las esperas del cierre crecen hasta 30 minutos y un estado sin evidencia conserva su bloqueo. [Respuestas de pg_net](https://supabase.com/docs/guides/database/extensions/pg_net#analyzing-responses) · [Código de conciliación](../../apps/referidos-ops/supabase/functions/_shared/deploy-reconciliation.mjs)

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

1. Si falla el cambio, suspende las entradas de publicación y pausa sólo el cron autorizado de Staging mediante `cron.alter_job(job_id, active := false)`. Conserva la definición del job, el estado del sitio, los callbacks de ambos protocolos y la lectura de OPS. Comprueba si quedaron llamadas HTTP en curso y espera la expiración de cualquier lease relevante.
2. Captura el inventario de intentos durables abiertos, sus fases, el run GitHub y la publicación activa por sitio. Cierra los que se puedan verificar con el protocolo compatible y conserva los bloqueos de los ambiguos. Rehabilitar el emisor antiguo con intentos durables abiertos puede crear publicaciones incompatibles.
3. Si hay que volver al código anterior, y sólo después de resolver o aislar los intentos abiertos, restaura la ref del workflow y el ejecutor previos con el despacho todavía suspendido. Mantén disponible el callback compatible hasta drenar cualquier ejecución que pueda enviarle eventos. Conserva las migraciones y las filas como evidencia. Una reversión del esquema o de la guarda de promoción necesita un plan y permiso independientes.
4. Si Staging llegó a publicar una versión problemática, elige con autorización el deploy saludable anterior del mismo sitio y aplica el procedimiento de Netlify. Documenta la restauración y conserva el intento original. Reabrir las entradas sólo después de verificar de nuevo el Project ID, estado activo, configuración, permisos y ausencia de intentos que dejarían el destino inconsistente. [Recuperación de Staging](staging-rollout-and-rollback.md#recuperación-de-staging)
