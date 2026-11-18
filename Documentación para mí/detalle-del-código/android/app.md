# Android · Inicio de React Native

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/app/App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/app/App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L1)

Llama a `bootstrapAuth` en montaje, decide qué mostrar durante carga o error, monta el árbol con zonas seguras y navegación y centraliza instrumentación. Escucha `AppState`, dimensiones y ruta para que el SDK asocie eventos al contexto. Registra el manejador global de errores y vacía eventos al pasar a segundo plano.

**Superficie que exporta.** [`App`](../../../apps/referidos-android/src/app/App.tsx#L123).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-android/index.js#L4) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, `react-native-safe-area-context`, [`@navigation/RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx), [`@shared/ui/GlobalLoader`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/modals/ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx), [`@shared/constants/env`](../../../apps/referidos-android/src/shared/constants/env.ts), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts).

#### [`readNetworkSummary`](../../../apps/referidos-android/src/app/App.tsx#L19) · función

Extrae o interpreta `Network Summary` de los argumentos, estado o datos de entrada.

- **Retorno visible o tipo declarado** `online`, `effective_type`, `downlink`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L167) (llama), [`addEventListener · callback`](../../../apps/referidos-android/src/app/App.tsx#L181) (llama), [`setInterval · callback`](../../../apps/referidos-android/src/app/App.tsx#L197) (llama).

#### [`readDeviceSummary`](../../../apps/referidos-android/src/app/App.tsx#L35) · función

Extrae o interpreta `Device Summary` de los argumentos, estado o datos de entrada.

- **Entradas** `appStateOverride?`.
- **Retorno visible o tipo declarado** `platform`, `os_version`, `model`, `locale`, `appearance`, `is_rtl`, `window`, `app_state`.
- **Llamadas directas en el cuerpo** [`Dimensions.get`](../../../apps/referidos-android/src/app/App.tsx#L36), [`Appearance.getColorScheme`](../../../apps/referidos-android/src/app/App.tsx#L52).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L168) (llama), [`addEventListener · callback`](../../../apps/referidos-android/src/app/App.tsx#L182) (llama), [`addEventListener · callback`](../../../apps/referidos-android/src/app/App.tsx#L191) (llama).

#### [`toErrorPayload`](../../../apps/referidos-android/src/app/App.tsx#L59) · función

Implementa `to Error Payload` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `error`.
- **Retorno visible o tipo declarado** `name`, `message`, `stack`.
- **Condiciones que evalúa** `error`.
- **Lo usa** [`installGlobalErrorTracking`](../../../apps/referidos-android/src/app/App.tsx#L88) (llama), [`unhandledHandler`](../../../apps/referidos-android/src/app/App.tsx#L104) (llama).

#### [`installGlobalErrorTracking`](../../../apps/referidos-android/src/app/App.tsx#L74) · función

Coordina cambios de estado durante `install Global Error Tracking`.

- **Actualizaciones de estado o acciones** `setGlobalHandler`.
- **Condiciones que evalúa** `function`, `function y previousHandler`, `globalAny.onunhandledrejection`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`errorUtils.getGlobalHandler`](../../../apps/referidos-android/src/app/App.tsx#L79), [`errorUtils.setGlobalHandler`](../../../apps/referidos-android/src/app/App.tsx#L83), [`observability.track`](../../../apps/referidos-android/src/app/App.tsx#L84), [`toErrorPayload`](../../../apps/referidos-android/src/app/App.tsx#L88), [`previousHandler`](../../../apps/referidos-android/src/app/App.tsx#L92).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L177) (llama).

#### [`unhandledHandler`](../../../apps/referidos-android/src/app/App.tsx#L98) · función · dentro de [`installGlobalErrorTracking`](../../../apps/referidos-android/src/app/App.tsx#L74)

Función auxiliar de `installGlobalErrorTracking` para `unhandled Handler`.

- **Entradas** `event`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `function`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.track`](../../../apps/referidos-android/src/app/App.tsx#L100), [`toErrorPayload`](../../../apps/referidos-android/src/app/App.tsx#L104), [`previousUnhandled`](../../../apps/referidos-android/src/app/App.tsx#L107).
- **Lo usa** [`installGlobalErrorTracking`](../../../apps/referidos-android/src/app/App.tsx#L111) (referencia).

#### [`App`](../../../apps/referidos-android/src/app/App.tsx#L123) · componente React · exportación por defecto

Monta `GlobalLoader`, `SafeAreaProvider`, `NavigationContainer`, `RootNavigator`, `ModalHost`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `bootStatus mediante useAppStore`, `selector state.bootStatus`, `bootError mediante useAppStore`, `selector state.bootError`, `role mediante useAppStore`, `selector state.role`, `onboarding mediante useAppStore`, `selector state.onboarding`, `bootstrapAuth mediante useAppStore`, `selector state.bootstrapAuth`, `appStartAtRef mediante useRef`, `bootReadyTrackedRef mediante useRef`, `firstRouteTrackedRef mediante useRef`.
- **Interfaz que monta** `GlobalLoader`, `SafeAreaProvider`, `NavigationContainer`, `RootNavigator`, `ModalHost`.
- **Hooks que llama** `useAppStore`, `useNavigationContainerRef`, `useRef`, `useEffect`.
- **Condiciones que evalúa** `bootStatus`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`GlobalLoader`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L8) (renderiza), [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L96) (renderiza), [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L20) (renderiza).
- **Lo usa** [`registerComponent · callback`](../../../apps/referidos-android/index.js#L7) (referencia).

#### [`syncRouteContext`](../../../apps/referidos-android/src/app/App.tsx#L134) · callback React · dentro de [`App`](../../../apps/referidos-android/src/app/App.tsx#L123)

Atiende `NavigationContainer.onReady`, `NavigationContainer.onStateChange` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `NavigationContainer.onReady`, `NavigationContainer.onStateChange`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setContext`.
- **Condiciones que evalúa** `ausencia de firstRouteTrackedRef.current y routeName`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigationRef.getCurrentRoute`](../../../apps/referidos-android/src/app/App.tsx#L135), [`observability.setContext`](../../../apps/referidos-android/src/app/App.tsx#L137), [`observability.track`](../../../apps/referidos-android/src/app/App.tsx#L145).
- **Lo usa** [`App`](../../../apps/referidos-android/src/app/App.tsx#L250) (pasa a onReady).

#### [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L157) · callback de infraestructura · dentro de [`App`](../../../apps/referidos-android/src/app/App.tsx#L123)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `App`.

- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-android/src/app/App.tsx#L158).

#### [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L161) · callback de infraestructura · dentro de [`App`](../../../apps/referidos-android/src/app/App.tsx#L123)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `App`.

- **Actualizaciones de estado o acciones** `setContext`, `setContextProvider`, `clearInterval`.
- **Efectos y APIs** `AppState.addEventListener`, `Dimensions.addEventListener`, `setInterval`, `clearInterval`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo), [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L37) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.setContext`](../../../apps/referidos-android/src/app/App.tsx#L162), [`readNetworkSummary`](../../../apps/referidos-android/src/app/App.tsx#L167), [`readDeviceSummary`](../../../apps/referidos-android/src/app/App.tsx#L168), [`observability.setContextProvider`](../../../apps/referidos-android/src/app/App.tsx#L172), [`installGlobalErrorTracking`](../../../apps/referidos-android/src/app/App.tsx#L177), [`AppState.addEventListener`](../../../apps/referidos-android/src/app/App.tsx#L178), [`Dimensions.addEventListener`](../../../apps/referidos-android/src/app/App.tsx#L189), [`setInterval`](../../../apps/referidos-android/src/app/App.tsx#L195), [`clearInterval`](../../../apps/referidos-android/src/app/App.tsx#L202), [`appStateSub.remove`](../../../apps/referidos-android/src/app/App.tsx#L203), [`dimensionsSub.remove`](../../../apps/referidos-android/src/app/App.tsx#L204), [`cleanupGlobalErrors`](../../../apps/referidos-android/src/app/App.tsx#L206) y 1 más.

#### [`addEventListener · callback`](../../../apps/referidos-android/src/app/App.tsx#L178) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L161)

Recibe eventos de la suscripción o listener registrado por `useEffect · callback`.

- **Entradas** `nextState`.
- **Actualizaciones de estado o acciones** `setContext`.
- **Condiciones que evalúa** `nextState`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.setContext`](../../../apps/referidos-android/src/app/App.tsx#L179), [`readNetworkSummary`](../../../apps/referidos-android/src/app/App.tsx#L181), [`readDeviceSummary`](../../../apps/referidos-android/src/app/App.tsx#L182), [`observability.flush`](../../../apps/referidos-android/src/app/App.tsx#L185).

#### [`addEventListener · callback`](../../../apps/referidos-android/src/app/App.tsx#L189) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L161)

Recibe eventos de la suscripción o listener registrado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setContext`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.setContext`](../../../apps/referidos-android/src/app/App.tsx#L190), [`readDeviceSummary`](../../../apps/referidos-android/src/app/App.tsx#L191).

#### [`setInterval · callback`](../../../apps/referidos-android/src/app/App.tsx#L195) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L161)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setContext`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.setContext`](../../../apps/referidos-android/src/app/App.tsx#L196), [`readNetworkSummary`](../../../apps/referidos-android/src/app/App.tsx#L197).

#### [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L211) · callback de infraestructura · dentro de [`App`](../../../apps/referidos-android/src/app/App.tsx#L123)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `App`.

- **Actualizaciones de estado o acciones** `setContext`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.setContext`](../../../apps/referidos-android/src/app/App.tsx#L213).

#### [`useEffect · callback`](../../../apps/referidos-android/src/app/App.tsx#L224) · callback de infraestructura · dentro de [`App`](../../../apps/referidos-android/src/app/App.tsx#L123)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `App`.

- **Condiciones que evalúa** `bootStatus o bootReadyTrackedRef.current`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.track`](../../../apps/referidos-android/src/app/App.tsx#L228).
