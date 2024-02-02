const Joi = require('joi');

const skillPost = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  skillPost,
};
