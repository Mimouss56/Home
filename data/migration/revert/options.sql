-- Revert home:options from pg

BEGIN;

DROP TABLE IF EXISTS options ;
COMMIT;
