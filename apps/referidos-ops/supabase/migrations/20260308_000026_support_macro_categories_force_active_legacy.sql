-- 20260307_000026_support_macro_categories_force_active_legacy.sql
-- Correccion de datos: todas las categorias legacy estaban published,
-- por lo que todas deben quedar active tras la migracion de estados.

begin;

update public.support_macro_categories
set status = 'active'
where status is distinct from 'active';

commit;