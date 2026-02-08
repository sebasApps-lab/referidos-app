alter table public.usuarios
  add column if not exists verification_status text default 'unverified';

do $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'usuarios'
      and c.conname = 'usuarios_verification_status_check'
  ) then
    alter table public.usuarios
      add constraint usuarios_verification_status_check
      check (verification_status in ('unverified','in_progress','verified','skipped'));
  end if;
end $$;

alter table public.usuarios
  drop column if exists has_facebook,
  drop column if exists has_google,
  drop column if exists has_apple,
  drop column if exists has_discord,
  drop column if exists has_twitter;
