BEGIN;
  -- on supprime les colonnes ent, town et postal_code de la table schooling
ALTER TABLE schooling
  ADD COLUMN ent VARCHAR(42),
  ADD COLUMN town VARCHAR(42),
  ADD COLUMN postal_code VARCHAR(5),
  ADD COLUMN url_img VARCHAR(255);

-- on creer une fonction pour mettre a jour les id_ent de la table schooling en fonction des données de la table ent
CREATE OR REPLACE FUNCTION update_schooling_id_ent()
RETURNS void AS $$
BEGIN
  UPDATE schooling
  SET ent = ent.name, town = ent.town, postal_code = ent.postal_code
  FROM ent
  WHERE id_ent = ent.id;
END;
$$ LANGUAGE plpgsql;

-- on execute la fonction
SELECT update_schooling_id_ent();

ALTER TABLE schooling
  DROP COLUMN id_ent;

ALTER TABLE job
  ADD COLUMN ent VARCHAR(42),
  ADD COLUMN town VARCHAR(42),
  ADD COLUMN postal_code VARCHAR(5),
  ADD COLUMN url_img VARCHAR(255);


CREATE OR REPLACE FUNCTION update_job_id_ent()
RETURNS void AS $$
BEGIN
  UPDATE job
  SET ent = ent.name, town = ent.town, postal_code = ent.postal_code
  FROM ent
  WHERE id_ent = ent.id;
END;
$$ LANGUAGE plpgsql;

-- on execute la fonction
SELECT update_job_id_ent();

ALTER TABLE job
  DROP COLUMN id_ent;

DROP TABLE echange CASCADE;
DROP TABLE contact CASCADE;
DROP TABLE status CASCADE;
DROP TABLE ent CASCADE;

COMMIT;
