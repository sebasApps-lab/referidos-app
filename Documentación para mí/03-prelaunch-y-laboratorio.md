# 03 · Prelaunch y laboratorio web

## Prelaunch

`apps/prelaunch` recibe visitantes, les explica la plataforma y registra intención de acceso. Comparte backend runtime con la PWA, pero la página pública opera con una clave publicable y un identificador anónimo. El endpoint decide qué acepta y cómo lo almacena. [Entrada](../apps/prelaunch/src/main.jsx) · [Configuración](../apps/prelaunch/src/config/runtimeConfig.js)

| Ruta | Qué monta en este checkout |
| --- | --- |
| `/` | `WaitlistLandingPage`, con árboles desktop y mobile. |
| `/ayuda/es` | Portada de ayuda general. |
| `/ayuda/es/categoria/:category` y `/ayuda/es/articulo/:doc` | Categorías y artículos que resuelven el identificador de URL en catálogos locales. |
| `/soporte/abrir-ticket` | Formulario de soporte público que recoge información y canal preferido. |
| `/soporte-chat` y `/soporte-correo` | Redirecciones a la apertura de ticket. |
| `/feedback` | Formulario de feedback con controlador propio. |
| `/negocios` y `/components` | Landing comercial y playground registrados solo en desarrollo, además del filtro de entorno de runtime. |
| `/ayuda-negocios/*` | Redirección a ayuda general. Se conservan componentes de ayuda para negocio en el árbol de código. |

### Por qué hay dos árboles de UI

`TreeProvider` coloca en contexto la elección de `detectTree`, que usa señales del agente de usuario. `AdaptiveRoute` selecciona la vista e importa su módulo bajo `Suspense`. En los árboles de la landing principal cambian estructura, header, footer y modales, mientras `useLandingLeadCapture` conserva una sola lógica de captura. Una ventana angosta en desktop puede seguir usando el árbol desktop. Para confirmar qué maqueta estás viendo, revisa la detección además del ancho. La landing comercial tiene una entrada mobile que delega a desktop. [Detección](../apps/prelaunch/src/UI-detect/detectTree.js) · [Selección](../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx) · [Entrada comercial mobile](../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx)

### Cadena de un registro

1. La página desktop o mobile monta sus formularios y decide qué hacer al completar el registro, incluido el modal de confirmación.
2. `useLandingLeadCapture` mantiene correo, honeypot y estados `idle`, `loading`, `error`, `success` y `already`. Traduce errores para la UI y registra telemetría de la acción.
3. `waitlistApi` normaliza el correo, asigna `role_intent`, toma `ref` de la URL cuando falta un código explícito y deja que `prelaunchSystem` lea contexto UTM.
4. `createPrelaunchClient` añade identidad anónima y datos técnicos de la visita. Envía la solicitud a la función pública `waitlist-signup`, que resuelve entorno y tenant a través del runtime configurado, limita solicitudes y registra el interés. La lógica de referidos devuelve código, enlace y resumen para la confirmación.
5. El paso posterior de vincular la inscripción al usuario de la app vive en SQL y en el flujo de registro de la app. Un clic en la landing por sí solo no acredita puntos.

[Hook de captura](../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js) · [API de waitlist](../apps/prelaunch/src/waitlist/waitlistApi.js) · [Cliente compartido](../packages/api-client/src/prelaunch/createPrelaunchClient.js) · [Edge Function](../apps/referidos-app/supabase/functions/waitlist-signup/index.ts) · [Migración de referidos](../apps/referidos-app/supabase/migrations/20260332_000049_waitlist_referrals.sql)

### Soporte, contenido y métricas

- **Apertura de ticket.** `useSupportOpenTicketController` carga categorías, decide validaciones según el canal y llama a `supportApi`. El backend crea el hilo anónimo. Los formularios desktop y mobile adaptan el mismo contrato. [Controlador](../apps/prelaunch/src/support/useSupportOpenTicketController.js) · [API pública](../apps/prelaunch/src/support/supportApi.js)
- **Feedback.** Su controlador recibe datos de prefill de la navegación, valida campos y registra resultados. `feedbackApi` acopla esa pantalla al cliente público. El runtime procesa el envío con `feedback-submit`. [Controlador](../apps/prelaunch/src/support/useFeedbackPageController.js) · [Edge Function](../apps/referidos-app/supabase/functions/feedback-submit/index.ts)
- **Ayuda.** Los datos de navegación y artículos organizan secciones, categorías y slugs. El Markdown legal compartido tiene entradas distintas para waitlist y producto. Si modificas una política, sigue el slug hasta su fuente, además de la página que la renderiza. [Catálogo](../apps/prelaunch/src/legal/helpCenterData.jsx) · [Contenido legal de waitlist](../packages/legal-content/src/prelaunch.js)
- **Métricas y errores.** `usePrelaunchPageTracking` reúne eventos de visitas, secciones y acciones. `prelaunchSystem` los encamina a analytics y `prelaunchObservability` prepara el cliente de errores y los metadatos de release. Son dos destinos con propósitos distintos. [Tracking](../apps/prelaunch/src/observability/usePrelaunchPageTracking.js) · [Analytics](../apps/prelaunch/src/services/prelaunchSystem.js) · [Observabilidad](../apps/prelaunch/src/observability/prelaunchObservability.js)

### Rendimiento y publicación

Las páginas difieren secciones y modales para reducir lo que se monta al inicio. Las imágenes hero y del fondo ofrecen varias dimensiones y formatos. Editar un fondo implica revisar el recurso, sus importaciones, el CSS del árbol correspondiente y la precedencia de la lista de fuentes. `public/_redirects` permite que el router atienda rutas directas en Netlify y Vite emite las cabeceras del build. `public/app-config.js` suministra configuración que el workflow puede reescribir al publicar. [Vite](../apps/prelaunch/vite.config.js) · [Redirecciones](../apps/prelaunch/public/_redirects) · [Build y despliegue](07-versionado-y-despliegue.md)

Un detalle concreto a retomar es el enlace de referido de negocio. El backend genera `/negocios?ref=...`, mientras que el build de producción no monta esa ruta y el catch-all navega a `/`. Define el destino público del enlace junto con la forma de conservar su código. [Construcción del enlace](../apps/referidos-app/supabase/functions/waitlist-signup/index.ts#L214) · [Router](../apps/prelaunch/src/main.jsx)

En desarrollo, dos imports de imágenes de la landing comercial resuelven a `apps/assets/dev/business` en vez de llegar a `assets/dev/business` en la raíz. Si falla la carga de esa ruta, empieza por las referencias relativas de esos dos componentes. [Fondo comercial](../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx) · [Maqueta comercial](../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx)

## Laboratorio `referidos-pwa`

Es el workspace de pruebas visuales. `main.jsx` monta React y la integración PWA. El router carga de forma diferida `/`, `/auth`, las variantes `/prueba*` y la maqueta de creación de promoción. `AuthFlow` solo muestra el welcome y pasa manejadores sin implementación. La maqueta de creación de promoción se estudia aquí y el comportamiento real se sigue en `apps/referidos-app/src/negocio`. [Rutas del laboratorio](../apps/referidos-pwa/src/routes.jsx) · [Auth de maqueta](../apps/referidos-pwa/src/auth/AuthFlow.jsx) · [Mapa de componentes](../versioning/component-map.json)

[Referencia por archivo de Prelaunch y laboratorio](referencia/03-prelaunch-y-laboratorio-archivos.md) · [Recursos visuales de Prelaunch](referencia/03-prelaunch-recursos.md)
