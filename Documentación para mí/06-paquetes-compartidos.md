# 06 · Paquetes compartidos

npm enlaza los workspaces de `packages/*` en la instalación del monorepo. Revisa `exports` antes de cambiar una ruta interna. Algunos consumidores usan aliases de Vite y otros importan directamente el código fuente. Cambiar un contrato compartido puede afectar una aplicación que no aparece en tu diff.

| Paquete | Para qué existe | Consumidor y cómo seguirlo |
| --- | --- | --- |
| `api-client` | Construye el cliente móvil, agrupa operaciones Auth, dirección, soporte y logging. También ofrece el cliente público de Prelaunch. | Android lo crea en `mobileApi.ts`. Prelaunch usa el subpath `/prelaunch` en `prelaunchSystem.js`. |
| `domain` | Roles, pasos, reglas de onboarding, categorías, normalizadores y validadores. | El motor de auth Android lo consume. La PWA conserva su lógica bajo `src/auth`. |
| `support-sdk` | Cliente web de soporte y pantallas del agente. | `routes.jsx` monta las pantallas. Admin reutiliza inbox y ticket. Algunos adaptadores referencian archivos de la PWA mediante rutas relativas. |
| `notifications-sdk` | Consulta, marca de lectura y reglas de entrega para notificaciones por rol. | Inbox y layouts web lo conectan a Supabase. Separa las notificaciones persistidas de la cola de trabajo de soporte. |
| `observability` | Envelopes, catálogo de errores, breadcrumbs, limpieza, cola de eventos y política de UI. | Web funcional y Prelaunch generan eventos para el runtime. |
| `observability-sdk` | Cliente móvil con normalización, muestreo y envío de eventos. | Android lo crea con su `mobileApi`. Mantiene su propio comportamiento. |
| `legal-content` | Render de Markdown y catálogos legales diferenciados para producto y waitlist. | Web y Prelaunch apuntan a las entradas que corresponden a su contexto. |
| `feedback-sdk` | Normalizadores de feedback y adaptador para el ingreso público. | El cliente Prelaunch importa sus archivos por ruta relativa. |
| `intake-guard` | Funciones de análisis de entrada pública, hashes, huellas, ventanas y almacenamiento de señales. | Edge Functions de ingreso público emplean sus utilidades. |
| `security-core` | Políticas puras de PIN y niveles de desbloqueo. | Android aplica las reglas al store y a acciones de perfil. |
| `platform-rn` | Adaptadores de almacenamiento local, biometría y dispositivo React Native. | Android lo llama mediante el servicio de seguridad local. |
| `platform-web` | Equivalentes web de almacenamiento, biometría y dispositivo. | Sus archivos coexisten con implementaciones internas de la PWA. Antes de editarlo confirma el import del consumidor que quieres cambiar. |

## Dónde están los puntos de cambio

- **Un error llega a consola pero no a admin.** Sigue la inicialización del cliente, normalización y envío, y después `obs-ingest` y las vistas del panel. La web agrupa errores y breadcrumbs en `observability`. Android tiene otro SDK y usa el contrato de logging de su cliente móvil. [Cliente web](../packages/observability/src/client/createObservabilityClient.js) · [Cliente móvil](../packages/observability-sdk/src/createMobileObservabilityClient.js)
- **Cambió una Edge Function.** Ajusta la forma de invocarla donde el usuario la consume. El cliente Android envía el token donde el endpoint usa sesión. El cliente público de Prelaunch se configura con un canal/tenant y usa `fetch` para las superficies anónimas. La PWA suele tener un servicio propio. [Sesión móvil](../packages/api-client/src/clients/sessionHelpers.js) · [Cliente público](../packages/api-client/src/prelaunch/createPrelaunchClient.js)
- **Cambió la política de soporte.** El SDK web organiza el flujo de trabajo y los flags. Los servicios Edge, las políticas y los datos de OPS/runtime definen qué puede consultar o modificar el agente. Para cambios de enlistado o reasignación, sigue ambos lados de ese contrato. [Cliente de soporte web](../packages/support-sdk/src/supportClient.js) · [Supabase runtime y OPS](05-supabase-runtime-y-ops.md)
- **Cambió el desbloqueo Android.** `security-core` describe las categorías. `platform-rn` hace el trabajo local. La app decide cuándo invocar la biometría y cómo actualiza el store. El requisito de seguridad de una operación remota corresponde también al servidor. [Política](../packages/security-core/src/unlock/unlockPolicy.js) · [Adaptador local](../packages/platform-rn/src/storage/secureStorageService.js)

## Cuidado con el clon limpio

`createMobileApi.js` importa estáticamente `./logs/logEvent.js`. Esta copia tiene el archivo local, pero `.gitignore` lo excluye mediante la regla global `logs` y Git no lo lista como versionado. Una configuración que cargue la entrada móvil puede parecer operativa aquí y faltar en un clon. Antes de depender de esa copia, revisa qué debería entrar en el repositorio y comprueba sus consumidores. [Import](../packages/api-client/src/createMobileApi.js#L12) · [Regla de Git](../.gitignore#L2)

[Referencia por archivo de paquetes compartidos](referencia/06-paquetes-archivos.md)
