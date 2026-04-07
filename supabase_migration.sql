-- Drop old tables if they exist
drop table if exists user_roles;
drop table if exists user_profiles;

-- Single unified users table
create table if not exists users (
  id uuid references auth.users(id) on delete cascade primary key,
  created_at timestamptz default now(),
  full_name text,
  email text,
  phone text,
  role text not null default 'user',
  user_type text,
  organization text,
  college text,
  year text,
  study text,
  stream text,
  order_count integer not null default 0
);

alter table users disable row level security;

-- contact_requests table with invoice + delivery fields
create table if not exists contact_requests (
  id bigserial primary key,
  created_at timestamptz default now(),
  name text,
  email text,
  phone text,
  service text,
  num_pages text,
  stream text,
  subject_type text,
  project_scope text,
  website_ref text,
  message text,
  -- delivery
  delivery_days integer,
  delivery_method text,   -- 'local_pickup' | 'local_rapido' | 'long_distance'
  delivery_city text,
  -- pricing
  base_price integer,
  urgency_fee integer,
  delivery_fee integer,
  loyalty_discount integer,
  loyalty_percent integer,
  total_price integer,
  -- invoice
  invoice_number text
);

-- Set admin role by email
-- update users set role = 'admin' where email = 'your-email@example.com';

-- order_count is incremented automatically by the contact form
-- when a student user submits a request (user_type = 'Student').
-- Loyalty discounts applied:
--   order_count = 0 (1st order) → 20% off
--   order_count = 1 (2nd order) → 10% off
--   order_count = 2 (3rd order) →  5% off
--   order_count >= 3            →  no discount
