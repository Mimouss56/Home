-- Revert oside:initdb from pg

BEGIN;

DROP TABLE techno_projet, projet, techno ;

DROP DOMAIN hexa_color; 

COMMIT;
