-- Revert CsCargo:initdb from pg

BEGIN;

DROP TABLE IF EXISTS public.user , fonction, user_fonctions, roles, user_fonction,user_info_admin, user_id_divers, user_infos_perso CASCADE;
  -- fonction,
  -- users_fonctions,
  -- roles,
  -- user_fonction;
  -- ;
-- TABLE user_info_admin avec les différents infos admin d'un utilisateur






--





COMMIT;
