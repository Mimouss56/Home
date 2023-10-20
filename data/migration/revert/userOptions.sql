-- Revert home:userOptions from pg

BEGIN;

ALTER TABLE "user" ADD COLUMN child boolean NOT NULL DEFAULT true;
ALTER TABLE "user" ADD COLUMN id_role INT DEFAULT 1 REFERENCES "role"(id);

UPDATE "user"
SET child = uo.child,
    id_role = uo.id_role
FROM user_option uo
WHERE "user".id = uo.id_user;

DROP TABLE user_option;
COMMIT;
