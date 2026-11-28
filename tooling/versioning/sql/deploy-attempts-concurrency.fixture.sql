-- This fixture is loaded only in the database created by run-ops-postgres-tests.mjs.
begin;

insert into public.tenants(id, name) values ('10000000-0000-4000-8000-000000000001', 'Concurrency fixture');
insert into public.version_products(id, tenant_id, product_key, name)
values ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'referidos_app', 'Fixture');
insert into public.version_environments(id, tenant_id, env_key, name)
values ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'staging', 'Staging');
insert into public.version_releases(id, tenant_id, product_id, env_id, semver_major, semver_minor, semver_patch, status, source_commit_sha)
select ('40000000-0000-4000-8000-00000000000' || n)::uuid, '10000000-0000-4000-8000-000000000001',
  '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 0, 0, n, 'approved', repeat('a', 40)
from generate_series(1, 2) n;
insert into public.version_deploy_requests(id, tenant_id, product_id, env_id, release_id, requested_by, approved_by, status)
select ('60000000-0000-4000-8000-00000000000' || n)::uuid, '10000000-0000-4000-8000-000000000001',
  '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001',
  ('40000000-0000-4000-8000-00000000000' || n)::uuid, 'fixture:requester', 'fixture:approver', 'approved'
from generate_series(1, 2) n;

create schema versioning_fixture;
create function versioning_fixture.reserve(p_index integer)
returns text language sql as $$
  select coalesce(result ->> 'error', 'reserved')
  from public.versioning_reserve_deploy_attempt(
    ('60000000-0000-4000-8000-00000000000' || p_index)::uuid,
    'gha-' || (1795661243999 + p_index)::text || '-60000000',
    'fixture:operator',
    jsonb_build_object(
      'netlify_site_id', '50000000-0000-4000-8000-000000000001',
      'netlify_site_name', 'fixture-staging',
      'workflow', jsonb_build_object('id', 'versioning-deploy-artifact.yml', 'ref', 'dev', 'repository', 'fixtures/referidos-app'),
      'dispatch_inputs', jsonb_build_object(
        'request_id', '60000000-0000-4000-8000-00000000000' || p_index,
        'deploy_execution_id', 'gha-' || (1795661243999 + p_index)::text || '-60000000',
        'product_key', 'referidos_app', 'env_key', 'staging', 'semver', '0.0.' || p_index, 'source_commit_sha', repeat('a', 40)
      )
    )
  ) result;
$$;

commit;
