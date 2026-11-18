# Android · Stacks y tabs

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/navigation/RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L1)
- [`apps/referidos-android/src/navigation/RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L1)
- [`apps/referidos-android/src/navigation/routeKeys.ts`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/navigation/RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L1)

Describe las pestañas de cada rol y sus componentes. Lee/escribe la última pestaña en `shellStore`. Las opciones `lazy: false` y `detachInactiveScreens={false}` conservan las pantallas al cambiar de pestaña, a cambio del trabajo inicial de montarlas.

**Superficie que exporta.** [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L101), [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L120), [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L139), [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L159).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L5) (importa).

**Dependencias del archivo.** `react`, `@react-navigation/bottom-tabs`, [`./routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@features/cliente/ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx), [`@features/cliente/ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx), [`@features/cliente/ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx), [`@features/profile/ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx), [`@features/negocio/NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx), [`@features/negocio/NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx), [`@features/negocio/NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx), [`@features/profile/NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx), [`@features/admin/AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx), [`@features/admin/AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx), [`@features/admin/AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx), [`@features/admin/AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx), [`@features/profile/AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx), [`@features/support/SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx), [`@features/support/SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx) y 3 más.

#### [`Tab`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L26) · variable de módulo

Declara `Tab` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Efectos y APIs** `createBottomTabNavigator`.
- **Llamadas directas en el cuerpo** [`createBottomTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L26).
- **Lo usa** [`RoleTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L73) (renderiza).

#### [`TabScreenDef`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L28) · tipo TypeScript

Describe la forma del contrato de `Tab Screen Def`, con campos `name`, `label`, `component`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `name`, `label`, `component`.

#### [`RoleTabConfig`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L34) · tipo TypeScript

Describe la forma del contrato de `Role Tab Config`, con campos `role`, `fallbackRoute`, `screens`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `role`, `fallbackRoute`, `screens`.
- **Usa código de** [`ShellRoleKey`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L3) (referencia).

#### [`COMMON_TAB_OPTIONS`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L40) · variable de módulo

Agrupa la configuración o catálogo de `COMMON TAB OPTIONS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `headerShown`, `lazy`, `freezeOnBlur`, `tabBarHideOnKeyboard`, `tabBarStyle`, `tabBarLabelStyle`, `sceneStyle`.
- **Lo usa** [`RoleTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L78) (pasa a screenOptions).

#### [`RoleTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L62) · componente React

Monta `Tab.Navigator`, `Tab.Screen` y decide qué vista queda asociada a cada entrada de navegación.

**Entradas de navegación**

- `screen.name` → `screen.component` ([línea 90](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L90))

- **Entradas** `{role, fallbackRoute, screens}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `cacheEpoch mediante useShellStore`, `selector state.cacheEpoch`, `activeRoute mediante useShellStore`, `selector state.activeTabs.role`, `setActiveTab mediante useShellStore`, `selector state.setActiveTab`.
- **Interfaz que monta** `Tab.Navigator`, `Tab.Screen`.
- **Hooks que llama** `useShellStore`.
- **Usa código de** [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23) (llama).
- **Llamadas directas en el cuerpo** [`screens.map`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L89).
- **Lo usa** [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L103) (renderiza), [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L122) (renderiza), [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L141) (renderiza), [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L161) (renderiza).

#### [`initialRouteName`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L68) · cálculo memorizado · dentro de [`RoleTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L62)

Inicia `ial Route Name` y prepara sus dependencias.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`RoleTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L75) (pasa a initialRouteName).

#### [`state`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L80) · función · dentro de [`RoleTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L62)

Coordina cambios de estado durante el valor de estado.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setActiveTab`.
- **Condiciones que evalúa** `current.name`.
- **Llamadas directas en el cuerpo** [`setActiveTab`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L84).

#### [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L101) · componente React · exportado

Monta `RoleTabNavigator`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `RoleTabNavigator`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo), [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13) (referencia), [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25) (referencia), [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38) (referencia), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45) (referencia).
- **Lo usa** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L122) (pasa a component).

#### [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L120) · componente React · exportado

Monta `RoleTabNavigator`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `RoleTabNavigator`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo), [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26) (referencia), [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34) (referencia), [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48) (referencia), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46) (referencia).
- **Lo usa** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L125) (pasa a component).

#### [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L139) · componente React · exportado

Monta `RoleTabNavigator`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `RoleTabNavigator`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo), [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129) (referencia), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84) (referencia), [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27) (referencia), [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L9) (referencia), [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L14) (referencia).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L38) (pasa a component).

#### [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L159) · componente React · exportado

Monta `RoleTabNavigator`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `RoleTabNavigator`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo), [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17) (referencia), [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27) (referencia), [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12) (referencia), [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20) (referencia).
- **Lo usa** [`SoporteStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L84) (pasa a component).

### [`apps/referidos-android/src/navigation/RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L1)

Construye el stack raíz desde rol, acceso y verificación. Mantiene destinos secundarios admin/soporte en pilas separadas y usa la ruta inicial como clave al cambiar de flujo, evitando conservar el historial del árbol anterior.

**Superficie que exporta.** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L96).

**Módulos que lo cargan.** [`App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L12) (importa).

**Dependencias del archivo.** `react`, `@react-navigation/native-stack`, [`@features/auth/AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`./RoleTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx), [`./routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@features/admin/AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx), [`@features/admin/AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx), [`@features/admin/AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx), [`@features/admin/AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx), [`@features/admin/AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx), [`@features/admin/AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx), [`@features/admin/AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx), [`@features/admin/AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx), [`@features/admin/AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx), [`@features/admin/AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx), [`@features/admin/AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx), [`@features/admin/AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx) y 12 más.

#### [`Stack`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L32) · variable de módulo

Declara `Stack` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Efectos y APIs** `createNativeStackNavigator`.
- **Llamadas directas en el cuerpo** [`createNativeStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L32).
- **Lo usa** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L113) (renderiza).

#### [`RoleStack`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L33) · variable de módulo

Declara `RoleStack` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Efectos y APIs** `createNativeStackNavigator`.
- **Llamadas directas en el cuerpo** [`createNativeStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L33).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L37) (renderiza), [`SoporteStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L83) (renderiza).

#### [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L35) · componente React

Registra las pantallas internas del rol admin que abre la navegación Android.

**Entradas de navegación**

- `STACK_ROUTES.ADMIN.TABS` → `AdminTabs` ([línea 38](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L38))
- `STACK_ROUTES.ADMIN.NEGOCIOS` → `AdminNegociosScreen` ([línea 39](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L39))
- `STACK_ROUTES.ADMIN.PROMOS` → `AdminPromosScreen` ([línea 40](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L40))
- `STACK_ROUTES.ADMIN.QRS` → `AdminQRsScreen` ([línea 41](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L41))
- `STACK_ROUTES.ADMIN.REPORTES` → `AdminReportesScreen` ([línea 42](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L42))
- `STACK_ROUTES.ADMIN.LOGS` → `AdminLogsScreen` ([línea 43](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L43))
- `STACK_ROUTES.ADMIN.DATOS` → `AdminDatosScreen` ([línea 44](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L44))
- `STACK_ROUTES.ADMIN.APPS` → `AdminAppsScreen` ([línea 45](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L45))
- `STACK_ROUTES.ADMIN.SISTEMA` → `AdminSistemaScreen` ([línea 46](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L46))
- `STACK_ROUTES.ADMIN.ANALYTICS` → `AdminAnalyticsScreen` ([línea 47](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L47))
- `STACK_ROUTES.ADMIN.ISSUES` → `AdminIssuesScreen` ([línea 48](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L48))
- `STACK_ROUTES.ADMIN.ISSUE_EVENTS` → `AdminIssueEventsScreen` ([línea 49](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L49))
- `STACK_ROUTES.ADMIN.ISSUE_EVENT_DETAILS` → `AdminIssueEventDetailScreen` ([línea 53](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L53))
- `STACK_ROUTES.ADMIN.ERROR_CODES` → `AdminErrorCatalogScreen` ([línea 57](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L57))
- `STACK_ROUTES.ADMIN.VERSIONING` → `AdminVersioningScreen` ([línea 61](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L61))
- `STACK_ROUTES.ADMIN.DOCUMENTATION` → `AdminDocumentationScreen` ([línea 62](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L62))
- `STACK_ROUTES.ADMIN.LEGAL` → `AdminLegalScreen` ([línea 63](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L63))
- `STACK_ROUTES.ADMIN.SUPPORT_TICKETS_PANEL` → `AdminSupportTicketsPanelScreen` ([línea 64](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L64))
- `STACK_ROUTES.ADMIN.SUPPORT_CATALOG` → `AdminSupportCatalogScreen` ([línea 68](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L68))
- `STACK_ROUTES.ADMIN.SUPPORT_TICKET` → `AdminSupportTicketScreen` ([línea 69](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L69))
- `STACK_ROUTES.ADMIN.SUPPORT_AGENTS` → `AdminSupportAgentsScreen` ([línea 73](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L73))

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `RoleStack.Navigator`, `RoleStack.Screen`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo), [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L139) (pasa a component), [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9) (pasa a component), [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21) (pasa a component), [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9) (pasa a component), [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17) (pasa a component), [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10) (pasa a component), [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37) (pasa a component), [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35) (pasa a component), [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71) (pasa a component) y 12 más.
- **Lo usa** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L128) (pasa a component).

#### [`SoporteStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L81) · componente React

Registra las pantallas de trabajo de soporte y sus parámetros de navegación.

**Entradas de navegación**

- `STACK_ROUTES.SOPORTE.TABS` → `SoporteTabs` ([línea 84](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L84))
- `STACK_ROUTES.SOPORTE.JORNADAS` → `SoporteJornadasScreen` ([línea 85](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L85))
- `STACK_ROUTES.SOPORTE.ISSUES` → `SoporteIssuesScreen` ([línea 86](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L86))
- `STACK_ROUTES.SOPORTE.ERROR_CATALOG` → `SoporteErrorCatalogScreen` ([línea 87](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L87))
- `STACK_ROUTES.SOPORTE.TICKET` → `SoporteTicketScreen` ([línea 91](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L91))

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `RoleStack.Navigator`, `RoleStack.Screen`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo), [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L159) (pasa a component), [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36) (pasa a component), [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19) (pasa a component), [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L50) (pasa a component), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101) (pasa a component).
- **Lo usa** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L131) (pasa a component).

#### [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L96) · componente React · exportación por defecto

Decide el stack inicial a partir de la sesión, el onboarding y el rol. Registra los caminos de autenticación y los grupos privados de Android.

**Entradas de navegación**

- `ROOT_ROUTES.AUTH` → `AuthFlowScreen` ([línea 119](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L119))
- `ROOT_ROUTES.CLIENTE` → `ClienteTabs` ([línea 122](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L122))
- `ROOT_ROUTES.NEGOCIO` → `NegocioTabs` ([línea 125](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L125))
- `ROOT_ROUTES.ADMIN` → `AdminStackNavigator` ([línea 128](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L128))
- `ROOT_ROUTES.SOPORTE` → `SoporteStackNavigator` ([línea 131](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L131))

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `role mediante useAppStore`, `selector state.role`, `allowAccess mediante useAppStore`, `selector state.allowAccess`, `requiresVerificationFlow mediante useAppStore`, `selector state.requiresVerificationFlow`.
- **Interfaz que monta** `Stack.Navigator`, `Stack.Screen`.
- **Hooks que llama** `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ROOT_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L1) (accede al módulo), [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22) (pasa a component), [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L101) (pasa a component), [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L120) (pasa a component).
- **Lo usa** [`App`](../../../apps/referidos-android/src/app/App.tsx#L253) (renderiza).

#### [`startRoute`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L103) · cálculo memorizado · dentro de [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L96)

Inicia `Route` y prepara sus dependencias.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de allowAccess o requiresVerificationFlow`, `role`.
- **Usa código de** [`ROOT_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L1) (accede al módulo).
- **Lo usa** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L114) (pasa a key).

### [`apps/referidos-android/src/navigation/routeKeys.ts`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L1)

Define nombres de rutas del root, pestañas y stacks. Las pantallas importan estas claves para navegar sin duplicar cadenas arbitrarias. Algunas claves de agrupación también se usan como nombres de rutas de detalle.

**Superficie que exporta.** [`ROOT_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L1), [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9), [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38).

**Módulos que lo cargan.** [`AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L4) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L6) (importa), [`AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L6) (importa), [`AdminObservabilidadScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L4) (importa), [`AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L4) (importa), [`AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L4) (importa), [`AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L4) (importa), [`ClienteInicioScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L11) (importa), [`NegocioInicioScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L9) (importa), [`SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L4) (importa), [`SoporteInicioScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L4) (importa), [`SoporteIrregularScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L4) (importa), [`SoporteTicketScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L4) (importa), [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L6) (importa), [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L6) (importa).

#### [`ROOT_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L1) · variable de módulo · exportado

Declara `ROOT_ROUTES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L40) (accede al módulo), [`startRoute`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L104) (accede al módulo), [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L119) (accede al módulo).

#### [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) · variable de módulo · exportado

Declara `TAB_ROUTES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L329) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L334) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L339) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L134) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L140) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L135) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L141) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L145) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L165) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L173) (accede al módulo), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L253) (accede al módulo), [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L105) (accede al módulo) y 3 más.

#### [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) · variable de módulo · exportado

Declara `STACK_ROUTES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L344) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L349) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L354) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L359) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L364) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L369) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L374) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L379) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L384) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L389) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L394) (accede al módulo), [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L399) (accede al módulo) y 23 más.
