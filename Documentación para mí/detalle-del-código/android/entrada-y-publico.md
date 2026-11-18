# Android · Entradas y código público

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/index.js`](../../../apps/referidos-android/index.js#L1)

## Símbolos y conexiones

### [`apps/referidos-android/index.js`](../../../apps/referidos-android/index.js#L1)

Registra el entrypoint Android en AppRegistry después de cargar gesture handler y el polyfill de URL. Enlaza el nombre de app con la raíz React Native.

**Dependencias del archivo.** `react-native`, [`./src/app/App`](../../../apps/referidos-android/src/app/App.tsx), [`./app.json`](../../../apps/referidos-android/app.json).

#### Acciones al cargar el módulo

- **Usa código de** [`name`](../../../apps/referidos-android/app.json) (referencia).
- **Llamadas directas en el cuerpo** [`AppRegistry.registerComponent`](../../../apps/referidos-android/index.js#L7).

#### [`registerComponent · callback`](../../../apps/referidos-android/index.js#L7) · callback de infraestructura

Aplica o guarda `Component · callback` para que el estado refleje la operación.

- **Usa código de** [`App`](../../../apps/referidos-android/src/app/App.tsx#L123) (referencia).
