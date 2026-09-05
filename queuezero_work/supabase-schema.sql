-- QueueZero college-demo schema for Supabase PostgreSQL.
-- Run this whole file once in Supabase -> SQL Editor.

create table if not exists public.qz_users (
  id text primary key,
  name text not null,
  email text,
  phone text,
  password_hash text not null,
  salt text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists qz_users_email_unique on public.qz_users (email) where email is not null and email <> '';
create unique index if not exists qz_users_phone_unique on public.qz_users (phone) where phone is not null and phone <> '';

create table if not exists public.qz_sessions (
  token text primary key,
  user_id text not null references public.qz_users(id) on delete cascade,
  expires_at timestamptz not null
);
create index if not exists qz_sessions_user_idx on public.qz_sessions(user_id);
create index if not exists qz_sessions_expiry_idx on public.qz_sessions(expires_at);

create table if not exists public.qz_inventory (
  store_id text not null,
  product_id text not null,
  stock integer not null check (stock >= 0),
  base_stock integer not null check (base_stock >= 0),
  restock_at timestamptz,
  primary key (store_id, product_id)
);

create table if not exists public.qz_payments (
  id text primary key,
  user_id text not null references public.qz_users(id) on delete cascade,
  store_id text not null,
  store_name text not null,
  mode text not null check (mode in ('pickup','delivery')),
  items jsonb not null,
  subtotal integer not null,
  gst integer not null,
  delivery integer not null,
  total integer not null,
  status text not null check (status in ('PENDING','PAID')),
  created_at timestamptz not null
);
create index if not exists qz_payments_user_idx on public.qz_payments(user_id);

create table if not exists public.qz_orders (
  id text primary key,
  user_id text not null references public.qz_users(id) on delete cascade,
  store_id text not null,
  store_name text not null,
  mode text not null check (mode in ('pickup','delivery')),
  items jsonb not null,
  subtotal integer not null,
  gst integer not null,
  delivery integer not null,
  total integer not null,
  status text not null check (status = 'PAID'),
  created_at timestamptz not null,
  verification text not null unique
);
create index if not exists qz_orders_user_created_idx on public.qz_orders(user_id, created_at desc);

-- QueueZero initializes missing inventory rows automatically from lib/data.ts
-- the first time a store's catalog is requested. No manual inventory seed is needed.

-- These tables are accessed only by QueueZero's server-side secret key.
-- Keep SUPABASE_SECRET_KEY in Vercel Environment Variables; never use NEXT_PUBLIC_.
