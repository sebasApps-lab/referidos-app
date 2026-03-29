do $$
begin
  if exists (
    select 1
    from pg_type
    where typname = 'support_category'
  ) and not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'support_category'
      and e.enumlabel = 'indefinida'
  ) then
    alter type public.support_category add value 'indefinida';
  end if;
end;
$$;
