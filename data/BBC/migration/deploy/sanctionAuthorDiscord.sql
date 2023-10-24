-- Deploy home:sanctionAuthorDiscord to pg

BEGIN;

ALTER TABLE sanction ADD COLUMN author_discord_id bigint;

UPDATE sanction 
SET author_discord_id = contrib.discord_id 
FROM contrib 
WHERE sanction.author = contrib.id;

ALTER TABLE sanction DROP COLUMN author;

COMMIT;
