const Joi = require('joi');

/**
 * Login
 * @typedef {object} Login
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 */
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

/**
 * Register
 * @typedef {object} Register
 * @property {string} email.required - Email
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 * @property {string} confirmPassword.required - Confirm password
*/
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

module.exports = {
  loginSchema,
  registerSchema,
};
