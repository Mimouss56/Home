
-- Contrainte pour vérifier un nombre seulement postif
CREATE DOMAIN posint AS integer
  CHECK(value > 0);


ALTER TABLE user (

  vote_up posint,
  vote_down posint,

);


ALTER TABLE project (
  vote_up posint,
  vote_down posint,

);



CREATE TABLE COMMENT (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  'user_id' INT NOT NULL REFERENCES user(id),
  'projet_id' INT NOT NULL REFERENCES projet(id),
  'content' text,
  'flag' BOOLEAN NOT NULL DEFAULT 0,
  'created_at' timestamptz NOT NULL DEFAULT NOW() ,
  'updated_at' timestamptz,
  'delete_at' timestamptz
);

CREATE TABLE avis (
  'id' int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  'content' text,
  'flag' BOOLEAN DEFAULT 0,
  'user_id' INT NOT NULL REFERENCES "user"(id),
  'poster_id' INT NOT NULL REFERENCES "user"(id),
  'created_at' timestamptz NOT NULL DEFAULT NOW(),
  'updated_at' timestamptz,
  'delete_at' timestamptz
);


