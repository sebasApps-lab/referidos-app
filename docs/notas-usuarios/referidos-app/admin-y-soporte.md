# Admin y soporte

## Admin

El panel admin es una superficie interna.
Sus rutas principales cubren:

- Inicio
- Usuarios
- Negocios
- Promos
- QRs
- Reportes
- Logs
- Observability e issues
- Datos
- Apps
- Sistema
- Analytics de prelaunch
- Versionado global y detalle
- Documentacion
- Legal
- Soporte

## Que hace cada grupo

- `Usuarios`, `Negocios`, `Promos`, `QRs`, `Reportes`: operacion del negocio y catalogos.
- `Logs`, `Observability`, `Error codes`: monitoreo tecnico.
- `Apps`, `Sistema`: catalogos de apps y feature flags.
- `Analytics`: lectura de captacion desde prelaunch.
- `Versionado`: releases, drift, deploy requests, artifacts y contratos.
- `Documentacion` y `Legal`: consulta interna de guias y contenido normativo.
- `Soporte`: panel de tickets, macros, asesores y detalle de ticket.

## Soporte agente

La ruta `/soporte/...` es otra superficie interna, enfocada en asesores:

- Inicio
- Inbox
- Jornadas
- Issues
- Catalogo de errores
- Ticket por hilo
- Casos irregulares

## Lectura de la revision

- Admin no habla directo con `referidos-ops`; usa bridges desde la app runtime.
- Soporte mezcla UI propia de `referidos-app` con modulos compartidos de `packages/support-sdk`.
- Estas secciones son operativas y no deberian tratarse como experiencia publica.
