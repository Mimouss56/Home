-- Revert home:uniformiseJobAndSchooling from pg

BEGIN;

CREATE TABLE "job" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  description text,
  date_started timestamptz NOT NULL,
  date_ended timestamptz NOT NULL,
  id_ent INT NOT NULL REFERENCES ent(id)
);

INSERT INTO "job" (title, description, date_started, date_ended, id_ent)
  SELECT title, description, CAST(date_started AS TIMESTAMP), CAST(date_ended AS TIMESTAMP), id_ent FROM cv where type = 'job';

CREATE TABLE "schooling" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  date_started VARCHAR(42),
  date_ended VARCHAR(42),
  id_ent INT NOT NULL REFERENCES ent(id)
);

INSERT INTO "schooling" (title, description, date_started, date_ended, id_ent)
  SELECT title, description, CAST(date_started AS TIMESTAMP), CAST(date_ended AS TIMESTAMP), id_ent FROM cv where type = 'school';

CREATE TABLE "job_skill" (
  id_job INT NOT NULL REFERENCES "job"(id) ON DELETE CASCADE,
  id_skill INT NOT NULL REFERENCES "skill"(id) ON DELETE CASCADE,
  UNIQUE (id_job, id_skill),
  PRIMARY KEY (id_job, id_skill)
);

DROP TABLE "cv" CASCADE;

COMMIT;
