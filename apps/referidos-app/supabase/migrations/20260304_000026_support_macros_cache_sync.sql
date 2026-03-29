-- 20260304_000026_support_macros_cache_sync.sql
-- Cache local read-only de macros/categorias de soporte + cold sync dispatch.

begin;

create extension if not exists "pgcrypto" with schema extensions;

create table if not exists public.support_macro_categories_cache (
  id uuid primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  code text not null check (length(trim(code)) > 0),
  label text not null check (length(trim(label)) > 0),
  description text,
  app_targets text[] not null default '{all}'::text[]
    check (
      cardinality(app_targets) > 0
      and app_targets <@ array['all', 'referidos_app', 'prelaunch_web', 'android_app']::text[]
    ),
  sort_order integer not null default 100,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  source_updated_at timestamptz,
  source_seq bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create index if not exists idx_support_macro_categories_cache_tenant_status
  on public.support_macro_categories_cache (tenant_id, status, sort_order, created_at desc);

drop trigger if exists trg_support_macro_categories_cache_touch_updated_at on public.support_macro_categories_cache;
create trigger trg_support_macro_categories_cache_touch_updated_at
before update on public.support_macro_categories_cache
for each row execute function public.touch_updated_at();

create table if not exists public.support_macros_cache (
  id uuid primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  category_id uuid references public.support_macro_categories_cache(id) on delete set null,
  category_code text,
  code text not null check (length(trim(code)) > 0),
  title text not null check (length(trim(title)) > 0),
  body text not null check (length(trim(body)) > 0),
  thread_status text
    check (
      thread_status is null
      or thread_status in ('new', 'assigned', 'in_progress', 'waiting_user', 'queued', 'closed', 'cancelled')
    ),
  audience_roles text[] not null default '{cliente,negocio}'::text[]
    check (
      cardinality(audience_roles) > 0
      and audience_roles <@ array['cliente', 'negocio', 'soporte', 'admin']::text[]
    ),
  app_targets text[] not null default '{all}'::text[]
    check (
      cardinality(app_targets) > 0
      and app_targets <@ array['all', 'referidos_app', 'prelaunch_web', 'android_app']::text[]
    ),
  env_targets text[] not null default '{all}'::text[]
    check (
      cardinality(env_targets) > 0
      and env_targets <@ array['all', 'dev', 'staging', 'prod']::text[]
    ),
  sort_order integer not null default 100,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  source_updated_at timestamptz,
  source_seq bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create index if not exists idx_support_macros_cache_tenant_status
  on public.support_macros_cache (tenant_id, status, sort_order, created_at desc);

create index if not exists idx_support_macros_cache_tenant_category
  on public.support_macros_cache (tenant_id, category_id, created_at desc);

drop trigger if exists trg_support_macros_cache_touch_updated_at on public.support_macros_cache;
create trigger trg_support_macros_cache_touch_updated_at
before update on public.support_macros_cache
for each row execute function public.touch_updated_at();

create table if not exists public.support_macro_sync_state (
  tenant_id uuid primary key references public.tenants(id) on delete cascade,
  last_seq bigint not null default 0,
  last_synced_at timestamptz,
  last_success_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_support_macro_sync_state_touch_updated_at on public.support_macro_sync_state;
create trigger trg_support_macro_sync_state_touch_updated_at
before update on public.support_macro_sync_state
for each row execute function public.touch_updated_at();

create or replace function public.support_macro_cache_default_tenant_id(
  p_tenant_name text default 'ReferidosAPP'
)
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
begin
  select t.id
    into v_tenant_id
  from public.tenants t
  where lower(t.name) = lower(coalesce(trim(p_tenant_name), ''))
  order by t.created_at asc
  limit 1;

  if v_tenant_id is null then
    select t.id
      into v_tenant_id
    from public.tenants t
    order by t.created_at asc
    limit 1;
  end if;

  return v_tenant_id;
end;
$$;

grant execute on function public.support_macro_cache_default_tenant_id(text) to authenticated;
grant execute on function public.support_macro_cache_default_tenant_id(text) to service_role;

create or replace function public.support_macros_trigger_cold_dispatch()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cfg record;
  v_url text;
  v_req_id bigint;
begin
  if not exists (select 1 from pg_extension where extname = 'pg_net') then
    return null;
  end if;

  select c.*
    into v_cfg
  from public.ops_sync_runtime_config c
  where c.enabled = true
  order by c.updated_at desc
  limit 1;

  if not found then
    return null;
  end if;

  v_url := rtrim(v_cfg.runtime_base_url, '/') || '/functions/v1/ops-support-macros-sync-dispatch';

  select net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-ops-sync-cron-token', v_cfg.cron_token
    ),
    body := jsonb_build_object(
      'mode', 'cold',
      'trigger', 'pg_cron'
    )
  )
  into v_req_id;

  return v_req_id;
end;
$$;

grant execute on function public.support_macros_trigger_cold_dispatch() to service_role;
grant execute on function public.support_macros_trigger_cold_dispatch() to authenticated;

insert into public.support_macro_sync_state (tenant_id)
select t.id
from public.tenants t
where not exists (
  select 1
  from public.support_macro_sync_state s
  where s.tenant_id = t.id
);

grant select on public.support_macro_categories_cache to authenticated;
grant select on public.support_macros_cache to authenticated;
grant select on public.support_macro_sync_state to authenticated;

grant select, insert, update, delete on public.support_macro_categories_cache to service_role;
grant select, insert, update, delete on public.support_macros_cache to service_role;
grant select, insert, update, delete on public.support_macro_sync_state to service_role;

alter table public.support_macro_categories_cache enable row level security;
alter table public.support_macros_cache enable row level security;
alter table public.support_macro_sync_state enable row level security;

drop policy if exists support_macro_categories_cache_select_support_admin on public.support_macro_categories_cache;
create policy support_macro_categories_cache_select_support_admin
  on public.support_macro_categories_cache
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists support_macros_cache_select_support_admin on public.support_macros_cache;
create policy support_macros_cache_select_support_admin
  on public.support_macros_cache
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists support_macro_sync_state_select_support_admin on public.support_macro_sync_state;
create policy support_macro_sync_state_select_support_admin
  on public.support_macro_sync_state
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop view if exists public.support_threads_inbox;

create view public.support_threads_inbox
as
select
  t.public_id,
  t.category,
  t.severity,
  t.status,
  t.summary,
  t.created_at,
  t.updated_at,
  t.assigned_agent_id,
  t.created_by_agent_id,
  t.assigned_agent_phone,
  t.user_public_id,
  t.request_origin,
  t.origin_source,
  t.is_anonymous,
  t.personal_queue,
  t.anon_profile_id,
  a.public_id as anon_public_id,
  a.display_name as anon_display_name,
  a.contact_channel as anon_contact_channel,
  public.mask_support_contact(a.contact_channel, a.contact_value) as contact_display,
  case
    when t.request_origin = 'anonymous' then array['anonymous', t.category::text, t.severity::text]
    else array['registered', t.category::text, t.severity::text]
  end as routing_tags,
  t.app_channel
from public.support_threads t
left join public.anon_support_profiles a on a.id = t.anon_profile_id;

do $$
begin
  execute 'alter view public.support_threads_inbox set (security_invoker = true)';
exception
  when others then
    null;
end $$;

grant select on public.support_threads_inbox to authenticated;

do $$
declare
  v_jobid bigint;
begin
  if not exists (select 1 from pg_extension where extname = 'pg_cron') then
    return;
  end if;

  select j.jobid
    into v_jobid
  from cron.job j
  where j.jobname = 'support_macros_cold_sync_3h'
  limit 1;

  if v_jobid is not null then
    perform cron.unschedule(v_jobid);
  end if;

  perform cron.schedule(
    'support_macros_cold_sync_3h',
    '11 */3 * * *',
    $job$select public.support_macros_trigger_cold_dispatch();$job$
  );
end;
$$;

commit;
