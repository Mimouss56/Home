/**
 * POST /login
 * @summary Login to the application
 * @tags Auth
 * @param {Login} request.body.required - Login object
 * @return {Logged} 200 - token
 * @return {Error} 400 - Invalid username/password supplied
 * @return {Error} 401 - Unauthorized
 * @return {Error} 500 - Unexpected error
 */

/**
 * POST /register
 * @summary Register to the application
 * @tags Auth
 * @param {Register} request.body.required - Register object
 * @return {string} 200 - token
 * @return {Error} 400 - Invalid username/password supplied
 * @return {Error} 500 - Unexpected error
 * @return {Error} 409 - User already exists
 * @return {Error} 401 - Unauthorized
*/

/**
 * Login
 * @typedef {object} Login
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 */

/**
 * Register
 * @typedef {object} Register
 * @property {string} email.required - Email
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 * @property {string} confirmPassword.required - Confirm password
*/

/**
 * Logged
 * @typedef {object} Logged
 * @property {integer} id - ID
 * @property {string} email - email de l'utilisateur
 * @property {string} sessionToken - Token de connexion
 * @property {string} message - Message de connexion
 * @property {Role} role - Rôle de l'utilisateur
*/