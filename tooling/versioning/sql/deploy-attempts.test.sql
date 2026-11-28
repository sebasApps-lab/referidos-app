-- Run only against the disposable PostgreSQL test database after the OPS versioning chain.
\set ON_ERROR_STOP on
begin;

create function pg_temp.assert_true(value boolean, label text) returns void language plpgsql as $$
begin
  if value is distinct from true then raise exception 'Assertion failed: %', label; end if;
end;
$$;

create function pg_temp.reject_config() returns trigger language plpgsql as $$
begin
  if current_setting('fixture.reject_config', true) = 'on' then
    raise exception 'fixture_config_write_failed';
  end if;
  return new;
end;
$$;

create trigger fixture_reject_config before insert on public.version_env_config_versions
for each row execute function pg_temp.reject_config();

do $$
declare
  v_tenant uuid := gen_random_uuid();
  v_product uuid := gen_random_uuid();
  v_dev uuid := gen_random_uuid();
  v_env uuid := gen_random_uuid();
  v_origin uuid := gen_random_uuid();
  v_release uuid := gen_random_uuid();
  v_other_release uuid := gen_random_uuid();
  v_request uuid := gen_random_uuid();
  v_other_request uuid := gen_random_uuid();
  v_override_request uuid := gen_random_uuid();
  v_artifact uuid := gen_random_uuid();
  v_site uuid := gen_random_uuid();
  v_sha text := repeat('a', 40);
  v_checksum text := repeat('b', 64);
  v_execution text := 'gha-1795661244000-' || left(v_request::text, 8);
  v_other_execution text := 'gha-1795661244001-' || left(v_other_request::text, 8);
  v_override_execution text := 'gha-1795661244002-' || left(v_override_request::text, 8);
  v_actor text := 'fixture:operator';
  v_repository text := 'fixtures/referidos-app';
  v_github_run text := '123456';
  v_deploy_id text := '66bde0d9de1c100000000001';
  v_spec jsonb;
  v_other_spec jsonb;
  v_binding jsonb;
  v_payload jsonb;
  v_config jsonb;
  v_prepare jsonb;
  v_proof jsonb;
  v_marker text;
  v_terminal_run jsonb;
  v_response jsonb;
  v_lease uuid;
  v_stale_lease uuid;
  v_deployment uuid;
begin
  perform pg_temp.assert_true(not has_function_privilege('anon',
    'public.versioning_reserve_deploy_attempt(uuid,text,text,jsonb)', 'EXECUTE'), 'anon cannot reserve');
  perform pg_temp.assert_true(not has_function_privilege('authenticated',
    'public.versioning_finalize_deploy_attempt(text,uuid,text)', 'EXECUTE'), 'authenticated cannot finalize');
  perform pg_temp.assert_true(not has_table_privilege('authenticated', 'public.version_deploy_attempts', 'SELECT'),
    'authenticated cannot read attempt internals');
  perform pg_temp.assert_true(has_function_privilege('service_role',
    'public.versioning_finalize_deploy_attempt(text,uuid,text)', 'EXECUTE'), 'service_role may finalize');
  perform pg_temp.assert_true(not has_table_privilege('service_role', 'public.version_deploy_attempts', 'UPDATE'),
    'service_role mutations use RPC only');

  insert into public.tenants(id, name) values (v_tenant, 'Durable deploy fixture ' || v_tenant::text);
  insert into public.version_products(id, tenant_id, product_key, name)
    values (v_product, v_tenant, 'referidos_app', 'Fixture');
  insert into public.version_environments(id, tenant_id, env_key, name)
    values (v_dev, v_tenant, 'dev', 'Dev'), (v_env, v_tenant, 'staging', 'Staging');
  insert into public.version_releases(id, tenant_id, product_id, env_id, semver_major, semver_minor, semver_patch, status, source_commit_sha)
    values (v_origin, v_tenant, v_product, v_dev, 1, 2, 3, 'released', v_sha),
      (v_release, v_tenant, v_product, v_env, 1, 2, 3, 'approved', v_sha),
      (v_other_release, v_tenant, v_product, v_env, 1, 2, 4, 'approved', v_sha);
  insert into public.version_promotions(tenant_id, product_id, from_release_id, to_release_id, promoted_by)
    values (v_tenant, v_product, v_origin, v_release, v_actor);
  insert into public.version_release_artifacts(id, tenant_id, product_id, release_id, artifact_key, artifact_name, commit_sha, semver, checksum_sha256)
    values (v_artifact, v_tenant, v_product, v_origin, 'fixture/1.2.3/zip', 'fixture-build', v_sha, '1.2.3', v_checksum);
  insert into public.version_deploy_requests(id, tenant_id, product_id, env_id, release_id, requested_by, approved_by, status)
    values (v_request, v_tenant, v_product, v_env, v_release, 'fixture:requester', 'fixture:approver', 'approved'),
      (v_other_request, v_tenant, v_product, v_env, v_other_release, 'fixture:requester', 'fixture:approver', 'approved');

  v_spec := jsonb_build_object('netlify_site_id', v_site, 'netlify_site_name', 'fixture-staging',
    'workflow', jsonb_build_object('id', 'versioning-deploy-artifact.yml', 'ref', 'dev', 'repository', v_repository),
    'dispatch_inputs', jsonb_build_object('request_id', v_request, 'deploy_execution_id', v_execution,
      'product_key', 'referidos_app', 'env_key', 'staging', 'semver', '1.2.3', 'source_commit_sha', v_sha));
  v_other_spec := jsonb_set(v_spec, '{dispatch_inputs}', (v_spec -> 'dispatch_inputs') || jsonb_build_object(
    'request_id', v_other_request, 'deploy_execution_id', v_other_execution, 'semver', '1.2.4'));

  v_response := public.versioning_reserve_deploy_attempt(v_request, v_execution, v_actor, v_spec);
  perform pg_temp.assert_true((v_response ->> 'ok')::boolean, 'reservation succeeds: ' || v_response::text);
  v_deployment := (v_response ->> 'deployment_row_id')::uuid;
  perform pg_temp.assert_true(v_deployment is not null, 'reservation stores single deployment row');
  perform pg_temp.assert_true((public.versioning_reserve_deploy_attempt(v_request, v_execution, v_actor, v_spec)
    ->> 'duplicate')::boolean, 'duplicate request reserves no new row');
  perform pg_temp.assert_true(public.versioning_reserve_deploy_attempt(v_other_request, v_other_execution, v_actor, v_other_spec)
    ->> 'error' = 'deploy_target_busy', 'second release cannot reserve same target');
  perform pg_temp.assert_true(public.versioning_assert_staging_deploy_closed(v_release)
    ->> 'error' = 'staging_deploy_required', 'reservation is not staging certification');

  v_response := public.versioning_begin_deploy_dispatch(v_execution);
  perform pg_temp.assert_true(v_response -> 'dispatch_spec' = v_spec, 'dispatcher receives persisted exact spec');
  perform pg_temp.assert_true((public.versioning_begin_deploy_dispatch(v_execution) ->> 'duplicate')::boolean,
    'another dispatcher cannot dispatch same execution');
  perform pg_temp.assert_true((public.versioning_record_deploy_dispatch(v_execution, 'unknown', '{}'::jsonb) ->> 'ok')::boolean,
    'uncertain dispatch is recorded without resending');

  v_binding := jsonb_build_object('tenant_id', v_tenant, 'release_id', v_release, 'product_key', 'referidos_app',
    'env_key', 'staging', 'semver', '1.2.3', 'source_commit_sha', v_sha, 'artifact_id', v_artifact,
    'artifact_checksum_sha256', v_checksum, 'github_run_id', v_github_run, 'github_run_attempt', 1,
    'github_repository', v_repository, 'netlify_site_id', v_site);
  perform pg_temp.assert_true(public.versioning_claim_deploy_attempt(v_execution, v_binding || jsonb_build_object('netlify_site_id', gen_random_uuid()))
    ->> 'error' = 'deploy_callback_binding_mismatch', 'other Netlify site cannot bind');
  perform pg_temp.assert_true((public.versioning_claim_deploy_attempt(v_execution, v_binding) ->> 'ok')::boolean,
    'exact callback resolves linked artifact after uncertain dispatch');
  perform pg_temp.assert_true((public.versioning_claim_deploy_attempt(v_execution, v_binding) ->> 'duplicate')::boolean,
    'same proof is idempotent');

  v_marker := format('versioning:referidos_app:staging:1.2.3:%s:%s:%s', v_sha, v_execution, v_github_run);
  v_payload := jsonb_build_object('releaseId', v_release, 'artifactId', v_artifact, 'sourceCommitSha', v_sha,
    'appEnv', 'staging', 'appVersion', '1.2.3', 'buildNumber', null, 'releaseChannel', 'staging');
  v_config := jsonb_build_object('config_key', 'app-config.js', 'config_format', 'json', 'payload', v_payload,
    'payload_json', v_payload::text, 'config_hash_sha256', encode(sha256(convert_to(v_payload::text, 'UTF8')), 'hex'));
  v_prepare := jsonb_build_object('runtime_config', v_config, 'build_number', null, 'channel', 'staging',
    'netlify_deploy_title', v_marker);
  perform pg_temp.assert_true(public.versioning_prepare_deploy_attempt(v_execution, v_binding,
    jsonb_set(v_prepare, '{runtime_config,config_hash_sha256}', to_jsonb(v_checksum))) ->> 'error' = 'runtime_config_unverified',
    'incorrect content hash cannot authorize publication');
  v_response := public.versioning_prepare_deploy_attempt(v_execution, v_binding, v_prepare);
  perform pg_temp.assert_true((v_response ->> 'publish_authorized')::boolean, 'one exact preparation succeeds: ' || v_response::text);
  perform pg_temp.assert_true(not (public.versioning_prepare_deploy_attempt(v_execution, v_binding, v_prepare)
    ->> 'publish_authorized')::boolean, 'preparation acknowledgement is single-use');
  perform pg_temp.assert_true(public.versioning_record_deploy_publication(v_execution, v_binding,
    jsonb_build_object('status', 'not_published', 'netlify_site_id', v_site), '{}'::jsonb) ->> 'error' = 'invalid_publication_evidence',
    'an authorized publish cannot become assumed no-publication');
  perform pg_temp.assert_true((public.versioning_record_deploy_publication(v_execution, v_binding,
    jsonb_build_object('status', 'not_confirmed', 'netlify_site_id', v_site, 'reported_deploy_id', v_deploy_id),
    '{}'::jsonb) ->> 'ok')::boolean, 'callback report remains unconfirmed');

  v_proof := jsonb_build_object('status', 'published', 'netlify_site_id', v_site, 'netlify_deploy_id', v_deploy_id,
    'netlify_current_deploy_id', v_deploy_id, 'published_at', now(), 'netlify_deploy_title', v_marker);
  perform pg_temp.assert_true(public.versioning_record_deploy_publication(v_execution, v_binding, v_proof, '{}')
    ->> 'error' = 'invalid_publication_evidence', 'confirmed evidence requires actual worker lease');
  perform pg_temp.assert_true(jsonb_array_length(public.versioning_claim_deploy_reconciliation('prod-worker', 1, 120, 'prod')
    -> 'attempts') = 0, 'environment-scoped worker cannot claim another environment');
  v_response := public.versioning_claim_deploy_reconciliation('fixture:worker', 1, 120, 'staging');
  v_lease := (v_response #>> '{attempts,0,lease_token}')::uuid;
  perform pg_temp.assert_true(v_lease is not null, 'worker gets a live lease');
  perform pg_temp.assert_true(jsonb_array_length(public.versioning_claim_deploy_reconciliation('other-worker', 1, 120)
    -> 'attempts') = 0, 'second worker cannot share lease');
  v_stale_lease := v_lease;
  update public.version_deploy_attempts set lease_expires_at = now() - interval '1 second'
    where execution_id = v_execution;
  v_response := public.versioning_claim_deploy_reconciliation('replacement-worker', 1, 120, 'staging');
  v_lease := (v_response #>> '{attempts,0,lease_token}')::uuid;
  perform pg_temp.assert_true(v_lease is not null and v_lease <> v_stale_lease, 'replacement worker can recover a stale lease');
  perform pg_temp.assert_true(public.versioning_record_deploy_publication(v_execution, v_binding, v_proof, '{}', v_stale_lease)
    ->> 'error' = 'deploy_reconciliation_lease_lost', 'stale worker can no longer record publication');
  perform pg_temp.assert_true(public.versioning_finalize_deploy_attempt(v_execution, gen_random_uuid(), v_actor)
    ->> 'error' = 'deploy_reconciliation_lease_lost', 'wrong lease cannot finalize');
  v_terminal_run := jsonb_build_object('execution_id', v_execution, 'repository', v_repository,
    'workflow_id', 'versioning-deploy-artifact.yml', 'workflow_ref', 'dev', 'event', 'workflow_dispatch',
    'run_id', v_github_run, 'run_attempt', 1, 'status', 'completed', 'conclusion', 'failure');
  perform pg_temp.assert_true(public.versioning_record_unpublished_deploy_attempt(v_execution, v_lease, v_terminal_run)
    ->> 'error' = 'deploy_terminal_run_unverified', 'terminal GitHub failure cannot disprove an authorized publish');
  perform pg_temp.assert_true((public.versioning_record_deploy_publication(v_execution, v_binding, v_proof, '{}', v_lease)
    ->> 'ok')::boolean, 'the worker records confirmed publication before closing OPS');

  perform set_config('fixture.reject_config', 'on', true);
  begin
    perform public.versioning_finalize_deploy_attempt(v_execution, v_lease, v_actor);
    raise exception 'expected fixture_config_write_failed';
  exception when raise_exception then
    if sqlerrm <> 'fixture_config_write_failed' then raise; end if;
  end;
  perform set_config('fixture.reject_config', 'off', true);
  perform pg_temp.assert_true((select publication_status = 'published' and closed_at is null
    from public.version_deploy_attempts where execution_id = v_execution), 'provider fact survives failed atomic work');
  perform pg_temp.assert_true((select deployment_status = 'started' from public.version_deploy_requests where id = v_request),
    'official request status is rolled back');
  perform pg_temp.assert_true((select status = 'started' from public.version_deployments where id = v_deployment),
    'official deployment row is rolled back');
  perform pg_temp.assert_true(not exists (select 1 from public.version_artifact_env_heads where release_id = v_release),
    'the artifact head is rolled back');
  perform pg_temp.assert_true(public.versioning_assert_staging_deploy_closed(v_release)
    ->> 'error' = 'staging_deploy_required', 'published fact alone cannot certify OPS closure');

  v_response := public.versioning_finalize_deploy_attempt(v_execution, v_lease, v_actor);
  perform pg_temp.assert_true((v_response ->> 'ok')::boolean, 'official retry closes original attempt: ' || v_response::text);
  perform pg_temp.assert_true((v_response ->> 'deployment_row_id')::uuid = v_deployment, 'official closure updates original row');
  perform pg_temp.assert_true((public.versioning_finalize_deploy_attempt(v_execution, v_lease, v_actor)
    ->> 'duplicate')::boolean, 'closed retry performs no official writes');
  perform pg_temp.assert_true(exists (select 1 from public.version_env_config_versions
    where release_id = v_release and artifact_id = v_artifact and config_payload = v_payload), 'exact config written');
  perform pg_temp.assert_true((public.versioning_assert_staging_deploy_closed(v_release) ->> 'ok')::boolean,
    'exact official staging publication certifies even while OBS is pending');
  perform pg_temp.assert_true((public.versioning_record_deploy_observability(v_execution, v_lease, 'failed', 'fixture failure')
    ->> 'ok')::boolean, 'OBS failures remain independently retryable');
  perform pg_temp.assert_true((public.versioning_assert_staging_deploy_closed(v_release) ->> 'ok')::boolean,
    'OBS failure does not reverse official staging closure');

  perform pg_temp.assert_true((public.versioning_reserve_deploy_attempt(v_other_request, v_other_execution, v_actor, v_other_spec)
    ->> 'ok')::boolean, 'only official closure frees the target');
  perform pg_temp.assert_true(public.versioning_assert_staging_deploy_closed(v_release)
    ->> 'error' = 'staging_deploy_required', 'an open deployment on the same site invalidates current staging proof');
  perform pg_temp.assert_true((public.versioning_begin_deploy_dispatch(v_other_execution) ->> 'ok')::boolean, 'second starts dispatch');
  perform pg_temp.assert_true((public.versioning_record_deploy_dispatch(v_other_execution, 'dispatched', '{}'::jsonb)
    ->> 'ok')::boolean, 'second dispatch is acknowledged');
  v_response := public.versioning_claim_deploy_reconciliation('fixture:worker', 1, 120);
  v_lease := (v_response #>> '{attempts,0,lease_token}')::uuid;
  perform pg_temp.assert_true(public.versioning_record_unpublished_deploy_attempt(v_other_execution, v_lease, v_terminal_run)
    ->> 'error' = 'deploy_terminal_run_unverified', 'terminal proof is scoped to its exact execution');
  v_terminal_run := v_terminal_run || jsonb_build_object('execution_id', v_other_execution, 'run_id', '123567');
  perform pg_temp.assert_true((public.versioning_record_unpublished_deploy_attempt(v_other_execution, v_lease, v_terminal_run)
    ->> 'ok')::boolean, 'verified terminal run without a bind or prepare proves no publication');
  perform pg_temp.assert_true((public.versioning_finalize_deploy_attempt(v_other_execution, v_lease, v_actor)
    ->> 'ok')::boolean, 'verified no-publication closes in SQL without OBS');
  perform pg_temp.assert_true((select deployment_status = 'failed' from public.version_deploy_requests where id = v_other_request),
    'closed no-publication is reported as failed');
  perform pg_temp.assert_true((public.versioning_assert_staging_deploy_closed(v_release) ->> 'ok')::boolean,
    'a closed no-publication leaves the prior staging head valid');

  insert into public.version_deploy_requests(id, tenant_id, product_id, env_id, release_id, requested_by, status)
    values (v_override_request, v_tenant, v_product, v_env, v_other_release, 'fixture:requester', 'pending');
  v_other_spec := jsonb_set(v_other_spec, '{dispatch_inputs}', (v_other_spec -> 'dispatch_inputs') || jsonb_build_object(
    'request_id', v_override_request, 'deploy_execution_id', v_override_execution));
  perform pg_temp.assert_true(public.versioning_reserve_deploy_attempt(v_override_request, v_override_execution, v_actor, v_other_spec)
    ->> 'error' = 'deploy_request_requires_approval', 'pending attempts still require approval by default');
  v_other_spec := v_other_spec || jsonb_build_object('force_admin_override', true);
  perform set_config('request.jwt.claim.role', 'authenticated', true);
  perform pg_temp.assert_true(public.versioning_reserve_deploy_attempt(v_override_request, v_override_execution, v_actor, v_other_spec)
    ->> 'error' = 'deploy_request_requires_approval', 'override requires the authorized service route');
  perform set_config('request.jwt.claim.role', 'service_role', true);
  perform pg_temp.assert_true((public.versioning_reserve_deploy_attempt(v_override_request, v_override_execution, v_actor, v_other_spec)
    ->> 'ok')::boolean, 'explicit service override preserves the prior administrative path');
  perform pg_temp.assert_true((select admin_override from public.version_deploy_requests where id = v_override_request),
    'administrative exception remains visible');
  perform public.versioning_begin_deploy_dispatch(v_override_execution);
  perform pg_temp.assert_true((public.versioning_record_deploy_dispatch(v_override_execution, 'rejected', '{}'::jsonb)
    ->> 'ok')::boolean, 'definitive dispatch rejection records no publication');
  v_response := public.versioning_claim_deploy_reconciliation('fixture:worker', 1, 120);
  v_lease := (v_response #>> '{attempts,0,lease_token}')::uuid;
  perform pg_temp.assert_true((public.versioning_finalize_deploy_attempt(v_override_execution, v_lease, v_actor)
    ->> 'ok')::boolean, 'a rejected dispatch closes only after atomic reconciliation');

  update public.version_artifact_env_heads set release_id = v_other_release where release_id = v_release;
  perform pg_temp.assert_true(public.versioning_assert_staging_deploy_closed(v_release)
    ->> 'error' = 'staging_deploy_required', 'past staging publication cannot replace the current head');
end;
$$;

set constraints trg_versioning_guard_durable_request_projection immediate;

rollback;
