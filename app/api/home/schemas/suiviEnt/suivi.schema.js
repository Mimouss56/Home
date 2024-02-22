const Joi = require('joi');

/**
 * @typedef {object} EntPost - Description de l'entreprise
 * @property {string} name - Le nom de l'entreprise
 * @property {string} address - L'adresse de l'entreprise
 */

const EntPost = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().allow(''),
  postalCode: Joi.string(),
  town: Joi.string(),
  urlImg: Joi.string().allow(''),

});

const contactPost = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  email: Joi.string().optional().email().allow(''),
  phone: Joi.string().optional().allow(''),
  role: Joi.string().optional().allow(''),
  idEnt: Joi.number().required(),
});

module.exports = {
  EntPost,
  contactPost,
};
