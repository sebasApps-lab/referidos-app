# Revisión de compatibilidad de las migraciones de OPS

## Evidencia local y estado alojado

| Comprobación | Resultado |
| --- | --- |
| Orden en Supabase CLI | El commit `50cf546` usaba `20261126` como prefijo de ambos archivos. Supabase compara ese prefijo con la versión única del historial. La guarda `000045` ahora usa `20261127`. El runner de CI rechaza cualquier versión repetida entre las migraciones SQL de OPS. |
| Atomicidad de instalación | Las migraciones nuevas delegan la transacción al aplicador para que el cambio de esquema y su registro puedan confirmarse juntos. El runner las aplica por orden de archivo con `psql --single-transaction` y `ON_ERROR_STOP=1`. |
| Compatibilidad de esquema | PostgreSQL 18.1 aislado aplicó las 18 migraciones de versionado y ejecutó las regresiones SQL y las dos pruebas de concurrencia con sesiones distintas. El preflight de solo lectura se ejecutó en el mismo runner antes y después de las migraciones nuevas. |
| Proyecto alojado de OPS | Pendiente cotejar los objetos, el historial y las solicitudes del proyecto efectivo. La prueba local usa los roles y las interfaces mínimas de Supabase en un fixture. |

[Historial y orden en Supabase](https://supabase.com/docs/guides/deployment/database-migrations) · [Transacciones de migración](https://supabase.com/kb/troubleshooting/partial-migrations-and-schema-inconsistencies-from-embedded-transactions-13ae82) · [Regresión PostgreSQL](../../tooling/versioning/run-ops-postgres-tests.mjs)

## Efecto sobre los datos y los clientes anteriores

| Área | Comportamiento |
| --- | --- |
| Instalación | `000044` suma una tabla, índices, RLS y funciones. `000045` añade dos triggers. Ninguna de las dos migraciones hace backfill, reescribe las filas existentes ni programa el cron. El DDL requiere bloqueos en las tablas a las que se agregan las referencias y los triggers. |
| Concurrencia y cierre | Un bloqueo transaccional por destino y sitio, los índices únicos parciales y la exclusividad por solicitud impiden reservas simultáneas. El cierre durable escribe solicitud, despliegue, release, artefacto, config y auditoría en una transacción. La proyección SQL se verifica mediante un trigger diferido. |
| Autorización | `service_role` tiene lectura de intentos y ejecuta únicamente las RPC durables de servicio. Las funciones internas de mirroring y los triggers no son ejecutables por los roles de la API. `anon` y `authenticated` carecen de lectura de la tabla y de ejecución de RPC durables. |
| Reintentos | La reserva repite el resultado para la misma solicitud. El callback conserva su unión exacta. Una preparación duplicada no vuelve a conceder el permiso de publicar. Los leases de recuperación se reclaman de forma exclusiva. El DDL se aplica una vez a través de su historial. |
| Solicitudes anteriores | Las filas legadas conservan su estado y pueden cerrar por su contrato anterior durante la ventana de compatibilidad. Una solicitud que sigue en `started` o con conciliación ilegible bloquea la activación hasta cotejar su ejecución y el estado del sitio. Las solicitudes pendientes y aprobadas necesitan inventario y suspensión operativa durante la transición. |
| Releases ya existentes | La elegibilidad y la identidad de los nueve registros históricos comprobados siguen vinculadas al registro histórico. El éxito legado no acredita el nuevo cierre oficial. La guarda afecta a futuras promociones web hacia Production y exige que la release exacta de Staging tenga cierre oficial con el artefacto vigente. |
| RPC anteriores | El camino durable reutiliza las RPC de ejecución, finalización, numeración y registro de config con sus firmas existentes. Los clientes legados mantienen sus funciones. Una llamada antigua que intente cerrar una solicitud durable con una proyección inconsistente queda rechazada al confirmar la transacción. |

[Migración de intentos](../../apps/referidos-ops/supabase/migrations/20261126_000044_versioning_durable_deploy_attempts.sql) · [Migración de guardas](../../apps/referidos-ops/supabase/migrations/20261127_000045_versioning_require_staging_closure.sql) · [Auditoría histórica](../../Documentaci%C3%B3n%20para%20m%C3%AD/15-cierre-historico-y-seguridad-antes-de-staging.md)

## Cotejo en el proyecto real

1. Un operador autorizado ejecuta [el SQL de preflight](../../tooling/versioning/sql/ops-durable-preflight.sql) en OPS con una sesión de lectura que vea todas las filas relevantes. El script usa una única captura consistente en modo `READ ONLY` y RLS provoca un error si impediría ver el inventario completo. Compartir el resultado de catálogos, los conteos y las comprobaciones booleanas. No hace falta compartir una credencial, las definiciones completas de RPC ni el contenido de `metadata`.
2. Comparar las versiones del historial con los archivos de OPS y los objetos presentes. Antes de una primera instalación deben faltar la tabla durable, sus RPC y ambos triggers. Una versión registrada sin sus objetos, un objeto durable sin su versión o una versión pendiente adicional requieren una revisión separada. Cotejar las firmas, retornos e identidad de las RPC legadas y el índice de destino del artefacto. Comparar las huellas de definiciones contra una base de referencia de la misma versión PostgreSQL si hay indicios de divergencia.
3. Revisar `blocking_requests`, `orphan_started_deployments` y `durable_attempt_counts` junto al inventario de Actions y Netlify. Un conteo cero corresponde al momento de la captura. Un error, una relación ilegible o un entorno ausente dejan el resultado pendiente.
4. Confirmar las cuatro comprobaciones de `candidate_registry_preflight` y `gate_would_select_candidate`. Comparar `required_versions` de `candidate_runtime_gate_preflight` con el historial del runtime de Staging. Esa lista reproduce la selección del gate sin invocar su endpoint, que también escribe una auditoría. `no_changeset` identifica una release sin changeset asociado y `release_missing_or_mismatched` deja el gate pendiente. Cotejar por separado los bytes del ZIP, el destino, la actividad del sitio y el deploy restaurable. Mantener autorizaciones de lectura y de restauración separadas.
5. Tras una futura instalación autorizada, volver a ejecutar el preflight. Confirmar las versiones `20261126` y `20261127`, ambos triggers activos, la guarda de cierre diferida, la tabla con RLS y las RPC durables restringidas al rol de servicio. Continuar con el orden coordinado del runbook.

## Reversión conservadora

1. Suspender nuevos despachos y el cron. Mantener disponibles la lectura y los callbacks que necesitan los intentos ya iniciados.
2. Cotejar las reservas abiertas, el run originario y el estado activo en Netlify. Conservar en OPS los casos ambiguos y sus bloqueos. Restaurar versiones compatibles de funciones y workflow únicamente después de comprobar que los intentos que seguirán escribiendo pueden cerrar por su contrato.
3. Conservar la tabla de intentos, sus filas y el historial de migraciones. Una reversión del esquema requiere un cambio SQL explícito y una evaluación independiente de dependencias y datos. Evitar reparar el historial o retirar objetos como parte del rollback operativo.

[Orden de activación, cron y rollback](ops-attempts-activation-and-recovery.md) · [Candidata de Staging y recuperación](staging-rollout-and-rollback.md)
