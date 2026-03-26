# Arranque, auth y estado

## Boot web

- `src/main.jsx`
  Monta `BrowserRouter`, registra SW en produccion y desregistra SW en local.
- `src/App.jsx`
  Dispara `useBootstrapAuth`, logger, `AppErrorBoundary`, `ErrorRuntimeBridge`, `ModalProvider` y `PwaGuardWrapper`.

## Gate de entrada

`src/pages/AppGate.jsx` es el centro del enrutado de acceso.
Evalua:

- bootstrap activo
- usuario ausente o presente
- `onboarding.ok`
- `allowAccess`
- razones de bloqueo
- verificacion pendiente
- aceptacion legal
- password forzado para roles internos
- MFA gate

Su salida es redirigir al rol final o devolver al usuario al auth publico.

## Bootstrap auth

`src/hooks/useBootstrapAuth.js` solo dispara `bootstrapAuth()` cuando `bootstrap` sigue en `true`.
La logica pesada vive en `src/store/appStore.js`.

## `appStore.js`

Responsabilidades principales:

- login, register, logout
- bootstrap de sesion y onboarding
- reglas de seguridad local
- metodos de acceso locales
- carga y refresco de promos
- wrappers de QR y comentarios

Notas importantes:

- no persiste `usuario` ni `onboarding` para evitar usuarios fantasma al arrancar
- maneja un `bootstrapInFlightPromise` para evitar duplicados
- registra la sesion actual antes de correr onboarding
- puede degradar reglas de seguridad si una policy lo ordena

## Seguridad local

Hay dos niveles relevantes:

- `UNLOCK_LOCAL`
- `REAUTH_SENSITIVE`

La app los usa para proteger acciones con:

- biometria
- PIN
- password

Tambien abre modales (`AccessMethods`, `PinVerify`, `PasswordReauth`, etc.) segun el caso.

## Layouts con cache

`ClienteLayout` y `NegocioLayout`:

- precargan vistas base en `CacheOutlet`
- guardan scroll por seccion
- recalculan viewport con `visualViewport`
- detectan si el usuario ya tiene PIN o biometria almacenados

Esto hace que la PWA se comporte como una shell movil mas que como un sitio web tradicional.
