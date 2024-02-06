-- Revert home:relanceEmploi from pg

BEGIN;

-- Revert home:relanceEmploi

BEGIN;

DROP TABLE IF EXISTS echange CASCADE;
DROP TABLE IF EXISTS contact CASCADE;
DROP TABLE IF EXISTS status CASCADE;
DROP TABLE IF EXISTS propal CASCADE;

COMMIT;

COMMIT;
