-- Run once in Supabase SQL Editor on an existing QueueZero database.
create table if not exists public.qz_favorites (
  user_id text not null references public.qz_users(id) on delete cascade,
  store_id text not null,
  product_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, store_id, product_id)
);
create index if not exists qz_favorites_user_store_idx on public.qz_favorites(user_id, store_id, created_at desc);
