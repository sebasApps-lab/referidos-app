# Volver a ReferidosAPP

Esta guía te lleva del mapa del producto al código que puedes editar. Describe la rama local `refactor-prelaunch` en el commit `ef71266`, con los dos cambios locales de telemetría señalados aparte. La operación real de cada entorno se confirma en sus respectivos paneles.

## Orden de lectura

| Capítulo | Qué te permite hacer |
| --- | --- |
| [01 · Mapa y primer día](01-mapa-y-primer-dia.md) | Entender el producto, ubicar cada app y preparar un entorno local. |
| [02 · PWA principal](02-pwa-principal.md) | Seguir el arranque, el registro, las promociones, los QR, soporte y administración web. |
| [03 · Prelaunch y laboratorio web](03-prelaunch-y-laboratorio.md) | Encontrar formularios, referidos, ayuda y prototipos de diseño. |
| [04 · Android](04-android.md) | Seguir el arranque nativo, la navegación, el backend y la compilación. |
| [05 · Supabase runtime y OPS](05-supabase-runtime-y-ops.md) | Ubicar tablas, políticas, funciones y controles operativos por proyecto. |
| [06 · Paquetes compartidos](06-paquetes-compartidos.md) | Saber qué código comparten las apps y dónde se conserva lógica por plataforma. |
| [07 · Versionado y despliegue](07-versionado-y-despliegue.md) | Entender cómo se prepara, promueve y publica una versión. |
| [08 · Flujos y guía de cambios](08-flujos-y-guia-de-cambios.md) | Seguir una acción de la pantalla a la base y decidir dónde cambiarla. |
| [09 · Pendientes y verificación](09-pendientes-y-verificacion.md) | Ordenar correcciones y confirmaciones de entorno. |
| [Referencia por archivo](referencia/README.md) | Ir directamente al archivo, su propósito y sus dependencias. |
| [Detalle del código](detalle-del-c%C3%B3digo/README.md) | Abrir la referencia de componentes, funciones, objetos SQL y sus consumidores. |

Si tienes una hora, lee el mapa, elige una superficie y sigue una acción de la pantalla al backend. En la PWA puedes empezar por [main.jsx](../apps/referidos-app/src/main.jsx), [App.jsx](../apps/referidos-app/src/App.jsx) y [routes.jsx](../apps/referidos-app/src/routes.jsx).
