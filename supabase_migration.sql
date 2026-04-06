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
  stream text
);

alter table users disable row level security;

-- Set admin role by email
-- update users set role = 'admin' where email = 'your-email@example.com';
