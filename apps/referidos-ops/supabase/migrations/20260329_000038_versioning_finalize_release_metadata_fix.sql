create or replace function public.versioning_finalize_release_metadata(
  p_request_id uuid,
  p_actor text default 'github-actions',
  p_pr_number integer default null,
  p_tag_name text default null,
  p_release_notes_auto text default null,
  p_release_notes_final text default null,
  p_ci_run_id bigint default null,
  p_ci_run_number bigint default null,
  p_metadata jsonb default '{}'::jsonb
)
returns table(
  release_id uuid,
  build_number bigint,
  channel text,
  tag_name text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request public.version_deploy_requests%rowtype;
  v_release public.version_releases%rowtype;
  v_env_key text;
  v_actor text;
  v_tag_name text;
  v_build_number bigint;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_finalize_release_metadata: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'github-actions');

  select *
    into v_request
  from public.version_deploy_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'versioning_finalize_release_metadata: request % not found', p_request_id
      using errcode = '22023';
  end if;

  if v_request.status not in ('executed', 'approved') then
    raise exception 'versioning_finalize_release_metadata: request status % not allowed', v_request.status
      using errcode = '22023';
  end if;

  if coalesce(v_request.deployment_status, '') <> 'success' then
    raise exception 'versioning_finalize_release_metadata: deployment_status must be success'
      using errcode = '22023';
  end if;

  select r.*
    into v_release
  from public.version_releases r
  where r.id = v_request.release_id
  for update;

  if not found then
    raise exception 'versioning_finalize_release_metadata: release % not found', v_request.release_id
      using errcode = '22023';
  end if;

  select lower(e.env_key)
    into v_env_key
  from public.version_environments e
  where e.id = v_release.env_id
  limit 1;

  if v_env_key is null then
    raise exception 'versioning_finalize_release_metadata: env not found for release %', v_release.id
      using errcode = '22023';
  end if;

  v_build_number := public.versioning_allocate_build_number(v_release.id, v_actor);
  v_tag_name := nullif(trim(coalesce(p_tag_name, '')), '');

  if v_tag_name is null and v_env_key = 'prod' then
    v_tag_name := format('v%s.%s.%s', v_release.semver_major, v_release.semver_minor, v_release.semver_patch);
  end if;

  update public.version_releases as r
  set
    channel = v_env_key,
    build_number = coalesce(v_release.build_number, v_build_number),
    pr_number = coalesce(p_pr_number, r.pr_number),
    tag_name = coalesce(v_tag_name, r.tag_name),
    release_notes_auto = coalesce(nullif(trim(coalesce(p_release_notes_auto, '')), ''), r.release_notes_auto),
    release_notes_final = coalesce(nullif(trim(coalesce(p_release_notes_final, '')), ''), r.release_notes_final),
    ci_run_id = coalesce(p_ci_run_id, r.ci_run_id),
    ci_run_number = coalesce(p_ci_run_number, r.ci_run_number),
    metadata = coalesce(r.metadata, '{}'::jsonb) || coalesce(p_metadata, '{}'::jsonb),
    updated_at = now()
  where r.id = v_release.id;

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
    'finalize_release_metadata',
    'version_releases',
    v_release.id::text,
    jsonb_build_object(
      'request_id', p_request_id,
      'build_number', v_build_number,
      'channel', v_env_key,
      'tag_name', v_tag_name,
      'pr_number', p_pr_number,
      'ci_run_id', p_ci_run_id,
      'ci_run_number', p_ci_run_number
    )
  );

  return query
  select
    r.id,
    r.build_number,
    r.channel,
    r.tag_name
  from public.version_releases r
  where r.id = v_release.id;
end;
$$;

grant execute on function public.versioning_finalize_release_metadata(uuid, text, integer, text, text, text, bigint, bigint, jsonb) to authenticated;
grant execute on function public.versioning_finalize_release_metadata(uuid, text, integer, text, text, text, bigint, bigint, jsonb) to service_role;
