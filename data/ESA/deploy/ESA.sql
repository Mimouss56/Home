-- Deploy home:ESA to pg

BEGIN;

CREATE DOMAIN valid_email AS text
    CHECK (
        VALUE ~ '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
    );

CREATE TABLE parent (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email valid_email UNIQUE,
  street TEXT,
  zipcode NUMERIC(5,0),
  town VARCHAR(255)
);

CREATE TABLE child (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  class VARCHAR(3) NOT NULL
);

CREATE TABLE parent_has_child (
  id_parent INT REFERENCES parent(id) ON DELETE CASCADE,
  id_enfant INT REFERENCES child(id) ON DELETE CASCADE,
  PRIMARY KEY (id_parent, id_enfant)
);


CREATE TABLE activity (
  id_enfant INT REFERENCES child(id),
  montant VARCHAR(42),
  date DATE NOT NULL,
  PRIMARY KEY (id_enfant)
);

CREATE TABLE cantine (
  id_enfant INT REFERENCES child(id),
  date DATE NOT NULL,
  PRIMARY KEY (id_enfant)
);


CREATE TABLE garden (
  id_enfant INT REFERENCES child(id),
  quart_hours INT,
  date DATE NOT NULL,
  PRIMARY KEY (id_enfant)
);

COMMIT;
