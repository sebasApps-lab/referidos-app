-- 20260302_000022_versioning_admin_override_service_role.sql
-- Fix admin override flows executed via service_role (OPS edge functions).

begin;

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
  v_is_admin := public.versioning_is_admin() or coalesce(auth.role(), '') = 'service_role';

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
  v_is_admin := public.versioning_is_admin() or coalesce(auth.role(), '') = 'service_role';
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

commit;
