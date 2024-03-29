-- Revert home:initdb from pg

BEGIN;

DROP TABLE IF EXISTS "schooling" CASCADE;
DROP TABLE IF EXISTS "skill" CASCADE;
DROP TABLE IF EXISTS "job" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "role" CASCADE;
DROP TABLE IF EXISTS "option";
DROP TABLE IF EXISTS "school_skill" CASCADE;
DROP TABLE IF EXISTS "user_schooling" CASCADE;
DROP TABLE IF EXISTS "job_skill" CASCADE;
DROP TABLE IF EXISTS "user_job" CASCADE;


DROP DOMAIN IF EXISTS valid_email CASCADE;
DROP DOMAIN IF EXISTS hexa_color CASCADE;

COMMIT;
