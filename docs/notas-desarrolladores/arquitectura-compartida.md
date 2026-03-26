# Arquitectura compartida

## Estructura del workspace

El repo usa `workspaces` en:

- `apps/*`
- `packages/*`

Apps revisadas:

- `apps/referidos-app`
- `apps/referidos-android`
- `apps/prelaunch`
- `apps/referidos-pwa`
- `apps/referidos-ops`

## Paquetes compartidos importantes

- `packages/api-client`
  Cliente comun para onboarding, validacion de registro, direcciones, soporte, logs y prelaunch.
- `packages/domain`
  Reglas de auth, roles, pasos, validadores y normalizadores.
- `packages/support-sdk`
  UI y runtime del panel de soporte, mas cliente de soporte web.
- `packages/observability`
  Cliente, runtime de errores, politica UX y schema de envelopes para web.
- `packages/observability-sdk`
  Variante movil para Android.
- `packages/platform-web`
  secure storage, biometrics y device info del runtime web.
- `packages/platform-rn`
  secure storage, biometrics, pin policy y device info en React Native.
- `packages/security-core`
  politicas de unlock y acciones sensibles.
- `packages/notifications-sdk`
  politicas y hooks de notificaciones por rol.
- `packages/legal-content`
  markdown legal reutilizable en web, admin y Android.

## Configuracion runtime

- `referidos-app`
  Combina `import.meta.env` con `window.__REFERIDOS_RUNTIME_CONFIG__`.
- `prelaunch`
  Combina `import.meta.env` con `window.__PRELAUNCH_RUNTIME_CONFIG__`.
- `referidos-android`
  Prefiere `apps/referidos-android/env.json`; si no existe, usa `process.env`.

## Backends y planos de responsabilidad

- Runtime principal de negocio:
  `apps/referidos-app/supabase/functions/**`
- Control plane operativo:
  `apps/referidos-ops/supabase/functions/**`

La UI de admin no pega directo al proyecto OPS.
Usa bridges del runtime principal como `versioning-ops-proxy` y `support-ops-proxy`.

## Componentizacion logica oficial

`versioning/component-map.json` ya declara componentes logicos por producto.
Ese archivo es la mejor referencia para:

- impacto de cambios
- contratos compartidos
- agrupacion de features
- reglas de versionado

## Hallazgos de arquitectura

- La PWA principal centraliza mucha logica en un store Zustand grande.
- Android esta mejor seccionado por stores y servicios, pero depende del mismo contrato backend.
- Prelaunch esta claramente aislada del core transaccional y solo comparte clientes y observability.
- `referidos-pwa` no deberia usarse como verdad funcional del producto.
