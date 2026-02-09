-- Observability symbolication core:
-- - stack_raw + stack_frames_raw persistence
-- - symbolication cache fields on obs_events
-- - private storage bucket for sourcemaps
-- - cleanup of expired symbolication cache

BEGIN;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS stack_raw text;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS stack_frames_raw jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS symbolicated_stack jsonb;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS symbolicated_at timestamptz;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS symbolicated_by uuid;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'obs_events'
      AND column_name = 'symbolicated_by'
      AND data_type = 'text'
  ) THEN
    ALTER TABLE public.obs_events
      ALTER COLUMN symbolicated_by TYPE uuid
      USING (
        CASE
          WHEN symbolicated_by ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
            THEN symbolicated_by::uuid
          ELSE NULL
        END
      );
  END IF;
END $$;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS symbolication_release text;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS symbolication_status text;

ALTER TABLE public.obs_events
  ADD COLUMN IF NOT EXISTS symbolication_type text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'obs_events_symbolication_type_check'
  ) THEN
    ALTER TABLE public.obs_events
      ADD CONSTRAINT obs_events_symbolication_type_check
      CHECK (
        symbolication_type IS NULL
        OR symbolication_type IN ('short', 'long')
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'obs_events_symbolicated_by_fkey'
  ) THEN
    ALTER TABLE public.obs_events
      ADD CONSTRAINT obs_events_symbolicated_by_fkey
      FOREIGN KEY (symbolicated_by) REFERENCES public.usuarios(id)
      ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_obs_events_symbolication_status
  ON public.obs_events (tenant_id, symbolication_status, symbolicated_at DESC);

CREATE INDEX IF NOT EXISTS idx_obs_events_stack_frames
  ON public.obs_events USING gin (stack_frames_raw);

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'obs-sourcemaps',
  'obs-sourcemaps',
  false,
  104857600,
  ARRAY[
    'application/json',
    'application/octet-stream',
    'text/plain'
  ]::text[]
)
ON CONFLICT (id) DO UPDATE
SET
  public = false,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

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
  cleared_symbolication_cache bigint := 0;
BEGIN
  UPDATE public.obs_events e
  SET
    symbolicated_stack = NULL,
    symbolicated_at = NULL,
    symbolicated_by = NULL,
    symbolication_release = NULL,
    symbolication_status = NULL,
    symbolication_type = NULL
  WHERE (p_tenant_id IS NULL OR e.tenant_id = p_tenant_id)
    AND e.symbolicated_at IS NOT NULL
    AND (
      (coalesce(e.symbolication_type, 'short') = 'short' AND e.symbolicated_at < now() - interval '2 days')
      OR (e.symbolication_type = 'long' AND e.symbolicated_at < now() - interval '30 days')
    );
  GET DIAGNOSTICS cleared_symbolication_cache = ROW_COUNT;

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
    'cleared_symbolication_cache', cleared_symbolication_cache,
    'deleted_attachments', deleted_attachments,
    'deleted_events', deleted_events,
    'deleted_issues', deleted_issues
  );
END;
$$;

REVOKE ALL ON FUNCTION public.obs_cleanup(uuid, integer, integer)
FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.obs_cleanup(uuid, integer, integer)
TO service_role;

COMMIT;
