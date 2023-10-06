const Joi = require('joi');

const news = Joi.object({
  title: Joi.string(),
  content: Joi.string().required(),
  image: Joi.string().optional(),
  tags: Joi.array().items(Joi.number()).optional(),
});

const newsPut = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  image: Joi.string().optional(),
  tags: Joi.array().items(Joi.number()).optional(),
  draft: Joi.boolean().optional(),
});

module.exports = {
  news,
  newsPut,
};
