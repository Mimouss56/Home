-- Deploy home:sanctionBis to pg

BEGIN;


ALTER TABLE job ADD COLUMN 
 "url_img" TEXT;

ALTER TABLE schooling ADD COLUMN
  "url_img" TEXT;

ALTER TABLE "user" ADD COLUMN
  "child" boolean NOT NULL DEFAULT true;

ALTER TABLE sanction 
ADD COLUMN "id_child" INT REFERENCES "user"(id) ON DELETE CASCADE,
ADD COLUMN "warn" boolean NOT NULL DEFAULT false;

UPDATE sanction 
  SET "id_child" = (SELECT id FROM "user" WHERE "username" ILIKE 'ewen' LIMIT 1);
COMMIT;
