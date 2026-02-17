-- TELEGRAM BOT STORAGE SCHEMA (SAFE RUN)
-- This script ensures the 'instances' table and policies exist.
-- It fixes the "policy already exists" error by dropping old policies first.

-- 1. Create table if missing
create table if not exists public.instances (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    telegram_bot_token text,
    telegram_bot_username text,
    model_provider text default 'gpt-4o',
    status text default 'provisioning',
    config jsonb default '{}'::jsonb,
    last_active_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Ensure Row Level Security is enabled
alter table public.instances enable row level security;

-- 3. Drop existing policies to avoid "already exists" errors
-- We check if they exist first/drop them so we can safely re-create them.
drop policy if exists "Users can view own instances." on public.instances;
drop policy if exists "Users can create own instances." on public.instances;
drop policy if exists "Users can update own instances." on public.instances;
drop policy if exists "Users can delete own instances." on public.instances;

-- 4. Re-create Policies
create policy "Users can view own instances."
  on public.instances for select
  using ( auth.uid() = user_id );

create policy "Users can create own instances."
  on public.instances for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own instances."
  on public.instances for update
  using ( auth.uid() = user_id );

create policy "Users can delete own instances."
  on public.instances for delete
  using ( auth.uid() = user_id );

-- 5. Grant permissions
grant all on table public.instances to anon, authenticated, service_role;
