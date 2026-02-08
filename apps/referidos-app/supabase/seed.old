-- ============================================
-- 20250205_000002_seed.sql
-- SEED FINAL 2025 — re-ejecutable
-- IMPORTANTE:
-- - id_auth queda NULL (luego el script JS sincroniza)
-- - Los triggers no afectan porque insertamos directo
-- ============================================

-- Limpieza total (sin errores si está vacío)
truncate table reportes cascade;
truncate table comentarios cascade;
truncate table qr_validos cascade;
truncate table promos_sucursales cascade;
truncate table promos cascade;
truncate table sucursales cascade;
truncate table negocios cascade;
truncate table usuarios cascade;

------------------------------------------------
-- USUARIOS DEMO (id_auth = NULL → se sincroniza con JS)
------------------------------------------------
insert into usuarios (id, id_auth, email, role, nombre, apellido, telefono, emailConfirmado, fechaCreacion)
values
  ('USR_ADMIN', null, 'admin@gmail.com', 'admin', 'Admin', 'Demo', '0990000000', true, now()),
  ('USR_NEG_1', null, 'tienda@gmail.com', 'negocio', 'Negocio', 'Demo', '0991110000', true, now()),
  ('USR_CLI_1', null, 'user@gmail.com', 'cliente', 'Cliente', 'Demo', '0992220000', true, now());

------------------------------------------------
-- NEGOCIOS
------------------------------------------------
insert into negocios (id, usuarioId, nombre, sector, direccion, lat, lng, imagen, fechaCreacion)
values
  ('NEG_001', 'USR_NEG_1', 'Pizzería La Rueda', 'La Mariscal', 'Av. Principal 123',
   -0.180653, -78.467834, null, now());

------------------------------------------------
-- SUCURSALES
------------------------------------------------
insert into sucursales (id, negocioId, direccion, sector, lat, lng, imagen, fechaCreacion)
values
  ('SUC_001', 'NEG_001', 'Av. Principal 123', 'La Mariscal',
   -0.180653, -78.467834, null, now());

------------------------------------------------
-- PROMOS
------------------------------------------------
insert into promos (id, negocioId, titulo, descripcion, inicio, fin, estado, imagen, fechaCreacion)
values
  ('PRO_001', 'NEG_001', '2x1 pizzas', 'Dos pizzas medianas al precio de una.',
   '2025-01-01', '2025-12-31', 'activo', null, now());

------------------------------------------------
-- PROMOS x SUCURSALES
------------------------------------------------
insert into promos_sucursales (promoId, sucursalId)
values ('PRO_001', 'SUC_001');

------------------------------------------------
-- QR VALIDOS
------------------------------------------------
with base as (
  select
    'PRO_001'::text as promo_id,
    'NEG_001'::text as negocio_id,
    'USR_CLI_1'::text as cliente_id,
    floor(extract(epoch from now()))::bigint as ts
),
payload as (
  select
    promo_id,
    negocio_id,
    cliente_id,
    ts,
    short_hash(negocio_id) as biz,
    short_hash(promo_id) as prm,
    short_hash(cliente_id) as usr
  from base
),
signed as (
  select
    promo_id,
    negocio_id,
    cliente_id,
    ts,
    biz,
    prm,
    usr,
    sign_qr(biz || prm || usr || ts::text, 8) as sig
  from payload
)
insert into qr_validos (
  code,
  promo_id,
  negocio_id,
  cliente_id,
  ts_epoch,
  created_at,
  expires_at,
  status,
  biz_hash,
  promo_hash,
  user_hash,
  signature
)
select
  format('qrv-%s-%s-%s-%s-%s', biz, prm, usr, ts::text, sig),
  promo_id,
  negocio_id,
  cliente_id,
  ts,
  to_timestamp(ts),
  to_timestamp(ts) + interval '30 minutes',
  'valido',
  biz,
  prm,
  usr,
  sig
from signed;

