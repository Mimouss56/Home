-- Deploy home:news to pg

BEGIN;

CREATE TABLE NEWS (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text,
  description text NOT NULL,
  id_author int REFERENCES public.user(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz
);

CREATE TABLE TAG (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text,
  color hexa_color DEFAULT '#808080'
);

CREATE TABLE news_has_tag (
  id_news INT NOT NULL REFERENCES NEWS(id) ON DELETE CASCADE,
  id_tag INT NOT NULL REFERENCES TAG(id) ON DELETE CASCADE,
  PRIMARY KEY (id_news, id_tag)
);

COMMIT;
