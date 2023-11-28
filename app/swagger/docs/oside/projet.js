/**
 * Un Projet
 * @typedef {object} Projet
 * @property {integer} id - Projet ID
 * @property {string} title - Projet label
 * @property {string} content - Projet content
 * @property {string} status - Projet status
 * @property {string} created_at - Timestamp Projet creation date
 * @property {string} updated_at - Timestamp Projet update date
 * @property {string} delete_at - Timestamp Projet delete date
 * @property {User} author - Projet owner
 * @property {array<Techno>} technoProjet - Projet techno
 * @property {array<User>} memberProjet - Projet member
 * @property {array<Comment>} commentProjet - Projet comment
 */

/**
 * GET /api/projet
 * @tags Projet - Operations about Projet
 * @summary Get all projet
 * @return {array<Projet>} 200 - An array of project info
 * @return 404 - Empty Project
 */

/**
 * GET /api/projet/{id}
 * @param {number} id.path.required - Projet id
 * @tags Projet - Operations about projet
 * @summary Get projet by id
 * @security bearerAuth
 * @return {Projet} 200 - An object of project info
 * @return 401 - Validation Unauthorized
 * @return 404 - Project not found
*/

/**
 * POST /api/projet
 * @tags Projet - Operations about projet
 * @summary Create a new projet
 * @security bearerAuth
 * @param {object} request.body.required - Body Content projet
 * @param {array<number>} technoProjet.query - technoProjet ID of projet
 * @example request - Example request
 * {
 *  "title": "Projet 1",
 *  "content": "Contenu du projet 1",
 *  "status": "En cours",
 *  "owner_id": 1,
 *  "technoProjet": [1]
 * }
 * @return {Projet} 200 - An object of project info
 * @return 401 - Validation Unauthorized
 * @return 500 - Message Internal Server Error
 */

/**
 * PUT /api/projet/{id}
 * @tags Projet - Operations about projet
 * @summary Update projet by id
 * @param {number} id.path.required - Projet id
 * @param {objet} request.body.required - Body Content projet
 * @example request - Example request
 * {
 * "title": "Projet 1",
 * "content": "Contenu du projet 1",
 * "status": "En cours",
 * "technoProjet": [1],
 * }
 * @return {Projet} 200 - An object of project info
 * @return 401 - Validation Unauthorized
 * @return 404 - Project not found
 * @return 500 - Message Internal Server Error
*/

/**
 * DELETE /api/projet/{id}
//  * @tags Projet - Operations about projet
 * @summary Delete projet by id
 * @param {number} id.path.required - Projet id
 * @return 201 - Message Project deleted
 * @return 401 - Validation Unauthorized
 * @return 500 - Message Internal Server Error

*/
