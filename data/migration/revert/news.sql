-- Revert home:news from pg

BEGIN;

DROP TABLE news_has_tag, TAG, NEWS;

COMMIT;
