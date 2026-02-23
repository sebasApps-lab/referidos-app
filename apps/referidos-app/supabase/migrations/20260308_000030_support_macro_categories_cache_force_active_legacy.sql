-- 20260307_000030_support_macro_categories_cache_force_active_legacy.sql
-- Correccion de datos en runtime cache para alinear categorias legacy.

begin;

update public.support_macro_categories_cache
set status = 'active'
where status is distinct from 'active';

commit;