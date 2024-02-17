-- Deploy home:statSite to pg

BEGIN;

-- Generated by Mocodo 4.2.1

CREATE TABLE "stat_page" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url         text,
  titre       VARCHAR(42),
  description text
);

CREATE TABLE "stat_visitor" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ip_address    VARCHAR(42),
  navigateur_os text,
  pays          VARCHAR(42),
  ville         VARCHAR(42)
);

CREATE TABLE "stat_view" (
  id_page            INT NOT NULL REFERENCES "stat_page" (id) ,
  id_visitor         INT NOT NULL REFERENCES "stat_visitor" (id) ,
  visited_at         timestamptz NOT NULL DEFAULT NOW() ,
  duration           VARCHAR(42),
  actions_effectuees VARCHAR(42)
);

COMMIT;
