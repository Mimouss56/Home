-- Revert home:cvDetails from pg

BEGIN;

DROP TABLE IF EXISTS cv_details, user_infos;

COMMIT;
