# Android por archivo: arranque, navegación y pantallas

[Volver a Android](../04-android.md) · [Servicios y estado](04-android-servicios.md) · [Compilación y recursos](04-android-build.md)

Las rutas de esta guía corresponden a `apps/referidos-android`. Una `Screen` es un destino de navegación o una pantalla reutilizable. Los bloques componen pasos o secciones dentro de un destino y reciben acciones desde su contenedor.

## Entrada y rutas

| Archivo | Qué hace y por qué existe |
|---|---|
| [index.js](../../apps/referidos-android/index.js) | Carga primero los gestos y el ajuste de URL de Hermes. Obtiene de `app.json` el nombre que registra con `AppRegistry`, de modo que Kotlin y JavaScript puedan iniciar el mismo componente. |
| [App.tsx](../../apps/referidos-android/src/app/App.tsx) | Llama a `bootstrapAuth` en montaje, decide qué mostrar durante carga o error, monta el árbol con zonas seguras y navegación y centraliza instrumentación. Escucha `AppState`, dimensiones y ruta para que el SDK asocie eventos al contexto. Registra el manejador global de errores y vacía eventos al pasar a segundo plano. |
| [RootNavigator.tsx](../../apps/referidos-android/src/navigation/RootNavigator.tsx) | Construye el stack raíz desde rol, acceso y verificación. Mantiene destinos secundarios admin/soporte en pilas separadas y usa la ruta inicial como clave al cambiar de flujo, evitando conservar el historial del árbol anterior. |
| [RoleTabs.tsx](../../apps/referidos-android/src/navigation/RoleTabs.tsx) | Describe las pestañas de cada rol y sus componentes. Lee/escribe la última pestaña en `shellStore`. Las opciones `lazy: false` y `detachInactiveScreens={false}` conservan las pantallas al cambiar de pestaña, a cambio del trabajo inicial de montarlas. |
| [routeKeys.ts](../../apps/referidos-android/src/navigation/routeKeys.ts) | Define nombres de rutas del root, pestañas y stacks. Las pantallas importan estas claves para navegar sin duplicar cadenas arbitrarias. Algunas claves de agrupación también se usan como nombres de rutas de detalle. |

## Autenticación y onboarding

| Archivo | Qué hace y por qué existe |
|---|---|
| [AuthFlowScreen.tsx](../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx) | Ensambla formularios de login, registro, selección de rol, contraseña y estado visual del onboarding. Para cada paso renderiza el bloque correspondiente y pasa los handlers del motor. Mantiene presentación, mensajes, inputs y botones fuera de la lógica que modifica la sesión. |
| [useAuthEngine.ts](../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts) | Mantiene el borrador de cada paso y lo hidrata desde onboarding. Interpreta el callback de OAuth, intercambia el código PKCE, vuelve a cargar sesión y usa reglas de dominio para elegir registro o verificación. Gestiona login, creación de cuenta, datos de dueño y negocio, persistencia de dirección, estados de verificación y reenvío de correo. Persiste por etapas para que el flujo pueda volver a abrirse con datos parciales. |
| [OwnerProfileStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx) | Presenta los campos personales del titular, incluidos datos de nombre, nacimiento y contacto. El motor valida y persiste esos datos, lo que permite usar el bloque en el paso elegido por las reglas del flujo. |
| [BusinessDataStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx) | Pide los datos del negocio y permite escoger categoría. Recibe estado/acciones para que la categoría capturada y la que persiste el motor sean la misma. |
| [AddressStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx) | Resuelve dirección por mapa, permiso GPS, dirección buscada o selección manual. Carga provincias, cantones y parroquias según dependencia, solicita coordenadas de respaldo y completa con geocodificación inversa. Devuelve datos listos para que el motor guarde domicilio o sucursal. |
| [BusinessVerifyStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx) | Reúne datos para la verificación de negocio. Usa acciones del contenedor para enviar y avanzar cuando los datos son aceptados. Está separado del registro inicial porque se trata de una etapa con requisitos propios. |
| [AccountVerifyPromptStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx) | Ofrece empezar la verificación ahora o diferirla. El motor persiste el estado de la decisión y el bloque mantiene explícito el punto de entrada. |
| [AccountVerifyMethodStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx) | Muestra los métodos de verificación y calcula si se permite finalizar con el estado recibido. La decisión aparece junto al paso, con persistencia y refresco en el motor. |
| [VerifyEmailStepBlock.tsx](../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx) | Guía el paso de confirmación de correo, ofrece reenviar y volver a comprobar. Permite que el motor espere el evento externo de Auth sin mezclarlo con el formulario de registro. |

### Cómo seguir un registro bloqueado

1. Mira primero `bootStatus` y el resultado de `onboarding`. `ok` habla del resultado de la consulta. `allowAccess` habla de si ese perfil puede entrar. Si el motor recibe como único motivo un estado pendiente o faltante, intenta `runValidateRegistration` y recarga bootstrap.
2. `resolveRegistrationStep` elige un paso de alta a partir del rol, el perfil y los motivos. Cliente usa `client_steps` para perfil/dirección completados u omitidos. Negocio mira motivos de campos del titular, negocio, sucursal y dirección. Los bloques presentan y recogen la parte que falta.
3. Tras guardar un paso, el hook consulta otra vez onboarding y sus efectos deciden la próxima pantalla. Si la escritura funciona pero sigue la misma pantalla, inspecciona cómo devuelve el backend los motivos o indicadores de ese paso.
4. Con acceso concedido, `resolveVerificationStep` usa el estado de verificación y el rol. Al finalizar, `finalizeVerification` vuelve a consultar el backend y comprueba correo o métodos de acceso según el proveedor antes de marcar el estado. Los indicadores que proporciona el backend y el selector de interfaz se deben mantener alineados. [Hook de Android](../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts) · [Reglas compartidas](../../packages/domain/src/auth/flowRules.js)

## Cliente, negocio y cámara

| Archivo | Qué hace y por qué existe |
|---|---|
| [ClienteInicioScreen.tsx](../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx) | Usa el perfil inicial y carga una selección de promociones. Muestra avisos de cuenta y accesos rápidos al escáner e historial. Abre enlaces externos mediante `Linking` cuando una promoción los aporta. |
| [ClienteEscanerScreen.tsx](../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx) | Une la lectura nativa y manual en `handleValidatePreview`. Clasifica por prefijo, comprueba onboarding y muestra el tipo detectado junto a un historial breve propio. La clasificación es informativa. El canje se decide en una operación de negocio. |
| [ClienteHistorialScreen.tsx](../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx) | Resuelve el identificador del perfil, carga sus QR y aplica filtros de la vista. Reutiliza normalización de estado y fechas para entender registros con formatos históricos. |
| [NegocioInicioScreen.tsx](../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx) | Busca el negocio que corresponde al usuario y obtiene sucursales y promociones. Deriva métricas y avisos y da acceso directo a gestión y escáner. |
| [NegocioEscanerScreen.tsx](../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx) | Lee cámara o entrada manual, clasifica el código e invoca `redeemValidQrCode` para el canje de un QR válido. Muestra resultado y recarga los registros recientes del negocio. |
| [NegocioGestionarScreen.tsx](../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx) | Carga negocio y sucursales, crea y actualiza promociones, cambia estados, borra con confirmación y mantiene la relación promo–sucursal. Usa los servicios que toleran variaciones de columnas para que presentación y consultas no queden acopladas a cada nombre histórico. |
| [NativeQrScannerBlock.tsx](../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx) | Pide permiso de cámara, controla montaje y errores, usa Camera Kit para leer códigos y entrega detecciones al padre. La política de qué hacer con un QR queda en la pantalla de cada rol. |
| [ScannerGateway.tsx](../../apps/referidos-android/src/features/scanner/ScannerGateway.tsx) | Placeholder histórico que monta `FeaturePlaceholder`. Las pestañas activas usan los escáneres de cliente y negocio directamente. |

### Dos puntos de partida para cambios de negocio

- En el escáner, `handleProcessCode` recibe tanto cámara como texto manual. Solo los códigos de canje pasan a `redeemValidQrCode`. Este servicio llama `redeem_valid_qr(p_code)` y la pantalla traduce el resultado a canje exitoso, ya canjeado, expirado o inválido. Al cambiar del texto de error a códigos estructurados, cambia juntos el contrato backend y `mapRedeemFailure`. [Escáner de negocio](../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx) · [Servicio de canje](../../apps/referidos-android/src/shared/services/entityQueries.ts)
- En gestión, `loadData` identifica el negocio y carga promos y sucursales en paralelo. `loadPromoLinks` consulta los vínculos por promoción. Si este listado se vuelve lento, mide esas consultas antes de tocar el render. Las acciones de estado, borrado y vínculo deben conservar el refresco de sus respectivos datos. [Gestión de negocio](../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx)

## Perfiles

| Archivo | Qué hace y por qué existe |
|---|---|
| [ClientePerfilScreen.tsx](../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx) | Organiza métodos de seguridad, sesiones, información, beneficios y soporte del cliente. Carga sus tickets por identificador público, envía uno nuevo, solicita retomar un hilo y expone el flujo de eliminación de cuenta. |
| [NegocioPerfilScreen.tsx](../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx) | Adapta el perfil al titular de un negocio y carga la ficha comercial además de los datos personales. Reutiliza los paneles de seguridad, sesiones, FAQ y notificaciones, con soporte y acciones de cuenta para su rol. |
| [SoportePerfilScreen.tsx](../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx) | Muestra la identidad y estado operativo del asesor, permite iniciar/finalizar jornada y hace ping de actividad. Incluye opciones de perfil que se comparten con otros roles. |
| [AdminPerfilScreen.tsx](../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx) | Enlaza la cuenta administrativa a paneles de acceso, proveedores vinculados, notificaciones y sesiones. Usa el perfil normalizado que proviene de onboarding. |
| [AccessSecurityPanel.tsx](../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx) | Delega al servicio de seguridad alta, modificación y comprobación de PIN/biometría y la reautenticación local. Gestiona mensajes, loading y cambios de email/contraseña. La autorización sensible que representa la interfaz necesita garantía del servidor. |
| [ProfileExtendedSections.tsx](../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx) | Encapsula secciones FAQ, preferencias y beneficios. Usa el rol para mostrar tier/beneficios de cliente o plan/beneficios de negocio. |
| [ProfileRuntimePanels.tsx](../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx) | Alberga proveedores vinculados, notificaciones y sesiones. Registra el dispositivo al cargar sesiones, lista y revoca sesiones con servicios del runtime y mantiene preferencias de notificaciones en este dispositivo. |
| [profileFaqContent.ts](../../apps/referidos-android/src/features/profile/profileFaqContent.ts) | Agrupa los textos FAQ seleccionables por audiencia. Editar aquí cambia el contenido del perfil sin tocar controles ni navegación. |

## Soporte

| Archivo | Qué hace y por qué existe |
|---|---|
| [SoporteInicioScreen.tsx](../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx) | Entrada informativa para el agente y enlaces a inbox, jornadas, issues, errores e irregulares. Reúne el estado del asesor y el contexto para comenzar su operación. |
| [SoporteInboxScreen.tsx](../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx) | Lee inbox con filtros, carga estado de jornada, permite acciones de sesión y asignación y abre el hilo por identificador público. Presenta también eventos de observabilidad para soporte. |
| [SoporteIrregularScreen.tsx](../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx) | Abre un caso operativo con el identificador público del usuario, categoría disponible en el catálogo del runtime y el resumen indicado. Mantiene ese ingreso fuera del formulario de autoservicio del perfil. |
| [SoporteTicketScreen.tsx](../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx) | Centro del flujo de atención. Lee hilo, notas y eventos, presenta macros elegibles, implementa transiciones de apertura, atención, espera y cierre, y registra acciones como apertura por WhatsApp, nota interna y resolución. Usa ID público para operar y el ID interno donde las consultas lo requieren. |
| [SoporteJornadasScreen.tsx](../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx) | Reúne estado del asesor, petición pendiente y actividad de jornadas. Separa el historial de trabajo de la lista de casos del inbox. |
| [SoporteIssuesScreen.tsx](../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx) | Lista y filtra issues con contexto y eventos visibles para soporte. Facilita relacionar fallas que reportó el usuario con su registro operativo. |
| [SoporteErrorCatalogScreen.tsx](../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx) | Consulta el catálogo de códigos de error y permite buscar por código, estado o texto. Sirve para la interpretación durante el diagnóstico de un caso. |

### Cómo se recupera el estado de un ticket

`loadThread` lee el detalle y su historial. `initialFlow` deriva desde ahí la etapa visible cuando el agente vuelve a abrir el ticket. Las acciones de atención usan `setStatus` y `persistWorkflow` para sus escrituras, mientras `flow` controla qué botones aparecen. Al cerrar, la vista comprueba la espera, solicita un comentario, registra el resultado y llama a `closeThread`. Si el cierre se interrumpe, revisa el evento persistido y el estado efectivo del hilo antes de cambiar el paso local. [Flujo de ticket](../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx)

## Administración

| Archivo | Qué hace y por qué existe |
|---|---|
| [AdminInicioScreen.tsx](../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx) | Portada de operaciones. Lee conteos y actividad de usuarios, negocios, promociones, QR, soporte y eventos. Las tarjetas dirigen a la ruta detallada para actuar sobre cada dominio. |
| [AdminUsuariosScreen.tsx](../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx) | Ofrece búsqueda y filtros de usuarios, creación administrativa mediante `mobileApi.support.createAdminUser` y controles de sesión operativa donde se aplican. Reúne diagnósticos de acceso en torno al perfil. |
| [AdminNegociosScreen.tsx](../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx) | Lee negocios del runtime, muestra métricas, filtros de estado y sector y detalle resumido. La consulta se comparte con otras vistas y se adapta a columnas disponibles. |
| [AdminPromosScreen.tsx](../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx) | Lee promociones, agrega indicadores y habilita el cambio de estado seleccionado desde un modal. Usa el servicio que actualiza la fila y vuelve a cargar la lista. |
| [AdminQRsScreen.tsx](../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx) | Lista registros de `qr_validos` con filtros y métricas. Da una vista administrativa del estado de códigos y su uso, mientras el canje cotidiano vive en el escáner de negocio. |
| [AdminReportesScreen.tsx](../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx) | Agrupa reportes por estado, los filtra y ofrece cambios de estado mediante `adminOps`. El control pasa por la función administrativa en el runtime. |
| [AdminLogsScreen.tsx](../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx) | Consulta eventos operativos a través de `fetchSupportLogEvents`, los filtra y presenta métricas. Comparte acceso a registros con soporte pero aplica su propia vista administrativa. |
| [AdminDatosScreen.tsx](../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx) | Carga diferentes conjuntos en paralelo y agrega métricas y resúmenes recientes para consultar el estado de datos y errores desde una sola vista. |
| [AdminAppsScreen.tsx](../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx) | Mantiene la configuración de apps para soporte: clave, código, alias, origen y estado. Usa el proxy OPS para la edición y permite pedir la sincronización de apps hacia el runtime. |
| [AdminSistemaScreen.tsx](../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx) | Reúne flags del dispositivo y flags persistidos de soporte, configuración de autoasignación y códigos de registro. Distingue el contrato de cada grupo mediante sus servicios. |
| [AdminAnalyticsScreen.tsx](../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx) | Consulta métricas de Prelaunch con filtros y muestra un resumen. Delega la función autenticada de métricas a `adminOps.ts`. |
| [AdminObservabilidadScreen.tsx](../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx) | Punto de entrada de diagnóstico con listados de eventos recientes y vínculos a issues, error codes y logs. Reutiliza el feed de eventos. |
| [AdminIssuesScreen.tsx](../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx) | Lee issues con contexto y permite navegar al listado de eventos de un issue. Las métricas y filtros facilitan priorizar estados y niveles. |
| [AdminIssueEventsScreen.tsx](../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx) | Muestra eventos relacionados, permite filtrar niveles y ofrece solicitar el guardado en caché de un issue. Vincula el identificador del evento a la pantalla de detalle. |
| [AdminIssueEventDetailScreen.tsx](../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx) | Recupera un evento concreto mediante `fetchAdminIssueEventDetail` y presenta sus campos de diagnóstico y correlación. Vale la pena comenzar aquí cuando ya se conoce el evento ID. |
| [AdminErrorCatalogScreen.tsx](../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx) | Consulta códigos centralizados, filtra por atributos y presenta métricas de su estado. Comparte la consulta de catálogo con soporte. |
| [AdminSoporteScreen.tsx](../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx) | Controla la propia jornada administrativa, acciones sobre jornadas de asesores, permisos y asignación/reasignación. También concentra accesos a módulos especializados de soporte. |
| [AdminSupportAgentsScreen.tsx](../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx) | Amplía la vista de asesores con métricas, historial de eventos, autorización y decisiones sobre sesiones. Usa los servicios de consultas y de acciones de soporte. |
| [AdminSupportCatalogScreen.tsx](../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx) | Edita categorías y macros de OPS, cambia su estado o las elimina, y captura sus filtros de audiencia, app, entorno o estado. La ficha del agente consume la copia del catálogo en el runtime. |
| [AdminSupportTicketScreen.tsx](../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx) | Adaptador de navegación que pone el ID público de ruta en `supportDeskStore` y monta la pantalla de ticket del agente. Así dos áreas comparten la misma máquina de atención. |
| [AdminSupportTicketsPanelScreen.tsx](../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx) | Ofrece filtros y acciones sobre tickets desde la vista de administración, con asignación y cambio de estado. Abre el detalle compartido cuando hace falta continuar el flujo. |
| [AdminVersioningScreen.tsx](../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx) | Consola de productos, componentes, releases, drift, gates, migraciones, promociones, historial, deployments y artefactos/nodos. La pantalla mantiene filtros, mensajes y solicitudes, delegando las operaciones a `versioningService.ts` y el proxy. |
| [AdminDocumentationScreen.tsx](../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx) | Renderiza un índice buscable de documentación registrada para operadores. Consume el registro estático y no lee archivos Markdown de la instalación. |
| [AdminLegalScreen.tsx](../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx) | Presenta el conjunto de documentos y el resumen legal configurado para admin. Remite al registro de contenido que consume la interfaz. |
| [adminContentRegistry.ts](../../apps/referidos-android/src/features/admin/adminContentRegistry.ts) | Define grupos, documentos y snapshot legal para las vistas administrativas. Describe qué documentos ve el operador sin codificarlo en cada render. |
| [AdminCollectionScreen.tsx](../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx) | Plantilla compartida de listados admin con controles, métricas, estados vacíos, acción de refresco y render de filas provisto por cada pantalla. |
| [adminRuntimeStyles.ts](../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts) | Mantiene estilos para tarjetas, listas, indicadores y acciones de pantallas operativas Android. Cambiarlo puede afectar varias colecciones a la vez. |
