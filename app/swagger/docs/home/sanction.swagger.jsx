/**
 * Sanction
 * @typedef {object} Sanction
 * @property {integer} id - ID de la sanction
 * @property {string} nom - Nom de la sanction
 * @property {Author} author - Auteur de la sanction
 * @property {DateSanction} date - Date de la sanction
 */

/**
 * SanctionPost
 * @typedef {object} SanctionPost
 * @property {string} label - Nom de la sanction
 * @property {integer} author_id - ID de l'auteur de la sanction
 * @property {boolean} important - Si la sanction est importante
 */

/**
 * GET /sanction
 * @summary Récupère toutes les sanctions
 * @tags Sanction
 * @security BearerAuth
 * @return {array<Sanction>} 200
 * @return 404
 * @return 500
 * @return 401
*/

/**
 * POST /sanction
 * @summary Ajoute une sanction
 * @tags Sanction
 * @security BearerAuth
 * @param {SanctionPost} request.body.required - La sanction à ajouter
 * @return 200 - La sanction ajoutée
 * @return 400 - La sanction n'a pas pu être ajoutée
 * @return 500 - Erreur serveur
*/

/**
 * DELETE /sanction/{id}
 * @summary Supprime une sanction
 * @tags Sanction
 * @security BearerAuth
 * @param {integer} id.path.required - ID de la sanction à supprimer
 * @return 200 - Sanction deleted
 * @return 404 - La sanction n'a pas été trouvée
 * @return 500 - Erreur serveur
 * @return 401 - Non autorisé
*/
/**
 * DateSanction
 * @typedef {object} DateSanction
 * @property {number} year - Année de la sanction
 * @property {number} week - Semaine de la sanction
 * @property {string} complete - Date complète de la sanction
 */
