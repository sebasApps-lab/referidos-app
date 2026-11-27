\set ON_ERROR_STOP on
begin;

do $$
declare
  v_tenant uuid := gen_random_uuid();
  v_product uuid := gen_random_uuid();
  v_dev uuid := gen_random_uuid();
  v_staging uuid := gen_random_uuid();
  v_prod uuid := gen_random_uuid();
  v_origin uuid := gen_random_uuid();
  v_stage_release uuid := gen_random_uuid();
  v_prod_release uuid := gen_random_uuid();
  v_request uuid := gen_random_uuid();
  v_artifact uuid := gen_random_uuid();
  v_site uuid := gen_random_uuid();
  v_sha text := repeat('c', 40);
  v_hash text := repeat('d', 64);
begin
  insert into public.tenants(id, name) values (v_tenant, 'Promotion guard fixture ' || v_tenant::text);
  insert into public.version_products(id, tenant_id, product_key, name) values (v_product, v_tenant, 'prelaunch_web', 'Fixture');
  insert into public.version_environments(id, tenant_id, env_key, name) values
    (v_dev, v_tenant, 'dev', 'Development'), (v_staging, v_tenant, 'staging', 'Staging'), (v_prod, v_tenant, 'prod', 'Production');
  insert into public.version_releases(id, tenant_id, product_id, env_id, semver_major, semver_minor, semver_patch, status, source_commit_sha)
    values (v_origin, v_tenant, v_product, v_dev, 2, 1, 0, 'released', v_sha),
      (v_stage_release, v_tenant, v_product, v_staging, 2, 1, 0, 'approved', v_sha),
      (v_prod_release, v_tenant, v_product, v_prod, 2, 1, 0, 'approved', v_sha);
  insert into public.version_promotions(tenant_id, product_id, from_release_id, to_release_id, promoted_by)
    values (v_tenant, v_product, v_origin, v_stage_release, 'fixture');
  insert into public.version_deploy_requests(id, tenant_id, product_id, env_id, release_id, requested_by, status, deployment_status)
    values (v_request, v_tenant, v_product, v_staging, v_stage_release, 'fixture', 'executed', 'success');

  begin
    insert into public.version_promotions(tenant_id, product_id, from_release_id, to_release_id, promoted_by)
      values (v_tenant, v_product, v_origin, v_prod_release, 'fixture');
    raise exception 'Direct Dev to Production must be blocked';
  exception when check_violation then
    if sqlerrm <> 'production_promotion_requires_exact_staging_release' then raise; end if;
  end;

  begin
    insert into public.version_promotions(tenant_id, product_id, from_release_id, to_release_id, promoted_by)
      values (v_tenant, v_product, v_stage_release, v_prod_release, 'fixture');
    raise exception 'Historical success alone must not authorize production';
  exception when check_violation then
    if sqlerrm <> 'production_promotion_requires_official_staging_closure' then raise; end if;
  end;

  insert into public.version_release_artifacts(id, tenant_id, product_id, release_id, artifact_key,
    artifact_name, commit_sha, semver, checksum_sha256)
    values (v_artifact, v_tenant, v_product, v_origin, 'fixture/2.1.0/zip', 'fixture.zip', v_sha, '2.1.0', v_hash);
  insert into public.version_artifact_env_heads(tenant_id, product_id, env_id, release_id, artifact_id, updated_by)
    values (v_tenant, v_product, v_staging, v_stage_release, v_artifact, 'fixture');
  -- Seed a closed attempt to exercise this trigger separately from the official-close RPC suite.
  insert into public.version_deploy_attempts(execution_id, request_id, tenant_id, product_id, env_id, release_id,
    product_key, env_key, version_label, source_commit_sha, netlify_site_id, dispatch_spec, callback_binding,
    publication_status, reconciliation_status, closed_at)
    values ('gha-1795661244000-' || left(v_request::text, 8), v_request, v_tenant, v_product, v_staging, v_stage_release,
      'prelaunch_web', 'staging', '2.1.0', v_sha, v_site, '{}'::jsonb,
      jsonb_build_object('artifact_id', v_artifact, 'artifact_checksum_sha256', v_hash), 'published', 'complete', now());
  update public.version_deploy_requests set deployment_id = 'gha-1795661244000-' || left(v_request::text, 8)
    where id = v_request;
  perform public.versioning_mirror_deploy_attempt(a) from public.version_deploy_attempts a where a.request_id = v_request;
  set constraints trg_versioning_guard_durable_request_projection immediate;

  begin
    update public.version_deploy_requests set deployment_status = 'failed' where id = v_request;
    raise exception 'Legacy writes must not corrupt an official closure';
  exception when check_violation then
    if sqlerrm <> 'durable_deploy_request_requires_atomic_closure' then raise; end if;
  end;
  insert into public.version_promotions(tenant_id, product_id, from_release_id, to_release_id, promoted_by)
    values (v_tenant, v_product, v_stage_release, v_prod_release, 'fixture');

  if not exists (select 1 from public.version_promotions where from_release_id = v_stage_release and to_release_id = v_prod_release) then
    raise exception 'Verified official Staging closure must authorize the exact promotion';
  end if;
end;
$$;

rollback;
