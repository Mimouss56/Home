-- Verify oside:initdb on pg

BEGIN;

SELECT * FROM "techno_projet" WHERE false;
SELECT * FROM "projet" WHERE false;
SELECT * FROM "techno" WHERE false;


ROLLBACK;
