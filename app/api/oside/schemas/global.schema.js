const Joi = require('joi');

const id = Joi.object({
  id: Joi.number().integer().required(),
});
const color = Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
const label = Joi.string().min(3).max(15);
module.exports = {
  id,
  color,
  label,
};
