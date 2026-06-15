-- Enable RLS and simple public read policies for demo/testing

-- Orders: allow anonymous select (public read)
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_select_orders" ON orders;
CREATE POLICY "public_select_orders" ON orders FOR SELECT USING (true);

-- Clients: allow anonymous select
ALTER TABLE IF EXISTS clients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_select_clients" ON clients;
CREATE POLICY "public_select_clients" ON clients FOR SELECT USING (true);

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
 