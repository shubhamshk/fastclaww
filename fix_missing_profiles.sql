-- *** FIX MISSING PROFILES ***
-- Run this script to generate profiles for users who signed up before the tables were created.
-- This fixes the "violates foreign key constraint" error.

insert into public.profiles (id, full_name, avatar_url, created_at, updated_at)
select 
  id, 
  coalesce(raw_user_meta_data->>'full_name', 'User'), 
  coalesce(raw_user_meta_data->>'avatar_url', ''),
  created_at,
  now()
from auth.users
where id not in (select id from public.profiles);

-- Verify the fix
select count(*) as profiles_count from public.profiles;
