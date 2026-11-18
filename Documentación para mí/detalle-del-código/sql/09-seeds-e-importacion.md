# SQL auxiliar · seeds, importación territorial y apuntes Auth

[Índice SQL](README.md) · [Detalle del código](../README.md)

Los seeds conservan referencias del esquema previo. Las fichas describen las tablas de destino y sus columnas, sin transcribir los valores de contacto. (4 archivos)

## Archivos

- [seed.old](#seedold)
- [seed1.old](#seed1old)
- [import_inec_territorial.psql](#import_inec_territorialpsql)
- [triggers en auth](#triggers-en-auth)


## `seed.old`

Fuente: [seed.old](../../../apps/referidos-app/supabase/seed.old). Seed histórico con inserts para el esquema original de usuarios, negocios y promociones. Sirve para entender fixtures antiguas y contiene valores que parecen datos de contacto; conviene sustituirlos por ejemplos sintéticos antes de reutilizarlo.

### Cambios de esquema y de datos

- **Vacía `reportes`** ([L10](../../../apps/referidos-app/supabase/seed.old#L10)).
- **Vacía `comentarios`** ([L11](../../../apps/referidos-app/supabase/seed.old#L11)).
- **Vacía `qr_validos`** ([L12](../../../apps/referidos-app/supabase/seed.old#L12)).
- **Vacía `promos_sucursales`** ([L13](../../../apps/referidos-app/supabase/seed.old#L13)).
- **Vacía `promos`** ([L14](../../../apps/referidos-app/supabase/seed.old#L14)).
- **Vacía `sucursales`** ([L15](../../../apps/referidos-app/supabase/seed.old#L15)).
- **Vacía `negocios`** ([L16](../../../apps/referidos-app/supabase/seed.old#L16)).
- **Vacía `usuarios`** ([L17](../../../apps/referidos-app/supabase/seed.old#L17)).
- **Inserta datos en `usuarios`** ([L22](../../../apps/referidos-app/supabase/seed.old#L22)). Columnas de destino: `id`, `id_auth`, `email`, `role`, `nombre`, `apellido`, `telefono`, `emailConfirmado`, `fechaCreacion`.
- **Inserta datos en `negocios`** ([L31](../../../apps/referidos-app/supabase/seed.old#L31)). Columnas de destino: `id`, `usuarioId`, `nombre`, `sector`, `direccion`, `lat`, `lng`, `imagen`, `fechaCreacion`.
- **Inserta datos en `sucursales`** ([L39](../../../apps/referidos-app/supabase/seed.old#L39)). Columnas de destino: `id`, `negocioId`, `direccion`, `sector`, `lat`, `lng`, `imagen`, `fechaCreacion`.
- **Inserta datos en `promos`** ([L47](../../../apps/referidos-app/supabase/seed.old#L47)). Columnas de destino: `id`, `negocioId`, `titulo`, `descripcion`, `inicio`, `fin`, `estado`, `imagen`, `fechaCreacion`.
- **Inserta datos en `promos_sucursales`** ([L55](../../../apps/referidos-app/supabase/seed.old#L55)). Columnas de destino: `promoId`, `sucursalId`.
- **Inserta datos en `qr_validos`** ([L91](../../../apps/referidos-app/supabase/seed.old#L91)). Columnas de destino: `code`, `promo_id`, `negocio_id`, `cliente_id`, `ts_epoch`, `created_at`, `expires_at`, `status`, `biz_hash`, `promo_hash`, `user_hash`, `signature`.

## `seed1.old`

Fuente: [seed1.old](../../../apps/referidos-app/supabase/seed1.old). Seed histórico ampliado con escaneos, comentarios y reportes además de las entidades base. Las migraciones posteriores cambiaron columnas e IDs, por lo que debe cotejarse con el esquema actual y revisar los valores que parecen datos de contacto.

### Cambios de esquema y de datos

- **Vacía `reportes`** ([L10](../../../apps/referidos-app/supabase/seed1.old#L10)).
- **Vacía `comentarios`** ([L11](../../../apps/referidos-app/supabase/seed1.old#L11)).
- **Vacía `qr_validos`** ([L12](../../../apps/referidos-app/supabase/seed1.old#L12)).
- **Vacía `promos_sucursales`** ([L13](../../../apps/referidos-app/supabase/seed1.old#L13)).
- **Vacía `promos`** ([L14](../../../apps/referidos-app/supabase/seed1.old#L14)).
- **Vacía `sucursales`** ([L15](../../../apps/referidos-app/supabase/seed1.old#L15)).
- **Vacía `negocios`** ([L16](../../../apps/referidos-app/supabase/seed1.old#L16)).
- **Vacía `usuarios`** ([L17](../../../apps/referidos-app/supabase/seed1.old#L17)).
- **Inserta datos en `usuarios`** ([L22](../../../apps/referidos-app/supabase/seed1.old#L22)). Columnas de destino: `id`, `id_auth`, `email`, `role`, `nombre`, `apellido`, `telefono`, `emailConfirmado`, `fechaCreacion`.
- **Inserta datos en `usuarios`** ([L31](../../../apps/referidos-app/supabase/seed1.old#L31)). Columnas de destino: `id`, `id_auth`, `email`, `role`, `nombre`, `apellido`, `telefono`, `emailConfirmado`, `fechaCreacion`.
- **Inserta datos en `usuarios`** ([L45](../../../apps/referidos-app/supabase/seed1.old#L45)). Columnas de destino: `id`, `id_auth`, `email`, `role`, `nombre`, `apellido`, `telefono`, `emailConfirmado`, `fechaCreacion`.
- **Inserta datos en `negocios`** ([L66](../../../apps/referidos-app/supabase/seed1.old#L66)). Columnas de destino: `id`, `usuarioId`, `nombre`, `sector`, `direccion`, `lat`, `lng`, `imagen`, `fechaCreacion`.
- **Inserta datos en `negocios`** ([L74](../../../apps/referidos-app/supabase/seed1.old#L74)). Columnas de destino: `id`, `usuarioId`, `nombre`, `sector`, `direccion`, `lat`, `lng`, `imagen`, `fechaCreacion`.
- **Inserta datos en `sucursales`** ([L88](../../../apps/referidos-app/supabase/seed1.old#L88)). Columnas de destino: `id`, `negocioId`, `direccion`, `sector`, `lat`, `lng`, `imagen`, `fechaCreacion`.
- **Inserta datos en `promos`** ([L120](../../../apps/referidos-app/supabase/seed1.old#L120)). Columnas de destino: `id`, `negocioId`, `titulo`, `descripcion`, `inicio`, `fin`, `estado`, `imagen`, `fechaCreacion`.
- **Inserta datos en `promos_sucursales`** ([L162](../../../apps/referidos-app/supabase/seed1.old#L162)). Columnas de destino: `promoId`, `sucursalId`.
- **Inserta datos en `qr_validos`** ([L246](../../../apps/referidos-app/supabase/seed1.old#L246)). Columnas de destino: `id`, `code`, `promo_id`, `negocio_id`, `cliente_id`, `ts_epoch`, `created_at`, `expires_at`, `redeemed_at`, `status`, `biz_hash`, `promo_hash`, `user_hash`, `signature`, `redeemed_by`.
- **Inserta datos en `escaneos`** ([L282](../../../apps/referidos-app/supabase/seed1.old#L282)). Columnas de destino: `id`, `qrvalidoid`, `clienteid`, `fechacreacion`.
- **Inserta datos en `comentarios`** ([L291](../../../apps/referidos-app/supabase/seed1.old#L291)). Columnas de destino: `id`, `promoId`, `clienteId`, `estrellas`, `texto`, `fechaCreacion`.
- **Inserta datos en `reportes`** ([L306](../../../apps/referidos-app/supabase/seed1.old#L306)). Columnas de destino: `id`, `reporterId`, `reporterRole`, `targetId`, `targetType`, `texto`, `fechaCreacion`.

## `import_inec_territorial.psql`

Fuente: [import_inec_territorial.psql](../../../tooling/scripts/import_inec_territorial.psql). Carga el catálogo territorial de Ecuador. Importa el CSV en una tabla temporal, limpia nombres vacíos y aplica un upsert por nivel dentro de una transacción. Los formularios de direcciones consultan estas tablas.

### Objetos que introduce o redefine

- **Tabla temporal `inec_territorial_raw`** ([L5](../../../tooling/scripts/import_inec_territorial.psql#L5)). Capa temporal de importación que conserva las columnas del CSV antes de poblar catálogos normalizados. Columnas de esta definición: `provincia_id text`, `provincia_nombre text`, `canton_id text`, `canton_nombre text`, `parroquia_id text`, `parroquia_nombre text`, `parroquia_tipo text`, `anio text`.

### Cambios de esquema y de datos

- **Vacía `inec_territorial_raw`** ([L16](../../../tooling/scripts/import_inec_territorial.psql#L16)).
- **psql importa `inec_territorial_raw`** ([L18](../../../tooling/scripts/import_inec_territorial.psql#L18)). Copia al staging temporal desde el CSV del catálogo territorial.
- **Inserta datos en `public.provincias`** ([L20](../../../tooling/scripts/import_inec_territorial.psql#L20)). Columnas de destino: `id`, `nombre`. Maneja conflicto según la clave indicada.  Lee `inec_territorial_raw`.
- **Inserta datos en `public.cantones`** ([L30](../../../tooling/scripts/import_inec_territorial.psql#L30)). Columnas de destino: `id`, `provincia_id`, `nombre`. Maneja conflicto según la clave indicada.  Lee `inec_territorial_raw`.
- **Inserta datos en `public.parroquias`** ([L44](../../../tooling/scripts/import_inec_territorial.psql#L44)). Columnas de destino: `id`, `canton_id`, `provincia_id`, `nombre`, `tipo`. Maneja conflicto según la clave indicada.  Lee `inec_territorial_raw`.

## `triggers en auth`

Fuente: [triggers en auth](../../../triggers%20en%20auth). Apuntes históricos sobre dos sincronizaciones desde Auth. Contienen nombres y cuerpos de borrador sin una declaración ejecutable completa. El estado de cada trigger se consulta en las migraciones que lo instalan o redefinen.

### Borradores nombrados

- **`trg_sync_auth_user_profile`** ([L1](../../../triggers%20en%20auth#L1)). Bosqueja una sincronización de datos de perfil desde una fila de Auth hacia `usuarios` usando la relación de identidad. La declaración versionada se encuentra en [sync_auth_user_profile](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L552) y [CREATE TRIGGER](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L568).
- **`trg_sync_auth_user_to_usuarios`** ([L13](../../../triggers%20en%20auth#L13)). Bosqueja la proyección de confirmación de correo de Auth hacia la columna histórica del perfil. Compáralo con [primera función](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L534), [CREATE TRIGGER](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L547) y [redefinición posterior](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L68).

### Cambios de esquema y de datos

- **Actualiza datos de `usuarios`** ([L3](../../../triggers%20en%20auth#L3)). Campos escritos: `email`, `telefono`, `nombre`, `role`. Aplica un filtro.
- **Actualiza datos de `usuarios`** ([L16](../../../triggers%20en%20auth#L16)). Campos escritos: `emailConfirmado`. Aplica un filtro.
