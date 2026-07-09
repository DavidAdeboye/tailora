-- Enable RLS and simple public read policies for demo/testing

-- Orders: restrict access to workspace owner and team members
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_select_orders" ON orders;
DROP POLICY IF EXISTS "public_insert_orders" ON orders;
DROP POLICY IF EXISTS "public_update_orders" ON orders;
DROP POLICY IF EXISTS "public_delete_orders" ON orders;
DROP POLICY IF EXISTS "orders_select" ON orders;
DROP POLICY IF EXISTS "orders_insert" ON orders;
DROP POLICY IF EXISTS "orders_update" ON orders;
DROP POLICY IF EXISTS "orders_delete" ON orders;

CREATE POLICY "orders_select" ON orders FOR SELECT 
  USING (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

CREATE POLICY "orders_insert" ON orders FOR INSERT 
  WITH CHECK (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

CREATE POLICY "orders_update" ON orders FOR UPDATE 
  USING (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

CREATE POLICY "orders_delete" ON orders FOR DELETE 
  USING (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

-- Clients: restrict access to workspace owner and team members
ALTER TABLE IF EXISTS clients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_select_clients" ON clients;
DROP POLICY IF EXISTS "public_insert_clients" ON clients;
DROP POLICY IF EXISTS "public_update_clients" ON clients;
DROP POLICY IF EXISTS "public_delete_clients" ON clients;
DROP POLICY IF EXISTS "clients_select" ON clients;
DROP POLICY IF EXISTS "clients_insert" ON clients;
DROP POLICY IF EXISTS "clients_update" ON clients;
DROP POLICY IF EXISTS "clients_delete" ON clients;

CREATE POLICY "clients_select" ON clients FOR SELECT 
  USING (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

CREATE POLICY "clients_insert" ON clients FOR INSERT 
  WITH CHECK (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

CREATE POLICY "clients_update" ON clients FOR UPDATE 
  USING (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

CREATE POLICY "clients_delete" ON clients FOR DELETE 
  USING (user_id = auth.uid() OR user_id IN (SELECT tm.user_id FROM team_members tm WHERE tm.member_id = auth.uid()));

-- Profiles: allow authenticated SELECT (for team members info) & restrict write to owner only
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select_owner" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_owner" ON profiles;
DROP POLICY IF EXISTS "profiles_update_owner" ON profiles;
DROP POLICY IF EXISTS "profiles_select_auth" ON profiles;

CREATE POLICY "profiles_select_auth" ON profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "profiles_insert_owner" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_owner" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Note: adjust policies for production security. Using public select is convenient for demos but not recommended for sensitive data.
 
-- NOTE: storage.objects RLS edits removed to avoid "must be owner of table objects" errors.
-- Manage storage policies via the Supabase Console (Storage → Policies) using
-- an INSERT policy with `auth.role() = 'authenticated'` and an optional
-- public SELECT policy (`true`) as needed for your bucket.
 