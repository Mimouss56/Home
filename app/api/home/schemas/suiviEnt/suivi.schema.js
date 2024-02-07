const Joi = require('joi');

/**
 * @typedef {object} EntPost - Description de l'entreprise
 * @property {string} name - Le nom de l'entreprise
 * @property {string} adresse - L'adresse de l'entreprise
 */

const EntPost = Joi.object({
  name: Joi.string().required(),
  adresse: Joi.string().required(),
});

module.exports = {
  EntPost,
};
