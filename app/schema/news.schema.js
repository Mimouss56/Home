const Joi = require('joi');

const news = Joi.object({
  title: Joi.string(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
  tags: Joi.array().items(Joi.number()).optional(),
});

module.exports = {
  news,
};
