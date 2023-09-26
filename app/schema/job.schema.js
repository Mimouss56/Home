const Joi = require('joi');

const postJob = Joi.object({
  ent: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  debut: Joi.date().required(),
  fin: Joi.date().required(),
  ville: Joi.string().required(),
  departement: Joi.number().required(),
  urlImg: Joi.string().required(),
});

const postSchool = Joi.object({
  ent: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  debut: Joi.date().required(),
  fin: Joi.date().required(),
  ville: Joi.string().required(),
  departement: Joi.number().required(),
  urlImg: Joi.string().required(),
});
module.exports = {
  postJob,
  postSchool,
};
