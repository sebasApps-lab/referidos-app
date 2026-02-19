begin;

alter table public.version_releases
  drop constraint if exists version_releases_status_check;

update public.version_releases
set
  status = 'released',
  updated_at = now()
where status = 'validated';

update public.version_releases r
set
  status = case
    when e.env_key = 'dev' then 'released'
    else 'approved'
  end,
  updated_at = now()
from public.version_environments e
where e.id = r.env_id
  and r.status = 'deployed';

update public.version_releases r
set
  status = 'released',
  updated_at = now()
from public.version_environments e
where e.id = r.env_id
  and e.env_key = 'dev'
  and r.status = 'approved';

update public.version_releases r
set
  status = 'approved',
  updated_at = now()
from public.version_environments e
where e.id = r.env_id
  and e.env_key in ('staging', 'prod')
  and r.status = 'released';

update public.version_releases r
set
  status = 'promoted',
  updated_at = now()
where r.status <> 'rolled_back'
  and exists (
    select 1
    from public.version_promotions p
    where p.from_release_id = r.id
  );

alter table public.version_releases
  add constraint version_releases_status_check
  check (status in ('draft', 'released', 'approved', 'promoted', 'rolled_back'));

create or replace function public.versioning_validate_release_status_by_env()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_env_key text;
begin
  select lower(env_key)
    into v_env_key
  from public.version_environments
  where id = new.env_id
  limit 1;

  if v_env_key is null then
    raise exception 'versioning_validate_release_status_by_env: env_id % not found', new.env_id
      using errcode = '22023';
  end if;

  if v_env_key = 'dev' then
    if new.status not in ('draft', 'released', 'promoted', 'rolled_back') then
      raise exception 'versioning_validate_release_status_by_env: invalid status % for dev', new.status
        using errcode = '22023';
    end if;
  elsif v_env_key in ('staging', 'prod') then
    if new.status not in ('approved', 'promoted', 'rolled_back') then
      raise exception 'versioning_validate_release_status_by_env: invalid status % for %', new.status, v_env_key
        using errcode = '22023';
    end if;
  else
    raise exception 'versioning_validate_release_status_by_env: unsupported env_key %', v_env_key
      using errcode = '22023';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_version_releases_validate_status on public.version_releases;
create trigger trg_version_releases_validate_status
before insert or update of env_id, status on public.version_releases
for each row execute function public.versioning_validate_release_status_by_env();

create or replace function public.versioning_promote_release(
  p_product_key text,
  p_from_env text,
  p_to_env text,
  p_semver text,
  p_actor text default 'admin',
  p_notes text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_product_id uuid;
  v_from_env_id uuid;
  v_to_env_id uuid;
  v_target_env_key text;
  v_target_release_status text;
  v_major integer;
  v_minor integer;
  v_patch integer;
  v_source_release_id uuid;
  v_target_release_id uuid;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_promote_release: forbidden' using errcode = '42501';
  end if;

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

  select vp.id
    into v_product_id
  from public.version_products vp
  where vp.tenant_id = v_tenant_id
    and vp.product_key = p_product_key
  limit 1;

  if v_product_id is null then
    raise exception 'versioning_promote_release: product "%" not found', p_product_key using errcode = '22023';
  end if;

  select id into v_from_env_id
  from public.version_environments
  where tenant_id = v_tenant_id
    and env_key = p_from_env
  limit 1;

  select id, lower(env_key)
    into v_to_env_id, v_target_env_key
  from public.version_environments
  where tenant_id = v_tenant_id
    and env_key = p_to_env
  limit 1;

  if v_from_env_id is null or v_to_env_id is null then
    raise exception 'versioning_promote_release: env "%" or "%" not found', p_from_env, p_to_env using errcode = '22023';
  end if;

  v_target_release_status := case
    when v_target_env_key = 'dev' then 'released'
    else 'approved'
  end;

  select r.id
    into v_source_release_id
  from public.version_releases r
  where r.tenant_id = v_tenant_id
    and r.product_id = v_product_id
    and r.env_id = v_from_env_id
    and r.semver_major = v_major
    and r.semver_minor = v_minor
    and r.semver_patch = v_patch
    and r.prerelease_tag is null
  order by r.created_at desc
  limit 1;

  if v_source_release_id is null then
    raise exception 'versioning_promote_release: source release % (% -> %) not found', p_semver, p_from_env, p_to_env
      using errcode = '22023';
  end if;

  select r.id
    into v_target_release_id
  from public.version_releases r
  where r.tenant_id = v_tenant_id
    and r.product_id = v_product_id
    and r.env_id = v_to_env_id
    and r.semver_major = v_major
    and r.semver_minor = v_minor
    and r.semver_patch = v_patch
    and r.prerelease_tag is null
  limit 1;

  if v_target_release_id is null then
    insert into public.version_releases (
      tenant_id,
      product_id,
      env_id,
      semver_major,
      semver_minor,
      semver_patch,
      prerelease_tag,
      prerelease_no,
      status,
      source_changeset_id,
      source_commit_sha,
      created_by
    )
    select
      r.tenant_id,
      r.product_id,
      v_to_env_id,
      r.semver_major,
      r.semver_minor,
      r.semver_patch,
      null,
      null,
      v_target_release_status,
      r.source_changeset_id,
      r.source_commit_sha,
      coalesce(nullif(trim(p_actor), ''), 'admin')
    from public.version_releases r
    where r.id = v_source_release_id
    returning id into v_target_release_id;

    insert into public.version_release_components (
      tenant_id,
      release_id,
      component_id,
      component_revision_id
    )
    select
      rc.tenant_id,
      v_target_release_id,
      rc.component_id,
      rc.component_revision_id
    from public.version_release_components rc
    where rc.release_id = v_source_release_id;
  end if;

  insert into public.version_promotions (
    tenant_id,
    product_id,
    from_release_id,
    to_release_id,
    promoted_by,
    notes
  )
  values (
    v_tenant_id,
    v_product_id,
    v_source_release_id,
    v_target_release_id,
    coalesce(nullif(trim(p_actor), ''), 'admin'),
    p_notes
  );

  update public.version_releases
  set
    status = 'promoted',
    updated_at = now()
  where id = v_source_release_id
    and status <> 'rolled_back';

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
    coalesce(nullif(trim(p_actor), ''), 'admin'),
    'promote_release',
    'version_releases',
    v_target_release_id::text,
    jsonb_build_object(
      'product_key', p_product_key,
      'from_env', p_from_env,
      'to_env', p_to_env,
      'semver', p_semver,
      'notes', p_notes
    )
  );

  return v_target_release_id;
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
    case when v_deployment_status = 'started' then null else now() end
  )
  returning id into v_deployment_row_id;

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

create or replace function public.versioning_finalize_deploy_request(
  p_request_id uuid,
  p_actor text default 'github-actions',
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
  v_deployment_status text;
  v_deployment_id text;
  v_deployment_row_id uuid;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_finalize_deploy_request: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'github-actions');
  v_deployment_status := lower(trim(coalesce(p_status, 'success')));

  if v_deployment_status not in ('success', 'failed') then
    raise exception 'versioning_finalize_deploy_request: status must be success|failed'
      using errcode = '22023';
  end if;

  select *
    into v_request
  from public.version_deploy_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'versioning_finalize_deploy_request: request % not found', p_request_id
      using errcode = '22023';
  end if;

  if v_request.status in ('pending', 'rejected') then
    raise exception 'versioning_finalize_deploy_request: request % has invalid status %', p_request_id, v_request.status
      using errcode = '22023';
  end if;

  v_deployment_id := coalesce(
    nullif(trim(p_deployment_id), ''),
    nullif(trim(v_request.deployment_id), ''),
    format('final-%s-%s', to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS'), substr(v_request.id::text, 1, 8))
  );

  select d.id
    into v_deployment_row_id
  from public.version_deployments d
  where d.tenant_id = v_request.tenant_id
    and d.release_id = v_request.release_id
    and d.deployment_id = v_deployment_id
  order by d.started_at desc
  limit 1
  for update;

  if found then
    update public.version_deployments
    set
      status = v_deployment_status,
      logs_url = coalesce(nullif(trim(p_logs_url), ''), logs_url),
      metadata = metadata || coalesce(p_metadata, '{}'::jsonb),
      finished_at = now()
    where id = v_deployment_row_id;
  else
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
        'finalized_by', v_actor
      ) || coalesce(p_metadata, '{}'::jsonb),
      coalesce(v_request.executed_at, now()),
      now()
    )
    returning id into v_deployment_row_id;
  end if;

  update public.version_deploy_requests
  set
    status = case
      when v_deployment_status = 'failed' then 'failed'
      else 'executed'
    end,
    executed_by = coalesce(nullif(trim(executed_by), ''), v_actor),
    executed_at = coalesce(executed_at, now()),
    deployment_id = v_deployment_id,
    deployment_status = v_deployment_status,
    logs_url = coalesce(nullif(trim(p_logs_url), ''), logs_url),
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
    'finalize_deploy_request',
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

commit;
