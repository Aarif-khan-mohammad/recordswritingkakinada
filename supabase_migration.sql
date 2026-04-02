-- Run this in your Supabase SQL Editor

create table if not exists contact_requests (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  num_pages text,
  project_scope text,
  message text
);

-- Enable Row Level Security
alter table contact_requests enable row level security;

-- Allow anyone to insert (public form submissions)
create policy "Allow public insert"
  on contact_requests for insert
  with check (true);

-- Only authenticated users (admin) can read
create policy "Allow authenticated read"
  on contact_requests for select
  using (auth.role() = 'authenticated');
