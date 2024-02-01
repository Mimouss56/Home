/**
 * Un Comment
 * @typedef {object} Comment
 * @property {integer} id - id
 * @property {integer} projet_id - projet_id
 * @property {string} content - content
 * @property {boolean} flag - signalement
 * @property {string} created_at - created_at
 * @property {string} updated_at - updated_at
 * @property {string} deleted_at - deleted_at
 * @property {User} user - user_id
 */

/**
 * GET /api/comment
 * @summary Affichage de tous les commentaires
 * @tags Comment
 * @security bearerAuth
 * @return {array<Comment>} 200 - success response - application/json
 */

/**
 * PUT /api/comment/{id}
 * @summary Signaler un commentaire
 * @tags Comment
 * @security bearerAuth
 * @param {integer} id.path.required - id du commentaire
 * @return {object} 200 - success response - application/json
 */

/**
 * DELETE /api/comment/{id}
 * @summary Supprimer un commentaire signalé
 * @tags Comment
 * @security bearerAuth
 * @param {integer} id.path.required - id du commentaire
 * @return {object} 200 - success response - application/json
 */

/**
 * POST /api/projet/{id}/comment
 * @summary Ajouter un commentaire à un projet
//  * @tags Comment
//  * @tags Projet
 * @security bearerAuth
 * @param {integer} id.path.required - id du projet
 * @param {postComment} request.body.required - data
 * @return {Comment} 200 - success response - application/json
 */
