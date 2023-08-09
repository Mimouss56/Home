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
 * @return {Error} 404
 * @return {Error} 500
 * @return {Error} 401
*/

/**
 * POST /sanction
 * @summary Ajoute une sanction
 * @tags Sanction
 * @security BearerAuth
 * @param {SanctionPost} request.body.required - La sanction à ajouter
 * @return {Sanction} 200 - La sanction ajoutée
 * @return {Error} 400 - La sanction n'a pas pu être ajoutée
 * @return {Error} 500 - Erreur serveur
*/

/**
 * DELETE /sanction/{id}
 * @summary Supprime une sanction
 * @tags Sanction
 * @security BearerAuth
 * @param {integer} id.path.required - ID de la sanction à supprimer
 * @return {Sanction} 200 - La sanction supprimée
 * @return {Error} 404 - La sanction n'a pas été trouvée
 * @return {Error} 500 - Erreur serveur
 * @return {Error} 401 - Non autorisé
*/ 