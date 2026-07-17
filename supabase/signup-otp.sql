-- Create temporary table to store signup OTPs
CREATE TABLE IF NOT EXISTS signup_otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  otp_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '10 minutes')
);

-- Enable Row Level Security (RLS)
ALTER TABLE signup_otps ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist (clean setup)
DROP POLICY IF EXISTS "Deny all public select on signup_otps" ON signup_otps;
DROP POLICY IF EXISTS "Allow anon inserts" ON signup_otps;

-- Do not allow anyone to directly select OTP rows, but allow insertion if needed.
-- However, since we use SECURITY DEFINER RPCs, we don't even need public policies for standard operations.
-- We keep them closed for security.

-- RPC function to create or update an OTP code (SECURITY DEFINER runs as DB owner)
CREATE OR REPLACE FUNCTION create_signup_otp(p_email text, p_otp text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert new OTP or overwrite existing one for the email
  INSERT INTO signup_otps (email, otp_code, created_at, expires_at)
  VALUES (LOWER(TRIM(p_email)), p_otp, NOW(), NOW() + INTERVAL '10 minutes')
  ON CONFLICT (email)
  DO UPDATE SET 
    otp_code = p_otp,
    created_at = NOW(),
    expires_at = NOW() + INTERVAL '10 minutes';
END;
$$;

-- RPC function to verify a signup OTP code (SECURITY DEFINER runs as DB owner)
CREATE OR REPLACE FUNCTION verify_signup_otp(p_email text, p_otp text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_exists boolean;
BEGIN
  -- Check if a valid, unexpired OTP exists
  SELECT EXISTS (
    SELECT 1 
    FROM signup_otps 
    WHERE LOWER(email) = LOWER(TRIM(p_email)) 
      AND otp_code = p_otp 
      AND expires_at > NOW()
  ) INTO v_exists;

  IF v_exists THEN
    -- Delete the OTP so it cannot be used again
    DELETE FROM signup_otps 
    WHERE LOWER(email) = LOWER(TRIM(p_email));
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$;
