# Macros de soporte centralizados en OPS (cache runtime read-only)

Fecha de referencia: `2026-02-20`.

## 1) Objetivo

Centralizar macros y categorias de soporte en `referidos-ops` para:

- editar/publicar/archivar desde panel admin sin migraciones por cada cambio
- evitar divergencia entre `dev/staging/prod`
- mantener lectura local rÃ¡pida en cada runtime mediante cache read-only por entorno

Resultado operativo:

- **admin panel macros**: escribe en OPS
- **soporte/admin al atender tickets**: leen cache local del entorno (`support_*_cache`)
- sincronizaciÃ³n OPS -> runtime por hot sync + cold sync

## 2) Arquitectura final

### 2.1 Control plane (OPS)

Proyecto: `ymhaveuksdzlfuecvkmx`

Tablas:

- `public.support_macro_categories`
- `public.support_macros`
- `public.support_macro_change_log` (delta feed con `seq`)

Funciones edge OPS:

- `ops-support-macros-admin` (CRUD de catalogo)
- `ops-support-macros-sync` (entrega cambios incrementales por `after_seq`)

### 2.2 Runtime por entorno (dev/staging/prod)

Tablas cache:

- `public.support_macro_categories_cache`
- `public.support_macros_cache`
- `public.support_macro_sync_state`

Funciones edge runtime:

- `support-ops-proxy` (admin UI -> OPS admin)
- `ops-support-macros-sync-dispatch` (trae delta de OPS y aplica en cache local)

## 3) Flujo de datos

### 3.1 Escritura (admin macros)

1. Admin usa `/admin/soporte/macros`.
2. Frontend invoca `support-ops-proxy`.
3. `support-ops-proxy` valida admin local.
4. Proxy llama `ops-support-macros-admin` en OPS (token interno).
5. OPS persiste en `support_macro_categories` / `support_macros`.
6. Trigger escribe evento delta en `support_macro_change_log`.

### 3.2 Lectura (soporte/admin tickets)

1. Soporte/Admin abre inbox o ticket.
2. UI lee `support_macro_categories_cache` y `support_macros_cache`.
3. Se filtra por:
   - `app_targets`
   - `env_targets`
   - estado del ticket (`thread_status`)
   - estado de publicaciÃ³n (`status = published`)

### 3.3 Sync hot/cold

- **Hot**: cada 1 minuto cuando hay panel activo (inbox soporte/admin).
- **Cold**: cada 3 horas por cron (`support_macros_cold_sync_3h`).
- Sync state por tenant en `support_macro_sync_state`.

## 4) Regla de targeting por app

Soportado:

- `all`
- `referidos_app`
- `prelaunch_web`
- `android_app`

Regla:

- Si macro tiene `app_targets = ['all']`, se muestra para cualquier app.
- Si macro tiene `app_targets` especÃ­fico, solo se muestra en tickets de esa app.

Aplica igual para categorias en panel de macros (organizaciÃ³n por app).

## 5) Estados del catalogo

Categorias y macros usan:

- `draft`
- `published`
- `archived`

OperaciÃ³n esperada:

- Crear: siempre en `draft`.
- Activar: mover a `published`.
- Desactivar: mover a `archived`.

## 6) Seguridad y auth

`verify_jwt = false` en funciones internas, con validaciÃ³n explÃ­cita:

- llamadas de usuario: JWT + perfil (`admin` o `soporte` segÃºn funciÃ³n)
- llamadas internas: header token compartido

Funciones runtime:

- `support-ops-proxy` -> solo `admin`
- `ops-support-macros-sync-dispatch` -> `admin/soporte` o token cron interno

Funciones OPS:

- `ops-support-macros-admin` -> `admin` o token proxy interno
- `ops-support-macros-sync` -> `admin/soporte` o token proxy interno

## 7) Secrets requeridos

### 7.1 Runtime (`dev`, `staging`, `prod`)

- `SUPPORT_OPS_URL=https://ymhaveuksdzlfuecvkmx.supabase.co`
- `SUPPORT_OPS_SECRET_KEY=<ops_secret_key>`
- `SUPPORT_OPS_SHARED_TOKEN=<token_compartido_runtime_ops>`
- `SUPPORT_MACROS_SOURCE_PROJECT_REF=<ref_del_runtime>`
- `SUPPORT_MACROS_SOURCE_ENV_KEY=dev|staging|prod`
- `SUPPORT_MACROS_HOT_BATCH_LIMIT=400` (opcional)
- `SUPPORT_MACROS_COLD_BATCH_LIMIT=1000` (opcional)
- `SUPPORT_MACROS_CRON_TOKEN=<token_cron>` (recomendado)

### 7.2 OPS

- `SUPPORT_OPS_SHARED_TOKEN=<mismo_token_compartido_runtime_ops>`

## 8) Deploy de funciones

### 8.1 OPS

```powershell
cd apps/referidos-ops
supabase functions deploy ops-support-macros-admin --project-ref ymhaveuksdzlfuecvkmx --no-verify-jwt
supabase functions deploy ops-support-macros-sync --project-ref ymhaveuksdzlfuecvkmx --no-verify-jwt
```

### 8.2 Runtime (ejemplo prod)

```powershell
cd apps/referidos-app
supabase functions deploy support-ops-proxy --project-ref ztcsrfwvjgqnmhnlpeye --no-verify-jwt
supabase functions deploy ops-support-macros-sync-dispatch --project-ref ztcsrfwvjgqnmhnlpeye --no-verify-jwt
```

## 9) ValidaciÃ³n post-deploy

1. Abrir `/admin/soporte/macros`.
2. Crear categoria en `draft`.
3. Publicar categoria.
4. Crear macro en `draft` y luego publicar.
5. Abrir inbox soporte/admin y validar que aparece sin recargar manual.
6. Verificar `support_macro_sync_state.last_success_at` en runtime.

## 10) Riesgos conocidos y decisiÃ³n de diseÃ±o

- Riesgo: divergencia temporal entre OPS y runtime.
  - mitigaciÃ³n: hot sync por panel + cold sync por cron.
- Riesgo: cambios masivos.
  - mitigaciÃ³n: sync incremental por `seq` y lÃ­mites de batch.
- Riesgo: fuga por funciÃ³n sin JWT.
  - mitigaciÃ³n: validaciÃ³n interna de token + rol explÃ­cito.

## 11) Limpieza legacy aplicada (web/runtime)

Estado aplicado en esta ejecucion:

1. Se retiro tabla legacy runtime `public.support_macros`.
2. Se removieron fallbacks estaticos web de macros/categorias en `packages/support-sdk`.
3. El consumo web/admin/soporte queda solo por cache runtime:
   - `support_macro_categories_cache`
   - `support_macros_cache`

## 12) Pendientes Android

Las tareas Android se mantienen fuera de este cambio y estan documentadas en:

- `docs/referidos-system/android-support-cleanup-pending.md`

