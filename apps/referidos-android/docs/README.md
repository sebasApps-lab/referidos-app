# Android app (android_app)

## Ruta

- `apps/referidos-android`

## Objetivo

App hermana Android (React Native) dentro del mismo monorepo.

## Comandos utiles

Desde raiz del repo:

```powershell
npm run android:metro
```

```powershell
npm run android:run
```

```powershell
npm run android:assemble:debug
```

## Integracion con versionado

Producto versionado:

- `android_app`

Fuentes relevantes de cambios:

- `apps/referidos-android/src/**`
- `apps/referidos-android/android/**`
- `packages/api-client/src/**`
- `packages/platform-rn/src/**`
- `packages/observability-sdk/src/**`

Regla practica:

- cambios de contrato en `packages/*` compartidos pueden exigir bump mayor.
- cambios de UI o fixes internos suelen ser minor/patch.

## Setup Android

Para setup y troubleshooting detallado usa tambien:

- `apps/referidos-android/README.md`

## Referencias

- `docs/referidos-system/README.md`
- `versioning/component-map.json`

Nota:
- por ahora el bridge de versionado (`versioning-ops-proxy`) esta implementado en PWA.
- Android mantiene endpoint puente legacy temporal y se migra despues.
