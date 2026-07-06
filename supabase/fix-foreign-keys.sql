-- ============================================================
-- SQL Migration: Fix foreign key constraints on clients & orders
-- Run this in your Supabase SQL Editor to resolve:
-- "violates foreign key constraint clients_user_id_fkey"
-- ============================================================

-- 1. Ensure profiles(user_id) is marked as unique so it can be referenced as a foreign key
-- (Safe to run; if a unique constraint already exists, you can ignore any duplicate warnings,
-- or run the ALTER TABLE statement below.)
ALTER TABLE profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- 2. Drop the incorrect foreign key constraints pointing to profiles(id)
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_user_id_fkey;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- 3. Re-create the foreign key constraints pointing to the correct profiles(user_id) column
ALTER TABLE clients
  ADD CONSTRAINT clients_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES profiles(user_id)
  ON DELETE CASCADE;

ALTER TABLE orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES profiles(user_id)
  ON DELETE CASCADE;
