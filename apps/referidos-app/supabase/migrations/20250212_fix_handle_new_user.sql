-- Ajuste del trigger de creación de perfil y campo de estado de registro
-- - Se neutraliza handle_new_user para no crear ni asignar rol por defecto.
-- - Se elimina el default 'cliente' en usuarios.role.
-- - Se añade columna registro_estado para controlar onboarding.

-- Quitar trigger previo
drop trigger if exists on_auth_user_created on auth.users;

-- Neutralizar función handle_new_user
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

-- Volver a crear el trigger apuntando al no-op (mantiene estructura pero sin crear perfil)
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Eliminar default de role para evitar rol "cliente" implícito
alter table public.usuarios
  alter column role drop default;

-- Añadir estado de registro
alter table public.usuarios
  add column if not exists registro_estado text default 'incompleto';
