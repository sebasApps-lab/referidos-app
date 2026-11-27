-- An attempt belongs to one approved request. Older request and deployment rows are read as-is.
-- Supabase CLI applies the schema changes and records the migration in one transaction.

create table public.version_deploy_attempts (
  execution_id text primary key check (execution_id ~ '^gha-[0-9]+-[a-f0-9]{8}$'),
  request_id uuid not null unique references public.version_deploy_requests(id),
  deployment_row_id uuid references public.version_deployments(id),
  tenant_id uuid not null references public.tenants(id),
  product_id uuid not null references public.version_products(id),
  env_id uuid not null references public.version_environments(id),
  release_id uuid not null references public.version_releases(id),
  product_key text not null,
  env_key text not null,
  version_label text not null,
  source_commit_sha text not null check (source_commit_sha ~ '^[a-f0-9]{40}$'),
  netlify_site_id uuid not null,
  dispatch_state text not null default 'reserved'
    check (dispatch_state in ('reserved', 'dispatching', 'dispatched', 'unknown', 'rejected')),
  dispatch_spec jsonb not null,
  dispatch_result jsonb not null default '{}'::jsonb,
  callback_binding jsonb,
  prepared_metadata jsonb,
  publish_authorized boolean not null default false,
  publication_status text not null default 'none'
    check (publication_status in ('none', 'not_confirmed', 'not_published', 'published')),
  publication jsonb,
  report_metadata jsonb not null default '{}'::jsonb,
  reconciliation_status text not null default 'pending'
    check (reconciliation_status in ('pending', 'incomplete', 'complete')),
  reconciliation_reason text,
  observability_status text not null default 'pending'
    check (observability_status in ('pending', 'synced', 'failed', 'not_required')),
  observability_detail text,
  lease_token uuid,
  lease_expires_at timestamptz,
  leased_by text,
  retry_count integer not null default 0,
  next_check_at timestamptz not null default now(),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (publish_authorized = (prepared_metadata is not null)),
  check ((lease_token is null) = (lease_expires_at is null)),
  check ((closed_at is not null) = (reconciliation_status = 'complete'))
);

create unique index version_deploy_attempts_one_open_target
  on public.version_deploy_attempts (tenant_id, product_id, env_id) where closed_at is null;
create unique index version_deploy_attempts_one_open_netlify_site
  on public.version_deploy_attempts (netlify_site_id) where closed_at is null;
create index version_deploy_attempts_retry
  on public.version_deploy_attempts (next_check_at, created_at)
  where closed_at is null or observability_status in ('pending', 'failed');

alter table public.version_deploy_attempts enable row level security;
revoke all on public.version_deploy_attempts from public, anon, authenticated, service_role;
grant select on public.version_deploy_attempts to service_role;

create function public.versioning_mirror_deploy_attempt(p_attempt public.version_deploy_attempts)
returns void language sql set search_path = pg_catalog, public, pg_temp as $$
  update public.version_deploy_requests
  set metadata = coalesce(metadata, '{}'::jsonb) || jsonb_build_object(
    'deploy_mode', 'github_artifact_exact',
    'deploy_contract_version', 2,
    'deploy_attempt_protocol', 'durable_v1',
    'deploy_execution_id', p_attempt.execution_id,
    'source_commit_sha', p_attempt.source_commit_sha,
    'callback_attempt', p_attempt.callback_binding,
    'github_run_id', coalesce(p_attempt.callback_binding -> 'github_run_id',
      p_attempt.report_metadata #> '{terminal_github_run,run_id}'),
    'dispatch_state', p_attempt.dispatch_state,
    'publication', p_attempt.publication,
    'ops_reconciliation', jsonb_build_object(
      'status', p_attempt.reconciliation_status,
      'reason', p_attempt.reconciliation_reason,
      'retry_count', p_attempt.retry_count,
      'needs_review', p_attempt.reconciliation_status <> 'complete' and
        (p_attempt.retry_count >= 12 or p_attempt.reconciliation_reason is not distinct from 'netlify_deploy_superseded'),
      'updated_at', p_attempt.updated_at
    ),
    'ops_observability', jsonb_build_object(
      'status', p_attempt.observability_status,
      'reason', p_attempt.observability_detail
    )
  )
  where id = p_attempt.request_id and deployment_id = p_attempt.execution_id;
$$;

create function public.versioning_reserve_deploy_attempt(
  p_request_id uuid, p_execution_id text, p_actor text, p_metadata jsonb
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_request public.version_deploy_requests%rowtype;
  v_attempt public.version_deploy_attempts%rowtype;
  v_product text;
  v_env text;
  v_version text;
  v_sha text;
  v_site uuid;
  v_deployment_row_id uuid;
  v_inputs jsonb := p_metadata -> 'dispatch_inputs';
begin
  select * into v_request from public.version_deploy_requests where id = p_request_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_request_not_found'); end if;

  select * into v_attempt from public.version_deploy_attempts where request_id = p_request_id;
  if found then return jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt),
    'deployment_row_id', v_attempt.deployment_row_id); end if;
  if v_request.status <> 'approved' and not coalesce(v_request.status = 'pending'
    and p_metadata -> 'force_admin_override' = 'true'::jsonb and auth.role() = 'service_role', false) then
    return jsonb_build_object('ok', false, 'error', 'deploy_request_requires_approval');
  end if;

  select product_key, env_key, version_label into v_product, v_env, v_version
  from public.version_deploy_requests_labeled where id = p_request_id;
  select lower(r.source_commit_sha) into v_sha from public.version_releases r
  where r.id = v_request.release_id and r.tenant_id = v_request.tenant_id
    and r.product_id = v_request.product_id and r.env_id = v_request.env_id;

  if not coalesce(v_product in ('referidos_app', 'prelaunch_web') and v_env in ('staging', 'prod')
    and v_sha ~ '^[a-f0-9]{40}$' and p_execution_id ~ '^gha-[0-9]+-[a-f0-9]{8}$'
    and p_metadata ->> 'netlify_site_id' ~* '^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$'
    and p_metadata ->> 'netlify_site_name' ~ '^[a-z0-9][a-z0-9-]*$'
    and p_metadata #>> '{workflow,repository}' ~ '^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$'
    and nullif(p_metadata #>> '{workflow,id}', '') is not null
    and nullif(p_metadata #>> '{workflow,ref}', '') is not null
    and v_inputs ->> 'request_id' = p_request_id::text
    and v_inputs ->> 'deploy_execution_id' = p_execution_id
    and v_inputs ->> 'product_key' = v_product and v_inputs ->> 'env_key' = v_env
    and v_inputs ->> 'semver' = v_version and lower(v_inputs ->> 'source_commit_sha') = v_sha, false) then
    return jsonb_build_object('ok', false, 'error', 'deploy_dispatch_spec_invalid');
  end if;
  v_site := (p_metadata ->> 'netlify_site_id')::uuid;

  perform pg_advisory_xact_lock(hashtextextended(
    'versioning-deploy-target:' || v_request.tenant_id::text || ':' || v_request.product_id::text || ':' || v_request.env_id::text, 0));
  perform pg_advisory_xact_lock(hashtextextended('versioning-deploy-site:' || v_site::text, 0));
  if exists (select 1 from public.version_deploy_requests d
    where d.tenant_id = v_request.tenant_id and d.product_id = v_request.product_id and d.env_id = v_request.env_id
      and d.id <> p_request_id and
      (d.deployment_status = 'started' or (d.status in ('executed', 'failed')
        and d.metadata #>> '{ops_reconciliation,status}' in ('pending', 'incomplete')))) then
    return jsonb_build_object('ok', false, 'error', 'deploy_target_busy');
  end if;

  insert into public.version_deploy_attempts (
    execution_id, request_id, tenant_id, product_id, env_id, release_id,
    product_key, env_key, version_label, source_commit_sha, netlify_site_id, dispatch_spec
  ) values (
    p_execution_id, p_request_id, v_request.tenant_id, v_request.product_id, v_request.env_id, v_request.release_id,
    v_product, v_env, v_version, v_sha, v_site, p_metadata
  ) on conflict do nothing returning * into v_attempt;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_target_busy'); end if;

  v_deployment_row_id := public.versioning_execute_deploy_request(
    p_request_id, p_actor, 'started', p_execution_id, nullif(p_metadata ->> 'logs_url', ''),
    jsonb_build_object('workflow', p_metadata -> 'workflow', 'netlify_site_id', v_site)
  );
  update public.version_deploy_attempts set deployment_row_id = v_deployment_row_id
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt),
    'deployment_row_id', v_deployment_row_id);
end;
$$;

create function public.versioning_begin_deploy_dispatch(p_execution_id text)
returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare v_attempt public.version_deploy_attempts%rowtype;
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_found'); end if;
  if v_attempt.dispatch_state <> 'reserved' or v_attempt.closed_at is not null then
    return jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt));
  end if;
  update public.version_deploy_attempts set dispatch_state = 'dispatching', updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt), 'dispatch_spec', v_attempt.dispatch_spec);
end;
$$;

create function public.versioning_record_deploy_dispatch(p_execution_id text, p_state text, p_metadata jsonb)
returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare v_attempt public.version_deploy_attempts%rowtype;
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_found'); end if;
  if v_attempt.dispatch_state = p_state or v_attempt.closed_at is not null then
    return jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt));
  end if;
  if (v_attempt.dispatch_state <> 'dispatching' and not (v_attempt.dispatch_state = 'unknown' and p_state = 'dispatched'))
    or p_state not in ('dispatched', 'unknown', 'rejected')
    or (p_state = 'rejected' and v_attempt.callback_binding is not null) then
    return jsonb_build_object('ok', false, 'error', 'deploy_dispatch_state_conflict');
  end if;

  update public.version_deploy_attempts set
    dispatch_state = p_state, dispatch_result = coalesce(p_metadata, '{}'::jsonb),
    publication_status = case when p_state = 'rejected' then 'not_published' else publication_status end,
    publication = case when p_state = 'rejected' then jsonb_build_object(
      'status', 'not_published', 'netlify_site_id', v_attempt.netlify_site_id, 'reported_at', now()) else publication end,
    next_check_at = now(), updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt));
end;
$$;

create function public.versioning_normalize_deploy_binding(p_binding jsonb)
returns jsonb language sql immutable set search_path = pg_catalog, public, pg_temp as $$
  select jsonb_build_object(
    'tenant_id', lower(p_binding ->> 'tenant_id'), 'release_id', lower(p_binding ->> 'release_id'),
    'product_key', p_binding ->> 'product_key', 'env_key', p_binding ->> 'env_key', 'semver', p_binding ->> 'semver',
    'source_commit_sha', lower(p_binding ->> 'source_commit_sha'), 'artifact_id', lower(p_binding ->> 'artifact_id'),
    'artifact_checksum_sha256', lower(p_binding ->> 'artifact_checksum_sha256'),
    'github_run_id', p_binding ->> 'github_run_id', 'github_run_attempt', p_binding ->> 'github_run_attempt',
    'github_repository', lower(p_binding ->> 'github_repository'), 'netlify_site_id', lower(p_binding ->> 'netlify_site_id')
  );
$$;

create function public.versioning_deploy_artifact_matches(
  p_attempt public.version_deploy_attempts, p_binding jsonb
) returns boolean language plpgsql set search_path = pg_catalog, public, pg_temp as $$
declare
  v_artifact public.version_release_artifacts%rowtype;
  v_release_id uuid := p_attempt.release_id;
  v_origin_ids uuid[];
  v_origin public.version_releases%rowtype;
  v_env_rank integer := case p_attempt.env_key when 'staging' then 2 when 'prod' then 3 end;
  v_origin_rank integer;
begin
  if not coalesce(p_binding ->> 'artifact_id' ~ '^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$'
    and p_binding ->> 'artifact_checksum_sha256' ~ '^[a-f0-9]{64}$', false) then return false; end if;

  select * into v_artifact from public.version_release_artifacts
  where id = (p_binding ->> 'artifact_id')::uuid for share;
  if not found or v_artifact.tenant_id <> p_attempt.tenant_id or v_artifact.product_id <> p_attempt.product_id
    or v_artifact.semver <> p_attempt.version_label or lower(v_artifact.commit_sha) <> p_attempt.source_commit_sha
    or lower(v_artifact.checksum_sha256) is distinct from p_binding ->> 'artifact_checksum_sha256'
    or v_artifact.artifact_provider not in ('supabase_storage', 'github_actions')
    or (v_artifact.artifact_provider = 'supabase_storage' and v_artifact.metadata ->> 'storage_deleted_at' is not null) then
    return false;
  end if;

  -- At most staging and dev can precede a production release. Each step must have a single origin.
  for v_step in 0..2 loop
    if v_release_id = v_artifact.release_id then return true; end if;
    select array_agg(distinct p.from_release_id) into v_origin_ids
    from public.version_promotions p where p.to_release_id = v_release_id
      and p.tenant_id = p_attempt.tenant_id and p.product_id = p_attempt.product_id;
    if coalesce(cardinality(v_origin_ids), 0) <> 1 then return false; end if;
    select r.* into v_origin from public.version_releases r where r.id = v_origin_ids[1] for share;
    if not found or v_origin.tenant_id <> p_attempt.tenant_id or v_origin.product_id <> p_attempt.product_id
      or lower(v_origin.source_commit_sha) is distinct from p_attempt.source_commit_sha
      or format('%s.%s.%s', v_origin.semver_major, v_origin.semver_minor, v_origin.semver_patch) <> p_attempt.version_label
      or v_origin.prerelease_tag is not null then return false; end if;
    select case e.env_key when 'dev' then 1 when 'staging' then 2 when 'prod' then 3 end into v_origin_rank
      from public.version_environments e where e.id = v_origin.env_id;
    if v_origin_rank is null or v_origin_rank >= v_env_rank then return false; end if;
    v_env_rank := v_origin_rank;
    v_release_id := v_origin.id;
  end loop;
  return false;
end;
$$;

create function public.versioning_claim_deploy_attempt(p_execution_id text, p_binding jsonb)
returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_attempt public.version_deploy_attempts%rowtype;
  v_binding jsonb := public.versioning_normalize_deploy_binding(p_binding);
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_found'); end if;
  if v_attempt.callback_binding is not null then
    return case when v_attempt.callback_binding = v_binding
      then jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt))
      else jsonb_build_object('ok', false, 'error', 'deploy_callback_binding_mismatch') end;
  end if;
  if v_attempt.closed_at is not null or v_attempt.dispatch_state not in ('dispatching', 'dispatched', 'unknown')
    or v_attempt.publication_status <> 'none' then
    return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_active');
  end if;
  if not coalesce(v_binding ->> 'tenant_id' = v_attempt.tenant_id::text
    and v_binding ->> 'release_id' = v_attempt.release_id::text
    and v_binding ->> 'product_key' = v_attempt.product_key and v_binding ->> 'env_key' = v_attempt.env_key
    and v_binding ->> 'semver' = v_attempt.version_label and v_binding ->> 'source_commit_sha' = v_attempt.source_commit_sha
    and v_binding ->> 'netlify_site_id' = v_attempt.netlify_site_id::text
    and v_binding ->> 'github_repository' = lower(v_attempt.dispatch_spec #>> '{workflow,repository}')
    and v_binding ->> 'github_run_attempt' = '1' and v_binding ->> 'github_run_id' ~ '^[1-9][0-9]{0,17}$', false)
    or not public.versioning_deploy_artifact_matches(v_attempt, v_binding) then
    return jsonb_build_object('ok', false, 'error', 'deploy_callback_binding_mismatch');
  end if;

  update public.version_deploy_attempts set callback_binding = v_binding, next_check_at = now(), updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt));
end;
$$;

create function public.versioning_prepare_deploy_attempt(p_execution_id text, p_binding jsonb, p_metadata jsonb)
returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_attempt public.version_deploy_attempts%rowtype;
  v_config jsonb := p_metadata -> 'runtime_config';
  v_payload jsonb := v_config -> 'payload';
  v_json text := v_config ->> 'payload_json';
  v_exact_payload jsonb;
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_found'); end if;
  if v_attempt.callback_binding is null or v_attempt.callback_binding <> public.versioning_normalize_deploy_binding(p_binding) then
    return jsonb_build_object('ok', false, 'error', 'deploy_callback_binding_mismatch');
  end if;
  if v_attempt.publish_authorized then
    return jsonb_build_object('ok', true, 'duplicate', true, 'publish_authorized', false, 'attempt', to_jsonb(v_attempt));
  end if;
  if v_attempt.closed_at is not null or v_attempt.publication_status <> 'none' then
    return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_active');
  end if;
  if not public.versioning_deploy_artifact_matches(v_attempt, v_attempt.callback_binding) then
    return jsonb_build_object('ok', false, 'error', 'deploy_artifact_or_config_unverified');
  end if;
  if not exists (select 1 from public.version_releases r where r.id = v_attempt.release_id
    and r.build_number::text is not distinct from p_metadata ->> 'build_number'
    and lower(r.source_commit_sha) = v_attempt.source_commit_sha) then
    return jsonb_build_object('ok', false, 'error', 'runtime_config_unverified');
  end if;
  if not coalesce(v_config ->> 'config_key' = 'app-config.js' and v_config ->> 'config_format' = 'json'
    and octet_length(v_json) between 1 and 65536
    and lower(v_config ->> 'config_hash_sha256') = encode(sha256(convert_to(v_json, 'UTF8')), 'hex')
    and lower(v_payload ->> 'releaseId') = v_attempt.release_id::text
    and lower(v_payload ->> 'artifactId') = v_attempt.callback_binding ->> 'artifact_id'
    and lower(v_payload ->> 'sourceCommitSha') = v_attempt.source_commit_sha
    and v_payload ->> 'appEnv' = v_attempt.env_key
    and v_payload ->> 'appVersion' = v_attempt.version_label
    and (v_payload ->> 'buildNumber') is not distinct from (p_metadata ->> 'build_number')
    and p_metadata ->> 'channel' = v_attempt.env_key and p_metadata ->> 'channel' = v_payload ->> 'releaseChannel'
    and p_metadata ->> 'netlify_deploy_title' = format('versioning:%s:%s:%s:%s:%s:%s',
      v_attempt.product_key, v_attempt.env_key, v_attempt.version_label, v_attempt.source_commit_sha,
      v_attempt.execution_id, v_attempt.callback_binding ->> 'github_run_id'), false) then
    return jsonb_build_object('ok', false, 'error', 'runtime_config_unverified');
  end if;
  begin
    v_exact_payload := v_json::jsonb;
  exception when invalid_text_representation then
    return jsonb_build_object('ok', false, 'error', 'runtime_config_unverified');
  end;
  if v_exact_payload is distinct from v_payload then
    return jsonb_build_object('ok', false, 'error', 'runtime_config_unverified');
  end if;

  update public.version_deploy_attempts set prepared_metadata = p_metadata, publish_authorized = true,
    next_check_at = now(), updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  return jsonb_build_object('ok', true, 'duplicate', false, 'publish_authorized', true, 'attempt', to_jsonb(v_attempt));
end;
$$;

create function public.versioning_deploy_lease_active(p_attempt public.version_deploy_attempts, p_token uuid)
returns boolean language sql volatile set search_path = pg_catalog, public, pg_temp as $$
  select coalesce(p_attempt.lease_token = p_token and p_attempt.lease_expires_at > clock_timestamp(), false);
$$;

create function public.versioning_record_unpublished_deploy_attempt(
  p_execution_id text, p_lease_token uuid, p_github_run jsonb
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_attempt public.version_deploy_attempts%rowtype;
  v_run text := p_github_run ->> 'run_id';
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found or not public.versioning_deploy_lease_active(v_attempt, p_lease_token) then
    return jsonb_build_object('ok', false, 'error', 'deploy_reconciliation_lease_lost');
  end if;
  if v_attempt.publish_authorized or v_attempt.dispatch_state not in ('dispatching', 'dispatched', 'unknown')
    or not coalesce(p_github_run ->> 'execution_id' = v_attempt.execution_id
      and lower(p_github_run ->> 'repository') = lower(v_attempt.dispatch_spec #>> '{workflow,repository}')
      and p_github_run ->> 'workflow_id' = v_attempt.dispatch_spec #>> '{workflow,id}'
      and p_github_run ->> 'workflow_ref' = v_attempt.dispatch_spec #>> '{workflow,ref}'
      and p_github_run ->> 'event' = 'workflow_dispatch'
      and v_run ~ '^[1-9][0-9]{0,17}$' and p_github_run ->> 'run_attempt' = '1'
      and p_github_run ->> 'status' = 'completed'
      and p_github_run ->> 'conclusion' in ('success', 'failure', 'cancelled', 'action_required', 'startup_failure',
        'timed_out', 'stale', 'skipped', 'neutral')
      and (v_attempt.callback_binding is null or v_run = v_attempt.callback_binding ->> 'github_run_id'), false) then
    return jsonb_build_object('ok', false, 'error', 'deploy_terminal_run_unverified');
  end if;
  if v_attempt.publication_status = 'not_published' then
    return jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt));
  end if;
  if v_attempt.closed_at is not null or v_attempt.publication_status = 'published' then
    return jsonb_build_object('ok', false, 'error', 'deploy_publication_conflict');
  end if;

  update public.version_deploy_attempts set publication_status = 'not_published',
    publication = jsonb_build_object('status', 'not_published', 'netlify_site_id', v_attempt.netlify_site_id,
      'reported_at', now(), 'github_run_id', v_run),
    report_metadata = report_metadata || jsonb_build_object('terminal_github_run', p_github_run),
    reconciliation_status = 'pending', reconciliation_reason = null, updated_at = now(), next_check_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt));
end;
$$;

create function public.versioning_record_deploy_publication(
  p_execution_id text, p_binding jsonb, p_publication jsonb, p_metadata jsonb, p_lease_token uuid default null
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_attempt public.version_deploy_attempts%rowtype;
  v_status text := p_publication ->> 'status';
  v_deploy_id text := nullif(p_publication ->> 'netlify_deploy_id', '');
  v_reported_id text := nullif(p_publication ->> 'reported_deploy_id', '');
  v_current_id text := nullif(p_publication ->> 'netlify_current_deploy_id', '');
  v_block text := nullif(p_publication ->> 'reconciliation_block', '');
  v_previous_id text;
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_found'); end if;
  if p_lease_token is not null and not public.versioning_deploy_lease_active(v_attempt, p_lease_token) then
    return jsonb_build_object('ok', false, 'error', 'deploy_reconciliation_lease_lost');
  end if;
  if v_attempt.callback_binding is null or v_attempt.callback_binding <> public.versioning_normalize_deploy_binding(p_binding)
    or (p_publication ->> 'netlify_site_id') is distinct from v_attempt.netlify_site_id::text then
    return jsonb_build_object('ok', false, 'error', 'deploy_callback_binding_mismatch');
  end if;
  if not coalesce(v_status in ('published', 'not_published', 'not_confirmed'), false)
    or (v_status = 'not_published' and v_attempt.publish_authorized)
    or (v_reported_id is not null and (not v_attempt.publish_authorized or v_reported_id !~ '^[A-Za-z0-9_-]{1,128}$')) then
    return jsonb_build_object('ok', false, 'error', 'invalid_publication_evidence');
  end if;
  v_previous_id := v_attempt.publication ->> 'reported_deploy_id';
  if v_previous_id is not null and v_reported_id is not null and v_reported_id <> v_previous_id then
    return jsonb_build_object('ok', false, 'error', 'deploy_publication_conflict');
  end if;
  if v_status = 'published' then
    if not public.versioning_deploy_lease_active(v_attempt, p_lease_token) or not v_attempt.publish_authorized
      or not coalesce(v_deploy_id ~ '^[A-Za-z0-9_-]{1,128}$' and v_current_id ~ '^[A-Za-z0-9_-]{1,128}$'
        and nullif(p_publication ->> 'published_at', '') is not null
        and p_publication ->> 'netlify_deploy_title' = v_attempt.prepared_metadata ->> 'netlify_deploy_title'
        and (v_previous_id is null or v_previous_id = v_deploy_id)
        and (v_reported_id is null or v_reported_id = v_deploy_id)
        and ((v_deploy_id = v_current_id and v_block is null) or
          (v_deploy_id <> v_current_id and v_block = 'netlify_deploy_superseded')), false) then
      return jsonb_build_object('ok', false, 'error', 'invalid_publication_evidence');
    end if;
  elsif v_deploy_id is not null or v_current_id is not null or v_block is not null then
    return jsonb_build_object('ok', false, 'error', 'invalid_publication_evidence');
  end if;

  if v_attempt.publication_status = 'published' and v_status = 'published'
    and v_attempt.publication ->> 'netlify_deploy_id' = v_deploy_id
    and v_attempt.closed_at is null and v_block = 'netlify_deploy_superseded'
    and v_attempt.reconciliation_reason is distinct from v_block then
    update public.version_deploy_attempts set
      publication = v_attempt.publication || jsonb_strip_nulls(p_publication),
      reconciliation_status = 'incomplete', reconciliation_reason = v_block, updated_at = now()
    where execution_id = p_execution_id returning * into v_attempt;
    perform public.versioning_mirror_deploy_attempt(v_attempt);
    return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt));
  end if;
  if v_attempt.publication_status = 'published' and v_status = 'not_confirmed' and p_lease_token is null
    and (v_reported_id is null or v_reported_id = v_attempt.publication ->> 'netlify_deploy_id') then
    return jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt));
  end if;
  if v_attempt.publication_status = v_status
    and (v_attempt.publication ->> 'netlify_deploy_id') is not distinct from v_deploy_id
    and (v_reported_id is null or v_reported_id = v_previous_id) then
    return jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt));
  end if;
  if v_attempt.closed_at is not null or v_attempt.publication_status in ('published', 'not_published') then
    return jsonb_build_object('ok', false, 'error', 'deploy_publication_conflict');
  end if;

  update public.version_deploy_attempts set
    publication_status = v_status,
    publication = coalesce(v_attempt.publication, '{}'::jsonb) || jsonb_strip_nulls(p_publication) ||
      jsonb_build_object('reported_at', coalesce(v_attempt.publication -> 'reported_at', to_jsonb(now()))),
    report_metadata = report_metadata || coalesce(p_metadata, '{}'::jsonb),
    reconciliation_status = case when v_block is null then 'pending' else 'incomplete' end,
    reconciliation_reason = v_block,
    next_check_at = now(), updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt));
end;
$$;

create function public.versioning_claim_deploy_reconciliation(
  p_worker_id text, p_limit integer default 5, p_lease_seconds integer default 90, p_env_key text default null
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_attempts jsonb;
  v_claimed public.version_deploy_attempts%rowtype;
begin
  if nullif(trim(p_worker_id), '') is null or length(p_worker_id) > 128 then
    return jsonb_build_object('ok', false, 'error', 'deploy_worker_id_invalid');
  end if;
  if p_env_key is not null and p_env_key not in ('staging', 'prod') then
    return jsonb_build_object('ok', false, 'error', 'deploy_worker_environment_invalid');
  end if;
  with candidates as (
    select a.execution_id from public.version_deploy_attempts a
    where (a.closed_at is null or a.observability_status in ('pending', 'failed'))
      and (p_env_key is null or a.env_key = p_env_key)
      and (a.reconciliation_reason is distinct from 'netlify_deploy_superseded')
      and a.retry_count < 12 and a.next_check_at <= now()
      and (a.lease_expires_at is null or a.lease_expires_at <= now())
    order by a.next_check_at, a.created_at, a.execution_id
    limit greatest(1, least(coalesce(p_limit, 5), 20))
    for update skip locked
  ), claimed as (
    update public.version_deploy_attempts a set lease_token = gen_random_uuid(), leased_by = p_worker_id,
      lease_expires_at = now() + make_interval(secs => greatest(15, least(coalesce(p_lease_seconds, 90), 300))),
      retry_count = a.retry_count + 1, updated_at = now()
    from candidates c where a.execution_id = c.execution_id returning a.*
  ) select coalesce(jsonb_agg(to_jsonb(claimed)), '[]'::jsonb) into v_attempts from claimed;
  for v_claimed in select * from jsonb_populate_recordset(null::public.version_deploy_attempts, v_attempts) loop
    perform public.versioning_mirror_deploy_attempt(v_claimed);
  end loop;
  return jsonb_build_object('ok', true, 'attempts', v_attempts);
end;
$$;

create function public.versioning_release_deploy_reconciliation(
  p_execution_id text, p_lease_token uuid, p_reason text, p_retry_after_seconds integer default 30
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare v_attempt public.version_deploy_attempts%rowtype;
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found or not public.versioning_deploy_lease_active(v_attempt, p_lease_token) then
    return jsonb_build_object('ok', false, 'error', 'deploy_reconciliation_lease_lost');
  end if;
  update public.version_deploy_attempts set lease_token = null, lease_expires_at = null, leased_by = null,
    reconciliation_status = case when closed_at is null then 'incomplete' else reconciliation_status end,
    reconciliation_reason = case when closed_at is null and reconciliation_reason is distinct from 'netlify_deploy_superseded'
      then coalesce(left(nullif(trim(p_reason), ''), 128), reconciliation_reason, 'deploy_reconciliation_pending')
      else reconciliation_reason end,
    next_check_at = now() + make_interval(secs => greatest(10, least(coalesce(p_retry_after_seconds, 30), 3600))),
    updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'attempt', to_jsonb(v_attempt));
end;
$$;

create function public.versioning_finalize_deploy_attempt(p_execution_id text, p_lease_token uuid, p_actor text)
returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_attempt public.version_deploy_attempts%rowtype;
  v_request public.version_deploy_requests%rowtype;
  v_actor text := coalesce(nullif(trim(p_actor), ''), 'versioning-reconciler');
  v_config jsonb;
  v_artifact_id uuid;
  v_deployment_row_id uuid;
  v_config_version_id uuid;
  v_run_id bigint;
  v_published boolean;
  v_metadata jsonb;
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_found'); end if;
  if v_attempt.closed_at is not null then
    return jsonb_build_object('ok', true, 'duplicate', true, 'attempt', to_jsonb(v_attempt));
  end if;
  if not public.versioning_deploy_lease_active(v_attempt, p_lease_token) then
    return jsonb_build_object('ok', false, 'error', 'deploy_reconciliation_lease_lost');
  end if;
  if v_attempt.publication_status not in ('published', 'not_published')
    or v_attempt.reconciliation_reason = 'netlify_deploy_superseded' then
    return jsonb_build_object('ok', false, 'error', 'deploy_publication_unverified');
  end if;

  select * into v_request from public.version_deploy_requests where id = v_attempt.request_id for update;
  if not found or v_request.status <> 'executed' or v_request.deployment_status is distinct from 'started'
    or v_request.deployment_id is distinct from p_execution_id or v_request.release_id <> v_attempt.release_id
    or v_request.tenant_id <> v_attempt.tenant_id or v_request.product_id <> v_attempt.product_id
    or v_request.env_id <> v_attempt.env_id then
    return jsonb_build_object('ok', false, 'error', 'deploy_request_changed');
  end if;

  v_published := v_attempt.publication_status = 'published';
  v_config := v_attempt.prepared_metadata -> 'runtime_config';
  if v_published and (not v_attempt.publish_authorized or v_config is null or
      not public.versioning_deploy_artifact_matches(v_attempt, v_attempt.callback_binding) or
      not exists (select 1 from public.version_releases r where r.id = v_attempt.release_id
        and lower(r.source_commit_sha) = v_attempt.source_commit_sha)) then
    return jsonb_build_object('ok', false, 'error', 'deploy_artifact_or_config_unverified');
  end if;

  v_artifact_id := (v_attempt.callback_binding ->> 'artifact_id')::uuid;
  v_run_id := (v_attempt.callback_binding ->> 'github_run_id')::bigint;
  v_metadata := coalesce(v_attempt.callback_binding, '{}'::jsonb) || jsonb_build_object(
    'deploy_mode', 'github_artifact_exact', 'deploy_contract_version', 2, 'deploy_attempt_protocol', 'durable_v1',
    'deploy_execution_id', p_execution_id, 'publication', v_attempt.publication,
    'runtime_config', case when v_published then v_config - 'payload_json' else null end
  );

  -- These statements are one transaction. Failures roll back official status, head, config and audit together.
  v_deployment_row_id := public.versioning_finalize_deploy_request(
    v_attempt.request_id, v_actor, case when v_published then 'success' else 'failed' end,
    p_execution_id, v_request.logs_url, v_metadata
  );
  if v_published then
    perform public.versioning_allocate_build_number(v_attempt.release_id, v_actor);
    update public.version_releases r set
      channel = v_attempt.env_key, ci_run_id = v_run_id,
      tag_name = coalesce(nullif(v_attempt.report_metadata ->> 'tag_name', ''), r.tag_name),
      metadata = coalesce(r.metadata, '{}'::jsonb) || v_metadata, updated_at = now()
    where r.id = v_attempt.release_id;

    insert into public.version_artifact_env_heads (tenant_id, product_id, env_id, release_id, artifact_id, updated_by, updated_at)
    values (v_attempt.tenant_id, v_attempt.product_id, v_attempt.env_id, v_attempt.release_id, v_artifact_id, v_actor, now())
    on conflict (tenant_id, product_id, env_id) do update set release_id = excluded.release_id,
      artifact_id = excluded.artifact_id, updated_by = excluded.updated_by, updated_at = excluded.updated_at;

    v_config_version_id := public.versioning_register_env_config_version(
      v_attempt.release_id, v_actor, 'app-config.js', 'json', v_config -> 'payload',
      lower(v_config ->> 'config_hash_sha256'), v_attempt.source_commit_sha, v_artifact_id,
      jsonb_build_object('request_id', v_attempt.request_id, 'deploy_execution_id', p_execution_id)
    );
  end if;

  update public.version_deploy_attempts set reconciliation_status = 'complete', reconciliation_reason = null,
    closed_at = now(), observability_status = case when v_published then 'pending' else 'not_required' end,
    next_check_at = now(), retry_count = case when v_published then 0 else retry_count end,
    lease_token = case when v_published then lease_token else null end,
    lease_expires_at = case when v_published then lease_expires_at else null end,
    leased_by = case when v_published then leased_by else null end, updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);

  insert into public.version_audit_log (tenant_id, actor, action, entity_type, entity_id, payload)
  values (v_attempt.tenant_id, v_actor, 'close_durable_deploy_attempt', 'version_deploy_attempts', p_execution_id,
    jsonb_build_object('release_id', v_attempt.release_id, 'request_id', v_attempt.request_id,
      'publication_status', v_attempt.publication_status, 'artifact_id', v_artifact_id,
      'deployment_row_id', v_deployment_row_id, 'config_version_id', v_config_version_id));

  return jsonb_build_object('ok', true, 'duplicate', false, 'attempt', to_jsonb(v_attempt),
    'deployment_row_id', v_deployment_row_id, 'config_version_id', v_config_version_id);
end;
$$;

create function public.versioning_record_deploy_observability(
  p_execution_id text, p_lease_token uuid, p_status text, p_detail text
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare v_attempt public.version_deploy_attempts%rowtype;
begin
  select * into v_attempt from public.version_deploy_attempts where execution_id = p_execution_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'deploy_attempt_not_found'); end if;
  if v_attempt.closed_at is null or v_attempt.publication_status <> 'published'
    or not public.versioning_deploy_lease_active(v_attempt, p_lease_token) then
    return jsonb_build_object('ok', false, 'error', 'deploy_reconciliation_lease_lost');
  end if;
  if not coalesce(p_status in ('synced', 'failed', 'not_required'), false) then
    return jsonb_build_object('ok', false, 'error', 'deploy_observability_status_invalid');
  end if;
  update public.version_deploy_attempts set observability_status = p_status,
    observability_detail = left(nullif(trim(p_detail), ''), 128),
    lease_token = null, lease_expires_at = null, leased_by = null,
    next_check_at = case when p_status = 'failed' then now() + make_interval(secs => 60 * (1 << least(retry_count, 6))) else now() end,
    updated_at = now()
  where execution_id = p_execution_id returning * into v_attempt;
  perform public.versioning_mirror_deploy_attempt(v_attempt);
  return jsonb_build_object('ok', true, 'attempt', to_jsonb(v_attempt));
end;
$$;

create function public.versioning_assert_staging_deploy_closed(p_release_id uuid)
returns jsonb language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_release public.version_releases_labeled%rowtype;
  v_attempt public.version_deploy_attempts%rowtype;
begin
  select * into v_release from public.version_releases_labeled where id = p_release_id;
  if not found or v_release.env_key <> 'staging' or v_release.product_key not in ('referidos_app', 'prelaunch_web') then
    return jsonb_build_object('ok', false, 'error', 'staging_deploy_required');
  end if;
  select a.* into v_attempt from public.version_deploy_attempts a
  join public.version_artifact_env_heads h on h.tenant_id = a.tenant_id and h.product_id = a.product_id and h.env_id = a.env_id
    and h.release_id = a.release_id and h.artifact_id::text = a.callback_binding ->> 'artifact_id'
  where a.release_id = p_release_id and a.publication_status = 'published' and a.reconciliation_status = 'complete'
    and a.tenant_id = v_release.tenant_id and a.product_key = v_release.product_key and a.env_key = 'staging'
    and a.source_commit_sha = lower(v_release.source_commit_sha) and a.version_label = v_release.version_label
  order by a.closed_at desc limit 1;
  if not found then return jsonb_build_object('ok', false, 'error', 'staging_deploy_required'); end if;
  perform pg_advisory_xact_lock(hashtextextended(
    'versioning-deploy-target:' || v_attempt.tenant_id::text || ':' || v_attempt.product_id::text || ':' || v_attempt.env_id::text, 0));
  perform pg_advisory_xact_lock(hashtextextended('versioning-deploy-site:' || v_attempt.netlify_site_id::text, 0));
  if not exists (select 1 from public.version_artifact_env_heads h
      where h.tenant_id = v_attempt.tenant_id and h.product_id = v_attempt.product_id and h.env_id = v_attempt.env_id
        and h.release_id = v_attempt.release_id and h.artifact_id::text = v_attempt.callback_binding ->> 'artifact_id')
    or exists (select 1 from public.version_deploy_attempts a where a.netlify_site_id = v_attempt.netlify_site_id and a.closed_at is null)
    or not public.versioning_deploy_artifact_matches(v_attempt, v_attempt.callback_binding) then
    return jsonb_build_object('ok', false, 'error', 'staging_deploy_required');
  end if;
  return jsonb_build_object('ok', true, 'attempt', to_jsonb(v_attempt));
end;
$$;

revoke all on function public.versioning_mirror_deploy_attempt(public.version_deploy_attempts),
  public.versioning_normalize_deploy_binding(jsonb),
  public.versioning_deploy_artifact_matches(public.version_deploy_attempts, jsonb),
  public.versioning_deploy_lease_active(public.version_deploy_attempts, uuid)
from public, anon, authenticated, service_role;

revoke all on function public.versioning_reserve_deploy_attempt(uuid, text, text, jsonb),
  public.versioning_begin_deploy_dispatch(text), public.versioning_record_deploy_dispatch(text, text, jsonb),
  public.versioning_claim_deploy_attempt(text, jsonb), public.versioning_prepare_deploy_attempt(text, jsonb, jsonb),
  public.versioning_record_unpublished_deploy_attempt(text, uuid, jsonb),
  public.versioning_record_deploy_publication(text, jsonb, jsonb, jsonb, uuid),
  public.versioning_claim_deploy_reconciliation(text, integer, integer, text),
  public.versioning_release_deploy_reconciliation(text, uuid, text, integer),
  public.versioning_finalize_deploy_attempt(text, uuid, text),
  public.versioning_record_deploy_observability(text, uuid, text, text),
  public.versioning_assert_staging_deploy_closed(uuid)
from public, anon, authenticated;

grant execute on function public.versioning_reserve_deploy_attempt(uuid, text, text, jsonb),
  public.versioning_begin_deploy_dispatch(text), public.versioning_record_deploy_dispatch(text, text, jsonb),
  public.versioning_claim_deploy_attempt(text, jsonb), public.versioning_prepare_deploy_attempt(text, jsonb, jsonb),
  public.versioning_record_unpublished_deploy_attempt(text, uuid, jsonb),
  public.versioning_record_deploy_publication(text, jsonb, jsonb, jsonb, uuid),
  public.versioning_claim_deploy_reconciliation(text, integer, integer, text),
  public.versioning_release_deploy_reconciliation(text, uuid, text, integer),
  public.versioning_finalize_deploy_attempt(text, uuid, text),
  public.versioning_record_deploy_observability(text, uuid, text, text),
  public.versioning_assert_staging_deploy_closed(uuid)
to service_role;
