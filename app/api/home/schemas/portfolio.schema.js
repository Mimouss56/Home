const Joi = require('joi');

/**
 * @typedef {object} PortfolioPost - Description du portfolio
 * @property {integer} id - L'ID du portfolio
 * @property {string} nameSite - Le nom du site
 * @property {string} description - La description du site
 * @property {string} urlImg - L'url de l'image
 * @property {string} urlSite - L'url du site
 */

const portfolioPost = Joi.object({
  id: Joi.number().integer(),
  nameSite: Joi.string().required(),
  description: Joi.string().required(),
  urlImg: Joi.string().required(),
  urlSite: Joi.string().required(),
});

module.exports = {
  portfolioPost,
};
