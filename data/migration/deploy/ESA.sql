-- Deploy home:ESA to pg

BEGIN;

INSERT INTO role (label) VALUES ('esa');

CREATE TABLE esa_parent (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email valid_email NOT NULL UNIQUE,
  street TEXT,
  zipcode NUMERIC(5,0),
  town VARCHAR(255)
);

CREATE TABLE esa_child (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  class VARCHAR(3) NOT NULL
);

CREATE TABLE esa_parent_has_child (
  id_parent INT REFERENCES esa_parent(id) ON DELETE CASCADE UNIQUE,
  id_enfant INT REFERENCES esa_child(id) ON DELETE CASCADE UNIQUE,
  PRIMARY KEY (id_parent, id_enfant)
);


CREATE TABLE esa_activity (
  id_enfant INT REFERENCES esa_child(id),
  montant VARCHAR(42),
  date DATE NOT NULL,
  PRIMARY KEY (id_enfant)
);

CREATE TABLE esa_cantine (
  id_enfant INT REFERENCES esa_child(id),
  date DATE NOT NULL,
  PRIMARY KEY (id_enfant)
);


CREATE TABLE esa_garden (
  id_enfant INT REFERENCES esa_child(id),
  quart_hours INT,
  date DATE NOT NULL,
  PRIMARY KEY (id_enfant)
);

COMMIT;
