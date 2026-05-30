-- Supabase init SQL: create tables for users, orders, messages

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  full_name text,
  username text not null unique,
  password text not null,
  phone text,
  created_at timestamptz default now()
);

create index if not exists idx_users_username on users (username);

create table if not exists orders (
  id text primary key,
  created_at timestamptz default now(),
  username text,
  customer_name text,
  items jsonb not null,
  total_price numeric(12,2),
  status text default 'Đang xử lí',
  cancel_reason text,
  cancelled_at timestamptz
);

create index if not exists idx_orders_username on orders (username);
create index if not exists idx_orders_created_at on orders (created_at);

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

create index if not exists idx_messages_created_at on messages (created_at);
