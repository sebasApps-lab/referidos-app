-- policies.sql
-- Reglas RLS recomendadas (opcional) — aplicar solo si vas a habilitar RLS.
-- Instrucciones: ejecutar después de schema.sql; habilita RLS en tablas y crea políticas básicas.
-- Estas políticas usan auth.uid() y suponen que usuarios.id_auth fue sincronizado.

-- Habilitar RLS en tablas críticas
alter table usuarios enable row level security;
alter table negocios enable row level security;
alter table promos enable row level security;
alter table qr_validos enable row level security;
alter table comentarios enable row level security;
alter table escaneos enable row level security;
alter table reportes enable row level security;
alter table sucursales enable row level security;
alter table promos_sucursales enable row level security;

-- ===== usuarios =====
-- Permitir lectura (select) de la propia fila al usuario autenticado
create policy "usuarios_select_self" on usuarios
  for select
  using ( id_auth = auth.uid() );

-- Permitir insert por parte de servicio (service_role) o por clientes a través de un RPC/app server (si lo deseas)
create policy "usuarios_insert_service_or_owner" on usuarios
  for insert
  with check ( true );

-- Permitir update sólo al propio usuario (auth) para campos no sensibles y al service_role
create policy "usuarios_update_self" on usuarios
  for update
  using ( id_auth = auth.uid() )
  with check ( id_auth = auth.uid() );

-- ===== promos =====
-- Promos son públicas (select)
create policy "promos_public_select" on promos
  for select
  using ( true );

-- Insert/update/delete solo por service role or por usuarios con role = negocio que sean dueños (comprobación vía join)
create policy "promos_manage_by_owner" on promos
  for all
  using ( false )
  with check ( false );

-- Nota: gestión de promos debe realizarse vía funciones/servicio backend (service_role) o ampliar política para negocios:
-- ejemplo (no activado): with check ( exists (select 1 from usuarios u where u.id = auth.uid()::text and u.role = 'negocio') )

-- ===== qr_validos =====
-- Lectura: negocio y cliente pueden leer sus qr
create policy "qr_select_by_client_or_business" on qr_validos
  for select
  using (
    ( clienteId is not null and exists (select 1 from usuarios u where u.id = qr_validos.clienteId and u.id_auth = auth.uid() ))
    OR
    ( negocioId is not null and exists (select 1 from negocios n where n.id = qr_validos.negocioId and n.usuarioId in (select id from usuarios where id_auth = auth.uid())) )
  );

-- Insert: sólo cliente autenticado puede crear su propio QR (comprobando id_auth -> usuarios)
create policy "qr_insert_by_client" on qr_validos
  for insert
  with check (
    exists (select 1 from usuarios u where u.id = new.clienteId and u.id_auth = auth.uid())
  );

-- Update (marcar canjeado): permitir solo a la cuenta del negocio que posee la promo (alternativa segura: via RPC)
create policy "qr_update_by_business" on qr_validos
  for update
  using (
    exists (
      select 1 from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = qr_validos.negocioId and u.id_auth = auth.uid()
    )
  )
  with check ( true );

-- ===== comentarios =====
-- Insert: sólo clientes autenticados pueden crear comentarios con clienteId vinculado a su id_auth
create policy "coment_insert_client" on comentarios
  for insert
  with check (
    exists (select 1 from usuarios u where u.id = new.clienteId and u.id_auth = auth.uid())
  );

-- Select comentarios: público para mostrar reviews
create policy "coment_select_public" on comentarios
  for select
  using ( true );

-- ===== escaneos =====
-- Insert escaneos: servicio o negocio (prefiere service role). Política mínima: disallow direct by anon:
create policy "escaneos_insert_check" on escaneos
  for insert
  with check ( exists (select 1 from usuarios u where u.id = new.clienteId and u.id_auth = auth.uid()) );

-- ===== reportes =====
-- Insert reportes: usuario autenticado puede crear reportes donde reporterId corresponde a su id
create policy "reportes_insert_auth" on reportes
  for insert
  with check ( exists (select 1 from usuarios u where u.id = new.reporterId and u.id_auth = auth.uid()) );

-- ===== notas =====
-- 1) Muchas operaciones sensibles (crear/editar promos, manipular contadores) es mejor exponerlas mediante
--    funciones RPC que se ejecuten con service_role (backend). RLS debe complementarse con esas RPC.
-- 2) Revisa y ajusta las políticas según roles exactos y flujos que quieras permitir desde frontend.
