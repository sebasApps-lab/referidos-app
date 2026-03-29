# Runtime, rutas y servicios

## Entry point

`src/main.jsx` monta rutas para:

- `/`
- `/components`
- `/negocios`
- `/ayuda/es`
- `/ayuda-negocios/es`
- `/soporte-chat`
- `/soporte-correo`
- `/feedback`

Tambien inicializa observability con `initPrelaunchObservability()`.

## Landings

- `waitlist-landing/WaitlistLandingPage.jsx`
  detecta desktop o mobile por UA y soporta scroll por hash
- `business-landing/BusinessLandingPage.jsx`
  fuerza arbol desktop para la experiencia comercial

## Runtime config

`src/config/runtimeConfig.js` combina:

- `import.meta.env`
- `window.__PRELAUNCH_RUNTIME_CONFIG__`

Valores clave:

- `appEnv`
- `appId`
- `appVersion`
- `buildId`
- `releaseId`
- `appChannel`
- `supabaseUrl`
- `supabasePublishableKey`

## Servicios

### `prelaunchSystem.js`

Construye `createPrelaunchClient()` con:

- tenant hint
- app channel
- identity key prefix

Tambien:

- extrae UTM desde la URL
- ingesta eventos analytics

### `waitlistApi.js`

- normaliza email
- resuelve rol cliente/negocio
- envia consentimiento y UTM
- devuelve `missing_env` si el runtime no puede crear el cliente

### `supportApi.js`

Expone soporte anonimo:

- crear hilo
- listar categorias
- cancelar hilo
- consultar estado
- pedir retoma

### `prelaunchObservability.js`

- crea adapter para `functions.invoke`
- registra release via `obs-release`
- usa `obs-ingest` y `obs-policy`
- levanta runtime de errores desde `@referidos/observability`

## Lectura de revision

Prelaunch esta bien acotada.
Su complejidad no viene de la UI, sino de amarrar captacion, UTM, soporte anonimo y observability sin convertirse en otra copia del producto principal.
