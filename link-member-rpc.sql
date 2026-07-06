-- Create an RPC function to bypass RLS when linking a newly registered team member
CREATE OR REPLACE FUNCTION link_team_member(invite_token text, new_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  inv_email text;
  inv_user_id uuid;
BEGIN
  -- Get invitation details
  SELECT email, invited_by INTO inv_email, inv_user_id
  FROM invitations
  WHERE token = invite_token;

  IF inv_email IS NULL THEN
    RAISE EXCEPTION 'Invalid or expired invitation token';
  END IF;

  -- Update team member row (bypassing RLS because of SECURITY DEFINER)
  UPDATE team_members
  SET member_id = new_user_id, status = 'Active'
  WHERE LOWER(email) = LOWER(inv_email) AND user_id = inv_user_id;

  -- Delete the invitation so it cannot be used again
  DELETE FROM invitations WHERE token = invite_token;
END;
$$;

-- Enable real-time for team_members table safely so the pending status updates to Active instantly
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'team_members'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE team_members;
  END IF;
END $$;
