/**
 * Une Techno
 * @typedef {object} Techno
 * @property {integer} id - techno ID
 * @property {string} label - techno label
 * @property {string|null} color - techno color Format Hexadecimal
 */

// ! Not used
// /**
//  * GET /api/techno/{id}
//  * @param {number} id.path.required - techno id
//  * @tags Techno
//  * @summary Get techno By ID
//  * @return {Techno} 200 - An objet of project info
//  * @return {errorMessage} 400
//  * @return {errorMessage} 404
//  */

/**
 * GET /api/techno
 * @tags Techno
 * @summary Get all techno
 * @return {array<Techno>} 200 - An array of Techno info
 * @return 404 - Not found
 */

/**
 * POST /api/techno
 * @tags Techno
 * @summary Create a new techno
 * @param {object} request.body.required
 * @security bearerAuth
 * @return {Techno} 200 - An object of Techno info
 * @example request - Example request
 * {
 * "label": "Node",
 * "color": "61DBFB"
 * }
 * @return 200 - Message Techno created
 * @return 401 - Validation Unauthorized
 * @return 500 - Message Internal Server Error
 */

/**
 * PUT /api/techno/{id}
 * @tags Techno
 * @summary Update techno By ID
 * @security bearerAuth
 * @param {number} id.path.required - techno id
 * @param {Techno} request.body.required
 * @example request - Example request
 * {
 *  "label": "React",
 *  "color": "61DBFB"
 * }
 * @return 200 - Message Techno updated
 * @return 401 - Validation Unauthorized
 * @return 404 - Techno not found
 * @return 500 - Message Internal Server Error
 * @security bearerAuth
*/

/**
 * DELETE /api/techno/{id}
 * @summary Delete techno By ID
 * @tags Techno
 * @param {number} id.path.required - techno id
 * @return 201 - Message Techno deleted
 * @return 401 - Validation Unauthorized
 * @return 404 - Techno not found
 * @return 500 - Message Internal Server Error
 * @security bearerAuth
*/
