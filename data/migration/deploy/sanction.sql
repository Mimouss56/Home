-- Deploy home:sanction to pg

BEGIN;

CREATE TABLE "sanction" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL,
  author_id int NOT NULL REFERENCES "user"(id),
  created_at timestamptz NOT NULL DEFAULT NOW()
);

COMMIT;
