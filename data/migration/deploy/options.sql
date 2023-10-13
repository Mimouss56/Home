-- Deploy home:options to pg

BEGIN;

CREATE TABLE IF NOT EXISTS options (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    value TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO options (name, value) VALUES ('tokenDiscordBot', 'MTA5NjE1MjQ4OTMxODk0ODk2NA.GFOIVk.ST0OfCFFCozgRQyB1NJQKf1Md0tc-gQM9QmNyY');
COMMIT;
