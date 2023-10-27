-- Deploy oside:comment to pg

BEGIN;
CREATE DOMAIN posint AS integer
  CHECK(value > 0);

CREATE TABLE comment (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES public.user(id),
  projet_id INT NOT NULL REFERENCES projet(id),
  content text,
  flag BOOLEAN NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT NOW() ,
  updated_at timestamptz,
  delete_at timestamptz
);

CREATE TABLE avis (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content text,
  flag BOOLEAN DEFAULT false,
  author INT NOT NULL REFERENCES "user"(id),
  user_id INT NOT NULL REFERENCES "user"(id),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz,
  delete_at timestamptz
);

ALTER TABLE public.user 
    ADD COLUMN vote_up posint,
    ADD COLUMN vote_down posint;

ALTER TABLE projet
    ADD COLUMN vote_up posint,
    ADD COLUMN vote_down posint;


COMMIT;
