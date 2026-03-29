-- 20260320_000039_support_apps_ops_cache_sync.sql
-- Runtime: support_apps queda como cache read-only (authenticated) sincronizada desde OPS.

begin;

create table if not exists public.support_app_sync_state (
  tenant_id uuid primary key references public.tenants(id) on delete cascade,
  source_project_ref text,
  source_env_key text,
  synced_count integer not null default 0,
  last_synced_at timestamptz,
  last_success_at timestamptz,
  last_error text,
  updated_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1
    from pg_proc
    where proname = 'touch_updated_at'
      and pg_function_is_visible(oid)
  ) then
    execute 'drop trigger if exists trg_support_app_sync_state_touch_updated_at on public.support_app_sync_state';
    execute 'create trigger trg_support_app_sync_state_touch_updated_at before update on public.support_app_sync_state for each row execute function public.touch_updated_at()';
  end if;
end;
$$;

grant select on public.support_app_sync_state to authenticated;
grant select, insert, update on public.support_app_sync_state to service_role;

alter table public.support_app_sync_state enable row level security;

drop policy if exists support_app_sync_state_select_support_admin on public.support_app_sync_state;
create policy support_app_sync_state_select_support_admin
  on public.support_app_sync_state
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

revoke insert, update, delete on public.support_apps from authenticated;

drop policy if exists support_apps_admin_insert on public.support_apps;
drop policy if exists support_apps_admin_update on public.support_apps;
drop policy if exists support_apps_admin_delete on public.support_apps;

commit;
