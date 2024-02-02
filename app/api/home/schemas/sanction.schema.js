const Joi = require('joi');

/**
 * @typedef SanctionPost
 * @property {string} label.required - Sanction label
 * @property {number} id_child.required - Child id
 * @property {boolean} warn.required - Warn
 * @property {boolean} read - Read
 */
const sanction = Joi.object({
  label: Joi.string().required(),
  id_child: Joi.number().integer().required(),
  warn: Joi.boolean().required(),
  read: Joi.boolean().optional(),
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
