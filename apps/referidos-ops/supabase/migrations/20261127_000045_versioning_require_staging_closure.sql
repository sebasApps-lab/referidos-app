-- Supabase CLI applies the schema changes and records the migration in one transaction.

create function public.versioning_guard_production_promotion()
returns trigger language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_target public.version_releases_labeled%rowtype;
  v_source public.version_releases_labeled%rowtype;
  v_staging_env uuid;
begin
  select * into v_target from public.version_releases_labeled where id = new.to_release_id;
  if v_target.env_key is distinct from 'prod' or v_target.product_key not in ('referidos_app', 'prelaunch_web') then
    return new;
  end if;

  select * into v_source from public.version_releases_labeled where id = new.from_release_id;
  select r.env_id into v_staging_env
  from public.version_releases r where r.id = new.from_release_id and r.product_id = new.product_id;
  if not coalesce(v_source.env_key = 'staging' and v_staging_env is not null
    and v_source.tenant_id = new.tenant_id and v_target.tenant_id = new.tenant_id
    and v_source.product_key = v_target.product_key and v_source.version_label = v_target.version_label
    and lower(v_source.source_commit_sha) = lower(v_target.source_commit_sha)
    and exists (select 1 from public.version_releases r where r.id = new.to_release_id and r.product_id = new.product_id), false) then
    raise exception 'production_promotion_requires_exact_staging_release' using errcode = '23514';
  end if;

  -- Serialize this decision with reservation of another attempt on the staging destination.
  perform pg_advisory_xact_lock(hashtextextended(
    'versioning-deploy-target:' || new.tenant_id::text || ':' || new.product_id::text || ':' || v_staging_env::text, 0));
  if not coalesce((public.versioning_assert_staging_deploy_closed(new.from_release_id) ->> 'ok')::boolean, false) then
    raise exception 'production_promotion_requires_official_staging_closure' using errcode = '23514';
  end if;
  return new;
end;
$$;

revoke all on function public.versioning_guard_production_promotion() from public, anon, authenticated, service_role;

create trigger trg_versioning_guard_production_promotion
before insert or update of tenant_id, product_id, from_release_id, to_release_id on public.version_promotions
for each row execute function public.versioning_guard_production_promotion();

create function public.versioning_guard_durable_request_projection()
returns trigger language plpgsql security definer set search_path = pg_catalog, public, pg_temp as $$
declare
  v_request public.version_deploy_requests%rowtype;
  v_attempt public.version_deploy_attempts%rowtype;
  v_expected text;
begin
  select * into v_request from public.version_deploy_requests where id = new.id;
  if not found then return null; end if;
  select * into v_attempt from public.version_deploy_attempts where request_id = new.id;
  if not found then
    if v_request.metadata ->> 'deploy_attempt_protocol' = 'durable_v1' then
      raise exception 'durable_deploy_attempt_required' using errcode = '23514';
    end if;
    return null;
  end if;

  v_expected := case when v_attempt.closed_at is null then 'started'
    when v_attempt.publication_status = 'published' then 'success' else 'failed' end;
  if v_request.deployment_id is distinct from v_attempt.execution_id or v_request.deployment_status is distinct from v_expected
    or v_request.status is distinct from (case when v_expected = 'failed' then 'failed' else 'executed' end)
    or v_request.tenant_id is distinct from v_attempt.tenant_id or v_request.release_id is distinct from v_attempt.release_id
    or v_request.product_id is distinct from v_attempt.product_id or v_request.env_id is distinct from v_attempt.env_id
    or (v_request.metadata ->> 'deploy_attempt_protocol') is distinct from 'durable_v1'
    or (v_request.metadata ->> 'deploy_execution_id') is distinct from v_attempt.execution_id
    or nullif(v_request.metadata -> 'publication', 'null'::jsonb) is distinct from v_attempt.publication
    or (v_request.metadata #>> '{ops_reconciliation,status}') is distinct from v_attempt.reconciliation_status then
    raise exception 'durable_deploy_request_requires_atomic_closure' using errcode = '23514';
  end if;
  return null;
end;
$$;

revoke all on function public.versioning_guard_durable_request_projection() from public, anon, authenticated, service_role;

-- Verify the final transaction, including calls to the legacy status RPC inside the atomic closer.
create constraint trigger trg_versioning_guard_durable_request_projection
after insert or update on public.version_deploy_requests
deferrable initially deferred
for each row execute function public.versioning_guard_durable_request_projection();
