-- 20260226_000019_obs_release_snapshots_and_component_resolution.sql
-- Sincroniza snapshots de release desde control plane y resuelve componente/revision en eventos.

begin;

create table if not exists public.obs_release_snapshots (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  app_id text not null,
  product_key text not null,
  env_key text not null check (env_key in ('dev', 'staging', 'prod')),
  version_label text not null,
  version_release_id text,
  source_commit_sha text,
  snapshot_hash text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, app_id, env_key, version_label)
);

create index if not exists idx_obs_release_snapshots_lookup
  on public.obs_release_snapshots (tenant_id, app_id, env_key, version_label, created_at desc);

create index if not exists idx_obs_release_snapshots_release
  on public.obs_release_snapshots (tenant_id, product_key, env_key, version_release_id);

drop trigger if exists trg_obs_release_snapshots_touch_updated_at on public.obs_release_snapshots;
create trigger trg_obs_release_snapshots_touch_updated_at
before update on public.obs_release_snapshots
for each row execute function public.touch_updated_at();

create table if not exists public.obs_release_snapshot_components (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  snapshot_id uuid not null references public.obs_release_snapshots(id) on delete cascade,
  component_key text not null,
  component_type text,
  component_name text,
  revision_id text,
  revision_no integer,
  revision_bump_level text,
  revision_source_commit_sha text,
  revision_source_branch text,
  path_globs jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint obs_release_snapshot_components_path_globs_array
    check (jsonb_typeof(path_globs) = 'array'),
  unique (snapshot_id, component_key)
);

create index if not exists idx_obs_release_snapshot_components_snapshot
  on public.obs_release_snapshot_components (tenant_id, snapshot_id, component_key);

create index if not exists idx_obs_release_snapshot_components_component
  on public.obs_release_snapshot_components (tenant_id, component_key, revision_no desc);

grant select on public.obs_release_snapshots to authenticated;
grant select on public.obs_release_snapshot_components to authenticated;
grant select, insert, update, delete on public.obs_release_snapshots to service_role;
grant select, insert, update, delete on public.obs_release_snapshot_components to service_role;

alter table public.obs_release_snapshots enable row level security;
alter table public.obs_release_snapshot_components enable row level security;

drop policy if exists obs_release_snapshots_select_admin_support on public.obs_release_snapshots;
create policy obs_release_snapshots_select_admin_support
  on public.obs_release_snapshots
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.obs_is_admin() or public.obs_is_support())
  );

drop policy if exists obs_release_snapshots_admin_write on public.obs_release_snapshots;
create policy obs_release_snapshots_admin_write
  on public.obs_release_snapshots
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.obs_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.obs_is_admin()
  );

drop policy if exists obs_release_snapshot_components_select_admin_support on public.obs_release_snapshot_components;
create policy obs_release_snapshot_components_select_admin_support
  on public.obs_release_snapshot_components
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.obs_is_admin() or public.obs_is_support())
  );

drop policy if exists obs_release_snapshot_components_admin_write on public.obs_release_snapshot_components;
create policy obs_release_snapshot_components_admin_write
  on public.obs_release_snapshot_components
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.obs_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.obs_is_admin()
  );

alter table public.obs_events
  add column if not exists release_version_label text,
  add column if not exists release_semver text,
  add column if not exists release_version_id text,
  add column if not exists release_source_commit_sha text,
  add column if not exists resolved_component_key text,
  add column if not exists resolved_component_type text,
  add column if not exists resolved_component_revision_no integer,
  add column if not exists resolved_component_revision_id text,
  add column if not exists component_resolution_method text default 'unresolved';

update public.obs_events
set component_resolution_method = coalesce(component_resolution_method, 'unresolved');

alter table public.obs_events
  alter column component_resolution_method set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'obs_events_component_resolution_method_check'
  ) then
    alter table public.obs_events
      add constraint obs_events_component_resolution_method_check
      check (
        component_resolution_method in ('explicit_context', 'stack_path_glob', 'unresolved')
      );
  end if;
end $$;

create index if not exists idx_obs_events_tenant_release_version_occurred
  on public.obs_events (tenant_id, release_version_label, occurred_at desc);

create index if not exists idx_obs_events_tenant_component_revision_occurred
  on public.obs_events (tenant_id, resolved_component_key, resolved_component_revision_no, occurred_at desc)
  where resolved_component_key is not null;

create or replace view public.support_log_events as
select
  e.id,
  e.tenant_id,
  e.user_id,
  e.auth_user_id,
  e.level,
  coalesce(e.support_category, nullif(trim(e.context->>'category'), '')) as category,
  e.event_type,
  e.message,
  e.request_id,
  e.trace_id,
  e.session_id,
  coalesce(e.support_route, nullif(trim(e.context->>'route'), '')) as route,
  coalesce(e.support_screen, nullif(trim(e.context->>'screen'), '')) as screen,
  coalesce(e.support_flow, nullif(trim(e.context->>'flow'), '')) as flow,
  coalesce(e.support_flow_step, nullif(trim(e.context->>'flow_step'), '')) as flow_step,
  e.support_thread_id as thread_id,
  e.context,
  coalesce(
    e.support_context_extra,
    case
      when jsonb_typeof(e.context->'extra') = 'object' then e.context->'extra'
      else '{}'::jsonb
    end
  ) as context_extra,
  e.device,
  e.release,
  e.user_ref,
  e.ip_hash,
  e.app_id,
  e.source,
  e.occurred_at,
  e.created_at,
  e.support_received_at,
  e.retention_tier,
  e.retention_expires_at,
  e.release_version_label,
  e.release_semver,
  e.release_version_id,
  e.release_source_commit_sha,
  e.resolved_component_key,
  e.resolved_component_type,
  e.resolved_component_revision_no,
  e.resolved_component_revision_id,
  e.component_resolution_method
from public.obs_events e
where e.event_domain = 'support';

do $$
begin
  execute 'alter view public.support_log_events set (security_invoker = true)';
exception
  when others then
    null;
end $$;

grant select on public.support_log_events to authenticated;
revoke all on public.support_log_events from anon;

commit;
