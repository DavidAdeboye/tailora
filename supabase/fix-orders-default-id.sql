-- Ensure that the id column on the orders table has a default value generated automatically.
ALTER TABLE orders ALTER COLUMN id SET DEFAULT gen_random_uuid();
