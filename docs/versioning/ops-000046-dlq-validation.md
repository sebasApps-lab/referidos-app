# Validación de OPS 000046

`20261128` restaura el trigger `trg_ops_telemetry_ingest_dlq_purge_groups_sync` sobre la DLQ de metadatos. Las inserciones actualizan recuentos y tamaños con las funciones de `000043`. Los cambios y borrados también recalculan las fechas extremas cuando retiran un extremo de un grupo que sigue existiendo.

La reconstrucción modifica únicamente `ops_telemetry_ingest_dlq_purge_groups`. El migrador bloquea las escrituras en la DLQ y su proyección durante una sola transacción. Los agregados correctos conservan su `updated_at`. Las claves ambiguas y los bloqueos que excedan cinco segundos abortan la transacción. El SQL deja intactas las filas de DLQ y la entrada de historial `20260415`.

La RPC de detalle conserva su firma y respuesta de metadatos. Sólo cambia su ACL. Se retira `EXECUTE` a `PUBLIC`, `anon` y `authenticated` y se mantiene el permiso explícito de `service_role`. El proxy administrativo sigue comprobando el JWT y el perfil de admin antes de consultar OPS con su cliente de servidor.

El runner `node tooling/versioning/run-ops-postgres-tests.mjs` comprueba en PostgreSQL la compatibilidad con `000044` y `000045`, el rollback de una reconstrucción ambigua, la reaplicación idempotente, las escrituras concurrentes en un mismo grupo y los permisos efectivos. Dos transacciones que muevan eventos entre grupos en sentidos opuestos pueden producir un interbloqueo. PostgreSQL cancela una de ellas y preserva la consistencia. [CI de versionado](../../.github/workflows/ci-versioning.yml)

## Comprobación en OPS después de autorizar la ventana

1. Confirma que el proyecto es **Referidos OPS** y ejecuta el preflight de solo lectura. `history_000043` debe validar nombre, huella ordenada y 20 fragmentos. En `dlq_000043_catalog` deben estar las 13 columnas de metadatos, las dos columnas de tamaños de la proyección y la RPC de detalle debe devolver metadatos. Revisa el plan local y remoto. Si quedan pendientes las tres versiones, el orden previsto es `20261126`, `20261127`, `20261128`. Detén la ventana si falta `20260415` o aparece otra discrepancia. [Preflight](../../tooling/versioning/sql/ops-durable-preflight.sql) · [Historial de 000043](ops-000043-history-recovery.md)
2. Ejecuta la consulta de abajo antes y después. Antes, `ambiguous_keys` debe ser cero. Las diferencias de proyección anteriores a la corrección quedan como evidencia. Después, los tres contadores de la consulta deben ser cero. La consulta exporta únicamente contadores.
3. Cuando la aplicación de `000046` esté autorizada, usa el migrador de Supabase sobre OPS. Ante un error de bloqueo, espera una ventana con menos actividad y repite las verificaciones previas. Ante claves ambiguas o permisos heredados inesperados, conserva el error y detén la aplicación para revisar su origen.
4. Repite el preflight. Confirma `aggregate_trigger_enabled = true` y, sólo para `ops_telemetry_ingest_dlq_events_for_next_purge(text,integer,integer)`, `public_execute = false`, `anon_execute = false`, `authenticated_execute = false` y `service_role_execute = true`. Desde el panel con una cuenta admin, abre el detalle de la DLQ y registra el estado de respuesta y si coincide con el agregado. Una lista vacía es válida si no hay eventos previstos. [Proxy administrativo](../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts)

```sql
BEGIN READ ONLY;

WITH expected AS (
  SELECT
    public.ops_telemetry_ingest_dlq_purge_bucket_date(d.expires_at) AS purge_bucket_date,
    public.ops_telemetry_ingest_dlq_group_key(
      d.source_project_ref, d.source_env_key, d.domain, d.reason
    ) AS group_key,
    d.source_project_ref, d.source_env_key, d.domain, d.reason,
    count(*) AS event_count,
    sum(greatest(d.raw_event_size_bytes, 0)) AS total_raw_event_size_bytes,
    sum(greatest(d.payload_size_bytes, 0)) AS total_payload_size_bytes,
    min(d.created_at) AS first_created_at, max(d.created_at) AS last_created_at,
    min(d.expires_at) AS first_expires_at, max(d.expires_at) AS last_expires_at
  FROM public.ops_telemetry_ingest_dlq d
  GROUP BY 1, 2, 3, 4, 5, 6
), actual AS (
  SELECT purge_bucket_date, group_key, source_project_ref, source_env_key, domain, reason,
    event_count, total_raw_event_size_bytes, total_payload_size_bytes,
    first_created_at, last_created_at, first_expires_at, last_expires_at
  FROM public.ops_telemetry_ingest_dlq_purge_groups
)
SELECT
  (SELECT count(*) FROM (
    SELECT purge_bucket_date, group_key FROM expected GROUP BY 1, 2 HAVING count(*) > 1
  ) ambiguous) AS ambiguous_keys,
  (SELECT count(*) FROM (SELECT * FROM expected EXCEPT SELECT * FROM actual) diff)
    AS missing_or_outdated_groups,
  (SELECT count(*) FROM (SELECT * FROM actual EXCEPT SELECT * FROM expected) diff)
    AS unexpected_or_outdated_groups;

ROLLBACK;
```

Si la transacción falla, PostgreSQL revierte el trigger, la proyección y la ACL juntos. Si la validación falla después del commit, conserva la revocación de la RPC y prepara una corrección posterior revisada. La guarda y el archivo histórico de `000043` deben conservarse. [Migración 000046](../../apps/referidos-ops/supabase/migrations/20261128_000046_ops_telemetry_dlq_aggregate_and_rpc_security.sql)
