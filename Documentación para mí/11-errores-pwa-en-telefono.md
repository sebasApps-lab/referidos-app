# Errores de la PWA en el teléfono

**Prueba del 19 de noviembre de 2026.** La compilación corresponde a `apps/referidos-app` en la rama `fix/android-email-login`. El teléfono tiene Android 13. La PWA se ejecutó en Chrome con un área de contenido de 392 × 739 puntos CSS. El acceso por correo y la consulta del catálogo usaron Supabase de desarrollo. Los recorridos de alta, Cliente, Negocio, Soporte y Administración también usaron datos ficticios aislados para cubrir estados que requieren otras cuentas o cambios de datos.

| Evidencia | Alcance |
| --- | --- |
| Teléfono y desarrollo | Resultado observado en el teléfono con la cuenta o el backend de desarrollo. |
| Teléfono con datos ficticios | La interfaz real produjo el resultado en el mismo Chrome con respuestas preparadas en la máquina local. |
| Código | El defecto o su condición está en el código. Su reproducción completa requiere un entorno, un permiso o un dato aún pendiente. |

## Bienvenida, registro y login

### A01 · Crear tu cuenta deja al usuario en bienvenida

**Alta · Teléfono y desarrollo.** Desde `/`, toca **«crear tu cuenta»**. La URL cambia a `/auth` y la misma bienvenida sigue en pantalla. Debería aparecer el registro por correo o una selección explícita de métodos de alta. La pestaña manual **Registrarse**, accesible desde **Continuar con correo**, sí abre el formulario. El enlace de bienvenida cambia la ruta pero no activa el paso de registro. [Captura](../.android-local/pwa-phone-qa/02-crear-cuenta-queda-en-bienvenida.png) · [WelcomeStep.jsx](../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L72) · [AuthFlow.jsx](../apps/referidos-app/src/auth/AuthFlow.jsx#L157)

### A02 · Recuperar contraseña redirige a bienvenida

**Alta · Teléfono y desarrollo.** Entra por correo y toca **«Olvidaste tu contraseña?»**. El enlace solicita `/recuperar`, pero el router termina en `/`. Debería presentar el formulario de solicitud y, al volver desde el correo, el de contraseña nueva. El router carece de esta ruta y el enlace queda sin flujo. [Captura](../.android-local/pwa-phone-qa/03-recuperar-sin-formulario.png) · [EmailPasswordForm.jsx](../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L169) · [routes.jsx](../apps/referidos-app/src/routes.jsx)

### A03 · Enter no envía el formulario y las etiquetas quedan sueltas

**Media · Teléfono y desarrollo.** Completa correo y contraseña y pulsa Enter en el campo de contraseña. Se registraron cero solicitudes de autenticación y el formulario seguía en pantalla. Al tocar **INGRESAR** se envió una solicitud y se abrió el perfil pendiente. Los campos y el botón están dentro de un fragmento sin `form` y las etiquetas se renderizan sin asociación explícita con los campos. El envío con un formulario nativo resolvería Enter y permitiría asociar cada etiqueta a su campo. [EmailPasswordForm.jsx](../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L41)

### A04 · La bienvenida muestra un título de perfil y bloquea la ampliación

**Media · Teléfono y desarrollo.** Antes de identificarse, la primera pantalla ya muestra **«Cuentanos mas sobre ti»** por encima de la tarjeta de acceso. Ese encabezado corresponde al paso de datos personales. El pellizco de ampliación dejó la escala en `1.0`, con `maximum-scale=1.0` y `user-scalable=no` en el documento. El botón amarillo también presenta texto blanco de bajo contraste. El encabezado debe corresponder a la etapa visible y la página debe permitir ampliar texto y controles. [Captura](../.android-local/pwa-phone-qa/01-bienvenida.png) · [AuthFlow.jsx](../apps/referidos-app/src/auth/AuthFlow.jsx) · [index.html](../apps/referidos-app/index.html#L10) · [WelcomeStep.jsx](../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L35)

### A05 · Un alta correcta sin sesión aparece como error

**Alta · Teléfono con datos ficticios.** Completa el registro con datos de prueba. Cuando el servicio devuelve un usuario recién creado pero sin sesión, la pantalla dice **«No se pudo iniciar la sesion»**. Si se requiere confirmación por correo, debería indicar al usuario que revise la bandeja. También se observó el mensaje genérico para una respuesta aceptada con `identities` vacío. En el código, una respuesta explícita de cuenta existente puede perder su aviso porque el regreso a bienvenida limpia el mensaje. El envío tampoco se bloquea mientras la solicitud de alta está pendiente, de modo que varios toques pueden duplicarla. [Captura](../.android-local/pwa-phone-qa/17-signup-confirm.png) · [useAuthActions.js](../apps/referidos-app/src/auth/hooks/useAuthActions.js#L432) · [EmailRegisterStep.jsx](../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L59)

### A06 · Una cuenta pendiente puede quedar indefinidamente en Cargando

**Alta · Teléfono con datos ficticios.** Abre una sesión cuya única razón de bloqueo es `account_status:pending`. El simulador devolvió una validación correcta y después un onboarding activo. La interfaz siguió en **«Cargando...»** tras esas dos respuestas. El bootstrap cambia las dependencias del efecto que inició la validación. La limpieza invalida el efecto antes de que pueda bajar `validatePending`, y la referencia impide repetirlo. El resultado correcto es pasar al siguiente paso o mostrar un error recuperable. [Captura](../.android-local/pwa-phone-qa/15-cuenta-pendiente.png) · [AppGate.jsx](../apps/referidos-app/src/pages/AppGate.jsx#L90) · [appStore.js](../apps/referidos-app/src/store/appStore.js#L510)

### A07 · El ejemplo de invitación de Negocio incumple su propio formato

**Alta · Teléfono con datos ficticios y código.** En **Tipo de cuenta**, elige **Negocio**. El campo muestra `REF-435526`, pero el validador exige `REF-XXXX-XXX` con un conjunto de caracteres restringido. La misma pantalla ofrece solicitar un código por WhatsApp con el número de relleno `593000000000`. Debería dar un ejemplo que el formulario acepte y una vía operativa para solicitar el código. [Captura](../.android-local/pwa-phone-qa/16-invitacion-negocio.png) · [RoleSelectStep.jsx](../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L201) · [Reglas del código](../packages/domain/src/validators/index.js#L3)

### A08 · Los proveedores sociales pueden fallar sin un aviso visible

**Media · Código.** El error general de OAuth se escribe en el estado del formulario de correo mientras la bienvenida muestra otro aviso. En la rama de Google sin ID de One Tap, el retorno ocurre antes de limpiar el indicador de carga. Si también falla la redirección de respaldo, los botones sociales pueden quedar deshabilitados. El resultado esperado es mostrar un error recuperable en la pantalla donde se pulsó el proveedor. Falta verificar cada proveedor contra la configuración del entorno. [useAuthActions.js](../apps/referidos-app/src/auth/hooks/useAuthActions.js#L725) · [OAuthButtons.jsx](../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx)

### A09 · La pestaña pide un icono que falta en la compilación

**Baja · Teléfono y compilación local.** El HTML declara `/favicon.png` como PNG, pero ese archivo no aparece entre los archivos compilados. Chrome recibió `404` en la copia de prueba y la vista previa local devolvió `200` con `text/html`. El icono de pestaña debería resolver a una imagen válida. Los iconos de instalación del manifiesto sí están presentes. [Resultado](../.android-local/pwa-phone-qa/phone-final-results.jsonl) · [index.html](../apps/referidos-app/index.html#L7)

## Cliente, promociones, historial y escáner

### C01 · Las consultas de promociones usan columnas eliminadas

**Alta · Teléfono y Supabase de desarrollo.** La consulta de control a `promos` respondió `200`. Repetir la selección que hace el catálogo, con la relación a `negocios(nombre, sector, lat, lng, imagen)`, devolvió `400`, código `42703` y «column negocios_1.sector does not exist». Las consultas de catálogo y detalle comparten la proyección antigua. El contrato debe tomar dirección y logotipo de las relaciones o vistas que los sustituyeron. Una promoción auténtica también puede fallar por este motivo. [Resultado](../.android-local/pwa-phone-qa/phone-live-results.jsonl) · [promoService.js](../apps/referidos-app/src/services/promoService.js#L7) · [Migración de direcciones](../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L119)

### C02 · Inicio y el historial muestran promociones de demostración como si fueran reales

**Alta · Teléfono con datos ficticios.** Abre Inicio con un catálogo vacío. Se mostraron ofertas de ejemplo aunque la consulta devolvía cero. En **Historial**, una cuenta sin movimientos vio tarjetas con marcas y códigos de muestra. El contador de `get_qr_history` quedó en cero. El historial fija `useHistorialPreview = true` y el Inicio activo monta la vista previa aun cuando el buscador usa datos reales. El resultado correcto es mostrar el catálogo y los movimientos autorizados o un estado vacío. [Inicio](../.android-local/pwa-phone-qa/06-cliente-promociones.png) · [Historial](../.android-local/pwa-phone-qa/08-cliente-historial.png) · [ClienteInicio.jsx](../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L216) · [HistorialView.jsx](../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L66)

### C03 · Algunas tarjetas de muestra enlazan a un detalle real inexistente

**Alta · Teléfono con datos ficticios.** Desde Inicio, toca una tarjeta de muestra. La tarjeta abrió `/detalle/mock-1` y la página mostró **«Promo no encontrada»**. El detalle busca ese identificador en el catálogo normal. Se debería mostrar una vista de ejemplo coherente o retirar las tarjetas de demostración del recorrido autenticado. Incluso después de reparar la consulta de C01, los identificadores de muestra requieren su propia solución. [Captura](../.android-local/pwa-phone-qa/07-detalle-tarjeta-demo.png) · [PromoCardCercanas.jsx](../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L11) · [HistorialItemActivo.jsx](../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L217) · [promoService.js](../apps/referidos-app/src/services/promoService.js#L46)

### C04 · El escáner manual y el lector no comparten formato

**Alta · Teléfono con datos ficticios y código.** En Escanear, pospón el permiso de cámara y elige el ingreso manual. Al escribir `123456`, se activó **Verificar**. Tras pulsarlo no apareció un resultado ni una explicación. El control acepta seis alfanuméricos y elimina los guiones, pero el lector exige prefijo completo `qrv-` o `qrs-`. Además, la vista de Cliente sólo presenta `result`, mientras la rama de escaneo de Cliente escribe `statusMsg` y `statusType`. Debería conservar el código válido y presentar un resultado visible para entradas válidas e inválidas. [Resultado](../.android-local/pwa-phone-qa/phone-client-followup.jsonl) · [EscanerFallback.jsx](../apps/referidos-app/src/scanner/EscanerFallback.jsx#L14) · [useScannerState.ts](../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L14) · [ClienteEscanerBase.jsx](../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L126)

### C05 · El lector puede mantener un flujo de vídeo fuera de Escanear

**Alta · Teléfono con vídeo simulado y código.** En Cliente se comprobó un flujo activo en Escanear. Al volver a `/cliente/inicio`, quedaron dos pistas simuladas activas cuando deberían quedar cero. La caché oculta el escáner y el componente deriva `active` del permiso y del modo manual, sin comprobar qué pestaña está activa. Una prueba aislada también confirmó que la respuesta tardía de `getUserMedia` puede dejar un flujo sin detener. El vídeo de estas pruebas procede de un lienzo generado por el navegador. [Resultado](../.android-local/pwa-phone-qa/phone-camera-fixture.jsonl) · [CacheOutlet.jsx](../apps/referidos-app/src/cache/CacheOutlet.jsx#L17) · [ClienteEscanerBase.jsx](../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L82) · [EscanerCamera.jsx](../apps/referidos-app/src/scanner/EscanerCamera.jsx#L29)

### C06 · El detalle no completa la emisión ni la renovación del QR canjeable

**Alta · Código.** Abre una oferta real sin QR activo. El detalle puede generar el QR estático y consultar un QR dinámico previo, pero carece de una acción para emitir el dinámico. El Negocio sólo canjea dinámicos y el detalle conserva el código de un dinámico que vence tras mostrarse. El servicio de QR estático también presupone un objeto con `code`, mientras el SQL versionado devuelve filas. La interfaz debe emitir o renovar un QR canjeable y ocultar el vencido. El contrato de respuesta desplegado requiere comprobarse con una promoción real después de C01. [PromoDetalle.jsx](../apps/referidos-app/src/pages/PromoDetalle.jsx#L100) · [qrService.js](../apps/referidos-app/src/services/qrService.js#L14) · [RPC versionada](../apps/referidos-app/supabase/migrations/20250209_000001_qr_hmac.sql#L188)

### C07 · Perfil confirma cambios que sólo llegan al estado local

**Alta · Código.** Cambia nombres, contacto o alias en Perfil, pulsa guardar y recarga. Los manejadores actualizan el usuario en Zustand y el alias muestra confirmación, pero esas acciones carecen de una escritura persistente. El botón de edición de dirección recibe una función vacía. Al guardar, la pantalla debe persistir el cambio, tratar el estado de carga y mostrar confirmación sólo después de recibir éxito. [ClientePerfil.jsx](../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1483) · [AliasCard.jsx](../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L129)

### C08 · Varias opciones de Perfil parecen activas sin aplicar cambios

**Media · Código.** En Opiniones, **Enviar** no recibe el callback del formulario. Tema, idioma y parte de las preferencias de notificación sólo guardan estado local. Vincular cuentas se presenta como interactivo aunque `verified` se fija en falso y el clic queda condicionado. El resultado esperado es conectar cada control con su operación o mostrar con claridad que no está disponible. [ClientePerfil.jsx](../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1088) · [Preferencias](../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1208) · [Formulario](../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L35)

### C09 · La búsqueda puede variar la valoración y rechazar espacios externos

**Media · Código.** Busca una promoción primero con su título y después con un espacio final. La consulta usa el texto sin normalizar por completo. También se generan valoraciones aleatorias para ofertas que no tienen una valoración real. Los resultados deberían normalizar los espacios y omitir la valoración cuando el catálogo no la proporcione. [ClienteInicio.jsx](../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L173) · [appStore.js](../apps/referidos-app/src/store/appStore.js#L825)

## Negocio, Administración y Soporte

### N01 · Negocio sin promociones ve ofertas y conteos ficticios

**Alta · Teléfono con datos ficticios.** Entra a un negocio al que el servidor devuelve cero promociones. Inicio mostró las ofertas de ejemplo y conteos de activas, pendientes e inactivas. Si la cuenta no tiene promociones, tendría que indicar cero y ofrecer el alta. El fallback trata una lista vacía como invitación para cargar una colección de demostración. [Captura](../.android-local/pwa-phone-qa/10-negocio-promos.png) · [NegocioInicio.jsx](../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L109)

### N02 · Nueva promo no abre el formulario

**Alta · Teléfono con datos ficticios.** Desde Inicio, toca **Crear promo** para entrar a Gestionar. Allí, **Nueva promo** dejó la misma ruta y contenido, y se abrieron cero diálogos. El botón debe mostrar el formulario y sus validaciones. El JSX del botón no define el manejador. [Captura](../.android-local/pwa-phone-qa/11-negocio-gestionar.png) · [NegocioGestionarBase.jsx](../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L82)

### N03 · Los controles de seguridad muestran estado de demostración

**Alta · Código.** En la revisión inicial, **Gestionar → Seguridad** mostraba 2FA activo por defecto y el interruptor sólo modificaba el estado visual. Se sustituyó por un acceso a la configuración del autenticador del perfil. Los interruptores de avisos y bloqueo siguen usando estado local. [Seguridad.jsx](../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx) · [NegocioPerfil.jsx](../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx)

### S01 · Administración muestra filas y métricas predefinidas

**Alta · Teléfono con datos ficticios y código.** Con las respuestas de datos vacías, **Administración → Negocios** mostró tres filas y no pidió el listado de negocios. Inicio, Usuarios, Promos, QRs, Reportes y Datos usan ejemplos en distintos paneles. La apariencia de supervisión puede dar a entender que las cifras y las acciones corresponden al sistema. Cada tabla operativa debe conectarse al servicio y hacer visibles los estados vacío, error y carga. [Captura](../.android-local/pwa-phone-qa/13-admin-negocios.png) · [NegociosTable.jsx](../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L8) · [InicioKPIs.jsx](../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx#L18) · [PromosTable.jsx](../apps/referidos-app/src/admin/promos/PromosTable.jsx#L7)

### S02 · El botón Refrescar de Soporte sólo modifica la URL

**Alta · Teléfono con datos ficticios.** En Inbox espera el primer listado y toca **Refrescar**. Aparece `__pr` en la URL. El contador de lecturas REST se quedó en `16`, igual antes y después. El comportamiento esperado es volver a consultar los tickets y mostrar carga o error. Inbox no escucha el cambio que emite su cabecera. [Captura](../.android-local/pwa-phone-qa/14-soporte-inbox.png) · [SupportLayout.jsx](../packages/support-sdk/src/agent/SupportLayout.jsx#L45) · [SupportInbox.jsx](../packages/support-sdk/src/agent/SupportInbox.jsx#L178)

### S03 · Las notificaciones de asignación requieren una revisión de destinatario

**Alta · Código y SQL versionado.** La fuente de avisos de Soporte omite el filtro de destinatario y el dock marca automáticamente como leídos los avisos que recibe. Si el entorno aplica las políticas de rol y tenant versionadas, un aviso individual puede aparecer o quedar leído para un asesor equivocado. Los avisos individuales deben conservar el destinatario tanto en la consulta y escritura como en la política SQL. La comprobación operativa requiere dos cuentas de Soporte en desarrollo y revisar la política efectivamente desplegada. [Fuente de notificaciones](../packages/notifications-sdk/src/appNotificationsSource.js#L6) · [Lectura automática](../packages/notifications-sdk/src/useSupportWorkQueueNotifications.js#L152) · [Política de notificaciones](../apps/referidos-app/supabase/migrations/20260323_000042_notifications_center.sql#L78)

## Comportamiento que depende de la instalación

### P01 · Corregida la llamada al guard de modo instalado

**Alta · Código.** La llamada original de `App.jsx` pasaba un objeto a un guard que esperaba argumentos posicionales. `pathname` quedaba indefinido antes de `startsWith`. Se retiró la llamada y el router resuelve la ruta según la sesión y el rol. [App.jsx](../apps/referidos-app/src/App.jsx) · [AppGate.jsx](../apps/referidos-app/src/pages/AppGate.jsx)

### P02 · La pantalla de permisos de cámara no confirma el cambio al volver de ajustes

**Media · Código.** En Android con la PWA instalada, **Continuar** dirige a un `intent` de ajustes. El hook consulta el estado inicial del permiso pero no lo vuelve a comprobar al recuperar el foco. El resultado esperado es abrir el ajuste pertinente y actualizar el estado al volver. La prueba en la PWA instalada y el canje con cámara real requieren una sesión apta y un QR de desarrollo. [useScannerState.ts](../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L59)

## Comprobaciones que pasaron

- La PWA compiló, abrió en Chrome del teléfono y presentó un manifiesto válido. Chrome no reportó errores de instalabilidad y hubo un service worker activo. El HTML incluye el manifiesto dos veces. El duplicado no bloqueó esa comprobación. [Registro](../.android-local/pwa-phone-qa/phone-auth-results.jsonl)
- El botón **INGRESAR** autenticó la cuenta de prueba en Supabase de desarrollo. La PWA abrió el perfil pendiente y recuperó esa pantalla después de recargar y de una prueba breve de pérdida y retorno de red. Estas pruebas no cubren otras pantallas sin conexión. [Registro](../.android-local/pwa-phone-qa/phone-live-results.jsonl)
- Desde Inicio de Cliente se pudo entrar a Historial y mantener la ruta tras recargar, con la sesión de datos ficticios. El acceso desde un enlace recibido antes de cargar el área del rol requiere otro caso si se quiere verificar ese flujo por separado. [Registro](../.android-local/pwa-phone-qa/phone-reconnected-results.jsonl)
- La página pública `/inicio` y los documentos en español de términos, privacidad y eliminación de datos abrieron con contenido visible. [Registro](../.android-local/pwa-phone-qa/phone-final-results.jsonl)

Google, Facebook, X, Discord, correo de alta real, 2FA, canje real, cuentas privilegiadas reales y despliegues Netlify de staging o producción quedan fuera de la evidencia de este recorrido. Los pasos que requieren consentimiento legal, mensajes a terceros o promociones reales se revisaron con datos ficticios o desde el código.

## Verificación posterior de OAuth y 2FA

Se retiró la redirección duplicada de P01. El mismo router controla la navegación desde Chrome y el icono de la PWA. En OAuth, el retorno usa el origen que creó el verificador PKCE. Una cancelación presenta un aviso en bienvenida y deja disponible el botón para reintentar. En el teléfono se comprobó un retorno Google simulado con un solo canje PKCE y un retorno cancelado. Supabase de desarrollo respondió con una redirección hacia Google, Facebook, Discord y X. La autenticación con cuentas de esos proveedores y la autorización del callback de la vista previa quedaron pendientes. [Acciones OAuth](../apps/referidos-app/src/auth/hooks/useAuthActions.js) · [Retorno](../apps/referidos-app/src/config/authRedirectUrl.js) · [Resultados en el teléfono](../.android-local/pwa-phone-qa/auth-fix-phone-verified.jsonl)

Las rutas protegidas esperan la comprobación de 2FA. En el teléfono, con datos de prueba, un código incorrecto mantuvo el bloqueo y el correcto permitió entrar tras confirmar `aal2`. También se comprobó que el alta reemplaza el factor pendiente de la app, confirma el nuevo y sincroniza el perfil. Se usaron únicamente factores ficticios. [Control de acceso](../apps/referidos-app/src/router/guards/MfaGateBoundary.jsx) · [Servicio TOTP](../apps/referidos-app/src/services/mfaService.js) · [Regresión automatizada](../tooling/guardrails/test-pwa-mfa.mjs)

El Supabase local de la PWA tenía deshabilitadas la inscripción y la verificación TOTP. Ambas están habilitadas en el archivo de configuración del CLI. Falta confirmar esos dos ajustes en el proyecto alojado de desarrollo. [Configuración local](../apps/referidos-app/supabase/config.toml#L279) · [Referencia del CLI](https://supabase.com/docs/guides/local-development/cli/config)

Con un perfil ficticio de Negocio en el teléfono, **Gestionar → Seguridad → Configurar** abrió el panel del autenticador del perfil. Volví a la lista de ajustes y repetí el recorrido con la misma vista en caché. También inicié y cancelé la activación. El escenario preparó una inscripción y terminó sin verificar el factor ni modificar el indicador de 2FA del perfil. La misma ejecución volvió a verificar el retorno OAuth válido, la cancelación de OAuth, el desafío de acceso y el alta TOTP. [Resultados de las cinco pruebas](../.android-local/pwa-phone-qa/auth-business-phone-verified.jsonl)

Chrome generó e instaló la WebAPK del origen de pruebas. Lanzar su icono abrió la vista previa HTTP en una pestaña de Chrome. Allí confirmé que se cargó la compilación actual y que el inicio por correo en Supabase de desarrollo llegó al formulario de perfil pendiente. La comprobación en modo independiente con esta versión requiere un origen HTTPS de desarrollo con el retorno OAuth permitido por Supabase. [URLs de retorno de Supabase](https://supabase.com/docs/guides/auth/redirect-urls)

### Google OAuth en la WebAPK por HTTPS

La instalación HTTPS de `migo-beta.netlify.app` que ya estaba en el teléfono abrió en modo independiente. Una petición directa a `/auth` recibió 404. Añadí a la PWA la regla de Netlify que sirve `index.html` en esa ruta y conserva la URL del retorno. La versión publicada requiere incorporar ese cambio. [Regla SPA](../apps/referidos-app/public/_redirects)

En la compilación de desarrollo servida por ngrok, Chrome recibió el aviso HTML de ngrok al pedir el manifiesto y mostró que la app no se podía instalar. La PWA ahora usa un solo enlace al manifiesto y permite enviar la cookie de aceptación del aviso. También registra su service worker en compilaciones servidas en un contexto seguro. Chrome leyó el manifiesto sin errores e instaló la WebAPK. El icono nuevo abrió la app en `standalone`. [Enlace al manifiesto](../apps/referidos-app/index.html) · [Registro del service worker](../apps/referidos-app/src/main.jsx)

En el Android real se inició OAuth desde la WebAPK con PKCE y se seleccionó la cuenta de Google indicada para la prueba. Como ya había una sesión de cliente en el origen, se inició el flujo mediante el mismo cliente Supabase con el selector de Google explícito. Supabase de desarrollo devolvió el código a `/auth` en el origen del túnel. La sesión coincidió con la cuenta indicada y llegó a `/admin/inicio` en modo independiente. [Registro sin códigos ni tokens](../.android-local/pwa-phone-qa/google-oauth-https-standalone.jsonl)
