-- ============================================================
-- SQL Schema Migration: Add missing columns to clients & orders
-- Run this in your Supabase SQL Editor.
-- ============================================================

-- 0. Update profiles table with missing address column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;

-- 1. Update clients table with missing columns
ALTER TABLE clients ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS outfit_type TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS due_date DATE;

-- 2. Update orders table with missing columns
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS measurements JSONB;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS assigned_team JSONB;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS reference_images JSONB;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. Create workspace_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS workspace_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  standard_deadline_days INTEGER DEFAULT 14,
  express_deadline_days INTEGER DEFAULT 5,
  notification_preferences JSONB DEFAULT '{"deliveryReminders": true, "deadlineAlerts": false, "teamActivity": false}'::jsonb,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable RLS and add policies for workspace_settings
ALTER TABLE workspace_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_select_owner" ON workspace_settings;
DROP POLICY IF EXISTS "settings_insert_owner" ON workspace_settings;
DROP POLICY IF EXISTS "settings_update_owner" ON workspace_settings;

CREATE POLICY "settings_select_owner" ON workspace_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "settings_insert_owner" ON workspace_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "settings_update_owner" ON workspace_settings FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
