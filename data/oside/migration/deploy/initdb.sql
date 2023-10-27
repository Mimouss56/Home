-- Deploy oside:initdb to pg

BEGIN;

-- Contrainte pour vérifier le format hexadécimal de la colonne "color"
CREATE DOMAIN hexa_color as VARCHAR(8)
    CHECK (
        VALUE ~'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
        );
        

CREATE TABLE "techno" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL UNIQUE,
  color hexa_color DEFAULT '#808080',
  created_at timestamptz NOT NULL DEFAULT NOW() ,
  updated_at timestamptz,
  delete_at timestamptz

);

CREATE TABLE "projet" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  status text, -- A REVOIR
  created_at timestamptz NOT NULL DEFAULT NOW() ,
  updated_at timestamptz,
  delete_at timestamptz
);

CREATE TABLE "techno_projet" (
  techno_id INT NOT NULL,
  projet_id INT NOT NULL,
  UNIQUE (techno_id, projet_id)
);

ALTER TABLE "techno_projet" 
    ADD CONSTRAINT techno_projet_techno_id_fkey FOREIGN KEY (techno_id)
        REFERENCES techno (id) ON DELETE CASCADE,
    ADD CONSTRAINT techno_projet_projet_id_fkey FOREIGN KEY (projet_id)
        REFERENCES projet (id) ON DELETE CASCADE;
    
COMMIT;
