-- Export the single snapshot value as JSON from the OPS database with read access
-- to these relations across all tenants. Keep this unfiltered export private.
-- Disabling row_security causes a query error if the role could see only a subset.
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY;
SET LOCAL row_security = off;
SET LOCAL statement_timeout = '30s';

WITH
releases AS (
  SELECT r.id, r.tenant_id, r.product_id, r.env_id,
         format('%s.%s.%s', r.semver_major, r.semver_minor, r.semver_patch) AS version_base
  FROM public.version_releases r
),
artifacts AS (
  SELECT a.id, a.tenant_id, a.product_id, a.release_id, a.artifact_provider, a.artifact_path,
         a.size_bytes, a.checksum_sha256, a.created_at, a.updated_at,
         jsonb_build_object(
           'storage_bucket', a.metadata -> 'storage_bucket',
           'storage_path', a.metadata -> 'storage_path',
           'storage_deleted_at', a.metadata -> 'storage_deleted_at'
         ) AS metadata
  FROM public.version_release_artifacts a
),
heads AS (
  SELECT h.id, h.tenant_id, h.product_id, h.env_id, h.release_id, h.artifact_id
  FROM public.version_artifact_env_heads h
),
deploy_requests AS (
  SELECT d.id, d.tenant_id, d.product_id, d.env_id, d.release_id, d.status, d.deployment_status,
         jsonb_build_object('artifact_id', d.metadata -> 'artifact_id') AS metadata
  FROM public.version_deploy_requests d
),
deployments AS (
  SELECT d.id, d.tenant_id, d.env_id, d.release_id, d.status,
         jsonb_build_object('artifact_id', d.metadata -> 'artifact_id') AS metadata
  FROM public.version_deployments d
),
sync_requests AS (
  SELECT s.id, s.tenant_id, s.product_id, s.env_id, s.release_id, s.artifact_id, s.status,
         jsonb_build_object(
           'artifact_provider', s.metadata -> 'artifact_provider',
           'artifact_storage_bucket', s.metadata -> 'artifact_storage_bucket',
           'artifact_storage_path', s.metadata -> 'artifact_storage_path'
         ) AS metadata
  FROM public.version_local_sync_requests s
),
promotions AS (
  SELECT p.id, p.tenant_id, p.product_id, p.from_release_id, p.to_release_id
  FROM public.version_promotions p
),
local_inventory AS (
  SELECT l.id, l.tenant_id, l.release_id, l.artifact_id
  FROM public.version_local_artifact_inventory l
),
runtime_configs AS (
  SELECT c.id, c.tenant_id, c.product_id, c.env_id, c.release_id, c.artifact_id
  FROM public.version_env_config_versions c
)
SELECT jsonb_build_object(
  'schema_version', 1,
  'visibility', 'all_tenants',
  'captured_at', STATEMENT_TIMESTAMP(),
  'complete', jsonb_build_object(
    'releases', true, 'artifacts', true, 'heads', true, 'deploy_requests', true,
    'deployments', true, 'sync_requests', true, 'promotions', true, 'local_inventory', true, 'runtime_configs', true
  ),
  'row_counts', jsonb_build_object(
    'releases', (SELECT count(*) FROM releases),
    'artifacts', (SELECT count(*) FROM artifacts),
    'heads', (SELECT count(*) FROM heads),
    'deploy_requests', (SELECT count(*) FROM deploy_requests),
    'deployments', (SELECT count(*) FROM deployments),
    'sync_requests', (SELECT count(*) FROM sync_requests),
    'promotions', (SELECT count(*) FROM promotions),
    'local_inventory', (SELECT count(*) FROM local_inventory),
    'runtime_configs', (SELECT count(*) FROM runtime_configs)
  ),
  'releases', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM releases r), '[]'::jsonb),
  'artifacts', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM artifacts r), '[]'::jsonb),
  'heads', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM heads r), '[]'::jsonb),
  'deploy_requests', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM deploy_requests r), '[]'::jsonb),
  'deployments', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM deployments r), '[]'::jsonb),
  'sync_requests', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM sync_requests r), '[]'::jsonb),
  'promotions', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM promotions r), '[]'::jsonb),
  'local_inventory', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM local_inventory r), '[]'::jsonb),
  'runtime_configs', COALESCE((SELECT jsonb_agg(r ORDER BY r.id) FROM runtime_configs r), '[]'::jsonb)
) AS snapshot;

ROLLBACK;
