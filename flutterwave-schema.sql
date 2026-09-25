-- ============================================================
-- Flutterwave Payments: Schema additions
-- Run this in your Supabase SQL Editor.
-- ============================================================

-- 1. Extend profiles with subscription / billing columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS flutterwave_customer_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ;

-- 2. Create payment_transactions log
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tx_ref TEXT UNIQUE NOT NULL,
  flw_ref TEXT,
  amount NUMERIC(12, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT NOT NULL,           -- pending | successful | failed
  payment_plan TEXT,              -- starter | professional
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS for payment_transactions
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own transactions" ON payment_transactions;
CREATE POLICY "Users can view their own transactions"
  ON payment_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can insert/update (API routes use service key)
-- No insert/update policy needed because API routes use the service role key.
