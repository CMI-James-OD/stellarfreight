create extension if not exists "pgcrypto";

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_code text not null unique,
  shipment_id text not null unique,
  sender_name text not null,
  sender_phone text not null,
  sender_email text not null,
  receiver_name text not null,
  receiver_phone text not null,
  receiver_email text not null,
  content_name text not null,
  country_from_code text not null,
  country_from_name text not null,
  country_to_code text not null,
  country_to_name text not null,
  country_current_code text,
  country_current_name text,
  custom_clearance_fee text not null,
  weight_kg numeric,
  status text not null check (status in ('processed','shipped','en_route','arrived')),
  shipping_date timestamptz not null,
  arrival_date timestamptz not null,
  current_location_time timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.shipments enable row level security;

create policy "public_tracking_lookup" on public.shipments
for select
using (true);

create policy "admin_crud" on public.shipments
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create or replace function public.handle_shipment_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_shipments_updated_at on public.shipments;
create trigger set_shipments_updated_at
before update on public.shipments
for each row
execute procedure public.handle_shipment_updated_at();