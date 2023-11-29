-- Revert home:sanction from pg

BEGIN;

DROP TABLE IF EXISTS "sanction" CASCADE;

COMMIT;
