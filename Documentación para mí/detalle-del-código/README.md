# Detalle del código de ReferidosAPP

Esta referencia amplía la [guía de incorporación](../README.md) y su [inventario por archivo](../referencia/README.md). Aquí puedes empezar por un archivo, ver los componentes, funciones y otros símbolos que declara, y seguir los enlaces a quienes los llaman, las pantallas que los montan y las tablas o endpoints con los que se conectan.

## Frontend y código compartido

| Área | Qué encontrarás |
| --- | --- |
| [PWA principal](pwa/README.md) | Entrada web, auth, cliente, negocio, perfil, escáner, soporte, admin, servicios y stores. |
| [Prelaunch](prelaunch/README.md) | Landing desktop y móvil, formularios públicos, contenido legal, ayuda y seguimiento de eventos. |
| [Android](android/README.md) | Entrada React Native, stacks, tabs, pantallas, stores, servicios compartidos y componentes. |
| [Laboratorio web](laboratorio/README.md) | Maquetas de acceso y promociones en `apps/referidos-pwa`. |
| [Paquetes compartidos](paquetes/README.md) | Clientes API, reglas de dominio, adaptadores por plataforma y SDK de soporte, feedback y observabilidad. |
| [Contratos de frontend a backend](paquetes/contratos-en-uso.md) | Búsqueda por destino Supabase. Reúne orígenes en las apps y paquetes, y enlaza la implementación cuando se identifica en el checkout. |

## Backend e infraestructura

| Área | Qué encontrarás |
| --- | --- |
| [Edge Functions y configuración Supabase](edge/README.md) | Handlers HTTP del runtime y de OPS, funciones auxiliares, contratos, llamadas a otras funciones, tablas y RPC. |
| [SQL, migraciones y seeds](sql/README.md) | Funciones PostgreSQL, vistas, tablas, triggers, índices, políticas, cambios y sus consumidores. La migración local de DLQ se identifica como tal. |
| [Infraestructura, estilos y Android nativo](infra/README.md) | Selectores CSS, archivos de entrada y configuración, workflows, scripts, Gradle, Kotlin y tooling de compilación y versionado. |

## Cómo leer una ficha

1. Abre el área y el módulo. Cada capítulo comienza con el nombre completo de sus archivos para que puedas buscarlo incluso cuando se repite un nombre como `index.js`.
2. En una ficha de frontend, **Interfaz que monta** muestra las piezas que aparecen en el JSX. **Lo usa** apunta a la llamada, referencia o render en el código. **Contrato de datos** registra los destinos que se pueden identificar en el archivo.
3. En Edge, lee primero el handler HTTP y luego las funciones a las que delega. En SQL, comprueba si estás viendo la creación de un objeto o una versión posterior que lo redefine. Las anclas se refieren a las líneas del checkout documentado.
4. Para saltar entre capas, busca por nombre de pantalla, servicio, Edge Function o RPC en todos los capítulos. Ejemplo en PowerShell desde la raíz:

```powershell
rg -n '^### .*qrService\.js' '.\Documentación para mí\detalle-del-código'
```

## Tres recorridos para probar el índice

- **Canje de QR.** En PWA, sigue `qrService.js` y la ficha de `redeemValidQr`. En Android, busca `redeemValidQrCode` en `entityQueries.ts`. La referencia de contratos reúne las llamadas a `redeem_valid_qr` y el capítulo SQL muestra sus definiciones. [Servicios PWA](pwa/services-01.md) · [Contratos de datos](paquetes/contratos-en-uso.md)
- **Sesión y acceso por rol.** Abre la ficha `bootstrapAuth`, cruza a los archivos de auth y revisa `onboarding` en Edge. En Android, sigue la decisión de `RootNavigator` y los parámetros de sus pantallas. [Store PWA](pwa/store.md) · [Navegación Android](android/navigation.md) · [Edge de Auth](edge/auth-01.md)
- **Publicar una versión.** Busca `versioningService.js` en admin, sigue la acción al proxy y luego a OPS. Las fichas de workflows explican qué job prepara el artefacto, cuál lo despliega y dónde se registra el resultado. [Admin PWA](pwa/README.md) · [Funciones OPS](edge/README.md) · [Workflows](infra/workflows.md)

## Alcance de la referencia

La referencia parte del código versionado del checkout `refactor-prelaunch` en `ef71266`. Incluye por separado la migración OPS local y el helper de logs móvil que el código importa y Git ignora. Cubre frontend, backend, estilos y herramientas de ingeniería. Los bundles generados, capturas, binarios y otros recursos visuales se sitúan en el [inventario histórico](../referencia/10-archivo-historico-y-recursos.md).

Las fichas combinan el contexto funcional de la guía anterior con declaraciones y referencias extraídas del código. Una referencia estática puede ser condicional. Las llamadas construidas en ejecución, las invocaciones desde fuera del repo y el estado actual de los proyectos Supabase o Netlify requieren comprobaciones adicionales. Los extractos de SQL y configuración se limitan a nombres y contratos, sin incluir valores de credenciales ni datos de los seeds.
