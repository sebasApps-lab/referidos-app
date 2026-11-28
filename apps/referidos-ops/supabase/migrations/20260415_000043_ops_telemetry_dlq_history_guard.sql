-- The applied version 20260415 is archived verbatim in ../migration-history.
-- Supabase skips this version on verified OPS. A missing version must halt.
do $$
begin
  raise exception 'ops_000043_requires_verified_history' using errcode = '55000';
end;
$$;
