-- 20260304_000027_support_macros_legacy_cleanup.sql
-- Retira el catalogo legacy local de macros en runtime.
-- El catalogo activo ya vive en OPS y se replica a:
--   public.support_macro_categories_cache
--   public.support_macros_cache

drop table if exists public.support_macros cascade;
