-- ============================================================
-- TRIGGER: Sincronizar auth.users → public.usuarios.emailConfirmado
-- Versión compatible con esquema actual de Supabase (2025)
-- ============================================================

-- 1) Crear función de sincronización
create or replace function public.sync_auth_user_to_usuarios()
returns trigger
language plpgsql
as $$
begin
  -- Solo marcar como confirmado si existe email_confirmed_at
  if NEW.email_confirmed_at is not null then
    update public.usuarios
    set emailConfirmado = true
    where id_auth = NEW.id;
  end if;

  return NEW;
end;
$$;

-- 2) Crear trigger sobre auth.users
-- IMPORTANTE:
--  - La columna correcta es email_confirmed_at
--  - Debe ser AFTER INSERT o UPDATE
--  - Debe usarse FOR EACH ROW

create trigger trg_sync_auth_user_to_usuarios
after insert or update of email_confirmed_at on auth.users
for each row
execute procedure public.sync_auth_user_to_usuarios();
