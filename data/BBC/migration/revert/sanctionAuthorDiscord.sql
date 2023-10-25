-- Revert home:sanctionAuthorDiscord from pg

BEGIN;

ALTER TABLE sanction ADD COLUMN author int;

UPDATE sanction 
SET author = contrib.id
FROM contrib 
WHERE sanction.author_discord_id = contrib.discord_id;

ALTER TABLE sanction DROP COLUMN author_discord_id;

COMMIT;
