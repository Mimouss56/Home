/**
 * POST /api/user/register
 * @tags Auth
 * @summary Create user
 * @param {object} request.body.required - User info
 * @example request - Example Register User
 * {
 * "email": "John@doe.com",
 * "username": "JohnDoe",
 * "password": "123456",
 * "passwordConfirm": "123456",
 * "first_name": "John",
 * "last_name": "Doe"
 * }
 * @return {UserLogged} 200 - An object of user info
 * @return 400 - error Message
 * @return 401 - Validation Unauthorized
 */
/**
 * POST /api/user/login
 * @tags Auth
 * @summary Login user
 * @param {object} request.body.required - User Object
 * @example request - Example Login User
 * {
 * "email": "john@doe.com",
 * "password": "123456Az!"
 * }
 * @return {UserLogged} 200 - An object of user info
 * @return 400 - error response
 * @return 401 - Validation Unauthorized
 * @return 403 - Bad credentials
 */

/**
 * Un User Logged
 * @typedef {object} UserLogged
 * @property {integer} id - User ID
 * @property {string} sessionToken - User session token
 * @example {object} UserLogged
 * {
 *  id: 1,
 *  sessionToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSw',
 *  message: 'User logged'
 * }
*/
