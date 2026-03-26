# Referidos Android

## Alcance

`referidos-android` implementa la hermana React Native del producto.
Comparte contratos con la PWA principal, pero con shell, stores, servicios y entorno propios.

## Mapa de carpetas

- `src/app`
- `src/navigation`
- `src/features/auth`
- `src/features/cliente`
- `src/features/negocio`
- `src/features/admin`
- `src/features/support`
- `src/features/profile`
- `src/features/scanner`
- `src/shared`
- `android`

## Hallazgos de la revision

- El arranque esta mejor separado que en la PWA: `App.tsx`, navigator, stores y services cumplen papeles definidos.
- `useAuthEngine` contiene una gran parte del flujo de negocio del onboarding movil.
- El bridge de versionado ya existe en movil y replica el de web.
- `ScannerGateway.tsx` declara explicitamente un placeholder, asi que la paridad QR aun no esta cerrada.

## Detalle en esta carpeta

- `arranque-navegacion-y-stores.md`
- `flujos-y-servicios.md`
- `native-y-entorno.md`
