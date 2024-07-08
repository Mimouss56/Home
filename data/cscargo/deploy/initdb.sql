-- Deploy CsCargo:initdb to pg

BEGIN;

-- TABLE USERS avec infos de connection
CREATE TABLE public.user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TABLE user_infos_perso avec infos personnelles de membre
CREATE TABLE user_infos_perso (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  nom VARCHAR(32) DEFAULT NULL,
  prenom VARCHAR(32) DEFAULT NULL,
  adresse VARCHAR(64) DEFAULT NULL,
  code_postal VARCHAR(16) DEFAULT NULL,
  ville VARCHAR(32) DEFAULT NULL,
  pays VARCHAR(32) DEFAULT NULL,
  birthday DATE DEFAULT NULL,
  telephonne VARCHAR(16) DEFAULT NULL,
  motivation VARCHAR(512) DEFAULT NULL,
  avatar_id INTEGER DEFAULT NULL,
  profession VARCHAR(64) DEFAULT NULL,
  site_perso VARCHAR(128) DEFAULT NULL,
  CONSTRAINT user_info_user_id_fk FOREIGN KEY (user_id)
    REFERENCES public.user(id)
    ON DELETE CASCADE
);

-- TABLE user_ID avec les infos de connexion
CREATE TABLE user_id_divers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  steam_id VARCHAR(32) UNIQUE DEFAULT NULL,
  ts_id INTEGER UNIQUE DEFAULT NULL,
  unique_id_ts VARCHAR(28) UNIQUE DEFAULT NULL,
  discord_id bigint UNIQUE NULL,
  forum_id INTEGER UNIQUE DEFAULT NULL,
  CONSTRAINT user_id_divers_user_id_fk FOREIGN KEY (user_id)
    REFERENCES public.user(id)
    ON DELETE CASCADE
);

-- TABLE roles avec les fonctions existants
CREATE TABLE fonction (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32) NOT NULL
);

-- TABLE user_roles avec les fonctions des utilisateurs
-- 1 User peut avoir plusieurs fonctions sur le site
CREATE TABLE user_fonctions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    fonction_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT user_fonctions_user_id_fk FOREIGN KEY (user_id)
    REFERENCES public.user(id)
    ON DELETE CASCADE,
  CONSTRAINT user_fonctions_fonction_id_fk FOREIGN KEY (fonction_id)
    REFERENCES fonction(id)
);

-- TABLE permissions avec les roles existants
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

-- TABLE user_fonction avec les fonction d'un user
-- 1 user peut avoir seulement 1 role (PRINCIPAUX, DEV, ADMIN, MODO, DONATEUR)
CREATE TABLE user_role (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    roles_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT user_role_user_id_fk FOREIGN KEY (user_id)
    REFERENCES public.user(id)
    ON DELETE CASCADE,
  CONSTRAINT user_role_roles_id_fk FOREIGN KEY (roles_id)
    REFERENCES roles(id)

);

-- TABLE user_info_admin avec les différents infos admin d'un utilisateur
CREATE TABLE user_info_admin (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    donateur_refuse TEXT DEFAULT NULL,
    formateur_kick INT DEFAULT NULL REFERENCES public.user(id),
    formateur_admin INT DEFAULT NULL REFERENCES public.user(id),
    date_demission TIMESTAMP DEFAULT NULL,
    motif_demission TEXT DEFAULT NULL,
    CONSTRAINT user_info_admin_user_id_fk FOREIGN KEY (user_id)
      REFERENCES public.user(id)
      ON DELETE CASCADE,
    CONSTRAINT user_info_admin_formateur_kick_fk FOREIGN KEY (formateur_kick)
      REFERENCES public.user(id)
      ON DELETE CASCADE,
    CONSTRAINT user_info_admin_formateur_admin_fk FOREIGN KEY (formateur_admin)
      REFERENCES public.user(id)
      ON DELETE CASCADE
);


COMMIT;
