-- Revert oside:github_login from pg

BEGIN;

ALTER TABLE public.user 
    DROP COLUMN github_id,
    DROP COLUMN bio;

COMMIT;
