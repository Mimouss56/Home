-- Revert home:sanctionBis from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN "child";
ALTER TABLE sanction 
  DROP COLUMN "warn",
  DROP COLUMN "id_child";
ALTER TABLE schooling DROP COLUMN "url_img";
ALTER TABLE job DROP COLUMN "url_img";

COMMIT;
