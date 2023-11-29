-- Revert oside:view_techno_projet from pg

BEGIN;

DROP VIEW view_techno_projet, show_all_techno_projet;

COMMIT;
