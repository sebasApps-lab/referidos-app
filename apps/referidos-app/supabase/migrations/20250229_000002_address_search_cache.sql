-- 20250228_000002_address_search_cache.sql
-- Cache for address autocomplete results.

BEGIN;

create extension if not exists pgcrypto;

create table if not exists public.address_search_cache (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  query_key text not null,
  provider text not null,
  results jsonb not null,
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '30 days')
);

create index if not exists address_search_cache_query_key_idx
  on public.address_search_cache (query_key);

create unique index if not exists address_search_cache_query_provider_idx
  on public.address_search_cache (query_key, provider);

alter table public.address_search_cache enable row level security;

revoke all on public.address_search_cache from anon, authenticated;

COMMIT;
