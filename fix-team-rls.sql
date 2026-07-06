-- ============================================================
-- FIX: Allow team members to read their own row via member_id
-- ============================================================

DROP POLICY IF EXISTS "Members can view own record" ON team_members;
CREATE POLICY "Members can view own record" ON team_members
  FOR SELECT USING (auth.uid() = member_id);

DROP POLICY IF EXISTS "Members can update own record" ON team_members;
CREATE POLICY "Members can update own record" ON team_members
  FOR UPDATE USING (auth.uid() = member_id);

-- ============================================================
-- RPC: get_my_team_role
-- Returns the current user's team member role by checking both
-- member_id and email. Uses SECURITY DEFINER to bypass RLS.
-- ============================================================
CREATE OR REPLACE FUNCTION get_my_team_role()
RETURNS TABLE(role text, name text, owner_id uuid, status text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_email text;
BEGIN
  SELECT au.email INTO current_email
  FROM auth.users au
  WHERE au.id = auth.uid();

  RETURN QUERY
  SELECT tm.role, tm.name, tm.user_id AS owner_id, tm.status
  FROM team_members tm
  WHERE tm.member_id = auth.uid()
    AND tm.user_id != auth.uid()
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN QUERY
    SELECT tm.role, tm.name, tm.user_id AS owner_id, tm.status
    FROM team_members tm
    WHERE LOWER(tm.email) = LOWER(current_email)
      AND tm.member_id IS NULL
      AND tm.user_id != auth.uid()
    LIMIT 1;
  END IF;
END;
$$;
