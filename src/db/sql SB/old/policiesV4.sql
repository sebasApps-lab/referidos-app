-- file: policies.sql
-- FINAL — políticas RLS compatibles con Supabase.
-- EJECUTAR: después de schema.sql (y preferiblemente antes o después del seed).
-- NOTA: estas políticas asumen que `usuarios.id_auth` será llenado por el script de migración
--       que crea usuarios en Supabase Auth (service role key) y actualiza usuarios.id_auth.

---

## -- HABILITAR RLS

alter table usuarios enable row level security;
alter table negocios enable row level security;
alter table promos enable row level security;
alter table qr_validos enable row level security;
alter table comentarios enable row level security;
alter table escaneos enable row level security;
alter table reportes enable row level security;
alter table sucursales enable row level security;
alter table promos_sucursales enable row level security;

---

## -- USUARIOS

-- Leer solo tu propia fila
create policy "usuarios_select_self" on usuarios
for select
using ( id_auth = auth.uid() );

-- Insert permitido en general (service role o backend)
create policy "usuarios_insert_any" on usuarios
for insert
with check ( true );

-- Actualizar solo tu propia fila
create policy "usuarios_update_self" on usuarios
for update
using ( id_auth = auth.uid() )
with check ( id_auth = auth.uid() );

---

## -- PROMOS

-- Select público (todos pueden ver promociones)
create policy "promos_public_select" on promos
for select
using ( true );

-- Manejo de promos exclusivamente por service_role (backend/admin) o por lógica RPC.
-- Esto evita que clientes anon o usuarios regulares modifiquen promos directamente.
create policy "promos_manage_service_role" on promos
for all
using ( false )
with check ( false );

---

## -- QR_VALIDOS

-- SELECT: cliente o negocio dueño (permite que cliente o negocio vean sus QR válidos)
create policy "qr_select_by_client_or_business" on qr_validos
for select
using (
(
clienteId is not null and
exists (
select 1 from usuarios u
where u.id = qr_validos.clienteId
and u.id_auth = auth.uid()
)
)
or
(
negocioId is not null and
exists (
select 1
from negocios n
join usuarios u on u.id = n.usuarioId
where n.id = qr_validos.negocioId
and u.id_auth = auth.uid()
)
)
);

-- INSERT: cliente autenticado puede crear su propio QR válido (se comprueba clienteId vinculado a su id_auth)
create policy "qr_insert_by_client" on qr_validos
for insert
with check (
exists (
select 1 from usuarios u
where u.id = clienteId
and u.id_auth = auth.uid()
)
);

-- UPDATE (por ejemplo marcar canjeado): únicamente negocio dueño (comprobación vía join con negocios -> usuarios)
create policy "qr_update_by_business" on qr_validos
for update
using (
exists (
select 1
from negocios n
join usuarios u on u.id = n.usuarioId
where n.id = qr_validos.negocioId
and u.id_auth = auth.uid()
)
)
with check ( true );

---

## -- COMENTARIOS

-- INSERT: solo clientes autenticados pueden crear comentarios (clienteId debe corresponder al auth uid)
create policy "coment_insert_client" on comentarios
for insert
with check (
exists (
select 1 from usuarios u
where u.id = clienteId
and u.id_auth = auth.uid()
)
);

-- SELECT público (reviews visibles a todos)
create policy "coment_select_public" on comentarios
for select
using ( true );

-- Admin podrá borrar/editar comentarios vía service_role (no se abre policy de delete para anon)

---

## -- ESCANEOS

-- INSERT: solo permitir si el clienteId pertenece al usuario autenticado
create policy "escaneos_insert_check" on escaneos
for insert
with check (
exists (
select 1 from usuarios u
where u.id = clienteId
and u.id_auth = auth.uid()
)
);

---

## -- REPORTES

-- INSERT: reporterId debe pertenecer al usuario autenticado
create policy "reportes_insert_auth" on reportes
for insert
with check (
exists (
select 1 from usuarios u
where u.id = reporterId
and u.id_auth = auth.uid()
)
);
