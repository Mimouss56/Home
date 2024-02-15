-- Revert home:statSite from pg

BEGIN;

drop table if exists "stat_view", "stat_page", "stat_visitor" cascade;

COMMIT;
