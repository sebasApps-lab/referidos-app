-- Enforce a single draft sucursal per negocio (and thus per usuario).

BEGIN;

create unique index if not exists sucursales_one_draft_per_negocio
  on public.sucursales(negocioId)
  where status = 'draft' and negocioId is not null;

COMMIT;
