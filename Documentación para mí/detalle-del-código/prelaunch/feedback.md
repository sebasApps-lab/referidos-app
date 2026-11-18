# Prelaunch · feedback

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/feedback/feedbackApi.js`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/feedback/feedbackApi.js`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L1)

Adapta nombre, correo, mensaje e identidad de la superficie al cliente público de feedback. Maneja la ausencia de configuración.

**Superficie que exporta.** [`submitPublicFeedback`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L3).

**Módulos que lo cargan.** [`useFeedbackPageController.js`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L3) (importa).

**Dependencias del archivo.** [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js).

#### [`submitPublicFeedback`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L3) · función · asíncrona · exportado

Emite o envía `Public Feedback` en el flujo del archivo.

- **Entradas** `{name, email, message, originRole, originSource, sourceRoute, sourceSurface, honeypot, context} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de prelaunchClient`.
- **Usa código de** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) (llama), [`getDefaultUtm`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L14), [`prelaunchClient.feedback.submit`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L19), [`getDefaultUtm`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L29).
- **Lo usa** [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L184) (llama).
