begin;

create table if not exists public.version_release_artifacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  artifact_key text not null,
  artifact_provider text not null default 'github_actions',
  artifact_name text not null,
  artifact_path text,
  github_repository text,
  github_run_id bigint,
  github_run_number bigint,
  github_artifact_id bigint,
  github_artifact_url text,
  commit_sha text not null,
  semver text not null,
  size_bytes bigint,
  checksum_sha256 text,
  metadata jsonb not null default '{}'::jsonb,
  created_by text not null default 'ci',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_release_artifacts_artifact_key_not_empty check (length(trim(artifact_key)) > 0),
  constraint version_release_artifacts_artifact_name_not_empty check (length(trim(artifact_name)) > 0),
  constraint version_release_artifacts_provider_check check (artifact_provider in ('github_actions', 'supabase_storage', 'local')),
  constraint version_release_artifacts_commit_not_empty check (length(trim(commit_sha)) > 0),
  constraint version_release_artifacts_semver_not_empty check (length(trim(semver)) > 0),
  constraint version_release_artifacts_size_non_negative check (size_bytes is null or size_bytes >= 0),
  unique (release_id),
  unique (tenant_id, artifact_key)
);

create index if not exists idx_version_release_artifacts_tenant_product_created
  on public.version_release_artifacts (tenant_id, product_id, created_at desc);

create index if not exists idx_version_release_artifacts_tenant_release
  on public.version_release_artifacts (tenant_id, release_id);

drop trigger if exists trg_version_release_artifacts_touch_updated_at on public.version_release_artifacts;
create trigger trg_version_release_artifacts_touch_updated_at
before update on public.version_release_artifacts
for each row execute function public.touch_updated_at();

create table if not exists public.version_artifact_env_heads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  env_id uuid not null references public.version_environments(id) on delete cascade,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  artifact_id uuid not null references public.version_release_artifacts(id) on delete cascade,
  updated_by text not null default 'system',
  updated_at timestamptz not null default now(),
  unique (tenant_id, product_id, env_id)
);

create index if not exists idx_version_artifact_env_heads_tenant_product
  on public.version_artifact_env_heads (tenant_id, product_id, updated_at desc);

create table if not exists public.version_local_nodes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  node_key text not null,
  display_name text not null,
  runner_label text not null,
  os_name text,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_local_nodes_node_key_not_empty check (length(trim(node_key)) > 0),
  constraint version_local_nodes_display_name_not_empty check (length(trim(display_name)) > 0),
  constraint version_local_nodes_runner_label_not_empty check (length(trim(runner_label)) > 0),
  unique (tenant_id, node_key)
);

create index if not exists idx_version_local_nodes_tenant_active
  on public.version_local_nodes (tenant_id, active, updated_at desc);

drop trigger if exists trg_version_local_nodes_touch_updated_at on public.version_local_nodes;
create trigger trg_version_local_nodes_touch_updated_at
before update on public.version_local_nodes
for each row execute function public.touch_updated_at();

create table if not exists public.version_local_sync_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  env_id uuid references public.version_environments(id) on delete set null,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  artifact_id uuid not null references public.version_release_artifacts(id) on delete cascade,
  node_id uuid not null references public.version_local_nodes(id) on delete cascade,
  status text not null default 'pending',
  requested_by text not null,
  request_notes text,
  workflow_id text,
  workflow_run_id bigint,
  workflow_run_url text,
  dispatch_ref text,
  started_at timestamptz,
  finished_at timestamptz,
  local_path text,
  error_detail text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_local_sync_requests_status_check check (status in ('pending', 'queued', 'running', 'success', 'failed', 'cancelled')),
  constraint version_local_sync_requests_requested_by_not_empty check (length(trim(requested_by)) > 0)
);

create index if not exists idx_version_local_sync_requests_tenant_created
  on public.version_local_sync_requests (tenant_id, created_at desc);

create index if not exists idx_version_local_sync_requests_tenant_status
  on public.version_local_sync_requests (tenant_id, status, created_at desc);

create index if not exists idx_version_local_sync_requests_tenant_node
  on public.version_local_sync_requests (tenant_id, node_id, created_at desc);

drop trigger if exists trg_version_local_sync_requests_touch_updated_at on public.version_local_sync_requests;
create trigger trg_version_local_sync_requests_touch_updated_at
before update on public.version_local_sync_requests
for each row execute function public.touch_updated_at();

create table if not exists public.version_local_artifact_inventory (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  node_id uuid not null references public.version_local_nodes(id) on delete cascade,
  artifact_id uuid not null references public.version_release_artifacts(id) on delete cascade,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  local_path text not null,
  synced_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  unique (node_id, artifact_id)
);

create index if not exists idx_version_local_artifact_inventory_tenant_node
  on public.version_local_artifact_inventory (tenant_id, node_id, synced_at desc);

create or replace function public.versioning_upsert_release_artifact(
  p_release_id uuid,
  p_actor text default 'ci',
  p_artifact_provider text default 'github_actions',
  p_artifact_name text default null,
  p_artifact_key text default null,
  p_artifact_path text default null,
  p_github_repository text default null,
  p_github_run_id bigint default null,
  p_github_run_number bigint default null,
  p_github_artifact_id bigint default null,
  p_github_artifact_url text default null,
  p_size_bytes bigint default null,
  p_checksum_sha256 text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_release record;
  v_provider text;
  v_actor text;
  v_artifact_name text;
  v_artifact_key text;
  v_artifact_id uuid;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_upsert_release_artifact: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'ci');
  v_provider := lower(trim(coalesce(p_artifact_provider, 'github_actions')));
  if v_provider not in ('github_actions', 'supabase_storage', 'local') then
    raise exception 'versioning_upsert_release_artifact: invalid provider %', v_provider using errcode = '22023';
  end if;

  select
    r.id,
    r.tenant_id,
    r.product_id,
    r.env_id,
    r.source_commit_sha,
    p.product_key,
    public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch) as version_label
  into v_release
  from public.version_releases r
  join public.version_products p on p.id = r.product_id
  where r.id = p_release_id
  for update;

  if not found then
    raise exception 'versioning_upsert_release_artifact: release % not found', p_release_id using errcode = '22023';
  end if;

  v_artifact_name := nullif(trim(coalesce(p_artifact_name, '')), '');
  if v_artifact_name is null then
    v_artifact_name := format('release-%s-%s-%s', v_release.product_key, v_release.version_label, left(v_release.source_commit_sha, 12));
  end if;

  v_artifact_key := nullif(trim(coalesce(p_artifact_key, '')), '');
  if v_artifact_key is null then
    v_artifact_key := format('%s/%s/%s', v_release.product_key, v_release.version_label, left(v_release.source_commit_sha, 12));
  end if;

  insert into public.version_release_artifacts (
    tenant_id,
    product_id,
    release_id,
    artifact_key,
    artifact_provider,
    artifact_name,
    artifact_path,
    github_repository,
    github_run_id,
    github_run_number,
    github_artifact_id,
    github_artifact_url,
    commit_sha,
    semver,
    size_bytes,
    checksum_sha256,
    metadata,
    created_by
  )
  values (
    v_release.tenant_id,
    v_release.product_id,
    v_release.id,
    v_artifact_key,
    v_provider,
    v_artifact_name,
    nullif(trim(coalesce(p_artifact_path, '')), ''),
    nullif(trim(coalesce(p_github_repository, '')), ''),
    p_github_run_id,
    p_github_run_number,
    p_github_artifact_id,
    nullif(trim(coalesce(p_github_artifact_url, '')), ''),
    v_release.source_commit_sha,
    v_release.version_label,
    p_size_bytes,
    nullif(trim(coalesce(p_checksum_sha256, '')), ''),
    coalesce(p_metadata, '{}'::jsonb),
    v_actor
  )
  on conflict (release_id) do update
  set
    artifact_key = excluded.artifact_key,
    artifact_provider = excluded.artifact_provider,
    artifact_name = excluded.artifact_name,
    artifact_path = excluded.artifact_path,
    github_repository = excluded.github_repository,
    github_run_id = excluded.github_run_id,
    github_run_number = excluded.github_run_number,
    github_artifact_id = excluded.github_artifact_id,
    github_artifact_url = excluded.github_artifact_url,
    size_bytes = excluded.size_bytes,
    checksum_sha256 = excluded.checksum_sha256,
    metadata = coalesce(public.version_release_artifacts.metadata, '{}'::jsonb) || coalesce(excluded.metadata, '{}'::jsonb),
    updated_at = now()
  returning id into v_artifact_id;

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
    'upsert_release_artifact',
    'version_release_artifacts',
    v_artifact_id::text,
    jsonb_build_object(
      'release_id', v_release.id,
      'artifact_key', v_artifact_key,
      'artifact_name', v_artifact_name,
      'provider', v_provider,
      'github_run_id', p_github_run_id,
      'github_artifact_id', p_github_artifact_id
    )
  );

  return v_artifact_id;
end;
$$;

create or replace function public.versioning_mark_env_artifact_head(
  p_release_id uuid,
  p_actor text default 'system'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_release record;
  v_artifact_id uuid;
  v_actor text;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_mark_env_artifact_head: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'system');

  select
    r.id,
    r.tenant_id,
    r.product_id,
    r.env_id
  into v_release
  from public.version_releases r
  where r.id = p_release_id
  for update;

  if not found then
    raise exception 'versioning_mark_env_artifact_head: release % not found', p_release_id using errcode = '22023';
  end if;

  select a.id
    into v_artifact_id
  from public.version_release_artifacts a
  where a.release_id = v_release.id
  limit 1;

  if v_artifact_id is null then
    raise exception 'versioning_mark_env_artifact_head: artifact not found for release %', p_release_id using errcode = '22023';
  end if;

  insert into public.version_artifact_env_heads (
    tenant_id,
    product_id,
    env_id,
    release_id,
    artifact_id,
    updated_by,
    updated_at
  )
  values (
    v_release.tenant_id,
    v_release.product_id,
    v_release.env_id,
    v_release.id,
    v_artifact_id,
    v_actor,
    now()
  )
  on conflict (tenant_id, product_id, env_id)
  do update
    set release_id = excluded.release_id,
        artifact_id = excluded.artifact_id,
        updated_by = excluded.updated_by,
        updated_at = now();

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
    'mark_env_artifact_head',
    'version_artifact_env_heads',
    v_artifact_id::text,
    jsonb_build_object(
      'release_id', v_release.id,
      'env_id', v_release.env_id
    )
  );

  return v_artifact_id;
end;
$$;

create or replace function public.versioning_request_local_artifact_sync(
  p_release_id uuid,
  p_node_key text,
  p_actor text default 'admin-ui',
  p_notes text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_release record;
  v_node record;
  v_artifact_id uuid;
  v_request_id uuid;
  v_actor text;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_request_local_artifact_sync: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'admin-ui');

  select
    r.id,
    r.tenant_id,
    r.product_id,
    r.env_id
  into v_release
  from public.version_releases r
  where r.id = p_release_id
  for update;

  if not found then
    raise exception 'versioning_request_local_artifact_sync: release % not found', p_release_id using errcode = '22023';
  end if;

  select id
    into v_artifact_id
  from public.version_release_artifacts
  where release_id = v_release.id
  limit 1;

  if v_artifact_id is null then
    raise exception 'versioning_request_local_artifact_sync: no artifact for release %', p_release_id using errcode = '22023';
  end if;

  select *
    into v_node
  from public.version_local_nodes
  where tenant_id = v_release.tenant_id
    and node_key = trim(coalesce(p_node_key, ''))
    and active = true
  limit 1;

  if not found then
    raise exception 'versioning_request_local_artifact_sync: node % not found or inactive', p_node_key using errcode = '22023';
  end if;

  insert into public.version_local_sync_requests (
    tenant_id,
    product_id,
    env_id,
    release_id,
    artifact_id,
    node_id,
    status,
    requested_by,
    request_notes,
    metadata
  )
  values (
    v_release.tenant_id,
    v_release.product_id,
    v_release.env_id,
    v_release.id,
    v_artifact_id,
    v_node.id,
    'pending',
    v_actor,
    p_notes,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into v_request_id;

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
    'request_local_artifact_sync',
    'version_local_sync_requests',
    v_request_id::text,
    jsonb_build_object(
      'release_id', v_release.id,
      'artifact_id', v_artifact_id,
      'node_key', v_node.node_key,
      'notes', p_notes
    )
  );

  return v_request_id;
end;
$$;

create or replace function public.versioning_update_local_sync_request(
  p_request_id uuid,
  p_actor text default 'runner',
  p_status text default 'running',
  p_workflow_run_id bigint default null,
  p_workflow_run_url text default null,
  p_local_path text default null,
  p_error_detail text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request public.version_local_sync_requests%rowtype;
  v_status text;
  v_actor text;
  v_terminal boolean;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_update_local_sync_request: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'runner');
  v_status := lower(trim(coalesce(p_status, 'running')));
  if v_status not in ('pending', 'queued', 'running', 'success', 'failed', 'cancelled') then
    raise exception 'versioning_update_local_sync_request: invalid status %', v_status using errcode = '22023';
  end if;

  v_terminal := v_status in ('success', 'failed', 'cancelled');

  select *
    into v_request
  from public.version_local_sync_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'versioning_update_local_sync_request: request % not found', p_request_id using errcode = '22023';
  end if;

  update public.version_local_sync_requests
  set
    status = v_status,
    workflow_run_id = coalesce(p_workflow_run_id, workflow_run_id),
    workflow_run_url = coalesce(nullif(trim(coalesce(p_workflow_run_url, '')), ''), workflow_run_url),
    started_at = case
      when started_at is null and v_status in ('queued', 'running', 'success', 'failed', 'cancelled') then now()
      else started_at
    end,
    finished_at = case
      when v_terminal then now()
      else finished_at
    end,
    local_path = coalesce(nullif(trim(coalesce(p_local_path, '')), ''), local_path),
    error_detail = case
      when v_status = 'failed' then coalesce(nullif(trim(coalesce(p_error_detail, '')), ''), error_detail)
      when v_status = 'success' then null
      else error_detail
    end,
    metadata = coalesce(metadata, '{}'::jsonb) || coalesce(p_metadata, '{}'::jsonb),
    updated_at = now()
  where id = p_request_id;

  if v_status = 'success' and nullif(trim(coalesce(p_local_path, '')), '') is not null then
    insert into public.version_local_artifact_inventory (
      tenant_id,
      node_id,
      artifact_id,
      release_id,
      local_path,
      synced_at,
      metadata
    )
    values (
      v_request.tenant_id,
      v_request.node_id,
      v_request.artifact_id,
      v_request.release_id,
      trim(p_local_path),
      now(),
      coalesce(p_metadata, '{}'::jsonb)
    )
    on conflict (node_id, artifact_id)
    do update
      set
        release_id = excluded.release_id,
        local_path = excluded.local_path,
        synced_at = excluded.synced_at,
        metadata = coalesce(public.version_local_artifact_inventory.metadata, '{}'::jsonb) || coalesce(excluded.metadata, '{}'::jsonb);
  end if;

  insert into public.version_audit_log (
    tenant_id,
    actor,
    action,
    entity_type,
    entity_id,
    payload
  )
  values (
    v_request.tenant_id,
    v_actor,
    'update_local_sync_request',
    'version_local_sync_requests',
    p_request_id::text,
    jsonb_build_object(
      'status', v_status,
      'workflow_run_id', p_workflow_run_id,
      'workflow_run_url', p_workflow_run_url,
      'local_path', p_local_path,
      'error_detail', p_error_detail
    )
  );

  return p_request_id;
end;
$$;

create or replace view public.version_release_artifacts_labeled as
select
  a.id,
  a.tenant_id,
  a.product_id,
  p.product_key,
  p.name as product_name,
  a.release_id,
  e.env_key,
  e.name as env_name,
  public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch) as version_label,
  a.artifact_key,
  a.artifact_provider,
  a.artifact_name,
  a.artifact_path,
  a.github_repository,
  a.github_run_id,
  a.github_run_number,
  a.github_artifact_id,
  a.github_artifact_url,
  a.commit_sha,
  a.semver,
  a.size_bytes,
  a.checksum_sha256,
  a.metadata,
  a.created_by,
  a.created_at,
  a.updated_at,
  coalesce((
    select array_agg(ve.env_key order by ve.env_key)
    from public.version_artifact_env_heads h
    join public.version_environments ve on ve.id = h.env_id
    where h.artifact_id = a.id
  ), '{}'::text[]) as env_heads
from public.version_release_artifacts a
join public.version_releases r on r.id = a.release_id
join public.version_products p on p.id = a.product_id
join public.version_environments e on e.id = r.env_id;

alter view public.version_release_artifacts_labeled set (security_invoker = true);

create or replace view public.version_local_nodes_labeled as
select
  n.id,
  n.tenant_id,
  n.node_key,
  n.display_name,
  n.runner_label,
  n.os_name,
  n.active,
  n.metadata,
  n.last_seen_at,
  n.created_at,
  n.updated_at,
  coalesce((
    select count(*)::integer
    from public.version_local_sync_requests r
    where r.node_id = n.id
  ), 0) as sync_requests_total
from public.version_local_nodes n;

alter view public.version_local_nodes_labeled set (security_invoker = true);

create or replace view public.version_local_sync_requests_labeled as
select
  s.id,
  s.tenant_id,
  s.product_id,
  p.product_key,
  p.name as product_name,
  s.env_id,
  e.env_key,
  e.name as env_name,
  s.release_id,
  public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch) as version_label,
  s.artifact_id,
  a.artifact_key,
  a.artifact_name,
  a.artifact_provider,
  a.github_run_id,
  a.github_artifact_id,
  s.node_id,
  n.node_key,
  n.display_name as node_name,
  n.runner_label,
  s.status,
  s.requested_by,
  s.request_notes,
  s.workflow_id,
  s.workflow_run_id,
  s.workflow_run_url,
  s.dispatch_ref,
  s.started_at,
  s.finished_at,
  s.local_path,
  s.error_detail,
  s.metadata,
  s.created_at,
  s.updated_at
from public.version_local_sync_requests s
join public.version_products p on p.id = s.product_id
left join public.version_environments e on e.id = s.env_id
join public.version_releases r on r.id = s.release_id
join public.version_release_artifacts a on a.id = s.artifact_id
join public.version_local_nodes n on n.id = s.node_id;

alter view public.version_local_sync_requests_labeled set (security_invoker = true);

grant select, insert, update, delete on public.version_release_artifacts to authenticated;
grant select, insert, update, delete on public.version_artifact_env_heads to authenticated;
grant select, insert, update, delete on public.version_local_nodes to authenticated;
grant select, insert, update, delete on public.version_local_sync_requests to authenticated;
grant select, insert, update, delete on public.version_local_artifact_inventory to authenticated;

grant select, insert, update, delete on public.version_release_artifacts to service_role;
grant select, insert, update, delete on public.version_artifact_env_heads to service_role;
grant select, insert, update, delete on public.version_local_nodes to service_role;
grant select, insert, update, delete on public.version_local_sync_requests to service_role;
grant select, insert, update, delete on public.version_local_artifact_inventory to service_role;

grant select on public.version_release_artifacts_labeled to authenticated;
grant select on public.version_local_nodes_labeled to authenticated;
grant select on public.version_local_sync_requests_labeled to authenticated;
grant select on public.version_release_artifacts_labeled to service_role;
grant select on public.version_local_nodes_labeled to service_role;
grant select on public.version_local_sync_requests_labeled to service_role;

grant execute on function public.versioning_upsert_release_artifact(uuid, text, text, text, text, text, text, bigint, bigint, bigint, text, bigint, text, jsonb) to authenticated;
grant execute on function public.versioning_mark_env_artifact_head(uuid, text) to authenticated;
grant execute on function public.versioning_request_local_artifact_sync(uuid, text, text, text, jsonb) to authenticated;
grant execute on function public.versioning_update_local_sync_request(uuid, text, text, bigint, text, text, text, jsonb) to authenticated;

grant execute on function public.versioning_upsert_release_artifact(uuid, text, text, text, text, text, text, bigint, bigint, bigint, text, bigint, text, jsonb) to service_role;
grant execute on function public.versioning_mark_env_artifact_head(uuid, text) to service_role;
grant execute on function public.versioning_request_local_artifact_sync(uuid, text, text, text, jsonb) to service_role;
grant execute on function public.versioning_update_local_sync_request(uuid, text, text, bigint, text, text, text, jsonb) to service_role;

alter table public.version_release_artifacts enable row level security;
alter table public.version_artifact_env_heads enable row level security;
alter table public.version_local_nodes enable row level security;
alter table public.version_local_sync_requests enable row level security;
alter table public.version_local_artifact_inventory enable row level security;

drop policy if exists version_release_artifacts_admin_all on public.version_release_artifacts;
create policy version_release_artifacts_admin_all
  on public.version_release_artifacts
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_artifact_env_heads_admin_all on public.version_artifact_env_heads;
create policy version_artifact_env_heads_admin_all
  on public.version_artifact_env_heads
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_local_nodes_admin_all on public.version_local_nodes;
create policy version_local_nodes_admin_all
  on public.version_local_nodes
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_local_sync_requests_admin_all on public.version_local_sync_requests;
create policy version_local_sync_requests_admin_all
  on public.version_local_sync_requests
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_local_artifact_inventory_admin_all on public.version_local_artifact_inventory;
create policy version_local_artifact_inventory_admin_all
  on public.version_local_artifact_inventory
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
