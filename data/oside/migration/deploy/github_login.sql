-- Deploy oside:github_login to pg

BEGIN;

ALTER TABLE public.user 
    ADD COLUMN github_id BIGINT,
    ADD COLUMN bio TEXT;

COMMIT;
