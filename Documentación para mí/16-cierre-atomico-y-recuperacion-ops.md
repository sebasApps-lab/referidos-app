# Cierre atómico y recuperación de publicaciones en OPS

**Base revisada** `183f82c` en `fix/versioning-staging-safeguards`. Los cambios preparan la activación futura. Los registros históricos de OPS y los tres ZIP verificados conservan su evidencia. La política histórica de nueve releases elegibles y 66 bloqueadas sigue en vigor. [Cierre histórico](15-cierre-historico-y-seguridad-antes-de-staging.md)

## Auditoría del flujo anterior

| Punto | Escrituras y dependencias encontradas | Consecuencia |
| --- | --- | --- |
| Despacho | GitHub recibía el POST antes de `versioning_execute_deploy_request`. El RPC escribía la solicitud, el registro de despliegue y la auditoría. El control previo consultaba otros intentos sin reservar el destino. | Una respuesta o escritura perdida podía dejar un workflow sin intento registrado. Dos solicitudes podían pasar la comprobación previa. |
| Inicio del callback | La función comprobaba identidad, promoción y artefacto, y vinculaba el run mediante una actualización condicional de `version_deploy_requests.metadata`. | La vinculación era idempotente, pero dependía de que el despacho ya hubiera registrado la solicitud. |
| Cierre | Se guardaba el reporte de publicación y se llamaba por separado a `versioning_finalize_deploy_request` y `versioning_finalize_release_metadata`. El callback escribía el puntero del artefacto, la versión de configuración, la auditoría y la sincronización OBS en operaciones posteriores. | Podía quedar la solicitud con `success` mientras faltaban el puntero, la configuración o la auditoría del mismo intento. Una caída después de guardar el reporte carecía de reanudación automática. |
| Señales externas | El resultado de GitHub y el reporte del workflow aportaban evidencia, pero un callback perdido podía impedir que OPS conociera el resultado. El uploader y la sincronización OBS tenían efectos propios. | El estado global del workflow no bastaba para distinguir entre publicación, cierre oficial y telemetría pendiente. |

[Ejecutor](../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts) · [Callback](../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts) · [RPC originales](../apps/referidos-ops/supabase/migrations/20260302_000021_versioning_promoted_status.sql) · [Registro de configuración](../apps/referidos-ops/supabase/migrations/20260317_000033_versioning_build_events_and_env_config.sql)

## Flujo implementado

1. **Reserva y despacho.** `versioning_reserve_deploy_attempt` registra el intento y su único despliegue OPS antes del POST a GitHub. La reserva fija solicitud, release, SHA, destino Netlify y especificación de GitHub. Los índices y el bloqueo por destino impiden reservas incompatibles para el mismo entorno o sitio. Sólo una llamada puede reclamar el primer despacho. Si se pierde la respuesta, el intento conserva su identidad y se consulta GitHub por el run exacto antes de tomar decisiones.
2. **Inicio y preparación.** El callback conserva el vínculo con el run, tenant, release, artefacto y checksum exactos. El paso `prepared` verifica y guarda la configuración de runtime, sus bytes y el SHA-256 antes de autorizar Netlify. El permiso es de un solo uso. El destino verifica el Project ID y el sitio esperado. Los controles originales de procedencia, tenant, tamaño, SHA-256 y extracción siguen vigentes.
3. **Prueba de publicación.** El callback final guarda el resultado observado por el workflow como reporte. El reconciliador verifica la publicación por el sitio, el ID y el marcador del intento en la API de Netlify. Si falta el callback puede reconstruir esa prueba desde la preparación y el marcador. Netlify sólo recibe GET durante la recuperación. Si GitHub confirma que el run terminó antes de que OPS autorizara publicar, OPS puede cerrar el intento como no publicado. Una búsqueda vacía o incompleta sigue siendo incertidumbre.
4. **Cierre oficial.** `versioning_finalize_deploy_attempt` actualiza en una transacción la solicitud y su registro de despliegue original, metadatos de release, puntero del artefacto exacto, configuración y auditoría. Si la transacción falla se conserva la evidencia guardada en etapas anteriores. Una restricción diferida rechaza actualizaciones que dejen la solicitud durable en desacuerdo con su intento oficial.
5. **Recuperación.** Un worker autenticado reclama un lote mediante leases con vencimiento. Guarda el resultado de cada etapa, programa una espera progresiva y limita los reintentos. Puede completar el primer despacho de una reserva intacta y reanudar un cierre tras reinicio. No vuelve a publicar un intento. Si la evidencia sigue siendo insuficiente o un deploy externo sustituyó al observado, conserva el bloqueo.
6. **Operaciones secundarias.** La sincronización OBS se reintenta por separado después del cierre y su estado queda visible. El uploader comprueba el tenant antes de publicar, registra su resultado técnico y un fallo de carga de mapas no cambia el cierre oficial. El registro habitual de eventos OPS sigue respaldado por auditoría transaccional. Este flujo carece de un emisor independiente de notificaciones externas.

[Migración de intentos durables](../apps/referidos-ops/supabase/migrations/20261126_000044_versioning_durable_deploy_attempts.sql) · [Guardas SQL](../apps/referidos-ops/supabase/migrations/20261126_000045_versioning_require_staging_closure.sql) · [Worker](../apps/referidos-ops/supabase/functions/versioning-deploy-reconcile/index.ts) · [Workflow de artefactos](../.github/workflows/versioning-deploy-artifact.yml)

Referidos PWA 0.2.2 tiene dos releases históricas sin número de build registrado. Su configuración conserva el SHA de origen como identificador de build. El uploader y OBS usan el mismo identificador publicado aunque OPS asigne un número de catálogo durante el cierre.

### Decisiones de operación

| Evidencia | Qué permite |
| --- | --- |
| Reporte del workflow o publicación aún desconocida | Seguir consultando el intento. El destino sigue reservado. |
| Netlify verificó la publicación y OPS todavía está pendiente | Mostrar que el sitio publicó y reintentar el cierre del mismo intento. |
| Publicación y transacción oficial verificadas | Mostrar cierre completo. Emitir una referencia exacta para verificar un rollback. La promoción nueva a Production requiere el cierre oficial de la misma release de Staging y su artefacto vigente. |
| Registro histórico de éxito | Consultar el historial y volver a verificar el ZIP por el flujo vigente si corresponde. Las releases históricas ya promovidas pueden publicar con el nuevo contrato si conservan su elegibilidad. |

[Proyección del dashboard](../apps/referidos-app/src/admin/versioning/services/deploymentStatus.js) · [Activación, cron y reversión](../docs/versioning/ops-attempts-activation-and-recovery.md)

## Verificación

- Los tests Node cubren identidad y procedencia, respuesta perdida de GitHub, prueba exacta en Netlify, callbacks duplicados, presupuesto de reintentos y fallo independiente de OBS. Python comprueba los bytes y la extracción del ZIP. Las pruebas Edge ejecutan los handlers con dependencias simuladas y sin red.
- En PostgreSQL 18.1 local y aislado se aplicaron las 18 migraciones de versionado del repositorio. Las regresiones probaron reversión del cierre ante un fallo entre escrituras, intento oficial idempotente, expiración y recuperación de lease, bloqueo de una promoción sin cierre oficial y validación diferida de la proyección. Dos sesiones reales verificaron una espera de bloqueo y un solo ganador para la reserva del destino y para la autorización del despacho.
- El verificador histórico se volvió a ejecutar con los bytes y el snapshot locales. Conservó los resultados de 9 verificadas, 43 ZIP marcados como eliminados y 23 sin ZIP exacto vinculado. La evidencia privada permanece ignorada por Git.
- CI ejecuta las pruebas offline y repite la comprobación SQL en PostgreSQL 17, la versión de OPS. El PR es de revisión.

[Comandos de comprobación](../docs/versioning/ops-attempts-activation-and-recovery.md#comprobaciones-antes-de-activar) · [CI](../.github/workflows/ci-versioning.yml)

## Riesgos y recomendación

- El cierre SQL es atómico dentro de OPS. Netlify y GitHub conservan sus propios estados. Los despliegues externos, cambios de entorno o restauraciones manuales deben coordinarse para que no sustituyan al deploy entre la última observación y el cierre. Un deploy sustituido bloquea la conciliación automática del puntero.
- Cuando un envío queda ambiguo y se agota el presupuesto de lectura, el intento requiere revisión. La ausencia de evidencia no libera el destino. El runbook describe el acceso y las evidencias necesarias para autorizar una reparación.
- La recuperación automática de OBS cubre el registro de release en el runtime. Los sourcemaps faltantes se pueden reparar por separado con el ZIP exacto y el uploader. La publicación de Staging no valida simbolicación ni retención del entorno.
- La activación requiere revisar los permisos, el destino y las versiones de funciones alojadas. Todavía falta validar la respuesta real de Netlify y el rollback del sitio de Staging. La primera activación del worker se limita a Staging. El cron, los secretos y los servicios alojados quedan sujetos a una aprobación posterior.

**NO-GO para publicar en Staging en esta etapa.** Una vez revisado el PR, confirmar el contrato alojado en una ventana aprobada, el estado de migraciones y el deploy anterior saludable. La candidata sigue siendo **Prelaunch Web 0.3.4** con el ZIP verificado de Development. [Procedimiento de Staging y rollback](../docs/versioning/staging-rollout-and-rollback.md)
