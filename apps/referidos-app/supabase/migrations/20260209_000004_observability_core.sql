-- Multi-tenant observability core (issues/events/policies/releases)
-- plus tenant bootstrap and fail-closed expansion.

BEGIN;

CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.tenants (name, status)
VALUES ('ReferidosAPP', 'active')
ON CONFLICT (name) DO NOTHING;

ALTER TABLE public.usuarios
  ADD COLUMN IF NOT EXISTS tenant_id uuid;

UPDATE public.usuarios u
SET tenant_id = t.id
FROM public.tenants t
WHERE t.name = 'ReferidosAPP'
  AND u.tenant_id IS NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'usuarios'
      AND column_name = 'tenant_id'
      AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE public.usuarios
      ALTER COLUMN tenant_id SET NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'usuarios_tenant_id_fkey'
  ) THEN
    ALTER TABLE public.usuarios
      ADD CONSTRAINT usuarios_tenant_id_fkey
      FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_usuarios_tenant_role_auth
  ON public.usuarios (tenant_id, role, id_auth);

CREATE TABLE IF NOT EXISTS public.tenant_origins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  origin text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT tenant_origins_origin_not_empty CHECK (length(trim(origin)) > 0),
  CONSTRAINT tenant_origins_origin_url_check CHECK (origin ~* '^https?://')
);

CREATE UNIQUE INDEX IF NOT EXISTS tenant_origins_origin_unique_idx
  ON public.tenant_origins (lower(origin));

CREATE UNIQUE INDEX IF NOT EXISTS tenant_origins_tenant_origin_unique_idx
  ON public.tenant_origins (tenant_id, lower(origin));

CREATE TABLE IF NOT EXISTS public.obs_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  fingerprint text NOT NULL CHECK (length(trim(fingerprint)) > 0),
  title text NOT NULL CHECK (length(trim(title)) > 0),
  level text NOT NULL DEFAULT 'error'
    CHECK (level IN ('fatal', 'error', 'warn', 'info', 'debug')),
  status text NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'resolved', 'ignored')),
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  count_total bigint NOT NULL DEFAULT 1 CHECK (count_total >= 0),
  count_24h bigint NOT NULL DEFAULT 1 CHECK (count_24h >= 0),
  last_event_id uuid,
  last_release text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, fingerprint)
);

CREATE TABLE IF NOT EXISTS public.obs_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  issue_id uuid NOT NULL REFERENCES public.obs_issues(id) ON DELETE CASCADE,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  level text NOT NULL
    CHECK (level IN ('fatal', 'error', 'warn', 'info', 'debug')),
  event_type text NOT NULL
    CHECK (event_type IN ('error', 'log', 'performance', 'security', 'audit')),
  source text NOT NULL
    CHECK (source IN ('web', 'edge', 'worker')),
  message text NOT NULL,
  error_code text,
  stack_preview text,
  fingerprint text NOT NULL CHECK (length(trim(fingerprint)) > 0),
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  breadcrumbs jsonb NOT NULL DEFAULT '[]'::jsonb,
  release jsonb NOT NULL DEFAULT '{}'::jsonb,
  device jsonb NOT NULL DEFAULT '{}'::jsonb,
  user_ref jsonb NOT NULL DEFAULT '{}'::jsonb,
  request_id text,
  trace_id text,
  session_id text,
  ip_hash text,
  app_id text,
  user_id uuid,
  auth_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'obs_events_user_id_fkey'
  ) THEN
    ALTER TABLE public.obs_events
      ADD CONSTRAINT obs_events_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES public.usuarios(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'obs_issues_last_event_id_fkey'
  ) THEN
    ALTER TABLE public.obs_issues
      ADD CONSTRAINT obs_issues_last_event_id_fkey
      FOREIGN KEY (last_event_id) REFERENCES public.obs_events(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.obs_event_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES public.obs_events(id) ON DELETE CASCADE,
  type text NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.obs_policy_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  scope text NOT NULL DEFAULT 'global',
  match jsonb NOT NULL DEFAULT '{}'::jsonb,
  action jsonb NOT NULL DEFAULT '{}'::jsonb,
  priority integer NOT NULL DEFAULT 0,
  is_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.obs_releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  app_id text NOT NULL,
  app_version text NOT NULL,
  build_id text NOT NULL DEFAULT '',
  env text NOT NULL DEFAULT '',
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS obs_releases_unique_idx
  ON public.obs_releases (tenant_id, app_id, app_version, build_id, env);

CREATE INDEX IF NOT EXISTS idx_obs_issues_tenant_status_last_seen
  ON public.obs_issues (tenant_id, status, last_seen_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_occurred
  ON public.obs_events (tenant_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_issue_occurred
  ON public.obs_events (tenant_id, issue_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_request
  ON public.obs_events (tenant_id, request_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_trace
  ON public.obs_events (tenant_id, trace_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_session
  ON public.obs_events (tenant_id, session_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_ip
  ON public.obs_events (tenant_id, ip_hash, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_user
  ON public.obs_events (tenant_id, user_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_tenant_fingerprint
  ON public.obs_events (tenant_id, fingerprint, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_policy_rules_lookup
  ON public.obs_policy_rules (tenant_id, is_enabled, priority DESC);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.obs_level_rank(p_level text)
RETURNS integer
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE lower(coalesce(p_level, ''))
    WHEN 'fatal' THEN 50
    WHEN 'error' THEN 40
    WHEN 'warn'  THEN 30
    WHEN 'info'  THEN 20
    WHEN 'debug' THEN 10
    ELSE 0
  END;
$$;

CREATE OR REPLACE FUNCTION public.obs_upsert_issue(
  p_tenant_id uuid,
  p_fingerprint text,
  p_title text,
  p_level text,
  p_occurred_at timestamptz,
  p_last_release text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_issue_id uuid;
BEGIN
  INSERT INTO public.obs_issues (
    tenant_id,
    fingerprint,
    title,
    level,
    status,
    first_seen_at,
    last_seen_at,
    count_total,
    count_24h,
    last_release
  )
  VALUES (
    p_tenant_id,
    p_fingerprint,
    p_title,
    p_level,
    'open',
    p_occurred_at,
    p_occurred_at,
    1,
    1,
    p_last_release
  )
  ON CONFLICT (tenant_id, fingerprint)
  DO UPDATE SET
    title = EXCLUDED.title,
    level = CASE
      WHEN public.obs_level_rank(EXCLUDED.level) > public.obs_level_rank(obs_issues.level)
        THEN EXCLUDED.level
      ELSE obs_issues.level
    END,
    status = CASE
      WHEN obs_issues.status = 'ignored' THEN obs_issues.status
      ELSE 'open'
    END,
    first_seen_at = LEAST(obs_issues.first_seen_at, EXCLUDED.first_seen_at),
    last_seen_at = GREATEST(obs_issues.last_seen_at, EXCLUDED.last_seen_at),
    count_total = obs_issues.count_total + 1,
    count_24h = CASE
      WHEN obs_issues.last_seen_at < now() - interval '24 hours' THEN 1
      ELSE obs_issues.count_24h + 1
    END,
    last_release = COALESCE(EXCLUDED.last_release, obs_issues.last_release),
    updated_at = now()
  RETURNING id INTO v_issue_id;

  RETURN v_issue_id;
END;
$$;

DROP TRIGGER IF EXISTS trg_obs_issues_touch_updated_at ON public.obs_issues;
CREATE TRIGGER trg_obs_issues_touch_updated_at
BEFORE UPDATE ON public.obs_issues
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_obs_policy_rules_touch_updated_at ON public.obs_policy_rules;
CREATE TRIGGER trg_obs_policy_rules_touch_updated_at
BEFORE UPDATE ON public.obs_policy_rules
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.current_usuario_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.tenant_id
  FROM public.usuarios u
  WHERE u.id_auth = auth.uid()
  ORDER BY u.id DESC
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.current_usuario_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.role
  FROM public.usuarios u
  WHERE u.id_auth = auth.uid()
  ORDER BY u.id DESC
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.obs_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(public.current_usuario_role() = 'admin', false);
$$;

CREATE OR REPLACE FUNCTION public.obs_is_support()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(public.current_usuario_role() = 'soporte', false);
$$;

CREATE OR REPLACE FUNCTION public.obs_support_can_access_user(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.support_threads t
    JOIN public.usuarios u ON u.id_auth = auth.uid()
    WHERE t.user_id = p_user_id
      AND u.role = 'soporte'
      AND (
        t.assigned_agent_id = u.id
        OR t.created_by_agent_id = u.id
      )
      AND t.status IN ('assigned', 'in_progress', 'waiting_user')
  );
$$;

GRANT EXECUTE ON FUNCTION public.current_usuario_tenant_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_usuario_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.obs_is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.obs_is_support() TO authenticated;
GRANT EXECUTE ON FUNCTION public.obs_support_can_access_user(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.obs_upsert_issue(uuid, text, text, text, timestamptz, text) TO service_role;

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_origins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obs_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obs_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obs_event_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obs_policy_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obs_releases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenants_select_admin_support ON public.tenants;
CREATE POLICY tenants_select_admin_support
  ON public.tenants
  FOR SELECT TO authenticated
  USING (
    id = public.current_usuario_tenant_id()
    AND (public.obs_is_admin() OR public.obs_is_support())
  );

DROP POLICY IF EXISTS tenant_origins_select_admin_support ON public.tenant_origins;
CREATE POLICY tenant_origins_select_admin_support
  ON public.tenant_origins
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND (public.obs_is_admin() OR public.obs_is_support())
  );

DROP POLICY IF EXISTS tenant_origins_admin_write ON public.tenant_origins;
CREATE POLICY tenant_origins_admin_write
  ON public.tenant_origins
  FOR ALL TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  )
  WITH CHECK (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  );

DROP POLICY IF EXISTS obs_issues_select_admin_support ON public.obs_issues;
CREATE POLICY obs_issues_select_admin_support
  ON public.obs_issues
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND (
      public.obs_is_admin()
      OR (
        public.obs_is_support()
        AND EXISTS (
          SELECT 1
          FROM public.obs_events e
          WHERE e.issue_id = obs_issues.id
            AND e.tenant_id = obs_issues.tenant_id
            AND public.obs_support_can_access_user(e.user_id)
        )
      )
    )
  );

DROP POLICY IF EXISTS obs_events_select_admin_support ON public.obs_events;
CREATE POLICY obs_events_select_admin_support
  ON public.obs_events
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND (
      public.obs_is_admin()
      OR (public.obs_is_support() AND public.obs_support_can_access_user(user_id))
    )
  );

DROP POLICY IF EXISTS obs_event_attachments_select_admin_support ON public.obs_event_attachments;
CREATE POLICY obs_event_attachments_select_admin_support
  ON public.obs_event_attachments
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND (
      public.obs_is_admin()
      OR (
        public.obs_is_support()
        AND EXISTS (
          SELECT 1
          FROM public.obs_events e
          WHERE e.id = obs_event_attachments.event_id
            AND e.tenant_id = obs_event_attachments.tenant_id
            AND public.obs_support_can_access_user(e.user_id)
        )
      )
    )
  );

DROP POLICY IF EXISTS obs_policy_rules_select_admin_support ON public.obs_policy_rules;
CREATE POLICY obs_policy_rules_select_admin_support
  ON public.obs_policy_rules
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND (public.obs_is_admin() OR public.obs_is_support())
  );

DROP POLICY IF EXISTS obs_policy_rules_admin_write ON public.obs_policy_rules;
CREATE POLICY obs_policy_rules_admin_write
  ON public.obs_policy_rules
  FOR ALL TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  )
  WITH CHECK (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  );

DROP POLICY IF EXISTS obs_releases_select_admin_support ON public.obs_releases;
CREATE POLICY obs_releases_select_admin_support
  ON public.obs_releases
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND (public.obs_is_admin() OR public.obs_is_support())
  );

DROP POLICY IF EXISTS obs_releases_admin_write ON public.obs_releases;
CREATE POLICY obs_releases_admin_write
  ON public.obs_releases
  FOR ALL TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  )
  WITH CHECK (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  );

CREATE OR REPLACE FUNCTION public.obs_cleanup(
  p_tenant_id uuid DEFAULT NULL,
  p_events_days integer DEFAULT 30,
  p_resolved_days integer DEFAULT 90
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_attachments bigint := 0;
  deleted_events bigint := 0;
  deleted_issues bigint := 0;
BEGIN
  DELETE FROM public.obs_event_attachments a
  USING public.obs_events e
  WHERE a.event_id = e.id
    AND (p_tenant_id IS NULL OR e.tenant_id = p_tenant_id)
    AND e.occurred_at < now() - make_interval(days => p_events_days);
  GET DIAGNOSTICS deleted_attachments = ROW_COUNT;

  DELETE FROM public.obs_events e
  WHERE (p_tenant_id IS NULL OR e.tenant_id = p_tenant_id)
    AND e.occurred_at < now() - make_interval(days => p_events_days);
  GET DIAGNOSTICS deleted_events = ROW_COUNT;

  DELETE FROM public.obs_issues i
  WHERE (p_tenant_id IS NULL OR i.tenant_id = p_tenant_id)
    AND i.status IN ('resolved', 'ignored')
    AND i.last_seen_at < now() - make_interval(days => p_resolved_days)
    AND NOT EXISTS (
      SELECT 1
      FROM public.obs_events e
      WHERE e.issue_id = i.id
    );
  GET DIAGNOSTICS deleted_issues = ROW_COUNT;

  RETURN jsonb_build_object(
    'deleted_attachments', deleted_attachments,
    'deleted_events', deleted_events,
    'deleted_issues', deleted_issues
  );
END;
$$;

REVOKE ALL ON FUNCTION public.obs_cleanup(uuid, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.obs_cleanup(uuid, integer, integer) TO service_role;

INSERT INTO public.obs_policy_rules (
  tenant_id,
  scope,
  match,
  action,
  priority,
  is_enabled
)
SELECT
  t.id,
  'global',
  jsonb_build_object('error_code', 'session_revoked'),
  jsonb_build_object(
    'ui', jsonb_build_object('type', 'modal', 'message_key', 'session_revoked', 'severity', 'error'),
    'auth', jsonb_build_object('signOut', 'local')
  ),
  100,
  true
FROM public.tenants t
WHERE t.name = 'ReferidosAPP'
  AND NOT EXISTS (
    SELECT 1
    FROM public.obs_policy_rules r
    WHERE r.tenant_id = t.id
      AND r.match = jsonb_build_object('error_code', 'session_revoked')
  );

DO $$
DECLARE
  table_name text;
  critical_tables text[] := ARRAY[
    'promos',
    'promos_sucursales',
    'qr_validos',
    'escaneos',
    'canjes',
    'reportes',
    'comentarios',
    'direcciones',
    'support_threads',
    'support_thread_events',
    'support_thread_notes',
    'support_messages',
    'support_assignments',
    'support_agent_sessions',
    'support_agent_events',
    'support_user_logs',
    'codigosregistro',
    'registration_codes',
    'negocios',
    'sucursales',
    'points_rules',
    'points_ledger',
    'tiers'
  ];
BEGIN
  FOREACH table_name IN ARRAY critical_tables LOOP
    IF to_regclass('public.' || table_name) IS NOT NULL THEN
      EXECUTE format(
        'DROP POLICY IF EXISTS session_guard_authenticated ON public.%I',
        table_name
      );
      EXECUTE format(
        'CREATE POLICY session_guard_authenticated ON public.%I AS RESTRICTIVE FOR ALL TO authenticated USING (public.is_current_session_valid()) WITH CHECK (public.is_current_session_valid())',
        table_name
      );
    END IF;
  END LOOP;
END;
$$;

-- Avoid recursion with is_current_session_valid() on user_session_devices:
DROP POLICY IF EXISTS user_session_devices_session_guard ON public.user_session_devices;
CREATE POLICY user_session_devices_session_guard
  ON public.user_session_devices
  AS RESTRICTIVE
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    AND public.current_jwt_session_id() IS NOT NULL
  );

COMMIT;
