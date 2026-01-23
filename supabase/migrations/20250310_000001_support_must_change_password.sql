alter table public.usuarios
  add column if not exists must_change_password boolean default false;

do $$
begin
  begin
    alter type public.support_thread_status add value 'cancelled';
  exception
    when duplicate_object then null;
  end;
  begin
    alter type public.support_event_type add value 'cancelled';
  exception
    when duplicate_object then null;
  end;
end $$;

alter table public.support_threads
  add column if not exists cancelled_at timestamptz,
  add column if not exists cancelled_by text references public.usuarios(id) on delete set null;
