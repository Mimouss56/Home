-- Deploy home:hardSkill to pg

BEGIN;

CREATE TABLE IF NOT EXISTS hard_skill (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    color VARCHAR(15) DEFAULT 'silver',
    url_icon VARCHAR(255) DEFAULT NULL,
    stack VARCHAR(8) DEFAULT 'AUTRE' NOT NULL
);

CREATE TABLE IF NOT EXISTS user_hard_skill (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES public.user(id),
    hard_skill_id INT NOT NULL REFERENCES hard_skill(id),
    level INT DEFAULT 0
);


COMMIT;
