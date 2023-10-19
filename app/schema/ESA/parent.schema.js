const Joi = require('joi');

const postParent = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().optional(),
  street: Joi.string().optional(),
  city: Joi.string().optional(),
  zipCode: Joi.string().length(5).optional(),
  child: Joi.array().items(Joi.number()).optional(),
})
  .with('street', ['city', 'zipCode']); // Cette ligne s'assure que si "street" est présent, "city" et "zipCode" doivent également l'être.

module.exports = {
  postParent,
};
