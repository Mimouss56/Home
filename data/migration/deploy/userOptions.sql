-- Deploy home:userOptions to pg

BEGIN;

CREATE TABLE user_option (
  id SERIAL PRIMARY KEY,
  "id_user" INT REFERENCES "user"(id) ON DELETE CASCADE,
  "child" boolean NOT NULL DEFAULT false,
  "family" boolean NOT NULL DEFAULT false,
  "id_role" INT default 2 REFERENCES "role"(id)
);

INSERT INTO user_option ("id_user", "child", "id_role")
  SELECT id, child, id_role FROM "user";

ALTER TABLE "user" DROP COLUMN child;
ALTER TABLE "user" DROP COLUMN id_role;

COMMIT;
