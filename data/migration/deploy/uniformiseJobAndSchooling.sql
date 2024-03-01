-- Deploy home:uniformiseJobAndSchooling to pg

BEGIN;

DROP TABLE IF EXISTS "cv", "cv_has_skill";

CREATE TABLE "cv"
(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  date_started timestamptz NOT NULL,
  date_ended timestamptz NOT NULL,
  id_ent INT NOT NULL REFERENCES ent(id),
  type VARCHAR(42) NOT NULL
);

INSERT INTO "cv" (title, description, date_started, date_ended, id_ent, type)
  SELECT title, description, CAST(date_started AS TIMESTAMP), CAST(date_ended AS TIMESTAMP), id_ent, 'job' FROM job;

INSERT INTO "cv" (title, description, date_started, date_ended, id_ent, type)
  SELECT title, description, CAST(date_started AS TIMESTAMP), CAST(date_ended AS TIMESTAMP), id_ent, 'school' FROM schooling;


CREATE TABLE "cv_has_skill"
(
  id_cv INT NOT NULL REFERENCES cv(id),
  id_skill INT NOT NULL REFERENCES skill(id),
  PRIMARY KEY (id_cv, id_skill)
);

DROP TABLE IF EXISTS job, schooling, job_skill, school_skill CASCADE;


COMMIT;
