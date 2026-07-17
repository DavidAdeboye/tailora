-- ============================================================
-- SQL Migration: Fix foreign key constraints & profile sync
-- Run this in your Supabase SQL Editor to resolve:
-- "violates foreign key constraint clients_user_id_fkey"
-- ============================================================

-- 1. Drop any incorrect constraints pointing to profiles(user_id) or other incorrect columns
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_user_id_fkey;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_id_unique;

-- Ensure profiles table has the email column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Sync existing users in auth.users to the public.profiles table
-- This directly resolves the error where key (user_id) is not present in table "profiles".
INSERT INTO public.profiles (id, email, full_name, business_name)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', SPLIT_PART(email, '@', 1)),
  COALESCE(raw_user_meta_data->>'business_name', 'My Workspace')
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 3. Re-create the foreign key constraints pointing to the correct profiles(id) column
ALTER TABLE clients
  ADD CONSTRAINT clients_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES profiles(id)
  ON DELETE CASCADE;

ALTER TABLE orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES profiles(id)
  ON DELETE CASCADE;

-- 4. Create trigger to automatically create a profile for new signups in the future
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, business_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', SPLIT_PART(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'business_name', 'My Workspace')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
