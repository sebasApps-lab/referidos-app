-- 20250226_000002_rls_direcciones_codigosregistro.sql
-- RLS + policies for direcciones, add owner_id to direcciones, and lock codigos_registro.

BEGIN;

-- Direcciones ownership
alter table public.direcciones
  add column if not exists owner_id text references public.usuarios(id) on delete set null;

create index if not exists idx_direcciones_owner_id on public.direcciones (owner_id);

-- Enable RLS
alter table public.direcciones enable row level security;

-- Policies for direcciones (owner only)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'direcciones'
      and policyname = 'direcciones_select_owner'
  ) then
    create policy direcciones_select_owner on public.direcciones
      for select to authenticated
      using (
        exists (
          select 1 from public.usuarios u
          where u.id = direcciones.owner_id
            and u.id_auth = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'direcciones'
      and policyname = 'direcciones_insert_owner'
  ) then
    create policy direcciones_insert_owner on public.direcciones
      for insert to authenticated
      with check (
        exists (
          select 1 from public.usuarios u
          where u.id = direcciones.owner_id
            and u.id_auth = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'direcciones'
      and policyname = 'direcciones_update_owner'
  ) then
    create policy direcciones_update_owner on public.direcciones
      for update to authenticated
      using (
        exists (
          select 1 from public.usuarios u
          where u.id = direcciones.owner_id
            and u.id_auth = auth.uid()
        )
      )
      with check (
        exists (
          select 1 from public.usuarios u
          where u.id = direcciones.owner_id
            and u.id_auth = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'direcciones'
      and policyname = 'direcciones_delete_owner'
  ) then
    create policy direcciones_delete_owner on public.direcciones
      for delete to authenticated
      using (
        exists (
          select 1 from public.usuarios u
          where u.id = direcciones.owner_id
            and u.id_auth = auth.uid()
        )
      );
  end if;
end$$;

-- Renombrar tabla antes de aplicar permisos
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public'
      and table_name = 'codigosregistro'
  ) and not exists (
    select 1 from information_schema.tables
    where table_schema = 'public'
      and table_name = 'codigos_registro'
  ) then
    alter table public.codigosregistro rename to codigos_registro;
  end if;
end$$;

-- Nadie desde frontend
revoke all on table public.codigos_registro from anon, authenticated;

COMMIT;
