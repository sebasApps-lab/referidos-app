BEGIN;

CREATE TABLE IF NOT EXISTS public.obs_error_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  error_code text NOT NULL CHECK (length(trim(error_code)) > 0),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'defined', 'ignored')),
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  count_total bigint NOT NULL DEFAULT 1 CHECK (count_total >= 0),
  last_event_id uuid REFERENCES public.obs_events(id) ON DELETE SET NULL,
  source_hint text,
  sample_message text,
  sample_route text,
  sample_context jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, error_code)
);

CREATE INDEX IF NOT EXISTS idx_obs_error_catalog_tenant_status_last_seen
  ON public.obs_error_catalog (tenant_id, status, last_seen_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_error_catalog_tenant_count
  ON public.obs_error_catalog (tenant_id, count_total DESC);

DROP TRIGGER IF EXISTS trg_obs_error_catalog_touch_updated_at ON public.obs_error_catalog;
CREATE TRIGGER trg_obs_error_catalog_touch_updated_at
BEFORE UPDATE ON public.obs_error_catalog
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.obs_upsert_error_catalog(
  p_tenant_id uuid,
  p_error_code text,
  p_event_id uuid,
  p_source_hint text DEFAULT NULL,
  p_sample_message text DEFAULT NULL,
  p_sample_route text DEFAULT NULL,
  p_sample_context jsonb DEFAULT '{}'::jsonb,
  p_seen_at timestamptz DEFAULT now()
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_code text;
BEGIN
  v_code := lower(trim(coalesce(p_error_code, 'unknown_error')));
  IF v_code = '' THEN
    v_code := 'unknown_error';
  END IF;

  INSERT INTO public.obs_error_catalog (
    tenant_id,
    error_code,
    status,
    first_seen_at,
    last_seen_at,
    count_total,
    last_event_id,
    source_hint,
    sample_message,
    sample_route,
    sample_context
  )
  VALUES (
    p_tenant_id,
    v_code,
    'pending',
    p_seen_at,
    p_seen_at,
    1,
    p_event_id,
    p_source_hint,
    p_sample_message,
    p_sample_route,
    coalesce(p_sample_context, '{}'::jsonb)
  )
  ON CONFLICT (tenant_id, error_code)
  DO UPDATE SET
    last_seen_at = GREATEST(obs_error_catalog.last_seen_at, EXCLUDED.last_seen_at),
    count_total = obs_error_catalog.count_total + 1,
    last_event_id = EXCLUDED.last_event_id,
    source_hint = COALESCE(EXCLUDED.source_hint, obs_error_catalog.source_hint),
    sample_message = COALESCE(EXCLUDED.sample_message, obs_error_catalog.sample_message),
    sample_route = COALESCE(EXCLUDED.sample_route, obs_error_catalog.sample_route),
    sample_context = CASE
      WHEN obs_error_catalog.status = 'defined' THEN obs_error_catalog.sample_context
      ELSE COALESCE(EXCLUDED.sample_context, obs_error_catalog.sample_context)
    END,
    updated_at = now()
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.obs_upsert_error_catalog(
  uuid, text, uuid, text, text, text, jsonb, timestamptz
) TO service_role;

ALTER TABLE public.obs_error_catalog ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS obs_error_catalog_select_admin_support ON public.obs_error_catalog;
CREATE POLICY obs_error_catalog_select_admin_support
  ON public.obs_error_catalog
  FOR SELECT TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND (public.obs_is_admin() OR public.obs_is_support())
  );

DROP POLICY IF EXISTS obs_error_catalog_admin_write ON public.obs_error_catalog;
CREATE POLICY obs_error_catalog_admin_write
  ON public.obs_error_catalog
  FOR ALL TO authenticated
  USING (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  )
  WITH CHECK (
    tenant_id = public.current_usuario_tenant_id()
    AND public.obs_is_admin()
  );

COMMIT;

