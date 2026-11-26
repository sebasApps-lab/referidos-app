-- Run on OPS with a read-only role after authorization. Export the single
-- snapshot value as JSON. The cutoff is the hardening commit's timestamp.
BEGIN TRANSACTION READ ONLY;
SET LOCAL statement_timeout = '30s';

WITH RECURSIVE
settings AS (
  SELECT '2026-11-26T00:24:15-05:00'::timestamptz AS cutoff
),
targets AS (
  SELECT r.id
  FROM public.version_releases r
  JOIN public.version_products p ON p.id = r.product_id
  JOIN public.version_environments e ON e.id = r.env_id
  WHERE r.created_at < (SELECT cutoff FROM settings)
    AND p.product_key IN ('referidos_app', 'prelaunch_web')
    AND e.env_key IN ('dev', 'staging', 'prod')
),
release_scope(id) AS (
  SELECT id FROM targets
  UNION
  SELECT p.from_release_id
  FROM public.version_promotions p
  JOIN release_scope child ON child.id = p.to_release_id
),
releases AS (
  SELECT r.id, r.tenant_id, r.product_id, r.env_id, r.source_commit_sha,
         p.product_key, e.env_key, r.created_at,
         v.tenant_id AS labeled_tenant_id,
         v.product_key AS labeled_product_key, v.env_key AS labeled_env_key,
         v.source_commit_sha AS labeled_source_commit_sha, v.version_label,
         v.build_number, v.channel
  FROM release_scope s
  JOIN public.version_releases r ON r.id = s.id
  LEFT JOIN public.version_products p ON p.id = r.product_id
  LEFT JOIN public.version_environments e ON e.id = r.env_id
  LEFT JOIN public.version_releases_labeled v ON v.id = r.id
),
artifacts AS (
  SELECT a.id, a.release_id, a.tenant_id, a.product_id, a.semver, a.commit_sha,
         a.artifact_provider, a.artifact_name, a.artifact_path, a.size_bytes,
         a.checksum_sha256, a.github_repository, a.github_run_id, a.github_artifact_id,
         v.id AS labeled_artifact_id, v.product_key, v.env_key, v.version_label,
         jsonb_build_object(
           'storage_bucket', a.metadata -> 'storage_bucket',
           'storage_deleted_at', a.metadata -> 'storage_deleted_at'
         ) AS metadata
  FROM release_scope s
  JOIN public.version_release_artifacts a ON a.release_id = s.id
  LEFT JOIN public.version_release_artifacts_labeled v ON v.id = a.id
),
promotions AS (
  SELECT p.id, p.tenant_id, p.product_id, p.from_release_id, p.to_release_id, p.created_at
  FROM release_scope s
  JOIN public.version_promotions p ON p.to_release_id = s.id
)
SELECT jsonb_build_object(
  'schema_version', 1,
  'cutoff', (SELECT cutoff FROM settings),
  'captured_at', CURRENT_TIMESTAMP,
  'targets', COALESCE((SELECT jsonb_agg(id ORDER BY id) FROM targets), '[]'::jsonb),
  'releases', COALESCE((SELECT jsonb_agg(x ORDER BY x.created_at, x.id) FROM releases x), '[]'::jsonb),
  'artifacts', COALESCE((SELECT jsonb_agg(x ORDER BY x.release_id, x.id) FROM artifacts x), '[]'::jsonb),
  'promotions', COALESCE((SELECT jsonb_agg(x ORDER BY x.to_release_id, x.created_at, x.id) FROM promotions x), '[]'::jsonb)
) AS snapshot;

ROLLBACK;
