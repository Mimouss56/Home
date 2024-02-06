-- Deploy home:relanceEmploi to pg

BEGIN;

CREATE TABLE propal (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nom     VARCHAR(42),
  adresse VARCHAR(42)
);

CREATE TABLE status (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label VARCHAR(42)
);

CREATE TABLE contact (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nom        VARCHAR(42),
  prenom     VARCHAR(42),
  email valid_email,
  phone_number VARCHAR(15), -- Modifié la longueur de VARCHAR(12) à VARCHAR(15) pour inclure le préfixe international.
  id_ent     INT NOT NULL REFERENCES propal (id)
);

CREATE TABLE echange (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  moyen      text NOT NULL,
  reponse    text NOT NULL,
  id_status  INT NOT NULL REFERENCES status (id),
  id_contact INT NOT NULL REFERENCES contact (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT NOW()
);



-- INSERT INTO status (label) VALUES ("envoyé"), ("attente"), ("refus catégorique");

COMMIT;
