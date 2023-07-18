-- Deploy home:initdb to pg

BEGIN;

CREATE DOMAIN hexa_color as VARCHAR(8)
    CHECK (
        VALUE ~'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
        );

CREATE DOMAIN valid_email AS text
    CHECK (
        VALUE ~ '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
    );

CREATE TABLE "role" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL,
  color hexa_color DEFAULT '#808080',
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz
);

CREATE TABLE "user" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username text NOT NULL UNIQUE,
  email valid_email NOT NULL UNIQUE,
  password text NOT NULL,
  id_role INT default 1 REFERENCES "role"(id),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz,
  delete_at timestamptz,
  last_visited timestamptz NOT NULL DEFAULT NOW() -- RGPD
);

CREATE TABLE "job" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ent text NOT NULL,
  title text NOT NULL,
  description text,
  town text,
  postal_code text,
  date_started timestamptz NOT NULL,
  date_ended timestamptz NOT NULL
);


CREATE TABLE "skill" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(42)
);

CREATE TABLE "schooling" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ent text NOT NULL,
  title text NOT NULL,
  niveau text NOT NULL,
  town text,
  postal_code text,
  date_started VARCHAR(42),
  date_ended VARCHAR(42)
);

CREATE TABLE option (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text,
  value text
);

CREATE TABLE "school_skill" (
  id_schooling INT NOT NULL REFERENCES "schooling"(id) ON DELETE CASCADE,
  id_skill INT NOT NULL REFERENCES "skill"(id) ON DELETE CASCADE,
  UNIQUE (id_schooling, id_skill),
  PRIMARY KEY (id_schooling, id_skill)
);

CREATE TABLE "user_schooling" (
  id_user INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  id_schooling INT NOT NULL REFERENCES "schooling"(id) ON DELETE CASCADE,
  UNIQUE (id_user, id_schooling),
  PRIMARY KEY (id_user, id_schooling)
);

CREATE TABLE "job_skill" (
  id_job INT NOT NULL REFERENCES "job"(id) ON DELETE CASCADE,
  id_skill INT NOT NULL REFERENCES "skill"(id) ON DELETE CASCADE,
  UNIQUE (id_job, id_skill),
  PRIMARY KEY (id_job, id_skill)
);

CREATE TABLE "user_job" (
  id_user INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  id_job INT NOT NULL REFERENCES "job"(id) ON DELETE CASCADE,
  UNIQUE (id_user, id_job),
  PRIMARY KEY (id_user, id_job)
);

INSERT INTO "role" (label) VALUES ('admin');
INSERT INTO "user" (username, email, password, id_role) VALUES ('admin', 'lepriol.matthieu@gmail.com', 'admin', 1);
COMMIT;
