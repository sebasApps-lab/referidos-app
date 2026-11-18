# SQL de Supabase por archivo y objeto

Este índice documenta 116 archivos de esquema y datos. El mismo árbol runtime es el código de migraciones para desarrollo, staging y lanzamiento. El árbol OPS es otro proyecto. Una definición vieja puede estar reemplazada en el archivo posterior que enlaza la ficha. La presencia de SQL en este repositorio no confirma que se haya aplicado en una base remota.

| Capítulo | Archivos |
| --- | ---: |
| [Runtime · base, alta, direcciones y promociones](01-runtime-base-promociones.md) | 20 |
| [Runtime · soporte inicial, sesiones y observabilidad](02-runtime-soporte-y-sesiones.md) | 20 |
| [Runtime · analítica, telemetría y enlace con releases](03-runtime-telemetria-y-release.md) | 15 |
| [Runtime · catálogos, contexto y reglas de soporte](04-runtime-catalogos-y-atencion.md) | 15 |
| [Runtime · notificaciones, cierre, feedback y referidos](05-runtime-flujos-recientes.md) | 11 |
| [OPS · esquema inicial de versionado y deploy](06-ops-versionado.md) | 12 |
| [OPS · catálogos, validación y artefactos](07-ops-catalogos-y-artefactos.md) | 13 |
| [OPS · refinamientos de soporte y cola de diagnóstico](08-ops-telemetria-y-dlq.md) | 6 |
| [SQL auxiliar · seeds, importación territorial y apuntes Auth](09-seeds-e-importacion.md) | 4 |

## Cómo leer una ficha

- Cada objeto o cambio enlaza a su línea de SQL. Las funciones detallan parámetros, retorno, llamadas y tablas implicadas cuando esas relaciones se pueden resolver.
- Las políticas separan el rol y la operación de sus cláusulas USING y WITH CHECK. Las fichas registran los GRANT y REVOKE escritos en la migración. Los permisos efectivos dependen de toda la secuencia aplicada y de la configuración del proyecto.
- Las referencias por nombre permiten saltar a una RPC o una consulta Supabase desde el código. Si el mismo objeto se declara en ambos proyectos, sigue el cliente que usa el archivo invocador para confirmar su destino.
- Las relaciones y llamadas se obtuvieron estáticamente de SQL e invocaciones con nombre literal. El SQL dinámico se señala a nivel de bloque cuando aparece. Las lecturas se distinguen de las escrituras sin transcribir el cuerpo completo, los valores de los seeds ni los valores de configuración.
- La ficha OPS identifica la migración DLQ local que todavía no forma parte del historial de Git en este checkout.

[Introducción a runtime y OPS](../../05-supabase-runtime-y-ops.md) · [Índice general de código](../README.md)
