-- Enable RLS and simple public read policies for demo/testing

-- Orders: allow anonymous select (public read) & authenticated write
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_select_orders" ON orders;
CREATE POLICY "public_select_orders" ON orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders" ON orders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "public_update_orders" ON orders;
CREATE POLICY "public_update_orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "public_delete_orders" ON orders;
CREATE POLICY "public_delete_orders" ON orders FOR DELETE USING (auth.role() = 'authenticated');

-- Clients: allow anonymous select & authenticated write
ALTER TABLE IF EXISTS clients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_select_clients" ON clients;
CREATE POLICY "public_select_clients" ON clients FOR SELECT USING (true);
DROP POLICY IF EXISTS "public_insert_clients" ON clients;
CREATE POLICY "public_insert_clients" ON clients FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "public_update_clients" ON clients;
CREATE POLICY "public_update_clients" ON clients FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "public_delete_clients" ON clients;
CREATE POLICY "public_delete_clients" ON clients FOR DELETE USING (auth.role() = 'authenticated');

-- Profiles: only owner can select/insert/update their profile
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select_owner" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_owner" ON profiles;
DROP POLICY IF EXISTS "profiles_update_owner" ON profiles;
CREATE POLICY "profiles_select_owner" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_insert_owner" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_update_owner" ON profiles FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Note: adjust policies for production security. Using public select is convenient for demos but not recommended for sensitive data.
 
-- NOTE: storage.objects RLS edits removed to avoid "must be owner of table objects" errors.
-- Manage storage policies via the Supabase Console (Storage → Policies) using
-- an INSERT policy with `auth.role() = 'authenticated'` and an optional
-- public SELECT policy (`true`) as needed for your bucket.
 