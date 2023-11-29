CREATE DATABASE OSIDE;

-- Contrainte pour vérifier le format hexadécimal de la colonne "color"
CREATE DOMAIN hexa_color as VARCHAR(8)
  DEFAULT '808080'
  CHECK (regexp_matches(value, '^[0-9a-fA-F]+$')); 

CREATE TABLE role (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL,
  color hexa_color
);

CREATE TABLE user (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  github_login text NOT NULL UNIQUE,
  role_id INT default 1 REFERENCES role(id),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz,
  delete_at timestamptz,
  last_visited timestamptz NOT NULL DEFAULT NOW() -- RGPD
);

CREATE TABLE techno (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL,
  color hexa_color
);

CREATE TABLE project (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  status text, -- A REVOIR
  owner_id INT NOT NULL REFERENCES user(id),
  created_at timestamptz NOT NULL DEFAULT NOW() ,
  updated_at timestamptz,
  delete_at timestamptz
);

CREATE TABLE member_projet (
  user_id INT NOT NULL REFERENCES user(id),
  projet_id INT NOT NULL REFERENCES projet(id),
  UNIQUE (user_id, projet_id)
);


CREATE TABLE member_techno (
  user_id INT NOT NULL REFERENCES user(id),
  techno_id INT NOT NULL REFERENCES techno(id),
  UNIQUE (user_id, techno_id)

);

CREATE TABLE techno_projet (
  techno_id INT NOT NULL REFERENCES techno(id),
  projet_id INT NOT NULL REFERENCES projet(id),
  UNIQUE (techno_id, projet_id)
);


