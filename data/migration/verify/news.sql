-- Verify home:news on pg

BEGIN;

SELECT EXISTS (
  SELECT 1
  FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename = 'news'
) AS "exists";

ROLLBACK;
