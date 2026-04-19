-- Ejecutar en Supabase > SQL Editor
create table presupuestos (
  id             uuid default gen_random_uuid() primary key,
  created_at     timestamptz default now(),
  tipo           text not null,
  material       text,
  tamano         numeric,
  unidad         text,
  plazo          text,
  nombre         text not null,
  telefono       text,
  email          text not null,
  descripcion    text,
  estimacion_min numeric,
  estimacion_max numeric
);

-- Permitir inserts desde el frontend (anon key)
alter table presupuestos enable row level security;

create policy "Insertar presupuestos"
  on presupuestos for insert
  to anon
  with check (true);

-- Solo el admin puede leer
create policy "Leer presupuestos (admin)"
  on presupuestos for select
  to authenticated
  using (true);
