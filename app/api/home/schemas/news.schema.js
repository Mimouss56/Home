const Joi = require('joi');

/**
 * @typedef NewsPost
 * @property {string} title.required - Le titre de la news
 * @property {string} content.required - Le contenu de la news
 * @property {boolean} draft - La news est-elle un brouillon ?
 */
const news = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  draft: Joi.boolean(),

});

const newsPut = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  draft: Joi.boolean().optional(),
});

const newsPatch = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  draft: Joi.boolean().optional(),
});

module.exports = {
  news,
  newsPut,
  newsPatch,
};
