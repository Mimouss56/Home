-- Deploy bbc:initdb to pg

BEGIN;

CREATE TABLE contrib (
  id int PRIMARY KEY,
  username text NOT NULL,
  discord_id bigint NOT NULL,
  email text,
  is_admin boolean NOT NULL DEFAULT false,
  nom text,
  prenom text,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(2) ,
  updated_at timestamptz
);

CREATE TABLE bot (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  discord_id bigint NOT NULL,
  price decimal(10,2) NOT NULL,
  cost decimal(10,2) NOT NULL,
  devise text NOT NULL,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW() ,
  updated_at timestamptz
);


CREATE TABLE don (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id int NOT NULL REFERENCES contrib(id),
  montant decimal(10,2) NOT NULL,
  ref text NOT NULL,
  type text NOT NULL,
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE donateur (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id int NOT NULL REFERENCES contrib(id),
  solde decimal(10,2) NOT NULL,
  wish int NOT NULL DEFAULT 1,
  part int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE sanction (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  discord_id bigint NOT NULL,
  type int NOT NULL,
  reason text NOT NULL,
  author int NOT NULL REFERENCES contrib(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);


COMMIT;
