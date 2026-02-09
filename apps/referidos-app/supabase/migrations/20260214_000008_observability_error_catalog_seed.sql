BEGIN;

WITH catalog_seed(error_code, category, source_hint, sample_message) AS (
  VALUES
    -- Runtime / policy canonical codes
    ('auth_unauthorized', 'auth', 'runtime', 'Token ausente o no autorizado.'),
    ('auth_token_invalid', 'auth', 'runtime', 'Token invalido o expirado.'),
    ('session_revoked', 'session', 'runtime', 'Sesion revocada por seguridad.'),
    ('session_unregistered', 'session', 'runtime', 'Sesion no registrada en dispositivos.'),
    ('session_lookup_failed', 'session', 'runtime', 'No fue posible validar la sesion activa.'),
    ('session_register_failed', 'session', 'runtime', 'No fue posible registrar la sesion.'),
    ('policy_unavailable', 'policy', 'runtime', 'No se pudo obtener policy remota.'),
    ('policy_missing', 'policy', 'runtime', 'No existe policy para este codigo.'),
    ('tenant_resolution_failed', 'tenant', 'runtime', 'No se resolvio tenant por origin/hint.'),
    ('rate_limited_user', 'rate_limit', 'ingest', 'Evento omitido por rate limit de usuario.'),
    ('rate_limited_ip', 'rate_limit', 'ingest', 'Evento omitido por rate limit de IP.'),
    ('network_error', 'network', 'runtime', 'Error de red al invocar edge.'),
    ('edge_unavailable', 'network', 'runtime', 'Edge function no disponible.'),
    ('edge_timeout', 'network', 'runtime', 'Tiempo de espera excedido en edge function.'),
    ('unknown_error', 'fallback', 'runtime', 'Error no catalogado (fallback).'),
    -- Edge / ingest / symbolication support codes
    ('method_not_allowed', 'http', 'edge', 'Metodo HTTP no permitido.'),
    ('empty_batch', 'ingest', 'edge', 'Batch de eventos vacio.'),
    ('invalid_message', 'ingest', 'edge', 'Evento sin mensaje valido.'),
    ('invalid_body', 'ingest', 'edge', 'Payload invalido.'),
    ('invalid_action', 'symbolication', 'edge', 'Accion solicitada no valida.'),
    ('profile_not_found', 'auth', 'edge', 'Perfil de usuario no encontrado.'),
    ('tenant_missing', 'tenant', 'edge', 'Perfil sin tenant asociado.'),
    ('issue_upsert_failed', 'ingest', 'edge', 'No se pudo crear/actualizar issue.'),
    ('event_insert_failed', 'ingest', 'edge', 'No se pudo insertar evento.'),
    ('event_not_found', 'symbolication', 'edge', 'Evento no encontrado para symbolication.'),
    ('issue_not_found', 'symbolication', 'edge', 'Issue no encontrado para symbolication.'),
    ('unauthorized', 'auth', 'edge', 'Peticion sin autorizacion valida.')
)
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
SELECT
  t.id AS tenant_id,
  s.error_code,
  'defined' AS status,
  now() AS first_seen_at,
  now() AS last_seen_at,
  0 AS count_total,
  NULL::uuid AS last_event_id,
  s.source_hint,
  s.sample_message,
  NULL::text AS sample_route,
  jsonb_build_object(
    'seed', true,
    'category', s.category,
    'description', s.sample_message
  ) AS sample_context
FROM public.tenants t
CROSS JOIN catalog_seed s
ON CONFLICT (tenant_id, error_code)
DO UPDATE SET
  status = CASE
    WHEN public.obs_error_catalog.status = 'ignored' THEN 'ignored'
    ELSE 'defined'
  END,
  source_hint = COALESCE(public.obs_error_catalog.source_hint, EXCLUDED.source_hint),
  sample_message = COALESCE(public.obs_error_catalog.sample_message, EXCLUDED.sample_message),
  sample_context = CASE
    WHEN public.obs_error_catalog.sample_context = '{}'::jsonb
      THEN EXCLUDED.sample_context
    ELSE public.obs_error_catalog.sample_context
  END,
  updated_at = now();

COMMIT;

