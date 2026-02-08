-- 20250301_000001_address_search_cache_raw_results.sql
-- Store raw provider results and normalized version for cache upgrades.

BEGIN;

alter table public.address_search_cache
  add column if not exists raw_results jsonb,
  add column if not exists normalized_version int;

COMMIT;
