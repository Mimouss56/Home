/**
 * Une News
 * @typedef {object} News
 * @property {integer} id.required - id de la news
 * @property {string} title.required - titre de la news
 * @property {string} description.required - description de la news
 * @property {string} image - image de la news
 * @property {Author} author - auteur de la news
 */

/**
 * GET /news
 * @summary Récupère toutes les news
 * @tags News
 * @return {array<News>} 200 - success response - application/json
 */

/**
 * GET /news/{id}
 * @summary Récupère une news
 * @tags News
 * @param {integer} id.path.required - id de la news
 * @return {News} 200 - success response - application/json
 * @return {Error} 404 - News not found
 * @return {Error} 500 - Internal server error
 */

/**
 * POST /news
 * @summary Crée une news
 * @tags News
 * @param {News} request.body.required - News - application/json
 * @return {Error} 201 - News created
 * @return {Error} 500 - Internal server error
 */
