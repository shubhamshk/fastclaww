-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- *** CRITICAL: GRANT PERMISSIONS TO AUTHENTICATED USERS ***
-- These lines fix the "permission denied for schema public" error
grant usage on schema public to postgres, anon, authenticated, service_role;

-- PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  website text,
  credits decimal(10, 2) default 0.00,
  plan_type text default 'free',
  subscription_status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE RLS on Profiles
alter table public.profiles enable row level security;

-- PROFILES POLICIES
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- TRANSACTIONS TABLE
create table if not exists public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  paypal_transaction_id text unique not null,
  amount decimal(10, 2) not null,
  currency text default 'USD',
  status text not null,
  package_type text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE RLS on Transactions
alter table public.transactions enable row level security;

-- TRANSACTIONS POLICIES
create policy "Users can view own transactions."
  on public.transactions for select
  using ( auth.uid() = user_id );

create policy "Users can insert own transactions."
  on public.transactions for insert
  with check ( auth.uid() = user_id );

-- INSTANCES TABLE
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

-- ENABLE RLS on Instances
alter table public.instances enable row level security;

-- INSTANCES POLICIES
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

-- *** CRITICAL: GRANT TABLE PERMISSIONS ***
-- This ensures the frontend API can actually read/write to these tables
grant all on table public.profiles to anon, authenticated, service_role;
grant all on table public.transactions to anon, authenticated, service_role;
grant all on table public.instances to anon, authenticated, service_role;

-- TRIGGER: Create Profile on Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger to ensure it exists
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
