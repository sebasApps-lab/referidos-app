-- 20260220_000015_versioning_deploy_gate.sql
-- Deploy approval gate + automatic deployment registration on execution

begin;

create table if not exists public.version_deploy_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  env_id uuid not null references public.version_environments(id) on delete cascade,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  status text not null default 'pending',
  requested_by text not null,
  requested_by_actor_uuid uuid,
  approved_by text,
  approved_by_actor_uuid uuid,
  approved_at timestamptz,
  rejected_by text,
  rejected_by_actor_uuid uuid,
  rejected_at timestamptz,
  rejection_reason text,
  executed_by text,
  executed_by_actor_uuid uuid,
  executed_at timestamptz,
  admin_override boolean not null default false,
  deployment_id text,
  deployment_status text,
  logs_url text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_deploy_requests_status_check check (
    status in ('pending', 'approved', 'rejected', 'executed', 'failed', 'cancelled')
  ),
  constraint version_deploy_requests_deployment_status_check check (
    deployment_status is null or deployment_status in ('started', 'success', 'failed')
  ),
  constraint version_deploy_requests_requested_by_not_empty check (
    length(trim(requested_by)) > 0
  )
);

create unique index if not exists idx_version_deploy_requests_active_release
  on public.version_deploy_requests (tenant_id, release_id)
  where status in ('pending', 'approved');

create index if not exists idx_version_deploy_requests_tenant_env_status
  on public.version_deploy_requests (tenant_id, env_id, status, created_at desc);

create index if not exists idx_version_deploy_requests_tenant_product_status
  on public.version_deploy_requests (tenant_id, product_id, status, created_at desc);

drop trigger if exists trg_version_deploy_requests_touch_updated_at on public.version_deploy_requests;
create trigger trg_version_deploy_requests_touch_updated_at
before update on public.version_deploy_requests
for each row execute function public.touch_updated_at();

create or replace view public.version_deploy_requests_labeled as
select
  d.id,
  d.tenant_id,
  d.product_id,
  p.product_key,
  p.name as product_name,
  d.env_id,
  e.env_key,
  e.name as env_name,
  d.release_id,
  r.semver_major,
  r.semver_minor,
  r.semver_patch,
  r.prerelease_tag,
  r.prerelease_no,
  case
    when r.prerelease_tag is null then public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch)
    else format(
      '%s-%s.%s',
      public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch),
      r.prerelease_tag,
      r.prerelease_no
    )
  end as version_label,
  d.status,
  d.requested_by,
  d.requested_by_actor_uuid,
  d.approved_by,
  d.approved_by_actor_uuid,
  d.approved_at,
  d.rejected_by,
  d.rejected_by_actor_uuid,
  d.rejected_at,
  d.rejection_reason,
  d.executed_by,
  d.executed_by_actor_uuid,
  d.executed_at,
  d.admin_override,
  d.deployment_id,
  d.deployment_status,
  d.logs_url,
  d.notes,
  d.metadata,
  d.created_at,
  d.updated_at
from public.version_deploy_requests d
join public.version_products p on p.id = d.product_id
join public.version_environments e on e.id = d.env_id
join public.version_releases r on r.id = d.release_id;

alter view public.version_deploy_requests_labeled set (security_invoker = true);

create or replace function public.versioning_request_deploy(
  p_product_key text,
  p_env_key text,
  p_semver text,
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
  v_tenant_id uuid;
  v_product_id uuid;
  v_env_id uuid;
  v_release_id uuid;
  v_major integer;
  v_minor integer;
  v_patch integer;
  v_actor text;
  v_request_id uuid;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_request_deploy: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'admin-ui');

  select major, minor, patch
    into v_major, v_minor, v_patch
  from public.versioning_parse_semver(p_semver)
  limit 1;

  v_tenant_id := public.current_usuario_tenant_id();
  if v_tenant_id is null then
    select id into v_tenant_id
    from public.tenants
    order by created_at asc
    limit 1;
  end if;

  select id
    into v_product_id
  from public.version_products
  where tenant_id = v_tenant_id
    and product_key = p_product_key
  limit 1;

  select id
    into v_env_id
  from public.version_environments
  where tenant_id = v_tenant_id
    and env_key = p_env_key
  limit 1;

  if v_product_id is null or v_env_id is null then
    raise exception 'versioning_request_deploy: product/env invalid (% / %)', p_product_key, p_env_key
      using errcode = '22023';
  end if;

  select id
    into v_release_id
  from public.version_releases
  where tenant_id = v_tenant_id
    and product_id = v_product_id
    and env_id = v_env_id
    and semver_major = v_major
    and semver_minor = v_minor
    and semver_patch = v_patch
    and prerelease_tag is null
  order by created_at desc
  limit 1;

  if v_release_id is null then
    raise exception 'versioning_request_deploy: release % not found for %/%', p_semver, p_product_key, p_env_key
      using errcode = '22023';
  end if;

  insert into public.version_deploy_requests (
    tenant_id,
    product_id,
    env_id,
    release_id,
    status,
    requested_by,
    requested_by_actor_uuid,
    notes,
    metadata
  )
  values (
    v_tenant_id,
    v_product_id,
    v_env_id,
    v_release_id,
    'pending',
    v_actor,
    auth.uid(),
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
    v_tenant_id,
    v_actor,
    'request_deploy',
    'version_deploy_requests',
    v_request_id::text,
    jsonb_build_object(
      'product_key', p_product_key,
      'env_key', p_env_key,
      'semver', p_semver,
      'notes', p_notes
    )
  );

  return v_request_id;
end;
$$;

create or replace function public.versioning_approve_deploy_request(
  p_request_id uuid,
  p_actor text default 'admin-ui',
  p_force_admin_override boolean default false,
  p_notes text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request public.version_deploy_requests%rowtype;
  v_actor text;
  v_is_admin boolean;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_approve_deploy_request: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'admin-ui');
  v_is_admin := public.versioning_is_admin();

  select *
    into v_request
  from public.version_deploy_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'versioning_approve_deploy_request: request % not found', p_request_id
      using errcode = '22023';
  end if;

  if v_request.status <> 'pending' then
    raise exception 'versioning_approve_deploy_request: request % is not pending', p_request_id
      using errcode = '22023';
  end if;

  if v_request.requested_by = v_actor and not (p_force_admin_override and v_is_admin) then
    raise exception 'versioning_approve_deploy_request: four-eyes rule, self-approval blocked'
      using errcode = '42501';
  end if;

  update public.version_deploy_requests
  set
    status = 'approved',
    approved_by = v_actor,
    approved_by_actor_uuid = auth.uid(),
    approved_at = now(),
    admin_override = case
      when v_request.requested_by = v_actor and p_force_admin_override and v_is_admin then true
      else admin_override
    end,
    notes = coalesce(p_notes, notes)
  where id = p_request_id;

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
    'approve_deploy_request',
    'version_deploy_requests',
    p_request_id::text,
    jsonb_build_object(
      'admin_override', (v_request.requested_by = v_actor and p_force_admin_override and v_is_admin),
      'notes', p_notes
    )
  );

  return p_request_id;
end;
$$;

create or replace function public.versioning_reject_deploy_request(
  p_request_id uuid,
  p_actor text default 'admin-ui',
  p_reason text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request public.version_deploy_requests%rowtype;
  v_actor text;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_reject_deploy_request: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'admin-ui');

  select *
    into v_request
  from public.version_deploy_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'versioning_reject_deploy_request: request % not found', p_request_id
      using errcode = '22023';
  end if;

  if v_request.status not in ('pending', 'approved') then
    raise exception 'versioning_reject_deploy_request: invalid status for rejection'
      using errcode = '22023';
  end if;

  update public.version_deploy_requests
  set
    status = 'rejected',
    rejected_by = v_actor,
    rejected_by_actor_uuid = auth.uid(),
    rejected_at = now(),
    rejection_reason = p_reason
  where id = p_request_id;

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
    'reject_deploy_request',
    'version_deploy_requests',
    p_request_id::text,
    jsonb_build_object('reason', p_reason)
  );

  return p_request_id;
end;
$$;

create or replace function public.versioning_execute_deploy_request(
  p_request_id uuid,
  p_actor text default 'admin-ui',
  p_status text default 'success',
  p_deployment_id text default null,
  p_logs_url text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request public.version_deploy_requests%rowtype;
  v_actor text;
  v_is_admin boolean;
  v_deployment_status text;
  v_deployment_id text;
  v_deployment_row_id uuid;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_execute_deploy_request: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'admin-ui');
  v_is_admin := public.versioning_is_admin();
  v_deployment_status := lower(trim(coalesce(p_status, 'success')));

  if v_deployment_status not in ('started', 'success', 'failed') then
    raise exception 'versioning_execute_deploy_request: status must be started|success|failed'
      using errcode = '22023';
  end if;

  select *
    into v_request
  from public.version_deploy_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'versioning_execute_deploy_request: request % not found', p_request_id
      using errcode = '22023';
  end if;

  if v_request.status = 'pending' then
    if not v_is_admin then
      raise exception 'versioning_execute_deploy_request: request must be approved first'
        using errcode = '42501';
    end if;

    update public.version_deploy_requests
    set
      status = 'approved',
      approved_by = v_actor,
      approved_by_actor_uuid = auth.uid(),
      approved_at = now(),
      admin_override = true
    where id = p_request_id;

    select *
      into v_request
    from public.version_deploy_requests
    where id = p_request_id
    for update;
  end if;

  if v_request.status <> 'approved' then
    raise exception 'versioning_execute_deploy_request: request % is not approved', p_request_id
      using errcode = '22023';
  end if;

  v_deployment_id := coalesce(
    nullif(trim(p_deployment_id), ''),
    format('manual-%s-%s', to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS'), substr(v_request.id::text, 1, 8))
  );

  insert into public.version_deployments (
    tenant_id,
    release_id,
    env_id,
    deployment_id,
    status,
    logs_url,
    metadata,
    started_at,
    finished_at
  )
  values (
    v_request.tenant_id,
    v_request.release_id,
    v_request.env_id,
    v_deployment_id,
    v_deployment_status,
    p_logs_url,
    jsonb_build_object(
      'deploy_request_id', v_request.id,
      'executed_by', v_actor,
      'admin_override', v_request.admin_override
    ) || coalesce(p_metadata, '{}'::jsonb),
    now(),
    now()
  )
  returning id into v_deployment_row_id;

  if v_deployment_status = 'success' then
    update public.version_releases
    set status = 'deployed'
    where id = v_request.release_id;
  end if;

  update public.version_deploy_requests
  set
    status = case
      when v_deployment_status = 'failed' then 'failed'
      else 'executed'
    end,
    executed_by = v_actor,
    executed_by_actor_uuid = auth.uid(),
    executed_at = now(),
    deployment_id = v_deployment_id,
    deployment_status = v_deployment_status,
    logs_url = p_logs_url,
    metadata = metadata || coalesce(p_metadata, '{}'::jsonb)
  where id = p_request_id;

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
    'execute_deploy_request',
    'version_deploy_requests',
    p_request_id::text,
    jsonb_build_object(
      'deployment_row_id', v_deployment_row_id,
      'deployment_id', v_deployment_id,
      'status', v_deployment_status
    )
  );

  return v_deployment_row_id;
end;
$$;

grant select, insert, update, delete on public.version_deploy_requests to authenticated;
grant select, insert, update, delete on public.version_deploy_requests to service_role;

grant select on public.version_deploy_requests_labeled to authenticated;
grant select on public.version_deploy_requests_labeled to service_role;

grant execute on function public.versioning_request_deploy(text, text, text, text, text, jsonb) to authenticated;
grant execute on function public.versioning_approve_deploy_request(uuid, text, boolean, text) to authenticated;
grant execute on function public.versioning_reject_deploy_request(uuid, text, text) to authenticated;
grant execute on function public.versioning_execute_deploy_request(uuid, text, text, text, text, jsonb) to authenticated;

grant execute on function public.versioning_request_deploy(text, text, text, text, text, jsonb) to service_role;
grant execute on function public.versioning_approve_deploy_request(uuid, text, boolean, text) to service_role;
grant execute on function public.versioning_reject_deploy_request(uuid, text, text) to service_role;
grant execute on function public.versioning_execute_deploy_request(uuid, text, text, text, text, jsonb) to service_role;

alter table public.version_deploy_requests enable row level security;

drop policy if exists version_deploy_requests_admin_all on public.version_deploy_requests;
create policy version_deploy_requests_admin_all
  on public.version_deploy_requests
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
