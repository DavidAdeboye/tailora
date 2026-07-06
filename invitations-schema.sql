-- 1. Create Invitations Table
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invited_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('Admin', 'Tailor', 'Assistant')),
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days')
);

-- 2. Alter team_members to link to auth.users once they register
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS member_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Setup RLS Policies on invitations table
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if running multiple times (optional safety)
DROP POLICY IF EXISTS "Users can view own sent invitations" ON invitations;
DROP POLICY IF EXISTS "Users can insert own invitations" ON invitations;
DROP POLICY IF EXISTS "Users can delete own invitations" ON invitations;
DROP POLICY IF EXISTS "Allow public select by token" ON invitations;

CREATE POLICY "Users can view own sent invitations" ON invitations
  FOR SELECT USING (auth.uid() = invited_by);

CREATE POLICY "Users can insert own invitations" ON invitations
  FOR INSERT WITH CHECK (auth.uid() = invited_by);

CREATE POLICY "Users can delete own invitations" ON invitations
  FOR DELETE USING (auth.uid() = invited_by);
  
-- 4. Enable public read on invitations table for the token verification during signup
CREATE POLICY "Allow public select by token" ON invitations
  FOR SELECT USING (true);
