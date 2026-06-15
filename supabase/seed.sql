-- Seed clients and orders (returns inserted rows)
WITH c1 AS (
  INSERT INTO clients (name, phone, gender)
  VALUES ('Olamide Akintan', '+234 **** 2039 ****', 'Male')
  RETURNING id, name
), c2 AS (
  INSERT INTO clients (name, phone, gender)
  VALUES ('Olamide Akintan', '+234 **** 2039 ****', 'Female')
  RETURNING id, name
)
INSERT INTO orders (id, client_id, client_name, phone, gender, outfit, status, status_type)
SELECT '#28373', c1.id, c1.name, '+234 **** 2039 ****', 'Male', 'Wedding gown', 'Collected', 'collected' FROM c1
UNION ALL
SELECT '#32876', c2.id, c2.name, '+234 **** 2039 ****', 'Female', 'Suit', 'Collected', 'collected' FROM c2
UNION ALL
SELECT '#11394', c1.id, c1.name, '+234 **** 2039 ****', 'Male', 'Wedding gown', 'Overdue 2 days', 'overdue' FROM c1
UNION ALL
SELECT '#99822', c2.id, c2.name, '+234 **** 2039 ****', 'Female', 'Senator', 'Due in 3 days', 'due' FROM c2
RETURNING *;
