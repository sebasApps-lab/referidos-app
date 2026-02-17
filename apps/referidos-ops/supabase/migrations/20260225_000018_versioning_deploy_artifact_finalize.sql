-- 20260223_000018_versioning_deploy_artifact_finalize.sql
-- Enable async artifact deploy flow: start now, finalize later (success/failed) from callback.

begin;

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

grant execute on function public.versioning_execute_deploy_request(uuid, text, text, text, text, jsonb) to authenticated;
grant execute on function public.versioning_execute_deploy_request(uuid, text, text, text, text, jsonb) to service_role;

grant execute on function public.versioning_finalize_deploy_request(uuid, text, text, text, text, jsonb) to authenticated;
grant execute on function public.versioning_finalize_deploy_request(uuid, text, text, text, text, jsonb) to service_role;

commit;

