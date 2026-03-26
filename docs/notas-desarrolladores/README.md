# Notas para desarrolladores

Estas notas resumen la revision del monorepo desde el codigo actual.
La idea es dejar una lectura por app que complemente los READMEs existentes y el sistema de docs operativo del repo.

## Orden sugerido

1. `arquitectura-compartida.md`
2. `referidos-app/`
3. `referidos-android/`
4. `prelaunch/`
5. `referidos-pwa/`
6. `referidos-ops/`

## Lectura rapida de la revision

- `referidos-app` es la implementacion canonica del producto y el mayor integrador de modulos compartidos.
- `referidos-android` ya comparte contratos, observability y bridges operativos, pero mantiene varias superficies en fase de paridad.
- `prelaunch` es una app separada, bien definida para captacion, ayuda y soporte anonimo.
- `referidos-pwa` debe tratarse como sandbox visual o superficie de experimentacion.
- `referidos-ops` es backend operativo puro: versionado, deploy pipeline, artifacts y catalogos OPS.

## Arbol

- `arquitectura-compartida.md`
- `referidos-app/README.md`
- `referidos-app/arranque-auth-y-estado.md`
- `referidos-app/modulos-y-rutas.md`
- `referidos-app/backend-y-edge-functions.md`
- `referidos-android/README.md`
- `referidos-android/arranque-navegacion-y-stores.md`
- `referidos-android/flujos-y-servicios.md`
- `referidos-android/native-y-entorno.md`
- `prelaunch/README.md`
- `prelaunch/runtime-rutas-y-servicios.md`
- `referidos-pwa/README.md`
- `referidos-pwa/arquitectura-y-superficies.md`
- `referidos-ops/README.md`
- `referidos-ops/funciones-y-responsabilidades.md`
