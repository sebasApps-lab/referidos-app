# Estado Android: limpieza macros de soporte

Fecha de actualizacion: `2026-03-07`.

La limpieza del sistema legacy de macros/categorias en Android quedo cerrada.

## Estado actual

1. `apps/referidos-android/src/features/support/SoporteTicketScreen.tsx` consume macros runtime desde cache (`support_macro_categories_cache` y `support_macros_cache`) y usa acciones nuevas del backend compartido.
2. `apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx` ya no usa categorias hardcode; carga categorias runtime.
3. `apps/referidos-android/src/shared/constants/supportDesk.ts` conserva solo filtros de inbox/estado; ya no expone listas legacy de macros o categorias.
4. El filtro de macros en Android aplica por `app_targets`, `env_targets`, `thread_status` y categoria del ticket.

## Cierre validado

1. Android muestra macros publicadas del cache runtime.
2. No quedan imports activos de listas hardcode de macros/categorias para soporte en Android.
3. `lint`, `typecheck` y `assembleDebug` quedaron verdes despues de la migracion.
4. La paridad total Android vs `referidos-app` sigue teniendo otras brechas fuera de esta limpieza puntual; este documento ya no debe usarse como backlog activo.

