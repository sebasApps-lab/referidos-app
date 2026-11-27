-- Run on the OPS control plane with an existing authorized read session.
-- The output omits credentials, request metadata, configuration payloads and logs.
-- A permission error or a missing relation is inconclusive. Keep activation suspended.
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY;
SET LOCAL statement_timeout = '15s';
SET LOCAL lock_timeout = '2s';
SET LOCAL row_security = off;
SET LOCAL search_path = pg_catalog, public;

WITH
required_columns (relation, columns) AS (
  VALUES
    ('tenants', ARRAY['id']),
    ('version_deploy_requests', ARRAY['id','tenant_id','product_id','env_id','release_id','status','deployment_status','deployment_id','metadata']),
    ('version_deploy_requests_labeled', ARRAY['id','product_key','env_key','version_label']),
    ('version_deployments', ARRAY['id','tenant_id','release_id','env_id','deployment_id','status','started_at']),
    ('version_products', ARRAY['id','tenant_id','product_key']),
    ('version_environments', ARRAY['id','tenant_id','env_key']),
    ('version_releases', ARRAY['id','tenant_id','product_id','env_id','source_commit_sha','semver_major','semver_minor','semver_patch','prerelease_tag','channel','ci_run_id','tag_name','metadata']),
    ('version_releases_labeled', ARRAY['id','tenant_id','product_key','env_key','version_label','source_commit_sha','source_changeset_id','created_at']),
    ('version_changeset_items', ARRAY['changeset_id','changed_paths']),
    ('version_promotions', ARRAY['id','tenant_id','product_id','from_release_id','to_release_id']),
    ('version_release_artifacts', ARRAY['id','tenant_id','product_id','release_id','semver','commit_sha','checksum_sha256','size_bytes','artifact_provider','artifact_path','metadata']),
    ('version_release_artifacts_labeled', ARRAY['id','release_id','version_label']),
    ('version_artifact_env_heads', ARRAY['tenant_id','product_id','env_id','release_id','artifact_id','updated_by','updated_at']),
    ('version_env_config_versions', ARRAY['id','tenant_id','product_id','env_id','release_id','artifact_id','config_hash_sha256']),
    ('version_audit_log', ARRAY['tenant_id','actor','action','entity_type','entity_id','payload'])
),
missing_columns AS (
  SELECT relation, column_name
  FROM required_columns
  CROSS JOIN LATERAL unnest(columns) AS required(column_name)
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_attribute a
    WHERE a.attrelid = to_regclass('public.' || relation)
      AND a.attname = column_name AND a.attnum > 0 AND NOT a.attisdropped
  )
),
required_rpcs (signature, return_type) AS (
  VALUES
    ('auth.role()', 'text'),
    ('public.versioning_execute_deploy_request(uuid,text,text,text,text,jsonb)', 'uuid'),
    ('public.versioning_finalize_deploy_request(uuid,text,text,text,text,jsonb)', 'uuid'),
    ('public.versioning_allocate_build_number(uuid,text)', 'bigint'),
    ('public.versioning_register_env_config_version(uuid,text,text,text,jsonb,text,text,uuid,jsonb)', 'uuid')
),
rpc_evidence AS (
  SELECT r.signature, f.oid IS NOT NULL AS present,
    COALESCE(f.prorettype = to_regtype(r.return_type), false) AS return_type_matches,
    f.prosecdef AS security_definer,
    CASE WHEN f.oid IS NOT NULL THEN encode(sha256(convert_to(pg_get_functiondef(f.oid), 'UTF8')), 'hex') END AS definition_sha256
  FROM required_rpcs r
  LEFT JOIN pg_proc f ON f.oid = to_regprocedure(r.signature)
),
durable_rpcs (signature) AS (
  VALUES
    ('public.versioning_reserve_deploy_attempt(uuid,text,text,jsonb)'),
    ('public.versioning_begin_deploy_dispatch(text)'),
    ('public.versioning_record_deploy_dispatch(text,text,jsonb)'),
    ('public.versioning_claim_deploy_attempt(text,jsonb)'),
    ('public.versioning_prepare_deploy_attempt(text,jsonb,jsonb)'),
    ('public.versioning_record_unpublished_deploy_attempt(text,uuid,jsonb)'),
    ('public.versioning_record_deploy_publication(text,jsonb,jsonb,jsonb,uuid)'),
    ('public.versioning_claim_deploy_reconciliation(text,integer,integer,text)'),
    ('public.versioning_release_deploy_reconciliation(text,uuid,text,integer)'),
    ('public.versioning_finalize_deploy_attempt(text,uuid,text)'),
    ('public.versioning_record_deploy_observability(text,uuid,text,text)'),
    ('public.versioning_assert_staging_deploy_closed(uuid)')
),
role_ids AS (
  SELECT
    (SELECT oid FROM pg_roles WHERE rolname = 'service_role') AS service_role,
    (SELECT oid FROM pg_roles WHERE rolname = 'authenticated') AS authenticated,
    (SELECT oid FROM pg_roles WHERE rolname = 'anon') AS anon
),
durable_rpc_evidence AS (
  SELECT r.signature, f.oid IS NOT NULL AS present, f.prosecdef AS security_definer,
    has_function_privilege(service_role, f.oid, 'EXECUTE') AS service_role_execute,
    has_function_privilege(authenticated, f.oid, 'EXECUTE') AS authenticated_execute,
    has_function_privilege(anon, f.oid, 'EXECUTE') AS anon_execute
  FROM durable_rpcs r
  CROSS JOIN role_ids
  LEFT JOIN pg_proc f ON f.oid = to_regprocedure(r.signature)
),
state AS (
  SELECT to_regclass('supabase_migrations.schema_migrations') AS ledger,
    to_regclass('public.version_deploy_attempts') AS attempts
)
SELECT jsonb_build_object(
  'observed_at', statement_timestamp(),
  'engine_version', current_setting('server_version'),
  'roles_available', (SELECT service_role IS NOT NULL AND authenticated IS NOT NULL AND anon IS NOT NULL FROM role_ids),
  'missing_columns', COALESCE((SELECT jsonb_agg(m ORDER BY m.relation, m.column_name) FROM missing_columns m), '[]'::jsonb),
  'legacy_rpcs', (SELECT jsonb_agg(r ORDER BY r.signature) FROM rpc_evidence r),
  'durable_rpcs', (SELECT jsonb_agg(r ORDER BY r.signature) FROM durable_rpc_evidence r),
  'artifact_head_conflict_target_present', EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = to_regclass('public.version_artifact_env_heads')
      AND i.indisunique AND i.indisvalid AND i.indpred IS NULL
      AND i.indnkeyatts = 3 AND i.indexprs IS NULL
      AND (
        SELECT array_agg(a.attname::text ORDER BY a.attname)
        FROM unnest(i.indkey) WITH ORDINALITY AS k(attnum, position)
        JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = k.attnum
        WHERE k.position <= i.indnkeyatts
      ) = ARRAY['env_id','product_id','tenant_id']
  ),
  'durable_table_present', attempts IS NOT NULL,
  'durable_table_rls', (SELECT relrowsecurity FROM pg_class WHERE oid = attempts),
  'durable_table_service_read', has_table_privilege(service_role, attempts, 'SELECT'),
  'durable_table_service_mutation', has_table_privilege(service_role, attempts, 'INSERT,UPDATE,DELETE,TRUNCATE'),
  'durable_table_auth_read', has_table_privilege(authenticated, attempts, 'SELECT'),
  'durable_table_anon_read', has_table_privilege(anon, attempts, 'SELECT'),
  'durable_guards', COALESCE((
    SELECT jsonb_agg(jsonb_build_object(
      'name', tgname, 'enabled', tgenabled, 'deferred', tginitdeferred
    ) ORDER BY tgname)
    FROM pg_trigger
    WHERE tgname IN ('trg_versioning_guard_production_promotion','trg_versioning_guard_durable_request_projection')
      AND tgrelid IN (to_regclass('public.version_promotions'),to_regclass('public.version_deploy_requests'))
  ), '[]'::jsonb),
  'ledger_readable', COALESCE(has_table_privilege(ledger, 'SELECT'), false),
  'ledger_versions_since_20260219', CASE WHEN has_table_privilege(ledger, 'SELECT') THEN
    string_to_array((xpath('string(/table/row/versions)', query_to_xml($ledger$
      SELECT COALESCE(string_agg(version, ',' ORDER BY version), '') AS versions
      FROM supabase_migrations.schema_migrations
      WHERE version ~ '^[0-9]+$' AND version >= '20260219'
    $ledger$, false, false, '')))[1]::text, ',') END,
  'extensions', COALESCE((SELECT jsonb_object_agg(extname, extversion)
    FROM pg_extension WHERE extname IN ('pg_cron', 'pg_net', 'supabase_vault')), '{}'::jsonb)
) AS ops_schema_preflight
FROM state CROSS JOIN role_ids;

-- Include legacy blockers, including untracked deployment rows. Zero counts
-- are valid only for this OPS snapshot and do not certify GitHub or Netlify activity.
WITH targets AS (
  SELECT p.id AS product_id, p.tenant_id, p.product_key, e.id AS env_id, e.env_key
  FROM public.version_products p
  JOIN public.version_environments e USING (tenant_id)
  WHERE p.product_key IN ('prelaunch_web', 'referidos_app') AND e.env_key IN ('staging', 'prod')
)
SELECT t.product_key, t.env_key,
  count(*) AS target_count,
  sum((SELECT count(*) FROM public.version_deploy_requests r
       WHERE (r.tenant_id, r.product_id, r.env_id) = (t.tenant_id, t.product_id, t.env_id)
         AND r.status IN ('pending', 'approved'))) AS pending_or_approved_requests,
  sum((SELECT count(*) FROM public.version_deploy_requests r
       WHERE (r.tenant_id, r.product_id, r.env_id) = (t.tenant_id, t.product_id, t.env_id)
         AND (r.deployment_status = 'started'
           OR (r.status IN ('executed', 'failed')
             AND r.metadata #>> '{ops_reconciliation,status}' IN ('pending', 'incomplete'))))) AS blocking_requests,
  sum((SELECT count(*) FROM public.version_deployments d JOIN public.version_releases r ON r.id = d.release_id
       WHERE (d.tenant_id, r.product_id, d.env_id) = (t.tenant_id, t.product_id, t.env_id)
         AND d.status = 'started'
         AND NOT EXISTS (SELECT 1 FROM public.version_deploy_requests q
           WHERE q.tenant_id = d.tenant_id AND q.release_id = d.release_id
             AND q.env_id = d.env_id AND q.deployment_id = d.deployment_id))) AS orphan_started_deployments
FROM targets t
GROUP BY t.product_key, t.env_key
ORDER BY t.product_key, t.env_key;

SELECT CASE WHEN has_table_privilege(to_regclass('public.version_deploy_attempts'), 'SELECT') THEN
  (xpath('string(/table/row/evidence)', query_to_xml($attempts$
    SELECT COALESCE(jsonb_object_agg(env_key, counts), '{}'::jsonb)::text AS evidence
    FROM (
      SELECT env_key, jsonb_build_object(
        'open', count(*) FILTER (WHERE closed_at IS NULL),
        'lease_active', count(*) FILTER (WHERE lease_expires_at > statement_timestamp()),
        'requires_review', count(*) FILTER (WHERE closed_at IS NULL AND
          (retry_count >= 12 OR reconciliation_reason = 'netlify_deploy_superseded'))
      ) AS counts
      FROM public.version_deploy_attempts
      GROUP BY env_key
    ) s
  $attempts$, false, false, '')))[1]::text::jsonb
END AS durable_attempt_counts;

-- Fixed identities from the reviewed historical registry. This checks the OPS
-- rows; the ZIP itself, branch ancestry and the runtime gate require other evidence.
WITH candidate AS (
  SELECT '0783a235-e786-4bb9-8277-ae58801597fc'::uuid AS staging_release,
    '0d1e110c-0241-46f8-bf45-5369dc820f43'::uuid AS owner_release,
    '340e76f4-a244-409d-8d90-1fd4934df751'::uuid AS artifact,
    'e9c64d1e94097fae92c28a89ea72732c970dfcce'::text AS sha
)
SELECT jsonb_build_object(
  'staging_release_matches', COALESCE(s.env_key = 'staging' AND s.product_key = 'prelaunch_web'
    AND s.version_label = '0.3.4' AND lower(s.source_commit_sha) = c.sha, false),
  'dev_release_matches', COALESCE(o.env_key = 'dev' AND o.product_key = 'prelaunch_web'
    AND o.version_label = '0.3.4' AND lower(o.source_commit_sha) = c.sha AND o.tenant_id = s.tenant_id, false),
  'promotion_matches', EXISTS (
    SELECT 1 FROM public.version_promotions pr
    WHERE pr.id = '50761606-162b-4ea0-9f3f-bcc800e4a067'
      AND pr.from_release_id = c.owner_release AND pr.to_release_id = c.staging_release
      AND pr.tenant_id = s.tenant_id AND pr.product_id = sr.product_id
  ) AND NOT EXISTS (
    SELECT 1 FROM public.version_promotions pr
    WHERE pr.to_release_id = c.staging_release AND pr.tenant_id = s.tenant_id AND pr.product_id = sr.product_id
      AND pr.from_release_id <> c.owner_release
  ),
  'artifact_matches', COALESCE(a.release_id = c.owner_release AND a.tenant_id = s.tenant_id AND a.product_id = sr.product_id
    AND a.semver = '0.3.4' AND lower(a.commit_sha) = c.sha AND a.artifact_provider = 'supabase_storage'
    AND a.metadata ->> 'storage_bucket' = 'versioning-artifacts' AND a.metadata ->> 'storage_deleted_at' IS NULL
    AND a.artifact_path = 'prelaunch_web/0.3.4/e9c64d1e9409/release-prelaunch_web-0.3.4-e9c64d1e9409.zip'
    AND a.size_bytes = 7542582
    AND lower(a.checksum_sha256) = 'd629839a29da70f0d411514f0f04bc37285c2975c8d81a57147add1276cd20c8', false)
) AS candidate_registry_preflight
FROM candidate c
LEFT JOIN public.version_releases_labeled s ON s.id = c.staging_release
LEFT JOIN public.version_releases_labeled o ON o.id = c.owner_release
LEFT JOIN public.version_releases sr ON sr.id = c.staging_release
LEFT JOIN public.version_release_artifacts a ON a.id = c.artifact;

-- Mirror only the required-version selection in the gate. The gate endpoint
-- itself appends audit, so it is not called by this diagnostic.
WITH candidate AS (
  SELECT id, source_changeset_id
  FROM public.version_releases_labeled
  WHERE id = '0783a235-e786-4bb9-8277-ae58801597fc'::uuid
    AND product_key = 'prelaunch_web' AND env_key = 'staging' AND version_label = '0.3.4'
    AND lower(source_commit_sha) = 'e9c64d1e94097fae92c28a89ea72732c970dfcce'
),
latest AS (
  SELECT id, count(*) OVER (PARTITION BY created_at) AS equally_recent FROM public.version_releases_labeled
  WHERE product_key = 'prelaunch_web' AND env_key = 'staging' AND version_label = '0.3.4'
  ORDER BY created_at DESC
  LIMIT 1
),
changed_path_items AS (
  SELECT entry.item
  FROM candidate c
  JOIN public.version_changeset_items i ON i.changeset_id = c.source_changeset_id
  CROSS JOIN LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(i.changed_paths) = 'array'
    THEN i.changed_paths ELSE '[]'::jsonb END) AS entry(item)
),
normalized_paths AS (
  SELECT replace(regexp_replace(path, '^[[:space:]]+|[[:space:]]+$', '', 'g'), chr(92), '/') AS normalized
  FROM (
    SELECT CASE jsonb_typeof(item)
      WHEN 'string' THEN item #>> '{}'
      WHEN 'object' THEN (
        -- Match the gate's first truthy value followed by its string check.
        SELECT CASE WHEN jsonb_typeof(item -> field) = 'string' THEN item ->> field END
        FROM unnest(ARRAY['path', 'file', 'changed_path']) WITH ORDINALITY AS fields(field, position)
        WHERE item -> field NOT IN ('null'::jsonb, 'false'::jsonb, '0'::jsonb, '""'::jsonb)
        ORDER BY position LIMIT 1
      )
    END AS path
    FROM changed_path_items
  ) paths
),
required_versions AS (
  SELECT DISTINCT substring(btrim(regexp_replace(normalized, '^.*/', '')) FROM '^([0-9]{8})_[^/]+[.]sql$') AS version
  FROM normalized_paths
  WHERE strpos(normalized, '/supabase/migrations/') > 0 AND lower(normalized) LIKE '%.sql'
)
SELECT jsonb_build_object(
  'status', CASE WHEN NOT EXISTS (SELECT 1 FROM candidate) THEN 'release_missing_or_mismatched'
    WHEN (SELECT source_changeset_id FROM candidate) IS NULL THEN 'no_changeset'
    ELSE 'changeset_checked' END,
  'source_changeset_id', (SELECT source_changeset_id FROM candidate),
  'gate_would_select_candidate', COALESCE(
    (SELECT equally_recent = 1 AND id = (SELECT id FROM candidate) FROM latest), false),
  'required_versions', CASE WHEN EXISTS (SELECT 1 FROM candidate) THEN
    COALESCE((SELECT jsonb_agg(version ORDER BY version) FROM required_versions WHERE version IS NOT NULL), '[]'::jsonb) END
) AS candidate_runtime_gate_preflight;

ROLLBACK;
