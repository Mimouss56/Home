const Joi = require('joi');

const postChild = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  classe: Joi.string().required(),
});

module.exports = {
  postChild,
};
