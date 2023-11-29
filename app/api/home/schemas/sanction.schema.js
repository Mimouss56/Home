const Joi = require('joi');

const sanction = Joi.object({
  label: Joi.string().required(),
  id_child: Joi.number().integer().required(),
  warn: Joi.boolean().required(),
});

const objectID = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required().messages({
    'string.pattern.base': 'id must be a number',
  }),
});

module.exports = {
  sanction,
  objectID,
};
