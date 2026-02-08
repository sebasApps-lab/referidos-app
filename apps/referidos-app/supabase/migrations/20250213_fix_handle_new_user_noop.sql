-- Neutralizar creación automática de perfil y rol por defecto al registrar usuarios en auth
-- Esta migración reemplaza el trigger on_auth_user_created por un no-op
-- y elimina el default de role para evitar asignar 'cliente' implícito.

-- Quitar trigger previo (si existe)
drop trigger if exists on_auth_user_created on auth.users;

-- Reemplazar función por no-op
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
begin
  return new;
end
$$;

-- Volver a crear el trigger apuntando al no-op (estructura se mantiene, sin insertar perfil)
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Eliminar default de role para que no se asigne 'cliente' automáticamente
alter table public.usuarios
  alter column role drop default;

-- Asegurar columna de estado de registro para controlar onboarding
alter table public.usuarios
  add column if not exists registro_estado text default 'incompleto';
