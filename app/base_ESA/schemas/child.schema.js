const Joi = require('joi');

const postChild = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  classe: Joi.string().required(),
});

module.exports = {
  postChild,
};
