-- seed.sql
-- Ejecutar en SQL editor de Supabase (Private). Contiene TRUNCATE (destructivo) + inserts de datos simulados.
-- Hecho para ser re-ejecutable en entornos de development.

-- ADVERTENCIA: este script TRUNCATE las tablas listadas.
truncate table reportes cascade;
truncate table escaneos cascade;
truncate table qr_validos cascade;
truncate table comentarios cascade;
truncate table promos_sucursales cascade;
truncate table promos cascade;
truncate table sucursales cascade;
truncate table negocios cascade;
truncate table usuarios cascade;

-- ============================
-- USUARIOS
-- ============================
insert into usuarios (id, nombre, email, password, role, telefono, emailConfirmado, referidosCount, fechaCreacion)
values
('USR_001', 'Cliente Demo', '[user@gmail.com](mailto:user@gmail.com)', 'user', 'cliente', '0991110001', true, 0, now()),
('USR_002', 'Carlos Moya', '[carlos.moya@example.com](mailto:carlos.moya@example.com)', 'Carlos123', 'cliente', '0991110002', true, 2, now()),
('USR_003', 'Negocio Demo', '[tienda@gmail.com](mailto:tienda@gmail.com)', 'tienda', 'negocio', '0990000000', true, 0, now()),
('USR_004', 'Admin Demo', '[admin@gmail.com](mailto:admin@gmail.com)', 'admin', 'admin', null, true, 0, now()),
('USR_005', 'Ana Pérez', '[ana.perez@example.com](mailto:ana.perez@example.com)', 'Ana12345', 'cliente', '0991110003', true, 0, now());

-- ============================
-- NEGOCIOS
-- ============================
insert into negocios (id, usuarioId, nombre, categoria, sector, direccion, lat, lng, imagen, referidosCount, fechaCreacion)
values
('NEG_001', 'USR_003', 'Pizzería La Rueda', 'Pizzería', 'La Mariscal', 'Av. Principal 123', -0.180653, -78.467834, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg)', 12, now()),
('NEG_002', null, 'Café Central', 'Café / Desayunos', 'La Floresta', 'Calle 45 #7-89', -0.182, -78.47, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_cafe_central.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_cafe_central.jpg)', 6, now()),
('NEG_003', null, 'Tienda Verde', 'Tienda / Salud', 'Cumbayá', 'Mall Centro', -0.179, -78.466, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_tienda_verde.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_tienda_verde.jpg)', 3, now());

-- ============================
-- SUCURSALES (primarias)
-- ============================
insert into sucursales (id, negocioId, direccion, sector, lat, lng, imagen, fechaCreacion)
values
('SUC_001', 'NEG_001', 'Av. Principal 123', 'La Mariscal', -0.180653, -78.467834, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg)', now()),
('SUC_002', 'NEG_002', 'Calle 45 #7-89', 'La Floresta', -0.182, -78.47, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg)', now()),
('SUC_003', 'NEG_003', 'Mall Centro', 'Cumbayá', -0.179, -78.466, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg)', now());

-- ============================
-- PROMOS (id = qrBaseId / PRO_)
-- Generamos por cada negocio promos activas + inactivas + pendientes
-- ============================
insert into promos (id, negocioId, titulo, descripcion, inicio, fin, estado, canjeadosCount, imagen, fechaCreacion)
values
('PRO_001', 'NEG_001', '2x1 en pizzas medianas', 'Llévate 2 pizzas medianas por el precio de 1.', '2025-01-01', '2025-12-31', 'activo', 5, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg)', now()),
('PRO_002', 'NEG_001', 'Combo familiar - 20% off', 'Combo para 4 personas con bebida incluida.', '2025-01-01', '2025-06-30', 'activo', 2, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg)', now()),
('PRO_003', 'NEG_001', 'Promo inactiva ejemplo', 'Promo antigua (inactiva).', '2024-01-01', '2024-02-01', 'inactivo', 0, null, now()),
('PRO_004', 'NEG_001', 'Promo pendiente ejemplo', 'En cola para revisión', '2025-02-01', '2025-06-01', 'pendiente', 0, null, now()),

('PRO_011', 'NEG_002', '2x1 en capuchino', '2 capuchinos por el precio de 1 (mañanas).', '2025-01-10', '2025-03-31', 'activo', 3, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_cafe_central.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_cafe_central.jpg)', now()),
('PRO_012', 'NEG_002', '10% off en pastelería', 'Descuento en toda la sección de pastelería.', '2025-01-01', '2025-04-30', 'activo', 1, null, now()),
('PRO_013', 'NEG_002', 'Inactiva café', 'Promo terminada.', '2024-01-01', '2024-02-01', 'inactivo', 0, null, now()),
('PRO_014', 'NEG_002', 'Pendiente café', 'En cola', '2025-02-05', '2025-06-05', 'pendiente', 0, null, now()),

('PRO_021', 'NEG_003', 'Compra 2 lleva 3', 'Oferta en productos seleccionados.', '2025-01-01', '2025-12-31', 'activo', 4, '[https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_tienda_verde.jpg](https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_tienda_verde.jpg)', now()),
('PRO_022', 'NEG_003', '15% off orgánicos', 'Descuento en orgánicos.', '2025-01-01', '2025-07-01', 'activo', 0, null, now()),
('PRO_023', 'NEG_003', 'Inactiva tienda', 'Promo vieja.', '2024-01-01', '2024-03-01', 'inactivo', 0, null, now()),
('PRO_024', 'NEG_003', 'Pendiente tienda', 'Revisión pendiente', '2025-03-01', '2025-05-01', 'pendiente', 0, null, now());

-- ============================
-- PROMO ↔ SUCURSALES
-- ============================
insert into promos_sucursales (promoId, sucursalId)
values
('PRO_001', 'SUC_001'),
('PRO_002', 'SUC_001'),
('PRO_011', 'SUC_002'),
('PRO_021', 'SUC_003');

-- ============================
-- QR VÁLIDO (ejemplos)
-- ============================
insert into qr_validos (id, promoId, clienteId, negocioId, sucursalId, fechaExpira, canjeado, fechaCreacion)
values
('QRV_001', 'PRO_001', 'USR_001', 'NEG_001', 'SUC_001', now() + interval '1 hour', false, now()),
('QRV_002', 'PRO_011', 'USR_002', 'NEG_002', 'SUC_002', now() + interval '2 hours', false, now()),
('QRV_003', 'PRO_021', 'USR_001', 'NEG_003', 'SUC_003', now() + interval '3 days', true, now() - interval '1 day'); -- ejemplo canjeado

-- ============================
-- ESCANEOS (histórico)
-- ============================
insert into escaneos (id, qrValidoId, clienteId, fechaCreacion)
values
('ESC_001', 'QRV_001', 'USR_001', now() - interval '10 minutes'),
('ESC_002', 'QRV_002', 'USR_002', now() - interval '30 minutes'),
('ESC_003', 'QRV_003', 'USR_001', now() - interval '2 days');

-- ============================
-- COMENTARIOS (2-4 por promo activa/inactiva)
-- ============================
insert into comentarios (id, promoId, clienteId, estrellas, texto, fechaCreacion)
values
('COM_001','PRO_001','USR_001',5,'Excelente pizza', now() - interval '10 days'),
('COM_002','PRO_001','USR_002',4,'Muy buena', now() - interval '8 days'),
('COM_003','PRO_002','USR_001',4.5,'Buena promo', now() - interval '5 days'),
('COM_004','PRO_011','USR_002',4,'Buen café', now() - interval '2 days'),
('COM_005','PRO_021','USR_001',5,'Gran oferta', now() - interval '6 days');

-- ============================
-- REPORTES (ejemplo)
-- ============================
insert into reportes (id, reporterId, reporterRole, targetId, targetType, texto, fechaCreacion)
values
('REP_001','USR_001','cliente','NEG_001','negocio','Atención lenta', now());

-- FIN del seed
