begin;

create extension if not exists pgcrypto;

create table if not exists public.version_build_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid references public.version_products(id) on delete set null,
  env_id uuid references public.version_environments(id) on delete set null,
  release_id uuid references public.version_releases(id) on delete set null,
  deploy_request_id uuid references public.version_deploy_requests(id) on delete set null,
  deployment_row_id uuid references public.version_deployments(id) on delete set null,
  artifact_id uuid references public.version_release_artifacts(id) on delete set null,
  local_sync_request_id uuid references public.version_local_sync_requests(id) on delete set null,
  product_key text not null default '',
  env_key text not null default '',
  channel text not null default '' check (channel in ('dev', 'staging', 'prod', 'unknown')),
  version_label text,
  source_commit_sha text,
  build_number bigint check (build_number is null or build_number >= 1),
  event_key text not null,
  event_type text not null check (length(trim(event_type)) > 0),
  status text not null default 'info' check (status in ('info', 'running', 'success', 'failed', 'warning', 'cancelled')),
  actor text not null default 'system',
  detail text,
  workflow_name text,
  workflow_job text,
  workflow_run_id bigint,
  workflow_run_number bigint,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_build_events_event_key_not_empty check (length(trim(event_key)) > 0),
  constraint version_build_events_actor_not_empty check (length(trim(actor)) > 0)
);

create unique index if not exists idx_version_build_events_event_key
  on public.version_build_events (event_key);

create index if not exists idx_version_build_events_tenant_occurred
  on public.version_build_events (tenant_id, occurred_at desc);

create index if not exists idx_version_build_events_tenant_product_env_build
  on public.version_build_events (tenant_id, product_key, env_key, build_number, occurred_at desc);

create index if not exists idx_version_build_events_release
  on public.version_build_events (release_id, occurred_at desc);

drop trigger if exists trg_version_build_events_touch_updated_at on public.version_build_events;
create trigger trg_version_build_events_touch_updated_at
before update on public.version_build_events
for each row execute function public.touch_updated_at();

create table if not exists public.version_env_config_versions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  env_id uuid not null references public.version_environments(id) on delete cascade,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  artifact_id uuid references public.version_release_artifacts(id) on delete set null,
  build_number bigint check (build_number is null or build_number >= 1),
  channel text not null default '' check (channel in ('dev', 'staging', 'prod', 'unknown')),
  version_label text not null,
  source_commit_sha text,
  config_key text not null,
  config_format text not null default 'json',
  config_payload jsonb not null default '{}'::jsonb,
  config_hash_sha256 text not null,
  registered_by text not null default 'system',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_env_config_versions_config_key_not_empty check (length(trim(config_key)) > 0),
  constraint version_env_config_versions_config_format_not_empty check (length(trim(config_format)) > 0),
  constraint version_env_config_versions_hash_not_empty check (length(trim(config_hash_sha256)) >= 16),
  constraint version_env_config_versions_registered_by_not_empty check (length(trim(registered_by)) > 0)
);

create unique index if not exists idx_version_env_config_versions_unique_hash
  on public.version_env_config_versions (tenant_id, product_id, env_id, config_key, config_hash_sha256);

create index if not exists idx_version_env_config_versions_tenant_product_env
  on public.version_env_config_versions (tenant_id, product_id, env_id, created_at desc);

create index if not exists idx_version_env_config_versions_release
  on public.version_env_config_versions (release_id, created_at desc);

drop trigger if exists trg_version_env_config_versions_touch_updated_at on public.version_env_config_versions;
create trigger trg_version_env_config_versions_touch_updated_at
before update on public.version_env_config_versions
for each row execute function public.touch_updated_at();

create or replace function public.versioning_emit_build_event(
  p_tenant_id uuid default null,
  p_product_key text default null,
  p_env_key text default null,
  p_release_id uuid default null,
  p_deploy_request_id uuid default null,
  p_deployment_row_id uuid default null,
  p_artifact_id uuid default null,
  p_local_sync_request_id uuid default null,
  p_event_key text default null,
  p_event_type text default null,
  p_status text default 'info',
  p_actor text default 'system',
  p_detail text default null,
  p_workflow_name text default null,
  p_workflow_job text default null,
  p_workflow_run_id bigint default null,
  p_workflow_run_number bigint default null,
  p_occurred_at timestamptz default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event_id uuid;
  v_event_key text;
  v_event_type text;
  v_actor text;
  v_status text;
  v_metadata jsonb;
  v_tenant_id uuid;
  v_release_id uuid;
  v_product_id uuid;
  v_env_id uuid;
  v_product_key text;
  v_env_key text;
  v_channel text;
  v_version_label text;
  v_source_commit_sha text;
  v_build_number bigint;
begin
  v_event_key := nullif(trim(coalesce(p_event_key, '')), '');
  if v_event_key is null then
    raise exception 'versioning_emit_build_event: event_key required' using errcode = '22023';
  end if;

  v_event_type := nullif(trim(coalesce(p_event_type, '')), '');
  if v_event_type is null then
    raise exception 'versioning_emit_build_event: event_type required' using errcode = '22023';
  end if;

  v_actor := coalesce(nullif(trim(coalesce(p_actor, '')), ''), 'system');
  v_status := lower(coalesce(nullif(trim(coalesce(p_status, '')), ''), 'info'));
  if v_status not in ('info', 'running', 'success', 'failed', 'warning', 'cancelled') then
    v_status := 'info';
  end if;

  v_metadata := coalesce(p_metadata, '{}'::jsonb);
  v_tenant_id := p_tenant_id;
  v_release_id := p_release_id;
  v_product_key := lower(coalesce(nullif(trim(coalesce(p_product_key, '')), ''), ''));
  v_env_key := lower(coalesce(nullif(trim(coalesce(p_env_key, '')), ''), ''));

  if v_release_id is null and p_deploy_request_id is not null then
    select d.release_id, d.tenant_id
      into v_release_id, v_tenant_id
    from public.version_deploy_requests d
    where d.id = p_deploy_request_id;
  end if;

  if v_release_id is null and p_deployment_row_id is not null then
    select dp.release_id, dp.tenant_id
      into v_release_id, v_tenant_id
    from public.version_deployments dp
    where dp.id = p_deployment_row_id;
  end if;

  if v_release_id is null and p_local_sync_request_id is not null then
    select s.release_id, s.tenant_id
      into v_release_id, v_tenant_id
    from public.version_local_sync_requests s
    where s.id = p_local_sync_request_id;
  end if;

  if v_release_id is null and p_artifact_id is not null then
    select a.release_id, a.tenant_id
      into v_release_id, v_tenant_id
    from public.version_release_artifacts a
    where a.id = p_artifact_id;
  end if;

  if v_release_id is not null then
    select
      r.tenant_id,
      r.product_id,
      r.env_id,
      lower(p.product_key),
      lower(e.env_key),
      case
        when r.prerelease_tag is null then public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch)
        else format(
          '%s-%s.%s',
          public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch),
          r.prerelease_tag,
          r.prerelease_no
        )
      end,
      r.source_commit_sha,
      r.build_number
    into
      v_tenant_id,
      v_product_id,
      v_env_id,
      v_product_key,
      v_env_key,
      v_version_label,
      v_source_commit_sha,
      v_build_number
    from public.version_releases r
    join public.version_products p on p.id = r.product_id
    join public.version_environments e on e.id = r.env_id
    where r.id = v_release_id;
  end if;

  if v_tenant_id is null and p_deploy_request_id is not null then
    select d.tenant_id into v_tenant_id
    from public.version_deploy_requests d
    where d.id = p_deploy_request_id;
  end if;

  if v_tenant_id is null and p_deployment_row_id is not null then
    select dp.tenant_id into v_tenant_id
    from public.version_deployments dp
    where dp.id = p_deployment_row_id;
  end if;

  if v_tenant_id is null and p_local_sync_request_id is not null then
    select s.tenant_id into v_tenant_id
    from public.version_local_sync_requests s
    where s.id = p_local_sync_request_id;
  end if;

  if v_tenant_id is null and p_artifact_id is not null then
    select a.tenant_id into v_tenant_id
    from public.version_release_artifacts a
    where a.id = p_artifact_id;
  end if;

  if v_tenant_id is null then
    raise exception 'versioning_emit_build_event: tenant_id unresolved' using errcode = '22023';
  end if;

  if v_product_id is null and v_product_key <> '' then
    select p.id into v_product_id
    from public.version_products p
    where p.tenant_id = v_tenant_id
      and lower(p.product_key) = v_product_key
    limit 1;
  end if;

  if v_env_id is null and v_env_key <> '' then
    select e.id into v_env_id
    from public.version_environments e
    where lower(e.env_key) = v_env_key
    limit 1;
  end if;

  if v_product_key = '' and v_product_id is not null then
    select lower(p.product_key) into v_product_key
    from public.version_products p
    where p.id = v_product_id;
  end if;

  if v_env_key = '' and v_env_id is not null then
    select lower(e.env_key) into v_env_key
    from public.version_environments e
    where e.id = v_env_id;
  end if;

  v_channel := case
    when v_env_key in ('dev', 'staging', 'prod') then v_env_key
    else 'unknown'
  end;

  insert into public.version_build_events (
    tenant_id,
    product_id,
    env_id,
    release_id,
    deploy_request_id,
    deployment_row_id,
    artifact_id,
    local_sync_request_id,
    product_key,
    env_key,
    channel,
    version_label,
    source_commit_sha,
    build_number,
    event_key,
    event_type,
    status,
    actor,
    detail,
    workflow_name,
    workflow_job,
    workflow_run_id,
    workflow_run_number,
    metadata,
    occurred_at
  )
  values (
    v_tenant_id,
    v_product_id,
    v_env_id,
    v_release_id,
    p_deploy_request_id,
    p_deployment_row_id,
    p_artifact_id,
    p_local_sync_request_id,
    coalesce(v_product_key, ''),
    coalesce(v_env_key, ''),
    v_channel,
    v_version_label,
    v_source_commit_sha,
    v_build_number,
    v_event_key,
    v_event_type,
    v_status,
    v_actor,
    nullif(trim(coalesce(p_detail, '')), ''),
    nullif(trim(coalesce(p_workflow_name, '')), ''),
    nullif(trim(coalesce(p_workflow_job, '')), ''),
    p_workflow_run_id,
    p_workflow_run_number,
    v_metadata,
    coalesce(p_occurred_at, now())
  )
  on conflict (event_key) do update
    set
      tenant_id = excluded.tenant_id,
      product_id = excluded.product_id,
      env_id = excluded.env_id,
      release_id = excluded.release_id,
      deploy_request_id = excluded.deploy_request_id,
      deployment_row_id = excluded.deployment_row_id,
      artifact_id = excluded.artifact_id,
      local_sync_request_id = excluded.local_sync_request_id,
      product_key = excluded.product_key,
      env_key = excluded.env_key,
      channel = excluded.channel,
      version_label = excluded.version_label,
      source_commit_sha = excluded.source_commit_sha,
      build_number = excluded.build_number,
      event_type = excluded.event_type,
      status = excluded.status,
      actor = excluded.actor,
      detail = excluded.detail,
      workflow_name = excluded.workflow_name,
      workflow_job = excluded.workflow_job,
      workflow_run_id = excluded.workflow_run_id,
      workflow_run_number = excluded.workflow_run_number,
      metadata = coalesce(public.version_build_events.metadata, '{}'::jsonb) || coalesce(excluded.metadata, '{}'::jsonb),
      occurred_at = excluded.occurred_at,
      updated_at = now()
  returning id into v_event_id;

  return v_event_id;
end;
$$;

create or replace function public.versioning_register_env_config_version(
  p_release_id uuid,
  p_actor text,
  p_config_key text,
  p_config_format text default 'json',
  p_config_payload jsonb default '{}'::jsonb,
  p_config_hash_sha256 text default null,
  p_source_commit_sha text default null,
  p_artifact_id uuid default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_release public.version_releases%rowtype;
  v_env_key text;
  v_version_label text;
  v_hash text;
  v_actor text;
  v_config_key text;
  v_config_format text;
  v_row_id uuid;
begin
  if p_release_id is null then
    raise exception 'versioning_register_env_config_version: release_id required' using errcode = '22023';
  end if;

  if auth.role() = 'authenticated' and not public.versioning_is_admin() then
    raise exception 'versioning_register_env_config_version: forbidden' using errcode = '42501';
  end if;

  select r.* into v_release
  from public.version_releases r
  where r.id = p_release_id;
  if not found then
    raise exception 'versioning_register_env_config_version: release % not found', p_release_id using errcode = '22023';
  end if;

  select lower(e.env_key) into v_env_key
  from public.version_environments e
  where e.id = v_release.env_id;

  v_version_label := case
    when v_release.prerelease_tag is null then public.versioning_format_semver(v_release.semver_major, v_release.semver_minor, v_release.semver_patch)
    else format(
      '%s-%s.%s',
      public.versioning_format_semver(v_release.semver_major, v_release.semver_minor, v_release.semver_patch),
      v_release.prerelease_tag,
      v_release.prerelease_no
    )
  end;

  v_actor := coalesce(nullif(trim(coalesce(p_actor, '')), ''), 'system');
  v_config_key := lower(coalesce(nullif(trim(coalesce(p_config_key, '')), ''), 'app-config.js'));
  v_config_format := lower(coalesce(nullif(trim(coalesce(p_config_format, '')), ''), 'json'));
  v_hash := lower(coalesce(nullif(trim(coalesce(p_config_hash_sha256, '')), ''), ''));
  if v_hash = '' then
    v_hash := encode(digest(coalesce(p_config_payload, '{}'::jsonb)::text, 'sha256'), 'hex');
  end if;

  insert into public.version_env_config_versions (
    tenant_id,
    product_id,
    env_id,
    release_id,
    artifact_id,
    build_number,
    channel,
    version_label,
    source_commit_sha,
    config_key,
    config_format,
    config_payload,
    config_hash_sha256,
    registered_by,
    metadata
  )
  values (
    v_release.tenant_id,
    v_release.product_id,
    v_release.env_id,
    v_release.id,
    p_artifact_id,
    v_release.build_number,
    case when v_env_key in ('dev', 'staging', 'prod') then v_env_key else 'unknown' end,
    v_version_label,
    coalesce(nullif(trim(coalesce(p_source_commit_sha, '')), ''), v_release.source_commit_sha),
    v_config_key,
    v_config_format,
    coalesce(p_config_payload, '{}'::jsonb),
    v_hash,
    v_actor,
    coalesce(p_metadata, '{}'::jsonb)
  )
  on conflict (tenant_id, product_id, env_id, config_key, config_hash_sha256)
  do update
    set
      release_id = excluded.release_id,
      artifact_id = coalesce(excluded.artifact_id, public.version_env_config_versions.artifact_id),
      build_number = coalesce(excluded.build_number, public.version_env_config_versions.build_number),
      channel = excluded.channel,
      version_label = excluded.version_label,
      source_commit_sha = coalesce(excluded.source_commit_sha, public.version_env_config_versions.source_commit_sha),
      config_format = excluded.config_format,
      config_payload = excluded.config_payload,
      registered_by = excluded.registered_by,
      metadata = coalesce(public.version_env_config_versions.metadata, '{}'::jsonb) || coalesce(excluded.metadata, '{}'::jsonb),
      updated_at = now()
  returning id into v_row_id;

  insert into public.version_audit_log (
    tenant_id,
    actor,
    action,
    entity_type,
    entity_id,
    payload
  )
  values (
    v_release.tenant_id,
    v_actor,
    'register_env_config_version',
    'version_env_config_versions',
    v_row_id::text,
    jsonb_build_object(
      'release_id', v_release.id,
      'config_key', v_config_key,
      'config_hash_sha256', v_hash,
      'build_number', v_release.build_number,
      'channel', v_env_key
    )
  );

  return v_row_id;
end;
$$;

create or replace view public.version_build_timeline_labeled as
select
  e.id,
  e.tenant_id,
  e.product_id,
  p.product_key,
  p.name as product_name,
  e.env_id,
  env.env_key,
  env.name as env_name,
  e.channel,
  e.release_id,
  e.deploy_request_id,
  e.deployment_row_id,
  e.artifact_id,
  e.local_sync_request_id,
  e.version_label,
  e.source_commit_sha,
  e.build_number,
  e.event_key,
  e.event_type,
  e.status,
  e.actor,
  e.detail,
  e.workflow_name,
  e.workflow_job,
  e.workflow_run_id,
  e.workflow_run_number,
  e.metadata,
  e.occurred_at,
  e.created_at,
  e.updated_at
from public.version_build_events e
left join public.version_products p on p.id = e.product_id
left join public.version_environments env on env.id = e.env_id;

alter view public.version_build_timeline_labeled set (security_invoker = true);

create or replace view public.version_env_config_versions_labeled as
select
  c.id,
  c.tenant_id,
  c.product_id,
  p.product_key,
  p.name as product_name,
  c.env_id,
  e.env_key,
  e.name as env_name,
  c.release_id,
  c.artifact_id,
  c.build_number,
  c.channel,
  c.version_label,
  c.source_commit_sha,
  c.config_key,
  c.config_format,
  c.config_payload,
  c.config_hash_sha256,
  c.registered_by,
  c.metadata,
  c.created_at,
  c.updated_at
from public.version_env_config_versions c
join public.version_products p on p.id = c.product_id
join public.version_environments e on e.id = c.env_id;

alter view public.version_env_config_versions_labeled set (security_invoker = true);

create or replace function public.trg_version_audit_log_build_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_release_id uuid;
  v_deploy_request_id uuid;
  v_artifact_id uuid;
  v_local_sync_request_id uuid;
  v_status text;
begin
  v_release_id := case
    when new.entity_type = 'version_releases' and new.entity_id ~* '^[0-9a-f-]{36}$' then new.entity_id::uuid
    when coalesce(new.payload->>'release_id', '') ~* '^[0-9a-f-]{36}$' then (new.payload->>'release_id')::uuid
    else null
  end;

  v_deploy_request_id := case
    when new.entity_type = 'version_deploy_requests' and new.entity_id ~* '^[0-9a-f-]{36}$' then new.entity_id::uuid
    when coalesce(new.payload->>'request_id', '') ~* '^[0-9a-f-]{36}$' then (new.payload->>'request_id')::uuid
    else null
  end;

  v_artifact_id := case
    when new.entity_type = 'version_release_artifacts' and new.entity_id ~* '^[0-9a-f-]{36}$' then new.entity_id::uuid
    when coalesce(new.payload->>'artifact_id', '') ~* '^[0-9a-f-]{36}$' then (new.payload->>'artifact_id')::uuid
    else null
  end;

  v_local_sync_request_id := case
    when new.entity_type = 'version_local_sync_requests' and new.entity_id ~* '^[0-9a-f-]{36}$' then new.entity_id::uuid
    when coalesce(new.payload->>'local_sync_request_id', '') ~* '^[0-9a-f-]{36}$' then (new.payload->>'local_sync_request_id')::uuid
    else null
  end;

  v_status := lower(coalesce(new.payload->>'status', 'info'));
  if v_status = '' then
    v_status := case
      when new.action like '%reject%' then 'failed'
      when new.action like '%fail%' then 'failed'
      when new.action like '%cancel%' then 'cancelled'
      when new.action like '%approve%' then 'success'
      when new.action like '%execute%' then 'success'
      when new.action like '%finalize%' then 'success'
      else 'info'
    end;
  end if;

  if new.tenant_id is null
     and v_release_id is null
     and v_deploy_request_id is null
     and v_artifact_id is null
     and v_local_sync_request_id is null then
    return new;
  end if;

  begin
    perform public.versioning_emit_build_event(
      p_tenant_id => new.tenant_id,
      p_release_id => v_release_id,
      p_deploy_request_id => v_deploy_request_id,
      p_artifact_id => v_artifact_id,
      p_local_sync_request_id => v_local_sync_request_id,
      p_event_key => format('audit:%s', new.id),
      p_event_type => format('audit.%s', new.action),
      p_status => v_status,
      p_actor => new.actor,
      p_detail => coalesce(nullif(trim(coalesce(new.payload->>'detail', '')), ''), new.action),
      p_metadata => jsonb_build_object(
        'audit_log_id', new.id,
        'entity_type', new.entity_type,
        'entity_id', new.entity_id
      ) || coalesce(new.payload, '{}'::jsonb),
      p_occurred_at => new.created_at
    );
  exception when others then
    raise notice 'trg_version_audit_log_build_event skipped audit_log_id=% detail=%', new.id, sqlerrm;
  end;

  return new;
end;
$$;

drop trigger if exists trg_version_audit_log_build_event on public.version_audit_log;
create trigger trg_version_audit_log_build_event
after insert on public.version_audit_log
for each row execute function public.trg_version_audit_log_build_event();

do $$
declare
  r record;
  v_release_id uuid;
  v_deploy_request_id uuid;
  v_artifact_id uuid;
  v_local_sync_request_id uuid;
  v_status text;
begin
  for r in
    select *
    from public.version_audit_log
    where action in (
      'create_release',
      'promote_release',
      'request_deploy',
      'approve_deploy_request',
      'reject_deploy_request',
      'execute_deploy_request',
      'finalize_deploy_request',
      'finalize_release_metadata',
      'allocate_build_number',
      'upsert_release_artifact',
      'mark_env_artifact_head',
      'request_local_artifact_sync',
      'update_local_sync_request',
      'register_env_config_version'
    )
  loop
    v_release_id := case
      when r.entity_type = 'version_releases' and r.entity_id ~* '^[0-9a-f-]{36}$' then r.entity_id::uuid
      when coalesce(r.payload->>'release_id', '') ~* '^[0-9a-f-]{36}$' then (r.payload->>'release_id')::uuid
      else null
    end;
    v_deploy_request_id := case
      when r.entity_type = 'version_deploy_requests' and r.entity_id ~* '^[0-9a-f-]{36}$' then r.entity_id::uuid
      when coalesce(r.payload->>'request_id', '') ~* '^[0-9a-f-]{36}$' then (r.payload->>'request_id')::uuid
      else null
    end;
    v_artifact_id := case
      when r.entity_type = 'version_release_artifacts' and r.entity_id ~* '^[0-9a-f-]{36}$' then r.entity_id::uuid
      when coalesce(r.payload->>'artifact_id', '') ~* '^[0-9a-f-]{36}$' then (r.payload->>'artifact_id')::uuid
      else null
    end;
    v_local_sync_request_id := case
      when r.entity_type = 'version_local_sync_requests' and r.entity_id ~* '^[0-9a-f-]{36}$' then r.entity_id::uuid
      when coalesce(r.payload->>'local_sync_request_id', '') ~* '^[0-9a-f-]{36}$' then (r.payload->>'local_sync_request_id')::uuid
      else null
    end;

    v_status := lower(coalesce(r.payload->>'status', 'info'));
    if v_status = '' then
      v_status := case
        when r.action like '%reject%' then 'failed'
        when r.action like '%fail%' then 'failed'
        when r.action like '%cancel%' then 'cancelled'
        when r.action like '%approve%' then 'success'
        when r.action like '%execute%' then 'success'
        when r.action like '%finalize%' then 'success'
        else 'info'
      end;
    end if;

    if r.tenant_id is null
       and v_release_id is null
       and v_deploy_request_id is null
       and v_artifact_id is null
       and v_local_sync_request_id is null then
      continue;
    end if;

    begin
      perform public.versioning_emit_build_event(
        p_tenant_id => r.tenant_id,
        p_release_id => v_release_id,
        p_deploy_request_id => v_deploy_request_id,
        p_artifact_id => v_artifact_id,
        p_local_sync_request_id => v_local_sync_request_id,
        p_event_key => format('audit:%s', r.id),
        p_event_type => format('audit.%s', r.action),
        p_status => v_status,
        p_actor => r.actor,
        p_detail => coalesce(nullif(trim(coalesce(r.payload->>'detail', '')), ''), r.action),
        p_metadata => jsonb_build_object(
          'audit_log_id', r.id,
          'entity_type', r.entity_type,
          'entity_id', r.entity_id
        ) || coalesce(r.payload, '{}'::jsonb),
        p_occurred_at => r.created_at
      );
    exception when others then
      raise notice 'backfill build_event skipped audit_log_id=% detail=%', r.id, sqlerrm;
      continue;
    end;
  end loop;
end;
$$;

grant select, insert, update, delete on public.version_build_events to authenticated;
grant select, insert, update, delete on public.version_env_config_versions to authenticated;

grant select, insert, update, delete on public.version_build_events to service_role;
grant select, insert, update, delete on public.version_env_config_versions to service_role;

grant select on public.version_build_timeline_labeled to authenticated;
grant select on public.version_env_config_versions_labeled to authenticated;
grant select on public.version_build_timeline_labeled to service_role;
grant select on public.version_env_config_versions_labeled to service_role;

grant execute on function public.versioning_emit_build_event(
  uuid, text, text, uuid, uuid, uuid, uuid, uuid, text, text, text, text, text, text, text, bigint, bigint, timestamptz, jsonb
) to authenticated;
grant execute on function public.versioning_register_env_config_version(
  uuid, text, text, text, jsonb, text, text, uuid, jsonb
) to authenticated;

grant execute on function public.versioning_emit_build_event(
  uuid, text, text, uuid, uuid, uuid, uuid, uuid, text, text, text, text, text, text, text, bigint, bigint, timestamptz, jsonb
) to service_role;
grant execute on function public.versioning_register_env_config_version(
  uuid, text, text, text, jsonb, text, text, uuid, jsonb
) to service_role;

alter table public.version_build_events enable row level security;
alter table public.version_env_config_versions enable row level security;

drop policy if exists version_build_events_admin_all on public.version_build_events;
create policy version_build_events_admin_all
  on public.version_build_events
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_env_config_versions_admin_all on public.version_env_config_versions;
create policy version_env_config_versions_admin_all
  on public.version_env_config_versions
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

commit;
