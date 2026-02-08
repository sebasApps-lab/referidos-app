-- ============================================
-- Eliminar trigger y función de creación automática de perfil
-- (usamos Edge Function para crear perfiles)
-- ============================================

-- 1) Eliminar el trigger del esquema auth
drop trigger if exists on_auth_user_created on auth.users;

-- 2) Eliminar posibles funciones handle_new_user en ambos esquemas

-- Versión en public (plantilla vieja de Supabase)
drop function if exists public.handle_new_user() cascade;

-- Versión en auth (definida en tus migraciones previas, si existe)
drop function if exists auth.handle_new_user() cascade;

-- 3) Asegurarse de que ya no hay default de role en public.usuarios
alter table public.usuarios
  alter column role drop default;

-- (opcional) Dejar comentario para el futuro
comment on table public.usuarios is
  'Perfiles creados explícitamente por la app/Edge Functions. No se crean desde triggers de auth.users.';
