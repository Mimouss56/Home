-- Deploy home:recommandations to pg

BEGIN;

CREATE TABLE recommandations (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    recommandation TEXT NOT NULL,
    linkedin_link TEXT NOT NULL,
    avatar TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
