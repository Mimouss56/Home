-- Deploy oside:view_techno_projet to pg

BEGIN;

CREATE VIEW view_techno_projet AS
    SELECT t.label, t.id, t.color FROM public.techno_projet tp
    JOIN public.techno t ON t.id = tp.techno_id;

CREATE VIEW show_all_techno_projet AS

	SELECT t.id, t.label, t.color, tp.projet_id projet_id
	FROM public.techno_projet tp
	JOIN public.techno t ON t.id = tp.techno_id
	JOIN public.projet p ON p.id = tp.projet_id;


COMMIT;
