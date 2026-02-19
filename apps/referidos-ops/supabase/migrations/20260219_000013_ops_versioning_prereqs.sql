-- 20260219_000013_ops_versioning_prereqs.sql
-- Minimal prerequisites so versioning migrations can run in referidos-ops.

begin;

create extension if not exists "pgcrypto" with schema extensions;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

insert into public.tenants (name, status)
values ('ReferidosAPP', 'active')
on conflict (name) do nothing;

create table if not exists public.usuarios (
  id uuid primary key default gen_random_uuid(),
  id_auth uuid not null unique,
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  role text not null
    check (role in ('admin', 'soporte', 'cliente', 'negocio')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_usuarios_touch_updated_at on public.usuarios;
create trigger trg_usuarios_touch_updated_at
before update on public.usuarios
for each row execute function public.touch_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.usuarios u
    where u.id_auth = auth.uid()
      and u.role = 'admin'
  );
$$;

create or replace function public.is_support()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.usuarios u
    where u.id_auth = auth.uid()
      and u.role = 'soporte'
  );
$$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_support() to authenticated;
grant execute on function public.is_admin() to service_role;
grant execute on function public.is_support() to service_role;

commit;

