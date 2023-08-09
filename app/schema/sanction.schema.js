const Joi = require('joi');
const sanction = Joi.object({
  id: Joi.number().integer().required(),
  label: Joi.string().required(),
  author_id: Joi.number().integer().required(),
});

const objectID = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required().messages({
    'string.pattern.base': 'id must be a number',
  })
});

module.exports = {
  sanction,
  objectID
};