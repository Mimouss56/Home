-- Verify home:relanceEmploi on pg

BEGIN;

DO $$

DECLARE
    table_count INT;
BEGIN
    SELECT COUNT(*)
    INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public' -- Remplacez 'public' par le nom de votre schéma si nécessaire
    AND table_name IN ('propal', 'status', 'contact', 'echange');

    IF table_count = 4 THEN
        RAISE NOTICE 'All tables exist.';
    ELSE
        RAISE EXCEPTION 'Some tables are missing.';
    END IF;
END $$;

COMMIT;

