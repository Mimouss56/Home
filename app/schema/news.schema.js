const Joi = require('joi');
const news = Joi.object({
  title: Joi.string(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
});

module.exports = {
  news
};