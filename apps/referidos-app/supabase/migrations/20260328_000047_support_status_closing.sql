-- 20260328_000047_support_status_closing.sql
-- Agrega estado intermedio "closing" para cierre asistido de tickets.

begin;

do $$
begin
  begin
    alter type public.support_thread_status add value 'closing';
  exception
    when duplicate_object then null;
  end;
end $$;

commit;

