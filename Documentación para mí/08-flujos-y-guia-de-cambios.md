# 08 · Flujos y guía de cambios

Usa estas rutas de lectura para retomar un cambio. Comprueba el punto de entrada que ejecuta el usuario y sigue su dependencia hasta donde se decide el resultado. Una app puede tener un helper con el mismo nombre que otra y mantener un contrato diferente.

## Crear cuenta o recuperar acceso

1. En PWA empieza con `AuthEntry`, `AuthFlow` y los hooks `useAuthFlow` y `useAuthActions`. Identifica el paso visible y qué condición permite avanzar.
2. En Android la entrada es `AuthFlowScreen`, su motor `useAuthEngine` y el store de la app. Revisa qué reglas toma de `packages/domain` y dónde implementa su propia UI.
3. Supabase Auth emite la sesión. `onboarding` devuelve estado del perfil, negocio y razones de acceso. `validate-registration` participa en el alta. Aceptación legal, confirmación de contacto y estado de cuenta viven en capas distintas.
4. Si modificas un requisito, ubica sus validaciones en ambas apps y en las funciones que crean o cambian el perfil. Conserva el manejo de usuarios ya existentes.

[Auth web](../apps/referidos-app/src/auth/AuthFlow.jsx) · [Motor Android](../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts) · [Onboarding runtime](../apps/referidos-app/supabase/functions/onboarding/index.ts)

## Publicar, ver y canjear una promoción

- **Negocio.** Ve a `src/negocio/gestionar` y `src/negocio/services`. Distingue el formulario y sus valores locales de la llamada que guarda la promoción, su estado y sus sucursales. Las políticas del runtime deciden quién puede cambiarla.
- **Cliente.** El inicio lee promociones y prepara el catálogo. Para visualización o filtros, sigue `cliente/inicio`, el store y `promoService.js`. Para el detalle sigue la ruta `/detalle/:id`.
- **QR.** `qrService.js` agrupa la generación y consulta de código, historial y canje. Las RPC y migraciones de QR determinan firma, vigencia, estado y escritura del canje. Antes de tocar el formato o la transición de estado, lee los lectores de cliente y negocio en ambas plataformas.
- **Diagnóstico.** Si UI y base discrepan, revisa el id de promoción, estado, usuario, negocio o sucursal y el momento de expiración. El escáner solo obtiene una cadena y la lógica de negocio valida si es canjeable.

[Servicio de promociones](../apps/referidos-app/src/services/promoService.js) · [Servicio QR](../apps/referidos-app/src/services/qrService.js) · [SQL QR](../apps/referidos-app/supabase/migrations/20250209_000001_qr_hmac.sql)

## Abrir y atender un ticket

El origen puede ser un visitante de Prelaunch, un perfil autenticado o un agente que registra un caso irregular. Primero identifica el origen porque la identidad y las categorías cambian. El runtime registra el hilo, mensajes y responsables. En web, `SupportInbox` lista hilos y `SupportTicket` muestra detalle y operaciones. Las macros se administran en OPS y las superficies de atención usan el catálogo sincronizado al runtime.

Para rastrear un ticket, sigue identificador, origen, app, canal, estado, asignación y jornada del agente. Si el administrador ve el hilo y el agente no, revisa los filtros de listado, las políticas de acceso y las reglas de asignación. Si una macro no aparece, revisa su audiencia, estado y versión de la caché.

[Apertura pública](../apps/prelaunch/src/support/useSupportOpenTicketController.js) · [Inbox del agente](../packages/support-sdk/src/agent/SupportInbox.jsx) · [Guía de macros](../docs/referidos-system/support-macros-ops-cache.md)

## Seguir un error o un evento

Hay distintos orígenes: errores web/móvil, eventos de captación, acciones de soporte y eventos del pipeline. Empieza por dónde se genera y qué transporte usa. `obs-ingest` es un destino de observabilidad en runtime. El dispatch de telemetría a OPS agrupa varios dominios. La DLQ registra fallos de ingesta y su dashboard muestra qué se acumula antes de una purga.

Si buscas el archivo de origen de un error de producción, comprueba la versión, el commit y el build en el evento. Luego revisa la entrega y disponibilidad de su sourcemap privado. Ver el mismo mensaje en otro entorno no garantiza que sea el mismo build.

[Logs web](../apps/referidos-app/src/services/loggingClient.js) · [Ingesta runtime](../apps/referidos-app/supabase/functions/obs-ingest/index.ts) · [Telemetría hacia OPS](../docs/referidos-system/ops-telemetry-cold-dispatch.md)

## Dónde empezar para cambios comunes

| Quiero cambiar | Primer lugar | Lo que suele estar acoplado |
| --- | --- | --- |
| Texto o recursos del hero | Capítulo de Prelaunch y componentes del árbol activo | Árbol mobile/desktop, CSS e importación de formatos. |
| Campo de perfil | Flujo de auth/perfil por plataforma | Normalizadores, Edge Function, esquema y permisos. |
| Qué ve un negocio | Router, layout y consulta de negocio | Contexto del usuario, filtro, RLS o Edge Function. |
| Categoría o macro de soporte | Admin de soporte y catálogo OPS | Cache del runtime, permisos, audiencia y canal. |
| Un caso de waitlist o referido | Hook de captura y `waitlist-signup` | SQL de inscripciones/referidos y enlace público. |
| Corte de release | Capítulo de versionado y panel admin | SHA, artefacto, proyecto runtime, gate y sitio Netlify. |
