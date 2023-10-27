BEGIN

-- Contrainte pour vérifier le format hexadécimal de la colonne "color"
DROP TABLE IF EXISTS "techno", "projet", "techno_projet", "role", "user", "comment", "member_projet", "member_techno", "avis" DELETE ON CASCADE;
DROP VIEW IF EXISTS view_techno_projet, show_all_techno_projet;
DROP DOMAIN IF EXISTS hexa_color, posint, valid_email;

CREATE DOMAIN hexa_color as VARCHAR(8)
    CHECK (
        VALUE ~'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
        );

CREATE DOMAIN posint AS integer
  CHECK(value > 0);        

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
  owner_id int REFERENCES "user"(id),
  vote_up posint,
  vote_down posint,
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

CREATE VIEW view_techno_projet AS
    SELECT t.label, t.id, t.color FROM public.techno_projet tp
    JOIN public.techno t ON t.id = tp.techno_id;

CREATE VIEW show_all_techno_projet AS

	SELECT t.id, t.label, t.color, tp.projet_id projet_id
	FROM public.techno_projet tp
	JOIN public.techno t ON t.id = tp.techno_id
	JOIN public.projet p ON p.id = tp.projet_id;


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
  github_id BIGINT UNIQUE,
  role_id INT default 1 REFERENCES "role"(id),
  bio TEXT,
  vote_up posint,
  vote_down posint,
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

END;