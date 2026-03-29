-- 20260310_000033_support_runtime_flags.sql
-- Flags runtime para controlar autorizaciones de soporte.

create table if not exists public.support_runtime_flags (
  id integer primary key default 1 check (id = 1),
  require_session_authorization boolean not null default false,
  require_jornada_authorization boolean not null default true,
  updated_by uuid null references public.usuarios(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.support_runtime_flags (
  id,
  require_session_authorization,
  require_jornada_authorization
)
values (1, false, true)
on conflict (id) do nothing;

drop trigger if exists trg_support_runtime_flags_touch_updated_at
  on public.support_runtime_flags;
create trigger trg_support_runtime_flags_touch_updated_at
before update on public.support_runtime_flags
for each row execute function public.touch_updated_at();

alter table public.support_runtime_flags enable row level security;

grant select on public.support_runtime_flags to authenticated;
grant select, insert, update, delete on public.support_runtime_flags to service_role;

drop policy if exists support_runtime_flags_select_support_admin
  on public.support_runtime_flags;
create policy support_runtime_flags_select_support_admin
  on public.support_runtime_flags
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role in ('admin', 'soporte')
    )
  );

drop policy if exists support_runtime_flags_admin_manage
  on public.support_runtime_flags;
create policy support_runtime_flags_admin_manage
  on public.support_runtime_flags
  for all
  to authenticated
  using (
    exists (
      select 1
      from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

