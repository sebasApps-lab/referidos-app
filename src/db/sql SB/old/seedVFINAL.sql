-- seed.sql
-- Versión FINAL — seed re-ejecutable (destructivo).
-- EJECUTAR: después de schema.sql.
-- NOTA: id_auth queda NULL; ejecutar el script de migración (service_role) para crear usuarios en Supabase Auth
--       y actualizar usuarios.id_auth. No guardamos contraseñas en la tabla.

truncate table reportes cascade;
truncate table comentarios cascade;
truncate table escaneos cascade;
truncate table qr_validos cascade;
truncate table promos_sucursales cascade;
truncate table promos cascade;
truncate table sucursales cascade;
truncate table negocios cascade;
truncate table usuarios cascade;

-- ============================================
-- Usuarios demo (id_auth null; sincronizar con migrate script)
-- ============================================
insert into usuarios (id, id_auth, email, role, nombre, apellido, telefono, emailConfirmado, fechaCreacion)
values
  ('USR_ADMIN', null, 'admin@gmail.com', 'admin', 'Admin', 'Demo', '0990000000', true, now()),
  ('USR_NEG_1', null, 'tienda@gmail.com', 'negocio', 'Negocio', 'Demo', '0991110000', true, now()),
  ('USR_CLI_1', null, 'user@gmail.com', 'cliente', 'Cliente', 'Demo', '0992220000', true, now());

-- ============================================
-- Negocios
-- ============================================
insert into negocios (id, usuarioId, nombre, sector, direccion, lat, lng, imagen, fechaCreacion)
values
  ('NEG_001', 'USR_NEG_1', 'Pizzería La Rueda', 'La Mariscal', 'Av. Principal 123', -0.180653, -78.467834, null, now());

-- ============================================
-- Sucursales
-- ============================================
insert into sucursales (id, negocioId, direccion, sector, lat, lng, imagen, fechaCreacion)
values
  ('SUC_001', 'NEG_001', 'Av. Principal 123', 'La Mariscal', -0.180653, -78.467834, null, now());

-- ============================================
-- Promos
-- ============================================
insert into promos (id, negocioId, titulo, descripcion, inicio, fin, estado, imagen, fechaCreacion)
values
  ('PRO_001', 'NEG_001', '2x1 pizzas', 'Dos pizzas medianas al precio de una.', '2025-01-01', '2025-12-31', 'activo', null, now());

-- ============================================
-- Promos ↔ Sucursal
-- ============================================
insert into promos_sucursales (promoId, sucursalId)
values
  ('PRO_001', 'SUC_001');

-- ============================================
-- QR válidos
-- ============================================
insert into qr_validos (id, promoId, clienteId, negocioId, sucursalId, fechaExpira, canjeado, fechaCreacion)
values
  ('QRV_001', 'PRO_001', 'USR_CLI_1', 'NEG_001', 'SUC_001', now() + interval '1 hour', false, now());
