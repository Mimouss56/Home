-- Deploy home:cvDetails to pg

BEGIN;

CREATE TABLE IF NOT EXISTS cv_details (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES public.user(id),
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_infos (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES public.user(id),
  prez text NOT NULL,
  phone VARCHAR(15),
  address VARCHAR(255),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  website VARCHAR(255)
);

COMMIT;
