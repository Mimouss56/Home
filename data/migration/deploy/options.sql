-- Deploy home:options to pg

BEGIN;

CREATE TABLE IF NOT EXISTS options (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    value TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE
);
COMMIT;
