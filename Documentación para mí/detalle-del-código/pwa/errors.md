# PWA principal · Errores y respuestas de UI

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L1)

Conecta el bus de errores y decisiones de política con acciones de UI y modales.

**Superficie que exporta.** [`ErrorRuntimeBridge`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L5).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L11) (importa).

**Dependencias del archivo.** `react`, [`../services/errorPolicyService`](../../../apps/referidos-app/src/services/errorPolicyService.js), [`../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`ErrorRuntimeBridge`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L5) · función · exportación por defecto

Implementa `Error Runtime Bridge` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Retorno visible o tipo declarado** `null`.
- **Hooks que llama** `useEffect`.
- **Lo usa** [`App`](../../../apps/referidos-app/src/App.jsx#L44) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L6) · callback de infraestructura · dentro de [`ErrorRuntimeBridge`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ErrorRuntimeBridge`.

- **Efectos y APIs** `unsubscribe`.
- **Usa código de** [`subscribeErrorEvents`](../../../apps/referidos-app/src/services/loggingClient.js#L195) (llama), [`executeErrorPolicy`](../../../apps/referidos-app/src/services/errorPolicyService.js#L83) (llama).
- **Llamadas directas en el cuerpo** [`subscribeErrorEvents`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L7), [`executeErrorPolicy`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L8), [`unsubscribe`](../../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx#L10).
