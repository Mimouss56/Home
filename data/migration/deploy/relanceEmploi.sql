-- Deploy home:relanceEmploi to pg

BEGIN;

-- Créer la table "ent"
CREATE TABLE ent (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(42),
  adress VARCHAR(42),
  town VARCHAR(42),
  postal_code VARCHAR(5),
  url_img VARCHAR(255)
);

-- Créer les tables "status", "contact", et "echange"
CREATE TABLE status (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label VARCHAR(42)
);

CREATE TABLE contact (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nom VARCHAR(42),
  prenom VARCHAR(42),
  email valid_email,
  role VARCHAR(42),
  phone_number VARCHAR(15),
  id_ent INT NOT NULL REFERENCES ent(id)
);

CREATE TABLE echange (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  moyen text NOT NULL,
  reponse text NOT NULL,
  id_status INT NOT NULL REFERENCES status(id),
  id_contact INT NOT NULL REFERENCES contact(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

-- IMPORT DATA FROM job.sql
INSERT INTO ent (name, town, postal_code, url_img)
  SELECT DISTINCT ent, town, postal_code, url_img FROM job;

ALTER TABLE job
  ADD COLUMN id_ent INT;

-- on creer une fonction pour mettre a jour les id_ent de la table job en fonction des données de la table ent
CREATE OR REPLACE FUNCTION update_job_id_ent()
RETURNS void AS $$
BEGIN
  UPDATE job
  SET id_ent = ent.id
  FROM ent
  WHERE job.ent = ent.name;
END;
$$ LANGUAGE plpgsql;

-- on execute la fonction
SELECT update_job_id_ent();

-- on supprime les colonnes ent, town et postal_code de la table job
ALTER TABLE job
  DROP COLUMN ent,
  DROP COLUMN town,
  DROP COLUMN postal_code,
  DROP COLUMN url_img;

-- on modifie la colonne id_ent de la table job pour qu'elle ne puisse pas etre nulle et qu'elle reference la colonne id de la table ent
ALTER TABLE job
  ALTER COLUMN id_ent SET NOT NULL,
  ADD CONSTRAINT fk_id_ent FOREIGN KEY (id_ent) REFERENCES ent(id);

-- IMPORT DATA FROM schooling.sql
INSERT INTO ent (name, town, postal_code, url_img)
  SELECT DISTINCT ent, town, postal_code, url_img FROM schooling;

ALTER TABLE schooling
  ADD COLUMN id_ent INT;

-- on creer une fonction pour mettre a jour les id_ent de la table schooling en fonction des données de la table ent
CREATE OR REPLACE FUNCTION update_schooling_id_ent()
RETURNS void AS $$
BEGIN
  UPDATE schooling
  SET id_ent = ent.id
  FROM ent
  WHERE schooling.ent = ent.name;
END;
$$ LANGUAGE plpgsql;

-- on execute la fonction
SELECT update_schooling_id_ent();

-- on supprime les colonnes ent, town et postal_code de la table schooling
ALTER TABLE schooling
  DROP COLUMN ent,
  DROP COLUMN town,
  DROP COLUMN postal_code,
  DROP COLUMN url_img;

-- on modifie la colonne id_ent de la table schooling pour qu'elle ne puisse pas etre nulle et qu'elle reference la colonne id de la table ent
ALTER TABLE schooling
  ALTER COLUMN id_ent SET NOT NULL,
  ADD CONSTRAINT fk_id_ent FOREIGN KEY (id_ent) REFERENCES ent(id);

COMMIT;
