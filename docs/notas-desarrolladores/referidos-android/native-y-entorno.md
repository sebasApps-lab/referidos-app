# Native y entorno

## Configuracion de entorno

`src/shared/constants/env.ts` resuelve valores desde:

1. `apps/referidos-android/env.json`
2. `process.env`

Variables criticas:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `APP_VERSION`
- `AUTH_REDIRECT_URL`

## Integracion nativa

Archivos clave:

- `android/build.gradle`
- `android/app/build.gradle`
- `android/settings.gradle`
- `babel.config.cjs`
- `metro.config.cjs`
- `react-native.config.js`

## Comandos raiz utiles

- `npm run android:metro`
- `npm run android:run`
- `npm run android:assemble:debug`
- `npm run android:gradle:tasks`

## Checks operativos

Desde la raiz tambien existen scripts por fase:

- `android:phase1:health`
- `android:phase2:auth-check`
- `android:phase3:shell-check`
- `android:phase4:cliente-check`
- `android:phase5:negocio-check`
- `android:phase6:native-check`
- `android:phase7:observability-check`
- `android:phase8:support-admin-check`
- `android:phase9:parity-check`
- `android:phase9:release-check`

## Observacion de revision

La app Android esta pensada como migracion controlada y no como fork libre.
Eso se refleja en:

- README con guardrails explicitos
- scripts de verificacion por fase
- dependencia fuerte en contratos compartidos
