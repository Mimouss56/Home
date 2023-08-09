/**
 * POST /login
 * @summary Login to the application
 * @tags Auth
 * @param {Login} request.body.required - Login object
 * @return {Logged} 200 - token
 * @return 400 - Invalid username/password supplied
 * @return 401 - Unauthorized
 * @return 500 - Unexpected error
 */

/**
 * POST /register
 * @summary Register to the application
 * @tags Auth
 * @param {Register} request.body.required - Register object
 * @return 200 - Utilisateur créé
 * @return 400 - Invalid username/password supplied
 * @return 500 - Unexpected error
 * @return 409 - User already exists
 * @return 401 - Unauthorized
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