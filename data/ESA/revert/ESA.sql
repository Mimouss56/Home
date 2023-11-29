-- Revert home:ESA from pg

BEGIN;

DROP TABLE IF EXISTS esa_parent_has_child CASCADE;

DROP TABLE IF EXISTS esa_garden;
DROP TABLE IF EXISTS esa_cantine;
DROP TABLE IF EXISTS esa_activity;

DROP TABLE IF EXISTS esa_child;
DROP TABLE IF EXISTS esa_parent;

DELETE FROM role WHERE label = 'esa';

COMMIT;
