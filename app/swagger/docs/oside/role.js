/**
 * Un Role
 * @typedef {object} Role
 * @property {integer} id - Role ID
 * @property {string} label - Role label
 * @property {string|null} color - Role color Format Hexadecimal
 */

/**
 * GET /api/role
 * @tags Role
 * @summary Get all role
 * @return {array<Role>} 200 - An array of Role info
 * @return 404 - Not found
 */

/**
 * POST /api/role
 * @tags Role
 * @summary Create a new role
 * @param {Role} request.body.required
 * @return {Role} 200 - An object of Role info
 * @example request - Example request
 * {
 * "label": "user",
 * "color": "#61DBFB"
 * }
 * @return 200 - Message Role created
 * @return 401 - Validation Unauthorized
 * @return 500 - Message Internal Server Error
 */

/**
 * GET /api/role/{id}
 * @param {number} id.path.required - role id
 * @tags Role
 * @summary Get role By ID
 * @return {Role} 200 - An objet of Role info
 * @return 404 - Not found
 */

/**
 * PUT /api/role/{id}
 * @tags Role
 * @summary Update role By ID
 * @param {number} id.path.required - role id
 * @param {Role} request.body.required
 * @example request - Example request
 * {
 * "label": "user",
 * "color": "#61DBFB"
 * }
 * @return 200 - Message Role updated
 * @return 401 - Validation Unauthorized
 * @return 404 - Role not found
 * @return 500 - Message Internal Server Error
 * @security bearerAuth
*/

/**
 * DELETE /api/role/{id}
 * @tags Role
 * @summary Delete role By ID
 * @param {number} id.path.required - role id
 * @return 201 - Message Role deleted
 * @return 401 - Validation Unauthorized
 * @return 404 - Role not found
 * @return 500 - Message Internal Server Error
 * @security bearerAuth
*/
