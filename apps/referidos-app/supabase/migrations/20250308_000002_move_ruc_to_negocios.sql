alter table public.negocios
  add column if not exists ruc text;

with latest_verif as (
  select distinct on (negocio_id)
    negocio_id,
    ruc
  from public.verificacion_negocio
  where ruc is not null and ruc <> ''
  order by negocio_id, created_at desc
)
update public.negocios n
set ruc = lv.ruc
from latest_verif lv
where lv.negocio_id = n.id
  and (n.ruc is null or n.ruc = '');

alter table public.verificacion_negocio
  drop column if exists ruc;
