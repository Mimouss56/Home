-- Deploy oside:user to pg

BEGIN;

CREATE TABLE "role" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL,
  color hexa_color DEFAULT '#808080',
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz
);


CREATE DOMAIN valid_email AS text
    CHECK (
        VALUE ~ '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
    );


CREATE TABLE "user" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email valid_email NOT NULL UNIQUE,
  first_name text,
  last_name text,
  password text,
  username text UNIQUE,
  github_login text NOT NULL UNIQUE,
  role_id INT default 1 REFERENCES "role"(id),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz,
  delete_at timestamptz,
  last_visited timestamptz NOT NULL DEFAULT NOW() -- RGPD
);


CREATE TABLE "member_projet" (
  user_id INT NOT NULL REFERENCES "user"(id),
  projet_id INT NOT NULL REFERENCES "projet"(id),
  UNIQUE ("user_id", "projet_id")
);
CREATE TABLE "member_techno" (
  user_id INT NOT NULL REFERENCES "user"(id),
  techno_id INT NOT NULL REFERENCES "techno"(id),
  UNIQUE ("user_id", "techno_id")

);

ALTER TABLE "projet" ADD COLUMN owner_id int REFERENCES "user"(id); 

COMMIT;
