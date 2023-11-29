-- Revert oside:user from pg

BEGIN;

ALTER TABLE "projet" DROP COLUMN owner_id;
DROP TABLE "member_techno", "member_projet", "user", "role";

DROP DOMAIN valid_email;

COMMIT;
