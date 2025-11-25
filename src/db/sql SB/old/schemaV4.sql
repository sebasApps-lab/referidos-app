-- file: schema.sql
-- FINAL — esquema listo para producción con integración a Supabase Auth.
-- Cambios mínimos compatibles con la app y con las políticas RLS.
-- NOTA: eliminamos el campo `password` de la tabla `usuarios` (usar Supabase Auth para contraseñas).
-- Ejecutar: primero schema.sql (esto crea las tablas desde cero).

drop table if exists reportes cascade;
drop table if exists comentarios cascade;
drop table if exists escaneos cascade;
drop table if exists qr_validos cascade;
drop table if exists promos_sucursales cascade;
drop table if exists promos cascade;
drop table if exists sucursales cascade;
drop table if exists negocios cascade;
drop table if exists usuarios cascade;

-- ============================================
-- USUARIOS
-- ============================================
create table usuarios (
id text primary key,
-- UUID del usuario en auth.users (Supabase Auth). Null hasta sincronizar.
id_auth uuid unique,

email text unique not null,
-- password eliminado: usar Supabase Auth (NO almacenar contraseñas en la tabla)
telefono text,
nombre text,
apellido text,
cedula text,
ruc text,
role text not null,

-- usado por seed / frontend
emailConfirmado boolean default false,

fechaCreacion timestamptz default now()
);

create index if not exists idx_usuarios_id_auth on usuarios(id_auth);

-- ============================================
-- NEGOCIOS
-- ============================================
create table negocios (
id text primary key,
usuarioId text references usuarios(id) on delete set null,
nombre text not null,
sector text,
direccion text,
lat numeric,
lng numeric,
imagen text,
fechaCreacion timestamptz default now()
);

-- ============================================
-- SUCURSALES
-- ============================================
create table sucursales (
id text primary key,
negocioId text references negocios(id) on delete cascade,
direccion text not null,
sector text,
lat numeric,
lng numeric,
imagen text,
fechaCreacion timestamptz default now()
);

-- ============================================
-- PROMOS
-- ============================================
create table promos (
id text primary key,
negocioId text references negocios(id) on delete cascade,
titulo text not null,
descripcion text,
inicio date,
fin date,
estado text,
canjeadosCount integer default 0,
imagen text,
fechaCreacion timestamptz default now()
);

-- ============================================
-- PROMO ↔ SUCURSAL
-- ============================================
create table promos_sucursales (
promoId text references promos(id) on delete cascade,
sucursalId text references sucursales(id) on delete cascade,
primary key (promoId, sucursalId)
);

-- ============================================
-- QR VALIDOS
-- ============================================
create table qr_validos (
id text primary key,
promoId text references promos(id) on delete cascade,
clienteId text references usuarios(id) on delete set null,
negocioId text references negocios(id) on delete cascade,
sucursalId text references sucursales(id) on delete cascade,
fechaExpira timestamptz,
canjeado boolean default false,
fechaCreacion timestamptz default now()
);

-- ============================================
-- ESCANEOS
-- ============================================
create table escaneos (
id text primary key,
qrValidoId text references qr_validos(id) on delete cascade,
clienteId text references usuarios(id) on delete set null,
fechaCreacion timestamptz default now()
);

-- ============================================
-- COMENTARIOS
-- ============================================
create table comentarios (
id text primary key,
promoId text references promos(id) on delete cascade,
clienteId text references usuarios(id) on delete set null,
estrellas numeric,
texto text,
fechaCreacion timestamptz default now()
);

-- ============================================
-- REPORTES
-- ============================================
create table reportes (
id text primary key,
reporterId text references usuarios(id) on delete set null,
reporterRole text,
targetId text,
targetType text,
texto text,
fechaCreacion timestamptz default now()
);

-- ============================================
-- ÍNDICES DE APOYO
-- ============================================
create index if not exists idx_promos_negocio on promos(negocioId);
create index if not exists idx_qr_promo on qr_validos(promoId);
create index if not exists idx_qr_cliente on qr_validos(clienteId);
create index if not exists idx_coment_promo on comentarios(promoId);
