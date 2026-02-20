# Pendientes Android: limpieza macros de soporte

Fecha: `2026-02-20`.

Este documento deja explicitamente pendiente la parte Android de la limpieza de sistema legacy de macros.

## Alcance pendiente (solo Android)

1. Reemplazar hardcode de macros en:
   - `apps/referidos-android/src/shared/constants/supportDesk.ts`
   - `apps/referidos-android/src/features/support/SoporteTicketScreen.tsx`
2. Reemplazar categorias hardcode de soporte en:
   - `apps/referidos-android/src/shared/constants/supportCategories.ts` (si aplica)
3. Consumir catalogo desde cache runtime (`support_macro_categories_cache` y `support_macros_cache`) via cliente/servicio Android.
4. Aplicar filtro de macros por:
   - app objetivo (`android_app` o `all`)
   - entorno (`dev|staging|prod|all`)
   - estado de ticket (`thread_status`)
5. Eliminar constantes legacy Android despues de validar paridad funcional.

## Criterios de cierre

1. Android muestra solo macros publicadas del cache runtime.
2. No quedan imports activos de listas hardcode de macros/categorias para soporte en Android.
3. Flujo de ticket Android mantiene comportamiento actual (sin regresiones de UX).
4. Documentacion Android actualizada con nuevo origen de datos.

