-- Revert oside:comment from pg

BEGIN;

ALTER TABLE projet
    DROP COLUMN vote_up,
    DROP COLUMN vote_down;

ALTER TABLE public.user 
    DROP COLUMN vote_up,
    DROP COLUMN vote_down;
    
DROP TABLE avis, comment ;

DROP DOMAIN posint;

COMMIT;
