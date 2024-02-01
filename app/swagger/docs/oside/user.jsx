/**
 * Un User Basic
 * @typedef {object} User
 * @property {integer} id - User ID
 * @property {string} email - User email
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} username - User username
 * @property {string} github_login - User github login
 * @property {string} created_at - User created at
 * @property {string} updated_at - User updated at
 * @property {string} delete_at - User delete at
 * @property {string} last_visited - User last visited
 * @property {string} avatar - User avatar
 * @property {Role} role - User role ID
 * @property {array<Techno>} ability - User techno
 */

/**
 * GET /api/user/{id}
 * @tags User
 * @summary Get user by id
 * @param {number} id.path.required - User id
 * @return {User} 200 - An object of user info
 * @return 401 - Validation Unauthorized
 * @return 403 - Unauthorized
 * @return 404 - User not found
 */

/**
 * GET /api/user
 * @tags User
 * @summary Get all user
 * @security BasicAuth & BearerAuth
 * @return {array<User>} 200 - An array of user info
 * @return 401 - Validation Unauthorized
 * @return 403 - Unauthorized
 * @return 404 - User not found
 */

/**
 * PUT /api/user/{id}
 * @tags User
 * @summary Update user
 * @param {number} id.path.required - User id
 * @param {object} request.body.required - User info
 * @example request - Example PUT User
 * {
 *  "email": "John@description.com",
 *  "username": "JohnDoe",
 *  "password": "123456Az!",
 *  "passwordConfirm": "123456Az!",
 *  "first_name": "John",
 *  "last_name": "Doe"
 *  "github_login": "JohnDoe"
 * }
 * @return {User} 200 - Profil updated
 * @return 401 - Validation Unauthorized
 * @return 404 - User not found
 * @return 409 - Info already exist in database
 * @return 500 - Message Internal Server Error
 */

/**
 * DELETE /api/user/{id}
 * @tags User
 * @summary Delete user
 * @param {number} id.path.required - User id
 * @return {boolean} 200 - An object of user info
 */
