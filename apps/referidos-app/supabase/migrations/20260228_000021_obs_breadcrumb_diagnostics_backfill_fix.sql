-- 20260227_000021_obs_breadcrumb_diagnostics_backfill_fix.sql
-- Corrige eventos historicos donde breadcrumbs_count/status/source quedaron
-- con defaults inconsistentes respecto al arreglo breadcrumbs.

begin;

with normalized as (
  select
    id,
    case
      when jsonb_typeof(breadcrumbs) = 'array' then jsonb_array_length(breadcrumbs)
      else 0
    end as calc_count
  from public.obs_events
)
update public.obs_events e
set
  breadcrumbs_count = n.calc_count,
  breadcrumbs_last_at = case
    when n.calc_count > 0 then coalesce(e.breadcrumbs_last_at, e.occurred_at)
    else null
  end,
  breadcrumbs_source = case
    when n.calc_count > 0 then
      case
        when lower(coalesce(e.breadcrumbs_source, '')) in ('memory', 'storage', 'merged', 'provided')
          then lower(e.breadcrumbs_source)
        else 'provided'
      end
    else
      case
        when lower(coalesce(e.breadcrumbs_source, '')) in ('memory', 'storage', 'merged', 'provided', 'none')
          then lower(e.breadcrumbs_source)
        else 'none'
      end
  end,
  breadcrumbs_status = case
    when n.calc_count > 0 then 'present'
    else
      case
        when lower(coalesce(e.breadcrumbs_status, '')) in (
          'missing_early_boot',
          'missing_runtime_failure',
          'missing_source_uninstrumented',
          'missing_payload_empty',
          'missing_storage_unavailable',
          'missing_unknown'
        ) then lower(e.breadcrumbs_status)
        else 'missing_unknown'
      end
  end,
  breadcrumbs_reason = case
    when n.calc_count > 0 then null
    else e.breadcrumbs_reason
  end
from normalized n
where e.id = n.id;

commit;

